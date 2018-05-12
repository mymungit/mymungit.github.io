var permArr = [];
var usedChars = [];
var best = [];


function cost(jalur){
	jarak = 0;
	for(var i=0;i<jalur.length-1;i++){
		jarak=jarak+distance(points[jalur[i]],points[jalur[i+1]]);
	}
	return jarak;
}


function permute(input) {
  
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
}

function brute(){
	clearCanvas();
	
	for(var i=0; i<points.length; i++) {
      drawCircle(cities[i],points[i]);
    }
	
	var min = 1e10;
	pointIndex = [];
	for(var i=0;i<points.length;i++){
		pointIndex.push(i);
	}
	console.log(pointIndex);
	permArr = permute(pointIndex);
	
	for(var i=0;i<permArr.length;i++){
		permArr[i].push(permArr[i][0]);
	}
	for(var i=0;i<permArr.length;i++){
		if(cost(permArr[i])<min){
			min = cost(permArr[i]);
			best = permArr[i];
			
		}
	}
	console.log(best);
	drawLines(best);
	t1g = performance.now();
	running = false;
	alert("bruteforce distance: " +Math.round(min)+", "+ " calculation time: "+ Math.round((t1g-t0g))+" milliseconds");
	
}