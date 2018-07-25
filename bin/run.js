"strict mode"


const superagentRequest = require("superagent");

const service = require("../server/service");

const http = require("http");


const server = http.createServer(service);

server.listen();


server.on("listening", function() {


    console.log(`IRIS-Time is listening on ${server.address().port} in ${service.get("env")} mode.`);


    var asyncAnnounce = async function () {


        try {

            var respond = await superagentRequest.put(`http://127.0.0.1:3000/service/time/${server.address().port}`);


            console.log(respond.body);


        } catch (error) {
            

            console.log(error);

            console.log("Error connecting to Iris");

            return

        }

    }


    asyncAnnounce();

    setInterval(asyncAnnounce, 15*1000);


});