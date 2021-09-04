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
            url: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/rest/v2/namespaces/angelhackdb/collections/users`,
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
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://df217dae-6422-4a0b-ae1e-e9d1562083b6-ap-southeast-1.apps.astra.datastax.com/api/rest/v2/namespaces/angelhackdb/collections/users?where=%7B%22email%22%3A%7B%22%24eq%22%3A%22${email}%22%7D%7D
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


export const getDocument = (documentId) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://df217dae-6422-4a0b-ae1e-e9d1562083b6-ap-southeast-1.apps.astra.datastax.com/api/rest/v2/namespaces/angelhackdb/collections/users/${documentId}`,
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



