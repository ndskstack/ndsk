
- **[中文](https://github.com/rockyshi1993/nodestack/blob/main/README_ZH.md)** 
- **[English](https://github.com/rockyshi1993/nodestack/blob/main/README.md)**
# 什么是nodestack?
[nodestack](https://nodestack.dev) 是一个面向 JavaScript 开发人员的全栈框架，它设计的非常简单，允许您使用最少的代码创建高性能、高质量的程序，一切皆为了提高开发效率。主要使用[node](https://nodejs.org/)、[hapi](https://hapi.dev/)、[react](https://react.dev/)、[mongodb](https://www.mongodb.com/)等进行构建，使用[esbuild](https://esbuild.github.io/)作为编译工具。

**优点：**
- 无需配置
- 非常简单、小巧、安全、快速、开箱即用
- 支持代码自动更新，每次修改代码后无需用nodemon等工具重启服务器。
- 使用esbuild编译速度提高20-100倍。
- 强大的路由功能。
- 同时支持ES5\ES6+

**不支持：**
- 不支持 TypeScript。您可以在Javascript中使用 Joi 进行类型验证。
- 不支持 HRM 热更新。Nodestack 使用 liveReload 进行页面重新加载。

这是一个新项目，如果遇到问题，欢迎提问！

**nodestack以服务端渲染(SSR)为主，后端基于hapi，你可以在 [此处](https://hapi.dev) 查看后端所有文档，前端使用React，你可以在 [此处](https://react.dev/learn/your-first-component) 查看相关文档**

# 如何安装
首先确认你的电脑已经安装 node >= v20 版本,并执行以下命令

    $ mkdir nodestack && cd nodestack && npm init
    $ npm i @ndsk/ndsk

现在你已安装必要的包，接下来让我们继续开始
   
   
# 从路由开始

- 在根目录创建src文件夹
- 在src目录下创建pages目录，并添加index.js文件，输入以下代码

        export default (props)=>{  
            return (
                <html>
                    <head>
                        <title>My app</title> 
                    </head>
                    <body> 
                        <div>
                            index
                        </div>   
                    </body>
                </html>
            );
        }
- 在src目录下创建routes目录，并相应添加index.js文件，输入以下代码   

        export default async (request,h)=>{
            return h.render(); 
        }

- 在package.json添加以下命令

        "scripts": {
            "dev": "ndsk",              
            "start": "ndsk start"       //ndsk start --pm2
            "build": "ndsk build",
        },
- 在终端执行 ``npm run dev``，开浏览器访问  http://127.0.0.1:3000 现在你已经创建了一个简单的路由，并能访问其页面。执行``npm run build``进行编译打包， 然后执行``npm run start``在生产环境启动
- 你无需配置入口文件，以及处理水合各种问题，因为系统都已经自动帮你配置好，nodstack设计的非常简单。你只需要编写页面组件即可。
- 框架默认支持``css`` ``sass``，你可以使用以下方式导入资产文件

        import "../xxx.sass";                 //从相对路径导入
        import "/src/xxx/xxx.sass";           //从项目src目录导入
        import "/node_modules/xxx/xxx.sass";  //从模块导入

- 在项目中你可以使用``react``的``lazy, Suspense``来进行延迟或异步加载,例如以下：
    
        import { lazy,Suspense,useState } from 'react';
        const Test = lazy(() => import('./test')); 
        export default = ()=>{
            const [data,setData] =  useState(false);
            return (
                <div>
                    <button onClick={()=>{ setData(!data) }}>click</button>
                    <Suspense fallback={<span>loading</span>}>
                        {data ? <Test/> : 'empty'}
                    </Suspense>
                </div>
                
            )
        }
        
- 框架使用 [esbuild](https://esbuild.github.io/api/) 编译，如果需要，你可以在项目根目录创建``ndsk.config.js``配置文件中定义esbuild字段来进行配置，例如：

        module.exports = (isPro)=>{
            return {
                esbuild:{
                    //...options
                }
            }
        }

#### 如何进行服务端渲染(SSR)
- 框架本身默认使用SSR，使用 @emotion/styled 版本v10以上， 你无需任何配置，
- 但是如果你使用 [mui](https://mui.com/) 等前端组件框架进行开发，在服务端渲染中可能会遇到水合、以及样式问题，你可以进行以下配置。
        
        import createCache from '@emotion/cache';
        createCache({ key:'css' });
        export default (props)=>{
            return (
            <html>
                <head>
                    <title>{props.title}</title>
                </head> 
                <body> 
                    <div>
                        {props.children} 
                    </div>
                </body>
            </html>
            );
        }

- 如上所示，你只需要在你的入口页面顶部添加以下两行代码即可

        import createCache from '@emotion/cache';
        createCache({ key:'css' });

#### 如何渲染指定页面
- 在路由中使用``h.render()``渲染页面，默认渲染对应的pages目录下文件，如果需要指定渲染某个页面可以这样写
1. 在pages目录创建other.js,并输入以下代码 

        export default (props)=>{  
            return (
                <html>
                    <head>
                        <title>My app</title> 
                    </head>
                    <body> 
                        <div>
                            other
                        </div>   
                    </body>
                </html>
            );
        }
2. 修改routes/index.js文件为以下内容        

        export const page = 'other.js'
        export default async (request,h)=>{
            return h.render(); 
        }

3. 打开浏览器访问 http://127.0.0.1:3000 你应该看到渲染了other页面，如果你要渲染pages/other/test.js,你应该这样定义

        export const page = '/other/test.js
        export default async (request,h)=>{
            return h.render(); 
        }

#### 如何传递数据给页面
- nodestack路由基于[hapi](https://hapi.dev/api/?v=21.3.3#route-options),使用``h.render()``来进行页面渲染，你可以使用``h.render(props)``给页面传递数据，``props``是一个``Object``对象
1. 修改pages/other.js为以下内容

        export default (props)=>{  
            return (
                <html>
                    <head>
                        <title>My app</title> 
                    </head>
                    <body> 
                        <div>
                            {pros.text}
                        </div>   
                    </body>
                </html>
            );
        }
2. 修改routes/index.js为以下内容

        export const page = 'other.js'
        export default async (request,h)=>{
            return h.render({text:"this is other page"}); 
        }    
3. 打开浏览器访问 http://127.0.0.1:3000 你的页面应该显示了``this is other page``。          

#### 如何定义layout页面  

- 在以前使用react引入layout组件你或许会这样写，例如使用``next.js + express``或其它框架来实现服务端渲染SSR，如果有很多页面引入这个layout组件并需要传递数据的情况下会变得非常麻烦。你可能需要做很多重复的事情。接下来看下nodestack如何简单实现此功能。

        import Layout from './layout';
        export default (props)=>{  
            return (
                <Layout data={data}>
                    <div>
                        {props.text}
                    </div>
                </Layout>
            );
        }

- 首先我们先在pages目录创建layout.js文件，并输入以下内容

        export default (props)=>{  
            return (
                <html>
                    <head>
                        <title>My app</title> 
                    </head>
                    <body> 
                        <div>
                            layout
                            {props.text}
                            {props.children}
                        </div> 
                    </body>
                </html>
            );
        }

- 将pages/other.js修改为以下内容，需要删除html头部分，因为已经在layout.js定义了，否则react会出现[水合](https://react.nodejs.cn/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors)报错

        export default (props)=>{  
            return (
                <div>
                    {props.text}
                </div>
            );
        }


- 打开浏览器访问 http://127.0.0.1:3000 可以看到页面已经自动加载了layout组件

#### 如何给layout传递数据

- 在routes目录相应创建layout.js文件，并输入以下内容，注意：layout中直接使用 ``return {}``，而不是``h.render()``

        export default async (request,h)=>{
            return {text:"this is layout page"}; 
        }  

- 打开浏览器访问 http://127.0.0.1:3000 你的页面应该显示了来自layout路由的数据
- 创建layout.js之后会自动加载，如果需要关闭，你可以在routes/index.js这样定义

        exprot const layout = false;
        export const page = 'other.js'
        export default async (request,h)=>{
            return h.render({text:"this is other page"}); 
        } 

- 你也可以自定义指定需要加载的layout组件，例如以下，将会按顺序自动加载layout组件

        exprot const layout = ['layout.js','other/layout','test.js];
        export const page = 'other.js'
        export default async (request,h)=>{
            return h.render({text:"this is other page"}); 
        } 

- **注意**：如果你需要给layout组件传递数据，则必须在routes目录下创建对应的layout文件。

#### 如何自定义路由url
- 默认情况下路由url对应routes目录结构，例如：
    - 在routes创建test.js，你应该访问 http://127.0.0.1:3000/test 
    - 在routes创建test/index.js，如果上面的test.js已存在，你应该访问 http://127.0.0.1:3000/test/index 否则 http://127.0.0.1:3000/test 
    
- 你可以使用path来自定义路由url,例如：修改routes/index.js为以下，**注意**：路由是唯一的

        export const path = '/index1'
        export const page = '/other.js
        export default async (request,h)=>{
            return h.render(); 
        }
- 接下来打开 http://127.0.0.1:3000/index1 即可访问

#### 如何获取url参数

1. 修改routes/index.js为以下

        export const path = '/index1'
        export const page = '/other/test.js
        export default async (request,h)=>{
            const {query} = request;
            return h.render({query,text:"this is other page"});
        }

2. pages/other.js修改为以下内容

        export default (props)=>{  
            return (
                <div>
                    {props.text}---{JSON.stringify(props.query)}
                </div>
            );
        }
3. 接下来打开 http://127.0.0.1:3000/index1?id=1 访问即可看到url参数 

#### 如何访问静态文件
- 在根目录创建static文件夹，并添加一个名为 test.png 图片文件
- 现在你可以打开 http://127.0.0.1:3000/static/test.png

#### RESTful API
1. 在routes目录创建api.js,并输入以下代码

        export const method = 'POST'; //['GET','POST']
        export default async (request,h)=>{
            const {payload} = request;
            return payload
        }

2. pages/other.js修改为以下内容

        import { useState } from "react";
            export default (props)=>{  
            const [data,setData] = useState({})
            const Post = ()=>{
                fetch('./api',{ 
                    method: "POST",
                    body: JSON.stringify({ username: "example" }),
                }).then(async res=>{
                    setData(await res.json())
                })
            }
            return (
                <div>
                {props.text}---{JSON.stringify(props.query)}
                <div><button onClick={Post}>Get api</button> {data.username}</div>
                </div>
            );
        }

- **nodestack后端核心基于hapi**
- 你可以从这里查看获取``request``各项参数的详细文档 https://hapi.dev/api/?v=21.3.3#request
- 你可以在这里查看路由``routes``详细配置 https://hapi.dev/api/?v=21.3.3#route-options

---

#### 如何创建中间件
1. 在src文件下创建middleware目录
2. 在middleware目录下添加test.js文件，并输入以下内容

        module.exports = {
            name:"test", //你的中间件名称名称
            handler:async (request,h)=>{
                h.next({name:"this is test moddleware"});
            }
        }

3. 修改routes/api.js为以下内容

        export const method = 'GET'; //['GET','POST']
        export const options = {
            plugins:{
               middleware:{
                    test:true
               } 
            }
        };
        export default async ({middleware},h)=>{
            return request.middleware.test
        }

4. 打开 http://127.0.0.1:3000/api 你应该能够看到test中间件内容，中间件使用 ``h.next(...)``继续处理生命周期，使用 ``return ...``结束当前生命周期，你可以使用``request.route.settings.plugins.middleware``来获取当前路由中间件配置，例如：把middleware目录下test.js修改为以下内容

        module.exports = {
            name:"test", //你的中间件名称名称
            handler:async (request,h)=>{
                const config = request.route.settings.plugins.middleware.test;
                console.log(config);
                const id = request.query.id
                if(id === '1'){
                    h.next({name:"this is test moddleware"});
                }else if(id === '2'){
                    return 'end---'
                }else{
                    return h.redirect('https://hapi.dev');
                }
            }
        }
5. 你可以分别输入以下网址查看各自响应 
- http://127.0.0.1:3000/api
- http://127.0.0.1:3000/api?id=1 
- http://127.0.0.1:3000/api?id=2  

#### 如何创建插件   
1. 在src文件下创建plugins目录
2. 在plugins目录下添加test.js文件，并输入以下内容

        exports.plugin  = {
            name: 'example',
            register: async (server) =>{
                const collection = server.mongo.client.db('ndsk').collection('xxx');   //获取数据库集合
                server.ext('onRequest', async function (request, h) {
                    //...code
                    return h.continue;
                });
            }
        }
3. 插件以``return h.continue;``继续当前生命周期，修改或添加插件生效需要重启服务器，如果不想手动重启你可以配置pm2来自动监听重启，nodestack内置pm2,你可以在启动的时候添加 ``--pm2``来启动服务，例如：

        "scripts": {
            "dev": "ndsk --pm2",
            "dev": "ndsk start --pm2",
        }

- 你可以在 [此处](https://hapi.dev/tutorials/plugins/?lang=en_US) 查看插件相关教程

#### 如何开启速率限制
- 为了防止各类攻击，框架默认配置了速率限制功能，你可以在``ndsk.config.js``中进行全局配置，以下配置限制每个用户每1秒只能访问10次

        module.exports = (isPro)=>{
            return {
                server:{
                    plugins:{
                        ratelimit:{
                            userLimit:10,                         //用户每个时间段可以发出的总请求数
                            userCacheExp:1000                     //缓存过期时间
                        }
                    }
                }  
            }
        }
- 你也可以在路由中单独配置，例如修改routes/api.js 添加以下内容,限制当前路由每个用户每1s只能访问1次

        export const options = {
            plugins:{
                ratelimit:{
                    userPathLimit:2,
                    userPathCacheExp:1000,
                }
            }
        }
- 你还可以这样配置，例如以下，例如修改routes/api.js 添加以下内容,限制当前路由每10s只能访问1次(所有用户在内)

        export const options = {
            plugins:{
                ratelimit:{
                    pathLimit:1,
                    pathCacheExp:10000,
                }
            }
        }

- 提供以下配置
   - ``enabled`` 在路由配置中将其设置为``false``可绕过该路由的所有速率限制
   - ``userLimit`` 每个用户每段时间内可发出的请求总数,设置为``false``可禁用限制每个用户的请求数
   - ``userCacheExp`` 用于存储用户速率限制信息的缓存周期``ms``
   - ``pathLimit`` 每个时间段内给定路径上可发出的请求总数。设置为``false``可禁用限制每个路径的请求数。
   - ``pathCacheExp`` 用于存储路径速率限制信息的缓存段的名称``ms``
   - ``userPathLimit`` 每个用户每个时间段内可在给定路径上发出的总请求数。设置为``false``可禁用限制每个用户每个路径的请求数
   - ``userPathCacheExp`` 用于存储 userPath 速率限制信息的缓存周期``ms``
   - ``ignorePathParams`` 如果为``false``，则限制将应用于路由（``/route/{param}``：单个缓存条目）而不是路径（``/route/1``或``/route/2：2`` 个不同的缓存条目

#### 如何添加定时任务
- 你可以在配置文件ndsk.config.js中添加以下代码
    
        module.exports = (isPro)=>{
            return {
                server:{
                    plugins:{
                        cron:[
                            {
                                name:"job",                        //任务名称
                                time:'*/1 * * * * *',              //表达式,这里表示每秒执行1次
                                timezone:"Asia/Shanghai",          //时区
                                scheduled:true,                    //任务状态，ture为启动
                                handler:(server)=>{                //处理程序，server来自服务器
                                    // const collection = server.mongo.client.db('ndsk').collection('xxx');
                                    // fetch('http://127.0.0.1:3000/api').then(async res=>{
                                    //     console.log(await res.text())
                                    // })
                                    console.log(`this is a cron`)
                                }
                            }
                        ]
                    }
                }  
            }
        }
- 你可以添加多个任务，``time`` 格式文档可以在 http://crontab.org/ 查看
- 修改package.json,使用内置pm2启动多线程情况下不会造成重复执行任务

        "scripts": {
            "dev": "ndsk --pm2",
            "start": "ndsk start --pm2"
        },

#### 如何配置socket
1. 你可以使用 [``socket.io``](https://socket.io/) 来配置socket
2. 终端执行 `` npm i socket.io socket.io-client `` 
3. 在src/plugins目录下添加socket.js文件,并填入以下代码

        const { Server } = require("socket.io");
        exports.plugin  = {
            name: 'socket',
            register: async (server) =>{
                const io = new Server(server.listener,{
                    path:"/socket"
                });
                io.use((socket, next) => {
                    // ..code
                    next()
                });

                io.on("connection", (socket) => {
                    socket.emit('status','Socket connection successful')
                });
            }
        }
4. 添加src/routes/socket.js文件，并填入以下代码
     
        export default async (request,h)=>{       
            return h.render(); 
        }
4. 添加src/pages/socket.js文件，并填入以下代码

        import { useState,useEffect } from "react";
        import { io } from "socket.io-client";

        export default (props)=>{  
            const [status,setStatus] = useState('Waiting')
            useEffect(() => {
                const socket = io.connect("ws://127.0.0.1:3000", {
                    path:'/socket', 
                    transports: ['websocket']
                });
                socket.on('status',data=>{
                    setStatus(data)
                })
            },[]);
            return (
                <div> {status}</div>
            );
        }
6. 打开网址 http://127.0.0.1:3000/socket 你应该已经能看到 ``Socket connection successful`` 消息
7. 在 [此处](https://socket.io/) 查看socket.io相关文档
        
#### 如何配置mongodb
1. 在项目根目录创建ndsk.config.js，并输入以下内容，支持配置多个mongodb

        module.exports = (isPro)=>{
            return {
                server:{
                    plugins:{
                        mongodb:{
                            name:"mongo",  //插件名称
                            client:[
                                {
                                    name:'client',   //request.mongo.client
                                    uri:'mongodb+srv://********', 
                                    config:{}     //mongodb config
                                },
                                // {
                                //    name:'client1',   //request.mongo.client1
                                //    uri:'mongodb+srv://********',
                                //    config:{}     //mongodb config
                                //}
                            ]
                        }
                    }
                }
            }
        }
2. 接下来你可以在路由中使用 ``request.mongo.client`` 进行数据库操作，例如：把routes/api.js修改为以下内容

        export default async (request,h)=>{
            const client = request.mongo.client
            await client.admin.createDatabase('ndsk','test');   //创建ndsk数据库并添加test集合
            const collection = client.db('ndsk').collection('test'); 
            await collection.insertOne({username:'test'});  //向集合中添加一条数据
            return collection.findOne();     
        }

3. **注意** 你的mongodb版本必须 >= v5.0

#### CRUD
- 使用``request.mongo.client.admin``链接管理数据库

        const admin = request.mongo.client.admin;
- ``admin`` 支持以下操作  
    -  [``createDatabase``](https://www.mongodb.com/docs/v5.3/reference/method/db.createCollection/)
    -  [``listDatabases``](https://mongodb.github.io/node-mongodb-native/3.6/api/Admin.html#listDatabases)    
    -  [``buildInfo``](https://mongodb.github.io/node-mongodb-native/3.6/api/Admin.html#buildInfo)
    -  [``serverInfo``](https://mongodb.github.io/node-mongodb-native/3.6/api/Admin.html#serverInfo)    
    -  [``serverStatus``](https://www.mongodb.com/docs/v2.2/reference/server-status/)
    -  [``addUser``](https://mongodb.github.io/node-mongodb-native/3.6/api/Admin.html#addUser)
    -  [``removeUser``](https://mongodb.github.io/node-mongodb-native/3.6/api/Admin.html#removeUser)
    -  [``replSetGetStatus``](https://mongodb.github.io/node-mongodb-native/3.6/api/Admin.html#replSetGetStatus)
    -  [``ping``](https://mongodb.github.io/node-mongodb-native/3.6/api/Admin.html#ping)
    -  [``command``](https://mongodb.github.io/node-mongodb-native/3.6/api/Admin.html#command)
    -  [``startSession``](https://www.mongodb.com/zh-cn/docs/manual/core/transactions/)
    -  [``watch``](https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html#watch)
    ---
- 使用``request.mongo.client.db(xxx)``操作数据库,``xxx``你的数据库名称

        const db = request.mongo.client.db('ndsk');
- ``db`` 支持以下操作    
    -  [``createCollection``](https://www.mongodb.com/docs/manual/reference/method/db.createCollection)
    -  [``renameCollection``](mongodb.com/docs/manual/reference/method/db.collection.renameCollection/)    
    -  [``dropCollection``](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#dropCollection)
    -  [``dropDatabase``](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#dropDatabase)    
    -  [``listCollections``](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#listCollections)
    -  [``stats``](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#stats)
    ---
- 使用``request.mongo.client.db('ndsk').collection(xxx)``操作数据库,``xxx``你的集合名称

        const collection = request.mongo.client.db('ndsk').collection('xxx');
- ``collection`` 支持以下方法 
    -  [``find``](https://mongodb.github.io/node-mongodb-native/3.6/api/Cursor.html)
    -  [``aggregate``](https://www.mongodb.com/zh-cn/docs/manual/reference/method/db.collection.aggregate/)  
    -  [``insertOne``](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/)
    -  [``insertMany``](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/)  
    -  [``findOne``](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/)
    -  [``updateOne``](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/)
    -  [``updateMany``](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/)
    -  [``replaceOne``](https://www.mongodb.com/docs/manual/reference/method/db.collection.replaceOne/)
    -  [``findOneAndUpdate``](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/)
    -  [``findOneAndReplace``](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndReplace/)  
    -  [``deleteOne``](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/)
    -  [``deleteMany``](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/)  
    -  [``findOneAndDelete``](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndDelete/)
    -  [``count``](https://www.mongodb.com/docs/manual/reference/method/db.collection.count/)
    -  [``countDocuments``](https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#countDocuments)
    -  [``estimatedDocumentCount``](https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#estimatedDocumentCount)
    -  [``distinct``](https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#distinct)
    -  [``createIndex``](https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#createIndex)  
    -  [``createIndexes``](https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#createIndexes)
    -  [``indexInformation``](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#indexInformation)  
    -  [``dropIndex``](https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndex/)
    -  [``dropIndexes``](https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndexes)
    -  [``watch``](https://www.mongodb.com/docs/drivers/node/current/usage-examples/changeStream/)
    -  ``pagination`` 专门为分页查询自定义的方法，并自动优化了``aggregate``操作，能够使得在千万级乃至更高数据查询毫无压力， 使用如下

            return await collection.pagination(options);
- ``pagination``中的``options``接受以下参数
    - query
    - sort
    - [page](https://www.mongodb.com/docs/manual/reference/operator/aggregation/size/)
    - [limit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/)
    - [project](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/), 
    - [count](https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/) 
    - [lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)
    - [group](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)
       

####  如何进行字段校验
1. 虽然mongodb自带了字段校验功能，但是或许对我们来说用的并不是那么完美，nodestack使用[Joi](https://joi.dev/)来校验，下面看下如何实现
2. 在src目录创建mongodb/client/ndsk目录，并添加test.js文件
3. ``client``是你在mongodb配置中的名称，``ndsk``是数据库名称，``test.js``代表集合名称，并在其添加以下内容

        const Joi = require('joi');

        //insert
        export const insert = Joi.array().items({
            username: Joi.string().required(),
            sex:Joi.string().default('man'),
            age:Joi.number().min(0).error(new Error('age must be a number')).required()
        }).required().single();

        //update
        export const update =  Joi.object().keys({
            age:Joi.number().min(0).required()
        }).required();

4. 现在把routes/api.js修改为以下内容

        export default async (request,h)=>{
            const client = request.mongo.client
            const collection = client.db('ndsk').collection('test'); 
            await collection.insertOne({username:'rocky',age:'test'});  //向集合中添加一条数据
            return collection.findOne();     
        }
5. 访问 http://127.0.0.1:3000/api 你应该能看到一个错误页面并提示``age must be a number``.
6. mongodb使用Joi来进行字段校验，你也可以在校验规则中添加一些默认值，自定义错误提示等
7. **注意：** 
    -   ``insert``应该使用``Joi.array().items({...}).required().single()``来校验，因为你可能会批量插入数据
    -   ``update``应该使用``Joi.object().keys({}).required()``来校验
        
8. **你可以在 [此处](https://joi.dev/) 查看Joi文档**

#### 服务器配置
- 在根目录添加ndsk.config.js

        module.exports = (isPro)=>{               //isPro用于判断是否是生产环境
            return {
                buildDir:"build",                 //编译目录，默认为build
                compileDir:".ndsk",               //开发模式下的编译目录
                 //服务器配置
                server:{                         
                    port:isPro ? 3001 : 3000      //生产环境端口配置为3001，开发环境为3000
                    //....
                },
                esbuild:{                         //esbuild配置
                    //...
                },
                pm2:isPro ? {                     //pm2配置,当前配置为生产环境开启2个进程，开发环境fork模式
                    name:"production",
                    exec_mode:"cluster",
                    instances : 2
                } : {
                    name:"development"
                }        
            }
        }

- ``server`` 服务器配置，点击 [此处](https://hapi.dev/api/?v=21.3.3#server) 查看``server``相关配置
- ``esbuild`` 编译配置，点击 [此处](https://esbuild.github.io/api/) 查看``esbuild``相关配置
- ``pm2`` pm2配置，点击 [此处](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/) 查看``pm2``相关配置



