[![Build Status](https://img.shields.io/travis/markdalgleish/stateless-dtm/master.svg?style=flat-square)](http://travis-ci.org/markdalgleish/stateless-dtm) [![npm](https://img.shields.io/npm/v/stateless-dtm.svg?style=flat-square)](https://www.npmjs.com/package/stateless-dtm)

# stateless-dtm

Purely stateless interface for Dynamic Tag Manager.

## Why?

DTM encourages the use of a stateful global object to maintain tracking data, referred to as a "data layer". Unfortunately, this approach doesn't quite feel at home in the era of purely functional interfaces (e.g. [React](https://github.com/facebook/react)) and front-end event sourcing (e.g. [Redux](https://github.com/rackt/redux)).

To combat this, `stateless-dtm` conceals this global mutation behind a purely functional interface. When tracking an event, the "data layer" object must be provided in its entirety, ensuring that all events are completely atomic and don't depend on prior mutations.

## Usage

```js
import track from 'stateless-dtm';

track('event-name', {
  some: 'data',
  more: 'stuff'
});
```

By default, the data layer is exposed via a `window.analytics` object, and events are tracked by calling `window._satellite.track(eventName)`. These can be customised, but this feature is currently [undocumented](src/index.js).

## License

[MIT License](http://markdalgleish.mit-license.org/)
