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

## api/upload/route.js (other ways: Not working)
 
 ````
const form = new multiparty.Form();

const data = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject({ err });
            resolve({ fields, files });
        });
    })
    console.log(`data: `, JSON.stringify(data));
    // console.log('Fields:', fields);
    // console.log('Files:', files);
    res.status(200).json({ success: true });
````


### Uploading the filepath to S3 bucket (not working as I need to use multiparty/multer)
As I am usig direct method for POST the upload request, I am not gettig the filepath

```` 
file.readFileSync(filepath) 
````