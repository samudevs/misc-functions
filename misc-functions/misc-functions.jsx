unction getSaveOptionsGUI() {
    var matteOptions = [MatteType.BACKGROUND, MatteType.BLACK, MatteType.FOREGROUND, MatteType.NETSCAPE, MatteType.NONE, MatteType.SEMIGRAY, MatteType.WHITE];
    var IMGSaveOptions;
    // SAVEOPTIONS
    // ===========
    var saveOptionsWin = new Window("dialog");
    saveOptionsWin.text = "Save Options";
    saveOptionsWin.orientation = "column";
    saveOptionsWin.alignChildren = ["center", "top"];
    saveOptionsWin.spacing = 10;
    saveOptionsWin.margins = 16;

    // TPANEL1
    // =======
    var tpanel1 = saveOptionsWin.add("tabbedpanel", undefined, undefined, {name: "tpanel1"});
    tpanel1.alignChildren = "fill";
    tpanel1.preferredSize.width = 200.725;
    tpanel1.margins = 10;

    // PNGTAB
    // ======
    var pngTab = tpanel1.add("tab", undefined, undefined, {name: "pngTab"});
    pngTab.text = "PNG";
    pngTab.orientation = "column";
    pngTab.alignChildren = ["left", "top"];
    pngTab.spacing = 10;
    pngTab.margins = 10;

    var PNGInterlaced = pngTab.add("checkbox", undefined, undefined, {name: "PNGInterlaced"});
    PNGInterlaced.text = "Interlaced";
    PNGInterlaced.helpTip = "Image loads an early degraded version of the whole image as soon as possible and then progressively renders the image to clear state. Interlaced will almost always be a bit bigger in filesize.";

    // GROUP1
    // ======
    var group1 = pngTab.add("group", undefined, {name: "group1"});
    group1.orientation = "row";
    group1.alignChildren = ["left", "center"];
    group1.spacing = 10;
    group1.margins = 0;

    var statictext1 = group1.add("statictext", undefined, undefined, {name: "statictext1"});
    statictext1.text = "Compression";
    statictext1.justify = "center";
    statictext1.helpTip = "Compression level, 0 (no compression) to 9. Higher compression results in smaller file size but the same quality.";
    var PNGCompressLevel = group1.add("dropdownlist", undefined, undefined, {
        name: "CompressionDD",
        items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    });
    PNGCompressLevel.selection = 0;
    PNGCompressLevel.minimumSize.width = 40;
    


    // JPEGTAB
    // =======
    var jpegTab = tpanel1.add("tab", undefined, undefined, {name: "jpegTab"});
    jpegTab.text = "JPEG";
    jpegTab.orientation = "column";
    jpegTab.alignChildren = ["left", "top"];
    jpegTab.spacing = 10;
    jpegTab.margins = 10;

    // TPANEL1
    // =======
    tpanel1.selection = jpegTab;

    var embedColorCB = jpegTab.add("checkbox", undefined, undefined, {name: "embedColorCB "});
    embedColorCB.text = "Embed Color Profile";
    embedColorCB.helpTip =  "Embed the color profile in the document.";

    var formatOptionsDD_array = ["Optimized Baseline", "Progressive", "Standard Baseline"];
    var formatOptionsDD = jpegTab.add("dropdownlist", undefined, undefined, {
        name: "formatOptionsDD",
        items: formatOptionsDD_array
    });
    formatOptionsDD.selection = 2;
    formatOptionsDD.onChange = function () {
        group2.enabled = this.selection.index == 1;
    };
    formatOptionsDD.helpTip = "OPTIMIZEDBASELINE: Optimized color and a slightly reduced file size. \nPROGRESSIVE: Displays a series of increasingly detailed scans as the image downloads. \nSTANDARDBASELINE: Format recognized by most web browsers."

    // GROUP2
    // ======
    var group2 = jpegTab.add("group", undefined, {name: "group2"});
    group2.enabled = false;
    group2.orientation = "row";
    group2.alignChildren = ["left", "center"];
    group2.spacing = 10;
    group2.margins = 0;

    var statictext2 = group2.add("statictext", undefined, undefined, {name: "statictext2"});
    statictext2.text = "Scans";
    statictext2.helpTip = "The number of scans to make to incrementally display the image on the page.";

    var scansCountDD = group2.add("dropdownlist", undefined, undefined, {name: "scansCountDD", items: [3, 4, 5]});
    scansCountDD.selection = 0;
    scansCountDD.minimumSize.width = 40;


    // GROUP3
    // ======
    var group3 = jpegTab.add("group", undefined, {name: "group3"});
    group3.orientation = "row";
    group3.alignChildren = ["left", "center"];
    group3.spacing = 10;
    group3.margins = 0;

    var statictext3 = group3.add("statictext", undefined, undefined, {name: "statictext3"});
    statictext3.text = "Matte Type";
    statictext3.helpTip = "The color to use to fill anti-aliased edges adjacent to transparent areas of the image";

    var matteDD_array = ["Background", "Black", "Foreground", "Netscape", "None", "Semigray", "White"];
    var matteDD = group3.add("dropdownlist", undefined, undefined, {name: "matteDD", items: matteDD_array});
    matteDD.selection = 6;

    // GROUP4
    // ======
    var group4 = jpegTab.add("group", undefined, {name: "group4"});
    group4.orientation = "row";
    group4.alignChildren = ["left", "center"];
    group4.spacing = 10;
    group4.margins = 0;

    var statictext4 = group4.add("statictext", undefined, undefined, {name: "statictext4"});
    statictext4.text = "Quality";
    statictext4.helpTip =  "The image quality setting to use. Affects file size and compression.";


    var JPEGQualityDD = group4.add("dropdownlist", undefined, undefined, {
        name: "JPEGQualityDD",
        items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    });
    JPEGQualityDD.selection = 3; //Default

    // SAVEBUTTON
    // ===========
    var buttons = saveOptionsWin.add("group", undefined, {name: "buttons"});
    buttons.orientation = "row";
    buttons.alignChildren = ["left", "center"];
    buttons.spacing = 10;
    buttons.margins = 0;
    var applyButton = buttons.add("button", undefined, undefined, {name: "applyButton"});
    applyButton.text = "Save";
    applyButton.onClick = function () {
        switch (tpanel1.selection.text) {
            case "JPEG":
                IMGSaveOptions = new JPEGSaveOptions();
                IMGSaveOptions.embedColorProfile = embedColorCB.value;
                switch (formatOptionsDD.selection.index) {
                    case 0:
                        IMGSaveOptions.formatOptions = FormatOptions.OPTIMIZEDBASELINE;
                        break;
                    case 1:
                        IMGSaveOptions.formatOptions = FormatOptions.PROGRESSIVE;
                        IMGSaveOptions.scans = parseInt(scansCountDD.selection.text);
                        break;
                    default:
                        IMGSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
                }
                IMGSaveOptions.matte = matteOptions[matteDD.selection.index];
                IMGSaveOptions.quality = parseInt(JPEGQualityDD.selection.text);
                break;
            case "PNG":
            default:
                IMGSaveOptions = new PNGSaveOptions();
                IMGSaveOptions.compression = parseInt(PNGCompressLevel.selection);
                IMGSaveOptions.interlaced = PNGInterlaced.value;

         }
        saveOptionsWin.close();
    };

     var cancelButton = buttons.add("button", undefined, undefined, {name: "cancelButton"});
     cancelButton.text = "Cancel";
     cancelButton.onClick = function() {
            IMGSaveOptions = false;
            saveOptionsWin.close();
         };

    saveOptionsWin.show();
    return IMGSaveOptions;
}

function docSaveAs(docRef, path, filename, saveOptions, overwrite) {
    var extension, file;
    saveOptions.typename == "JPEGSaveOptions" ? extension = ".jpeg" : extension = ".png";
    file = new File(path + "/" + filename + extension);
    if ((overwrite) && (file.exists) || (!file.exists)) {
        docRef.saveAs(file, saveOptions, true, Extension.LOWERCASE);
        return true;
    } else {
        return false;
    }
}

function createProgressBar(win) {
    var panel1 = win.add("panel", undefined, undefined, {name: "panel1"});
    panel1.text = 0 + "/" + numCombinations;
    panel1.orientation = "column";
    panel1.alignChildren = ["left", "top"];
    panel1.spacing = 10;
    panel1.margins = 10;
    win.pbar = win.panel1.add('progressbar', undefined, 0, numCombinations);
    win.pbar.preferredSize.width = 300;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min+1) ) + min;
}

function throwDie(percentage) { //TODO
    var maxValue = Math.round(100/percentage);
    return (getRndInteger(1,maxValue) == maxValue);
}

function discreteDistributionSample(probabilities) {
    var total = 0, sample = getRndInteger(0,9999);
    var n = 0;
   while ((n < probabilities.length) && (sample >= total)) {
            total += (probabilities[n] * 100);
            n++;
        } 
    n--;
  if (sample >= total) {
        n = -1;
      }
    return n;
} 


var ENABLE_LOG = false;
var LOG_FILE = new File($.fileName.replace(/(\.[a-z0-9]+)$/i, ".log"));
var LOG_POS = 1;
var execTime = Date.now();
function writeLog(msg) {
    if (!ENABLE_LOG)
        return 0;
    $.writeln(msg);
    if (LOG_FILE != null) {
        LOG_FILE.open("a");
        LOG_FILE.write(LOG_POS++ + "> ");
        LOG_FILE.write("(" + (Date.now() - execTime) / 1000 + "s) ");
        LOG_FILE.writeln(msg);
        LOG_FILE.close();
    }
    return true;
}

function leftPad(target,finalLength, symbol) {
    var str = target.toString();
    while (str.length < finalLength) {
            str = symbol + str;
        }
    return str;
    }

function addTxtLayer(parent,text) {
    var docRef =  app.activeDocument;   
    var txtLayer = parent.add();
    txtLayer.kind = LayerKind.TEXT;
    var txtItem = txtLayer.textItem;

       
         txtItem.size = docRef.width / 25; //new UnitValue(docRef.width / 100);
            
            txtItem.position = [0 + (docRef.width / 100), (txtItem.size / 1.5) + (docRef.height / 100)];
            txtItem.contents =  text;
            
            return txtLayer;
            }