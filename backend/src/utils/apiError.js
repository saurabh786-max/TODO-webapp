class apiError extends Error{
    constructor(statusCode,message="error is occured",errors= []){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.errors = errors
        this.success = false
        this.data = null
    }
}

export default apiError