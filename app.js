const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/967dee65d0";
    const options={
        method:"POST",
        auth:"wasif:8c735426e15feacb58496b01392c48cd-us21"
    }
    const request=https.request(url, options,function(response) {
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Listening to 30000");
})

// APi Key
// 8c735426e15feacb58496b01392c48cd-us21
// List
// 967dee65d0