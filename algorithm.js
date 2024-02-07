let currentRoomValue;
let destinstionRoomValue;
let choice = 56;
let defaultBuilding = "science";

function showDiv(divId,divHid) {
  // Hide all divs with the class 'hidden'
  let allDivs = document.querySelectorAll('.hidden');
  allDivs.forEach(function(div) {
      div.style.display = 'none';
  });

  // Show the specific div by ID
  let turnHid = document.getElementById(divHid);
  let targetDiv = document.getElementById(divId);
  
  if (targetDiv) {
      targetDiv.style.display = 'block';
      turnHid.style.display = 'none';
  }
}

function showMapDiv(mapDivID){
  
  let mapId = document.getElementById(mapDivID);
  if(mapId){
    mapId.style.display ='block';
  }

}



class Graph {
  constructor(V) {
    this.V = V;
    this.adj = new Array(V).fill().map(() => []);
    this.parent = new Array(V).fill(-1);
    this.nodeCategories = new Array(V).fill("default");
    this.nodeBuilding = new Array(V).fill("");
    this.arrayPath = [];
}

  addEdge(node, connectedNode, weightConnection) {
    this.adj[node].push([connectedNode, weightConnection]);
    this.adj[connectedNode].push([node, weightConnection]);
  }

  setNodeCategory(node, category) {
    this.nodeCategories[node] = category;
  }
  setNodeBuilding(node, building) {
    this.nodeBuilding[node] = building;
  }

  findClosestCategory(src, targetCategory, useElevator) {
    const distances = new Array(this.V).fill(Number.POSITIVE_INFINITY);
    const setDistance = new Set();
    setDistance.add([0, src]);
    distances[src] = 0;

    while (setDistance.size > 0) {
        const tmp = [...setDistance].reduce((a, b) => (a[0] < b[0] ? a : b));
        setDistance.delete(tmp);
        const u = tmp[1];

        for (const [node, weight] of this.adj[u]) {
            if (!useElevator && this.nodeCategories[node] === "elevator") {
                continue;
            }
            if (!useEmerExit && this.nodeCategories[v] === "emergencyExit") {
              continue;
            }

            if (distances[node] > distances[u] + weight) {
                if (distances[node] !== Number.POSITIVE_INFINITY) {
                    setDistance.delete([distances[node], node]);
                }
                distances[node] = distances[u] + weight;
                setDistance.add([distances[node], node]);
                this.parent[node] = u;
            }
        }
    }

    let closestNode = -1;
    let minDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < this.V; i++) {
        if (distances[i] < minDist && this.nodeCategories[i] === targetCategory) {
            minDist = distances[i];
            closestNode = i;
        }
    }

    if (minDist !== Number.POSITIVE_INFINITY) {
        console.log(`Closest Node of Category ${targetCategory} from Room ${src} is Room ${closestNode} at a distance of ${minDist}.`);
        console.log("Path: ");
        this.printPath(closestNode);
        console.log("Array Path:", this.arrayPath);
    } else {
        console.log(`No node of Category ${targetCategory} found from Room ${src}`);
    }

    return [minDist, closestNode];
}


printPath(v) {
  this.arrayPath = []; // Reset arrayPath before storing the new path
  console.log(`Current Node: ${v}`);
  
  if (v === -1) {
      console.log("Terminating recursion");
      return;
  }
  
  this.printPath(this.parent[v]);
  console.log(`${v} -> `);
  this.arrayPath.push(v);
}




  shortestPath(src, targetNode, useElevator,useEmerExit) {
    const distances = new Array(this.V).fill(Number.POSITIVE_INFINITY);
    const setds = new Set();
    setds.add([0, src]);
    distances[src] = 0;

    while (setds.size > 0) {
      const tmp = [...setds].reduce((a, b) => (a[0] < b[0] ? a : b));
      setds.delete(tmp);
      const u = tmp[1];

      for (const [v, weight] of this.adj[u]) {
        if (!useEmerExit && this.nodeCategories[v] === "emergencyExit") {
          continue;
        }
        if (!useElevator && this.nodeCategories[v] === "elevator") {
          continue;
        }
        

        if (distances[v] > distances[u] + weight) {
          if (distances[v] !== Number.POSITIVE_INFINITY) {
            setds.delete([distances[v], v]);
          }
          distances[v] = distances[u] + weight;
          setds.add([distances[v], v]);
          this.parent[v] = u;
        }
      }
    }

    if (distances[targetNode] === Number.POSITIVE_INFINITY) {
      console.log(`No node found at Room ${targetNode} from Room ${src}`);
    } else {
      console.log(`Room ${targetNode} from Room ${src} is ${distances[targetNode]} units away.`);
      console.log("Path: ");
      this.printPath(targetNode);
      console.log();
    }
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  const myForm = document.getElementById("formInputs");
  const buttons = document.querySelectorAll('.button');
  const EnterDesti = document.getElementById('enterDest');
  const EnterFac = document.getElementById('enterFac');
 
  const useElevator = document.getElementById("useElevator");
  const useEmerExit = document.getElementById("useEmerExit");

  

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      choice = this.id;
    });
  });


  EnterDesti.addEventListener("click", function(event){
    if (myForm) {
      myForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        currentRoomValue = document.getElementById("currentLocation").value;
        destinstionRoomValue = document.getElementById("destinationLocation").value;
        value("EnterDest",useElevator.checked,useEmerExit.checked);
        
      });
    } 
  });

  EnterFac.addEventListener("click", function(event){
    
    if (myForm) {
      myForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        currentRoomValue = document.getElementById("currentLocation").value;
        factDest = document.getElementById("selectFac").value;
        
        value("EnterFac",useElevator.checked,useEmerExit.checked);
      });
    } 
  });



 
  
});

function value(choice, useElevator,useEmerExit) {
  g.parent = new Array(V).fill(-1);
  g.arrayPath = [];

  if(choice==="EnterDest"){
    currentRoomValue = Number(currentRoomValue);
    destinstionRoomValue = Number(destinstionRoomValue);
    g.shortestPath(currentRoomValue, destinstionRoomValue, useElevator);
    
    connectBuildingNodes(g.nodeBuilding[g.arrayPath[0]]);
    
  }
  else if(choice==="EnterFac"){
    currentRoomValue = Number(currentRoomValue);
    facilityChoice = factDest;
    console.log(facilityChoice);
    console.log(g.findClosestCategory(currentRoomValue,facilityChoice,useElevator));
    g.findClosestCategory(currentRoomValue,facilityChoice,1);
    connectBuildingNodes(g.nodeBuilding[g.arrayPath[0]]);
  }
  
}

function execute(CurrentRoom, DestinationRoom) {
  const InputCurrentRoom = CurrentRoom;
  const InputDestinationRoom = DestinationRoom;
  const destinationChoice = choiceDetermine();
  const InputCurrentRoomInputValue = InputCurrentRoom.value;
  const InputDestinationRoomInputValue = InputDestinationRoom.value;
  const destinationChoiceValue = destinationChoice.value;
  console.log(destinationChoiceValue);
}

const V = 24;
const g = new Graph(V);
