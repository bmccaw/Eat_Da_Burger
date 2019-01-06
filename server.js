var express = require("express");
var methodOverride = require('method-override');
var path = require('path');

var PORT = process.env.PORT || 8080;

var app = express();

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allow the use of PUT and POST directly in the HTML
app.use(methodOverride('_method'));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '/public')));

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});