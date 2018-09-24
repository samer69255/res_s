
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



function sendTextMessageT(sender, text) {
    
    var messageData = {attachment: {
        "type":"template",
      "payload":{
        
           "template_type": "list",
  "top_element_style": "LARGE",
  "elements": [
    {
      "title": "<TITLE_TEXT>",
      "subtitle": "<SUBTITLE_TEXT>",
      "image_url": "<IMAGE_URL_FOR_THUMBNAIL>",          
      "buttons": [],
      "default_action": {
        "type": "web_url",
        "url": "<URL_TO_OPEN_WHEN_ITEM_IS_TAPPED>",
        "messenger_extensions": false,
        "webview_height_ratio": "COMPACT"
      }
    },
    ...
  ],
   "buttons": [<BUTTON_OBJECT] 
         
      }
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