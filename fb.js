
const request = require('request');
var s;
var token = "EAAELRvdKfxEBAP3cXdhHbh01sUalCZCGqZBKRL6ZCdPZAE3UjZC95A9LVVmCFhQTaFHALIL87RGOBgKF7SFB6Ti4gjd8fZA2t2QeUlmIIQOS9D2XFmC5aZBM3hxDNRX0WguyW7vfdylnczsWNTxpmZCxpwBos7DnZBpACuokckNT10HyNpkUvq7DM";

function sendTextMessage(sender, text) {
    
    var messageData = { text:text };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData
        }
    }, function(error, response, body) {
        if (error) {
            {console.log('Error sending messages: ', error);
               
            }
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    });
}


function getOB(N) {
    
    if (N == 1)
        {
            
       
    var btns = [
        {type:'postback',
        title:'علمي',
        payload:'1'
        },
        {type:'postback',
        title:'ادبي',
        payload:'2'}
    ];
    var title = 'اختر الفرغ';
         }
    else if (N == 2) {
        var btns = [
         
    
{type:'postback',
        title:'احيائي',
        payload:'d1'
        },
        {type:'postback',
        title:'تطبيقي',
        payload:'d2'}

            
            
    ];
    var title = 'اختر واحد';
    }
    return {
        
           "template_type": "button",
     "text":title,
      "buttons":btns,
    }
    
}


function sendTextMessageT(sender,n) {
    
    var messageData = {attachment: {
        "type":"template",
      "payload":getOB(n)
    }
    } ;

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData
        }
    }, function(error, response, body) {
        if (error) {
            {console.log('Error sending messages: ', error);
               
            }
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    });
}






function sendFileMessage(sender,ob,fn) {
    var messageData = { attachment:{
        "type":ob.type,
        "payload":{
        "url":ob.url, 
        "is_reusable":true
      }
    },
        };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData
        }
    }, function(error, response, body) {
        if (error) {
            {console.log('Error sending messages: ', error);
               
            }
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
            console.log(ob);
            
        }
        
        fn();
        
    });
}









function sendfile() {
    
}


function stop() {
    s = false;
}


exports.sendTextMessage = sendTextMessage;
exports.sendTextMessageT = sendTextMessageT;
exports.sendFileMessage = sendFileMessage;
exports.stop = stop;