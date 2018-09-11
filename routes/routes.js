var fs = require('fs');

var appRouter = function (app) {

  app.get("/checkpoint/:id", function (req, res) {

    return new Promise(function(resolve, reject) {
        fs.readFile("./" + req.params["id"] + ".json", function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
      }).then(function(results) {
          res.status(200).send(results);
      }).catch(function(err) {
          res.status(500).send("Error saving data...");
      });
  });

  app.post('/checkpoint/:id', function (req, res) {

    return new Promise(function(resolve, reject) {
        data = JSON.stringify(req.body)
        fs.writeFile("./" + req.params["id"] + ".json", data, function(err) {
            if (err) reject(err);
            else resolve(data);
        });
      }).then(function(results) {
          console.log("results here: " + results)
          res.status(200).send("data: " + JSON.stringify(req.body) + " params: " + JSON.stringify(req.params));
      }).catch(function(err) {
         console.log("error here: " + err);
          res.status(500).send("Error saving data...");
      });
  });
}
  
module.exports = appRouter;