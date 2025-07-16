async function searchCity(event){
  event.preventDefault();
  
  const search = document.querySelector('#city');
  const city = document.getElementById('city');
  const city_name = document.getElementById('city-name');
  
  city_name.innerText = city.value;
  search.setAttribute('placeholder', city.value);
  
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric&lang=pt_br`);
  const data = await response.json();
  
  icon = getIcon(data)
  
  document.getElementById('temperature').innerHTML = `<span class="fa-solid ${icon}"></span> ${data.main.temp}<sup>°c</sup>`;
  document.getElementById('sky').innerText = data.weather[0].description;
  document.getElementById('temperature-max').innerHTML = `${data.main.temp_max}<sup>°c</sup>`;
  document.getElementById('temperature-min').innerHTML = `${data.main.temp_min}<sup>°c</sup>`;
  document.getElementById('humidity').innerText = data.main.humidity + '%';
  document.getElementById('wind').innerText = data.wind.speed + 'km/h';

  changeTheme(data)
}

function getIcon(data){
  const id = data.weather[0].id;
  let icon;
  
  if (id >= 200 && id < 300) {
    icon = 'fa-bolt';
  } else if (id >= 300 && id < 322) {
    icon = 'fa-cloud-rain';
  } else if (id >= 500 && id < 532) {
    icon = 'fa-cloud-showers-heavy';
  } else if (id >= 600 && id < 700) {
    icon = 'fa-snowflake';
  } else if (id >= 700 && id < 782) {
    icon = 'fa-smog';
  } else if (id === 800) {
    icon = 'fa-sun';
  } else if (id > 800) {
    icon = 'fa-cloud-sun';
  }
  
  return icon
}

function changeTheme(data){
    const state = data.weather[0].icon[2]

    console.log(state)
    if (state === 'd'){
        document.body.classList.remove("dark-theme");
    }

    else{
        document.body.classList.add("dark-theme")
    }

}