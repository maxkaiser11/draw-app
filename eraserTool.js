/* ALL THE CODE IN THIS FILE IS WRITTEN WITHOUT ANY HELP */

/********** Eraser Tool **********/

function EraserTool() {
    this.icon = "assets/eraser.png";
    this.name = "eraser";

    var previousMouseX = -1;
    var previousMouseY = -1;
    var self = this;

    this.eraserSize = 20;

    this.draw = function() {
        if (mouseIsPressed) {
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            } else {
                push();
                // draw in white to "erase"
                stroke(255);
                fill(255);
                strokeWeight(self.eraserSize);
                strokeCap(SQUARE);
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                // also cover the endpoint with a square for clean edges
                noStroke();
                rectMode(CENTER);
                rect(mouseX, mouseY, self.eraserSize, self.eraserSize);
                pop();

                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        } else {
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };

    this.populateOptions = function() {
        select(".options").html(`
            <div style="display:flex; flex-direction:column; gap:8px;">
                <div><b>Eraser Tool</b></div>
                <label>Eraser Size:
                    <input id="eraserSize" type="range" min="5" max="80" value="${this.eraserSize}" />
                    <span id="eraserSizeLabel">${this.eraserSize}px</span>
                </label>
                <div style="font-size:12px; opacity:0.85;">Click and drag to erase.</div>
            </div>
        `);

        select("#eraserSize").input(function() {
            self.eraserSize = Number(this.elt.value);
            select("#eraserSizeLabel").html(self.eraserSize + "px");
        });
    };

    this.unselectTool = function() {
        select(".options").html("");
    };
}
