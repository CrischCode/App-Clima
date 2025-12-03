let valueSearch = document.getElementById("valueSearch");
let ciudad = document.getElementById("ciudad")
let cityName = document.getElementById("cityName");
let iconoClima = document.getElementById("iconoClima");
let tempValue = document.getElementById("tempValue");
let descripcion = document.querySelector(".descripcion");
let Humedad = document.getElementById("Humedad")
let Clouds = document.getElementById("Clouds")
let Presion = document.getElementById("Presion")
let form = document.querySelector("form")
let main = document.querySelector("main")
let fechaHoy = document.getElementById("fechaHoy")

let fecha = new Date();
let opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
fechaHoy.innerText = fecha.toLocaleDateString('es-ES', opciones);

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(valueSearch.value != "") {
        searcWeather()
    }
});

let id = '00f443b4c9b490474724241f9818c599'
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id;

async function searcWeather()  {
   let response = await fetch(url+'&q='+valueSearch.value);
    let data = await response.json();

    if (data.cod != 200) throw 'Ciudad no encontrada';

    cityName.innerText = `${data.name}, ${data.sys.country}`
    // iconoClima.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconoClima.src = getColorWeatherIcon(data.weather[0].icon);
    tempValue.innerText = `${data.main.temp} °C`
    document.getElementById("flagImg").src = `https://flagcdn.com/48x36/${data.sys.country.toLowerCase()}.png`;
    descripcion.innerText = data.weather[0].description
    .split(' ')
    .map(p =>p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
    Humedad.innerText = `Humedad: ${data.main.humidity} %`
    Clouds.innerText = `Nubes: ${data.clouds.all} %`
    Presion.innerText = `Presión: ${data.main.pressure} hPa`
    main.classList.add("update")
    setTimeout(() => {},main.classList.remove("error"), 700);
    

    valueSearch.value = ''
}

const initApp = () => {
    valueSearch.value = 'Guatemala'
    searcWeather()
}

function actualizarFecha () {
    const fecha = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    fechaHoy.innerText = fecha.toLocaleDateString('es-ES', opciones);
}

//para los iconos
function getColorWeatherIcon(icon) {
    const map = {
        "01d": "clear-day",
        "01n": "clear-night",
        "02d": "partly-cloudy-day",
        "02n": "partly-cloudy-night",
        "03d": "cloudy",
        "03n": "cloudy",
        "04d": "overcast",
        "04n": "overcast",
        "09d": "rain",
        "09n": "rain",
        "10d": "rain",
        "10n": "rain",
        "11d": "thunderstorms",
        "11n": "thunderstorms",
        "13d": "snow",
        "13n": "snow",
        "50d": "mist",
        "50n": "mist"
    };

    const name = map[icon] || "cloudy";

    return `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/${name}.svg`;
}

actualizarFecha();
initApp()