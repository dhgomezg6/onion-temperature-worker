const cron = require('node-cron');
const { exec } = require('child_process');
const axios = require('axios')

cron.schedule('* * * * *', () => {

    exec('ls | grep js', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            
            axios.post('http://localhost:3000/temperature/insert', {
                temperature: 20,
                humidity: 20
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