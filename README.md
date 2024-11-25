


# Read the documentation here https://ndsk.dev
# 中文文档 https://ndsk.dev/zh

# Introduction
**[ndsk](https://ndsk.dev)** (node ​​stack) is a next-generation full-stack framework for JavaScript developers. It is designed to be very simple, allowing you to create secure, high-performance, high-quality programs with minimal code. It has powerful routing, flexible layout modes, fast compilation speed, extensible plug-ins and middleware, and supports server-side rendering (SSR), client-side rendering (CSR), static rendering (SSG), and hybrid mode `SSCR`. It almost makes up for all the shortcomings of other frameworks, all for the purpose of improving development efficiency.

#### Main advantages:
- Safe, very simple design, powerful, ready to use, no additional configuration required
- Supports various rendering modes such as server-side rendering (SSR), CSR, SSG, SSCR, etc., the first screen rendering speed is super fast, very friendly to SEO
- Automatically optimize the package size, the compilation speed is super fast, about 10-100 times that of other frameworks
- Support server-side hot update, no need to restart the server with tools such as nodemon every time the code is modified
- Support real-time page reload, modify the front-end components and back-end routes to automatically refresh the page
- Support detailed error stack tracking function in development mode
- Super fast startup speed, it dynamically compiles according to page requests, without the need to compile all pages every time
- Automatic compilation, and supports ES5\ES6+
- Powerful routing function, support dynamic routing
- Compared with other frameworks, it supports more flexible layout modes
- Use `react` `renderToPipeableStream` to render pages, support `lazy, Suspense` asynchronous loading
- It has built-in major modules such as `mongodb`, no additional configuration is required, and it supports front-end, back-end, and full-stack development.

# `ndsk` is the fastest framework currently
#### Comparison under Ubuntu:

| frame&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        | start up(Development)       | Compile(Bundle)            | First screen loading(DOMContentLoaded)       |
| -----------       | -----------       | -----------       | -----------       |
| **Ndsk**         | ~ 0.4s             | ~ 0.4s            | ~ 0.008s             |
| **Remix**          | ~ 0.7s              | ~ 1.7s         | ~ 0.010s              |
| **Next**           | ~ 2.2s              | ~ 8s         | ~ 0.008s              |

-

# Start installation

**Create a project directory and enter**
~~~shell
$ mkdir my-nodestack-app
$ cd my-nodestack-app 
~~~

\
**Next, start creating the project and installing the necessary packages. If prompted, just press `Enter`**
~~~shell
$ npm create nodestack
$ npm i
~~~

\
**Now that you have completed the installation, you should see the following directory structure**
~~~js
my-nodestack-app
├── src
│   ├── pages
│   │   └── index.js
│   │   └── style.scss
├── ndsk.config.js
└── package.json
~~~

\
**Open the package.json file, you can see the following content in the script**
~~~js
{
    "scripts": {
        "dev": "ndsk",
        "build": "ndsk build",
        "start": "ndsk start"
    }
}
~~~

\
**These scripts correspond to different stages of the program:**

- dev: Run `npm run dev` to start nodestack in development mode
- build: Run `npm run build` to start building the project
- start: Run `npm run start` to run the built project in production environment

\
**Now enter the following code in the terminal to start our first project**
~~~shell
$ npm run dev
~~~

\
**You can see the following log output**
~~~shell
> My App@1.0.0 dev
> ndsk

> Startup time:450ms Ready on http://localhost:3000
~~~

# **[Get Start](https://ndsk.dev/?id=install)**


# Donate

<!-- **In the past year or so, I have given up all other work and devoted all my time to the current project. In order to maintain normal updates and maintenance, I hope to get financial sponsorship. If you are interested, you can contact me by email at rockyshi1993@gmail.com** -->

**You can donate to me through the following link**
- `PayPal:` https://paypal.me/rockyshi1993