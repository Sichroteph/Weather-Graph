var myGoogleAPIKey = ' ';
var status = ' ';
var debugLog = 1;
var testMode = 1;

function SendStatus(status) {
  var dictionary = {
    "KEY_STATUS": status,
  };

  function debugLog(message) {
    if (debugLog == 1) {
      console.log(message);
    }
  }

  // Send to watchapp
  Pebble.sendAppMessage(dictionary, function () {
    console.log("sendAppMessage");
    console.log('Send successful: ' + JSON.stringify(dictionary));
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

var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    callback(this.responseText);
  };

  xhr.open(type, url);
  xhr.setRequestHeader('user-Agent', 'Pebble Weather Graph - Christophe.Jeannette@gmail.com');
  xhr.send();
};

function getForecast() {
  console.log("getForecast");
  SendStatus("Getting forecast ...");

  var coordinates = localStorage.getItem(153);
  var input_api = localStorage.getItem(156);

  var units = localStorage.getItem(152);
  var units_s;
  if (units == 1) {
    units_s = "imperial";
  }
  else {
    units_s = "metric";
  }

  const userAgent2 = "Pebble Weather Graph - Christophe.Jeannette@gmail.com";

  const now = new Date();

  // Obtenir l'offset en minutes (négatif si la timezone est en avance sur UTC)
  const offsetMinutes = now.getTimezoneOffset();
  // Convertir l'offset en heures et minutes
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetRemainingMinutes = Math.abs(offsetMinutes) % 60;

  // Ajouter le signe + ou -
  const sign = offsetMinutes <= 0 ? "+" : "-";

  // Formater en HH:MM avec le zéro devant si nécessaire
  const formattedOffset = sign + padStart2(offsetHours, 2, '0') + ":" + padStart2(offsetRemainingMinutes, 2, '0');

  var urlWeatherRequest = 'https://api.met.no/weatherapi/locationforecast/2.0/complete?' + coordinates;
  var urlSunriseRequest = 'https://api.met.no/weatherapi/sunrise/3.0/sun?' + coordinates + '&offset=' + formattedOffset;
  var urlMoonRequest = 'https://api.met.no/weatherapi/sunrise/3.0/moon?' + coordinates + '&offset=' + formattedOffset;

  console.log(urlWeatherRequest);
  console.log(urlSunriseRequest);
  console.log(urlMoonRequest);

  var testWeatherResponse = '{"type":"Feature","geometry":{"type":"Point","coordinates":[5.7,43.1,0]},"properties":{"meta":{"updated_at":"2024-09-25T19:15:14Z","units":{"air_pressure_at_sea_level":"hPa","air_temperature":"celsius","air_temperature_max":"celsius","air_temperature_min":"celsius","cloud_area_fraction":"%","cloud_area_fraction_high":"%","cloud_area_fraction_low":"%","cloud_area_fraction_medium":"%","dew_point_temperature":"celsius","fog_area_fraction":"%","precipitation_amount":"mm","relative_humidity":"%","ultraviolet_index_clear_sky":"1","wind_from_direction":"degrees","wind_speed":"m/s"}},"timeseries":[{"time":"2024-09-25T20:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.5,"air_temperature":21.2,"cloud_area_fraction":94.5,"cloud_area_fraction_high":88.3,"cloud_area_fraction_low":50.8,"cloud_area_fraction_medium":1.6,"dew_point_temperature":18.8,"fog_area_fraction":0.0,"relative_humidity":86.5,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":121.9,"wind_speed":7.5}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"lightrain"},"details":{"precipitation_amount":0.1}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":21.6,"air_temperature_min":21.4,"precipitation_amount":0.3}}}},{"time":"2024-09-25T21:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.2,"air_temperature":21.4,"cloud_area_fraction":53.1,"cloud_area_fraction_high":44.5,"cloud_area_fraction_low":16.4,"cloud_area_fraction_medium":0.8,"dew_point_temperature":19.1,"fog_area_fraction":0.0,"relative_humidity":86.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":127.1,"wind_speed":8.3}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":21.6,"air_temperature_min":21.3,"precipitation_amount":0.2}}}},{"time":"2024-09-25T22:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.3,"air_temperature":21.5,"cloud_area_fraction":32.8,"cloud_area_fraction_high":19.5,"cloud_area_fraction_low":12.5,"cloud_area_fraction_medium":4.7,"dew_point_temperature":19.3,"fog_area_fraction":0.0,"relative_humidity":87.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":131.5,"wind_speed":7.8}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"lightrainshowers_night"},"details":{"precipitation_amount":0.1}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":21.6,"air_temperature_min":21.2,"precipitation_amount":0.1}}}},{"time":"2024-09-25T23:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1011.8,"air_temperature":21.6,"cloud_area_fraction":11.7,"cloud_area_fraction_high":5.5,"cloud_area_fraction_low":6.2,"cloud_area_fraction_medium":0.0,"dew_point_temperature":19.5,"fog_area_fraction":0.0,"relative_humidity":87.6,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":139.7,"wind_speed":7.1}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":21.5,"air_temperature_min":21.2,"precipitation_amount":0.0}}}},{"time":"2024-09-26T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1011.3,"air_temperature":21.5,"cloud_area_fraction":28.9,"cloud_area_fraction_high":24.2,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":4.7,"dew_point_temperature":19.5,"fog_area_fraction":0.0,"relative_humidity":87.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":138.7,"wind_speed":6.6}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":21.5,"air_temperature_min":21.2,"precipitation_amount":0.0}}}},{"time":"2024-09-26T01:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.8,"air_temperature":21.5,"cloud_area_fraction":54.7,"cloud_area_fraction_high":37.5,"cloud_area_fraction_low":2.3,"cloud_area_fraction_medium":26.6,"dew_point_temperature":19.4,"fog_area_fraction":0.0,"relative_humidity":87.8,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":136.1,"wind_speed":6.9}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":21.8,"air_temperature_min":21.2,"precipitation_amount":0.0}}}},{"time":"2024-09-26T02:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.1,"air_temperature":21.4,"cloud_area_fraction":67.2,"cloud_area_fraction_high":32.8,"cloud_area_fraction_low":7.0,"cloud_area_fraction_medium":50.8,"dew_point_temperature":19.5,"fog_area_fraction":0.0,"relative_humidity":88.4,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":129.0,"wind_speed":6.8}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.4,"air_temperature_min":21.2,"precipitation_amount":0.0}}}},{"time":"2024-09-26T03:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.6,"air_temperature":21.3,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":10.2,"cloud_area_fraction_medium":23.4,"dew_point_temperature":19.8,"fog_area_fraction":0.0,"relative_humidity":90.5,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":111.5,"wind_speed":6.4}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":23.1,"air_temperature_min":21.2,"precipitation_amount":0.0}}}},{"time":"2024-09-26T04:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.0,"air_temperature":21.2,"cloud_area_fraction":77.3,"cloud_area_fraction_high":74.2,"cloud_area_fraction_low":10.2,"cloud_area_fraction_medium":13.3,"dew_point_temperature":19.9,"fog_area_fraction":0.0,"relative_humidity":91.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":101.5,"wind_speed":7.3}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":23.8,"air_temperature_min":21.3,"precipitation_amount":0.0}}}},{"time":"2024-09-26T05:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.8,"air_temperature":21.3,"cloud_area_fraction":14.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":8.6,"cloud_area_fraction_medium":13.3,"dew_point_temperature":19.8,"fog_area_fraction":0.0,"relative_humidity":90.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":95.2,"wind_speed":7.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.2,"air_temperature_min":21.3,"precipitation_amount":0.0}}}},{"time":"2024-09-26T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.8,"air_temperature":21.3,"cloud_area_fraction":18.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":14.8,"cloud_area_fraction_medium":14.8,"dew_point_temperature":19.9,"fog_area_fraction":0.0,"relative_humidity":90.7,"ultraviolet_index_clear_sky":0.1,"wind_from_direction":95.8,"wind_speed":8.4}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.4,"air_temperature_min":21.8,"precipitation_amount":0.0}}}},{"time":"2024-09-26T07:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.5,"air_temperature":21.8,"cloud_area_fraction":13.3,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":12.5,"cloud_area_fraction_medium":5.5,"dew_point_temperature":19.3,"fog_area_fraction":0.0,"relative_humidity":85.4,"ultraviolet_index_clear_sky":0.6,"wind_from_direction":114.0,"wind_speed":8.6}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.4,"air_temperature_min":22.4,"precipitation_amount":0.0}}}},{"time":"2024-09-26T08:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.6,"air_temperature":22.4,"cloud_area_fraction":10.9,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":10.9,"cloud_area_fraction_medium":0.8,"dew_point_temperature":19.5,"fog_area_fraction":0.0,"relative_humidity":84.2,"ultraviolet_index_clear_sky":1.6,"wind_from_direction":139.0,"wind_speed":8.8}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.4,"air_temperature_min":23.1,"precipitation_amount":0.0}}}},{"time":"2024-09-26T09:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.6,"air_temperature":23.1,"cloud_area_fraction":10.9,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":10.9,"cloud_area_fraction_medium":3.9,"dew_point_temperature":19.7,"fog_area_fraction":0.0,"relative_humidity":84.6,"ultraviolet_index_clear_sky":3.0,"wind_from_direction":155.2,"wind_speed":9.6}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.4,"air_temperature_min":23.4,"precipitation_amount":0.0}}}},{"time":"2024-09-26T10:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.6,"air_temperature":23.8,"cloud_area_fraction":7.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":6.2,"cloud_area_fraction_medium":0.0,"dew_point_temperature":19.8,"fog_area_fraction":0.0,"relative_humidity":84.1,"ultraviolet_index_clear_sky":4.3,"wind_from_direction":155.2,"wind_speed":8.5}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.4,"air_temperature_min":22.9,"precipitation_amount":0.0}}}},{"time":"2024-09-26T11:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.3,"air_temperature":24.2,"cloud_area_fraction":1.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":1.6,"cloud_area_fraction_medium":0.0,"dew_point_temperature":19.8,"fog_area_fraction":0.0,"relative_humidity":84.5,"ultraviolet_index_clear_sky":5.1,"wind_from_direction":150.0,"wind_speed":7.7}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.4,"air_temperature_min":22.3,"precipitation_amount":0.0}}}},{"time":"2024-09-26T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.8,"air_temperature":24.4,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":19.9,"fog_area_fraction":0.0,"relative_humidity":85.7,"ultraviolet_index_clear_sky":4.9,"wind_from_direction":146.4,"wind_speed":7.4}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.2,"air_temperature_min":22.1,"precipitation_amount":0.0}}}},{"time":"2024-09-26T13:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.2,"air_temperature":24.2,"cloud_area_fraction":8.6,"cloud_area_fraction_high":8.6,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":20.0,"fog_area_fraction":0.0,"relative_humidity":85.6,"ultraviolet_index_clear_sky":4.0,"wind_from_direction":145.6,"wind_speed":7.5}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":23.9,"air_temperature_min":22.1,"precipitation_amount":0.0}}}},{"time":"2024-09-26T14:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.8,"air_temperature":23.9,"cloud_area_fraction":8.6,"cloud_area_fraction_high":6.2,"cloud_area_fraction_low":3.1,"cloud_area_fraction_medium":0.0,"dew_point_temperature":20.0,"fog_area_fraction":0.0,"relative_humidity":85.3,"ultraviolet_index_clear_sky":2.6,"wind_from_direction":150.0,"wind_speed":6.9}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":23.4,"air_temperature_min":22.0,"precipitation_amount":0.0}}}},{"time":"2024-09-26T15:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.4,"air_temperature":23.4,"cloud_area_fraction":7.8,"cloud_area_fraction_high":1.6,"cloud_area_fraction_low":7.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":19.9,"fog_area_fraction":0.0,"relative_humidity":85.2,"ultraviolet_index_clear_sky":1.3,"wind_from_direction":145.3,"wind_speed":6.1}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":22.9,"air_temperature_min":21.8,"precipitation_amount":0.0}}}},{"time":"2024-09-26T16:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.0,"air_temperature":22.9,"cloud_area_fraction":6.2,"cloud_area_fraction_high":1.6,"cloud_area_fraction_low":4.7,"cloud_area_fraction_medium":0.0,"dew_point_temperature":19.9,"fog_area_fraction":0.0,"relative_humidity":85.4,"ultraviolet_index_clear_sky":0.4,"wind_from_direction":130.8,"wind_speed":4.8}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.3,"air_temperature_min":21.8,"precipitation_amount":0.0}}}},{"time":"2024-09-26T17:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.4,"air_temperature":22.3,"cloud_area_fraction":7.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":3.9,"cloud_area_fraction_medium":3.9,"dew_point_temperature":20.0,"fog_area_fraction":0.0,"relative_humidity":86.3,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":122.2,"wind_speed":6.8}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.1,"air_temperature_min":21.8,"precipitation_amount":0.0}}}},{"time":"2024-09-26T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.5,"air_temperature":22.1,"cloud_area_fraction":22.7,"cloud_area_fraction_high":2.3,"cloud_area_fraction_low":10.2,"cloud_area_fraction_medium":16.4,"dew_point_temperature":20.1,"fog_area_fraction":0.0,"relative_humidity":87.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":135.2,"wind_speed":8.6}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.1,"air_temperature_min":21.8,"precipitation_amount":0.0}}}},{"time":"2024-09-26T19:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.5,"air_temperature":22.1,"cloud_area_fraction":35.9,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":31.2,"cloud_area_fraction_medium":6.2,"dew_point_temperature":20.2,"fog_area_fraction":0.0,"relative_humidity":88.4,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":238.5,"wind_speed":6.9}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.0,"air_temperature_min":21.7,"precipitation_amount":0.0}}}},{"time":"2024-09-26T20:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.4,"air_temperature":22.0,"cloud_area_fraction":47.7,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":9.4,"cloud_area_fraction_medium":42.2,"dew_point_temperature":19.7,"fog_area_fraction":0.0,"relative_humidity":86.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":280.7,"wind_speed":5.1}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.0,"air_temperature_min":21.5,"precipitation_amount":0.0}}}},{"time":"2024-09-26T21:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1006.9,"air_temperature":21.8,"cloud_area_fraction":96.1,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":96.1,"dew_point_temperature":19.8,"fog_area_fraction":0.0,"relative_humidity":88.0,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":350.9,"wind_speed":4.1}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.0,"air_temperature_min":21.0,"precipitation_amount":0.0}}}},{"time":"2024-09-26T22:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.8,"air_temperature":21.8,"cloud_area_fraction":96.1,"cloud_area_fraction_high":4.7,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":96.1,"dew_point_temperature":20.1,"fog_area_fraction":0.0,"relative_humidity":89.2,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":292.8,"wind_speed":7.2}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.0,"air_temperature_min":20.5,"precipitation_amount":0.0}}}},{"time":"2024-09-26T23:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.9,"air_temperature":22.0,"cloud_area_fraction":93.0,"cloud_area_fraction_high":0.8,"cloud_area_fraction_low":3.1,"cloud_area_fraction_medium":93.0,"dew_point_temperature":20.2,"fog_area_fraction":0.0,"relative_humidity":88.7,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":294.1,"wind_speed":8.6}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"cloudy"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":21.9,"air_temperature_min":20.2,"precipitation_amount":0.0}}}},{"time":"2024-09-27T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.0,"air_temperature":21.9,"cloud_area_fraction":10.2,"cloud_area_fraction_high":5.5,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":4.7,"dew_point_temperature":19.2,"fog_area_fraction":0.0,"relative_humidity":84.5,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":298.1,"wind_speed":8.2}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":21.7,"air_temperature_min":20.1,"precipitation_amount":0.0}}}},{"time":"2024-09-27T01:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.9,"air_temperature":21.7,"cloud_area_fraction":14.1,"cloud_area_fraction_high":10.2,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":3.9,"dew_point_temperature":17.7,"fog_area_fraction":0.0,"relative_humidity":77.7,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":308.1,"wind_speed":7.7}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":21.5,"air_temperature_min":20.1,"precipitation_amount":0.0}}}},{"time":"2024-09-27T02:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.6,"air_temperature":21.5,"cloud_area_fraction":25.0,"cloud_area_fraction_high":20.3,"cloud_area_fraction_low":2.3,"cloud_area_fraction_medium":6.2,"dew_point_temperature":16.0,"fog_area_fraction":0.0,"relative_humidity":70.8,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":309.8,"wind_speed":6.7}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":21.8,"air_temperature_min":20.1,"precipitation_amount":0.0}}}},{"time":"2024-09-27T03:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.5,"air_temperature":21.0,"cloud_area_fraction":76.6,"cloud_area_fraction_high":76.6,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":16.1,"fog_area_fraction":0.0,"relative_humidity":74.0,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":300.5,"wind_speed":7.0}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":23.4,"air_temperature_min":20.1,"precipitation_amount":0.0}}}},{"time":"2024-09-27T04:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1007.7,"air_temperature":20.5,"cloud_area_fraction":13.3,"cloud_area_fraction_high":12.5,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":16.1,"fog_area_fraction":0.0,"relative_humidity":76.3,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":298.9,"wind_speed":7.1}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":24.5,"air_temperature_min":20.1,"precipitation_amount":0.0}}}},{"time":"2024-09-27T05:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.1,"air_temperature":20.2,"cloud_area_fraction":10.2,"cloud_area_fraction_high":9.4,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":1.6,"dew_point_temperature":16.0,"fog_area_fraction":0.0,"relative_humidity":76.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":305.0,"wind_speed":6.9}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":24.7,"air_temperature_min":20.1,"precipitation_amount":0.0}}}},{"time":"2024-09-27T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1008.4,"air_temperature":20.1,"cloud_area_fraction":32.8,"cloud_area_fraction_high":28.9,"cloud_area_fraction_low":3.1,"cloud_area_fraction_medium":5.5,"dew_point_temperature":15.9,"fog_area_fraction":0.0,"relative_humidity":77.4,"ultraviolet_index_clear_sky":0.1,"wind_from_direction":306.1,"wind_speed":6.4}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":24.8,"air_temperature_min":20.3,"precipitation_amount":0.0}}}},{"time":"2024-09-27T07:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.1,"air_temperature":20.3,"cloud_area_fraction":46.9,"cloud_area_fraction_high":43.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":7.0,"dew_point_temperature":15.6,"fog_area_fraction":0.0,"relative_humidity":74.5,"ultraviolet_index_clear_sky":0.6,"wind_from_direction":301.1,"wind_speed":6.5}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.8,"air_temperature_min":21.8,"precipitation_amount":0.0}}}},{"time":"2024-09-27T08:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.5,"air_temperature":21.8,"cloud_area_fraction":32.0,"cloud_area_fraction_high":25.8,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":8.6,"dew_point_temperature":15.3,"fog_area_fraction":0.0,"relative_humidity":70.9,"ultraviolet_index_clear_sky":1.6,"wind_from_direction":300.9,"wind_speed":6.5}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.8,"air_temperature_min":23.4,"precipitation_amount":0.0}}}},{"time":"2024-09-27T09:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.9,"air_temperature":23.4,"cloud_area_fraction":20.3,"cloud_area_fraction_high":10.9,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":10.2,"dew_point_temperature":15.1,"fog_area_fraction":0.0,"relative_humidity":67.2,"ultraviolet_index_clear_sky":2.9,"wind_from_direction":294.5,"wind_speed":6.1}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.8,"air_temperature_min":23.3,"precipitation_amount":0.0}}}},{"time":"2024-09-27T10:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.0,"air_temperature":24.5,"cloud_area_fraction":18.7,"cloud_area_fraction_high":12.5,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":7.0,"dew_point_temperature":15.3,"fog_area_fraction":0.0,"relative_humidity":66.0,"ultraviolet_index_clear_sky":4.2,"wind_from_direction":284.7,"wind_speed":6.4}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":24.8,"air_temperature_min":22.6,"precipitation_amount":0.0}}}},{"time":"2024-09-27T11:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.1,"air_temperature":24.7,"cloud_area_fraction":3.9,"cloud_area_fraction_high":2.3,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.8,"dew_point_temperature":15.1,"fog_area_fraction":0.0,"relative_humidity":64.2,"ultraviolet_index_clear_sky":4.8,"wind_from_direction":283.7,"wind_speed":7.1}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":24.8,"air_temperature_min":22.1,"precipitation_amount":0.0}}}},{"time":"2024-09-27T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.8,"air_temperature":24.8,"cloud_area_fraction":1.6,"cloud_area_fraction_high":0.8,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.8,"dew_point_temperature":14.9,"fog_area_fraction":0.0,"relative_humidity":62.0,"ultraviolet_index_clear_sky":4.7,"wind_from_direction":286.7,"wind_speed":7.8}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":24.5,"air_temperature_min":21.8,"precipitation_amount":0.0}}}},{"time":"2024-09-27T13:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.6,"air_temperature":24.5,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":14.3,"fog_area_fraction":0.0,"relative_humidity":58.4,"ultraviolet_index_clear_sky":3.8,"wind_from_direction":292.4,"wind_speed":8.6}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":24.0,"air_temperature_min":20.8,"precipitation_amount":0.0}}}},{"time":"2024-09-27T14:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.6,"air_temperature":24.0,"cloud_area_fraction":4.7,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":4.7,"dew_point_temperature":14.0,"fog_area_fraction":0.0,"relative_humidity":57.7,"ultraviolet_index_clear_sky":2.5,"wind_from_direction":292.2,"wind_speed":9.3}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"air_temperature_max":23.3,"air_temperature_min":19.9,"precipitation_amount":0.0}}}},{"time":"2024-09-27T15:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.6,"air_temperature":23.3,"cloud_area_fraction":8.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":7.8,"dew_point_temperature":14.4,"fog_area_fraction":0.0,"relative_humidity":60.6,"ultraviolet_index_clear_sky":1.2,"wind_from_direction":287.4,"wind_speed":9.8}},"next_12_hours":{"summary":{"symbol_code":"fair_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.6,"air_temperature_min":19.4,"precipitation_amount":0.0}}}},{"time":"2024-09-27T16:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1009.8,"air_temperature":22.6,"cloud_area_fraction":29.7,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":20.3,"cloud_area_fraction_medium":17.2,"dew_point_temperature":13.3,"fog_area_fraction":0.0,"relative_humidity":55.6,"ultraviolet_index_clear_sky":0.4,"wind_from_direction":296.2,"wind_speed":9.8}},"next_12_hours":{"summary":{"symbol_code":"fair_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":22.1,"air_temperature_min":19.1,"precipitation_amount":0.0}}}},{"time":"2024-09-27T17:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1010.6,"air_temperature":22.1,"cloud_area_fraction":76.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":76.6,"dew_point_temperature":10.4,"fog_area_fraction":0.0,"relative_humidity":47.1,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":318.9,"wind_speed":9.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":21.8,"air_temperature_min":18.7,"precipitation_amount":0.0}}}},{"time":"2024-09-27T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1011.5,"air_temperature":21.8,"cloud_area_fraction":51.6,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":51.6,"dew_point_temperature":10.0,"fog_area_fraction":0.0,"relative_humidity":46.5,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":306.2,"wind_speed":11.4}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":20.8,"air_temperature_min":18.2,"precipitation_amount":0.0}}}},{"time":"2024-09-27T19:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1012.5,"air_temperature":20.8,"cloud_area_fraction":35.9,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":35.9,"dew_point_temperature":11.2,"fog_area_fraction":0.0,"relative_humidity":54.5,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":298.5,"wind_speed":12.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":19.9,"air_temperature_min":17.9,"precipitation_amount":0.0}}}},{"time":"2024-09-27T20:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1013.2,"air_temperature":19.9,"cloud_area_fraction":32.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":32.0,"dew_point_temperature":11.4,"fog_area_fraction":0.0,"relative_humidity":58.6,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":297.6,"wind_speed":12.3}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":19.4,"air_temperature_min":17.5,"precipitation_amount":0.0}}}},{"time":"2024-09-27T21:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1013.7,"air_temperature":19.4,"cloud_area_fraction":25.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":25.8,"dew_point_temperature":11.5,"fog_area_fraction":0.0,"relative_humidity":60.6,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":298.6,"wind_speed":12.0}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"fair_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":19.1,"air_temperature_min":17.2,"precipitation_amount":0.0}}}},{"time":"2024-09-27T22:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.1,"air_temperature":19.1,"cloud_area_fraction":7.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":7.0,"dew_point_temperature":11.8,"fog_area_fraction":0.0,"relative_humidity":63.3,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":299.2,"wind_speed":12.8}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":18.7,"air_temperature_min":17.1,"precipitation_amount":0.0}}}},{"time":"2024-09-27T23:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.4,"air_temperature":18.7,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.7,"fog_area_fraction":0.0,"relative_humidity":63.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":306.1,"wind_speed":12.9}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":18.2,"air_temperature_min":16.9,"precipitation_amount":0.0}}}},{"time":"2024-09-28T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.6,"air_temperature":18.2,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.3,"fog_area_fraction":0.0,"relative_humidity":63.8,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":311.7,"wind_speed":12.6}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":17.9,"air_temperature_min":16.7,"precipitation_amount":0.0}}}},{"time":"2024-09-28T01:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.9,"air_temperature":17.9,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.4,"fog_area_fraction":0.0,"relative_humidity":65.6,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":309.9,"wind_speed":13.4}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":17.5,"air_temperature_min":16.7,"precipitation_amount":0.0}}}},{"time":"2024-09-28T02:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.7,"air_temperature":17.5,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.6,"fog_area_fraction":0.0,"relative_humidity":68.0,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":307.3,"wind_speed":13.5}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":17.2,"air_temperature_min":16.7,"precipitation_amount":0.0}}}},{"time":"2024-09-28T03:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.6,"air_temperature":17.2,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.6,"fog_area_fraction":0.0,"relative_humidity":69.8,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":306.5,"wind_speed":13.4}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":18.1,"air_temperature_min":16.7,"precipitation_amount":0.0}}}},{"time":"2024-09-28T04:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.7,"air_temperature":17.1,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.5,"fog_area_fraction":0.0,"relative_humidity":69.6,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":307.5,"wind_speed":13.9}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":19.3,"air_temperature_min":16.7,"precipitation_amount":0.0}}}},{"time":"2024-09-28T05:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1015.0,"air_temperature":16.9,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.8,"fog_area_fraction":0.0,"relative_humidity":71.9,"ultraviolet_index_clear_sky":0.0,"wind_from_direction":305.8,"wind_speed":14.0}},"next_1_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":20.3,"air_temperature_min":16.7,"precipitation_amount":0.0}}}},{"time":"2024-09-28T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1015.5,"air_temperature":16.7,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":12.1,"fog_area_fraction":0.0,"relative_humidity":74.0,"ultraviolet_index_clear_sky":0.1,"wind_from_direction":305.9,"wind_speed":14.1}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":20.7,"air_temperature_min":16.9,"precipitation_amount":0.0}}}},{"time":"2024-09-28T07:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.2,"air_temperature":16.9,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.8,"fog_area_fraction":0.0,"relative_humidity":71.7,"ultraviolet_index_clear_sky":0.5,"wind_from_direction":305.2,"wind_speed":14.4}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-09-28T08:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.6,"air_temperature":17.2,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.4,"fog_area_fraction":0.0,"relative_humidity":68.6,"ultraviolet_index_clear_sky":1.4,"wind_from_direction":304.5,"wind_speed":14.4}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-09-28T09:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.9,"air_temperature":18.1,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.2,"fog_area_fraction":0.0,"relative_humidity":64.8,"ultraviolet_index_clear_sky":2.5,"wind_from_direction":301.4,"wind_speed":14.1}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-09-28T10:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1017.0,"air_temperature":19.3,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.0,"fog_area_fraction":0.0,"relative_humidity":61.2,"ultraviolet_index_clear_sky":3.6,"wind_from_direction":300.1,"wind_speed":13.9}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-09-28T11:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1017.0,"air_temperature":20.3,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.6,"fog_area_fraction":0.0,"relative_humidity":56.8,"ultraviolet_index_clear_sky":4.2,"wind_from_direction":300.1,"wind_speed":14.1}},"next_1_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"precipitation_amount":0.0}}}},{"time":"2024-09-28T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1017.1,"air_temperature":20.7,"cloud_area_fraction":3.1,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":3.1,"dew_point_temperature":10.6,"fog_area_fraction":0.0,"relative_humidity":56.4,"ultraviolet_index_clear_sky":4.0,"wind_from_direction":298.4,"wind_speed":14.3}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":20.3,"air_temperature_min":17.9,"precipitation_amount":0.0}}}},{"time":"2024-09-28T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1019.0,"air_temperature":17.9,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.8,"relative_humidity":58.4,"wind_from_direction":310.8,"wind_speed":12.6}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":17.9,"air_temperature_min":15.2,"precipitation_amount":0.0}}}},{"time":"2024-09-29T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1020.7,"air_temperature":15.2,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.1,"relative_humidity":71.4,"wind_from_direction":318.6,"wind_speed":9.7}},"next_12_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":15.2,"air_temperature_min":14.7,"precipitation_amount":0.0}}}},{"time":"2024-09-29T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1021.7,"air_temperature":14.8,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.0,"relative_humidity":72.9,"wind_from_direction":327.4,"wind_speed":5.6}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":21.2,"air_temperature_min":14.8,"precipitation_amount":0.0}}}},{"time":"2024-09-29T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1024.1,"air_temperature":21.2,"cloud_area_fraction":35.2,"cloud_area_fraction_high":35.2,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":9.4,"relative_humidity":56.0,"wind_from_direction":186.9,"wind_speed":1.5}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":21.2,"air_temperature_min":18.1,"precipitation_amount":0.0}}}},{"time":"2024-09-29T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1024.1,"air_temperature":18.6,"cloud_area_fraction":98.4,"cloud_area_fraction_high":98.4,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":10.7,"relative_humidity":59.9,"wind_from_direction":106.4,"wind_speed":2.0}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"cloudy"},"details":{"air_temperature_max":18.7,"air_temperature_min":18.2,"precipitation_amount":0.0}}}},{"time":"2024-09-30T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1025.3,"air_temperature":18.3,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":12.3,"relative_humidity":68.4,"wind_from_direction":95.3,"wind_speed":3.5}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":18.3,"air_temperature_min":17.8,"precipitation_amount":0.0}}}},{"time":"2024-09-30T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1024.8,"air_temperature":18.0,"cloud_area_fraction":44.5,"cloud_area_fraction_high":36.7,"cloud_area_fraction_low":13.3,"cloud_area_fraction_medium":0.0,"dew_point_temperature":13.6,"relative_humidity":75.1,"wind_from_direction":91.3,"wind_speed":5.2}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"air_temperature_max":22.5,"air_temperature_min":17.9,"precipitation_amount":0.0}}}},{"time":"2024-09-30T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1024.7,"air_temperature":22.5,"cloud_area_fraction":2.3,"cloud_area_fraction_high":0.8,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":13.7,"relative_humidity":65.7,"wind_from_direction":118.3,"wind_speed":8.4}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":22.5,"air_temperature_min":19.8,"precipitation_amount":0.0}}}},{"time":"2024-09-30T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1022.2,"air_temperature":19.9,"cloud_area_fraction":35.2,"cloud_area_fraction_high":3.1,"cloud_area_fraction_low":33.6,"cloud_area_fraction_medium":0.0,"dew_point_temperature":14.5,"relative_humidity":71.2,"wind_from_direction":111.5,"wind_speed":6.0}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":19.9,"air_temperature_min":18.5,"precipitation_amount":0.0}}}},{"time":"2024-10-01T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1020.9,"air_temperature":18.5,"cloud_area_fraction":65.6,"cloud_area_fraction_high":23.4,"cloud_area_fraction_low":53.9,"cloud_area_fraction_medium":0.0,"dew_point_temperature":14.6,"relative_humidity":77.9,"wind_from_direction":101.3,"wind_speed":4.3}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":18.5,"air_temperature_min":17.8,"precipitation_amount":0.0}}}},{"time":"2024-10-01T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1018.8,"air_temperature":18.0,"cloud_area_fraction":23.4,"cloud_area_fraction_high":3.9,"cloud_area_fraction_low":20.3,"cloud_area_fraction_medium":0.0,"dew_point_temperature":15.1,"relative_humidity":82.4,"wind_from_direction":75.2,"wind_speed":5.0}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_day"},"details":{"air_temperature_max":21.4,"air_temperature_min":18.0,"precipitation_amount":0.0}}}},{"time":"2024-10-01T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1018.3,"air_temperature":21.4,"cloud_area_fraction":43.7,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":43.7,"cloud_area_fraction_medium":0.8,"dew_point_temperature":14.5,"relative_humidity":71.0,"wind_from_direction":144.0,"wind_speed":4.2}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"air_temperature_max":21.4,"air_temperature_min":19.6,"precipitation_amount":0.0}}}},{"time":"2024-10-01T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.0,"air_temperature":19.7,"cloud_area_fraction":0.8,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":0.0,"dew_point_temperature":15.5,"relative_humidity":76.9,"wind_from_direction":117.7,"wind_speed":4.2}},"next_12_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":19.7,"air_temperature_min":18.8,"precipitation_amount":0.0}}}},{"time":"2024-10-02T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.3,"air_temperature":18.8,"cloud_area_fraction":17.2,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":17.2,"cloud_area_fraction_medium":0.0,"dew_point_temperature":16.2,"relative_humidity":85.1,"wind_from_direction":78.5,"wind_speed":5.3}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"fair_night"},"details":{"air_temperature_max":18.9,"air_temperature_min":18.4,"precipitation_amount":0.0}}}},{"time":"2024-10-02T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.0,"air_temperature":18.4,"cloud_area_fraction":10.9,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":10.9,"cloud_area_fraction_medium":0.0,"dew_point_temperature":15.2,"relative_humidity":81.0,"wind_from_direction":84.7,"wind_speed":5.6}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"clearsky_day"},"details":{"air_temperature_max":23.1,"air_temperature_min":18.3,"precipitation_amount":0.0}}}},{"time":"2024-10-02T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.9,"air_temperature":23.1,"cloud_area_fraction":59.4,"cloud_area_fraction_high":59.4,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":15.7,"relative_humidity":76.4,"wind_from_direction":118.0,"wind_speed":7.4}},"next_12_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"air_temperature_max":23.1,"air_temperature_min":19.9,"precipitation_amount":0.0}}}},{"time":"2024-10-02T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1015.9,"air_temperature":20.0,"cloud_area_fraction":48.4,"cloud_area_fraction_high":26.6,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":29.7,"dew_point_temperature":15.1,"relative_humidity":73.2,"wind_from_direction":97.8,"wind_speed":7.9}},"next_12_hours":{"summary":{"symbol_code":"rain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_night"},"details":{"air_temperature_max":20.1,"air_temperature_min":19.3,"precipitation_amount":0.1}}}},{"time":"2024-10-03T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1017.1,"air_temperature":19.4,"cloud_area_fraction":99.2,"cloud_area_fraction_high":97.7,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":55.5,"dew_point_temperature":15.4,"relative_humidity":77.7,"wind_from_direction":59.7,"wind_speed":6.4}},"next_12_hours":{"summary":{"symbol_code":"heavyrain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"heavyrain"},"details":{"air_temperature_max":19.7,"air_temperature_min":18.9,"precipitation_amount":7.0}}}},{"time":"2024-10-03T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1015.7,"air_temperature":19.1,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":0.8,"cloud_area_fraction_medium":67.2,"dew_point_temperature":15.7,"relative_humidity":80.6,"wind_from_direction":89.3,"wind_speed":9.8}},"next_12_hours":{"summary":{"symbol_code":"rain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"heavyrain"},"details":{"air_temperature_max":19.6,"air_temperature_min":18.9,"precipitation_amount":10.6}}}},{"time":"2024-10-03T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.2,"air_temperature":19.1,"cloud_area_fraction":100.0,"cloud_area_fraction_high":97.7,"cloud_area_fraction_low":23.4,"cloud_area_fraction_medium":93.7,"dew_point_temperature":14.8,"relative_humidity":75.8,"wind_from_direction":85.9,"wind_speed":11.0}},"next_12_hours":{"summary":{"symbol_code":"lightrain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"lightrain"},"details":{"air_temperature_max":19.2,"air_temperature_min":18.8,"precipitation_amount":0.5}}}},{"time":"2024-10-03T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1015.7,"air_temperature":18.9,"cloud_area_fraction":100.0,"cloud_area_fraction_high":100.0,"cloud_area_fraction_low":97.7,"cloud_area_fraction_medium":96.9,"dew_point_temperature":14.7,"relative_humidity":76.2,"wind_from_direction":84.5,"wind_speed":11.8}},"next_12_hours":{"summary":{"symbol_code":"rain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"rain"},"details":{"air_temperature_max":19.1,"air_temperature_min":18.5,"precipitation_amount":4.7}}}},{"time":"2024-10-04T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1015.2,"air_temperature":19.0,"cloud_area_fraction":100.0,"cloud_area_fraction_high":99.2,"cloud_area_fraction_low":97.7,"cloud_area_fraction_medium":42.2,"dew_point_temperature":16.6,"relative_humidity":86.2,"wind_from_direction":93.9,"wind_speed":11.1}},"next_12_hours":{"summary":{"symbol_code":"rain"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"rain"},"details":{"air_temperature_max":19.2,"air_temperature_min":19.0,"precipitation_amount":1.5}}}},{"time":"2024-10-04T06:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1014.8,"air_temperature":19.2,"cloud_area_fraction":100.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":100.0,"cloud_area_fraction_medium":9.4,"dew_point_temperature":17.0,"relative_humidity":87.8,"wind_from_direction":106.1,"wind_speed":7.3}},"next_12_hours":{"summary":{"symbol_code":"lightrainshowers_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"rain"},"details":{"air_temperature_max":21.3,"air_temperature_min":18.8,"precipitation_amount":2.3}}}},{"time":"2024-10-04T12:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.6,"air_temperature":21.3,"cloud_area_fraction":56.2,"cloud_area_fraction_high":55.5,"cloud_area_fraction_low":2.3,"cloud_area_fraction_medium":0.0,"dew_point_temperature":16.4,"relative_humidity":82.8,"wind_from_direction":281.9,"wind_speed":6.4}},"next_12_hours":{"summary":{"symbol_code":"fair_day"},"details":{}},"next_6_hours":{"summary":{"symbol_code":"partlycloudy_day"},"details":{"air_temperature_max":21.3,"air_temperature_min":18.9,"precipitation_amount":0.0}}}},{"time":"2024-10-04T18:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.5,"air_temperature":20.0,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":14.9,"relative_humidity":72.4,"wind_from_direction":296.2,"wind_speed":5.9}},"next_6_hours":{"summary":{"symbol_code":"clearsky_night"},"details":{"air_temperature_max":20.0,"air_temperature_min":17.3,"precipitation_amount":0.0}}}},{"time":"2024-10-05T00:00:00Z","data":{"instant":{"details":{"air_pressure_at_sea_level":1016.2,"air_temperature":17.3,"cloud_area_fraction":0.0,"cloud_area_fraction_high":0.0,"cloud_area_fraction_low":0.0,"cloud_area_fraction_medium":0.0,"dew_point_temperature":11.7,"relative_humidity":69.9,"wind_from_direction":312.7,"wind_speed":8.0}}}}]}}';
  var testSunriseResponse = '{"copyright":"MET Norway","licenseURL":"https://api.met.no/license_data.html","type":"Feature","geometry":{"type":"Point","coordinates":[5.7,43.1]},"when":{"interval":["2024-09-23T23:29:00Z","2024-09-24T23:37:00Z"]},"properties":{"body":"Sun","sunrise":{"time":"2024-09-24T06:27+01:00","azimuth":90.13},"sunset":{"time":"2024-09-24T18:30+01:00","azimuth":269.61},"solarnoon":{"time":"2024-09-24T12:29+01:00","disc_centre_elevation":46.14,"visible":true},"solarmidnight":{"time":"2024-09-24T00:29+01:00","disc_centre_elevation":-47.47,"visible":false}}}';
  var testMoonResponse = '{"copyright":"MET Norway","licenseURL":"https://api.met.no/license_data.html","type":"Feature","geometry":{"type":"Point","coordinates":[5.7,43.1]},"when":{"interval":["2024-09-23T23:37:00Z","2024-09-24T23:37:00Z"]},"properties":{"body":"Moon","moonrise":{"time":"2024-09-24T22:35+01:00","azimuth":49.07},"moonset":{"time":"2024-09-24T14:20+01:00","azimuth":310.96},"high_moon":{"time":"2024-09-24T05:58+01:00","disc_centre_elevation":75.15,"visible":true},"low_moon":{"time":"2024-09-24T18:27+01:00","disc_centre_elevation":-19.09,"visible":false},"moonphase":260.08}}';

  testWeatherResponse = testWeatherResponse.replace(/3h/g, "hh");
  testSunriseResponse = testSunriseResponse.replace(/3h/g, "hh");
  testMoonResponse = testMoonResponse.replace(/3h   /g, "hh");

  var jsonWeather = JSON.parse(testWeatherResponse);
  var jsonSunrise = JSON.parse(testSunriseResponse);
  var jsonMoon = JSON.parse(testMoonResponse);

  var varTest = jsonWeather.type;
  console.log(varTest);
  varTest = jsonSunrise.copyright;
  console.log(varTest);
  varTest = jsonMoon.licenseURL;
  console.log(varTest);

  var location = localStorage.getItem(154);
  var graph = localStorage.getItem(155);

  var units_t;
  if (units == 1) {
    units_t = "°F";
  }
  else {
    units_t = "°C";
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


  // Boucle pour accéder aux éléments du tableau

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
      if (units_t == 1) {
        // mph convertion
        windSpeed = convertMpsToMph(windSpeed);
      }
      hourlyWind['hour' + i] = windSpeed + "\n" + windBearing(jsonWeather.properties.timeseries[i].data.instant.details.wind_from_direction);

      // temperatures
      var temperature = Math.round(jsonWeather.properties.timeseries[i].data.instant.details.air_temperature);
      hourlyTemperatures['hour' + i] = temperature;

      // icons
      hourly_icons['hour' + i] = jsonWeather.properties.timeseries[i].data.next_1_hours.summary.symbol_code;
      
    }

    // 1 hour resolution

    // Hourly rain precipitation
    hourlyRain['hour' + i] = jsonWeather.properties.timeseries[i].data.next_1_hours.details.precipitation_amount;
    // mm to pixels to draw
    hourlyRain['hour' + i] = Math.round(hourlyRain['hour' + i] * 20);
  }



  // -------------------

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


  // force int

  var dictionary = {
    "KEY_TEMPERATURE": 0,
    "KEY_CONDITIONS": 0,
    "KEY_GRAPH": 0,
    "KEY_WIND_SPEED": 0,

    "KEY_SUNRISE": 0,
    "KEY_SUNSET": 0,
    "KEY_TMIN": 0,
    "KEY_TMAX": 0,
    "KEY_ICON": 0,
    "KEY_LOCATION": 0,

    "KEY_FORECAST_TEMP1": hourlyTemperatures['hour0'],
    "KEY_FORECAST_TEMP2": hourlyTemperatures['hour3'],
    "KEY_FORECAST_TEMP3": hourlyTemperatures['hour6'],
    "KEY_FORECAST_TEMP4": hourlyTemperatures['hour9'],
    "KEY_FORECAST_TEMP5": hourlyTemperatures['hour12'],
    "KEY_FORECAST_TEMP6": hourlyTemperatures['hour15'],
    "KEY_FORECAST_TEMP7": hourlyTemperatures['hour18'],
    "KEY_FORECAST_TEMP8": hourlyTemperatures['hour21'],
    "KEY_FORECAST_TEMP9": hourlyTemperatures['hour24'],
    "KEY_FORECAST_H0": hourly_time['hour0'],
    "KEY_FORECAST_H1": hourly_time['hour3'],
    "KEY_FORECAST_H2": hourly_time['hour6'],
    "KEY_FORECAST_H3": hourly_time['hour9'],
    "KEY_FORECAST_H4": hourly_time['hour12'],
    "KEY_FORECAST_H5": hourly_time['hour15'],
    "KEY_FORECAST_H6": hourly_time['hour18'],
    "KEY_FORECAST_H7": hourly_time['hour21'],
    "KEY_FORECAST_H8": hourly_time['hour24'],

    "KEY_FORECAST_RAIN1": hourlyRain['hour0'],
    "KEY_FORECAST_RAIN11": hourlyRain['hour1'],
    "KEY_FORECAST_RAIN12": hourlyRain['hour2'],

    "KEY_FORECAST_RAIN2": hourlyRain['hour3'],
    "KEY_FORECAST_RAIN21": hourlyRain['hour4'],
    "KEY_FORECAST_RAIN22": hourlyRain['hour5'],

    "KEY_FORECAST_RAIN3": hourlyRain['hour6'],
    "KEY_FORECAST_RAIN31": hourlyRain['hour7'],
    "KEY_FORECAST_RAIN32": hourlyRain['hour8'],

    "KEY_FORECAST_RAIN4": hourlyRain['hour9'],
    "KEY_FORECAST_RAIN41": hourlyRain['hour10'],
    "KEY_FORECAST_RAIN42": hourlyRain['hour11'],

    "KEY_FORECAST_RAIN5": hourlyRain['hour12'],
    "KEY_FORECAST_RAIN51": hourlyRain['hour13'],
    "KEY_FORECAST_RAIN52": hourlyRain['hour14'],

    "KEY_FORECAST_RAIN6": hourlyRain['hour15'],
    "KEY_FORECAST_RAIN61": hourlyRain['hour16'],
    "KEY_FORECAST_RAIN62": hourlyRain['hour17'],

    "KEY_FORECAST_RAIN7": hourlyRain['hour18'],
    "KEY_FORECAST_RAIN71": hourlyRain['hour19'],
    "KEY_FORECAST_RAIN72": hourlyRain['hour20'],

    "KEY_FORECAST_RAIN8": hourlyRain['hour21'],
    "KEY_FORECAST_RAIN81": hourlyRain['hour22'],
    "KEY_FORECAST_RAIN82": hourlyRain['hour23'],

    "KEY_FORECAST_ICON1": hourly_icons['hour3'],
    "KEY_FORECAST_ICON2": hourly_icons['hour6'],
    "KEY_FORECAST_ICON3": hourly_icons['hour9'],
    "KEY_FORECAST_ICON4": hourly_icons['hour12'],
    "KEY_FORECAST_ICON5": hourly_icons['hour15'],
    "KEY_FORECAST_ICON6": hourly_icons['hour18'],
    "KEY_FORECAST_ICON7": hourly_icons['hour24'],

    "KEY_FORECAST_WIND0": hourlyWind['hour0'],
    "KEY_FORECAST_WIND1": hourlyWind['hour3'],
    "KEY_FORECAST_WIND2": hourlyWind['hour6'],
    "KEY_FORECAST_WIND3": hourlyWind['hour9'],
    "KEY_FORECAST_WIND4": hourlyWind['hour12'],
    "KEY_FORECAST_WIND5": hourlyWind['hour15'],
    "KEY_FORECAST_WIND6": hourlyWind['hour18'],
    "KEY_FORECAST_WIND7": hourlyWind['hour21'],
    "KEY_FORECAST_WIND8": hourlyWind['hour24'],


    "KEY_DAY1": 0,
    "KEY_DAY2": 0,
    "KEY_DAY3": 0,
    "KEY_DAY4": 0,
    "KEY_DAY5": 0,
    "KEY_DAY6": 0,
    "KEY_DAY1_TEMP": 0,
    "KEY_DAY2_TEMP": 0,
    "KEY_DAY3_TEMP": 0,
    "KEY_DAY4_TEMP": 0,
    "KEY_DAY5_TEMP": 0,
    "KEY_DAY6_TEMP": 0,
    "KEY_DAY1_ICON": 0,
    "KEY_DAY2_ICON": 0,
    "KEY_DAY3_ICON": 0,
    "KEY_DAY4_ICON": 0,
    "KEY_DAY5_ICON": 0,
    "KEY_DAY6_ICON": 0,
    "KEY_MOONPHASE1": 0,
    "KEY_MOONPHASE2": 0,
    "KEY_MOONPHASE3": 0,
    "KEY_MOONPHASE4": 0,
    "KEY_MOONPHASE5": 0,
    "KEY_MOONPHASE6": 0,

    "KEY_DAY1R": 0,
    "KEY_DAY2R": 0,
    "KEY_DAY3R": 0,
    "KEY_DAY4R": 0,
    "KEY_DAY5R": 0,
    "KEY_DAY6R": 0,

    "KEY_DAY1P": 0,
    "KEY_DAY2P": 0,
    "KEY_DAY3P": 0,
    "KEY_DAY4P": 0,
    "KEY_DAY5P": 0,
    "KEY_DAY6P": 0,
    "KEY_HUMIDITY": 0
  };

  Pebble.sendAppMessage(dictionary, function () {
    console.log("sendAppMessage");
    console.log('Send successful: ' + JSON.stringify(dictionary));
  }, function () {
    console.log('Send failed!');
  }
  );


  /*
    xhrRequest(urlWeatherRequest, 'GET',
      function (responseWeather) {
        xhrRequest(urlSunriseRequest, 'GET',
          function (responseSunrise) {
            xhrRequest(urlMoonRequest, 'GET',
              function (responseMoon) {
                console.log(responseWeather);
                console.log(responseSunrise);
                console.log(responseMoon);
  
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
              }
            );
          }
        );
      }
    );
  */




}




function locationSuccess(pos) {

  console.log("locationSuccess");
  var lat = pos.coords.latitude;
  var lng = pos.coords.longitude;
  var coordinates = 'lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude

  // console.log('getWeatherCoord coordinates: ' + coordinates);
  localStorage.setItem(153, coordinates);
  localStorage.setItem(154, JSON.stringify(' '));

  var units = localStorage.getItem(152);

  var units_s;

  if (units == 1) {
    units_s = "imperial";
  }
  else {
    units_s = "metric";
  }
  //console.log('input_api : '+input_api);
  getForecast();
}

function locationError(err) {
  console.log("locationError");
  // console.log("Error requesting location!");
}

function getPosition() {


  if (testMode == 0) {
    SendStatus("Getting position ...");
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
  }

  locationSuccess(position);

}







// Listen for when the watchface is opened
Pebble.addEventListener('ready',
  function (e) {
    console.log("PebbleKit JS ready.");

    getPosition();


  }
);

// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage',
  function (e) {
    console.log("AppMessage received!");

    var requestPayloadAsJsonString = JSON.stringify(e.payload);
    // console.log ("    stringified: " + requestPayloadAsJsonString);
    //   KEY_LOCATION
    var json = JSON.parse(requestPayloadAsJsonString);
    var location = json.KEY_LOCATION;
    //  console.log ("json location: " + location);

    if (navigator.onLine) {
      getPosition();
    }
    else {
      SendStatus("No internet !");

    }
  }

);


Pebble.addEventListener('showConfiguration', function () {
  var url = 'http://sichroteph.github.io/Weather-Graph-ForecastIO/index.html';

  //   console.// ('Showing configuration page: ' + url);
  Pebble.openURL(url);
});


Pebble.addEventListener('webviewclosed', function (e) {
  var configData = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration page returned: ' + JSON.stringify(configData));

  var gps = configData.gps;
  var graph = configData.toggle_graph;
  //  console.log('javascript graph: ' + graph);

  var radio_units = configData.radio_units;
  var input_city = configData.input_city;
  var input_api = configData.input_api;

  console.log('input_api received : ' + input_api);


  localStorage.setItem(150, gps ? 1 : 0);
  localStorage.setItem(152, radio_units ? 1 : 0);
  localStorage.setItem(154, JSON.stringify(input_city));
  localStorage.setItem(155, graph ? 1 : 0);
  localStorage.setItem(156, input_api);

  getPosition();

});

