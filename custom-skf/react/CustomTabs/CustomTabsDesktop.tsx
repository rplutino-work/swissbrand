import React from 'react';

import styles from '../styles/CustomTabs.css';

import { SanitizedHTML, DEFAULTS } from '../components/SanitizedHTML'

interface CustomTabDesktop {
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

const CustomTabsDesktop: StorefrontFunctionComponent<CustomTabDesktop> = ({ specifications, handleTabClick}:any) => {
  return (
    <>
      <ul className={styles.tabList}>
        {
          specifications.map((spec:any, index:any) => {
            return <li onClick={handleTabClick} key={index + "_title"} className={"tabProduct_" + index + " " + styles.tabTitle} >{spec.originalName}</li>;
        })
        } 
      </ul>
      <div className={styles.descriptionContainer + " " + "descriptionContainer"}>
        {
          specifications.map((spec:any, index:any) => { 
            const classDescription = `tabProduct_${index} description-content ${styles.tabDescription}` + (index == 0 ? " " + styles.active : "");
            return <div 
              key={index + '_desc'}
              style={ index == 0 ? {display: "block"} : {display: "block"}} 
              className={classDescription} >
                <SanitizedHTML
                  content={`<div>${spec.values}</div>`}
                  allowedTags={allowedTags}
                  allowedAttributes={allowedAttributes}
                />
              </div>; 
          })
        }
      </div>
   </>
  )
}

export default CustomTabsDesktop;