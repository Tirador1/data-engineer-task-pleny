import { Request, Response, NextFunction } from 'express';

import Brand from '../../DB/models/brand.schema';
import { IBrand } from '../../interfaces/brand.interface';

export const createBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { brandName, yearFounded, headquarters, numberOfLocations } =
    req.body as IBrand;

  const newBrand: IBrand = await Brand.create({
    brandName,
    yearFounded,
    headquarters,
    numberOfLocations,
  });

  if (!newBrand) {
    return next({
      message: 'Brand could not be created',
      status: 500,
    });
  }

  res.status(201).send({ newBrand });
  return;
};

export const getBrands = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const brands: IBrand[] = await Brand.find({});

  if (!brands) {
    return next({
      message: 'No brands found',
      status: 404,
    });
  }

  res.status(200).send({ brands });
  return;
};

export const updateBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { brandName, yearFounded, headquarters, numberOfLocations } =
    req.body as IBrand;

  const updatedBrand: IBrand | null = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      brandName,
      yearFounded,
      headquarters,
      numberOfLocations,
    },
    { new: true }
  );

  if (!updatedBrand) {
    return next({
      message: 'Brand could not be updated',
      status: 500,
    });
  }

  res.status(200).send({ updatedBrand });
  return;
};

export const deleteBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const deletedBrand: IBrand | null = await Brand.findByIdAndDelete(
    req.params.id
  );

  if (!deletedBrand) {
    return next({
      message: 'Brand could not be deleted',
      status: 500,
    });
  }

  res.status(200).send({ deletedBrand });
  return;
};
