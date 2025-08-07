import styled from "styled-components";

export const StyledSideBar = styled.header`
    width: 100%;
    position: fixed;
    width: 75px;
    minwidth: 75px;
    bgcolor: theme.palette.background.default;
    color: theme.palette.text.primary;
    height: 100vh;
    left: 0;
    top: 0;
    bottom: 0;
    outline: 1px solid #313131;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;
    z-index: 3;
`;
