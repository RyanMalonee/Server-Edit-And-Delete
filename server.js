// Used class file to determine what packages were needed
// and how to use them within the file
const express = require("express");
const app = express();
const joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const upload = multer({ dest: __dirname + "/public/images" });

app.listen(3000, () => {
  console.log("Listening");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let cities = [
  {
    name: "New York City",
    country: "United States",
    population: 8804190,
    prominentLanguage: "English",
    landmarks: ["Statue of Liberty", "Empire State Building", "Central Park"],
    funFact: "More than 200 languages are spoken in NYC.",
  },
  {
    name: "London",
    country: "United Kingdom",
    population: 9648110,
    prominentLanguage: "English",
    landmarks: ["Big Ben", "London Eye", "Tower Bridge"],
    funFact: "London has the world's oldest underground railway.",
  },
  {
    name: "Paris",
    country: "France",
    population: 11208000,
    prominentLanguage: "French",
    landmarks: ["Eiffel Tower", "Notre-Dame Cathedral", "Arc de Triomphe"],
    funFact: "Paris is the capital of France.",
  },
  {
    name: "Rome",
    country: "Italy",
    population: 4316000,
    prominentLanguage: "Italian",
    landmarks: ["Colosseum", "Roman Forum", "Pantheon"],
    funFact:
      "Ancient Romans believed that no matter what happened to the world, Rome would go on forever.",
  },
  {
    name: "Sydney",
    country: "Australia",
    population: 5121000,
    prominentLanguage: "English",
    landmarks: ["Sydney Opera House", "Sydney Harbour Bridge", "Bondi Beach"],
    funFact: "The Sydney Tower Eye can sway up to a meter in strong winds.",
  },
  {
    name: "Tokyo",
    country: "Japan",
    population: 13960000,
    prominentLanguage: "Japanese",
    landmarks: ["Tokyo Tower", "Shinjuku Gyoen National Garden", "Mount Fuji"],
    funFact:
      "Tokyo's Tsukiji Fish Market was once the world's largest seafood market.",
  },
];

app.post("/api/cities", upload.single("img"), (req, res) => {
  const result = validateCity(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const newCity = {
    name: req.body.name,
    country: req.body.country,
    population: req.body.population,
    prominentLanguage: req.body.prominentLanguage,
    landmarks: req.body.landmarks.split(","),
    funFact: req.body.funFact,
  };

  cities.push(newCity);
  res.send(cities);
});

const validateCity = (city) => {
  const citySchema = joi.object({
    name: joi.string().min(4).required(),
    country: joi.string().min(2).required(),
    population: joi.number().min(1).required(),
    prominentLanguage: joi.string().min(4).required(),
    landmarks: joi.string().min(4).required(),
    funFact: joi.string().required(),
  });

  return citySchema.validate(city);
};

app.get("/api/cities", (req, res) => {
  res.send(cities);
});
