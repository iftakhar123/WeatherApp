window.addEventListener("load", ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimeZone = document.querySelector(".location-timezone")
    let temperatureSection = document.querySelector(".degree-section")
    let temperatureSpan = document.querySelector(".temperature span")
    let currentDateTime = document.querySelector(".time")
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy ="https://cors-anywhere.herokuapp.com/";
            const api = `https://api.darksky.net/forecast/7a451512be8bbcdde7ca9051a6f8a091/${lat},${long}`;
            
            fetch(proxy+api)
                .then(response=>{
                return response.json();
            })
                .then(data=>{
                //console.log(data);
                const {temperature, summary, icon, time} = data.currently;
                
                //set DOM elements
                
                let celsius = (temperature - 32) *(5/9)
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent==='F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                });
                
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;
                //get time
                var currentDate = Date();
                currentDateTime.textContent = currentDate;
                //set Icon
                setIcon(icon, document.querySelector(".icon"))
            });                                          
    });
  }
    function setIcon(icon, iconID){
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
    }
    
})