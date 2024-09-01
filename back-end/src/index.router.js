import connectDB from "../db/connection.js"
import { globalErrorHandler } from "./utils/globalErrorHandling.js"
import userRouter from "./modules/user/user.router.js"
import { nonConfirmed } from "./utils/accountDeleting.js"

const bootstrap = (app, express) => {
    app.use(express.json())
    nonConfirmed() //deleting non confirmed accounts after two days
    connectDB()
    app.use("/user",userRouter)
    app.use("/*", (req, res) => {
        return res.json({ message: "invalid routing!" })
    })
    app.use(globalErrorHandler)
}
export default bootstrap