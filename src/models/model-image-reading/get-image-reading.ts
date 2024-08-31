import mongoose, { Schema } from 'mongoose';
import {getImageReading} from "../../interfaces/image-reading";

const getImageReadingSchema: Schema = new Schema<getImageReading>({
     customer_code:{ type: String, required: true},
     measure_uuid: { type: String, required: true},
     measure_datetime: { type: Date, required: true},
     measure_type: { type: String, required: true},
     has_confirmed:{ type: Boolean, required: true},
     image_url: { type: String, required: true}
})

export default mongoose.model<getImageReading>('getImageReading', getImageReadingSchema)