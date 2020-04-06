var connection =  new require('./kafka/Connection');
const { mongoDB } = require('./Database/config');
const mongoose = require('mongoose');
var signup = require('./services/signup.js');
var signin = require('./services/signin.js');
var c_signup = require('./services/c_signup.js');
var c_signin = require('./services/c_signin.js');
var c_jobs = require('./services/c_jobs.js');
var c_events = require('./services/c_events.js');
var profile = require('./services/profile.js');
var chat = require('./services/chat.js')

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
   
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            if (res){
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];}
            else  if (err){
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : err
                        }),
                        partition : 0
                    }
                ];}
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });

}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login-signup",signup)
handleTopicRequest("signup-login",signin)
handleTopicRequest("company-signup",c_signup)
handleTopicRequest("company-signin",c_signin)
handleTopicRequest("company-jobs",c_jobs)
handleTopicRequest("company-events",c_events)
handleTopicRequest("profile",profile)
handleTopicRequest("chat",chat)


