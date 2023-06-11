onmessage = function(e) {
    let {url,list, field} = e.data
    
    if(field === 'url') {
        list = list.filter(val=>{
            let verify = val.link.match(url)
            if(verify != null) return val
    
        }).map(val=> {
            val.id = Math.random().toString()
            return val
        })
        if(url.trim() === '') list = []
        
        self.postMessage({list:list})
    }
   
    
}

