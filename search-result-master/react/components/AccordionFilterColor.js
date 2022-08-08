import React from 'react'
import { injectIntl, intlShape } from 'react-intl'

import AccordionFilterItem from './AccordionFilterItem'
import FacetColorItem from './FacetColorItem'

import { getFilterTitle } from '../constants/SearchHelpers'


const AccordionFilterColor = ({
  className,
  title,
  facets,
  show,
  open,
  onOpen,
  navigationType,
  preventRouteChange = false,
  initiallyCollapsed = false,
  intl,
  navigateToFacet,
}) => {
  const facetTitle = getFilterTitle(title, intl)


  return (
    <AccordionFilterItem
      title={title}
      open={open}
      show={show}
      onOpen={onOpen}
      navigationType={navigationType}
      initiallyCollapsed={initiallyCollapsed}
    >
      <div className={className}>
        {
          facets.map(facet => (        
            <FacetColorItem
              key={facet.name}
              facetTitle={facetTitle}
              facet={facet}
              preventRouteChange={preventRouteChange}
              navigateToFacet={navigateToFacet}
            />
          ))
        }
      </div>
    </AccordionFilterItem>
  )
}

export default AccordionFilterColor
