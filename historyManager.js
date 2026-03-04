/* ALL THE CODE IN THIS FILE IS WRITTEN WITHOUT ANY HELP */

/********** History Manager **********/

class HistoryManager {
    #undoStack = [];
    #redoStack = [];
    #maxStates;

    constructor(maxStates = 25) {
        this.#maxStates = maxStates;
    }

    snapshot() {
        this.#undoStack.push(get());
        if (this.#undoStack.length > this.#maxStates) this.#undoStack.shift();
        this.#redoStack = [];
    }

    undo() {
        if (!this.canUndo) return;
        this.#redoStack.push(get());
        this.#restore(this.#undoStack.pop())
    }

    redo() {
        if (!this.canRedo) return;
        this.#undoStack.push(get());
        this.#restore(this.#redoStack.pop())
    }

    #restore(img) {
        background(255);
        image(img, 0, 0);
        loadPixels();
    }

    get canUndo() { return this.#undoStack.length > 0 };
    get canRedo() { return this.#redoStack.length > 0 };
    get undoCount() { return this.#undoStack.length };
    get redoCount() { return this.#redoStack.length };
}
