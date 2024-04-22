const express = require("express");
const router = express.Router();
const fs = require("fs");
const filePath = "./data.json";

router.get("/", (req, res) => {
  var data = loadData();
  res.json(data);
});

router.post("/", (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var isCompleted = req.body.isCompleted;
  var data = loadData();
  data = [...data, { id, title, isCompleted }];
  saveData(data);
  res.json(data);
});
router.delete("/:id", (req, res) => {
  var id = req.params.id;
  var data = loadData();
  var newData = data.filter((item) => item.id != id);
  saveData(newData);
  res.json(newData);
});
router.put("/:id", (req, res) => {
  var id = req.params.id;
  var title = req.body.title;
  var isCompleted = req.body.isCompleted;
  var data = loadData();
  data = data.map((item) =>
    item.id == id ? { id, title, isCompleted } : item
  );
  saveData(data);
  res.json(data);
});
const saveData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};
const loadData = () => {
  var data = fs.readFileSync(filePath);
  if (data) return JSON.parse(data.toString());
  else return [];
};

module.exports = router;
