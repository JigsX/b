let S213 = 0;
let S214 = 1;



g.addEdge(S213, S214, 1);
g.addEdge(S214, 2, 1);
g.addEdge(2, 3, 1);
g.addEdge(3, 4, 1);
g.addEdge(4, 5, 1);
g.addEdge(5, 9, 1);
g.addEdge(9, 8, 1);
g.addEdge(8, 7, 1);
g.addEdge(7, 6, 1);
g.addEdge(6, S213, 1);
g.addEdge(5, 10, 1);
g.addEdge(10, 11, 1);
g.addEdge(11, 12, 1);
g.addEdge(12, 13, 1);
g.addEdge(13, 6, 1);
g.addEdge(3, 8, 1);
g.addEdge(4, 8, 4);

g.addEdge(11, 14, 1);
g.addEdge(14, 15, 1); // elevators
g.addEdge(15, 16, 1);

g.addEdge(10, 17, 1); 
g.addEdge(17, 18, 1); // stair
g.addEdge(18, 19, 1); 
g.addEdge(19, 20, 1); 

g.addEdge(20, 21, 1); 
g.addEdge(14, 21, 1); 

g.addEdge(21, 22, 1); 
g.addEdge(22, 23, 1); 

g.setNodeCategory(13, "cr");
g.setNodeCategory(8, "cr");
g.setNodeCategory(0, "exit");
g.setNodeCategory(5, "exit");

g.setNodeCategory(14, "elevator");
g.setNodeCategory(15, "elevator");
g.setNodeCategory(16, "elevator");

g.setNodeBuilding(1,"science");
g.setNodeBuilding(2,"science");
g.setNodeBuilding(3,"science");
g.setNodeBuilding(4,"science");
g.setNodeBuilding(5,"science");


g.setNodeBuilding(6,"science2");
g.setNodeBuilding(7,"science2");
g.setNodeBuilding(8,"science2");
g.setNodeBuilding(9,"science2");
g.setNodeBuilding(10,"science2");
g.setNodeBuilding(11,"science2");
g.setNodeBuilding(12,"science2");
g.setNodeBuilding(13,"science2");
g.setNodeBuilding(14,"science2");
g.setNodeBuilding(15,"science2");

g.setNodeBuilding(11,"science2");