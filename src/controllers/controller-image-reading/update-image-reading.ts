import { Request, Response } from 'express';
import  ImageReadingSchema  from '../../models/model-image-reading/update-image-reading';

const updateImageReading = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { measure_uuid, confirmed_value } = req.body;

        if (typeof measure_uuid !== 'string' || typeof confirmed_value !== 'number') {
            return res.status(400).json({ message: 'Tipo de dado inválido. "measure_uuid" deve ser uma string e "confirmed_value" deve ser um número inteiro.' });
        }

        const imageReading = await ImageReadingSchema.findById(measure_uuid);
        if (!imageReading) {
            return res.status(404).json({ message: 'Código de leitura não encontrado.' });
        }

        if (imageReading.confirmed_value !== undefined) {
            return res.status(400).json({ message: 'O valor já foi confirmado anteriormente.' });
        }

        imageReading.confirmed_value = confirmed_value;
        await imageReading.save();

        return res.status(200).json({ message: 'Valor confirmado com sucesso.' });
    } catch (error: any) {
        return res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR', error_description: error.message });
    }
};

export default updateImageReading;