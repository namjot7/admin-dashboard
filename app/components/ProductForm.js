"use client"
// import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs';
// import Sortable from 'sortablejs';
import { SpinnerDotted } from 'spinners-react';

const ProductForm = ({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: existingCategory,
    properties: existingProperties,
}) => {
    const router = useRouter();
    // console.log(existingTitle, existingDescription, existingPrice, _id);
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [images, setImages] = useState(existingImages || []);
    const [category, setCategory] = useState(existingCategory || "") // value of <select> cannot be null
    const [productProperties, setProductProperties] = useState(existingProperties || {});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false) // spin animation on uploading image

    // To load the existing product details on opening the page / update state for form fields when props change
    useEffect(() => {
        setTitle(existingTitle || "");
        setDescription(existingDescription || "");
        setPrice(existingPrice || "");
        setImages(existingImages || []);
        setCategory(existingCategory || "");
        setProductProperties(existingProperties || {});
    }, [existingTitle, existingDescription, existingPrice, existingImages, existingCategory, existingProperties])

    // Form submission
    const saveProduct = async (e) => {
        e.preventDefault();

        const productData = { title, description, price, _id, images, category, productProperties };
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
        router.push('/products'); // redirect to the products page
        // setgotoProducts(true); // might not need
    }
    const uploadImages = async (e) => {
        const files = e.target?.files; // e.target?.files
        // console.log(files);
        setLoading(true);

        if (!files || files.length == 0) {
            console.error('No files selected');
            setLoading(false);
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
        // 1) Save to local storage
        const paths = await res.json()
        const tempPaths = [];

        for (let filePath of paths.filepaths) {
            let newPath = filePath.split("public")[1]; // remove public from the path to use it in image "src" attribute
            tempPaths.push(newPath)
            // console.log("paths:", paths.filepaths);
            // console.log({ filePath, newPath });
        }
        // 2) Save to AWS S3 Bucket (Made some changes, unsure if it works)
        // const links = await res.json()
        // const tempLinks = [];

        // for (let link of links.links) {// links
        //     tempLinks.push(link)
        //     // console.log('Uploaded images:', ...linksData.links);
        // }

        // Delay by 1000ms
        setTimeout(() => {
            setImages(prevImages => [...prevImages, ...tempPaths]); // Public folder
            // setImages(prevImages => [...prevImages, ...tempLinks]); // AWS
            setLoading(false);
        }, 1000);
    }
    // Update the sorted images
    // const updateImagesOrder = (images) => {
    //     console.log(images);

    // }
    const updateImagesOrder = (images) => {
        // console.log("sorted func", arguments); // three arguments: images Array, (do not know what the fuck the other two are) parent div, dragging object
        // console.log(images);
        setImages(images)
    }

    const getCategories = async () => {
        const res = await fetch('/api/categories');
        const data = await res.json();
        // console.log(data.categories);
        // console.log(categories);
        setCategories(data.categories);
    }

    useEffect(() => {
        getCategories();
    }, []);

    // Show the properties in Product page
    const propertiesToFill = [];
    if (categories.length > 0 && category) { // categories exists and editing one specific category
        const categoryInfo = categories.find(({ _id }) => _id == category);
        propertiesToFill.push(...categoryInfo.properties); // adding to existing elements
        // console.log(categoryInfo);
        // console.log(propertiesToFill);

        // Add parent properties to child if they exists
        if (categoryInfo?.parent?._id) {
            let parentInfo = categoryInfo.parent;
            let parentProps = parentInfo?.properties;
            propertiesToFill.push(...parentProps)
            // console.log("paretn exists", parentInfo.properties);
            // console.log({ withParent: propertiesToFill });
        }
    }
    const setProductProp = (propName, value) => {
        setProductProperties(prev => {
            const newProductProp = { ...prev };
            newProductProp[propName] = value;
            console.log(newProductProp, newProductProp[propName]);
            return newProductProp;
        })

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
                <label>Category</label>

                <select value={category}
                    onChange={e => setCategory(e.target.value)}>
                    <option value="">Uncategorized</option>
                    {categories.length > 0 && categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col gap-1'>
                <label>Description</label>
                <textarea name="description" id="" value={description} onChange={e => setDescription(e.target.value)} rows={5} />
            </div>
            <div className='flex flex-col gap-1'>
                <label>Price (in CAD)</label>
                <input name='price' type="text" value={price} onChange={e => setPrice(e.target.value)} />
            </div>

            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                <div key={p.name}>
                    <label>{p.name}</label>
                    <select value={productProperties[p.name]} onChange={e =>
                        setProductProp(p.name, e.target.value)
                    }>
                        <option value="0">None</option>
                        {p.values.length > 0 && p.values.map(value =>
                            <option key={value} value={value}>{value}</option>
                        )}
                    </select>
                </div>
            ))}

            <div className='flex flex-col gap-1'>
                <label>Photos</label>

                <div className="flex flex-wrap gap-2">
                    {/* AWS */}
                    {/* {!!images.length && images.map(link => (
                        <div key={link} className="w-28 h-28">
                            <img className="rounded-lg w-full h-full object-fill" src={`${link}?t=${Date.now()}`} alt="productImage" />
                        </div>
                    ))} */}

                    {/* Public folder */}
                    <ReactSortable className="flex flex-wrap gap-2"
                        list={images} setList={updateImagesOrder}>
                        {!!images.length && images.map((filepath) => (
                            <div key={filepath} className="bg-white p-2 rounded-lg w-24 h-24">
                                <img className="rounded-lg w-full h-full object-fill" src={filepath} alt="productImage" />
                            </div>
                        ))}
                    </ReactSortable>

                    {loading && (
                        <div className='h-24 w-24 flex justify-center items-center'>
                            <SpinnerDotted size="35px" color='white' />
                        </div>
                    )}

                    <label className='cursor-pointer w-24 h-24 flex gap-1 items-center rounded-lg bg-gray-200 text-gray-500'>
                        <img src="/upload.svg" alt="" />Upload
                        <input type="file" onChange={e => uploadImages(e)} className='hidden' name="" id="" multiple />
                    </label>
                </div>
            </div>
            <button type='submit' className='btn-primary mt-5 w-full'>Save</button>

        </form >
    )
}

export default ProductForm
