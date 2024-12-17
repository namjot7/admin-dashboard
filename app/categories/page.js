"use client"
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
// import Link from 'next/link';

const Categories = () => {
    const [existingCategory, setExistingCategory] = useState(null);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [parentCategory, setparentCategory] = useState(""); // defined as string, the reason why in model, I need to use String 

    // Fetch all the categories
    const getCategories = async () => {
        const res = await fetch('/api/categories');
        const data = await res.json();
        // console.log(data.categories);
        // console.log(categories);
        setCategories(data.categories);
    }


    // Save category to Mongo
    const saveCategory = async (e) => {
        e.preventDefault();
        console.log("existing category", existingCategory);

        const data = {
            category,
            parentCategory
        };
        // Category already exists UPDATE Request
        if (existingCategory) {
            data._id = existingCategory._id; // add "Id" to data

            await fetch('/api/categories', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
        // Else POST request
        else {
            await fetch('/api/categories', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
        getCategories();
        setCategory(""); // empty the input field after submitting the form
        // setparentCategory("");
    }
    // Load all the categories from MongoDB
    useEffect(() => {
        getCategories()
    }, [])

    const updateCategory = async (category) => {
        console.log(category, category?.parent?.name);
        setExistingCategory(category);
        console.log("UPDATE:", existingCategory);

        setCategory(category.name); // Send the values to above form to be updated
        setparentCategory(category.parent?._id);
    }
    const deleteCategory = async (category) => {
        let res = confirm("Are you sure you want to delete this category: " + category.name);
        // console.log(category);
        // console.log(res); // true or false: "OK" and "CANCEL"
        if (res) {
            await fetch('/api/categories', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category), // Send the _id as an object
            })
            getCategories(); // refresh the page with deleted category
        }
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <form onSubmit={e => saveCategory(e, null)} className="w-full md:w-3/4">
                <label className='text-xl mb-5 block'>Add a new Category</label>
                <div className="flex gap-3">
                    <input type="text" placeholder='Category' className='mb-0'
                        value={category} onChange={e => setCategory(e.target.value)} />

                    <select value={parentCategory} onChange={e => setparentCategory(e.target.value)} className='mb-0'>
                        <option value="">No parent category</option>
                        {categories
                            .filter(category => !category.parent)  // filter only parent categories to display
                            .map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                    </select>
                    <button className="btn-primary">Save</button>
                </div>
            </form>

            {!categories.length && <div className='my-10 ml-3'>No categories to show.</div>}
            {categories.length > 0 && (
                <table className="basic">
                    <thead>
                        <tr>
                            <td>Category Name</td>
                            <td>Parent Category</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>{category?.parent?.name || "-"}</td>
                                <td className='flex-center'>
                                    <button onClick={e => updateCategory(category)} className='flex-center btn-edit'>
                                        <img src="edit.svg" />
                                        <span>Edit</span>
                                    </button>
                                    <button onClick={e => deleteCategory(category)} className='flex-center btn-delete'>
                                        <img src="delete.svg" />
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    )
}

export default Categories