// get express (needed for server)
const express = require("express");
const app = express();
app.use(express.static("public"));

// connect to database
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Ben:test123@cluster0.hcq9y6f.mongodb.net/application-DB", {useNewUrlParser: true});

// create format for entering applications
const applicationSchema = {
  
    name: String,
    email: String,
    w_number: String

}
// connect to a specific part of the database (application-DB.applications)
const Application = mongoose.model("applications", applicationSchema);

// fire when an application form is submitted
app.post("/application-create", function (req,res) { // FIXME: change application-create to the name of the application form
    console.log('posting service');
    // create json data from form
    const apply = new Application({
      name: req.body.name,
      email: req.body.email,
      w_number: req.body.w_number
    });
    // save json data to the database
    apply.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send("Application sucessful!"); // FIXME: display a better sucess screen using html and css
      }
    });
  });

// send user to index page when they search our website url
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// listen on port 3000
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});