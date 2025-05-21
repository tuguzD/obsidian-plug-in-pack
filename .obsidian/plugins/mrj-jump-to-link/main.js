'use strict';

var obsidian = require('obsidian');
var state = require('@codemirror/state');
var view = require('@codemirror/view');

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class Settings {
    constructor() {
        // Defaults as in Vimium extension for browsers
        this.letters = 'sadfjklewcmpgh';
        this.jumpToAnywhereRegex = '\\b\\w{3,}\\b';
        this.lightspeedCaseSensitive = false;
        this.jumpToLinkIfOneLinkOnly = true;
        this.lightspeedJumpToStartOfWord = true;
    }
}

class MarkWidget extends view.WidgetType {
    constructor(mark, type, matchedEventKey) {
        super();
        this.mark = mark;
        this.type = type;
        this.matchedEventKey = matchedEventKey;
    }
    eq(other) {
        return other.mark === this.mark && other.matchedEventKey == this.matchedEventKey;
    }
    toDOM() {
        const mark = activeDocument.createElement("span");
        mark.innerText = this.mark;
        const wrapper = activeDocument.createElement("div");
        wrapper.style.display = "inline-block";
        wrapper.style.position = "absolute";
        wrapper.classList.add('jl');
        wrapper.classList.add('jl-' + this.type);
        wrapper.classList.add('popover');
        if (this.matchedEventKey && this.mark.toUpperCase().startsWith(this.matchedEventKey.toUpperCase())) {
            wrapper.classList.add('matched');
        }
        wrapper.append(mark);
        return wrapper;
    }
    ignoreEvent() {
        return false;
    }
}

class MarkPlugin {
    constructor(_view) {
        this.links = [];
        this.matchedEventKey = undefined;
        this.links = [];
        this.matchedEventKey = undefined;
        this.decorations = view.Decoration.none;
    }
    setLinks(links) {
        this.links = links;
        this.matchedEventKey = undefined;
    }
    clean() {
        this.links = [];
        this.matchedEventKey = undefined;
    }
    filterWithEventKey(eventKey) {
        if (eventKey.length != 1)
            return;
        this.links = this.links.filter(v => {
            return v.letter.length == 2 && v.letter[0].toUpperCase() == eventKey.toUpperCase();
        });
        this.matchedEventKey = eventKey;
    }
    get visible() {
        return this.links.length > 0;
    }
    update(_update) {
        const widgets = this.links.map((x) => view.Decoration.widget({
            widget: new MarkWidget(x.letter, x.type, this.matchedEventKey),
            side: 1,
        }).range(x.index));
        this.decorations = view.Decoration.set(widgets);
    }
}

/**
 * Get only visible content
 * @param cmEditor
 * @returns Letter offset and visible content as a string
 */
function getVisibleLineText(cmEditor) {
    const scrollInfo = cmEditor.getScrollInfo();
    const { line: from } = cmEditor.coordsChar({ left: 0, top: 0 }, 'page');
    const { line: to } = cmEditor.coordsChar({ left: scrollInfo.left, top: scrollInfo.top + scrollInfo.height });
    const indOffset = cmEditor.indexFromPos({ ch: 0, line: from });
    const strs = cmEditor.getRange({ ch: 0, line: from }, { ch: 0, line: to + 1 });
    return { indOffset, strs };
}
/**
 *
 * @param alphabet - Letters which used to produce hints
 * @param numLinkHints - Count of needed links
 */
function getLinkHintLetters(alphabet, numLinkHints) {
    const alphabetUppercase = alphabet.toUpperCase();
    let prefixCount = Math.ceil((numLinkHints - alphabetUppercase.length) / (alphabetUppercase.length - 1));
    // ensure 0 <= prefixCount <= alphabet.length
    prefixCount = Math.max(prefixCount, 0);
    prefixCount = Math.min(prefixCount, alphabetUppercase.length);
    const prefixes = ['', ...Array.from(alphabetUppercase.slice(0, prefixCount))];
    const linkHintLetters = [];
    for (let i = 0; i < prefixes.length; i++) {
        const prefix = prefixes[i];
        for (let j = 0; j < alphabetUppercase.length; j++) {
            if (linkHintLetters.length < numLinkHints) {
                const letter = alphabetUppercase[j];
                if (prefix === '') {
                    if (!prefixes.contains(letter)) {
                        linkHintLetters.push(letter);
                    }
                }
                else {
                    linkHintLetters.push(prefix + letter);
                }
            }
            else {
                break;
            }
        }
    }
    return linkHintLetters;
}
function getMDHintLinks(content, offset, letters) {
    var _a;
    // expecting either [[Link]] or [[Link|Title]]
    const regExInternal = /\[\[(.+?)(\|.+?)?]]/g;
    // expecting [Title](../example.md)
    const regExMdInternal = /\[[^\[\]]+?\]\(((\.\.|\w|\d).+?)\)/g;
    // expecting [Title](file://link), [Title](https://link) or any other [Jira-123](jira://bla-bla) link
    const regExExternal = /\[[^\[\]]+?\]\((.+?:\/\/.+?)\)/g;
    // expecting http://hogehoge or https://hogehoge
    const regExUrl = /( |\n|^)(https?:\/\/[^ \n]+)/g;
    let indexes = new Set();
    let linksWithIndex = [];
    let regExResult;
    const addLinkToArray = (link) => {
        if (indexes.has(link.index))
            return;
        indexes.add(link.index);
        linksWithIndex.push(link);
    };
    while (regExResult = regExInternal.exec(content)) {
        const linkText = (_a = regExResult[1]) === null || _a === void 0 ? void 0 : _a.trim();
        addLinkToArray({ index: regExResult.index + offset, type: 'internal', linkText });
    }
    // External Link above internal, to prefer type external over interal in case of a dupe
    while (regExResult = regExExternal.exec(content)) {
        const linkText = regExResult[1];
        addLinkToArray({ index: regExResult.index + offset, type: 'external', linkText });
    }
    while (regExResult = regExMdInternal.exec(content)) {
        const linkText = regExResult[1];
        addLinkToArray({ index: regExResult.index + offset, type: 'internal', linkText });
    }
    while (regExResult = regExUrl.exec(content)) {
        const linkText = regExResult[2];
        addLinkToArray({ index: regExResult.index + offset + 1, type: 'external', linkText });
    }
    const linkHintLetters = getLinkHintLetters(letters, linksWithIndex.length);
    const linksWithLetter = [];
    linksWithIndex
        .sort((x, y) => x.index - y.index)
        .forEach((linkHint, i) => {
        linksWithLetter.push(Object.assign({ letter: linkHintLetters[i] }, linkHint));
    });
    return linksWithLetter.filter(link => link.letter);
}
function createWidgetElement(content, type) {
    const linkHintEl = activeDocument.createElement('div');
    linkHintEl.classList.add('jl');
    linkHintEl.classList.add('jl-' + type);
    linkHintEl.classList.add('popover');
    linkHintEl.innerHTML = content;
    return linkHintEl;
}
function displaySourcePopovers(cmEditor, linkKeyMap) {
    const drawWidget = (cmEditor, linkHint) => {
        const pos = cmEditor.posFromIndex(linkHint.index);
        // the fourth parameter is undocumented. it specifies where the widget should be place
        return cmEditor.addWidget(pos, createWidgetElement(linkHint.letter, linkHint.type), false, 'over');
    };
    linkKeyMap.forEach(x => drawWidget(cmEditor, x));
}

class CM6LinkProcessor {
    constructor(editor, alphabet) {
        this.getSourceLinkHints = () => {
            const { letters } = this;
            const { index, content } = this.getVisibleLines();
            return getMDHintLinks(content, index, letters);
        };
        this.cmEditor = editor;
        this.letters = alphabet;
    }
    init() {
        return this.getSourceLinkHints();
    }
    getVisibleLines() {
        var _a, _b, _c;
        const { cmEditor } = this;
        let { from, to } = cmEditor.viewport;
        // For CM6 get real visible lines top
        // @ts-ignore
        if ((_b = (_a = cmEditor.viewState) === null || _a === void 0 ? void 0 : _a.pixelViewport) === null || _b === void 0 ? void 0 : _b.top) {
            // @ts-ignore
            const pixelOffsetTop = cmEditor.viewState.pixelViewport.top;
            // @ts-ignore
            const lines = cmEditor.viewState.viewportLines;
            // @ts-ignore
            from = (_c = lines.filter(line => line.top > pixelOffsetTop)[0]) === null || _c === void 0 ? void 0 : _c.from;
        }
        const content = cmEditor.state.sliceDoc(from, to);
        return { index: from, content };
    }
}

function extractRegexpBlocks(content, offset, regexp, letters, caseSensitive) {
    const regExUrl = caseSensitive ? new RegExp(regexp, 'g') : new RegExp(regexp, 'ig');
    let linksWithIndex = [];
    let regExResult;
    while ((regExResult = regExUrl.exec(content))) {
        const linkText = regExResult[1];
        linksWithIndex.push({
            index: regExResult.index + offset,
            type: "regex",
            linkText,
        });
    }
    const linkHintLetters = getLinkHintLetters(letters, linksWithIndex.length);
    const linksWithLetter = [];
    linksWithIndex
        .sort((x, y) => x.index - y.index)
        .forEach((linkHint, i) => {
        linksWithLetter.push(Object.assign({ letter: linkHintLetters[i] }, linkHint));
    });
    return linksWithLetter.filter(link => link.letter);
}

class CM6RegexProcessor extends CM6LinkProcessor {
    constructor(editor, alphabet, regexp, caseSensitive) {
        super(editor, alphabet);
        this.regexp = regexp;
        this.caseSensitive = caseSensitive;
    }
    init() {
        const { letters, regexp } = this;
        const { index, content } = this.getVisibleLines();
        return extractRegexpBlocks(content, index, regexp, letters, this.caseSensitive);
    }
}

class LegacyRegexpProcessor {
    constructor(cmEditor, regexp, alphabet, caseSensitive) {
        this.cmEditor = cmEditor;
        this.regexp = regexp;
        this.letters = alphabet;
        this.caseSensitive = caseSensitive;
    }
    init() {
        const [content, offset] = this.getVisibleContent();
        const links = this.getLinks(content, offset);
        this.display(links);
        return links;
    }
    getVisibleContent() {
        const { cmEditor } = this;
        const { indOffset, strs } = getVisibleLineText(cmEditor);
        return [strs, indOffset];
    }
    getLinks(content, offset) {
        const { regexp, letters } = this;
        return extractRegexpBlocks(content, offset, regexp, letters, this.caseSensitive);
    }
    display(links) {
        const { cmEditor } = this;
        displaySourcePopovers(cmEditor, links);
    }
}

class LegacySourceLinkProcessor {
    constructor(editor, alphabet) {
        this.getSourceLinkHints = (cmEditor) => {
            const { letters } = this;
            const { indOffset, strs } = getVisibleLineText(cmEditor);
            return getMDHintLinks(strs, indOffset, letters);
        };
        this.cmEditor = editor;
        this.letters = alphabet;
    }
    init() {
        const { cmEditor } = this;
        const linkHints = this.getSourceLinkHints(cmEditor);
        displaySourcePopovers(cmEditor, linkHints);
        return linkHints;
    }
}

function getPreviewLinkHints(previewViewEl, letters) {
    const anchorEls = previewViewEl.querySelectorAll('a, .metadata-link-inner');
    const embedEls = previewViewEl.querySelectorAll('.internal-embed');
    const linkHints = [];
    anchorEls.forEach((anchorEl, _i) => {
        var _a;
        if (checkIsPreviewElOnScreen(previewViewEl, anchorEl)) {
            return;
        }
        const linkType = anchorEl.classList.contains('internal-link')
            ? 'internal'
            : 'external';
        const linkText = linkType === 'internal'
            ? (_a = anchorEl.dataset['href']) !== null && _a !== void 0 ? _a : anchorEl.href
            : anchorEl.href;
        let offsetParent = anchorEl.offsetParent;
        let top = anchorEl.offsetTop;
        let left = anchorEl.offsetLeft;
        while (offsetParent) {
            if (offsetParent == previewViewEl) {
                offsetParent = undefined;
            }
            else {
                top += offsetParent.offsetTop;
                left += offsetParent.offsetLeft;
                offsetParent = offsetParent.offsetParent;
            }
        }
        linkHints.push({
            linkElement: anchorEl,
            letter: '',
            linkText: linkText,
            type: linkType,
            top: top,
            left: left,
        });
    });
    embedEls.forEach((embedEl, _i) => {
        const linkText = embedEl.getAttribute('src');
        const linkEl = embedEl.querySelector('.markdown-embed-link');
        if (linkText && linkEl) {
            if (checkIsPreviewElOnScreen(previewViewEl, linkEl)) {
                return;
            }
            let offsetParent = linkEl.offsetParent;
            let top = linkEl.offsetTop;
            let left = linkEl.offsetLeft;
            while (offsetParent) {
                if (offsetParent == previewViewEl) {
                    offsetParent = undefined;
                }
                else {
                    top += offsetParent.offsetTop;
                    left += offsetParent.offsetLeft;
                    offsetParent = offsetParent.offsetParent;
                }
            }
            linkHints.push({
                linkElement: linkEl,
                letter: '',
                linkText: linkText,
                type: 'internal',
                top: top,
                left: left,
            });
        }
    });
    const sortedLinkHints = linkHints.sort((a, b) => {
        if (a.top > b.top) {
            return 1;
        }
        else if (a.top === b.top) {
            if (a.left > b.left) {
                return 1;
            }
            else if (a.left === b.left) {
                return 0;
            }
            else {
                return -1;
            }
        }
        else {
            return -1;
        }
    });
    const linkHintLetters = getLinkHintLetters(letters, sortedLinkHints.length);
    sortedLinkHints.forEach((linkHint, i) => {
        linkHint.letter = linkHintLetters[i];
    });
    return sortedLinkHints;
}
function checkIsPreviewElOnScreen(parent, el) {
    return el.offsetTop < parent.scrollTop || el.offsetTop > parent.scrollTop + parent.offsetHeight;
}
function displayPreviewPopovers(linkHints) {
    const linkHintHtmlElements = [];
    for (let linkHint of linkHints) {
        const popoverElement = linkHint.linkElement.createEl('span');
        linkHint.linkElement.style.position = 'relative';
        popoverElement.style.top = '0px';
        popoverElement.style.left = '0px';
        popoverElement.textContent = linkHint.letter;
        popoverElement.classList.add('jl');
        popoverElement.classList.add('jl-' + linkHint.type);
        popoverElement.classList.add('popover');
        linkHintHtmlElements.push(popoverElement);
    }
    return linkHintHtmlElements;
}

class PreviewLinkProcessor {
    constructor(view, alphabet) {
        this.view = view;
        this.alphabet = alphabet;
    }
    init() {
        const { view, alphabet } = this;
        const links = getPreviewLinkHints(view, alphabet);
        displayPreviewPopovers(links);
        return links;
    }
}

class LivePreviewLinkProcessor {
    constructor(view, editor, alphabet) {
        this.getSourceLinkHints = () => {
            const { alphabet } = this;
            const { index, content } = this.getVisibleLines();
            return getMDHintLinks(content, index, alphabet);
        };
        this.view = view;
        this.cmEditor = editor;
        this.alphabet = alphabet;
    }
    init() {
        const { view, alphabet } = this;
        const links = getPreviewLinkHints(view, alphabet);
        const sourceLinks = this.getSourceLinkHints();
        const linkHintLetters = getLinkHintLetters(alphabet, links.length + sourceLinks.length);
        const linksRemapped = links.map((link, idx) => (Object.assign(Object.assign({}, link), { letter: linkHintLetters[idx] }))).filter(link => link.letter);
        const sourceLinksRemapped = sourceLinks.map((link, idx) => (Object.assign(Object.assign({}, link), { letter: linkHintLetters[idx + links.length] }))).filter(link => link.letter);
        const linkHintHtmlElements = displayPreviewPopovers(linksRemapped);
        return [linksRemapped, sourceLinksRemapped, linkHintHtmlElements];
    }
    getVisibleLines() {
        var _a, _b, _c;
        const { cmEditor } = this;
        let { from, to } = cmEditor.viewport;
        // For CM6 get real visible lines top
        // @ts-ignore
        if ((_b = (_a = cmEditor.viewState) === null || _a === void 0 ? void 0 : _a.pixelViewport) === null || _b === void 0 ? void 0 : _b.top) {
            // @ts-ignore
            const pixelOffsetTop = cmEditor.viewState.pixelViewport.top;
            // @ts-ignore
            const lines = cmEditor.viewState.viewportLines;
            // @ts-ignore
            from = (_c = lines.filter(line => line.top > pixelOffsetTop)[0]) === null || _c === void 0 ? void 0 : _c.from;
        }
        const content = cmEditor.state.sliceDoc(from, to);
        return { index: from, content };
    }
}

var VIEW_MODE;
(function (VIEW_MODE) {
    VIEW_MODE[VIEW_MODE["SOURCE"] = 0] = "SOURCE";
    VIEW_MODE[VIEW_MODE["PREVIEW"] = 1] = "PREVIEW";
    VIEW_MODE[VIEW_MODE["LEGACY"] = 2] = "LEGACY";
    VIEW_MODE[VIEW_MODE["LIVE_PREVIEW"] = 3] = "LIVE_PREVIEW";
})(VIEW_MODE || (VIEW_MODE = {}));
class JumpToLink extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.isLinkHintActive = false;
        this.prefixInfo = undefined;
        this.currentCursor = {};
        this.cursorBeforeJump = {};
        this.handleJumpToLink = () => {
            const { settings: { letters } } = this;
            const { mode, currentView } = this;
            switch (mode) {
                case VIEW_MODE.LEGACY: {
                    const cmEditor = this.cmEditor;
                    const sourceLinkHints = new LegacySourceLinkProcessor(cmEditor, letters).init();
                    this.handleActions(sourceLinkHints);
                    break;
                }
                case VIEW_MODE.LIVE_PREVIEW: {
                    const cm6Editor = this.cmEditor;
                    const previewViewEl = currentView.currentMode.editor.containerEl;
                    const [previewLinkHints, sourceLinkHints, linkHintHtmlElements] = new LivePreviewLinkProcessor(previewViewEl, cm6Editor, letters).init();
                    cm6Editor.plugin(this.markViewPlugin).setLinks(sourceLinkHints);
                    this.app.workspace.updateOptions();
                    this.handleActions([...previewLinkHints, ...sourceLinkHints], linkHintHtmlElements);
                    break;
                }
                case VIEW_MODE.PREVIEW: {
                    const previewViewEl = currentView.previewMode.containerEl.querySelector('div.markdown-preview-view');
                    const previewLinkHints = new PreviewLinkProcessor(previewViewEl, letters).init();
                    this.handleActions(previewLinkHints);
                    break;
                }
                case VIEW_MODE.SOURCE: {
                    const cm6Editor = this.cmEditor;
                    const livePreviewLinks = new CM6LinkProcessor(cm6Editor, letters).init();
                    cm6Editor.plugin(this.markViewPlugin).setLinks(livePreviewLinks);
                    this.app.workspace.updateOptions();
                    this.handleActions(livePreviewLinks);
                    break;
                }
            }
        };
        /*
        *  caseSensitive is only for lightspeed and shall not affect jumpToAnywhere, so it is true
        *  by default
        */
        this.handleJumpToRegex = (stringToSearch, caseSensitive = true) => {
            const { settings: { letters, jumpToAnywhereRegex } } = this;
            const whatToLookAt = stringToSearch || jumpToAnywhereRegex;
            const { mode } = this;
            switch (mode) {
                case VIEW_MODE.SOURCE:
                    this.handleMarkdownRegex(letters, whatToLookAt, caseSensitive);
                    break;
                case VIEW_MODE.LIVE_PREVIEW:
                    this.handleMarkdownRegex(letters, whatToLookAt, caseSensitive);
                    break;
                case VIEW_MODE.PREVIEW:
                    break;
                case VIEW_MODE.LEGACY:
                    const cmEditor = this.cmEditor;
                    const links = new LegacyRegexpProcessor(cmEditor, whatToLookAt, letters, caseSensitive).init();
                    this.handleActions(links);
                    break;
            }
        };
        this.handleMarkdownRegex = (letters, whatToLookAt, caseSensitive) => {
            const cm6Editor = this.cmEditor;
            const livePreviewLinks = new CM6RegexProcessor(cm6Editor, letters, whatToLookAt, caseSensitive).init();
            cm6Editor.plugin(this.markViewPlugin).setLinks(livePreviewLinks);
            this.app.workspace.updateOptions();
            this.handleActions(livePreviewLinks);
        };
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = (yield this.loadData()) || new Settings();
            this.addSettingTab(new SettingTab(this.app, this));
            const markViewPlugin = this.markViewPlugin = view.ViewPlugin.fromClass(MarkPlugin, {
                decorations: v => v.decorations
            });
            this.registerEditorExtension([markViewPlugin]);
            this.watchForSelectionChange();
            this.addCommand({
                id: 'activate-jump-to-link',
                name: 'Jump to Link',
                callback: this.action.bind(this, 'link'),
                hotkeys: [{ modifiers: ['Ctrl'], key: `'` }],
            });
            this.addCommand({
                id: "activate-jump-to-anywhere",
                name: "Jump to Anywhere Regex",
                callback: this.action.bind(this, 'regexp'),
                hotkeys: [{ modifiers: ["Ctrl"], key: ";" }],
            });
            this.addCommand({
                id: "activate-lightspeed-jump",
                name: "Lightspeed Jump",
                callback: this.action.bind(this, 'lightspeed'),
                hotkeys: [],
            });
        });
    }
    onunload() {
        console.log('unloading jump to links plugin');
    }
    action(type) {
        if (this.isLinkHintActive) {
            return;
        }
        const activeViewOfType = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        const currentView = this.currentView = activeViewOfType.leaf.view;
        const mode = this.mode = this.getMode(this.currentView);
        this.contentElement = activeViewOfType.contentEl;
        this.cursorBeforeJump = this.currentCursor;
        switch (mode) {
            case VIEW_MODE.LEGACY:
                this.cmEditor = currentView.sourceMode.cmEditor;
                break;
            case VIEW_MODE.LIVE_PREVIEW:
            case VIEW_MODE.SOURCE:
                this.cmEditor = currentView.editor.cm;
                break;
        }
        switch (type) {
            case "link":
                this.handleJumpToLink();
                return;
            case "regexp":
                this.handleJumpToRegex();
                return;
            case "lightspeed":
                this.handleLightspeedJump();
                return;
        }
    }
    getMode(currentView) {
        // @ts-ignore
        const isLegacy = this.app.vault.getConfig("legacyEditor");
        if (currentView.getState().mode === 'preview') {
            return VIEW_MODE.PREVIEW;
        }
        else if (isLegacy) {
            return VIEW_MODE.LEGACY;
        }
        else if (currentView.getState().mode === 'source') {
            const isLivePreview = currentView.editor.cm.state.field(obsidian.editorLivePreviewField);
            if (isLivePreview)
                return VIEW_MODE.LIVE_PREVIEW;
            return VIEW_MODE.SOURCE;
        }
    }
    // adapted from: https://github.com/mrjackphil/obsidian-jump-to-link/issues/35#issuecomment-1085905668
    handleLightspeedJump() {
        // get all text color
        const { contentEl } = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (!contentEl) {
            return;
        }
        // this element doesn't exist in cm5/has a different class, so lightspeed will not work in cm5
        const contentContainerColor = contentEl.getElementsByClassName("cm-contentContainer");
        const originalColor = contentContainerColor[0].style.color;
        // change all text color to gray
        contentContainerColor[0].style.color = 'var(--jump-to-link-lightspeed-color)';
        const keyArray = [];
        const grabKey = (event) => {
            event.preventDefault();
            // handle Escape to reject the mode
            if (event.key === 'Escape') {
                contentEl.removeEventListener("keydown", grabKey, { capture: true });
                contentContainerColor[0].style.color = originalColor;
            }
            // test if keypress is capitalized
            if (/^[\w\S\W]$/i.test(event.key)) {
                const isCapital = event.shiftKey;
                if (isCapital) {
                    // capture uppercase
                    keyArray.push((event.key).toUpperCase());
                }
                else {
                    // capture lowercase
                    keyArray.push(event.key);
                }
            }
            // stop when length of array is equal to 2
            if (keyArray.length === 2) {
                const stringToSearch = this.settings.lightspeedJumpToStartOfWord ? "\\b" + keyArray.join("") : keyArray.join("");
                this.handleJumpToRegex(stringToSearch, this.settings.lightspeedCaseSensitive);
                // removing eventListener after proceeded
                contentEl.removeEventListener("keydown", grabKey, { capture: true });
                contentContainerColor[0].style.color = originalColor;
            }
        };
        contentEl.addEventListener('keydown', grabKey, { capture: true });
    }
    handleHotkey(heldShiftKey, link) {
        if (link.linkText === undefined && link.linkElement) {
            link.linkElement.click();
        }
        else if (link.type === 'internal') {
            const file = this.app.workspace.getActiveFile();
            if (file) {
                // the second argument is for the link resolution
                this.app.workspace.openLinkText(decodeURI(link.linkText), file.path, heldShiftKey, { active: true });
            }
        }
        else if (link.type === 'external') {
            window.open(link.linkText);
        }
        else {
            const editor = this.cmEditor;
            if (editor instanceof view.EditorView) {
                const index = link.index;
                const { vimMode, anchor } = this.cursorBeforeJump;
                const useSelection = heldShiftKey || (vimMode === 'visual' || vimMode === 'visual block');
                if (useSelection && anchor !== undefined) {
                    editor.dispatch({ selection: state.EditorSelection.range(anchor, index) });
                }
                else {
                    editor.dispatch({ selection: state.EditorSelection.cursor(index) });
                }
            }
            else {
                editor.setCursor(editor.posFromIndex(link.index));
            }
        }
    }
    removePopovers(linkHintHtmlElements = []) {
        const currentView = this.contentElement;
        currentView.removeEventListener('click', () => this.removePopovers(linkHintHtmlElements));
        linkHintHtmlElements === null || linkHintHtmlElements === void 0 ? void 0 : linkHintHtmlElements.forEach(e => e.remove());
        currentView.querySelectorAll('.jl.popover').forEach(e => e.remove());
        this.prefixInfo = undefined;
        if (this.mode == VIEW_MODE.SOURCE || this.mode == VIEW_MODE.LIVE_PREVIEW) {
            this.cmEditor.plugin(this.markViewPlugin).clean();
        }
        this.app.workspace.updateOptions();
        this.isLinkHintActive = false;
    }
    removePopoversWithoutPrefixEventKey(eventKey, linkHintHtmlElements = []) {
        const currentView = this.contentElement;
        linkHintHtmlElements === null || linkHintHtmlElements === void 0 ? void 0 : linkHintHtmlElements.forEach(e => {
            if (e.innerHTML.length == 2 && e.innerHTML[0] == eventKey) {
                e.classList.add("matched");
                return;
            }
            e.remove();
        });
        currentView.querySelectorAll('.jl.popover').forEach(e => {
            if (e.innerHTML.length == 2 && e.innerHTML[0] == eventKey) {
                e.classList.add("matched");
                return;
            }
            e.remove();
        });
        if (this.mode == VIEW_MODE.SOURCE || this.mode == VIEW_MODE.LIVE_PREVIEW) {
            this.cmEditor.plugin(this.markViewPlugin).filterWithEventKey(eventKey);
        }
        this.app.workspace.updateOptions();
    }
    handleActions(linkHints, linkHintHtmlElements) {
        var _a;
        const contentElement = this.contentElement;
        if (!linkHints.length) {
            return;
        }
        const linkHintMap = {};
        linkHints.forEach(x => linkHintMap[x.letter] = x);
        const handleKeyDown = (event) => {
            var _a;
            if (['Shift', 'Control', 'CapsLock', 'ScrollLock', 'GroupNext', 'Meta'].includes(event.key)) {
                return;
            }
            const eventKey = event.key.toUpperCase();
            const prefixes = new Set(Object.keys(linkHintMap).filter(x => x.length > 1).map(x => x[0]));
            let linkHint;
            if (this.prefixInfo) {
                linkHint = linkHintMap[this.prefixInfo.prefix + eventKey];
            }
            else {
                linkHint = linkHintMap[eventKey];
                if (!linkHint && prefixes && prefixes.has(eventKey)) {
                    this.prefixInfo = { prefix: eventKey, shiftKey: event.shiftKey };
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    this.removePopoversWithoutPrefixEventKey(eventKey, linkHintHtmlElements);
                    return;
                }
            }
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            const heldShiftKey = ((_a = this.prefixInfo) === null || _a === void 0 ? void 0 : _a.shiftKey) || event.shiftKey;
            linkHint && this.handleHotkey(heldShiftKey, linkHint);
            this.removePopovers(linkHintHtmlElements);
            contentElement.removeEventListener('keydown', handleKeyDown, { capture: true });
        };
        if (linkHints.length === 1 && this.settings.jumpToLinkIfOneLinkOnly) {
            const heldShiftKey = (_a = this.prefixInfo) === null || _a === void 0 ? void 0 : _a.shiftKey;
            this.handleHotkey(heldShiftKey, linkHints[0]);
            this.removePopovers(linkHintHtmlElements);
            return;
        }
        contentElement.addEventListener('click', () => this.removePopovers(linkHintHtmlElements));
        contentElement.addEventListener('keydown', handleKeyDown, { capture: true });
        this.isLinkHintActive = true;
    }
    /**
     * CodeMirror's vim automatically exits visual mode when executing a command.
     * This keeps track of selection changes so we can restore the selection.
     *
     * This is the same approach taken by the obsidian-vimrc-plugin
     */
    watchForSelectionChange() {
        const updateSelection = this.updateSelection.bind(this);
        const watchForChanges = () => {
            var _a, _b;
            const editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
            const cm = (_b = editor === null || editor === void 0 ? void 0 : editor.cm) === null || _b === void 0 ? void 0 : _b.cm;
            if (cm && !cm._handlers.cursorActivity.includes(updateSelection)) {
                cm.on("cursorActivity", updateSelection);
                this.register(() => cm.off("cursorActivity", updateSelection));
            }
        };
        this.registerEvent(this.app.workspace.on("active-leaf-change", watchForChanges));
        this.registerEvent(this.app.workspace.on("file-open", watchForChanges));
        watchForChanges();
    }
    updateSelection(editor) {
        var _a, _b;
        const anchor = (_a = editor.listSelections()[0]) === null || _a === void 0 ? void 0 : _a.anchor;
        this.currentCursor = {
            anchor: anchor ? editor.indexFromPos(anchor) : undefined,
            vimMode: (_b = editor.state.vim) === null || _b === void 0 ? void 0 : _b.mode
        };
    }
}
class SettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for Jump To Link.' });
        new obsidian.Setting(containerEl)
            .setName('Characters used for link hints')
            .setDesc('The characters placed next to each link after enter link-hint mode.')
            .addText(cb => {
            cb.setValue(this.plugin.settings.letters)
                .onChange((value) => {
                this.plugin.settings.letters = value;
                this.plugin.saveData(this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Jump To Anywhere')
            .setDesc("Regex based navigating in editor mode")
            .addText((text) => text
            .setPlaceholder('Custom Regex')
            .setValue(this.plugin.settings.jumpToAnywhereRegex)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.jumpToAnywhereRegex = value;
            yield this.plugin.saveData(this.plugin.settings);
        })));
        new obsidian.Setting(containerEl)
            .setName('Lightspeed regex case sensitivity')
            .setDesc('If enabled, the regex for matching will be case sensitive.')
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.lightspeedCaseSensitive)
                .onChange((state) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.lightspeedCaseSensitive = state;
                yield this.plugin.saveData(this.plugin.settings);
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Jump to Link If Only One Link In Page')
            .setDesc('If enabled, auto jump to link if there is only one link in page')
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.jumpToLinkIfOneLinkOnly)
                .onChange((state) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.jumpToLinkIfOneLinkOnly = state;
                yield this.plugin.saveData(this.plugin.settings);
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Lightspeed only jumps to start of words')
            .setDesc('If enabled, lightspeed jumps will only target characters occuring at the start of words.')
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.lightspeedJumpToStartOfWord)
                .onChange((state) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.lightspeedJumpToStartOfWord = state;
                yield this.plugin.saveData(this.plugin.settings);
            }));
        });
    }
}

module.exports = JumpToLink;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInR5cGVzLnRzIiwic3JjL2NtNi13aWRnZXQvTWFya1dpZGdldC50cyIsInNyYy9jbTYtd2lkZ2V0L01hcmtQbHVnaW4udHMiLCJzcmMvdXRpbHMvY29tbW9uLnRzIiwic3JjL3Byb2Nlc3NvcnMvQ002TGlua1Byb2Nlc3Nvci50cyIsInNyYy91dGlscy9yZWdleHAudHMiLCJzcmMvcHJvY2Vzc29ycy9DTTZSZWdleFByb2Nlc3Nvci50cyIsInNyYy9wcm9jZXNzb3JzL0xlZ2FjeVJlZ2V4cFByb2Nlc3Nvci50cyIsInNyYy9wcm9jZXNzb3JzL0xlZ2FjeVNvdXJjZUxpbmtQcm9jZXNzb3IudHMiLCJzcmMvdXRpbHMvcHJldmlldy50cyIsInNyYy9wcm9jZXNzb3JzL1ByZXZpZXdMaW5rUHJvY2Vzc29yLnRzIiwic3JjL3Byb2Nlc3NvcnMvTGl2ZVByZXZpZXdMaW5rUHJvY2Vzc29yLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xyXG4gICAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgdmFyIGFyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcclxuICAgICAgICByZXR1cm4gYXI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG93bktleXMobyk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcclxuICAgICAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcclxuICAgICAgICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxufVxyXG5cclxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XHJcbiAgICBmdW5jdGlvbiBmYWlsKGUpIHtcclxuICAgICAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XHJcbiAgICAgICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHZhciByLCBzID0gMDtcclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBzIHw9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XHJcbiAgICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX2VzRGVjb3JhdGU6IF9fZXNEZWNvcmF0ZSxcclxuICAgIF9fcnVuSW5pdGlhbGl6ZXJzOiBfX3J1bkluaXRpYWxpemVycyxcclxuICAgIF9fcHJvcEtleTogX19wcm9wS2V5LFxyXG4gICAgX19zZXRGdW5jdGlvbk5hbWU6IF9fc2V0RnVuY3Rpb25OYW1lLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG4gICAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb246IF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxyXG59O1xyXG4iLCJleHBvcnQgdHlwZSBMaW5rSGludFR5cGUgPSAnaW50ZXJuYWwnIHwgJ2V4dGVybmFsJyB8ICdyZWdleCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua0hpbnRCYXNlIHtcblx0bGV0dGVyOiBzdHJpbmc7XG5cdHR5cGU6IExpbmtIaW50VHlwZTtcblx0bGlua1RleHQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcmV2aWV3TGlua0hpbnQgZXh0ZW5kcyBMaW5rSGludEJhc2Uge1xuXHRsaW5rRWxlbWVudDogSFRNTEVsZW1lbnRcblx0bGVmdDogbnVtYmVyO1xuXHR0b3A6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VMaW5rSGludCBleHRlbmRzIExpbmtIaW50QmFzZSB7XG5cdGluZGV4OiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcblx0Ly8gRGVmYXVsdHMgYXMgaW4gVmltaXVtIGV4dGVuc2lvbiBmb3IgYnJvd3NlcnNcblx0bGV0dGVyczogc3RyaW5nID0gJ3NhZGZqa2xld2NtcGdoJztcblx0anVtcFRvQW55d2hlcmVSZWdleDogc3RyaW5nID0gJ1xcXFxiXFxcXHd7Myx9XFxcXGInO1xuXHRsaWdodHNwZWVkQ2FzZVNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXHRqdW1wVG9MaW5rSWZPbmVMaW5rT25seTogYm9vbGVhbiA9IHRydWU7XG5cdGxpZ2h0c3BlZWRKdW1wVG9TdGFydE9mV29yZDogYm9vbGVhbiA9IHRydWU7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9jZXNzb3Ige1xuXHRsZXR0ZXJzOiBzdHJpbmc7XG5cblx0cHVibGljIGluaXQ6ICgpID0+IExpbmtIaW50QmFzZVtdO1xufVxuIiwiaW1wb3J0IHtXaWRnZXRUeXBlfSBmcm9tIFwiQGNvZGVtaXJyb3Ivdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgTWFya1dpZGdldCBleHRlbmRzIFdpZGdldFR5cGUge1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1hcms6IHN0cmluZywgcmVhZG9ubHkgdHlwZTogc3RyaW5nLCByZWFkb25seSBtYXRjaGVkRXZlbnRLZXk6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGVxKG90aGVyOiBNYXJrV2lkZ2V0KSB7XG4gICAgICAgIHJldHVybiBvdGhlci5tYXJrID09PSB0aGlzLm1hcmsgJiYgb3RoZXIubWF0Y2hlZEV2ZW50S2V5ID09IHRoaXMubWF0Y2hlZEV2ZW50S2V5O1xuICAgIH1cblxuICAgIHRvRE9NKCkge1xuICAgICAgICBjb25zdCBtYXJrID0gYWN0aXZlRG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIG1hcmsuaW5uZXJUZXh0ID0gdGhpcy5tYXJrO1xuXG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBhY3RpdmVEb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB3cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2psJyk7XG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnamwtJyArIHRoaXMudHlwZSk7XG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncG9wb3ZlcicpO1xuICAgICAgICBpZiAodGhpcy5tYXRjaGVkRXZlbnRLZXkgJiYgdGhpcy5tYXJrLnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aCh0aGlzLm1hdGNoZWRFdmVudEtleS50b1VwcGVyQ2FzZSgpKSkge1xuICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdtYXRjaGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgd3JhcHBlci5hcHBlbmQobWFyayk7XG5cbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgaWdub3JlRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIERlY29yYXRpb24sXG4gICAgRGVjb3JhdGlvblNldCxcbiAgICBFZGl0b3JWaWV3LFxuICAgIFZpZXdVcGRhdGUsXG59IGZyb20gXCJAY29kZW1pcnJvci92aWV3XCI7XG5pbXBvcnQgeyBNYXJrV2lkZ2V0IH0gZnJvbSBcIi4vTWFya1dpZGdldFwiO1xuaW1wb3J0IHtTb3VyY2VMaW5rSGludH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBNYXJrUGx1Z2luIHtcbiAgICBkZWNvcmF0aW9uczogRGVjb3JhdGlvblNldDtcbiAgICBsaW5rczogU291cmNlTGlua0hpbnRbXSA9IFtdO1xuICAgIG1hdGNoZWRFdmVudEtleTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoX3ZpZXc6IEVkaXRvclZpZXcpIHtcbiAgICAgICAgdGhpcy5saW5rcyA9IFtdO1xuICAgICAgICB0aGlzLm1hdGNoZWRFdmVudEtleSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9ucyA9IERlY29yYXRpb24ubm9uZVxuICAgIH1cblxuICAgIHNldExpbmtzKGxpbmtzOiBTb3VyY2VMaW5rSGludFtdKSB7XG4gICAgICAgIHRoaXMubGlua3MgPSBsaW5rcztcbiAgICAgICAgdGhpcy5tYXRjaGVkRXZlbnRLZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY2xlYW4oKSB7XG4gICAgICAgIHRoaXMubGlua3MgPSBbXTtcbiAgICAgICAgdGhpcy5tYXRjaGVkRXZlbnRLZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZmlsdGVyV2l0aEV2ZW50S2V5KGV2ZW50S2V5OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGV2ZW50S2V5Lmxlbmd0aCAhPSAxKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5saW5rcyA9IHRoaXMubGlua3MuZmlsdGVyKHYgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHYubGV0dGVyLmxlbmd0aCA9PSAyICYmIHYubGV0dGVyWzBdLnRvVXBwZXJDYXNlKCkgPT0gZXZlbnRLZXkudG9VcHBlckNhc2UoKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1hdGNoZWRFdmVudEtleSA9IGV2ZW50S2V5O1xuICAgIH1cblxuICAgIGdldCB2aXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saW5rcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHVwZGF0ZShfdXBkYXRlOiBWaWV3VXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldHMgPSB0aGlzLmxpbmtzLm1hcCgoeCkgPT5cbiAgICAgICAgICAgIERlY29yYXRpb24ud2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXQ6IG5ldyBNYXJrV2lkZ2V0KHgubGV0dGVyLCB4LnR5cGUsIHRoaXMubWF0Y2hlZEV2ZW50S2V5KSxcbiAgICAgICAgICAgICAgICBzaWRlOiAxLFxuICAgICAgICAgICAgfSkucmFuZ2UoeC5pbmRleClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmRlY29yYXRpb25zID0gRGVjb3JhdGlvbi5zZXQod2lkZ2V0cylcbiAgICB9XG59XG5cbiIsImltcG9ydCB7RWRpdG9yfSBmcm9tIFwiY29kZW1pcnJvclwiO1xuaW1wb3J0IHtTb3VyY2VMaW5rSGludH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbi8qKlxuICogR2V0IG9ubHkgdmlzaWJsZSBjb250ZW50XG4gKiBAcGFyYW0gY21FZGl0b3JcbiAqIEByZXR1cm5zIExldHRlciBvZmZzZXQgYW5kIHZpc2libGUgY29udGVudCBhcyBhIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmlzaWJsZUxpbmVUZXh0KGNtRWRpdG9yOiBFZGl0b3IpOiB7IGluZE9mZnNldDogbnVtYmVyLCBzdHJzOiBzdHJpbmcgfSB7XG4gICAgY29uc3Qgc2Nyb2xsSW5mbyA9IGNtRWRpdG9yLmdldFNjcm9sbEluZm8oKTtcbiAgICBjb25zdCB7IGxpbmU6IGZyb20gfSA9IGNtRWRpdG9yLmNvb3Jkc0NoYXIoeyBsZWZ0OiAwLCB0b3A6IDAgfSwgJ3BhZ2UnKTtcbiAgICBjb25zdCB7IGxpbmU6IHRvIH0gPSBjbUVkaXRvci5jb29yZHNDaGFyKHsgbGVmdDogc2Nyb2xsSW5mby5sZWZ0LCB0b3A6IHNjcm9sbEluZm8udG9wICsgc2Nyb2xsSW5mby5oZWlnaHR9KVxuICAgIGNvbnN0IGluZE9mZnNldCA9IGNtRWRpdG9yLmluZGV4RnJvbVBvcyh7Y2g6MCwgbGluZTogZnJvbX0pXG4gICAgY29uc3Qgc3RycyA9IGNtRWRpdG9yLmdldFJhbmdlKHtjaDogMCwgbGluZTogZnJvbX0sIHtjaDogMCwgbGluZTogdG8gKyAxfSlcblxuICAgIHJldHVybiB7IGluZE9mZnNldCwgc3RycyB9O1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gYWxwaGFiZXQgLSBMZXR0ZXJzIHdoaWNoIHVzZWQgdG8gcHJvZHVjZSBoaW50c1xuICogQHBhcmFtIG51bUxpbmtIaW50cyAtIENvdW50IG9mIG5lZWRlZCBsaW5rc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlua0hpbnRMZXR0ZXJzKGFscGhhYmV0OiBzdHJpbmcsIG51bUxpbmtIaW50czogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGFscGhhYmV0VXBwZXJjYXNlID0gYWxwaGFiZXQudG9VcHBlckNhc2UoKVxuXG4gICAgbGV0IHByZWZpeENvdW50ID0gTWF0aC5jZWlsKChudW1MaW5rSGludHMgLSBhbHBoYWJldFVwcGVyY2FzZS5sZW5ndGgpIC8gKGFscGhhYmV0VXBwZXJjYXNlLmxlbmd0aCAtIDEpKVxuXG4gICAgLy8gZW5zdXJlIDAgPD0gcHJlZml4Q291bnQgPD0gYWxwaGFiZXQubGVuZ3RoXG4gICAgcHJlZml4Q291bnQgPSBNYXRoLm1heChwcmVmaXhDb3VudCwgMCk7XG4gICAgcHJlZml4Q291bnQgPSBNYXRoLm1pbihwcmVmaXhDb3VudCwgYWxwaGFiZXRVcHBlcmNhc2UubGVuZ3RoKTtcblxuICAgIGNvbnN0IHByZWZpeGVzID0gWycnLCAuLi5BcnJheS5mcm9tKGFscGhhYmV0VXBwZXJjYXNlLnNsaWNlKDAsIHByZWZpeENvdW50KSldO1xuXG4gICAgY29uc3QgbGlua0hpbnRMZXR0ZXJzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IHByZWZpeGVzW2ldXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWxwaGFiZXRVcHBlcmNhc2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChsaW5rSGludExldHRlcnMubGVuZ3RoIDwgbnVtTGlua0hpbnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGV0dGVyID0gYWxwaGFiZXRVcHBlcmNhc2Vbal07XG4gICAgICAgICAgICAgICAgaWYgKHByZWZpeCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcmVmaXhlcy5jb250YWlucyhsZXR0ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rSGludExldHRlcnMucHVzaChsZXR0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlua0hpbnRMZXR0ZXJzLnB1c2gocHJlZml4ICsgbGV0dGVyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGlua0hpbnRMZXR0ZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TURIaW50TGlua3MoY29udGVudDogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciwgbGV0dGVyczogc3RyaW5nKTogU291cmNlTGlua0hpbnRbXSB7XG4gICAgLy8gZXhwZWN0aW5nIGVpdGhlciBbW0xpbmtdXSBvciBbW0xpbmt8VGl0bGVdXVxuICAgIGNvbnN0IHJlZ0V4SW50ZXJuYWwgPSAvXFxbXFxbKC4rPykoXFx8Lis/KT9dXS9nO1xuICAgIC8vIGV4cGVjdGluZyBbVGl0bGVdKC4uL2V4YW1wbGUubWQpXG4gICAgY29uc3QgcmVnRXhNZEludGVybmFsID0gL1xcW1teXFxbXFxdXSs/XFxdXFwoKChcXC5cXC58XFx3fFxcZCkuKz8pXFwpL2c7XG4gICAgLy8gZXhwZWN0aW5nIFtUaXRsZV0oZmlsZTovL2xpbmspLCBbVGl0bGVdKGh0dHBzOi8vbGluaykgb3IgYW55IG90aGVyIFtKaXJhLTEyM10oamlyYTovL2JsYS1ibGEpIGxpbmtcbiAgICBjb25zdCByZWdFeEV4dGVybmFsID0gL1xcW1teXFxbXFxdXSs/XFxdXFwoKC4rPzpcXC9cXC8uKz8pXFwpL2c7XG4gICAgLy8gZXhwZWN0aW5nIGh0dHA6Ly9ob2dlaG9nZSBvciBodHRwczovL2hvZ2Vob2dlXG4gICAgY29uc3QgcmVnRXhVcmwgPSAvKCB8XFxufF4pKGh0dHBzPzpcXC9cXC9bXiBcXG5dKykvZztcblxuICAgIHR5cGUgSW5kZXhlZExpbmsgPSB7IGluZGV4OiBudW1iZXIsIHR5cGU6ICdpbnRlcm5hbCcgfCAnZXh0ZXJuYWwnLCBsaW5rVGV4dDogc3RyaW5nIH1cbiAgICBsZXQgaW5kZXhlcyA9IG5ldyBTZXQ8bnVtYmVyPigpXG4gICAgbGV0IGxpbmtzV2l0aEluZGV4OiBJbmRleGVkTGlua1tdID0gW107XG4gICAgbGV0IHJlZ0V4UmVzdWx0O1xuXG4gICAgY29uc3QgYWRkTGlua1RvQXJyYXkgPSAobGluazogSW5kZXhlZExpbmspID0+IHtcbiAgICAgICAgaWYoaW5kZXhlcy5oYXMobGluay5pbmRleCkpIHJldHVyblxuICAgICAgICBpbmRleGVzLmFkZChsaW5rLmluZGV4KVxuICAgICAgICBsaW5rc1dpdGhJbmRleC5wdXNoKGxpbmspXG4gICAgfVxuXG4gICAgd2hpbGUocmVnRXhSZXN1bHQgPSByZWdFeEludGVybmFsLmV4ZWMoY29udGVudCkpIHtcbiAgICAgICAgY29uc3QgbGlua1RleHQgPSByZWdFeFJlc3VsdFsxXT8udHJpbSgpO1xuICAgICAgICBhZGRMaW5rVG9BcnJheSh7IGluZGV4OiByZWdFeFJlc3VsdC5pbmRleCArIG9mZnNldCwgdHlwZTogJ2ludGVybmFsJywgbGlua1RleHQgfSk7XG4gICAgfVxuXG4gICAgLy8gRXh0ZXJuYWwgTGluayBhYm92ZSBpbnRlcm5hbCwgdG8gcHJlZmVyIHR5cGUgZXh0ZXJuYWwgb3ZlciBpbnRlcmFsIGluIGNhc2Ugb2YgYSBkdXBlXG4gICAgd2hpbGUocmVnRXhSZXN1bHQgPSByZWdFeEV4dGVybmFsLmV4ZWMoY29udGVudCkpIHtcbiAgICAgICAgY29uc3QgbGlua1RleHQgPSByZWdFeFJlc3VsdFsxXTtcbiAgICAgICAgYWRkTGlua1RvQXJyYXkoeyBpbmRleDogcmVnRXhSZXN1bHQuaW5kZXggKyBvZmZzZXQsIHR5cGU6ICdleHRlcm5hbCcsIGxpbmtUZXh0IH0pXG4gICAgfVxuXG4gICAgd2hpbGUocmVnRXhSZXN1bHQgPSByZWdFeE1kSW50ZXJuYWwuZXhlYyhjb250ZW50KSkge1xuICAgICAgICBjb25zdCBsaW5rVGV4dCA9IHJlZ0V4UmVzdWx0WzFdO1xuICAgICAgICBhZGRMaW5rVG9BcnJheSh7IGluZGV4OiByZWdFeFJlc3VsdC5pbmRleCArIG9mZnNldCwgdHlwZTogJ2ludGVybmFsJywgbGlua1RleHQgfSk7XG4gICAgfVxuXG4gICAgd2hpbGUocmVnRXhSZXN1bHQgPSByZWdFeFVybC5leGVjKGNvbnRlbnQpKSB7XG4gICAgICAgIGNvbnN0IGxpbmtUZXh0ID0gcmVnRXhSZXN1bHRbMl07XG4gICAgICAgIGFkZExpbmtUb0FycmF5KHsgaW5kZXg6IHJlZ0V4UmVzdWx0LmluZGV4ICsgb2Zmc2V0ICsgMSwgdHlwZTogJ2V4dGVybmFsJywgbGlua1RleHQgfSlcbiAgICB9XG5cbiAgICBjb25zdCBsaW5rSGludExldHRlcnMgPSBnZXRMaW5rSGludExldHRlcnMobGV0dGVycywgbGlua3NXaXRoSW5kZXgubGVuZ3RoKTtcblxuICAgIGNvbnN0IGxpbmtzV2l0aExldHRlcjogU291cmNlTGlua0hpbnRbXSA9IFtdO1xuICAgIGxpbmtzV2l0aEluZGV4XG4gICAgICAgIC5zb3J0KCh4LHkpID0+IHguaW5kZXggLSB5LmluZGV4KVxuICAgICAgICAuZm9yRWFjaCgobGlua0hpbnQsIGkpID0+IHtcbiAgICAgICAgICAgIGxpbmtzV2l0aExldHRlci5wdXNoKHsgbGV0dGVyOiBsaW5rSGludExldHRlcnNbaV0sIC4uLmxpbmtIaW50fSk7XG4gICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGxpbmtzV2l0aExldHRlci5maWx0ZXIobGluayA9PiBsaW5rLmxldHRlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXaWRnZXRFbGVtZW50KGNvbnRlbnQ6IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XG4gICAgY29uc3QgbGlua0hpbnRFbCA9IGFjdGl2ZURvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxpbmtIaW50RWwuY2xhc3NMaXN0LmFkZCgnamwnKTtcbiAgICBsaW5rSGludEVsLmNsYXNzTGlzdC5hZGQoJ2psLScrdHlwZSk7XG4gICAgbGlua0hpbnRFbC5jbGFzc0xpc3QuYWRkKCdwb3BvdmVyJyk7XG4gICAgbGlua0hpbnRFbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHJldHVybiBsaW5rSGludEVsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVNvdXJjZVBvcG92ZXJzKGNtRWRpdG9yOiBFZGl0b3IsIGxpbmtLZXlNYXA6IFNvdXJjZUxpbmtIaW50W10pOiB2b2lkIHtcbiAgICBjb25zdCBkcmF3V2lkZ2V0ID0gKGNtRWRpdG9yOiBFZGl0b3IsIGxpbmtIaW50OiBTb3VyY2VMaW5rSGludCkgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSBjbUVkaXRvci5wb3NGcm9tSW5kZXgobGlua0hpbnQuaW5kZXgpO1xuICAgICAgICAvLyB0aGUgZm91cnRoIHBhcmFtZXRlciBpcyB1bmRvY3VtZW50ZWQuIGl0IHNwZWNpZmllcyB3aGVyZSB0aGUgd2lkZ2V0IHNob3VsZCBiZSBwbGFjZVxuICAgICAgICByZXR1cm4gKGNtRWRpdG9yIGFzIGFueSkuYWRkV2lkZ2V0KHBvcywgY3JlYXRlV2lkZ2V0RWxlbWVudChsaW5rSGludC5sZXR0ZXIsIGxpbmtIaW50LnR5cGUpLCBmYWxzZSwgJ292ZXInKTtcbiAgICB9XG5cbiAgICBsaW5rS2V5TWFwLmZvckVhY2goeCA9PiBkcmF3V2lkZ2V0KGNtRWRpdG9yLCB4KSk7XG59XG5cbiIsImltcG9ydCB7UHJvY2Vzc29yLCBTb3VyY2VMaW5rSGludH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5pbXBvcnQge0VkaXRvclZpZXd9IGZyb20gXCJAY29kZW1pcnJvci92aWV3XCI7XG5pbXBvcnQge2dldE1ESGludExpbmtzfSBmcm9tIFwiLi4vdXRpbHMvY29tbW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENNNkxpbmtQcm9jZXNzb3IgaW1wbGVtZW50cyBQcm9jZXNzb3Ige1xuICAgIGNtRWRpdG9yOiBFZGl0b3JWaWV3O1xuICAgIGxldHRlcnM6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGVkaXRvcjogRWRpdG9yVmlldywgYWxwaGFiZXQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNtRWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmxldHRlcnMgPSBhbHBoYWJldDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdCgpOiBTb3VyY2VMaW5rSGludFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U291cmNlTGlua0hpbnRzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFZpc2libGVMaW5lcygpIHtcbiAgICAgICAgY29uc3QgeyBjbUVkaXRvciB9ID0gdGhpcztcblxuICAgICAgICBsZXQgeyBmcm9tLCB0byB9ID0gY21FZGl0b3Iudmlld3BvcnQ7XG5cbiAgICAgICAgLy8gRm9yIENNNiBnZXQgcmVhbCB2aXNpYmxlIGxpbmVzIHRvcFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChjbUVkaXRvci52aWV3U3RhdGU/LnBpeGVsVmlld3BvcnQ/LnRvcCkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uc3QgcGl4ZWxPZmZzZXRUb3AgPSBjbUVkaXRvci52aWV3U3RhdGUucGl4ZWxWaWV3cG9ydC50b3BcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gY21FZGl0b3Iudmlld1N0YXRlLnZpZXdwb3J0TGluZXNcblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgZnJvbSA9IGxpbmVzLmZpbHRlcihsaW5lID0+IGxpbmUudG9wID4gcGl4ZWxPZmZzZXRUb3ApWzBdPy5mcm9tXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250ZW50ID0gY21FZGl0b3Iuc3RhdGUuc2xpY2VEb2MoZnJvbSwgdG8pO1xuXG4gICAgICAgIHJldHVybiB7IGluZGV4OiBmcm9tLCBjb250ZW50IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTb3VyY2VMaW5rSGludHMgPSAoKTogU291cmNlTGlua0hpbnRbXSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbGV0dGVycyB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgeyBpbmRleCwgY29udGVudCB9ID0gdGhpcy5nZXRWaXNpYmxlTGluZXMoKTtcblxuICAgICAgICByZXR1cm4gZ2V0TURIaW50TGlua3MoY29udGVudCwgaW5kZXgsIGxldHRlcnMpO1xuICAgIH1cbn0iLCJpbXBvcnQge2dldExpbmtIaW50TGV0dGVyc30gZnJvbSBcIi4vY29tbW9uXCI7XG5pbXBvcnQge1NvdXJjZUxpbmtIaW50fSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RSZWdleHBCbG9ja3MoY29udGVudDogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciwgcmVnZXhwOiBzdHJpbmcsIGxldHRlcnM6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHJlZ0V4VXJsID0gY2FzZVNlbnNpdGl2ZSA/IG5ldyBSZWdFeHAocmVnZXhwLCAnZycpIDogbmV3IFJlZ0V4cChyZWdleHAsICdpZycpO1xuXG4gICAgbGV0IGxpbmtzV2l0aEluZGV4OiB7XG4gICAgICAgIGluZGV4OiBudW1iZXI7XG4gICAgICAgIHR5cGU6IFwicmVnZXhcIjtcbiAgICAgICAgbGlua1RleHQ6IHN0cmluZztcbiAgICB9W10gPSBbXTtcblxuICAgIGxldCByZWdFeFJlc3VsdDtcblxuICAgIHdoaWxlICgocmVnRXhSZXN1bHQgPSByZWdFeFVybC5leGVjKGNvbnRlbnQpKSkge1xuICAgICAgICBjb25zdCBsaW5rVGV4dCA9IHJlZ0V4UmVzdWx0WzFdO1xuICAgICAgICBsaW5rc1dpdGhJbmRleC5wdXNoKHtcbiAgICAgICAgICAgIGluZGV4OiByZWdFeFJlc3VsdC5pbmRleCArIG9mZnNldCxcbiAgICAgICAgICAgIHR5cGU6IFwicmVnZXhcIixcbiAgICAgICAgICAgIGxpbmtUZXh0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBsaW5rSGludExldHRlcnMgPSBnZXRMaW5rSGludExldHRlcnMobGV0dGVycywgbGlua3NXaXRoSW5kZXgubGVuZ3RoKTtcblxuICAgIGNvbnN0IGxpbmtzV2l0aExldHRlcjogU291cmNlTGlua0hpbnRbXSA9IFtdO1xuICAgIGxpbmtzV2l0aEluZGV4XG4gICAgICAgIC5zb3J0KCh4LCB5KSA9PiB4LmluZGV4IC0geS5pbmRleClcbiAgICAgICAgLmZvckVhY2goKGxpbmtIaW50LCBpKSA9PiB7XG4gICAgICAgICAgICBsaW5rc1dpdGhMZXR0ZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgbGV0dGVyOiBsaW5rSGludExldHRlcnNbaV0sXG4gICAgICAgICAgICAgICAgLi4ubGlua0hpbnQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gbGlua3NXaXRoTGV0dGVyLmZpbHRlcihsaW5rID0+IGxpbmsubGV0dGVyKTtcbn1cbiIsImltcG9ydCBDTTZMaW5rUHJvY2Vzc29yIGZyb20gXCIuL0NNNkxpbmtQcm9jZXNzb3JcIjtcbmltcG9ydCB7UHJvY2Vzc29yfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7RWRpdG9yVmlld30gZnJvbSBcIkBjb2RlbWlycm9yL3ZpZXdcIjtcbmltcG9ydCB7ZXh0cmFjdFJlZ2V4cEJsb2Nrc30gZnJvbSBcIi4uL3V0aWxzL3JlZ2V4cFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDTTZSZWdleFByb2Nlc3NvciBleHRlbmRzIENNNkxpbmtQcm9jZXNzb3IgaW1wbGVtZW50cyBQcm9jZXNzb3Ige1xuICAgIHJlZ2V4cDogc3RyaW5nO1xuICAgIGNhc2VTZW5zaXRpdmU6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3IoZWRpdG9yOiBFZGl0b3JWaWV3LCBhbHBoYWJldDogc3RyaW5nLCByZWdleHA6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbikge1xuICAgICAgICBzdXBlcihlZGl0b3IsIGFscGhhYmV0KTtcbiAgICAgICAgdGhpcy5yZWdleHAgPSByZWdleHA7XG4gICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZSA9IGNhc2VTZW5zaXRpdmU7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3QgeyBsZXR0ZXJzLCByZWdleHAgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgaW5kZXgsIGNvbnRlbnQgfSA9IHRoaXMuZ2V0VmlzaWJsZUxpbmVzKCk7XG4gICAgICAgIHJldHVybiBleHRyYWN0UmVnZXhwQmxvY2tzKGNvbnRlbnQsIGluZGV4LCByZWdleHAsIGxldHRlcnMsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFZGl0b3J9IGZyb20gXCJjb2RlbWlycm9yXCI7XG5pbXBvcnQge1Byb2Nlc3NvciwgU291cmNlTGlua0hpbnR9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IHtkaXNwbGF5U291cmNlUG9wb3ZlcnMsIGdldFZpc2libGVMaW5lVGV4dH0gZnJvbSBcIi4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0IHtleHRyYWN0UmVnZXhwQmxvY2tzfSBmcm9tIFwiLi4vdXRpbHMvcmVnZXhwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExlZ2FjeVJlZ2V4cFByb2Nlc3NvciBpbXBsZW1lbnRzIFByb2Nlc3NvciB7XG4gICAgY21FZGl0b3I6IEVkaXRvcjtcbiAgICByZWdleHA6IHN0cmluZztcbiAgICBsZXR0ZXJzOiBzdHJpbmc7XG4gICAgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGNtRWRpdG9yOiBFZGl0b3IsIHJlZ2V4cDogc3RyaW5nLCBhbHBoYWJldDogc3RyaW5nLCBjYXNlU2Vuc2l0aXZlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY21FZGl0b3IgPSBjbUVkaXRvcjtcbiAgICAgICAgdGhpcy5yZWdleHAgPSByZWdleHA7XG4gICAgICAgIHRoaXMubGV0dGVycyA9IGFscGhhYmV0O1xuICAgICAgICB0aGlzLmNhc2VTZW5zaXRpdmUgPSBjYXNlU2Vuc2l0aXZlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCk6IFNvdXJjZUxpbmtIaW50W10ge1xuICAgICAgICBjb25zdCBbY29udGVudCwgb2Zmc2V0XSA9IHRoaXMuZ2V0VmlzaWJsZUNvbnRlbnQoKTtcbiAgICAgICAgY29uc3QgbGlua3MgPSB0aGlzLmdldExpbmtzKGNvbnRlbnQsIG9mZnNldCk7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5KGxpbmtzKTtcbiAgICAgICAgcmV0dXJuIGxpbmtzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VmlzaWJsZUNvbnRlbnQoKTogW3N0cmluZywgbnVtYmVyXSB7XG4gICAgICAgIGNvbnN0IHsgY21FZGl0b3IgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgaW5kT2Zmc2V0LCBzdHJzIH0gPSBnZXRWaXNpYmxlTGluZVRleHQoY21FZGl0b3IpO1xuXG4gICAgICAgIHJldHVybiBbc3RycywgaW5kT2Zmc2V0XTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExpbmtzKGNvbnRlbnQ6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBTb3VyY2VMaW5rSGludFtdIHtcbiAgICAgICAgY29uc3QgeyByZWdleHAsIGxldHRlcnMgfSA9IHRoaXNcbiAgICAgICAgcmV0dXJuIGV4dHJhY3RSZWdleHBCbG9ja3MoY29udGVudCwgb2Zmc2V0LCByZWdleHAsIGxldHRlcnMsIHRoaXMuY2FzZVNlbnNpdGl2ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwbGF5KGxpbmtzOiBTb3VyY2VMaW5rSGludFtdKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHsgY21FZGl0b3IgfSA9IHRoaXNcbiAgICAgICAgZGlzcGxheVNvdXJjZVBvcG92ZXJzKGNtRWRpdG9yLCBsaW5rcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtQcm9jZXNzb3IsIFNvdXJjZUxpbmtIaW50fSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7RWRpdG9yfSBmcm9tIFwiY29kZW1pcnJvclwiO1xuaW1wb3J0IHtkaXNwbGF5U291cmNlUG9wb3ZlcnMsIGdldE1ESGludExpbmtzLCBnZXRWaXNpYmxlTGluZVRleHR9IGZyb20gXCIuLi91dGlscy9jb21tb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVnYWN5U291cmNlTGlua1Byb2Nlc3NvciBpbXBsZW1lbnRzIFByb2Nlc3NvciB7XG4gICAgY21FZGl0b3I6IEVkaXRvcjtcbiAgICBsZXR0ZXJzOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3I6IEVkaXRvciwgYWxwaGFiZXQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNtRWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmxldHRlcnMgPSBhbHBoYWJldDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgY29uc3QgeyBjbUVkaXRvciB9ID0gdGhpcztcblxuICAgICAgICBjb25zdCBsaW5rSGludHMgPSB0aGlzLmdldFNvdXJjZUxpbmtIaW50cyhjbUVkaXRvcik7XG4gICAgICAgIGRpc3BsYXlTb3VyY2VQb3BvdmVycyhjbUVkaXRvciwgbGlua0hpbnRzKTtcblxuICAgICAgICByZXR1cm4gbGlua0hpbnRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U291cmNlTGlua0hpbnRzID0gKGNtRWRpdG9yOiBFZGl0b3IpOiBTb3VyY2VMaW5rSGludFtdID0+IHtcbiAgICAgICAgY29uc3QgeyBsZXR0ZXJzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IGluZE9mZnNldCwgc3RycyB9ID0gZ2V0VmlzaWJsZUxpbmVUZXh0KGNtRWRpdG9yKTtcblxuICAgICAgICByZXR1cm4gZ2V0TURIaW50TGlua3Moc3RycywgaW5kT2Zmc2V0LCBsZXR0ZXJzKTtcbiAgICB9XG59IiwiaW1wb3J0IHtMaW5rSGludFR5cGUsIFByZXZpZXdMaW5rSGludH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5pbXBvcnQge2dldExpbmtIaW50TGV0dGVyc30gZnJvbSBcIi4vY29tbW9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmV2aWV3TGlua0hpbnRzKHByZXZpZXdWaWV3RWw6IEhUTUxFbGVtZW50LCBsZXR0ZXJzOiBzdHJpbmcgKTogUHJldmlld0xpbmtIaW50W10ge1xuICAgIGNvbnN0IGFuY2hvckVscyA9IHByZXZpZXdWaWV3RWwucXVlcnlTZWxlY3RvckFsbCgnYSwgLm1ldGFkYXRhLWxpbmstaW5uZXInKTtcbiAgICBjb25zdCBlbWJlZEVscyA9IHByZXZpZXdWaWV3RWwucXVlcnlTZWxlY3RvckFsbCgnLmludGVybmFsLWVtYmVkJyk7XG5cbiAgICBjb25zdCBsaW5rSGludHM6IFByZXZpZXdMaW5rSGludFtdID0gW107XG4gICAgYW5jaG9yRWxzLmZvckVhY2goKGFuY2hvckVsLCBfaSkgPT4ge1xuICAgICAgICBpZiAoY2hlY2tJc1ByZXZpZXdFbE9uU2NyZWVuKHByZXZpZXdWaWV3RWwsIGFuY2hvckVsKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsaW5rVHlwZTogTGlua0hpbnRUeXBlID0gYW5jaG9yRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnRlcm5hbC1saW5rJylcbiAgICAgICAgICAgID8gJ2ludGVybmFsJ1xuICAgICAgICAgICAgOiAnZXh0ZXJuYWwnO1xuXG4gICAgICAgIGNvbnN0IGxpbmtUZXh0ID0gbGlua1R5cGUgPT09ICdpbnRlcm5hbCdcbiAgICAgICAgICAgID8gYW5jaG9yRWwuZGF0YXNldFsnaHJlZiddID8/IGFuY2hvckVsLmhyZWZcbiAgICAgICAgICAgIDogYW5jaG9yRWwuaHJlZjtcblxuICAgICAgICBsZXQgb2Zmc2V0UGFyZW50ID0gYW5jaG9yRWwub2Zmc2V0UGFyZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBsZXQgdG9wID0gYW5jaG9yRWwub2Zmc2V0VG9wO1xuICAgICAgICBsZXQgbGVmdCA9IGFuY2hvckVsLm9mZnNldExlZnQ7XG5cbiAgICAgICAgd2hpbGUgKG9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgaWYgKG9mZnNldFBhcmVudCA9PSBwcmV2aWV3Vmlld0VsKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0UGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b3AgKz0gb2Zmc2V0UGFyZW50Lm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICBsZWZ0ICs9IG9mZnNldFBhcmVudC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGlua0hpbnRzLnB1c2goe1xuICAgICAgICAgICAgbGlua0VsZW1lbnQ6IGFuY2hvckVsLFxuICAgICAgICAgICAgbGV0dGVyOiAnJyxcbiAgICAgICAgICAgIGxpbmtUZXh0OiBsaW5rVGV4dCxcbiAgICAgICAgICAgIHR5cGU6IGxpbmtUeXBlLFxuICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGVtYmVkRWxzLmZvckVhY2goKGVtYmVkRWwsIF9pKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmtUZXh0ID0gZW1iZWRFbC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICBjb25zdCBsaW5rRWwgPSBlbWJlZEVsLnF1ZXJ5U2VsZWN0b3IoJy5tYXJrZG93bi1lbWJlZC1saW5rJykgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGxpbmtUZXh0ICYmIGxpbmtFbCkge1xuICAgICAgICAgICAgaWYgKGNoZWNrSXNQcmV2aWV3RWxPblNjcmVlbihwcmV2aWV3Vmlld0VsLCBsaW5rRWwpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvZmZzZXRQYXJlbnQgPSBsaW5rRWwub2Zmc2V0UGFyZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgbGV0IHRvcCA9IGxpbmtFbC5vZmZzZXRUb3A7XG4gICAgICAgICAgICBsZXQgbGVmdCA9IGxpbmtFbC5vZmZzZXRMZWZ0O1xuXG4gICAgICAgICAgICB3aGlsZSAob2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFBhcmVudCA9PSBwcmV2aWV3Vmlld0VsKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFBhcmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b3AgKz0gb2Zmc2V0UGFyZW50Lm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCArPSBvZmZzZXRQYXJlbnQub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpbmtIaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsaW5rRWxlbWVudDogbGlua0VsLFxuICAgICAgICAgICAgICAgIGxldHRlcjogJycsXG4gICAgICAgICAgICAgICAgbGlua1RleHQ6IGxpbmtUZXh0LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnRlcm5hbCcsXG4gICAgICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzb3J0ZWRMaW5rSGludHMgPSBsaW5rSGludHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS50b3AgPiBiLnRvcCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoYS50b3AgPT09IGIudG9wKSB7XG4gICAgICAgICAgICBpZiAoYS5sZWZ0ID4gYi5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGEubGVmdCA9PT0gYi5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbGlua0hpbnRMZXR0ZXJzID0gZ2V0TGlua0hpbnRMZXR0ZXJzKGxldHRlcnMsIHNvcnRlZExpbmtIaW50cy5sZW5ndGgpO1xuXG4gICAgc29ydGVkTGlua0hpbnRzLmZvckVhY2goKGxpbmtIaW50LCBpKSA9PiB7XG4gICAgICAgIGxpbmtIaW50LmxldHRlciA9IGxpbmtIaW50TGV0dGVyc1tpXTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzb3J0ZWRMaW5rSGludHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lzUHJldmlld0VsT25TY3JlZW4ocGFyZW50OiBIVE1MRWxlbWVudCwgZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsLm9mZnNldFRvcCA8IHBhcmVudC5zY3JvbGxUb3AgfHwgZWwub2Zmc2V0VG9wID4gcGFyZW50LnNjcm9sbFRvcCArIHBhcmVudC5vZmZzZXRIZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlQcmV2aWV3UG9wb3ZlcnMobGlua0hpbnRzOiBQcmV2aWV3TGlua0hpbnRbXSk6IEhUTUxFbGVtZW50W10ge1xuICAgIGNvbnN0IGxpbmtIaW50SHRtbEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW11cbiAgICBmb3IgKGxldCBsaW5rSGludCBvZiBsaW5rSGludHMpIHtcbiAgICAgICAgY29uc3QgcG9wb3ZlckVsZW1lbnQgPSBsaW5rSGludC5saW5rRWxlbWVudC5jcmVhdGVFbCgnc3BhbicpO1xuICAgICAgICBsaW5rSGludC5saW5rRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgICAgICAgcG9wb3ZlckVsZW1lbnQuc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgIHBvcG92ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAgICAgcG9wb3ZlckVsZW1lbnQudGV4dENvbnRlbnQgPSBsaW5rSGludC5sZXR0ZXI7XG4gICAgICAgIHBvcG92ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2psJyk7XG4gICAgICAgIHBvcG92ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2psLScrbGlua0hpbnQudHlwZSk7XG4gICAgICAgIHBvcG92ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BvcG92ZXInKTtcbiAgICAgICAgbGlua0hpbnRIdG1sRWxlbWVudHMucHVzaChwb3BvdmVyRWxlbWVudClcbiAgICB9XG4gICAgcmV0dXJuIGxpbmtIaW50SHRtbEVsZW1lbnRzXG59XG5cbiIsImltcG9ydCB7UHJldmlld0xpbmtIaW50fSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7ZGlzcGxheVByZXZpZXdQb3BvdmVycywgZ2V0UHJldmlld0xpbmtIaW50c30gZnJvbSBcIi4uL3V0aWxzL3ByZXZpZXdcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlld0xpbmtQcm9jZXNzb3Ige1xuICAgIHZpZXc6IEhUTUxFbGVtZW50O1xuICAgIGFscGhhYmV0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih2aWV3OiBIVE1MRWxlbWVudCwgYWxwaGFiZXQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLmFscGhhYmV0ID0gYWxwaGFiZXQ7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKTogUHJldmlld0xpbmtIaW50W10ge1xuICAgICAgICBjb25zdCB7IHZpZXcsIGFscGhhYmV0IH0gPSB0aGlzXG4gICAgICAgIGNvbnN0IGxpbmtzID0gZ2V0UHJldmlld0xpbmtIaW50cyh2aWV3LCBhbHBoYWJldCk7XG4gICAgICAgIGRpc3BsYXlQcmV2aWV3UG9wb3ZlcnMobGlua3MpO1xuICAgICAgICByZXR1cm4gbGlua3M7XG4gICAgfVxufSIsImltcG9ydCB7UHJldmlld0xpbmtIaW50LCBTb3VyY2VMaW5rSGludH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5pbXBvcnQge0VkaXRvclZpZXd9IGZyb20gXCJAY29kZW1pcnJvci92aWV3XCI7XG5pbXBvcnQge2Rpc3BsYXlQcmV2aWV3UG9wb3ZlcnMsIGdldFByZXZpZXdMaW5rSGludHN9IGZyb20gXCIuLi91dGlscy9wcmV2aWV3XCI7XG5cbmltcG9ydCB7Z2V0TGlua0hpbnRMZXR0ZXJzLCBnZXRNREhpbnRMaW5rc30gZnJvbSBcIi4uL3V0aWxzL2NvbW1vblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXZlUHJldmlld0xpbmtQcm9jZXNzb3Ige1xuICAgIHZpZXc6IEhUTUxFbGVtZW50O1xuICAgIGNtRWRpdG9yOiBFZGl0b3JWaWV3O1xuICAgIGFscGhhYmV0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih2aWV3OiBIVE1MRWxlbWVudCwgZWRpdG9yOiBFZGl0b3JWaWV3LCBhbHBoYWJldDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMuY21FZGl0b3IgPSBlZGl0b3JcbiAgICAgICAgdGhpcy5hbHBoYWJldCA9IGFscGhhYmV0O1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCk6IFtQcmV2aWV3TGlua0hpbnRbXSxTb3VyY2VMaW5rSGludFtdLEhUTUxFbGVtZW50W11dIHtcbiAgICAgICAgY29uc3QgeyB2aWV3LCBhbHBoYWJldCB9ID0gdGhpc1xuICAgICAgICBjb25zdCBsaW5rcyA9IGdldFByZXZpZXdMaW5rSGludHModmlldywgYWxwaGFiZXQpO1xuICAgICAgICBjb25zdCBzb3VyY2VMaW5rcyA9IHRoaXMuZ2V0U291cmNlTGlua0hpbnRzKCk7XG4gICAgICAgIGNvbnN0IGxpbmtIaW50TGV0dGVycyA9IGdldExpbmtIaW50TGV0dGVycyhhbHBoYWJldCwgbGlua3MubGVuZ3RoICsgc291cmNlTGlua3MubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgbGlua3NSZW1hcHBlZCA9IGxpbmtzLm1hcCgobGluaywgaWR4KSA9PiAoey4uLmxpbmssIGxldHRlcjogbGlua0hpbnRMZXR0ZXJzW2lkeF19KSkuZmlsdGVyKGxpbmsgPT4gbGluay5sZXR0ZXIpXG4gICAgICAgIGNvbnN0IHNvdXJjZUxpbmtzUmVtYXBwZWQgPSBzb3VyY2VMaW5rcy5tYXAoKGxpbmssIGlkeCkgPT4gKHsuLi5saW5rLCBsZXR0ZXI6IGxpbmtIaW50TGV0dGVyc1tpZHggKyBsaW5rcy5sZW5ndGhdfSkpLmZpbHRlcihsaW5rID0+IGxpbmsubGV0dGVyKVxuICAgICAgICBjb25zdCBsaW5rSGludEh0bWxFbGVtZW50cyA9IGRpc3BsYXlQcmV2aWV3UG9wb3ZlcnMobGlua3NSZW1hcHBlZCk7XG4gICAgICAgIHJldHVybiBbbGlua3NSZW1hcHBlZCwgc291cmNlTGlua3NSZW1hcHBlZCwgbGlua0hpbnRIdG1sRWxlbWVudHNdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRWaXNpYmxlTGluZXMoKSB7XG4gICAgICAgIGNvbnN0IHsgY21FZGl0b3IgfSA9IHRoaXM7XG4gICAgICAgIGxldCB7IGZyb20sIHRvIH0gPSBjbUVkaXRvci52aWV3cG9ydDtcblxuICAgICAgICAvLyBGb3IgQ002IGdldCByZWFsIHZpc2libGUgbGluZXMgdG9wXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGNtRWRpdG9yLnZpZXdTdGF0ZT8ucGl4ZWxWaWV3cG9ydD8udG9wKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb25zdCBwaXhlbE9mZnNldFRvcCA9IGNtRWRpdG9yLnZpZXdTdGF0ZS5waXhlbFZpZXdwb3J0LnRvcFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uc3QgbGluZXMgPSBjbUVkaXRvci52aWV3U3RhdGUudmlld3BvcnRMaW5lc1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgZnJvbSA9IGxpbmVzLmZpbHRlcihsaW5lID0+IGxpbmUudG9wID4gcGl4ZWxPZmZzZXRUb3ApWzBdPy5mcm9tXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udGVudCA9IGNtRWRpdG9yLnN0YXRlLnNsaWNlRG9jKGZyb20sIHRvKTtcbiAgICAgICAgcmV0dXJuIHsgaW5kZXg6IGZyb20sIGNvbnRlbnQgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNvdXJjZUxpbmtIaW50cyA9ICgpOiBTb3VyY2VMaW5rSGludFtdID0+IHtcbiAgICAgICAgY29uc3QgeyBhbHBoYWJldCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgeyBpbmRleCwgY29udGVudCB9ID0gdGhpcy5nZXRWaXNpYmxlTGluZXMoKTtcblxuICAgICAgICByZXR1cm4gZ2V0TURIaW50TGlua3MoY29udGVudCwgaW5kZXgsIGFscGhhYmV0KTtcbiAgICB9XG59IiwiaW1wb3J0IHtBcHAsIE1hcmtkb3duVmlldywgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nLCBWaWV3LCBlZGl0b3JMaXZlUHJldmlld0ZpZWxkfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQge0VkaXRvcn0gZnJvbSAnY29kZW1pcnJvcic7XG5pbXBvcnQge0VkaXRvclNlbGVjdGlvbn0gZnJvbSBcIkBjb2RlbWlycm9yL3N0YXRlXCI7XG5pbXBvcnQge0VkaXRvclZpZXcsIFZpZXdQbHVnaW59IGZyb20gXCJAY29kZW1pcnJvci92aWV3XCI7XG5pbXBvcnQge0xpbmtIaW50QmFzZSwgU2V0dGluZ3MsIFNvdXJjZUxpbmtIaW50fSBmcm9tICd0eXBlcyc7XG5pbXBvcnQge01hcmtQbHVnaW59IGZyb20gXCIuL2NtNi13aWRnZXQvTWFya1BsdWdpblwiO1xuXG5pbXBvcnQgQ002TGlua1Byb2Nlc3NvciBmcm9tIFwiLi9wcm9jZXNzb3JzL0NNNkxpbmtQcm9jZXNzb3JcIjtcbmltcG9ydCBDTTZSZWdleFByb2Nlc3NvciBmcm9tIFwiLi9wcm9jZXNzb3JzL0NNNlJlZ2V4UHJvY2Vzc29yXCI7XG5pbXBvcnQgTGVnYWN5UmVnZXhwUHJvY2Vzc29yIGZyb20gXCIuL3Byb2Nlc3NvcnMvTGVnYWN5UmVnZXhwUHJvY2Vzc29yXCI7XG5pbXBvcnQgTGVnYWN5U291cmNlTGlua1Byb2Nlc3NvciBmcm9tIFwiLi9wcm9jZXNzb3JzL0xlZ2FjeVNvdXJjZUxpbmtQcm9jZXNzb3JcIjtcbmltcG9ydCBQcmV2aWV3TGlua1Byb2Nlc3NvciBmcm9tIFwiLi9wcm9jZXNzb3JzL1ByZXZpZXdMaW5rUHJvY2Vzc29yXCI7XG5pbXBvcnQgTGl2ZVByZXZpZXdMaW5rUHJvY2Vzc29yIGZyb20gJy4vcHJvY2Vzc29ycy9MaXZlUHJldmlld0xpbmtQcm9jZXNzb3InO1xuXG5lbnVtIFZJRVdfTU9ERSB7XG4gICAgU09VUkNFLFxuICAgIFBSRVZJRVcsXG4gICAgTEVHQUNZLFxuICAgIExJVkVfUFJFVklFV1xufVxuaW50ZXJmYWNlIEN1cnNvclN0YXRlIHtcbiAgICB2aW1Nb2RlPzogc3RyaW5nO1xuICAgIGFuY2hvcj86IG51bWJlcjtcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp1bXBUb0xpbmsgZXh0ZW5kcyBQbHVnaW4ge1xuICAgIGlzTGlua0hpbnRBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzZXR0aW5nczogU2V0dGluZ3M7XG4gICAgcHJlZml4SW5mbzogeyBwcmVmaXg6IHN0cmluZywgc2hpZnRLZXk6IGJvb2xlYW4gfSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBtYXJrVmlld1BsdWdpbjogVmlld1BsdWdpbjxhbnk+XG4gICAgY21FZGl0b3I6IEVkaXRvciB8IEVkaXRvclZpZXdcbiAgICBjdXJyZW50VmlldzogVmlld1xuICAgIGNvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudFxuICAgIG1vZGU6IFZJRVdfTU9ERVxuICAgIGN1cnJlbnRDdXJzb3I6IEN1cnNvclN0YXRlID0ge307XG4gICAgY3Vyc29yQmVmb3JlSnVtcDogQ3Vyc29yU3RhdGUgPSB7fTtcblxuICAgIGFzeW5jIG9ubG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IGF3YWl0IHRoaXMubG9hZERhdGEoKSB8fCBuZXcgU2V0dGluZ3MoKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuICAgICAgICBjb25zdCBtYXJrVmlld1BsdWdpbiA9IHRoaXMubWFya1ZpZXdQbHVnaW4gPSBWaWV3UGx1Z2luLmZyb21DbGFzcyhNYXJrUGx1Z2luLCB7XG4gICAgICAgICAgICBkZWNvcmF0aW9uczogdiA9PiB2LmRlY29yYXRpb25zXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRWRpdG9yRXh0ZW5zaW9uKFttYXJrVmlld1BsdWdpbl0pXG5cbiAgICAgICAgdGhpcy53YXRjaEZvclNlbGVjdGlvbkNoYW5nZSgpO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogJ2FjdGl2YXRlLWp1bXAtdG8tbGluaycsXG4gICAgICAgICAgICBuYW1lOiAnSnVtcCB0byBMaW5rJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiB0aGlzLmFjdGlvbi5iaW5kKHRoaXMsICdsaW5rJyksXG4gICAgICAgICAgICBob3RrZXlzOiBbe21vZGlmaWVyczogWydDdHJsJ10sIGtleTogYCdgfV0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogXCJhY3RpdmF0ZS1qdW1wLXRvLWFueXdoZXJlXCIsXG4gICAgICAgICAgICBuYW1lOiBcIkp1bXAgdG8gQW55d2hlcmUgUmVnZXhcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiB0aGlzLmFjdGlvbi5iaW5kKHRoaXMsICdyZWdleHAnKSxcbiAgICAgICAgICAgIGhvdGtleXM6IFt7bW9kaWZpZXJzOiBbXCJDdHJsXCJdLCBrZXk6IFwiO1wifV0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogXCJhY3RpdmF0ZS1saWdodHNwZWVkLWp1bXBcIixcbiAgICAgICAgICAgIG5hbWU6IFwiTGlnaHRzcGVlZCBKdW1wXCIsXG4gICAgICAgICAgICBjYWxsYmFjazogdGhpcy5hY3Rpb24uYmluZCh0aGlzLCAnbGlnaHRzcGVlZCcpLFxuICAgICAgICAgICAgaG90a2V5czogW10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9udW5sb2FkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygndW5sb2FkaW5nIGp1bXAgdG8gbGlua3MgcGx1Z2luJyk7XG4gICAgfVxuXG4gICAgYWN0aW9uKHR5cGU6ICdsaW5rJyB8ICdyZWdleHAnIHwgJ2xpZ2h0c3BlZWQnKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTGlua0hpbnRBY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVZpZXdPZlR5cGUgPSBhcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KVxuICAgICAgICBjb25zdCBjdXJyZW50VmlldyA9IHRoaXMuY3VycmVudFZpZXcgPSBhY3RpdmVWaWV3T2ZUeXBlLmxlYWYudmlldztcbiAgICAgICAgY29uc3QgbW9kZSA9IHRoaXMubW9kZSA9IHRoaXMuZ2V0TW9kZSh0aGlzLmN1cnJlbnRWaWV3KTtcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudCA9IGFjdGl2ZVZpZXdPZlR5cGUuY29udGVudEVsXG4gICAgICAgIHRoaXMuY3Vyc29yQmVmb3JlSnVtcCA9IHRoaXMuY3VycmVudEN1cnNvcjtcblxuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgVklFV19NT0RFLkxFR0FDWTpcbiAgICAgICAgICAgICAgICB0aGlzLmNtRWRpdG9yID0gKGN1cnJlbnRWaWV3IGFzIGFueSkuc291cmNlTW9kZS5jbUVkaXRvcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVklFV19NT0RFLkxJVkVfUFJFVklFVzpcbiAgICAgICAgICAgIGNhc2UgVklFV19NT0RFLlNPVVJDRTpcbiAgICAgICAgICAgICAgICB0aGlzLmNtRWRpdG9yID0gKDx7IGVkaXRvcj86IHsgY206IEVkaXRvclZpZXcgfSB9PmN1cnJlbnRWaWV3KS5lZGl0b3IuY207XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsaW5rXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVKdW1wVG9MaW5rKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBjYXNlIFwicmVnZXhwXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVKdW1wVG9SZWdleCgpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY2FzZSBcImxpZ2h0c3BlZWRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUxpZ2h0c3BlZWRKdW1wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNb2RlKGN1cnJlbnRWaWV3OiBWaWV3KTogVklFV19NT0RFIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBpc0xlZ2FjeSA9IHRoaXMuYXBwLnZhdWx0LmdldENvbmZpZyhcImxlZ2FjeUVkaXRvclwiKVxuXG4gICAgICAgIGlmIChjdXJyZW50Vmlldy5nZXRTdGF0ZSgpLm1vZGUgPT09ICdwcmV2aWV3Jykge1xuICAgICAgICAgICAgcmV0dXJuIFZJRVdfTU9ERS5QUkVWSUVXO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTGVnYWN5KSB7XG4gICAgICAgICAgICByZXR1cm4gVklFV19NT0RFLkxFR0FDWTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50Vmlldy5nZXRTdGF0ZSgpLm1vZGUgPT09ICdzb3VyY2UnKSB7XG4gICAgICAgICAgICBjb25zdCBpc0xpdmVQcmV2aWV3ID0gKDx7IGVkaXRvcj86IHsgY206IEVkaXRvclZpZXcgfSB9PmN1cnJlbnRWaWV3KS5lZGl0b3IuY20uc3RhdGUuZmllbGQoZWRpdG9yTGl2ZVByZXZpZXdGaWVsZClcbiAgICAgICAgICAgIGlmIChpc0xpdmVQcmV2aWV3KSByZXR1cm4gVklFV19NT0RFLkxJVkVfUFJFVklFVztcbiAgICAgICAgICAgIHJldHVybiBWSUVXX01PREUuU09VUkNFO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBoYW5kbGVKdW1wVG9MaW5rID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7c2V0dGluZ3M6IHtsZXR0ZXJzfSB9ID0gdGhpc1xuXG4gICAgICAgIGNvbnN0IHsgbW9kZSwgY3VycmVudFZpZXcgfSA9IHRoaXM7XG5cbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFZJRVdfTU9ERS5MRUdBQ1k6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbUVkaXRvciA9IHRoaXMuY21FZGl0b3IgYXMgRWRpdG9yO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZUxpbmtIaW50cyA9IG5ldyBMZWdhY3lTb3VyY2VMaW5rUHJvY2Vzc29yKGNtRWRpdG9yLCBsZXR0ZXJzKS5pbml0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY3Rpb25zKHNvdXJjZUxpbmtIaW50cyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFZJRVdfTU9ERS5MSVZFX1BSRVZJRVc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbTZFZGl0b3IgPSB0aGlzLmNtRWRpdG9yIGFzIEVkaXRvclZpZXc7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlld1ZpZXdFbDogSFRNTEVsZW1lbnQgPSAoY3VycmVudFZpZXcgYXMgYW55KS5jdXJyZW50TW9kZS5lZGl0b3IuY29udGFpbmVyRWw7XG4gICAgICAgICAgICAgICAgY29uc3QgW3ByZXZpZXdMaW5rSGludHMsIHNvdXJjZUxpbmtIaW50cywgbGlua0hpbnRIdG1sRWxlbWVudHNdID0gbmV3IExpdmVQcmV2aWV3TGlua1Byb2Nlc3NvcihwcmV2aWV3Vmlld0VsLCBjbTZFZGl0b3IsIGxldHRlcnMpLmluaXQoKTtcbiAgICAgICAgICAgICAgICBjbTZFZGl0b3IucGx1Z2luKHRoaXMubWFya1ZpZXdQbHVnaW4pLnNldExpbmtzKHNvdXJjZUxpbmtIaW50cyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnVwZGF0ZU9wdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbnMoWy4uLnByZXZpZXdMaW5rSGludHMsIC4uLnNvdXJjZUxpbmtIaW50c10sIGxpbmtIaW50SHRtbEVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgVklFV19NT0RFLlBSRVZJRVc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2aWV3Vmlld0VsOiBIVE1MRWxlbWVudCA9IChjdXJyZW50VmlldyBhcyBhbnkpLnByZXZpZXdNb2RlLmNvbnRhaW5lckVsLnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tYXJrZG93bi1wcmV2aWV3LXZpZXcnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2aWV3TGlua0hpbnRzID0gbmV3IFByZXZpZXdMaW5rUHJvY2Vzc29yKHByZXZpZXdWaWV3RWwsIGxldHRlcnMpLmluaXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbnMocHJldmlld0xpbmtIaW50cyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFZJRVdfTU9ERS5TT1VSQ0U6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbTZFZGl0b3IgPSB0aGlzLmNtRWRpdG9yIGFzIEVkaXRvclZpZXc7XG4gICAgICAgICAgICAgICAgY29uc3QgbGl2ZVByZXZpZXdMaW5rcyA9IG5ldyBDTTZMaW5rUHJvY2Vzc29yKGNtNkVkaXRvciwgbGV0dGVycykuaW5pdCgpO1xuICAgICAgICAgICAgICAgIGNtNkVkaXRvci5wbHVnaW4odGhpcy5tYXJrVmlld1BsdWdpbikuc2V0TGlua3MobGl2ZVByZXZpZXdMaW5rcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnVwZGF0ZU9wdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbnMobGl2ZVByZXZpZXdMaW5rcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICogIGNhc2VTZW5zaXRpdmUgaXMgb25seSBmb3IgbGlnaHRzcGVlZCBhbmQgc2hhbGwgbm90IGFmZmVjdCBqdW1wVG9Bbnl3aGVyZSwgc28gaXQgaXMgdHJ1ZVxuICAgICogIGJ5IGRlZmF1bHRcbiAgICAqL1xuICAgIGhhbmRsZUp1bXBUb1JlZ2V4ID0gKHN0cmluZ1RvU2VhcmNoPzogc3RyaW5nLCBjYXNlU2Vuc2l0aXZlOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgICBjb25zdCB7c2V0dGluZ3M6IHtsZXR0ZXJzLCBqdW1wVG9Bbnl3aGVyZVJlZ2V4fX0gPSB0aGlzXG4gICAgICAgIGNvbnN0IHdoYXRUb0xvb2tBdCA9IHN0cmluZ1RvU2VhcmNoIHx8IGp1bXBUb0FueXdoZXJlUmVnZXg7XG5cbiAgICAgICAgY29uc3QgeyBtb2RlIH0gPSB0aGlzXG5cbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFZJRVdfTU9ERS5TT1VSQ0U6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNYXJrZG93blJlZ2V4KGxldHRlcnMsIHdoYXRUb0xvb2tBdCwgY2FzZVNlbnNpdGl2ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFZJRVdfTU9ERS5MSVZFX1BSRVZJRVc6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNYXJrZG93blJlZ2V4KGxldHRlcnMsIHdoYXRUb0xvb2tBdCwgY2FzZVNlbnNpdGl2ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgVklFV19NT0RFLlBSRVZJRVc6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFZJRVdfTU9ERS5MRUdBQ1k6XG4gICAgICAgICAgICAgICAgY29uc3QgY21FZGl0b3IgPSB0aGlzLmNtRWRpdG9yIGFzIEVkaXRvclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gbmV3IExlZ2FjeVJlZ2V4cFByb2Nlc3NvcihjbUVkaXRvciwgd2hhdFRvTG9va0F0LCBsZXR0ZXJzLCBjYXNlU2Vuc2l0aXZlKS5pbml0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBY3Rpb25zKGxpbmtzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGhhbmRsZU1hcmtkb3duUmVnZXggPSAobGV0dGVyczogc3RyaW5nLCB3aGF0VG9Mb29rQXQ6IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICBjb25zdCBjbTZFZGl0b3IgPSB0aGlzLmNtRWRpdG9yIGFzIEVkaXRvclZpZXdcbiAgICAgICAgY29uc3QgbGl2ZVByZXZpZXdMaW5rcyA9IG5ldyBDTTZSZWdleFByb2Nlc3NvcihjbTZFZGl0b3IsIGxldHRlcnMsIHdoYXRUb0xvb2tBdCwgY2FzZVNlbnNpdGl2ZSkuaW5pdCgpO1xuICAgICAgICBjbTZFZGl0b3IucGx1Z2luKHRoaXMubWFya1ZpZXdQbHVnaW4pLnNldExpbmtzKGxpdmVQcmV2aWV3TGlua3MpO1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UudXBkYXRlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbnMobGl2ZVByZXZpZXdMaW5rcyk7XG4gICAgfVxuXG4gICAgLy8gYWRhcHRlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vbXJqYWNrcGhpbC9vYnNpZGlhbi1qdW1wLXRvLWxpbmsvaXNzdWVzLzM1I2lzc3VlY29tbWVudC0xMDg1OTA1NjY4XG4gICAgaGFuZGxlTGlnaHRzcGVlZEp1bXAoKSB7XG4gICAgICAgIC8vIGdldCBhbGwgdGV4dCBjb2xvclxuICAgICAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgIGlmICghY29udGVudEVsKSB7cmV0dXJufVxuXG4gICAgICAgIC8vIHRoaXMgZWxlbWVudCBkb2Vzbid0IGV4aXN0IGluIGNtNS9oYXMgYSBkaWZmZXJlbnQgY2xhc3MsIHNvIGxpZ2h0c3BlZWQgd2lsbCBub3Qgd29yayBpbiBjbTVcbiAgICAgICAgY29uc3QgY29udGVudENvbnRhaW5lckNvbG9yID0gY29udGVudEVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbS1jb250ZW50Q29udGFpbmVyXCIpO1xuICAgICAgICBjb25zdCBvcmlnaW5hbENvbG9yID0gKGNvbnRlbnRDb250YWluZXJDb2xvclswXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuY29sb3I7XG5cbiAgICAgICAgLy8gY2hhbmdlIGFsbCB0ZXh0IGNvbG9yIHRvIGdyYXlcbiAgICAgICAgKGNvbnRlbnRDb250YWluZXJDb2xvclswXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuY29sb3IgPSAndmFyKC0tanVtcC10by1saW5rLWxpZ2h0c3BlZWQtY29sb3IpJztcblxuICAgICAgICBjb25zdCBrZXlBcnJheTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgY29uc3QgZ3JhYktleSA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIEVzY2FwZSB0byByZWplY3QgdGhlIG1vZGVcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgY29udGVudEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGdyYWJLZXksIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAoY29udGVudENvbnRhaW5lckNvbG9yWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5jb2xvciA9IG9yaWdpbmFsQ29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRlc3QgaWYga2V5cHJlc3MgaXMgY2FwaXRhbGl6ZWRcbiAgICAgICAgICAgIGlmICgvXltcXHdcXFNcXFddJC9pLnRlc3QoZXZlbnQua2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQ2FwaXRhbCA9IGV2ZW50LnNoaWZ0S2V5O1xuICAgICAgICAgICAgICAgIGlmIChpc0NhcGl0YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FwdHVyZSB1cHBlcmNhc2VcbiAgICAgICAgICAgICAgICAgICAga2V5QXJyYXkucHVzaCgoZXZlbnQua2V5KS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXB0dXJlIGxvd2VyY2FzZVxuICAgICAgICAgICAgICAgICAgICBrZXlBcnJheS5wdXNoKGV2ZW50LmtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzdG9wIHdoZW4gbGVuZ3RoIG9mIGFycmF5IGlzIGVxdWFsIHRvIDJcbiAgICAgICAgICAgIGlmIChrZXlBcnJheS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJpbmdUb1NlYXJjaCA9IHRoaXMuc2V0dGluZ3MubGlnaHRzcGVlZEp1bXBUb1N0YXJ0T2ZXb3JkID8gXCJcXFxcYlwiICsga2V5QXJyYXkuam9pbihcIlwiKSA6IGtleUFycmF5LmpvaW4oXCJcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUp1bXBUb1JlZ2V4KHN0cmluZ1RvU2VhcmNoLCB0aGlzLnNldHRpbmdzLmxpZ2h0c3BlZWRDYXNlU2Vuc2l0aXZlKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92aW5nIGV2ZW50TGlzdGVuZXIgYWZ0ZXIgcHJvY2VlZGVkXG4gICAgICAgICAgICAgICAgY29udGVudEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGdyYWJLZXksIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAoY29udGVudENvbnRhaW5lckNvbG9yWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5jb2xvciA9IG9yaWdpbmFsQ29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGVudEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBncmFiS2V5LCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSG90a2V5KGhlbGRTaGlmdEtleTogYm9vbGVhbiwgbGluazogU291cmNlTGlua0hpbnQgfCBMaW5rSGludEJhc2UpIHtcbiAgICAgICAgaWYgKGxpbmsubGlua1RleHQgPT09IHVuZGVmaW5lZCAmJiBsaW5rLmxpbmtFbGVtZW50KSB7XG4gICAgICAgICAgICBsaW5rLmxpbmtFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGluay50eXBlID09PSAnaW50ZXJuYWwnKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKVxuICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgc2Vjb25kIGFyZ3VtZW50IGlzIGZvciB0aGUgbGluayByZXNvbHV0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChkZWNvZGVVUkkobGluay5saW5rVGV4dCksIGZpbGUucGF0aCwgaGVsZFNoaWZ0S2V5LCB7YWN0aXZlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobGluay50eXBlID09PSAnZXh0ZXJuYWwnKSB7XG4gICAgICAgICAgICB3aW5kb3cub3BlbihsaW5rLmxpbmtUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuY21FZGl0b3I7XG4gICAgICAgICAgICBpZiAoZWRpdG9yIGluc3RhbmNlb2YgRWRpdG9yVmlldykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKGxpbmsgYXMgU291cmNlTGlua0hpbnQpLmluZGV4O1xuICAgICAgICAgICAgICAgIGNvbnN0IHt2aW1Nb2RlLCBhbmNob3J9ID0gdGhpcy5jdXJzb3JCZWZvcmVKdW1wO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZVNlbGVjdGlvbiA9IGhlbGRTaGlmdEtleSB8fCAodmltTW9kZSA9PT0gJ3Zpc3VhbCcgfHwgdmltTW9kZSA9PT0gJ3Zpc3VhbCBibG9jaycpXG5cbiAgICAgICAgICAgICAgICBpZiAodXNlU2VsZWN0aW9uICYmIGFuY2hvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5kaXNwYXRjaCh7c2VsZWN0aW9uOiBFZGl0b3JTZWxlY3Rpb24ucmFuZ2UoYW5jaG9yLCBpbmRleCl9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5kaXNwYXRjaCh7IHNlbGVjdGlvbjogRWRpdG9yU2VsZWN0aW9uLmN1cnNvcihpbmRleCkgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3IoZWRpdG9yLnBvc0Zyb21JbmRleCgoPFNvdXJjZUxpbmtIaW50PmxpbmspLmluZGV4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVQb3BvdmVycyhsaW5rSGludEh0bWxFbGVtZW50czogSFRNTEVsZW1lbnRbXSB8IHVuZGVmaW5lZCA9IFtdKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3ID0gdGhpcy5jb250ZW50RWxlbWVudDtcblxuICAgICAgICBjdXJyZW50Vmlldy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMucmVtb3ZlUG9wb3ZlcnMobGlua0hpbnRIdG1sRWxlbWVudHMpKVxuICAgICAgICBsaW5rSGludEh0bWxFbGVtZW50cz8uZm9yRWFjaChlID0+IGUucmVtb3ZlKCkpO1xuICAgICAgICBjdXJyZW50Vmlldy5xdWVyeVNlbGVjdG9yQWxsKCcuamwucG9wb3ZlcicpLmZvckVhY2goZSA9PiBlLnJlbW92ZSgpKTtcblxuICAgICAgICB0aGlzLnByZWZpeEluZm8gPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT0gVklFV19NT0RFLlNPVVJDRSB8fCB0aGlzLm1vZGUgPT0gVklFV19NT0RFLkxJVkVfUFJFVklFVykge1xuICAgICAgICAgICAgKHRoaXMuY21FZGl0b3IgYXMgRWRpdG9yVmlldykucGx1Z2luKHRoaXMubWFya1ZpZXdQbHVnaW4pLmNsZWFuKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnVwZGF0ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5pc0xpbmtIaW50QWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVtb3ZlUG9wb3ZlcnNXaXRob3V0UHJlZml4RXZlbnRLZXkoZXZlbnRLZXk6IHN0cmluZywgbGlua0hpbnRIdG1sRWxlbWVudHM6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBbXSkge1xuICAgICAgICBjb25zdCBjdXJyZW50VmlldyA9IHRoaXMuY29udGVudEVsZW1lbnQ7XG5cbiAgICAgICAgbGlua0hpbnRIdG1sRWxlbWVudHM/LmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5pbm5lckhUTUwubGVuZ3RoID09IDIgJiYgZS5pbm5lckhUTUxbMF0gPT0gZXZlbnRLZXkpIHtcbiAgICAgICAgICAgICAgICBlLmNsYXNzTGlzdC5hZGQoXCJtYXRjaGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY3VycmVudFZpZXcucXVlcnlTZWxlY3RvckFsbCgnLmpsLnBvcG92ZXInKS5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUuaW5uZXJIVE1MLmxlbmd0aCA9PSAyICYmIGUuaW5uZXJIVE1MWzBdID09IGV2ZW50S2V5KSB7XG4gICAgICAgICAgICAgICAgZS5jbGFzc0xpc3QuYWRkKFwibWF0Y2hlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGUucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT0gVklFV19NT0RFLlNPVVJDRSB8fCB0aGlzLm1vZGUgPT0gVklFV19NT0RFLkxJVkVfUFJFVklFVykge1xuICAgICAgICAgICAgKHRoaXMuY21FZGl0b3IgYXMgRWRpdG9yVmlldykucGx1Z2luKHRoaXMubWFya1ZpZXdQbHVnaW4pLmZpbHRlcldpdGhFdmVudEtleShldmVudEtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnVwZGF0ZU9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVBY3Rpb25zKGxpbmtIaW50czogTGlua0hpbnRCYXNlW10sIGxpbmtIaW50SHRtbEVsZW1lbnRzPzogSFRNTEVsZW1lbnRbXSk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IHRoaXMuY29udGVudEVsZW1lbnRcbiAgICAgICAgaWYgKCFsaW5rSGludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsaW5rSGludE1hcDogeyBbbGV0dGVyOiBzdHJpbmddOiBMaW5rSGludEJhc2UgfSA9IHt9O1xuICAgICAgICBsaW5rSGludHMuZm9yRWFjaCh4ID0+IGxpbmtIaW50TWFwW3gubGV0dGVyXSA9IHgpO1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGlmIChbJ1NoaWZ0JywgJ0NvbnRyb2wnLCAnQ2Fwc0xvY2snLCAnU2Nyb2xsTG9jaycsICdHcm91cE5leHQnLCAnTWV0YSddLmluY2x1ZGVzKGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGV2ZW50S2V5ID0gZXZlbnQua2V5LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBwcmVmaXhlcyA9IG5ldyBTZXQoT2JqZWN0LmtleXMobGlua0hpbnRNYXApLmZpbHRlcih4ID0+IHgubGVuZ3RoID4gMSkubWFwKHggPT4geFswXSkpO1xuXG4gICAgICAgICAgICBsZXQgbGlua0hpbnQ6IExpbmtIaW50QmFzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZWZpeEluZm8pIHtcbiAgICAgICAgICAgICAgICBsaW5rSGludCA9IGxpbmtIaW50TWFwW3RoaXMucHJlZml4SW5mby5wcmVmaXggKyBldmVudEtleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpbmtIaW50ID0gbGlua0hpbnRNYXBbZXZlbnRLZXldO1xuICAgICAgICAgICAgICAgIGlmICghbGlua0hpbnQgJiYgcHJlZml4ZXMgJiYgcHJlZml4ZXMuaGFzKGV2ZW50S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWZpeEluZm8gPSB7cHJlZml4OiBldmVudEtleSwgc2hpZnRLZXk6IGV2ZW50LnNoaWZ0S2V5fTtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVQb3BvdmVyc1dpdGhvdXRQcmVmaXhFdmVudEtleShldmVudEtleSwgbGlua0hpbnRIdG1sRWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBjb25zdCBoZWxkU2hpZnRLZXkgPSB0aGlzLnByZWZpeEluZm8/LnNoaWZ0S2V5IHx8IGV2ZW50LnNoaWZ0S2V5O1xuXG4gICAgICAgICAgICBsaW5rSGludCAmJiB0aGlzLmhhbmRsZUhvdGtleShoZWxkU2hpZnRLZXksIGxpbmtIaW50KTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVQb3BvdmVycyhsaW5rSGludEh0bWxFbGVtZW50cyk7XG4gICAgICAgICAgICBjb250ZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93biwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChsaW5rSGludHMubGVuZ3RoID09PSAxICYmIHRoaXMuc2V0dGluZ3MuanVtcFRvTGlua0lmT25lTGlua09ubHkpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlbGRTaGlmdEtleSA9IHRoaXMucHJlZml4SW5mbz8uc2hpZnRLZXk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUhvdGtleShoZWxkU2hpZnRLZXksIGxpbmtIaW50c1swXSk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBvcG92ZXJzKGxpbmtIaW50SHRtbEVsZW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnJlbW92ZVBvcG92ZXJzKGxpbmtIaW50SHRtbEVsZW1lbnRzKSlcbiAgICAgICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5pc0xpbmtIaW50QWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb2RlTWlycm9yJ3MgdmltIGF1dG9tYXRpY2FsbHkgZXhpdHMgdmlzdWFsIG1vZGUgd2hlbiBleGVjdXRpbmcgYSBjb21tYW5kLlxuICAgICAqIFRoaXMga2VlcHMgdHJhY2sgb2Ygc2VsZWN0aW9uIGNoYW5nZXMgc28gd2UgY2FuIHJlc3RvcmUgdGhlIHNlbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgdGhlIHNhbWUgYXBwcm9hY2ggdGFrZW4gYnkgdGhlIG9ic2lkaWFuLXZpbXJjLXBsdWdpblxuICAgICAqL1xuICAgIHdhdGNoRm9yU2VsZWN0aW9uQ2hhbmdlKCkge1xuICAgICAgICBjb25zdCB1cGRhdGVTZWxlY3Rpb24gPSB0aGlzLnVwZGF0ZVNlbGVjdGlvbi5iaW5kKHRoaXMpXG4gICAgICAgIGNvbnN0IHdhdGNoRm9yQ2hhbmdlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk/LmVkaXRvcjtcbiAgICAgICAgICAgIGNvbnN0IGNtOiBFZGl0b3IgfCB1bmRlZmluZWQgPSAoZWRpdG9yIGFzIGFueSk/LmNtPy5jbTtcblxuICAgICAgICAgICAgaWYgKGNtICYmICEoY20gYXMgYW55KS5faGFuZGxlcnMuY3Vyc29yQWN0aXZpdHkuaW5jbHVkZXModXBkYXRlU2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGNtLm9uKFwiY3Vyc29yQWN0aXZpdHlcIiwgdXBkYXRlU2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyKCgpID0+IGNtLm9mZihcImN1cnNvckFjdGl2aXR5XCIsIHVwZGF0ZVNlbGVjdGlvbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJhY3RpdmUtbGVhZi1jaGFuZ2VcIiwgd2F0Y2hGb3JDaGFuZ2VzKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJmaWxlLW9wZW5cIiwgd2F0Y2hGb3JDaGFuZ2VzKSk7XG4gICAgICAgIHdhdGNoRm9yQ2hhbmdlcygpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvbihlZGl0b3I6IEVkaXRvcikge1xuICAgICAgICBjb25zdCBhbmNob3IgPSBlZGl0b3IubGlzdFNlbGVjdGlvbnMoKVswXT8uYW5jaG9yXG4gICAgICAgIHRoaXMuY3VycmVudEN1cnNvciA9IHtcbiAgICAgICAgICAgIGFuY2hvcjogYW5jaG9yID8gZWRpdG9yLmluZGV4RnJvbVBvcyhhbmNob3IpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmltTW9kZTogZWRpdG9yLnN0YXRlLnZpbT8ubW9kZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gICAgcGx1Z2luOiBKdW1wVG9MaW5rXG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBKdW1wVG9MaW5rKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgcGx1Z2luKVxuXG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luXG4gICAgfVxuXG4gICAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHtjb250YWluZXJFbH0gPSB0aGlzO1xuXG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdTZXR0aW5ncyBmb3IgSnVtcCBUbyBMaW5rLid9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdDaGFyYWN0ZXJzIHVzZWQgZm9yIGxpbmsgaGludHMnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1RoZSBjaGFyYWN0ZXJzIHBsYWNlZCBuZXh0IHRvIGVhY2ggbGluayBhZnRlciBlbnRlciBsaW5rLWhpbnQgbW9kZS4nKVxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4ge1xuICAgICAgICAgICAgICAgIGNiLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxldHRlcnMpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubGV0dGVycyA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncylcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ0p1bXAgVG8gQW55d2hlcmUnKVxuICAgICAgICAgICAgLnNldERlc2MoXCJSZWdleCBiYXNlZCBuYXZpZ2F0aW5nIGluIGVkaXRvciBtb2RlXCIpXG4gICAgICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignQ3VzdG9tIFJlZ2V4JylcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmp1bXBUb0FueXdoZXJlUmVnZXgpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmp1bXBUb0FueXdoZXJlUmVnZXggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnTGlnaHRzcGVlZCByZWdleCBjYXNlIHNlbnNpdGl2aXR5JylcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgICdJZiBlbmFibGVkLCB0aGUgcmVnZXggZm9yIG1hdGNoaW5nIHdpbGwgYmUgY2FzZSBzZW5zaXRpdmUuJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxpZ2h0c3BlZWRDYXNlU2Vuc2l0aXZlKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmxpZ2h0c3BlZWRDYXNlU2Vuc2l0aXZlID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ0p1bXAgdG8gTGluayBJZiBPbmx5IE9uZSBMaW5rIEluIFBhZ2UnKVxuICAgICAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgICAgICAgJ0lmIGVuYWJsZWQsIGF1dG8ganVtcCB0byBsaW5rIGlmIHRoZXJlIGlzIG9ubHkgb25lIGxpbmsgaW4gcGFnZSdcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5qdW1wVG9MaW5rSWZPbmVMaW5rT25seSlcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jIChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5qdW1wVG9MaW5rSWZPbmVMaW5rT25seSA9IHN0YXRlO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdMaWdodHNwZWVkIG9ubHkganVtcHMgdG8gc3RhcnQgb2Ygd29yZHMnKVxuICAgICAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgICAgICAgJ0lmIGVuYWJsZWQsIGxpZ2h0c3BlZWQganVtcHMgd2lsbCBvbmx5IHRhcmdldCBjaGFyYWN0ZXJzIG9jY3VyaW5nIGF0IHRoZSBzdGFydCBvZiB3b3Jkcy4nXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcbiAgICAgICAgICAgICAgICB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGlnaHRzcGVlZEp1bXBUb1N0YXJ0T2ZXb3JkKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmxpZ2h0c3BlZWRKdW1wVG9TdGFydE9mV29yZCA9IHN0YXRlO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiV2lkZ2V0VHlwZSIsIkRlY29yYXRpb24iLCJQbHVnaW4iLCJWaWV3UGx1Z2luIiwiTWFya2Rvd25WaWV3IiwiZWRpdG9yTGl2ZVByZXZpZXdGaWVsZCIsIkVkaXRvclZpZXciLCJFZGl0b3JTZWxlY3Rpb24iLCJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW9HQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBNk1EO0FBQ3VCLE9BQU8sZUFBZSxLQUFLLFVBQVUsR0FBRyxlQUFlLEdBQUcsVUFBVSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtBQUN2SCxJQUFJLElB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
