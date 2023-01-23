const express = require("express")
const router = express.Router()
const foodController = require("../controllers/foodController")
const usersController = require("../controllers/usersController")

router.route("/:id").get(usersController.checkToken, usersController.checkPermission, foodController.getAllByUserID)

router.route("/:id").post(usersController.checkToken, usersController.checkPermission, foodController.insertAll)

router.route("/:id").put(usersController.checkToken, usersController.checkPermission, foodController.changeFood)

router.route("/:id").delete(usersController.checkToken, usersController.checkPermission, foodController.delete)

router.route("/favourite/:id").post(usersController.checkToken, usersController.checkPermission, foodController.addFavouriteRecipe)

router.route("/favourite/:id").get(usersController.checkToken, usersController.checkPermission, foodController.getFavouriteRecipes)

router.route("/favourite/:id").delete(usersController.checkToken, usersController.checkPermission, foodController.removeFavouriteRecipe)


module.exports = router