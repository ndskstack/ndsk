
import {lazy,useState,Suspense} from 'react';
const About = lazy(() => import('./compontents/about.js'));
export default (props)=>{  
    const [value,setValue] = useState(false);

    const onClick = async ()=>{
        setValue(!value)
    }

    return (
      <html lang="en">
        <head>
          <title>dynamic load</title> 
        </head>
        <body> 
            <div>
                <button onClick={onClick}>load {!value ? 'about' : 'index'}</button>
            </div>
            {value ? <Suspense> <About /> </Suspense> : props.children}
        </body>
      </html> 
    );
}