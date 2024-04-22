var fs = require("fs");
// fs.readFile("input.txt", function (err, data) {
//   if (err) return console.error(err);
//   console.log(data.toString());
// });
// var data = fs.readFileSync("input.txt");
// console.log(data.toString());
var data = [
  {
    id: 1,
    name: Arzoo,
  },
  {
    id: 2,
    name: Vishal,
  },
];
fs.writeFile("data.json", JSON.stringify(data), function (err) {
  if (err) return console.error(err);
  console.log("file write operation done");
});
console.log("from reading file");
