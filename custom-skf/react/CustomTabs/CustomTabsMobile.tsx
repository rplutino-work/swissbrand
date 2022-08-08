import React from 'react';

import styles from '../styles/CustomTabs.css';
import { SanitizedHTML, DEFAULTS } from '../components/SanitizedHTML'
interface CustomTabMobile {
  specifications: string[];
  handleTabClick: Function;

}

const allowedTags = [
  ...DEFAULTS.allowedTags,
  'link',
  'body',
  'html',
  'style',
  'link',
  'head',
  'meta',
  'object',
  'embed',
]

const allowedAttributes = {
  ...DEFAULTS.allowedAttributes,
  meta: ['charset', 'name', 'content'],
  object: ['type', 'height', 'width', 'data'],
  embed: ['height', 'width', 'src'],
}

const CustomTabsDesktop: StorefrontFunctionComponent<CustomTabMobile> = ({ specifications, handleTabClick}:any) => {
  return (
    <>
    {
      specifications.map((spec:any, index:any) => {
        const classTitle = `${styles.plusIcon}`+ " " + (index == 0 ? " " + styles.plusIconOpen : "");
        const classDescription = `tabProduct_${index} description-content ${styles.tabDescription}` + (index == 0 ? " " + styles.active : "");

        return (
          <div key={index + "_mobileSpec" } className={styles.descriptionContainer + " " + "descriptionContainer"}>
            <div onClick={handleTabClick}
              className={"tabProduct_" + index + " " + styles.tabTitle}>{spec.originalName} <span className={classTitle}></span>
            </div>
            <div  
              style={ index == 0 ? {display: "block"} : {display: "block"}} 
              className={classDescription}
            >
              <SanitizedHTML
                content={`<div>${spec.values}</div>`}
                allowedTags={allowedTags}
                allowedAttributes={allowedAttributes}
              />
            </div>
          </div>
        );
      })
    }
  </>
  )
}

export default CustomTabsDesktop;