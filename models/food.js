const db = require("../config/db")
const {getUserId} = require("./user");

exports.getAllByUserID = (id) => {

    let sql = `SELECT * FROM food WHERE userID = ${id}`

    return db.execute(sql)
}

exports.addFood = (food, userid) => {
    let sql = `INSERT INTO food VALUES( 0, ${userid}, "${food.name}", "${food.type}", "${food.amount}", "${food.unit}")`
    return db.execute(sql)
}

exports.deleteAllByUserID = (userID) => {
    let sql = `DELETE FROM food WHERE userID = ${userID}`
    return db.execute(sql)
}

exports.deleteByID = (itemId) => {
    let sql = `DELETE FROM food WHERE id = ${itemId}`
    return db.execute(sql)
}

exports.updateFood = (food, userId) => {
    let sql
    if (food.ID) {
        sql = `UPDATE food SET name = "${food.name}", type = "${food.type}", amount = "${food.amount}", unit ="${food.unit}" WHERE ID = "${food.ID}"`
        return db.execute(sql)
    } else {
        sql = `INSERT INTO food VALUES( 0, ${userId}, "${food.name}", "${food.type}", "${food.amount}", "${food.unit}")`
    }

    return db.execute(sql)

}

exports.addFavouriteRecipe = (recipeID, userID) => {
    let sql = `INSERT INTO favourite_recipes VALUES( ${recipeID}, ${userID})`
    return db.execute(sql)
}

exports.getFavouriteRecipes = (userID) =>{
    let sql = `SELECT * FROM favourite_recipes WHERE id_user = ${userID}`
    return db.execute(sql)
}

exports.removeFavouriteRecipe = (recipeID) => {
    let sql = `DELETE FROM favourite_recipes WHERE id_recipe = ${recipeID}`
    return db.execute(sql)
}