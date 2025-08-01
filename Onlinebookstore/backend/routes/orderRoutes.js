const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const Order = require('../models/order'); // import Order model

router.post('/', async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    // Save order
    const newOrder = new Order({ customer, items, total });
    await newOrder.save();

    const invoiceName = `invoice-${Date.now()}.pdf`;
    const invoicePath = path.join(__dirname, '../invoices', invoiceName);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(invoicePath));
    doc.fontSize(20).text('Invoice', { underline: true });
    doc.moveDown();
    doc.text(`Customer: ${customer.name}`);
    doc.text(`Email: ${customer.email}`);
    doc.text(`Payment Method: ${customer.paymentMethod}`);
    doc.moveDown();
    items.forEach((item, i) => {
      doc.text(`${i + 1}. ${item.title} - Rs. ${item.price}`);
    });
    doc.moveDown();
    doc.text(`Total: Rs. ${total}`, { bold: true });
    doc.end();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: 'Your Bookstore Invoice',
      text: `Thank you for your order, ${customer.name}!\n\nAttached is your invoice.`,
      attachments: [{ filename: invoiceName, path: invoicePath }]
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error('❌ Email failed:', err.message);
      else console.log('✅ Email sent:', info.response);
    });

    res.json({ message: '✅ Invoice generated and order saved', file: invoiceName });
  } catch (error) {
    console.error('Invoice generation failed:', error.message);
    res.status(500).json({ message: '❌ Failed to generate invoice' });
  }
});
router.get('/', async (req, res) => {
  try {
    console.log('Received userId for order lookup:', req.query.userId);
    const orders = await Order.find({ 'customer.userId': req.query.userId });
    console.log('Fetched orders:', orders);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
