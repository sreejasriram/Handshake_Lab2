const query =require('../Database/queries');
const Messages = require('../Models/MessageModel');
var ObjectId = require('mongodb').ObjectID;



exports.handle_request = async (data) => {
    console.log("aa")
    console.log(data)
    if (data.type == "fetch_convos") {
        return fetchMessages(data)
    } else if (data.type == 'send_message') {
        return sendMessage(data)
    } 
}




sendMessage = async(message)=>{
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
           return await  Messages.createModel().findOneAndUpdate(match, update, options);
        }
        catch(error){
            return new Error(error);
        }
    }   
        
} 



fetchMessages = async (messageQuery) => {
    try {
        let result = await query.findDocumentsByQueryAsync(Messages.createModel(),
            {
                $or: [
                    { 'id1.sender': ObjectId(messageQuery.id) },
                    { 'id2.receiver': ObjectId(messageQuery.id) },
                ]
            },
            { id1: 1, id2: 1 },
            { runValidators: false }
            )
            return await processLookup(result,messageQuery)
    }
    catch (error) {
        return new Error(error);
    }
}



processLookup = async (mess,messageQuery) => {
    let messages = []
    for(data of mess){
         console.log(data.id1.sender)
         console.log(messageQuery.id)
         if ((data.id1.sender).toString() === (messageQuery.id)) {
             localid = 'id2.receiver';
             myid='id1.sender'
             lookup = data.id2.persona;
             id = data.id2.receiver;
         } else {
             localid = 'id1.sender';
             myid='id2.receiver'
             lookup = data.id1.persona;
             id = data.id1.sender;
         }
         console.log("localid")
         console.log(localid)
         console.log("lookup")
         console.log(lookup)
         console.log("id")
         console.log(id)
         let matchQuery = {}
         matchQuery[localid] = ObjectId(id)
         matchQuery[myid] = ObjectId(messageQuery.id)

         console.log(matchQuery)
         let res = await query.findDocumentsByLookupAsync(Messages.createModel(), lookup, matchQuery, localid, '_id', 'info');
         await  messages.push(res)
     }
         await console.log(messages)
          return await (messages)  
 }



//exports.handle_request = handle_request;