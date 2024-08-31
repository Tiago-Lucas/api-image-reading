import { Request, Response } from 'express';
import  isEmptyObject  from '../../utils/helper';
import ImageReadingSchema from '../../models/model-image-reading/create-image-reading';
import apiGemini from "../../services/api-gemini";
import path from "path";

const createImageReading = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (isEmptyObject(req.body) && !req.file) {
            return res.status(400).send({ data: null, message: 'Requisicão inválida. Verifique as informações e tente novamente.' });
        }

        // const { buffer, originalname } = req.file;
        const imagePath = req.file?.filename;
        const { customer_code, measure_type } = req.body;


        const imageReading = new ImageReadingSchema({
            customer_code,
            measure_type,
            image: imagePath,
        });

        await imageReading.save();

        const imageFullPath = path.join(process.cwd(), 'assets/images', imagePath);
        const measureValue = await apiGemini(imageFullPath)


        const response = {
            image_url: `${req.protocol}://${req.get('host')}/assets/images/${imageReading.image}`,
            measure_value: parseInt(measureValue),
            measure_uuid: imageReading.id,
        };
        return res.status(201).send(response);
    } catch (error: any) {
        return res.status(400).json({ error_code: 'INVALID_DATA', error_description: error.message });
    }
};

export default createImageReading
