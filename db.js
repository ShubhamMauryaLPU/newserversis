import mongoose from "mongoose";

const DB = mongoose.connect("mongodb+srv://emailsshubham:Sulli1406@cluster0.mj6m7l7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
DB.then((result) => {
  console.log("DataBase Connected");
});
DB.catch((err) => {
  console.log("DataBase Not Connected");
});

export default DB; 


