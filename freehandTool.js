function FreehandTool() {
    //set an icon and a name for the object
    this.icon = "assets/freehand.jpg";
    this.name = "freehand";

    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1;
    var previousMouseY = -1;

    // *** START OF CODE WRITTEN WITHOUT ANY HELP *** //
    var brushSize = 4;
    var brushOpacity = 255;


    this.draw = function() {
        strokeWeight(brushSize);
        stroke(red(colourP.selectedColour), green(colourP.selectedColour), blue(colourP.selectedColour), brushOpacity);
        //if the mouse is pressed
        if (mouseIsPressed) {
            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            //if we already have values for previousX and Y we can draw a line from 
            //there to the current mouse location
            else {
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        }
        //if the user has released the mouse we want to set the previousMouse values 
        //back to -1.
        //try and comment out these lines and see what happens!
        else {
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    this.populateOptions = function() {
        select(".options").html(`
            <div style="display:flex; flex-direction:column; gap:8px;">
                <div><b>Freehand Tool</b></div>
                <label>Brush Size:
                    <input id="freehandSize" type="range" min="1" max="50" value="${brushSize}" />
                    <span id="freehandSizeLabel">${brushSize}px</span>
                </label>
                <label>Opacity:
                    <input id="freehandOpacity" type="range" min="10" max="255" value="${brushOpacity}" />
                    <span id="freehandOpacityLabel">${Math.round((brushOpacity / 255) * 100)}%</span>
                </label>
            </div>
        `);

        select("#freehandSize").input(function() {
            brushSize = Number(this.elt.value);
            select("#freehandSizeLabel").html(brushSize + "px");
        });

        select("#freehandOpacity").input(function() {
            brushOpacity = Number(this.elt.value);
            select("#freehandOpacityLabel").html(Math.round((brushOpacity / 255) * 100) + "%");
        });
    };

    this.unselectTool = function() {
        select(".options").html("");
    };
    // *** END OF CODE WRITTEN WITHOUT ANY HELP *** //
}
