import { assert } from 'chai';
import track, { createTracker } from '../src';

describe('Given: A browser environment with a DTM script present', () => {

  let trackedData;

  beforeEach(() => global.window = {
    _satellite: {
      track: name => trackedData = window.analytics
    }
  });

  describe('When: An event has not been tracked yet', () => {

    it('Then: The data layer should not exist', () => {
      assert.equal('analytics' in global.window, false);
    });

  });

  describe('When: An event is tracked', () => {

    beforeEach(() => {
      track('event-name', { foo: 'bar', bar: 'baz' });
    });

    it('Then: The event data should be surfaced to the data layer', () => {
      assert.deepEqual(trackedData, { foo: 'bar', bar: 'baz' });
    });

    it('Then: The data layer should be cleaned up afterwards', () => {
      assert.equal('analytics' in global.window, false);
    });

  });

  describe('And: The lifecycle hooks have been customised', () => {

    let customTrack;

    beforeEach(() => {
      customTrack = createTracker({
        expose: data => window.foobar = data,
        track: name => window._customTracker.track(name),
        clean: () => delete window.foobar
      }).track;
    })

    beforeEach(() => global.window = {
      _customTracker: {
        track: name => trackedData = window.foobar
      }
    });

    describe('When: An event has not been tracked yet', () => {

      it('Then: The data layer should not exist', () => {
        assert.equal('foobar' in global.window, false);
      });

    });

    describe('When: An event is tracked', () => {

      beforeEach(() => {
        customTrack('event-name', { foo: 'bar', bar: 'baz' });
      });

      it('Then: The event data should be surfaced to the data layer', () => {
        assert.deepEqual(trackedData, { foo: 'bar', bar: 'baz' });
      });

      it('Then: The data layer should be cleaned up afterwards', () => {
        assert.equal('foobar' in global.window, false);
      });

    });

  });

});
