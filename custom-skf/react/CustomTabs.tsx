import React from 'react';
import CustomTabsDesktop from './CustomTabs/CustomTabsDesktop';
import CustomTabsMobile from './CustomTabs/CustomTabsMobile';
import useProduct from 'vtex.product-context/useProduct';

import styles from './styles/CustomTabs.css';

interface CustomTab {
}

function expandSection(element:any) {
  // get the height of the element's inner content, regardless of its actual size
  let sectionHeight = element.scrollHeight;
  
  // have the element transition to the height of its inner content
  element.style.height = sectionHeight + 'px';

  // when the next css transition finishes (which should be the one we just triggered)
  element.addEventListener('transitionend', function() {
    // remove this event listener so it only gets triggered once
    element.removeEventListener('transitionend', arguments.callee);
    
    // remove "height" from the element's inline styles, so it can return to its initial value
    element.style.height = null;
  });
  
  // mark the section as "currently not collapsed"
  element.setAttribute('data-collapsed', 'false');
}

const CustomTabs: StorefrontFunctionComponent<CustomTab> = () => {
  const { product } = useProduct();
  let specifications;

  if(product.specificationGroups[0]) {
    specifications = [
      { originalName: "Descripción", values: product.description },
      ...product.specificationGroups[0].specifications
    ];

  } else {
    specifications = [{ originalName: "Descripción", values: product.description }];
  }

  function handleTabClick(e: any) {
    const tabTitleClicked = e.currentTarget.classList[0];
 
    const tabDescriptionRelatedToClicked:any = document.querySelector(`.description-content.${tabTitleClicked}`);
   
    const allOthersTab:any = document.querySelectorAll(`.descriptionContainer .description-content:not(.${tabTitleClicked})`)

    const tabTitlePlusIcon = document.querySelector(`.${tabTitleClicked} .${styles.plusIcon}`);

    if (!tabDescriptionRelatedToClicked.classList.contains(styles.active)) {
      expandSection(tabDescriptionRelatedToClicked)

      if(window.innerWidth < 850) {
        tabDescriptionRelatedToClicked.classList.add(styles.active);
        tabTitlePlusIcon?.classList.add(styles.plusIconOpen);  
      }


      allOthersTab.forEach((tabDescription:any) => { 
        if(window.innerWidth < 850) {
          tabDescription.previousSibling.querySelector(`.${styles.plusIcon}`).classList.remove(styles.plusIconOpen);
        }

        tabDescription.classList.remove(styles.active);

        tabDescription.style.height = 0;
      });
    } else {
      e.currentTarget.querySelector(`.${styles.plusIcon}`).classList.remove(styles.plusIconOpen);
      
      tabDescriptionRelatedToClicked.classList.remove(styles.active);

      tabDescriptionRelatedToClicked.style.height = 0;
    }
  }

  return (
    <div className={styles.customTabsContainer}>
      { window.innerWidth > 850 &&
        <CustomTabsDesktop specifications={specifications} handleTabClick={handleTabClick} />
      }
      { window.innerWidth < 850 &&
        <CustomTabsMobile specifications={specifications} handleTabClick={handleTabClick} />
      }
    </div>
  )
}

export default CustomTabs