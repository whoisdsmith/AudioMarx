/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => EnhanceYouTubeLinksPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  includeExtraMetadata: false,
  includeChannelName: true,
  includeChannelURL: true,
  includeChannelThumbnail: true,
  combineChannelNameAndURL: false,
  enableRibbonIcon: true,
  enableCommandPalette: true
};
var lineCount = 1;
var indentLevel = 0;
var leadingString = "";
var EnhanceYouTubeLinksPlugin = class extends import_obsidian.Plugin {
  async onload() {
    var _a;
    await this.loadSettings();
    const editor = (_a = this.app.workspace.activeEditor) == null ? void 0 : _a.editor;
    if (editor) {
      if (this.settings.enableRibbonIcon) {
        this.addRibbonIcon("youtube", "Get YouTube data", (evt) => {
          this.processText(editor);
        });
      }
      if (this.settings.enableCommandPalette) {
        this.addCommand({
          id: "enhance-youtube-links-process-text",
          name: "Process Text",
          editorCallback: (editor2, view) => {
            this.processText(editor2);
          }
        });
      }
    }
    this.addSettingTab(new EnhanceYouTubeLinksSettingTab(this.app, this));
  }
  getBullet(text) {
    if (text.match("^[	]*[-]")) {
      leadingString = "- ";
    } else {
      leadingString = "";
    }
  }
  async processText(editor) {
    const urlBase = "https://www.youtube.com/oembed?url=";
    const textSelected = editor.getSelection();
    if (textSelected.length > 0) {
      const line = editor.getCursor().line;
      const lineSelected = editor.getLine(line);
      indentLevel = this.getIndentLevel(lineSelected);
      this.getBullet(lineSelected);
      if ((textSelected == null ? void 0 : textSelected.startsWith("https://www.youtube.com")) || (textSelected == null ? void 0 : textSelected.startsWith("www.youtube.com")) || (textSelected == null ? void 0 : textSelected.startsWith("youtube.com"))) {
        const urlFinal = urlBase + textSelected;
        const data = await this.getYouTubeData(urlFinal);
        if (data) {
          let urlTitle = this.buildTitle(data, textSelected);
          let result;
          result = lineSelected.replace(textSelected, urlTitle);
          if (this.settings.includeExtraMetadata) {
            result += this.buildMetadata(data);
          }
          editor.setLine(line, result);
          if (this.settings.includeExtraMetadata) {
            editor.setCursor(line + lineCount, 0);
          } else {
            editor.setCursor(line, lineSelected.indexOf(textSelected) + urlTitle.length);
          }
        }
      } else {
        new import_obsidian.Notice("Text selected does not match YouTube URL pattern");
      }
    } else {
      new import_obsidian.Notice("No text selected");
    }
  }
  async getYouTubeData(url) {
    try {
      const response = await (0, import_obsidian.requestUrl)(url);
      const data = await response.json;
      return data;
    } catch (error) {
      new import_obsidian.Notice("No result");
    }
  }
  resetVariables() {
    lineCount = 1;
    indentLevel = 0;
    leadingString = "";
  }
  getIndent() {
    if (indentLevel <= 0) {
      return "";
    } else {
      return "	".repeat(indentLevel);
    }
  }
  getIndentLevel(lineText) {
    const matchString = "^	*";
    const matches = lineText.match(matchString);
    if (matches && matches.length > 0) {
      return matches[0].length;
    } else {
      return 0;
    }
  }
  buildMetadata(data) {
    let authorName;
    let authorURL;
    let thumbnailURL;
    let result;
    result = "";
    if (this.settings.includeChannelName && this.settings.includeChannelURL) {
      result += "\n" + this.getIndent() + "	" + leadingString + "Channel:";
      authorName = data.author_name;
      authorURL = data.author_url;
      result += "\n" + this.getIndent() + "		" + leadingString + "[" + authorName + "](" + authorURL + ")";
      lineCount += 2;
    } else {
      if (this.settings.includeChannelName) {
        result += "\n" + this.getIndent() + "	" + leadingString + "Channel:";
        authorName = data.author_name;
        result += "\n" + this.getIndent() + "		" + leadingString + authorName;
        lineCount += 2;
      }
      if (this.settings.includeChannelURL) {
        result += "\n" + this.getIndent() + "	" + leadingString + "Channel URL:";
        authorURL = data.author_url;
        result += "\n" + this.getIndent() + "		" + leadingString + authorURL;
        lineCount += 2;
      }
    }
    if (this.settings.includeChannelThumbnail) {
      result += "\n" + this.getIndent() + "	" + leadingString + "Thumbnail:";
      thumbnailURL = data.thumbnail_url;
      result += "\n" + this.getIndent() + "		" + leadingString + "![](" + thumbnailURL + ")";
      lineCount += 2;
    }
    return result;
  }
  buildTitle(data, url) {
    let title;
    let titleURL;
    title = data.title;
    titleURL = "[" + title.replace("[", "").replace("]", "") + "](" + url + ")";
    return titleURL;
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var EnhanceYouTubeLinksSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Add extra metadata").setDesc("Channel name, channel URL, thumbnail").addToggle((cb) => {
      cb.setValue(this.plugin.settings.includeExtraMetadata);
      cb.onChange(async (value) => {
        this.plugin.settings.includeExtraMetadata = value;
        await this.plugin.saveSettings();
        this.display();
      });
    });
    if (this.plugin.settings.includeExtraMetadata) {
      new import_obsidian.Setting(containerEl).setName("Channel name").addToggle((cb) => {
        cb.setValue(this.plugin.settings.includeChannelName);
        cb.onChange(async (value) => {
          this.plugin.settings.includeChannelName = value;
          await this.plugin.saveSettings();
          this.display();
        });
      });
      new import_obsidian.Setting(containerEl).setName("Channel URL").addToggle((cb) => {
        cb.setValue(this.plugin.settings.includeChannelURL);
        cb.onChange(async (value) => {
          this.plugin.settings.includeChannelURL = value;
          await this.plugin.saveSettings();
          this.display();
        });
      });
      if (this.plugin.settings.includeChannelName && this.plugin.settings.includeChannelURL) {
        new import_obsidian.Setting(containerEl).setName("Combine channel name and channel URL").addToggle((cb) => {
          cb.setValue(this.plugin.settings.combineChannelNameAndURL);
          cb.onChange(async (value) => {
            this.plugin.settings.combineChannelNameAndURL = value;
            await this.plugin.saveSettings();
            this.display();
          });
        });
      }
      new import_obsidian.Setting(containerEl).setName("Thumbnail").addToggle((cb) => {
        cb.setValue(this.plugin.settings.includeChannelThumbnail);
        cb.onChange(async (value) => {
          this.plugin.settings.includeChannelThumbnail = value;
          await this.plugin.saveSettings();
        });
      });
    }
    new import_obsidian.Setting(containerEl).setName("Enable ribbon icon").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableRibbonIcon);
      cb.onChange(async (value) => {
        this.plugin.settings.enableRibbonIcon = value;
        await this.plugin.saveSettings();
      });
    }).setDesc("Requires reload for change to reflect");
    new import_obsidian.Setting(containerEl).setName("Enable command palette").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableCommandPalette);
      cb.onChange(async (value) => {
        this.plugin.settings.enableCommandPalette = value;
        await this.plugin.saveSettings();
      });
    }).setDesc("Requires reload for change to reflect");
  }
};