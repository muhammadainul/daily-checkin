const __request = require('request').defaults({ strictSSL: false })

module.exports = {
    post,
    postWithFiles
}

function post (url, headers, body) {
    return new Promise((resolve, reject) => {
        try {
            __request.post({ url, headers, body, json: true }, (err, res, body) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(body)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function postWithFiles (url, headers, formData) {
    return new Promise((resolve, reject) => {
        try {
            __request.post({ url, headers, formData }, (err, res, body) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(body)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
