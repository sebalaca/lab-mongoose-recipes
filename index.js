const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.Model.create}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then((response) => {
    // console.log(`Primer console`, response)
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data);
  })

  .then((response) => {
    console.log(`InsertMany`, response);
    return Recipe.create(
      {
        title: "Fried Eggs",
        level: "Easy Peasy",
        ingredients: ["eggs", "salt", "Olive Oil"],
        cuisine: "International",
        dishType: "breakfast",
        duration: 20,
        creator: "Ruperto Gonzalez",
        created: "10/01/2005"
      }
    )
  })

  .then((response) => {
    console.log(`New recipe created`, response);
    return Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100},
      {new: true}
    );
  })

  .then((response) => {
    console.log(`New duration is updated`, response);
    return Recipe.deleteOne({title: "Carrot Cake"});
  })

  .then((response) => {
    console.log(`Carrot Cake deleted`, response);
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
