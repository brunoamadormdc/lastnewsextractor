import {slugger} from '../helpers/index.js'

onmessage = function (e) {
    let { list, filter } = e.data

    if (filter.trim() === '') self.postMessage({ list: list })
    else {
        list = list.filter(val => {
            let joined = val.portal + ' ' + val.texto + ' ' + val.link
            let verify = slugger(joined).match(slugger(filter))
            if (verify != null) return val

        })
        self.postMessage({ list: list })
    }

}