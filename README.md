# [Friend Finder](https://friendfinderbl2.herokuapp.com/)
Complete a short survey to find your new best friend!
![friendfinder](friendfinder.png)

## Getting Started
Friend finder is a full stack website that allows users to find their new friend by filling out a 10 question survey.
Users can also access all friends by looking at /api/friends for JSON object of all friends.
### Friend Finder is created with Node.js and node packages.
* [Node.js](https://nodejs.org/en/) 
* [express](https://www.npmjs.com/package/express)
* [body-parser](https://www.npmjs.com/package/body-parser)
### As well as your usual website technologies:
* HTML
* CSS
* JavaScript / [jQuery](https://jquery.com/)

## Creating Friend Finder
The server.js file is very bare because it requires all the logic from other javascript files. Everything other than these two lines are initializing the server.
``` js
require("./app/public/routing/apiRoutes.js")(app);
require("./app/public/routing/htmlRoutes.js")(app);
```
In the apiRoutes.js file, we have logic for retrieving the JSON object of friend data.
``` js
app.get("/api/friends", function (req, res) {
    res.json(friendData);
});

app.post("/api/friends", function (req, res) {
    friendData.push(req.body);
    res.json(true);
});
```
In the htmlRoutes.js file, we have logic for redirecting the user to the home page, or server page.
``` js
app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../survey.html"));
});
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../home.html"));
});
```
The logic for acutally finding the friend is contained in the app.js file. It takes the scores of the recently completed survey and compares them to every other friend already in the data and returns the one with the lowest difference in score. In other words, it returns the friend with the most answers in common.
``` js
for (var j = 0; j < data.length; j++) {
    var scores = data[j].scores;
    var score = 0;
    for (var i = 0; i < scores.length; i++) {
        score += Math.abs(current.scores[i] - scores[i]);
    }
    if (score < lowest) {
        lowest = score;
        friend = data[j];
    }
}
```
## Learning Points
The goal of Friend Finder was to learn how to use express and create my first full stack website. This is my first time deploying to heroku, so that was also a new experience. It's pretty straight forward though
```
heroku create 
```
then 
```
git push heroku master
```
For express, there was a lot of new syntanx that I needed to learn. This was also the first time I connected a front end with a back end so I had some trouble linking the files. For example, my CSS and JavaScript were not working until I added:
``` js
app.use(express.static("app/public"));
```
That line is a built in middleware funciton that allows you to serve static files like images, CSS files, and JavaScript files. 

## Author
[Bryan Liang](https://github.com/liangbryan2)