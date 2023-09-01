const mongoose = require('mongoose')
const adminProduct = require('../models/adminProduct')
const register = require('../models/register')
const checkout = require('../models/checkout');
const address = require('../models/address');
const socket = require('../socket/index');
let emailDetail

// ============================= Admin get product =========================== 

exports.getAll = (async (req, res, next) => {
    try {
        const data = await adminProduct.find({ adminId: req.user._id })
        res.status(200).json({
            success: true,
            message: "complete",
            data: data,
        })
    }
    catch (error) {
        res.status(404).json({
            message: "complete fail",
        })
    }
});

// ============================= Admin update show =========================== 

exports.update = (async (req, res, next) => {

    try {
        const id = req.body.id;
        const form = req.body.form;

        const a = await adminProduct.updateOne({ _id: id, adminId: req.user._id }, { productName: form.productName, price: form.price, stock: form.stock })
        console.log(a)
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

// ============================= Admin add product =========================== 

exports.add = (async (req, res, next) => {

    try {
        const form = req.body;
        await adminProduct.create({
            image: 'dasdasdasdasdsd.png',
            productName: form.productName,
            price: form.price,
            stock: form.stock,
            adminId: req.user._id
        })

        res.status(200).json({
            success: true,
            message: "complete",
            data: req.body,
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        })
    }
});

// ============================= Admin remove product =========================== 

exports.remove = (async (req, res, next) => {
    try {

        const id = req.body.id;
        const data = await checkout.find({ productId: id });
        if (data.length >= 1) {
            res.status(200).json({
                success: true,
                message: "Some One order your product",
                data: data,
            })
        }
        else {
            await adminProduct.deleteOne({ _id: id, adminId: req.user._id });
            res.status(200).json({
                success: true,
                message: "complete",
            })
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= Admin detail show =========================== 

exports.detail = (async (req, res, next) => {
    try {
        const data = await checkout.find({ sellerId: req.user._id }).populate('productId').populate('addressId');
        res.status(200).json({
            success: true,
            message: "complete",
            data: data,
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= Admin detail show =========================== 

exports.delete = (async (req, res, next) => {
    try {
        await checkout.deleteOne({ _id: req.body.id })
        console.log(req.body)
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

// ============================= Admin Order show =========================== 

exports.order = (async (req, res, next) => {
    try {
        const data = await address.find({ _id: req.body.email })
        res.status(200).json({
            success: true,
            message: "complete",
            data: data,
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "fail",
        })
    }
});

// ============================= Admin status update show =========================== 


exports.status = (async (req, res, next) => {
    try {
        const id = req.body.id
        const status = req.body.status

        if (status === 'conform') {
            await checkout.updateOne({ _id: id }, { status: 'Conform' })
            socket.conformOrder('conformOrder');
        }
        else {

            const a = await checkout.findOne({ _id: id }).populate('addressId')
            await checkout.deleteOne({ _id: id })
            const check = a.addressId._id
            const b = await checkout.find({ addressId: check })

            if (b.length === 0) {
                await address.deleteOne({ _id: check })
            }
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

// ============================= search added product =========================== 

exports.search = (async (req, res, next) => {
    try {
        const Data = {}
        const pageNumber = req.body.paginat
        const _id = req.body._id
        const message = req.body.message
        const totalPosts = await adminProduct.find({ productName: message, adminId: _id }).countDocuments().exec();
        let startIndex = pageNumber * 9;
        Data.totalPosts = totalPosts;
        Data.data = await adminProduct.find({ productName: message, adminId: _id })
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

// ============================= search added product =========================== 

exports.stock = (async (req, res, next) => {
    try {
        const a = await adminProduct.updateOne({ _id: req.body._id }, { stock: req.body.stock })
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