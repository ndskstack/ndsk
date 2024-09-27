import createCache from '@emotion/cache';
createCache({ key:'css' });
export default (props)=>{
    return (
      <html>
        <head>
          <title>my app</title>
        </head> 
        <body> 
          {props.children}
        </body>
      </html>
    );
}