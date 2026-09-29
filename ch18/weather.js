const weather = document.getElementById("weatherInfo");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");
const resultArea = document.getElementById("result");

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

function showWeather(code) {
  if (code === 0) return "맑음";
  else if (1 <= code && code <= 3) return "흐림";
  else return "비";
}

async function getLocation() {
  resultArea.textContent = "Loading(GET)....";
  try {
    const res = await fetch(
      `${GEO_URL}?name=${encodeURIComponent(locationInput.value)}&count=5&language=ko&format=json`,
    );
    console.log("응답코드 : " + res.status);

    const data = await res.json();

    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;

    const info = await fetch(
      `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`,
    );
    console.log("응답 코드 : " + info.status);

    const infoData = await info.json();

    console.log(infoData);

    const code = infoData.current.weather_code;
    const temperature = infoData.current.temperature_2m;
    const weatherDetail = showWeather(code);
    const wind = infoData.current.wind_speed_10m;

    console.log(temperature);

    resultArea.textContent = `${locationInput.value} 정보
    현재 기온 : ${temperature}도
    현재 날씨 : ${weatherDetail}
    풍속 : ${wind} m/s
  `;
  } catch (err) {
    resultArea.textContent = err + " : 실패";
  }
}

searchBtn.addEventListener("click", getLocation);
