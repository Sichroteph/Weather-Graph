
var testMode = 0;
var forceUpdate = 0;

var KEY_CONFIG = 157;
var KEY_LAST_UPDATE = 158;

var bIsImperial;

var currentCity;
var current_Latitude;
var current_Longitude;
var current_Last_update;
var current_dictionary;

var current_page = 0;
var cityIndex = 0;

var minutesBeforeRefresh = 30;

function SendStatus(status) {
  var dictionary = {
    133: status,
  };

  // Send to watchapp
  Pebble.sendAppMessage(dictionary, function () {
    //console.log("sendAppMessage");
    //console.log('Send successful: ' + JSON.stringify(dictionary));
  }, function () {
    //console.log('Send failed!');
  });
}

function runConfig() {

  var jsonConfig = JSON.parse(localStorage.getItem(KEY_CONFIG));
  //console.log(JSON.stringify(jsonConfig));


  var nombreVilles = jsonConfig.cities.length;

  cityIndex = current_page % nombreVilles;
  //console.log(cityIndex);
  currentCity = jsonConfig.cities[cityIndex].cityName;
  //console.log("ville : " + currentCity);
  // Send city to the watch
  SendLocation(currentCity);
  current_Latitude = jsonConfig.cities[cityIndex].latitude;
  //console.log("current_Latitude : " + current_Latitude);
  current_Longitude = jsonConfig.cities[cityIndex].longitude;
  //console.log("current_Longitude : " + current_Longitude);
  current_Last_update = jsonConfig.cities[cityIndex].lastUpdated;
  //console.log("current_Last_update : " + current_Last_update);
  current_dictionary = jsonConfig.cities[cityIndex].weatherDictionary;
  //console.log("current_dictionary : " + current_dictionary);

  if (jsonConfig.unit == "metric")
    bIsImperial = 0;
  else
    bIsImperial = 1;

  // Is a refresh needed ?

  //var ancienne_date = JSON.parse(localStorage.getItem(KEY_LAST_UPDATE));
  var lastUpdatedDate = new Date(current_Last_update);

  console.log(lastUpdatedDate);

  var maintenant = new Date();
  var differenceEnMillisecondes = maintenant - lastUpdatedDate;
  var differenceEnMinutes = differenceEnMillisecondes / (1000 * 60);

  console.log("How many minutes since last update", differenceEnMinutes);
  if ((differenceEnMinutes > minutesBeforeRefresh) || (forceUpdate)) {
    if (currentCity == "GPS") {
      console.log("GPS mode");
      getPosition();
    }
    else {
      getForecast();
    }
  } else {
    // Send cach"e dictionary
    //console.log("current_dictionary\n" + current_dictionary);
    var dictionary = JSON.parse(current_dictionary);
    Pebble.sendAppMessage(dictionary, function () {
      //console.log("success");
      SendStatus("END_TRANSMISSION");
      // console.log('Send successful: ' + JSON.stringify(dictionary));
    }, function () {
      console.log('Send failed!');
      SendStatus(" FAILED\n");
    }
    );

  }
}

function SendLocation(location) {
  var dictionary = {
    32: location,
  };


  // Send to watchapp
  Pebble.sendAppMessage(dictionary, function () {
    //console.log("sendAppMessage");
    // console.log('Send successful: ' + JSON.stringify(dictionary));
  }, function () {
    console.log('Send failed!');
  });
}


function padStart2(str, targetLength, padString) {
  // Convertir la valeur en chaîne de caractères si ce n'est pas déjà fait
  str = String(str);
  // Ajouter le padding jusqu'à atteindre la longueur souhaitée
  while (str.length < targetLength) {
    str = padString + str;
  }
  return str;
}

function areSameDay(dateA, dateB) {
  return dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate();
}

function windBearing(wind) {
  if ((wind >= 337) || (wind < 22))
    return "N";
  if ((wind >= 22) && (wind < 67))
    return "NE";
  if ((wind >= 67) && (wind < 112))
    return "E";
  if ((wind >= 112) && (wind < 157))
    return "SE";
  if ((wind >= 157) && (wind < 202))
    return "S";
  if ((wind >= 202) && (wind < 247))
    return "SW";
  if ((wind >= 247) && (wind < 292))
    return "W";
  if ((wind >= 292) && (wind < 337))
    return "NW";

  return "?";
}

function convertMpsToMph(mps) {
  const conversionFactor = 2.23694;
  return Math.round(mps * conversionFactor);
}

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9 / 5) + 32);
}

// WMO Weather Code to MET Norway symbol_code mapping
// WMO codes: https://open-meteo.com/en/docs (weather_code field)
// Maps to MET Norway icon names for compatibility with existing build_icon() in C
function wmoCodeToSymbolCode(wmoCode, isNight) {
  var dayNight = isNight ? '_night' : '_day';

  switch (wmoCode) {
    case 0:  // Clear sky
      return 'clearsky' + dayNight;
    case 1:  // Mainly clear
      return 'fair' + dayNight;
    case 2:  // Partly cloudy
      return 'partlycloudy' + dayNight;
    case 3:  // Overcast
      return 'cloudy';
    case 45: // Fog
    case 48: // Depositing rime fog
      return 'fog';
    case 51: // Drizzle: Light
      return 'lightrain';
    case 53: // Drizzle: Moderate
      return 'rain';
    case 55: // Drizzle: Dense
      return 'rain';
    case 56: // Freezing Drizzle: Light
      return 'sleet';
    case 57: // Freezing Drizzle: Dense
      return 'sleet';
    case 61: // Rain: Slight
      return 'lightrainshowers' + dayNight;
    case 63: // Rain: Moderate
      return 'rain';
    case 65: // Rain: Heavy
      return 'heavyrain';
    case 66: // Freezing Rain: Light
      return 'sleet';
    case 67: // Freezing Rain: Heavy
      return 'heavysleet';
    case 71: // Snow fall: Slight
      return 'lightsnow';
    case 73: // Snow fall: Moderate
      return 'snow';
    case 75: // Snow fall: Heavy
      return 'heavysnow';
    case 77: // Snow grains
      return 'snow';
    case 80: // Rain showers: Slight
      return 'lightrainshowers' + dayNight;
    case 81: // Rain showers: Moderate
      return 'rainshowers' + dayNight;
    case 82: // Rain showers: Violent
      return 'heavyrainshowers' + dayNight;
    case 85: // Snow showers: Slight
      return 'lightsnowshowers' + dayNight;
    case 86: // Snow showers: Heavy
      return 'heavysnowshowers' + dayNight;
    case 95: // Thunderstorm: Slight or moderate
      return 'rainandthunder';
    case 96: // Thunderstorm with slight hail
      return 'rainandthunder';
    case 99: // Thunderstorm with heavy hail
      return 'heavyrainandthunder';
    default:
      return 'partlycloudy' + dayNight;
  }
}

// Check if current hour is night time (between sunset and sunrise)
function isNightTime(hour) {
  // Approximate: night is between 21:00 and 6:00
  return hour >= 21 || hour < 6;
}

function calculateDaysBetweenDates(date1, date2) {
  var d1 = new Date(date1);
  var d2 = new Date(date2);
  var differenceEnMillisecondes = d2 - d1;

  var differenceEnJours = Math.floor(differenceEnMillisecondes / (1000 * 60 * 60 * 24));

  return differenceEnJours;
}


var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    callback(this.responseText);
  };

  xhr.open(type, url);
  xhr.setRequestHeader('user-Agent', 'Pebble Weather Graph - Christophe.Jeannette@gmail.com');
  xhr.send();
};


function attendre(ms, callback) {
  setTimeout(callback, ms);
}


function getForecast() {
  console.log("getForecast");

  // Check which API to use (default to Open-Meteo with AROME model for France)
  var weatherApi = localStorage.getItem('weather_api') || 'openmeteo';
  console.log("Using weather API: " + weatherApi);

  if (weatherApi === 'openmeteo') {
    getForecastOpenMeteo();
  } else {
    getForecastMetNo();
  }
}


function getForecastMetNo() {
  console.log("getForecastMetNo");

  SendStatus("OK\nGetting forecast ...");

  var userAgent2 = "Pebble Weather Graph - Christophe.Jeannette@gmail.com";

  var now = new Date();

  // Obtenir l'offset en minutes (négatif si la timezone est en avance sur UTC)
  var offsetMinutes = now.getTimezoneOffset();
  // Convertir l'offset en heures et minutes
  var offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  var offsetRemainingMinutes = Math.abs(offsetMinutes) % 60;

  // Ajouter le signe + ou -
  var sign = offsetMinutes <= 0 ? "+" : "-";

  // Formater en HH:MM avec le zéro devant si nécessaire
  var formattedOffset = sign + padStart2(offsetHours, 2, '0') + ":" + padStart2(offsetRemainingMinutes, 2, '0');

  var coordinates = 'lat=' + current_Latitude + '&lon=' + current_Longitude;

  var urlWeatherRequest;
  var urlSunriseRequest;
  var urlMoonRequest;

  if (testMode == 0) {
    urlWeatherRequest = 'https://api.met.no/weatherapi/locationforecast/2.0/complete?' + coordinates;
    urlSunriseRequest = 'https://api.met.no/weatherapi/sunrise/3.0/sun?' + coordinates + '&offset=' + formattedOffset;
    urlMoonRequest = 'https://api.met.no/weatherapi/sunrise/3.0/moon?' + coordinates + '&offset=' + formattedOffset;
  }
  else {
    urlWeatherRequest = "https://jsonplaceholder.typicode.com/posts";
    urlSunriseRequest = "https://jsonplaceholder.typicode.com/posts";
    urlMoonRequest = "https://jsonplaceholder.typicode.com/posts";
  }

  console.log(urlWeatherRequest);
  console.log(urlSunriseRequest);
  console.log(urlMoonRequest);

  xhrRequest(urlWeatherRequest, 'GET',
    function (responseWeather) {
      xhrRequest(urlSunriseRequest, 'GET',
        function (responseSunrise) {
          xhrRequest(urlMoonRequest, 'GET',
            function (responseMoon) {

              //console.log(responseWeather);
              //console.log(responseSunrise);
              //console.log(responseMoon);

              if (testMode == 1) {
                responseWeather = '{"type":"Feature","geometry":{"type":"Point","coordinates":[5.7,43.1,0]},"properties":{"meta":{"updated_at":"2024-10-02T08:19:19Z","units":{"air_pressure_at_sea_level":"hPa","air_temperature":"celsius","air_temperature_max":"celsius","air_temperature_min":"celsius","cloud_area_fraction":"%","cloud_area_fraction_high":"%","cloud_area_fraction_low":"%","cloud_area_fraction_medium":"%","dew_point_temperature":"celsius","fog_area_fraction":"%","precipitation_amount":"mm","relative_humidity":"%","ultraviolet_index_clear_sky":"1","wind_from_direction":"degrees","wind_speed":"m/s"}},"timeseries":[{"time":"2024-10-02T08:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.2,"air_temperature":19.4,"cloud_area_fraction":87.5,"cloud_area_fraction_high":85.2,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":30.5,"dew_point_temperature":15.2,"fog_area_fraction":0.0,"relative_humidity":76.6,"ultraviolet_index_clear_sky":1.4,"wind_from_direction":295.0,"wind_speed":9.3}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":21.9,"air_temperature_min":20.4,"precipitation_amount":0.0}}}},{"time":"2024-10-02T09:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.9,"air_temperature":20.6,"cloud_area_fraction":84.4,"cloud_area_fraction_high":79.7,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":18.7,"dew_point_temperature":15.0,"fog_area_fraction":0.0,"relative_humidity":74.9,"ultraviolet_index_clear_sky":2.6,"wind_from_direction":287.5,"wind_speed":10.0}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":21.9,"air_temperature_min":19.2,"precipitation_amount":0.0}}}},{"time":"2024-10-02T10:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.0,"air_temperature":21.5,"cloud_area_fraction":90.6,"cloud_area_fraction_high":87.5,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":25.0,"dew_point_temperature":14.5,"fog_area_fraction":0.0,"relative_humidity":72.8,"ultraviolet_index_clear_sky":3.7,"wind_from_direction":284.3,"wind_speed":11.1}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":21.9,"air_temperature_min":19.0,"precipitation_amount":0.0}}}},{"time":"2024-10-02T11:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.1,"air_temperature":21.9,"cloud_area_fraction":100.0,"cloud_area_fraction_high":99.2,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":20.3,"dew_point_temperature":14.0,"fog_area_fraction":0.0,"relative_humidity":70.5,"ultraviolet_index_clear_sky":4.3,"wind_from_direction":282.7,"wind_speed":11.5}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":21.5,"air_temperature_min":19.0,"precipitation_amount":0.0}}}},{"time":"2024-10-02T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.7,"air_temperature":21.5,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":64.1,"dew_point_temperature":12.2,"fog_area_fraction":0.0,"relative_humidity":61.3,"ultraviolet_index_clear_sky":4.1,"wind_from_direction":289.4,"wind_speed":12.1}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":20.8,"air_temperature_min":19.0,"precipitation_amount":0.0}}}},{"time":"2024-10-02T13:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.2,"air_temperature":20.8,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":69.5,"dew_point_temperature":10.9,"fog_area_fraction":0.0,"relative_humidity":57.1,"ultraviolet_index_clear_sky":3.3,"wind_from_direction":292.6,"wind_speed":11.6}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":20.4,"air_temperature_min":19.0,"precipitation_amount":0.0}}}},{"time":"2024-10-02T14:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.9,"air_temperature":20.4,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":10.9,"fog_area_fraction":0.0,"relative_humidity":58.5,"ultraviolet_index_clear_sky":2.1,"wind_from_direction":285.2,"wind_speed":11.3}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":19.5,"air_temperature_min":19.0,"precipitation_amount":0.0}}}},{"time":"2024-10-02T15:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.5,"air_temperature":19.2,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":11.2,"fog_area_fraction":0.0,"relative_humidity":60.4,"ultraviolet_index_clear_sky":1.0,"wind_from_direction":288.2,"wind_speed":11.0}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":19.5,"air_temperature_min":18.6,"precipitation_amount":0.0}}}},{"time":"2024-10-02T16:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.4,"air_temperature":19.0,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":86.7,"dew_point_temperature":10.8,"fog_area_fraction":0.0,"relative_humidity":59.0,"ultraviolet_index_clear_sky":0.3,"wind_from_direction":291.4,"wind_speed":10.7}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":19.5,"air_temperature_min":17.9,"precipitation_amount":0.2}}}},{"time":"2024-10-02T17:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.3,"air_temperature":19.2,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":39.1,"dew_point_temperature":10.6,"fog_area_fraction":0.0,"relative_humidity":57.4,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":289.9,"wind_speed":10.5}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":19.5,"air_temperature_min":17.8,"precipitation_amount":0.3}}}},{"time":"2024-10-02T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.4,"air_temperature":19.5,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":93.0,"dew_point_temperature":9.7,"fog_area_fraction":0.0,"relative_humidity":52.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":291.2,"wind_speed":10.4}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":19.4,"air_temperature_min":17.4,"precipitation_amount":0.3}}}},{"time":"2024-10-02T19:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.4,"air_temperature":19.4,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":60.2,"dew_point_temperature":10.0,"fog_area_fraction":0.0,"relative_humidity":54.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":290.2,"wind_speed":10.6}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":19.0,"air_temperature_min":17.0,"precipitation_amount":0.3}}}},{"time":"2024-10-02T20:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.4,"air_temperature":19.0,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":97.7,"dew_point_temperature":10.5,"fog_area_fraction":0.0,"relative_humidity":57.7,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":291.0,"wind_speed":11.1}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":18.6,"air_temperature_min":16.6,"precipitation_amount":0.3}}}},{"time":"2024-10-02T21:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.2,"air_temperature":18.6,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":10.2,"fog_area_fraction":0.0,"relative_humidity":57.7,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":293.1,"wind_speed":10.9}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"lightrain"},"details":{"precipitation_amount":0.2}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":17.9,"air_temperature_min":16.4,"precipitation_amount":0.3}}}},{"time":"2024-10-02T22:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.0,"air_temperature":17.9,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":10.5,"fog_area_fraction":0.0,"relative_humidity":61.5,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":287.0,"wind_speed":10.5}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":17.8,"air_temperature_min":16.3,"precipitation_amount":0.1}}}},{"time":"2024-10-02T23:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1005.7,"air_temperature":17.8,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":10.7,"fog_area_fraction":0.0,"relative_humidity":62.8,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":282.7,"wind_speed":10.5}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":17.4,"air_temperature_min":15.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1005.1,"air_temperature":17.4,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":10.8,"fog_area_fraction":0.0,"relative_humidity":65.1,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":293.5,"wind_speed":11.2}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":17.0,"air_temperature_min":15.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T01:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1004.6,"air_temperature":17.0,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":10.8,"fog_area_fraction":0.0,"relative_humidity":66.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":300.9,"wind_speed":11.3}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":16.6,"air_temperature_min":15.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T02:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1004.0,"air_temperature":16.6,"cloud_area_fraction":100.0,"cloud_area_fraction_high":99.2,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":10.6,"fog_area_fraction":0.0,"relative_humidity":67.1,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":311.7,"wind_speed":11.7}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":17.4,"air_temperature_min":15.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T03:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.7,"air_temperature":16.4,"cloud_area_fraction":100.0,"cloud_area_fraction_high":98.4,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":99.2,"dew_point_temperature":10.7,"fog_area_fraction":0.0,"relative_humidity":68.4,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":315.3,"wind_speed":12.0}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"air_temperature_max":19.4,"air_temperature_min":15.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T04:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.6,"air_temperature":16.3,"cloud_area_fraction":100.0,"cloud_area_fraction_high":96.1,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":10.9,"fog_area_fraction":0.0,"relative_humidity":70.4,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":311.0,"wind_speed":12.1}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"air_temperature_max":20.6,"air_temperature_min":15.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T05:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.4,"air_temperature":15.9,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":11.2,"fog_area_fraction":0.0,"relative_humidity":73.7,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":315.4,"wind_speed":13.2}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":21.3,"air_temperature_min":15.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.0,"air_temperature":16.0,"cloud_area_fraction":100.0,"cloud_area_fraction_high":66.4,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":100.0,"dew_point_temperature":11.1,"fog_area_fraction":0.0,"relative_humidity":73.0,"ultraviolet_index_clear_sky":0.1,"wind_from_direction":318.6,"wind_speed":12.5}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":21.8,"air_temperature_min":15.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T07:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.3,"air_temperature":15.9,"cloud_area_fraction":40.6,"cloud_area_fraction_high":40.6,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":1.6,"dew_point_temperature":11.0,"fog_area_fraction":0.0,"relative_humidity":72.7,"ultraviolet_index_clear_sky":0.5,"wind_from_direction":319.4,"wind_speed":12.6}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":22.1,"air_temperature_min":17.4,"precipitation_amount":0.0}}}},{"time":"2024-10-03T08:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.4,"air_temperature":17.4,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.9,"fog_area_fraction":0.0,"relative_humidity":68.3,"ultraviolet_index_clear_sky":1.3,"wind_from_direction":319.0,"wind_speed":12.6}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":22.1,"air_temperature_min":19.4,"precipitation_amount":0.0}}}},{"time":"2024-10-03T09:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.7,"air_temperature":19.4,"cloud_area_fraction":8.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":8.6,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.7,"fog_area_fraction":0.0,"relative_humidity":62.1,"ultraviolet_index_clear_sky":2.4,"wind_from_direction":317.3,"wind_speed":12.1}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":22.1,"air_temperature_min":20.6,"precipitation_amount":0.0}}}},{"time":"2024-10-03T10:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.8,"air_temperature":20.6,"cloud_area_fraction":14.1,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":14.1,"cloud_area_fraction_medium":0.8,"dew_point_temperature":10.8,"fog_area_fraction":0.0,"relative_humidity":58.9,"ultraviolet_index_clear_sky":3.4,"wind_from_direction":311.3,"wind_speed":12.3}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":22.1,"air_temperature_min":20.5,"precipitation_amount":0.0}}}},{"time":"2024-10-03T11:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1004.0,"air_temperature":21.3,"cloud_area_fraction":10.9,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":10.9,"cloud_area_fraction_medium":3.9,"dew_point_temperature":11.3,"fog_area_fraction":0.0,"relative_humidity":59.7,"ultraviolet_index_clear_sky":4.0,"wind_from_direction":308.9,"wind_speed":13.2}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":22.1,"air_temperature_min":19.5,"precipitation_amount":0.0}}}},{"time":"2024-10-03T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.8,"air_temperature":21.8,"cloud_area_fraction":16.4,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":13.3,"cloud_area_fraction_medium":12.5,"dew_point_temperature":11.3,"fog_area_fraction":0.0,"relative_humidity":58.2,"ultraviolet_index_clear_sky":3.8,"wind_from_direction":308.9,"wind_speed":12.5}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":22.1,"air_temperature_min":18.6,"precipitation_amount":0.0}}}},{"time":"2024-10-03T13:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.6,"air_temperature":22.1,"cloud_area_fraction":18.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":14.8,"cloud_area_fraction_medium":15.6,"dew_point_temperature":11.1,"fog_area_fraction":0.0,"relative_humidity":56.1,"ultraviolet_index_clear_sky":3.0,"wind_from_direction":308.0,"wind_speed":12.4}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":21.9,"air_temperature_min":17.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T14:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1003.8,"air_temperature":21.9,"cloud_area_fraction":8.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":2.3,"cloud_area_fraction_medium":8.6,"dew_point_temperature":10.9,"fog_area_fraction":0.0,"relative_humidity":54.5,"ultraviolet_index_clear_sky":1.9,"wind_from_direction":307.2,"wind_speed":12.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":21.5,"air_temperature_min":17.3,"precipitation_amount":0.0}}}},{"time":"2024-10-03T15:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1004.0,"air_temperature":21.5,"cloud_area_fraction":1.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":1.6,"dew_point_temperature":10.8,"fog_area_fraction":0.0,"relative_humidity":54.0,"ultraviolet_index_clear_sky":0.9,"wind_from_direction":309.4,"wind_speed":12.6}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":20.5,"air_temperature_min":16.8,"precipitation_amount":0.0}}}},{"time":"2024-10-03T16:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1004.1,"air_temperature":20.5,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.7,"fog_area_fraction":0.0,"relative_humidity":54.8,"ultraviolet_index_clear_sky":0.3,"wind_from_direction":311.6,"wind_speed":13.0}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":19.5,"air_temperature_min":16.5,"precipitation_amount":0.0}}}},{"time":"2024-10-03T17:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1004.7,"air_temperature":19.5,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.5,"fog_area_fraction":0.0,"relative_humidity":56.1,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":313.4,"wind_speed":14.3}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":18.6,"air_temperature_min":15.9,"precipitation_amount":0.0}}}},{"time":"2024-10-03T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1005.4,"air_temperature":18.6,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.0,"fog_area_fraction":0.0,"relative_humidity":61.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":315.1,"wind_speed":14.7}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":17.9,"air_temperature_min":15.6,"precipitation_amount":0.0}}}},{"time":"2024-10-03T19:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1005.8,"air_temperature":17.9,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.9,"fog_area_fraction":0.0,"relative_humidity":63.1,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":317.8,"wind_speed":14.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":17.3,"air_temperature_min":15.2,"precipitation_amount":0.0}}}},{"time":"2024-10-03T20:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.2,"air_temperature":17.3,"cloud_area_fraction":1.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":1.6,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.8,"fog_area_fraction":0.0,"relative_humidity":65.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":316.8,"wind_speed":15.0}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":16.8,"air_temperature_min":14.7,"precipitation_amount":0.0}}}},{"time":"2024-10-03T21:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.7,"air_temperature":16.8,"cloud_area_fraction":1.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":1.6,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.8,"fog_area_fraction":0.0,"relative_humidity":67.5,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":315.3,"wind_speed":14.7}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":16.5,"air_temperature_min":14.4,"precipitation_amount":0.0}}}},{"time":"2024-10-03T22:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.1,"air_temperature":16.5,"cloud_area_fraction":1.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":1.6,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.8,"fog_area_fraction":0.0,"relative_humidity":68.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":314.4,"wind_speed":14.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":15.9,"air_temperature_min":14.2,"precipitation_amount":0.0}}}},{"time":"2024-10-03T23:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.3,"air_temperature":15.9,"cloud_area_fraction":2.3,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":2.3,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.6,"fog_area_fraction":0.0,"relative_humidity":70.6,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":315.6,"wind_speed":14.9}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":15.6,"air_temperature_min":14.0,"precipitation_amount":0.0}}}},{"time":"2024-10-04T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.2,"air_temperature":15.6,"cloud_area_fraction":1.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":1.6,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.5,"fog_area_fraction":0.0,"relative_humidity":71.6,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":315.6,"wind_speed":14.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":15.2,"air_temperature_min":13.7,"precipitation_amount":0.0}}}},{"time":"2024-10-04T01:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.1,"air_temperature":15.2,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.3,"fog_area_fraction":0.0,"relative_humidity":72.7,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":318.9,"wind_speed":14.9}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":14.7,"air_temperature_min":13.7,"precipitation_amount":0.0}}}},{"time":"2024-10-04T02:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.0,"air_temperature":14.7,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.2,"fog_area_fraction":0.0,"relative_humidity":74.0,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":321.4,"wind_speed":14.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":14.7,"air_temperature_min":13.7,"precipitation_amount":0.0}}}},{"time":"2024-10-04T03:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.0,"air_temperature":14.4,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.0,"fog_area_fraction":0.0,"relative_humidity":74.5,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":319.9,"wind_speed":14.3}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":16.4,"air_temperature_min":13.7,"precipitation_amount":0.0}}}},{"time":"2024-10-04T04:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.2,"air_temperature":14.2,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.9,"fog_area_fraction":0.0,"relative_humidity":74.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":319.6,"wind_speed":14.3}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":17.6,"air_temperature_min":13.7,"precipitation_amount":0.0}}}},{"time":"2024-10-04T05:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.4,"air_temperature":14.0,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.6,"fog_area_fraction":0.0,"relative_humidity":74.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":318.4,"wind_speed":14.1}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":18.8,"air_temperature_min":13.7,"precipitation_amount":0.0}}}},{"time":"2024-10-04T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.8,"air_temperature":13.7,"cloud_area_fraction":1.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":1.6,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.5,"fog_area_fraction":0.0,"relative_humidity":75.4,"ultraviolet_index_clear_sky":0.1,"wind_from_direction":319.6,"wind_speed":14.0}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":19.6,"air_temperature_min":13.9,"precipitation_amount":0.0}}}},{"time":"2024-10-04T07:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.4,"air_temperature":13.9,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.3,"fog_area_fraction":0.0,"relative_humidity":73.8,"ultraviolet_index_clear_sky":0.4,"wind_from_direction":319.9,"wind_speed":13.7}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":20.1,"air_temperature_min":14.7,"precipitation_amount":0.0}}}},{"time":"2024-10-04T08:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.9,"air_temperature":14.7,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.2,"fog_area_fraction":0.0,"relative_humidity":70.7,"ultraviolet_index_clear_sky":1.2,"wind_from_direction":316.7,"wind_speed":13.2}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":20.1,"air_temperature_min":16.4,"precipitation_amount":0.0}}}},{"time":"2024-10-04T09:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.1,"air_temperature":16.4,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.0,"fog_area_fraction":0.0,"relative_humidity":65.6,"ultraviolet_index_clear_sky":2.2,"wind_from_direction":315.2,"wind_speed":12.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":20.1,"air_temperature_min":17.6,"precipitation_amount":0.0}}}},{"time":"2024-10-04T10:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.3,"air_temperature":17.6,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.0,"fog_area_fraction":0.0,"relative_humidity":62.0,"ultraviolet_index_clear_sky":3.1,"wind_from_direction":312.4,"wind_speed":12.9}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":20.1,"air_temperature_min":18.6,"precipitation_amount":0.0}}}},{"time":"2024-10-04T11:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.3,"air_temperature":18.8,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.1,"fog_area_fraction":0.0,"relative_humidity":59.2,"ultraviolet_index_clear_sky":3.7,"wind_from_direction":308.4,"wind_speed":12.2}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":20.1,"air_temperature_min":18.2,"precipitation_amount":0.0}}}},{"time":"2024-10-04T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.2,"air_temperature":19.6,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.2,"fog_area_fraction":0.0,"relative_humidity":57.4,"ultraviolet_index_clear_sky":3.5,"wind_from_direction":302.3,"wind_speed":12.2}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":20.1,"air_temperature_min":17.4,"precipitation_amount":0.0}}}},{"time":"2024-10-04T13:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.7,"air_temperature":20.1,"cloud_area_fraction":6.2,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":6.2,"cloud_area_fraction_medium":3.1,"dew_point_temperature":9.2,"fog_area_fraction":0.0,"relative_humidity":55.8,"ultraviolet_index_clear_sky":2.9,"wind_from_direction":298.6,"wind_speed":12.4}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":19.9,"air_temperature_min":16.6,"precipitation_amount":0.0}}}},{"time":"2024-10-04T14:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.7,"air_temperature":19.9,"cloud_area_fraction":6.2,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":5.5,"dew_point_temperature":9.0,"fog_area_fraction":0.0,"relative_humidity":53.9,"ultraviolet_index_clear_sky":1.8,"wind_from_direction":300.7,"wind_speed":13.4}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":19.4,"air_temperature_min":16.0,"precipitation_amount":0.0}}}},{"time":"2024-10-04T15:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.1,"air_temperature":19.4,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":8.5,"fog_area_fraction":0.0,"relative_humidity":52.0,"ultraviolet_index_clear_sky":0.9,"wind_from_direction":305.4,"wind_speed":13.1}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":18.6,"air_temperature_min":15.6,"precipitation_amount":0.0}}}},{"time":"2024-10-04T16:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.2,"air_temperature":18.6,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.8,"dew_point_temperature":8.3,"fog_area_fraction":0.0,"relative_humidity":51.6,"ultraviolet_index_clear_sky":0.3,"wind_from_direction":311.7,"wind_speed":12.6}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":18.2,"air_temperature_min":15.2,"precipitation_amount":0.0}}}},{"time":"2024-10-04T17:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.6,"air_temperature":18.2,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":8.1,"fog_area_fraction":0.0,"relative_humidity":51.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":316.9,"wind_speed":12.3}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":17.4,"air_temperature_min":15.0,"precipitation_amount":0.0}}}},{"time":"2024-10-04T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.2,"air_temperature":17.4,"cloud_area_fraction":2.3,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":2.3,"cloud_area_fraction_medium":0.0,"dew_point_temperature":8.5,"fog_area_fraction":0.0,"relative_humidity":55.8,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":319.0,"wind_speed":12.0}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":16.6,"air_temperature_min":15.0,"precipitation_amount":0.0}}}},{"time":"2024-10-04T19:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.9,"air_temperature":16.6,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":8.4,"fog_area_fraction":0.0,"relative_humidity":58.4,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":324.1,"wind_speed":11.2}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-10-04T20:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1011.6,"air_temperature":16.0,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":8.2,"fog_area_fraction":0.0,"relative_humidity":59.7,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":332.9,"wind_speed":9.8}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-10-04T21:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.1,"air_temperature":15.6,"cloud_area_fraction":7.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":7.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":8.8,"fog_area_fraction":0.0,"relative_humidity":64.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":331.7,"wind_speed":8.3}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-10-04T22:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.4,"air_temperature":15.2,"cloud_area_fraction":20.3,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":20.3,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.5,"fog_area_fraction":0.0,"relative_humidity":69.0,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":327.0,"wind_speed":8.3}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-10-04T23:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.7,"air_temperature":15.0,"cloud_area_fraction":39.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":39.1,"cloud_area_fraction_medium":0.8,"dew_point_temperature":9.4,"fog_area_fraction":0.0,"relative_humidity":69.8,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":327.1,"wind_speed":8.0}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-10-05T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.7,"air_temperature":15.0,"cloud_area_fraction":37.5,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":36.7,"cloud_area_fraction_medium":0.8,"dew_point_temperature":9.5,"fog_area_fraction":0.0,"relative_humidity":69.6,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":351.0,"wind_speed":6.2}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":16.3,"air_temperature_min":15.5,"precipitation_amount":0.0}}}},{"time":"2024-10-05T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.6,"air_temperature":16.2,"cloud_area_fraction":16.4,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":16.4,"cloud_area_fraction_medium":0.8,"dew_point_temperature":12.9,"relative_humidity":81.3,"wind_from_direction":25.0,"wind_speed":3.2}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":19.0,"air_temperature_min":16.2,"precipitation_amount":0.0}}}},{"time":"2024-10-05T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.0,"air_temperature":19.0,"cloud_area_fraction":8.6,"cloud_area_fraction_high":6.2,"cloud_area_fraction_low":2.3,"cloud_area_fraction_medium":0.0,"dew_point_temperature":12.7,"relative_humidity":71.5,"wind_from_direction":173.8,"wind_speed":2.2}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":19.0,"air_temperature_min":17.5,"precipitation_amount":0.0}}}},{"time":"2024-10-05T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1013.4,"air_temperature":17.6,"cloud_area_fraction":5.5,"cloud_area_fraction_high":5.5,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":13.0,"relative_humidity":74.5,"wind_from_direction":317.5,"wind_speed":1.0}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":17.6,"air_temperature_min":16.4,"precipitation_amount":0.0}}}},{"time":"2024-10-06T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.0,"air_temperature":16.4,"cloud_area_fraction":52.3,"cloud_area_fraction_high":52.3,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":13.9,"relative_humidity":84.8,"wind_from_direction":41.4,"wind_speed":1.4}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":16.6,"air_temperature_min":16.1,"precipitation_amount":0.0}}}},{"time":"2024-10-06T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.1,"air_temperature":16.3,"cloud_area_fraction":98.4,"cloud_area_fraction_high":96.9,"cloud_area_fraction_low":34.4,"cloud_area_fraction_medium":0.0,"dew_point_temperature":13.3,"relative_humidity":82.5,"wind_from_direction":66.2,"wind_speed":3.0}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":19.9,"air_temperature_min":16.3,"precipitation_amount":0.0}}}},{"time":"2024-10-06T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.8,"air_temperature":19.9,"cloud_area_fraction":91.4,"cloud_area_fraction_high":85.2,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":42.2,"dew_point_temperature":12.7,"relative_humidity":71.7,"wind_from_direction":137.5,"wind_speed":4.3}},"next_12_hours":{"summary":{"symbol_code":"cloudy"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":19.9,"air_temperature_min":17.7,"precipitation_amount":0.0}}}},{"time":"2024-10-06T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.2,"air_temperature":18.3,"cloud_area_fraction":100.0,"cloud_area_fraction_high":7.8,"cloud_area_fraction_low":100.0,"cloud_area_fraction_medium":8.6,"dew_point_temperature":12.1,"relative_humidity":67.1,"wind_from_direction":101.2,"wind_speed":3.8}},"next_12_hours":{"summary":{"symbol_code":"lightrain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":18.5,"air_temperature_min":18.2,"precipitation_amount":0.3}}}},{"time":"2024-10-07T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.0,"air_temperature":18.3,"cloud_area_fraction":100.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":98.4,"cloud_area_fraction_medium":99.2,"dew_point_temperature":15.3,"relative_humidity":81.9,"wind_from_direction":81.7,"wind_speed":6.7}},"next_12_hours":{"summary":{"symbol_code":"lightrainshowers_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"rain"},"details":{"air_temperature_max":19.1,"air_temperature_min":18.3,"precipitation_amount":1.7}}}},{"time":"2024-10-07T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.1,"air_temperature":19.1,"cloud_area_fraction":100.0,"cloud_area_fraction_high":20.3,"cloud_area_fraction_low":100.0,"cloud_area_fraction_medium":0.8,"dew_point_temperature":16.9,"relative_humidity":87.5,"wind_from_direction":102.6,"wind_speed":6.9}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":21.5,"air_temperature_min":19.1,"precipitation_amount":0.1}}}},{"time":"2024-10-07T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1015.7,"air_temperature":21.5,"cloud_area_fraction":41.4,"cloud_area_fraction_high":0.8,"cloud_area_fraction_low":40.6,"cloud_area_fraction_medium":0.0,"dew_point_temperature":18.0,"relative_humidity":88.6,"wind_from_direction":109.4,"wind_speed":5.8}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"air_temperature_max":21.5,"air_temperature_min":19.9,"precipitation_amount":0.0}}}},{"time":"2024-10-07T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1015.1,"air_temperature":19.9,"cloud_area_fraction":80.5,"cloud_area_fraction_high":77.3,"cloud_area_fraction_low":10.9,"cloud_area_fraction_medium":2.3,"dew_point_temperature":18.4,"relative_humidity":91.5,"wind_from_direction":101.9,"wind_speed":6.3}},"next_12_hours":{"summary":{"symbol_code":"lightrain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":19.9,"air_temperature_min":19.5,"precipitation_amount":0.0}}}},{"time":"2024-10-08T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.6,"air_temperature":19.6,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":22.7,"cloud_area_fraction_medium":94.5,"dew_point_temperature":17.8,"relative_humidity":90.3,"wind_from_direction":101.3,"wind_speed":8.3}},"next_12_hours":{"summary":{"symbol_code":"rain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"rain"},"details":{"air_temperature_max":19.7,"air_temperature_min":19.5,"precipitation_amount":1.2}}}},{"time":"2024-10-08T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1011.9,"air_temperature":19.7,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":3.9,"cloud_area_fraction_medium":44.5,"dew_point_temperature":17.2,"relative_humidity":86.3,"wind_from_direction":100.4,"wind_speed":10.7}},"next_12_hours":{"summary":{"symbol_code":"rain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"rain"},"details":{"air_temperature_max":19.8,"air_temperature_min":19.0,"precipitation_amount":3.0}}}},{"time":"2024-10-08T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.9,"air_temperature":19.1,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":9.4,"cloud_area_fraction_medium":3.1,"dew_point_temperature":16.1,"relative_humidity":82.9,"wind_from_direction":91.0,"wind_speed":11.7}},"next_12_hours":{"summary":{"symbol_code":"lightrainshowers_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"rain"},"details":{"air_temperature_max":19.5,"air_temperature_min":18.5,"precipitation_amount":2.7}}}},{"time":"2024-10-08T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.2,"air_temperature":18.6,"cloud_area_fraction":98.4,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":98.4,"cloud_area_fraction_medium":7.0,"dew_point_temperature":16.6,"relative_humidity":88.5,"wind_from_direction":119.5,"wind_speed":5.8}},"next_12_hours":{"summary":{"symbol_code":"lightrainshowers_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"lightrain"},"details":{"air_temperature_max":18.7,"air_temperature_min":18.3,"precipitation_amount":0.9}}}},{"time":"2024-10-09T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1011.1,"air_temperature":18.5,"cloud_area_fraction":28.1,"cloud_area_fraction_high":27.3,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":15.8,"relative_humidity":84.1,"wind_from_direction":307.4,"wind_speed":5.8}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":18.5,"air_temperature_min":17.0,"precipitation_amount":0.0}}}},{"time":"2024-10-09T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1011.1,"air_temperature":17.0,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":13.4,"relative_humidity":79.1,"wind_from_direction":310.0,"wind_speed":6.7}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":21.1,"air_temperature_min":16.8,"precipitation_amount":0.0}}}},{"time":"2024-10-09T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.4,"air_temperature":21.1,"cloud_area_fraction":21.9,"cloud_area_fraction_high":21.9,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":12.9,"relative_humidity":68.5,"wind_from_direction":284.2,"wind_speed":7.3}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":21.1,"air_temperature_min":18.8,"precipitation_amount":0.0}}}},{"time":"2024-10-09T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.9,"air_temperature":19.6,"cloud_area_fraction":21.9,"cloud_area_fraction_high":20.3,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.8,"dew_point_temperature":12.9,"relative_humidity":65.8,"wind_from_direction":90.0,"wind_speed":1.3}},"next_12_hours":{"summary":{"symbol_code":"lightrainshowers_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":19.6,"air_temperature_min":18.7,"precipitation_amount":0.0}}}},{"time":"2024-10-10T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.5,"air_temperature":18.7,"cloud_area_fraction":99.2,"cloud_area_fraction_high":99.2,"cloud_area_fraction_low":10.9,"cloud_area_fraction_medium":0.0,"dew_point_temperature":16.5,"relative_humidity":86.7,"wind_from_direction":79.4,"wind_speed":6.9}},"next_12_hours":{"summary":{"symbol_code":"lightrainshowers_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"lightrain"},"details":{"air_temperature_max":19.5,"air_temperature_min":18.7,"precipitation_amount":0.5}}}},{"time":"2024-10-10T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.8,"air_temperature":19.5,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":25.8,"cloud_area_fraction_medium":35.9,"dew_point_temperature":17.6,"relative_humidity":89.6,"wind_from_direction":106.9,"wind_speed":6.8}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":21.3,"air_temperature_min":19.5,"precipitation_amount":0.3}}}},{"time":"2024-10-10T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.1,"air_temperature":21.3,"cloud_area_fraction":29.7,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":28.1,"cloud_area_fraction_medium":8.6,"dew_point_temperature":18.7,"relative_humidity":93.1,"wind_from_direction":154.2,"wind_speed":2.7}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":21.3,"air_temperature_min":19.7,"precipitation_amount":0.0}}}},{"time":"2024-10-10T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.3,"air_temperature":20.4,"cloud_area_fraction":39.1,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":2.3,"cloud_area_fraction_medium":37.5,"dew_point_temperature":17.9,"relative_humidity":86.7,"wind_from_direction":290.6,"wind_speed":4.1}},"next_12_hours":{"summary":{"symbol_code":"fair_night"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":20.6,"air_temperature_min":19.1,"precipitation_amount":0.0}}}},{"time":"2024-10-11T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.4,"air_temperature":19.1,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":15.3,"relative_humidity":78.3,"wind_from_direction":314.3,"wind_speed":5.4}},"next_12_hours":{"summary":{"symbol_code":"lightrainshowers_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":19.1,"air_temperature_min":18.0,"precipitation_amount":0.0}}}},{"time":"2024-10-11T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.8,"air_temperature":18.3,"cloud_area_fraction":16.4,"cloud_area_fraction_high":7.8,"cloud_area_fraction_low":8.6,"cloud_area_fraction_medium":7.0,"dew_point_temperature":15.0,"relative_humidity":80.0,"wind_from_direction":307.9,"wind_speed":1.9}},"next_6_hours":{"summary":{"symbol_code":"rainshowers_day"},"details":{"air_temperature_max":19.1,"air_temperature_min":17.5,"precipitation_amount":4.8}}}},{"time":"2024-10-11T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.8,"air_temperature":18.0,"cloud_area_fraction":98.4,"cloud_area_fraction_high":94.5,"cloud_area_fraction_low":64.1,"cloud_area_fraction_medium":43.7,"dew_point_temperature":14.7,"relative_humidity":81.6,"wind_from_direction":334.6,"wind_speed":4.7}}}}]}}';
                responseSunrise = '{"copyright":"MET Norway","licenseURL":"https://api.met.no/license_data.html","type":"Feature","geometry":{"type":"Point","coordinates":[5.7,43.1]},"when":{"interval":["2024-09-23T23:29:00Z","2024-09-24T23:37:00Z"]},"properties":{"body":"Sun","sunrise":{"time":"2024-09-24T06:27+01:00","azimuth":90.13},"sunset":{"time":"2024-09-24T18:30+01:00","azimuth":269.61},"solarnoon":{"time":"2024-09-24T12:29+01:00","disc_centre_elevation":46.14,"visible":true},"solarmidnight":{"time":"2024-09-24T00:29+01:00","disc_centre_elevation":-47.47,"visible":false}}}';
                responseMoon = '{"copyright":"MET Norway","licenseURL":"https://api.met.no/license_data.html","type":"Feature","geometry":{"type":"Point","coordinates":[5.7,43.1]},"when":{"interval":["2024-09-23T23:37:00Z","2024-09-24T23:37:00Z"]},"properties":{"body":"Moon","moonrise":{"time":"2024-09-24T22:35+01:00","azimuth":49.07},"moonset":{"time":"2024-09-24T14:20+01:00","azimuth":310.96},"high_moon":{"time":"2024-09-24T05:58+01:00","disc_centre_elevation":75.15,"visible":true},"low_moon":{"time":"2024-09-24T18:27+01:00","disc_centre_elevation":-19.09,"visible":false},"moonphase":260.08}}';

              }

              responseWeather = responseWeather.replace(/3h/g, "hh");
              responseSunrise = responseSunrise.replace(/3h/g, "hh");
              responseMoon = responseMoon.replace(/3h   /g, "hh");

              var jsonWeather = JSON.parse(responseWeather);
              var jsonSunrise = JSON.parse(responseSunrise);
              var jsonMoon = JSON.parse(responseMoon);

              var varTest = jsonWeather.type;
              console.log(varTest);

              varTest = jsonSunrise.copyright;
              console.log(varTest);

              varTest = jsonMoon.licenseURL;
              console.log(varTest);


              SendStatus(" OK\nProcessing data ...");
              console.log("processing data");

              //var varTest = jsonWeather.type;
              //console.log(varTest);
              //varTest = jsonSunrise.copyright;
              //console.log(varTest);
              //varTest = jsonMoon.licenseURL;
              //console.log(varTest);

              //console.log('bIsImperial retrieved from memory : ' + bIsImperial);

              var units_description;
              var units_temperature;
              var units_wind;


              if (bIsImperial == 1) {
                units_description = "imperial";
                units_temperature = "°F"
                units_wind = " m/h";

              }
              else {
                units_description = "metric";
                units_temperature = "°C"
                units_wind = " m/s";
              }

              var hourly_time = {
                hour0: 0,
                hour3: 0,
                hour6: 0,
                hour9: 0,
                hour12: 0,
                hour15: 0,
                hour18: 0,
                hour21: 0,
                hour24: 0
              };

              var hourlyWind = {
                hour0: 0,
                hour3: 0,
                hour6: 0,
                hour9: 0,
                hour12: 0,
                hour15: 0,
                hour18: 0,
                hour21: 0,
                hour24: 0
              };

              var hourlyTemperatures = {
                hour0: 0,
                hour3: 0,
                hour6: 0,
                hour9: 0,
                hour12: 0,
                hour15: 0,
                hour18: 0,
                hour21: 0,
                hour24: 0
              };

              var hourly_icons = {
                hour0: 0,
                hour3: 0,
                hour6: 0,
                hour9: 0,
                hour12: 0,
                hour15: 0,
                hour18: 0,
                hour21: 0,
                hour24: 0
              };

              var hourlyRain = {
                hour0: 0,
                hour1: 0,
                hour2: 0,
                hour3: 0,
                hour4: 0,
                hour5: 0,
                hour6: 0,
                hour7: 0,
                hour8: 0,
                hour9: 0,
                hour10: 0,
                hour11: 0,
                hour12: 0,
                hour13: 0,
                hour14: 0,
                hour15: 0,
                hour16: 0,
                hour17: 0,
                hour18: 0,
                hour19: 0,
                hour20: 0,
                hour21: 0,
                hour22: 0,
                hour23: 0,
                hour24: 0
              };
              // ----------------------
              // Today panel
              var rTemperature = Math.round(jsonWeather.properties.timeseries[0].data.instant.details.air_temperature);
              if (bIsImperial == 1) {
                rTemperature = celsiusToFahrenheit(rTemperature);
              }
              var stringTemperatureNow = rTemperature + units_temperature;

              var sDateSunrise = jsonSunrise.properties.sunrise.time;
              var dDateSunrise = new Date(sDateSunrise);
              var hours = dDateSunrise.getHours();
              var minutes = dDateSunrise.getMinutes();
              var stringSunrise = padStart2(hours, 2, '0') + ':' + padStart2(minutes, 2, '0');
              //console.log(stringSunrise);

              var sDateSunset = jsonSunrise.properties.sunset.time;
              var dDateSunset = new Date(sDateSunset);
              hours = dDateSunset.getHours();
              minutes = dDateSunset.getMinutes();
              var stringSunset = padStart2(hours, 2, '0') + ':' + padStart2(minutes, 2, '0');
              //console.log(stringSunrise);

              var rWind = Math.round(jsonWeather.properties.timeseries[0].data.instant.details.wind_speed);
              if (bIsImperial == 1) {
                // mph convertion
                rWind = convertMpsToMph(rWind);
              }
              var stringWindNow = rWind + units_wind;
              var sHumidity = Math.round(jsonWeather.properties.timeseries[0].data.instant.details.relative_humidity) + '%';

              // ----------------------
              // Hourly grah  
              var nTodayTempMin = 1000;
              var nTodayTempMax = -1000;
              for (var i = 0; i <= 24; i++) {
                if ((i % 3) == 0) {
                  // 3 hours resolution
                  // forecast hours 
                  var utcTimeString = jsonWeather.properties.timeseries[i].time;
                  var utcDate = new Date(utcTimeString);
                  var offsetMinutes2 = new Date().getTimezoneOffset();
                  var localTime = new Date(utcDate.getTime() - (offsetMinutes2 * 60000));
                  var localHour = localTime.getHours();
                  hourly_time['hour' + i] = localHour;

                  // wind 
                  var windSpeed = Math.round(jsonWeather.properties.timeseries[i].data.instant.details.wind_speed);
                  if (bIsImperial == 1) {
                    // mph convertion
                    windSpeed = convertMpsToMph(windSpeed);
                  }
                  hourlyWind['hour' + i] = windSpeed + "\n" + windBearing(jsonWeather.properties.timeseries[i].data.instant.details.wind_from_direction);

                  // temperatures
                  var temperature = Math.round(jsonWeather.properties.timeseries[i].data.instant.details.air_temperature);
                  if (bIsImperial == 1) {
                    temperature = celsiusToFahrenheit(temperature);
                  }

                  hourlyTemperatures['hour' + i] = temperature;

                  // icons
                  hourly_icons['hour' + i] = jsonWeather.properties.timeseries[i].data.next_1_hours.summary.symbol_code;
                }
                // 1 hour resolution
                // Hourly rain precipitation
                hourlyRain['hour' + i] = jsonWeather.properties.timeseries[i].data.next_1_hours.details.precipitation_amount;
                // mm to pixels to draw
                hourlyRain['hour' + i] = Math.round(hourlyRain['hour' + i] * 20);
                var temp = Math.round(jsonWeather.properties.timeseries[i].data.instant.details.air_temperature);

                if (temp < nTodayTempMin) {
                  nTodayTempMin = temp;
                }
                if (temp > nTodayTempMax) {
                  nTodayTempMax = temp;
                }
              }

              if (bIsImperial == 1) {
                nTodayTempMax = celsiusToFahrenheit(nTodayTempMax);
                nTodayTempMin = celsiusToFahrenheit(nTodayTempMin);
              }

              // -------------------
              // Daily panels 


              var daily_moon_phases = {
                day0: 0,
                day1: 0,
                day2: 0,
                day3: 0,
                day4: 0,
                day5: 0
              };

              var daily_week_position = {
                day0: 0,
                day1: 0,
                day2: 0,
                day3: 0,
                day4: 0,
                day5: 0
              };

              var daily_temperature = {
                day0: 0,
                day1: 0,
                day2: 0,
                day3: 0,
                day4: 0,
                day5: 0
              };

              var daily_icon = {
                day0: 0,
                day1: 0,
                day2: 0,
                day3: 0,
                day4: 0,
                day5: 0
              };

              var daily_wind = {
                // day1p
                day0: 0,
                day1: 0,
                day2: 0,
                day3: 0,
                day4: 0,
                day5: 0
              };

              var daily_rain = {
                // day1r
                day0: 0,
                day1: 0,
                day2: 0,
                day3: 0,
                day4: 0,
                day5: 0
              };


              var nforthDayOccurencesCounter = 0;
              var stopLoop = 0;

              now.setHours(0, 0, 0, 0);
              //console.log(now);

              var current_gap = -1;
              var tempMin;
              var tempMax;
              var nbDayOccurences;
              var nMaxWind;
              var nMaxRain;

              for (var i = 0; i <= 1000 && !stopLoop; i++) {

                var utcTimeString = jsonWeather.properties.timeseries[i].time;
                var utcDate = new Date(utcTimeString);
                var offsetMinutes2 = new Date().getTimezoneOffset();
                var localTime = new Date(utcDate.getTime() - (offsetMinutes2 * 60000));

                nLocalHour = localTime.getHours();

                localTime.setHours = (0, 0, 0, 0);

                var j = calculateDaysBetweenDates(now, localTime);

                if (j >= 0) {
                  if (j != current_gap) {
                    // day stats reset
                    console.log(localTime);
                    current_gap = j;
                    tempMin = 1000;
                    tempMax = -1000;
                    nbDayOccurences = 0;
                    nMaxWind = 0;
                    nMaxRain = 0;
                  }

                  nbDayOccurences++
                  var dayIndex = j;
                  daily_week_position['day' + dayIndex] = localTime.getDay();

                  var currentTemp = Math.round(jsonWeather.properties.timeseries[i].data.instant.details.air_temperature);
                  if (bIsImperial == 1) {
                    currentTemp = celsiusToFahrenheit(currentTemp);
                  }
                  if (currentTemp < tempMin) {
                    tempMin = currentTemp;

                  }
                  if (currentTemp > tempMax) {
                    tempMax = currentTemp;
                  }

                  var currentWind = Math.round(jsonWeather.properties.timeseries[i].data.instant.details.wind_speed);
                  if (currentWind > nMaxWind) {
                    nMaxWind = currentWind;
                    daily_wind['day' + dayIndex] = currentWind;
                    //  console.log('wind ' + daily_wind['day' + dayIndex]);
                  }

                  // precipitation amount to pixels conversion 
                  if (jsonWeather.properties &&
                    jsonWeather.properties.timeseries &&
                    jsonWeather.properties.timeseries[i] &&
                    jsonWeather.properties.timeseries[i].data &&
                    jsonWeather.properties.timeseries[i].data.next_6_hours &&
                    jsonWeather.properties.timeseries[i].data.next_6_hours.details &&
                    jsonWeather.properties.timeseries[i].data.next_6_hours.details.precipitation_amount) {

                    var currentRain = Math.round(jsonWeather.properties.timeseries[i].data.next_6_hours.details.precipitation_amount);

                    //console.log(currentRain);

                    currentRain = currentRain * 2;

                    if (currentRain > 23) {
                      currentRain = 23;
                    }

                    //  console.log(currentRain);
                  }

                  if (currentRain > nMaxRain) {
                    nMaxRain = currentRain;
                    daily_rain['day' + dayIndex] = currentRain;
                  }

                  daily_temperature['day' + dayIndex] = tempMax + units_temperature + '\n' + tempMin + units_temperature;


                  //console.log(daily_temperature['day'+dayIndex]);
                  // console.log('i' + i + ' -- j' + j + '  -  ' + daily_week_position['day' + dayIndex]);
                  if ((daily_icon['day' + dayIndex] == 0) && (nLocalHour > 6)) {
                    if (jsonWeather.properties &&
                      jsonWeather.properties.timeseries &&
                      jsonWeather.properties.timeseries[i] &&
                      jsonWeather.properties.timeseries[i].data &&
                      jsonWeather.properties.timeseries[i].data.next_12_hours &&
                      jsonWeather.properties.timeseries[i].data.next_12_hours.summary &&
                      jsonWeather.properties.timeseries[i].data.next_12_hours.summary.symbol_code) {
                      daily_icon['day' + dayIndex] = jsonWeather.properties.timeseries[i].data.next_12_hours.summary.symbol_code;
                      // console.log("trouvé");
                    }


                  }

                  //   console.log("--");


                }

                if ((j == 6) && (nbDayOccurences == 4)) {
                  stopLoop = 1;
                }

              }
              var initialMoon = jsonMoon.properties.moonphase;
              daily_moon_phases['day0'] = Math.round(initialMoon / 365 * 25);

              var moonIncrement = 360 / 29;


              for (var i = 1; i < 6; i++) {
                initialMoon = (initialMoon + moonIncrement) % 360;
                daily_moon_phases['day' + i] = Math.round(initialMoon / 365 * 25);
                //console.log(daily_moon_phases['day' + i]);
              }


              var dictionary = {
                0: stringTemperatureNow,
                1: 0,
                104: 0,
                3: stringWindNow,
                6: stringSunrise,
                7: stringSunset,
                8: nTodayTempMin + units_temperature,
                9: nTodayTempMax + units_temperature,
                10: hourly_icons['hour0'],
                11: hourlyTemperatures['hour0'],
                12: hourlyTemperatures['hour3'],
                13: hourlyTemperatures['hour6'],
                14: hourlyTemperatures['hour9'],
                15: hourlyTemperatures['hour12'],
                55: hourlyTemperatures['hour15'],
                56: hourlyTemperatures['hour18'],
                72: hourlyTemperatures['hour21'],
                73: hourlyTemperatures['hour24'],
                111: hourly_time['hour0'],
                16: hourly_time['hour3'],
                17: hourly_time['hour6'],
                18: hourly_time['hour9'],
                57: hourly_time['hour12'],
                58: hourly_time['hour15'],
                59: hourly_time['hour18'],
                60: hourly_time['hour21'],
                112: hourly_time['hour24'],

                21: hourlyRain['hour0'],
                80: hourlyRain['hour1'],
                81: hourlyRain['hour2'],

                22: hourlyRain['hour3'],
                82: hourlyRain['hour4'],
                83: hourlyRain['hour5'],

                23: hourlyRain['hour6'],
                84: hourlyRain['hour7'],
                85: hourlyRain['hour8'],

                24: hourlyRain['hour9'],
                86: hourlyRain['hour10'],
                87: hourlyRain['hour11'],

                25: hourlyRain['hour12'],
                88: hourlyRain['hour13'],
                89: hourlyRain['hour14'],

                61: hourlyRain['hour15'],
                90: hourlyRain['hour16'],
                91: hourlyRain['hour17'],

                62: hourlyRain['hour18'],
                92: hourlyRain['hour19'],
                93: hourlyRain['hour20'],

                63: hourlyRain['hour21'],
                94: hourlyRain['hour22'],
                95: hourlyRain['hour23'],

                26: hourly_icons['hour3'],
                27: hourly_icons['hour6'],
                28: hourly_icons['hour9'],
                64: hourly_icons['hour12'],
                65: hourly_icons['hour15'],
                66: hourly_icons['hour18'],
                67: hourly_icons['hour24'],

                113: hourlyWind['hour0'],
                29: hourlyWind['hour3'],
                30: hourlyWind['hour6'],
                31: hourlyWind['hour9'],
                68: hourlyWind['hour12'],
                69: hourlyWind['hour15'],
                70: hourlyWind['hour18'],
                71: hourlyWind['hour21'],
                114: hourlyWind['hour24'],

                74: daily_week_position['day0'],
                75: daily_week_position['day1'],
                76: daily_week_position['day2'],
                96: daily_week_position['day3'],
                97: daily_week_position['day4'],
                98: daily_week_position['day5'],
                105: daily_temperature['day0'],
                106: daily_temperature['day1'],
                107: daily_temperature['day2'],
                108: daily_temperature['day3'],
                109: daily_temperature['day4'],
                110: daily_temperature['day5'],
                77: daily_icon['day0'],
                78: daily_icon['day1'],
                79: daily_icon['day2'],
                99: daily_icon['day3'],
                102: daily_icon['day4'],
                103: daily_icon['day5'],

                115: daily_moon_phases['day0'],
                116: daily_moon_phases['day1'],
                117: daily_moon_phases['day2'],
                118: daily_moon_phases['day3'],
                119: daily_moon_phases['day4'],
                120: daily_moon_phases['day5'],

                121: daily_rain['day0'],
                122: daily_rain['day1'],
                123: daily_rain['day2'],
                124: daily_rain['day3'],
                125: daily_rain['day4'],
                126: daily_rain['day5'],

                127: daily_wind['day0'],
                128: daily_wind['day1'],
                129: daily_wind['day2'],
                130: daily_wind['day3'],
                131: daily_wind['day4'],
                132: daily_wind['day5'],

                5: sHumidity
              };

              SendStatus(" OK\nReceiving data");
              // console.log("sending data");
              // console.log("sendAppMessage");

              // save dictionary + last update time
              var jsonConfig = JSON.parse(localStorage.getItem(KEY_CONFIG));
              //console.log(JSON.stringify(jsonConfig));

              var updateTime = new Date().toISOString();

              jsonConfig.cities[cityIndex].lastUpdated = updateTime;
              jsonConfig.cities[cityIndex].weatherDictionary = JSON.stringify(dictionary);

              localStorage.setItem(KEY_CONFIG, JSON.stringify(jsonConfig));

              Pebble.sendAppMessage(dictionary, function () {
                //console.log("success");
                SendStatus("END_TRANSMISSION");
                // console.log('Send successful: ' + JSON.stringify(dictionary));
              }, function () {
                console.log('Send failed!');
                SendStatus(" FAILED\n");
              }
              );

            }
          );
        }
      );
    }
  );
}


// Open-Meteo API with Météo-France AROME model (1.5km resolution, excellent for France)
function getForecastOpenMeteo() {
  console.log("getForecastOpenMeteo");

  SendStatus("OK\nGetting forecast ...");

  var now = new Date();

  // Obtenir l'offset en minutes (négatif si la timezone est en avance sur UTC)
  var offsetMinutes = now.getTimezoneOffset();
  // Convertir l'offset en heures et minutes
  var offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  var offsetRemainingMinutes = Math.abs(offsetMinutes) % 60;

  // Ajouter le signe + ou -
  var sign = offsetMinutes <= 0 ? "+" : "-";

  // Formater en HH:MM avec le zéro devant si nécessaire
  var formattedOffset = sign + padStart2(offsetHours, 2, '0') + ":" + padStart2(offsetRemainingMinutes, 2, '0');

  var coordinates = 'lat=' + current_Latitude + '&lon=' + current_Longitude;

  // Open-Meteo API with Météo-France AROME model
  var urlOpenMeteo = 'https://api.open-meteo.com/v1/meteofrance?' +
    'latitude=' + current_Latitude + '&longitude=' + current_Longitude +
    '&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max' +
    '&forecast_days=7&timezone=auto';

  // Still need MET Norway for sunrise/sunset/moon data
  var urlSunriseRequest = 'https://api.met.no/weatherapi/sunrise/3.0/sun?' + coordinates + '&offset=' + formattedOffset;
  var urlMoonRequest = 'https://api.met.no/weatherapi/sunrise/3.0/moon?' + coordinates + '&offset=' + formattedOffset;

  console.log(urlOpenMeteo);
  console.log(urlSunriseRequest);
  console.log(urlMoonRequest);

  xhrRequest(urlOpenMeteo, 'GET',
    function (responseWeather) {
      xhrRequest(urlSunriseRequest, 'GET',
        function (responseSunrise) {
          xhrRequest(urlMoonRequest, 'GET',
            function (responseMoon) {
              processOpenMeteoResponse(responseWeather, responseSunrise, responseMoon);
            }
          );
        }
      );
    }
  );
}


// Process Open-Meteo API response and convert to the same dictionary format as MET Norway
function processOpenMeteoResponse(responseWeather, responseSunrise, responseMoon) {
  console.log("processOpenMeteoResponse");

  var jsonWeather = JSON.parse(responseWeather);
  var jsonSunrise = JSON.parse(responseSunrise);
  var jsonMoon = JSON.parse(responseMoon);

  SendStatus(" OK\nProcessing data ...");

  var hourly = jsonWeather.hourly;
  var daily = jsonWeather.daily;

  var units_description;
  var units_temperature;
  var units_wind;

  if (bIsImperial == 1) {
    units_description = "imperial";
    units_temperature = "°F";
    units_wind = " m/h";
  } else {
    units_description = "metric";
    units_temperature = "°C";
    units_wind = " m/s";
  }

  // ----------------------
  // Today panel
  var rTemperature = Math.round(hourly.temperature_2m[0]);
  if (bIsImperial == 1) {
    rTemperature = celsiusToFahrenheit(rTemperature);
  }
  var stringTemperatureNow = rTemperature + units_temperature;

  var sDateSunrise = jsonSunrise.properties.sunrise.time;
  var dDateSunrise = new Date(sDateSunrise);
  var hours = dDateSunrise.getHours();
  var minutes = dDateSunrise.getMinutes();
  var stringSunrise = padStart2(hours, 2, '0') + ':' + padStart2(minutes, 2, '0');

  var sDateSunset = jsonSunrise.properties.sunset.time;
  var dDateSunset = new Date(sDateSunset);
  hours = dDateSunset.getHours();
  minutes = dDateSunset.getMinutes();
  var stringSunset = padStart2(hours, 2, '0') + ':' + padStart2(minutes, 2, '0');

  // Wind speed from Open-Meteo is in km/h, convert to m/s first for consistency
  var rWind = Math.round(hourly.wind_speed_10m[0] / 3.6); // km/h to m/s
  if (bIsImperial == 1) {
    // mph conversion
    rWind = convertMpsToMph(rWind);
  }
  var stringWindNow = rWind + units_wind;
  var sHumidity = Math.round(hourly.relative_humidity_2m[0]) + '%';

  // ----------------------
  // Hourly graph
  var hourly_time = {
    hour0: 0, hour3: 0, hour6: 0, hour9: 0, hour12: 0, hour15: 0, hour18: 0, hour21: 0, hour24: 0
  };

  var hourlyWind = {
    hour0: 0, hour3: 0, hour6: 0, hour9: 0, hour12: 0, hour15: 0, hour18: 0, hour21: 0, hour24: 0
  };

  var hourlyTemperatures = {
    hour0: 0, hour3: 0, hour6: 0, hour9: 0, hour12: 0, hour15: 0, hour18: 0, hour21: 0, hour24: 0
  };

  var hourly_icons = {
    hour0: 0, hour3: 0, hour6: 0, hour9: 0, hour12: 0, hour15: 0, hour18: 0, hour21: 0, hour24: 0
  };

  var hourlyRain = {
    hour0: 0, hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0, hour7: 0, hour8: 0,
    hour9: 0, hour10: 0, hour11: 0, hour12: 0, hour13: 0, hour14: 0, hour15: 0, hour16: 0,
    hour17: 0, hour18: 0, hour19: 0, hour20: 0, hour21: 0, hour22: 0, hour23: 0, hour24: 0
  };

  var nTodayTempMin = 1000;
  var nTodayTempMax = -1000;

  for (var i = 0; i <= 24 && i < hourly.time.length; i++) {
    if ((i % 3) === 0) {
      // 3 hours resolution
      var utcTimeString = hourly.time[i];
      var utcDate = new Date(utcTimeString);
      var offsetMinutes2 = new Date().getTimezoneOffset();
      var localTime = new Date(utcDate.getTime() - (offsetMinutes2 * 60000));
      var localHour = localTime.getHours();
      hourly_time['hour' + i] = localHour;

      // Wind
      var windSpeedKmh = hourly.wind_speed_10m[i];
      var windSpeed = Math.round(windSpeedKmh / 3.6); // km/h to m/s
      if (bIsImperial == 1) {
        windSpeed = convertMpsToMph(windSpeed);
      }
      hourlyWind['hour' + i] = windSpeed + "\n" + windBearing(hourly.wind_direction_10m[i]);

      // Temperatures
      var temperature = Math.round(hourly.temperature_2m[i]);
      if (bIsImperial == 1) {
        temperature = celsiusToFahrenheit(temperature);
      }
      hourlyTemperatures['hour' + i] = temperature;

      // Icons - convert WMO code to MET Norway symbol
      var hourIsNight = isNightTime(localHour);
      hourly_icons['hour' + i] = wmoCodeToSymbolCode(hourly.weather_code[i], hourIsNight);
    }

    // 1 hour resolution - Rain precipitation
    hourlyRain['hour' + i] = Math.round((hourly.precipitation[i] || 0) * 20);

    var temp = Math.round(hourly.temperature_2m[i]);
    if (temp < nTodayTempMin) {
      nTodayTempMin = temp;
    }
    if (temp > nTodayTempMax) {
      nTodayTempMax = temp;
    }
  }

  if (bIsImperial == 1) {
    nTodayTempMax = celsiusToFahrenheit(nTodayTempMax);
    nTodayTempMin = celsiusToFahrenheit(nTodayTempMin);
  }

  // -------------------
  // Daily panels
  var daily_moon_phases = { day0: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0 };
  var daily_week_position = { day0: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0 };
  var daily_temperature = { day0: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0 };
  var daily_icon = { day0: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0 };
  var daily_wind = { day0: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0 };
  var daily_rain = { day0: 0, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0 };

  // Process daily data from Open-Meteo
  for (var d = 0; d < 6 && d < daily.time.length; d++) {
    var dayDate = new Date(daily.time[d]);
    daily_week_position['day' + d] = dayDate.getDay();

    var tempMax = Math.round(daily.temperature_2m_max[d]);
    var tempMin = Math.round(daily.temperature_2m_min[d]);
    if (bIsImperial == 1) {
      tempMax = celsiusToFahrenheit(tempMax);
      tempMin = celsiusToFahrenheit(tempMin);
    }
    daily_temperature['day' + d] = tempMax + units_temperature + '\n' + tempMin + units_temperature;

    // Icon - convert WMO code (daytime)
    daily_icon['day' + d] = wmoCodeToSymbolCode(daily.weather_code[d], false);

    // Wind (km/h to m/s)
    var dayWind = Math.round(daily.wind_speed_10m_max[d] / 3.6);
    if (bIsImperial == 1) {
      dayWind = convertMpsToMph(dayWind);
    }
    daily_wind['day' + d] = dayWind;

    // Rain (mm to pixels, max 23)
    var dayRain = Math.round(daily.precipitation_sum[d] * 2);
    if (dayRain > 23) {
      dayRain = 23;
    }
    daily_rain['day' + d] = dayRain;
  }

  // Moon phases
  var initialMoon = jsonMoon.properties.moonphase;
  daily_moon_phases['day0'] = Math.round(initialMoon / 365 * 25);

  var moonIncrement = 360 / 29;
  for (var m = 1; m < 6; m++) {
    initialMoon = (initialMoon + moonIncrement) % 360;
    daily_moon_phases['day' + m] = Math.round(initialMoon / 365 * 25);
  }

  var dictionary = {
    0: stringTemperatureNow,
    1: 0,
    104: 0,
    3: stringWindNow,
    6: stringSunrise,
    7: stringSunset,
    8: nTodayTempMin + units_temperature,
    9: nTodayTempMax + units_temperature,
    10: hourly_icons['hour0'],
    11: hourlyTemperatures['hour0'],
    12: hourlyTemperatures['hour3'],
    13: hourlyTemperatures['hour6'],
    14: hourlyTemperatures['hour9'],
    15: hourlyTemperatures['hour12'],
    55: hourlyTemperatures['hour15'],
    56: hourlyTemperatures['hour18'],
    72: hourlyTemperatures['hour21'],
    73: hourlyTemperatures['hour24'],
    111: hourly_time['hour0'],
    16: hourly_time['hour3'],
    17: hourly_time['hour6'],
    18: hourly_time['hour9'],
    57: hourly_time['hour12'],
    58: hourly_time['hour15'],
    59: hourly_time['hour18'],
    60: hourly_time['hour21'],
    112: hourly_time['hour24'],

    21: hourlyRain['hour0'],
    80: hourlyRain['hour1'],
    81: hourlyRain['hour2'],

    22: hourlyRain['hour3'],
    82: hourlyRain['hour4'],
    83: hourlyRain['hour5'],

    23: hourlyRain['hour6'],
    84: hourlyRain['hour7'],
    85: hourlyRain['hour8'],

    24: hourlyRain['hour9'],
    86: hourlyRain['hour10'],
    87: hourlyRain['hour11'],

    25: hourlyRain['hour12'],
    88: hourlyRain['hour13'],
    89: hourlyRain['hour14'],

    61: hourlyRain['hour15'],
    90: hourlyRain['hour16'],
    91: hourlyRain['hour17'],

    62: hourlyRain['hour18'],
    92: hourlyRain['hour19'],
    93: hourlyRain['hour20'],

    63: hourlyRain['hour21'],
    94: hourlyRain['hour22'],
    95: hourlyRain['hour23'],

    26: hourly_icons['hour3'],
    27: hourly_icons['hour6'],
    28: hourly_icons['hour9'],
    64: hourly_icons['hour12'],
    65: hourly_icons['hour15'],
    66: hourly_icons['hour18'],
    67: hourly_icons['hour24'],

    113: hourlyWind['hour0'],
    29: hourlyWind['hour3'],
    30: hourlyWind['hour6'],
    31: hourlyWind['hour9'],
    68: hourlyWind['hour12'],
    69: hourlyWind['hour15'],
    70: hourlyWind['hour18'],
    71: hourlyWind['hour21'],
    114: hourlyWind['hour24'],

    74: daily_week_position['day0'],
    75: daily_week_position['day1'],
    76: daily_week_position['day2'],
    96: daily_week_position['day3'],
    97: daily_week_position['day4'],
    98: daily_week_position['day5'],
    105: daily_temperature['day0'],
    106: daily_temperature['day1'],
    107: daily_temperature['day2'],
    108: daily_temperature['day3'],
    109: daily_temperature['day4'],
    110: daily_temperature['day5'],
    77: daily_icon['day0'],
    78: daily_icon['day1'],
    79: daily_icon['day2'],
    99: daily_icon['day3'],
    102: daily_icon['day4'],
    103: daily_icon['day5'],

    115: daily_moon_phases['day0'],
    116: daily_moon_phases['day1'],
    117: daily_moon_phases['day2'],
    118: daily_moon_phases['day3'],
    119: daily_moon_phases['day4'],
    120: daily_moon_phases['day5'],

    121: daily_rain['day0'],
    122: daily_rain['day1'],
    123: daily_rain['day2'],
    124: daily_rain['day3'],
    125: daily_rain['day4'],
    126: daily_rain['day5'],

    127: daily_wind['day0'],
    128: daily_wind['day1'],
    129: daily_wind['day2'],
    130: daily_wind['day3'],
    131: daily_wind['day4'],
    132: daily_wind['day5'],

    5: sHumidity
  };

  SendStatus(" OK\nReceiving data");

  // save dictionary + last update time
  var jsonConfig = JSON.parse(localStorage.getItem(KEY_CONFIG));
  var updateTime = new Date().toISOString();

  jsonConfig.cities[cityIndex].lastUpdated = updateTime;
  jsonConfig.cities[cityIndex].weatherDictionary = JSON.stringify(dictionary);

  localStorage.setItem(KEY_CONFIG, JSON.stringify(jsonConfig));

  Pebble.sendAppMessage(dictionary, function () {
    SendStatus("END_TRANSMISSION");
  }, function () {
    console.log('Send failed!');
    SendStatus(" FAILED\n");
  });
}


function locationSuccess(pos) {

  current_Latitude = pos.coords.latitude;
  current_Longitude = pos.coords.longitude;

  console.log("location success");
  getForecast();
}

function locationError(err) {
  console.log("location error");
  SendStatus("ERROR\n");
}

function getPosition() {
  SendStatus("OK\nGetting position ... ");

  if (testMode == 0) {
    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError,
      { timeout: 15000, maximumAge: 60000 }
    )
  }
  else {
    const position = {
      coords: {
        latitude: 43.1,        // Remplacez par la latitude réelle
        longitude: 5.7,        // Remplacez par la longitude réelle
        altitude: null,              // Peut être null si non disponible
        accuracy: 10,                // Précision en mètres
        altitudeAccuracy: null,      // Peut être null si non disponible
        heading: null,               // Peut être null si l'appareil est stationnaire
        speed: null                  // Peut être null si non disponible
      },
      timestamp: 1692448765123        // Timestamp en millisecondes depuis l'époque Unix
    };
    locationSuccess(position);
  }
}

// Listen for when the watchface is opened
Pebble.addEventListener('ready',
  function (e) {
    console.log("PebbleKit JS ready.");

    // var maintenant = new Date().toISOString();
    //localStorage.setItem(KEY_LAST_UPDATE, JSON.stringify(maintenant));
    // config reset in test mode

    if ((testMode == 1) || (JSON.parse(localStorage.getItem(KEY_CONFIG) === null))) {
      console.log("fake config mode");
      var testConfig = {
        "gps": true,
        "unit": "celcius",
        "cities": [
          {
            "cityName": "NEW YORK",
            "latitude": "40.682272",
            "longitude": "-73.807343"
          },
          {
            "cityName": "BARRALI ITALIA",
            "latitude": "39.475895",
            "longitude": "9.101538"
          },
          {
            "cityName": "PARIS",
            "latitude": "48.864472",
            "longitude": "2.335986"
          }
        ]
      };

      var is_gps = testConfig.gps;

      if (is_gps == true) {
        var newEntry = {
          "cityName": "GPS",
          "latitude": "",
          "longitude": ""
        };
        testConfig.cities.unshift(newEntry);
      }

      testConfig.cities.forEach(function (city) {
        city.lastUpdated = new Date(2020, 10, 15, 10, 30).toISOString();
        city.weatherDictionary = "";


        //console.log(JSON.stringify(testConfig));

      });
      localStorage.setItem(KEY_CONFIG, JSON.stringify(testConfig));

    }

  }
);

// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage',
  function (e) {
    console.log("AppMessage received");

    runConfig();
    current_page++;

  });


Pebble.addEventListener('showConfiguration', function () {
  var url = 'https://sichroteph.github.io/Weather-Graph';

  //console.// ('Showing configuration page: ' + url);
  Pebble.openURL(url);
});

Pebble.addEventListener('webviewclosed', function (e) {
  // Check if e.response exists and is not empty
  if (!e.response || e.response === 'CANCELLED') {
    console.log('Configuration cancelled or empty');
    return;
  }

  var rawConfig = decodeURIComponent(e.response);
  console.log('Raw config received: ' + rawConfig);

  var options = JSON.parse(rawConfig);
  console.log('Parsed options: ' + JSON.stringify(options));

  // Transform options from config page to expected format
  var configData = {
    gps: options.gps || false,
    unit: options.radio_units ? 'imperial' : 'metric',  // radio_units checked = imperial
    utc: options.select_utc || '1',
    refresh: options.radio_refresh ? '30' : '60',  // radio_refresh checked = 30mn
    vibration: options.toggle_vibration || false,
    bw_icons: options.toggle_bw_icons || false,
    weather_api: options.weather_api || 'openmeteo',
    color_right_back: options.color_right_back || '#000000',
    color_left_back: options.color_left_back || '#000000',
    color_hours: options.color_hours || '#FFFFFF',
    color_ruler: options.color_ruler || '#FFFFFF',
    color_temperatures: options.color_temperatures || '#FFFFFF',
    cities: []
  };

  // Add city from input
  if (options.input_city && options.input_city.trim() !== '') {
    configData.cities.push({
      cityName: options.input_city.trim(),
      latitude: '',
      longitude: '',
      lastUpdated: new Date(2020, 10, 15, 10, 30).toISOString(),
      weatherDictionary: ''
    });
  }

  // Add GPS entry if enabled
  if (configData.gps) {
    configData.cities.unshift({
      cityName: 'GPS',
      latitude: '0',
      longitude: '',
      lastUpdated: new Date(2020, 10, 15, 10, 30).toISOString(),
      weatherDictionary: ''
    });
  }

  // Ensure at least one city exists
  if (configData.cities.length === 0) {
    configData.cities.push({
      cityName: 'GPS',
      latitude: '0',
      longitude: '',
      lastUpdated: new Date(2020, 10, 15, 10, 30).toISOString(),
      weatherDictionary: ''
    });
    configData.gps = true;
  }

  localStorage.setItem(KEY_CONFIG, JSON.stringify(configData));

  // Weather API selection (Open-Meteo or MET Norway)
  localStorage.setItem('weather_api', configData.weather_api);
  console.log("Weather API set to: " + configData.weather_api);

  console.log('Configuration saved: ' + JSON.stringify(configData));

  // Trigger double vibration on watch
  var vibrateMessage = {
    134: 1
  };
  Pebble.sendAppMessage(vibrateMessage, function() {
    console.log('Vibration message sent');
  }, function() {
    console.log('Failed to send vibration message');
  });

  // Refresh weather data
  current_page = 0;
  runConfig();
  current_page++;
});

