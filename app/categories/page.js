"use client"
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { withSwal } from 'react-sweetalert2';
import CrossIcon from '@/public/cross';

const Categories = ({ swal }) => {
    const [editingCategory, setEditingCategory] = useState(null);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [parentCategory, setparentCategory] = useState(""); // defined as string, the reason why in model, I need to use String 
    const [properties, setProperties] = useState([])

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
        // console.log("editing category", editingCategory);

        const data = {
            category,
            parentCategory,
            // Split the prop values from string into an array
            properties: properties.map(p => ({
                name: p.name,
                values: p.values.split(',')
            }))
        };
        // console.log(data);

        // Category already exists UPDATE Request
        if (editingCategory) {
            data._id = editingCategory._id; // add "Id" to data
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
        resetForm();
    }

    const editCategory = async (category) => {
        // console.log(category, category?.parent?.name);
        // console.log("UPDATE:", editingCategory);
        setEditingCategory(category);
        setCategory(category.name); // Send the values to above form to be updated
        setparentCategory(category.parent?._id);

        // Convert array back to string format
        setProperties(
            category.properties.map(({ name, values }) => ({
                name,
                values: values.join(','),
            }))
        );
    }
    const deleteCategory = async (category) => {
        // let res = confirm("Are you sure you want to delete this category: " + category.name);

        // react-sweetalert2: Custom confirm box
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: "Yes, Delete!",
            confirmButtonColor: "#dc2626",
        })
            .then(result => {
                if (result.isConfirmed) {
                    fetch('/api/categories', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(category), // Send the _id as an object
                    })
                    getCategories(); // refresh the page with deleted category
                }
            })
            .catch(error => console.log(error))

    }
    // Add the property to the array on clicking the 
    const addProperty = () => {
        setProperties(prev => {
            return [...prev, { name: '', values: '' }]; // add new property to editings properties
        });
    }
    // Handle Property feature
    const handlePropNameChange = (index, property, newPropName) => {
        // console.log({ index, property, newPropName });
        setProperties(prev => {
            const properties = [...prev]; // store previous properties in a new array
            properties[index].name = newPropName;
            return properties;
        })
    }
    const handlePropValueChange = (index, property, newPropValue) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newPropValue;
            return properties;
        })
    }
    const removeProperty = (indexToRemove) => {
        setProperties(prev => {
            const newProperties = [...prev].filter((prop, pIdx) => pIdx != indexToRemove)
            return newProperties; // return true and add them to newProp for 
            // whose the condition matches, i.e; pIndex is not same as the one we want to remove
        })
    }
    const resetForm = () => {
        setEditingCategory(null);
        setProperties([]);
        setCategory("");
        setparentCategory('');
    }

    // Load all the categories from MongoDB
    useEffect(() => {
        getCategories()
    }, [])


    return (
        <Layout>
            <h1>Categories</h1>
            <form onSubmit={e => saveCategory(e, null)} className="w-full md:w-3/4">
                <h1 className='text-xl mb-5 block'>{editingCategory ? `Edit Category: ${editingCategory.name}` : "Add a new Category"}</h1>
                <div>
                    <div className="flex gap-3">
                        <input type="text" placeholder='Category'
                            value={category} onChange={ev => setCategory(ev.target.value)} />

                        <select value={parentCategory} onChange={ev => setparentCategory(ev.target.value)}>
                            <option value="">No parent category</option>
                            {categories
                                .filter(category => !category.parent)  // filter only parent categories to display
                                .map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <label className='h2'>Properties</label>
                        <span><button onClick={ev => addProperty()} type='button' className='btn-secondary mb-2'>Add new property</button></span>

                        {properties.length > 0 && properties.map((property, index) => (
                            <div key={index} className='flex gap-2'>
                                <input value={property.name} onChange={ev => handlePropNameChange(index, property, ev.target.value)}
                                    type="text" placeholder='Property name (eg: color)' className='mb-1' />
                                <input value={property.values} onChange={ev => handlePropValueChange(index, property, ev.target.value)}
                                    type="text" placeholder='values (separated by comma)' className='mb-1' />

                                <button type='button' onClick={() => removeProperty(index)}>
                                    {/* <CrossIcon /> */}
                                    <svg width={"24px"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    {editingCategory && <button type='button' className='bg-white text-black text-base rounded-md py-1 px-3 mr-2'
                        onClick={e => resetForm()}>Cancel</button>
                    }
                    <button type='submit' className="btn-primary">Save</button>
                </div>
            </form>

            {!categories.length && <div className='my-10 ml-3'>No categories to show.</div>}
            {categories.length > 0 && !editingCategory && (
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
                                    <button onClick={e => editCategory(category)} className='flex-center btn-edit'>
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
export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
))