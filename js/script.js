document.addEventListener('DOMContentLoaded', function() {
    const cities = ['Romny', 'Lviv', 'Kyiv'];
    const apiKey = '16de14b6e63614c3b8729f9b6e3c35c7';
    const urls = cities.map(city => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`);

    const cityNamesUkrainian = {
        'Romny': 'Ромни',
        'Lviv': 'Львів',
        'Kyiv': 'Київ'
    };

    Promise.all(urls.map(url => fetch(url).then(response => response.json())))
        .then(data => {
            const weatherBlocks = document.querySelectorAll('.weather-block');

            data.forEach((cityData, index) => {
                if (weatherBlocks[index]) {
                    const iconCode = cityData.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                    const cityNameUkrainian = cityNamesUkrainian[cityData.name] || cityData.name; // Використання англійської назви, якщо української немає в мапі

                    weatherBlocks[index].querySelector('.city-name').textContent = cityNameUkrainian;
                    weatherBlocks[index].querySelector('.weather-img').innerHTML += `<img src="${iconUrl}" alt="${cityData.weather[0].description}">`;
                    weatherBlocks[index].querySelector('.temperature').textContent = `${Math.round(cityData.main.temp * 10) / 10}°C`;
                    weatherBlocks[index].querySelector('.feels-like').textContent = `Відчувається як: ${Math.round(cityData.main.feels_like * 10) / 10}°C`;
                    weatherBlocks[index].querySelector('.humidity').textContent = `Вологість: ${cityData.main.humidity}%`;
                    weatherBlocks[index].querySelector('.wind-speed').textContent = `Шв. вітру: ${cityData.wind.speed}м/с`;
                }
            });
        })
        .catch(error => console.log('Error:', error));
});
