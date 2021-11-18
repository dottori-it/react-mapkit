import React from 'react';
import { MapOptions } from './utils';
declare type MapRef = React.RefObject<HTMLDivElement>;
declare type MapContextType = {
    map?: mapkit.Map;
    mapkit?: typeof mapkit;
};
export declare const MapContext: React.Context<MapContextType>;
export declare const Map: React.FC<{
    tokenOrCallback?: string;
    language?: string;
    mapRef?: MapRef;
    mapkit?: typeof mapkit;
    map?: mapkit.Map;
} & MapOptions>;
export {};
