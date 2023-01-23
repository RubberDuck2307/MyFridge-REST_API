const db = require("../config/db")


exports.checkUsername = async (username) => { //Returns true if there is no user with same name
    let sql = `SELECT * FROM users WHERE username = "${username}"`
    let [user, _] = await db.execute(sql)
    return (Object.keys(user).length === 0)
}


exports.createNewUser = (username, password) => {
    let sql = `INSERT INTO users  VALUES (0, "${username}", "${password}")`
    return db.execute(sql)
}

exports.getHas = (username) => {
    let sql = `SELECT password FROM users WHERE username = "${username}"`
    return db.execute(sql)
}

exports.getUserId = (username) => {
    let sql = `SELECT id FROM users WHERE username = "${username}"`
    return db.execute(sql)
}

exports.saveNewUserInformation = (id, username, email, firstName, lastName) =>
{
    let sql =`INSERT INTO users_info VALUES(${id}, "${username}", "${email}", "${firstName}", "${lastName}")`
    return db.execute(sql)
}