import axios from 'axios'

const HTTP = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
})

export const apiService = {
    post(path,data,config={}) {
        return HTTP.post(path,data,config)
    },
    get(path) {
        return HTTP.get(path)
    }
}