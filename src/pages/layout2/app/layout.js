export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>layout1</title> 
        </head>
        <body> 
            <div> <a href='/layout2/app'>to index</a> </div>
            <div> <a href='/layout2/app/about'>to about</a> </div>
            {props.children}
        </body>
      </html> 
    );
}