/*--------------------------------------------------------------------------------------*/
//           Miscellaneous basic functions for layer management
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
 * @param {integer} top - top square boundary
 * @param {integer} left - left square boundary
 * @param {integer} bottom - bottom square boundary
 * @param {integer} right - right square boundary
 */
function selectImage(top, left, bottom, right) {
    var desc1 = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putProperty(TID("Chnl"), TID("fsel"));
    desc1.putReference(TID("null"), ref);
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(TID("Top "), TID("#Pxl"), top);
    desc2.putUnitDouble(TID("Left"), TID("#Pxl"), left);
    desc2.putUnitDouble(TID("Btom"), TID("#Pxl"), bottom);
    desc2.putUnitDouble(TID("Rght"), TID("#Pxl"), right);
    desc1.putObject(TID("T   "), TID("Rctn"), desc2);
    executeAction(TID("IntW"), desc1, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         crop()
//         BEHAVIOR: crops selection //TODO: coordinates on input
/*------------------------------------------------------------------------*/
function crop() {
    var desc = new ActionDescriptor();
    desc.putBoolean(TID("Dlt "), true);
    executeAction(TID("Crop"), desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         historyUndo()
//         BEHAVIOR: one step back in history
/*------------------------------------------------------------------------*/
function historyUndo() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(TID("HstS"), TID("Ordn"), TID("Prvs"));
    desc.putReference(TID("null"), ref);
    executeAction(TID("slct"), desc, DialogModes.NO);
}
/*------------------------------------------------------------------------*/
//         historyRedo()
//         BEHAVIOR: one step forward in history
/*------------------------------------------------------------------------*/
function historyRedo() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(TID("HstS"), TID("Ordn"), TID("Nxt "));
    desc.putReference(TID("null"), ref);
    executeAction(TID("slct"), desc, DialogModes.NO);
}

//WORK IN PROGRESS

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

function removeBackground (x, y) {
  var id1 = charIDToTypeID ("Fl  ");
    var desc1   = new ActionDescriptor ();
    var id2     = charIDToTypeID ("From");
      var desc2 = new ActionDescriptor ();
      var id3   = charIDToTypeID ("Hrzn");
      var id4   = charIDToTypeID ("#Pxl");
      desc2.putUnitDouble (id3, id4, x);
      var id5   = charIDToTypeID ("Vrtc");
      var id6   = charIDToTypeID ("#Pxl");
      desc2.putUnitDouble (id5, id6, y);
    var id7     = charIDToTypeID ("Pnt ");
    desc1.putObject (id2, id7, desc2);
    var id8     = charIDToTypeID ("Tlrn");
    desc1.putInteger (id8, 32);
    var id9     = charIDToTypeID ("AntA");
    desc1.putBoolean (id9, true);
    var id10    = charIDToTypeID ("Usng");
    var id11    = charIDToTypeID ("FlCn");
    var id12    = charIDToTypeID ("BckC");
    desc1.putEnumerated (id10, id11, id12);
    var id13    = charIDToTypeID ("Md  ");
    var id14    = charIDToTypeID ("BlnM");
    var id15    = charIDToTypeID ("Clar");
    desc1.putEnumerated (id13, id14, id15);
  executeAction (id1, desc1, DialogModes.NO);
}


function setBackgroundColorWhite() { //TODO: make for any color
var idsetd = charIDToTypeID( "setd" );
    var desc389 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref163 = new ActionReference();
        var idClr = charIDToTypeID( "Clr " );
        var idBckC = charIDToTypeID( "BckC" );
        ref163.putProperty( idClr, idBckC );
    desc389.putReference( idnull, ref163 );
    var idT = charIDToTypeID( "T   " );
        var desc390 = new ActionDescriptor();
        var idH = charIDToTypeID( "H   " );
        var idAng = charIDToTypeID( "#Ang" );
        desc390.putUnitDouble( idH, idAng, 115.762939 );
        var idStrt = charIDToTypeID( "Strt" );
        desc390.putDouble( idStrt, 0.000000 );
        var idBrgh = charIDToTypeID( "Brgh" );
        desc390.putDouble( idBrgh, 100.000000 );
    var idHSBC = charIDToTypeID( "HSBC" );
    desc389.putObject( idT, idHSBC, desc390 );
    var idSrce = charIDToTypeID( "Srce" );
    desc389.putString( idSrce, """photoshopPicker""" );
executeAction( idsetd, desc389, DialogModes.NO );       
    
    
    }


function removeSelection() {
var idsetd = charIDToTypeID( "setd" );
    var desc662 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref287 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref287.putProperty( idChnl, idfsel );
    desc662.putReference( idnull, ref287 );
    var idT = charIDToTypeID( "T   " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idNone = charIDToTypeID( "None" );
    desc662.putEnumerated( idT, idOrdn, idNone );
executeAction( idsetd, desc662, DialogModes.NO );    
    
    }

//ALIGN LEFT/TOP
// =======================================================
/*var idAlgn = charIDToTypeID( "Algn" );
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
executeAction( idAlgn, desc4, DialogModes.NO ); */
