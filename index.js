'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.send("hiiiiiiii")
})

let token = "EAAck6HVMCxYBAARL5kTT62fxPHUgMUTZAgessatN86qiaWodTTIyejb5gGR02dxKPLuCEhmza02XZCrZAyUzTjuR0kDZAYNIEmbZAOtgmIU3pWu3B7aXZB9wgY1r1AYSGZBIcK6LTZAd0f9wOZCRpjE88E8sDUUNo0ZCpDZAoRc5fjSFgZDZD"

app.get('/webhook/', function(req, res){
    if (req.query['hub.verify_token']== "damyantjain"){
        res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token")
})

app.post('/webhook/',function(req, res){
    let messaging_events = req.body.entry[0].messaging
    for (let i =0; i < messaging_events.length; i++){
        let event = messaging_events[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            decideMessage(sender, text)

            /*if(text.includes("Happy")){
                sendText(sender, "Are you really " + text.substring(0,100) + "?")
            }
            else{
            sendText(sender, "Text echo: " + text.substring(0,100))
            }*/
        }
        if (event.postback){
            let text = JSON.stringify(event.postback)
            decideMessage(sender, text)
        }
    }
    res.sendStatus(200)
})






function decideMessage(sender, text1) {
    let text= text1.toLowerCase()
    if (text.includes("summer")) 
    {
        sendImageMessage(sender)
    }
    else if(text.includes("winter"))
    {
        sendGenericMessage(sender)
    }
    else if(text.includes("fall"))
    {
        sendVideoMessage(sender)
    }
   /* else if(text.includes("rainy"))
    {
        sendGenericMessage(sender)
    }*/
    else if(text.includes("happy"))
    {
        sendText(sender, "Are you really happy")
    }
    else
    {
        sendText(sender, "I like fall")
        sendButtonMessage(sender, "What is your favorite season?")
    }
}








function sendText(sender, text) {
    let messageData = {text: text}
    sendRequest(sender, messageData)
}

function sendButtonMessage(sender, text){
    let messageData={
        "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":text,
              "buttons":[
                {
                    "type":"postback",
                    "title":"Summer",
                    "payload":"summer"
                },
                {
                    "type":"postback",
                    "title":"Winter",
                    "payload":"winter"
                },
                {
                    "type":"postback",
                    "title":"Fall",
                    "payload":"fall"
                },
               /* {
                    "type":"postback",
                    "title":"Rainy",
                    "payload":"rainy"
                }*/
              ]
            }
          }
    }
    sendRequest(sender, messageData)
}

function sendImageMessage(sender){
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
               "template_type": "media",
               "elements": [
                  {
                     "media_type": "image",
                     "url": "https://www.facebook.com/photo.php?fbid=10154995201067788&set=basw.Abo8tFg0xfH-kgSa3vURzMCJOb02W2VuZXv5bkIU_vaxNNe0zTlplpr6uTDlwfNV4gcweEwe8Ku4RR8dFTsA43KB6u9bwqrBOQCuEbcpS6uIYAVDjro8OWICTLRTijbZR6AL0G8CaXAg6VpqvgMvEnaM.1721738948104276.10154995200512788.1631622686917401.1605997856122075.83365891478.837404456352533.1708855852740314.10154995201067788.790734197674704&type=1&opaqueCursor=AbpJ73Fv6WeItpNfQiAe6UGw0Wc2U13ei8osaOhES4-Hw_MbH6HSMcB8c-U13VaSqNguTm3r8PeyiS-XDYv9V_mTBMnbU9tE7k0lvDnrY0A9DSjGTi9Hw0oE72mhp1TpbhjCbruYFdf4Ko5AYqeQLnt17CejH3vb-jigqhIZYJMxZc4XPTM0eBzB8RqK4oAbB0Je1YB82cCpZvGscC8iZ-Nbv_7I2RIpODbDR4B0nM7iL9SgzdrFVEsFNu1F9DnO-SlpW2b6xQH8LjCTftisFq4DdMSi9i4qsKg5aC5kF0sQ26NyeDLnOMLfgagA8rgpsqMdCzL8kZ1qQKiz41ruGVmgB1V94Fxz-fDERH2BY80X1rXWRh71hQ6wYl_IM3GMrD1rfkDCUzvXpdTizuKVIwpq57fTwUfekf1PxUxxq7Vxffy4PoNrO3dllij532IjK4_wHxT7Yv-7kMFrFt-8s-rxlwCgOXsul3n3S-3kU3R_RBZu4R6a0z5ekBpM3aedJQ4&theater",
                     "buttons": [
                        {
                           "type": "web_url",
                           "url": "https://en.wikipedia.org/wiki/Summer",
                           "title": "More about summer",
                        }
                     ]
                    }
               ]
            }
          } 
    }
    sendRequest(sender, messageData)
}

function sendGenericMessage(sender){
    let messageData = {
        "attachment":{
            "type":"template",
            "payload":{
              "template_type":"generic",
              "elements":[
                 {
                  "title":"Welcome!",
                  "image_url":"http://images6.fanpop.com/image/photos/36200000/snow-image-snow-36241624-500-375.png",
                  "subtitle":"Winter is love.",
                  "default_action": {
                    "type": "web_url",
                    "url": "http://www.fanpop.com/clubs/snow/images/36241624/title/snow-winter-photo",
                    "messenger_extensions": true,
                    "webview_height_ratio": "tall",
                  },
                  "buttons":[
                    {
                      "type":"web_url",
                      "url":"https://google.com",
                      "title":"View Website"
                    },
                    {
                      "type":"postback",
                      "title":"Start Chatting",
                      "payload":"hey"
                    }              
                  ]      
                }
              ]
            }
          }
    }
    sendRequest(sender, MessageData)
}


function sendVideoMessage(sender){
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
               "template_type": "media",
               "elements": [
                  {
                     "media_type": "video",
                     "url": "https://www.facebook.com/smosh/videos/404945563247669/",
                     "buttons": [
                        {
                           "type": "web_url",
                           "url": "https://en.wikipedia.org/wiki/Fall",
                           "title": "More about fall",
                        }
                     ]
                    }
               ]
            }
          } 
    }
    sendRequest(sender, messageData)
}








function sendRequest(sender, messageData){
    request({
        url:"https://graph.facebook.com/v2.6/me/messages",
        qs : {access_token : token},
        method: "POST",
        json: {
            recipient: {id: sender},
            message : messageData
        }
    }, function(error, response, body) {
        if (error) {
            console.log("sending error")
        }else if (response.body.error){
            console.log("response body error")
        }
    })
}

app.listen(app.get('port'), function(){
    console.log("running: port")
})