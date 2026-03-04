//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;

var canvasHistory;
var prevMousePressed = false;

function setup() {

    //create a canvas to fill the content div from index.html
    canvasContainer = select('#content');
    var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    c.parent("content");

    // force correct size after layout
    setTimeout(() => {
        resizeCanvas(canvasContainer.size().width, canvasContainer.size().height);
        background(255);
        loadPixels();
    }, 0);

    //create helper functions and the colour palette
    helpers = new HelperFunctions();
    colourP = new ColourPalette();

    //create a toolbox for storing the tools
    toolbox = new Toolbox();

    //add the tools to the toolbox.
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new StickerTool());
    toolbox.addTool(new EraserTool());
    background(255);

    /* CODE WRITTEN BY MYSELF WITH NO HELP*/
    /* START OF CODE */
    canvasHistory = new HistoryManager(30);

    // Undo Button
    select("#undoButton").mouseClicked(function() {
        if (canvasHistory) canvasHistory.undo();
    });

    // Redo Button
    select("#redoButton").mouseClicked(function() {
        if (canvasHistory) canvasHistory.redo();
    });


    window.addEventListener("keydown", (e) => {
        // Ctrl+Z (undo)
        if (e.ctrlKey && !e.shiftKey && (e.key === "z" || e.key === "Z")) {
            e.preventDefault();
            if (canvasHistory) canvasHistory.undo();
        }

        // Ctrl+Y (redo) OR Ctrl+Shift+Z (redo)
        if (
            (e.ctrlKey && (e.key === "y" || e.key === "Y")) ||
            (e.ctrlKey && e.shiftKey && (e.key === "z" || e.key === "Z"))
        ) {
            e.preventDefault();
            if (canvasHistory) canvasHistory.redo();
        }
    });

    loadPixels();

    /* END OF CODE WRITTEN BY MYSELF */
}

function draw() {
    //call the draw function from the selected tool.
    //hasOwnProperty is a javascript function that tests
    //if an object contains a particular method or property
    //if there isn't a draw method the app will alert the user
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        alert("it doesn't look like your tool has a draw method!");
    }
}


/* CODE WRITTEN BY MYSELF WITH NO HELP*/
/* START OF CODE */
function mousePressed() {
    const inside = mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
    if (!inside) return;

    if (canvasHistory) canvasHistory.snapshot();
    updatePixels();                // remove preview before snapshot

    if (toolbox.selectedTool.mousePressed) {
        toolbox.selectedTool.mousePressed();
    }
}

function windowResized() {
    resizeCanvas(canvasContainer.size().width, canvasContainer.size().height);
    background(255);
    loadPixels();
}
/* END OF CODE WRITTEN BY MYSELF */




