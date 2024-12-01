
class apiResult {
    success(data){
        return {
            status: 200,
            message: "OK",
            data,
            timestamp:new Date().toISOString()
        }
    }
    badRequest(message,data){
        return {
            status: 400,
            message,
            data,
            timestamp:new Date().toISOString()
        }
    }
    internalServer(error){
        return {
            status: 500,
            message: 'Internal server error',
            error,
            timestamp:new Date().toISOString()
        }
    }
}

export default new apiResult