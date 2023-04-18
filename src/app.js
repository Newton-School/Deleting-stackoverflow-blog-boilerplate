const fs = require("fs");
const express = require("express");
const app = express();

// Importing discussions from discussions.json file
const blogs = JSON.parse(fs.readFileSync(`data/blogs.json`));

// Middlewares
app.use(express.json());


app.get("/api/v1/blogs", (req, res) => {

    res.status(200).json({
        status: "Success",
        message: "Blogs fetched successfully",
        data: {
          blogs,
        },
      });

});


app.post("/api/v1/blogs", (req, res) => {

  var obj = req.body;
  obj['id'] = (blogs[blogs.length-1].id)+1;
  blogs.push(obj);

  fs.writeFile(
    `data/blogs.json`,
    JSON.stringify(blogs),
    (err) => {
      res.status(200).json({
        status: "Success",
        message: "Blog added successfully"
      })
    }
  );

});


app.patch("/api/v1/blogs/:id", (req, res) => {

  const id = req.params.id * 1;
  const updatedDetails = blogs.find(
    (updatedDetails) => updatedDetails.id === id
  );

  const index = blogs.indexOf(updatedDetails);

  if (!updatedDetails) {
    return res.status(404).send({
      status: "Failed",
      message: "Blog not found!",
    });
  }

  Object.assign(updatedDetails, req.body);

  fs.writeFile(
    `data/blogs.json`,
    JSON.stringify(blogs),
    (err) => {
      res.status(200).json({
        status: "Success",
        message: `Blog Updated Successfully`
      });
    }
  );
});

// Write delete endpoint for deleting Blog

/*

Endpoint - /api/v1/blogs/:id

1. id will be given in api params.
2. Delete the blog with given id.


Response ==> 

1. Success
Return 200 Status code
json = {
        status: "Success",
        message: "Blog Deleted Successfully"
      }

2. Blog with given id not found

Return 404 Status code
json = {
  status: "Failed",
  message: "Blog not found!",
}

*/
app.delete("/api/v1/blogs/:id", (req, res) => {
    //Write your code here.
});



module.exports = app;