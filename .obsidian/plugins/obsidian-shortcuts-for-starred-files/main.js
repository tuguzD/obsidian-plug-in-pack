'use strict';

var obsidian = require('obsidian');

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var DEFAULT_SETTINGS = {
    changeStandardNoteMode: false,
    openInPreview: false,
    preferOpenTab: false,
};
var HotkeysForBookmarks = /** @class */ (function (_super) {
    __extends(HotkeysForBookmarks, _super);
    function HotkeysForBookmarks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HotkeysForBookmarks.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, i, _loop_2, this_2, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("loading " + this.manifest.name);
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new SettingsTab(this));
                        _loop_1 = function (i) {
                            this_1.addCommand({
                                id: "open-file-".concat(i),
                                name: "Open bookmark: ".concat(i),
                                callback: function () { return _this.open(i - 1, false); },
                            });
                        };
                        this_1 = this;
                        for (i = 1; i <= 9; i++) {
                            _loop_1(i);
                        }
                        _loop_2 = function (i) {
                            this_2.addCommand({
                                id: "open-file-in-new-pane-".concat(i),
                                name: "Open bookmark in a new pane: ".concat(i),
                                callback: function () { return _this.open(i - 1, true); },
                            });
                        };
                        this_2 = this;
                        for (i = 1; i <= 9; i++) {
                            _loop_2(i);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HotkeysForBookmarks.prototype.flattenBookmarks = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, items_1, item, exists, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        result = [];
                        _i = 0, items_1 = items;
                        _c.label = 1;
                    case 1:
                        if (!(_i < items_1.length)) return [3 /*break*/, 7];
                        item = items_1[_i];
                        if (result.length == 9) {
                            return [3 /*break*/, 7];
                        }
                        if (!(item.type == "file")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.app.vault.adapter.exists(item.path)];
                    case 2:
                        exists = _c.sent();
                        if (exists)
                            result.push(item);
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(item.type == "group")) return [3 /*break*/, 5];
                        _b = (_a = result).concat;
                        return [4 /*yield*/, this.flattenBookmarks(item.items)];
                    case 4:
                        result = _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 6];
                    case 5:
                        result.push(item);
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, result];
                }
            });
        });
    };
    HotkeysForBookmarks.prototype.open = function (index, inNewPane) {
        return __awaiter(this, void 0, void 0, function () {
            var bookmarksPlugin, rawItems, items, foundLeaf_1, view, viewState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookmarksPlugin = this.app.internalPlugins.getEnabledPluginById("bookmarks");
                        rawItems = bookmarksPlugin.items;
                        return [4 /*yield*/, this.flattenBookmarks(rawItems)];
                    case 1:
                        items = _a.sent();
                        console.log(items);
                        if (!items[index]) return [3 /*break*/, 3];
                        if (items[index].type == "file" && this.settings.preferOpenTab) {
                            foundLeaf_1 = null;
                            this.app.workspace.iterateAllLeaves(function (leaf) {
                                var _a;
                                if (((_a = leaf.view.file) === null || _a === void 0 ? void 0 : _a.path) == items[index].path) {
                                    foundLeaf_1 = leaf;
                                }
                            });
                            if (foundLeaf_1) {
                                this.app.workspace.setActiveLeaf(foundLeaf_1);
                            }
                        }
                        return [4 /*yield*/, bookmarksPlugin.openBookmark(items[index], inNewPane)];
                    case 2:
                        _a.sent();
                        view = this.app.workspace.getActiveViewOfType(obsidian.FileView);
                        if (view) {
                            viewState = view.leaf.getViewState();
                            viewState.state.mode = this.settings.changeStandardNoteMode
                                ? this.settings.openInPreview
                                    ? "preview"
                                    : "source"
                                : viewState.state.mode;
                            view.leaf.setViewState(viewState);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        new obsidian.Notice("There is no bookmark at index ".concat(index + 1));
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HotkeysForBookmarks.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    HotkeysForBookmarks.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HotkeysForBookmarks.prototype.onunload = function () {
        console.log("unloading " + this.manifest.name);
    };
    return HotkeysForBookmarks;
}(obsidian.Plugin));
var SettingsTab = /** @class */ (function (_super) {
    __extends(SettingsTab, _super);
    function SettingsTab(plugin) {
        var _this = _super.call(this, plugin.app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: this.plugin.manifest.name });
        new obsidian.Setting(containerEl)
            .setName("Change standard note mode ('Editor' or 'Reading')")
            .setDesc("Turned off it will use default Obsidian settings.")
            .addToggle(function (cb) {
            return cb
                .onChange(function (value) {
                _this.plugin.settings.changeStandardNoteMode = value;
                _this.plugin.saveSettings();
            })
                .setValue(_this.plugin.settings.changeStandardNoteMode);
        });
        new obsidian.Setting(containerEl)
            .setName("Open in Reading mode")
            .setDesc("This setting only takes affect, if the above setting is turned on")
            .addToggle(function (cb) {
            return cb
                .onChange(function (value) {
                _this.plugin.settings.openInPreview = value;
                _this.plugin.saveSettings();
            })
                .setValue(_this.plugin.settings.openInPreview);
        });
        new obsidian.Setting(containerEl)
            .setName("Open bookmark in the tab it is already opened in (if possible)")
            .addToggle(function (cb) {
            return cb
                .onChange(function (value) {
                _this.plugin.settings.preferOpenTab = value;
                _this.plugin.saveSettings();
            })
                .setValue(_this.plugin.settings.preferOpenTab);
        });
    };
    return SettingsTab;
}(obsidian.PluginSettingTab));

module.exports = HotkeysForBookmarks;


/* nosourcemap */