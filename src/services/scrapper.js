import {apiService} from '../axios/index.js'

export const postLinks = (path,data) => {
    return apiService.post(path,data)
}



