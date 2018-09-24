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
const fb = require('./fb');
const {google} = require('googleapis');



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
            
            if (!(sender in Users)) {
                Users[sender] = {};
                
            }
            
            
            if (! Users[sender].stat) {
                Users[sender].stat = 'g1'
                return fb.sendTextMessageT(sender,1);
            } 
            console.log(Users[sender].stat);
            
            
            if (Users[sender].stat == 'c'){
                Users[sender].c = text;
                fb.sendTextMessage(sender,'اكتب اسم المدرسة');
                Users[sender].stat = 'sc';
                return;
            } 
            
          if (Users[sender].stat == 'sc')  {
              Users[sender].sc = text;
             fb.sendTextMessage(sender,'سيتم ارسال النتائج خلال بضع ثواني');
              Users[sender].stat = 'working';  
              
              
              
              var de = Users[sender].de;
              var c = Users[sender].c;
              var sc = Users[sender].sc;
              if (de == '2') url = '0BxQWfstx5vwNN2ZZTGhqR0x1UzA';
              else url = '0BxQWfstx5vwNN2ZZTGhqR0x1UzA';
              
              
              
              listFiles(url,(err,rr) => {
                  onF1(rr,sender);
              });
       
              
              
                                   }
            
           
            
            
            






        }
        if (event.postback) {
            var text = JSON.stringify(event.postback);
            var de = event.postback.payload;
            
            Users[sender].de = de;
            
           
                    if (Users[sender].stat == 'g1')
                        {
                            
                            if (de == '1') {
                                fb.sendTextMessageT(sender,2);
                                 Users[sender].stat = 'g2';
                            }
                            else 
                            {
                                Users[sender].stat = 'c';
                                fb.sendTextMessage(sender,'اكتب المحافظة');
                            }
                           
                            
                            return;
                        }
                
                    fb.sendTextMessage(sender,'اكتب المحافظة');
                    
                    Users[sender].stat = 'c';
                
            
            continue;
        }
    }
    
});

// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.FB_PAGE_ACCESS_TOKEN




function onF1(res,Id) {
    const files = res.data.files;
    
    if (files.length) {
        var id = null;
      for (var i in files)
          {
              if ((files[i].name).indexOf(Users[Id].c) > -1 ) {  id=files[i].id; break;    }
            
                  
          }
        
        
        if (id == null) fb.sendTextMessage(Id,'تأكد من اسم المحافظة واعد المحاولة');
        else
            {
                
                listFiles(id,(err,rr) => {
                    onF2(rr,Id);
                })
            }
        
        
        
    } else {
      fb.sendTextMessage(Id,'لم يتم رفع النتائج الخاصة بهذه المحافظة اعد المحاولة في وقت اخر');
    }
    
    
}



function onF2(res,Id) {
    const files = res.data.files;
    if (Users[Id].de == '2')
    var id = files[0].id;
    else {
        var s1 = files[0].name.indexOf('تطبيقي');
        if (s1 > -1) {var S1 = files[1].id; var S2 = files[0].id}
        else {var S1 = files[0].id; var S2 = files[1].id};
        
        if (Users[Id].de == 'd1') var id = S1; else var id = S2;
    }
    
    listFile(id,(err,rr) => {
        onF3(rr,Id);
    });
}


function onF3(res,Id) {
     const files = res.data.files;
    
    if (files.length) {
        var id = null;
      for (var i in files)
          {
              if ((files[i].name).indexOf(Users[Id].sc) > -1 ) {  id=files[i].name; break;    }
            
                  
          }
        
        
        if (id == null) fb.sendTextMessage(Id,'تأكد من اسم المدرسة واعد المحاولة');
        else
            {
                
                listFiles(id,(err,rr) => {
                    if (err) console.log(err);
                    fb.sendTextMessage(Id,id);
                    fb.sendTextMessage(Id,'شكرا لك');
                });
            }
        
        
        
    } else {
      fb.sendTextMessage(Id,'لم يتم رفع النتائج الخاصة بهذه المحافظة اعد المحاولة في وقت اخر');
    }
    
}



function ft(txt) {
    return txt.match(/آ-ي/g);
}



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









// google drive
//==========================================

 (function() {
        
         const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = 'token.json';


// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), start);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
        
      start(oAuth2Client);
       
});
  });
}

        
    })();



function start(auth) {
 drive = google.drive({version: 'v3', auth});
    console.log('hi');
}

function listFiles(fileId,callback) {
  
  drive.files.list({
      includeRemoved: false,
    spaces: 'drive',
    fileId: fileId,
    fields: 'nextPageToken, files(id, name)',
    q: `'${fileId}' in parents`
  }, callback);
}
   

//=================================


















// spin spin sugar
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});
