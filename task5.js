const search = document.getElementById("bt1");
search.addEventListener("click", fun);
const apiKey = "4b10e6e10c93963552df1fdebebfacf6";

async function fun() {
    const city = document.getElementById("in1").value;
    try {
        const weatherdata = await getWeatherData(city);
        if (weatherdata) {
            displayInfo(weatherdata);
        } else {
            console.error("No weather data received");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}


async function getWeatherData(city) { 
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}


function displayInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    document.getElementById("w1").innerText = city;
    document.querySelector(".emote").textContent = getWeatherEmoji(id);

    const temperatureCelsius = (temp - 273.15) * (9 / 5) + 32;
    document.getElementById("temperature").innerText = `Temperature: ${temperatureCelsius.toFixed(1)}°F`;
    document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;

 
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}