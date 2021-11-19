import React from 'react';
declare type MapkitContextType = {
    isInProvider: boolean;
    mapkit: typeof mapkit | undefined;
};
export declare const MapkitContext: React.Context<MapkitContextType>;
declare type ProviderProps = {
    tokenOrCallback: string;
    language?: string;
};
export declare const MapkitProvider: React.FC<ProviderProps>;
export {};
