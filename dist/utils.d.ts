declare type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
declare type ConstructorParameters<T> = T extends new (...args: infer U) => any ? U : never;
declare type MapConstructionOptions = NonNullable<ConstructorParameters<typeof mapkit.Map>[1]>;
declare type AnnotationConstructionOptions = NonNullable<ConstructorParameters<typeof mapkit.Annotation>[1]>;
declare type MarkerConstructionOptions = NonNullable<ConstructorParameters<typeof mapkit.MarkerAnnotation>[1]>;
declare type PaddingConstructorOptions = NonNullable<ConstructorParameters<typeof mapkit.Padding>[0]>;
export declare type NumberTuple = [number, number];
export declare type Rect = [number, number, number, number];
export declare type PaddingType = number | PaddingConstructorOptions;
export declare type RegionType = {
    latitude: number;
    longitude: number;
    latitudeSpan: number;
    longitudeSpan: number;
};
export declare type ImageUrl = {
    '1': string;
    '2'?: string;
    '3'?: string;
};
export declare const createPadding: (padding: PaddingType) => mapkit.Padding;
export declare const createCoordinate: (latitude: number, longitude: number) => mapkit.Coordinate;
export declare const createCoordinateSpan: (latitudeDelta: number, longitudeDelta: number) => mapkit.CoordinateSpan;
export declare const createCoordinateRegionFromValues: (region: RegionType) => mapkit.CoordinateRegion;
export declare const createCoordinateRegion: (center: mapkit.Coordinate, span: mapkit.CoordinateSpan) => mapkit.CoordinateRegion;
export declare const createMapPoint: (x: number, y: number) => mapkit.MapPoint;
export declare const createMapRect: (x: number, y: number, width: number, height: number) => mapkit.MapRect;
export declare type MapOptions = Merge<MapConstructionOptions, {
    visibleMapRect?: Rect;
    region?: RegionType;
    center?: NumberTuple;
    padding?: PaddingType;
}>;
export declare const propsToMapConstructionOptions: ({ visibleMapRect, region, center, padding, ...options }: Merge<mapkit.MapConstructorOptions, {
    visibleMapRect?: Rect | undefined;
    region?: RegionType | undefined;
    center?: NumberTuple | undefined;
    padding?: number | mapkit.PaddingConstructorOptions | undefined;
}>) => {
    rotation?: number | undefined;
    tintColor?: string | undefined;
    colorScheme?: string | undefined;
    mapType?: string | undefined;
    showsMapTypeControl?: boolean | undefined;
    isRotationEnabled?: boolean | undefined;
    showsCompass?: string | undefined;
    isZoomEnabled?: boolean | undefined;
    showsZoomControl?: boolean | undefined;
    isScrollEnabled?: boolean | undefined;
    showsScale?: string | undefined;
    annotationForCluster?: ((annotation: mapkit.Annotation) => void) | undefined;
    annotations?: mapkit.Annotation[] | undefined;
    selectedAnnotation?: mapkit.Annotation | undefined;
    overlays?: mapkit.Overlay[] | undefined;
    selectedOverlay?: mapkit.Overlay | undefined;
    showsPointsOfInterest?: boolean | undefined;
    showsUserLocation?: boolean | undefined;
    tracksUserLocation?: boolean | undefined;
    showsUserLocationControl?: boolean | undefined;
    visibleMapRect: mapkit.MapRect | undefined;
    region: mapkit.CoordinateRegion | undefined;
    center: mapkit.Coordinate | undefined;
    padding: mapkit.Padding;
};
export declare type AnnotationOptions = Merge<AnnotationConstructionOptions, {
    padding?: PaddingType;
}>;
export declare type MarkerOptions = Merge<MarkerConstructionOptions, {
    padding?: PaddingType;
}>;
export declare const propsToMarkerConstructionOptions: ({ padding, ...options }: Merge<mapkit.MarkerAnnotationConstructorOptions, {
    padding?: number | mapkit.PaddingConstructorOptions | undefined;
}>) => {
    color?: string | undefined;
    glyphColor?: string | undefined;
    glyphText?: string | undefined;
    glyphImage?: {
        1: string;
        2?: string | undefined;
        3?: string | undefined;
    } | undefined;
    selectedGlyphImage?: object | undefined;
    subtitleVisibility?: string | undefined;
    titleVisibility?: string | undefined;
    title?: string | undefined;
    subtitle?: string | undefined;
    accessibilityLabel?: string | undefined;
    data?: any;
    draggable?: boolean | undefined;
    visible?: boolean | undefined;
    enabled?: boolean | undefined;
    selected?: boolean | undefined;
    calloutEnabled?: boolean | undefined;
    animates?: boolean | undefined;
    appearanceAnimation?: string | undefined;
    anchorOffset?: DOMPoint | undefined;
    calloutOffset?: DOMPoint | undefined;
    callout?: mapkit.AnnotationCalloutDelegate | undefined;
    size?: {
        width: number;
        height: number;
    } | undefined;
    displayPriority?: number | undefined;
    collisionMode?: string | undefined;
    clusteringIdentifier?: string | undefined;
    padding: mapkit.Padding;
};
export {};
