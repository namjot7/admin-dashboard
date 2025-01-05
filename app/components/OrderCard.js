import React, { useEffect, useState } from 'react'

const OrderCard = (product) => {
    let quantity = product.quantity;
    let price = product.price_data.unit_amount / 100; // cents to dollars
    let title = product.price_data.product_data.name;
    // console.log(product);

    const [products, setProducts] = useState([]);

    // Get the products when page is loaded
    // useEffect(() => {
    //     fetch("/api/products")
    //         .then(res => res.json())
    //         .then(data => setProducts(data));
    // }, [])
    // console.log(products);

    return (
        <div className='px-4 py-3 border-2 border-gray-500 m-3 rounded-md'>
            <h3>Order Item:</h3>
            <div className="flex gap-5">
                <img className='w-28 rounded-md'
                    src='https://image.made-in-china.com/155f0j00mtZGLEbKHior/1-1-Copy-Ipone-X-Mobile-Phone-5-0-Inch-HD-Screen-with-1g-RAM-16g-ROM-Cellphone.webp' alt="" />
                <div>
                    {/* <span className='text-gray-300'>Category</span> */}
                    <p>{title}</p>
                    <div className='flex gap-3 mt-1 items-center'>
                        <span>{quantity} x ${price}</span>
                        <span className='btn-outline'>${quantity * price}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard