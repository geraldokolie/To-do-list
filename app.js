const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");   // personal module

const app = express();

// This array is created so that when we do receive a post request,
// we set it to whatever the user types in
//newListItems is set to equal to the items array
//which starts off containing three strings and this get passed on to the
//list.ejs under the variable name newListItems
const items= ["Buy food", "Cook food", "serve lunch"];
const workItems = ["write essay"];

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    
    let day = date.getDay();
    //we render our list.ejs passing in two variables one 
    //called listTitle and the other newListItems
    res.render("list", {listTitle: day, newListItems: items
    });
});
 //This receives the input that was posted on the home route 
 //and displays it to the user or the console
app.post('/', (req, res) => {
    //we grab the new item posted by the user and save it to the variable item
    // to the home route and our new item gets pushed to the end of the array
     let item = req.body.newItem;

     console.log(req.body)
     if (req.body.list === "Work List") {
        workItems.push(item)
        res.redirect("/work")
     } else {
        items.push(item)
        res.redirect("/")
     }
    //when the post request is triggered, this redirects 
    // it to the home route where the get request is triggered
  })

  app.get("/work", (req,res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
  });

  app.get("/about", (req, res) => {
    res.render("about")
  })

app.listen(3000, function(){
    console.log("server started on port 3000")
}) 