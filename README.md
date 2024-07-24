- **[中文](https://github.com/rockyshi1993/nodestack/blob/main/README_ZH.md)** 
- **[English](https://github.com/rockyshi1993/nodestack/blob/main/README.md)**
# What is nodestack?
[nodestack](https://nodestack.dev) It is a full-stack framework for JavaScript developers. It is designed to be very simple, allowing you to create high-performance, high-quality programs with minimal code, all for the purpose of improving development efficiency.[node](https://nodejs.org/)、[hapi](https://hapi.dev/)、[react](https://react.dev/)、[mongodb](https://www.mongodb.com/)etc. to build, use [esbuild](https://esbuild.github.io/) As a compilation tool.

**Advantage:**
- No configuration required
- Very simple, small, safe, fast, and ready to use
- Supports automatic code updates, no need to restart the server with tools such as nodemon after each code modification.
- Compile speed is increased by 20-100 times using esbuild.
- Powerful routing function.
- Supports ES5\ES6+ at the same time

**Not supported:**
- TypeScript is not supported. You can use Joi for type validation in Javascript.
- HRM hot update is not supported. Nodestack uses liveReload for page reload.

This is a new project, so if you run into problems, feel free to ask!

**Nodestack is based on server-side rendering (SSR) and the backend is based on hapi. You can find it [Here](https://hapi.dev) View all the backend documentation. The frontend uses React, You can [Here](https://react.dev/learn/your-first-component) View related documents**

# how to install
First, make sure your computer has node >= v20 installed and execute the following command

    $ mkdir nodestack && cd nodestack && npm init
    $ npm i @ndsk/ndsk

Now that you have the necessary packages installed, let’s get started.
   
   
# Start with Routing

- Create a src folder in the root directory
- Create a pages directory under the src directory and add the index.js file, enter the following code

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
- Create a routes directory under the src directory and add an index.js file accordingly. Enter the following code

        export default async (request,h)=>{
            return h.render(); 
        }

- Add the following command in package.json

        "scripts": {
            "dev": "ndsk",              
            "start": "ndsk start"       //ndsk start --pm2
            "build": "ndsk build",
        },
- Execute ``npm run dev`` in the terminal and open a browser to visit http://127.0.0.1:3000 Now you have created a simple route and can access its page. Execute ``npm run build`` to compile and package, and then execute ``npm run start`` to start in the production environment
- You don't need to configure the entry file and deal with various hydration issues, because the system has automatically configured it for you. Nodstack is designed to be very simple. You only need to write page components.
- The framework supports ``css`` ``sass`` by default. You can import asset files in the following ways

        import "../xxx.sass";                 //Importing from a relative path
        import "/src/xxx/xxx.sass";           //Import from the project src directory
        import "/node_modules/xxx/xxx.sass";  //Importing from a module

- In your project, you can use ``react``'s ``lazy, Suspense`` to perform delayed or asynchronous loading, such as the following:
    
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
        
- Framework Usage [esbuild](https://esbuild.github.io/api/) Compile. If necessary, you can define esbuild fields in the ndsk.config.js configuration file created in the project root directory to configure it, for example:

        module.exports = (isPro)=>{
            return {
                esbuild:{
                    //...options
                }
            }
        }

#### How to perform server-side rendering (SSR)
- The framework itself uses SSR by default, using @emotion/styled version v10 or above, you don't need to configure anything
- However, if you use a front-end component framework such as [mui](https://mui.com/) for development, you may encounter hydration and style issues in server-side rendering. You can make the following configuration.
        
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

- As shown above, you only need to add the following two lines of code at the top of your entry page

        import createCache from '@emotion/cache';
        createCache({ key:'css' });

#### How to render a specific page
- Use ``h.render()`` in the route to render the page. By default, the files in the corresponding pages directory are rendered. If you need to specify a page to render, you can write it like this
1. Create other.js in the pages directory and enter the following code

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
2. Modify the routes/index.js file to the following content       

        export const page = 'other.js'
        export default async (request,h)=>{
            return h.render(); 
        }

3. Open your browser and visit http://127.0.0.1:3000. You should see the other page rendered. If you want to render pages/other/test.js, you should define it like this

        export const page = '/other/test.js
        export default async (request,h)=>{
            return h.render(); 
        }

#### How to pass data to the page
- Nodestack routing is based on [hapi](https://hapi.dev/api/?v=21.3.3#route-options) Use ``h.render()`` to render the page. You can use ``h.render(props)`` to pass data to the page. ``props`` is an ``Object`` object
1. Modify pages/other.js to the following content

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
2. Modify routes/index.js to the following content

        export const page = 'other.js'
        export default async (request,h)=>{
            return h.render({text:"this is other page"}); 
        }    
3. Open your browser and visit http://127.0.0.1:3000. Your page should show ``this is other page``.         

#### How to define the layout page

- In the past, you might write this when using react to introduce layout components, for example, using ``next.js + express`` or other frameworks to implement server-side rendering SSR. If many pages introduce this layout component and need to pass data, it will become very troublesome. You may need to do a lot of repetitive things. Next, let's see how nodestack can easily implement this function.

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

- First, we create a layout.js file in the pages directory and enter the following content

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

- Modify pages/other.js to the following content. You need to delete the HTML header part because it has been defined in layout.js, otherwise react will appear [水合](https://react.nodejs.cn/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors) Report an error

        export default (props)=>{  
            return (
                <div>
                    {props.text}
                </div>
            );
        }


- Open the browser and visit http://127.0.0.1:3000. You can see that the page has automatically loaded the layout component.

#### How to pass data to layout

- Create a layout.js file in the routes directory and enter the following content. Note: Use ``return {}`` directly in layout instead of ``h.render()``

        export default async (request,h)=>{
            return {text:"this is layout page"}; 
        }  

- Open your browser and visit http://127.0.0.1:3000. Your page should show the data from the layout route.
- It will be automatically loaded after creating layout.js. If you need to turn it off, you can define it in routes/index.js like this

        exprot const layout = false;
        export const page = 'other.js'
        export default async (request,h)=>{
            return h.render({text:"this is other page"}); 
        } 

- You can also customize the layout components that need to be loaded. For example, the following will automatically load the layout components in order.

        exprot const layout = ['layout.js','other/layout','test.js];
        export const page = 'other.js'
        export default async (request,h)=>{
            return h.render({text:"this is other page"}); 
        } 

- **Note**: If you need to pass data to the layout component, you must create the corresponding layout file in the routes directory.

#### How to customize the routing url
- By default, the route url corresponds to the routes directory structure, for example:
    - Create test.js in routes, you should visit http://127.0.0.1:3000/test
    - Create test/index.js in routes, if the above test.js already exists, you should visit http://127.0.0.1:3000/test/index otherwise http://127.0.0.1:3000/test
    
- You can use path to customize the route url, for example: modify routes/index.js to the following, **Note**: The route is unique

        export const path = '/index1'
        export const page = '/other.js
        export default async (request,h)=>{
            return h.render(); 
        }
- Next, open http://127.0.0.1:3000/index1 to access

#### How to get url parameters

1. Modify routes/index.js to the following

        export const path = '/index1'
        export const page = '/other/test.js
        export default async (request,h)=>{
            const {query} = request;
            return h.render({query,text:"this is other page"});
        }

2. pages/other.js is modified to the following content

        export default (props)=>{  
            return (
                <div>
                    {props.text}---{JSON.stringify(props.query)}
                </div>
            );
        }
3. Next, open http://127.0.0.1:3000/index1?id=1 to see the URL parameters.

#### How to access static files
- Create a static folder in the root directory and add a picture file named test.png
- Now you can open http://127.0.0.1:3000/static/test.png

#### RESTful API
1. Create api.js in the routes directory and enter the following code

        export const method = 'POST'; //['GET','POST']
        export default async (request,h)=>{
            const {payload} = request;
            return payload
        }

2. pages/other.js is modified to the following content

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

- **nodestack backend core is based on hapi**
- You can view the detailed documentation of ``request`` parameters here https://hapi.dev/api/?v=21.3.3#request
- You can view the detailed configuration of ``routes`` here https://hapi.dev/api/?v=21.3.3#route-options

---

#### How to create middleware
1. Create a middleware directory under the src file
2. Add the test.js file under the middleware directory and enter the following content

        module.exports = {
            name:"test", //Your middleware name
            handler:async (request,h)=>{
                h.next({name:"this is test moddleware"});
            }
        }

3. Modify routes/api.js to the following content

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

4. Open http://127.0.0.1:3000/api and you should be able to see the test middleware content. The middleware uses ``h.next(...)`` to continue processing the life cycle and uses ``return ...`` to end the current life cycle. You can use ``request.route.settings.plugins.middleware`` to get the current route middleware configuration. For example, modify test.js in the middleware directory to the following content

        module.exports = {
            name:"test", //Your middleware name
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
5. You can enter the following URLs to view their responses 
- http://127.0.0.1:3000/api
- http://127.0.0.1:3000/api?id=1 
- http://127.0.0.1:3000/api?id=2  

#### How to create a plugin
1. Create a plugins directory under the src file
2. Add the test.js file under the plugins directory and enter the following content

        exports.plugin  = {
            name: 'example',
            register: async (server) =>{
                const collection = server.mongo.client.db('ndsk').collection('xxx');   //Get database collection
                server.ext('onRequest', async function (request, h) {
                    //...code
                    return h.continue;
                });
            }
        }
3. The plugin continues the current life cycle with ``return h.continue;``. Modifying or adding plugins requires restarting the server. If you don't want to restart manually, you can configure pm2 to automatically listen for restarts. Nodestack has built-in pm2. You can add ``--pm2`` to start the service at startup, for example:

        "scripts": {
            "dev": "ndsk --pm2",
            "dev": "ndsk start --pm2",
        }

- You can [Here](https://hapi.dev/tutorials/plugins/?lang=en_US) View plugin tutorials

#### How to enable rate limiting
- To prevent various attacks, the framework is configured with rate limiting by default. You can configure it globally in ``ndsk.config.js``. The following configuration limits each user to 10 accesses per second

        module.exports = (isPro)=>{
            return {
                server:{
                    plugins:{
                        ratelimit:{
                            userLimit:10,                         //The total number of requests that a user can make in each time period
                            userCacheExp:1000                     //Cache expiration time
                        }
                    }
                }  
            }
        }
- You can also configure it separately in the route, for example, modify routes/api.js and add the following content to limit the current route to only one access per user every 1 second

        export const options = {
            plugins:{
                ratelimit:{
                    userPathLimit:2,
                    userPathCacheExp:1000,
                }
            }
        }
- You can also configure it like this, for example, modify routes/api.js and add the following content to limit the current route to only be accessed once every 10 seconds (including all users)

        export const options = {
            plugins:{
                ratelimit:{
                    pathLimit:1,
                    pathCacheExp:10000,
                }
            }
        }

- Provide the following configuration
   - ``enabled`` Set this to ``false`` in a route configuration to bypass all rate limits for that route.
   - ``userLimit`` The total number of requests that each user can make per period of time. Set to ``false`` to disable the limit on the number of requests per user
   - ``userCacheExp`` The cache period used to store user rate limit information is ``ms``
   - ``pathLimit`` The total number of requests that can be made on a given path per time period. Set to ``false`` to disable limiting the number of requests per path.
   - ``pathCacheExp`` The name of the cache segment used to store path rate limit information.
   - ``userPathLimit`` The total number of requests that can be made on a given path per user per time period. Set to ``false`` to disable limiting the number of requests per user per path
   - ``userPathCacheExp`` The cache period in milliseconds used to store userPath rate limit information
   - ``ignorePathParams`` If ``false``, the limit will apply to routes (``/route/{param}``: a single cache entry) rather than paths (``/route/1`` or ``/route/2: 2`` different cache entries).

#### How to add a scheduled task
- You can add the following code to the configuration file ndsk.config.js
    
        module.exports = (isPro)=>{
            return {
                server:{
                    plugins:{
                        cron:[
                            {
                                name:"job",                        //mission name
                                time:'*/1 * * * * *',              //Expression, here it means executing once per second
                                timezone:"Asia/Shanghai",          //Time zone
                                scheduled:true,                    //Task status, true means started
                                handler:(server)=>{                //Handler, server from the server
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
- You can add multiple tasks. The ``time`` format document can be viewed at http://crontab.org/
- Modify package.json and use the built-in pm2 to start multiple threads without causing repeated execution of tasks

        "scripts": {
            "dev": "ndsk --pm2",
            "start": "ndsk start --pm2"
        },

#### How to configure the socket
1. You can use [``socket.io``](https://socket.io/) to configure the socket
2. Run `` npm i socket.io socket.io-client `` in the terminal
3. Add the socket.js file to the src/plugins directory and fill in the following code

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
4. Add the src/routes/socket.js file and fill in the following code
     
        export default async (request,h)=>{       
            return h.render(); 
        }
4. Add the src/pages/socket.js file and fill in the following code

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
6. Open the URL http://127.0.0.1:3000/socket You should already see the message ``Socket connection successful``
7. click here](https://socket.io/) View socket.id related documents        
#### How to configure mongodb
1. Create ndsk.config.js in the project root directory and enter the following content to support configuring multiple mongodbs

        module.exports = (isPro)=>{
            return {
                server:{
                    plugins:{
                        mongodb:{
                            name:"mongo",  //Plugin Name
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
2. Next, you can use ``request.mongo.client`` in the route to perform database operations. For example, modify routes/api.js to the following content

        export default async (request,h)=>{
            const client = request.mongo.client
            await client.admin.createDatabase('ndsk','test');   //Create the ndsk database and add the test collection
            const collection = client.db('ndsk').collection('test'); 
            await collection.insertOne({username:'test'});  //Add a piece of data to the collection
            return collection.findOne();     
        }

3. **Note** Your mongodb version must be >= v5.0

#### CRUD
- Use the ``request.mongo.client.admin`` link to manage the database

        const admin = request.mongo.client.admin;
- ``admin`` The following operations are supported  
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
- Use ``request.mongo.client.db(xxx)`` to operate the database, ``xxx`` is your database name

        const db = request.mongo.client.db('ndsk');
- ``db`` The following operations are supported  
    -  [``createCollection``](https://www.mongodb.com/docs/manual/reference/method/db.createCollection)
    -  [``renameCollection``](mongodb.com/docs/manual/reference/method/db.collection.renameCollection/)    
    -  [``dropCollection``](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#dropCollection)
    -  [``dropDatabase``](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#dropDatabase)    
    -  [``listCollections``](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#listCollections)
    -  [``stats``](https://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#stats)
    ---
- Use ``request.mongo.client.db('ndsk').collection(xxx)`` to operate the database, ``xxx`` is your collection name

        const collection = request.mongo.client.db('ndsk').collection('xxx');
- ``collection`` The following methods are supported
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
    -  ``pagination`` A method customized specifically for paging queries, which automatically optimizes the ``aggregate`` operation, can make querying tens of millions or even higher data stress-free, use as follows

            return await collection.pagination(options);
- ``options`` in ``pagination`` accepts the following parameters
    - query
    - sort
    - [page](https://www.mongodb.com/docs/manual/reference/operator/aggregation/size/)
    - [limit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/)
    - [project](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/), 
    - [count](https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/) 
    - [lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)
    - [group](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)
       

####  How to perform field validation
1. Although mongodb comes with a field validation function, it may not be perfect for us. Nodestack uses [Joi](https://joi.dev/) To verify, let's see how to implement it
2. Create a mongodb/client/ndsk directory in the src directory and add the test.js file
3. ``client`` is your name in the mongodb configuration, ``ndsk`` is the database name, ``test.js`` represents the collection name, and add the following content to it

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

4. Now modify routes/api.js to the following content

        export default async (request,h)=>{
            const client = request.mongo.client
            const collection = client.db('ndsk').collection('test'); 
            await collection.insertOne({username:'rocky',age:'test'});  //向集合中添加一条数据
            return collection.findOne();     
        }
5. Visit http://127.0.0.1:3000/api. You should see an error page with the message ``age must be a number``.
6. Mongodb uses Joi to perform field validation. You can also add some default values ​​to the validation rules, customize error prompts, etc.
7. **Note:**
    -   ``insert`` should be validated using ``Joi.array().items({...}).required().single()``, because you may be inserting data in batches
    -   ``update`` should use ``Joi.object().keys({}).required()`` to validate
        
8. **You can [Here](https://joi.dev/) View Joi documentation**

#### server configuration
- Add ndsk.config.js to the root directory

        module.exports = (isPro)=>{               //isPro is used to determine whether it is a production environment
            return {
                buildDir:"build",                 //Compile directory, default is build
                compileDir:".ndsk",               //Compilation directory in development mode
                server:{                          //server configuration
                    port:isPro ? 3001 : 3000      //The production environment port is configured as 3001, and the development environment port is 3000
                    //....
                },
                esbuild:{                         //esbuild deployment
                    //...
                },
                pm2:isPro ? {                     //PM2 configuration, the current configuration is to open 2 processes for the production environment and fork mode for the development environment
                    name:"production",
                    exec_mode:"cluster",
                    instances : 2
                } : {
                    name:"development"
                }        
            }
        }

- ``server`` Server configuration, click [Here](https://hapi.dev/api/?v=21.3.3#server) See ``server`` related configuration
- ``esbuild`` Compile configuration, click [Hre](https://esbuild.github.io/api/) See ``esbuild`` related configuration
- ``pm2`` PM2 configuration, click [Here](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/) See ``pm2`` related configuration



