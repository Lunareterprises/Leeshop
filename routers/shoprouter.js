var express = require("express");
var route = express.Router();
// var {verifyToken}=require('./components/jwt')

var { AddShop } = require('./../controller/shop/addShop')
route.post('/add/shop', AddShop)

var { ListShops } = require('./../controller/shop/addShop')
route.post('/list/shop', ListShops)

var { DeleteShops } = require('./../controller/shop/addShop')
route.post('/delete/shop', DeleteShops)

var { editshops } = require('./../controller/shop/addShop')
route.post('/edit/shop', editshops)

var{reviewadd}=require('../controller/shop/review')
route.post('/add/review',reviewadd)


module.exports = route
