import { generateMedia } from 'styled-media-query';

export const breakpoints = {
  mobile: 600,
  tablet: 900,
  laptop: 1200,
  largeLaptop: 1400,
  desktop: 1800,
};

const media = generateMedia({
  mobile: '600px',
  tablet: '900px',
  laptop: '1200px',
  largeLaptop: '1400px',
  desktop: '1800px',
});

export const mq = {
  ltsm: media.lessThan('mobile'),
  gtsm: media.greaterThan('mobile'),
  ltmd: media.lessThan('tablet'),
  gtmd: media.greaterThan('tablet'),
  gtml: media.greaterThan('largeLaptop'),
  ltlg: media.lessThan('laptop'),
  gtlg: media.greaterThan('laptop'),
  gtxl: media.greaterThan('desktop'),
};
