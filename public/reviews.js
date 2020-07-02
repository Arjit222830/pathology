import googlePlaces from './google-maps-reviews.js';

document.addEventListener("DOMContentLoaded", async function(event) {
  //Find a placeID via https://developers.google.com/places/place-id
  googlePlaces("google-reviews", {
    placeId: 'ChIJu0BUnN7tCDkRE8A4C32CsZE',
    header: "",
    footer: '', 
    max_rows: 10,
    min_rating: 4, // minimum rating of reviews to be displayed
    months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    text_break_length: "20", // length before a review box is set to max width
    show_date: true, // renders the date of the review before the review itself
    shorten_names: true, // example: "Max Mustermann" -> "Max M.""
    replace_anonymous: false, // do not replace anonymous author_name from JSON
    anonymous_name: "A Google User", // Google's default value depending on language used (en: "A Google User")
    anonymous_name_replacement: "User chose to remain anonymous", // replacement for default (never shortens),
});
});

