import { Request, Response } from 'express';
import getImageReadingSchema from '../../models/model-image-reading/get-image-reading';

const getImageReading = async (req: Request, res: Response) => {
    const { customerCode } = req.params;
    const { measure_type } = req.query;

    try {

        let filter: any = { customerCode };

        if (measure_type) {

            const validMeasureTypes = ['WATER', 'GAS'];
            const measureTypeUpperCase = (measure_type as string).toUpperCase();

            if (!validMeasureTypes.includes(measureTypeUpperCase)) {
                return res.status(400).json({ error_code: 'INVALID_MEASURE_TYPE', error_description: 'measure_type must be either WATER or GAS' });
            }

            filter.measure_type = measureTypeUpperCase;
        }

        const data = await getImageReadingSchema.find(filter);

        if (data.length === 0) {
            return res.status(404).json({ message: 'No data found for the given customer code and measure type' });
        }

        return res.json(data);
    } catch (error: any) {
        return res.status(400).json({ error_code: 'INVALID_DATA', error_description: error.message });
    }
}

export default getImageReading