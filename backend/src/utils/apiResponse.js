class apiResponse{
    constructor(statusCode,data,message="successful"){
        this.statusCode = statusCode < 400
        this.message = message
        this.data = data
        this.success = true
    }
}

export default apiResponse