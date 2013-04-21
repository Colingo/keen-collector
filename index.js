var https = require('https')

module.exports = KeenCollector

function KeenCollector(config){
    if(typeof config!=="object"){
        console.error("keen: config must be an object")
        return noop
    }
    if(typeof config.eventCollection!=="string"){
        console.error("keen: eventCollection must be a string")
        return noop
    }
    if(typeof config.projectToken!=="string"){
        console.error("keen: projectToken must be a string")
        return noop
    }
    if(typeof config.endpoint!=="string"){
        config.endpoint = "https://api.keen.io/3.0/projects/"
    }
    config.requestLog = config.requestLog || false
    config.responseLog = config.responseLog || false

    console.log("Creating Keen Collector",config);

    return postEvent(config)

}


function postEvent(config){
    return function(event){
        var d = JSON.stringify(event)
        var apiUrl = config.endpoint + config.projectToken + "/events/" + config.eventCollection
        if(config.requestLog){
            console.log("sending to keen",apiUrl,JSON.stringify(event))
        }
        var req = https.request({
            hostname: 'api.keen.io',
            port: 443,
            path: '/3.0/projects/'+config.projectToken + "/events/" + config.eventCollection,
            method: 'POST'
            , headers: {
                "Content-Type" : "application/json"
                , "Content-Length" : d.length
            }
        }, config.responseLog ? reslogger : noop)
        req.end(d)
        req.on('error',function(e){
            console.error("keen request error",e)
        })

        return

    }
    function reslogger(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }
}

function noop(){ }