const { BehaviorSubject } = require('rxjs');
const { filter } = require('rxjs/operators')

let _io;
const eventSource = new BehaviorSubject();
const events$ = eventSource.asObservable();

function init(io) {
    _io = io;
}

async function listen(socket) {
    return events$
        .pipe(
            filter(data => data && data.uid == socket.username)
        )
        .subscribe(data => {
            socket.emit(`update:${data.ns.coll}:${data.operationType}`, data);
        });
}
function emitPublic(data) {
    _io.emit(`update:${data.ns.coll}:${data.operationType}`, data);
}

function emitPrivate(data, userId) {
    data.uid = userId;
    eventSource.next(data);
}

module.exports = {
    init,
    listen,
    emitPublic,
    emitPrivate
}