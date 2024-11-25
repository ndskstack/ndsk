// import Child from 'child_process'
const Child = require('node:child_process')
// for(var i=0;i<=9;i++){
    const time = new Date()

    // const res = Child.spawn('node',['node_modules/@remix-run/dev/dist/cli.js','vite:dev']); //remix
    // const res = Child.spawn('node',['node_modules/@ndsk/ndsk/index.js','dev']);   //umi
    const res = Child.spawn('node',['node_modules/next/dist/bin/next',['build']]);   //nextjs
    
    res.stdout.on('finish', (data) => {
        console.log(new Date()-time)
    })
// }