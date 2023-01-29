import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/posts', postRoutes);
app.use('/api/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('DALL-e-yo, everyone...');
});


const startServer = async () => {
    const port = process.env.PORT || 8080;
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error(error); 
    }

};

startServer();