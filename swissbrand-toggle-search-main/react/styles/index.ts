import styled, { css } from 'styled-components';

interface ISearchContainer {
  width: number;
  isOpened: boolean;
}

interface IButton {
  size: number;
  icon: string;
  closeIcon: string;
  isOpened: boolean;
}

export const Wrapper = styled.div`
  position: relative;
`;

export const SearchContainer = styled.div<ISearchContainer>`
  position: absolute;
  top: 50%;
  right: calc(100% + 16px);
  transform: translateY(-50%);
  max-width: 880px;
  background: #ffffff;

  ${props => props.isOpened ? 
    css`
      display: block;
    ` : 
    css`
      display: none;
    `
  }

  ${props => props.width ? 
    css`
      width: ${props.width}vw;
    ` : 
    css`
      width: 36vw;
    `
  }
`;

export const Button = styled.button<IButton>`
  display: block;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;

  ${props => props.size ? 
    css`
      min-width: ${props.size}px;
      height: ${props.size}px;
    ` : 
    css`
      min-width: 20px;
      height: 20px;
    `
  }

  ${props => props.icon && 
    css`
      background-image: url(${props.icon});
      
    `
  }

  ${props => props.isOpened && 
    css`
      background-image: url(${props.closeIcon});
    `
  }
`;
