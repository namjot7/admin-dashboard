import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises'; // to save to localStorage
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';

const bucketName = "namjot-next-ecommerce";

// Save to local storage
export async function POST(req) {
    // Get the files from the request
    const data = await req.formData()
    const files = data.getAll('files')
    // console.log('data', data);
    // console.log(files);

    if (!files) {
        return NextResponse.json({ success: false });
    }
    const filepaths = [];

    // Upload each file to public/uploads
    for (const file of files) {
        // Unique file name to avoid duplicate images in Bucket
        const ext = file.name.split('.').pop() // pop() removes the last element from an array and returns that element
        const newFilename = Date.now() + "." + ext;
        // console.log({ ext, file });
        // console.log(newFilename);

        // Convert file to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)
        const filepath = `public/uploads/${newFilename}` //public/uploads/
        // console.log(filepath);
        await writeFile(filepath, buffer); // filepath, image binary data 

        filepaths.push(filepath);
    }
    return NextResponse.json({ filepaths });
}
// Save to AWS S3 Bucket
// export async function POST(req) {
//     // Get the files from the request
//     const data = await req.formData()
//     const files = data.getAll('files')
//     // console.log('data', data);
//     // console.log(files);

//     if (!files) return NextResponse.json({ success: false });

//     // AWS S3 Bucket
//     const client = new S3Client({
//         region: 'us-east-1',
//         credentials: {
//             accessKeyId: process.env.S3_ACCESS_KEY,
//             secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//         },
//     });
//     const filepaths = [];

//     // Upload each file to AWS
//     for (const file of files) {
//         // Unique file name to avoid duplicate images in Bucket
//         const ext = file.name.split('.').pop() // pop() removes the last element from an array and returns that element
//         const newFilename = Date.now() + "." + ext;
//         // console.log({ ext, file });
//         // console.log(newFilename);

//         // Convert file to Buffer
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes)

//         // Upload to S3 bucket
//         client.send(new PutObjectCommand({
//             Bucket: bucketName,
//             Key: newFilename,
//             Body: buffer,
//             ACL: 'public-read',
//             ContentType: file.type,
//         }))
//         const link = `https://${bucketName}.s3.us-east-1.amazonaws.com/${newFilename}`;
//         filepaths.push(link);
//     }
//     return NextResponse.json({ filepaths });
// }

// disable the default bodyparser that parses the FormData

export const config = {
    api: {
        bodyParser: false,
    },
};
