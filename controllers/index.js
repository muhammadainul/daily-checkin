'use strict'

const debug = require('debug')
const { post, postWithFiles } = require('../libs/request')
const _ = require('lodash')
const fs = require('fs')
const FormData = require('form-data')
const { validationResult } = require('express-validator')
const crypto = require('crypto')
const moment = require('moment')

const BASE_URL = process.env.BASE_URL

async function indexPage (req, res) {
    try {
        res.render('../views/index', {
            isAuthenticated: req.session.user,
            path: '/'
        })
    } catch (error) {
        throw error
    }
}

async function addPlacePage (req, res) {
    try {
        res.render('../views/place', {
            isAuthenticated: req.session.user,
            path: '/place/addPlace'
        })
    } catch (error) {
        throw error
    }
}

async function addQR (req, res) {
    let token_code = req.session.user.session.token_code
    let business_token_code = req.session.user.session.access_token
    console.log('token_code', token_code)
    console.log('[DA Web Add QR', req.body)
    try {
        let { placeId, type, date } = req.body
        if (_.isEmpty(date)) {
            let addqr = await post(
                BASE_URL + '/business/place/qr/add',
                {
                    'User-Agent': 'request',
                    'da-token': token_code,
                    Authorization:
                        'Bearer ' +
                        business_token_code
                },
                { placeId, type, date: '' }
            )
            console.log('results', addqr);
            console.log(addqr.data);
            res.redirect("/place/list/detail/" + placeId);
        } else {
            let addqr = await post(
                BASE_URL + '/business/place/qr/add',
                {
                    'User-Agent': 'request',
                    'da-token': token_code,
                    Authorization: 'Bearer ' + business_token_code
                },
                { placeId, type, date }
            )
            console.log('results', addqr);
            console.log(addqr.data);
            res.redirect("/place/list/detail/" + placeId);
        }

    } catch (error){
        throw error;
    }
}

async function deleteQR (req, res) {
    let data = req.body;
    let token_code = req.session.user.session.token_code
    let business_token_code = req.session.user.session.access_token
    console.log('[DA Web Checkin] deleteQR', { data })
    try {
        let { qrId, placeId } = req.body
        let response = await post(
            BASE_URL + '/business/place/qr/delete',
            {
                'User-Agent': 'request',
                'da-token': token_code,
                Authorization: 'Bearer ' + business_token_code
            },
            { qrId }
        )
        console.log('results', response)
        console.log('placeid', placeId)
        res.redirect('../views/placeDetail')
    } catch (error) {
        throw error
    }
}

async function listPlace (req, res) {
    try {
        res.render('../views/listPlace', {
            isAuthenticated: req.session.user,
            path: '/place/list'
        })
    } catch (error) {
        throw error
    }
}

async function history (req, res) {
    let token_code = req.session.user.session.token_code
    let business_token_code = req.session.user.session.access_token
    let data = req.body
    console.log('[DA Web Checkin history', data)
    try {
        console.log('searchByDate'. date.searchByDate)

        if (!_.isEmpty(data.searchByDate)) {
            let date = data.searchByDate
            let { placeId, start, length, draw } = data
            let history = await post(
            BASE_URL + '/business/place/history',
            {
                'User-Agent': 'request',
                'da-token': token_code,
                Authorization: 'Bearer ' + business_token_code
            },
            { placeId, start, length, draw, date }
        )
            console.log('results', history.data)
            res.send(history.data)
        } else {
            let date = moment().format('YYYY-MM-DD')
            let { placeId, start, length, draw } = data
            let history = await post(
            BASE_URL + '/business/place/history',
            {
                'User-Agent': 'request',
                'da-token': token_code,
                Authorization: 'Bearer ' + business_token_code
            },
            { placeId, start, length, draw, date }
        )
            console.log('results', history.data)
            res.send(history.data)
        }

    } catch (error) {
        throw error
    }
}

async function historyPage (req, res) {
    let param = req.params
    console.log('[DA Web checkin history page]', { param })
    try {
        let placeId = param.placeid
        console.log('placeid', placeId)

        res.render('../views/history', { placeId, isAuthenticated: req.session.user })
    } catch (error) {
        throw error
    }
}

async function getAllPlace (req, res) {
    let data = req.body
    let token_code = req.session.user.session.token_code
    let business_token_code = req.session.user.session.access_token
    console.log('[DA Web Checkin] getAllPlace', data)
    try {
        let date = moment().format('YYYY-MM-DD')
        let businessId = req.session.user.businessId
        let { start, length, draw } = req.body

        console.log('moment', date)
        let response = await post(
            BASE_URL + '/business/place/list',
            {
                'User-Agent': 'request',
                'da-token': token_code,
                Authorization: 'Bearer ' + business_token_code
            },
            { businessId, date, start, length, draw }
        )
        console.log('results', response)
        res.send(response.data)
    } catch (error) {
        throw error
    }
}

async function placeDetailPage (req, res) {
    const param = req.params
    console.log('[DA Web checkin] place detail page', param)
    try {
        let placeId = param.placeid
        console.log('placeid', placeId)
        res.render('../views/placeDetail', { placeId, isAuthenticated: req.session.user })
    } catch (error) {
        throw error
    }
}

async function getPlaceDetails (req, res) {
    console.log('[DA Web Checkin] get place details', req.body)
    let token_code = req.session.user.session.token_code
    let business_token_code = req.session.user.session.access_token
    try {
        let date = "2020-08-16"
        let { placeId, start, length, draw } = req.body
        let response = await post(
            BASE_URL + '/business/place/qr/list',
            {
                'User-Agent': 'request',
                'da-token': token_code,
                Authorization: 'Bearer ' + business_token_code
            },
            { placeId, date, start, length, draw }
        )
        console.log('results', response)
        res.send(response.data)
    } catch (error) {
        throw error
    }
}

async function addPlace (req, res) {
    let { name, type, address, longitude, latitude } = req.body
    let files = req.files
    let token_code = req.session.user.session.token_code
    let business_token_code = req.session.user.session.access_token

    console.log('[DA] Web Checkin:add place', { body: req.body, files })
    try {
        let fileData = []
        files.forEach(data => {
            fileData.push({
                value: fs.createReadStream(data.path),
                options: {
                    filename: data.originalname,
                    contentType: data.mimetype
                }
            })
        })
        let formData = {
            files: fileData,
            name,
            type,
            address,
            longitude,
            latitude
        }

        let response = await postWithFiles(
            BASE_URL + '/business/place/add', //
            {
                'User-Agent': 'request',
                'da-token': token_code,
                Authorization: 'Bearer ' + business_token_code
            },
            formData
        )
        let result = JSON.parse(response)
        console.log('result', result.data)
        res.redirect('/place/list')
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

async function loginPage (req, res) {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    try {
        res.render('../views/login', {
            pageTitle: 'Login',
            path: '/login',
            isAuthenticated: false,
            errors: message,
            oldInput: {
                email: '',
                password: ''
            }
        })
    } catch (error) {
        throw error
    }
}

async function login (req, res) {
    console.log('[DA CheckIn] login')
    let { email, password } = req.body
    //let hashpwd = crypto.createHash('md5').update(password).digest("hex")
    try {
        let getToken = await post(
            BASE_URL + '/token/get',
            {},
            {
                name: 'web',
                secret_key: 'w3bs1t3',
                brand: 'Apple',
                device_id: '123123C0-ABCD-4508-860B-14163F912F5B',
                model: 'Simulator',
                os: 'ios',
                os_version: '12.4'
            }
        )
        console.log('token', getToken.data.token_code)

        console.log('[DA Checkin] Login', req.body)
        let user = await post(
            BASE_URL + '/business/account/login', //
            { 'User-Agent': 'request', 'da-token': getToken.data.token_code },
            { email, password }
        )
        console.log('results', user)

        if (_.isEmpty(user.data)) {
            return res.render('../views/login', { errors: 'Invalid Credentials.' })
        }
        req.session.isLoggedIn = true
        req.session.code = getToken.data.token_code
        req.session.user = user.data

        // var hour = 3600000
        // req.session.cookie.expires = new Date(Date.now() + hour)
        // req.session.cookie.maxAge = hour
        console.log('req-session', req.session.user)

        res.redirect('/')
    } catch (error) {
        throw error
    }
}

async function livePage (req, res) {
    const param = req.params;
    console.log('[DA Web Checkin] live page', { param })
    try {
        let placeId = param.placeid
        console.log('placeid', placeId)

        res.render('../views/liveLogs', { placeId, isAuthenticated: req.session.user })
    } catch (error) {
        throw error
    }
}

async function getAllLiveLogs (req, res) {
    let data = req.body
    let token_code = req.session.user.session.token_code
    let business_token_code = req.session.user.session.access_token
    console.log('[DA Web Checkin] getAllLiveLogs', data)
    try {
        let date = moment().format('YYYY-MM-DD')
        let { placeId, start, length, draw } = req.body
        console.log('placeId', placeId)
        let response = await post(
            BASE_URL + '/business/place/live',
            {
                'User-Agent': 'request',
                'da-token': token_code,
                Authorization: 'Bearer ' + business_token_code
            },
            { placeId, date, start, length, draw }
        )
        console.log('result', response)
        res.send(response.data)
    } catch (error) {
        console.log('error', error)
    }
}

async function logout (req, res) {
    const log = debug('dacheckin:logout')
    console.log('[DA] Logout')
    req.session.destroy(function () {
        console.log('user logout')
    })
    res.redirect('/login')
}

module.exports = {
    indexPage,
    loginPage,
    login,
    logout,
    addPlace,
    addPlacePage,
    addQR,
    deleteQR,
    historyPage,
    history,
    listPlace,
    getAllPlace,
    placeDetailPage,
    getPlaceDetails,
    livePage,
    getAllLiveLogs
}
