import {useEffect,useState,lazy,Suspense} from "react";
const routes = {
  '/csr/about':lazy(() => import('./compontents/about.js')),
  '/csr/home':lazy(() => import('./compontents/home.js')),
}
export default (props)=>{  
    const [isClient,setIsClient] = useState(null);
    useEffect(()=>{
      setIsClient(true)
    },[])

    const App = ()=>{
      const [Page,setPage] = useState(routes['/csr/home'])
      const Link = (props)=>{
        return <a href={props.path} onClick={(e)=>{
          e.preventDefault();
          setPage(routes[props.path])
        }}>{props.children}</a>
      }
      return (
        <div>
          <div><Link path="/csr/home">to home</Link></div>
          <div><Link path="/csr/about">to about</Link></div>
          <Suspense> <Page/></Suspense>
        </div>
      )
    }
    return (
      <html lang="en">
        <head>
          <title>{props.title}</title> 
        </head>
        <body> 
            {isClient ? <App/> : '<div>loading</div>'}
        </body>
      </html>
    );
}