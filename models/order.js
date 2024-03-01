const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    branch_id: String,
    created_at: String,
    customer_id: String,
    date: String,
    event_id: String,
    id: String,
    notes: String,
    num_of_guests: Number,
    order_type: String,
    prediction: String,
    recurrence: String,
    status: String,
    time: String,
    updated_at: String,
    customer: String,
    source: String,
    branch: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("order", orderSchema);