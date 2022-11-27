import {apiService} from '../axios/index.js'

export const postLinks = (path,data) => {
    return apiService.post(path,data)
}

export const getLinks = (path) => {
    return apiService.get(path)
}



