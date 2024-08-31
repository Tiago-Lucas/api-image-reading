import mongoose, { Schema } from 'mongoose';
import {updateImageReading} from "../../interfaces/image-reading";

const updateImageReadingSchema: Schema = new Schema<updateImageReading>({
    measure_uuid: { type: String },
    confirmed_value: {typer: Number}
})

export default mongoose.model<updateImageReading>('UpdateImageReading', updateImageReadingSchema)