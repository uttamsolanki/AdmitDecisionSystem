module.exports = {


    failureResponse: async (statusCode,message,responseData) => {
       
        var rep = {status:0,message: message,data:responseData}
        return rep;
    },


    successResponse: async (statusCode,message,responseData) => {
       var rep = {status:1,message: message,data:responseData}
       return rep;
    },

}
