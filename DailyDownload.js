'use strict';

const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");

const client = new S3Client();

module.exports.handler = async (event) => {
    const params = {
        Bucket: process.env.UPLOAD_BUCKET,
        Key: `files/daily-download-${new Date().toISOString().substr(0,10)}.txt`,
        Body: Buffer.from(`The data for ${new Date().toUTCString()}`)
    }

    if (event.fail) throw new Error("Random Error");

    const command = new PutObjectCommand(params);

    let response;
    try {
        response = await client.send(command);
    } catch (error) {
       console.error(error); 
    }

    return response;
};
