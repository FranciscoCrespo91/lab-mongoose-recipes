const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

//Method 1 : Using Async Await
let newRecipe = {
  title: "Asian Glazed Chicken Thighs",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs",
  ],
  cuisine: "Asian",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu",
};

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    //Create one Recipe
    let titleRecipe = await Recipe.create(newRecipe);
    console.log("Nova Receita -->" + titleRecipe.title);

    //Create all Recipes
    await Recipe.insertMany(data);
    
    let rigatoni = await Recipe.find({ title: "Rigatoni alla Genovese" });
    /* console.log(rigatoni); */

  await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" },{duration:100})
  console.log(await Recipe.find({title:'Rigatoni alla Genovese'}))
  console.log("Sucess!!")


  await Recipe.findOneAndDelete({ title: "Carrot Cake" });
    let deletedCarrotCake = await Recipe.find({ title: "Carrot Cake" });
    console.log(deletedCarrotCake);

  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:
/* 
 mongoose
  .connect(MONGODB_URI)
  .then((x) => {console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();})
  .then(() => {Run your code here, after you have insured that the connection was made })
    
  .catch((error) => {console.error('Error connecting to the database', error);}); 


manageDb() */
