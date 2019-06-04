const path= require('path')
const express = require('express')
const hbs=  require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app= express()
const port= process.env.PORT || 3000 

//Define paths for Express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialPath= path.join(__dirname, '../templates/partials')


//Setup HB and Views Directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup Static Directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Sadiq'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About Page',
        name: 'BISMARK'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help Page',
        name: 'Sadiq'
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'Please Provide a Location'
        })
    }

    geocode(req.query.address, (error, data)=> {
        if (error) {
            return res.send({
                error: 'Unable to Find Location'
            })
        }
        else {
            forecast(data.latitude, data.longtitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: 'Unable to Find Location'
                    })
                }

                res.send({
                    address: data.location,
                    forecast: forecastData
                })
            }) 
        }  
    }) 
})

app.get('/product', (req, res)=> {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        errorMessage: 'Help Article not found',
        name: 'Sadiq'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        errorMessage: 'Page does not exist',
        name: 'Sadiq'
    })
})

app.listen(port, () => {
    console.log('Server is up on port'+ port)
})

