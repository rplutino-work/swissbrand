import React from 'react'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import AccordionFilterItem from './AccordionFilterItem'

import FacetCheckboxList from './FacetCheckboxList'
import useSelectedFilters from '../hooks/useSelectedFilters'

import { getFilterTitle } from '../constants/SearchHelpers'
import { searchSlugify } from '../utils/slug'

const CSS_HANDLES = ['accordionFilterOpen']

const AccordionFilterGroup = ({
  className,
  title,
  facets,
  quantity,
  show,
  open,
  onOpen,
  onFilterCheck,
  appliedFiltersOverview,
  navigationType,
  initiallyCollapsed,
  truncateFilters,
  truncatedFacetsFetched,
  setTruncatedFacetsFetched,
  colorSpecificationName
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const filters = useSelectedFilters(facets)
  const selectedFilters = filters.filter(facet => facet.selected)
  const intl = useIntl()
  const facetTitle = getFilterTitle(title, intl)
  const slugifiedFacetTitle = searchSlugify(facetTitle)


  return (
    <AccordionFilterItem
      title={title}
      open={open}
      show={show}
      onOpen={onOpen}
      selectedFilters={selectedFilters}
      appliedFiltersOverview={appliedFiltersOverview}
      navigationType={navigationType}
      initiallyCollapsed={initiallyCollapsed}
    >
      <div
        className={classNames(
          applyModifiers(handles.accordionFilterOpen, slugifiedFacetTitle),
          className
        )}
      >

      {/* {(facetTitle).toLowerCase() === (colorSpecificationName).toLowerCase() ? 
        facets.map(facet => {
          <FacetColorItem
            key={facet.name}
            facetTitle={facetTitle}
            facet={facet}
            preventRouteChange={true}
            navigateToFacet={true}
          />
        })

       :  */} 
          <FacetCheckboxList
            onFilterCheck={onFilterCheck}
            facets={filters}
            quantity={quantity}
            facetTitle={facetTitle}
            truncateFilters={truncateFilters}
            navigationType={navigationType}
            truncatedFacetsFetched={truncatedFacetsFetched}
            setTruncatedFacetsFetched={setTruncatedFacetsFetched}
            colorSpecificationName={colorSpecificationName}
          />
          
       {/*  } */}


        
      </div>
      
    </AccordionFilterItem>
  )
}

export default AccordionFilterGroup
