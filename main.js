// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

//Modified to accept WotD, definitions from Dict.com

let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setWord(data) {
  console.log(data)
  for(var i = 0; i < data.length; i++) {
    console.log(data[i])
  }
  target = data[0]; // this won't work, but placeholder
}

function setup() {
  var server_url = "https://learn-the-wotd.herokuapp.com/receiver";
  loadStrings(server_url, setWord);
  //target = "Lend me your ears";

  bestPhrase = createP("Best phrase:");
  //bestPhrase.position(10,10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  //stats.position(10,200);
  stats.class("stats");

  //createCanvas(640, 360);
  //target = "catastrophize"; //TODO pull from flaskDemo
  popmax = 200;
  mutationRate = 0.01;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
}

function draw() {
  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) {
    //println(millis()/1000.0);
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  // Display current status of population
  let answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  let statstext = "total generations:     " + population.getGenerations() + "<br>";
  statstext += "average fitness:       " + floor(population.getAverageFitness()*100) + "%<br>";
  statstext += "total population:      " + popmax + "<br>";
  statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}
