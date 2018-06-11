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

            if(text.includes("Happy")){
                sendText(sender, "Text echo: " + text.substring(0,100))
            }
            else{
            sendText(sender, "Text echo: " + text.substring(0,100))
            }
        }
    }res.sendStatus(200)
})

function sendText(sender, text) {
    let messageData = {text: text}
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