import { faker } from '@faker-js/faker';
import { IBrand } from './interfaces/brand.interface';
import Brand from './DB/models/brand.schema';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/config/.env' });
import { connectToDB } from './DB/connection';
connectToDB();

// export async function seedBrands() {
//   const brands: IBrand[] = [];
//   for (let i = 0; i < 10; i++) {
//     const brand: IBrand = {
//       _id: new mongoose.Types.ObjectId(),
//       brandName: faker.company.name(),
//       yearFounded: faker.date.past().getFullYear(),
//       headquarters: faker.location.city(),
//       numberOfLocations: faker.number.int({ min: 1, max: 1000 }),
//     };
//     brands.push(brand);
//   }
//   try {
//     await Brand.insertMany(brands);
//     console.log('Brands seeded successfully');
//   } catch (error) {
//     console.error('Error seeding brands:', error);
//   } finally {
//     mongoose.disconnect();
//     process.exit();
//   }
// }

export async function seedBrands() {
  let brandObject: IBrand = {
    _id: new mongoose.Types.ObjectId(),
    brandName: 'Unknown',
    yearFounded: 1600,
    headquarters: 'Unknown',
    numberOfLocations: 1,
  };
  for (let i = 0; i < 10; i++) {
    brandObject = {
      _id: new mongoose.Types.ObjectId(),
      brandName: 'Unknown',
      yearFounded: 1600,
      headquarters: 'Unknown',
      numberOfLocations: 1,
    };

    brandObject.brandName = faker.company.name();
    brandObject.yearFounded = faker.date.anytime().getFullYear();
    brandObject.headquarters = faker.location.city();
    brandObject.numberOfLocations = faker.number.int({ min: -2, max: 10 });
    console.log(brandObject);

    try {
      await Brand.create(brandObject);
      console.log(`Brand #${i + 1} seeded successfully`);
    } catch (error) {
      console.log(`Error creating brand #${i + 1} because of ${error}`);
    }
  }
  mongoose.disconnect();
  process.exit();
}

seedBrands();
