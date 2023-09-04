const mongoose = require('mongoose');
const con = require('../connection/mysql');
const adminProduct = require('../models/adminProduct');
const checkout = require('../models/checkout');
const register = require('../models/register');
const address = require('../models/address');
const cart = require('../models/cart');
const socket = require('../socket/index');

// ============================= getall data show =========================== 

exports.getAll = (async (req, res, next) => {
    try {
        if (req.user.type === 'user') {
            data = await adminProduct.find();
            res.status(200).json({
                success: true,
                message: "complete",
                data: data,
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "invalid URL   ",
            })
        }
    }
    catch (error) {
        res.status(404).json({
            success: true,
            message: "complete fail",
        })
    }
});

// ============================= Cart data show =========================== 

exports.userCart = (async (req, res, next) => {

    try {
        const cartData = await cart.findOne({ userId: req.user._id }).populate('productCart.productId');
        res.status(200).json({
            success: true,
            message: "complete",
            data: cartData,
        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "complete fail",
        })
    }
});

// ============================= User add to cart =========================== 

exports.cart = (async (req, res, next) => {
    try {
        const data = await cart.findOne({ userId: req.user._id });
        if (data) {
            await cart.updateOne({ userId: req.user._id }, { $push: { productCart: { productId: req.body._id, quantity: 1 } } });
        }
        else {
            await cart.create({ userId: req.user._id, productCart: [{ productId: req.body, quantity: 1 }] });
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
            data: data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error,
        });
    }
});

// ============================= data checkout =========================== 

exports.checkout = (async (req, res, next) => {

    try {
        const product = req.body.product;
        const addressData = req.body.address;
        const user = req.user._id;
        let checkAddress = await address.findOne({ userId: user });
        if (!checkAddress) {
            checkAddress = await address.create({
                userId: user,
                fullName: addressData.ModalName,
                email: addressData.ModalEmail,
                address: addressData.ModalAddress,
                pincode: addressData.ModalPincode,
            });
        }
        product.map(async (product) => {
            const { _id, price, adminId } = product.productId;
            const { quantity } = product;
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

// ============================= user order show =========================== 

exports.order = (async (req, res, next) => {
    try {
        const product = await checkout.find({ userId: req.user._id }).populate('productId').populate('addressId');
        res.status(200).json({
            success: true,
            message: "complete",
            data: product,
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

exports.addressUpdate = (async (req, res, next) => {
    try {
        const id = req.user._id;
        const form = req.body.form;
        const a = await address.updateOne({ userId: id }, { fullName: form.ModalName, email: form.ModalEmail, pincode: form.ModalPincode, address: form.ModalAddress });
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

// ============================= user detail show =========================== 


exports.delete = (async (req, res, next) => {
    try {
        const addressCheck = await address.findOne({ userId: req.user._id });
        const data = await checkout.find({ addressId: addressCheck._id });

        if (data.length != 1) {
            await checkout.deleteOne({ userId: req.user._id, _id: req.body.id });
        }
        else {
            await checkout.deleteOne({ userId: req.user._id, _id: req.body.id });
            await address.deleteOne({ _id: addressCheck._id });
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
