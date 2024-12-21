"use client"
import Layout from '@/app/components/Layout';
import ProductForm from '@/app/components/ProductForm';
import React, { useEffect, useState } from 'react';

const EditProduct = ({ params }) => {
    const [productInfo, setProductInfo] = useState([])

    const { productId } = React.use(params); // Unwrap the params promise
    // console.log(React.use(params));
    // console.log(productId);

    // Get the product using ID
    const getData = async (productId) => {
        await fetch("/api/products?id=" + productId)
            .then(res => res.json())
            .then(data => setProductInfo(data)); // store product data inside State variable
    }
    useEffect(() => {
        if (!productId) { // No ID --> return
            return;
        }
        getData(productId);
    }, [productId])

    return (
        <Layout>
            <h1>Edit product</h1>
            <ProductForm {...productInfo} />
        </Layout>
    )
};

export default EditProduct;