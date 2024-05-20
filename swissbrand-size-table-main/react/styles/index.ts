import styled from 'styled-components'

export const Open = styled.button`
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  text-transform: uppercase;
  text-decoration: underline;
  line-height: 14px;
  font-size: 12px;
  color: #434343;
  cursor: pointer;
  transition: color 0.2s linear;

  &:hover {
    color: #707070;
  }
`

export const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  &.active {
    display: block;
  }
`

export const Content = styled.div`
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 680px;
  background: #ffffff;
  box-shadow: 0 0 6px rgba(0, 0, 0, .26);

  &.active {
    display: block;
  }
`

export const Close = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  outline: none;
  background: #e21826;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 1px;
    background: #fff;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`
