import {useState,useEffect} from 'react'
export default (props)=>{  

    const [value,setValue] = useState(null)
    useEffect(()=>{
        fetch('/cache/test').then(res=>res.text()).then(res=>{
        setValue(res)
        })
    },[]);
    return (
      <html lang="en">
        <head>
          <title>test</title> 
        </head>
        <body> 
            {value}
        </body>
      </html>
    );
}