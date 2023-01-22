# Finding South With A Clock

## Inspiration

Since we were children, we have heard stories in which people got lost in woods and found their directions using a watch. However, we had never tried this approach and did not know how accurate it performs. Therefore, we build this small app to help people explore this phenomenon in depth. We hope this app can help many people solve their mysteries since their childhood :-)

## What it does

- Help you exercise how to find the south direction using an analog clock.
  - Point the hour hand of the camera at the sun.
  - The bisector between the 12 o'clock direction and the hour hand points approximately towards the south direction.
- Check your results against the true south direction indicated by the compass of your mobile phone.
- Using the compass and the GPS location of your mobile phone, help you analyze the sources of errors of the clock's method.
  - The user might not have pointed the hour hand at the sun precisely. An animation shows what the result would be if the hour hand pointed at the sun precisely.
  - The time of the clock follows the time of the time zone, which is slightly different from the apparent solar time. An animation shows what the result would be if the clock follows the apparent solar time.
  - The clock's approach to find the south has system errors inherently. An animation shows the difference between the result given by this approach and the true south direction.

## How we built it

- The entire app is written as a website in HTML, CSS, and JavaScript, and is hosted on the GitHub Pages of one of the teammates.
- The app is constructed in a page-by-page style, inspired by the design of many web tutorials.
- The clock and its animations are rendered as an HTML `<canvas>` element using JavaScript.
- The app listens to the `deviceorientation` event, which is available on browsers of mobile phones, to fetch the compass data of mobile phones.
- The app uses the `Geolocation` API to fetch the longitude, latitude, and altitude of the user location.

## Challenges we ran into

- In order to use `deviceorientation` and `Geolocation`, we have to be careful about getting the user permission of data collection. We also need to handle platform differences between Android and iOS.
- Creating animations on a `<canvas>` is very challenging for us who was not very familiar with the canvas API.
- Calculating the directions from the compass and GPS data is difficult, because the formula are complicated and the many of the web search results turned out to be wrong.
- We also had some difficulties testing our product because for the most time of our development were in the evening.

## Accomplishments that we're proud of

- We found out an interesting use case that utilizes compass data in a mobile web app.
- We drew cool clock animations using the canvas API.

## What we learned

- We learned how to draw pictures and create animations using the canvas API.
- We learned many fun facts about the sun position and the time of day.
- We learned how to create a multi-page website with transition effects.

## What's next for Finding South With A Clock

- Prettify the user interface
- More robust error handling, e.g. what to do if the user denies the request to use the compass data?
- More natural animation transitions, like applying an easing function
- Incorporate comments from judges and peers
