import React, { useContext, useState, useEffect } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import classNames from 'classnames'

import SettingsContext from './SettingsContext'
import useShouldDisableFacet from '../hooks/useShouldDisableFacet'
import changeImageUrlSize from '../utils/changeImageUrlSize'

const CSS_HANDLES = ['filterItem']

// These are used to prevent creating a <Checkbox /> with id equal
// to any of these words.
const reservedVariableNames = [
  'global',
  'window',
  'document',
  'self',
  'screen',
  'parent',
]

const FacetColorItem = ({
  navigateToFacet,
  facetTitle,
  facet,
  className,
  preventRouteChange,
}) => {
  const { showFacetQuantity } = useContext(SettingsContext)
  const [selected, setSelected] = useState(facet.selected)
  const handles = useCssHandles(CSS_HANDLES)
  const classes = classNames(
    applyModifiers(handles.filterItem, facet.value),
    { [`${handles.filterItem}--selected`]: facet.selected },
    `${handles.filterItem + "-" + facetTitle}`,
    { [`${handles.filterItem + "-" + facetTitle}--selected`]: facet.selected },
    className,
    'lh-copy w-100'
  )

  const classeColorName = classNames(
    applyModifiers(handles.filterItem, "ColorName")
  )

  const classeColorImage = classNames(
    applyModifiers(handles.filterItem, "ColorImage")
  )

  const classeColorImageSelected = classNames(
    applyModifiers(handles.filterItem, "ColorImageSelected")
  )
  
  const checkBoxId = reservedVariableNames.includes(facet.value)
    ? `filterItem--${facet.key}-${facet.value}`
    : `${facet.key}-${facet.value}`

  const imageName = `${facet.key}-${facet.value}`
  // console.log(changeImageUrlSize(`/arquivos/${imageName}.jpg`, 10,10))

  // This effect fixes the issue described in this PR
  // https://github.com/vtex-apps/search-result/pull/422
  useEffect(() => {
    if (facet.selected !== selected) {
      setSelected(facet.selected)
    }
    // however, having `selected` as a dependency causes it
    // to always reset back to `facet.selected`. So, we remove it,
    // so only changes in facet.selected affect the state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facet.selected])

  const shouldDisable = useShouldDisableFacet(facet)
  
  return (
    <div className={classes} style={{ hyphens: 'auto', wordBreak: 'break-word' }} >
    <label for={checkBoxId}>
    <img 
      className={`${classeColorImage} ${selected ? classeColorImageSelected : '' }`}
      style={{width: "14px"}} src={`/arquivos/${imageName}.jpg`}
      alt={imageName}
    />
    </label>
    <input type="checkbox"
        id={checkBoxId}
        checked={selected}
        name={facet.name}
        onChange={() => {
          setSelected(!selected)
          navigateToFacet({ ...facet, title: facetTitle }, preventRouteChange)
        }}
        value={facet.name}
        disabled={shouldDisable}
        style={{display: "none"}}
     >
      </input>
      <div className={classeColorName}>{facet.name} {console.log("title: ", facetTitle)}</div>
    </div>
  )
}

export default FacetColorItem
