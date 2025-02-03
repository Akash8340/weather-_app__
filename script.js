document.addEventListener('DOMContentLoaded',()=>{
    const cityInput =document.getElementById("city-input");
    const getWeatherBtn=document.getElementById("get-weather-btn");
    const weatherInfo=document.getElementById("weather-info");
    const cityNameDisplay=document.getElementById("city-name");
    const temperatureDisplay=document.getElementById("temperature");
    const descriptionDisplay=document.getElementById("description");
    const errorMessage=document.getElementById("error-message");

    const APIKEY="b15d78d1d369563c680e112676766156";
    getWeatherBtn.addEventListener('click',async()=>{
        const city=cityInput.value.trim();
        if(!city) return;

        //it may throw an error
        //server/database is always in another continent
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })
    
    //fetch function
    async function fetchWeatherData(city){
        //gets the data
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;

        const response=await fetch(url);

        //throw error
        if(!response.ok){
            throw new Error("City not found");
        }
        //everything fine
        const data=await response.json();
        // console.log("data ",data);
        return data;
    }

    function displayWeatherData(data){
        cityNameDisplay.innerText=data.name;
        temperatureDisplay.innerText=`Temperature: ${data.main.temp}`;
        descriptionDisplay.innerText=`Weather: ${data.weather[0].description}`;

        //remove hidden from class-list so we can display above one
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add('hidden');

    }

    function showError(){
      weatherInfo.classList.add("hidden");
      errorMessage.classList.remove('hidden');
    }

})