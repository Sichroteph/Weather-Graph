var myGoogleAPIKey = ' ';
var status = ' ' ;
var debugLog = 1;

function SendStatus(status){
  var dictionary = {
    "KEY_STATUS": status,
  };

function debugLog(message){
  if (debugLog == 1){
      console.log(message);
  }
}

  // Send to watchapp
  Pebble.sendAppMessage(dictionary, function() {
    console.log("sendAppMessage");
    console.log('Send successful: ' + JSON.stringify(dictionary));
  }, function() {
    console.log('Send failed!');
  } );

}

function windBearing(wind){
  if ((wind>=337)||(wind<22))
    return "N";
  if ((wind>=22)&&(wind<67))
    return "NE";
  if ((wind>=67)&&(wind<112))
    return "E";
  if ((wind>=112)&&(wind<157))
    return "SE";
  if ((wind>=157)&&(wind<202))
    return "S";
  if ((wind>=202)&&(wind<247))
    return "SW";
  if ((wind>=247)&&(wind<292))
    return "W";
  if ((wind>=292)&&(wind<337))
    return "NW";

  return"?";
}


var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

function getForecast() {
  console.log("getForecast");
  SendStatus("Getting forecast ...");
  var tmax;
  var tmin;
  var temp1;
  var temp2;
  var temp3;
  var temp4;
  var temp5;
  var temp6;
  var temp7;
  var temp8;
  var temp9;


  var h0;
  var h1;
  var h2;
  var h3;
  var h4;
  var h5;
  var h6;
  var h7;
  var h8;

  var hour0;
  var hour1;
  var hour2;
  var hour3;
  var hour4;
  var hour5;
  var hour6;
  var hour7;
  var hour8;

  var rain1=0;
  var rain2=0;
  var rain3=0;
  var rain4=0;
  var rain5=0;
  var rain6=0;
  var rain7=0;
  var rain8=0;


  var rain11=0;
  var rain12=0;
  var rain21=0;
  var rain22=0;
  var rain31=0;
  var rain32=0;
  var rain41=0;
  var rain42=0;
  var rain51=0;
  var rain52=0;
  var rain61=0;
  var rain62=0;
  var rain71=0;
  var rain72=0;
  var rain81=0;
  var rain82=0;



  var icon1;
  var icon2;
  var icon3;
  var icon4;
  var icon5;
  var icon6;
  var icon7;

  var wind0;
  var wind1;
  var wind2;
  var wind3;
  var wind4;
  var wind5;
  var wind6;
  var wind7;
  var wind8;


  var day1;
  var day2;
  var day3;
  var day4;
  var day5;
  var day6;

  var day1r;
  var day2r;
  var day3r;
  var day4r;
  var day5r;
  var day6r;

  var day1p;
  var day2p;
  var day3p;
  var day4p;
  var day5p;
  var day6p;

  var moonPhase1;
  var moonPhase2;
  var moonPhase3;
  var moonPhase4;
  var moonPhase5;
  var moonPhase6;

  var day1_temp;
  var day2_temp;
  var day3_temp;
  var day4_temp;
  var day5_temp;
  var day6_temp;

  var day1_icon;
  var day2_icon;
  var day3_icon;
  var day4_icon;
  var day5_icon;
  var day6_icon;


  var humidity;
  
  var coordinates = localStorage.getItem(153);
  var input_api =  localStorage.getItem(156);
  
  var units = localStorage.getItem(152);
  var units_s;
  if(units==1){
    units_s="imperial";
  }
  else{
    units_s="metric";
  }

  var url = 'http://api.openweathermap.org/data/2.5/onecall?'+coordinates+'&appid=' + input_api + '&units='+units_s;

  xhrRequest(url, 'GET',
             function(responseText) {
                           
            
               var units_t;
               
               var location = localStorage.getItem(154);
               var graph = localStorage.getItem(155);

              //console.log("getWeather coordinates "+coordinates);
               //  console.log("getWeather location "+location);
               //console.log("getWeather url "+url);
               
              var responseFixed = responseText.replace(/3h/g,"hh");
             // console.log(responseFixed);

                var json = JSON.parse(responseFixed);

                 var day_int = json.daily[0].dt;
                 var a = new Date(day_int*1000);
                 day1 = a.getDay();
                
                 day_int = json.daily[1].dt;
                 a = new Date(day_int*1000);
                 day2 = a.getDay();
                
                 day_int = json.daily[2].dt;
                 a = new Date(day_int*1000);
                 day3 = a.getDay();        
                
                 day_int = json.daily[3].dt;
                 a = new Date(day_int*1000);
                 day4 = a.getDay();     
                
                 day_int = json.daily[4].dt;
                 a = new Date(day_int*1000);
                 day5 = a.getDay();     
                
                 day_int = json.daily[5].dt;
                 a = new Date(day_int*1000);
                 day6 = a.getDay();

                 moonPhase1 = Math.round(json.daily[0].moon_phase*25);
                 moonPhase2 = Math.round(json.daily[1].moon_phase*25);
                 moonPhase3 = Math.round(json.daily[2].moon_phase*25);
                 moonPhase4 = Math.round(json.daily[3].moon_phase*25);
                 moonPhase5 = Math.round(json.daily[4].moon_phase*25);
                 moonPhase6 = Math.round(json.daily[5].moon_phase*25);


                 if (moonPhase1 < 0)
                   moonPhase1=0;
                 if (moonPhase1 > 25)
                   moonPhase1=25;

                 if (moonPhase2 < 0)
                   moonPhase2=0;
                 if (moonPhase2 > 25)
                   moonPhase2=25;

                 if (moonPhase3 < 0)
                   moonPhase3=0;
                 if (moonPhase3 > 25)
                   moonPhase3=25;

                 if (moonPhase4 < 0)
                   moonPhase4=0;
                 if (moonPhase4 > 25)
                   moonPhase4=25;

                 if (moonPhase5 < 0)
                   moonPhase5=0;
                 if (moonPhase5 > 25)
                   moonPhase5=25;

                 if (moonPhase6 < 0)
                   moonPhase6=0;
                 if (moonPhase6 > 25)
                   moonPhase6=25;

                 var t1=Math.round(json.daily[0].temp.max);
                 var t2=Math.round(json.daily[1].temp.max);
                 var t3=Math.round(json.daily[2].temp.max);
                 var t4=Math.round(json.daily[3].temp.max);
                 var t5=Math.round(json.daily[4].temp.max);
                 var t6=Math.round(json.daily[5].temp.max);

                 var t1_min=Math.round(json.daily[0].temp.min);
                 var t2_min=Math.round(json.daily[1].temp.min);
                 var t3_min=Math.round(json.daily[2].temp.min);
                 var t4_min=Math.round(json.daily[3].temp.min);
                 var t5_min=Math.round(json.daily[4].temp.min);
                 var t6_min=Math.round(json.daily[5].temp.min);


                 if(units==1){
                   units_t="°F";
                 }
                 else{
                   units_t="°C";
                 }
                 day1_temp=t1+units_t+"\n"+t1_min+units_t;
                 day2_temp=t2+units_t+"\n"+t2_min+units_t;
                 day3_temp=t3+units_t+"\n"+t3_min+units_t;
                 day4_temp=t4+units_t+"\n"+t4_min+units_t;
                 day5_temp=t5+units_t+"\n"+t5_min+units_t;
                 day6_temp=t6+units_t+"\n"+t6_min+units_t;
                 if(units==1){
                   units_s="in./hr. ";
                 }
                 else{
                   units_s="mm/hr ";
                 }

                 //23 pixels hight

                 if(units==1){
                   day1r=Math.round(json.daily[0].weather.rain*6*25.4);
                   day1p=Math.round(json.daily[0].wind_speed);
                   day2r=Math.round(json.daily[1].weather.rain*6*25.4);
                   day2p=Math.round(json.daily[1].wind_speed);                  
                   day3r=Math.round(json.daily[2].weather.rain*6*25.4);
                   day3p=Math.round(json.daily[2].wind_speed);                   
                   day4r=Math.round(json.daily[3].weather.rain*6*25.4);
                   day4p=Math.round(json.daily[3].wind_speed);
                   day5r=Math.round(json.daily[4].weather.rain*6*25.4);
                   day5p=Math.round(json.daily[4].wind_speed);                   
                   day6r=Math.round(json.daily[5].weather.rain*6*25.4);
                   day6p=Math.round(json.daily[5].wind_speed);                  
                 }
                 else{
                   day1r=Math.round(json.daily[0].weather.rain*6);
                   day1p=Math.round(json.daily[0].wind_speed);
                   day2r=Math.round(json.daily[1].weather.rain*6)
                   day2p=Math.round(json.daily[1].wind_speed);                  
                   day3r=Math.round(json.daily[2].weather.rain*6);
                   day3p=Math.round(json.daily[2].wind_speed);                  
                   day4r=Math.round(json.daily[3].weather.rain*6);
                  day4p=Math.round(json.daily[3].wind_speed);                   
                   day5r=Math.round(json.daily[4].weather.rain*6);
                   day5p=Math.round(json.daily[4].wind_speed);                  
                   day6r=Math.round(json.daily[5].weather.rain*6);
                  day6p=Math.round(json.daily[5].wind_speed); 
                 }
                  if (isNaN(day1r)) day1r = 0;
                  if (isNaN(day2r)) day2r = 0;
                  if (isNaN(day3r)) day3r = 0;
                  if (isNaN(day4r)) day4r = 0;
                  if (isNaN(day5r)) day5r = 0;
                  if (isNaN(day6r)) day6r = 0;    
           
                 if(day1r>23){
                   day1r=23;
                 }
                 if(day2r>23){
                   day2r=23;
                 }
                 if(day3r>23){
                   day3r=23;
                 }
                 if(day4r>23){
                   day4r=23;
                 }
                 if(day5r>23){
                   day5r=23;
                 }
                 if(day6r>23){
                   day6r=23;
                 }

              
              
                 day1_icon=json.daily[1].weather[0].icon;
                 day2_icon=json.daily[2].weather[0].icon;
                 day3_icon=json.daily[3].weather[0].icon;
                 day4_icon=json.daily[4].weather[0].icon;
                 day5_icon=json.daily[5].weather[0].icon;
                 day6_icon=json.daily[6].weather[0].icon;
               
                 // responseText contains a JSON object with weather info

                 tmax = Math.round(json.daily[0].temp.min)+units_t;
                 tmin = Math.round(json.daily[0].temp.max)+units_t;

                 temp1=Math.round(json.hourly[0].temp);
                 temp2=Math.round(json.hourly[3].temp);
                 temp3=Math.round(json.hourly[6].temp);
                 temp4=Math.round(json.hourly[9].temp);
                 temp5=Math.round(json.hourly[12].temp);
                 temp6=Math.round(json.hourly[15].temp);
                 temp7=Math.round(json.hourly[18].temp);
                 temp8=Math.round(json.hourly[21].temp);
                 temp9=Math.round(json.hourly[24].temp);

                h0=json.hourly[0].dt;
                h1=json.hourly[3].dt;
                h2=json.hourly[6].dt;
                h3=json.hourly[9].dt;
                h4=json.hourly[12].dt;
                h5=json.hourly[15].dt;
                h6=json.hourly[18].dt;
                h7=json.hourly[21].dt;
                h8=json.hourly[24].dt;

                 a = new Date((h0)*1000);
                 hour0 = a.getHours();

                 a = new Date((h1)*1000);
                 hour1 = a.getHours();

                 a = new Date((h2)*1000);
                 hour2 = a.getHours();

                 a = new Date((h3)*1000);
                 hour3 = a.getHours();

                 a = new Date((h4)*1000);
                 hour4 = a.getHours();

                 a = new Date((h5)*1000);
                 hour5 = a.getHours();

                 a = new Date((h6)*1000);
                 hour6 = a.getHours();

                 a = new Date((h7)*1000);
                 hour7 = a.getHours();

                 a = new Date((h8)*1000);
                 hour8 = a.getHours();


                 // console.log("hours "+hour1+" "+hour2+" "+hour3+" "+hour4+" "+hour5+" "+hour6+" "+hour7);
                 //nsole.log("getHours "+hour1+" "+hour2+" "+hour3+" "+hour4+" "+hour5+" "+hour6+" "+hour7);

                 wind0=Math.round(json.hourly[0].wind_speed)+
                   "\n"+windBearing(Math.round(json.hourly[0].wind_deg));
                 wind1=Math.round(json.hourly[3].wind_speed)+
                   "\n"+windBearing(Math.round(json.hourly[3].wind_deg));    
                 wind2=Math.round(json.hourly[6].wind_speed)+
                   "\n"+windBearing(Math.round(json.hourly[6].wind_deg));
                 wind3=Math.round(json.hourly[9].wind_speed)+
                   "\n"+windBearing(Math.round(json.hourly[9].wind_deg));
                 wind4=Math.round(json.hourly[12].wind_speed)+
                   "\n"+windBearing(Math.round(json.hourly[12].wind_deg));    
                 wind5=Math.round(json.hourly[15].wind_speed)+
                   "\n"+windBearing(Math.round(json.hourly[15].wind_deg));
                 wind6=Math.round(json.hourly[18].wind_speed)+
                   "\n"+windBearing(Math.round(json.hourly[18].wind_deg));
                   "\n"+windBearing(Math.round(json.hourly[18].wind_deg));
                 wind7=Math.round(json.hourly[21].wind_speed)+
                   "\n"+windBearing(Math.round(json.hourly[21].wind_deg));    
                 wind8=Math.round(json.hourly[24].wind_speed)+
                   "\n"+windBearing(Math.round(json.hourly[24].wind_deg));
    
                // console.log("json.hourly.data[9].windBearing "+wind8);


                 icon1 = json.hourly[3].weather[0].icon;
                 icon2 = json.hourly[6].weather[0].icon;
                 icon3 = json.hourly[9].weather[0].icon;
                 icon4 = json.hourly[12].weather[0].icon;
                 icon5 = json.hourly[15].weather[0].icon;
                 icon6 = json.hourly[18].weather[0].icon;
                 icon7 = json.hourly[21].weather[0].icon;
               
        
                 rain1=json.hourly[0].weather[0].rain*20;              
                 rain11=json.hourly[1].weather[0].rain*20;
                 rain12=json.hourly[2].weather[0].rain*20;
                 rain2=json.hourly[3].weather[0].rain*20;
                 rain21=json.hourly[4].weather[0].rain*20;
                 rain22=json.hourly[5].weather[0].rain*20;
                 rain3=json.hourly[6].weather[0].rain*20;
                 rain31=json.hourly[7].weather[0].rain*20;
                 rain32=json.hourly[8].weather[0].rain*20;
                 rain4=json.hourly[9].weather[0].rain*20;
                 rain41=json.hourly[10].weather[0].rain*20;
                 rain42=json.hourly[11].weather[0].rain*20;
                 rain5=json.hourly[12].weather[0].rain*20;
                 rain51=json.hourly[13].weather[0].rain*20;
                 rain52=json.hourly[14].weather[0].rain*20;
                 rain6=json.hourly[15].weather[0].rain*20;
                 rain61=json.hourly[16].weather[0].rain*20;
                 rain62=json.hourly[17].weather[0].rain*20;
                 rain7=json.hourly[18].weather[0].rain*20;
                 rain71=json.hourly[19].weather[0].rain*20;
                 rain72=json.hourly[20].weather[0].rain*20;
                 rain8=json.hourly[21].weather[0].rain*20;
                 rain81=json.hourly[22].weather[0].rain*20;
                 rain82=json.hourly[23].weather[0].rain*20;
                        
                  if (isNaN(rain1)) rain1 = 0;
                  if (isNaN(rain11)) rain11 = 0;
                  if (isNaN(rain12)) rain12 = 0;
                  
                  if (isNaN(rain2)) rain2 = 0;
                  if (isNaN(rain21)) rain21 = 0;
                  if (isNaN(rain22)) rain22 = 0;

                  if (isNaN(rain3)) rain3 = 0;
                  if (isNaN(rain31)) rain31 = 0;
                  if (isNaN(rain32)) rain32 = 0;

                  if (isNaN(rain4)) rain4 = 0;
                  if (isNaN(rain41)) rain41 = 0;
                  if (isNaN(rain42)) rain42 = 0;

                  if (isNaN(rain5)) rain5 = 0;
                  if (isNaN(rain51)) rain51 = 0;
                  if (isNaN(rain52)) rain52 = 0;

                  if (isNaN(rain6)) rain6 = 0;
                  if (isNaN(rain61)) rain61 = 0;
                  if (isNaN(rain62)) rain62 = 0;

                  if (isNaN(rain7)) rain7 = 0;
                  if (isNaN(rain71)) rain71 = 0;
                  if (isNaN(rain72)) rain72 = 0;

                  if (isNaN(rain8)) rain8 = 0;
                  if (isNaN(rain81)) rain81 = 0;
                  if (isNaN(rain82)) rain82 = 0;

  

                 if(units==1){
                   rain1=Math.round(rain1*25.4);
                   rain11=Math.round(rain11*25.4);
                   rain12=Math.round(rain12*25.4);
                   rain2=Math.round(rain2*25.4);
                   rain21=Math.round(rain21*25.4);
                   rain22=Math.round(rain22*25.4);
                   rain3=Math.round(rain3*25.4);
                   rain31=Math.round (rain31*25.4);
                   rain32=Math.round(rain32*25.4);
                   rain4=Math.round(rain4*25.4);
                   rain41=Math.round(rain41*25.4);
                   rain42=Math.round(rain42*25.4);
                   rain5=Math.round(rain5*25.4);
                   rain51=Math.round( rain51*25.4);
                   rain52=Math.round(rain52*25.4);
                   rain6=Math.round(rain6*25.4);
                   rain61=Math.round(rain61*25.4);
                   rain62=Math.round(rain62*25.4);
                   rain7=Math.round(rain7*25.4);
                   rain71=Math.round(rain71*25.4);
                   rain72=Math.round(rain72*25.4);
                   rain8=Math.round(rain8*25.4);
                   rain81=Math.round(rain81*25.4);
                   rain82=Math.round(rain82*25.4);
                 }

                 var temperature;


                 if(units==1){
                   units_s="°F";
                 }
                 else{
                   units_s="°C";
                 }

                 temperature = Math.round(json.current.temp)+units_s;
                 humidity=  Math.round(json.current.humidity)+"%";
                 //console.log("json.hourly.data[9].windBearing "+json.hourly.data[9].windBearing);

                 // Conditions
                 var conditions = json.current.weather[0].description;

                 var units_w;
                 if(units==1){
                   units_w="M/H";
                 }
                 else{
                   units_w="KM/H";
                 }
    
                 var wind = Math.round(json.current.wind_speed)+units_w;

                 var sunrise = json.current.sunrise;
                 var sunset = json.current.sunset;

                 var dsunrise=new Date(sunrise*1000);
                 var dsunset=new Date(sunset*1000);

                 var sunrise_hours = dsunrise.getHours();
                 var sunrise_minutes = "0"+ dsunrise.getMinutes();
                 var sunrise_string ;
                 var sunset_hours = dsunset.getHours();
                 var sunset_minutes = "0"+ dsunset.getMinutes();
                 var sunset_string;
                 if (units==1){
                   if(sunrise_hours>12){
                     sunrise_hours=sunrise_hours%12;
                     sunrise_string = sunrise_hours+":"+sunrise_minutes.substr(-2)+"pm";
                   }
                   else{
                     sunrise_string = sunrise_hours+":"+sunrise_minutes.substr(-2)+"am";
                   }

                 }
                 else{
                   sunrise_string = sunrise_hours+":"+sunrise_minutes.substr(-2);
                 }

                 if (units==1){
                   if(sunset_hours>12){
                     sunset_hours=sunset_hours%12;
                     sunset_string = sunset_hours+":"+sunset_minutes.substr(-2)+"pm";
                   }
                   else{
                     sunset_string = sunset_hours+":"+sunset_minutes.substr(-2)+"am";
                   }
                 }
                 else
                 {
                   sunset_string = sunset_hours+":"+sunset_minutes.substr(-2);
                 }

                 var icon = json.current.weather[0].icon;


                 // force int
                 graph++;
                 graph--;
                 location = location.replace(/"/g,"");
                 var dictionary = {
                   "KEY_TEMPERATURE": temperature,
                   "KEY_CONDITIONS": conditions,
                   "KEY_GRAPH": graph,
                   "KEY_WIND_SPEED" : wind,

                   "KEY_SUNRISE" : sunrise_string,
                   "KEY_SUNSET" : sunset_string,
                   "KEY_TMIN" : tmin,
                   "KEY_TMAX" : tmax,
                   "KEY_ICON" : icon,
                   "KEY_LOCATION" : location,

                   "KEY_FORECAST_TEMP1" : temp1,
                   "KEY_FORECAST_TEMP2" : temp2,
                   "KEY_FORECAST_TEMP3" : temp3,
                   "KEY_FORECAST_TEMP4" : temp4,
                   "KEY_FORECAST_TEMP5" : temp5,
                   "KEY_FORECAST_TEMP6" : temp6,
                   "KEY_FORECAST_TEMP7" : temp7,
                   "KEY_FORECAST_TEMP8" : temp8,
                   "KEY_FORECAST_TEMP9" : temp9,
                   "KEY_FORECAST_H0" : hour0,
                   "KEY_FORECAST_H1" : hour1,
                   "KEY_FORECAST_H2" : hour2,
                   "KEY_FORECAST_H3" : hour3,
                   "KEY_FORECAST_H4" : hour4,
                   "KEY_FORECAST_H5" : hour5,
                   "KEY_FORECAST_H6" : hour6,
                   "KEY_FORECAST_H7" : hour7,
                   "KEY_FORECAST_H8" : hour8,
                   "KEY_FORECAST_RAIN1" : rain1,
                   "KEY_FORECAST_RAIN2" : rain2,
                   "KEY_FORECAST_RAIN3" : rain3,
                   "KEY_FORECAST_RAIN4" : rain4,
                   "KEY_FORECAST_RAIN5" : rain5,
                   "KEY_FORECAST_RAIN6" : rain6,
                   "KEY_FORECAST_RAIN7" : rain7,
                   "KEY_FORECAST_RAIN8" : rain8,

                   "KEY_FORECAST_RAIN11" : rain11,
                   "KEY_FORECAST_RAIN12" : rain12,

                   "KEY_FORECAST_RAIN21" : rain21,
                   "KEY_FORECAST_RAIN22" : rain22,

                   "KEY_FORECAST_RAIN31" : rain31,
                   "KEY_FORECAST_RAIN32" : rain32,

                   "KEY_FORECAST_RAIN41" : rain41,
                   "KEY_FORECAST_RAIN42" : rain42,

                   "KEY_FORECAST_RAIN51" : rain51,
                   "KEY_FORECAST_RAIN52" : rain52,

                   "KEY_FORECAST_RAIN61" : rain61,
                   "KEY_FORECAST_RAIN62" : rain62,

                   "KEY_FORECAST_RAIN71" : rain71,
                   "KEY_FORECAST_RAIN72" : rain72,

                   "KEY_FORECAST_RAIN81" : rain81,
                   "KEY_FORECAST_RAIN82" : rain82,

                   "KEY_FORECAST_ICON1" : icon1,
                   "KEY_FORECAST_ICON2" : icon2,
                   "KEY_FORECAST_ICON3" : icon3,
                   "KEY_FORECAST_ICON4" : icon4,
                   "KEY_FORECAST_ICON5" : icon5,
                   "KEY_FORECAST_ICON6" : icon6,
                   "KEY_FORECAST_ICON7" : icon7,

                   "KEY_FORECAST_WIND0" : wind0,
                   "KEY_FORECAST_WIND1" : wind1,
                   "KEY_FORECAST_WIND2" : wind2,
                   "KEY_FORECAST_WIND3" : wind3,
                   "KEY_FORECAST_WIND4" : wind4,
                   "KEY_FORECAST_WIND5" : wind5,
                   "KEY_FORECAST_WIND6" : wind6,
                   "KEY_FORECAST_WIND7" : wind7,
                   "KEY_FORECAST_WIND8" : wind8,


                   "KEY_DAY1" : day1,
                   "KEY_DAY2" : day2,
                   "KEY_DAY3" : day3,
                   "KEY_DAY4" : day4,
                   "KEY_DAY5" : day5,
                   "KEY_DAY6" : day6,
                   "KEY_DAY1_TEMP" : day1_temp,
                   "KEY_DAY2_TEMP" : day2_temp,
                   "KEY_DAY3_TEMP" : day3_temp,
                   "KEY_DAY4_TEMP" : day4_temp,
                   "KEY_DAY5_TEMP" : day5_temp,
                   "KEY_DAY6_TEMP" : day6_temp,
                   "KEY_DAY1_ICON" : day1_icon,
                   "KEY_DAY2_ICON" : day2_icon,
                   "KEY_DAY3_ICON" : day3_icon,
                   "KEY_DAY4_ICON" : day4_icon,
                   "KEY_DAY5_ICON" : day5_icon,
                   "KEY_DAY6_ICON" : day6_icon,
                   "KEY_MOONPHASE1" : moonPhase1,
                   "KEY_MOONPHASE2" : moonPhase2,
                   "KEY_MOONPHASE3" : moonPhase3,
                   "KEY_MOONPHASE4" : moonPhase4,
                   "KEY_MOONPHASE5" : moonPhase5,
                   "KEY_MOONPHASE6" : moonPhase6,

                   "KEY_DAY1R" : day1r,
                   "KEY_DAY2R" : day2r,
                   "KEY_DAY3R" : day3r,
                   "KEY_DAY4R" : day4r,
                   "KEY_DAY5R" : day5r,
                   "KEY_DAY6R" : day6r,

                   "KEY_DAY1P" : day1p,
                   "KEY_DAY2P" : day2p,
                   "KEY_DAY3P" : day3p,
                   "KEY_DAY4P" : day4p,
                   "KEY_DAY5P" : day5p,
                   "KEY_DAY6P" : day6p,
                   "KEY_HUMIDITY" : humidity
                 };
                
    
                 // Send to watchapp
                 Pebble.sendAppMessage(dictionary, function() {
                   console.log("sendAppMessage");
                   console.log('Send successful: ' + JSON.stringify(dictionary));
                 }, function() {
                   console.log('Send failed!');
                 }
                 );
      }
    );
  
    
}



function locationSuccess(pos) {

  console.log("locationSuccess");
  var lat= pos.coords.latitude;
  var lng= pos.coords.longitude;
  var coordinates='lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude

  // console.log('getWeatherCoord coordinates: ' + coordinates);
  localStorage.setItem(153, coordinates);
  localStorage.setItem(154, JSON.stringify(' '));

  var units = localStorage.getItem(152);

  var units_s;

  if(units==1){
    units_s="imperial";
  }
  else{
    units_s="metric";
  }

 
  
  //console.log('input_api : '+input_api);
  

  
   getForecast();


}

function locationError(err) {
  console.log("locationError");
  // console.log("Error requesting location!");
}

function getPosition() {
  SendStatus("Getting position ...");
  navigator.geolocation.getCurrentPosition(
    locationSuccess,
    locationError,
    {timeout: 15000, maximumAge: 60000}
  );
}






// Listen for when the watchface is opened
Pebble.addEventListener('ready',
                        function(e) {
                          console.log("PebbleKit JS ready!");
                  
                          getPosition();


                        }
                       );

// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage',
                        function(e) {
                          console.log("AppMessage received!");

                          var requestPayloadAsJsonString = JSON.stringify (e.payload);
                          // console.log ("    stringified: " + requestPayloadAsJsonString);
                          //   KEY_LOCATION
                          var json = JSON.parse(requestPayloadAsJsonString);
                          var location =json.KEY_LOCATION;
                          //  console.log ("json location: " + location);

                          if(navigator.onLine){
                            getPosition();
                          }
                          else{
                            SendStatus("No internet !");

                          }
                        }

                       );



Pebble.addEventListener('showConfiguration', function() {
  var url = 'http://sichroteph.github.io/Weather-Graph-ForecastIO/index.html';

  //   console.// ('Showing configuration page: ' + url);
  Pebble.openURL(url);
});


Pebble.addEventListener('webviewclosed', function(e) {
  var configData = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration page returned: ' + JSON.stringify(configData));

  var gps = configData.gps;
  var graph = configData.toggle_graph;
  //  console.log('javascript graph: ' + graph);

  var radio_units = configData.radio_units;
  var input_city = configData.input_city;
  var input_api = configData.input_api;


  localStorage.setItem(150, gps ? 1 : 0);
  localStorage.setItem(152, radio_units ? 1 : 0);
  localStorage.setItem(154, JSON.stringify(input_city));
  localStorage.setItem(155, graph ? 1 : 0);
  localStorage.setItem(156, input_api);

  getPosition();

});
