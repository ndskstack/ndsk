export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>{props.statusCode}</title> 
        </head>
        <body>
            {props.message}
        </body>
      </html>
    );
}