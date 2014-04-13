/* latlon.js
 * Calculate distance, bearing and more between Latitude/Longitude points
 * referred: http://www.movable-type.co.uk/scripts/latlong.html
 */
 
Number.prototype.toRad = function() {
	return this * Math.PI / 180;
}

Number.prototype.toDeg = function() {
    return this * 180 / Math.PI;
};
 
function getDistanceFromCoords (from, to, decimals) {
    decimals = decimals || 2;
    var R = 6371; // The earth radius in km
    latFrom = parseFloat(from.lat);
    latTo = parseFloat(to.lat);
    lonFrom = parseFloat(from.lon);
    lonTo = parseFloat(to.lon);
 
    var dLat = (latTo - latFrom).toRad();
    var dLon = (lonTo - lonFrom).toRad();
    var lat1 = latFrom.toRad();
    var lat2 = latTo.toRad();
 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return +d.toFixed(decimals); //toFixed() makes the num in str... add + to parse it back to number
};

function getBearingFromCoords(from, to){
    var dLon = (lonTo - lonFrom).toRad();
    var lat1 = latFrom.toRad();
    var lat2 = latTo.toRad();
    
	var y = Math.sin(dLon) * Math.cos(lat2);
	var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
	
	return Math.atan2(y, x).toDeg();
}