import mongoose from "mongoose";
import schema from "./schema.js";
//models provide CRUD functions
const model = mongoose.model("UserModel", schema);
export default model;

