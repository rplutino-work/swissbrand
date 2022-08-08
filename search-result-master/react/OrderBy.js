import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import SelectionListOrderBy from './components/SelectionListOrderBy'

export const SORT_OPTIONS = [
  {
    value: '',
    label: 'store/ordenation.relevance',
  },
  {
    value: 'OrderByTopSaleDESC',
    label: 'store/ordenation.sales',
  },
  {
    value: 'OrderByReleaseDateDESC',
    label: 'store/ordenation.release.date',
  },
  {
    value: 'OrderByBestDiscountDESC',
    label: 'store/ordenation.discount',
  },
  {
    value: 'OrderByPriceDESC',
    label: 'store/ordenation.price.descending',
  },
  {
    value: 'OrderByPriceASC',
    label: 'store/ordenation.price.ascending',
  },
  {
    value: 'OrderByNameASC',
    label: 'store/ordenation.name.ascending',
  },
  {
    value: 'OrderByNameDESC',
    label: 'store/ordenation.name.descending',
  },
]

const OrderBy = ({
  orderBy,
  message,
  intl,
  hiddenOptions = [],
  showOrderTitle = true,
}) => {
  const sortingOptions = useMemo(() => {
    return SORT_OPTIONS.filter(
      option => !hiddenOptions.includes(option.value)
    ).map(({ value, label }) => {
      return {
        value: value,
        label: intl.formatMessage({ id: label }),
      }
    })
  }, [intl, hiddenOptions])

  return (
    <SelectionListOrderBy
      orderBy={orderBy}
      message={message}
      options={sortingOptions}
      showOrderTitle={showOrderTitle}
    />
  )
}

OrderBy.propTypes = {
  /** Which sorting option is selected. */
  orderBy: PropTypes.string,
  /** Intl instance. */
  intl: intlShape,
  /** Options to be hidden. (e.g. `["OrderByNameASC", "OrderByNameDESC"]`) */
  hiddenOptions: PropTypes.arrayOf(PropTypes.string),
  /** Message to be displayed */
  message: PropTypes.string,
  /** Show or hide order title */
  showOrderTitle: PropTypes.boolean,
}

export default injectIntl(OrderBy)
