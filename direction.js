function direction() {

console.log(geolocationCoords)

var azimuth = SunCalc.getPosition(new Date(), geolocationCoords.latitude, geolocationCoords.longitude).azimuth * 180 / Math.PI;



function getDayOfYear(date) {
    var start = new Date(date.getFullYear(), 0, 0);
    var diff = date - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function getEquationOfTime() {
    // Get the current date
    var date = new Date();
    var B = (360/365.24)*(getDayOfYear(date)-81);
    var EoT = 229.2*(0.000075 + 0.001868*Math.cos(B) - 0.032077*Math.sin(B) - 0.014615*Math.cos(2*B) - 0.04089*Math.sin(2*B));
    return EoT;
}

// get UTC time

var utcTime = new Date().UTC();

// calculate apparent solar time

var apparentSolarTime = geolocationCoords.longitude / 180 * 12 + utcTime + getEquationOfTime()

console.log(apparentSolarTime)

}
