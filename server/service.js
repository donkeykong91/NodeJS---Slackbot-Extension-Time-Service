"use strict"


const express = require("express");

const service = express();

const superagentRequest = require("superagent");

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;


service.get("/service/:location", function (request, response) {


    {let location = request.params.location;
     let cityLocation = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GEOCODE_API_KEY}`;


        superagentRequest.get(cityLocation)

                         .then(displayJson)
                         
                         .catch(locationError);


    }


    function displayJson(geocodeResponse) {

        response.json(geocodeResponse.body.results[0].geometry.location);

    }


    function locationError(error) {

        console.log(error);
    
        response.sendStatus(500);
    
    }


});


module.exports = service;