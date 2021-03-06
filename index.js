const { exec } = require('child_process');
const axios = require('axios')

exec('dht-sensor 18 DHT22', (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err)
    } else {
        let temperature_value = stdout.match(/(?<=temperature:\s).\S+/);
        let humidity_value = stdout.match(/(?<=temperature:\s).\S+/);
        
        console.log(`Temperature: ${temperature_value} , Humidity:${humidity_value}`);
        
        axios.post('https://radiant-bayou-94606.herokuapp.com/temperature/insert', {
            temperature: temperature_value[0],
            humidity: humidity_value[0]
        })
        .then((res) => {
            console.log(`Temp: ${temperature_value[0]} Hum: ${humidity_value[0]} - ${res.statusCode}`)
        })
        .catch((error) => {
            console.error(error)
        })
    }
});
