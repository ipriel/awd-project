const auth = require("../../firebase-init");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (typeof authHeader == 'undefined' || authHeader == null) {
        console.error('Error: No Auth Header')
        return res.sendStatus(401);
    }

    const idToken = authHeader.split(' ')[1];

    auth.verifyIdToken(idToken)
        .then(function (decodedToken) {
            req.uid = decodedToken.uid;
            next();
        }).catch(function (err) {
            console.log(err);
            res.status(401).send(err);
        });
}

function getClaims(uid) {
    return admin.auth().getUser(uid)
        .then((user) => {
            return user.customClaims;
        });
}

function setClaims(uid, claims) {
    if(claims)
        return admin.auth().setCustomUserClaims(uid, claims);
    else
        return Promise.reject("Claims argument not defined");
}

// Helper method to test token claims against multiple roles
function testClaims(claims, roles, hasAll) {
    let hasClaim = false;

    if (hasAll) {
        hasClaim = true;
        roles.forEach(role => {
            hasClaim = hasClaim && claims[role];
        });
    } else { // res = false
        let index = 0;
        while (!hasClaim && index < roles.length) {
            hasClaim = claims[roles[index++]];
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
    getClaims,
    setClaims,
    hasRole,
    hasRoles,
    isUser,
    isUserOrHasRole,
    isUserOrHasRoles
};