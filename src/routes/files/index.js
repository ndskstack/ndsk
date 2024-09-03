import Path from 'node:path'
export const options = {
    files:{
        relativeTo:Path.join(process.cwd(),'static')
    }
}
export default (request,h)=>{
    return h.file('picture.png');
}