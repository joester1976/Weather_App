window.onload = getLocation;

var tempType = false;
var celsius = 0;
var farenheit = 0;

// Initializer function.
function getLocation() {
    
    document.getElementById("temp-change").addEventListener("click", getTempType);
    
    getTempType();
    
    // If the user allows for their computer location to be tracked then get the coordinates.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates);
    } 
}

// Get the coordinates function.
function getCoordinates(position) {
    
    var checkId = true;
    
    // Stores the lat and lon in variables.
    var lat = position.coords.latitude; 
    var lon = position.coords.longitude; 
    
    // Sends the lat and lon to the get weather function to get the weather object.
    getWeather(lat, lon);
    
}

// The get weather function.
function getWeather(lat, lon) {
    
    // Stores the weather api into a variable for easier reading and debugging.
    var weatherLocation = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
    
    // Starts the AJAX request.
    var weather = new XMLHttpRequest();
    
    // Checks the state of the ajax call.
    weather.onreadystatechange = function() {
        
        // If the ajax call is done then store weather object in a variable.
        if (weather.readyState == 4 && weather.status == 200) {
            
            var weatherObject = JSON.parse(weather.responseText);
            
            // Sends the weather object to display the actual weather.
            displayWeather(weatherObject);
            
        }
        
    };
    
    // Gets the api location and information via the ajax call.
    weather.open("GET", weatherLocation, true);
    weather.send();
    
}

// Function that displays the weather on the page.
function displayWeather(weatherObject) {
    
    // Stores the temperature into their respective variables.
    celsius = weatherObject.main.temp.toFixed(0);
    farenheit = (celsius * 9/5 + 32).toFixed(0);
    
    // Puts the data from the weather object into the html window using innerHTML.
    document.getElementById("city-location").innerHTML = weatherObject.name;
    document.getElementById("weather-icon").innerHTML = "<img src='" + weatherObject.weather[0].icon + "'/>";
    document.getElementById("precipitation-type").innerHTML = weatherObject.weather[0].main;
    
    // Gets the temperature type after the call to the weather api. 
    getTempType();
    
}

// The get temperature type function.
function getTempType() {
    
    // If tempType is true the set temp in window to farenheit. If not set to Celsius.
    if (tempType) {
        document.getElementById("temperature").innerHTML = farenheit + "°F";  
        tempType = false;
    } else {
        document.getElementById("temperature").innerHTML = celsius + "°C";
        tempType = true; 
    }
}