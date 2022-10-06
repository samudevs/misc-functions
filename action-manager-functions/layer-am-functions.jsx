/*--------------------------------------------------------------------------------------*/
//           Action Manager basic functions for layer handling
//           v0.7
//           Developed by Samuel López
/*--------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
//                      Constants section
/*------------------------------------------------------------------*/
var TID = charIDToTypeID;
var sTID = stringIDToTypeID;
/*------------------------------------------------------------------------*/
//                             Action manager functions
/*------------------------------------------------------------------------*/
/**
 * @desc Set all layers/layerSets visibility on/off. It selects all layers, sets visibilities and deselects all layers
 * @param {boolean} artLyrVis - Artlayers visibility
 * @param {boolean} lyrSetVis - LayerSets visibility
 */
function setAllLayersVisibility(artLyrVis, lyrSetVis) {
    var seld = [];
    var artLyrs = [];
    var lyrSets = [];
    var lyrInfo;
    selectAllLayers();
    seld = getSelectedLayers();
    for (var i = 0; i < seld.length; i++) {
        lyrInfo = getLayerProperty(seld[i], sTID("layerSection"));
        if (lyrInfo == sTID("layerSectionStart")) {
            lyrSets.push(seld[i]);
        } else {
            artLyrs.push(seld[i]);
        }
    }
    setLayersVisibility(artLyrs, artLyrVis);
    setLayersVisibility(lyrSets, lyrSetVis);
    deselectAllLayers();
}
/**
 * @desc Select all layers, children inclusive
 */
function selectAllLayers() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(TID("Lyr "), TID("Ordn"), TID("Trgt"));
    desc.putReference(TID("null"), ref);
    executeAction(sTID("selectAllLayers"), desc, DialogModes.NO);
}
/**
 * @desc Deselect all layers
 */
function deselectAllLayers() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(TID("Lyr "), TID("Ordn"), TID("Trgt"));
    desc.putReference(TID("null"), ref);
    executeAction(sTID("selectNoLayers"), desc, DialogModes.NO);
}
/**
 * @desc Set layer/s visibility
 * @param {int[]} ids - Array of layer IDs
 * @param {bool} visibility
 */
function setLayersVisibility(ids, visibility) {
    if (ids.length > 0) {
        var actionId;
        visibility == true ? actionId = TID("Shw ") : actionId = TID("Hd  ");
        var desc = new ActionDescriptor();
        var list = new ActionList();
        var ref = new ActionReference();
        for (var i = 0; i < ids.length; i++) ref.putIdentifier(TID("Lyr "), ids[i]);
        list.putReference(ref);
        desc.putList(TID("null"), list);
        executeAction(actionId, desc, DialogModes.NO);
    }
}
/**
 * @desc Get property value by ID
 * @param {int} id - Layer ID
 * @param {DescValueType} property
 * @returns {*} Property descriptor
 */
function getLayerProperty(id, property) {
    var ref = new ActionReference();
    var desc = new ActionDescriptor();
    ref.putProperty(TID("Prpr"), property);
    ref.putIdentifier(TID("Lyr "), id);
    return getDescriptorValue(executeActionGet(ref), property);
}
/**
 * @desc Get descriptor of property value
 * @param {ActionDescriptor} desc - Value descriptor
 * @param {DescValueType} property
 * @returns {number|*}
 */
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

/**
 * @desc Convert layer index to layer ID
 * @param {int} idx - Layer Index
 * @returns {int} Layer ID
 */
function getLayerID(idx) { 
    var ref = new ActionReference();
    ref.putIndex(TID("Lyr "), idx );
    return executeActionGet(ref).getInteger(TID("LyrI"));
}
/**
 * @desc Get current selected layers IDs
 * @returns {int[]} Layers IDs
 */
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
        ref.putProperty(TID("Prpr"), sTID("targetLayers"));
        ref.putEnumerated(TID("Dcmn"), TID("Ordn"), TID("Trgt"));
        var desc = executeActionGet(ref);
        if (desc.hasKey(sTID("targetLayers"))) {
            var layersList = desc.getList(sTID("targetLayers"));
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
/**
 * @desc Get DOM element by ID. Layer is selected
 * @param {int} id
 * @returns {DOMElement}
 */
function getElementByID(id) {
    selectLayers (id);
    return activeDocument.activeLayer;
    }
/**
 * @desc Set layer name. Layer is selected
 * @param {int} id
 * @param {String} name
 */
function setLayerName(id, name) {
    selectLayers(id);
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putIdentifier(TID("Lyr "), id);
    desc.putReference(TID("null"), ref);
    var nameDesc = new ActionDescriptor();
    nameDesc.putString(TID("Nm  "), name);
    desc.putObject(TID("T   "), TID("Lyr "), nameDesc);
    executeAction(TID("setd"), desc, DialogModes.NO);
}
/**
 * Select layers by ID, when continuous is true and a single layer is provided all layers between this single layer and previous selection will be selected
 * @param {int[]} ids
 * @param {bool} continuous
 */
function selectLayers(ids, continuous) { 
    if (continuous == undefined) continuous = false;
    if (ids.constructor != Array) ids = [ids];
    if (ids.length > 0) {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        if (continuous) desc.putEnumerated(sTID("selectionModifier"), sTID("selectionModifierType"), sTID("addToSelectionContinuous"));
        for (var n = 0; n < ids.length; n++) {
            ref.putIdentifier(TID("Lyr "), ids[n]);
        }
        desc.putReference(TID("null"), ref);
        desc.putBoolean(TID("MkVs"), false);
        executeAction(TID("slct"), desc, DialogModes.NO);
    }
}
/**
 * Check if it is a layerset (layer group)
 * @param {int} id
 * @returns {boolean}
 */
function isLayerSet(id) {
    return getLayerProperty(id, sTID("layerSection")) == sTID("layerSectionStart");
}
/**
 * @desc Get first level children IDs
 * @param {int} id
 * @returns {int[]} Children IDs
 */
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
/**
 * @desc Put layers into a layer set. It selects layers and create group with them. Group remains selected. If layers array is null then current selection will be used.
 * @param {int[]} layers
 * @param {String} name
 */
function groupLayers(layers, name) {
    layers == null ? selectLayers(layers) : null;
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    var ref2 = new ActionReference();
    ref1.putClass(sTID("layerSection"));
    desc1.putReference(TID("null"), ref1);
    ref2.putEnumerated(TID("Lyr "), TID("Ordn"), TID("Trgt"));
    desc1.putReference(TID("From"), ref2);
    name != undefined ? desc2.putString(TID("Nm  "), name) : null;
    desc1.putObject(TID("Usng"), sTID("layerSection"), desc2);
    executeAction(TID("Mk  "), desc1, DialogModes.NO);
}
/**
 * @desc Ungroup layers. Layer set is removed and the ungrouped layers remain selected. If layers is null then current selected group will be ungrouped
 * @param {int[]} layers
 */

function ungroup(layers) { 
    layers == null ? selectLayers(layers) : null;
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(TID("Lyr "), TID("Ordn"), TID("Trgt"));
    desc.putReference(TID("null"), ref);
    executeAction(sTID("ungroupLayersEvent"), desc, DialogModes.NO);
}

/**
 * @desc Duplicate layers. It places duplicate layers above the first source layer or on top of document if target document is not the active document. Layers remain selected. If sourceLayers is null then current selected layers will be duplicated
 * @param {int[]} sourceLayers - IDs of layers to duplicate
 * @param {String} targetDoc - Target document name
 */
function duplicateLayers(sourceLayers, targetDoc) {
    sourceLayers == null ? selectLayers(sourceLayers) : null;
    var desc = new ActionDescriptor();
    var ref1 = new ActionReference();
    var ref2 = new ActionReference();
    ref1.putEnumerated(TID("Lyr "), TID("Ordn"), TID("Trgt"));
    desc.putReference(TID("null"), ref1);
    ref2.putName(TID("Dcmn"), targetDoc);
    desc.putReference(TID("T   "), ref2);
    desc.putInteger(TID("Vrsn"), 5);
    executeAction(TID("Dplc"), desc, DialogModes.NO)
}

/**
 * @desc Selects next visible layer
 */
function selectNextVisibleLayer() {
    var desc= new ActionDescriptor();
    var ref = new ActionReference();        
    ref.putEnumerated( TID("Lyr "), TID("Ordn"), TID("Bckw") );
    desc.putReference( TID("null"), ref);
    executeAction( TID("slct"), desc, DialogModes.NO );
}

/**
 * @desc Selects previous visible layer
 */
function selectPreviousVisibleLayer() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();        
    ref.putEnumerated( TID("Lyr "), TID("Ordn"), TID("Frwr") );
    desc.putReference( TID("null"), ref);
    executeAction( TID("slct"), desc, DialogModes.NO );
}

/**
 * @desc Move layers before/after target layer. It errors if sourcelayers includes targetlayer
 * @param {int[]} sourceLayers - Source layers IDs
 * @param {int} targetLayer - Target layer ID
 * @param {boolean} placeBefore - Place before/after
 */
function moveLayers(sourceLayers, targetLayer, placeBefore) {
    if (sourceLayers.constructor != Array) sourceLayers = [sourceLayers];
    placeBefore == undefined ? placeBefore = false : null;
    var desc = new ActionDescriptor();
    var ref1 = new ActionReference();
    var ref2 = new ActionReference();
    for (var n = 0; n < sourceLayers.length; n++) {
        ref1.putIdentifier(TID("Lyr "), sourceLayers[n]);
    }
    desc.putReference(TID("null"), ref1);    
    ref2.putIndex(TID("Lyr "), getIndexByID(targetLayer));
    desc.putReference(TID("T   "), ref2);
    executeAction(TID("move"), desc, DialogModes.NO);
    if (placeBefore) {
        moveNext(sourceLayers);
    }
}

/**
 * @desc Convert layer ID to index
 * @param {int} id - Layer ID
 * @returns {int}
 */
function getIndexByID(id) {
    return getLayerProperty(id, TID("ItmI"));
}

/**
 * @desc Get layer name
 * @param {int} id - Layer ID
 * @returns {String} Layer name
 */
function getNameByID(id) {
    return getLayerProperty(id, TID("Nm  "));
}

/**
 * @desc Delete layer
 * @param {int} id - Layer ID
 */
function deleteLayer(id) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
   ref.putIdentifier(TID("Lyr "), id);
    desc.putReference(TID("null"), ref);
    executeAction(TID("Dlt "), desc, DialogModes.NO);
}

/**
 * @desc Move layer upwards. Layer remains selected
 * @param {int} id - Layer ID
 */
function moveNext(id) {
    selectLayers(id);
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(TID("Lyr "), TID("Ordn"), TID("Trgt"));
    desc.putReference(TID("null"), ref);
    var ref = new ActionReference();
    ref.putEnumerated(TID("Lyr "), TID("Ordn"), TID("Nxt "));
    desc.putReference(TID("T   "), ref);
    executeAction(TID("move"), desc, DialogModes.NO);
}
/**
 * @desc Move layer downwards. Layer remainss selected. Error if it's last layer
 * @param {int} id - Layer ID
 */
function movePrev(id) {
    selectLayers(id);
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(TID("Lyr "), TID("Ordn"), TID("Trgt"));
    desc.putReference(TID("null"), ref);
    var ref = new ActionReference();
    ref.putEnumerated(TID("Lyr "), TID("Ordn"), TID("Prvs"));
    desc.putReference(TID("T   "), ref);
    executeAction(TID("move"), desc, DialogModes.NO);
}

/*------------------------------------------------------------------------*/
//                             auxiliary functions
/*------------------------------------------------------------------------*/
/**
 * @desc Rename layers with ID and index and create a text label on each layer
 * @param {boolean} toggleLabel - Rasterize layer name on layer
 */
function renameLyrsIdxId(toggleLabel) {
    toggleLabel == undefined ?  toggleLabel = false : null;
    var sel, idx, txt, active;
    selectAllLayers();
    sel = getSelectedLayers();

    for (var n = 0; n < sel.length; n++) {
        setLayerName(sel[n],  getIndexByID(sel[n]) + " " + sel[n]);
        $.writeln(sel[n]);
        if (!isLayerSet(sel[n]) && toggleLabel) {
            active = activeDocument.activeLayer;
            active.kind = LayerKind.TEXT;
            txt = active.textItem;
            txt.size = 20;
            txt.position = [10, 50 + n * 15];
            txt.contents = active.name;
            active.rasterize(RasterizeType.TEXTCONTENTS);

        }
    }

}