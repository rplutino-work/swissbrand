import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from: { opacity: 0;};
  to: { opacity: 1;};
`

export const Container = styled.div`
  text-align: center;
  animation-delay: 1s;
  -webkit-animation: ${fadeIn} 2s linear forwards;
  animation: ${fadeIn} 2s linear forwards;
`

export const Banner = styled.img`
  width: 100%;
`
