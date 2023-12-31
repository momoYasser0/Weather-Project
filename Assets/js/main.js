let searchC = document.getElementById("search")
let forecastContainer = document.querySelector(".forcast-container")
let allData = []
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];




async function getLocation(location) {
    let data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b5cf401b110c444b848202235232812%20&q=${location}&days=3&aqi=no&alerts=no`)
    if (data.ok && data.status != 400) {
        let allData = await data.json()
        console.log(allData);
        displayCurrent(allData.location, allData.current);
        displayAnother(allData.forecast.forecastday);
    }
}
searchC.addEventListener("keyup", function (e) {
    getLocation(e.target.value);
})
function displayCurrent(location, current) {
    if (current != null) {
        var myDate = new Date(current.last_updated)
        let htm = `
        <div class="col-lg-4 px-0  today forcast ">
                <div class="forcast-header d-flex justify-content-between align-items-center ">
                        <div class="day">${days[myDate.getDay()]}</div>
                        <div class="date">${myDate.getDate()} ${monthNames[myDate.getMonth()]}</div>
                    </div>
                    <div class="forcast-content p-4">
                        <div class="location">${location.name}</div>
                        <div class="degree">
                            <div class="num">${current.temp_c}<sup>o</sup>C</div>
                            <div class="forcast-icon">
                                <img src="${current.condition.icon}" alt="">
                            </div>
                        </div>
                        <div class="weather-condition">
                            ${current.condition.text}
                        </div>
                        <div class="text-center"><span><img src="./Assets/imgs/icon-umberella.png"
                                    alt="umberella">${current.humidity}%</span>
                            <span><img src="./Assets/imgs/icon-wind.png" alt="wind">${current.vis_km}Km/h</span>
                            <span><img src="./Assets/imgs/icon-compass.png" alt="compass">${current.wind_dir}</span>
                        </div>
                    </div>
        </div>`
        forecastContainer.innerHTML = htm;
    }
}

function displayAnother(forecastday) {
    let blackBox = "";
    for (let i = 1; i < forecastday.length; i++) {
        blackBox += `<div class="col-lg-4 px-0 text-center forcast">
                    <div class="forcast-header ">
                        <div class="day">${days[new Date(forecastday[i].date).getDay()]}</div>
                    </div>
                    <div class="forcast-content p-4">
                        <div class="forcast-icon mb-3">
                            <img src="https:${forecastday[i].day.condition.icon}" alt="" width="48">
                        </div>
                        <div class="degree">${forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
                        <small>${forecastday[i].day.mintemp_c} <sup>o</sup></small >
        <div class="weather-condition">
            ${forecastday[i].day.condition.text}
        </div>
                    </div >
                </div > `
    }
    forecastContainer.innerHTML += blackBox;
}
getLocation("Alexandria");