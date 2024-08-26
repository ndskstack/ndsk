
import {useEffect,useState,lazy,Suspense} from "react";
import { createBrowserRouter, RouterProvider, Link, } from "react-router-dom";
import Home from "./compontents/home.js";
import About from "./compontents/about.js";
export default (props)=>{  
    const [router,setRouter] = useState(null);
    useEffect(()=>{
        setRouter(createBrowserRouter([
            {
              path: "/csr",
              element: <Home/>
            },
            {
              path: "/csr/about",
              element: <About/>
            },
        ]))
    },[])
    return (
      <html lang="en">
        <head>
          <title>{props.name}</title> 
        </head>
        <body> 
            {router ? <RouterProvider router={router} /> : ''}
        </body>
      </html>
    );
}
