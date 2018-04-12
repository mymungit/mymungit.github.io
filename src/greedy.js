
function solve(){
	clearCanvas();
	
	for(var i=0; i<points.length; i++) {
      		drawCircle(cities[i],points[i]);
	}
	var jalur = [0];
	
	for(var i=0;i<points.length;i++){
		var min = 1e10;
		var next=null;
		for(var j=0;j<points.length;j++){
			if(i!=j && jalur.includes(j)==false){
				if (distance(points[i],points[j])<min){
					min = distance(points[i],points[j]);
					next = j;
				}
			}
		}
		if (next!=null){
			jalur.push(next);
		}
	}
	jalur.push(0);
	alldistance = 0;
	for(var i=0;i<jalur.length-1;i++){
		alldistance=alldistance+distance(points[jalur[i]],points[jalur[i+1]]);
	}
	drawLines(jalur);
	alert("greedy distance: " +Math.round(alldistance));
}
