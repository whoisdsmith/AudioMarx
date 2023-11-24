/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function convertToTitleCase(text, wordBoundaryChars, ignore) {
    // Add space and tab to wordBoundaryChars
    wordBoundaryChars.push(" ", "\t");
    let transformed = "";
    let word = "";
    // Iterate the characters and build each word
    for (const char of text) {
        if (wordBoundaryChars.includes(char)) {
            // push 'word' to 'transformed'
            transformed += convertWord(word, ignore);
            // push 'char' to 'transformed'
            transformed += char;
            // clear 'word'
            word = "";
        }
        else {
            // push 'char' to 'word'
            word += char;
        }
    }
    // Push 'word' one last time
    transformed += convertWord(word, ignore);
    return transformed;
}
function convertWord(word, ignore) {
    if (word.length > 0) {
        // convert to lowercase
        word = word.toLocaleLowerCase();
        // only capitalize if not in 'ignore' list
        if (!ignore.includes(word)) {
            word = word[0].toLocaleUpperCase() + word.slice(1);
        }
    }
    return word;
}

class TextTransformSettingsTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.addClass("text-transform-settings");
        new obsidian.Setting(containerEl)
            .setName("Title case exceptions")
            .setDesc("These words will be ignored when transforming text to title case. Each entry must be separated by a comma or space. Entries are case-insensitive.")
            .addText((text) => {
            // Set the value of the text box from the settings
            text.setValue(this.plugin.settings.titleCaseIgnore.join(", "));
            // Set up onChange handler
            text.onChange((value) => __awaiter(this, void 0, void 0, function* () {
                // Convert the string to an array, remove empty entries, ensure all lowercase
                this.plugin.settings.titleCaseIgnore = value.split(/[\s,]+/).map((word) => word.toLowerCase());
                // Save the updated list of words
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName("Word boundary characters")
            .setDesc("These characters will be used to determine word boundaries when transforming text. Spaces and tabs are always included.")
            .addText((text) => {
            // Set the value of the text box from the settings
            text.setValue(this.plugin.settings.wordBoundaryChars.join(""));
            // Set up onChange handler
            text.onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.wordBoundaryChars = [...value.trim()];
                yield this.plugin.saveSettings();
            }));
        });
    }
}

const DEFAULT_SETTINGS = {
    titleCaseIgnore: ["a", "an", "and", "as", "at", "but", "by", "for", "if", "in", "into", "nor", "of", "on", "or", "the", "to"],
    wordBoundaryChars: [],
    snakeUseBoundaryChars: false,
    kebabUseBoundaryChars: false,
};
class TextTransform extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            // Load settings
            yield this.loadSettings();
            // Set up settings tab
            this.addSettingTab(new TextTransformSettingsTab(this.app, this));
            // Add default commands for transforming cases
            this.addCommand({
                id: "uppercase",
                name: "Transform to UPPERCASE",
                editorCallback: (editor) => {
                    if (editor.hasFocus()) {
                        const selection = this.getSelection(editor);
                        this.replaceSelection(editor, selection.selectedText.toLocaleUpperCase(), selection.fromOrig, selection.toOrig, selection.fromSel, selection.toSel);
                    }
                },
            });
            this.addCommand({
                id: "lowercase",
                name: "Transform to lowercase",
                editorCallback: (editor) => {
                    if (editor.hasFocus()) {
                        const selection = this.getSelection(editor);
                        this.replaceSelection(editor, selection.selectedText.toLocaleLowerCase(), selection.fromOrig, selection.toOrig, selection.fromSel, selection.toSel);
                    }
                },
            });
            this.addCommand({
                id: "title-case",
                name: "Transform to Title Case",
                editorCallback: (editor) => {
                    if (editor.hasFocus()) {
                        const selection = this.getSelection(editor);
                        const newText = convertToTitleCase(selection.selectedText, this.settings.wordBoundaryChars, this.settings.titleCaseIgnore);
                        this.replaceSelection(editor, newText, selection.fromOrig, selection.toOrig, selection.fromSel, selection.toSel);
                    }
                },
            });
            this.addCommand({
                id: "snake",
                name: "Transform to snake_case",
                editorCallback: (editor) => {
                    if (editor.hasFocus()) {
                        const selection = this.getSelection(editor);
                        this.replaceSelection(editor, selection.selectedText.toLocaleLowerCase(), selection.fromOrig, selection.toOrig, selection.fromSel, selection.toSel);
                    }
                },
            });
            console.log("Text Transform plugin loaded");
        });
    }
    onunload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Text Transform plugin unloaded");
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    getSelection(editor) {
        // check if selection has a length > 0
        let selectedText = editor.getSelection();
        const fromOrig = editor.getCursor("from");
        const toOrig = editor.getCursor("to");
        // Clone original positions
        const fromSel = structuredClone(fromOrig);
        const toSel = structuredClone(toOrig);
        // if === 0, get the word the cursor is in
        if (selectedText.length === 0) {
            // Set up boundary chars (include space, tab)
            const chars = this.settings.wordBoundaryChars;
            chars.push(" ", "\t");
            // Get line text
            const lineText = editor.getLine(fromOrig.line);
            fromSel.ch = 0;
            toSel.ch = lineText.length;
            // Read backward from cursor pos to nearest boundary char
            for (let i = fromOrig.ch - 1; i >= 0; i--) {
                const char = lineText[i];
                if (chars.contains(char)) {
                    fromSel.ch = i + 1;
                    break;
                }
            }
            // Read forward to next boundary char
            for (let i = toOrig.ch; i < lineText.length; i++) {
                const char = lineText[i];
                if (chars.contains(char)) {
                    toSel.ch = i;
                    break;
                }
            }
            // Get selected text based on modified range
            selectedText = editor.getRange(fromSel, toSel);
        }
        return { selectedText, fromOrig, toOrig, fromSel, toSel };
    }
    replaceSelection(editor, newText, fromOrig, toOrig, fromSel, toSel) {
        // Save original highlighted length
        const originalLength = editor.getSelection().length;
        // Replace the text using the specified range of the selected 'from' and 'to'
        editor.replaceRange(newText, fromSel, toSel);
        // If text is highlighted, check if 'newText' is shorter than 'originalLength'
        if (originalLength > 0 && newText.length < originalLength) {
            // Move 'to' cursor back by the difference
            toOrig.ch -= originalLength - newText.length;
        }
        // Reset selection (this will take care of no selected text, too)
        editor.setSelection(fromOrig, toOrig);
    }
}

module.exports = TextTransform;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy90ZXh0LnRzIiwiLi4vc3JjL3NldHRpbmdzLnRzIiwiLi4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbIlBsdWdpblNldHRpbmdUYWIiLCJTZXR0aW5nIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdURBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUs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
