/************** Sticker Feature **************/
/* Allows the user to pick from 3 stickers (for now),
    they can rotate and scale the sticker using sliders as well, 
    and simply left click to place one 
*/


/* The Sticker Icon is from the website flaticon, this is just me attributing Freepiks work as required by the website
    Sticker icons created by Freepik: https://www.flaticon.com/free-icons/sticker 
*/

/* ALL THE CODE IN THIS FILE IS WRITTEN WITHOUT ANY HELP */


class StickerTool {
    constructor() {
        this.icon = "assets/sticker.png";
        this.name = "sticker";

        this.selectedSticker = "star";
        this.sizeValue = 80;
        this.rotationDeg = 0;

        this._stickers = null;

        const insideCanvas = () =>
            mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;

        const degToRad = (d) => (d * Math.PI) / 180;

        const ensureStickers = () => {
            if (this._stickers) return;
            const base = 256;
            this._stickers = {
                star: makeStarGraphic(base),
                heart: makeHeartGraphic(base),
                smiley: makeSmileyGraphic(base),
            };
        };

        const drawSticker = (g, opacity = 255) => {
            push();
            translate(mouseX, mouseY);
            rotate(degToRad(this.rotationDeg));
            imageMode(CENTER);
            scale(this.sizeValue / g.width);
            if (opacity < 255) tint(255, opacity);
            image(g, 0, 0);
            if (opacity < 255) noTint();
            pop();
        };

        this.draw = function() {
            ensureStickers();
            updatePixels();
            if (!insideCanvas()) return;
            drawSticker(this._stickers[this.selectedSticker], 180);
        };

        this.mousePressed = function() {
            if (!insideCanvas()) return;
            updatePixels();
            ensureStickers();
            drawSticker(this._stickers[this.selectedSticker]);
            loadPixels();
        };

        this.populateOptions = function() {
            select(".options").html(`
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div><b>Sticker Tool</b></div>
          <label>Sticker:
            <select id="stickerSelect">
              <option value="star">⭐ Star</option>
              <option value="heart">❤️ Heart</option>
              <option value="smiley">🙂 Smiley</option>
            </select>
          </label>
          <label>Size:
            <input id="stickerSize" type="range" min="20" max="240" value="${this.sizeValue}" />
            <span id="stickerSizeLabel">${this.sizeValue}px</span>
          </label>
          <label>Rotation:
            <input id="stickerRot" type="range" min="-180" max="180" value="${this.rotationDeg}" />
            <span id="stickerRotLabel">${this.rotationDeg}°</span>
          </label>
          <div style="font-size:12px; opacity:0.85;">Click to stamp. <b>Tip:</b> Undo with Ctrl+Z.</div>
        </div>
      `);

            ensureStickers();

            select("#stickerSelect").value(this.selectedSticker).changed(() => {
                this.selectedSticker = select("#stickerSelect").value();
            });

            select("#stickerSize").input(() => {
                this.sizeValue = Number(select("#stickerSize").value());
                select("#stickerSizeLabel").html(`${this.sizeValue}px`);
            });

            select("#stickerRot").input(() => {
                this.rotationDeg = Number(select("#stickerRot").value());
                select("#stickerRotLabel").html(`${this.rotationDeg}°`);
            });

            loadPixels();
        };

        this.unselectTool = function() {
            select(".options").html("");
            updatePixels();
        };

        // --- Sticker graphic generators ---
        function makeStarGraphic(sz) {
            const g = createGraphics(sz, sz);
            g.clear();
            g.push();
            g.translate(sz / 2, sz / 2);
            g.noStroke();
            g.fill(255, 204, 0);
            const outer = sz * 0.45, inner = sz * 0.20, points = 5;
            g.beginShape();
            for (let i = 0; i < points * 2; i++) {
                const angle = (Math.PI / points) * i - Math.PI / 2;
                const r = i % 2 === 0 ? outer : inner;
                g.vertex(Math.cos(angle) * r, Math.sin(angle) * r);
            }
            g.endShape(CLOSE);
            g.pop();
            return g;
        }

        function makeHeartGraphic(sz) {
            const g = createGraphics(sz, sz);
            g.clear();
            g.push();
            g.translate(sz / 2, sz / 2);
            g.noStroke();
            g.fill(255, 80, 120);
            const s = sz * 0.9;
            g.beginShape();
            for (let t = 0; t <= Math.PI * 2 + 0.01; t += 0.05) {
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                g.vertex((x / 18) * s * 0.5, (y / 18) * s * 0.5);
            }
            g.endShape(CLOSE);
            g.pop();
            return g;
        }

        function makeSmileyGraphic(sz) {
            const g = createGraphics(sz, sz);
            g.clear();
            g.push();
            g.translate(sz / 2, sz / 2);
            g.noStroke();
            g.fill(255, 220, 80);
            g.ellipse(0, 0, sz * 0.9);
            g.fill(60);
            g.ellipse(-sz * 0.15, -sz * 0.1, sz * 0.09);
            g.ellipse(+sz * 0.15, -sz * 0.1, sz * 0.09);
            g.noFill();
            g.stroke(60);
            g.strokeWeight(sz * 0.06);
            g.arc(0, sz * 0.05, sz * 0.55, sz * 0.45, 0, Math.PI);
            g.pop();
            return g;
        }
    }
}


// function StickerTool() {
//   this.icon = "assets/sticker.png";
//   this.name = "sticker";
//
//   var self = this;
//
//   // UI state
//   this.selectedSticker = "star";
//   this.sizeValue = 80;
//   this.rotationDeg = 0;
//
//   // internal
//   this._stickers = null;
//   this._uiWired = false;
//
//   function insideCanvas() {
//     return mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
//   }
//
//   function degToRad(d) {
//     return d * Math.PI / 180.0;
//   }
//
//     this.mousePressed = function () {
//         updatePixels();
//
//         // only stamp inside canvas
//         if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) return;
//
//         self._ensureStickers();
//         const g = self._stickers[self.selectedSticker];
//
//         push();
//         translate(mouseX, mouseY);
//         rotate((self.rotationDeg * Math.PI) / 180);
//         imageMode(CENTER);
//
//         const scaleFactor = self.sizeValue / g.width;
//         scale(scaleFactor);
//
//         image(g, 0, 0);
//         pop();
//
//         loadPixels();
//     };
//
//
//     // --- Sticker generation (no external PNGs needed) ---
//     function makeStarGraphic(sz) {
//         const g = createGraphics(sz, sz);
//         g.clear();
//         g.push();
//         g.translate(sz / 2, sz / 2);
//         g.noStroke();
//         g.fill(255, 204, 0);
//
//         const outer = sz * 0.45;
//         const inner = sz * 0.20;
//         const points = 5;
//
//         g.beginShape();
//         for (let i = 0; i < points * 2; i++) {
//         const angle = (Math.PI / points) * i - Math.PI / 2;
//         const r = (i % 2 === 0) ? outer : inner;
//         g.vertex(Math.cos(angle) * r, Math.sin(angle) * r);
//         }
//         g.endShape(CLOSE);
//
//         g.pop();
//         return g;
//     }
//
//     function makeHeartGraphic(sz) {
//         const g = createGraphics(sz, sz);
//         g.clear();
//         g.push();
//         g.translate(sz / 2, sz / 2);
//         g.noStroke();
//         g.fill(255, 80, 120);
//
//         const s = sz * 0.9;
//         g.beginShape();
//         for (let t = 0; t <= Math.PI * 2 + 0.01; t += 0.05) {
//         // classic heart curve (scaled)
//         const x = 16 * Math.pow(Math.sin(t), 3);
//         const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
//         g.vertex((x / 18) * s * 0.5, (y / 18) * s * 0.5);
//         }
//         g.endShape(CLOSE);
//
//         g.pop();
//         return g;
//     }
//
//     function makeSmileyGraphic(sz) {
//         const g = createGraphics(sz, sz);
//         g.clear();
//         g.push();
//         g.translate(sz / 2, sz / 2);
//
//         // face
//         g.noStroke();
//         g.fill(255, 220, 80);
//         g.ellipse(0, 0, sz * 0.9);
//
//         // eyes
//         g.fill(60);
//         g.ellipse(-sz * 0.15, -sz * 0.1, sz * 0.09);
//         g.ellipse(+sz * 0.15, -sz * 0.1, sz * 0.09);
//
//         // smile
//         g.noFill();
//         g.stroke(60);
//         g.strokeWeight(sz * 0.06);
//         g.arc(0, sz * 0.05, sz * 0.55, sz * 0.45, 0, Math.PI);
//
//         g.pop();
//         return g;
//     }
//
//     this._ensureStickers = function () {
//         if (this._stickers) return;
//         // generate at a “base” size; we can scale when drawing
//         const base = 256;
//         this._stickers = {
//         star: makeStarGraphic(base),
//         heart: makeHeartGraphic(base),
//         smiley: makeSmileyGraphic(base),
//         };
//     };
//
//     this.populateOptions = function () {
//         select(".options").html(`
//         <div style="display:flex; flex-direction:column; gap:8px;">
//             <div><b>Sticker Tool</b></div>
//
//             <label>Sticker:
//             <select id="stickerSelect">
//                 <option value="star">⭐ Star</option>
//                 <option value="heart">❤️ Heart</option>
//                 <option value="smiley">🙂 Smiley</option>
//             </select>
//             </label>
//
//             <label>Size:
//             <input id="stickerSize" type="range" min="20" max="240" value="${this.sizeValue}" />
//             <span id="stickerSizeLabel">${this.sizeValue}px</span>
//             </label>
//
//             <label>Rotation:
//             <input id="stickerRot" type="range" min="-180" max="180" value="${this.rotationDeg}" />
//             <span id="stickerRotLabel">${this.rotationDeg}°</span>
//             </label>
//
//             <div style="font-size: 12px; opacity: 0.85;">
//             Click to stamp. <b>Tip:</b> Undo with Ctrl+Z (if you add the history extension below).
//             </div>
//         </div>
//         `);
//
//         this._ensureStickers();
//
//         // wire UI
//         const sel = select("#stickerSelect");
//         sel.value(this.selectedSticker);
//         sel.changed(() => {
//         self.selectedSticker = sel.value();
//         });
//
//         const sizeSlider = select("#stickerSize");
//         sizeSlider.input(() => {
//         self.sizeValue = Number(sizeSlider.value());
//         select("#stickerSizeLabel").html(`${self.sizeValue}px`);
//         });
//
//         const rotSlider = select("#stickerRot");
//         rotSlider.input(() => {
//         self.rotationDeg = Number(rotSlider.value());
//         select("#stickerRotLabel").html(`${self.rotationDeg}°`);
//         });
//
//         // IMPORTANT: cache current canvas so preview doesn't “paint” permanently
//         loadPixels();
//     };
//
//     this.unselectTool = function () {
//         select(".options").html("");
//         // make sure canvas is restored to last stamped state
//         updatePixels();
//     };
//
//     // PREVIEW ONLY
//     this.draw = function () {
//         this._ensureStickers();
//
//         // Restore canvas to last committed pixels (removes preview trails)
//         updatePixels();
//
//         if (!insideCanvas()) return;
//
//         const g = this._stickers[this.selectedSticker];
//
//         push();
//         translate(mouseX, mouseY);
//         rotate(degToRad(this.rotationDeg));
//         imageMode(CENTER);
//
//         const scaleFactor = this.sizeValue / g.width;
//         scale(scaleFactor);
//
//         tint(255, 180);     // preview opacity
//         image(g, 0, 0);
//         noTint();
//
//         pop();
//     };
//
//     // COMMIT STICKER ON CLICK
//     this.mousePressed = function () {
//         if (!insideCanvas()) return;
//
//         // Make sure we stamp onto the committed canvas (not the preview)
//         updatePixels();
//
//         this._ensureStickers();
//         const g = this._stickers[this.selectedSticker];
//
//         push();
//         translate(mouseX, mouseY);
//         rotate(degToRad(this.rotationDeg));
//         imageMode(CENTER);
//
//         const scaleFactor = this.sizeValue / g.width;
//         scale(scaleFactor);
//
//         // stamp permanently (full opacity)
//         image(g, 0, 0);
//
//         pop();
//
//         // update baseline so preview uses the new canvas state
//         loadPixels();
//     };
//
// }
