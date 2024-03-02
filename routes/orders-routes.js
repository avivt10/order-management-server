const express = require("express")
const orderController = require("../controller/order-controller")
const router = express.Router()

router.post('/createOrder', orderController.createOrder)
router.get('/getOrders', orderController.getOrders)
router.delete('/deleteOrder', orderController.deleteOrder)

module.exports = router