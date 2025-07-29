const express = require('express')
const app = express()
app.use(express.json());

let todos = [
  { id: 1, title: "Practice Node.js", done: false },
  { id: 2, title: "Study React components", done: false },
  { id: 3, title: "Build an Express API", done: true },
  { id: 4, title: "Explore Vue.js basics", done: false },
  { id: 5, title: "Write unit tests", done: true },
  { id: 6, title: "Review JavaScript ES6+", done: false },
  { id: 7, title: "Push code to GitHub", done: true },
  { id: 8, title: "Watch frontend tutorial", done: false }
];

const router = express.Router()


router.get("/todo", (req, res) => {
    res.json(todos)
})

router.put("/todo/:id", (req, res) => {
    const {done = false, title = "no name"} = req.body
    updateTodo(req.params.id, done, title)
    res.status(200).json({ message: "Updated" })
})
router.post("/todo", (req, res) => {
    const {title = "no name", done = false} = req.body
    createTodo(title, done)
    res.status(200).json({message: "created"})
})

router.delete("/todo/:id", (req, res) => {
    deleteTodo(req.params.id)
    res.status(200).json({message: "deleted"})
})


function updateTodo(id, done, title) {

    const todo = todos.find(todo => todo.id == id)
    todo.done = done === "true" || done === true
    todo.title = title
}

function createTodo(title, done) {

    const todo = {"id": todos.length + 1, "title": title, "done": done}
    todos.push(todo)

}


function deleteTodo(id) {

    todos = todos.filter(todo => todo.id !== parseInt(id))

}


app.use('/', router);
app.listen(3000, () => console.log("Server is running on port 3000"));