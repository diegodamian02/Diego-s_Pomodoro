import ReactGA from "react-ga4";

export const initGA = (trackingID = 'G-2R7GR8GFED') => {
    ReactGA.initialize(trackingID);
}

export const logPageView = (path) => {
    ReactGA.send({hitType: 'pageview', page: path});
}
export const logEvent = (category, action, label = '') => {
    ReactGA.event({category, action, label})
}