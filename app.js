var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var cmd     = require('node-cmd/cmd.js');
var os      = require('os');
var jsonObj = require(os.homedir() + "/downloads/my-download.json");

var app = express();

var json = { jobtitle : [], company: [], location: [], allLinks: []};

app.get('', function(req, res) {

  var job = jsonObj["job"].trim();
  var location = jsonObj["location"].trim();
  var tempJob = job;
  var tempLocation = location;

  String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
  }

  for (var num1 = 0; num1 < job.length; num1++) {
    if (job.charAt(num1) == " ") {
      tempJob = job.replaceAt(num1, "+");
    }
  }

  job = tempJob;

  for (var num2 = 0; num2 < location.length; num2++) {
    if (location.charAt(num2) == " ") {
      tempLocation = location.replaceAt(num2, "+");
    } else if (location.charAt(num2) == ",") {
      tempLocation = location.replaceAt(num2, "%2C");
    }
  }

  location = tempLocation;

  url = 'https://www.indeed.com/jobs?q=' + job + '&l=' + location + '&start=0';
  console.log(url);

  request(url, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);

      var alreadyPushed = false;

      var jobtitle = [];
      var tempJobTitle = [];
      var company = [];
      var location = [];
      var allLinks = [];

      $(".jobtitle").filter(function() {
        var data = $(this);

        jobtitle.push(data.text().trim());

        json.jobtitle = jobtitle;
      })

      $("a").filter(function(element) {
        var data = $(this);
        var jobTitleLength = jobtitle.length;

        if (!alreadyPushed) {
          for (var n = 0; n < jobtitle.length; n++) {
            tempJobTitle.push(jobtitle[n]);
            alreadyPushed = true;
          }
        }

        for (var i = 0; i < jobTitleLength; i++) {
          if (data.text() == tempJobTitle[i]) {
            allLinks.push(data['0'].attribs.href);

            tempJobTitle.splice(i, 1);
          }
        }

      })

      $(".location").filter(function() {
        var data = $(this);

        location.push(data.text());

        json.location = location;
      })

      $(".company").filter(function() {
        var data = $(this);

        company.push(data.text().trim());

        json.company = company;
      })

    }

    console.log(json);
    for (var n = 0; n < jobtitle.length; n++) {
      console.log(jobtitle[n] + " :: " + company[n] + " :: " + location[n] + "\n");
      res.write(jobtitle[n] + " :: " + company[n] + " :: " + location[n] + "\n");
    }

    res.write("\n\n\n\n\n" + "Switch to the tab that says 'localhost:5000', hard refresh the page by pressing command + shift + r, and clicks 'Go' to run the program.")

    json.allLinks = allLinks;

    fs.writeFile('./static/js/output.json', JSON.stringify(json, null, 4), function(err){
      console.log('Now type in "python3 pythonCode.py"');
    })

  })
})

app.listen(8000);
console.log("Refresh localhost:8000");
exports = module.exports = app;