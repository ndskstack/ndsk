export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>layout1</title> 
        </head>
        <body> 
            <div> <a href='/layout1/app'>to app</a> </div>
            <div> <a href='/layout1/blog'>to blog</a> </div>
            {props.children}
        </body>
      </html> 
    );
}