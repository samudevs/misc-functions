/*--------------------------------------------------------------------------------------*/
//           Action Manager basic functions for layer management
//           v0.3
//           Developed by Samuel López
/*--------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
//                      Constants section
/*------------------------------------------------------------------*/
var idnull = charIDToTypeID("null");
var idLyr = charIDToTypeID("Lyr ");
var idLyrI = charIDToTypeID("LyrI");
var idItmI = charIDToTypeID("ItmI");
var idShw = charIDToTypeID("Shw ");
var idHd = charIDToTypeID("Hd  ");
var idOrdn = charIDToTypeID("Ordn");
var idTrgt = charIDToTypeID("Trgt");
var idDcmn = charIDToTypeID("Dcmn");
var idPrpr = charIDToTypeID("Prpr");
var idFrom = charIDToTypeID("From");
var idsetd = charIDToTypeID("setd");
var idT = charIDToTypeID("T   ");
var idNm = charIDToTypeID("Nm  ");
var idslct = charIDToTypeID("slct");
var idMkVs = charIDToTypeID("MkVs");
var idmove = charIDToTypeID("move");
var idAdjs = charIDToTypeID("Adjs");
var idVrsn = charIDToTypeID("Vrsn");
var idUsng = charIDToTypeID("Usng");
var idMk = charIDToTypeID("Mk  ");
var idDplc = charIDToTypeID("Dplc");
var idBckw = charIDToTypeID("Bckw");
var idFrwr = charIDToTypeID("Frwr");
var idDlt = charIDToTypeID("Dlt ");
var idNxt = charIDToTypeID("Nxt ");
var idPrvs = charIDToTypeID("Prvs");
var idChnl = charIDToTypeID("Chnl");
var idfsel = charIDToTypeID("fsel");
var idPxl = charIDToTypeID("#Pxl");
var idTop = charIDToTypeID("Top ");
var idLeft = charIDToTypeID("Left");
var idBtom = charIDToTypeID("Btom");
var idRght = charIDToTypeID("Rght");
var idRctn = charIDToTypeID("Rctn");
var idIntW = charIDToTypeID("IntW");
var idCrop = charIDToTypeID("Crop");
var idHstS = charIDToTypeID("HstS");
var idVsbl = charIDToTypeID("Vsbl");
var idMd = charIDToTypeID("Md  ");
var idOpct = charIDToTypeID("Opct");
var idselectionModifier = stringIDToTypeID("selectionModifier");
var idselectionModifierType = stringIDToTypeID("selectionModifierType");
var idungroupLayersEvent = stringIDToTypeID("ungroupLayersEvent");
var idaddToSelectionContinuous = stringIDToTypeID("addToSelectionContinuous");
var idCloseActionsPanel = stringIDToTypeID("closeActionsPanel");
var idCloseLayersPanel = stringIDToTypeID("closeLayersPanel");
var idlayerSectionStart = stringIDToTypeID("layerSectionStart");
var idlayerSectionEnd = stringIDToTypeID("layerSectionEnd");
var idlayerSection = stringIDToTypeID("layerSection");
var idselectNoLayers = stringIDToTypeID("selectNoLayers");
var idselectAllLayers = stringIDToTypeID("selectAllLayers");
var idtargetLayers = stringIDToTypeID("targetLayers");
/*------------------------------------------------------------------------*/
//                             Action manager functions
/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//          setAllLayersVisibility(boolean, boolean)
//          INPUTS: artLayers visibility, layerSets visibility
//          BEHAVIOR: selects all layers
//                               sets visibilities 
//                               deselects all layers
/*------------------------------------------------------------------------*/
function setAllLayersVisibility(artLyrVis, lyrSetVis) {
    var seld = [];
    var artLyrs = [];
    var lyrSets = [];
    var lyrInfo;
    selectAllLayers();
    seld = getSelectedLayers();
    for (var i = 0; i < seld.length; i++) {
        lyrInfo = getLayerProperty(seld[i], idlayerSection);
        if (lyrInfo == idlayerSectionStart) {
            lyrSets.push(seld[i]);
        } else {
            artLyrs.push(seld[i]);
        }
    }
    setLayersVisibility(artLyrs, artLyrVis);
    setLayersVisibility(lyrSets, lyrSetVis);
    deselectAllLayers();
}
/*------------------------------------------------------------------------*/
//          selectAllLayers()
//          BEHAVIOR: selects all layers, children inclusive
/*------------------------------------------------------------------------*/
function selectAllLayers() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(idLyr, idOrdn, idTrgt);
    desc.putReference(idnull, ref);
    executeAction(idselectAllLayers, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//          deselectAllLayers()
//          BEHAVIOR: deselects all layers
/*------------------------------------------------------------------------*/
function deselectAllLayers() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(idLyr, idOrdn, idTrgt);
    desc.putReference(idnull, ref);
    executeAction(idselectNoLayers, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//          setAllLayersVisibility(array, boolean)
//          INPUT: artLayers/layerSets ids, visibility 
//          BEHAVIOR: sets visibilities 
/*------------------------------------------------------------------------*/
function setLayersVisibility(ids, visibility) {
    var actionId;
    visibility == true ? actionId = idShw : actionId = idHd;
    var desc = new ActionDescriptor();
    var list = new ActionList();
    var ref = new ActionReference();
    for (var i = 0; i < ids.length; i++) ref.putIdentifier(idLyr, ids[i]);
    list.putReference(ref);
    desc.putList(idnull, list);
    executeAction(actionId, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//          getLayerProperty(int, int)
//          INPUT: layer id, property id
//          OUTPUT: property value
/*------------------------------------------------------------------------*/
function getLayerProperty(id, property) {
    var ref = new ActionReference();
    var desc = new ActionDescriptor();
    ref.putProperty(idPrpr, property);
    ref.putIdentifier(idLyr, id);
    desc = executeActionGet(ref);
    return getDescriptorValue(desc, property);
}
/*------------------------------------------------------------------------*/
//          getDescriptorValue(descriptor, int)
//          INPUT: descriptor object, property id
//          OUTPUT: property value
/*------------------------------------------------------------------------*/
function getDescriptorValue(desc, property) {
    switch (desc.getType(property)) {
        case DescValueType.STRINGTYPE:
            return desc.getString(property);
            break;
        case DescValueType.BOOLEANTYPE:
            return desc.getBoolean(property);
            break;
        case DescValueType.CLASSTYPE:
            return desc.getClass(property);
            break;
        case DescValueType.ENUMERATEDTYPE:
            return desc.getEnumerationValue(property);
            break;
        case DescValueType.INTEGERTYPE:
            return desc.getInteger(property);
            break;
        case DescValueType.OBJECTTYPE:
            return desc.getObjectValue(property);
            break;
        case DescValueType.LISTTYPE:
            return desc.getList(property);
            break;
        case DescValueType.UNITDOUBLE:
            return desc.getUnitDoubleValue(property);
            break;
        case DescValueType.DOUBLETYPE:
            return desc.getDouble(property);
            break;
        default:
            return -1;
    }
}
/*------------------------------------------------------------------------*/
//          getLayerPropertyByIndex(int, int)
//          INPUT: layer index, property id
//          OUTPUT: property value
/*------------------------------------------------------------------------*/
function getLayerPropertyByIndex(index, property) {
    var ref = new ActionReference();
    ref.putProperty(idPrpr, property);
    ref.putIndex(idLyr, index);
    return getDescriptorValue(executeActionGet(ref), property)
}
/*------------------------------------------------------------------------*/
//          getLayerPropertyByIndex(int)
//          INPUT: layer index
//          OUTPUT: layer id
/*------------------------------------------------------------------------*/
function getLayerID(idx) {
    var ref = new ActionReference();
    ref.putProperty(idPrpr, idLyrI);
    ref.putIndex(idLyr, idx);
    return executeActionGet(ref).getInteger(idLyrI);
}
/*------------------------------------------------------------------------*/
//          getSelectedLayers()
//          OUTPUT: array of selected layers ids
/*------------------------------------------------------------------------*/
function getSelectedLayers() {
    var selectedLayers = [];
    var currentIndex;
    var backGroundCounter = 0;
    try {
        activeDocument.backgroundLayer;
        backGroundCounter = 0;
    } catch (e) {
        backGroundCounter = 1;
    }
    try { //TODO: maybe not necessary
        var ref = new ActionReference();
        ref.putProperty(idPrpr, idtargetLayers);
        ref.putEnumerated(idDcmn, idOrdn, idTrgt);
        var desc = executeActionGet(ref);
        if (desc.hasKey(idtargetLayers)) {
            var layersList = desc.getList(idtargetLayers);
            for (var i = 0; i < layersList.count; i++) {
                var listRef = layersList.getReference(i);
                selectedLayers.push(getLayerID(listRef.getIndex() + backGroundCounter));
            }
        }
    } catch (e) {
        $.writeln(e);
    }
    return selectedLayers;
}
/*------------------------------------------------------------------------*/
//         getElementBy(int) 
//          INPUT: layer id
//          BEHAVIOR: selects layer and returns its DOM element, 
//                              layer remains selected
/*------------------------------------------------------------------------*/
function getElementByID(id) {
    selectLayers (id);
    return activeDocument.activeLayer;
    }




/*------------------------------------------------------------------------*/
//          setLayerName(int, string)
//          INPUT: layer id, name
//          BEHAVIOR: selects layer and rename, 
//                              layer remains selected
/*------------------------------------------------------------------------*/
function setLayerName(id, name) {
    selectLayers(id);
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putIdentifier(idLyr, id);
    desc.putReference(idnull, ref);
    var nameDesc = new ActionDescriptor();
    nameDesc.putString(idNm, name);
    desc.putObject(idT, idLyr, nameDesc);
    executeAction(idsetd, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//          selectLayers(array, bool)
//          INPUT: layer ids, contiguous selection
//         BEHAVIOR: selects layers by id 
//                              and optionaly adds them to previous selection                            
/*------------------------------------------------------------------------*/
function selectLayers(ids, contiguous) {
    if (contiguous == undefined) contiguous = false;
    if (ids.constructor != Array) ids = [ids];
    if (ids.length > 0) {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        if (contiguous) desc.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelectionContinuous);
        for (var n = 0; n < ids.length; n++) {
            ref.putIdentifier(idLyr, ids[n]);
        }
        desc.putReference(idnull, ref);
        desc.putBoolean(idMkVs, false);
        executeAction(idslct, desc, DialogModes.NO);
    }
}
/*------------------------------------------------------------------------*/
//         isLayerSet(int)
//         INPUT: layer id
//         BEHAVIOR: checks if it is a layer/artlayer or a group/layerset                          
/*------------------------------------------------------------------------*/
function isLayerSet(id) {
    return getLayerProperty(id, idlayerSection) == idlayerSectionStart;
}
/*------------------------------------------------------------------------*/
//         getLayerSetChildren(int)
//         INPUT: layer id
//         OUTPUT: group/layerset children array
//         BEHAVIOR: selects first level children 
//                              layers remain selected
/*------------------------------------------------------------------------*/
function getLayerSetChildren(id) {
    var childrenIDs = [];
    if (isLayerSet (id)) {
        selectLayers(id);
        var layers = activeDocument.activeLayer.layers;
        var length = layers.length;
        if (length > 0) {
            var lastLayer = layers[length - 1].id;
            selectLayers(layers[0].id);
            selectLayers(lastLayer, true);
            childrenIDs = getSelectedLayers();
        }
    }
    return childrenIDs;
}

/*------------------------------------------------------------------------*/
//         groupLayers(array, string)
//         INPUT: layer ids array, name
//         BEHAVIOR: selects layers and create group
//                              group remains selected
//                              if layers is null, it will use current selection
/*------------------------------------------------------------------------*/
function groupLayers(layers, name) {
    layers == null ? selectLayers(layers) : null;
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    var ref2 = new ActionReference();
    ref1.putClass(idlayerSection);
    desc1.putReference(idnull, ref1);
    ref2.putEnumerated(idLyr, idOrdn, idTrgt);
    desc1.putReference(idFrom, ref2);
    name != undefined ? desc2.putString(idNm, name) : null;
    desc1.putObject(idUsng, idlayerSection, desc2);
    executeAction(idMk, desc1, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         ungroup(int)
//         INPUT: layer ids array
//         BEHAVIOR: ungroups selected group
//                              resulting layers remain selected
//                              if ids is null then current selected group will be ungrouped
/*------------------------------------------------------------------------*/
function ungroup(ids) {
    if (ids != null) selectLayers(ids);
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(idLyr, idOrdn, idTrgt);
    desc.putReference(idnull, ref);
    executeAction(idungroupLayersEvent, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         duplicateLayers(array, string)
//         INPUT: array of layer ids, document name 
//         BEHAVIOR: selects layers, places duplicate layers above the first source layer or on top of document if target document is not the active document
//                              layers remain selected
/*------------------------------------------------------------------------*/
function duplicateLayers(sourceLayers, targetDoc) {
    selectLayers(sourceLayers);
    var desc = new ActionDescriptor();
    var ref1 = new ActionReference();
    var ref2 = new ActionReference();
    ref1.putEnumerated(idLyr, idOrdn, idTrgt);
    desc.putReference(idnull, ref1);
    ref2.putName(idDcmn, targetDoc);
    desc.putReference(idT, ref2);
    desc.putInteger(idVrsn, 5);
    executeAction(idDplc, desc, DialogModes.NO)
}
/*------------------------------------------------------------------------*/
//         getNextLayer(int)
//         INPUT: layer id
//         OUTPUT: layer id
//         BEHAVIOR: selects layer, returns id from layer above (layer list is circular)
//                              layer remains selected and expanded
/*------------------------------------------------------------------------*/
function getNextLayer(id) {
    selectLayers(id);
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(idLyr, idOrdn, idNxt);
    return executeActionGet(ref).getInteger(idLyrI);
}
/*------------------------------------------------------------------------*/
//         getNextLayer(int)
//         INPUT: layer id
//         OUTPUT: layer id
//         BEHAVIOR: selects layer, returns id from expanded layer below (layer list is circular)
//                              layer remains selected and expanded
/*------------------------------------------------------------------------*/
function getPrevLayer(id) { //previous expanded layer
    selectLayers(id);
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(idLyr, idOrdn, idFrwr);
    return executeActionGet(ref).getInteger(idLyrI);
}
/*------------------------------------------------------------------------*/
//         moveLayers(array, int, bool)
//         INPUT: layer ids, layer id, final position
//         BEHAVIOR: move layers before/after target layer
//                               error if sourcelayers includes targetlayer
/*------------------------------------------------------------------------*/
function moveLayers(sourceLayers, targetLayer, placeBefore) { //TODO: rename descXX/refX
    if (sourceLayers.constructor != Array) sourceLayers = [sourceLayers];
    placeBefore == undefined ? placeBefore = false : null;
    var desc72 = new ActionDescriptor();
    var ref7 = new ActionReference();
    for (var n = 0; n < sourceLayers.length; n++) {
        ref7.putIdentifier(idLyr, sourceLayers[n]);
    }
    desc72.putReference(idnull, ref7);
    var ref8 = new ActionReference();
    ref8.putIndex(idLyr, getIndexByID(targetLayer));
    desc72.putReference(idT, ref8);
    executeAction(idmove, desc72, DialogModes.NO);
    if (placeBefore) {
        moveNext(sourceLayers);
    }
}
/*------------------------------------------------------------------------*/
//        getIndexByID(int)
//         INPUT: layer id
//         OUTPUT: layer index
/*------------------------------------------------------------------------*/
function getIndexByID(id) {
    var backgroundCount = 0;
    try {
        activeDocument.backgroundLayer;
        backgroundCount = 0;
    } catch (e) {
        backgroundCount = -1;
    }
    ref = new ActionReference();
    ref.putIdentifier(idLyr, id);
    return executeActionGet(ref).getInteger(idItmI) + backgroundCount;
}
/*------------------------------------------------------------------------*/
//         getNameByID(int)
//         INPUT: layer id
//         OUTPUT: layer name
/*------------------------------------------------------------------------*/
function getNameByID(id) {
    return getLayerProperty(id, idNm).getString(idNm);
}
/*------------------------------------------------------------------------*/
//         deleteLayer(int)
//         INPUT: layer id
//         BEHAVIOR: deletes layer
/*------------------------------------------------------------------------*/
function deleteLayer(id) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
   ref.putIdentifier(idLyr, id);
    desc.putReference(idnull, ref);
    executeAction(idDlt, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         moveNext(int)
//         INPUT: layer id
//         BEHAVIOR: selects layer and moves it upwards
//                              layer remains selected
/*------------------------------------------------------------------------*/
function moveNext(id) {
    selectLayers(id);
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(idLyr, idOrdn, idTrgt);
    desc.putReference(idnull, ref);
    var ref = new ActionReference();
    ref.putEnumerated(idLyr, idOrdn, idNxt);
    desc.putReference(idT, ref);
    executeAction(idmove, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         movePrev(int)
//         INPUT: layer id
//         BEHAVIOR: selects layer and moves it downwards 
//                              layer remains selected, error if last layer
/*------------------------------------------------------------------------*/
function movePrev(id) {
    selectLayers(id);
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(idLyr, idOrdn, idTrgt);
    desc.putReference(idnull, ref);
    var ref = new ActionReference();
    ref.putEnumerated(idLyr, idOrdn, idPrvs);
    desc.putReference(idT, ref);
    executeAction(idmove, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//                                  MISC functions
/*------------------------------------------------------------------------*/
/*------------------------------------------------------------------------*/
//         selectImage(int, int, int, int)
//         INPUT: square coordinates
//         BEHAVIOR: creates a square selection
/*------------------------------------------------------------------------*/
function selectImage(top, left, bottom, right) {
    var desc1 = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putProperty(idChnl, idfsel);
    desc1.putReference(idnull, ref);
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(idTop, idPxl, top);
    desc2.putUnitDouble(idLeft, idPxl, left);
    desc2.putUnitDouble(idBtom, idPxl, bottom);
    desc2.putUnitDouble(idRght, idPxl, right);
    desc1.putObject(idT, idRctn, desc2);
    executeAction(idIntW, desc1, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         crop()
//         BEHAVIOR: crops selection //TODO: coordinates on input
/*------------------------------------------------------------------------*/
function crop() {
    var desc = new ActionDescriptor();
    desc.putBoolean(idDlt, true);
    executeAction(idCrop, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         historyUndo()
//         BEHAVIOR: one step back in history
/*------------------------------------------------------------------------*/
function historyUndo() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(idHstS, idOrdn, idPrvs);
    desc.putReference(idnull, ref);
    executeAction(idslct, desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         historyRedo()
//         BEHAVIOR: one step forward in history
/*------------------------------------------------------------------------*/
function historyRedo() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(idHstS, idOrdn, idNxt);
    desc.putReference(idnull, ref);
    executeAction(idslct, desc, DialogModes.NO);
}

//WORK IN PROGRESS
//ALIGN LEFT/TOP
// =======================================================
var idAlgn = charIDToTypeID( "Algn" );
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref2 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref2.putEnumerated( idLyr, idOrdn, idTrgt );
    desc3.putReference( idnull, ref2 );
    var idUsng = charIDToTypeID( "Usng" );
    var idADSt = charIDToTypeID( "ADSt" );
    var idAdLf = charIDToTypeID( "AdLf" );
    desc3.putEnumerated( idUsng, idADSt, idAdLf );
executeAction( idAlgn, desc3, DialogModes.NO );

// =======================================================
var idAlgn = charIDToTypeID( "Algn" );
    var desc4 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref3 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref3.putEnumerated( idLyr, idOrdn, idTrgt );
    desc4.putReference( idnull, ref3 );
    var idUsng = charIDToTypeID( "Usng" );
    var idADSt = charIDToTypeID( "ADSt" );
    var idAdTp = charIDToTypeID( "AdTp" );
    desc4.putEnumerated( idUsng, idADSt, idAdTp );
executeAction( idAlgn, desc4, DialogModes.NO );
