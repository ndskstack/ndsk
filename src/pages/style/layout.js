import './compontents/global.scss';
export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>style</title> 
        </head>
        <body>
            <div><a href="/style/index">to app index</a></div>
            <div><a href="/style/about">to app about</a></div>
            <div><a href="/style/contact">to app contact</a></div>
            {props.children}
        </body>
      </html>
    );
}