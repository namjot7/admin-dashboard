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
            <Link href="/products/add" className='btn-primary'>Add Product</Link>
            <table className='basic mt-12'>
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
                                <Link href={"/products/edit/" + product._id} className='bg-primary hover:bg-primary_hover flex gap-2 px-2 py-1 rounded-md '>
                                    <span><img src="edit.svg" /> Edit</span>
                                </Link>
                                <Link href={"/products/delete/" + product._id} className='bg-red-600 hover:bg-red-700 flex gap-2 px-2 py-1 rounded-md '>
                                    <span><img src="delete.svg" /> Delete</span>
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