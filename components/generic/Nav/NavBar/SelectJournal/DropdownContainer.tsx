import styled from "styled-components";

export default styled.div`
    position: absolute;
    border: 1px solid;
    border-top: none;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding-top: 10px;
    padding: 10px 0px;
    background-color: ${({ theme }) => theme.body};
>`;
