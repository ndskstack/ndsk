export default (props)=>{  
  return (
    <html lang="en">
      <head>
        <title>{props.title}</title>
         <meta name="description" content={props.description}/>
         <meta name="keywords" content={props.keywords}/>
         <meta name="author" content={props.author}/> 
      </head> 
      <body> 
      <div>
          <div><a href='/get_data/index'>index</a></div>
          <div><a href='/get_data/about'>about</a></div>
          <div><a href='/get_data/app'>app</a></div>
      </div>
      <div>{props.children}</div>
      </body>
    </html>
  );
}