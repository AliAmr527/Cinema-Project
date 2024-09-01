import { Schema, Types, model } from "mongoose"
import { nanoid } from "nanoid"

const schema = new Schema({
	username: {
		type: String,
		trim: true,
		required: true,
		default:`User${nanoid(6)}`
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	phone: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	DoB: String,
	age: Number,
	isConfirmed: {
		type: Boolean,
		default: false,
	},
	otp: String,
},{
	timestamps:{
		createdAt:true,
		updatedAt:false
	}
})

const userModel = model("User",schema)
export default userModel