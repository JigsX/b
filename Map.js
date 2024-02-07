// Function to handle button click
function buttonClicked(buttonText) {
    console.log("tanga!");
}

let nodes = [];
const outputElement = document.getElementById("currentPosition");

const bounds = [
    [0, 0],  // Southwest corner of the bounding box
    [300, 350]  // Northeast corner of the bounding box
];
const map = L.map('map',{
     // Adjust the value (0 to 1) to control the viscosity effect
    zoom: 100,
    zoomControl: false
});


function setImage(ImageUrl){
    let images = [
        { url: ImageUrl, bounds: [[0, 0], [20, 25]] },
        // Add more images as needed
    ];

    // Clear existing layers on the map
    map.eachLayer(function (layer) {
        if (layer instanceof L.ImageOverlay) {
            map.removeLayer(layer);
        }
    });

    // Add new image overlay(s) to the map
    images.forEach(function (image) {
        L.imageOverlay(image.url, image.bounds).addTo(map);
    });
}



let leaveButton1Clicked = false;

document.addEventListener("DOMContentLoaded", () => {
    outputElement.textContent = "University of the Cordilleras Interactive Map";
    map.setView([10,10], 5.5);
    
    
});

const loadBuildingNodes = (building) => {
    nodes = buildingNodes(building);
    drawNodes(map, nodes);
};
let buiild;
const connectBuildingNodes = (building) => {
    buiild = building;
    clearMapMarkers();
    clearMapPolylines();
    loadBuildingNodes(building);
    const nodesToConnect = g.arrayPath;
    connectNodes(nodesToConnect);
};

const drawNodes = (map, nodes) => {
    nodes.forEach((node, index) => {
        drawNodeOnMap(node, map);
    });
};

const sameBuilding = (current,destination) => {
    const isCurrentNodeIdPresent = nodes.some(node => node.id === current);
    const isDestinationNodeIdPresent = nodes.some(node => node.id === destination);
   if(isCurrentNodeIdPresent && isDestinationNodeIdPresent){
    return true;
   }
   else{
    return false;
   }
};//g.arrayPath




const drawNodeOnMap = (node, map) => {
    if (!map) {
        console.error("Map not defined. Cannot add marker.");
        return;
    }

    const marker = L.marker([node.lat, node.lon]).addTo(map);

    // Create HTML content for the popup
    let popupContent = `<strong>Node ${node.id}</strong><br>`;
    
    // Add buttons if it's not a leaveButton
    if (node.label !== 'leaveButton') {
        popupContent += `
            <button onclick="return 3">Button 1</button>
            <button onclick="buttonClicked('Button 2')">Button 2</button>
        `;
    }
    
    marker.bindPopup(popupContent);
    
    // Set the icon for leaveButton
    if (node.label === 'leaveButton') {
        marker.setIcon(L.icon({
            iconUrl: 'exit.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        }));

        marker.on('click', () => {
            leaveButton1Clicked = true;
            clearMapMarkers();
            connectBuildingNodes(node.desti);
        });
    }

    // Set popup content based on node id
    let popupName = 'Your Current Location: ';
    let targetLoc = 'Your Destination: '
    let exitName = 'To S Building';
    let currentLocation = g.arrayPath[0];
    let destination = g.arrayPath[g.arrayPath.length -1];
    let isSameBuilding = sameBuilding(currentLocation,destination)

    if (node.id === currentLocation) {
        marker.bindPopup(`<strong>${popupName}</strong> Room: ${node.id}`);
        marker.openPopup();
    }
    else if(node.id === destination){
        marker.bindPopup(`<strong>${targetLoc}</strong> Room: ${node.id}`);
        marker.openPopup();
    }

    // Zoom to the first node in the array path
    zoomToNode(g.arrayPath[0],marker);
};

const zoomToNode = (nodeId, marker) => {
    const node = findNodeById(nodeId);

    if (node) {
        
        map.flyTo([node.lat, node.lon], 6, {
            duration: 1,  // Adjust the duration of the animation in seconds
            easeLinearity: 0.5  // Adjust the easing factor for the animation
        });
    }
};

const clearMapMarkers = () => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
};

const connectNodes = (nodeIdsToConnect) => {
    
    for (let i = 0; i < nodeIdsToConnect.length - 1; i++) {
        const node1 = findNodeById(nodeIdsToConnect[i]);
        const node2 = findNodeById(nodeIdsToConnect[i + 1]);

        if (node1 && node2) {
            drawPolyline(map, node1, node2);
        }
    }
};


const drawPolyline = (map, node1, node2) => {
    const latlngs = [
        [node1.lat, node1.lon],
        [node2.lat, node2.lon]
    ];

    const polyline = L.polyline(latlngs, { color: 'red' });
    polyline.addTo(map);
};

const clearMapPolylines = () => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });
};

const findNodeById = (nodeId) => nodes.find((node) => node.id === nodeId);

function buildingNodes(buildingName) {
    let nodes = [];
    if (buildingName == "science") {
        setImage('fin.png');
        outputElement.textContent = "Science Building, 1st Floor";
        nodes = [
            { id: 1, lat: 1, lon: 2,building: `science` },
            { id: 2, lat: 2, lon: 0,building: `science` },
            { id: 3, lat: 3, lon: 1,building: `science`  },
            { id: 4, lat: 4, lon: 0,building: `science`  },
            { id: 6, lat: 5, lon: 1,building: `science`  },
            { id: 5, lat: 6, lon: 1,building: `science` , label: 'leaveButton', cat: 'exit', desti: 'science2' }
        ];
    } else if (buildingName == "science2") {
        setImage('exit.png');
        outputElement.textContent = "Science Building, 2nd Floor";
        nodes = [
            { id: 7, lat: 1, lon: 0,building: `science2`  },
            { id: 8, lat: 2, lon: 0,building: `science2`  },
            { id: 9, lat: 3, lon: 1,building: `science2`  },
            { id: 10, lat: 4, lon: 0,building: `science2`,  label: 'leaveButton', cat: 'exit',desti: 'science'},
            { id: 11, lat: 5, lon: 1,building: `science2`  },
        ];
    }

    return nodes;
}
