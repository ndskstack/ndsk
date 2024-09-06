export default (props)=>{  
  return (
    <html lang="en">
      <head>
        <title>layout1</title> 
      </head>
      <body> 
          <div> <a href='/layout2/blog'>to index</a> </div>
          <div> <a href='/layout2/blog/about'>to about</a> </div>
          {props.children}
      </body>
    </html> 
  );
}