"use client"
// import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SpinnerDotted } from 'spinners-react';

const ProductForm = ({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages
}) => {
    const router = useRouter();
    // console.log(existingTitle, existingDescription, existingPrice, _id);

    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [images, setImages] = useState(existingImages || []);

    const [loading, setLoading] = useState(false) // spin animation on uploading image

    // To load the existing product details on opening the page / update state for form fields when props change
    useEffect(() => {
        setTitle(existingTitle || "");
        setDescription(existingDescription || "");
        setPrice(existingPrice || "");
        setImages(existingImages || []);
    }, [existingTitle, existingDescription, existingPrice, existingImages])

    // Form submission
    const saveProduct = async (e) => {
        e.preventDefault();

        const productData = { title, description, price, _id, images };
        console.log("productData", productData);

        // Watch the video to send data using AXIOS

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


    useEffect(() => {
        console.log('Useffect:', images);
    }, [images]);

    const uploadImages = async (e) => {
        const files = e.target?.files; // e.target?.files
        // console.log(files);
        setLoading(true);

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
        // for (let pair of data.entries()) { // let [key,value] of data.entries()
        //     console.log(pair);
        // }
        const res = await fetch('/api/upload', {
            method: 'POST', // headers are automatically added using FormData
            body: data,
        })
            .then(res2 => res2.json())
            // 1) Save to AWS S3 Bucket
            //     .then(linksData => { // links or paths
            //         setImages(prevImages => [...prevImages, ...linksData.links]);
            //         // console.log('Uploaded images:', ...linksData.links);
            //     })
            // 2) Save to local storage
            .then(paths => {
                // console.log("paths:", paths.filepaths);
                for (let filePath of paths.filepaths) {
                    let newPath = filePath.split("public")[1]; // remove public from the path to use it in image "src" attribute
                    // console.log({ filePath, newPath });
                    setImages(prevImages => [...prevImages, newPath]);
                }
            })
        setLoading(false);
    }

    return (
        <form onSubmit={e => { saveProduct(e) }} className='max-w-[600px] ml-10'>
            <div className='flex flex-col gap-1'>
                <label>Name</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
                <label>Description</label>
                <textarea name="description" id="" value={description} onChange={e => setDescription(e.target.value)} rows={5} />
            </div>
            <div className='flex flex-col gap-1'>
                <label>Price (in CAD)</label>
                <input name='price' type="text" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
                <label>Photos</label>

                <div className="flex flex-wrap gap-1.5">
                    {/* AWS */}
                    {/* {!!images.length && images.map(link => (
                        <div key={link} className="w-28 h-28">
                            <img className="rounded-lg w-full h-full object-fill" src={`${link}?t=${Date.now()}`} alt="productImage" />
                        </div>
                    ))} */}

                    {/* Public folder */}
                    {!!images.length && images.map((filepath) => (
                        <div key={filepath} className="bg-white p-2 rounded-lg w-24 h-24">
                            <img className="rounded-lg w-full h-full object-fill" src={filepath} alt="productImage" />
                        </div>
                    ))}
                    {/* <img src="/uploads/1734319282217.jpg" alt="" /> */}

                    {loading && <SpinnerDotted size="40px" color='#1a56db' />}

                    <label className='cursor-pointer w-24 h-24 flex gap-1 items-center rounded-lg bg-gray-200 text-gray-500'>
                        <img src="/upload.svg" alt="" />Upload
                        <input type="file" onChange={e => uploadImages(e)} className='hidden' name="" id="" multiple />
                    </label>
                </div>
            </div>
            <button type='submit' className='btn-primary mt-5'>Save</button>

        </form >
    )
}

export default ProductForm
