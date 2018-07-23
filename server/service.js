"use strict"


const express = require("express");

const service = express();

const superagentRequest = require("superagent");

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;


service.get("/service/:location", function (request, response) {


    {let location = request.params.location;


        superagentRequest.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GEOCODE_API_KEY}`)

                         .then(function (geocodeResponse) {

                            response.json(geocodeResponse.body.results[0].geometry.location);

                         })
                         
                         .catch(function (error) {

                            console.log(error);

                         });

    }

});


module.exports = service;