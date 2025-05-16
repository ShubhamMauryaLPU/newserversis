import mongoose from "mongoose";

const DB = mongoose.connect("mongodb://localhost:27017/estate");
DB.then((result) => {
  console.log("DataBase Connected");
});
DB.catch((err) => {
  console.log("DataBase Not Connected");
});

export default DB; 


