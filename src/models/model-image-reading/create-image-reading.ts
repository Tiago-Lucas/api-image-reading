import mongoose, { Schema } from 'mongoose';
import {ImageReading} from "../../interfaces/image-reading";

const ImageReadingSchema: Schema = new Schema<ImageReading>({
    image: { type: String, required: true},
    customer_code: {type: String, required: true},
    measure_datetime:{type:Date, default: Date.now},
    measure_type: {type:String, required:true}
})

export default mongoose.model<ImageReading>('ImageReading', ImageReadingSchema)