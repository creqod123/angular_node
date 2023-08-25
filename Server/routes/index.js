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

router.post("/register", registerController.register);
router.post("/login", loginController.login);

//            ============ Admin ============== 

router.post('/admin', verifyToken, adminController.getAll);
router.post('/admin/add', upload.single('image'), adminController.add);
router.post('/admin/remove', verifyToken, adminController.remove);
router.post('/admin/detail', verifyToken, adminController.detail);
router.post('/admin/update', verifyToken, adminController.update);
router.post('/admin/order', verifyToken, adminController.order);
router.post('/admin/status', verifyToken, adminController.status);
router.post('/admin/search', verifyToken, adminController.search);
router.post('/admin/stock', verifyToken, adminController.stock);

//            ============ User ============== 

router.get('/user', userController.getAll)
router.post('/user/cart', userController.userCart)
router.post('/user/checkout', userController.checkout)
router.post('/user/order', userController.order);
router.post('/user/detail', userController.detail);
router.post('/user/orderupdate', userController.orderUpdate);
router.post('/user/search', userController.search);
router.post('/user/cartSaved', userController.cart);
router.post('/user/cartRequest', userController.cartRequest);

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
