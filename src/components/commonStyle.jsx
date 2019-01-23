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
const maxZindex = 9999;

export { ClearFix, levelZindex, maxZindex }