export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>app/index</title> 
        </head>
        <body> 
            <div><a href='/app/about'>to about</a></div>
            <div><a href='/app/about/index'>to about/index</a></div>
            <div><a href='/app/about/other'>to about/other</a></div>
        </body>
      </html>
    );
}