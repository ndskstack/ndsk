import SSCR from '@ndsk/sscr'
export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>{props.title || 'sscr'}</title> 
        </head>
        <body>
            <div><a href="/sscr/index">to index</a></div>
            <div><a href="/sscr/about">to about</a></div>
            <div><a href="/sscr/app">to app</a></div>
            <SSCR>{props.children}</SSCR>
        </body>
      </html> 
    );
}