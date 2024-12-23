"use client"
import Layout from '@/app/components/Layout'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Product = () => {
    const [products, setProducts] = useState([]);

    // Get the products when page is loaded
    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    return (
        <Layout>
            <Link href="/products/add" className='bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 absolute top-20 right-4 md:top-6 md:right-28 bg-primary hover:bg-primary_hover rounded-md py-1 px-3'>Add Product</Link>
            <h1>All Products</h1>

            <table className='basic'>
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td className='flex gap-3'>
                                {/* {`/products/edit/${p_id}`} */}
                                <Link href={"/products/edit/" + product._id} className='btn-edit'>
                                    <img src="edit.svg" />
                                    <span>Edit</span>
                                </Link>
                                <Link href={"/products/delete/" + product._id} className='btn-delete '>
                                    <img src="delete.svg" />
                                    <span>Delete</span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Product