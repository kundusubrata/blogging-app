import express from 'express';
import "dotenv/config";
import userRoutes from './routes/user.routes';

const app = express();
const port = process.env.PORT || 7000;
console.log('port',port);


app.use('/api/v1',(userRoutes));


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});