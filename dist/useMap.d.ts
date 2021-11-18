import React from 'react';
import { NumberTuple, Rect, RegionType } from './utils';
export declare const useMap: (defaultOptions?: Pick<mapkit.MapConstructorOptions, "rotation" | "tintColor" | "colorScheme" | "mapType" | "showsMapTypeControl" | "isRotationEnabled" | "showsCompass" | "isZoomEnabled" | "showsZoomControl" | "isScrollEnabled" | "showsScale" | "annotationForCluster" | "annotations" | "selectedAnnotation" | "overlays" | "selectedOverlay" | "showsPointsOfInterest" | "showsUserLocation" | "tracksUserLocation" | "showsUserLocationControl"> & {
    visibleMapRect?: Rect | undefined;
    region?: RegionType | undefined;
    center?: NumberTuple | undefined;
    padding?: number | mapkit.PaddingConstructorOptions | undefined;
}) => {
    mapkit: typeof mapkit | undefined;
    map: mapkit.Map | undefined;
    mapProps: {
        mapkit: typeof mapkit | undefined;
        map: mapkit.Map | undefined;
        mapRef: React.RefObject<HTMLDivElement>;
    };
    setRotation: (rotationValue: number, isAnimated?: boolean) => void;
    setCenter: (centerValue: NumberTuple, isAnimated?: boolean) => void;
    setRegion: (region: RegionType, isAnimated?: boolean) => void;
    setVisibleMapRect: (visibleMapRect: Rect, isAnimated?: boolean) => void;
};
