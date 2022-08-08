import styled from 'styled-components'
import { Link } from 'vtex.render-runtime'

export const Title = styled.h1`
  margin: 0 0 12px;
  text-align: center;
  line-height: 22px;
  font-size: 20px;
  font-weight: 700;
  color: #e9a427;
`

export const Subtitle = styled.h2`
  margin: 0 0 12px;
  text-align: center;
  line-height: 20px;
  font-size: 17px;
  font-weight: 600;
  color: #000000;
`

export const Description = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 38px 0;
  line-height: 19px;
  font-size: 13px;
  font-weight: 500;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: #000000;
`

export const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 160px;
  height: 40px;
  border-radius: 6px;
  margin: 0 auto;
  text-decoration: none;
  line-height: 16px;
  letter-spacing: 0.56px;
  font-size: 14px;
  color: #ffffff;
  background: #313131;
  transition: background-color 0.2s linear;

  &:hover {
    background: #eac941;
    color: #313131;
  }

  &:active {
    background: #eac941;
    color: #313131;
  }
`
