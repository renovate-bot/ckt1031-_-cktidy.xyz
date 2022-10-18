import { initialize, pageview, send } from 'react-ga';

const gaID = process.env.FIREBASE_MEASUREMENT_ID;

if (gaID && typeof window !== 'undefined') {
    initialize(gaID);
    send({
        visitedPage: window.location.pathname,
    });
    pageview(window.location.pathname + window.location.search);
}
