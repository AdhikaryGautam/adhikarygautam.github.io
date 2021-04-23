window.addEventListener('load',()=>{
    let longitude;
    let latitude;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;

                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d92858c99b86757e4480ab32b1ad7ae1`;

                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data =>{
                        console.log(data);

                        const {temp} = data.main;
                        const {description} = data.weather[0];
                        const {name} = data;

                        console.log(name);

                    });

                    
            }
        )
    }
});