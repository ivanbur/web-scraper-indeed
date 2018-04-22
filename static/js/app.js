var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app     = express();

var json = { jobtitle : [], company: [], location: [], allLinks: []};

app.get('', function(req, res) {

  url = 'https://www.indeed.com/jobs?q=programmer&l=Corte+Madera,+CA&start=0';

  request(url, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);

      var alreadyPushed = false;

      var jobtitle = [];
      var tempJobTitle = [];
      var company = [];
      var location = [];
      var allLinks = [];

    //   $('.jobtitle.turnstileLink').filter(function() {
    //     var data = $(this);

    //     for (var i = 0; i < data.length; i++) {
    //       jobtitle.push(data.children().text().trim());
    //     }
    //   })

    //   $('.jobtitle').filter(function(){
    //     var data = $(this);

    //     for (var i = 0; i < data.length; i++) {
    //       jobtitle.push(data.children().text().trim());
    //     }

    //     salary = data.children().last().children().last().text().trim();

    //     json.jobtitle = jobtitle;
    //     json.salary = salary;
    //   })

    //   $('.company').filter(function() {
    //     var data = $(this);

    //     for (var i = 0; i < data.length; i++) {
    //       company.push(data.children().text().trim());
    //     }
        
    //     json.company = company;
    //   })

      // $('.sjcl').filter(function() {
      //   var data = $(this);

      //   for (var i = 0; i < data.length; i++) {
      //     location.push(data.children().last().text().trim());
      //     company.push(data.children().first)
      //   }

      //   json.location = location;
      // })

    //   $('.ratingValue').filter(function(){
    //     var data = $(this);
    //     rating = data.text().trim();

    //     json.rating = rating;
    //   })
    // }

      $(".jobtitle").filter(function() {
        var data = $(this);

        jobtitle.push(data.text().trim());

        json.jobtitle = jobtitle;
      })

      console.log("jobtitle" + jobtitle + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

      $("a").filter(function(element) {
        var data = $(this);
        var jobTitleLength = jobtitle.length;

        if (!alreadyPushed) {
          for (var n = 0; n < jobtitle.length; n++) {
            tempJobTitle.push(jobtitle[n]);
            console.log(n + "; Success")
            alreadyPushed = true;
          }
        }

        console.log("debug1");
        console.log(data);
        console.log("\n\n\n")
        console.log(data['0'].attribs.href);
        console.log(data.href);

        for (var i = 0; i < jobTitleLength; i++) {
          if (data.text() == tempJobTitle[i]) {
            console.log(data.text());
            allLinks.push(data['0'].attribs.href);
            //window.open(data['0'].attribs.href);

            tempJobTitle.splice(i, 1);
          } else {
            console.log("tempJobTitle2 - " + tempJobTitle);
          }
        }

        console.log("debug3");

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

    fs.writeFile('./../../output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    //res.send('Check your console!')
    //res.send(json);
  })
})

app.listen(8081);
console.log("Magic happens on port 8081");
exports = module.exports = app;