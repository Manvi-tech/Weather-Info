
const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");

let city_name = document.getElementById("city_name");
let temp = document.getElementById("display_temp");
let temp_status = document.getElementById("temp_status");

 const datahide = document.querySelector('.middle_layer');

const getInfo= async (event)=>{
    event.preventDefault();
    let cityval = cityName.value;

    if(cityval === ""){
         city_name.innerText = `Mention the city you want to search!!`;
         datahide.classList.add('data_hide');
    }else{
        
       try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=0a6b854ef07e05abdb49185835abe5d8`;
            let response = await fetch(url);
            const data = await response.json();
            const arrData = await [data];

            temp.innerText = arrData[0].main.temp;//35deg
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;//panipat,india
            const temp_mood = arrData[0].weather[0].main; //clouds,rainy

            // change image according to climate: clear/sunny/cludy/rainy
            if(temp_mood == "Clear"){
                temp_status.innerHTML= "<i class='fas fa-sun' style='color:#eccc68'></i>";
            }else if(temp_mood == "Clouds"){
                temp_status.innerHTML= "<i class='fas fa-cloud' style='color:#f1f2f6'></i>";
            }else if(temp_mood == "Rain"){
                temp_status.innerHTML= "<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>";
            }else{
                temp_status.innerHTML= "<i class='fas fa-sun' style='color:#eccc68'></i>";
            }

            datahide.classList.remove('data_hide');
       }catch(err){
            city_name.innerText = `Enter a valid  city name !!`
            datahide.classList.add('data_hide');
       }
    }
}
submitBtn.addEventListener('click',getInfo);

var now = new Date();
// day
const weekDay = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
var day = weekDay[now.getDay()];
document.getElementById("day").innerText = day;
   
//  date, month,year
const months = ["Jan", "Feb", "March","Apr","May","June","July","Aug","Sept","Oct", "Nov", "Dec"];
var month = months[now.getMonth()];
var date = now.getDate();
var year = now.getFullYear();
document.getElementById("today_date").innerText = `${date} ${month}, ${year}`;
