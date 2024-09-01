import { CourierClient } from "@trycourier/courier"

const courier = new CourierClient({ authorizationToken: "pk_prod_PS7MZ2K1WGM8M9HRC3TMKP3M7WEF" })

const sendSms = async(phoneNumber)=>{
    const { requestId } = await courier.send({
        message: {
            to: {
                phone_number: phoneNumber,
            },
            content: {
                title: "Welcome to Cinema Horizon",
                body: "Use this OTP within 15 minutes to verify your account! {{otp}}",
            },
            data: {
                joke: "Why was the JavaScript developer sad? Because they didn't Node how to Express themselves",
            },
        },
    })
}
