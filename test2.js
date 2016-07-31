var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('test2.in')
});

var c = 0;
var i = 0;

/*
   This model we have each numeric node to point to another numeric node

   { '0' : {
 		'A': '1', 
           }

   } 

*/

var graph   = { 'root': {} };

var flatArray = new Array();
flatArray[0]= {};
var currKey = 0;
var cc=1;
currIndex   = flatArray[currKey];

lineReader.on('line', function (line) {
  if(i==0) { 
    c = parseInt(line); 
    console.log('Line from file:', c);
  } else { 
    updateGraph(line);
  } 
  i++;
});


lineReader.on('close', function (line) {
for(var k in flatArray) { 
  //if(flatArray[k] != {}) { 
    for(var item in flatArray[k]) { 
	var target = flatArray[k][item];
 	console.log(k+"->"+target+":"+item);
    } 
  //}  
} 
});


function updateGraph(line) { 
  console.log('Reading string ', line);
  currIndex=flatArray[0];
   
  for( var k in line) { 
     currChar = line[k];
     if(currChar in currIndex) { 
	console.log('entering..');
     } else { 
	var el = cc;
	currIndex[currChar]= el;
        if(!(el in flatArray)) { 
  	   flatArray[el]={};
	   cc++;
        } else { 
	   console.log(el + ' exists in flatarray');
        }  
	console.log('entering..' + currIndex[currChar]);
     } 
     currIndex = flatArray[currIndex[currChar]]; 
     console.log(JSON.stringify(flatArray));
  }  

}
