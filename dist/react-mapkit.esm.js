import React from 'react';
import load from 'little-loader';

/* global mapkit */
var MapkitContext = /*#__PURE__*/React.createContext({
  isInProvider: false,
  mapkit: undefined
});
var MapkitProvider = function MapkitProvider(_ref) {
  var tokenOrCallback = _ref.tokenOrCallback,
      language = _ref.language,
      children = _ref.children;
  var existingContext = React.useContext(MapkitContext);

  var _React$useState = React.useState({
    mapkit: existingContext.mapkit,
    isInProvider: true
  }),
      context = _React$useState[0],
      setContext = _React$useState[1];

  React.useEffect(function () {
    if (!existingContext.isInProvider) {
      load('https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js', function () {
        var isCallback = tokenOrCallback.includes('/'); // init mapkit

        mapkit.init({
          authorizationCallback: function authorizationCallback(done) {
            if (isCallback) {
              fetch(tokenOrCallback).then(function (res) {
                return res.text();
              }).then(done);
            } else {
              done(tokenOrCallback);
            }
          },
          language: language
        });
        setContext({
          mapkit: mapkit,
          isInProvider: true
        });
      });
    }
  }, [existingContext.isInProvider, tokenOrCallback, language]);
  return React.createElement(MapkitContext.Provider, {
    value: context,
    children: children
  });
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/* global mapkit */
// Mapkit helpers
var createPadding = function createPadding(padding) {
  return new mapkit.Padding(typeof padding === 'number' ? {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  } : padding);
};
var createCoordinate = function createCoordinate(latitude, longitude) {
  return new mapkit.Coordinate(latitude, longitude);
};
var createCoordinateSpan = function createCoordinateSpan(latitudeDelta, longitudeDelta) {
  return new mapkit.CoordinateSpan(latitudeDelta, longitudeDelta);
};
var createCoordinateRegionFromValues = function createCoordinateRegionFromValues(region) {
  return createCoordinateRegion(createCoordinate(region.latitude, region.longitude), createCoordinateSpan(region.latitudeSpan, region.longitudeSpan));
};
var createCoordinateRegion = function createCoordinateRegion(center, span) {
  return new mapkit.CoordinateRegion(center, span);
};
var createMapRect = function createMapRect(x, y, width, height) {
  return new mapkit.MapRect(x, y, width, height);
}; // this function takes simple props and turns them into the mapkit options that mapkit expects

var propsToMapConstructionOptions = function propsToMapConstructionOptions(_ref) {
  var visibleMapRect = _ref.visibleMapRect,
      region = _ref.region,
      center = _ref.center,
      padding = _ref.padding,
      options = _objectWithoutPropertiesLoose(_ref, ["visibleMapRect", "region", "center", "padding"]);

  return _extends({
    visibleMapRect: visibleMapRect && createMapRect.apply(void 0, visibleMapRect),
    region: region && createCoordinateRegionFromValues(region),
    center: center && createCoordinate.apply(void 0, center),
    padding: padding ? createPadding(padding) : createPadding(0)
  }, options);
};
var propsToMarkerConstructionOptions = function propsToMarkerConstructionOptions(_ref2) {
  var padding = _ref2.padding,
      options = _objectWithoutPropertiesLoose(_ref2, ["padding"]);

  return _extends({
    padding: padding ? createPadding(padding) : createPadding(0)
  }, options);
};

var useMap = function useMap(defaultOptions) {
  if (defaultOptions === void 0) {
    defaultOptions = {};
  }

  var _React$useState = React.useState(defaultOptions),
      defaultMapOptions = _React$useState[0];

  var _React$useContext = React.useContext(MapkitContext),
      mapkit = _React$useContext.mapkit;

  var mapRef = React.useRef(null);

  var _React$useState2 = React.useState(),
      map = _React$useState2[0],
      setMap = _React$useState2[1];

  React.useEffect(function () {
    if (mapkit && mapRef.current) {
      var newMap = new mapkit.Map(mapRef.current, propsToMapConstructionOptions(defaultMapOptions));
      setMap(newMap);
    }
  }, [mapRef, mapkit]); // Clean up the map on unmount

  React.useEffect(function () {
    return function () {
      if (map) {
        map.destroy();
      }
    };
  }, []);
  return {
    mapkit: mapkit,
    map: map,
    mapProps: {
      mapkit: mapkit,
      map: map,
      mapRef: mapRef
    },
    setRotation: React.useCallback(function (rotationValue, isAnimated) {
      if (isAnimated === void 0) {
        isAnimated = false;
      }

      if (map) {
        map.setRotationAnimated(rotationValue, isAnimated);
      }
    }, [map]),
    setCenter: React.useCallback(function (centerValue, isAnimated) {
      if (isAnimated === void 0) {
        isAnimated = false;
      }

      if (map) {
        map.setCenterAnimated(createCoordinate.apply(void 0, centerValue), isAnimated);
      }
    }, [map]),
    setRegion: React.useCallback(function (region, isAnimated) {
      if (isAnimated === void 0) {
        isAnimated = false;
      }

      if (map) {
        map.setRegionAnimated(createCoordinateRegionFromValues(region), isAnimated);
      }
    }, [map]),
    setVisibleMapRect: React.useCallback(function (visibleMapRect, isAnimated) {
      if (isAnimated === void 0) {
        isAnimated = false;
      }

      if (map) {
        map.setVisibleMapRectAnimated(createMapRect.apply(void 0, visibleMapRect), isAnimated);
      }
    }, [map])
  };
};

var MapContext = /*#__PURE__*/React.createContext({
  map: undefined,
  mapkit: undefined
});

var MapProvider = function MapProvider(_ref) {
  var children = _ref.children,
      context = _ref.context;
  return React.createElement(MapContext.Provider, {
    value: context,
    children: children
  });
}; // this component is the parent to the mapkit generated map components


var MapContainer = function MapContainer(_ref2) {
  var children = _ref2.children,
      mapRef = _ref2.mapRef;
  return React.createElement("div", {
    ref: mapRef,
    style: {
      width: '100%',
      height: '100%'
    },
    children: children
  });
};

var CreateMap = function CreateMap(_ref3) {
  var children = _ref3.children,
      defaultOptions = _objectWithoutPropertiesLoose(_ref3, ["children"]);

  var _useMap = useMap(defaultOptions),
      _useMap$mapProps = _useMap.mapProps,
      mapkit = _useMap$mapProps.mapkit,
      map = _useMap$mapProps.map,
      mapRef = _useMap$mapProps.mapRef;

  return React.createElement(MapProvider, {
    context: {
      mapkit: mapkit,
      map: map
    }
  }, React.createElement(MapContainer, {
    mapRef: mapRef,
    children: children
  }));
};

var Map = function Map(_ref4) {
  var tokenOrCallback = _ref4.tokenOrCallback,
      _ref4$language = _ref4.language,
      language = _ref4$language === void 0 ? 'en' : _ref4$language,
      mapkit = _ref4.mapkit,
      map = _ref4.map,
      mapRef = _ref4.mapRef,
      props = _objectWithoutPropertiesLoose(_ref4, ["tokenOrCallback", "language", "mapkit", "map", "mapRef"]);

  var context = React.useContext(MapkitContext); // map has already been created, we just need to setup the provider

  if (mapRef) {
    return React.createElement(MapProvider, {
      context: {
        mapkit: mapkit,
        map: map
      }
    }, React.createElement(MapContainer, Object.assign({
      mapRef: mapRef
    }, props)));
  } // map hasn't yet been created, lets create it!


  var mapBox = React.createElement(CreateMap, Object.assign({}, props)); // we are in a provider, just return the map

  if (context.isInProvider) {
    return mapBox;
  } // No Provider setup provider around map


  if (!tokenOrCallback) {
    throw new Error('`tokenOrCallback` is required. Either add it to this `Map` component or to a `MapkitProvider` parent of this component.');
  }

  return React.createElement(MapkitProvider, {
    tokenOrCallback: tokenOrCallback,
    language: language,
    children: mapBox
  });
};

var Marker = function Marker(_ref) {
  var latitude = _ref.latitude,
      longitude = _ref.longitude,
      options = _objectWithoutPropertiesLoose(_ref, ["latitude", "longitude"]);

  var _React$useContext = React.useContext(MapContext),
      mapkit = _React$useContext.mapkit,
      map = _React$useContext.map;

  var marker = React.useRef();
  React.useEffect(function () {
    if (mapkit && map) {
      marker.current = new mapkit.MarkerAnnotation(createCoordinate(latitude, longitude), propsToMarkerConstructionOptions(options));
      map.addAnnotation(marker.current);
    }
  }, [mapkit, map]);
  return null;
};

export { Map, MapContext, MapkitContext, MapkitProvider, Marker, useMap };
//# sourceMappingURL=react-mapkit.esm.js.map
