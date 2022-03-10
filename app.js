const express = require("express");
const bodyParser = require("body-parser");
//const request=require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  //console.log("server is running");
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstname = req.body.fname;
  var secondname = req.body.lname;
  var email = req.body.email;
  console.log(req.body);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: secondname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/f691df79d2";

  const options = {
    method: "POST",
    auth: "bharati672:4fdcc88aa721733f80130c9a41cd0196-us6",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) res.sendFile(__dirname + "/sucess.html");
    else res.sendFile(__dirname + "/failure.html");
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.write(jsonData);
  request.end();
});
/* https://www.linkedin.com/developers/apps/verification/242f9879-7446-42f2-b4ae-49e9c1b70440

    client ID: 86zr2az9katsj2
    clientsecret: eoeYhPmddZ6H2nvK
    redirect-url: https://dtu-bois.com
    Url endcoded (redirect url): https%3A%2F%2Fdtu-bois.com
    https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile&client_id=86zr2az9katsj2&redirect_uri=https%3A%2F%2Fdtu-bois.com
*/

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port 3000");
});

// Api Key
// 4fdcc88aa721733f80130c9a41cd0196-us6
//id
//f691df79d2
