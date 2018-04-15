

function greedy(awal){
	var jalur = [awal];
	
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
	jalur.push(awal);
	jarak = 0;
	for(var i=0;i<jalur.length-1;i++){
		jarak=jarak+distance(points[jalur[i]],points[jalur[i+1]]);
	}
	
	return [jarak,jalur];
}


function solve(){
	clearCanvas();
	
	for(var i=0; i<points.length; i++) {
      drawCircle(cities[i],points[i]);
    }
	
	var alldistance = 1e10;
	var jalur = [];
	
	
	for(var i=0;i<points.length;i++){
		hasil = greedy(i);
		dis = hasil[0];
		jal = hasil[1];
		console.log(dis);
		if(dis<alldistance){
			alldistance = dis;
			jalur = jal;
		}
	}
	console.log(jalur);
	drawLines(jalur);
	t1g = performance.now();
	running = false;
	alert("greedy distance: " +Math.round(alldistance)+ " calculation time: "+ Math.round((t1g-t0g))+" milliseconds");
}
