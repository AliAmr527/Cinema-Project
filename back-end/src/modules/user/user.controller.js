import { nanoid } from "nanoid"
import userModel from "../../../db/models/user.model.js"
import bcrypt from "bcryptjs"
import sendEmail from "../../utils/sendEmail.js"
import { ApiError } from "../../utils/globalErrorHandling.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
	//taking input
	const { email, phone } = req.body
	let { password } = req.body

	//check if the entry exists in the database
	const isExist = await userModel.findOne({ $or: [{ email }, { phone }] })
	if (isExist) {
		return next(new ApiError("duplicate entry",409))
	}

	//hashing password
	password = bcrypt.hashSync(password, Number(process.env.SALT_NUMBER))

	//sending email
	let otp = nanoid(6)
	sendEmail(email,otp)

	//creating the entry in the database
	const user = await userModel.create({ email, phone, password, otp })

	//changing the otp after a said period of time
	setTimeout(() => {
		otp = nanoid(6)
		user.otp = otp
		user.save()
	}, 900000)

	return res.status(201).json({message:"user signed up successfully! please confirm your email"})
}

export const verifyEmail = async(req,res,next)=>{
	const {email, otp} = req.body
	const user = await userModel.findOne({ email })
	if(!user){
		return next(new ApiError("email not found try signing-up!",404)) 
	}
	if(user.otp!=otp){
		return next(new ApiError("OTP not correct try again",404)) 
	}
	user.otp = nanoid(6)
	user.isConfirmed = true
	user.save()

	return res.status(200).json({message:"email confirmed successfully!"})
}

export const signin = async(req,res,next)=>{
	const {email,password,phone} = req.body
	
	const isExist = await userModel.findOne({$or:[{email},{phone}]})

	if(!isExist || !bcrypt.compareSync(password,isExist.password)){
		return next(new ApiError("in-valid login information!",404))
	}

	if(!isExist.isConfirmed){
		return next(new ApiError("please confirm your email first!",403))
	}

	const payload = {
		id:isExist._id
	}

	const token = jwt.sign(payload,process.env.TOKEN_KEY)

	return res.status(200).json({message:`signed-in successfully! welcome ${isExist.username}`,token})
}
