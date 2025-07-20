/*
  Esta funçao define as informaçoes do clima no DOM.

  @returns: none
  @params: none

*/

async function searchSet() {
  const search_button = document.getElementById('search') 
  try{
  const search = document.querySelector('#city');
  const city = document.getElementById('city');
  search_button.disabled = true
  const data = await searchCity(city);
  const city_name = document.getElementById("city-name")
  city_name.innerText = city.value;
  search.setAttribute('placeholder', city.value);
  

  const icon = getIcon(data);
  
  document.getElementById('temperature').innerHTML = `<span class="fa-solid ${icon}"></span> ${data.main.temp}<sup>°c</sup>`;
  document.getElementById('sky').innerText = data.weather[0].description;
  document.getElementById('temperature-max').innerHTML = `${data.main.temp_max}<sup>°c</sup>`;
  document.getElementById('temperature-min').innerHTML = `${data.main.temp_min}<sup>°c</sup>`;
  document.getElementById('humidity').innerText = data.main.humidity + '%';
  document.getElementById('wind').innerText = data.wind.speed + 'km/h';

  changeTheme(data);

  search_button.disabled = false
  } 
  
  catch(e) {
    console.log(e)
  }
  
}

/* 
  Esta funçao faz uma requisicao a API openWeather

  @param {Object} - Uma classe do HTML 
  @returns {dict} - Json da resposta da requisiçao
*/
async function searchCity(city){
  
  const API_KEY = "2bdcb4c05e0ed5b4afa18402eebcb8b5"
  
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric&lang=pt_br`);
  const data = await response.json();

  return data
  
}

/* 
  Esta funçao retorna um Icon especifico sobre o clima

  @params {dict} - Um arquivo json com as informaçoes do clima
  @returns {string} - fa icon


*/
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

/*
  Esta funçao altera o tema do DOM a partir do horario de  determinada cidade

  @params: {dict} - Um json com as informaçoes do clima
  @returns: none


*/
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