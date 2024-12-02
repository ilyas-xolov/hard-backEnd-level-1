import { model, Schema } from "mongoose";

const TokenSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true}
})

const modelToken = model("Token",TokenSchema);

export default modelToken