import PropTypes from 'prop-types'
import React from 'react'
import { intlShape, injectIntl } from 'react-intl'

import FacetItem from './FacetItem'
import FilterOptionTemplate from './FilterOptionTemplate'
import { facetOptionShape } from '../../../constants/propTypes'

/**
 * Search Filter Component.
 */
const SelectedFilters = ({
  filters = [],
  intl,
  preventRouteChange = false,
}) => {
  const title = intl.formatMessage({ id: 'store/search.selected-filters' })
  return (
    <FilterOptionTemplate
      title={title}
      filters={filters}
      collapsable={false}
      selected
    >
      {facet => (
        <FacetItem
          key={facet.name}
          facet={facet}
          preventRouteChange={preventRouteChange}
        />
      )}
    </FilterOptionTemplate>
  )
}

SelectedFilters.propTypes = {
  /** Selected filters. */
  filters: PropTypes.arrayOf(facetOptionShape).isRequired,
  /** Prevents changing route when setting filters (uses URL search params instead) */
  preventRouteChange: PropTypes.bool,
  /** Intl instance. */
  intl: intlShape,
}

export default injectIntl(SelectedFilters)
