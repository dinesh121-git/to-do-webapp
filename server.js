require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});
const Task = mongoose.model("Task", TaskSchema);

app.post("/add", async (req, res) => {
    const task = new Task({ text: req.body.text, completed: false });
    await task.save();
    res.json(task);
});

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.put("/update/:id", async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, { completed: req.body.completed });
    res.json({ message: "Task updated" });
});

app.delete("/delete/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
