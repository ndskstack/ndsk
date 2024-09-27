import Styled from '@emotion/styled';
export default (props)=>{
    const Style = Styled.h1({ 
        color:'blue'
    });
    return <Style>{props.children}</Style>
}