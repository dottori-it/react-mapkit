import React from 'react';
import { AnnotationOptions } from './utils';
declare type AnnotationProps = {
    latitude: number;
    longitude: number;
    factory: (coordinate: mapkit.Coordinate, options: mapkit.AnnotationConstructorOptions) => Element;
} & AnnotationOptions;
export declare const Annotation: React.FC<AnnotationProps>;
export {};
