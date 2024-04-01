import Joi from 'joi';

export const BrandSchema = Joi.object({
  brandName: Joi.string().required(),
  yearFounded: Joi.number().required(),
  headquarters: Joi.string().required(),
  numberOfLocations: Joi.number().required(),
});
