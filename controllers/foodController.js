const food = require("../models/food")

exports.getAllByUserID = async (req, res) => {
    try {
        let [data, _] = await food.getAllByUserID(req.params.id)
        res.status(200).json({data, success: true})
    } catch (error) {
        res.status(500).json({success: false})
    }
}

exports.insertAll = async (req, res) => {
    try {
        for (let i = 0; i < req.body.food.length; i++) {
            await food.addFood(JSON.parse(req.body.food[i]), req.params.id)
        }
        res.status(200).json({success: true})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false})
    }

}

exports.changeFood = async (req, res) => {
    try {
        let foodData = req.body.food
        for (let i = 0; i < foodData.length; i++) {
            await food.updateFood(JSON.parse(foodData[i]), req.params.id)
        }
        res.status(200).json({success: true})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false})
    }
}

exports.delete = async (req, res) => {
    try {
        let foodData = req.body.food
        for (let i = 0; i < foodData.length; i++) {
            let id = foodData[i].ID
            await food.deleteByID(id)
        }
        res.status(200).json({success: true})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false})
    }
}

exports.addFavouriteRecipe = async (req, res) => {

    try {
        let recipeID = req.body.id
        await food.addFavouriteRecipe(recipeID, req.params.id)
        res.status(200).json({success: true})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false})
    }
}

exports.getFavouriteRecipes = async (req, res) => {
    try{
        let [data,_] = await food.getFavouriteRecipes(req.params.id)
        res.status(200).json({success:true, data: data})
    }
    catch (err)
    {res.status(500).json({success:false})}
}

exports.removeFavouriteRecipe = async (req, res) => {
    try {
        let id = req.body.id
        await food.removeFavouriteRecipe(id)
        res.status(200).json({success:true})
    }
    catch (err){
        console.log(err)
        res.status(500).json({success:false})
    }
}

