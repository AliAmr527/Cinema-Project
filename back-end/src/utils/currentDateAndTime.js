import moment from "moment-timezone"

export const currentDate = ()=>{
    let options = { timeZone: "Africa/Cairo" }
	let egyptTime = new Date().toLocaleDateString("en-CA", options)
    return egyptTime
}

export const currentTime = ()=>{
	return Number(moment().tz("Africa/Cairo" ).format().split("T")[1].split(":")[0] + '00')
}