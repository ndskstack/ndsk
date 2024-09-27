export default ({query:{id}},h)=>{
    if(id === '1'){
        return h.redirect('https://github.com/')
    }else{
        return {name:'this is redirect page'}
    }
}