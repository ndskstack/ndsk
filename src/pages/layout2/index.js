export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>layout2</title> 
        </head>
        <body> 
            <div> <a href='/layout2/blog'>to blog</a> </div>
            <div> <a href='/layout2/app'>to app</a> </div>
            {props.children}
        </body>
      </html> 
    );
  }