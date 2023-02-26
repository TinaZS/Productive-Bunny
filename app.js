function getWeather() {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");
  
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "f34b50cb362f0c89e2d43ca3b46e50cf";
  
    location.innerHTML = "Locating...";
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      let url =
        api +
        "?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey +
        "&units=imperial";
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let temp = data.main.temp;
          temperature.innerHTML = temp + "° F outside today!";
          location.innerHTML =
            data.name + " (" + latitude + "°, " + longitude + "°)";
          description.innerHTML = data.weather[0].main;
          windowImage = data.weather[0].main;

          // Load image of snow if the weather description is "snow"
    if (windowImage.toLowerCase() === "snow") {
      let image = document.getElementById("weather-image");
      image.src = "images/snow.png";
    }
    
    // Load image of rain if the weather description is "rain"
    else if (windowImage.toLowerCase() === "rain" || data.weather[0].main.toLowerCase() === "thunderstorm" ||data.weather[0].main.toLowerCase() === "drizzle") {
      let image = document.getElementById("weather-image");
      image.src = "images/rain.png";
    }
// Load image of sun if the weather description is "clear"
    else if (windowImage.toLowerCase() === "clear") {
      let image = document.getElementById("weather-image");
      image.src = "images/sun.png";
    }

    // Load image of could if the weather description is "clouds"
    else if (windowImage.toLowerCase() === "clouds") {
      let image = document.getElementById("weather-image");
      image.src = "images/clouds.png";
    }


        });

         
  
    



    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  }
  
  getWeather();


  
// Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds, Others 
