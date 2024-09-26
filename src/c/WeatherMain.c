#include <pebble.h>

#if defined(PBL_ROUND)
#define IS_ROUND true
#define RULER_XOFFSET 50
#define PAGE_POINTS_OFFSET -4
#define TEXT_HOUR_OFFSET 83
#define WIDTH 180
#define HEIGHT 180
#else
#define IS_ROUND false
#define RULER_XOFFSET 34
#define PAGE_POINTS_OFFSET -18
#define TEXT_HOUR_OFFSET 56
#define WIDTH 144
#define HEIGHT 168
#endif
#define RULER_SIZE -2
#define MAXRAIN 40;

#define LINE_THICK 3

// For the gradiant effect, 1/2 pixels, 1/3 and 1/4
#define GRADIANT 4
#define GRADIANT_X_OFFSET -1
#define GRADIANT_Y_OFFSET -10

#ifdef PBL_COLOR

#define BLUE_LINE GColorElectricBlue
#define RED_LINE GColorRed
#define RAIN_COLOR GColorCobaltBlue
#define IS_COLOR true

#else

#define BLUE_LINE GColorWhite
#define RAIN_COLOR GColorWhite
#define RED_LINE GColorWhite
#define IS_COLOR false

#endif

#define STATUS_FONT FONT_KEY_GOTHIC_14

#define KEY_TEMPERATURE 0
#define KEY_CONDITIONS 1
#define KEY_DESCRIPTION 2
#define KEY_WIND_SPEED 3
#define KEY_CLOUDS 4
#define KEY_HUMIDITY 5
#define KEY_SUNRISE 6
#define KEY_SUNSET 7
#define KEY_TMIN 8
#define KEY_TMAX 9
#define KEY_ICON 10

#define KEY_FORECAST_TEMP1 11
#define KEY_FORECAST_TEMP2 12
#define KEY_FORECAST_TEMP3 13
#define KEY_FORECAST_TEMP4 14
#define KEY_FORECAST_TEMP5 15
#define KEY_FORECAST_H1 16
#define KEY_FORECAST_H2 17
#define KEY_FORECAST_H3 18
#define KEY_FORECAST_RAIN1 21
#define KEY_FORECAST_RAIN2 22
#define KEY_FORECAST_RAIN3 23
#define KEY_FORECAST_RAIN4 24
#define KEY_FORECAST_RAIN5 25
#define KEY_FORECAST_ICON1 26
#define KEY_FORECAST_ICON2 27
#define KEY_FORECAST_ICON3 28
#define KEY_FORECAST_WIND1 29
#define KEY_FORECAST_WIND2 30
#define KEY_FORECAST_WIND3 31
#define KEY_LOCATION 32

#define KEY_GPS 33
#define KEY_INPUT_CITY 34

#define KEY_RADIO_UNITS 36
#define KEY_RADIO_REFRESH 54
#define KEY_TOGGLE_VIBRATION 37
#define KEY_TOGGLE_BW_ICONS 38
#define KEY_COLOR_RIGHT_R 39
#define KEY_COLOR_RIGHT_G 40
#define KEY_COLOR_RIGHT_B 41
#define KEY_COLOR_LEFT_R 42
#define KEY_COLOR_LEFT_G 43
#define KEY_COLOR_LEFT_B 44
#define KEY_COLOR_HOURS_R 45
#define KEY_COLOR_HOURS_G 46
#define KEY_COLOR_HOURS_B 47

#define KEY_COLOR_RULER_R 48
#define KEY_COLOR_RULER_G 49
#define KEY_COLOR_RULER_B 50
#define KEY_COLOR_TEMPERATURES_R 51
#define KEY_COLOR_TEMPERATURES_G 52
#define KEY_COLOR_TEMPERATURES_B 53
#define KEY_RADIO_REFRESH 54

#define KEY_FORECAST_TEMP6 55
#define KEY_FORECAST_TEMP7 56
#define KEY_FORECAST_H4 57
#define KEY_FORECAST_H5 58
#define KEY_FORECAST_H6 59
#define KEY_FORECAST_H7 60
#define KEY_FORECAST_RAIN6 61
#define KEY_FORECAST_RAIN7 62
#define KEY_FORECAST_RAIN8 63

#define KEY_FORECAST_ICON4 64
#define KEY_FORECAST_ICON5 65
#define KEY_FORECAST_ICON6 66
#define KEY_FORECAST_ICON7 67
#define KEY_FORECAST_WIND4 68
#define KEY_FORECAST_WIND5 69
#define KEY_FORECAST_WIND6 70
#define KEY_FORECAST_WIND7 71
#define KEY_FORECAST_TEMP8 72
#define KEY_FORECAST_TEMP9 73

#define KEY_DAY1 74
#define KEY_DAY2 75
#define KEY_DAY3 76
#define KEY_DAY1_ICON 77
#define KEY_DAY2_ICON 78
#define KEY_DAY3_ICON 79

#define KEY_FORECAST_RAIN11 80
#define KEY_FORECAST_RAIN12 81
#define KEY_FORECAST_RAIN21 82
#define KEY_FORECAST_RAIN22 83
#define KEY_FORECAST_RAIN31 84
#define KEY_FORECAST_RAIN32 85
#define KEY_FORECAST_RAIN41 86
#define KEY_FORECAST_RAIN42 87
#define KEY_FORECAST_RAIN51 88
#define KEY_FORECAST_RAIN52 89
#define KEY_FORECAST_RAIN61 90
#define KEY_FORECAST_RAIN62 91
#define KEY_FORECAST_RAIN71 92
#define KEY_FORECAST_RAIN72 93
#define KEY_FORECAST_RAIN81 94
#define KEY_FORECAST_RAIN82 95

#define KEY_DAY4 96
#define KEY_DAY5 97
#define KEY_DAY6 98

#define KEY_DAY4_ICON 99
#define KEY_DAY5_ICON 102
#define KEY_DAY6_ICON 103
#define KEY_GRAPH 104
#define KEY_DAY1_TEMP 105
#define KEY_DAY2_TEMP 106
#define KEY_DAY3_TEMP 107
#define KEY_DAY4_TEMP 108
#define KEY_DAY5_TEMP 109
#define KEY_DAY6_TEMP 110
#define KEY_FORECAST_H0 111
#define KEY_FORECAST_H8 112

#define KEY_FORECAST_WIND0 113
#define KEY_FORECAST_WIND8 114

#define KEY_MOONPHASE1 115
#define KEY_MOONPHASE2 116
#define KEY_MOONPHASE3 117
#define KEY_MOONPHASE4 118
#define KEY_MOONPHASE5 119
#define KEY_MOONPHASE6 120

#define KEY_DAY1R 121
#define KEY_DAY2R 122
#define KEY_DAY3R 123
#define KEY_DAY4R 124
#define KEY_DAY5R 125
#define KEY_DAY6R 126

#define KEY_DAY1P 127
#define KEY_DAY2P 128
#define KEY_DAY3P 129
#define KEY_DAY4P 130
#define KEY_DAY5P 131
#define KEY_DAY6P 132
#define KEY_STATUS 133

#define XOFFSET 18
#define YOFFSET 6

#if defined(PBL_ROUND)
#define TEXT_DAYW_STATUS_OFFSET_X 8
#define TEXT_DAYW_STATUS_OFFSET_Y 34
#define TEXT_DAY_STATUS_OFFSET_X 8
#define TEXT_DAY_STATUS_OFFSET_Y 40
#define TEXT_TEMP_OFFSET_X -6
#define TEXT_TEMP_OFFSET_Y 103
#define TEXT_TMIN_OFFSET_X -3
#define TEXT_TMIN_OFFSET_Y 92
#define TEXT_TMAX_OFFSET_X -3
#define TEXT_TMAX_OFFSET_Y 70
#define ICON_X 15
#define ICON_Y 73
#define TEXT_MONTH_STATUS_OFFSET_X 6
#define TEXT_MONTH_STATUS_OFFSET_Y 129

#define BAT_STATUS_OFFSET_X 46
#define BAT_STATUS_OFFSET_Y 80

// For bluetooth lost notification
#define BT_STATUS_OFFSET_Y 7

#define WEATHER_OFFSET_X 0
#define WEATHER_OFFSET_Y -20

#else

#define TEXT_DAYW_STATUS_OFFSET_X 0
#define TEXT_DAYW_STATUS_OFFSET_Y 1
#define TEXT_DAY_STATUS_OFFSET_X 0
#define TEXT_DAY_STATUS_OFFSET_Y 7
#define TEXT_TEMP_OFFSET_X 1
#define TEXT_TEMP_OFFSET_Y 123
#define TEXT_TMIN_OFFSET_X 7
#define TEXT_TMIN_OFFSET_Y 100
#define TEXT_TMAX_OFFSET_X 7
#define TEXT_TMAX_OFFSET_Y 58
#define ICON_X -1
#define ICON_Y 70
// For bluetooth lost notification
#define BT_STATUS_OFFSET_Y -60
#define TEXT_MONTH_STATUS_OFFSET_X -14
#define TEXT_MONTH_STATUS_OFFSET_Y 5

#define BAT_STATUS_OFFSET_X 27
#define BAT_STATUS_OFFSET_Y 90

#define WEATHER_OFFSET_X -14
#define WEATHER_OFFSET_Y -25
#endif

#define ANIM_DELAY 1000
#define ANIM_DURATION 2000
#define LINE_INTERVAL 5
#define MARK_0 42
#define MARK_5 12
#define MARK_15 22
#define MARK_30 32

#define QUIET_TIME_START 22
#define QUIET_TIME_END 10

#define TAP_DURATION 2000

static DictationSession *s_dictation_session;
// Declare a buffer for the DictationSession
static char s_last_text[512];

static Window *window;
static Layer *rootLayer;
static Layer *layer;

// WEATHER

static char weather_temp[10] = " ";

static bool is_menu = 0;
static bool is_tapped = true;

static char icon[20] = " ";
static char icons[20][20];

int h0;
int h1;
int h2;
int h3;
int h4;
int h5;
int h6;
int h7;
int h8;

static char location[100] = " ";
static char status[100] = "Contacting phone ...";

static int tmin_val = 0;
static int tmax_val = 0;
static char wind_speed_val[20] = " ";

static bool is_weather_aquired = false;

time_t last_refresh = 0;
int duration = 3600;

static char temp1[10] = " ";
static char temp2[10] = " ";
static char temp3[10] = " ";
static char temp4[10] = " ";
static char temp5[10] = " ";

static int day1 = 1;
static int day2 = 1;
static int day3 = 1;
static int day4 = 1;
static int day5 = 1;
static int day6 = 1;
static char day_buffer[10] = " ";

static char day1_temp[25] = " ";
static char day2_temp[25] = " ";
static char day3_temp[25] = " ";
static char day4_temp[25] = " ";
static char day5_temp[25] = " ";
static char day6_temp[25] = " ";
static char day1_icon[20] = " ";
static char day2_icon[20] = " ";
static char day3_icon[20] = " ";
static char day4_icon[20] = " ";
static char day5_icon[20] = " ";
static char day6_icon[20] = " ";
static char tmin[20] = " ";
static char tmax[20] = " ";
static char sunrise[20] = " ";
static char sunset[20] = " ";

static char humidity[20] = " ";
static int moonPhase[6];
static char *transPhase[26] = {"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A",
                               "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"};
static int dayr[6];
static int dayp[6];

static int rains[24];
static int temps[9];
static char winds[20][20];

// Config data

static bool graph = 0;
static bool is_metric = 1;

static int page_nb = 1;
static bool is_bw_icon = 0;

static char pebble_Lang[20] = " ";

GColor color_left;
GColor color_temp;

static GFont statusfontsmall;
static GFont statusfontsmallbold;
static GFont statusfontdate;

static char *weekdayLangFr[7] = {"DIMANCHE", "LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"};
static char *weekdayLangEn[7] = {"SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"};
static char *weekdayLangDe[7] = {"SONNTAG", "MONTAG", "DIENSTAG", "MITTWOCH", "DONNERSTAG", "FREITAG", "SAMSTAG"};
static char *weekdayLangEs[7] = {"DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"};

static int build_icon(char *text_icon)
{
  // APP_LOG(APP_LOG_LEVEL_INFO, "texte ICONE  %s", text_icon);

  if ((strcmp(text_icon, "clearsky_day") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_ENSOLEILLE_W;
    else
      return RESOURCE_ID_ENSOLEILLE;
  }
  if ((strcmp(text_icon, "clearsky_night") == 0) || (strcmp(text_icon, "01n") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_NUIT_CLAIRE_W;
    else
      return RESOURCE_ID_NUIT_CLAIRE;
  }
  if ((strcmp(text_icon, "fair_day") == 0) || (strcmp(text_icon, "fair_polartwilight") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_FAIBLES_PASSAGES_NUAGEUX_W;
    else
      return RESOURCE_ID_FAIBLES_PASSAGES_NUAGEUX;
  }
  if (strcmp(text_icon, "wind") == 0)
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_WIND;
    else
      return RESOURCE_ID_WIND;
  }
  if (strcmp(text_icon, "fair_night") == 0)
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_NUIT_BIEN_DEGAGEE_W;
    else
      return RESOURCE_ID_NUIT_BIEN_DEGAGEE;
  }
  if ((strcmp(text_icon, "partlycloudy_day") == 0) || (strcmp(text_icon, "partlycloudy_polartwilight") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_DEVELOPPEMENT_NUAGEUX_W;
    else
      return RESOURCE_ID_DEVELOPPEMENT_NUAGEUX;
  }
  if ((strcmp(text_icon, "partlycloudy_night") == 0) || (strcmp(text_icon, "03n") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_NUIT_AVEC_DEVELOPPEMENT_NUAGEUX_W;
    else
      return RESOURCE_ID_NUIT_AVEC_DEVELOPPEMENT_NUAGEUX;
  }
  if ((strcmp(text_icon, "cloudy") == 0) || (strcmp(text_icon, "04d") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_FORTEMENT_NUAGEUX_W;
    else
      return RESOURCE_ID_FORTEMENT_NUAGEUX;
  }
  if (strcmp(text_icon, "04n") == 0)
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_NUIT_NUAGEUSE_W;
    else
      return RESOURCE_ID_NUIT_NUAGEUSE;
  }
  if (strcmp(text_icon, "lightrainshowers_day") == 0 || strcmp(text_icon, "lightrainshowers_night") == 0 || strcmp(text_icon, "lightrainshowers_polartwilight") == 0 || strcmp(text_icon, "lightsleetshowers_day") == 0 || strcmp(text_icon, "lightsleetshowers_night") == 0 || strcmp(text_icon, "lightsleetshowers_polartwilight") == 0 || strcmp(text_icon, "lightrain") == 0 || strcmp(text_icon, "lightsleet") == 0)
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_COUVERT_AVEC_AVERSES_W;
    else
      return RESOURCE_ID_COUVERT_AVEC_AVERSES;
  }
  if ((strcmp(text_icon, "rainshowers_day") == 0) || (strcmp(text_icon, "rainshowers_polartwilight") == 0) || (strcmp(text_icon, "heavyrain") == 0) || (strcmp(text_icon, "heavyrainshowers_day") == 0) || (strcmp(text_icon, "heavyrainshowers_night") == 0) || (strcmp(text_icon, "heavyrainshowers_polartwilight") == 0) || (strcmp(text_icon, "heavysleetshowers_day") == 0) || (strcmp(text_icon, "heavysleetshowers_night") == 0) || (strcmp(text_icon, "heavysleetshowers_polartwilight") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_AVERSES_DE_PLUIE_FORTE_W;
    else
      return RESOURCE_ID_AVERSES_DE_PLUIE_FORTE;
  }
  if (strcmp(text_icon, "rainshowers_night") == 0)
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_NUIT_AVEC_AVERSES_W;
    else
      return RESOURCE_ID_NUIT_AVEC_AVERSES;
  }

  if (strcmp(text_icon, "rainshowersandthunder_day") == 0 || strcmp(text_icon, "rainshowersandthunder_polartwilight") == 0 || (strcmp(text_icon, "rainshowersandthunder_night") == 0) || (strcmp(text_icon, "heavyrainandthunder") == 0) || (strcmp(text_icon, "sleetshowersandthunder_day") == 0) || (strcmp(text_icon, "sleetshowersandthunder_night") == 0) || (strcmp(text_icon, "sleetshowersandthunder_polartwilight") == 0) || (strcmp(text_icon, "snowshowersandthunder_day") == 0) || (strcmp(text_icon, "snowshowersandthunder_night") == 0) || (strcmp(text_icon, "snowshowersandthunder_polartwilight") == 0) || (strcmp(text_icon, "rainandthunder") == 0) || (strcmp(text_icon, "sleetandthunder") == 0) || (strcmp(text_icon, "lightrainshowersandthunder_day") == 0) || (strcmp(text_icon, "lightrainshowersandthunder_night") == 0) || (strcmp(text_icon, "lightrainshowersandthunder_polartwilight") == 0) || (strcmp(text_icon, "heavyrainshowersandthunder_day") == 0) || (strcmp(text_icon, "heavyrainshowersandthunder_night") == 0) || (strcmp(text_icon, "heavyrainshowersandthunder_polartwilight") == 0) || (strcmp(text_icon, "lightssleetshowersandthunder_day") == 0) || (strcmp(text_icon, "lightssleetshowersandthunder_night") == 0) || (strcmp(text_icon, "lightssleetshowersandthunder_polartwilight") == 0) || (strcmp(text_icon, "heavysleetshowersandthunder_day") == 0) || (strcmp(text_icon, "heavysleetshowersandthunder_night") == 0) || (strcmp(text_icon, "heavysleetshowersandthunder_polartwilight") == 0) || (strcmp(text_icon, "lightssnowshowersandthunder_day") == 0) || (strcmp(text_icon, "lightssnowshowersandthunder_night") == 0) || (strcmp(text_icon, "lightssnowshowersandthunder_polartwilight") == 0) || (strcmp(text_icon, "lightrainandthunder") == 0) || (strcmp(text_icon, "lightsleetandthunder") == 0) || (strcmp(text_icon, "heavysleetandthunder") == 0) || (strcmp(text_icon, "lightsnowandthunder") == 0) || (strcmp(text_icon, "heavysnowandthunder") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_FORTEMENT_ORAGEUX_W;
    else
      return RESOURCE_ID_FORTEMENT_ORAGEUX;
  }
  if (strcmp(text_icon, "sleetshowers_day") == 0 || strcmp(text_icon, "sleetshowers_night") == 0 || (strcmp(text_icon, "sleetshowers_polartwilight") == 0) || (strcmp(text_icon, "snowshowers_day") == 0) || (strcmp(text_icon, "snowshowers_night") == 0) || (strcmp(text_icon, "snowshowers_polartwilight") == 0) || (strcmp(text_icon, "sleet") == 0) || (strcmp(text_icon, "snow") == 0) || (strcmp(text_icon, "snowandthunder") == 0) || (strcmp(text_icon, "heavysnowshowersandthunder_day") == 0) || (strcmp(text_icon, "heavysnowshowersandthunder_night") == 0) || (strcmp(text_icon, "heavysnowshowersandthunder_polartwilight") == 0) || (strcmp(text_icon, "lightsnowshowers_day") == 0) || (strcmp(text_icon, "lightsnowshowers_night") == 0) || (strcmp(text_icon, "lightsnowshowers_polartwilight") == 0) || (strcmp(text_icon, "heavysnowshowers_day") == 0) || (strcmp(text_icon, "heavysnowshowers_night") == 0) || (strcmp(text_icon, "heavysnowshowers_polartwilight") == 0) || (strcmp(text_icon, "lightsnow") == 0) || (strcmp(text_icon, "heavysnow") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_NEIGE_FORTE_W;
    else
      return RESOURCE_ID_NEIGE_FORTE;
  }
  if (strcmp(text_icon, "fog") == 0 || strcmp(text_icon, "hail") == 0 || (strcmp(text_icon, "50d") == 0) || (strcmp(text_icon, "50n") == 0))
  {
    if ((is_bw_icon) || (!IS_COLOR))
      return RESOURCE_ID_BROUILLARD_W;
    else
      return RESOURCE_ID_BROUILLARD;
  }
  return RESOURCE_ID_BT;
}
int abs(int x)
{
  if (x >= 0)
    return x;
  else
    return -x;
}

static void createdatetext(int day_i)
{

  if (strcmp(pebble_Lang, "en_US") == 0)
  {
    snprintf(day_buffer, sizeof(day_buffer), "%s", weekdayLangEn[day_i]);
    return;
  }

  if (strcmp(pebble_Lang, "fr_FR") == 0)
  {
    snprintf(day_buffer, sizeof(day_buffer), "%s", weekdayLangFr[day_i]);
    return;
  }

  if (strcmp(pebble_Lang, "de_DE") == 0)
  {
    snprintf(day_buffer, sizeof(day_buffer), "%s", weekdayLangDe[day_i]);
    return;
  }

  if (strcmp(pebble_Lang, "es_ES") == 0)
  {
    snprintf(day_buffer, sizeof(day_buffer), "%s", weekdayLangEs[day_i]);
    return;
  }
  // Par defaut, anglais
  snprintf(day_buffer, sizeof(day_buffer), "%s", weekdayLangEn[day_i]);
}

static void layer_update(Layer *me, GContext *ctx)
{

  GBitmap *s_icon;
  graphics_context_set_fill_color(ctx, GColorBlack);
  graphics_fill_rect(ctx, GRect(0, 0, 180, 180), 0, GCornerNone);

  GPoint circle_page = {0, 163};

  // page points
  graphics_context_set_fill_color(ctx, GColorWhite);
  // is_weather_aquired=0;
  if (!is_weather_aquired)
  {

    s_icon = gbitmap_create_with_resource(RESOURCE_ID_BT);

    // Recuperation des données précedentes
    persist_read_string(KEY_TEMPERATURE, weather_temp, sizeof(weather_temp));
    persist_read_string(KEY_WIND_SPEED, wind_speed_val, sizeof(wind_speed_val));
    persist_read_string(KEY_HUMIDITY, humidity, sizeof(humidity));
    persist_read_string(KEY_SUNRISE, sunrise, sizeof(sunrise));
    persist_read_string(KEY_SUNSET, sunset, sizeof(sunset));
    persist_read_string(KEY_TMIN, tmin, sizeof(tmin));
    persist_read_string(KEY_TMAX, tmax, sizeof(tmax));
    persist_read_string(KEY_ICON, icon, sizeof(icon));

    if (strcmp(status, "Contacting phone ...") == 0)
    {
      // On remplit à 33%
      for (int i = 0; i < 6; i++)
      {
        circle_page.x = 10 * i + 65 + PAGE_POINTS_OFFSET;
        graphics_fill_circle(ctx, circle_page, 1);
      }
      for (int i = 0; i < 2; i++)
      {
        circle_page.x = 10 * i + 65 + PAGE_POINTS_OFFSET;
        graphics_fill_circle(ctx, circle_page, 2);
      }
    }
    else if (strcmp(status, "Getting forecast ...") == 0)
    {
      // On remplit à 66%
      for (int i = 0; i < 6; i++)
      {
        circle_page.x = 10 * i + 65 + PAGE_POINTS_OFFSET;
        graphics_fill_circle(ctx, circle_page, 1);
      }
      for (int i = 0; i < 4; i++)
      {
        circle_page.x = 10 * i + 65 + PAGE_POINTS_OFFSET;
        graphics_fill_circle(ctx, circle_page, 2);
      }
    }

    else if (strcmp(status, "Getting position ...") == 0)
    {
      // On remplit à 50%
      for (int i = 0; i < 6; i++)
      {
        circle_page.x = 10 * i + 65 + PAGE_POINTS_OFFSET;
        graphics_fill_circle(ctx, circle_page, 1);
      }
      for (int i = 0; i < 3; i++)
      {
        circle_page.x = 10 * i + 65 + PAGE_POINTS_OFFSET;
        graphics_fill_circle(ctx, circle_page, 2);
      }
    }

    GRect rect_center = {{WIDTH / 2 - 8, 140}, {15, 15}};
    s_icon = gbitmap_create_with_resource(RESOURCE_ID_LOADING);
    graphics_draw_bitmap_in_rect(ctx, s_icon, rect_center);
    gbitmap_destroy(s_icon);

    static char status_text[100];

#if defined(PBL_ROUND)
    GRect rect_temp = {{-23, 19}, {WIDTH, 50}};

    GRect rect_tmax = {{10, 52}, {50, 20}};
    GRect rect_tmin = {{10, 73}, {50, 20}};

    GRect rect_icon = {{22, 22}, {36, 36}};

    GRect rect_location = {{20, 127}, {WIDTH - 40, 20}};

    GRect rect_humidity = {{-23, 73}, {WIDTH, 36}};
    GRect rect_wind = {{-23, 52}, {WIDTH, 36}};
    GRect rect_text_sunrise = {{-23, 103}, {WIDTH, 36}};
    GRect rect_icon_sunrise = {{21, 110}, {48, 20}};
    GRect rect_text_sunset = {{-23, 123}, {WIDTH, 36}};
    GRect rect_icon_sunset = {{21, 130}, {48, 20}};

#else
    GRect rect_temp = {{0, 5}, {WIDTH, 50}};

    GRect rect_tmin = {{-17, 18}, {62, 20}};
    GRect rect_tmax = {{-17, -2}, {62, 20}};

    GRect rect_icon = {{3, 58}, {36, 36}};

    // GRect rect_icon_humidity = { { 3,  50}, { 45, 25 } };
    GRect rect_humidity = {{0, 63}, {WIDTH, 36}};
    GRect rect_wind = {{0, 43}, {WIDTH, 36}};
    GRect rect_text_sunrise = {{0, 98}, {WIDTH, 36}};
    GRect rect_icon_sunrise = {{3, 105}, {48, 20}};
    GRect rect_text_sunset = {{0, 118}, {WIDTH, 36}};
    GRect rect_icon_sunset = {{3, 125}, {48, 20}};

    GRect rect_location = {{2, 125}, {WIDTH - 2, 20}};

#endif

    time_t t = time(NULL);
    struct tm now = *(localtime(&t));

    graphics_context_set_text_color(ctx, GColorWhite);
    snprintf(status_text, sizeof(status_text), "%s %i", weekdayLangEn[now.tm_wday], now.tm_mday);

    //   APP_LOG(APP_LOG_LEVEL_INFO, "location page1 %s", location);

    // draw icon
    int icon_id;
    icon_id = build_icon(icon);

    graphics_context_set_compositing_mode(ctx, GCompOpSet);

    s_icon = gbitmap_create_with_resource(icon_id);
    // graphics_draw_bitmap_in_rect(ctx, s_icon, rect_icon);
    gbitmap_destroy(s_icon);
    s_icon = gbitmap_create_with_resource(RESOURCE_ID_SUNRISE);
    // graphics_draw_bitmap_in_rect(ctx, s_icon, rect_icon_sunrise);
    gbitmap_destroy(s_icon);
    s_icon = gbitmap_create_with_resource(RESOURCE_ID_SUNSET);
    // graphics_draw_bitmap_in_rect(ctx, s_icon, rect_icon_sunset);
    gbitmap_destroy(s_icon);

    // draw temperature
  }

  else
  {

    for (int i = 0; i < 5; i++)
    {
      circle_page.x = 10 * i + 75 + PAGE_POINTS_OFFSET;
      graphics_fill_circle(ctx, circle_page, 2);
    }

    circle_page.x = 10 * (page_nb - 1) + 75 + PAGE_POINTS_OFFSET;
    graphics_fill_circle(ctx, circle_page, 4);

    // page_nb=5;
    if (page_nb == 1)
    {
      static char status_text[100];
#if defined(PBL_ROUND)
      GRect rect_temp = {{-23, 19}, {WIDTH, 50}};

      GRect rect_tmax = {{10, 52}, {50, 20}};
      GRect rect_tmin = {{10, 73}, {50, 20}};

      GRect rect_icon = {{22, 22}, {36, 36}};

      GRect rect_location = {{20, 127}, {WIDTH - 40, 20}};

      GRect rect_humidity = {{-23, 73}, {WIDTH, 36}};
      GRect rect_wind = {{-23, 52}, {WIDTH, 36}};
      GRect rect_text_sunrise = {{-23, 103}, {WIDTH, 36}};
      GRect rect_icon_sunrise = {{21, 110}, {48, 20}};
      GRect rect_text_sunset = {{-23, 123}, {WIDTH, 36}};
      GRect rect_icon_sunset = {{21, 130}, {48, 20}};

#else
      GRect rect_temp = {{0, 5}, {WIDTH, 50}};

      GRect rect_tmin = {{-17, 18}, {62, 20}};
      GRect rect_tmax = {{-17, -2}, {62, 20}};

      GRect rect_icon = {{3, 58}, {36, 36}};

      // GRect rect_icon_humidity = { { 3,  50}, { 45, 25 } };
      GRect rect_humidity = {{0, 63}, {WIDTH, 36}};
      GRect rect_wind = {{0, 43}, {WIDTH, 36}};
      GRect rect_text_sunrise = {{0, 98}, {WIDTH, 36}};
      GRect rect_icon_sunrise = {{3, 105}, {48, 20}};
      GRect rect_text_sunset = {{0, 118}, {WIDTH, 36}};
      GRect rect_icon_sunset = {{3, 125}, {48, 20}};

      GRect rect_location = {{2, 125}, {WIDTH - 2, 20}};

#endif

      time_t t = time(NULL);
      struct tm now = *(localtime(&t));

      graphics_context_set_text_color(ctx, GColorWhite);
      snprintf(status_text, sizeof(status_text), "%s %i", weekdayLangEn[now.tm_wday], now.tm_mday);

      //   APP_LOG(APP_LOG_LEVEL_INFO, "location page1 %s", location);
      // draw icon
      int icon_id;
      icon_id = build_icon(icon);

      graphics_context_set_compositing_mode(ctx, GCompOpSet);

      if (is_weather_aquired)
      {
        s_icon = gbitmap_create_with_resource(icon_id);
        graphics_draw_bitmap_in_rect(ctx, s_icon, rect_icon);
        gbitmap_destroy(s_icon);

        s_icon = gbitmap_create_with_resource(RESOURCE_ID_SUNRISE);
        graphics_draw_bitmap_in_rect(ctx, s_icon, rect_icon_sunrise);
        gbitmap_destroy(s_icon);

        s_icon = gbitmap_create_with_resource(RESOURCE_ID_SUNSET);
        graphics_draw_bitmap_in_rect(ctx, s_icon, rect_icon_sunset);
        gbitmap_destroy(s_icon);
      }
      // draw temperatures

      graphics_draw_text(ctx, weather_temp, fonts_get_system_font(FONT_KEY_BITHAM_30_BLACK), rect_temp, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);

      graphics_draw_text(ctx, location, fonts_get_system_font(FONT_KEY_GOTHIC_14), rect_location, GTextOverflowModeWordWrap,
                         GTextAlignmentCenter, NULL);

#if defined(PBL_ROUND)
      graphics_draw_text(ctx, tmin, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_tmin, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);
      graphics_draw_text(ctx, tmax, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_tmax, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);
#else
      graphics_draw_text(ctx, tmin, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_tmin, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);
      graphics_draw_text(ctx, tmax, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_tmax, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);

#endif

      graphics_draw_text(ctx, sunrise, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_text_sunrise, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);
      graphics_draw_text(ctx, sunset, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_text_sunset, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);

      graphics_draw_text(ctx, wind_speed_val, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_wind, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);

      graphics_draw_text(ctx, humidity, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_humidity, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);
    }

    else if ((page_nb == 4) || (page_nb == 5))
    {
      int index;

      // Pour sauter de 2 en 2 les valeurs à chaque page
      if (page_nb == 4)
      {
        index = -2;
      }

      else if (page_nb == 5)
      {
        index = 0;
      }
      else
      {
        index = 0;
      }

      GBitmap *s_icon;
      int var_weath_ofF_y = WEATHER_OFFSET_Y;
      if ((!is_tapped) && (IS_ROUND))
      {
        var_weath_ofF_y += 10;
      }
      //  is_tapped=true;
      GRect rect_screen = {{0 + WEATHER_OFFSET_X, 0 + var_weath_ofF_y}, {180, 180}};

      GRect rect_h0 = {{6 + WEATHER_OFFSET_X, 116 + var_weath_ofF_y}, {60, 40}};
      GRect rect_h1 = {{37 + WEATHER_OFFSET_X, 116 + var_weath_ofF_y}, {60, 40}};
      GRect rect_h2 = {{68 + WEATHER_OFFSET_X, 116 + var_weath_ofF_y}, {60, 40}};
      GRect rect_h3 = {{97 + WEATHER_OFFSET_X, 116 + var_weath_ofF_y}, {60, 40}};

      GRect rect_wind0 = {{6 + WEATHER_OFFSET_X, 148 + var_weath_ofF_y}, {60, 10}};
      GRect rect_wind1 = {{37 + WEATHER_OFFSET_X, 148 + var_weath_ofF_y}, {60, 10}};
      GRect rect_wind2 = {{68 + WEATHER_OFFSET_X, 148 + var_weath_ofF_y}, {60, 10}};
      GRect rect_wind3 = {{97 + WEATHER_OFFSET_X, 148 + var_weath_ofF_y}, {60, 10}};

      rect_wind0.size.h = 40;
      rect_wind1.size.h = 40;
      rect_wind2.size.h = 40;
      rect_wind3.size.h = 40;

#if defined(PBL_ROUND)

      GRect rect_t1 = {{-28 + WEATHER_OFFSET_X, 54 + var_weath_ofF_y}, {60, 20}};
      GRect rect_t12 = {{-28 + WEATHER_OFFSET_X, 73 + var_weath_ofF_y}, {60, 20}};
      GRect rect_t2 = {{-28 + WEATHER_OFFSET_X, 92 + var_weath_ofF_y}, {60, 20}};
      GRect rect_patch = {{WEATHER_OFFSET_X, 150 + var_weath_ofF_y}, {80, 20}};
#else

      GRect rect_t1 = {{-24 + WEATHER_OFFSET_X, 51 + var_weath_ofF_y}, {60, 20}};
      GRect rect_t12 = {{-24 + WEATHER_OFFSET_X, 73 + var_weath_ofF_y}, {60, 20}};
      GRect rect_t2 = {{-24 + WEATHER_OFFSET_X, 95 + var_weath_ofF_y}, {60, 20}};
      GRect rect_patch = {{WEATHER_OFFSET_X, 150 + var_weath_ofF_y}, {80, 20}};
#endif

      snprintf(temp1, sizeof(temp1), "%i", temps[page_nb - 2 + index]);
      snprintf(temp2, sizeof(temp2), "%i", temps[page_nb - 1 + index]);
      snprintf(temp3, sizeof(temp3), "%i", temps[page_nb + index]);
      snprintf(temp4, sizeof(temp4), "%i", temps[page_nb + 1 + index]);
      snprintf(temp5, sizeof(temp5), "%i", temps[page_nb + 2 + index]);

      char h0_buffer[20] = " ";
      char h1_buffer[20] = " ";
      char h2_buffer[20] = " ";
      char h3_buffer[20] = " ";
      char h4_buffer[20] = " ";

      int i_h0;
      int i_h1;
      int i_h2;
      int i_h3;
      int i_h4;

      int hour_style;

      if (page_nb == 4)
      {
        i_h0 = h0;
        i_h1 = h1;
        i_h2 = h2;
        i_h3 = h3;
        i_h4 = h4;
      }

      else if (page_nb == 5)
      {
        i_h0 = h4;
        i_h1 = h5;
        i_h2 = h6;
        i_h3 = h7;
        i_h4 = h8;
      }
      else
      {
        i_h0 = -1;
        i_h1 = -1;
        i_h2 = -1;
        i_h3 = -1;
        i_h4 = -1;
      }

      // openweather diplay in 24 hours mode
      if (clock_is_24h_style())
        hour_style = 24;
      else
        hour_style = 12;

      snprintf(h0_buffer, sizeof(h0_buffer), "%i", i_h0 % hour_style);
      snprintf(h1_buffer, sizeof(h1_buffer), "%i", i_h1 % hour_style);
      snprintf(h2_buffer, sizeof(h2_buffer), "%i", i_h2 % hour_style);
      snprintf(h3_buffer, sizeof(h3_buffer), "%i", i_h3 % hour_style);
      snprintf(h4_buffer, sizeof(h4_buffer), "%i", i_h4 % hour_style);

      graphics_context_set_text_color(ctx, GColorWhite);

      // pluie
      int max_rain = MAXRAIN;
      graphics_context_set_fill_color(ctx, RAIN_COLOR);

      for (int i_segments = 0; i_segments < 12; i_segments++)
      {

        int rain_pixel = 45 * rains[(page_nb - 2 + index) * 3 + i_segments] / max_rain;

        if (rain_pixel > 45)
        {
          rain_pixel = 45;
        }

        if (IS_COLOR)
        {
          graphics_fill_rect(ctx, GRect(37 + WEATHER_OFFSET_X + i_segments * 10, 76 + 45 - rain_pixel + var_weath_ofF_y, 10, rain_pixel), 0, GCornerNone);
        }

        else
        {
          for (int i = 0; i < 10; i = i + 2)
          {
            graphics_fill_rect(ctx, GRect(37 + WEATHER_OFFSET_X + i + i_segments * 10, 76 + 45 - rain_pixel + var_weath_ofF_y, 1, rain_pixel), 0, GCornerNone);
          }
        }
      }

      int ttmin = temps[0];
      int ttmax = temps[0];

      for (int k = 0; k < 9; k++)
      {
        if (ttmin >= temps[k])
        {
          ttmin = temps[k];
        }

        if (ttmax < temps[k])
        {
          ttmax = temps[k];
        }
      }

      // APP_LOG(APP_LOG_LEVEL_INFO, "ttmin %i ttmax %i", ttmin,  ttmax);

      int echelle = 1;
      while (ttmin < ttmax - echelle * 3)
      {
        echelle++;
      }
      //  APP_LOG(APP_LOG_LEVEL_INFO, "echelle %i",echelle);
      static char t1[20];
      static char t12[20];
      static char t2[20];
      int tmoy = (int)((ttmax + ttmin) / 2);

      snprintf(t1, sizeof(t1), "%i", ttmax);
      snprintf(t12, sizeof(t12), "%i", tmoy);

      snprintf(t2, sizeof(t2), "%i", ttmin);

      // snprintf(t2, sizeof(t2), "%i", ttmax-echelle*2);

      graphics_context_set_text_color(ctx, GColorWhite);
      graphics_draw_text(ctx, t1, statusfontdate, rect_t1, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);
      graphics_draw_text(ctx, t12, statusfontdate, rect_t12, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);
      graphics_draw_text(ctx, t2, statusfontdate, rect_t2, GTextOverflowModeWordWrap,
                         GTextAlignmentRight, NULL);

      float f;
      f = 76 + (ttmax - temps[page_nb - 2 + index]) * 15 / echelle;
      int y1 = (int)f;
      f = 76 + (ttmax - temps[page_nb - 1 + index]) * 15 / echelle;
      int y2 = (int)f;
      f = 76 + (ttmax - temps[page_nb + index]) * 15 / echelle;
      int y3 = (int)f;
      f = 76 + (ttmax - temps[page_nb + 1 + index]) * 15 / echelle;
      int y4 = (int)f;
      f = 76 + (ttmax - temps[page_nb + 2 + index]) * 15 / echelle;
      int y5 = (int)f;

      graphics_context_set_stroke_width(ctx, LINE_THICK);
      int freezing_temp;
      if (is_metric)
        freezing_temp = 0;
      else
        freezing_temp = 32;

      // Temperature
      int decallage_y = -7;
      if ((temps[page_nb - 2 + index] < freezing_temp) && (temps[page_nb - 1 + index] < freezing_temp))
        graphics_context_set_stroke_color(ctx, BLUE_LINE);
      else
        graphics_context_set_stroke_color(ctx, RED_LINE);

      graphics_draw_line(ctx, GPoint(37 + WEATHER_OFFSET_X, y1 + var_weath_ofF_y + decallage_y), GPoint(67 + WEATHER_OFFSET_X, y2 + var_weath_ofF_y + decallage_y));

      if ((temps[page_nb - 1 + index] < freezing_temp) && (temps[page_nb + index] < freezing_temp))
        graphics_context_set_stroke_color(ctx, BLUE_LINE);
      else
        graphics_context_set_stroke_color(ctx, RED_LINE);

      graphics_draw_line(ctx, GPoint(67 + WEATHER_OFFSET_X, y2 + var_weath_ofF_y + decallage_y), GPoint(97 + WEATHER_OFFSET_X, y3 + var_weath_ofF_y + decallage_y));

      if ((temps[page_nb + index] < freezing_temp) && (temps[page_nb + 1 + index] < freezing_temp))
        graphics_context_set_stroke_color(ctx, BLUE_LINE);
      else
        graphics_context_set_stroke_color(ctx, RED_LINE);

      graphics_draw_line(ctx, GPoint(97 + WEATHER_OFFSET_X, y3 + var_weath_ofF_y + decallage_y), GPoint(127 + WEATHER_OFFSET_X, y4 + var_weath_ofF_y + decallage_y));

      if ((temps[page_nb + 1 + index] < freezing_temp) && (temps[page_nb + 2 + index] < freezing_temp))
        graphics_context_set_stroke_color(ctx, BLUE_LINE);
      else
        graphics_context_set_stroke_color(ctx, RED_LINE);

      graphics_draw_line(ctx, GPoint(127 + WEATHER_OFFSET_X, y4 + var_weath_ofF_y + decallage_y), GPoint(157 + WEATHER_OFFSET_X, y5 + var_weath_ofF_y + decallage_y));

      GRect rect_icon1 = {{67 - 18 + WEATHER_OFFSET_X, 28 + var_weath_ofF_y}, {36, 36}};
      GRect rect_icon2 = {{97 - 18 + WEATHER_OFFSET_X, 28 + var_weath_ofF_y}, {36, 36}};
      GRect rect_icon3 = {{127 - 18 + WEATHER_OFFSET_X, 28 + var_weath_ofF_y}, {36, 36}};

      graphics_context_set_compositing_mode(ctx, GCompOpSet);

      if (!IS_COLOR)
      {
        s_icon = gbitmap_create_with_resource(RESOURCE_ID_TABLE_OG);
        graphics_draw_bitmap_in_rect(ctx, s_icon, rect_screen);
        gbitmap_destroy(s_icon);
      }
      else
      {
        s_icon = gbitmap_create_with_resource(RESOURCE_ID_TABLE);
        graphics_draw_bitmap_in_rect(ctx, s_icon, rect_screen);
        gbitmap_destroy(s_icon);
      }

      graphics_context_set_fill_color(ctx, GColorBlack);
      graphics_fill_rect(ctx, rect_patch, 0, GCornerNone);

      graphics_draw_text(ctx, h0_buffer, statusfontdate, rect_h0, GTextOverflowModeWordWrap,
                         GTextAlignmentCenter, NULL);

      graphics_draw_text(ctx, h1_buffer, statusfontdate, rect_h1, GTextOverflowModeWordWrap,
                         GTextAlignmentCenter, NULL);
      graphics_draw_text(ctx, h2_buffer, statusfontdate, rect_h2, GTextOverflowModeWordWrap,
                         GTextAlignmentCenter, NULL);
      graphics_draw_text(ctx, h3_buffer, statusfontdate, rect_h3, GTextOverflowModeWordWrap,
                         GTextAlignmentCenter, NULL);

      graphics_draw_text(ctx, winds[page_nb - 2 + index], statusfontsmall, rect_wind0, GTextOverflowModeWordWrap,
                         GTextAlignmentCenter, NULL);

      graphics_draw_text(ctx, winds[page_nb - 1 + index], statusfontsmall, rect_wind1, GTextOverflowModeWordWrap,
                         GTextAlignmentCenter, NULL);

      graphics_draw_text(ctx, winds[page_nb + index], statusfontsmall, rect_wind2, GTextOverflowModeWordWrap,
                         GTextAlignmentCenter, NULL);
      graphics_draw_text(ctx, winds[page_nb + 1 + index], statusfontsmall, rect_wind3, GTextOverflowModeWordWrap,
                         GTextAlignmentCenter, NULL);

      int ic1 = build_icon(icons[page_nb - 2 + index]);
      int ic2 = build_icon(icons[page_nb - 1 + index]);
      int ic3 = build_icon(icons[page_nb + index]);

      s_icon = gbitmap_create_with_resource(ic1);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_icon1);
      gbitmap_destroy(s_icon);

      s_icon = gbitmap_create_with_resource(ic2);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_icon2);
      gbitmap_destroy(s_icon);

      s_icon = gbitmap_create_with_resource(ic3);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_icon3);
      gbitmap_destroy(s_icon);
    }

    else if (page_nb == 2)
    {

#if defined(PBL_ROUND)

      GRect rect_day1 = {{0, -5}, {WIDTH, 36}};
      GRect rect_day2 = {{0, 78}, {WIDTH, 36}};

      GRect rect_day1_temp = {{25, 24}, {57, 36}};
      GRect rect_day2_temp = {{25, 105}, {57, 36}};

      GRect rect_day1_icon = {{WIDTH / 2 - 20, 35}, {36, 36}};
      GRect rect_day2_icon = {{WIDTH / 2 - 20, 116}, {36, 36}};

      GRect rect_moon1_icon = {{115, 40}, {36, 100}};
      GRect rect_moon2_icon = {{115, 121}, {36, 36}};

      GRect rect_rain1 = {{WIDTH - 44 + 15, 40}, {9, 24}};
      GRect rect_rain2 = {{WIDTH - 44 + 15, 122}, {9, 24}};
      int offsetb1x = 68;
      int offsetb1y = 1;
      int offsetb2x = 68;
      int offsetb2y = 44;

#else
      int offsetb1x = 17;
      int offsetb1y = 1;
      int offsetb2x = 17;
      int offsetb2y = 44;

      GRect rect_day1 = {{0, -5}, {WIDTH, 36}};
      GRect rect_day2 = {{0, 78}, {WIDTH, 36}};

      GRect rect_day1_temp = {{2, 24}, {57, 36}};
      GRect rect_day2_temp = {{2, 105}, {57, 36}};

      GRect rect_day1_icon = {{WIDTH / 2 - 20, 35}, {36, 36}};
      GRect rect_day2_icon = {{WIDTH / 2 - 20, 116}, {36, 36}};

      GRect rect_moon1_icon = {{118, 40}, {36, 100}};
      GRect rect_moon2_icon = {{118, 121}, {36, 36}};

      GRect rect_rain1 = {{WIDTH - 44, 40}, {9, 24}};
      GRect rect_rain2 = {{WIDTH - 44, 122}, {9, 24}};

#endif
      int ic1 = build_icon(day2_icon);
      int ic2 = build_icon(day3_icon);

      s_icon = gbitmap_create_with_resource(ic1);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_day1_icon);
      gbitmap_destroy(s_icon);

      s_icon = gbitmap_create_with_resource(ic2);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_day2_icon);
      gbitmap_destroy(s_icon);

      // Remplissage du bocal de pluie
      graphics_context_set_fill_color(ctx, GColorVividCerulean);
      graphics_fill_rect(ctx, GRect(85 + offsetb1x, 62 - dayr[1] + offsetb1y, 5, dayr[1]), 0, GCornerNone);

      graphics_context_set_fill_color(ctx, GColorVividCerulean);
      graphics_fill_rect(ctx, GRect(85 + offsetb2x, 102 - dayr[2] + offsetb2y, 5, dayr[2]), 0, GCornerNone);

      // Affichage de la barre de vent
      graphics_context_set_stroke_color(ctx, GColorWhite);
      graphics_draw_line(ctx, GPoint(79 + offsetb1x, 62 - dayp[1] + offsetb1y), GPoint(81 + offsetb1x, 62 - dayp[1] + offsetb1y));
      graphics_draw_line(ctx, GPoint(81 + offsetb1x, 62 - dayp[1] + offsetb1y), GPoint(81 + offsetb1x, 62 + offsetb1y));

      graphics_draw_line(ctx, GPoint(79 + offsetb2x, 101 - dayp[2] + offsetb2y), GPoint(81 + offsetb2x, 101 - dayp[2] + offsetb2y));
      graphics_draw_line(ctx, GPoint(81 + offsetb2x, 101 - dayp[2] + offsetb2y), GPoint(81 + offsetb2x, 101 + offsetb2y));

      GFont moon_font = fonts_load_custom_font(resource_get_handle(RESOURCE_ID_FONT_BOLD_MOON_25));
      if ((moonPhase[1] >= 0) && (moonPhase[1] < 26))
        graphics_draw_text(ctx, transPhase[moonPhase[1]], moon_font, rect_moon1_icon, GTextOverflowModeWordWrap,
                           GTextAlignmentLeft, NULL);
      if ((moonPhase[2] >= 0) && (moonPhase[2] < 26))
        graphics_draw_text(ctx, transPhase[moonPhase[2]], moon_font, rect_moon2_icon, GTextOverflowModeWordWrap,
                           GTextAlignmentLeft, NULL);

      graphics_draw_text(ctx, day2_temp, fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD), rect_day1_temp, GTextOverflowModeWordWrap,
                         GTextAlignmentLeft, NULL);
      graphics_draw_text(ctx, day3_temp, fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD), rect_day2_temp, GTextOverflowModeWordWrap,
                         GTextAlignmentLeft, NULL);

      if ((day2 >= 0) && (day2 < 7))
      {
        createdatetext(day2);
        graphics_draw_text(ctx, day_buffer, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_day1, GTextOverflowModeWordWrap,
                           GTextAlignmentCenter, NULL);
      }
      if ((day3 >= 0) && (day3 < 7))
      {
        createdatetext(day3);
        graphics_draw_text(ctx, day_buffer, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_day2, GTextOverflowModeWordWrap,
                           GTextAlignmentCenter, NULL);
      }

      graphics_context_set_compositing_mode(ctx, GCompOpSet);

      // Affichage du bocal vide
      s_icon = gbitmap_create_with_resource(RESOURCE_ID_RAIN_DAY_BACK_OG);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_rain1);
      gbitmap_destroy(s_icon);
      s_icon = gbitmap_create_with_resource(RESOURCE_ID_RAIN_DAY_BACK_OG);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_rain2);
      gbitmap_destroy(s_icon);
    }

    else if (page_nb == 3)
    {

#if defined(PBL_ROUND)
      GRect rect_day1 = {{0, -5}, {WIDTH, 36}};
      GRect rect_day2 = {{0, 78}, {WIDTH, 36}};

      GRect rect_day1_temp = {{25, 24}, {57, 36}};
      GRect rect_day2_temp = {{25, 105}, {57, 36}};

      GRect rect_day1_icon = {{WIDTH / 2 - 20, 35}, {36, 36}};
      GRect rect_day2_icon = {{WIDTH / 2 - 20, 116}, {36, 36}};

      GRect rect_moon1_icon = {{115, 40}, {36, 100}};
      GRect rect_moon2_icon = {{115, 121}, {36, 36}};

      GRect rect_rain1 = {{WIDTH - 44 + 15, 40}, {9, 24}};
      GRect rect_rain2 = {{WIDTH - 44 + 15, 122}, {9, 24}};

#else

      GRect rect_day1 = {{0, -5}, {WIDTH, 36}};
      GRect rect_day2 = {{0, 78}, {WIDTH, 36}};

      GRect rect_day1_temp = {{2, 24}, {57, 36}};
      GRect rect_day2_temp = {{2, 105}, {57, 36}};

      GRect rect_day1_icon = {{WIDTH / 2 - 20, 35}, {36, 36}};
      GRect rect_day2_icon = {{WIDTH / 2 - 20, 116}, {36, 36}};

      GRect rect_moon1_icon = {{118, 40}, {36, 100}};
      GRect rect_moon2_icon = {{118, 121}, {36, 36}};

      GRect rect_rain1 = {{WIDTH - 44, 40}, {9, 24}};
      GRect rect_rain2 = {{WIDTH - 44, 122}, {9, 24}};

#endif
      int ic1 = build_icon(day4_icon);
      int ic2 = build_icon(day5_icon);

      s_icon = gbitmap_create_with_resource(ic1);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_day1_icon);
      gbitmap_destroy(s_icon);

      s_icon = gbitmap_create_with_resource(ic2);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_day2_icon);
      gbitmap_destroy(s_icon);

      int offsetb1x = 17;
      int offsetb1y = 1;
      int offsetb2x = 17;
      int offsetb2y = 44;

      // Remplissage du bocal de pluie
      graphics_context_set_fill_color(ctx, GColorVividCerulean);
      graphics_fill_rect(ctx, GRect(85 + offsetb1x, 62 - dayr[3] + offsetb1y, 5, dayr[3]), 0, GCornerNone);

      graphics_context_set_fill_color(ctx, GColorVividCerulean);
      graphics_fill_rect(ctx, GRect(85 + offsetb2x, 102 - dayr[4] + offsetb2y, 5, dayr[4]), 0, GCornerNone);

      // Affichage de la barre de vent
      graphics_context_set_stroke_color(ctx, GColorWhite);
      graphics_draw_line(ctx, GPoint(79 + offsetb1x, 62 - dayp[3] + offsetb1y), GPoint(81 + offsetb1x, 62 - dayp[3] + offsetb1y));
      graphics_draw_line(ctx, GPoint(81 + offsetb1x, 62 - dayp[3] + offsetb1y), GPoint(81 + offsetb1x, 62 + offsetb1y));

      graphics_draw_line(ctx, GPoint(79 + offsetb2x, 101 - dayp[4] + offsetb2y), GPoint(81 + offsetb2x, 101 - dayp[4] + offsetb2y));
      graphics_draw_line(ctx, GPoint(81 + offsetb2x, 101 - dayp[4] + offsetb2y), GPoint(81 + offsetb2x, 101 + offsetb2y));

      GFont moon_font = fonts_load_custom_font(resource_get_handle(RESOURCE_ID_FONT_BOLD_MOON_25));
      if ((moonPhase[3] >= 0) && (moonPhase[3] < 26))
        graphics_draw_text(ctx, transPhase[moonPhase[3]], moon_font, rect_moon1_icon, GTextOverflowModeWordWrap,
                           GTextAlignmentLeft, NULL);
      if ((moonPhase[4] >= 0) && (moonPhase[4] < 26))
        graphics_draw_text(ctx, transPhase[moonPhase[4]], moon_font, rect_moon2_icon, GTextOverflowModeWordWrap,
                           GTextAlignmentLeft, NULL);

      graphics_draw_text(ctx, day4_temp, fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD), rect_day1_temp, GTextOverflowModeWordWrap,
                         GTextAlignmentLeft, NULL);
      graphics_draw_text(ctx, day5_temp, fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD), rect_day2_temp, GTextOverflowModeWordWrap,
                         GTextAlignmentLeft, NULL);

      if ((day4 >= 0) && (day4 < 7))
      {
        createdatetext(day4);
        graphics_draw_text(ctx, day_buffer, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_day1, GTextOverflowModeWordWrap,
                           GTextAlignmentCenter, NULL);
      }
      if ((day5 >= 0) && (day5 < 7))
      {
        createdatetext(day5);
        graphics_draw_text(ctx, day_buffer, fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD), rect_day2, GTextOverflowModeWordWrap,
                           GTextAlignmentCenter, NULL);
      }

      graphics_context_set_compositing_mode(ctx, GCompOpSet);

      // Affichage du bocal vide
      s_icon = gbitmap_create_with_resource(RESOURCE_ID_RAIN_DAY_BACK_OG);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_rain1);
      gbitmap_destroy(s_icon);
      s_icon = gbitmap_create_with_resource(RESOURCE_ID_RAIN_DAY_BACK_OG);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_rain2);
      gbitmap_destroy(s_icon);
    }
  }
  if (is_menu)
  {
    if (IS_ROUND)
    {
      GRect rect_menu = {{0, 0}, {WIDTH, HEIGHT}};
      s_icon = gbitmap_create_with_resource(RESOURCE_ID_BACK_SELECTION_ROUND);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_menu);
      gbitmap_destroy(s_icon);
    }
    else
    {
      GRect rect_menu = {{0, 0}, {WIDTH, HEIGHT}};
      s_icon = gbitmap_create_with_resource(RESOURCE_ID_BACK_SELECTION_SQUARE);
      graphics_draw_bitmap_in_rect(ctx, s_icon, rect_menu);
      gbitmap_destroy(s_icon);
    }
  }
}

static void inbox_received_callback(DictionaryIterator *iterator, void *context)
{

  Tuple *status_tuple = dict_find(iterator, KEY_STATUS);

  Tuple *graph_tuple = dict_find(iterator, KEY_GRAPH);

  // Read tuples for data
  Tuple *temp_tuple = dict_find(iterator, KEY_TEMPERATURE);
  Tuple *wind_speed_tuple = dict_find(iterator, KEY_WIND_SPEED);
  Tuple *tmin_tuple = dict_find(iterator, KEY_TMIN);
  Tuple *tmax_tuple = dict_find(iterator, KEY_TMAX);
  Tuple *icon_tuple = dict_find(iterator, KEY_ICON);
  Tuple *h0_tuple = dict_find(iterator, KEY_FORECAST_H0);
  Tuple *h1_tuple = dict_find(iterator, KEY_FORECAST_H1);
  Tuple *h2_tuple = dict_find(iterator, KEY_FORECAST_H2);
  Tuple *h3_tuple = dict_find(iterator, KEY_FORECAST_H3);
  Tuple *h4_tuple = dict_find(iterator, KEY_FORECAST_H4);
  Tuple *h5_tuple = dict_find(iterator, KEY_FORECAST_H5);
  Tuple *h6_tuple = dict_find(iterator, KEY_FORECAST_H6);
  Tuple *h7_tuple = dict_find(iterator, KEY_FORECAST_H7);
  Tuple *h8_tuple = dict_find(iterator, KEY_FORECAST_H8);
  Tuple *sunrise_tuple = dict_find(iterator, KEY_SUNRISE);
  Tuple *sunset_tuple = dict_find(iterator, KEY_SUNSET);

  Tuple *humidity_tuple = dict_find(iterator, KEY_HUMIDITY);
  Tuple *wind0_tuple = dict_find(iterator, KEY_FORECAST_WIND0);
  Tuple *wind1_tuple = dict_find(iterator, KEY_FORECAST_WIND1);
  Tuple *wind2_tuple = dict_find(iterator, KEY_FORECAST_WIND2);
  Tuple *wind3_tuple = dict_find(iterator, KEY_FORECAST_WIND3);
  Tuple *wind4_tuple = dict_find(iterator, KEY_FORECAST_WIND4);
  Tuple *wind5_tuple = dict_find(iterator, KEY_FORECAST_WIND5);
  Tuple *wind6_tuple = dict_find(iterator, KEY_FORECAST_WIND6);
  Tuple *wind7_tuple = dict_find(iterator, KEY_FORECAST_WIND7);
  Tuple *wind8_tuple = dict_find(iterator, KEY_FORECAST_WIND8);

  Tuple *icon4_tuple = dict_find(iterator, KEY_FORECAST_ICON4);
  Tuple *icon5_tuple = dict_find(iterator, KEY_FORECAST_ICON5);
  Tuple *icon6_tuple = dict_find(iterator, KEY_FORECAST_ICON6);
  Tuple *icon7_tuple = dict_find(iterator, KEY_FORECAST_ICON7);
  Tuple *location_tuple = dict_find(iterator, KEY_LOCATION);
  Tuple *temp1_tuple = dict_find(iterator, KEY_FORECAST_TEMP1);
  Tuple *temp2_tuple = dict_find(iterator, KEY_FORECAST_TEMP2);
  Tuple *temp3_tuple = dict_find(iterator, KEY_FORECAST_TEMP3);
  Tuple *temp4_tuple = dict_find(iterator, KEY_FORECAST_TEMP4);
  Tuple *temp5_tuple = dict_find(iterator, KEY_FORECAST_TEMP5);
  Tuple *temp6_tuple = dict_find(iterator, KEY_FORECAST_TEMP6);
  Tuple *temp7_tuple = dict_find(iterator, KEY_FORECAST_TEMP7);
  Tuple *temp8_tuple = dict_find(iterator, KEY_FORECAST_TEMP8);
  Tuple *temp9_tuple = dict_find(iterator, KEY_FORECAST_TEMP9);
  Tuple *icon1_tuple = dict_find(iterator, KEY_FORECAST_ICON1);
  Tuple *icon2_tuple = dict_find(iterator, KEY_FORECAST_ICON2);
  Tuple *icon3_tuple = dict_find(iterator, KEY_FORECAST_ICON3);
  Tuple *rain1_tuple = dict_find(iterator, KEY_FORECAST_RAIN1);
  Tuple *rain2_tuple = dict_find(iterator, KEY_FORECAST_RAIN2);
  Tuple *rain3_tuple = dict_find(iterator, KEY_FORECAST_RAIN3);
  Tuple *rain4_tuple = dict_find(iterator, KEY_FORECAST_RAIN4);
  Tuple *rain5_tuple = dict_find(iterator, KEY_FORECAST_RAIN5);
  Tuple *rain6_tuple = dict_find(iterator, KEY_FORECAST_RAIN6);
  Tuple *rain7_tuple = dict_find(iterator, KEY_FORECAST_RAIN7);
  Tuple *rain8_tuple = dict_find(iterator, KEY_FORECAST_RAIN8);
  Tuple *rain11_tuple = dict_find(iterator, KEY_FORECAST_RAIN11);
  Tuple *rain12_tuple = dict_find(iterator, KEY_FORECAST_RAIN12);
  Tuple *rain21_tuple = dict_find(iterator, KEY_FORECAST_RAIN21);
  Tuple *rain22_tuple = dict_find(iterator, KEY_FORECAST_RAIN22);
  Tuple *rain31_tuple = dict_find(iterator, KEY_FORECAST_RAIN31);
  Tuple *rain32_tuple = dict_find(iterator, KEY_FORECAST_RAIN32);
  Tuple *rain41_tuple = dict_find(iterator, KEY_FORECAST_RAIN41);
  Tuple *rain42_tuple = dict_find(iterator, KEY_FORECAST_RAIN42);
  Tuple *rain51_tuple = dict_find(iterator, KEY_FORECAST_RAIN51);
  Tuple *rain52_tuple = dict_find(iterator, KEY_FORECAST_RAIN52);
  Tuple *rain61_tuple = dict_find(iterator, KEY_FORECAST_RAIN61);
  Tuple *rain62_tuple = dict_find(iterator, KEY_FORECAST_RAIN62);
  Tuple *rain71_tuple = dict_find(iterator, KEY_FORECAST_RAIN71);
  Tuple *rain72_tuple = dict_find(iterator, KEY_FORECAST_RAIN72);
  Tuple *rain81_tuple = dict_find(iterator, KEY_FORECAST_RAIN81);
  Tuple *rain82_tuple = dict_find(iterator, KEY_FORECAST_RAIN82);
  Tuple *day1_tuple = dict_find(iterator, KEY_DAY1);
  Tuple *day2_tuple = dict_find(iterator, KEY_DAY2);
  Tuple *day3_tuple = dict_find(iterator, KEY_DAY3);
  Tuple *day4_tuple = dict_find(iterator, KEY_DAY4);
  Tuple *day5_tuple = dict_find(iterator, KEY_DAY5);
  Tuple *day6_tuple = dict_find(iterator, KEY_DAY6);

  Tuple *day1r_tuple = dict_find(iterator, KEY_DAY1R);
  Tuple *day2r_tuple = dict_find(iterator, KEY_DAY2R);
  Tuple *day3r_tuple = dict_find(iterator, KEY_DAY3R);
  Tuple *day4r_tuple = dict_find(iterator, KEY_DAY4R);
  Tuple *day5r_tuple = dict_find(iterator, KEY_DAY5R);
  Tuple *day6r_tuple = dict_find(iterator, KEY_DAY6R);

  Tuple *day1p_tuple = dict_find(iterator, KEY_DAY1P);
  Tuple *day2p_tuple = dict_find(iterator, KEY_DAY2P);
  Tuple *day3p_tuple = dict_find(iterator, KEY_DAY3P);
  Tuple *day4p_tuple = dict_find(iterator, KEY_DAY4P);
  Tuple *day5p_tuple = dict_find(iterator, KEY_DAY5P);
  Tuple *day6p_tuple = dict_find(iterator, KEY_DAY6P);

  Tuple *day1_temp_tuple = dict_find(iterator, KEY_DAY1_TEMP);
  Tuple *day2_temp_tuple = dict_find(iterator, KEY_DAY2_TEMP);
  Tuple *day3_temp_tuple = dict_find(iterator, KEY_DAY3_TEMP);
  Tuple *day4_temp_tuple = dict_find(iterator, KEY_DAY4_TEMP);
  Tuple *day5_temp_tuple = dict_find(iterator, KEY_DAY5_TEMP);
  Tuple *day6_temp_tuple = dict_find(iterator, KEY_DAY6_TEMP);
  Tuple *day1_icon_tuple = dict_find(iterator, KEY_DAY1_ICON);
  Tuple *day2_icon_tuple = dict_find(iterator, KEY_DAY2_ICON);
  Tuple *day3_icon_tuple = dict_find(iterator, KEY_DAY3_ICON);
  Tuple *day4_icon_tuple = dict_find(iterator, KEY_DAY4_ICON);
  Tuple *day5_icon_tuple = dict_find(iterator, KEY_DAY5_ICON);
  Tuple *day6_icon_tuple = dict_find(iterator, KEY_DAY6_ICON);

  Tuple *moonPhase1_tuple = dict_find(iterator, KEY_MOONPHASE1);
  Tuple *moonPhase2_tuple = dict_find(iterator, KEY_MOONPHASE2);
  Tuple *moonPhase3_tuple = dict_find(iterator, KEY_MOONPHASE3);
  Tuple *moonPhase4_tuple = dict_find(iterator, KEY_MOONPHASE4);
  Tuple *moonPhase5_tuple = dict_find(iterator, KEY_MOONPHASE5);
  Tuple *moonPhase6_tuple = dict_find(iterator, KEY_MOONPHASE6);

  if (status_tuple)
  {
    snprintf(status, sizeof(status), "%s", status_tuple->value->cstring);
    layer_mark_dirty(layer);
    //  psleep(2000);
  }

  // If all data is available, use it

  if (temp_tuple && graph_tuple && tmin_tuple && tmax_tuple && h1_tuple && h2_tuple && h3_tuple && wind1_tuple && wind2_tuple && wind3_tuple && location_tuple && temp1_tuple && temp1_tuple && temp2_tuple && temp3_tuple && temp4_tuple && temp5_tuple && icon1_tuple && icon2_tuple && icon3_tuple && rain1_tuple && rain2_tuple && rain3_tuple && rain4_tuple && temp6_tuple && temp7_tuple && temp8_tuple && temp9_tuple && h4_tuple && h5_tuple && h6_tuple && h7_tuple && rain5_tuple && rain6_tuple && rain7_tuple && rain8_tuple && icon4_tuple && icon5_tuple && icon6_tuple && icon7_tuple && wind4_tuple && wind5_tuple && wind6_tuple && wind7_tuple && day1_tuple && day2_tuple && day3_tuple && day1_icon_tuple && day2_icon_tuple && day3_icon_tuple && KEY_DAY1R && KEY_DAY2R && KEY_DAY3R && KEY_DAY4R && KEY_DAY5R && KEY_DAY6R)
  {

    graph = graph_tuple->value->int32;
    // APP_LOG(APP_LOG_LEVEL_DEBUG,"c++ graph %d", graph);

    snprintf(weather_temp, sizeof(weather_temp), "%s", temp_tuple->value->cstring);

    snprintf(tmin, sizeof(tmin), "%s", tmin_tuple->value->cstring);

    snprintf(tmax, sizeof(tmax), "%s", tmax_tuple->value->cstring);

    snprintf(location, sizeof(location), "%s", location_tuple->value->cstring);

    snprintf(sunrise, sizeof(sunrise), "%s", sunrise_tuple->value->cstring);

    snprintf(sunset, sizeof(sunset), "%s", sunset_tuple->value->cstring);

    h0 = (int)h0_tuple->value->int32;
    h1 = (int)h1_tuple->value->int32;
    h2 = (int)h2_tuple->value->int32;
    h3 = (int)h3_tuple->value->int32;
    h4 = (int)h4_tuple->value->int32;
    h5 = (int)h5_tuple->value->int32;
    h6 = (int)h6_tuple->value->int32;
    h7 = (int)h7_tuple->value->int32;
    h8 = (int)h8_tuple->value->int32;
    snprintf(icon, sizeof(icon), "%s", icon_tuple->value->cstring);

    // APP_LOG(APP_LOG_LEVEL_DEBUG,"h0, %d",h0);

    snprintf(icons[0], sizeof(icons[0]), "%s", icon1_tuple->value->cstring);
    snprintf(icons[1], sizeof(icons[1]), "%s", icon2_tuple->value->cstring);
    snprintf(icons[2], sizeof(icons[2]), "%s", icon3_tuple->value->cstring);
    snprintf(icons[3], sizeof(icons[3]), "%s", icon4_tuple->value->cstring);
    snprintf(icons[4], sizeof(icons[4]), "%s", icon5_tuple->value->cstring);
    snprintf(icons[5], sizeof(icons[5]), "%s", icon6_tuple->value->cstring);
    snprintf(icons[6], sizeof(icons[6]), "%s", icon7_tuple->value->cstring);

    snprintf(day1_icon, sizeof(day1_icon), "%s", day1_icon_tuple->value->cstring);
    snprintf(day2_icon, sizeof(day2_icon), "%s", day2_icon_tuple->value->cstring);
    snprintf(day3_icon, sizeof(day3_icon), "%s", day3_icon_tuple->value->cstring);
    snprintf(day4_icon, sizeof(day4_icon), "%s", day4_icon_tuple->value->cstring);
    snprintf(day5_icon, sizeof(day5_icon), "%s", day5_icon_tuple->value->cstring);
    snprintf(day6_icon, sizeof(day6_icon), "%s", day6_icon_tuple->value->cstring);

    day1 = (int)day1_tuple->value->int32;
    day2 = (int)day2_tuple->value->int32;
    day3 = (int)day3_tuple->value->int32;
    day4 = (int)day4_tuple->value->int32;
    day5 = (int)day5_tuple->value->int32;
    day6 = (int)day6_tuple->value->int32;

    snprintf(day1_temp, sizeof(day1_temp), "%s", day1_temp_tuple->value->cstring);
    snprintf(day2_temp, sizeof(day2_temp), "%s", day2_temp_tuple->value->cstring);
    snprintf(day3_temp, sizeof(day3_temp), "%s", day3_temp_tuple->value->cstring);
    snprintf(day4_temp, sizeof(day4_temp), "%s", day4_temp_tuple->value->cstring);
    snprintf(day5_temp, sizeof(day5_temp), "%s", day5_temp_tuple->value->cstring);
    snprintf(day6_temp, sizeof(day6_temp), "%s", day6_temp_tuple->value->cstring);

    rains[0] = (int)rain1_tuple->value->int32;
    rains[1] = (int)rain11_tuple->value->int32;
    rains[2] = (int)rain12_tuple->value->int32;
    rains[3] = (int)rain2_tuple->value->int32;
    rains[4] = (int)rain21_tuple->value->int32;
    rains[5] = (int)rain22_tuple->value->int32;
    rains[6] = (int)rain3_tuple->value->int32;
    rains[7] = (int)rain31_tuple->value->int32;
    rains[8] = (int)rain32_tuple->value->int32;
    rains[9] = (int)rain4_tuple->value->int32;
    rains[10] = (int)rain41_tuple->value->int32;
    rains[11] = (int)rain42_tuple->value->int32;
    rains[12] = (int)rain5_tuple->value->int32;
    rains[13] = (int)rain51_tuple->value->int32;
    rains[14] = (int)rain52_tuple->value->int32;
    rains[15] = (int)rain6_tuple->value->int32;
    rains[16] = (int)rain61_tuple->value->int32;
    rains[17] = (int)rain62_tuple->value->int32;
    rains[18] = (int)rain7_tuple->value->int32;
    rains[19] = (int)rain71_tuple->value->int32;
    rains[20] = (int)rain72_tuple->value->int32;
    rains[21] = (int)rain8_tuple->value->int32;
    rains[22] = (int)rain81_tuple->value->int32;
    rains[23] = (int)rain82_tuple->value->int32;
    tmin_val = (int)tmin_tuple->value->int32;
    tmax_val = (int)tmax_tuple->value->int32;

    snprintf(humidity, sizeof(humidity), "%s", humidity_tuple->value->cstring);

    snprintf(winds[0], sizeof(winds[0]), "%s", wind0_tuple->value->cstring);
    snprintf(winds[1], sizeof(winds[1]), "%s", wind1_tuple->value->cstring);
    snprintf(winds[2], sizeof(winds[2]), "%s", wind2_tuple->value->cstring);
    snprintf(winds[3], sizeof(winds[3]), "%s", wind3_tuple->value->cstring);
    snprintf(winds[4], sizeof(winds[4]), "%s", wind4_tuple->value->cstring);
    snprintf(winds[5], sizeof(winds[5]), "%s", wind5_tuple->value->cstring);
    snprintf(winds[6], sizeof(winds[6]), "%s", wind6_tuple->value->cstring);
    snprintf(winds[7], sizeof(winds[7]), "%s", wind7_tuple->value->cstring);
    snprintf(winds[8], sizeof(winds[8]), "%s", wind8_tuple->value->cstring);

    temps[0] = (int)temp1_tuple->value->int32;
    temps[1] = (int)temp2_tuple->value->int32;
    temps[2] = (int)temp3_tuple->value->int32;
    temps[3] = (int)temp4_tuple->value->int32;
    temps[4] = (int)temp5_tuple->value->int32;
    temps[5] = (int)temp6_tuple->value->int32;
    temps[6] = (int)temp7_tuple->value->int32;
    temps[7] = (int)temp8_tuple->value->int32;
    temps[8] = (int)temp9_tuple->value->int32;

    moonPhase[0] = (int)moonPhase1_tuple->value->int32;
    moonPhase[1] = (int)moonPhase2_tuple->value->int32;
    moonPhase[2] = (int)moonPhase3_tuple->value->int32;
    moonPhase[3] = (int)moonPhase4_tuple->value->int32;
    moonPhase[4] = (int)moonPhase5_tuple->value->int32;
    moonPhase[5] = (int)moonPhase6_tuple->value->int32;

    dayr[0] = (int)day1r_tuple->value->int32;
    dayr[1] = (int)day2r_tuple->value->int32;
    dayr[2] = (int)day3r_tuple->value->int32;
    dayr[3] = (int)day4r_tuple->value->int32;
    dayr[4] = (int)day5r_tuple->value->int32;
    dayr[5] = (int)day6r_tuple->value->int32;

    dayp[0] = (int)day1p_tuple->value->int32;
    dayp[1] = (int)day2p_tuple->value->int32;
    dayp[2] = (int)day3p_tuple->value->int32;
    dayp[3] = (int)day4p_tuple->value->int32;
    dayp[4] = (int)day5p_tuple->value->int32;
    dayp[5] = (int)day6p_tuple->value->int32;

    snprintf(wind_speed_val, sizeof(wind_speed_val), "%s", wind_speed_tuple->value->cstring);

    time_t t = time(NULL);
    struct tm now = *(localtime(&t));

    last_refresh = mktime(&now);

    //  APP_LOG(APP_LOG_LEVEL_DEBUG,"dirty inbox_received_callback + weather");
    is_weather_aquired = true;
    if (graph)
    {
      page_nb = 2;
    }
    else
    {

      page_nb = 1;
    }

    // On sauve les resultats pour un prochain lancement de l'app
    persist_write_string(KEY_ICON, icon);
    persist_write_string(KEY_HUMIDITY, humidity);
    persist_write_string(KEY_WIND_SPEED, wind_speed_val);
    persist_write_string(KEY_TEMPERATURE, weather_temp);
    persist_write_string(KEY_TMIN, tmin);
    persist_write_string(KEY_TMAX, tmax);
    persist_write_string(KEY_SUNRISE, sunrise);
    persist_write_string(KEY_SUNSET, sunset);

    vibes_double_pulse();
    layer_mark_dirty(layer);
  }
}

static void outbox_failed_callback(DictionaryIterator *iterator, AppMessageResult reason, void *context)
{
  //   APP_LOG(APP_LOG_LEVEL_ERROR, "Outbox send failed!");
}

static void outbox_sent_callback(DictionaryIterator *iterator, void *context)
{
  //   APP_LOG(APP_LOG_LEVEL_INFO, "Outbox send success!");
}
static void dictation_session_callback(DictationSession *session, DictationSessionStatus status,
                                       char *transcription, void *context)
{
  // Print the results of a transcription attempt
  //   APP_LOG(APP_LOG_LEVEL_INFO, "Dictation status: %d", (int)status);

  if (status == DictationSessionStatusSuccess)
  {
    // Display the dictated text
    snprintf(s_last_text, sizeof(s_last_text), "Transcription:\n\n%s", transcription);
    //     APP_LOG(APP_LOG_LEVEL_INFO, "transcription status: %s", transcription);
    // text_layer_set_text(s_output_layer, s_last_text);
    // send sentence to weather
    DictionaryIterator *iter;
    app_message_outbox_begin(&iter);

    // Add a key-value pair

    dict_write_cstring(iter, KEY_LOCATION, transcription);
    // Send the message!
    app_message_outbox_send();
    is_weather_aquired = false;
    snprintf(location, sizeof(location), "%s %s", "Acquiring weather for", transcription);

    layer_mark_dirty(layer);
  }
  else
  {
    // Display the reason for any error
    static char s_failed_buff[128];
    snprintf(s_failed_buff, sizeof(s_failed_buff), "Transcription failed.\n\nReason:\n%d",
             (int)status);
    // text_layer_set_text(s_output_layer, s_failed_buff);
  }
}

static void up_click_handler(ClickRecognizerRef recognizer, void *context)
{
  if (!is_menu)
  {
    if (is_weather_aquired)
    {
      if (page_nb > 1)
      {
        page_nb--;
      }
      else
      {
        page_nb = 5;
      }
      layer_mark_dirty(layer);
    }
  }
  else
  {
    is_menu = 0;
    if (IS_COLOR)
    {
      // Create new dictation session
      s_dictation_session = dictation_session_create(sizeof(s_last_text),
                                                     dictation_session_callback, NULL);
      // Start dictation UI
      dictation_session_start(s_dictation_session);
    }
    else
    {
      layer_mark_dirty(layer);
    }
  }
}

static void select_click_handler(ClickRecognizerRef recognizer, void *context)
{
  if (IS_COLOR)
  {
    is_menu = !is_menu;
    layer_mark_dirty(layer);
  }
}

static void down_click_handler(ClickRecognizerRef recognizer, void *context)
{
  if (!is_menu)
  {
    if (is_weather_aquired)
    {
      if (page_nb < 5)
      {
        page_nb++;
      }
      else
      {
        page_nb = 1;
      }
      layer_mark_dirty(layer);
    }
  }
  else
  {
    is_menu = 0;
    // text_layer_set_text(s_output_layer, s_last_text);
    //  send sentence to weather
    DictionaryIterator *iter;
    app_message_outbox_begin(&iter);

    char transcription[20] = "";
    // Add a key-value pair

    dict_write_cstring(iter, KEY_LOCATION, transcription);
    // Send the message!
    app_message_outbox_send();
    is_weather_aquired = false;
    snprintf(location, sizeof(location), "%s", "Acquiring position...");
    layer_mark_dirty(layer);
  }
}

static void click_config_provider(void *context)
{
  // Register the ClickHandlers
  window_single_click_subscribe(BUTTON_ID_UP, up_click_handler);
  // window_single_click_subscribe(BUTTON_ID_SELECT, select_click_handler);
  window_single_click_subscribe(BUTTON_ID_DOWN, down_click_handler);
}

/*
static void handle_tap(AccelAxisType axis, int32_t direction) {
  is_tapped = !is_tapped;
  layer_mark_dirty(layer);
}
*/

static void init()
{

  statusfontsmall = fonts_get_system_font(FONT_KEY_GOTHIC_14);
  statusfontsmallbold = fonts_get_system_font(FONT_KEY_GOTHIC_14_BOLD);
  statusfontdate = fonts_get_system_font(FONT_KEY_GOTHIC_28_BOLD);

  snprintf(pebble_Lang, sizeof(pebble_Lang), "%s", i18n_get_system_locale());

  window = window_create();
  window_set_background_color(window, color_left);
  window_stack_push(window, true);

  rootLayer = window_get_root_layer(window);

  layer = layer_create(layer_get_bounds(rootLayer));
  layer_set_update_proc(layer, layer_update);
  layer_add_child(rootLayer, layer);

  window_set_click_config_provider(window, click_config_provider);

  // accel_tap_service_subscribe(handle_tap);

  // JS Messages
  app_message_register_inbox_received(inbox_received_callback);
  app_message_register_outbox_failed(outbox_failed_callback);
  app_message_register_outbox_sent(outbox_sent_callback);

  // Open AppMessage
  app_message_open(2000, 50);

  /*
 1 + (n * 7) + D1 + ... + Dn
 Where n is the number of Tuples in the Dictionary and Dx are the sizes of the values in the Tuples.
 The size of the Dictionary header is 1 byte. The size of the header for each Tuple is 7 bytes.
 */
}

static void deinit()
{
  accel_tap_service_unsubscribe();
  app_message_deregister_callbacks();
  layer_destroy(layer);
  window_destroy(window);
}

int main(void)
{
  init();
  app_event_loop();
  deinit();
}
