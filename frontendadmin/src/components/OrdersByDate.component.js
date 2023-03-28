import React, { useState, useEffect } from 'react';
import { Table, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';

function OrdersByDate() {
    const [orders, setOrders] = useState([]);
    const [dishNames, setDishNames] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        fetchDishNames();
        fetchOrdersByDate(selectedDate);
    }, [selectedDate]);

    const fetchDishNames = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/dish');
            const data = await response.json();
            const dishNameMap = data.reduce((map, dish) => {
                map[dish.id] = dish.name;
                return map;
            }, {});
            setDishNames(dishNameMap);
        } catch (error) {
            console.error('Error fetching dish names:', error);
        }
    };

    const fetchOrdersByDate = async (date) => {
        try {
            const response = await fetch(`http://localhost:8080/api/order/bydate/${date}`);
            const data = await response.json();
            if (Array.isArray(data) && data.length) {
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setOrders(sortedData);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div>
            <h2>Orders by Date</h2>
            <div className="grid-form">
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Select Date</InputGroup.Text>
                            <FormControl type="date" value={selectedDate} onChange={handleDateChange} style={{ maxWidth: '200px' }} />
                        </InputGroup>
                    </Col>
                </Row>
            </div>
            {orders.length !== 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Table Number</th>
                            <th>Order Time</th>
                            <th>Dish Name</th>
                            <th>Quantity</th>
                            <th style={{ width: '15vw' }}>Additional Info</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <React.Fragment key={order.id}>
                                {order.detail.map((detail, index) => (
                                    <tr key={detail.id}>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={order.detail.length}>{order.table_num}</td>
                                                <td rowSpan={order.detail.length}>{new Date(order.date).toLocaleTimeString()}</td>
                                            </>
                                        )}
                                        <td>{dishNames[detail.dishId]}</td>
                                        <td>{detail.quantity}</td>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={order.detail.length}>{order.additional_info}</td>
                                                <td rowSpan={order.detail.length}>${order.total_price}</td>
                                                <td rowSpan={order.detail.length}>
                                                    <Button
                                                        variant={order.status ? "success" : "danger"}
                                                        onClick={() => {
                                                            // Handle status change here, e.g., update the server
                                                        }}
                                                    >
                                                        {order.status ? 'Finished' : 'Unfinished'}
                                                    </Button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
            )}
            {orders.length === 0 && <h1>You have No order so far</h1>}
        </div>
    );
}

export default OrdersByDate;

