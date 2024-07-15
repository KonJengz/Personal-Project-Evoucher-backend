const axios = require('axios')

const axiosLine = axios.create({
    baseURL: process.env.API_LINE
})

module.exports = axiosLine