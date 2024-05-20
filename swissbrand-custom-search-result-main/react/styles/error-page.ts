import styled from 'styled-components'
import { Link } from 'vtex.render-runtime'

export const Title = styled.h1`
    margin: 0 0 12px;
    text-align: center;
    line-height: 22px;
    font-size: 18px;
    font-weight: 500;
    color: #000000;
`

export const Subtitle = styled.h2`
    margin: 0 0 12px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
`

export const Description = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 38px;
    line-height: 16px;
    font-size: 12px;
    font-weight: 500;
    color: #000000;
`

export const Button = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 192px;
    height: 40px;
    margin: 0 auto;
    text-decoration: none;
    line-height: 16px;
    letter-spacing: 0.56px;
    font-size: 14px;
    color: #ffffff;
    background: #434343;
    transition: background-color 0.2s linear;

    &:hover {
        background: #000000;
    }

    &:active {
        background: #434343;
    }
`
