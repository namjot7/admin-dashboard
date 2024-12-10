"use client"
import Layout from '@/app/components/Layout'
import ProductForm from '@/app/components/ProductForm';
import React from 'react'

const AddProduct = () => {
    return (
        <Layout>
            <h1>New product</h1>
            <ProductForm />
        </Layout>
    )
}

export default AddProduct;