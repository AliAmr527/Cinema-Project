export const asyncHandler = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((error) => {
			// If the error is not an instance of ApiError, wrap it to preserve the stack
			if (!(error instanceof ApiError)) {
                //instance of ApiError
				const apiError = new ApiError(
					error.message, 
					500 
				)
				apiError.stack = error.stack
				return next(apiError)
			}
			return next(error)
		})
	}
}

export class ApiError extends Error {
	constructor(message = "internal server error", status = 500) {
		super(message)
        this.status = status
        Error.captureStackTrace(this) //for a detailed error stack
	}
}

export const globalErrorHandler = (error, req, res, next) => {
	if (process.env.MODE == "Dev") {
		return res.status(error.status || 500).json({
			message: error.message,
			stack: error.stack,
		})
	} else {
		return res.status(error.cause || 500).json({
			message: error.message,
		})
	}
}
