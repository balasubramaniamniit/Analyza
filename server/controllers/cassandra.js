import request from "request";

export const checkConnection = () => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v1/keyspaces`,
            headers: {
                "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }, (err, response, body) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                // console.log(body)
                resolve(body)
            }
        })
    })
}

export const addUser = (data) => {
    return new Promise((resolve, reject) => {
        data['joinedOn'] = Date.now()
        console.log(data, "checking add user")
        request.post({
            url: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/db/collections/users`,
            headers: {
                "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            form: data,
            json: true
        }
            , (err, response, body) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    console.log(body)
                    resolve(body)
                }
            })
    })
}

export const checkUserExisting = (email) => {
    email = encodeURIComponent(encodeURIComponent(email))
    console.log(email, "encoded")
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/db/collections/users?where=%7B%22email%22%3A%7B%22%24eq%22%3A%22${email}%22%7D%7D`,
            headers: {
                "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
                // "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }
            , (err, response, body) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    console.log(body, "**********************")
                    resolve(body)
                }
            })
    })
}


export const getDocument = (documentId) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/db/collections/users/${documentId}`,
            headers: {
                "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
                // "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }
            , (err, response, body) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    console.log(body)
                    resolve(body)
                }
            })
    })
}


///// asynccApi   ***************************************   
export const getUserHistoryForAnalysisData = (userId) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/db/collections/users?where=%7B%22handlerId%22%3A%7B%22%24eq%22%3A%22${userId}%22%7D%7D`,

            headers: {
                "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
                // "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }
            , (err, response, body) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    console.log(body)
                    resolve(body)
                }
            })
    })
}


export const createUserHistoryForAnalysisData = (data) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/db/collections/analysisData`,
            headers: {
                "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            form: data
        }
            , (err, response, body) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    console.log(body)
                    resolve(body)
                }
            })
    })
}





export const getDashBoardData = (userId, conversationId) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/db/collections/analysisData?where=%7B%20%22handlerId%22%3A%20%22${userId}%22%20%7D%2C%20%7B%20%22conversationIdData%22%3A%20%7B%20%22%24elemMatch%22%3A%20%7B%20%22conversationId%22%3A%20%22${conversationId}%22%20%7D%20%7D%20%7D&page-size=20
            `,
            headers: {
                "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
                // "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }
            , (err, response, body) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    console.log(body)
                    resolve(body)
                }
            })
    })
}



export const getDashBoardDataList = (userId) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/db/collections/analysisData?where=%7B%22handlerId%22%3A%7B%22%24eq%22%3A%22${userId}%22%7D%7D`,

            headers: {
                "X-Cassandra-Token": process.env.ASTRA_DB_APPLICATION_TOKEN,
                // "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }
            , (err, response, body) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    console.log(body)
                    resolve(body)
                }
            })
    })
}