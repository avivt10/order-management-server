const Order = require("../models/order");
const statusArray = ["בוצע", "ממתין לאישור", "מאושר"]

function generateRandomString() {
    return Math.random().toString(36).substring(7);
}

function getRandomStatus() {
    const randomIndex = Math.floor(Math.random() * statusArray.length);
    return statusArray[randomIndex];
}

const getOrders = async (req, res, next) => {
    try {
        const getAllOrders = await Order.find({})
        return res.status(200).json({
            arrayOrders: getAllOrders
        })
    } catch (err) {
        return res.status(404).json({
            msg: err
        })
    }

}

const createOrder = async (req, res, next) => {
    const {
        branch_id = req.body.branch_id || generateRandomString(),
            created_at = req.body.created_at || generateRandomString(),
            customer_id = req.body.customer_id || generateRandomString(),
            date = "01/03/2024",
            event_id = req.body.event_id || generateRandomString(),
            id = req.body.id || generateRandomString(),
            notes = req.body.notes || generateRandomString(),
            num_of_guest = req.body.num_of_guest || generateRandomString(),
            order_type = req.body.data.typeOrder,
            prediction = req.body.prediction || false,
            recurrence = req.body.recurrence || "none",
            status = req.body.status || getRandomStatus(),
            time = req.body.time || generateRandomString(),
            updated_at = req.body.updated_at || generateRandomString(),
            customer = req.body.data.customerName,
            source = req.body.source || generateRandomString(),
            branch = req.body.data.branchName
    } = req.body

    try {
        const newOrder = new Order({
            branch_id,
            created_at,
            customer_id,
            date,
            event_id,
            id,
            notes,
            num_of_guest,
            order_type,
            prediction,
            recurrence,
            status,
            time,
            updated_at,
            customer,
            source,
            branch
        })
        await newOrder.save();
        return res.status(201).json({
            msg: 'ההזמנה נוצרה בהצלחה'
        });
    } catch (err) {
        return res.status(404).json({
            msg: err
        })
    }
}

const deleteOrder = async (req, res, next) => {
    const {
        id
    } = req.body;
    try {
        const existOrder = await Order.deleteOne({
            id: id
        });

        if (existOrder.deletedCount === 0) {
            return res.status(404).send('Order not found');
        }
        return res.status(200).send('Order deleted successfully');
    } catch (err) {
        return res.status(500).send('Internal Server Error');

    }
}

exports.getOrders = getOrders;
exports.createOrder = createOrder;
exports.deleteOrder = deleteOrder;