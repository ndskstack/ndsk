
import './style.scss'
export default (props)=>{  
  return (
    <html>
        <head>
          <title>{props.title}</title> 
        </head>
        <body> 
          <div className="index">
            <h1>Hello world!</h1>
          </div>
        </body>
      </html>
  );
}
