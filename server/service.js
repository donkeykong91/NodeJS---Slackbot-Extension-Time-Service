"use strict"


var express = require("express");

var service = express();

var superagentRequest = require("superagent");

var moment = require("moment");

{const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

 const TIMEZONE_API_TOKEN = process.env.TIMEZONE_API_TOKEN;


    service.get("/service/:location", function (request, response) {


        {let locationDetails = null;
         let geocodeResponse = null;
         let timezoneResponse = null;


            asyncGetCityLocationAndTime();


            async function asyncGetCityLocationAndTime () {


                try {


                    geocodeResponse = await superagentRequest.get(cityLocation());

                    locationDetails = await getJsonLocationDetails(geocodeResponse);
    
                    timezoneResponse = await superagentRequest.get(formatLocationLink());
    
    
                    displayResult(timezoneResponse);
    
        
                } catch (error) {


                    response.sendStatus(500);

                    throw new Error("Check if the links are correct.")
            

                }

            }


            function formatLocationLink () {


                var latitude = locationDetails.location.lat;

                var longitude = locationDetails.location.lng;
        
                return `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=1331161200&key=${TIMEZONE_API_TOKEN}`;
            

            }


            async function displayResult(timezoneResponse) {


                var result = timezoneResponse.body;

                var timeString = moment.unix(locationDetails.timeStamp + 

                                                      result.dstOffset + 

                                                      result.rawOffset)

                                                      .utc()

                                                      .format("dddd, MMMM Do YYYY, h:mm:ss a");


                response.json({result: timeString});

                
            }


            function cityLocation () {


                var location = request.params.location;

                return `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GEOCODE_API_KEY}`;
            
            
            }


            async function getJsonLocationDetails(geocodeResponse) {


                return {


                    location: geocodeResponse.body.results[0].geometry.location,

                    timeStamp: +moment().format("X")


                };

            }

        }

    });


    module.exports = service;


}