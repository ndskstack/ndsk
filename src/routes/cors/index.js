
export const options = {
    cors:{
        origin:['1270.0.1:4000'],
        // headers:['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
        // additionalHeaders:['X-Requested-With'] 
    }
}
export default (request,h)=>{
    return 'welcome'
}