import Styled from '@emotion/styled';
const Container = Styled.div({ display:'flex',flexDirection:'row',position:'relative',border:'1px #DDDDDD solid',});
const Menu = Styled.div({  width:300});
const Main = Styled.div({ display:"flex",justifyContent:'center',alignItems:'center',flexGrow:1});
export default (props)=>{  
    return (
      <html lang="en">
        <head>
          <title>{props.title}</title> 
        </head>
        <body> 
            <h1>layout1</h1>
            <Container>
              <Menu>
                  <ul>
                      <li><a href='/react'>Home</a></li>
                      <li><a href='/react/about'>About</a></li>
                  </ul>
              </Menu>
              <Main>{props.children}</Main>
          </Container>
        </body>
      </html>
    );
}