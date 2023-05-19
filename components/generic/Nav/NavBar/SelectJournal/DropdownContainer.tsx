import styled from "styled-components";

export default styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;

    align-items: center;
    justify-content: center;
    display: flex;

    border: 1px solid;
    border-top: none;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding-top: 10px;
    background-color: ${({ theme }) => theme.body};
>`;
