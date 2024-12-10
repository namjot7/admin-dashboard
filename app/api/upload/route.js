import { NextResponse } from 'next/server';
import multiparty from 'multiparty';
import { Readable } from 'stream';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
    const data = await req.formData()
    const files = data.get('files')
    console.log('file:', files);

    if (!files) return NextResponse.json({ success: "Not uploaded. Error." });

    const bytes = await files.arrayBuffer();
    const buffer = Buffer.from(bytes)
    const filepath = `${files.name}` //public/uploads/
    await writeFile(filepath, buffer)

    console.log(filepath);


    return NextResponse.json({ success: true });
    // const form = new multiparty.Form();

    // const data = await new Promise((resolve, reject) => {
    //     form.parse(req, (err, fields, files) => {
    //         if (err) reject({ err });
    //         resolve({ fields, files });
    //     });
    // })
    // console.log(`data: `, JSON.stringify(data));
    // // console.log('Fields:', fields);
    // // console.log('Files:', files);
    // res.status(200).json({ success: true });
}

// disable the default bodyparser that parses the FormData
export const config = {
    api: {
        bodyParser: false,
    },
};
