// @flow
import React from 'react'
import compose from 'recompose/compose'
import get from 'lodash/get'

import activeNodeArrayData from '../modules/activeNodeArrayData'
import Pco from './PropertyCollection/PCO'
import Rco from './PropertyCollection/RCO'
import Objekt from './Objekt'
import Taxonomy from './Taxonomy'
import PropertyCollection from './PropertyCollection'
import Benutzer from './Benutzer'
import Organisation from './Organisation'

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

  if (showTaxonomy) return <Taxonomy />
  if (showObjekt) return <Objekt stacked={stacked} />
  if (showPC) return <PropertyCollection />
  if (showPCO) return <Pco dimensions={dimensions} />
  if (showRCO) return <Rco dimensions={dimensions} />
  if (showBenutzer) return <Benutzer dimensions={dimensions} />
  if (showOrganization) return <Organisation dimensions={dimensions} />
  return null
}

export default enhance(DataType)
