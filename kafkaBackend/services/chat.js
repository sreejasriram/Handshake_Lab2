const query =require('../Database/queries');
const Messages = require('../Models/MessageModel');
var ObjectId = require('mongodb').ObjectID;

handle_request=(message, callback)=>{
    if (message.type === "send_message") {
        console.log(message.id1)
        console.log(message.id2)
        try{
            var match = {
                $or:[
                    {'id1.sender':ObjectId(message.id1),'id2.receiver':ObjectId(message.id2)},
                    {'id1.sender':ObjectId(message.id2),'id2.receiver':ObjectId(message.id1)},
                    ]
            };
                            
            update = message.update;
            console.log(update)
            options = { upsert: true, new: true, setDefaultsOnInsert: true };
            Messages.createModel().findOneAndUpdate(match, update, options, function(error, result) {
                callback(error,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }   

    else  if (message.type === "fetch_convos") {
            console.log(message)
            try{
                query.getProfile(Messages.createModel(),
                
                {
                    $or:[
                        {'id1.sender':ObjectId(message.id)},
                        {'id2.receiver':ObjectId(message.id)},
                        ]
                },
                
                (err,result)=>{

                    callback(err,result)
                });
            }
            catch(error){
                return callback(error,null)
            }
        } 
        
} 



exports.handle_request = handle_request;