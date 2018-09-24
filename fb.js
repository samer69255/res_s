
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
title:'الكرخ الاولى'
payload:'c1'},

{type:'postback',
title:'الكراخ الثانية',
payload:'c2'},

{type:'postback',
title:'الكرخ الثالثة',
payload:'c3'},

{type:'postback',
title:'الرصافة الاولى',
payload:'c4'},

{type:'postback',
title:'الرصافة الثانية',
payload:'c5'},

{type:'postback',
title:'الرصافة الثالثة',
payload:'c6'},

{type:'postback',
title:'البصرة',
payload:'c7'},

{type:'postback',
title:'نينوى',
payload:'c8'},

{type:'postback',
title:'صلاح الدين',
payload:'c9'},

{type:'postback',
title:'الانبار',
payload:'c10'},

{type:'postback',
title:'كركوك',
payload:'c11'},

{type:'postback',
title:'ديالى',
payload:'c12'},

{type:'postback',
title:'ذي قار',
payload:'c13'},

{type:'postback',
title:'بابل',
payload:'c14'},

{type:'postback',
title:'القادسية',
payload:'c15'},

{type:'postback',
title:'النجف',
payload:'c16'},

{type:'postback',
title:'واسط',
payload:'c17'},

{type:'postback',
title:'كربلاء',
payload:'c18'},

{type:'postback',
title:'ميسان',
payload:'c19'},

{type:'postback',
title:'المثتى',
payload:'c21'},

{type:'postback',
title:'اربيل',
payload:'c22'},

{type:'postback',
title:'السليمانية',
payload:'c23'},

{type:'postback',
title:'دهوك',
payload:'c24'}


            
            
    ];
    var title = 'اختر المحافظة';
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