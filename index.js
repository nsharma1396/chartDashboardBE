const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const bodyparser = require("body-parser");
const app = express();

function computeStub() {
  //   const timeStamp = new Date().getTime();

  const strokes = ["red", "blue", "green"];
  const eachCoreCapacity = 50;
  const totalCores = eachCoreCapacity * strokes.length;

  let prevDate;
  const data = Array.from(Array(3).keys()).map((key, index) => {
    if (index === 0) {
      prevDate = new Date();
    }
    console.log(prevDate);
    const label = new Date(prevDate.getTime() + 100000);
    prevDate = label;
    return {
      label: label.getTime(),
      value: strokes.map(stroke => (Math.random() * 1000) % eachCoreCapacity)
    };
  });
  return {
    data,
    strokes,
    totalCores,
    status: 200
  };
}
// [
//   {
//     label: new Date(timeStamp - 100000).getTime(),
//     value: [1, 20, 3]
//   },
//   {
//     label: new Date(timeStamp + 100000).getTime(),
//     value: [5, 10, 7]
//   },
//   {
//     label: new Date(timeStamp + 200000).getTime(),
//     value: [8, 20, 10]
//   }
// ];

// app.use(bodyparser.json({ extended: true }));
// app.use(bodyparser.urlencoded({ extended: true }));

app.use(morgan("tiny"));
app.use(cors());

app.get("/cpuLoad", (req, res) => {
  res.send(computeStub());
});

app.listen(process.env.PORT || 5001, () => {
  console.log("Server running!");
});
