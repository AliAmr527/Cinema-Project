import cron from 'node-cron'
import userModel from "../../db/models/user.model.js"
import { currentDate } from "./currentDateAndTime.js"

export const nonConfirmed = () => {
	// Schedule the cron job to run daily
	cron.schedule("0 0 * * *", async () => {
		try {
			// Calculate the cutoff date (2 days ago)
			const cutoffDate = new Date(currentDate())
			cutoffDate.setDate(cutoffDate.getDate() - 2)

			// Delete accounts that are not confirmed and older than 2 days
			const result = await userModel.deleteMany({
				isConfirmed: false,
				createdAt: { $lt: cutoffDate },
			})

			console.log(`Deleted ${result.deletedCount} unconfirmed accounts older than 2 days.`)
		} catch (err) {
			console.error("Error deleting unconfirmed accounts:", err)
		}
	})
}
