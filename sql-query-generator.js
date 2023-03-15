const configs = require('./configs/configs')

module.exports = {
    getAllUsers: ({firstName = '',lastName = '',  email = '', birthDate = '', status = ''}) =>
        `SELECT * FROM users WHERE firstName LIKE '%${firstName}%' AND lastName LIKE '%${lastName}%' AND email LIKE '%${email}%' ${birthDate ? `AND birthDate = '${birthDate}'` : ''} ${status ? `AND status = '${status}'` : ''}`,

    getUserById: (id) => `SELECT * FROM users WHERE id = '${id}'`,
    getUserByFiled: (field, value) => `SELECT * FROM users WHERE ${field} = '${value}'`,

    createUser: ({id, firstName, lastName, email, birthDate, status, ipAddress}) => `INSERT INTO users(id, firstName, lastName, email, birthDate, status, ipAddress) VALUES('${id}','${firstName}','${lastName}','${email}','${birthDate}','${status}', '${ipAddress}');`,

    editUserById: (id, {firstName, lastName, email, birthDate, status}) => {
        let body = `UPDATE users SET ${firstName ? `firstName = '${firstName}',` : ''}${lastName ? `lastName = '${lastName}',` : ''}${email ? `email = '${email}',` : ''}${birthDate ? `birthDate = '${birthDate}',` : ''}${status ? `status = '${status}' ` : ''}`;
        body = body.slice(0, -1) + ` WHERE id = '${id}'`;
        console.log(body)
        return body;
    },

    deleteUserById: (id) => `DELETE FROM users WHERE id = '${id}'`,

    getAllFiles: () => `SELECT * FROM user_files;`,

    getAllUserFilesByUserId: (id) => `SELECT * FROM user_files WHERE createdBy = '${id}'`,

    getFileById: (id) => `SELECT * FROM user_files WHERE id = '${id}';`,

    createFile: ({id, createdBy, fileName, originalName, mime, size}) => `
    INSERT INTO user_files(id, createdBy, fileName, originalName, mime, size) VALUES 
    ('${id}','${createdBy}','${fileName}','${originalName}','${mime}','${size}');`,

    editFileById: (id, createdBy) => `UPDATE user_files SET createdBy = '${createdBy}' WHERE id = '${id}';`,

    deleteFileById: (id) => `DELETE FROM user_files WHERE id = '${id}'`,

    deleteEmptyFiles: () => `DELETE FROM user_files WHERE id = 'null'`,

    dropDataBase: () => `DROP DATABASE IF EXISTS test_project;`,

    createDataBase: () => `CREATE DATABASE IF NOT EXISTS test_project;`,

    createUserTables: () => "CREATE TABLE test_project.users(\n" +
        "  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  `registrationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,\n" +
        "  `firstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  `lastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  `birthDate` date NOT NULL,\n" +
        "  `ipAddress` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  `status` enum('lead','demo','client') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  PRIMARY KEY (`id`),\n" +
        "  KEY `idx-user-firstName` (`firstName`),\n" +
        "  KEY `idx-user-lastName` (`lastName`),\n" +
        "  UNIQUE KEY `idx-user-email` (`email`),\n" +
        "  KEY `idx-user-birthDate` (`birthDate`),\n" +
        "  KEY `idx-user-status` (`status`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n",

    createFilesTable: () => "CREATE TABLE test_project.user_files(\n" +
        "  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  `createdBy` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,\n" +
        "  `fileName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  `originalName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  `mime` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "  `size` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,\n" +
        "   PRIMARY KEY (`id`),\n" +
        "   KEY `idx-user_file-createdBy` (`createdBy`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",


}
