// 'use strict';
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
      rating: 4,
      imageUrl:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-5QFp5Z.png',
        categories: "CASUAL"
    }),
    Product.create({
      name: 'Nike Air Max 90',
      description:
        'The Nike Air Max 90 is a classic running shoe that was released in 1990. It features a visible Air unit in the heel, which provides lightweight cushioning. The shoe is also known for its iconic Swoosh logo, which was designed by Carolyn Davidson.',
      price: 120,
      rating: 3,
      imageUrl:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7fbc5e94-8d49-4730-a280-f19d3cfad0b0/custom-nike-air-max-90-by-you.png',
        categories: "ATHLETIC"
    }),
    Product.create({
      name: 'Nike Air Max 95',
      description:
        'The Nike Air Max 95 is a classic running shoe that was released in 1995. It features a visible Air unit in the heel, which provides lightweight cushioning. The shoe is also known for its iconic Swoosh logo, which was designed by Carolyn Davidson.',
      price: 130,
      rating: 4,
      imageUrl:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/19c2a9d2-ec59-43ad-972e-e3f32c7ba9b9/air-max-95-premium-mens-shoes-CCr9WV.png',
        categorie: "ATHLETIC"
    }),
    Product.create({
      name: 'Chuck Taylor All Star Classic',
      description:
      'We could tell you that it’s the OG basketball shoe, created over 100 years ago. Or that the design has largely stayed the same, because why mess with a good thing. Or how it became the unofficial sneaker of all your favorite artists and musicians, who each made it their own. Yeah, we could share a lot of stories, but the one that matters most isn’t ours—it’s yours. It’s how and where you take your Chucks. The legacy is long, but what comes next is up to you. We just make the shoe. You make the stories.',
      price: 65,
      rating: 4,
      imageUrl: 
      'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw98db472f/images/a_08/560845C_A_08X1.jpg?sw=406',
      categories: "CASUAL"
    })
    
  ]);

  //* Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', email: 'cody123@gmail.com' }),
    User.create({ username: 'murphy', password: '123', email: 'murphy456@gmail.com' }),
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
