var express = require("express")
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars")
var cheerio = require("cheerio")
var request = require("request-promise")


// database models
var db = require("../models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NeverReadTheComments";

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var router = express.Router();

//get all
router.get("/", function(req, res) {
    db.Article.find({})
    .sort({createdAt:-1})
    .then(function(data){
        console.log(data)
        var object = {articles:data}
        res.render("index", object)
    })
})

//get comments
router.get("/comment/:id", function(req, res){
    db.Article.findById(req.params.id)
    .populate("comment")
    .then(function(data){
        res.json(data)
    })
    .catch(function(err) {
        
        res.json(err);
      });
})

router.post("/comment/:id", function(req, res){
    db.Comment.create(req.body)
    .then(function(data) {

      return db.Article.findByIdAndUpdate(req.params.id, { $push: { comment: data._id } }, { new: true });
    })
    .then(function(updatedArticle) {

      console.log ("article updated:" + updatedArticle)
      res.json(updatedArticle);
    })
    .catch(function(err) {

      console.log(err);
    });
})

// scrape route for articles on jalopnik.com
router.get("/scrape", function (req,res){
    
    request("https://kotaku.com/", function(error, response, html) {

 
        var $ = cheerio.load(html);

        $("article").each(function(i, element) {

            var link = $(element).find(".js_entry-link").attr("href");
            var title = $(element).find(".headline").children().text();
            var summary = $(element).find(".entry-summary").children().text();

            if (!title) {
                title = $(element).find(".excerpt").children("p").children("strong").text();
            }

            var newArticle = {
                link: link,
                title: title,
                summary: summary
            }

            console.log(newArticle)
            
            // save results
            if (title && link && summary){
                db.Article.create(newArticle)
                .catch(function(err){
                    console.log(err)
                })
            }
        })
   
    })
    .then(function(){
        res.redirect("/");
    })
    .catch(function(err){
        console.log(err)
    })
})

module.exports = router