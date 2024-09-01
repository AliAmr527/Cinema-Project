// Install with: npm install @trycourier/courier
import { CourierClient } from "@trycourier/courier"

const courier = new CourierClient({ authorizationToken: "pk_prod_PS7MZ2K1WGM8M9HRC3TMKP3M7WEF" })

const sendEmail = async(email,otp)=>{
    const { requestId } = await courier.send({
        message: {
            to: {
                email: email,
            },
            template: "Y26GVPSV714MPVQGNR298P1MR4GF",
            data: {
                OTP_CODE: otp,
            },
        },
    })
    return requestId
}

export default sendEmail
