const inputEl = document.querySelector(".inputEL");
const btnSearch = document.querySelector(".search");
const cityEl = document.querySelector(".city");
const imgEl = document.querySelector(".img-weather");
const conditionEL = document.querySelector(".condition");
const tempEl = document.querySelector(".temp");
const feelLike = document.querySelector(".feel-like");
const windEl = document.querySelector(".wind");
const imgDiv = document.querySelector(".imgDiv");
const infoDiv = document.querySelector(".info-wrapper");
const imgBg = document.querySelector(".imgBg");

const getWeather = async (city) => {
  const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=";
  const searchUrl = `${url}${city}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1b2faa032bmshf9e45184513a7d1p1e1281jsnc5fcc597230e",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(searchUrl, options);
    const result = await response.json();
    const weather = result.current;
    const location = result.location;
    let info = Object.assign(weather, location);
    return info;
  } catch (error) {
    console.error(error);
  }
};

const getSearch = async () => {
  const userInput = inputEl.value;
  if (userInput === " ") {
    return;
  } else {
    try {
      const res = await getWeather(userInput);
      console.log(res);
      showData(res);
      infoDiv.classList.remove("hidden");
      imgBg.classList.add("hidden");
    } catch (error) {
      console.log(error);
    }
  }
};
btnSearch.onclick = () => {
  getSearch();
  inputEl.value = "";
};

const showData = (info) => {
  cityEl.textContent = `${info.name}, ${info.region}`;
  conditionEL.textContent = `${info.condition.text}`;
  tempEl.textContent = `TEMP: ${info.temp_f}°F`;
  feelLike.textContent = `Feels like: ${info.feelslike_f}°F`;
  windEl.textContent = `Wind: ${info.wind_mph} mph`;

  let infoPic = info.condition.text.toLowerCase();

  if (infoPic == "partly cloudy") {
    imgDiv.innerHTML = `<img class="img-weather" src="images/clouds.png" />`;
  } else if (infoPic == "sunny") {
    imgDiv.innerHTML = `<img class="img-weather" src="images/clear.png" />`;
  } else if (infoPic == "mist") {
    imgDiv.innerHTML = `<img class="img-weather" src="images/mist.png" />`;
  } else if (infoPic == "overcast") {
    imgDiv.innerHTML = `<img class="img-weather" src="images/overcast.png" />`;
  } else if (infoPic == "moderate rain") {
    imgDiv.innerHTML = `<img class="img-weather" src="images/moderateRain.png" />`;
  } else if (infoPic == "drizzle") {
    imgDiv.innerHTML = `<img class="img-weather" src="images/drizzle.png" />`;
  } else if (infoPic == "snow") {
    imgDiv.innerHTML = `<img class="img-weather" src="images/snow.png" />`;
  } else if (infoPic == "rain") {
    imgDiv.innerHTML = `<img class="img-weather" src="images/rain.png" />`;
  }
};
