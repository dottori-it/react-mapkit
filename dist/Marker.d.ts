import React from 'react';
import { MarkerOptions } from './utils';
declare type MarkerProps = {
    latitude: number;
    longitude: number;
} & MarkerOptions;
export declare const Marker: React.FC<MarkerProps>;
export {};
