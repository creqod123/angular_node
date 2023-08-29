const mongoose = require('mongoose')
const con = require('../connection/mysql');
const adminProduct = require('../models/adminProduct')
const checkout = require('../models/checkout')
const register = require('../models/register')
const address = require('../models/address')
const cart = require('../models/cart')
const socket = require('../socket/index');

// ============================= getall data show =========================== 

exports.getAll = (async (req, res, next) => {
    try {
        data = await adminProduct.find()
        res.status(200).json({
            message: "complete",
            data,
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});

// ============================= Cart data show =========================== 

exports.userCart = (async (req, res, next) => {

    try {
        const cartData = await cart.findOne({ userId: req.user._id }).populate('productCart.productId')
        res.status(200).json({
            success: true,
            message: "complete",
            data: cartData
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "complete fail",
        })
    }
});

// ============================= data checkout =========================== 

exports.checkout = (async (req, res, next) => {

    try {
        const product = req.body.product;
        const addressData = req.body.address;
        const user = req.user._id;
        let checkAddress = await address.findOne({ userId: user })
        if (!checkAddress) {
            checkAddress = await address.create({
                userId: user,
                fullName: addressData.ModalName,
                email: addressData.ModalEmail,
                address: addressData.ModalAddress,
                pincode: addressData.ModalPincode
            });
        }
        product.map(async (product) => {
            const { _id, price, adminId } = product.productId
            const { quantity } = product
            await checkout.create({
                quantity: quantity,
                price: price,
                status: "Pending",
                productId: _id,
                userId: user,
                sellerId: adminId,
                addressId: checkAddress._id
            })
        })
        res.status(200).json({
            success: true,
            message: "complete",
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "complete fail",
        })
    }
});

// ============================= user detail show =========================== 


exports.detail = (async (req, res, next) => {


    try {
        const find = req.body._id
        const data = await checkout.find({ userId: find }).populate('productId').populate('addressId').populate('userId')

        res.status(200).json({
            success: true,
            message: "complete",
            data: data
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= user order show =========================== 

exports.order = (async (req, res, next) => {
    try {
        const product = await checkout.find({ userId: req.user._id }).populate('productId').populate('addressId')
        res.status(200).json({
            success: true,
            message: "complete",
            data: product
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});


// ============================= user order update =========================== 

exports.orderUpdate = (async (req, res, next) => {
    try {
        await address.updateOne({ _id: req.body.id }, { fullName: req.body.fullName, house: req.body.house, area: req.body.area, city: req.body.city, pincode: req.body.pincode })
        res.status(200).json({
            success: true,
            message: "complete",
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= search order =========================== 

exports.search = (async (req, res, next) => {
    try {
        const Data = {}
        const pageNumber = req.body.paginat
        const message = req.body.message
        const totalPosts = await adminProduct.find({ productName: message }).countDocuments().exec();
        let startIndex = pageNumber * 9;
        Data.totalPosts = totalPosts;
        Data.data = await adminProduct.find({ productName: message })
            .sort("-_id")
            .skip(startIndex)
            .limit(9)
            .exec();
        res.status(200).json({
            success: true,
            message: "complete",
            data: Data
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= User add to cart =========================== 

exports.cart = (async (req, res, next) => {
    try {
        const data = await cart.findOne({ userId: req.user._id })
        if (data) {
            await cart.updateOne({ userId: req.user._id }, { $push: { productCart: { productId: req.body._id, quantity: 1 } } })
        }
        else {
            await cart.create({ userId: req.user._id, productCart: [{ productId: req.body, quantity: 1 }] })
        }
        res.status(200).json({
            success: true,
            message: "complete",
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= User remove to cart =========================== 

exports.removeCart = (async (req, res, next) => {
    try {
        const data = await cart.findOne({ userId: req.user._id });
        data.productCart.map((item, i = 0) => {
            if (item._id == req.body.id) {
                data.productCart.splice(i, 1)
            }
        });
        await cart.findOneAndDelete({ userId: req.user._id });
        await cart.create({ userId: req.user._id, productCart: data.productCart });

        res.status(200).json({
            success: true,
            message: "complete",
            data: data
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error,
        });
    }
});

// ============================= User cart request ===========================
// exports.cartRequest = (async (req, res, next) => {
//     try {
//         let sql_data_
//         const sqlQuery = "SELECT * FROM test.product WHERE id = 1;"
//         const rows = con.query(sqlQuery, (a, b) => {
//             sql_data_ = b
//         });
//         const product = await cart.findOne({ userId: req.user._id }).populate('productCart.productId')
//         res.status(200).json({
//             success: true,
//             message: "complete",
//             data: product,
//             data_1: sql_data_
//         })
//     }
//     catch (error) {
//         res.status(404).json({
//             success: false,
//             message: "fail",
//         })
//     }
// });