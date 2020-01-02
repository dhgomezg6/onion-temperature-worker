const cron = require('node-cron');
const { exec } = require('child_process');
const axios = require('axios')

cron.schedule('* * * * *', () => {

    exec('dht-sensor 18 DHT22', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            let temperature_value = stdout.match(/(?<=temperature:\s).\S+/);
            let humidity_value = stdout.match(/(?<=temperature:\s).\S+/);
            
            console.log(`Temperature: ${temperature_value} , Humidity:${humidity_value}`);
            
            axios.post('https://radiant-bayou-94606.herokuapp.com/temperature/insert', {
                temperature: temperature_value,
                humidity: humidity_value
            })
            .then((res) => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
            })
            .catch((error) => {
                console.error(error)
            })
        }
    });
});