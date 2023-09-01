const express = require('express');
const router = express.Router();
let fs = require('fs');
let p = require('path')

const adminController = require('../controller/adminController')
const ceoController = require('../controller/ceoControllers')
const loginController = require('../controller/loginController')
const registerController = require('../controller/registerController')
const userController = require('../controller/userController')
const imageController = require('../controller/imageController')

const upload = require('../middleware/multer')
const verifyToken = require('../middleware/token')

//            ============ login and register ============== 

router.get('/', async function (req, res, next) {
  res.write("Hello world")
  res.end()
});

router.post("/register", registerController.register);    //
router.post("/login", loginController.login);             //

//            ============ Admin ============== 

router.get('/seller', verifyToken, adminController.getAll); //
router.post('/seller/update', verifyToken, adminController.update); //
router.post('/seller/remove', verifyToken, adminController.remove);
router.post('/seller/add', verifyToken, adminController.add);

router.post('/seller/detail', verifyToken, adminController.detail);
router.post('/seller/order', verifyToken, adminController.order);
router.post('/seller/status', verifyToken, adminController.status);
router.post('/seller/search', verifyToken, adminController.search);
router.post('/seller/stock', verifyToken, adminController.stock);
// router.post('/seller/add', verifyToken, upload.single('image'), adminController.add);

//            ============ User ============== 

router.get('/user', userController.getAll)      //
router.get('/user/cart', verifyToken, userController.userCart)    //
router.post('/user/cartSaved', verifyToken, userController.cart);   //
router.post('/user/cartRemove', verifyToken, userController.removeCart);   //
router.post('/user/checkout', verifyToken, userController.checkout) //
router.get('/user/order', verifyToken, userController.order); //
router.post('/user/orderupdate', verifyToken, userController.addressUpdate); //
router.post('/user/orderDelete', verifyToken, userController.delete); //

//            ============ Controller by admin ============== 

router.get('/ceo', verifyToken, ceoController.getData)
router.post('/ceo/user/detail', verifyToken, ceoController.userDetail)
router.post('/ceo/user/delete', verifyToken, ceoController.userDelete)

router.post('/ceo/admin/detail', verifyToken, ceoController.adminDetail)
router.post('/ceo/admin/productremove', verifyToken, ceoController.productRemove)
router.post('/ceo/search', verifyToken, ceoController.searchData)

//            ============ Get image ============== 

router.get('/image', upload.single('image'), imageController.getIma)

module.exports = router;
