export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>layout</title> 
        </head>
        <body> 
            <div> <a href='/layout'>to index</a> </div>
            <div> <a href='/layout/about'>to about</a> </div>
            <div> <a href='/layout/app'>to app/index</a> </div>
            <div> <a href='/layout/app/about'>to app/about</a> </div>
            <div> <a href='/layout/app/app1'>to app/app1/index</a> </div>
            <div> <a href='/layout/app/app1/about'>to app/app1/about</a> </div>
            {props.children}
        </body>
      </html> 
    );
}