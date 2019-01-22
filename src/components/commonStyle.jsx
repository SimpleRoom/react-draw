import styled from 'styled-components';
// common style
const ClearFix = styled.div`
    &:before,&:after{
        display: table;
        content: "";
        clear: both;
    }
`;
const levelZindex = 10

export { ClearFix, levelZindex }