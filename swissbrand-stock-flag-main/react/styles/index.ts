import styled from 'styled-components'

export const StockFlagContainer = styled.div`
  box-sizing: border-box;
  min-width: 64px;
  padding: 4px;
  background: #434343;
`

export const StockFlagText = styled.span`
  display: block;
  text-transform: uppercase;
  font-size: 12px;
  color: #ffffff;

  @media only screen and (max-width: 1025px) {
    font-size: 10px;
  }
`
