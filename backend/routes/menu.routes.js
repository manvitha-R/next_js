const express = require('express');
const app = express();
const menuExpressRoute = express.Router();
let MenuSchema = require('../model/menu.model');

menuExpressRoute.route('/get-menu').get(async (req, res, next) =>{
    try {
        const data = await MenuSchema.find({
          isdeleted: false
        });
        res.json(data);
      } catch (error) {
        return next(error);
      }
});

menuExpressRoute.route('/menu/:id').get(async (req, res, next) =>{
    try {
        const data = await MenuSchema.findById(req.params.id);
        res.json(data);
      } catch (error) {
        return next(error);
      }
});

menuExpressRoute.route('/add-menu').post(async (req, res, next) =>{
    try {
        const data = await MenuSchema.create(req.body);
        res.json(data);
      } catch (error) {
        return next(error);
      }
});

menuExpressRoute.route('/update-menu/:id').put(async (req, res, next) =>{
    try {
        const data = await MenuSchema.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.json(data);
        console.log('Updated Successfully!');
      } catch (error) {
        return next(error);
      }
});

menuExpressRoute.route('/soft-menu/:id').delete(async (req, res, next) =>{
    try {
        const data = await MenuSchema.updateOne({
          _id: req.params.id,
        },{
          $set: {
            isdeleted:true
          },
        });
        res.status(200).json({
          error: false,
          message: "user deleted successfully",//
          _id: req.params.id,
        });
    
       }  catch (err) {
        next(err);
      }
});


module.exports = menuExpressRoute;