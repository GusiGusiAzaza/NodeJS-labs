module.exports = {
    jwt: {
        secret: "secret_code",
        tokens: {
            access: {
                type: "access",
                expiresIn: "1h",
                SameSite: "Strict",
            },
            refresh: {
                type: "refresh",
                expiresIn: "1440m",
                SameSite: "Strict",
            },
        },
    },
    accessOptions: {
        maxAge: 1000 * 60 * 10,
        httpOnly: true,
        SameSite: "Strict",
    },
    refreshOptions: {
        maxAge: 1000 * 60 * 1440,
        httpOnly: true,
        sameSite: "Strict",
        path: "/refresh-token",
    },
    db: {
        username: 'gusi',
        password: 'qwerty1337',
        database: 'NodeJs1414',
        host: 'localhost',
        dialect: 'mssql',
        logging: false,
        trustServerCertificate: true,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
};
