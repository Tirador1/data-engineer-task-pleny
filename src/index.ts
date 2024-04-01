import express from 'express';
import * as dotenv from 'dotenv';

import { connectToDB } from './DB/connection';
import { globalResponse } from './middlewares/globalResponse';
import brandRouter from './modules/Brands/brand.routes';

dotenv.config({ path: __dirname + '/config/.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToDB();

app.use('/brands', brandRouter);

app.use(globalResponse);

app.listen(PORT, () => {
  console.log(`Server running at [http://localhost:${PORT}]`);
});
