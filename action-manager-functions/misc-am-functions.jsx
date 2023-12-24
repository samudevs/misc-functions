/*--------------------------------------------------------------------------------------*/
//           Action Manager Miscellaneous basic functions
//           v0.1
//           Developed by Samuel López
/*--------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
//                      Constants section
/*------------------------------------------------------------------*/
var TID = charIDToTypeID;
var sTID = stringIDToTypeID;
/*------------------------------------------------------------------------*/
//                                  MISC functions
/*------------------------------------------------------------------------*/
/**
 * @desc Creates a square selection
 * @param {double} top - top square boundary
 * @param {double} left - left square boundary
 * @param {double} bottom - bottom square boundary
 * @param {double} right - right square boundary
 * @param {integer} type - { Rectangle: 0, Elipse: 1}
 */
function imageSelection(top, left, bottom, right, type) {
    if (type==1) {
        typeID = TID("Elps");
    } else {
        typeID = TID("Rctn");
    }
    
    var desc1 = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putProperty(TID("Chnl"), TID("fsel"));
    desc1.putReference(TID("null"), ref);
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(TID("Top "), TID("#Pxl"), top);
    desc2.putUnitDouble(TID("Left"), TID("#Pxl"), left);
    desc2.putUnitDouble(TID("Btom"), TID("#Pxl"), bottom);
    desc2.putUnitDouble(TID("Rght"), TID("#Pxl"), right);
    desc1.putObject(TID("T   "), typeID, desc2);
    executeAction(TID("IntW"), desc1, DialogModes.NO);
}
/**
 * @desc Crops a previous selection. Error if selection doesn't exist.
 */
function cropSelection() {
    var desc = new ActionDescriptor();
    desc.putBoolean(TID("Dlt "), true);
    executeAction(TID("Crop"), desc, DialogModes.NO);
}

/**
 * @desc Crops image
 * @param {double} top - top boundary
 * @param {double} left - left boundary
 * @param {double} bottom - bottom boundary
 * @param {double} right - right boundary
 * @param {double} angle - rotation
 * @param {double} deleteOverflow - delete hidden part of image
 */
function crop(top, left, bottom, right, angle, deleteOverflow) {
    deleteOverflow == undefined ?  deleteOverflow = false : null;
    angle == undefined ?  angle = 0 : null;
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble( TID("Top "), TID("#Rlt"), top );
    desc2.putUnitDouble( TID("Left"), TID("#Rlt"), left);
    desc2.putUnitDouble( TID("Btom"), TID("#Rlt"), bottom);
    desc2.putUnitDouble( TID("Rght"), TID("#Rlt"), right );
    desc1.putObject( TID("T   "), TID("Rctn"), desc2 );
    desc1.putUnitDouble( TID("Angl"), TID("#Ang"), angle );
    desc1.putBoolean( TID("Dlt "), deleteOverflow);
    executeAction( TID("Crop"), desc1, DialogModes.NO );
}
/**
 * @desc Undoes last action
 */
function historyUndo() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(TID("HstS"), TID("Ordn"), TID("Prvs"));
    desc.putReference(TID("null"), ref);
    executeAction(TID("slct"), desc, DialogModes.NO);
}
/**
 * @desc Redoes undone action
 */
function historyRedo() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(TID("HstS"), TID("Ordn"), TID("Nxt "));
    desc.putReference(TID("null"), ref);
    executeAction(TID("slct"), desc, DialogModes.NO);
}

/**
 * @desc Applies Magic Wand on point
 * @param {integer} x - x point coordinate
 * @param {integer} y - y point coordinate
 * @param {integer} threshold - selection threshold
 */
function magicWand (x, y, threshold) {
    var desc1   = new ActionDescriptor ();
    var desc2 = new ActionDescriptor ();
    var ref  = new ActionReference ();
    ref.putProperty (TID("Chnl"), TID("fsel"));
    desc1.putReference (TID("null"), ref);
    desc2.putUnitDouble (TID("Hrzn"), TID("#Pxl"), x);
    desc2.putUnitDouble (TID("Vrtc"), TID("#Pxl"), y);
    desc1.putObject (TID("T   "), TID("Pnt "), desc2);
    desc1.putInteger (TID("Tlrn"), threshold);
    desc1.putBoolean (TID("AntA"), true);
  executeAction (TID("setd"), desc1, DialogModes.NO);
}


/**
 * @desc Applies Magic Eraser on point
 * @param {integer} x - x point coordinate
 * @param {integer} y - y point coordinate
 * @param {integer} atialiasing - selection antialiasing
 */
function magicEraser (x, y, tolerance, antialiasing) {
    var desc1   = new ActionDescriptor (); 
    var desc2 = new ActionDescriptor (); 
    desc2.putUnitDouble (TID ("Hrzn"), TID ("#Pxl"), x);
    desc2.putUnitDouble (TID ("Vrtc"), TID ("#Pxl"), y); 
    desc1.putObject (TID ("From"), TID ("Pnt "), desc2);
    desc1.putInteger (TID ("Tlrn"), tolerance);
    desc1.putBoolean (TID ("AntA"), antialiasing);
    desc1.putEnumerated (TID ("Usng"), TID ("FlCn"), TID ("BckC"));
    desc1.putEnumerated (TID ("Md  "), TID ("BlnM"), TID ("Clar"));
    executeAction (TID ("Fl  "), desc1, DialogModes.NO);
}

/**
 * @desc Sets background RGB color
 * @param {integer} red
 * @param {integer} green
 * @param {integer} blue
 */
function setBackgroundColor(red, green, blue) {
    var desc1 = new ActionDescriptor();  
    var ref = new ActionReference(); 
    ref.putProperty( TID( "Clr " ), TID( "BckC" ));
    desc1.putReference( TID( "null" ), ref );    
    var desc2 = new ActionDescriptor();       
    desc2.putDouble( TID( "Rd  " ), red);       
    desc2.putDouble( TID( "Grn " ), green );       
    desc2.putDouble( TID( "Bl  " ), blue );  
    desc1.putObject( TID( "T   " ), TID( "RGBC" ), desc2 );    
    executeAction( TID( "setd" ), desc1, DialogModes.NO );    
}


/**
 * @desc Sets foreground RGB color
 * @param {integer} red
 * @param {integer} green
 * @param {integer} blue
 */
function setForegroundColor(red, green, blue) {
    var desc1 = new ActionDescriptor();  
    var ref = new ActionReference(); 
    ref.putProperty( TID( "Clr " ), TID( "FrgC" ));
    desc1.putReference( TID( "null" ), ref );    
    var desc2 = new ActionDescriptor();       
    desc2.putDouble( TID( "Rd  " ), red);       
    desc2.putDouble( TID( "Grn " ), green );       
    desc2.putDouble( TID( "Bl  " ), blue );  
    desc1.putObject( TID( "T   " ), TID( "RGBC" ), desc2 );    
    executeAction( TID( "setd" ), desc1, DialogModes.NO );    
}

/**
 * @desc Clears selection
 */
function clearSelection() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putProperty( TID( "Chnl" ), TID( "fsel" ) );
    desc.putReference( TID( "null" ), ref );
    desc.putEnumerated( TID( "T   " ), TID( "Ordn" ), TID( "None" ) );
    executeAction( TID( "setd" ), desc, DialogModes.NO );      
}

/**
 * @desc Aligns previously selected layers
 * @param {string} alignment - { Left: AdLf, top: AdTp, right: AdRg, bottom: AdBt }
 */
function alignLayers(alignment) { 
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated( TID( "Lyr " ), TID( "Ordn" ), TID( "Trgt" ) );
    desc.putReference( TID( "null" ), ref );
    desc.putEnumerated( TID( "Usng" ), TID( "ADSt" ), TID( alignment ) );
    executeAction( TID( "Algn" ), desc, DialogModes.NO );
}

/**
 * @desc Applies mosaic filter
 * @param {integer} square size
 */
function applyMosaicFilter(squareSize) {
        var desc= new ActionDescriptor();
        desc.putUnitDouble( TID( "ClSz" ), TID( "#Pxl" ), squareSize);
    executeAction( TID( "Msc " ), desc, DialogModes.NO );
}


