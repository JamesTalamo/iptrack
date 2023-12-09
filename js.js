let getData = () => {
    let map; 

    let btn = document.querySelector('#entr-btn');

    btn.addEventListener('click', (event) => {
        event.preventDefault();

        let input = document.querySelector('#inputType');
        let ipAddress = input.value;

        let key = 'at_ZwjwDZ5bU1NA0jTaf3WX96NiVA5Fu';
        let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${ipAddress}`;

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    alert('INVALID IP')
                    throw new Error('INVALID')
                };
                return res.json()
            })
            .then(data => {
                console.log(data);

                let lat = data.location.lat;
                let lng = data.location.lng;

                if (!map) {
                    map = L.map('map').setView([lat, lng], 13);
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);
                } else {
                    map.setView([lat, lng], 13);
                }

                
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        map.removeLayer(layer);
                    }
                });
                L.marker([lat, lng]).addTo(map);

               
                document.querySelector('#c1-output').innerHTML = data.ip;
                document.querySelector('#c2-output').innerHTML = `${data.location.city}, ${data.location.country}, ${data.location.postalCode}`;
                document.querySelector('#c3-output').innerHTML = data.location.timezone;
                document.querySelector('#c4-output').innerHTML = data.isp;
            })
            .catch(console.warn);
    })
}

getData();
