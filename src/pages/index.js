
const App = ({text,title})=>{  
  return (
    <html>
      <head>
        <title>{title}</title> 
      </head>
      <body> 
      <div>
          {text}
      </div>   
      </body>
    </html>
  );

}

export default App;