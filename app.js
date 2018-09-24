//This is still work in progress
/*
Please report any bugs to nicomwaks@gmail.com
i have added console.log on line 48
 */








const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var fs = require('fs');
var cookieParser = require('cookie-parser');
const app = express();
app.use(express.static('public'));
var gis = require('g-i-s');
const fb = require('./fb');



app.set('port', (process.env.PORT || 5000));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
var Users = {};

// index
app.get('/', function (req, res) {
   res.end('');
});



// for facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'samer') {
        res.send(req.query['hub.challenge']);
        console.log(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong token');
    }
})

// to post data
app.post('/webhook/', function (req, res) {

   // console.log(cmds);
    var messaging_events = req.body.entry[0].messaging;
    console.log(messaging_events);
    res.sendStatus(200);
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;



        if (event.message && event.message.text) {

        

            var text = event.message.text;
            console.log(text);
            text = text.trim().toLowerCase();
            
            if (! sender in Users) {
                Users[sender] = {};
                
            }
            
            
            fb.sendTextMessageT(sender,1);
            
            






        }
        if (event.postback) {
            var text = JSON.stringify(event.postback);
            var de = event.postback.payload;
            if (de == '1' || de == '2')
                {
                    fb.sendTextMessageT(sender,2);
                    Users[sender].de = de;
                }
            else  if (de.charAt(0) == 'c') {
                Users[sender].c = de;
                fb.sendTextMessage(sender,'...');
            }
            else {
                console.log(JSON.stringify(Users,null,4));
            }
            
            continue;
        }
    }
    
});

// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.FB_PAGE_ACCESS_TOKEN









function getHelp() {
    var txt = `مرحبا بك,
يمكنيي مساعدتك عبر الاوامر التالية:
اكتب صور للبحث عن صور
اكتب فيديو او يوتيوب للبحث عن فيديو في يوتيوب
اكتب ملف عندما تريدني ان ارفق لك ملف من رابط خاص
اكتب توقف للتوقف عن ارسال الفيديو او الصور
اكتب جديد للبدء من جديد`;
    return txt;
}


// spin spin sugar
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});
