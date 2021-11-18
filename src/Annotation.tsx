import React from 'react'

import { MapContext } from './Map'

import {
  createCoordinate,
  propsToMarkerConstructionOptions,
  AnnotationOptions,
} from './utils'

type AnnotationProps = {
  latitude: number
  longitude: number
  factory: (
    coordinate: mapkit.Coordinate,
    options: mapkit.AnnotationConstructorOptions,
  ) => Element
} & AnnotationOptions

export const Annotation: React.FC<AnnotationProps> = ({
  latitude,
  longitude,
  factory,
  ...options
}) => {
  const { mapkit, map } = React.useContext(MapContext)
  const marker = React.useRef<mapkit.Annotation>()

  React.useEffect(() => {
    if (mapkit && map) {
      marker.current = new mapkit.Annotation(
        createCoordinate(latitude, longitude),
        factory,
        propsToMarkerConstructionOptions(options),
      )

      map.addAnnotation(marker.current)
    }
  }, [mapkit, map, latitude, longitude, factory, options])

  return null
}
