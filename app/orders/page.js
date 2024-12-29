"use client"
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'

const Orders = () => {
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const res = await fetch("/api/orders");
        const data = await res.json();
        console.log(data);
        setOrders(data);

    }
    useEffect(() => {
        getOrders();
    }, [])


    return (
        <Layout>
            <h1>All Orders</h1>
            <table className='basic'>
                <thead>
                    <tr>
                        <td>Order Date</td>
                        <td>Recipient</td>
                        <td>Products</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr key={order._id}>
                            <td>
                                {(new Date(order.createdAt)).toDateString()} at&nbsp;
                                {(new Date(order.createdAt)).toLocaleTimeString().substring(0, 4)}&nbsp;
                                {(new Date(order.createdAt)).toLocaleTimeString().substring(8)}
                                {/* Time is in UTC Universal: 5 hours ahead from Toronto */}
                                {/* {order.createdAt
                                    .replace('T', ' ')
                                    .substring(0, 16)} */}
                            </td>
                            <td>
                                {order.username} {order.email} <br />
                                {order.streetAddress} {order.city} <br />
                                {order.postalCode} {order.country} <br />

                            </td>
                            <td>
                                {order.products.map(product => (
                                    <span key={product.price_data.product_data.name}>
                                        {product.price_data.product_data.name} x {product.quantity}<br />
                                    </span>
                                ))}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </Layout>
    )
}

export default Orders