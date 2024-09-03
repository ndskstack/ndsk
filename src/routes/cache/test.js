import Path from 'node:path'
export const options = {
    cache:{
        privacy:'public',
        expiresIn: 6000 * 1000,
    }
}
export default (request,h)=>{ 
    return h.file(Path.join(process.cwd(),'static/test.css'));    
}