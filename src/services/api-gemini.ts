import {GoogleGenerativeAI} from "@google/generative-ai";
import * as fs from "node:fs";
import path from 'path';

require("dotenv").config()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const genAi = new GoogleGenerativeAI(GEMINI_API_KEY || '')

function convertImageToBase64(filePath: string): string {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer.toString('base64');
}

function getImageUrl(fileName: string): string {
    const folderPath = path.join(process.cwd(), 'assets/images');
    const filePath = path.join(folderPath, fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error('Image file not found');
    }

    return filePath;
}


export default async function apiGemini(imageFilePath: string): Promise<string> {

    const imageBase64 = fs.readFileSync(imageFilePath).toString('base64');

    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = "me traga apenas o valor numerico da medição imagem ?";

    const imagePart = [{ inlineData: { data: imageBase64, mimeType: 'image/jpeg' } }];

    const result = await model.generateContent([prompt, ...imagePart]);
    const response = result.response;

    return response.text();
}