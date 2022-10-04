#include "./layer-am-functions.jsx"

main();

function main() {
    $.writeln("TEST selectAllLayers");    
    selectAllLayers();
    var selectedLayers = getSelectedLayers();
    var firstLayerID = selectedLayers[0];
    $.writeln("Selected layers: ");
    $.writeln(selectedLayers);
    
    $.writeln("TEST setLayersVisibility");
    setLayersVisibility(selectedLayers);
    
    $.writeln("TEST deselectAllLayers");
    deselectAllLayers();
    selectedLayers = getSelectedLayers();
    $.writeln("Selected layers: ");
    $.writeln("[" +selectedLayers + "]");
    
    
    $.writeln("TEST setAllLayersVisibility");
    $.writeln("Art layers are visible. Layer sets are hidden");
    setAllLayersVisibility(true, false);
    
    $.writeln("TEST getIndexByID");
    var firstLayerIndex = getIndexByID(firstLayerID);
    $.writeln("Index of " + firstLayerID + ": " + firstLayerIndex);

  
   $.writeln("TEST getLayerID");
   $.writeln("ID of " + firstLayerIndex + ": " + getLayerID(firstLayerIndex));
    
   $.writeln("TEST getElementByID");
   $.writeln(getElementByID(firstLayerID));
    
   $.writeln("TEST setLayerName");
   setLayerName(firstLayerID, "test");
   
   $.writeln("TEST getNameByID");
   $.writeln("Name: " + getNameByID(firstLayerID));
    
    /*selectLayers([419]);
    selectLayers([417], true);
    selectLayers([410], true); */
   $.writeln("TEST selectLayers");
   selectLayers([415, 419]);
   selectLayers([417], true);
   $.writeln("Selected layers: " + getSelectedLayers());
    
   $.writeln("TEST isLayerSet");
   $.writeln("Is 341 a layer set? " + isLayerSet(341));
    
   $.writeln("TEST getLayerSetChidren"); 
   $.writeln(getLayerSetChildren(341));
   
   $.writeln("TEST grouplayers");
   $.writeln("Grouping last selection"); 
   groupLayers([], "test group"); 
   
   $.writeln("TEST ungroup");
   $.writeln("Ungrouping last selection"); 
   ungroup([]);
   
   $.writeln("TEST duplicateLayers");
   $.writeln("Duplicating last selection"); 
   duplicateLayers([],activeDocument.name);
   
   $.writeln("TEST selectNextLayer & selectPreviousLayer");
    selectLayers([firstLayerID]);
   selectNextVisibleLayer();
   selectPreviousVisibleLayer();
   
   $.writeln("TEST moveLayers");
   $.writeln("Moving 433, 432, 430, 429, 428 to 415")
   moveLayers([433, 432, 430, 429, 428],415);
   
   $.writeln("TEST deleteLayer");
   $.writeln("Deleting layer 419");
   deleteLayer(419); 
    
    $.writeln("TEST moveNext & movePrev");
    $.writeln("Moving 416 & 417");
    moveNext(416);
    movePrev(417);
    
    $.writeln("DONE!");
    
    }