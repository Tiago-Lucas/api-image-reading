import mongoose, { Document } from 'mongoose';

export interface ImageReading extends Document {
    image: string;
    customer_code:string;
    measure_datetime:Date;
    measure_type:string;
}

export interface getImageReading extends Document {
    customer_code:string;
    measure_uuid: string,
    measure_datetime: Date,
    measure_type: string,
    has_confirmed:boolean,
    image_url: string
}

export interface updateImageReading extends Document {
    measure_uuid: string,
    confirmed_value:number
}