// import Child from 'child_process;'
const Child = require('node:child_process');

const test = async (type) => {
    for (var i = 0; i < 10; i++) {
        const time = new Date()

        // const res = Child.spawn('node',['node_modules/@remix-run/dev/dist/cli.js',`vite:${type}`]); //remix
        const res = Child.spawn('node', ['node_modules/@ndsk/ndsk/index.js', type]);   //ndsk
        // const res = Child.spawn('node',['node_modules/next/dist/bin/next',[type]]);   //nextjs
        // const umi = ['node_modules/umi/bin/umi',type];  //or build

        const timer = await new Promise((resolve, reject) => {
            res.stdout.on(type === 'dev' ? 'data' : 'finish', (data) => {    //data/finish
                resolve(new Date() - time);
            })
        }).catch(error => {
            console.log(error.message)
        });
        console.log(timer)
        process.exit();

    }
}

test('dev')