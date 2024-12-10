## products/route.js
### Inside POST request in 
```` 
if (!title || !description || !price) {
         return NextResponse.json(
            { error: "Missing required fields: title, description, or price" },
            { status: 400 }
        );
 }

````

### can add try and catch

---
## productForm.js

### Go to the products page after adding a new product
     if (gotoProducts) {
         router.push('/products');
     }


