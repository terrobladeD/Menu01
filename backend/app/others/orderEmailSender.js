const sendEmail = require('../others/emailer');

async function sendOrderEmail(order, orderDetails) {
    const to = order.email;
    const subject = 'Uptopeats Demo Shop Order Confirmation';
    const text = `123`;

    const htmlDetails = orderDetails.map(({ quantity, name, price }) => `
        <tr>
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${price}</td>
        </tr>
    `).join('');

    const totalItemCost = orderDetails.reduce((acc, { quantity, price }) => acc + (quantity * price), 0);
    const transactionFee = order.total_price - totalItemCost;
    const totalPrice = order.total_price

    const html = `
        <b>Dear customer,</b>
        <p>Your order has been placed successfully!</p>
        <p></p>
        <p>Order details:</p>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="text-align: left;">Name</th>
                    <th style="text-align: left;">Quantity</th>
                    <th style="text-align: left;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${htmlDetails}
            </tbody>
        </table>
        <p></p>
        <p>Transaction fee: ${transactionFee.toFixed(2)}</p>
        <p>Total price: ${totalPrice}</p>
    `;

    try {
        await sendEmail({ to, subject, text, html });
        console.log('Order email sent successfully');
    } catch (error) {
        console.error('Error occurred while sending order email:', error);
    }
}

module.exports = sendOrderEmail;
