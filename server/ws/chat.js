const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistantId = process.env.WATSON_ASSISTANT_ID;

const assistant = new AssistantV2({
    version: process.env.WATSON_VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_APIKEY,
    }),
    url: process.env.WATSON_URL,
});

async function createSession() {
    const res = await assistant.createSession({
        assistantId
    });

    return res.result.session_id
}

async function queryAssistant(msg, session_id) {
    return assistant.message({
        assistantId,
        sessionId,
        input: {
            message_type: 'text',
            text: msg
        }
    });
}

async function listen(socket) {
    const sessionId = await createSession();

    socket.on('chat:message', async (msg, cb) => {
        try {
            const res = await queryAssistant(msg, sessionId);

            cb({
                response: res.output.generic,
                intents: res.output.intents
            });
        } catch (error) {
            console.error(error);
            socket.emit('chat:error', {
                error
            });
        }
    });

    return {
        assistantId,
        sessionId,
        delete: () => assistant.deleteSession({
            assistantId,
            sessionId,
        })
    };
}

module.exports = {
    listen
}