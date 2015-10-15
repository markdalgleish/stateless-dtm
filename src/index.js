const defaultOptions = {
  expose: data => window.analytics = data,
  track: name => window._satellite.track(name),
  clean: () => delete window.analytics
};

const create = (config) => {
  const { expose, track, clean } = { ...defaultOptions, ...config };

  return {
    track: (name, data) => {
      expose(data);
      track(name);
      clean();
    }
  };
};

export default create().track;

export const createTracker = create;
