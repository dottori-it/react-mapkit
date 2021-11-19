import React from 'react';
import { MapOptions } from './utils';
import { NumberTuple, Rect, RegionType } from './utils';
export declare const useMap: (defaultOptions?: MapOptions) => {
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
