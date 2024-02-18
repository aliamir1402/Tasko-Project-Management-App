const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 5000;

// MongoDB connection URI
const uri =
  "mongodb+srv://aliamir:12345@tasknow.m5256qt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

// Connect to the MongoDB database when the server starts
client.connect().then(() => {
  console.log("Connected to MongoDB");
});

// Route to display data
app.get("/api/display", async (req, res) => {
  try {
    const database = client.db("tasknow");
    const collection = database.collection("tasks");
    const dataDisplay = await collection.find({}).toArray();
    res.json(dataDisplay);
    //console.log(dataDisplay);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add data
app.post("/api/add", async (req, res) => {
  try {
    const EntryData = req.body;

    const database = client.db("tasknow");
    const collection = database.collection("tasks");
    const dataDisplay = await collection.insertOne(EntryData);

    console.log("Data inserted:", dataDisplay.ops[0]);
    res.json(dataDisplay.ops[0]); // Send inserted data back as response
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/section-count", async (req, res) => {
  try {
    const database = client.db("tasknow");
    const collection = database.collection("tasks");
    const distinctTaskSections = await collection.distinct("section");
    res.json(distinctTaskSections);
    console.log("Distinct Task");
    console.log(distinctTaskSections);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/TaskPerSection", async (req, res) => {
  try {
    var allTasksArray = [];
    const database = client.db("tasknow");
    const collection = database.collection("tasks");
    const distinctTaskSections = await collection.distinct("section");
    for (let i = 0; i < distinctTaskSections.length; i++) {
      const taskSectionData = await collection
        .find({ section: distinctTaskSections[i] })
        .toArray();
      allTasksArray.push(taskSectionData);
    }
    res.json(allTasksArray);
    console.log("AllTasks");
    console.log(allTasksArray);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle the root path with a simple message
app.get("/", (req, res) => {
  res.send("Welcome to your Express server!");
});

// Close the MongoDB connection when the server stops
process.on("SIGINT", () => {
  client.close().then(() => {
    console.log("Disconnected from MongoDB");
    process.exit(0);
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
