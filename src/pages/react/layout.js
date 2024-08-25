export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>{props.title}</title> 
        </head>
        <body> 
            {props.children}
        </body>
      </html>
    );
}