# Data Engineer Task

## Overview

This project is designed to transform a MongoDB collection of restaurant brands, rectifying inconsistencies and errors, and extending the dataset with new seed data.

## Task Details

### 1. Data Transformation

The `brands` collection provided contains 10 documents representing sample brands, with intentional mistakes in their schema such as incorrect field names, types, and validations. The task is to use TypeScript and Mongoose to transform this data into a correct format based on the provided schema (`brands-schema.ts`). 

- Transform the data in-place within the same documents and collection.
- Validate data against the schema during the transformation process.

#### Notes:
- If `yearFounded` or `numberOfLocations` is available under a different field name, retrieve it from that field.
- If `yearFounded` or `numberOfLocations` is missing, use the minimum year as per the schema.

### 2. Data Seeding

Extend the database by generating 10 new brand documents adhering to the correct schema. Utilize Faker.js or any other data library to create test data for the new entries, documenting the seed data cases in an Excel file to explain the differences.

### 3. Export the Brands collection

After transforming the data and seeding the database, export the `brands` collection as a JSON file.

## Technologies and Frameworks

- Node.js
- TypeScript
- Mongoose
- Faker.js (for data seeding)

## Evaluation Criteria

- Accuracy of data transformation and adherence to the provided schema.
- Logical and efficient approach to identifying and correcting data inconsistencies.
- Quality and readability of the TypeScript code.
- Completeness and clarity of the process documentation.

## Code and Data Submission

- Push your TypeScript code and support files to a public GitHub repository under your account.
- Include the modified `brands.json` file (exported from your MongoDB database) in the repository.
- Attach the Excel documentation file detailing seed data cases.

## Runner Scripts

The following scripts are available for running various tasks:

```json
{
  "scripts": {
    "start": "nodemon src/index.ts",
    "build": "tsc",
    "transform-data": "nodemon src/data-transformation.ts",
    "seed": "nodemon src/data-seeding.ts"
  }
}
