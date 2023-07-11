


exports.returnFunctionWithToken = async(res,statusCode,userData,token,message) =>{
    return res.status(statusCode).json({
        data: userData,
		access_token:token,
		message:message
    })
}


exports.returnErrorMessage = async(res,statusCode,message) =>{
    return res.status(statusCode).json({
        message:message
    });
}

exports.returnFunction = async(res,statusCode,data,message) =>{
    return res.status(statusCode).json({
        data: data,
		message:message
    })
}


exports.dbPaginateaggregate =async(model,filter,page,limit)=>{
    try {
        let  myAgg = model.aggregate(filter)

        var data = await model.aggregatePaginate(myAgg,{ page: page, limit: limit })
        return data
    } catch (error) {
        throw error
    }
}