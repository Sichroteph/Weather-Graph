var myGoogleAPIKey = '';
var status = ' ' ;


function SendStatus(status){
  var dictionary = {
    "KEY_STATUS": status,
  };

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

  var rain1;
  var rain2;
  var rain3;
  var rain4;
  var rain5;
  var rain6;
  var rain7;
  var rain8;


  var rain11;
  var rain12;
  var rain21;
  var rain22;
  var rain31;
  var rain32;
  var rain41;
  var rain42;
  var rain51;
  var rain52;
  var rain61;
  var rain62;
  var rain71;
  var rain72;
  var rain81;
  var rain82;



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


  var coordinates = localStorage.getItem(153);
  var units = localStorage.getItem(152);

  var humidity;

  var units_s;
  if(units==1){
    units_s="us";
  }
  else{
    units_s="ca";
  }
  // Send request to forecast



  var api_key;

  var random = Math.floor((Math.random() * 5) + 1);


  api_key= '';
  


  var url = 'https://api.forecast.io/forecast/'+api_key+'/'+coordinates+'?units='+units_s; 
  url=url.replace(/"/g,"");



  xhrRequest(url, 'GET', 
             function(responseText) {
               console.log("responseText");
               var units_t;
               var location = localStorage.getItem(154);
               var graph = localStorage.getItem(155);


               // console.log("getWeather coordinates "+coordinates);
               //  console.log("getWeather location "+location);
               //console.log("getWeather url "+url);

               var json = JSON.parse(responseText);
               //   console.log(responseText);



               var day_int = json.daily.data[1].time;
               var a = new Date(day_int*1000);
               day1 = a.getDay();        
               day_int = json.daily.data[2].time;
               a = new Date(day_int*1000);
               day2 = a.getDay();
               day_int = json.daily.data[3].time;
               a = new Date(day_int*1000);
               day3 = a.getDay();
               day_int = json.daily.data[4].time;
               a = new Date(day_int*1000);
               day4 = a.getDay();
               day_int = json.daily.data[5].time;
               a = new Date(day_int*1000);
               day5 = a.getDay();
               day_int = json.daily.data[6].time;
               a = new Date(day_int*1000);
               day6 = a.getDay();


               moonPhase1 = Math.round(json.daily.data[1].moonPhase*25);
               moonPhase2 = Math.round(json.daily.data[2].moonPhase*25);
               moonPhase3 = Math.round(json.daily.data[3].moonPhase*25);
               moonPhase4 = Math.round(json.daily.data[4].moonPhase*25);
               moonPhase5 = Math.round(json.daily.data[5].moonPhase*25);
               moonPhase6 = Math.round(json.daily.data[6].moonPhase*25);

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

               var t1=Math.round(json.daily.data[1].temperatureMax);
               var t2=Math.round(json.daily.data[2].temperatureMax);
               var t3=Math.round(json.daily.data[3].temperatureMax);
               var t4=Math.round(json.daily.data[4].temperatureMax);
               var t5=Math.round(json.daily.data[5].temperatureMax);
               var t6=Math.round(json.daily.data[6].temperatureMax);
               var t1_min=Math.round(json.daily.data[1].temperatureMin);
               var t2_min=Math.round(json.daily.data[2].temperatureMin);
               var t3_min=Math.round(json.daily.data[3].temperatureMin);
               var t4_min=Math.round(json.daily.data[4].temperatureMin);
               var t5_min=Math.round(json.daily.data[5].temperatureMin);
               var t6_min=Math.round(json.daily.data[6].temperatureMin);

               if(units==1){
                 units_t="°F";
               }
               else{
                 units_t="°C";
               }
               day1_temp=t1_min+units_t+"\n"+t1+units_t;
               day2_temp=t2_min+units_t+"\n"+t2+units_t;
               day3_temp=t3_min+units_t+"\n"+t3+units_t;
               day4_temp=t4_min+units_t+"\n"+t4+units_t;
               day5_temp=t5_min+units_t+"\n"+t5+units_t;
               day6_temp=t6_min+units_t+"\n"+t6+units_t;
               if(units==1){
                 units_s="in./hr. ";
               }
               else{
                 units_s="mm/hr ";
               }

               //23 pixels hight




               if(units==1){
                 day1r=Math.round(json.daily.data[1].precipIntensityMax*6*25.4);
                 day1p=Math.round(json.daily.data[1].precipProbability*23);
                 day2r=Math.round(json.daily.data[2].precipIntensityMax*6*25.4);
                 day2p=Math.round(json.daily.data[2].precipProbability*23);
                 day3r=Math.round(json.daily.data[3].precipIntensityMax*6*25.4);
                 day3p=Math.round(json.daily.data[3].precipProbability*23);
                 day4r=Math.round(json.daily.data[4].precipIntensityMax*6*25.4);
                 day4p=Math.round(json.daily.data[4].precipProbability*23);
                 day5r=Math.round(json.daily.data[5].precipIntensityMax*6*25.4);
                 day5p=Math.round(json.daily.data[5].precipProbability*23);
                 day6r=Math.round(json.daily.data[6].precipIntensityMax*6*25.4);
                 day6p=Math.round(json.daily.data[6].precipProbability*23);
               }
               else{
                 day1r=Math.round(json.daily.data[1].precipIntensityMax*6);
                 day1p=Math.round(json.daily.data[1].precipProbability*23);
                 day2r=Math.round(json.daily.data[2].precipIntensityMax*6);
                 day2p=Math.round(json.daily.data[2].precipProbability*23);
                 day3r=Math.round(json.daily.data[3].precipIntensityMax*6);
                 day3p=Math.round(json.daily.data[3].precipProbability*23);
                 day4r=Math.round(json.daily.data[4].precipIntensityMax*6);
                 day4p=Math.round(json.daily.data[4].precipProbability*23);
                 day5r=Math.round(json.daily.data[5].precipIntensityMax*6);
                 day5p=Math.round(json.daily.data[5].precipProbability*23);
                 day6r=Math.round(json.daily.data[6].precipIntensityMax*6);
                 day6p=Math.round(json.daily.data[6].precipProbability*23);
               }
               if(!(day1r>-1000)){
                 if(units==1){
                   day1r=Math.round(json.daily.data[1].precipIntensity*6*25.4);
                   day1p=Math.round(json.daily.data[1].precipProbability*23);
                   day2r=Math.round(json.daily.data[2].precipIntensity*6*25.4);
                   day2p=Math.round(json.daily.data[2].precipProbability*23);
                   day3r=Math.round(json.daily.data[3].precipIntensity*6*25.4);
                   day3p=Math.round(json.daily.data[3].precipProbability*23);
                   day4r=Math.round(json.daily.data[4].precipIntensity*6*25.4);
                   day4p=Math.round(json.daily.data[4].precipProbability*23);
                   day5r=Math.round(json.daily.data[5].precipIntensity*6*25.4);
                   day5p=Math.round(json.daily.data[5].precipProbability*23);
                   day6r=Math.round(json.daily.data[6].precipIntensity*6*25.4);
                   day6p=Math.round(json.daily.data[6].precipProbability*23);
                 }
                 else{
                   day1r=Math.round(json.daily.data[1].precipIntensity*6);
                   day1p=Math.round(json.daily.data[1].precipProbability*23);
                   day2r=Math.round(json.daily.data[2].precipIntensity*6);
                   day2p=Math.round(json.daily.data[2].precipProbability*23);
                   day3r=Math.round(json.daily.data[3].precipIntensity*6);
                   day3p=Math.round(json.daily.data[3].precipProbability*23);
                   day4r=Math.round(json.daily.data[4].precipIntensity*6);
                   day4p=Math.round(json.daily.data[4].precipProbability*23);
                   day5r=Math.round(json.daily.data[5].precipIntensity*6);
                   day5p=Math.round(json.daily.data[5].precipProbability*23);
                   day6r=Math.round(json.daily.data[6].precipIntensity*6);
                   day6p=Math.round(json.daily.data[6].precipProbability*23);
                 }

               }


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

               console.log("json.daily.data[1].precipIntensity " +json.daily.data[1].precipIntensity);
               console.log("day1p " +day1p);

               day1_icon=json.daily.data[1].icon;
               day2_icon=json.daily.data[2].icon;
               day3_icon=json.daily.data[3].icon;
               day4_icon=json.daily.data[4].icon;
               day5_icon=json.daily.data[5].icon;
               day6_icon=json.daily.data[6].icon;

               console.log("day1_icon" +day1_icon);

               // responseText contains a JSON object with weather info

               tmax = Math.round(json.daily.data[0].temperatureMax)+units_t;
               tmin = Math.round(json.daily.data[0].temperatureMin)+units_t;


               temp1=Math.round(json.hourly.data[0].temperature);
               temp2=Math.round(json.hourly.data[3].temperature);
               temp3=Math.round(json.hourly.data[6].temperature);
               temp4=Math.round(json.hourly.data[9].temperature);
               temp5=Math.round(json.hourly.data[12].temperature);
               temp6=Math.round(json.hourly.data[15].temperature);
               temp7=Math.round(json.hourly.data[18].temperature);
               temp8=Math.round(json.hourly.data[21].temperature);
               temp9=Math.round(json.hourly.data[24].temperature);

               h0=json.hourly.data[0].time;
               h1=json.hourly.data[3].time;
               h2=json.hourly.data[6].time;
               h3=json.hourly.data[9].time;
               h4=json.hourly.data[12].time;
               h5=json.hourly.data[15].time;
               h6=json.hourly.data[18].time;
               h7=json.hourly.data[21].time;
               h8=json.hourly.data[24].time;

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


               //  console.log("hours "+hour1+" "+hour2+" "+hour3+" "+hour4+" "+hour5+" "+hour6+" "+hour7);
               //nsole.log("getHours "+hour1+" "+hour2+" "+hour3+" "+hour4+" "+hour5+" "+hour6+" "+hour7);

               wind0=Math.round(json.hourly.data[0].windSpeed)+
                 "\n"+windBearing(Math.round(json.hourly.data[0].windBearing));
               wind1=Math.round(json.hourly.data[3].windSpeed)+
                 "\n"+windBearing(Math.round(json.hourly.data[3].windBearing));
               wind2=Math.round(json.hourly.data[6].windSpeed)+
                 "\n"+windBearing(Math.round(json.hourly.data[6].windBearing));
               wind3=Math.round(json.hourly.data[9].windSpeed)+
                 "\n"+windBearing(Math.round(json.hourly.data[9].windBearing));
               wind4=Math.round(json.hourly.data[12].windSpeed)+
                 "\n"+windBearing(Math.round(json.hourly.data[12].windBearing));
               wind5=Math.round(json.hourly.data[15].windSpeed)+
                 "\n"+windBearing(Math.round(json.hourly.data[15].windBearing));
               wind6=Math.round(json.hourly.data[18].windSpeed)+
                 "\n"+windBearing(Math.round(json.hourly.data[18].windBearing));
               wind7=Math.round(json.hourly.data[21].windSpeed)+
                 "\n"+windBearing(Math.round(json.hourly.data[21].windBearing));
               wind8=Math.round(json.hourly.data[24].windSpeed)+
                 "\n"+windBearing(Math.round(json.hourly.data[24].windBearing));
               // console.log("json.hourly.data[9].windBearing "+json.hourly.data[9].windBearing);


               icon1 = json.hourly.data[3].icon;
               icon2 = json.hourly.data[6].icon;
               icon3 = json.hourly.data[9].icon;
               icon4 = json.hourly.data[12].icon;
               icon5 = json.hourly.data[15].icon;
               icon6 = json.hourly.data[18].icon;
               icon7 = json.hourly.data[21].icon;

               rain1=json.hourly.data[0].precipIntensity*20;
               rain11=json.hourly.data[1].precipIntensity*20;
               rain12=json.hourly.data[2].precipIntensity*20;
               rain2=json.hourly.data[3].precipIntensity*20;
               rain21=json.hourly.data[4].precipIntensity*20;
               rain22=json.hourly.data[5].precipIntensity*20;
               rain3=json.hourly.data[6].precipIntensity*20;
               rain31=json.hourly.data[7].precipIntensity*20;
               rain32=json.hourly.data[8].precipIntensity*20;
               rain4=json.hourly.data[9].precipIntensity*20;
               rain41=json.hourly.data[10].precipIntensity*20;
               rain42=json.hourly.data[11].precipIntensity*20;
               rain5=json.hourly.data[12].precipIntensity*20;
               rain51=json.hourly.data[13].precipIntensity*20;
               rain52=json.hourly.data[14].precipIntensity*20;
               rain6=json.hourly.data[15].precipIntensity*20;
               rain61=json.hourly.data[16].precipIntensity*20;
               rain62=json.hourly.data[17].precipIntensity*20;
               rain7=json.hourly.data[18].precipIntensity*20;
               rain71=json.hourly.data[19].precipIntensity*20;
               rain72=json.hourly.data[20].precipIntensity*20;
               rain8=json.hourly.data[21].precipIntensity*20;
               rain81=json.hourly.data[22].precipIntensity*20;
               rain82=json.hourly.data[23].precipIntensity*20;


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

               temperature = Math.round(json.currently.temperature)+units_s;
               humidity=  Math.round(json.currently.humidity*100)+"%";  
               //console.log("json.hourly.data[9].windBearing "+json.hourly.data[9].windBearing);

               // Conditions
               var conditions = json.currently.summary;


               var units_w;
               if(units==1){
                 units_w="M/H";
               }
               else{
                 units_w="KM/H";
               }
               var wind = Math.round(json.currently.windSpeed)+units_w;



               var sunrise = json.daily.data[0].sunriseTime;
               var sunset = json.daily.data[0].sunsetTime;

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

               var icon = json.currently.icon;


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
                 "KEY_HUMIDITY" : humidity,


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


function getWeatherLocation(){
  SendStatus("Coordinates from location ...");   

  var location;
  if (localStorage.getItem(154)!==null){
    location = localStorage.getItem(154);
  }
  else{
    location="Bandol, France";

  }
  var coordinates;
  var urlGoogle = 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key='+myGoogleAPIKey;
  urlGoogle=urlGoogle.replace(/"/g,"");
  urlGoogle=urlGoogle.replace(/ /g,"+"); 

  //  console.log('google url: ' + urlGoogle);



  xhrRequest(urlGoogle, 'GET', 
             function(responseText) {
               console.log("urlGoogle");

               var json = JSON.parse(responseText);

               location = json.results[0].formatted_address;
               location=location.replace(/"/g,"");

               var lat= json.results[0].geometry.location.lat;
               var lng= json.results[0].geometry.location.lng;

               coordinates=lat+','+lng;
               // Persist write a key with associated value


               localStorage.setItem(153, JSON.stringify(coordinates));
               localStorage.setItem(154, JSON.stringify(location));

               // console.log('getCoordFromLocation coordinates: ' + coordinates);
               // console.log('getCoordFromLocation location: ' + location);
               getForecast();
             });
  
}

function getWeatherCoord(){
  SendStatus("Location from coordinates ...");   
  console.log("getWeatherCoord");
  var location=" ";

  var coordinates = localStorage.getItem(153);

  var urlGoogle = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+coordinates+'&key='+myGoogleAPIKey;
  urlGoogle=urlGoogle.replace(/"/g,"");
  urlGoogle=urlGoogle.replace(/ /g,"+"); 
  //  console.log('google url: ' + urlGoogle);
 location = ' ';
 localStorage.setItem(154, JSON.stringify(location));

  xhrRequest(urlGoogle, 'GET', 
             function(responseText) {
               console.log("xhrRequest(urlGoogle,");
               var json = JSON.parse(responseText);
               location = json.results[0].formatted_address;
               localStorage.setItem(154, JSON.stringify(location));
               //  console.log('location: ' + location);
               getForecast();
             });
}

function locationSuccess(pos) {

  console.log("locationSuccess");
  var lat= pos.coords.latitude;
  var lng= pos.coords.longitude;
  var coordinates=lat+','+lng;

  // console.log('getWeatherCoord coordinates: ' + coordinates);
  localStorage.setItem(153, JSON.stringify(coordinates));
  localStorage.setItem(154, JSON.stringify(' '));
  getForecast();
 // getWeatherCoord();

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



function getWeather(){
  console.log("getWeather");
  var gps = localStorage.getItem(150);


  if (gps==0){
    getWeatherLocation();
  }
  else{
    getPosition();
  }

}



// Listen for when the watchface is opened
Pebble.addEventListener('ready', 
                        function(e) {
                          console.log("PebbleKit JS ready!");
                     //    if(navigator.onLine){

                         if(1){
                            getWeather();
                          }
                          else {
                            SendStatus("No internet !");                       
                          }

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

                            if(location==""){
                              getPosition();
                            }
                            else{
                              localStorage.setItem(154, JSON.stringify(location));
                              getWeatherLocation();
                            }
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
  //  var input_api = configData.input_api;



  localStorage.setItem(150, gps ? 1 : 0);
  localStorage.setItem(152, radio_units ? 1 : 0);
  localStorage.setItem(154, JSON.stringify(input_city));
  localStorage.setItem(155, graph ? 1 : 0);


  getWeather();

});
