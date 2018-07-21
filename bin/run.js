"strict mode"


const service = require("../server/service");

const http = require("http");


slackClient.addAuthenticatedHandler(rtm, function () {

    server.listen(3010);

});


server.on("listening", function() {

    console.log(`IRIS-Time is listening on ${server.address().port} in ${service.get("env")} mode.`);

});