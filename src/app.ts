import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import routes from "./routes";
import http from 'http';
import path from 'path';

dotenv.config()

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3200;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI, {

}).then(() => {
    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.error('Database connection error', error)
})

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

app.use((req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATH, OPTIONS');
    next();
});


app.use('', routes)

export default app