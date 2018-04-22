var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var os      = require('os');
var jsonObj = require(os.homedir() + "/downloads/my-download.json");

var app = express();

var json = { jobtitle : [], company: [], location: [], allLinks: []};

app.get('', function(req, res) {

  var job = jsonObj["job"].trim();
  var location = jsonObj["location"].trim();

  url = 'https://www.indeed.com/jobs?q=' + job + '&l=' + location + '&start=0';

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

      $('.clickcard').filter(function() {
        var data = $(this);

        for (var i = 0; i < data.length; i++) {
          jobtitle.push(data.children().first().text().trim());
          company.push(data.children().eq(1).first().text().trim());
        }

        json.jobtitle = jobtitle;
        json.company = company;
      })
    }

    console.log(json);
    for (var n = 0; n < jobtitle.length; n++) {
      console.log(jobtitle[n] + " :: " + company[n] + " :: " + location[n] + "\n");
      res.write(jobtitle[n] + " :: " + company[n] + " :: " + location[n] + "\n");
    }

    json.allLinks = allLinks;

    fs.writeFile('./output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

  })
})

app.listen(8081);
console.log("Magic happens on port 8081");
exports = module.exports = app;