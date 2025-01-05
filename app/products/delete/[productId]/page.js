"use client"
import Layout from '@/app/components/Layout'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Delete = ({ params }) => {
    const router = useRouter();

    const [productInfo, setproductInfo] = useState([])
    const { productId } = React.use(params); // Unwrap the params promise

    const deleteProduct = async () => {
        await fetch("/api/products", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productInfo),
        });
        router.push("/products");
    }
    // Get the product using ID
    useEffect(() => {
        if (!productId) { // No ID --> return
            return;
        }
        fetch("/api/products?id=" + productId)
            .then(res => res.json())
            .then(data => { setproductInfo(data) });
    }, [])

    return (
        <Layout>
            <div className='text-center mt-20'>
                <h1>Do you really want to delete product <span className='text-red-500'>{productInfo.title}</span> ?</h1>
                {/* <div className="flex gap-3 "> */}
                <button onClick={e => deleteProduct()} className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md mx-3'>Yes</button>
                <button onClick={e => router.push("/products")} className=' bg-slate-400 hover:bg-slate-500 px-3 py-1 rounded-md'>No</button>
                {/* </div> */}
            </div>
        </Layout>
    )
}

export default Delete