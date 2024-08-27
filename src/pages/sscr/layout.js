import SSCR from '@ndsk/sscr';
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
                        <li><a href='/sscr'>Home</a></li>
                        <li><a href='/sscr/about'>About</a></li>
                        <li><a href='https://www.google.com/' target='_blank'>Google</a></li>
                    </ul>
                </Menu>
                <Main>
                    <SSCR>{props.children}</SSCR>
                </Main>
            </Container>
        </body>
      </html>
    );
}