const admin = require("firebase-admin");

const cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/" +
    process.env.FIREBASE_EMAIL.replace('@', '%40');
const serviceAccount = {
    "type": "service_account",
    "project_id": "awd-project-f7bf9",
    "private_key_id": process.env.FIREBASE_PKID,
    "private_key": process.env.FIREBASE_PK,
    "client_email": process.env.FIREBASE_EMAIL,
    "client_id": process.env.FIREBASE_CID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": cert_url
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://awd-project-f7bf9.firebaseio.com"
});

function verifyToken(req, res, next) {
    admin.auth().verifyIdToken(idToken)
        .then(function (decodedToken) {
            req.uid = decodedToken.uid;
            next();
        }).catch(function (err) {
            res.status(401).send(err);
        });
}

function getClaims(uid) {
    return admin.auth().getUser(uid)
        .then((user) => {
            return user.customClaims;
        });
}

// Helper method to test token claims against multiple roles
function testClaims(claims, roles, hasAll) {
    let hasClaim = false;

    if (hasAll) {
        hasClaim = true;
        roles.forEach(role => {
            hasClaim = hasClaim && claims.includes(role);
        });
    } else { // res = false
        let index = 0;
        while (!hasClaim && index < roles.length) {
            hasClaim = claims.includes(roles[index++]);
        }
    }

    return hasClaim;
}

function hasRole(role) {
    return (req, res, next) => {
        getClaims(req.uid)
            .then(claims => {
                if (claims[role]) {
                    next();
                } else {
                    res.status(401).send(`Unauthorized: ${role} role is required for access.`);
                }
            })
            .catch(function (err) {
                res.status(503).send(err);
            });
    };
}

function hasRoles(roles, hasAll) {
    if (roles.length == 1)
        return hasRole(roles[0]);

    return (req, res, next) => {
        getClaims(req.uid, role)
            .then(claims => {
                if (testClaims(claims, roles, hasAll)) {
                    next();
                }
            })
            .catch(function (err) {
                res.status(503).send(err);
            });
    };
}

function isUser(req, res, next) {
    if (req.uid == req.body.userId) {
        next();
    }
    else {
        res.status(401).send('Unauthorized: User is not authorized to view/modify this resource.');
    }
}

function isUserOrHasRole(role) {
    return (req, res, next) => {
        getClaims(req.uid)
            .then(claims => {
                if (claims[role]) { // has role
                    next();
                }
                else { // check if is user
                    isUser(req, res, next);
                }
            })
            .catch(function (err) {
                res.status(503).send(err);
            });
    };
}

function isUserOrHasRoles(roles, hasAll) {
    if (roles.length == 1)
        return isUserOrHasRole(roles[0]);

    return (req, res, next) => {
        getClaims(req.uid)
            .then(claims => {
                if (testClaims(claims, roles, hasAll)) {
                    next();
                }
                else { // check if is user
                    isUser(req, res, next);
                }
            })
            .catch(function (err) {
                res.status(503).send(err);
            });
    };
}

module.exports = {
    verifyToken,
    hasRole,
    hasRoles,
    isUser,
    isUserOrHasRole,
    isUserOrHasRoles
};