import styled from "styled-components";

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    column-gap: 20px;
    row-gap: 50px;
`

export const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 25px;
    text-align: center;
`
