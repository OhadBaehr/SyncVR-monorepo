require('dotenv').config()

// External test file to check the requests to the server are working.
const connection = process.env.TEST_IP === 'localhost' ? 'http' : 'https'
const url = `${connection}://${process.env.TEST_IP}:${process.env.PORT}/api/ping`
console.log(url)
fetch(url).then(res => res.text()).then(console.log).catch(console.error)