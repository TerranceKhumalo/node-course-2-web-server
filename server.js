const express = require("express");
const app = express();
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;  

/**---------------------------- */


//view engine for dynamic web pages
app.set("view engine", "hbs");
//creating reusable components
hbs.registerPartials(__dirname+"/views/partials");
//middle ware

app.use((req, res, next)=>{

    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile("server.log", log + '\n', (err)=>{

        if (err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});

// app.use((req, res, next)=>{
//     res.render("maintance.hbs");
// });//maintance page

app.use(express.static(__dirname +"/public"));
/**----------------middle wear--------------------- */
//a helper function
hbs.registerHelper("getCurrentYear", ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper("screemIt", (text)=>{
    return text.toUpperCase();
});




app.get("/", (req, res)=>{
    
    res.render("home.hbs", {
        pageTitle: "About page",
        welcomeTitle: "Good morining home page"
    })
});

app.get("/bad", (req, res)=>{
    res.send({
        errormessage: "wrong message for now"
    })
});

app.get("/about", (req, res)=>{
    res.render("about.hbs", {
        pageTitle: "About page",
        welcomeTitle: "About page baba!"
    });
});

app.listen(port,()=>{
    console.log(`Listing to port ${port}`);
});