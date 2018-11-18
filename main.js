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
var waitt = 0;

function setWord(data) {
  target = data[0].substring(data[0].indexOf('>')+1, data[0].indexOf('<',2));

  popmax = 200;
  mutationRate = 0.01;
  population = new Population(target, mutationRate, popmax);
  waitt = 1;
}

function setup() {
  var server_url = "https://learn-the-wotd.herokuapp.com/test";
  loadStrings(server_url, setWord);

  bestPhrase = createP("Best phrase:");
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  stats.class("stats");
}

function draw() {
  if (waitt == 1) {
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
  } else {
    //console.log("waiting ");
  }
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
