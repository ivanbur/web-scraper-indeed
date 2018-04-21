var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('', function(req, res) {

  url = 'https://www.indeed.com/jobs?q=programmer&l=Corte+Madera,+CA&start=0';

  request(url, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);

      var jobtitle = [];
      var company = [];
      var location = [];
      var json = { jobtitle : [], company: [], location: []};

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

      $(".location").filter(function() {
        var data = $(this);

        console.log("index");
        location.push(data.text());

        json.location = location;
      })

      $(".company").filter(function() {
        var data = $(this);

        console.log("index2");
        company.push(data.text().trim());

        json.company = company;
      })

      $('.clickcard').filter(function() {
        var data = $(this);
        res.send(data);
        res.send("hello");
        console.log(data);
        console.log("hello");

        for (var i = 0; i < data.length; i++) {
          jobtitle.push(data.children().first().text().trim());
          company.push(data.children().eq(1).first().text().trim());
        }

        json.jobtitle = jobtitle;
        json.company = company;
      })
    }

    console.log(json);
    for (var i = 0; i < jobtitle.length; i++) {
      console.log(jobtitle[i] + " :: " + company[i] + " :: " + location[i] + "\n");
    }

    // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    //   console.log('File successfully written! - Check your project directory for the output.json file');
    // })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;