import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { valdationMiddleware } from '../../middlewares/validation';
import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from './brand.controller';
import { BrandSchema } from './brand.schema';

const brandRouter = Router();

brandRouter.post(
  '/',
  valdationMiddleware(BrandSchema),
  asyncHandler(createBrand)
);

brandRouter.get('/', asyncHandler(getBrands));

brandRouter.put(
  '/:id',
  valdationMiddleware(BrandSchema),
  asyncHandler(updateBrand)
);

brandRouter.delete('/:id', asyncHandler(deleteBrand));

export default brandRouter;
