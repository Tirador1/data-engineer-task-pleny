import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Brand from './DB/models/brand.schema';
import { IBrand } from './interfaces/brand.interface';

dotenv.config({ path: __dirname + '/config/.env' });

import { connectToDB } from './DB/connection';
connectToDB();

async function transformData() {
  try {
    const brands: any[] = await JSON.parse(
      fs.readFileSync(__dirname + '/data/brands.json', 'utf-8')
    );
    let brandObject: IBrand = {
      _id: new mongoose.Types.ObjectId(),
      brandName: 'Unknown',
      yearFounded: 1600,
      headquarters: 'Unknown',
      numberOfLocations: 1,
    };
    for (const brand of brands) {
      brandObject = {
        _id: new mongoose.Types.ObjectId(),
        brandName: 'Unknown',
        yearFounded: 1600,
        headquarters: 'Unknown',
        numberOfLocations: 1,
      };

      const brand_id = await Brand.findOne({ _id: brand._id.$oid });

      if (
        !brand_id &&
        brand._id &&
        brandObject._id &&
        brand._id.$oid &&
        mongoose.Types.ObjectId.isValid(brand._id.$oid)
      ) {
        brandObject._id = new mongoose.Types.ObjectId(brand._id.$oid);
      } else if (
        brand._id &&
        brand._id.$oid &&
        brandObject._id &&
        !mongoose.Types.ObjectId.isValid(brand._id.$oid)
      ) {
        brandObject._id = new mongoose.Types.ObjectId();
      }

      if (brand.brandName && typeof brand.brandName === 'string') {
        brandObject.brandName = brand.brandName;
      } else if (!brand.brandName && brand.brand.name) {
        brandObject.brandName = brand.brand.name;
      } else {
        brandObject.brandName = 'Unknown';
      }

      if (brand.yearFounded && typeof brand.yearFounded === 'number') {
        brandObject.yearFounded = brand.yearFounded;
      } else if (brand.yearFounded && typeof brand.yearFounded !== 'number') {
        let number = parseInt(brand.yearFounded);
        if (number) {
          brandObject.yearFounded = number;
        } else {
          brandObject.yearFounded = 1600;
        }
      } else if (
        !brand.yearFounded &&
        brand.yearCreated &&
        typeof brand.yearCreated === 'number'
      ) {
        brandObject.yearFounded = brand.yearCreated;
      } else if (
        !brand.yearFounded &&
        brand.yearCreated &&
        typeof brand.yearCreated !== 'number'
      ) {
        let number = parseInt(brand.yearCreated);
        if (number) {
          brandObject.yearFounded = number;
        } else {
          brandObject.yearFounded = 1600;
        }
      } else if (
        !brand.yearFounded &&
        !brand.yearCreated &&
        brand.yearsFounded &&
        typeof brand.yearsFounded === 'number'
      ) {
        brandObject.yearFounded = brand.yearsFounded;
      } else if (
        !brand.yearFounded &&
        !brand.yearCreated &&
        brand.yearsFounded &&
        typeof brand.yearsFounded !== 'number'
      ) {
        let number = parseInt(brand.yearsFounded);
        if (number) {
          brandObject.yearFounded = number;
        } else {
          brandObject.yearFounded = 1600;
        }
      }

      if (brand.headquarters && typeof brand.headquarters === 'string') {
        brandObject.headquarters = brand.headquarters;
      } else if (!brand.headquarters && brand.hqAddress) {
        brandObject.headquarters = brand.hqAddress;
      } else {
        brandObject.headquarters = 'Unknown';
      }

      if (
        brand.numberOfLocations &&
        typeof brand.numberOfLocations === 'number'
      ) {
        brandObject.numberOfLocations = brand.numberOfLocations;
      } else if (
        brand.numberOfLocations &&
        typeof brand.numberOfLocations !== 'number'
      ) {
        let number = parseInt(brand.numberOfLocations);
        if (number) {
          brandObject.numberOfLocations = number;
        } else {
          brandObject.numberOfLocations = 1;
        }
      } else {
        brandObject.numberOfLocations = 1;
      }

      const newBrand = new Brand(brandObject);
      await newBrand.save();

      if (!newBrand) {
        throw new Error('Error saving brand data');
      }
    }

    console.log('Data transformation completed successfully.');
  } catch (error) {
    console.error('Error during data transformation:', error);
  } finally {
    mongoose.disconnect();
    process.exit();
  }
}

transformData();
