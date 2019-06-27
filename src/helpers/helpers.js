module.exports = {
    response: (res, result, status, error) => {
        let resultPrint = {}
        console.log(result)
        if (result.length > 0) {
            resultPrint.error = error || null
            resultPrint.status_code = status || 200
            if (result.length == 1) {
                resultPrint.result = result[0]
            } else {
                resultPrint.result = result
            }

        } else {
            resultPrint.error = error || null
            resultPrint.status_code = 404
            resultPrint.message = "Data Not Fount"
        }

        return res.status(resultPrint.status_code).json(resultPrint)
    }
}