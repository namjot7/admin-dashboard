"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProductForm = ({
    title: currTitle,
    description: currDescription,
    price: currPrice,
    _id,
    images
}) => {
    const router = useRouter();
    // console.log(currTitle, currDescription, currPrice, _id);

    const [title, setTitle] = useState(currTitle || "");
    const [description, setDescription] = useState(currDescription || "");
    const [price, setPrice] = useState(currPrice || "");

    // update state for form fields when props change
    useEffect(() => {
        setTitle(currTitle || "");
        setDescription(currDescription || "");
        setPrice(currPrice || "");
    }, [currTitle, currDescription, currPrice])

    // Form submission
    const saveProduct = async (e) => {
        e.preventDefault();

        const productData = {
            title, description, price, _id
        };
        // console.log(productData);

        // Watch the video to send data using AXIOS
        console.log("productData", productData);

        // UPDATE the product if ID exits
        if (_id) {
            await fetch("/api/products", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            })
        }
        // POST (CREATE) the data if ID does not exist
        else {
            await fetch("/api/products", {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart',
                },
                body: JSON.stringify(productData),
            })
        }
        // setgotoProducts(true); // might not need
        router.push('/products'); // redirect to the products page
    }
    const uploadImages = async (e) => {
        const files = e.target?.files; // e.target?.files
        console.log(files);

        if (!files || files.length == 0) {
            console.error('No files selected');
            return;
        }
        const data = new FormData();

        // files are stored in a FileList (array like) object, convert it into an Array to use forEach
        for (const file of files) {
            data.append('files', file)
            // console.log(file);
        }
        // or 
        // Array.from(files).forEach(file => data.append('files', file)) // Add each file to FormData

        // Print Formdata object
        for (let pair of data.entries()) { // let [key,value] of data.entries()
            // console.log(pair);
        }
        const response = await fetch('/api/upload', {
            method: 'POST', // headers are automatically added using FormData
            body: data,
        })
        // const res = await axios.post('/api/upload', data)
        // console.log(res.data);
    }

    return (
        <form onSubmit={e => { saveProduct(e) }} className='w-[300px]'>
            <div className='flex flex-col gap-1'>
                <label>Name</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
                <label>Description</label>
                <textarea name="description" id="" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
                <label>Price (in CAD)</label>
                <input name='price' type="text" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
                <label>Photos</label>

                {!images?.length && <div>No images to show</div>}
                <label className='cursor-pointer w-28 h-24 flex gap-1 mb-5 items-center rounded-md bg-gray-200 text-gray-500'>
                    <img src="/upload.svg" alt="" />
                    Upload
                    <input type="file" onChange={e => uploadImages(e)} className='hidden' name="" id="" multiple />
                </label>
            </div>
            <button type='submit' className='btn-primary'>Save</button>
        </form>
    )
}

export default ProductForm
