export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>custom layout</title> 
        </head>
        <body> 
            <div> <a href='/custom_layout'>to index</a> </div>
            <div> <a href='/custom_layout/about'>to about</a> </div>
            <div> <a href='/custom_layout/navigation'>to navigation Bar</a> </div>
            {props.children}
        </body>
      </html> 
    );
}