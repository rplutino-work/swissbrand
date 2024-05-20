import React, { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles'

import { ToggleSearchProps } from './typings/global';

import ScopedStyledComponent from './components/ScopedStyledComponent'
import { Wrapper, SearchContainer, Button } from './styles';

const CSS_HANDLES = ['toggleSearchWrapper', 'toggleSearchContainer', 'toggleSearchButton'];

const ToggleSearch: StorefrontFunctionComponent<ToggleSearchProps> = (props) => {
  const { containerWidth, buttonSize, buttonIcon, buttonCloseIcon, children } = props;
  const [ isOpened, setIsOpened ] = useState(false);
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <ScopedStyledComponent COMPONENT_SCOPED_NAME="toggleSearch">
      <Wrapper className={handles.toggleSearchWrapper}>
        <SearchContainer 
          className={handles.toggleSearchContainer} 
          width={containerWidth} 
          isOpened={isOpened}
        >
          {children}
        </SearchContainer>
        
        <Button
          className={`${handles.toggleSearchButton} vtex-store-components-3-x-toggle-search-icon`}
          size={buttonSize}
          icon={buttonIcon}
          closeIcon={buttonCloseIcon}
          isOpened={isOpened}
          onClick={() => setIsOpened(!isOpened)} 
        />
      </Wrapper>
    </ScopedStyledComponent>
  )
};

export default ToggleSearch;
