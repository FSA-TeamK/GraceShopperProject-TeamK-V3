// 'use strict';
const { faker } = require('@faker-js/faker');
const {
  db,
  models: { User, Product },
} = require('../server/db');


async function seed() {
  /**
   * seed - this function clears the database, updates tables to
   *      match the models, and populates the database.
   */
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  //* Creating Products
 

  const products = await Promise.all([
    Product.create({
      name: 'Nike Air Force 1',
      description:
        'The Nike Air Force 1 is a classic basketball shoe that has been around since 1982. It was the first basketball shoe to feature Nike Air technology, which provides lightweight cushioning. The shoe is also known for its iconic Swoosh logo, which was designed by Carolyn Davidson.',
      price: 100,
      quantity: 10,
      imageUrl:
        'https://images.unsplash.com/photo-1589989362029-8b5b5b5b5b1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmllayUyMGFpciUyMGZvcmNlJTIwMXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    }),
    Product.create({
      name: 'Nike Air Max 90',
      description:
        'The Nike Air Max 90 is a classic running shoe that was released in 1990. It features a visible Air unit in the heel, which provides lightweight cushioning. The shoe is also known for its iconic Swoosh logo, which was designed by Carolyn Davidson.',
      price: 120,
      quantity: 10,
      imageUrl:
        'https://images.unsplash.com/photo-1589989362029-8b5b5b5b5b1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmllayUyMGFpciUyMGZvcmNlJTIwMXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    }),
    Product.create({
      name: 'Nike Air Max 95',
      description:
        'The Nike Air Max 95 is a classic running shoe that was released in 1995. It features a visible Air unit in the heel, which provides lightweight cushioning. The shoe is also known for its iconic Swoosh logo, which was designed by Carolyn Davidson.',
      price: 130,
      quantity: 10,
      imageUrl:
        'https://images.unsplash.com/photo-1589989362029-8b5b5b5b5b1c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmllayUyMGFpciUyMGZvcmNlJTIwMXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    }),
    
  ]);

  //* Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  //   products: {

  //   }
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
