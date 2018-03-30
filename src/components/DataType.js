// @flow
import React from 'react'
import compose from 'recompose/compose'
import get from 'lodash/get'

import activeNodeArrayData from '../modules/activeNodeArrayData'

import PcoAsync from './PropertyCollection/PCO'
import RcoAsync from './PropertyCollection/RCO'
import ObjektAsync from './Objekt'
import TaxonomyAsync from './Taxonomy'
import PropertyCollectionAsync from './PropertyCollection'
import BenutzerAsync from './Benutzer'
import OrganisationAsync from './Organisation'

const enhance = compose(activeNodeArrayData)

const DataType = ({
  activeNodeArrayData,
  dimensions,
  stacked = false,
}: {
  activeNodeArrayData: Object,
  dimensions: Object,
  stacked: Boolean,
}) => {
  const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
  const showObjekt =
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0]) &&
    activeNodeArray.length > 1
  const showTaxonomy =
    ['Arten', 'Lebensräume'].includes(activeNodeArray[0]) &&
    activeNodeArray.length === 2
  const showPC =
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 2
  const showPCO =
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 3 &&
    activeNodeArray[2] === 'Eigenschaften'
  const showRCO =
    activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    activeNodeArray[1] &&
    activeNodeArray.length === 3 &&
    activeNodeArray[2] === 'Beziehungen'
  const showBenutzer =
    activeNodeArray[0] === 'Benutzer' && activeNodeArray.length === 2
  const showOrganization =
    activeNodeArray[0] === 'Organisationen' && activeNodeArray.length === 2

  if (showTaxonomy) return <TaxonomyAsync />
  if (showObjekt) return <ObjektAsync stacked={stacked} />
  if (showPC) return <PropertyCollectionAsync />
  if (showPCO) return <PcoAsync dimensions={dimensions} />
  if (showRCO) return <RcoAsync dimensions={dimensions} />
  if (showBenutzer) return <BenutzerAsync dimensions={dimensions} />
  if (showOrganization) return <OrganisationAsync dimensions={dimensions} />
  return null
}

export default enhance(DataType)
