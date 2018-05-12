var canvas, ctx;
var WIDTH, HEIGHT;
var points = [];
var running;
var canvasMinX, canvasMinY;
var doPreciseMutate;

var POPULATION_SIZE;
var ELITE_RATE;
var CROSSOVER_PROBABILITY;
var MUTATION_PROBABILITY;
var OX_CROSSOVER_RATE;
var UNCHANGED_GENS;

var mutationTimes;
var dis;
var bestValue, best;
var currentGeneration;
var currentBest;
var population;
var values;
var fitnessValues;
var roulette;
var coordinate;
var cities;
var time;
var t0;
var t1;
var mob = [];



$(function() {
  init();
  initData();
  points = data0;
  cities = []
  $('#addPoint').click(function() {
    addPoints();
    $('#status').text("");
    running = false;
  });
  $("#my_file").change(function(){
	$("#my_file").parse({
		config: {
			delimiter: "",	// auto-detect
			newline: "",	// auto-detect
			quoteChar: '"',
			header: false,
			complete: function(results, file) {
				for(var i=0; i<results.data.length;i++){
					console.log(results.data[i]);
					points.push({"x":parseInt(results.data[i][0]),"y":parseInt(results.data[i][1])});
					//mob.push(results.data[i][1]); 
				}
				//console.log(mob);
			}
		}
	});
});
  $('#start_greedy').click(function() { 
    if(points.length >= 3) { 
	  t0g = performance.now();
	  solve();
	  running = true;
    } else {
      alert("add some more points to the map!");
    }
  });
  $('#start_brute').click(function() { 
    if(points.length >= 3) { 
	  t0g = performance.now();
	  brute();
	  running = true;
    } else {
      alert("add some more points to the map!");
    }
  });
  $('#start_btn').click(function() { 
    if(points.length >= 3) {
      initData();
	  t0 = performance.now();
      GAInitialize();
      running = true;
    } else {
      alert("add some more points to the map!");
    }
  });
  $('#clear_btn').click(function() {	  
	
	window.location.reload();
	
    running === false;
    initData();
    points = new Array();
  });
  $('#stop_btn').click(function() {
    if(running === false && currentGeneration !== 0){
      if(best.length !== points.length) {
          initData();
          GAInitialize();
      }
      running = true;
    } else {
      running = false;
    }
  });
});
function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $('#canvas').width();
  HEIGHT = $('#canvas').height();
  setInterval(draw, 10);
  init_mouse();
}
function init_mouse() {
  $("canvas").click(function(evt) {
    if(!running) {
      canvasMinX = $("#canvas").offset().left;
      canvasMinY = $("#canvas").offset().top;
      $('#status').text("");

      x = evt.pageX - canvasMinX;
      y = evt.pageY - canvasMinY;
      points.push(new Point(x, y));
    }
  });
}
function initData() {
  running = false;
  POPULATION_SIZE = 30;
  ELITE_RATE = 0.3;
  CROSSOVER_PROBABILITY = 0.9;
  MUTATION_PROBABILITY  = 0.01;
  //OX_CROSSOVER_RATE = 0.05;
  UNCHANGED_GENS = 0;
  mutationTimes = 0;
  doPreciseMutate = true;

  bestValue = undefined;
  best = [];
  currentGeneration = 0;
  currentBest;
  population = []; //new Array(POPULATION_SIZE);
  values = new Array(POPULATION_SIZE);
  fitnessValues = new Array(POPULATION_SIZE);
  roulette = new Array(POPULATION_SIZE);
}
function addRandomPoints(number) {
  running = false;
  for(var i = 0; i<number; i++) {
    points.push(randomPoint());
  }
}
function addPoints() {
	running = false;
	var nameValue = document.getElementById("nama").value;
	var coorValue = document.getElementById("koordinat").value;
	c = coorValue.split(",")
	points.push({"x":parseInt(c[0]),"y":parseInt(c[1])});
	if(!nameValue){
		cities.push("");
	}else{
		cities.push(nameValue)
	}
	
	var nameValue = document.getElementById("nama").value=" ";
	var coorValue = document.getElementById("koordinat").value=" ";
	console.log(points);
		 
}


function drawCircle(city,point) {
  ctx.fillStyle   = '#000';
  ctx.beginPath();
  ctx.arc(point.x, point.y, 3, 0, Math.PI*2, true);
  if(!city){
	  city = " ";
  }
  ctx.strokeText(city,point.x+3, point.y);
  ctx.closePath();
  ctx.fill();
}
function drawLines(array) {
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 1;
  ctx.beginPath();

  ctx.moveTo(points[array[0]].x, points[array[0]].y);
  for(var i=1; i<array.length; i++) {
    ctx.lineTo( points[array[i]].x, points[array[i]].y )
  }
  ctx.lineTo(points[array[0]].x, points[array[0]].y);

  ctx.stroke();
  ctx.closePath();
}
function draw() {
  if(running) {
    GANextGeneration();
    $('#status').text("There are " + points.length + " cities in the map, "
                      +"the " + currentGeneration + "th generation with "
                      + mutationTimes + " times of mutation. best value: "
                      + ~~(bestValue));
  } else {
    $('#status').text("There are " + points.length + " Cities in the map. ")
  }
  clearCanvas();
  if (points.length > 0) {
    for(var i=0; i<points.length; i++) {
      drawCircle(cities[i],points[i]);
    }
    if(best.length === points.length) {
      drawLines(best);
    }
  }
}
function clearCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
