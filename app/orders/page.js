"use client"
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import OrderCard from '../components/OrderCard'

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
            <table className='basic !m-0 hidden md:block'>
                <thead>
                    <tr>
                        <td>Order Date</td>
                        <td>Paid</td>
                        <td>Recipient</td>
                        <td>Products</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr key={order._id}>
                            <td>
                                {/* Time is in UTC Universal: 5 hours ahead from Toronto */}
                                {(new Date(order.createdAt)).toLocaleString()}
                                {/* OR */}
                                {/* {(new Date(order.createdAt)).toDateString()} at&nbsp;
                    {(new Date(order.createdAt)).toLocaleTimeString().substring(0, 4)}&nbsp;
                    {(new Date(order.createdAt)).toLocaleTimeString().substring(8)} */}
                            </td>
                            <td className={order.paid ? "text-green-500" : 'text-red-500'}>
                                {order.paid ? "YES" : "NO"}
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

            {/* For mobile */}
            {orders.length > 0 && orders.map(order => {
                let orderTotal = 0;
                return (
                    <div key={order._id} className='block md:hidden bg-gray-100  dark:bg-slate-700 p-5 rounded-md mb-10 shadow-sm shadow-gray-400 dark:shadow-slate-600'>
                        {/* Order Info */}
                        <h2>
                            Order Summary:
                            <span className={`${order.paid ? "text-green-400" : 'text-red-500'} ml-8`}>
                                {order.paid ? "Paid" : 'Pending'}
                            </span>
                        </h2>
                        <span className='text-gray-800 dark:text-gray-200'>{(new Date(order.createdAt)).toLocaleString()}</span>
                        <h3 className='mt-5 text-gray-800 dark:text-gray-200'>
                            Order Id:&nbsp;
                            <span className='font-normal'>{order._id}</span>
                        </h3>
                        {/* Customer info */}
                        <div className='text-gray-800 dark:text-gray-200'>
                            <div>
                                Customer:&nbsp;
                                {order.username} ({order.email})
                            </div>
                            <div>
                                Address:{order.streetAddress} {order.city},
                                {order.postalCode} {order.country}
                            </div>
                        </div>
                        {/* Products */}
                        {order.products.map((product, index) => {
                            let quantity = product.quantity;
                            let price = product.price_data.unit_amount / 100; // cents to dollars
                            orderTotal = orderTotal + (quantity * price)
                            // console.log(orderTotal);
                            return (
                                <OrderCard key={index} {...product} />
                            )
                        })}
                        <h2>Order Total: ${orderTotal}</h2>
                    </div>
                )
            })}
        </Layout>
    )
}

export default Orders