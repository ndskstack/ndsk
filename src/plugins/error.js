exports.plugin  = {
    name: 'error',
    register: async (server) =>{
        if(process.env.NODE_ENV === 'production'){
            server.ext('onPreResponse', async (request, h) => {
                const Msg = request.response.settings.message;
                if(Msg){
                    const {statusCode,error,payload:{message}} = Msg;
                    if(error){
                        
                        //渲染error.js页面返回客户端
                        return server.render(request,h,{
                            path:'/error.js',            //文件路径 src/pages/error.js
                            data:{                       //传递给页面的数据
                                statusCode,
                                message:message
                            },
                            layout:false                //是否继承layout
                        });

                        // return `<html>
                        //     <head>
                        //         <title>${statusCode}</title>
                        //         <style>
                        //             body{ margin:0;height:100%;display: flex; justify-content: center; align-items: center; }
                        //             main{flex:1;text-align: center;margin-top:-3em}
                        //             #statusCode{ font-size:10em;font-weight:lighter}
                        //             #message{ font-size:1.5em;font-weight:lighter}
                        //         </style>
                        //     </head> 
                        //     <body> 
                        //     <main>
                        //         <div id="statusCode">${statusCode}</div>
                        //         <div id="message">This is a custom error page message ${message}</div>
                        //     </main>
                        //     </body>
                        // </html>`;
                    }
                }
                return h.continue
            });
        }
    }
}