const request= require('request');

const forecast= (latitude, longtitude, callback) => {
    const url= 'https://api.darksky.net/forecast/4c2e801fc1e048a13071d59fa0854e6f/'+ latitude + ',' + longtitude + '?units=si';

    request({ url: url, json:true }, (error, response) => {
        if (error) {
            callback('Unable to connect to App', undefined)
        }
        else if (response.body.error) {
            callback ('Unable to find location', undefined);
        } else {
            callback (undefined ,response.body.daily.data[0].summary + ' currently ' + response.body.currently.temperature + ' degrees out');
        }
    });
}

module.exports= forecast

