import ReactGA from 'react-ga';

const gaID = process.env.FIREBASE_MEASUREMENT_ID;

if (gaID && typeof window !== 'undefined') {
  ReactGA.initialize(gaID);
  ReactGA.send({
    visitedPage: window.location.pathname,
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}
