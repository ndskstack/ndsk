const Path = require('node:path')
exports.plugin  = {
    name: 'staticFile',
    register: async (server) =>{
        server.route({
            method:'get',
            path:'/images/{name*}',
            options: {
                cache: {expiresIn: 60 * 1000},  //Cache 60 seconds
            },
            handler:(request,h)=>{
                return h.file(Path.join(process.cwd(),`images/${request.params.name}`))
            }
        })
    }
}