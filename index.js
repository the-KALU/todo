import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const data = {
    posts: [],
    completed: [],
};

var postIndex = 0;

function removeItemOnce(arr, index) {
    if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function hasWhiteSpace(s) 
{
    var reWhiteSpace = new RegExp(/^\s+$/);
    if (reWhiteSpace.test(s)) {
        return false;
    }
    return true;
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("todo.ejs" , data)
});

app.post("/create-todo", (req, res) => {

    if (req.body.create__todo !== "" && hasWhiteSpace(req.body.create__todo)) {
    const newTodo = req.body.create__todo;
    data.posts.push(newTodo)};    
    res.redirect("/");

});

app.get("/delete/:i",(req,res)=>{
    
    const delPostIndex = req.params.i;
    removeItemOnce(data.posts, delPostIndex);
    res.redirect("/");

});

app.get("/delete/completed/:i",(req,res)=>{
    
    const delPostIndex = req.params.i;
    removeItemOnce(data.completed, delPostIndex);
    res.redirect("/");

});

app.get("/completed/:i", (req, res) => {

    const completedIndex = req.params.i;
    const completedTodo = data.posts[completedIndex];
    removeItemOnce(data.posts, completedIndex);
    data.completed.push(completedTodo);
    res.redirect("/");

})

app.get("/edit/:i", (req, res)=> {

    postIndex = req.params.i;
    const editPost = data.posts[postIndex];
    res.render("edit.ejs", {data:editPost});

});

app.post("/update", (req, res) => {

    const update = req.body.edit__todo;
    data.posts[postIndex] = update;
    res.redirect("/");
    
});

app.listen(port, () => {
    console.log (`Server is running on port ${port}`);
});