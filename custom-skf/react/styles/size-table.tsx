import styled from 'styled-components'
export const Open = styled.button`
  display: flex;
  align-items: flex-end;
  color: #444;
  font-weight: 600;
  background: #fff;
  border: none;
  padding: 0 0 2px;
  margin-bottom: 12px;
  font-size: 10px;
  cursor: pointer;
  gap: 6px;
  &:focus {
    outline: none;
    background: #FEFEFE;
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
  max-width: 600px;
  padding: 12px 16px;
  background: #FFFFFF;
  &.active {
    display: block;
  }
`
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`
export const ModalContent = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  img{
    width: 100%;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
      background-color: #FDFDFD;
      border-radius: 15px;
  }
  &::-webkit-scrollbar-thumb {
      background-color: #F1F1F1;
      border-radius: 15px;
  }
  &::-webkit-scrollbar-thumb:hover {
      background-color: #DDDDDD;
  }
`;
export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #272727;
`
export const Close = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 22px;
  height: 20px;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background: #272727;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }`