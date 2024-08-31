import express from 'express';
import upload from '../utils/multer-config';
import createImageReading from "../controllers/controller-image-reading/create-image-reading";
import getImageReading from "../controllers/controller-image-reading/get-image-reading";
import updateImageReading from "../controllers/controller-image-reading/update-image-reading";


const routes = express.Router();

routes.post('/upload', upload.single('image'), createImageReading);
routes.get('/:customer_code/list', getImageReading)
routes.patch('/confirm', updateImageReading)

export default routes;