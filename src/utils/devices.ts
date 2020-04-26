const size = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
  // laptop: '600px', mobile first
};

const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  // laptop: `(min-width: ${size.laptop})`, mobile first
};

export default device;
