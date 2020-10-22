#include "./layer-functions0.2.jsx"

main();

function main() {

 //renameLyrsIdxId();
 $.writeln("setAllLayersVisibility");
setAllLayersVisibility(true, false);
 $.writeln("selectAllLayers");
 selectAllLayers();
  $.writeln("deselectAllLayers");
  deselectAllLayers();
  
   $.writeln("selectAllLayers");
 selectAllLayers();

   $.writeln("getSelectedLayers");

 var slctd = getSelectedLayers();
 $.writeln(slctd);
  $.writeln("getLayerSetChildren");
  var children = getLayerSetChildren(slctd[0]);
  $.writeln("groupLayers");
  groupLayers(children);
    $.writeln("duplicateLayers");
  duplicateLayers(children, activeDocument.name);
   $.writeln("ungroup");
  ungroup(children[0]);
  selectAllLayers();
  slctd = getSelectedLayers();
   $.writeln("deleteLayer");
   $.writeln(getNameByID(slctd[0]));
  deleteLayer(slctd[0]);
    }


/*------------------------------------------------------------------------*/
//                             auxiliary functions
/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//          renameLyrsIdxId()        
//          BEHAVIOR: renames all layers with index and id

/*------------------------------------------------------------------------*/

function renameLyrsIdxId() {
    var sel, idx, txt, active;

    selectAllLayers();
    sel = getSelectedLayers();
    
    for (var n = 0; n < sel.length; n++) {
            setLayerName(sel[n],  getIndexByID(sel[n]) + " " + sel[n]);
            if (!isLayerSet(sel[n])) {
                active = activeDocument.activeLayer;
                active.kind = LayerKind.TEXT;
                txt = active.textItem;
                txt.size = 20;
                txt.position = [10, 50 + n * 15];
                $.writeln(txt.position);
                txt.contents = active.name;
                active.rasterize(RasterizeType.TEXTCONTENTS);
                
           }
        }
        
    }