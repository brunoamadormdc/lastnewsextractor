import {apiService} from '../axios/index.js'

export const getSitelist = () => {
    return apiService.get('external/sites-list')
}