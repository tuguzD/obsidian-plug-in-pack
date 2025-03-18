var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// src/main.ts
var import_obsidian13 = require("obsidian");

// src/settings/data.ts
var DEFAULT_SETTINGS = {
  PERSISTENCE: false,
  // 筛选
  FILTER_TAG: "",
  FILTER_GROUP: "",
  FILTER_DELAY: "",
  LANGUAGE: "zh-cn",
  CENTER: false,
  ITEM_STYLE: "alwaysExpand",
  GROUP_STYLE: "a",
  TAG_STYLE: "b",
  DELAY: false,
  FADE_OUT_DISABLED_PLUGINS: true,
  COMMAND_ITEM: false,
  COMMAND_GROUP: false,
  GROUPS: [
    {
      "id": "default",
      "name": "\u9ED8\u8BA4\u7EC4",
      "color": "#A079FF"
    }
  ],
  TAGS: [
    {
      "id": "default",
      "name": "\u9ED8\u8BA4\u6807\u7B7E",
      "color": "#A079FF"
    }
  ],
  DELAYS: [
    {
      "id": "default",
      "name": "\u9ED8\u8BA4\u5EF6\u8FDF",
      "time": 10
    }
  ],
  Plugins: []
};

// src/settings/index.ts
var import_obsidian12 = require("obsidian");

// src/settings/base-setting.ts
var BaseSetting = class {
  constructor(obj) {
    this.settingTab = obj;
    this.manager = obj.manager;
    this.settings = obj.manager.settings;
    this.containerEl = obj.contentEl;
    this.app = obj.app;
  }
  display() {
    this.main();
  }
};

// src/settings/ui/manager-basis.ts
var import_obsidian8 = require("obsidian");

// src/modal/manager-modal.ts
var path = __toESM(require("path"));
var import_obsidian7 = require("obsidian");

// src/utils.ts
var import_obsidian = require("obsidian");
var import_child_process = require("child_process");
var managerOpen = (dir, manager) => {
  if (import_obsidian.Platform.isDesktop) {
    (0, import_child_process.exec)(`start "" "${dir}"`, (error) => {
      if (error) {
        new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u5931\u8D25_\u6587\u672C"));
      } else {
        new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u6210\u529F_\u6587\u672C"));
      }
    });
  }
  if (import_obsidian.Platform.isMacOS) {
    (0, import_child_process.exec)(`open ${dir}`, (error) => {
      if (error) {
        new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u5931\u8D25_\u6587\u672C"));
      } else {
        new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u6210\u529F_\u6587\u672C"));
      }
    });
  }
};

// src/modal/group-modal.ts
var import_obsidian2 = require("obsidian");
var GroupModal = class extends import_obsidian2.Modal {
  constructor(app, manager, managerModal, managerPlugin) {
    super(app);
    this.settings = manager.settings;
    this.manager = manager;
    this.managerModal = managerModal;
    this.managerPlugin = managerPlugin;
    this.selected = "";
    this.add = false;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian2.Setting(this.titleEl).setClass("manager-bar__title").setName(`[${this.managerPlugin.name}]`);
    const closeButton = new import_obsidian2.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    for (const group of this.settings.GROUPS) {
      const itemEl = new import_obsidian2.Setting(this.contentEl);
      itemEl.setClass("manager-editor__item");
      if (this.selected == "" || this.selected != group.id) {
        itemEl.addExtraButton(
          (cb) => cb.setIcon("settings").onClick(() => {
            this.selected = group.id;
            this.reloadShowData();
          })
        );
        itemEl.addToggle(
          (cb) => cb.setValue(group.id === this.managerPlugin.group).onChange(() => {
            this.managerPlugin.group = this.managerPlugin.group === group.id ? "" : group.id;
            this.manager.saveSettings();
            this.managerModal.reloadShowData();
            this.reloadShowData();
          })
        );
        const groupEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(groupEl);
        const tag = this.manager.createTag(group.name, group.color, this.settings.GROUP_STYLE);
        groupEl.appendChild(tag);
      }
      if (this.selected != "" && this.selected == group.id) {
        itemEl.addColorPicker(
          (cb) => cb.setValue(group.color).onChange((value) => {
            group.color = value;
            this.manager.saveSettings();
            this.reloadShowData();
          })
        );
        itemEl.addText(
          (cb) => cb.setValue(group.name).onChange((value) => {
            group.name = value;
            this.manager.saveSettings();
          }).inputEl.addClass("manager-editor__item-input")
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("trash-2").onClick(() => {
            const hasTestGroup = this.settings.Plugins.some((plugin) => plugin.group === group.id);
            if (!hasTestGroup) {
              this.manager.settings.GROUPS = this.manager.settings.GROUPS.filter((t) => t.id !== group.id);
              this.manager.saveSettings();
              this.reloadShowData();
              command_default(this.app, this.manager);
              new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
            } else {
              new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
            }
          })
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("save").onClick(() => {
            this.selected = "";
            this.reloadShowData();
            this.managerModal.reloadShowData();
          })
        );
        const groupEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(groupEl);
        const tag = this.manager.createTag(group.name, group.color, this.settings.GROUP_STYLE);
        groupEl.appendChild(tag);
      }
    }
    if (this.add) {
      let id = "";
      let name = "";
      let color = "";
      const foodBar = new import_obsidian2.Setting(this.contentEl).setClass("manager-bar__title");
      foodBar.infoEl.remove();
      foodBar.addColorPicker(
        (cb) => cb.setValue(color).onChange((value) => {
          color = value;
        })
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder("ID").onChange((value) => {
          id = value;
          this.manager.saveSettings();
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
          name = value;
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addExtraButton(
        (cb) => cb.setIcon("plus").onClick(() => {
          const containsId = this.manager.settings.GROUPS.some((tag) => tag.id === id);
          if (!containsId && id !== "") {
            if (color === "")
              color = "#000000";
            this.manager.settings.GROUPS.push({ id, name, color });
            this.manager.saveSettings();
            this.add = false;
            this.reloadShowData();
            command_default(this.app, this.manager);
            new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
          } else {
            new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
          }
        })
      );
    } else {
      const foodBar = new import_obsidian2.Setting(this.contentEl).setClass("manager-bar__title").setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C"));
      const addButton = new import_obsidian2.ExtraButtonComponent(foodBar.controlEl);
      addButton.setIcon("circle-plus");
      addButton.onClick(() => {
        this.add = true;
        this.reloadShowData();
      });
    }
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    await this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/tags-modal.ts
var import_obsidian3 = require("obsidian");
var TagsModal = class extends import_obsidian3.Modal {
  constructor(app, manager, managerModal, managerPlugin) {
    super(app);
    this.settings = manager.settings;
    this.manager = manager;
    this.managerModal = managerModal;
    this.managerPlugin = managerPlugin;
    this.selected = "";
    this.add = false;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian3.Setting(this.titleEl).setClass("manager-bar__title").setName(this.managerPlugin.name);
    const closeButton = new import_obsidian3.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    for (const tag of this.settings.TAGS) {
      const itemEl = new import_obsidian3.Setting(this.contentEl);
      itemEl.setClass("manager-editor__item");
      if (this.selected == "" || this.selected != tag.id) {
        itemEl.addExtraButton(
          (cb) => cb.setIcon("settings").onClick(() => {
            this.selected = tag.id;
            this.reloadShowData();
          })
        );
        itemEl.addToggle(
          (cb) => cb.setValue(this.managerPlugin.tags.includes(tag.id)).onChange((isChecked) => {
            if (isChecked) {
              if (!this.managerPlugin.tags.includes(tag.id)) {
                this.managerPlugin.tags.push(tag.id);
              }
            } else {
              this.managerPlugin.tags = this.managerPlugin.tags.filter((t) => t !== tag.id);
            }
            this.manager.saveSettings();
            this.managerModal.reloadShowData();
          })
        );
        const tempEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(tempEl);
        const tagEl = this.manager.createTag(tag.name, tag.color, this.settings.TAG_STYLE);
        tempEl.appendChild(tagEl);
      }
      if (this.selected != "" && this.selected == tag.id) {
        itemEl.addColorPicker(
          (cb) => cb.setValue(tag.color).onChange((value) => {
            tag.color = value;
            this.manager.saveSettings();
            this.reloadShowData();
          })
        );
        itemEl.addText(
          (cb) => cb.setValue(tag.name).onChange((value) => {
            tag.name = value;
            this.manager.saveSettings();
          }).inputEl.addClass("manager-editor__item-input")
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("trash-2").onClick(() => {
            const hasTestTag = this.settings.Plugins.some((plugin) => plugin.tags && plugin.tags.includes(tag.id));
            if (!hasTestTag) {
              this.manager.settings.TAGS = this.manager.settings.TAGS.filter((t) => t.id !== tag.id);
              this.manager.saveSettings();
              this.reloadShowData();
              command_default(this.app, this.manager);
              new import_obsidian3.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
            } else {
              new import_obsidian3.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
            }
          })
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("save").onClick(() => {
            this.selected = "";
            this.reloadShowData();
            this.managerModal.reloadShowData();
          })
        );
        const groupEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(groupEl);
        const tagEl = this.manager.createTag(tag.name, tag.color, this.settings.TAG_STYLE);
        groupEl.appendChild(tagEl);
      }
    }
    if (this.add) {
      let id = "";
      let name = "";
      let color = "";
      const foodBar = new import_obsidian3.Setting(this.contentEl).setClass("manager-bar__title");
      foodBar.infoEl.remove();
      foodBar.addColorPicker(
        (cb) => cb.setValue(color).onChange((value) => {
          color = value;
        })
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder("ID").onChange((value) => {
          id = value;
          this.manager.saveSettings();
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
          name = value;
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addExtraButton(
        (cb) => cb.setIcon("plus").onClick(() => {
          const containsId = this.manager.settings.TAGS.some((tag) => tag.id === id);
          if (!containsId && id !== "") {
            if (color === "")
              color = "#000000";
            this.manager.settings.TAGS.push({ id, name, color });
            this.manager.saveSettings();
            this.add = false;
            this.reloadShowData();
            command_default(this.app, this.manager);
            new import_obsidian3.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
          } else {
            new import_obsidian3.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
          }
        })
      );
    } else {
      const foodBar = new import_obsidian3.Setting(this.contentEl).setClass("manager-bar__title").setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C"));
      const addButton = new import_obsidian3.ExtraButtonComponent(foodBar.controlEl);
      addButton.setIcon("circle-plus");
      addButton.onClick(() => {
        this.add = true;
        this.reloadShowData();
      });
    }
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    await this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/delete-modal.ts
var import_obsidian4 = require("obsidian");
var DeleteModal = class extends import_obsidian4.Modal {
  constructor(app, manager, deleteCallback) {
    super(app);
    this.manager = manager;
    this.deleteCallback = deleteCallback;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian4.Setting(this.titleEl);
    titleBar.setClass("manager-delete__title");
    titleBar.setName(this.manager.translator.t("\u5378\u8F7D_\u6807\u9898"));
    const closeButton = new import_obsidian4.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    const titleBar = new import_obsidian4.Setting(this.titleEl);
    titleBar.setName(this.manager.translator.t("\u5378\u8F7D_\u63D0\u793A"));
    const actionBar = new import_obsidian4.Setting(this.titleEl);
    actionBar.setClass("manager-delete__action");
    actionBar.addButton(
      (cb) => cb.setWarning().setButtonText(this.manager.translator.t("\u5378\u8F7D_\u5378\u8F7D")).onClick(() => {
        this.deleteCallback();
        this.close();
      })
    );
    actionBar.addButton(
      (cb) => cb.setButtonText(this.manager.translator.t("\u5378\u8F7D_\u53D6\u6D88")).onClick(() => {
        this.close();
      })
    );
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/disable-modal.ts
var import_obsidian5 = require("obsidian");
var DisableModal = class extends import_obsidian5.Modal {
  constructor(app, manager, deleteCallback) {
    super(app);
    this.manager = manager;
    this.deleteCallback = deleteCallback;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian5.Setting(this.titleEl);
    titleBar.setClass("manager-delete__title");
    titleBar.setName(this.manager.translator.t("\u4E00\u952E_\u6807\u9898"));
    const closeButton = new import_obsidian5.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    const titleBar = new import_obsidian5.Setting(this.titleEl);
    titleBar.setName(this.manager.translator.t("\u4E00\u952E_\u63D0\u793A"));
    const actionBar = new import_obsidian5.Setting(this.titleEl);
    actionBar.setClass("manager-delete__action");
    actionBar.addButton(
      (cb) => cb.setCta().setButtonText(this.manager.translator.t("\u4E00\u952E_\u542F\u7981")).onClick(() => {
        this.deleteCallback();
        this.close();
      })
    );
    actionBar.addButton(
      (cb) => cb.setButtonText(this.manager.translator.t("\u4E00\u952E_\u53D6\u6D88")).onClick(() => {
        this.close();
      })
    );
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/note-modal.ts
var import_obsidian6 = require("obsidian");
var NoteModal = class extends import_obsidian6.Modal {
  constructor(app, manager, managerPlugin) {
    super(app);
    this.settings = manager.settings;
    this.manager = manager;
    this.managerPlugin = managerPlugin;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-note__container");
    modalEl.removeChild(
      modalEl.getElementsByClassName("modal-close-button")[0]
    );
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian6.Setting(this.titleEl).setClass("manager-bar__title").setName(`${this.managerPlugin.name}\u7684\u7B14\u8BB0`);
    const closeButton = new import_obsidian6.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    const textArea = new import_obsidian6.TextAreaComponent(this.contentEl);
    textArea.setValue(this.managerPlugin.note);
    textArea.onChange((newValue) => {
      this.managerPlugin.note = newValue;
      this.manager.saveSettings();
    });
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    await this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/manager-modal.ts
var ManagerModal = class extends import_obsidian7.Modal {
  constructor(app, manager) {
    super(app);
    // [本地][变量] 展示插件列表
    this.displayPlugins = [];
    // 分组内容
    this.group = "";
    // 标签内容
    this.tag = "";
    // 标签内容
    this.delay = "";
    // 未分组
    this.noGroup = false;
    // 搜索内容
    this.searchText = "";
    // 仅启用
    this.onlyEnabled = false;
    // 编辑模式
    this.editorMode = false;
    // 测试模式
    this.developerMode = false;
    this.appSetting = this.app.setting;
    this.appPlugins = this.app.plugins;
    this.manager = manager;
    this.settings = manager.settings;
    this.basePath = path.normalize(this.app.vault.adapter.getBasePath());
    manager.synchronizePlugins(
      Object.values(this.appPlugins.manifests).filter(
        (pm) => pm.id !== manager.manifest.id
      )
    );
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-container");
    if (!this.settings.CENTER)
      modalEl.addClass("manager-container__top");
    modalEl.removeChild(
      modalEl.getElementsByClassName("modal-close-button")[0]
    );
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    this.footEl = document.createElement("div");
    this.footEl.addClass("manager-food");
    this.modalEl.appendChild(this.footEl);
    const actionBar = new import_obsidian7.Setting(this.titleEl).setClass("manager-bar__action").setName(this.manager.translator.t("\u901A\u7528_\u64CD\u4F5C_\u6587\u672C"));
    const githubButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    githubButton.setIcon("github");
    githubButton.setTooltip(
      this.manager.translator.t("\u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0")
    );
    githubButton.onClick(() => {
      window.open(this.manager.manifest.authorUrl);
    });
    const tutorialButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    tutorialButton.setIcon("book-open");
    tutorialButton.setTooltip(
      this.manager.translator.t("\u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0")
    );
    tutorialButton.onClick(() => {
      window.open("https://www.bilibili.com/video/BV1WyrkYMEce/");
    });
    const reloadButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    reloadButton.setIcon("refresh-ccw");
    reloadButton.setTooltip(
      this.manager.translator.t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0")
    );
    reloadButton.onClick(async () => {
      new import_obsidian7.Notice("\u91CD\u65B0\u52A0\u8F7D\u7B2C\u4E09\u65B9\u63D2\u4EF6");
      await this.appPlugins.loadManifests();
      this.reloadShowData();
    });
    const updateButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    updateButton.setIcon("rss");
    updateButton.setTooltip(
      this.manager.translator.t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0")
    );
    updateButton.onClick(async () => {
      try {
        await this.appPlugins.checkForUpdates();
        this.appSetting.open();
        this.appSetting.openTabById("community-plugins");
      } catch (error) {
        console.error("\u68C0\u67E5\u66F4\u65B0\u65F6\u51FA\u9519:", error);
      }
    });
    const disableButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    disableButton.setIcon("square");
    disableButton.setTooltip(
      this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0")
    );
    disableButton.onClick(async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (this.settings.DELAY) {
            const ManagerPlugin = this.settings.Plugins.find(
              (p) => p.id === plugin.id
            );
            if (ManagerPlugin && ManagerPlugin.enabled) {
              await this.appPlugins.disablePlugin(plugin.id);
              ManagerPlugin.enabled = false;
              this.manager.saveSettings();
              this.reloadShowData();
            }
          } else {
            if (this.appPlugins.enabledPlugins.has(plugin.id)) {
              await this.appPlugins.disablePluginAndSave(
                plugin.id
              );
              this.reloadShowData();
            }
          }
          command_default(this.app, this.manager);
        }
      }).open();
    });
    const enableButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    enableButton.setIcon("square-check");
    enableButton.setTooltip(
      this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0")
    );
    enableButton.onClick(async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (this.settings.DELAY) {
            const ManagerPlugin = this.manager.settings.Plugins.find(
              (mp) => mp.id === plugin.id
            );
            if (ManagerPlugin && !ManagerPlugin.enabled) {
              await this.appPlugins.enablePlugin(plugin.id);
              ManagerPlugin.enabled = true;
              this.manager.saveSettings();
              this.reloadShowData();
            }
          } else {
            if (!this.appPlugins.enabledPlugins.has(plugin.id)) {
              await this.appPlugins.enablePluginAndSave(
                plugin.id
              );
              this.reloadShowData();
            }
          }
          command_default(this.app, this.manager);
        }
      }).open();
    });
    const editorButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
    editorButton.setTooltip(
      this.manager.translator.t("\u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0")
    );
    editorButton.onClick(() => {
      this.editorMode = !this.editorMode;
      this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
      this.reloadShowData();
    });
    const settingsButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    settingsButton.setIcon("settings");
    settingsButton.setTooltip(
      this.manager.translator.t("\u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0")
    );
    settingsButton.onClick(() => {
      this.appSetting.open();
      this.appSetting.openTabById(this.manager.manifest.id);
      this.close();
    });
    if (this.developerMode) {
      const testButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
      testButton.setIcon("refresh-ccw");
      testButton.setTooltip("\u5237\u65B0\u63D2\u4EF6");
      testButton.onClick(async () => {
        this.close();
        await this.appPlugins.disablePlugin(this.manager.manifest.id);
        await this.appPlugins.enablePlugin(this.manager.manifest.id);
      });
    }
    const searchBar = new import_obsidian7.Setting(this.titleEl).setClass("manager-bar__search").setName(this.manager.translator.t("\u901A\u7528_\u641C\u7D22_\u6587\u672C"));
    const noGroupBar = new import_obsidian7.ButtonComponent(searchBar.controlEl).setIcon(
      "group"
    );
    noGroupBar.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u672A\u5206\u7EC4_\u63CF\u8FF0"));
    noGroupBar.onClick(() => {
      this.noGroup = !this.noGroup;
      this.reloadShowData();
    });
    const onlyEnabled = new import_obsidian7.ButtonComponent(searchBar.controlEl);
    this.onlyEnabled ? onlyEnabled.setIcon("toggle-right") : onlyEnabled.setIcon("toggle-left");
    onlyEnabled.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0"));
    onlyEnabled.onClick(() => {
      this.onlyEnabled = !this.onlyEnabled;
      this.onlyEnabled ? onlyEnabled.setIcon("toggle-right") : onlyEnabled.setIcon("toggle-left");
      this.reloadShowData();
    });
    const groupCounts = this.settings.Plugins.reduce(
      (acc, plugin) => {
        const groupId = plugin.group || "";
        acc[groupId] = (acc[groupId] || 0) + 1;
        return acc;
      },
      { "": 0 }
    );
    const groups = this.settings.GROUPS.reduce(
      (acc, item) => {
        acc[item.id] = `${item.name} (${groupCounts[item.id] || 0})`;
        return acc;
      },
      { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C") }
    );
    const groupsDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
    groupsDropdown.addOptions(groups);
    groupsDropdown.setValue(
      this.settings.PERSISTENCE ? this.settings.FILTER_GROUP : this.group
    );
    groupsDropdown.onChange((value) => {
      if (this.settings.PERSISTENCE) {
        this.settings.FILTER_GROUP = value;
        this.manager.saveSettings();
      } else {
        this.group = value;
      }
      this.reloadShowData();
    });
    const tagCounts = this.settings.Plugins.reduce((acc, plugin) => {
      plugin.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const tags = this.settings.TAGS.reduce(
      (acc, item) => {
        acc[item.id] = `${item.name} (${tagCounts[item.id] || 0})`;
        return acc;
      },
      { "": this.manager.translator.t("\u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C") }
    );
    const tagsDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
    tagsDropdown.addOptions(tags);
    tagsDropdown.setValue(
      this.settings.PERSISTENCE ? this.settings.FILTER_TAG : this.tag
    );
    tagsDropdown.onChange((value) => {
      if (this.settings.PERSISTENCE) {
        this.settings.FILTER_TAG = value;
        this.manager.saveSettings();
      } else {
        this.tag = value;
      }
      this.reloadShowData();
    });
    if (this.settings.DELAY) {
      const delayCounts = this.settings.Plugins.reduce(
        (acc, plugin) => {
          const delay = plugin.delay || "";
          acc[delay] = (acc[delay] || 0) + 1;
          return acc;
        },
        { "": 0 }
      );
      const delays = this.settings.DELAYS.reduce(
        (acc, item) => {
          acc[item.id] = `${item.name} (${delayCounts[item.id] || 0})`;
          return acc;
        },
        { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C") }
      );
      const delaysDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
      delaysDropdown.addOptions(delays);
      delaysDropdown.setValue(
        this.settings.PERSISTENCE ? this.settings.FILTER_DELAY : this.delay
      );
      delaysDropdown.onChange((value) => {
        if (this.settings.PERSISTENCE) {
          this.settings.FILTER_DELAY = value;
          this.manager.saveSettings();
        } else {
          this.delay = value;
        }
        this.reloadShowData();
      });
    }
    this.searchEl = new import_obsidian7.SearchComponent(searchBar.controlEl);
    this.searchEl.onChange((value) => {
      this.searchText = value;
      this.reloadShowData();
    });
  }
  async showData() {
    const plugins = Object.values(
      this.appPlugins.manifests
    );
    plugins.sort((item1, item2) => {
      return item1.name.localeCompare(item2.name);
    });
    this.displayPlugins = [];
    for (const plugin of plugins) {
      const ManagerPlugin = this.manager.settings.Plugins.find(
        (mp) => mp.id === plugin.id
      );
      const pluginDir = path.join(
        this.basePath,
        plugin.dir ? plugin.dir : ""
      );
      const isEnabled = this.settings.DELAY ? ManagerPlugin == null ? void 0 : ManagerPlugin.enabled : this.appPlugins.enabledPlugins.has(plugin.id);
      if (ManagerPlugin) {
        if (this.onlyEnabled && !isEnabled)
          continue;
        if (this.noGroup && !(ManagerPlugin.group == ""))
          continue;
        if (this.settings.PERSISTENCE) {
          if (this.settings.FILTER_GROUP !== "" && ManagerPlugin.group !== this.settings.FILTER_GROUP)
            continue;
          if (this.settings.FILTER_TAG !== "" && !ManagerPlugin.tags.includes(this.settings.FILTER_TAG))
            continue;
          if (this.settings.FILTER_DELAY !== "" && ManagerPlugin.delay !== this.settings.FILTER_DELAY)
            continue;
        } else {
          if (this.group !== "" && ManagerPlugin.group !== this.group)
            continue;
          if (this.tag !== "" && !ManagerPlugin.tags.includes(this.tag))
            continue;
          if (this.delay !== "" && ManagerPlugin.delay !== this.delay)
            continue;
        }
        if (this.searchText !== "" && ManagerPlugin.name.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && ManagerPlugin.desc.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && plugin.author.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1)
          continue;
        if (plugin.id === this.manager.manifest.id)
          continue;
        const itemEl = new import_obsidian7.Setting(this.contentEl);
        itemEl.setClass("manager-item");
        itemEl.nameEl.addClass("manager-item__name-container");
        itemEl.descEl.addClass("manager-item__description-container");
        itemEl.settingEl.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          const menu = new import_obsidian7.Menu();
          menu.addSeparator();
          menu.addItem(
            (item) => item.setTitle(
              this.manager.translator.t("\u83DC\u5355_\u7B14\u8BB0_\u6807\u9898")
            ).setIcon("notebook-pen").onClick(() => {
              new NoteModal(
                this.app,
                this.manager,
                ManagerPlugin
              ).open();
            })
          );
          menu.addItem(
            (item) => item.setTitle(
              this.manager.translator.t("\u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898")
            ).setIcon("circle-plus").onClick(async () => {
              await this.appSetting.open();
              await this.appSetting.openTabById("hotkeys");
              const tab = await this.appSetting.activeTab;
              tab.searchComponent.inputEl.value = plugin.id;
              tab.updateHotkeyVisibility();
              tab.searchComponent.inputEl.blur();
            })
          );
          menu.addItem(
            (item) => item.setTitle(
              this.manager.translator.t("\u83DC\u5355_GitHub_\u6807\u9898")
            ).setIcon("github").onClick(async () => {
              if (plugin.authorUrl) {
                window.open(
                  path.join(plugin.authorUrl, plugin.id)
                );
              }
            })
          );
          menu.addItem(
            (item) => item.setTitle("\u5355\u6B21\u542F\u52A8").setIcon("repeat-1").setDisabled(isEnabled).onClick(async () => {
              new import_obsidian7.Notice("\u5F00\u542F\u4E2D\uFF0C\u8BF7\u7A0D\u7B49");
              await this.appPlugins.enablePlugin(plugin.id);
            })
          );
          menu.showAtPosition({ x: event.clientX, y: event.clientY });
        });
        if (this.settings.FADE_OUT_DISABLED_PLUGINS && !isEnabled)
          itemEl.settingEl.addClass("inactive");
        this.displayPlugins.push(plugin);
        if (!this.editorMode) {
          switch (this.settings.ITEM_STYLE) {
            case "alwaysExpand":
              itemEl.descEl.addClass("manager-display-block");
              break;
            case "neverExpand":
              itemEl.descEl.addClass("manager-display-none");
              break;
            case "hoverExpand":
              itemEl.descEl.addClass("manager-display-none");
              itemEl.settingEl.addEventListener(
                "mouseenter",
                () => {
                  itemEl.descEl.removeClass(
                    "manager-display-none"
                  );
                  itemEl.descEl.addClass(
                    "manager-display-block"
                  );
                }
              );
              itemEl.settingEl.addEventListener(
                "mouseleave",
                () => {
                  itemEl.descEl.removeClass(
                    "manager-display-block"
                  );
                  itemEl.descEl.addClass(
                    "manager-display-none"
                  );
                }
              );
              break;
            case "clickExpand":
              itemEl.descEl.addClass("manager-display-none");
              itemEl.settingEl.addEventListener(
                "click",
                function(event) {
                  const excludedButtons = Array.from(
                    itemEl.controlEl.querySelectorAll("div")
                  );
                  if (
                    // @ts-ignore
                    excludedButtons.includes(event.target)
                  ) {
                    event.stopPropagation();
                    return;
                  }
                  if (itemEl.descEl.hasClass(
                    "manager-display-none"
                  )) {
                    itemEl.descEl.removeClass(
                      "manager-display-none"
                    );
                    itemEl.descEl.addClass(
                      "manager-display-block"
                    );
                  } else {
                    itemEl.descEl.removeClass(
                      "manager-display-block"
                    );
                    itemEl.descEl.addClass(
                      "manager-display-none"
                    );
                  }
                }
              );
              break;
          }
        }
        if (ManagerPlugin.group !== "") {
          const group = createSpan({
            cls: "manager-item__name-group"
          });
          itemEl.nameEl.appendChild(group);
          const item = this.settings.GROUPS.find(
            (t) => t.id === ManagerPlugin.group
          );
          if (item) {
            const tag = this.manager.createTag(
              item.name,
              item.color,
              this.settings.GROUP_STYLE
            );
            if (this.editorMode)
              tag.onclick = () => {
                new GroupModal(
                  this.app,
                  this.manager,
                  this,
                  ManagerPlugin
                ).open();
              };
            group.appendChild(tag);
          }
        }
        if (ManagerPlugin.group === "" && this.editorMode) {
          const group = createSpan({
            cls: "manager-item__name-group"
          });
          if (this.editorMode)
            itemEl.nameEl.appendChild(group);
          const tag = this.manager.createTag("+", "", "");
          if (this.editorMode)
            tag.onclick = () => {
              new GroupModal(
                this.app,
                this.manager,
                this,
                ManagerPlugin
              ).open();
            };
          if (this.editorMode)
            group.appendChild(tag);
        }
        const title = createSpan({
          text: ManagerPlugin.name,
          title: plugin.name,
          cls: "manager-item__name-title"
        });
        if (this.editorMode) {
          title.setAttribute(
            "style",
            "border-width: 1px;border-style: dashed;"
          );
          title.setAttribute("contenteditable", "true");
          title.addEventListener("input", () => {
            if (title.textContent) {
              ManagerPlugin.name = title.textContent;
              this.manager.saveSettings();
              command_default(this.app, this.manager);
            }
          });
        }
        itemEl.nameEl.appendChild(title);
        const version = createSpan({
          text: `[${plugin.version}]`,
          cls: ["manager-item__name-version"]
        });
        itemEl.nameEl.appendChild(version);
        if (this.settings.DELAY && !this.editorMode && ManagerPlugin.delay !== "") {
          const d = this.settings.DELAYS.find(
            (item) => item.id === ManagerPlugin.delay
          );
          if (d) {
            const delay = createSpan({
              text: `${d.time}s`,
              cls: ["manager-item__name-delay"]
            });
            itemEl.nameEl.appendChild(delay);
          }
        }
        const desc = createDiv({
          text: ManagerPlugin.desc,
          title: plugin.description,
          cls: ["manager-item__name-desc"]
        });
        if (this.editorMode) {
          desc.setAttribute(
            "style",
            "border-width: 1px;border-style: dashed"
          );
          desc.setAttribute("contenteditable", "true");
          desc.addEventListener("input", () => {
            if (desc.textContent) {
              ManagerPlugin.desc = desc.textContent;
              this.manager.saveSettings();
            }
          });
        }
        itemEl.descEl.appendChild(desc);
        const tags = createDiv();
        itemEl.descEl.appendChild(tags);
        ManagerPlugin.tags.map((id) => {
          const item = this.settings.TAGS.find(
            (item2) => item2.id === id
          );
          if (item) {
            const tag = this.manager.createTag(
              item.name,
              item.color,
              this.settings.TAG_STYLE
            );
            if (this.editorMode)
              tag.onclick = () => {
                new TagsModal(
                  this.app,
                  this.manager,
                  this,
                  ManagerPlugin
                ).open();
              };
            tags.appendChild(tag);
          }
        });
        if (this.editorMode) {
          const tag = this.manager.createTag("+", "", "");
          tag.onclick = () => {
            new TagsModal(
              this.app,
              this.manager,
              this,
              ManagerPlugin
            ).open();
          };
          tags.appendChild(tag);
        }
        if (!this.editorMode) {
          if (isEnabled) {
            const openPluginSetting = new import_obsidian7.ExtraButtonComponent(
              itemEl.controlEl
            );
            openPluginSetting.setIcon("settings");
            openPluginSetting.setTooltip(
              this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0")
            );
            openPluginSetting.onClick(() => {
              openPluginSetting.setDisabled(true);
              this.appSetting.open();
              this.appSetting.openTabById(plugin.id);
              openPluginSetting.setDisabled(false);
            });
          }
          const openPluginDirButton = new import_obsidian7.ExtraButtonComponent(
            itemEl.controlEl
          );
          openPluginDirButton.setIcon("folder-open");
          openPluginDirButton.setTooltip(
            this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0")
          );
          openPluginDirButton.onClick(() => {
            openPluginDirButton.setDisabled(true);
            managerOpen(pluginDir, this.manager);
            openPluginDirButton.setDisabled(false);
          });
          const deletePluginButton = new import_obsidian7.ExtraButtonComponent(
            itemEl.controlEl
          );
          deletePluginButton.setIcon("trash");
          deletePluginButton.setTooltip(
            this.manager.translator.t("\u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0")
          );
          deletePluginButton.onClick(async () => {
            new DeleteModal(this.app, this.manager, async () => {
              await this.appPlugins.uninstallPlugin(plugin.id);
              await this.appPlugins.loadManifests();
              this.reloadShowData();
              command_default(this.app, this.manager);
              this.manager.synchronizePlugins(
                Object.values(this.appPlugins.manifests).filter(
                  (pm) => pm.id !== this.manager.manifest.id
                )
              );
              new import_obsidian7.Notice(
                this.manager.translator.t("\u5378\u8F7D_\u901A\u77E5_\u4E00")
              );
            }).open();
          });
          const toggleSwitch = new import_obsidian7.ToggleComponent(itemEl.controlEl);
          toggleSwitch.setTooltip(
            this.manager.translator.t("\u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0")
          );
          toggleSwitch.setValue(isEnabled);
          toggleSwitch.onChange(async () => {
            if (this.settings.DELAY) {
              if (toggleSwitch.getValue()) {
                if (this.settings.FADE_OUT_DISABLED_PLUGINS)
                  itemEl.settingEl.removeClass("inactive");
                ManagerPlugin.enabled = true;
                this.manager.saveSettings();
                await this.appPlugins.enablePlugin(plugin.id);
              } else {
                if (this.settings.FADE_OUT_DISABLED_PLUGINS)
                  itemEl.settingEl.addClass("inactive");
                ManagerPlugin.enabled = false;
                this.manager.saveSettings();
                await this.appPlugins.disablePlugin(plugin.id);
              }
            } else {
              if (toggleSwitch.getValue()) {
                if (this.settings.FADE_OUT_DISABLED_PLUGINS)
                  itemEl.settingEl.removeClass("inactive");
                await this.appPlugins.enablePluginAndSave(
                  plugin.id
                );
              } else {
                if (this.settings.FADE_OUT_DISABLED_PLUGINS)
                  itemEl.settingEl.addClass("inactive");
                await this.appPlugins.disablePluginAndSave(
                  plugin.id
                );
              }
            }
            command_default(this.app, this.manager);
            this.reloadShowData();
          });
        }
        if (this.editorMode) {
          const reloadButton = new import_obsidian7.ExtraButtonComponent(
            itemEl.controlEl
          );
          reloadButton.setIcon("refresh-ccw");
          reloadButton.setTooltip(
            this.manager.translator.t("\u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0")
          );
          reloadButton.onClick(() => {
            ManagerPlugin.name = plugin.name;
            ManagerPlugin.desc = plugin.description;
            ManagerPlugin.group = "";
            ManagerPlugin.delay = "";
            ManagerPlugin.tags = [];
            this.manager.saveSettings();
            this.reloadShowData();
          });
          if (this.settings.DELAY) {
            const delays = this.settings.DELAYS.reduce(
              (acc, item) => {
                acc[item.id] = item.name;
                return acc;
              },
              {
                "": this.manager.translator.t(
                  "\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C"
                )
              }
            );
            const delaysEl = new import_obsidian7.DropdownComponent(
              itemEl.controlEl
            );
            delaysEl.addOptions(delays);
            delaysEl.setValue(ManagerPlugin.delay);
            delaysEl.onChange((value) => {
              ManagerPlugin.delay = value;
              this.manager.saveSettings();
              this.reloadShowData();
            });
          }
        }
      }
    }
    this.footEl.innerHTML = this.count();
  }
  count() {
    let totalCount = 0;
    let enabledCount = 0;
    let disabledCount = 0;
    if (this.settings.DELAY) {
      const plugins = this.settings.Plugins;
      totalCount = plugins.length;
      plugins.forEach((plugin) => {
        plugin.enabled ? enabledCount++ : disabledCount++;
      });
    } else {
      totalCount = Object.keys(this.manager.appPlugins.manifests).length - 1;
      enabledCount = this.manager.appPlugins.enabledPlugins.size - 1;
      disabledCount = totalCount - enabledCount;
    }
    const summary = `[${this.manager.translator.t(
      "\u901A\u7528_\u603B\u8BA1_\u6587\u672C"
    )}] ${totalCount} [${this.manager.translator.t(
      "\u901A\u7528_\u542F\u7528_\u6587\u672C"
    )}] ${enabledCount} [${this.manager.translator.t(
      "\u901A\u7528_\u7981\u7528_\u6587\u672C"
    )}] ${disabledCount} `;
    return summary;
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
    this.searchEl.inputEl.focus();
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "f") {
        if (this.searchEl.inputEl) {
          this.searchEl.inputEl.focus();
        }
      }
    });
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/command.ts
var Commands = (app, manager) => {
  manager.addCommand({
    id: "manager-view",
    name: manager.translator.t("\u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0"),
    hotkeys: [
      {
        modifiers: ["Ctrl"],
        key: "M"
      }
    ],
    callback: () => {
      new ManagerModal(app, manager).open();
    }
  });
  if (manager.settings.DELAY) {
    if (manager.settings.COMMAND_ITEM) {
      const plugins = Object.values(manager.appPlugins.manifests).filter((pm) => pm.id !== manager.manifest.id);
      plugins.forEach((plugin) => {
        const mp = manager.settings.Plugins.find((mp2) => mp2.id === plugin.id);
        if (mp) {
          manager.addCommand({
            id: `manager-${mp.id}`,
            name: `${mp.enabled ? manager.translator.t("\u901A\u7528_\u5173\u95ED_\u6587\u672C") : manager.translator.t("\u901A\u7528_\u5F00\u542F_\u6587\u672C")} ${mp.name} `,
            callback: async () => {
              if (mp.enabled) {
                mp.enabled = false;
                manager.saveSettings();
                await manager.appPlugins.disablePlugin(plugin.id);
                Commands(app, manager);
              } else {
                mp.enabled = true;
                manager.saveSettings();
                await manager.appPlugins.enablePlugin(plugin.id);
                Commands(app, manager);
              }
            }
          });
        }
      });
    }
    if (manager.settings.COMMAND_GROUP) {
      manager.settings.GROUPS.forEach((group) => {
        manager.addCommand({
          id: `manager-${group.id}-enabled`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C")} ${group.name}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              if (plugin && !plugin.enabled) {
                await manager.appPlugins.enablePlugin(plugin.id);
                plugin.enabled = true;
                manager.saveSettings();
              }
            });
            Commands(app, manager);
          }
        });
        manager.addCommand({
          id: `manager-${group.id}-disable`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C")} ${group.name}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              if (plugin && plugin.enabled) {
                await manager.appPlugins.disablePlugin(plugin.id);
                plugin.enabled = false;
                manager.saveSettings();
              }
            });
            Commands(app, manager);
          }
        });
      });
    }
  } else {
    if (manager.settings.COMMAND_ITEM) {
      const plugins = Object.values(manager.appPlugins.manifests).filter((pm) => pm.id !== manager.manifest.id);
      plugins.forEach((plugin) => {
        const enabled = manager.appPlugins.enabledPlugins.has(plugin.id);
        manager.addCommand({
          id: `manager-${plugin.id}`,
          name: `${enabled ? manager.translator.t("\u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C") : manager.translator.t("\u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C")} ${plugin.name} `,
          callback: async () => {
            if (enabled) {
              await manager.appPlugins.disablePluginAndSave(plugin.id);
              Commands(app, manager);
            } else {
              await manager.appPlugins.enablePluginAndSave(plugin.id);
              Commands(app, manager);
            }
          }
        });
      });
    }
    if (manager.settings.COMMAND_GROUP) {
      manager.settings.GROUPS.forEach((group) => {
        manager.addCommand({
          id: `manager-${group.id}-enabled`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C")} ${group.name} ${manager.translator.t("\u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C")}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              await manager.appPlugins.enablePluginAndSave(plugin.id);
            });
            Commands(app, manager);
          }
        });
        manager.addCommand({
          id: `manager-${group.id}-disable`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C")} ${group.name} ${manager.translator.t("\u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C")}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              await manager.appPlugins.disablePluginAndSave(plugin.id);
            });
            Commands(app, manager);
          }
        });
      });
    }
  }
};
var command_default = Commands;

// src/settings/ui/manager-basis.ts
var ManagerBasis = class extends BaseSetting {
  constructor() {
    super(...arguments);
    this.ITEM_STYLE = {
      "alwaysExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00"),
      "neverExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C"),
      "hoverExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09"),
      "clickExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB")
    };
    this.GROUP_STYLE = {
      "a": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00"),
      "b": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C"),
      "c": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09"),
      "d": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB")
    };
    this.TAG_STYLE = {
      "a": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00"),
      "b": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C"),
      "c": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09"),
      "d": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB")
    };
  }
  main() {
    const languageBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0"));
    const languageDropdown = new import_obsidian8.DropdownComponent(languageBar.controlEl);
    languageDropdown.addOptions(this.manager.translator.language);
    languageDropdown.setValue(this.settings.LANGUAGE);
    languageDropdown.onChange((value) => {
      this.settings.LANGUAGE = value;
      this.manager.saveSettings();
      this.settingTab.basisDisplay();
      command_default(this.app, this.manager);
    });
    const topBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0"));
    const topToggle = new import_obsidian8.ToggleComponent(topBar.controlEl);
    topToggle.setValue(this.settings.CENTER);
    topToggle.onChange((value) => {
      this.settings.CENTER = value;
      this.manager.saveSettings();
    });
    const persistenceBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0"));
    const persistenceToggle = new import_obsidian8.ToggleComponent(persistenceBar.controlEl);
    persistenceToggle.setValue(this.settings.PERSISTENCE);
    persistenceToggle.onChange((value) => {
      this.settings.PERSISTENCE = value;
      this.manager.saveSettings();
    });
    const itemStyleBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0"));
    const itemStyleDropdown = new import_obsidian8.DropdownComponent(itemStyleBar.controlEl);
    itemStyleDropdown.addOptions(this.ITEM_STYLE);
    itemStyleDropdown.setValue(this.settings.ITEM_STYLE);
    itemStyleDropdown.onChange((value) => {
      this.settings.ITEM_STYLE = value;
      this.manager.saveSettings();
    });
    const groupStyleBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0"));
    const groupStyleDropdown = new import_obsidian8.DropdownComponent(groupStyleBar.controlEl);
    groupStyleDropdown.addOptions(this.GROUP_STYLE);
    groupStyleDropdown.setValue(this.settings.GROUP_STYLE);
    groupStyleDropdown.onChange((value) => {
      this.settings.GROUP_STYLE = value;
      this.manager.saveSettings();
    });
    const tagStyleBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0"));
    const tagStyleDropdown = new import_obsidian8.DropdownComponent(tagStyleBar.controlEl);
    tagStyleDropdown.addOptions(this.TAG_STYLE);
    tagStyleDropdown.setValue(this.settings.TAG_STYLE);
    tagStyleDropdown.onChange((value) => {
      this.settings.TAG_STYLE = value;
      this.manager.saveSettings();
    });
    const DelayBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0"));
    const DelayToggle = new import_obsidian8.ToggleComponent(DelayBar.controlEl);
    DelayToggle.setValue(this.settings.DELAY);
    DelayToggle.onChange((value) => {
      this.settings.DELAY = value;
      this.manager.saveSettings();
      value ? this.manager.enableDelaysForAllPlugins() : this.manager.disableDelaysForAllPlugins();
    });
    const fadeOutDisabledPluginsBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0"));
    const fadeOutDisabledPluginsToggle = new import_obsidian8.ToggleComponent(fadeOutDisabledPluginsBar.controlEl);
    fadeOutDisabledPluginsToggle.setValue(this.settings.FADE_OUT_DISABLED_PLUGINS);
    fadeOutDisabledPluginsToggle.onChange((value) => {
      this.settings.FADE_OUT_DISABLED_PLUGINS = value;
      this.manager.saveSettings();
    });
    const CommandItemBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandItemToggle = new import_obsidian8.ToggleComponent(CommandItemBar.controlEl);
    CommandItemToggle.setValue(this.settings.COMMAND_ITEM);
    CommandItemToggle.onChange((value) => {
      this.settings.COMMAND_ITEM = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    const CommandGroupBar = new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandGroupToggle = new import_obsidian8.ToggleComponent(CommandGroupBar.controlEl);
    CommandGroupToggle.setValue(this.settings.COMMAND_GROUP);
    CommandGroupToggle.onChange((value) => {
      this.settings.COMMAND_GROUP = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    new import_obsidian8.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0"));
  }
};

// src/settings/ui/manager-delay.ts
var import_obsidian9 = require("obsidian");
var ManagerDelay = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let time = 0;
    new import_obsidian9.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addSlider(
      (cb) => cb.setLimits(0, 100, 1).setValue(time).setDynamicTooltip().onChange((value) => {
        time = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder("ID").onChange((value) => {
        id = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
        name = value;
      })
    ).addExtraButton(
      (cb) => cb.setIcon("plus").onClick(() => {
        const containsId = this.manager.settings.DELAYS.some((delay) => delay.id === id);
        if (!containsId && id !== "") {
          this.manager.settings.DELAYS.push({ id, name, time });
          this.manager.saveSettings();
          this.settingTab.delayDisplay();
          new import_obsidian9.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian9.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.DELAYS.forEach((delay, index) => {
      const item = new import_obsidian9.Setting(this.containerEl);
      item.settingEl.addClass("manager-setting-group__item");
      item.setName(`[${delay.id}]`);
      item.addSlider(
        (cb) => cb.setLimits(0, 100, 1).setValue(delay.time).setDynamicTooltip().onChange((value) => {
          delay.time = value;
          this.manager.saveSettings();
        })
      );
      item.addText(
        (cb) => cb.setValue(delay.name).onChange((value) => {
          delay.name = value;
          this.manager.saveSettings();
        })
      );
      item.addExtraButton(
        (cb) => cb.setIcon("trash-2").onClick(() => {
          const hasTestGroup = this.settings.Plugins.some((plugin) => plugin.delay === delay.id);
          if (!hasTestGroup) {
            this.manager.settings.DELAYS = this.manager.settings.DELAYS.filter((t) => t.id !== delay.id);
            this.manager.saveSettings();
            this.settingTab.delayDisplay();
            new import_obsidian9.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian9.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
    });
  }
};

// src/settings/ui/manager-tag.ts
var import_obsidian10 = require("obsidian");
var ManagerTag = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let color = "";
    new import_obsidian10.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addColorPicker(
      (cb) => cb.setValue(color).onChange((value) => {
        color = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder("ID").onChange((value) => {
        id = value;
        this.manager.saveSettings();
      })
    ).addText(
      (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
        name = value;
      })
    ).addExtraButton(
      (cb) => cb.setIcon("plus").onClick(() => {
        const containsId = this.manager.settings.TAGS.some((tag) => tag.id === id);
        if (!containsId && id !== "") {
          if (color === "")
            color = "#000000";
          this.manager.settings.TAGS.push({ id, name, color });
          this.manager.saveSettings();
          this.settingTab.tagDisplay();
          new import_obsidian10.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian10.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.TAGS.forEach((tag, index) => {
      const item = new import_obsidian10.Setting(this.containerEl);
      item.setClass("manager-setting-tag__item");
      item.addColorPicker(
        (cb) => cb.setValue(tag.color).onChange((value) => {
          tag.color = value;
          this.manager.saveSettings();
          this.settingTab.tagDisplay();
        })
      );
      item.addText(
        (cb) => cb.setValue(tag.name).onChange((value) => {
          tag.name = value;
          this.manager.saveSettings();
        }).inputEl.addEventListener("blur", () => {
          this.settingTab.tagDisplay();
        })
      );
      item.addExtraButton(
        (cb) => cb.setIcon("trash-2").onClick(() => {
          const hasTestTag = this.settings.Plugins.some((plugin) => plugin.tags && plugin.tags.includes(tag.id));
          if (!hasTestTag) {
            this.manager.settings.TAGS = this.manager.settings.TAGS.filter((t) => t.id !== tag.id);
            this.manager.saveSettings();
            this.settingTab.tagDisplay();
            new import_obsidian10.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian10.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
      const tagEl = this.manager.createTag(tag.name, tag.color, this.settings.TAG_STYLE);
      item.nameEl.appendChild(tagEl);
      item.nameEl.appendText(` [${tag.id}]`);
    });
  }
};

// src/settings/ui/manager-group.ts
var import_obsidian11 = require("obsidian");
var ManagerGroup = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let color = "";
    new import_obsidian11.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addColorPicker(
      (cb) => cb.setValue(color).onChange((value) => {
        color = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder("ID").onChange((value) => {
        id = value;
        this.manager.saveSettings();
      })
    ).addText(
      (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
        name = value;
      })
    ).addExtraButton(
      (cb) => cb.setIcon("plus").onClick(() => {
        const containsId = this.manager.settings.GROUPS.some((tag) => tag.id === id);
        if (!containsId && id !== "") {
          if (color === "")
            color = "#000000";
          this.manager.settings.GROUPS.push({ id, name, color });
          this.manager.saveSettings();
          this.settingTab.groupDisplay();
          command_default(this.app, this.manager);
          new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.GROUPS.forEach((group, index) => {
      const item = new import_obsidian11.Setting(this.containerEl);
      item.settingEl.addClass("manager-setting-group__item");
      item.addColorPicker(
        (cb) => cb.setValue(group.color).onChange((value) => {
          group.color = value;
          this.manager.saveSettings();
          this.settingTab.groupDisplay();
        })
      );
      item.addText(
        (cb) => cb.setValue(group.name).onChange((value) => {
          group.name = value;
          this.manager.saveSettings();
        }).inputEl.addEventListener("blur", () => {
          this.settingTab.groupDisplay();
        })
      );
      item.addExtraButton(
        (cb) => cb.setIcon("trash-2").onClick(() => {
          const hasTestGroup = this.settings.Plugins.some((plugin) => plugin.group === group.id);
          if (!hasTestGroup) {
            this.manager.settings.GROUPS = this.manager.settings.GROUPS.filter((t) => t.id !== group.id);
            this.manager.saveSettings();
            this.settingTab.groupDisplay();
            command_default(this.app, this.manager);
            new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
      const tagEl = this.manager.createTag(group.name, group.color, this.settings.GROUP_STYLE);
      item.nameEl.appendChild(tagEl);
      item.nameEl.appendText(` [${group.id}]`);
    });
  }
};

// src/settings/index.ts
var ManagerSettingTab = class extends import_obsidian12.PluginSettingTab {
  constructor(app, manager) {
    super(app, manager);
    this.manager = manager;
    this.app = app;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("manager-setting__container");
    const tabsEl = this.containerEl.createEl("div");
    tabsEl.addClass("manager-setting__tabs");
    this.contentEl = this.containerEl.createEl("div");
    this.contentEl.addClass("manager-setting__content");
    const tabItems = [
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.basisDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.groupDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.tagDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.delayDisplay() }
    ];
    const tabItemsEls = [];
    tabItems.forEach((item, index) => {
      const itemEl = tabsEl.createEl("div");
      itemEl.addClass("manager-setting__tabs-item");
      itemEl.textContent = item.text;
      tabItemsEls.push(itemEl);
      if (index === 0) {
        itemEl.addClass("manager-setting__tabs-item_is-active");
        item.content();
      }
      itemEl.addEventListener("click", () => {
        tabItemsEls.forEach((tabEl) => {
          tabEl.removeClass("manager-setting__tabs-item_is-active");
        });
        itemEl.addClass("manager-setting__tabs-item_is-active");
        item.content();
      });
    });
  }
  basisDisplay() {
    this.contentEl.empty();
    new ManagerBasis(this).display();
  }
  delayDisplay() {
    this.contentEl.empty();
    new ManagerDelay(this).display();
  }
  groupDisplay() {
    this.contentEl.empty();
    new ManagerGroup(this).display();
  }
  tagDisplay() {
    this.contentEl.empty();
    new ManagerTag(this).display();
  }
};

// src/lang/locale/zh_cn.ts
var zh_cn_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\u63D2\u4EF6\u7BA1\u7406\u5668",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\u6210\u529F",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\u5931\u8D25",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\u65B0\u589E",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\u64CD\u4F5C",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\u641C\u7D22",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\u540D\u79F0",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\u5168\u90E8",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\u5168\u90E8",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\u65E0",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\u603B\u8BA1",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\u542F\u7528",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\u7981\u7528",
  \u901A\u7528_\u5173\u95ED_\u6587\u672C: "\u5173\u95ED",
  \u901A\u7528_\u5F00\u542F_\u6587\u672C: "\u5F00\u542F",
  \u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C: "\u542F\u7528",
  \u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C: "\u7981\u7528",
  \u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C: "\u5206\u7EC4",
  \u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C: "\u4E00\u952E\u542F\u7528",
  \u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C: "\u4E00\u952E\u7981\u7528",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\u8BBF\u95EE\u4F5C\u8005\u7684GitHub\u9875\u9762\uFF0C\u67E5\u770B\u9879\u76EE\u8BE6\u60C5\u3001\u66F4\u65B0\u65E5\u5FD7\u3001\u53C2\u4E0E\u8BA8\u8BBA\u548C\u8D21\u732E\u4EE3\u7801\u3002",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\u8BBF\u95EE\u89C6\u9891\u6559\u7A0B",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\u542F\u7528\u7F16\u8F91\u6A21\u5F0F\uFF0C\u6DF1\u5EA6\u81EA\u5B9A\u4E49\u63D2\u4EF6\u914D\u7F6E",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\u91CD\u8F7D\u63D2\u4EF6\uFF0C\u5373\u65F6\u751F\u6548",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u68C0\u67E5\u63D2\u4EF6\u66F4\u65B0",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\u4E00\u952E\u7981\u7528\u6240\u6709\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\u4E00\u952E\u542F\u7528\u6240\u6709\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\u7BA1\u7406\u63D2\u4EF6\u8BBE\u7F6E",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u4EC5\u663E\u793A\u5DF2\u542F\u7528\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u672A\u5206\u7EC4_\u63CF\u8FF0: "\u7B5B\u9009\u6240\u6709\u672A\u5206\u7EC4\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\u6253\u5F00\u8BBE\u7F6E\u754C\u9762",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\u8FD8\u539F\u521D\u59CB\u72B6\u6001",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\u6253\u5F00\u63D2\u4EF6\u76EE\u5F55",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\u5F7B\u5E95\u5220\u9664\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\u5207\u6362\u63D2\u4EF6\u72B6\u6001",
  \u5378\u8F7D_\u6807\u9898: "\u5378\u8F7D\u63D2\u4EF6",
  \u5378\u8F7D_\u63D0\u793A: "\u4F60\u786E\u5B9A\u8981\u5378\u8F7D\u6B64\u63D2\u4EF6\u5417\uFF1F\u8FD9\u5C06\u5220\u9664\u63D2\u4EF6\u7684\u6587\u4EF6\u5939\u3002",
  \u5378\u8F7D_\u5378\u8F7D: "\u5378\u8F7D",
  \u5378\u8F7D_\u53D6\u6D88: "\u53D6\u6D88",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\u5378\u8F7D\u6210\u529F",
  \u4E00\u952E_\u6807\u9898: "\u4E00\u952E\u542F\u7528/\u7981\u7528\u63D2\u4EF6",
  \u4E00\u952E_\u63D0\u793A: "\u4F60\u786E\u5B9A\u8981\u4E00\u952E\u542F\u7528/\u7981\u7528\u6B64\u9875\u9762\u63D2\u4EF6\u5417\uFF1F\u8FD9\u5C06\u65E0\u6CD5\u6062\u590D\u3002(\u542F\u7528/\u7981\u7528\u8FC7\u7A0B\u4E2D\u8BF7\u8010\u5FC3\u7B49\u5F85)",
  \u4E00\u952E_\u542F\u7981: "\u542F\u7528/\u7981\u7528",
  \u4E00\u952E_\u53D6\u6D88: "\u53D6\u6D88",
  \u4E00\u952E_\u901A\u77E5_\u4E00: "\u542F\u7528/\u7981\u7528\u6210\u529F",
  \u83DC\u5355_\u7B14\u8BB0_\u6807\u9898: "\u7B14\u8BB0",
  \u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898: "\u5FEB\u6377\u952E",
  \u83DC\u5355_GitHub_\u6807\u9898: "GitHub",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u57FA\u7840",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\u5206\u7EC4",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\u6807\u7B7E",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\u5EF6\u8FDF",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\u8BED\u8A00\u8BBE\u7F6E",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\u9009\u62E9\u60A8\u559C\u6B22\u7684\u8BED\u8A00\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898: "\u754C\u9762\u5C45\u4E2D",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0: "\u8BBE\u7F6E\u7BA1\u7406\u5668\u754C\u9762\u662F\u5426\u5C45\u4E2D",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\u76EE\u5F55\u6837\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\u9009\u62E9\u5206\u7EC4\u7684\u6837\u5F0F\uFF0C\u4EE5\u63D0\u5347\u6D4F\u89C8\u4F53\u9A8C\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00: "\u59CB\u7EC8\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u6C38\u4E0D\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09: "\u60AC\u6D6E\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB: "\u5355\u51FB\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\u5206\u7EC4\u6837\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\u9009\u62E9\u5206\u7EC4\u7684\u6837\u5F0F\uFF0C\u4F7F\u5206\u7EC4\u66F4\u52A0\u660E\u663E\uFF0C\u4FBF\u4E8E\u8BC6\u522B\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00: "\u6837\u5F0F\u4E00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u6837\u5F0F\u4E8C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09: "\u6837\u5F0F\u4E09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB: "\u6837\u5F0F\u56DB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\u6807\u7B7E\u6837\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\u9009\u62E9\u6807\u7B7E\u7684\u6837\u5F0F\uFF0C\u4F7F\u6807\u7B7E\u66F4\u52A0\u660E\u663E\uFF0C\u4FBF\u4E8E\u8BC6\u522B\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00: "\u6837\u5F0F\u4E00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u6837\u5F0F\u4E8C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09: "\u6837\u5F0F\u4E09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB: "\u6837\u5F0F\u56DB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\u5EF6\u65F6\u542F\u52A8",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\u542F\u7528\u5EF6\u65F6\u542F\u52A8\u529F\u80FD\u53EF\u4EE5\u4F18\u5316\u52A0\u8F7D\u987A\u5E8F\uFF0C\u4F46\u8BF7\u6CE8\u610F\uFF0C\u8FD9\u53EF\u80FD\u4F1A\u5BFC\u81F4\u67D0\u4E9B\u63D2\u4EF6\u51FA\u73B0\u517C\u5BB9\u6027\u95EE\u9898\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\u6DE1\u5316\u63D2\u4EF6",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\u4E3A\u672A\u542F\u7528\u7684\u63D2\u4EF6\u63D0\u4F9B\u89C6\u89C9\u6DE1\u5316\u6548\u679C\uFF0C\u4EE5\u4FBF\u6E05\u6670\u5730\u533A\u5206\u542F\u7528\u548C\u672A\u542F\u7528\u7684\u63D2\u4EF6\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898: "\u7B5B\u9009\u6301\u4E45\u5316",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0: "\u542F\u7528\u540E\uFF0C\u60A8\u5C06\u5728\u6BCF\u6B21\u6253\u5F00\u7BA1\u7406\u5668\u65F6\u770B\u5230\u76F8\u540C\u7684\u63D2\u4EF6\u5217\u8868\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\u5355\u72EC\u63A7\u5236\u63D2\u4EF6\u547D\u4EE4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\u542F\u7528\u6B64\u9009\u9879\u53EF\u4EE5\u5355\u72EC\u63A7\u5236\u6BCF\u4E2A\u63D2\u4EF6\u7684\u542F\u7528\u548C\u7981\u7528\u72B6\u6001\u3002(\u91CD\u542FObsidian\u751F\u6548)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\u5206\u7EC4\u63A7\u5236\u63D2\u4EF6\u547D\u4EE4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\u542F\u7528\u6B64\u9009\u9879\u53EF\u4EE5\u4E00\u952E\u542F\u7528\u6216\u7981\u7528\u6307\u5B9A\u5206\u7EC4\u4E2D\u7684\u6240\u6709\u63D2\u4EF6\u3002(\u91CD\u542FObsidian\u751F\u6548)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u5EF6\u8FDF] \u5DF2\u6DFB\u52A0",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u5EF6\u8FDF] ID\u5DF2\u5B58\u5728\u6216\u4E3A\u7A7A",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u5EF6\u8FDF] \u5220\u9664\u6210\u529F",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u5EF6\u8FDF] \u5220\u9664\u5931\u8D25\uFF0C\u6B64\u5EF6\u8FDF\u4E0B\u5B58\u5728\u63D2\u4EF6",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u5206\u7EC4] \u5DF2\u6DFB\u52A0",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u5206\u7EC4] ID\u5DF2\u5B58\u5728\u6216\u4E3A\u7A7A",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u5206\u7EC4] \u5220\u9664\u6210\u529F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u5206\u7EC4] \u5220\u9664\u5931\u8D25\uFF0C\u6B64\u5206\u7EC4\u4E0B\u5B58\u5728\u63D2\u4EF6",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u6807\u7B7E] \u5DF2\u6DFB\u52A0",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u6807\u7B7E] ID\u5DF2\u5B58\u5728\u6216\u4E3A\u7A7A",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u6807\u7B7E] \u5220\u9664\u6210\u529F",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u6807\u7B7E] \u5220\u9664\u5931\u8D25\uFF0C\u6B64\u6807\u7B7E\u4E0B\u5B58\u5728\u63D2\u4EF6",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\u5982\u679C\u9047\u5230\u672C\u63D2\u4EF6\u4E0E\u5176\u4ED6\u63D2\u4EF6\u51B2\u7A81",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\u4E2A\u4EBA\u80FD\u529B\u6709\u9650\uFF0C\u65E0\u6CD5\u4FEE\u590D\u6B64\u95EE\u9898\uFF0C\u8BF7\u5173\u95ED\u5EF6\u65F6\u542F\u52A8\uFF0C\u5373\u53EF\u89E3\u51B3\u4E00\u5207\u51B2\u7A81\u95EE\u9898\u3002",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\u5F00\u542F\u63D2\u4EF6\u7BA1\u7406\u5668"
};

// src/lang/locale/en.ts
var en_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "Plugin Manager",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "Success",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "Failure",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "Add",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "Operation",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "Search",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "Name",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "ALL",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "ALL",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "No Delay",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "Total",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "Enable",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "Disable",
  \u901A\u7528_\u5173\u95ED_\u6587\u672C: "Disable",
  \u901A\u7528_\u5F00\u542F_\u6587\u672C: "Enable",
  \u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C: "Enable",
  \u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C: "Disable",
  \u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C: "Group",
  \u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C: "One - click Enable",
  \u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C: "One - click Disable",
  \u83DC\u5355_\u7B14\u8BB0_\u6807\u9898: "Note",
  \u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898: "Hotkeys",
  \u83DC\u5355_GitHub_\u6807\u9898: "GitHub",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "Visit the author's GitHub page to view project details, update logs, participate in discussions, and contribute code.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "Access video tutorials",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "Enable edit mode for in-depth plugin configuration customization",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "Reload plugins to take effect immediately",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "Check for plugin updates",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "Disable all plugins at once",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "Enable all plugins at once",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "Manage plugin settings",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Only display enabled plugins",
  \u7BA1\u7406\u5668_\u672A\u5206\u7EC4_\u63CF\u8FF0: "Filter all ungrouped plugins",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "Open the settings interface",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "Restore to the initial state",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "Open the plugin directory",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "Completely delete the plugin",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "Toggle the plugin status",
  \u5378\u8F7D_\u6807\u9898: "Uninstall Plugin",
  \u5378\u8F7D_\u63D0\u793A: "Are you sure you want to uninstall this plugin? This will delete the plugin's folder.",
  \u5378\u8F7D_\u5378\u8F7D: "Uninstall",
  \u5378\u8F7D_\u53D6\u6D88: "Cancel",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "Uninstalled successfully",
  \u4E00\u952E_\u6807\u9898: "One-click Enable/Disable Plugins",
  \u4E00\u952E_\u63D0\u793A: "Are you sure you want to enable/disable the plugins on this page with one click? This action cannot be undone. (Please wait patiently during the enable/disable process)",
  \u4E00\u952E_\u542F\u7981: "Enable/Disable",
  \u4E00\u952E_\u53D6\u6D88: "Cancel",
  \u4E00\u952E_\u901A\u77E5_\u4E00: "Enable/Disable Successful",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "Basic",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "Group",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "Tag",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "Delay",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "Language Settings",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "Choose your preferred language.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898: "Center the interface",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0: "Set whether the manager interface is centered",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "Directory Style",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "Select the style of the group to enhance the browsing experience.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00: "Always Expanded",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C: "Never Expanded",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09: "Hover to Expand",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB: "Click to Expand",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "Group Style",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "Select the style of the group to make it more noticeable and easy to identify.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00: "Style One",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C: "Style Two",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09: "Style Three",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB: "Style Four",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "Tag Style",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "Select the style of the tag to make it more noticeable and easy to identify.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00: "Style One",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C: "Style Two",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09: "Style Three",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB: "Style Four",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "Delayed Startup",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "Enabling the delayed startup feature can optimize the loading order, but please note that this may cause compatibility issues with some plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "Fade Plugins",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "Provide a visual fade effect for disabled plugins to clearly distinguish between enabled and disabled plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898: "Filter Persistence",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0: "After enabling, you will see the same plugin list every time you open the manager.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "Control Plugin Commands Separately",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "Enable this option to control the enabled and disabled state of each plugin separately. (Restart Obsidian to take effect)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "Control Plugin Commands by Group",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "Enable this option to enable or disable all plugins in a specified group with one click. (Restart Obsidian to take effect)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Delay] Added",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Delay] ID already exists or is empty",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Delay] Deleted successfully",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Delay] Deletion failed, plugins exist under this delay",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Group] Added",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Group] ID already exists or is empty",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Group] Deleted successfully",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Group] Deletion failed, plugins exist under this group",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Tag] Added",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Tag] ID already exists or is empty",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Tag] Deleted successfully",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Tag] Deletion failed, plugins exist under this tag",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "If You Encounter Conflicts with Other Plugins",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "Due to limited capabilities, I cannot fix this issue. Please disable delayed startup to resolve all conflict issues.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "Open the plugin manager"
};

// src/lang/locale/ru.ts
var ru_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\u0423\u0441\u043F\u0435\u0445",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\u041D\u0435\u0443\u0434\u0430\u0447\u0430",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u044F",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\u041F\u043E\u0438\u0441\u043A",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\u0411\u0435\u0437 \u0433\u0440\u0443\u043F\u043F\u044B",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\u0411\u0435\u0437 \u043C\u0435\u0442\u043A\u0438",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\u0411\u0435\u0437 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\u0412\u0441\u0435\u0433\u043E",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0430\u0432\u0442\u043E\u0440\u0430 \u043D\u0430 GitHub, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430, \u0436\u0443\u0440\u043D\u0430\u043B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439, \u043F\u0440\u0438\u043D\u044F\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u043E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u0438 \u0438 \u0432\u043D\u0435\u0441\u0442\u0438 \u0441\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434 \u0432 \u043A\u043E\u0434.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0432\u0438\u0434\u0435\u043E\u0443\u0440\u043E\u043A\u0430\u043C",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0440\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u0433\u043B\u0443\u0431\u043E\u043A\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0434\u043B\u044F \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u0432\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F \u0432 \u0441\u0438\u043B\u0443",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u043E\u0434\u043D\u0438\u043C \u043A\u043B\u0438\u043A\u043E\u043C",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u043E\u0434\u043D\u0438\u043C \u043A\u043B\u0438\u043A\u043E\u043C",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\u0412\u0435\u0440\u043D\u0438\u0442\u0435 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\u041F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0443\u0434\u0430\u043B\u0438\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 \u043F\u043B\u0430\u0433\u0438\u043D\u0430",
  \u5378\u8F7D_\u6807\u9898: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D",
  \u5378\u8F7D_\u63D0\u793A: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D? \u042D\u0442\u043E \u0443\u0434\u0430\u043B\u0438\u0442 \u043F\u0430\u043F\u043A\u0443 \u043F\u043B\u0430\u0433\u0438\u043D\u0430.",
  \u5378\u8F7D_\u5378\u8F7D: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  \u5378\u8F7D_\u53D6\u6D88: "\u041E\u0442\u043C\u0435\u043D\u0430",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\u0413\u0440\u0443\u043F\u043F\u0430",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\u041C\u0435\u0442\u043A\u0430",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u044F\u0437\u044B\u043A\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0439 \u044F\u0437\u044B\u043A.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\u0421\u0442\u0438\u043B\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u0433\u0440\u0443\u043F\u043F\u044B \u0434\u043B\u044F \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\u0421\u0442\u0438\u043B\u044C \u0433\u0440\u0443\u043F\u043F\u044B",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u0433\u0440\u0443\u043F\u043F\u044B \u0434\u043B\u044F \u043B\u0443\u0447\u0448\u0435\u0439 \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0438 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\u0421\u0442\u0438\u043B\u044C \u043C\u0435\u0442\u043A\u0438",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u043C\u0435\u0442\u043A\u0438 \u0434\u043B\u044F \u043B\u0443\u0447\u0448\u0435\u0439 \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0438 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u043C\u043E\u0436\u0435\u0442 \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438, \u043D\u043E \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0447\u0442\u043E \u044D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0432\u044B\u0437\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438 \u0441 \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430\u043C\u0438.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\u0421\u043B\u0430\u0431\u043E \u0432\u0438\u0434\u0438\u043C\u044B\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\u041F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u044D\u0444\u0444\u0435\u043A\u0442 \u0441\u043B\u0430\u0431\u043E\u0439 \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432, \u0447\u0442\u043E\u0431\u044B \u0447\u0435\u0442\u043A\u043E \u0440\u0430\u0437\u043B\u0438\u0447\u0430\u0442\u044C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435 \u0438 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\u041E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0430\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u044D\u0442\u043E\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0434\u043B\u044F \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435\u043C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0438 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043F\u043B\u0430\u0433\u0438\u043D\u0430. (\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 Obsidian, \u0447\u0442\u043E\u0431\u044B \u0432\u043D\u0435\u0441\u0442\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0430\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432 \u043F\u043E \u0433\u0440\u0443\u043F\u043F\u0430\u043C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u044D\u0442\u043E\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0434\u043B\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432\u0441\u0435\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432 \u0432 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u0435 \u043E\u0434\u043D\u0438\u043C \u043A\u043B\u0438\u043A\u043E\u043C. (\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 Obsidian, \u0447\u0442\u043E\u0431\u044B \u0432\u043D\u0435\u0441\u0442\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] ID \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C, \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0441 \u044D\u0442\u043E\u0439 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u043E\u0439",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u0413\u0440\u0443\u043F\u043F\u0430] \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u0413\u0440\u0443\u043F\u043F\u0430] ID \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u0413\u0440\u0443\u043F\u043F\u0430] \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u0413\u0440\u0443\u043F\u043F\u0430] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C, \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0432 \u044D\u0442\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u0435",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u041C\u0435\u0442\u043A\u0430] \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u041C\u0435\u0442\u043A\u0430] ID \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u041C\u0435\u0442\u043A\u0430] \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u041C\u0435\u0442\u043A\u0430] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C, \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0441 \u044D\u0442\u043E\u0439 \u043C\u0435\u0442\u043A\u043E\u0439",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\u0415\u0441\u043B\u0438 \u0432\u043E\u0437\u043D\u0438\u043A\u0430\u044E\u0442 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u044B \u0441 \u0434\u0440\u0443\u0433\u0438\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430\u043C\u0438",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\u0418\u0437-\u0437\u0430 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u044B\u0445 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0435\u0439 \u044F \u043D\u0435 \u043C\u043E\u0433\u0443 \u0438\u0441\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u044D\u0442\u0443 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0443 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0435\u0448\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u0430.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432"
};

// src/lang/locale/ja.ts
var ja_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\u6210\u529F",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\u5931\u6557",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\u8FFD\u52A0",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\u64CD\u4F5C",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\u691C\u7D22",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\u540D\u524D",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\u30B0\u30EB\u30FC\u30D7\u306A\u3057",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\u30BF\u30B0\u306A\u3057",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\u9045\u5EF6\u306A\u3057",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\u5408\u8A08",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\u6709\u52B9",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\u7121\u52B9",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\u8457\u8005\u306EGitHub\u30DA\u30FC\u30B8\u3092\u8A2A\u308C\u3001\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306E\u8A73\u7D30\u3001\u66F4\u65B0\u30ED\u30B0\u3001\u8B70\u8AD6\u3078\u306E\u53C2\u52A0\u3001\u30B3\u30FC\u30C9\u3078\u306E\u8CA2\u732E\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\u30D3\u30C7\u30AA\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB\u306B\u30A2\u30AF\u30BB\u30B9",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\u7DE8\u96C6\u30E2\u30FC\u30C9\u3092\u6709\u52B9\u306B\u3057\u3066\u3001\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u8A2D\u5B9A\u3092\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u5373\u5EA7\u306B\u52B9\u679C\u3092\u767A\u63EE\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u66F4\u65B0\u3092\u78BA\u8A8D\u3059\u308B",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\u4E00\u5EA6\u306B\u3059\u3079\u3066\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u7121\u52B9\u306B\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\u4E00\u5EA6\u306B\u3059\u3079\u3066\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u6709\u52B9\u306B\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u8A2D\u5B9A\u3092\u7BA1\u7406\u3059\u308B",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u6709\u52B9\u306A\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u307F\u3092\u8868\u793A\u3059\u308B",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\u8A2D\u5B9A\u30A4\u30F3\u30BF\u30FC\u30D5\u30A7\u30FC\u30B9\u3092\u958B\u304F",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\u521D\u671F\u72B6\u614B\u306B\u623B\u3059",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3092\u958B\u304F",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u5B8C\u5168\u306B\u524A\u9664\u3059\u308B",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30B9\u30C6\u30FC\u30BF\u30B9\u3092\u5207\u308A\u66FF\u3048\u308B",
  \u5378\u8F7D_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB",
  \u5378\u8F7D_\u63D0\u793A: "\u3053\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30D5\u30A9\u30EB\u30C0\u304C\u524A\u9664\u3055\u308C\u307E\u3059\u3002",
  \u5378\u8F7D_\u5378\u8F7D: "\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB",
  \u5378\u8F7D_\u53D6\u6D88: "\u30AD\u30E3\u30F3\u30BB\u30EB",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u57FA\u672C",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\u30B0\u30EB\u30FC\u30D7",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\u30BF\u30B0",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\u9045\u5EF6",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\u8A00\u8A9E\u8A2D\u5B9A",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\u304A\u597D\u307F\u306E\u8A00\u8A9E\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u30B9\u30BF\u30A4\u30EB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\u30B0\u30EB\u30FC\u30D7\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u3001\u30D6\u30E9\u30A6\u30B8\u30F3\u30B0\u4F53\u9A13\u3092\u5411\u4E0A\u3055\u305B\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\u30B0\u30EB\u30FC\u30D7\u30B9\u30BF\u30A4\u30EB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\u30B0\u30EB\u30FC\u30D7\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u3001\u3088\u308A\u76EE\u7ACB\u305F\u305B\u3084\u3059\u304F\u8B58\u5225\u3057\u3084\u3059\u304F\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\u30BF\u30B0\u30B9\u30BF\u30A4\u30EB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\u30BF\u30B0\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u3001\u3088\u308A\u76EE\u7ACB\u305F\u305B\u3084\u3059\u304F\u8B58\u5225\u3057\u3084\u3059\u304F\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\u9045\u5EF6\u30B9\u30BF\u30FC\u30C8",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\u9045\u5EF6\u30B9\u30BF\u30FC\u30C8\u6A5F\u80FD\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u8AAD\u307F\u8FBC\u307F\u9806\u5E8F\u3092\u6700\u9069\u5316\u3067\u304D\u307E\u3059\u304C\u3001\u4E00\u90E8\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3067\u4E92\u63DB\u6027\u554F\u984C\u304C\u767A\u751F\u3059\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30D5\u30A7\u30FC\u30C9",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\u7121\u52B9\u306A\u30D7\u30E9\u30B0\u30A4\u30F3\u306B\u8996\u899A\u7684\u306A\u30D5\u30A7\u30FC\u30C9\u52B9\u679C\u3092\u63D0\u4F9B\u3057\u3066\u3001\u6709\u52B9\u3068\u7121\u52B9\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u660E\u78BA\u306B\u533A\u5225\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30B3\u30DE\u30F3\u30C9\u3092\u500B\u5225\u306B\u5236\u5FA1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u5404\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u6709\u52B9/\u7121\u52B9\u72B6\u614B\u3092\u500B\u5225\u306B\u5236\u5FA1\u3067\u304D\u307E\u3059\u3002\uFF08Obsidian\u3092\u518D\u8D77\u52D5\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\uFF09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\u30B0\u30EB\u30FC\u30D7\u3054\u3068\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u30B3\u30DE\u30F3\u30C9\u3092\u5236\u5FA1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u6307\u5B9A\u3055\u308C\u305F\u30B0\u30EB\u30FC\u30D7\u5185\u306E\u3059\u3079\u3066\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30EF\u30F3\u30AF\u30EA\u30C3\u30AF\u3067\u6709\u52B9\u307E\u305F\u306F\u7121\u52B9\u306B\u3067\u304D\u307E\u3059\u3002\uFF08Obsidian\u3092\u518D\u8D77\u52D5\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\uFF09",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u9045\u5EF6] \u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u9045\u5EF6] ID\u304C\u65E2\u306B\u5B58\u5728\u3059\u308B\u304B\u3001\u7A7A\u3067\u3059",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u9045\u5EF6] \u524A\u9664\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u9045\u5EF6] \u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3001\u3053\u306E\u9045\u5EF6\u306E\u4E0B\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u5B58\u5728\u3057\u307E\u3059",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u30B0\u30EB\u30FC\u30D7] \u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u30B0\u30EB\u30FC\u30D7] ID\u304C\u65E2\u306B\u5B58\u5728\u3059\u308B\u304B\u3001\u7A7A\u3067\u3059",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u30B0\u30EB\u30FC\u30D7] \u524A\u9664\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u30B0\u30EB\u30FC\u30D7] \u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3001\u3053\u306E\u30B0\u30EB\u30FC\u30D7\u306E\u4E0B\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u5B58\u5728\u3057\u307E\u3059",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u30BF\u30B0] \u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u30BF\u30B0] ID\u304C\u65E2\u306B\u5B58\u5728\u3059\u308B\u304B\u3001\u7A7A\u3067\u3059",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u30BF\u30B0] \u524A\u9664\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u30BF\u30B0] \u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3001\u3053\u306E\u30BF\u30B0\u306E\u4E0B\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u5B58\u5728\u3057\u307E\u3059",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\u4ED6\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3068\u306E\u30B3\u30F3\u30D5\u30EA\u30AF\u30C8\u304C\u767A\u751F\u3057\u305F\u5834\u5408",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\u80FD\u529B\u306B\u9650\u308A\u304C\u3042\u308B\u305F\u3081\u3001\u3053\u306E\u554F\u984C\u3092\u4FEE\u6B63\u3067\u304D\u307E\u305B\u3093\u3002\u9045\u5EF6\u30B9\u30BF\u30FC\u30C8\u3092\u7121\u52B9\u306B\u3059\u308B\u3053\u3068\u3067\u3001\u3059\u3079\u3066\u306E\u30B3\u30F3\u30D5\u30EA\u30AF\u30C8\u554F\u984C\u3092\u89E3\u6C7A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC\u3092\u958B\u304F"
};

// src/lang/locale/ko.ts
var ko_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\uD50C\uB7EC\uADF8\uC778 \uAD00\uB9AC\uC790",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\uC131\uACF5",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\uC2E4\uD328",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\uCD94\uAC00",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\uC791\uC5C5",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\uAC80\uC0C9",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\uC774\uB984",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\uADF8\uB8F9 \uC5C6\uC74C",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\uD0DC\uADF8 \uC5C6\uC74C",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\uB51C\uB808\uC774 \uC5C6\uC74C",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\uCD1D\uACC4",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\uD65C\uC131\uD654",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\uBE44\uD65C\uC131\uD654",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\uC800\uC790\uC758 GitHub \uD398\uC774\uC9C0\uB97C \uBC29\uBB38\uD558\uC5EC \uD504\uB85C\uC81D\uD2B8 \uC138\uBD80 \uC815\uBCF4, \uC5C5\uB370\uC774\uD2B8 \uB85C\uADF8, \uD1A0\uB860 \uCC38\uC5EC, \uCF54\uB4DC \uAE30\uC5EC\uB97C \uD655\uC778\uD558\uC138\uC694.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\uBE44\uB514\uC624 \uD29C\uD1A0\uB9AC\uC5BC\uC5D0 \uC561\uC138\uC2A4",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\uD3B8\uC9D1 \uBAA8\uB4DC\uB97C \uD65C\uC131\uD654\uD558\uC5EC \uD50C\uB7EC\uADF8\uC778 \uC124\uC815\uC744 \uC790\uC138\uD788 \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778\uC744 \uB2E4\uC2DC \uB85C\uB4DC\uD558\uC5EC \uC989\uC2DC \uC801\uC6A9\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uC5C5\uB370\uC774\uD2B8\uB97C \uD655\uC778\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\uD55C \uBC88\uC5D0 \uBAA8\uB4E0 \uD50C\uB7EC\uADF8\uC778\uC744 \uBE44\uD65C\uC131\uD654\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\uD55C \uBC88\uC5D0 \uBAA8\uB4E0 \uD50C\uB7EC\uADF8\uC778\uC744 \uD65C\uC131\uD654\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uC124\uC815\uC744 \uAD00\uB9AC\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uB9CC \uD45C\uC2DC\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\uC124\uC815 \uC778\uD130\uD398\uC774\uC2A4\uB97C \uC5FD\uB2C8\uB2E4",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\uCD08\uAE30 \uC0C1\uD0DC\uB85C \uBCF5\uC6D0\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uB514\uB809\uD1A0\uB9AC\uB97C \uC5FD\uB2C8\uB2E4",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778\uC744 \uC644\uC804\uD788 \uC0AD\uC81C\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uC0C1\uD0DC\uB97C \uC804\uD658\uD558\uC138\uC694",
  \u5378\u8F7D_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uC81C\uAC70",
  \u5378\u8F7D_\u63D0\u793A: "\uC774 \uD50C\uB7EC\uADF8\uC778\uC744 \uC81C\uAC70\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C? \uC774 \uC791\uC5C5\uC740 \uD50C\uB7EC\uADF8\uC778 \uD3F4\uB354\uB97C \uC0AD\uC81C\uD569\uB2C8\uB2E4.",
  \u5378\u8F7D_\u5378\u8F7D: "\uC81C\uAC70",
  \u5378\u8F7D_\u53D6\u6D88: "\uCDE8\uC18C",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\uC131\uACF5\uC801\uC73C\uB85C \uC81C\uAC70\uB418\uC5C8\uC2B5\uB2C8\uB2E4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\uAE30\uBCF8",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\uADF8\uB8F9",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\uD0DC\uADF8",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\uB51C\uB808\uC774",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\uC5B8\uC5B4 \uC124\uC815",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\uC120\uD638\uD558\uB294 \uC5B8\uC5B4\uB97C \uC120\uD0DD\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\uB514\uB809\uD1A0\uB9AC \uC2A4\uD0C0\uC77C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\uADF8\uB8F9\uC758 \uC2A4\uD0C0\uC77C\uC744 \uC120\uD0DD\uD558\uC5EC \uBE0C\uB77C\uC6B0\uC9D5 \uACBD\uD5D8\uC744 \uD5A5\uC0C1\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\uADF8\uB8F9\uC758 \uC2A4\uD0C0\uC77C\uC744 \uC120\uD0DD\uD558\uC5EC \uB354 \uB208\uC5D0 \uB744\uACE0 \uC2DD\uBCC4\uD558\uAE30 \uC27D\uAC8C \uB9CC\uB4DC\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\uD0DC\uADF8 \uC2A4\uD0C0\uC77C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\uD0DC\uADF8\uC758 \uC2A4\uD0C0\uC77C\uC744 \uC120\uD0DD\uD558\uC5EC \uB354 \uB208\uC5D0 \uB744\uACE0 \uC2DD\uBCC4\uD558\uAE30 \uC27D\uAC8C \uB9CC\uB4DC\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\uC9C0\uC5F0 \uC2DC\uC791",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\uC9C0\uC5F0 \uC2DC\uC791 \uAE30\uB2A5\uC744 \uD65C\uC131\uD654\uD558\uBA74 \uB85C\uB529 \uC21C\uC11C\uB97C \uCD5C\uC801\uD654\uD560 \uC218 \uC788\uC9C0\uB9CC, \uC77C\uBD80 \uD50C\uB7EC\uADF8\uC778\uC5D0\uC11C \uD638\uD658\uC131 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD560 \uC218 \uC788\uC73C\uBBC0\uB85C \uC720\uC758\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uD750\uB9AC\uAC8C \uD45C\uC2DC",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\uBE44\uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uC5D0 \uC2DC\uAC01\uC801\uC778 \uD750\uB9BC \uD6A8\uACFC\uB97C \uC81C\uACF5\uD558\uC5EC \uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uACFC \uBE44\uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uC744 \uBA85\uD655\uD788 \uAD6C\uBD84\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uBA85\uB839\uC744 \uBCC4\uB3C4\uB85C \uC81C\uC5B4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\uC774 \uC635\uC158\uC744 \uD65C\uC131\uD654\uD558\uBA74 \uAC01 \uD50C\uB7EC\uADF8\uC778\uC758 \uD65C\uC131\uD654/\uBE44\uD65C\uC131\uD654 \uC0C1\uD0DC\uB97C \uBCC4\uB3C4\uB85C \uC81C\uC5B4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD574\uC57C \uC801\uC6A9\uB429\uB2C8\uB2E4)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\uADF8\uB8F9\uBCC4 \uD50C\uB7EC\uADF8\uC778 \uBA85\uB839 \uC81C\uC5B4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\uC774 \uC635\uC158\uC744 \uD65C\uC131\uD654\uD558\uBA74 \uC9C0\uC815\uB41C \uADF8\uB8F9\uC758 \uBAA8\uB4E0 \uD50C\uB7EC\uADF8\uC778\uC744 \uD55C \uBC88 \uD074\uB9AD\uC73C\uB85C \uD65C\uC131\uD654\uD558\uAC70\uB098 \uBE44\uD65C\uC131\uD654\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD574\uC57C \uC801\uC6A9\uB429\uB2C8\uB2E4)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\uB51C\uB808\uC774] \uCD94\uAC00\uB428",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\uB51C\uB808\uC774] ID\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD558\uAC70\uB098 \uBE44\uC5B4 \uC788\uC74C",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\uB51C\uB808\uC774] \uC131\uACF5\uC801\uC73C\uB85C \uC0AD\uC81C\uB428",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\uB51C\uB808\uC774] \uC0AD\uC81C \uC2E4\uD328, \uC774 \uB51C\uB808\uC774\uD558\uC5D0 \uD50C\uB7EC\uADF8\uC778\uC774 \uC874\uC7AC\uD568",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\uADF8\uB8F9] \uCD94\uAC00\uB428",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\uADF8\uB8F9] ID\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD558\uAC70\uB098 \uBE44\uC5B4 \uC788\uC74C",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\uADF8\uB8F9] \uC131\uACF5\uC801\uC73C\uB85C \uC0AD\uC81C\uB428",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\uADF8\uB8F9] \uC0AD\uC81C \uC2E4\uD328, \uC774 \uADF8\uB8F9\uD558\uC5D0 \uD50C\uB7EC\uADF8\uC778\uC774 \uC874\uC7AC\uD568",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\uD0DC\uADF8] \uCD94\uAC00\uB428",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\uD0DC\uADF8] ID\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD558\uAC70\uB098 \uBE44\uC5B4 \uC788\uC74C",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\uD0DC\uADF8] \uC131\uACF5\uC801\uC73C\uB85C \uC0AD\uC81C\uB428",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\uD0DC\uADF8] \uC0AD\uC81C \uC2E4\uD328, \uC774 \uD0DC\uADF8\uD558\uC5D0 \uD50C\uB7EC\uADF8\uC778\uC774 \uC874\uC7AC\uD568",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\uB2E4\uB978 \uD50C\uB7EC\uADF8\uC778\uACFC\uC758 \uCDA9\uB3CC\uC774 \uBC1C\uC0DD\uD560 \uACBD\uC6B0",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\uB2A5\uB825\uC774 \uC81C\uD55C\uB418\uC5B4 \uC788\uC5B4 \uC774 \uBB38\uC81C\uB97C \uD574\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC9C0\uC5F0 \uC2DC\uC791\uC744 \uBE44\uD65C\uC131\uD654\uD558\uC5EC \uBAA8\uB4E0 \uCDA9\uB3CC \uBB38\uC81C\uB97C \uD574\uACB0\uD558\uC138\uC694.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uAD00\uB9AC\uC790\uB97C \uC5FD\uB2C8\uB2E4"
};

// src/lang/locale/fr.ts
var fr_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "Gestionnaire de plugins",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "Succ\xE8s",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\xC9chec",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "Ajouter",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "Op\xE9ration",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "Recherche",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "Nom",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "Aucun groupe",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "Aucun tag",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "Aucun retard",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "Total",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "Activer",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "D\xE9sactiver",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "Visitez la page GitHub de l'auteur pour voir les d\xE9tails du projet, les journaux de mise \xE0 jour, participer aux discussions et contribuer du code.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "Acc\xE9dez aux tutoriels vid\xE9o",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "Activez le mode \xE9dition pour une personnalisation approfondie de la configuration des plugins",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "Rechargez les plugins pour qu'ils prennent effet imm\xE9diatement",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "V\xE9rifiez les mises \xE0 jour des plugins",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "D\xE9sactivez tous les plugins en une fois",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "Activez tous les plugins en une fois",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "G\xE9rez les param\xE8tres des plugins",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Affichez uniquement les plugins activ\xE9s",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "Ouvrez l'interface de param\xE8tres",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "R\xE9tablissez l'\xE9tat initial",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "Ouvrez le r\xE9pertoire des plugins",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "Supprimez compl\xE8tement le plugin",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "Basculer l'\xE9tat du plugin",
  \u5378\u8F7D_\u6807\u9898: "D\xE9sinstaller le plugin",
  \u5378\u8F7D_\u63D0\u793A: "\xCAtes-vous s\xFBr de vouloir d\xE9sinstaller ce plugin ? Cela supprimera le dossier du plugin.",
  \u5378\u8F7D_\u5378\u8F7D: "D\xE9sinstaller",
  \u5378\u8F7D_\u53D6\u6D88: "Annuler",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "D\xE9sinstall\xE9 avec succ\xE8s",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "Param\xE8tres de base",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "Groupe",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "Tag",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "Retard",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "Param\xE8tres de langue",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "Choisissez votre langue pr\xE9f\xE9r\xE9e.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "Style du r\xE9pertoire",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "Choisissez le style du groupe pour am\xE9liorer l'exp\xE9rience de navigation.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "Style du groupe",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "Choisissez le style du groupe pour le rendre plus visible et facile \xE0 identifier.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "Style du tag",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "Choisissez le style du tag pour le rendre plus visible et facile \xE0 identifier.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "D\xE9marrage diff\xE9r\xE9",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "L'activation de la fonction de d\xE9marrage diff\xE9r\xE9 peut optimiser l'ordre de chargement, mais veuillez noter que cela peut causer des probl\xE8mes de compatibilit\xE9 avec certains plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "Estomper les plugins",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "Appliquez un effet de transparence visuel aux plugins d\xE9sactiv\xE9s pour distinguer clairement les plugins activ\xE9s et d\xE9sactiv\xE9s.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "Contr\xF4ler les commandes des plugins s\xE9par\xE9ment",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "Activez cette option pour contr\xF4ler l'\xE9tat activ\xE9 et d\xE9sactiv\xE9 de chaque plugin s\xE9par\xE9ment. (Red\xE9marrez Obsidian pour que les modifications prennent effet)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "Contr\xF4ler les commandes des plugins par groupe",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "Activez cette option pour activer ou d\xE9sactiver tous les plugins d'un groupe sp\xE9cifique avec un seul clic. (Red\xE9marrez Obsidian pour que les modifications prennent effet)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Retard] Ajout\xE9",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Retard] L'ID existe d\xE9j\xE0 ou est vide",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Retard] Supprim\xE9 avec succ\xE8s",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Retard] \xC9chec de la suppression, des plugins existent sous ce retard",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Groupe] Ajout\xE9",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Groupe] L'ID existe d\xE9j\xE0 ou est vide",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Groupe] Supprim\xE9 avec succ\xE8s",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Groupe] \xC9chec de la suppression, des plugins existent sous ce groupe",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Tag] Ajout\xE9",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Tag] L'ID existe d\xE9j\xE0 ou est vide",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Tag] Supprim\xE9 avec succ\xE8s",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Tag] \xC9chec de la suppression, des plugins existent sous ce tag",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "Si vous rencontrez des conflits avec d'autres plugins",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "En raison de capacit\xE9s limit\xE9es, je ne peux pas r\xE9soudre ce probl\xE8me. Veuillez d\xE9sactiver le d\xE9marrage diff\xE9r\xE9 pour r\xE9soudre tous les probl\xE8mes de conflit.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "Ouvrez le gestionnaire de plugins"
};

// src/lang/locale/es.ts
var es_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "Administrador de plugins",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\xC9xito",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "Fallo",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "Agregar",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "Operaci\xF3n",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "Buscar",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "Nombre",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "Sin grupo",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "Sin etiqueta",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "Sin retraso",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "Total",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "Habilitar",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "Deshabilitar",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "Visite la p\xE1gina de GitHub del autor para ver detalles del proyecto, registros de actualizaciones, participar en discusiones y contribuir con c\xF3digo.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "Acceder a tutoriales en video",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "Habilitar modo de edici\xF3n para una personalizaci\xF3n profunda de la configuraci\xF3n del plugin",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "Recargar plugins para que surtan efecto inmediatamente",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "Comprobar actualizaciones de plugins",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "Deshabilitar todos los plugins a la vez",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "Habilitar todos los plugins a la vez",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "Administrar configuraci\xF3n de plugins",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Mostrar solo plugins habilitados",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "Abrir la interfaz de configuraci\xF3n",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "Restaurar al estado inicial",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "Abrir el directorio de plugins",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "Eliminar completamente el plugin",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "Alternar el estado del plugin",
  \u5378\u8F7D_\u6807\u9898: "Desinstalar Plugin",
  \u5378\u8F7D_\u63D0\u793A: "\xBFEst\xE1 seguro de que desea desinstalar este plugin? Esto eliminar\xE1 la carpeta del plugin.",
  \u5378\u8F7D_\u5378\u8F7D: "Desinstalar",
  \u5378\u8F7D_\u53D6\u6D88: "Cancelar",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "Desinstalado correctamente",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "Configuraci\xF3n b\xE1sica",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "Grupo",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "Etiqueta",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "Retraso",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "Configuraci\xF3n de idioma",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "Seleccione su idioma preferido.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "Estilo del directorio",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "Seleccione el estilo del grupo para mejorar la experiencia de navegaci\xF3n.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "Estilo del grupo",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "Seleccione el estilo del grupo para hacerlo m\xE1s visible y f\xE1cil de identificar.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "Estilo de la etiqueta",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "Seleccione el estilo de la etiqueta para hacerlo m\xE1s visible y f\xE1cil de identificar.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "Inicio con retraso",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "Habilitar la funci\xF3n de inicio con retraso puede optimizar el orden de carga, pero tenga en cuenta que esto puede causar problemas de compatibilidad con algunos plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "Atenuar plugins",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "Proporcione un efecto de atenuaci\xF3n visual para plugins deshabilitados para distinguir claramente entre plugins habilitados y deshabilitados.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "Controlar comandos de plugins por separado",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "Habilite esta opci\xF3n para controlar el estado habilitado y deshabilitado de cada plugin por separado. (Reinicie Obsidian para que surtan efecto)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "Controlar comandos de plugins por grupo",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "Habilite esta opci\xF3n para habilitar o deshabilitar todos los plugins de un grupo espec\xEDfico con un solo clic. (Reinicie Obsidian para que surtan efecto)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Retraso] A\xF1adido",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Retraso] El ID ya existe o est\xE1 vac\xEDo",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Retraso] Eliminado correctamente",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Retraso] Fallo al eliminar, existen plugins bajo este retraso",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Grupo] A\xF1adido",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Grupo] El ID ya existe o est\xE1 vac\xEDo",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Grupo] Eliminado correctamente",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Grupo] Fallo al eliminar, existen plugins bajo este grupo",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Etiqueta] A\xF1adido",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Etiqueta] El ID ya existe o est\xE1 vac\xEDo",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Etiqueta] Eliminado correctamente",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Etiqueta] Fallo al eliminar, existen plugins bajo esta etiqueta",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "Si encuentra conflictos con otros plugins",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "Debido a capacidades limitadas, no puedo solucionar este problema. Por favor, deshabilite el inicio con retraso para resolver todos los problemas de conflicto.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "Abrir el administrador de plugins"
};

// src/lang/inxdex.ts
var Translator = class {
  constructor(manager) {
    this.language = {
      "zh-cn": "\u7B80\u4F53\u4E2D\u6587",
      "en": "English",
      "ru": "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A",
      "ja": "\u65E5\u672C\u8A9E",
      "ko": "\uD55C\uAD6D\uC5B4",
      "fr": "Fran\xE7ais",
      "es": "Espa\xF1ol"
    };
    this.localeMap = {
      "zh-cn": zh_cn_default,
      "en": en_default,
      "ru": ru_default,
      "ja": ja_default,
      "ko": ko_default,
      "fr": fr_default,
      "es": es_default
    };
    this.manager = manager;
  }
  // 方法用于获取翻译后的字符串
  t(str) {
    const language = this.manager.settings.LANGUAGE || "zh-cn";
    const locale = this.localeMap[language] || zh_cn_default;
    return locale[str] || zh_cn_default[str];
  }
};

// src/main.ts
var Manager = class extends import_obsidian13.Plugin {
  async onload() {
    this.appPlugins = this.app.plugins;
    this.appWorkspace = this.app.workspace;
    console.log(`%c ${this.manifest.name} %c v${this.manifest.version} `, `padding: 2px; border-radius: 2px 0 0 2px; color: #fff; background: #5B5B5B;`, `padding: 2px; border-radius: 0 2px 2px 0; color: #fff; background: #409EFF;`);
    await this.loadSettings();
    this.translator = new Translator(this);
    this.addRibbonIcon("folder-cog", this.translator.t("\u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C"), () => {
      this.managerModal = new ManagerModal(this.app, this);
      this.managerModal.open();
    });
    this.addSettingTab(new ManagerSettingTab(this.app, this));
    this.settings.DELAY ? this.enableDelay() : this.disableDelay();
    command_default(this.app, this);
  }
  async onunload() {
    if (this.settings.DELAY)
      this.disableDelaysForAllPlugins();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  // 关闭延时 调用
  disableDelay() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    this.synchronizePlugins(plugins);
  }
  // 开启延时 调用
  enableDelay() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    this.synchronizePlugins(plugins);
    plugins.forEach((plugin) => this.startPluginWithDelay(plugin.id));
  }
  // 为所有插件启动延迟
  enableDelaysForAllPlugins() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    this.synchronizePlugins(plugins);
    plugins.forEach(async (plugin) => {
      const isEnabled = this.appPlugins.enabledPlugins.has(plugin.id);
      if (isEnabled) {
        await this.appPlugins.disablePluginAndSave(plugin.id);
        await this.appPlugins.enablePlugin(plugin.id);
        const mp = this.settings.Plugins.find((p) => p.id === plugin.id);
        if (mp)
          mp.enabled = true;
        this.saveSettings();
      } else {
        const mp = this.settings.Plugins.find((p) => p.id === plugin.id);
        if (mp)
          mp.enabled = false;
        this.saveSettings();
      }
    });
  }
  // 为所有插件关闭延迟
  disableDelaysForAllPlugins() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    plugins.forEach(async (pm) => {
      const plugin = this.settings.Plugins.find((p) => p.id === pm.id);
      if (plugin) {
        if (plugin.enabled) {
          await this.appPlugins.disablePlugin(pm.id);
          await this.appPlugins.enablePluginAndSave(pm.id);
        }
      }
    });
  }
  // 延时启动指定插件
  startPluginWithDelay(id) {
    const plugin = this.settings.Plugins.find((p) => p.id === id);
    if (plugin && plugin.enabled) {
      const delay = this.settings.DELAYS.find((item) => item.id === plugin.delay);
      const time = delay ? delay.time : 0;
      setTimeout(() => {
        this.appPlugins.enablePlugin(id);
      }, time * 1e3);
    }
  }
  // 同步插件到配置文件
  synchronizePlugins(p1) {
    const p2 = this.settings.Plugins;
    p2.forEach((p2Item) => {
      if (!p1.some((p1Item) => p1Item.id === p2Item.id)) {
        this.settings.Plugins = this.settings.Plugins.filter((pm) => pm.id !== p2Item.id);
      }
    });
    p1.forEach((p1Item) => {
      if (!p2.some((p2Item) => p2Item.id === p1Item.id)) {
        const isEnabled = this.appPlugins.enabledPlugins.has(p1Item.id);
        this.settings.Plugins.push({
          "id": p1Item.id,
          "name": p1Item.name,
          "desc": p1Item.description,
          "group": "",
          "tags": [],
          "enabled": isEnabled,
          "delay": "",
          "note": ""
        });
      }
    });
    this.saveSettings();
  }
  // 工具函数
  createTag(text, color, type) {
    const style = this.generateTagStyle(color, type);
    const tag = createEl("span", {
      text,
      cls: "manager-tag",
      attr: { "style": style }
    });
    return tag;
  }
  generateTagStyle(color, type) {
    let style;
    const [r, g, b] = this.hexToRgbArray(color);
    switch (type) {
      case "a":
        style = `color: #fff; background-color: ${color}; border-color: ${color};`;
        break;
      case "b":
        style = `color: ${color}; background-color: transparent; border-color: ${color};`;
        break;
      case "c":
        style = `color: ${color}; background-color: rgba(${r}, ${g}, ${b}, 0.3); border-color: ${color};`;
        break;
      case "d":
        style = `color: ${color}; background-color: ${this.adjustColorBrightness(color, 50)}; border-color: ${this.adjustColorBrightness(color, 50)};`;
        break;
      default:
        style = `background-color: transparent;border-style: dashed;`;
    }
    return style;
  }
  hexToRgbArray(hex) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = rgb >> 16;
    const g = rgb >> 8 & 255;
    const b = rgb & 255;
    return [r, g, b];
  }
  adjustColorBrightness(hex, amount) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (rgb >> 16 & 255) + amount));
    const g = Math.min(255, Math.max(0, (rgb >> 8 & 255) + amount));
    const b = Math.min(255, Math.max(0, (rgb & 255) + amount));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
};

// main.ts
var main_default = Manager;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyIsICJzcmMvbWFpbi50cyIsICJzcmMvc2V0dGluZ3MvZGF0YS50cyIsICJzcmMvc2V0dGluZ3MvaW5kZXgudHMiLCAic3JjL3NldHRpbmdzL2Jhc2Utc2V0dGluZy50cyIsICJzcmMvc2V0dGluZ3MvdWkvbWFuYWdlci1iYXNpcy50cyIsICJzcmMvbW9kYWwvbWFuYWdlci1tb2RhbC50cyIsICJzcmMvdXRpbHMudHMiLCAic3JjL21vZGFsL2dyb3VwLW1vZGFsLnRzIiwgInNyYy9tb2RhbC90YWdzLW1vZGFsLnRzIiwgInNyYy9tb2RhbC9kZWxldGUtbW9kYWwudHMiLCAic3JjL21vZGFsL2Rpc2FibGUtbW9kYWwudHMiLCAic3JjL21vZGFsL25vdGUtbW9kYWwudHMiLCAic3JjL2NvbW1hbmQudHMiLCAic3JjL3NldHRpbmdzL3VpL21hbmFnZXItZGVsYXkudHMiLCAic3JjL3NldHRpbmdzL3VpL21hbmFnZXItdGFnLnRzIiwgInNyYy9zZXR0aW5ncy91aS9tYW5hZ2VyLWdyb3VwLnRzIiwgInNyYy9sYW5nL2xvY2FsZS96aF9jbi50cyIsICJzcmMvbGFuZy9sb2NhbGUvZW4udHMiLCAic3JjL2xhbmcvbG9jYWxlL3J1LnRzIiwgInNyYy9sYW5nL2xvY2FsZS9qYS50cyIsICJzcmMvbGFuZy9sb2NhbGUva28udHMiLCAic3JjL2xhbmcvbG9jYWxlL2ZyLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9lcy50cyIsICJzcmMvbGFuZy9pbnhkZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBNYW5hZ2VyIGZyb20gJy4vc3JjL21haW4nXG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXJcbiIsICJpbXBvcnQgeyBQbHVnaW4sIFBsdWdpbk1hbmlmZXN0LCBXb3Jrc3BhY2UgfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IERFRkFVTFRfU0VUVElOR1MsIE1hbmFnZXJTZXR0aW5ncyB9IGZyb20gJy4vc2V0dGluZ3MvZGF0YSc7XHJcbmltcG9ydCB7IE1hbmFnZXJTZXR0aW5nVGFiIH0gZnJvbSAnLi9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0b3IgfSBmcm9tICcuL2xhbmcvaW54ZGV4JztcclxuaW1wb3J0IHsgTWFuYWdlck1vZGFsIH0gZnJvbSAnLi9tb2RhbC9tYW5hZ2VyLW1vZGFsJztcclxuaW1wb3J0IENvbW1hbmRzIGZyb20gJy4vY29tbWFuZCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyIGV4dGVuZHMgUGx1Z2luIHtcclxuICAgIHB1YmxpYyBzZXR0aW5nczogTWFuYWdlclNldHRpbmdzO1xyXG4gICAgcHVibGljIG1hbmFnZXJNb2RhbDogTWFuYWdlck1vZGFsO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIHB1YmxpYyBhcHBQbHVnaW5zOiBhbnk7XHJcbiAgICBwdWJsaWMgYXBwV29ya3NwYWNlOiBXb3Jrc3BhY2U7XHJcbiAgICBwdWJsaWMgdHJhbnNsYXRvcjogVHJhbnNsYXRvcjtcclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgb25sb2FkKCkge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmFwcFBsdWdpbnMgPSB0aGlzLmFwcC5wbHVnaW5zO1xyXG4gICAgICAgIHRoaXMuYXBwV29ya3NwYWNlID0gdGhpcy5hcHAud29ya3NwYWNlO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhgJWMgJHt0aGlzLm1hbmlmZXN0Lm5hbWV9ICVjIHYke3RoaXMubWFuaWZlc3QudmVyc2lvbn0gYCwgYHBhZGRpbmc6IDJweDsgYm9yZGVyLXJhZGl1czogMnB4IDAgMCAycHg7IGNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kOiAjNUI1QjVCO2AsIGBwYWRkaW5nOiAycHg7IGJvcmRlci1yYWRpdXM6IDAgMnB4IDJweCAwOyBjb2xvcjogI2ZmZjsgYmFja2dyb3VuZDogIzQwOUVGRjtgKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG4gICAgICAgIC8vIFx1NTIxRFx1NTlDQlx1NTMxNlx1OEJFRFx1OEEwMFx1N0NGQlx1N0VERlxyXG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG5ldyBUcmFuc2xhdG9yKHRoaXMpO1xyXG4gICAgICAgIC8vIFx1NTIxRFx1NTlDQlx1NTMxNlx1NEZBN1x1OEZCOVx1NjgwRlx1NTZGRVx1NjgwN1xyXG4gICAgICAgIHRoaXMuYWRkUmliYm9uSWNvbignZm9sZGVyLWNvZycsIHRoaXMudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU3QkExXHU3NDA2XHU1NjY4X1x1NjU4N1x1NjcyQycpLCAoKSA9PiB7IHRoaXMubWFuYWdlck1vZGFsID0gbmV3IE1hbmFnZXJNb2RhbCh0aGlzLmFwcCwgdGhpcyk7IHRoaXMubWFuYWdlck1vZGFsLm9wZW4oKTsgfSk7XHJcbiAgICAgICAgLy8gXHU1MjFEXHU1OUNCXHU1MzE2XHU4QkJFXHU3RjZFXHU3NTRDXHU5NzYyXHJcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBNYW5hZ2VyU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuREVMQVkgPyB0aGlzLmVuYWJsZURlbGF5KCkgOiB0aGlzLmRpc2FibGVEZWxheSgpO1xyXG4gICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgb251bmxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuREVMQVkpIHRoaXMuZGlzYWJsZURlbGF5c0ZvckFsbFBsdWdpbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgbG9hZFNldHRpbmdzKCkgeyB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTsgfVxyXG4gICAgcHVibGljIGFzeW5jIHNhdmVTZXR0aW5ncygpIHsgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTsgfVxyXG5cclxuXHJcblxyXG4gICAgLy8gXHU1MTczXHU5NUVEXHU1RUY2XHU2NUY2IFx1OEMwM1x1NzUyOFxyXG4gICAgcHVibGljIGRpc2FibGVEZWxheSgpIHtcclxuICAgICAgICBjb25zdCBwbHVnaW5zID0gT2JqZWN0LnZhbHVlcyh0aGlzLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5maWx0ZXIoKHBtOiBQbHVnaW5NYW5pZmVzdCkgPT4gcG0uaWQgIT09IHRoaXMubWFuaWZlc3QuaWQpIGFzIFBsdWdpbk1hbmlmZXN0W107XHJcbiAgICAgICAgdGhpcy5zeW5jaHJvbml6ZVBsdWdpbnMocGx1Z2lucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU1RjAwXHU1NDJGXHU1RUY2XHU2NUY2IFx1OEMwM1x1NzUyOFxyXG4gICAgcHVibGljIGVuYWJsZURlbGF5KCkge1xyXG4gICAgICAgIGNvbnN0IHBsdWdpbnMgPSBPYmplY3QudmFsdWVzKHRoaXMuYXBwUGx1Z2lucy5tYW5pZmVzdHMpLmZpbHRlcigocG06IFBsdWdpbk1hbmlmZXN0KSA9PiBwbS5pZCAhPT0gdGhpcy5tYW5pZmVzdC5pZCkgYXMgUGx1Z2luTWFuaWZlc3RbXTtcclxuICAgICAgICAvLyBcdTU0MENcdTZCNjVcdTYzRDJcdTRFRjZcclxuICAgICAgICB0aGlzLnN5bmNocm9uaXplUGx1Z2lucyhwbHVnaW5zKTtcclxuICAgICAgICAvLyBcdTVGMDBcdTU5Q0JcdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThcdTYzRDJcdTRFRjZcclxuICAgICAgICBwbHVnaW5zLmZvckVhY2goKHBsdWdpbjogUGx1Z2luTWFuaWZlc3QpID0+IHRoaXMuc3RhcnRQbHVnaW5XaXRoRGVsYXkocGx1Z2luLmlkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU0RTNBXHU2MjQwXHU2NzA5XHU2M0QyXHU0RUY2XHU1NDJGXHU1MkE4XHU1RUY2XHU4RkRGXHJcbiAgICBwdWJsaWMgZW5hYmxlRGVsYXlzRm9yQWxsUGx1Z2lucygpIHtcclxuICAgICAgICAvLyBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTYzRDJcdTRFRjZcclxuICAgICAgICBjb25zdCBwbHVnaW5zID0gT2JqZWN0LnZhbHVlcyh0aGlzLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5maWx0ZXIoKHBtOiBQbHVnaW5NYW5pZmVzdCkgPT4gcG0uaWQgIT09IHRoaXMubWFuaWZlc3QuaWQpIGFzIFBsdWdpbk1hbmlmZXN0W107XHJcbiAgICAgICAgLy8gXHU1NDBDXHU2QjY1XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgdGhpcy5zeW5jaHJvbml6ZVBsdWdpbnMocGx1Z2lucyk7XHJcbiAgICAgICAgcGx1Z2lucy5mb3JFYWNoKGFzeW5jIChwbHVnaW46IFBsdWdpbk1hbmlmZXN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFx1NjNEMlx1NEVGNlx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAgICBjb25zdCBpc0VuYWJsZWQgPSB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlZFBsdWdpbnMuaGFzKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgIGlmIChpc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIDEuIFx1NTE3M1x1OTVFRFx1NjNEMlx1NEVGNlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAvLyAyLiBcdTVGMDBcdTU0MkZcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW4ocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgIC8vIDMuIFx1NTIwN1x1NjM2Mlx1OTE0RFx1N0Y2RVx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbXAgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuZmluZChwID0+IHAuaWQgPT09IHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXApIG1wLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gNC4gXHU0RkREXHU1QjU4XHU3MkI2XHU2MDAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gMS4gXHU1MjA3XHU2MzYyXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtcCA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5maW5kKHAgPT4gcC5pZCA9PT0gcGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChtcCkgbXAuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gMi4gXHU0RkREXHU1QjU4XHU3MkI2XHU2MDAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU0RTNBXHU2MjQwXHU2NzA5XHU2M0QyXHU0RUY2XHU1MTczXHU5NUVEXHU1RUY2XHU4RkRGXHJcbiAgICBwdWJsaWMgZGlzYWJsZURlbGF5c0ZvckFsbFBsdWdpbnMoKSB7XHJcbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cykuZmlsdGVyKChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHBtLmlkICE9PSB0aGlzLm1hbmlmZXN0LmlkKTtcclxuICAgICAgICBwbHVnaW5zLmZvckVhY2goYXN5bmMgKHBtOiBQbHVnaW5NYW5pZmVzdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuZmluZChwID0+IHAuaWQgPT09IHBtLmlkKVxyXG4gICAgICAgICAgICBpZiAocGx1Z2luKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGx1Z2luLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbihwbS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbkFuZFNhdmUocG0uaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4XHU2MzA3XHU1QjlBXHU2M0QyXHU0RUY2XHJcbiAgICBwcml2YXRlIHN0YXJ0UGx1Z2luV2l0aERlbGF5KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuZmluZChwID0+IHAuaWQgPT09IGlkKTtcclxuICAgICAgICBpZiAocGx1Z2luICYmIHBsdWdpbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5zZXR0aW5ncy5ERUxBWVMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IHBsdWdpbi5kZWxheSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBkZWxheSA/IGRlbGF5LnRpbWUgOiAwO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW4oaWQpO1xyXG4gICAgICAgICAgICB9LCB0aW1lICogMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFx1NTQwQ1x1NkI2NVx1NjNEMlx1NEVGNlx1NTIzMFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlxyXG4gICAgcHVibGljIHN5bmNocm9uaXplUGx1Z2lucyhwMTogUGx1Z2luTWFuaWZlc3RbXSkge1xyXG4gICAgICAgIGNvbnN0IHAyID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zO1xyXG4gICAgICAgIHAyLmZvckVhY2gocDJJdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKCFwMS5zb21lKHAxSXRlbSA9PiBwMUl0ZW0uaWQgPT09IHAySXRlbS5pZCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuUGx1Z2lucyA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5maWx0ZXIocG0gPT4gcG0uaWQgIT09IHAySXRlbS5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwMS5mb3JFYWNoKHAxSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcDIuc29tZShwMkl0ZW0gPT4gcDJJdGVtLmlkID09PSBwMUl0ZW0uaWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0VuYWJsZWQgPSB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlZFBsdWdpbnMuaGFzKHAxSXRlbS5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLlBsdWdpbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogcDFJdGVtLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICduYW1lJzogcDFJdGVtLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Rlc2MnOiBwMUl0ZW0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2dyb3VwJzogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RhZ3MnOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAnZW5hYmxlZCc6IGlzRW5hYmxlZCxcclxuICAgICAgICAgICAgICAgICAgICAnZGVsYXknOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAnbm90ZSc6ICcnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFx1NEZERFx1NUI1OFx1OEJCRVx1N0Y2RVxyXG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU1REU1XHU1MTc3XHU1MUZEXHU2NTcwXHJcbiAgICBwdWJsaWMgY3JlYXRlVGFnKHRleHQ6IHN0cmluZywgY29sb3I6IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdlbmVyYXRlVGFnU3R5bGUoY29sb3IsIHR5cGUpO1xyXG4gICAgICAgIGNvbnN0IHRhZyA9IGNyZWF0ZUVsKCdzcGFuJywge1xyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICBjbHM6ICdtYW5hZ2VyLXRhZycsXHJcbiAgICAgICAgICAgIGF0dHI6IHsgJ3N0eWxlJzogc3R5bGUgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZW5lcmF0ZVRhZ1N0eWxlKGNvbG9yOiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzdHlsZTtcclxuICAgICAgICBjb25zdCBbciwgZywgYl0gPSB0aGlzLmhleFRvUmdiQXJyYXkoY29sb3IpO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhJzpcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gYGNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTsgYm9yZGVyLWNvbG9yOiAke2NvbG9yfTtgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBgY29sb3I6ICR7Y29sb3J9OyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgYm9yZGVyLWNvbG9yOiAke2NvbG9yfTtgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2MnOlxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBgY29sb3I6ICR7Y29sb3J9OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCR7cn0sICR7Z30sICR7Yn0sIDAuMyk7IGJvcmRlci1jb2xvcjogJHtjb2xvcn07YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkJzpcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gYGNvbG9yOiAke2NvbG9yfTsgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmFkanVzdENvbG9yQnJpZ2h0bmVzcyhjb2xvciwgNTApfTsgYm9yZGVyLWNvbG9yOiAke3RoaXMuYWRqdXN0Q29sb3JCcmlnaHRuZXNzKGNvbG9yLCA1MCl9O2A7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gYGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O2JvcmRlci1zdHlsZTogZGFzaGVkO2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBoZXhUb1JnYkFycmF5KGhleDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcmdiID0gcGFyc2VJbnQoaGV4LnNsaWNlKDEpLCAxNik7XHJcbiAgICAgICAgY29uc3QgciA9IChyZ2IgPj4gMTYpO1xyXG4gICAgICAgIGNvbnN0IGcgPSAoKHJnYiA+PiA4KSAmIDB4MDBGRik7XHJcbiAgICAgICAgY29uc3QgYiA9IChyZ2IgJiAweDAwMDBGRik7XHJcbiAgICAgICAgcmV0dXJuIFtyLCBnLCBiXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGp1c3RDb2xvckJyaWdodG5lc3MoaGV4OiBzdHJpbmcsIGFtb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcmdiID0gcGFyc2VJbnQoaGV4LnNsaWNlKDEpLCAxNik7XHJcbiAgICAgICAgY29uc3QgciA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgKChyZ2IgPj4gMTYpICYgMHhGRikgKyBhbW91bnQpKTtcclxuICAgICAgICBjb25zdCBnID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCAoKHJnYiA+PiA4KSAmIDB4RkYpICsgYW1vdW50KSk7XHJcbiAgICAgICAgY29uc3QgYiA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgKHJnYiAmIDB4RkYpICsgYW1vdW50KSk7XHJcbiAgICAgICAgcmV0dXJuIGAjJHsoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSkudG9VcHBlckNhc2UoKX1gO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCAiaW1wb3J0IHsgRGVsYXksIE1hbmFnZXJQbHVnaW4sIFRhZywgVHlwZSB9IGZyb20gJy4uL2RhdGEvdHlwZXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYW5hZ2VyU2V0dGluZ3Mge1xyXG5cdC8vIFx1N0I1Qlx1OTAwOVxyXG5cdFBFUlNJU1RFTkNFOiBib29sZWFuO1xyXG5cdEZJTFRFUl9UQUc6IHN0cmluZztcclxuXHRGSUxURVJfR1JPVVA6IHN0cmluZztcclxuXHRGSUxURVJfREVMQVk6IHN0cmluZztcclxuXHJcblx0TEFOR1VBR0U6IHN0cmluZztcclxuXHRDRU5URVI6IGJvb2xlYW47XHJcblx0SVRFTV9TVFlMRTogc3RyaW5nO1xyXG5cdEdST1VQX1NUWUxFOiBzdHJpbmc7XHJcblx0VEFHX1NUWUxFOiBzdHJpbmc7XHJcblx0REVMQVk6IGJvb2xlYW47XHJcblx0RkFERV9PVVRfRElTQUJMRURfUExVR0lOUzogYm9vbGVhbjtcclxuXHRDT01NQU5EX0lURU06IGJvb2xlYW47XHJcblx0Q09NTUFORF9HUk9VUDogYm9vbGVhbjtcclxuXHRHUk9VUFM6IFR5cGVbXTtcclxuXHRUQUdTOiBUYWdbXTtcclxuXHRERUxBWVM6IERlbGF5W107XHJcblx0UGx1Z2luczogTWFuYWdlclBsdWdpbltdO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogTWFuYWdlclNldHRpbmdzID0ge1xyXG5cdFBFUlNJU1RFTkNFOiBmYWxzZSxcclxuXHQvLyBcdTdCNUJcdTkwMDlcclxuXHRGSUxURVJfVEFHOiBcIlwiLFxyXG5cdEZJTFRFUl9HUk9VUDogXCJcIixcclxuXHRGSUxURVJfREVMQVk6IFwiXCIsXHJcblxyXG5cdExBTkdVQUdFOiBcInpoLWNuXCIsXHJcblx0Q0VOVEVSOiBmYWxzZSxcclxuXHRJVEVNX1NUWUxFOiBcImFsd2F5c0V4cGFuZFwiLFxyXG5cdEdST1VQX1NUWUxFOiBcImFcIixcclxuXHRUQUdfU1RZTEU6IFwiYlwiLFxyXG5cdERFTEFZOiBmYWxzZSxcclxuXHRGQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TOiB0cnVlLFxyXG5cdENPTU1BTkRfSVRFTTogZmFsc2UsXHJcblx0Q09NTUFORF9HUk9VUDogZmFsc2UsXHJcblx0R1JPVVBTOiBbXHJcblx0XHR7XHJcblx0XHRcdFwiaWRcIjogXCJkZWZhdWx0XCIsXHJcblx0XHRcdFwibmFtZVwiOiBcIlx1OUVEOFx1OEJBNFx1N0VDNFwiLFxyXG5cdFx0XHRcImNvbG9yXCI6IFwiI0EwNzlGRlwiXHJcblx0XHR9LFxyXG5cdF0sXHJcblx0VEFHUzogW1xyXG5cdFx0e1xyXG5cdFx0XHRcImlkXCI6IFwiZGVmYXVsdFwiLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJcdTlFRDhcdThCQTRcdTY4MDdcdTdCN0VcIixcclxuXHRcdFx0XCJjb2xvclwiOiBcIiNBMDc5RkZcIlxyXG5cdFx0fSxcclxuXHRdLFxyXG5cdERFTEFZUzogW1xyXG5cdFx0e1xyXG5cdFx0XHRcImlkXCI6IFwiZGVmYXVsdFwiLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJcdTlFRDhcdThCQTRcdTVFRjZcdThGREZcIixcclxuXHRcdFx0XCJ0aW1lXCI6IDEwXHJcblx0XHR9LFxyXG5cdF0sXHJcblx0UGx1Z2luczogW10sXHJcbn1cclxuIiwgImltcG9ydCB7IEFwcCwgUGx1Z2luU2V0dGluZ1RhYiB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4uL21haW5cIjtcclxuXHJcbmltcG9ydCBNYW5hZ2VyQmFzaXMgZnJvbSAnLi91aS9tYW5hZ2VyLWJhc2lzJztcclxuaW1wb3J0IE1hbmFnZXJEZWxheSBmcm9tICcuL3VpL21hbmFnZXItZGVsYXknO1xyXG5pbXBvcnQgTWFuYWdlclRhZyBmcm9tICcuL3VpL21hbmFnZXItdGFnJztcclxuaW1wb3J0IE1hbmFnZXJHcm91cCBmcm9tICcuL3VpL21hbmFnZXItZ3JvdXAnO1xyXG5cclxuY2xhc3MgTWFuYWdlclNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHRtYW5hZ2VyOiBNYW5hZ2VyO1xyXG5cdGFwcDogQXBwO1xyXG5cdGNvbnRlbnRFbDogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBtYW5hZ2VyOiBNYW5hZ2VyKSB7XHJcblx0XHRzdXBlcihhcHAsIG1hbmFnZXIpO1xyXG5cdFx0dGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcclxuXHRcdHRoaXMuYXBwID0gYXBwO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheSgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XHJcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cdFx0Y29udGFpbmVyRWwuYWRkQ2xhc3MoJ21hbmFnZXItc2V0dGluZ19fY29udGFpbmVyJyk7XHJcblx0XHRjb25zdCB0YWJzRWwgPSB0aGlzLmNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnKTtcclxuXHRcdHRhYnNFbC5hZGRDbGFzcygnbWFuYWdlci1zZXR0aW5nX190YWJzJyk7XHJcblx0XHR0aGlzLmNvbnRlbnRFbCA9IHRoaXMuY29udGFpbmVyRWwuY3JlYXRlRWwoJ2RpdicpO1xyXG5cdFx0dGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoJ21hbmFnZXItc2V0dGluZ19fY29udGVudCcpO1xyXG5cclxuXHRcdGNvbnN0IHRhYkl0ZW1zID0gW1xyXG5cdFx0XHR7IHRleHQ6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwJyksIGNvbnRlbnQ6ICgpID0+IHRoaXMuYmFzaXNEaXNwbGF5KCkgfSxcclxuXHRcdFx0eyB0ZXh0OiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMCcpLCBjb250ZW50OiAoKSA9PiB0aGlzLmdyb3VwRGlzcGxheSgpIH0sXHJcblx0XHRcdHsgdGV4dDogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDAnKSwgY29udGVudDogKCkgPT4gdGhpcy50YWdEaXNwbGF5KCkgfSxcclxuXHRcdFx0eyB0ZXh0OiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMCcpLCBjb250ZW50OiAoKSA9PiB0aGlzLmRlbGF5RGlzcGxheSgpIH0sXHJcblx0XHRdO1xyXG5cdFx0Y29uc3QgdGFiSXRlbXNFbHM6IEhUTUxEaXZFbGVtZW50W10gPSBbXTtcclxuXHJcblx0XHR0YWJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRjb25zdCBpdGVtRWwgPSB0YWJzRWwuY3JlYXRlRWwoJ2RpdicpO1xyXG5cdFx0XHRpdGVtRWwuYWRkQ2xhc3MoJ21hbmFnZXItc2V0dGluZ19fdGFicy1pdGVtJyk7XHJcblx0XHRcdGl0ZW1FbC50ZXh0Q29udGVudCA9IGl0ZW0udGV4dDtcclxuXHRcdFx0dGFiSXRlbXNFbHMucHVzaChpdGVtRWwpO1xyXG5cdFx0XHRpZiAoaW5kZXggPT09IDApIHsgaXRlbUVsLmFkZENsYXNzKCdtYW5hZ2VyLXNldHRpbmdfX3RhYnMtaXRlbV9pcy1hY3RpdmUnKTsgaXRlbS5jb250ZW50KCk7IH1cclxuXHRcdFx0aXRlbUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdHRhYkl0ZW1zRWxzLmZvckVhY2godGFiRWwgPT4geyB0YWJFbC5yZW1vdmVDbGFzcygnbWFuYWdlci1zZXR0aW5nX190YWJzLWl0ZW1faXMtYWN0aXZlJykgfSk7XHJcblx0XHRcdFx0aXRlbUVsLmFkZENsYXNzKCdtYW5hZ2VyLXNldHRpbmdfX3RhYnMtaXRlbV9pcy1hY3RpdmUnKTtcclxuXHRcdFx0XHRpdGVtLmNvbnRlbnQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0YmFzaXNEaXNwbGF5KCkgeyB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpOyBuZXcgTWFuYWdlckJhc2lzKHRoaXMpLmRpc3BsYXkoKTsgfVxyXG5cdGRlbGF5RGlzcGxheSgpIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgbmV3IE1hbmFnZXJEZWxheSh0aGlzKS5kaXNwbGF5KCk7IH1cclxuXHRncm91cERpc3BsYXkoKSB7IHRoaXMuY29udGVudEVsLmVtcHR5KCk7IG5ldyBNYW5hZ2VyR3JvdXAodGhpcykuZGlzcGxheSgpOyB9XHJcblx0dGFnRGlzcGxheSgpIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgbmV3IE1hbmFnZXJUYWcodGhpcykuZGlzcGxheSgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hbmFnZXJTZXR0aW5nVGFiIH07XHJcblxyXG4iLCAiaW1wb3J0IE1hbmFnZXIgZnJvbSAnc3JjL21haW4nO1xyXG5pbXBvcnQgeyBNYW5hZ2VyU2V0dGluZ1RhYiB9IGZyb20gJy4nO1xyXG5pbXBvcnQgeyBNYW5hZ2VyU2V0dGluZ3MgfSBmcm9tICcuL2RhdGEnO1xyXG5pbXBvcnQgeyBBcHAgfSBmcm9tICdvYnNpZGlhbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlU2V0dGluZyB7XHJcblx0cHJvdGVjdGVkIHNldHRpbmdUYWI6IE1hbmFnZXJTZXR0aW5nVGFiO1xyXG5cdHByb3RlY3RlZCBtYW5hZ2VyOiBNYW5hZ2VyO1xyXG5cdHByb3RlY3RlZCBzZXR0aW5nczogTWFuYWdlclNldHRpbmdzO1xyXG5cdHB1YmxpYyBjb250YWluZXJFbDogSFRNTEVsZW1lbnQ7XHJcblx0cHJvdGVjdGVkIGFwcDogQXBwO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvYmo6IE1hbmFnZXJTZXR0aW5nVGFiKSB7XHJcblx0XHR0aGlzLnNldHRpbmdUYWIgPSBvYmo7XHJcblx0XHR0aGlzLm1hbmFnZXIgPSBvYmoubWFuYWdlcjtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBvYmoubWFuYWdlci5zZXR0aW5ncztcclxuXHRcdHRoaXMuY29udGFpbmVyRWwgPSBvYmouY29udGVudEVsO1xyXG5cdFx0dGhpcy5hcHAgPSBvYmouYXBwO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGFic3RyYWN0IG1haW4oKTogdm9pZDtcclxuXHRwdWJsaWMgZGlzcGxheSgpOiB2b2lkIHsgdGhpcy5tYWluKCkgfVxyXG59IiwgImltcG9ydCBCYXNlU2V0dGluZyBmcm9tIFwiLi4vYmFzZS1zZXR0aW5nXCI7XHJcbmltcG9ydCB7IERyb3Bkb3duQ29tcG9uZW50LCBTZXR0aW5nLCBUb2dnbGVDb21wb25lbnQgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IENvbW1hbmRzIGZyb20gXCJzcmMvY29tbWFuZFwiO1xyXG4vLyBpbXBvcnQgeyBHUk9VUF9TVFlMRSwgSVRFTV9TVFlMRSwgVEFHX1NUWUxFIH0gZnJvbSBcInNyYy9kYXRhL2RhdGFcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmFnZXJCYXNpcyBleHRlbmRzIEJhc2VTZXR0aW5nIHtcclxuICAgIHByaXZhdGUgSVRFTV9TVFlMRSA9IHtcclxuICAgICAgICAnYWx3YXlzRXhwYW5kJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMCcpLFxyXG4gICAgICAgICduZXZlckV4cGFuZCc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFOEMnKSxcclxuICAgICAgICAnaG92ZXJFeHBhbmQnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5JyksXHJcbiAgICAgICAgJ2NsaWNrRXhwYW5kJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQicpLFxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBHUk9VUF9TVFlMRSA9IHtcclxuICAgICAgICAnYSc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDAnKSxcclxuICAgICAgICAnYic6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFOEMnKSxcclxuICAgICAgICAnYyc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDknKSwgXHJcbiAgICAgICAgJ2QnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCJylcclxuICAgIH1cclxuICAgIHByaXZhdGUgVEFHX1NUWUxFID0ge1xyXG4gICAgICAgICdhJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMCcpLFxyXG4gICAgICAgICdiJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QycpLFxyXG4gICAgICAgICdjJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwOScpLFxyXG4gICAgICAgICdkJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQicpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG1haW4oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIGNvbnN0IGxhbmd1YWdlRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQobGFuZ3VhZ2VCYXIuY29udHJvbEVsKTtcclxuICAgICAgICBsYW5ndWFnZURyb3Bkb3duLmFkZE9wdGlvbnModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IubGFuZ3VhZ2UpO1xyXG4gICAgICAgIGxhbmd1YWdlRHJvcGRvd24uc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5MQU5HVUFHRSk7XHJcbiAgICAgICAgbGFuZ3VhZ2VEcm9wZG93bi5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5MQU5HVUFHRSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5iYXNpc0Rpc3BsYXkoKTtcclxuICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvcEJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NTRDXHU5NzYyXHU1QzQ1XHU0RTJEX1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzU0Q1x1OTc2Mlx1NUM0NVx1NEUyRF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgdG9wVG9nZ2xlID0gbmV3IFRvZ2dsZUNvbXBvbmVudCh0b3BCYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0b3BUb2dnbGUuc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5DRU5URVIpO1xyXG4gICAgICAgIHRvcFRvZ2dsZS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5DRU5URVIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBcclxuICAgICAgICBjb25zdCBwZXJzaXN0ZW5jZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3QjVCXHU5MDA5XHU2MzAxXHU0RTQ1XHU1MzE2X1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1N0I1Qlx1OTAwOVx1NjMwMVx1NEU0NVx1NTMxNl9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgcGVyc2lzdGVuY2VUb2dnbGUgPSBuZXcgVG9nZ2xlQ29tcG9uZW50KHBlcnNpc3RlbmNlQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgcGVyc2lzdGVuY2VUb2dnbGUuc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRSk7XHJcbiAgICAgICAgcGVyc2lzdGVuY2VUb2dnbGUub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuUEVSU0lTVEVOQ0UgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgaXRlbVN0eWxlQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBjb25zdCBpdGVtU3R5bGVEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudChpdGVtU3R5bGVCYXIuY29udHJvbEVsKTtcclxuICAgICAgICBpdGVtU3R5bGVEcm9wZG93bi5hZGRPcHRpb25zKHRoaXMuSVRFTV9TVFlMRSk7XHJcbiAgICAgICAgaXRlbVN0eWxlRHJvcGRvd24uc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5JVEVNX1NUWUxFKTtcclxuICAgICAgICBpdGVtU3R5bGVEcm9wZG93bi5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5JVEVNX1NUWUxFID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZ3JvdXBTdHlsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBTdHlsZURyb3Bkb3duID0gbmV3IERyb3Bkb3duQ29tcG9uZW50KGdyb3VwU3R5bGVCYXIuY29udHJvbEVsKTtcclxuICAgICAgICBncm91cFN0eWxlRHJvcGRvd24uYWRkT3B0aW9ucyh0aGlzLkdST1VQX1NUWUxFKTtcclxuICAgICAgICBncm91cFN0eWxlRHJvcGRvd24uc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5HUk9VUF9TVFlMRSk7XHJcbiAgICAgICAgZ3JvdXBTdHlsZURyb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLkdST1VQX1NUWUxFID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFnU3R5bGVCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIGNvbnN0IHRhZ1N0eWxlRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQodGFnU3R5bGVCYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0YWdTdHlsZURyb3Bkb3duLmFkZE9wdGlvbnModGhpcy5UQUdfU1RZTEUpO1xyXG4gICAgICAgIHRhZ1N0eWxlRHJvcGRvd24uc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5UQUdfU1RZTEUpO1xyXG4gICAgICAgIHRhZ1N0eWxlRHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuVEFHX1NUWUxFID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgRGVsYXlCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIGNvbnN0IERlbGF5VG9nZ2xlID0gbmV3IFRvZ2dsZUNvbXBvbmVudChEZWxheUJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIERlbGF5VG9nZ2xlLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuREVMQVkpO1xyXG4gICAgICAgIERlbGF5VG9nZ2xlLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLkRFTEFZID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgdmFsdWUgPyB0aGlzLm1hbmFnZXIuZW5hYmxlRGVsYXlzRm9yQWxsUGx1Z2lucygpIDogdGhpcy5tYW5hZ2VyLmRpc2FibGVEZWxheXNGb3JBbGxQbHVnaW5zKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZhZGVPdXREaXNhYmxlZFBsdWdpbnNCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIGNvbnN0IGZhZGVPdXREaXNhYmxlZFBsdWdpbnNUb2dnbGUgPSBuZXcgVG9nZ2xlQ29tcG9uZW50KGZhZGVPdXREaXNhYmxlZFBsdWdpbnNCYXIuY29udHJvbEVsKTtcclxuICAgICAgICBmYWRlT3V0RGlzYWJsZWRQbHVnaW5zVG9nZ2xlLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuRkFERV9PVVRfRElTQUJMRURfUExVR0lOUyk7XHJcbiAgICAgICAgZmFkZU91dERpc2FibGVkUGx1Z2luc1RvZ2dsZS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5GQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgQ29tbWFuZEl0ZW1CYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIGNvbnN0IENvbW1hbmRJdGVtVG9nZ2xlID0gbmV3IFRvZ2dsZUNvbXBvbmVudChDb21tYW5kSXRlbUJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIENvbW1hbmRJdGVtVG9nZ2xlLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuQ09NTUFORF9JVEVNKTtcclxuICAgICAgICBDb21tYW5kSXRlbVRvZ2dsZS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5DT01NQU5EX0lURU0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgQ29tbWFuZEdyb3VwQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBjb25zdCBDb21tYW5kR3JvdXBUb2dnbGUgPSBuZXcgVG9nZ2xlQ29tcG9uZW50KENvbW1hbmRHcm91cEJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIENvbW1hbmRHcm91cFRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLkNPTU1BTkRfR1JPVVApO1xyXG4gICAgICAgIENvbW1hbmRHcm91cFRvZ2dsZS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5DT01NQU5EX0dST1VQID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQge1xyXG5cdEFwcCxcclxuXHRCdXR0b25Db21wb25lbnQsXHJcblx0RHJvcGRvd25Db21wb25lbnQsXHJcblx0RXh0cmFCdXR0b25Db21wb25lbnQsXHJcblx0TWVudSxcclxuXHRNb2RhbCxcclxuXHROb3RpY2UsXHJcblx0UGx1Z2luTWFuaWZlc3QsXHJcblx0U2VhcmNoQ29tcG9uZW50LFxyXG5cdFNldHRpbmcsXHJcblx0VG9nZ2xlQ29tcG9uZW50LFxyXG59IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzL2RhdGFcIjtcclxuaW1wb3J0IHsgbWFuYWdlck9wZW4gfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCJtYWluXCI7XHJcbmltcG9ydCB7IEdyb3VwTW9kYWwgfSBmcm9tIFwiLi9ncm91cC1tb2RhbFwiO1xyXG5pbXBvcnQgeyBUYWdzTW9kYWwgfSBmcm9tIFwiLi90YWdzLW1vZGFsXCI7XHJcbmltcG9ydCB7IERlbGV0ZU1vZGFsIH0gZnJvbSBcIi4vZGVsZXRlLW1vZGFsXCI7XHJcbmltcG9ydCBDb21tYW5kcyBmcm9tIFwic3JjL2NvbW1hbmRcIjtcclxuaW1wb3J0IHsgRGlzYWJsZU1vZGFsIH0gZnJvbSBcIi4vZGlzYWJsZS1tb2RhbFwiO1xyXG5pbXBvcnQgeyBOb3RlTW9kYWwgfSBmcm9tIFwiLi9ub3RlLW1vZGFsXCI7XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gICAgICAgICAgXHU0RkE3XHU4RkI5XHU2ODBGIFx1NUJGOVx1OEJERFx1Njg0NiBcdTdGRkJcdThCRDFcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmV4cG9ydCBjbGFzcyBNYW5hZ2VyTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcblx0bWFuYWdlcjogTWFuYWdlcjtcclxuXHRzZXR0aW5nczogTWFuYWdlclNldHRpbmdzO1xyXG5cdC8vIHRoaXMuYXBwLnBsdWdpbnNcclxuXHRhcHBQbHVnaW5zO1xyXG5cdC8vIHRoaXMuYXBwLnNldHRpbmdzXHJcblx0YXBwU2V0dGluZztcclxuXHQvLyBbXHU2NzJDXHU1NzMwXVtcdTUzRDhcdTkxQ0ZdIFx1NjNEMlx1NEVGNlx1OERFRlx1NUY4NFxyXG5cdGJhc2VQYXRoOiBzdHJpbmc7XHJcblx0Ly8gW1x1NjcyQ1x1NTczMF1bXHU1M0Q4XHU5MUNGXSBcdTVDNTVcdTc5M0FcdTYzRDJcdTRFRjZcdTUyMTdcdTg4NjhcclxuXHRkaXNwbGF5UGx1Z2luczogUGx1Z2luTWFuaWZlc3RbXSA9IFtdO1xyXG5cclxuXHQvLyBcdTUyMDZcdTdFQzRcdTUxODVcdTVCQjlcclxuXHRncm91cCA9IFwiXCI7XHJcblx0Ly8gXHU2ODA3XHU3QjdFXHU1MTg1XHU1QkI5XHJcblx0dGFnID0gXCJcIjtcclxuXHQvLyBcdTY4MDdcdTdCN0VcdTUxODVcdTVCQjlcclxuXHRkZWxheSA9IFwiXCI7XHJcblxyXG5cdC8vIFx1NjcyQVx1NTIwNlx1N0VDNFxyXG5cdG5vR3JvdXAgPSBmYWxzZTtcclxuXHQvLyBcdTY0MUNcdTdEMjJcdTUxODVcdTVCQjlcclxuXHRzZWFyY2hUZXh0ID0gXCJcIjtcclxuXHQvLyBcdTRFQzVcdTU0MkZcdTc1MjhcclxuXHRvbmx5RW5hYmxlZCA9IGZhbHNlO1xyXG5cdC8vIFx1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRlxyXG5cdGVkaXRvck1vZGUgPSBmYWxzZTtcclxuXHQvLyBcdTZENEJcdThCRDVcdTZBMjFcdTVGMEZcclxuXHRkZXZlbG9wZXJNb2RlID0gZmFsc2U7XHJcblxyXG5cdHNlYXJjaEVsOiBTZWFyY2hDb21wb25lbnQ7XHJcblx0Zm9vdEVsOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIG1hbmFnZXI6IE1hbmFnZXIpIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblx0XHQvLyBAdHMtaWdub3JlXHJcblx0XHR0aGlzLmFwcFNldHRpbmcgPSB0aGlzLmFwcC5zZXR0aW5nO1xyXG5cdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0dGhpcy5hcHBQbHVnaW5zID0gdGhpcy5hcHAucGx1Z2lucztcclxuXHRcdHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gbWFuYWdlci5zZXR0aW5ncztcclxuXHRcdC8vIEB0cy1pZ25vcmVcclxuXHRcdHRoaXMuYmFzZVBhdGggPSBwYXRoLm5vcm1hbGl6ZSh0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmdldEJhc2VQYXRoKCkpO1xyXG5cdFx0Ly8gXHU5OTk2XHU2QjIxXHU1NDJGXHU1MkE4XHU4RkQwXHU4ODRDXHU0RTBCIFx1OTA3Rlx1NTE0RFx1NjcwOVx1NjVCMFx1NTJBMFx1NTE2NVx1NzY4NFx1NjNEMlx1NEVGNlxyXG5cdFx0bWFuYWdlci5zeW5jaHJvbml6ZVBsdWdpbnMoXHJcblx0XHRcdE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cykuZmlsdGVyKFxyXG5cdFx0XHRcdChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHBtLmlkICE9PSBtYW5hZ2VyLm1hbmlmZXN0LmlkXHJcblx0XHRcdCkgYXMgUGx1Z2luTWFuaWZlc3RbXVxyXG5cdFx0KTtcclxuXHJcblx0XHQvLyB0aGlzLm1hbmFnZXIucmVnaXN0ZXJFdmVudChcclxuXHRcdC8vIFx0dGhpcy5hcHAud29ya3NwYWNlLm9uKFwiZmlsZS1tZW51XCIsIChtZW51LCBmaWxlKSA9PiB7XHJcblx0XHQvLyBcdFx0Y29uc3QgYWRkSWNvbk1lbnVJdGVtID0gKGl0ZW06IE1lbnVJdGVtKSA9PiB7XHJcblx0XHQvLyBcdFx0XHRpdGVtLnNldFRpdGxlKFwiXHU1ODlFXCIpO1xyXG5cdFx0Ly8gXHRcdFx0aXRlbS5zZXRJY29uKFwiaGFzaHRhZ1wiKTtcclxuXHRcdC8vIFx0XHRcdGl0ZW0ub25DbGljayhhc3luYyAoKSA9PiB7XHJcblx0XHQvLyBcdFx0XHRcdGNvbnNvbGUubG9nKGZpbGUpO1xyXG5cdFx0Ly8gXHRcdFx0fSk7XHJcblx0XHQvLyBcdFx0fTtcclxuXHRcdC8vIFx0XHRtZW51LmFkZEl0ZW0oYWRkSWNvbk1lbnVJdGVtKTtcclxuXHRcdC8vIFx0XHRjb25zdCBhZGRJY29uTWVudUl0ZW0xID0gKGl0ZW06IE1lbnVJdGVtKSA9PiB7XHJcblx0XHQvLyBcdFx0XHRpdGVtLnNldFRpdGxlKFwiXHU1MjIwXCIpO1xyXG5cdFx0Ly8gXHRcdFx0aXRlbS5zZXRJY29uKFwiaGFzaHRhZ1wiKTtcclxuXHRcdC8vIFx0XHR9O1xyXG5cdFx0Ly8gXHRcdG1lbnUuYWRkSXRlbShhZGRJY29uTWVudUl0ZW0xKTtcclxuXHRcdC8vIFx0XHRjb25zdCBhZGRJY29uTWVudUl0ZW0yID0gKGl0ZW06IE1lbnVJdGVtKSA9PiB7XHJcblx0XHQvLyBcdFx0XHRpdGVtLnNldFRpdGxlKFwiXHU2NTM5XCIpO1xyXG5cdFx0Ly8gXHRcdFx0aXRlbS5zZXRJY29uKFwiaGFzaHRhZ1wiKTtcclxuXHRcdC8vIFx0XHR9O1xyXG5cdFx0Ly8gXHRcdG1lbnUuYWRkSXRlbShhZGRJY29uTWVudUl0ZW0yKTtcclxuXHRcdC8vIFx0fSlcclxuXHRcdC8vICk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXN5bmMgc2hvd0hlYWQoKSB7XHJcblx0XHQvL0B0cy1pZ25vcmVcclxuXHRcdGNvbnN0IG1vZGFsRWw6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWwucGFyZW50RWxlbWVudDtcclxuXHRcdG1vZGFsRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWNvbnRhaW5lclwiKTtcclxuXHRcdC8vIFx1OTc2MFx1NEUwQVxyXG5cdFx0aWYgKCF0aGlzLnNldHRpbmdzLkNFTlRFUikgbW9kYWxFbC5hZGRDbGFzcyhcIm1hbmFnZXItY29udGFpbmVyX190b3BcIik7XHJcblxyXG5cdFx0bW9kYWxFbC5yZW1vdmVDaGlsZChcclxuXHRcdFx0bW9kYWxFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWwtY2xvc2UtYnV0dG9uXCIpWzBdXHJcblx0XHQpO1xyXG5cdFx0dGhpcy50aXRsZUVsLnBhcmVudEVsZW1lbnQ/LmFkZENsYXNzKFwibWFuYWdlci1jb250YWluZXJfX2hlYWRlclwiKTtcclxuXHRcdHRoaXMuY29udGVudEVsLmFkZENsYXNzKFwibWFuYWdlci1pdGVtLWNvbnRhaW5lclwiKTtcclxuXHRcdC8vIFx1NkRGQlx1NTJBMFx1OTg3NVx1NUMzRVxyXG5cdFx0dGhpcy5mb290RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0dGhpcy5mb290RWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWZvb2RcIik7XHJcblx0XHR0aGlzLm1vZGFsRWwuYXBwZW5kQ2hpbGQodGhpcy5mb290RWwpO1xyXG5cclxuXHRcdC8vIFtcdTY0Q0RcdTRGNUNcdTg4NENdXHJcblx0XHRjb25zdCBhY3Rpb25CYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpXHJcblx0XHRcdC5zZXRDbGFzcyhcIm1hbmFnZXItYmFyX19hY3Rpb25cIilcclxuXHRcdFx0LnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDXCIpKTtcclxuXHJcblx0XHQvLyBbXHU2NENEXHU0RjVDXHU4ODRDXSBHaXRodWJcclxuXHRcdGNvbnN0IGdpdGh1YkJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcblx0XHRnaXRodWJCdXR0b24uc2V0SWNvbihcImdpdGh1YlwiKTtcclxuXHRcdGdpdGh1YkJ1dHRvbi5zZXRUb29sdGlwKFxyXG5cdFx0XHR0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X0dJVEhVQl9cdTYzQ0ZcdThGRjBcIilcclxuXHRcdCk7XHJcblx0XHRnaXRodWJCdXR0b24ub25DbGljaygoKSA9PiB7XHJcblx0XHRcdHdpbmRvdy5vcGVuKHRoaXMubWFuYWdlci5tYW5pZmVzdC5hdXRob3JVcmwpO1xyXG5cdFx0fSk7XHJcblx0XHQvLyBbXHU2NENEXHU0RjVDXHU4ODRDXSBHaXRodWJcclxuXHRcdGNvbnN0IHR1dG9yaWFsQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKTtcclxuXHRcdHR1dG9yaWFsQnV0dG9uLnNldEljb24oXCJib29rLW9wZW5cIik7XHJcblx0XHR0dXRvcmlhbEJ1dHRvbi5zZXRUb29sdGlwKFxyXG5cdFx0XHR0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQl9cdTYzQ0ZcdThGRjBcIilcclxuXHRcdCk7XHJcblx0XHR0dXRvcmlhbEJ1dHRvbi5vbkNsaWNrKCgpID0+IHtcclxuXHRcdFx0d2luZG93Lm9wZW4oXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vQlYxV3lya1lNRWNlL1wiKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFtcdTY0Q0RcdTRGNUNcdTg4NENdIFx1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNlxyXG5cdFx0Y29uc3QgcmVsb2FkQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKTtcclxuXHRcdHJlbG9hZEJ1dHRvbi5zZXRJY29uKFwicmVmcmVzaC1jY3dcIik7XHJcblx0XHRyZWxvYWRCdXR0b24uc2V0VG9vbHRpcChcclxuXHRcdFx0dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9cdTkxQ0RcdThGN0RcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwXCIpXHJcblx0XHQpO1xyXG5cdFx0cmVsb2FkQnV0dG9uLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRuZXcgTm90aWNlKFwiXHU5MUNEXHU2NUIwXHU1MkEwXHU4RjdEXHU3QjJDXHU0RTA5XHU2NUI5XHU2M0QyXHU0RUY2XCIpO1xyXG5cdFx0XHRhd2FpdCB0aGlzLmFwcFBsdWdpbnMubG9hZE1hbmlmZXN0cygpO1xyXG5cdFx0XHR0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBbXHU2NENEXHU0RjVDXHU4ODRDXSBcdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjBcclxuXHRcdGNvbnN0IHVwZGF0ZUJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcblx0XHR1cGRhdGVCdXR0b24uc2V0SWNvbihcInJzc1wiKTtcclxuXHRcdHVwZGF0ZUJ1dHRvbi5zZXRUb29sdGlwKFxyXG5cdFx0XHR0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMF9cdTYzQ0ZcdThGRjBcIilcclxuXHRcdCk7XHJcblx0XHR1cGRhdGVCdXR0b24ub25DbGljayhhc3luYyAoKSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5hcHBQbHVnaW5zLmNoZWNrRm9yVXBkYXRlcygpO1xyXG5cdFx0XHRcdHRoaXMuYXBwU2V0dGluZy5vcGVuKCk7XHJcblx0XHRcdFx0dGhpcy5hcHBTZXR0aW5nLm9wZW5UYWJCeUlkKFwiY29tbXVuaXR5LXBsdWdpbnNcIik7XHJcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIlx1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMFx1NjVGNlx1NTFGQVx1OTUxOTpcIiwgZXJyb3IpOyAvLyBcdTU5MDRcdTc0MDZcdTUzRUZcdTgwRkRcdTUxRkFcdTczQjBcdTc2ODRcdTk1MTlcdThCRUZcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4XHJcblx0XHRjb25zdCBkaXNhYmxlQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKTtcclxuXHRcdGRpc2FibGVCdXR0b24uc2V0SWNvbihcInNxdWFyZVwiKTtcclxuXHRcdGRpc2FibGVCdXR0b24uc2V0VG9vbHRpcChcclxuXHRcdFx0dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2M0NGXHU4RkYwXCIpXHJcblx0XHQpO1xyXG5cdFx0ZGlzYWJsZUJ1dHRvbi5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuXHRcdFx0bmV3IERpc2FibGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyLCBhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5kaXNwbGF5UGx1Z2lucykge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuREVMQVkpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgTWFuYWdlclBsdWdpbiA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5maW5kKFxyXG5cdFx0XHRcdFx0XHRcdChwKSA9PiBwLmlkID09PSBwbHVnaW4uaWRcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0aWYgKE1hbmFnZXJQbHVnaW4gJiYgTWFuYWdlclBsdWdpbi5lbmFibGVkKSB7XHJcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW4ocGx1Z2luLmlkKTtcclxuXHRcdFx0XHRcdFx0XHRNYW5hZ2VyUGx1Z2luLmVuYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyhwbHVnaW4uaWQpKSB7XHJcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW5BbmRTYXZlKFxyXG5cdFx0XHRcdFx0XHRcdFx0cGx1Z2luLmlkXHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkub3BlbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4XHJcblx0XHRjb25zdCBlbmFibGVCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpO1xyXG5cdFx0ZW5hYmxlQnV0dG9uLnNldEljb24oXCJzcXVhcmUtY2hlY2tcIik7XHJcblx0XHRlbmFibGVCdXR0b24uc2V0VG9vbHRpcChcclxuXHRcdFx0dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwXCIpXHJcblx0XHQpO1xyXG5cdFx0ZW5hYmxlQnV0dG9uLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRuZXcgRGlzYWJsZU1vZGFsKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIsIGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLmRpc3BsYXlQbHVnaW5zKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5ERUxBWSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBNYW5hZ2VyUGx1Z2luID1cclxuXHRcdFx0XHRcdFx0XHR0aGlzLm1hbmFnZXIuc2V0dGluZ3MuUGx1Z2lucy5maW5kKFxyXG5cdFx0XHRcdFx0XHRcdFx0KG1wKSA9PiBtcC5pZCA9PT0gcGx1Z2luLmlkXHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0aWYgKE1hbmFnZXJQbHVnaW4gJiYgIU1hbmFnZXJQbHVnaW4uZW5hYmxlZCkge1xyXG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW4ocGx1Z2luLmlkKTtcclxuXHRcdFx0XHRcdFx0XHRNYW5hZ2VyUGx1Z2luLmVuYWJsZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlmICghdGhpcy5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyhwbHVnaW4uaWQpKSB7XHJcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbkFuZFNhdmUoXHJcblx0XHRcdFx0XHRcdFx0XHRwbHVnaW4uaWRcclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Q29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5vcGVuKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBbXHU2NENEXHU0RjVDXHU4ODRDXSBcdTdGMTZcdThGOTFcdTZBMjFcdTVGMEZcclxuXHRcdGNvbnN0IGVkaXRvckJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcblx0XHR0aGlzLmVkaXRvck1vZGVcclxuXHRcdFx0PyBlZGl0b3JCdXR0b24uc2V0SWNvbihcInBlbi1vZmZcIilcclxuXHRcdFx0OiBlZGl0b3JCdXR0b24uc2V0SWNvbihcInBlblwiKTtcclxuXHRcdGVkaXRvckJ1dHRvbi5zZXRUb29sdGlwKFxyXG5cdFx0XHR0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRl9cdTYzQ0ZcdThGRjBcIilcclxuXHRcdCk7XHJcblx0XHRlZGl0b3JCdXR0b24ub25DbGljaygoKSA9PiB7XHJcblx0XHRcdHRoaXMuZWRpdG9yTW9kZSA9ICF0aGlzLmVkaXRvck1vZGU7XHJcblx0XHRcdHRoaXMuZWRpdG9yTW9kZVxyXG5cdFx0XHRcdD8gZWRpdG9yQnV0dG9uLnNldEljb24oXCJwZW4tb2ZmXCIpXHJcblx0XHRcdFx0OiBlZGl0b3JCdXR0b24uc2V0SWNvbihcInBlblwiKTtcclxuXHRcdFx0dGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFXHJcblx0XHRjb25zdCBzZXR0aW5nc0J1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcblx0XHRzZXR0aW5nc0J1dHRvbi5zZXRJY29uKFwic2V0dGluZ3NcIik7XHJcblx0XHRzZXR0aW5nc0J1dHRvbi5zZXRUb29sdGlwKFxyXG5cdFx0XHR0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjBcIilcclxuXHRcdCk7XHJcblx0XHRzZXR0aW5nc0J1dHRvbi5vbkNsaWNrKCgpID0+IHtcclxuXHRcdFx0dGhpcy5hcHBTZXR0aW5nLm9wZW4oKTtcclxuXHRcdFx0dGhpcy5hcHBTZXR0aW5nLm9wZW5UYWJCeUlkKHRoaXMubWFuYWdlci5tYW5pZmVzdC5pZCk7XHJcblx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFtcdTZENEJcdThCRDVcdTg4NENdIFx1NTIzN1x1NjVCMFx1NjNEMlx1NEVGNlxyXG5cdFx0aWYgKHRoaXMuZGV2ZWxvcGVyTW9kZSkge1xyXG5cdFx0XHRjb25zdCB0ZXN0QnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKTtcclxuXHRcdFx0dGVzdEJ1dHRvbi5zZXRJY29uKFwicmVmcmVzaC1jY3dcIik7XHJcblx0XHRcdHRlc3RCdXR0b24uc2V0VG9vbHRpcChcIlx1NTIzN1x1NjVCMFx1NjNEMlx1NEVGNlwiKTtcclxuXHRcdFx0dGVzdEJ1dHRvbi5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHR0aGlzLmNsb3NlKCk7XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW4odGhpcy5tYW5hZ2VyLm1hbmlmZXN0LmlkKTtcclxuXHRcdFx0XHRhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHRoaXMubWFuYWdlci5tYW5pZmVzdC5pZCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFtcdTY0MUNcdTdEMjJcdTg4NENdXHJcblx0XHRjb25zdCBzZWFyY2hCYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpXHJcblx0XHRcdC5zZXRDbGFzcyhcIm1hbmFnZXItYmFyX19zZWFyY2hcIilcclxuXHRcdFx0LnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDXCIpKTtcclxuXHJcblx0XHQvLyBbXHU2NDFDXHU3RDIyXHU4ODRDXSBcdTY3MkFcdTUyMDZcdTdFQzRcclxuXHRcdGNvbnN0IG5vR3JvdXBCYXIgPSBuZXcgQnV0dG9uQ29tcG9uZW50KHNlYXJjaEJhci5jb250cm9sRWwpLnNldEljb24oXHJcblx0XHRcdFwiZ3JvdXBcIlxyXG5cdFx0KTtcclxuXHRcdG5vR3JvdXBCYXIuc2V0VG9vbHRpcCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1NjcyQVx1NTIwNlx1N0VDNF9cdTYzQ0ZcdThGRjBcIikpO1xyXG5cdFx0bm9Hcm91cEJhci5vbkNsaWNrKCgpID0+IHtcclxuXHRcdFx0dGhpcy5ub0dyb3VwID0gIXRoaXMubm9Hcm91cDtcclxuXHRcdFx0dGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU0RUM1XHU1NDJGXHU3NTI4XHJcblx0XHRjb25zdCBvbmx5RW5hYmxlZCA9IG5ldyBCdXR0b25Db21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCk7XHJcblx0XHR0aGlzLm9ubHlFbmFibGVkXHJcblx0XHRcdD8gb25seUVuYWJsZWQuc2V0SWNvbihcInRvZ2dsZS1yaWdodFwiKVxyXG5cdFx0XHQ6IG9ubHlFbmFibGVkLnNldEljb24oXCJ0b2dnbGUtbGVmdFwiKTtcclxuXHRcdG9ubHlFbmFibGVkLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFQzVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwXCIpKTtcclxuXHRcdG9ubHlFbmFibGVkLm9uQ2xpY2soKCkgPT4ge1xyXG5cdFx0XHR0aGlzLm9ubHlFbmFibGVkID0gIXRoaXMub25seUVuYWJsZWQ7XHJcblx0XHRcdHRoaXMub25seUVuYWJsZWRcclxuXHRcdFx0XHQ/IG9ubHlFbmFibGVkLnNldEljb24oXCJ0b2dnbGUtcmlnaHRcIilcclxuXHRcdFx0XHQ6IG9ubHlFbmFibGVkLnNldEljb24oXCJ0b2dnbGUtbGVmdFwiKTtcclxuXHRcdFx0dGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU1MjA2XHU3RUM0XHU5MDA5XHU2MkU5XHU1MjE3XHU4ODY4XHJcblx0XHRjb25zdCBncm91cENvdW50cyA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5yZWR1Y2UoXHJcblx0XHRcdChhY2M6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0sIHBsdWdpbikgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGdyb3VwSWQgPSBwbHVnaW4uZ3JvdXAgfHwgXCJcIjtcclxuXHRcdFx0XHRhY2NbZ3JvdXBJZF0gPSAoYWNjW2dyb3VwSWRdIHx8IDApICsgMTtcclxuXHRcdFx0XHRyZXR1cm4gYWNjO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7IFwiXCI6IDAgfVxyXG5cdFx0KTtcclxuXHRcdGNvbnN0IGdyb3VwcyA9IHRoaXMuc2V0dGluZ3MuR1JPVVBTLnJlZHVjZShcclxuXHRcdFx0KGFjYzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgaXRlbSkgPT4ge1xyXG5cdFx0XHRcdGFjY1tpdGVtLmlkXSA9IGAke2l0ZW0ubmFtZX0gKCR7Z3JvdXBDb3VudHNbaXRlbS5pZF0gfHwgMH0pYDtcclxuXHRcdFx0XHRyZXR1cm4gYWNjO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7IFwiXCI6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTkwMUFcdTc1MjhfXHU2NUUwXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQ1wiKSB9XHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgZ3JvdXBzRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCk7XHJcblx0XHRncm91cHNEcm9wZG93bi5hZGRPcHRpb25zKGdyb3Vwcyk7XHJcblx0XHRncm91cHNEcm9wZG93bi5zZXRWYWx1ZShcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRSA/IHRoaXMuc2V0dGluZ3MuRklMVEVSX0dST1VQIDogdGhpcy5ncm91cFxyXG5cdFx0KTtcclxuXHRcdGdyb3Vwc0Ryb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRSkge1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuRklMVEVSX0dST1VQID0gdmFsdWU7XHJcblx0XHRcdFx0dGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZ3JvdXAgPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBbXHU2NDFDXHU3RDIyXHU4ODRDXSBcdTY4MDdcdTdCN0VcdTkwMDlcdTYyRTlcdTUyMTdcdTg4NjhcclxuXHRcdGNvbnN0IHRhZ0NvdW50czogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5yZWR1Y2UoKGFjYywgcGx1Z2luKSA9PiB7XHJcblx0XHRcdFx0cGx1Z2luLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XHJcblx0XHRcdFx0XHRhY2NbdGFnXSA9IChhY2NbdGFnXSB8fCAwKSArIDE7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0fSwge30gYXMgeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSk7XHJcblx0XHRjb25zdCB0YWdzID0gdGhpcy5zZXR0aW5ncy5UQUdTLnJlZHVjZShcclxuXHRcdFx0KGFjYzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgaXRlbSkgPT4ge1xyXG5cdFx0XHRcdGFjY1tpdGVtLmlkXSA9IGAke2l0ZW0ubmFtZX0gKCR7dGFnQ291bnRzW2l0ZW0uaWRdIHx8IDB9KWA7XHJcblx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0fSxcclxuXHRcdFx0eyBcIlwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkNcIikgfVxyXG5cdFx0KTtcclxuXHRcdGNvbnN0IHRhZ3NEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudChzZWFyY2hCYXIuY29udHJvbEVsKTtcclxuXHRcdHRhZ3NEcm9wZG93bi5hZGRPcHRpb25zKHRhZ3MpO1xyXG5cdFx0dGFnc0Ryb3Bkb3duLnNldFZhbHVlKFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFID8gdGhpcy5zZXR0aW5ncy5GSUxURVJfVEFHIDogdGhpcy50YWdcclxuXHRcdCk7XHJcblx0XHR0YWdzRHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFKSB7XHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5GSUxURVJfVEFHID0gdmFsdWU7XHJcblx0XHRcdFx0dGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudGFnID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU1RUY2XHU4RkRGXHU5MDA5XHU2MkU5XHU1MjE3XHU4ODY4XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ERUxBWSkge1xyXG5cdFx0XHRjb25zdCBkZWxheUNvdW50cyA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5yZWR1Y2UoXHJcblx0XHRcdFx0KGFjYzogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSwgcGx1Z2luKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBkZWxheSA9IHBsdWdpbi5kZWxheSB8fCBcIlwiO1xyXG5cdFx0XHRcdFx0YWNjW2RlbGF5XSA9IChhY2NbZGVsYXldIHx8IDApICsgMTtcclxuXHRcdFx0XHRcdHJldHVybiBhY2M7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7IFwiXCI6IDAgfVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRjb25zdCBkZWxheXMgPSB0aGlzLnNldHRpbmdzLkRFTEFZUy5yZWR1Y2UoXHJcblx0XHRcdFx0KGFjYzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgaXRlbSkgPT4ge1xyXG5cdFx0XHRcdFx0YWNjW2l0ZW0uaWRdID0gYCR7aXRlbS5uYW1lfSAoJHtcclxuXHRcdFx0XHRcdFx0ZGVsYXlDb3VudHNbaXRlbS5pZF0gfHwgMFxyXG5cdFx0XHRcdFx0fSlgO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHsgXCJcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDXCIpIH1cclxuXHRcdFx0KTtcclxuXHRcdFx0Y29uc3QgZGVsYXlzRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCk7XHJcblx0XHRcdGRlbGF5c0Ryb3Bkb3duLmFkZE9wdGlvbnMoZGVsYXlzKTtcclxuXHRcdFx0ZGVsYXlzRHJvcGRvd24uc2V0VmFsdWUoXHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRVxyXG5cdFx0XHRcdFx0PyB0aGlzLnNldHRpbmdzLkZJTFRFUl9ERUxBWVxyXG5cdFx0XHRcdFx0OiB0aGlzLmRlbGF5XHJcblx0XHRcdCk7XHJcblx0XHRcdGRlbGF5c0Ryb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLkZJTFRFUl9ERUxBWSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmRlbGF5ID0gdmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU2NDFDXHU3RDIyXHU2ODQ2XHJcblx0XHR0aGlzLnNlYXJjaEVsID0gbmV3IFNlYXJjaENvbXBvbmVudChzZWFyY2hCYXIuY29udHJvbEVsKTtcclxuXHRcdHRoaXMuc2VhcmNoRWwub25DaGFuZ2UoKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0dGhpcy5zZWFyY2hUZXh0ID0gdmFsdWU7XHJcblx0XHRcdHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGFzeW5jIHNob3dEYXRhKCkge1xyXG5cdFx0Y29uc3QgcGx1Z2luczogUGx1Z2luTWFuaWZlc3RbXSA9IE9iamVjdC52YWx1ZXMoXHJcblx0XHRcdHRoaXMuYXBwUGx1Z2lucy5tYW5pZmVzdHNcclxuXHRcdCk7XHJcblx0XHRwbHVnaW5zLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4ge1xyXG5cdFx0XHRyZXR1cm4gaXRlbTEubmFtZS5sb2NhbGVDb21wYXJlKGl0ZW0yLm5hbWUpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmRpc3BsYXlQbHVnaW5zID0gW107XHJcblx0XHRmb3IgKGNvbnN0IHBsdWdpbiBvZiBwbHVnaW5zKSB7XHJcblx0XHRcdGNvbnN0IE1hbmFnZXJQbHVnaW4gPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuUGx1Z2lucy5maW5kKFxyXG5cdFx0XHRcdChtcCkgPT4gbXAuaWQgPT09IHBsdWdpbi5pZFxyXG5cdFx0XHQpO1xyXG5cdFx0XHRjb25zdCBwbHVnaW5EaXIgPSBwYXRoLmpvaW4oXHJcblx0XHRcdFx0dGhpcy5iYXNlUGF0aCxcclxuXHRcdFx0XHRwbHVnaW4uZGlyID8gcGx1Z2luLmRpciA6IFwiXCJcclxuXHRcdFx0KTtcclxuXHRcdFx0Ly8gXHU2M0QyXHU0RUY2XHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGXHJcblx0XHRcdGNvbnN0IGlzRW5hYmxlZCA9IHRoaXMuc2V0dGluZ3MuREVMQVlcclxuXHRcdFx0XHQ/IE1hbmFnZXJQbHVnaW4/LmVuYWJsZWRcclxuXHRcdFx0XHQ6IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVkUGx1Z2lucy5oYXMocGx1Z2luLmlkKTtcclxuXHRcdFx0aWYgKE1hbmFnZXJQbHVnaW4pIHtcclxuXHRcdFx0XHQvLyBbXHU2NDFDXHU3RDIyXSBcdTRFQzVcdTU0MkZcdTc1MjhcclxuXHRcdFx0XHRpZiAodGhpcy5vbmx5RW5hYmxlZCAmJiAhaXNFbmFibGVkKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0Ly8gW1x1NjQxQ1x1N0QyMl0gXHU2NzJBXHU1MjA2XHU3RUM0XHJcblx0XHRcdFx0aWYgKHRoaXMubm9Hcm91cCAmJiAhKE1hbmFnZXJQbHVnaW4uZ3JvdXAgPT0gXCJcIikpIGNvbnRpbnVlO1xyXG5cdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFKSB7XHJcblx0XHRcdFx0XHQvLyBbXHU2NDFDXHU3RDIyXSBcdTUyMDZcdTdFQzRcclxuXHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5GSUxURVJfR1JPVVAgIT09IFwiXCIgJiZcclxuXHRcdFx0XHRcdFx0TWFuYWdlclBsdWdpbi5ncm91cCAhPT0gdGhpcy5zZXR0aW5ncy5GSUxURVJfR1JPVVBcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHQvLyBbXHU2NDFDXHU3RDIyXSBcdTY4MDdcdTdCN0VcclxuXHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5GSUxURVJfVEFHICE9PSBcIlwiICYmXHJcblx0XHRcdFx0XHRcdCFNYW5hZ2VyUGx1Z2luLnRhZ3MuaW5jbHVkZXModGhpcy5zZXR0aW5ncy5GSUxURVJfVEFHKVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdC8vIFtcdTY0MUNcdTdEMjJdIFx1NjgwN1x1N0I3RVxyXG5cdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLkZJTFRFUl9ERUxBWSAhPT0gXCJcIiAmJlxyXG5cdFx0XHRcdFx0XHRNYW5hZ2VyUGx1Z2luLmRlbGF5ICE9PSB0aGlzLnNldHRpbmdzLkZJTFRFUl9ERUxBWVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gW1x1NjQxQ1x1N0QyMl0gXHU1MjA2XHU3RUM0XHJcblx0XHRcdFx0XHRpZiAodGhpcy5ncm91cCAhPT0gXCJcIiAmJiBNYW5hZ2VyUGx1Z2luLmdyb3VwICE9PSB0aGlzLmdyb3VwKVxyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdC8vIFtcdTY0MUNcdTdEMjJdIFx1NjgwN1x1N0I3RVxyXG5cdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHR0aGlzLnRhZyAhPT0gXCJcIiAmJlxyXG5cdFx0XHRcdFx0XHQhTWFuYWdlclBsdWdpbi50YWdzLmluY2x1ZGVzKHRoaXMudGFnKVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdC8vIFtcdTY0MUNcdTdEMjJdIFx1NjgwN1x1N0I3RVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuZGVsYXkgIT09IFwiXCIgJiYgTWFuYWdlclBsdWdpbi5kZWxheSAhPT0gdGhpcy5kZWxheSlcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFtcdTY0MUNcdTdEMjJdIFx1NjgwN1x1OTg5OFxyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdHRoaXMuc2VhcmNoVGV4dCAhPT0gXCJcIiAmJlxyXG5cdFx0XHRcdFx0TWFuYWdlclBsdWdpbi5uYW1lXHJcblx0XHRcdFx0XHRcdC50b0xvd2VyQ2FzZSgpXHJcblx0XHRcdFx0XHRcdC5pbmRleE9mKHRoaXMuc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpKSA9PSAtMSAmJlxyXG5cdFx0XHRcdFx0TWFuYWdlclBsdWdpbi5kZXNjXHJcblx0XHRcdFx0XHRcdC50b0xvd2VyQ2FzZSgpXHJcblx0XHRcdFx0XHRcdC5pbmRleE9mKHRoaXMuc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpKSA9PSAtMSAmJlxyXG5cdFx0XHRcdFx0cGx1Z2luLmF1dGhvclxyXG5cdFx0XHRcdFx0XHQudG9Mb3dlckNhc2UoKVxyXG5cdFx0XHRcdFx0XHQuaW5kZXhPZih0aGlzLnNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkgPT0gLTFcclxuXHRcdFx0XHQpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHQvLyBbXHU3OTgxXHU3NTI4XSBcdTgxRUFcdTVERjFcclxuXHRcdFx0XHRpZiAocGx1Z2luLmlkID09PSB0aGlzLm1hbmFnZXIubWFuaWZlc3QuaWQpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRjb25zdCBpdGVtRWwgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCk7XHJcblx0XHRcdFx0aXRlbUVsLnNldENsYXNzKFwibWFuYWdlci1pdGVtXCIpO1xyXG5cdFx0XHRcdGl0ZW1FbC5uYW1lRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWl0ZW1fX25hbWUtY29udGFpbmVyXCIpO1xyXG5cdFx0XHRcdGl0ZW1FbC5kZXNjRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWl0ZW1fX2Rlc2NyaXB0aW9uLWNvbnRhaW5lclwiKTtcclxuXHJcblx0XHRcdFx0Ly8gW1x1NTNGM1x1OTUyRVx1NjRDRFx1NEY1Q11cclxuXHRcdFx0XHRpdGVtRWwuc2V0dGluZ0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIFx1OTYzQlx1NkI2Mlx1OUVEOFx1OEJBNFx1NzY4NFx1NTNGM1x1OTUyRVx1ODNEQ1x1NTM1NVxyXG5cdFx0XHRcdFx0Y29uc3QgbWVudSA9IG5ldyBNZW51KCk7XHJcblx0XHRcdFx0XHRtZW51LmFkZFNlcGFyYXRvcigpO1xyXG5cdFx0XHRcdFx0bWVudS5hZGRJdGVtKChpdGVtKSA9PlxyXG5cdFx0XHRcdFx0XHRpdGVtXHJcblx0XHRcdFx0XHRcdFx0LnNldFRpdGxlKFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1ODNEQ1x1NTM1NV9cdTdCMTRcdThCQjBfXHU2ODA3XHU5ODk4XCIpXHJcblx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdC5zZXRJY29uKFwibm90ZWJvb2stcGVuXCIpXHJcblx0XHRcdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0bmV3IE5vdGVNb2RhbChcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5hcHAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMubWFuYWdlcixcclxuXHRcdFx0XHRcdFx0XHRcdFx0TWFuYWdlclBsdWdpblxyXG5cdFx0XHRcdFx0XHRcdFx0KS5vcGVuKCk7XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRtZW51LmFkZEl0ZW0oKGl0ZW0pID0+XHJcblx0XHRcdFx0XHRcdGl0ZW1cclxuXHRcdFx0XHRcdFx0XHQuc2V0VGl0bGUoXHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU4M0RDXHU1MzU1X1x1NUZFQlx1NjM3N1x1OTUyRV9cdTY4MDdcdTk4OThcIilcclxuXHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0LnNldEljb24oXCJjaXJjbGUtcGx1c1wiKVxyXG5cdFx0XHRcdFx0XHRcdC5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuYXBwU2V0dGluZy5vcGVuKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcFNldHRpbmcub3BlblRhYkJ5SWQoXCJob3RrZXlzXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFiID0gYXdhaXQgdGhpcy5hcHBTZXR0aW5nLmFjdGl2ZVRhYjtcclxuXHRcdFx0XHRcdFx0XHRcdHRhYi5zZWFyY2hDb21wb25lbnQuaW5wdXRFbC52YWx1ZSA9IHBsdWdpbi5pZDtcclxuXHRcdFx0XHRcdFx0XHRcdHRhYi51cGRhdGVIb3RrZXlWaXNpYmlsaXR5KCk7XHJcblx0XHRcdFx0XHRcdFx0XHR0YWIuc2VhcmNoQ29tcG9uZW50LmlucHV0RWwuYmx1cigpO1xyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0bWVudS5hZGRJdGVtKChpdGVtKSA9PlxyXG5cdFx0XHRcdFx0XHRpdGVtXHJcblx0XHRcdFx0XHRcdFx0LnNldFRpdGxlKFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1ODNEQ1x1NTM1NV9HaXRIdWJfXHU2ODA3XHU5ODk4XCIpXHJcblx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdC5zZXRJY29uKFwiZ2l0aHViXCIpXHJcblx0XHRcdFx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHBsdWdpbi5hdXRob3JVcmwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0d2luZG93Lm9wZW4oXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGF0aC5qb2luKHBsdWdpbi5hdXRob3JVcmwsIHBsdWdpbi5pZClcclxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdG1lbnUuYWRkSXRlbSgoaXRlbSkgPT5cclxuXHRcdFx0XHRcdFx0aXRlbVxyXG5cdFx0XHRcdFx0XHRcdC5zZXRUaXRsZShcIlx1NTM1NVx1NkIyMVx1NTQyRlx1NTJBOFwiKVxyXG5cdFx0XHRcdFx0XHRcdC5zZXRJY29uKFwicmVwZWF0LTFcIilcclxuXHRcdFx0XHRcdFx0XHQuc2V0RGlzYWJsZWQoaXNFbmFibGVkKVxyXG5cdFx0XHRcdFx0XHRcdC5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoXCJcdTVGMDBcdTU0MkZcdTRFMkRcdUZGMENcdThCRjdcdTdBMERcdTdCNDlcIik7XHJcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0bWVudS5zaG93QXRQb3NpdGlvbih7IHg6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFkgfSk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vIFtcdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZdXHJcblx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuRkFERV9PVVRfRElTQUJMRURfUExVR0lOUyAmJiAhaXNFbmFibGVkKVxyXG5cdFx0XHRcdFx0aXRlbUVsLnNldHRpbmdFbC5hZGRDbGFzcyhcImluYWN0aXZlXCIpO1xyXG5cclxuXHRcdFx0XHQvLyBbXHU2Mjc5XHU5MUNGXHU2NENEXHU0RjVDXVxyXG5cdFx0XHRcdHRoaXMuZGlzcGxheVBsdWdpbnMucHVzaChwbHVnaW4pO1xyXG5cclxuXHRcdFx0XHQvLyBbXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGXVxyXG5cdFx0XHRcdGlmICghdGhpcy5lZGl0b3JNb2RlKSB7XHJcblx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMuc2V0dGluZ3MuSVRFTV9TVFlMRSkge1xyXG5cdFx0XHRcdFx0XHRjYXNlIFwiYWx3YXlzRXhwYW5kXCI6XHJcblx0XHRcdFx0XHRcdFx0aXRlbUVsLmRlc2NFbC5hZGRDbGFzcyhcIm1hbmFnZXItZGlzcGxheS1ibG9ja1wiKTtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSBcIm5ldmVyRXhwYW5kXCI6XHJcblx0XHRcdFx0XHRcdFx0aXRlbUVsLmRlc2NFbC5hZGRDbGFzcyhcIm1hbmFnZXItZGlzcGxheS1ub25lXCIpO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlIFwiaG92ZXJFeHBhbmRcIjpcclxuXHRcdFx0XHRcdFx0XHRpdGVtRWwuZGVzY0VsLmFkZENsYXNzKFwibWFuYWdlci1kaXNwbGF5LW5vbmVcIik7XHJcblx0XHRcdFx0XHRcdFx0aXRlbUVsLnNldHRpbmdFbC5hZGRFdmVudExpc3RlbmVyKFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJtb3VzZWVudGVyXCIsXHJcblx0XHRcdFx0XHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1FbC5kZXNjRWwucmVtb3ZlQ2xhc3MoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJtYW5hZ2VyLWRpc3BsYXktbm9uZVwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1FbC5kZXNjRWwuYWRkQ2xhc3MoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJtYW5hZ2VyLWRpc3BsYXktYmxvY2tcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0aXRlbUVsLnNldHRpbmdFbC5hZGRFdmVudExpc3RlbmVyKFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJtb3VzZWxlYXZlXCIsXHJcblx0XHRcdFx0XHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1FbC5kZXNjRWwucmVtb3ZlQ2xhc3MoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJtYW5hZ2VyLWRpc3BsYXktYmxvY2tcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtRWwuZGVzY0VsLmFkZENsYXNzKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibWFuYWdlci1kaXNwbGF5LW5vbmVcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgXCJjbGlja0V4cGFuZFwiOlxyXG5cdFx0XHRcdFx0XHRcdGl0ZW1FbC5kZXNjRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWRpc3BsYXktbm9uZVwiKTtcclxuXHRcdFx0XHRcdFx0XHRpdGVtRWwuc2V0dGluZ0VsLmFkZEV2ZW50TGlzdGVuZXIoXHJcblx0XHRcdFx0XHRcdFx0XHRcImNsaWNrXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgZXhjbHVkZWRCdXR0b25zID0gQXJyYXkuZnJvbShcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpdGVtRWwuY29udHJvbEVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZcIilcclxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRleGNsdWRlZEJ1dHRvbnMuaW5jbHVkZXMoZXZlbnQudGFyZ2V0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1FbC5kZXNjRWwuaGFzQ2xhc3MoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIm1hbmFnZXItZGlzcGxheS1ub25lXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1FbC5kZXNjRWwucmVtb3ZlQ2xhc3MoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIm1hbmFnZXItZGlzcGxheS1ub25lXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1FbC5kZXNjRWwuYWRkQ2xhc3MoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIm1hbmFnZXItZGlzcGxheS1ibG9ja1wiXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpdGVtRWwuZGVzY0VsLnJlbW92ZUNsYXNzKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJtYW5hZ2VyLWRpc3BsYXktYmxvY2tcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aXRlbUVsLmRlc2NFbC5hZGRDbGFzcyhcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwibWFuYWdlci1kaXNwbGF5LW5vbmVcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gW1x1OUVEOFx1OEJBNF0gXHU1MjA2XHU3RUM0XHJcblx0XHRcdFx0aWYgKE1hbmFnZXJQbHVnaW4uZ3JvdXAgIT09IFwiXCIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGdyb3VwID0gY3JlYXRlU3Bhbih7XHJcblx0XHRcdFx0XHRcdGNsczogXCJtYW5hZ2VyLWl0ZW1fX25hbWUtZ3JvdXBcIixcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0aXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZChncm91cCk7XHJcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gdGhpcy5zZXR0aW5ncy5HUk9VUFMuZmluZChcclxuXHRcdFx0XHRcdFx0KHQpID0+IHQuaWQgPT09IE1hbmFnZXJQbHVnaW4uZ3JvdXBcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCB0YWcgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKFxyXG5cdFx0XHRcdFx0XHRcdGl0ZW0ubmFtZSxcclxuXHRcdFx0XHRcdFx0XHRpdGVtLmNvbG9yLFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuR1JPVVBfU1RZTEVcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZWRpdG9yTW9kZSlcclxuXHRcdFx0XHRcdFx0XHR0YWcub25jbGljayA9ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdG5ldyBHcm91cE1vZGFsKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmFwcCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRNYW5hZ2VyUGx1Z2luXHJcblx0XHRcdFx0XHRcdFx0XHQpLm9wZW4oKTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRncm91cC5hcHBlbmRDaGlsZCh0YWcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBbXHU3RjE2XHU4RjkxXSBcdTUyMDZcdTdFQzRcclxuXHRcdFx0XHRpZiAoTWFuYWdlclBsdWdpbi5ncm91cCA9PT0gXCJcIiAmJiB0aGlzLmVkaXRvck1vZGUpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGdyb3VwID0gY3JlYXRlU3Bhbih7XHJcblx0XHRcdFx0XHRcdGNsczogXCJtYW5hZ2VyLWl0ZW1fX25hbWUtZ3JvdXBcIixcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuZWRpdG9yTW9kZSkgaXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZChncm91cCk7XHJcblx0XHRcdFx0XHRjb25zdCB0YWcgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKFwiK1wiLCBcIlwiLCBcIlwiKTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmVkaXRvck1vZGUpXHJcblx0XHRcdFx0XHRcdHRhZy5vbmNsaWNrID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdG5ldyBHcm91cE1vZGFsKFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hcHAsXHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm1hbmFnZXIsXHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLFxyXG5cdFx0XHRcdFx0XHRcdFx0TWFuYWdlclBsdWdpblxyXG5cdFx0XHRcdFx0XHRcdCkub3BlbigpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuZWRpdG9yTW9kZSkgZ3JvdXAuYXBwZW5kQ2hpbGQodGFnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFtcdTlFRDhcdThCQTRdIFx1NTQwRFx1NzlGMFxyXG5cdFx0XHRcdGNvbnN0IHRpdGxlID0gY3JlYXRlU3Bhbih7XHJcblx0XHRcdFx0XHR0ZXh0OiBNYW5hZ2VyUGx1Z2luLm5hbWUsXHJcblx0XHRcdFx0XHR0aXRsZTogcGx1Z2luLm5hbWUsXHJcblx0XHRcdFx0XHRjbHM6IFwibWFuYWdlci1pdGVtX19uYW1lLXRpdGxlXCIsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly8gW1x1N0YxNlx1OEY5MV0gXHU1NDBEXHU3OUYwXHJcblx0XHRcdFx0aWYgKHRoaXMuZWRpdG9yTW9kZSkge1xyXG5cdFx0XHRcdFx0dGl0bGUuc2V0QXR0cmlidXRlKFxyXG5cdFx0XHRcdFx0XHRcInN0eWxlXCIsXHJcblx0XHRcdFx0XHRcdFwiYm9yZGVyLXdpZHRoOiAxcHg7Ym9yZGVyLXN0eWxlOiBkYXNoZWQ7XCJcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR0aXRsZS5zZXRBdHRyaWJ1dGUoXCJjb250ZW50ZWRpdGFibGVcIiwgXCJ0cnVlXCIpO1xyXG5cdFx0XHRcdFx0dGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKHRpdGxlLnRleHRDb250ZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0TWFuYWdlclBsdWdpbi5uYW1lID0gdGl0bGUudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdFx0XHRcdENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcblxyXG5cdFx0XHRcdC8vIFtcdTlFRDhcdThCQTRdIFx1NzI0OFx1NjcyQ1xyXG5cdFx0XHRcdGNvbnN0IHZlcnNpb24gPSBjcmVhdGVTcGFuKHtcclxuXHRcdFx0XHRcdHRleHQ6IGBbJHtwbHVnaW4udmVyc2lvbn1dYCxcclxuXHRcdFx0XHRcdGNsczogW1wibWFuYWdlci1pdGVtX19uYW1lLXZlcnNpb25cIl0sXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0aXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZCh2ZXJzaW9uKTtcclxuXHJcblx0XHRcdFx0Ly8gW1x1OUVEOFx1OEJBNF0gXHU1RUY2XHU4RkRGXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5ERUxBWSAmJlxyXG5cdFx0XHRcdFx0IXRoaXMuZWRpdG9yTW9kZSAmJlxyXG5cdFx0XHRcdFx0TWFuYWdlclBsdWdpbi5kZWxheSAhPT0gXCJcIlxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgZCA9IHRoaXMuc2V0dGluZ3MuREVMQVlTLmZpbmQoXHJcblx0XHRcdFx0XHRcdChpdGVtKSA9PiBpdGVtLmlkID09PSBNYW5hZ2VyUGx1Z2luLmRlbGF5XHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0aWYgKGQpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgZGVsYXkgPSBjcmVhdGVTcGFuKHtcclxuXHRcdFx0XHRcdFx0XHR0ZXh0OiBgJHtkLnRpbWV9c2AsXHJcblx0XHRcdFx0XHRcdFx0Y2xzOiBbXCJtYW5hZ2VyLWl0ZW1fX25hbWUtZGVsYXlcIl0sXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKGRlbGF5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gW1x1OUVEOFx1OEJBNF0gXHU2M0NGXHU4RkYwXHJcblx0XHRcdFx0Y29uc3QgZGVzYyA9IGNyZWF0ZURpdih7XHJcblx0XHRcdFx0XHR0ZXh0OiBNYW5hZ2VyUGx1Z2luLmRlc2MsXHJcblx0XHRcdFx0XHR0aXRsZTogcGx1Z2luLmRlc2NyaXB0aW9uLFxyXG5cdFx0XHRcdFx0Y2xzOiBbXCJtYW5hZ2VyLWl0ZW1fX25hbWUtZGVzY1wiXSxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Ly8gW1x1N0YxNlx1OEY5MV0gXHU2M0NGXHU4RkYwXHJcblx0XHRcdFx0aWYgKHRoaXMuZWRpdG9yTW9kZSkge1xyXG5cdFx0XHRcdFx0ZGVzYy5zZXRBdHRyaWJ1dGUoXHJcblx0XHRcdFx0XHRcdFwic3R5bGVcIixcclxuXHRcdFx0XHRcdFx0XCJib3JkZXItd2lkdGg6IDFweDtib3JkZXItc3R5bGU6IGRhc2hlZFwiXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0ZGVzYy5zZXRBdHRyaWJ1dGUoXCJjb250ZW50ZWRpdGFibGVcIiwgXCJ0cnVlXCIpO1xyXG5cdFx0XHRcdFx0ZGVzYy5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoZGVzYy50ZXh0Q29udGVudCkge1xyXG5cdFx0XHRcdFx0XHRcdE1hbmFnZXJQbHVnaW4uZGVzYyA9IGRlc2MudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aXRlbUVsLmRlc2NFbC5hcHBlbmRDaGlsZChkZXNjKTtcclxuXHJcblx0XHRcdFx0Ly8gW1x1OUVEOFx1OEJBNF0gXHU2ODA3XHU3QjdFXHU3RUM0XHJcblx0XHRcdFx0Y29uc3QgdGFncyA9IGNyZWF0ZURpdigpO1xyXG5cdFx0XHRcdGl0ZW1FbC5kZXNjRWwuYXBwZW5kQ2hpbGQodGFncyk7XHJcblx0XHRcdFx0TWFuYWdlclBsdWdpbi50YWdzLm1hcCgoaWQ6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IHRoaXMuc2V0dGluZ3MuVEFHUy5maW5kKFxyXG5cdFx0XHRcdFx0XHQoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWRcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCB0YWcgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKFxyXG5cdFx0XHRcdFx0XHRcdGl0ZW0ubmFtZSxcclxuXHRcdFx0XHRcdFx0XHRpdGVtLmNvbG9yLFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuVEFHX1NUWUxFXHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmVkaXRvck1vZGUpXHJcblx0XHRcdFx0XHRcdFx0dGFnLm9uY2xpY2sgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRuZXcgVGFnc01vZGFsKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmFwcCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRNYW5hZ2VyUGx1Z2luXHJcblx0XHRcdFx0XHRcdFx0XHQpLm9wZW4oKTtcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHR0YWdzLmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vIFtcdTdGMTZcdThGOTFdIFx1NjgwN1x1N0I3RVx1N0VDNFxyXG5cdFx0XHRcdGlmICh0aGlzLmVkaXRvck1vZGUpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHRhZyA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoXCIrXCIsIFwiXCIsIFwiXCIpO1xyXG5cdFx0XHRcdFx0dGFnLm9uY2xpY2sgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdG5ldyBUYWdzTW9kYWwoXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5hcHAsXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMsXHJcblx0XHRcdFx0XHRcdFx0TWFuYWdlclBsdWdpblxyXG5cdFx0XHRcdFx0XHQpLm9wZW4oKTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR0YWdzLmFwcGVuZENoaWxkKHRhZyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIXRoaXMuZWRpdG9yTW9kZSkge1xyXG5cdFx0XHRcdFx0Ly8gW1x1NjMwOVx1OTRBRV0gXHU2MjUzXHU1RjAwXHU4QkJFXHU3RjZFXHJcblx0XHRcdFx0XHRpZiAoaXNFbmFibGVkKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG9wZW5QbHVnaW5TZXR0aW5nID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KFxyXG5cdFx0XHRcdFx0XHRcdGl0ZW1FbC5jb250cm9sRWxcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0b3BlblBsdWdpblNldHRpbmcuc2V0SWNvbihcInNldHRpbmdzXCIpO1xyXG5cdFx0XHRcdFx0XHRvcGVuUGx1Z2luU2V0dGluZy5zZXRUb29sdGlwKFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMFwiKVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRvcGVuUGx1Z2luU2V0dGluZy5vbkNsaWNrKCgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRvcGVuUGx1Z2luU2V0dGluZy5zZXREaXNhYmxlZCh0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmFwcFNldHRpbmcub3BlbigpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYXBwU2V0dGluZy5vcGVuVGFiQnlJZChwbHVnaW4uaWQpO1xyXG5cdFx0XHRcdFx0XHRcdG9wZW5QbHVnaW5TZXR0aW5nLnNldERpc2FibGVkKGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gW1x1NjMwOVx1OTRBRV0gXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1XHJcblx0XHRcdFx0XHRjb25zdCBvcGVuUGx1Z2luRGlyQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KFxyXG5cdFx0XHRcdFx0XHRpdGVtRWwuY29udHJvbEVsXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0b3BlblBsdWdpbkRpckJ1dHRvbi5zZXRJY29uKFwiZm9sZGVyLW9wZW5cIik7XHJcblx0XHRcdFx0XHRvcGVuUGx1Z2luRGlyQnV0dG9uLnNldFRvb2x0aXAoXHJcblx0XHRcdFx0XHRcdHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1X1x1NjNDRlx1OEZGMFwiKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdG9wZW5QbHVnaW5EaXJCdXR0b24ub25DbGljaygoKSA9PiB7XHJcblx0XHRcdFx0XHRcdG9wZW5QbHVnaW5EaXJCdXR0b24uc2V0RGlzYWJsZWQodHJ1ZSk7XHJcblx0XHRcdFx0XHRcdG1hbmFnZXJPcGVuKHBsdWdpbkRpciwgdGhpcy5tYW5hZ2VyKTtcclxuXHRcdFx0XHRcdFx0b3BlblBsdWdpbkRpckJ1dHRvbi5zZXREaXNhYmxlZChmYWxzZSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHQvLyBbXHU2MzA5XHU5NEFFXSBcdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZcclxuXHRcdFx0XHRcdGNvbnN0IGRlbGV0ZVBsdWdpbkJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudChcclxuXHRcdFx0XHRcdFx0aXRlbUVsLmNvbnRyb2xFbFxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGRlbGV0ZVBsdWdpbkJ1dHRvbi5zZXRJY29uKFwidHJhc2hcIik7XHJcblx0XHRcdFx0XHRkZWxldGVQbHVnaW5CdXR0b24uc2V0VG9vbHRpcChcclxuXHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwXCIpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0ZGVsZXRlUGx1Z2luQnV0dG9uLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRuZXcgRGVsZXRlTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuYXBwUGx1Z2lucy51bmluc3RhbGxQbHVnaW4ocGx1Z2luLmlkKTtcclxuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcFBsdWdpbnMubG9hZE1hbmlmZXN0cygpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuXHRcdFx0XHRcdFx0XHQvLyBcdTUyMzdcdTY1QjBcdTU0N0RcdTRFRTRcdTg4NENcclxuXHRcdFx0XHRcdFx0XHRDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuXHRcdFx0XHRcdFx0XHQvLyBcdTUyMjBcdTk2NjRcdTU0MENcdTc0MDZcclxuXHRcdFx0XHRcdFx0XHR0aGlzLm1hbmFnZXIuc3luY2hyb25pemVQbHVnaW5zKFxyXG5cdFx0XHRcdFx0XHRcdFx0T2JqZWN0LnZhbHVlcyh0aGlzLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5maWx0ZXIoXHJcblx0XHRcdFx0XHRcdFx0XHRcdChwbTogUGx1Z2luTWFuaWZlc3QpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cG0uaWQgIT09IHRoaXMubWFuYWdlci5tYW5pZmVzdC5pZFxyXG5cdFx0XHRcdFx0XHRcdFx0KSBhcyBQbHVnaW5NYW5pZmVzdFtdXHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRuZXcgTm90aWNlKFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1NTM3OFx1OEY3RF9cdTkwMUFcdTc3RTVfXHU0RTAwXCIpXHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0fSkub3BlbigpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gW1x1NjMwOVx1OTRBRV0gXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxXHJcblx0XHRcdFx0XHRjb25zdCB0b2dnbGVTd2l0Y2ggPSBuZXcgVG9nZ2xlQ29tcG9uZW50KGl0ZW1FbC5jb250cm9sRWwpO1xyXG5cdFx0XHRcdFx0dG9nZ2xlU3dpdGNoLnNldFRvb2x0aXAoXHJcblx0XHRcdFx0XHRcdHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMFwiKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdHRvZ2dsZVN3aXRjaC5zZXRWYWx1ZShpc0VuYWJsZWQpO1xyXG5cdFx0XHRcdFx0dG9nZ2xlU3dpdGNoLm9uQ2hhbmdlKGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuREVMQVkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAodG9nZ2xlU3dpdGNoLmdldFZhbHVlKCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLkZBREVfT1VUX0RJU0FCTEVEX1BMVUdJTlMpXHJcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1FbC5zZXR0aW5nRWwucmVtb3ZlQ2xhc3MoXCJpbmFjdGl2ZVwiKTsgLy8gW1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl1cclxuXHRcdFx0XHRcdFx0XHRcdE1hbmFnZXJQbHVnaW4uZW5hYmxlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLkZBREVfT1VUX0RJU0FCTEVEX1BMVUdJTlMpXHJcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1FbC5zZXR0aW5nRWwuYWRkQ2xhc3MoXCJpbmFjdGl2ZVwiKTsgLy8gW1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl1cclxuXHRcdFx0XHRcdFx0XHRcdE1hbmFnZXJQbHVnaW4uZW5hYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW4ocGx1Z2luLmlkKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHRvZ2dsZVN3aXRjaC5nZXRWYWx1ZSgpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5GQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtRWwuc2V0dGluZ0VsLnJlbW92ZUNsYXNzKFwiaW5hY3RpdmVcIik7IC8vIFtcdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZdXHJcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luQW5kU2F2ZShcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGx1Z2luLmlkXHJcblx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5GQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtRWwuc2V0dGluZ0VsLmFkZENsYXNzKFwiaW5hY3RpdmVcIik7IC8vIFtcdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZdXHJcblx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbkFuZFNhdmUoXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBsdWdpbi5pZFxyXG5cdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0Q29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcblx0XHRcdFx0XHRcdHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvL1xyXG5cdFx0XHRcdGlmICh0aGlzLmVkaXRvck1vZGUpIHtcclxuXHRcdFx0XHRcdC8vIFtcdTYzMDlcdTk0QUVdIFx1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOVxyXG5cdFx0XHRcdFx0Y29uc3QgcmVsb2FkQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KFxyXG5cdFx0XHRcdFx0XHRpdGVtRWwuY29udHJvbEVsXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0cmVsb2FkQnV0dG9uLnNldEljb24oXCJyZWZyZXNoLWNjd1wiKTtcclxuXHRcdFx0XHRcdHJlbG9hZEJ1dHRvbi5zZXRUb29sdGlwKFxyXG5cdFx0XHRcdFx0XHR0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOV9cdTYzQ0ZcdThGRjBcIilcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRyZWxvYWRCdXR0b24ub25DbGljaygoKSA9PiB7XHJcblx0XHRcdFx0XHRcdE1hbmFnZXJQbHVnaW4ubmFtZSA9IHBsdWdpbi5uYW1lO1xyXG5cdFx0XHRcdFx0XHRNYW5hZ2VyUGx1Z2luLmRlc2MgPSBwbHVnaW4uZGVzY3JpcHRpb247XHJcblx0XHRcdFx0XHRcdE1hbmFnZXJQbHVnaW4uZ3JvdXAgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRNYW5hZ2VyUGx1Z2luLmRlbGF5ID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0TWFuYWdlclBsdWdpbi50YWdzID0gW107XHJcblx0XHRcdFx0XHRcdHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHQvLyBbXHU3RjE2XHU4RjkxXSBcdTVFRjZcdThGREZcclxuXHRcdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLkRFTEFZKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IGRlbGF5cyA9IHRoaXMuc2V0dGluZ3MuREVMQVlTLnJlZHVjZShcclxuXHRcdFx0XHRcdFx0XHQoYWNjOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCBpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRhY2NbaXRlbS5pZF0gPSBpdGVtLm5hbWU7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYWNjO1xyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XCJcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJcdTkwMUFcdTc1MjhfXHU2NUUwXHU1RUY2XHU4RkRGX1x1NjU4N1x1NjcyQ1wiXHJcblx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgZGVsYXlzRWwgPSBuZXcgRHJvcGRvd25Db21wb25lbnQoXHJcblx0XHRcdFx0XHRcdFx0aXRlbUVsLmNvbnRyb2xFbFxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRkZWxheXNFbC5hZGRPcHRpb25zKGRlbGF5cyk7XHJcblx0XHRcdFx0XHRcdGRlbGF5c0VsLnNldFZhbHVlKE1hbmFnZXJQbHVnaW4uZGVsYXkpO1xyXG5cdFx0XHRcdFx0XHRkZWxheXNFbC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRNYW5hZ2VyUGx1Z2luLmRlbGF5ID0gdmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvLyBcdThCQTFcdTdCOTdcdTk4NzVcdTVDM0VcclxuXHRcdHRoaXMuZm9vdEVsLmlubmVySFRNTCA9IHRoaXMuY291bnQoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjb3VudCgpOiBzdHJpbmcge1xyXG5cdFx0bGV0IHRvdGFsQ291bnQgPSAwO1xyXG5cdFx0bGV0IGVuYWJsZWRDb3VudCA9IDA7XHJcblx0XHRsZXQgZGlzYWJsZWRDb3VudCA9IDA7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5ERUxBWSkge1xyXG5cdFx0XHRjb25zdCBwbHVnaW5zID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zO1xyXG5cdFx0XHR0b3RhbENvdW50ID0gcGx1Z2lucy5sZW5ndGg7XHJcblx0XHRcdHBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiB7XHJcblx0XHRcdFx0cGx1Z2luLmVuYWJsZWQgPyBlbmFibGVkQ291bnQrKyA6IGRpc2FibGVkQ291bnQrKztcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0b3RhbENvdW50ID1cclxuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLm1hbmFnZXIuYXBwUGx1Z2lucy5tYW5pZmVzdHMpLmxlbmd0aCAtIDE7XHJcblx0XHRcdGVuYWJsZWRDb3VudCA9IHRoaXMubWFuYWdlci5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLnNpemUgLSAxO1xyXG5cdFx0XHRkaXNhYmxlZENvdW50ID0gdG90YWxDb3VudCAtIGVuYWJsZWRDb3VudDtcclxuXHRcdH1cclxuXHRcdGNvbnN0IHN1bW1hcnkgPSBgWyR7dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcclxuXHRcdFx0XCJcdTkwMUFcdTc1MjhfXHU2MDNCXHU4QkExX1x1NjU4N1x1NjcyQ1wiXHJcblx0XHQpfV0gJHt0b3RhbENvdW50fSBbJHt0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFxyXG5cdFx0XHRcIlx1OTAxQVx1NzUyOF9cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDXCJcclxuXHRcdCl9XSAke2VuYWJsZWRDb3VudH0gWyR7dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcclxuXHRcdFx0XCJcdTkwMUFcdTc1MjhfXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQ1wiXHJcblx0XHQpfV0gJHtkaXNhYmxlZENvdW50fSBgO1xyXG5cdFx0cmV0dXJuIHN1bW1hcnk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXN5bmMgcmVsb2FkU2hvd0RhdGEoKSB7XHJcblx0XHRsZXQgc2Nyb2xsVG9wID0gMDtcclxuXHRcdGNvbnN0IG1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbDtcclxuXHRcdHNjcm9sbFRvcCA9IG1vZGFsRWxlbWVudC5zY3JvbGxUb3A7XHJcblx0XHRtb2RhbEVsZW1lbnQuZW1wdHkoKTtcclxuXHRcdHRoaXMuc2hvd0RhdGEoKTtcclxuXHRcdG1vZGFsRWxlbWVudC5zY3JvbGxUbygwLCBzY3JvbGxUb3ApO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGFzeW5jIG9uT3BlbigpIHtcclxuXHRcdGF3YWl0IHRoaXMuc2hvd0hlYWQoKTtcclxuXHRcdGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuXHRcdHRoaXMuc2VhcmNoRWwuaW5wdXRFbC5mb2N1cygpO1xyXG5cdFx0Ly8gW1x1NTI5Rlx1ODBGRF0gY3RybCtmXHU4MDVBXHU3MTI2XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0aWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwiZlwiKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoRWwuaW5wdXRFbCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZWFyY2hFbC5pbnB1dEVsLmZvY3VzKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhc3luYyBvbkNsb3NlKCkge1xyXG5cdFx0dGhpcy5jb250ZW50RWwuZW1wdHkoKTtcclxuXHR9XHJcbn1cclxuIiwgImltcG9ydCB7IE5vdGljZSwgUGxhdGZvcm0gfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnbWFpbic7XHJcblxyXG4vKipcclxuICogXHU2MjUzXHU1RjAwXHU2NTg3XHU0RUY2XHU2MjE2XHU2NTg3XHU0RUY2XHU1OTM5XHU3Njg0XHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGXHU1NDdEXHU0RUU0XHUzMDAyXHJcbiAqIEBwYXJhbSBpMThuIC0gXHU1NkZEXHU5NjQ1XHU1MzE2XHU1QkY5XHU4QzYxXHVGRjBDXHU3NTI4XHU0RThFXHU2NjNFXHU3OTNBXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU3Njg0XHU5MDFBXHU3N0U1XHUzMDAyXHJcbiAqIEBwYXJhbSBkaXIgLSBcdTg5ODFcdTYyNTNcdTVGMDBcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MzlcdThERUZcdTVGODRcdTMwMDJcclxuICogQGRlc2NyaXB0aW9uIFx1NjgzOVx1NjM2RVx1NjRDRFx1NEY1Q1x1N0NGQlx1N0VERlx1NjI2N1x1ODg0Q1x1NzZGOFx1NUU5NFx1NzY4NFx1NTQ3RFx1NEVFNFx1Njc2NVx1NjI1M1x1NUYwMFx1NjU4N1x1NEVGNlx1NTkzOVx1MzAwMlx1NTcyOFdpbmRvd3NcdTRFMEFcdTRGN0ZcdTc1Mjgnc3RhcnQnXHU1NDdEXHU0RUU0XHVGRjBDXHU1NzI4TWFjXHU0RTBBXHU0RjdGXHU3NTI4J29wZW4nXHU1NDdEXHU0RUU0XHUzMDAyXHJcbiAqIFx1NTk4Mlx1Njc5Q1x1NjRDRFx1NEY1Q1x1NjIxMFx1NTI5Rlx1RkYwQ1x1NjYzRVx1NzkzQVx1NjIxMFx1NTI5Rlx1OTAxQVx1NzdFNVx1RkYxQlx1NTk4Mlx1Njc5Q1x1NTkzMVx1OEQyNVx1RkYwQ1x1NjYzRVx1NzkzQVx1OTUxOVx1OEJFRlx1OTAxQVx1NzdFNVx1MzAwMlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1hbmFnZXJPcGVuID0gKGRpcjogc3RyaW5nLCBtYW5hZ2VyOiBNYW5hZ2VyKSA9PiB7XHJcblx0aWYgKFBsYXRmb3JtLmlzRGVza3RvcCkge1xyXG5cdFx0ZXhlYyhgc3RhcnQgXCJcIiBcIiR7ZGlyfVwiYCwgKGVycm9yKSA9PiB7XHJcblx0XHRcdGlmIChlcnJvcikgeyBuZXcgTm90aWNlKG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1OTMxXHU4RDI1X1x1NjU4N1x1NjcyQycpKTsgfSBlbHNlIHsgbmV3IE5vdGljZShtYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkMnKSk7IH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRpZiAoUGxhdGZvcm0uaXNNYWNPUykge1xyXG5cdFx0ZXhlYyhgb3BlbiAke2Rpcn1gLCAoZXJyb3IpID0+IHtcclxuXHRcdFx0aWYgKGVycm9yKSB7IG5ldyBOb3RpY2UobWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDJykpOyB9IGVsc2UgeyBuZXcgTm90aWNlKG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU2MjEwXHU1MjlGX1x1NjU4N1x1NjcyQycpKTsgfVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG4iLCAiaW1wb3J0IHsgQXBwLCBFeHRyYUJ1dHRvbkNvbXBvbmVudCwgTW9kYWwsIE5vdGljZSwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MvZGF0YSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ21haW4nO1xyXG5pbXBvcnQgeyBNYW5hZ2VyTW9kYWwgfSBmcm9tICcuL21hbmFnZXItbW9kYWwnO1xyXG5pbXBvcnQgeyBNYW5hZ2VyUGx1Z2luIH0gZnJvbSAnc3JjL2RhdGEvdHlwZXMnO1xyXG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnc3JjL2NvbW1hbmQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyb3VwTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcbiAgICBzZXR0aW5nczogTWFuYWdlclNldHRpbmdzO1xyXG4gICAgbWFuYWdlcjogTWFuYWdlcjtcclxuICAgIG1hbmFnZXJNb2RhbDogTWFuYWdlck1vZGFsO1xyXG4gICAgbWFuYWdlclBsdWdpbjogTWFuYWdlclBsdWdpbjtcclxuICAgIHNlbGVjdGVkOiBzdHJpbmc7XHJcbiAgICBhZGQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIG1hbmFnZXI6IE1hbmFnZXIsIG1hbmFnZXJNb2RhbDogTWFuYWdlck1vZGFsLCBtYW5hZ2VyUGx1Z2luOiBNYW5hZ2VyUGx1Z2luKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gbWFuYWdlci5zZXR0aW5ncztcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubWFuYWdlck1vZGFsID0gbWFuYWdlck1vZGFsO1xyXG4gICAgICAgIHRoaXMubWFuYWdlclBsdWdpbiA9IG1hbmFnZXJQbHVnaW47XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICcnO1xyXG4gICAgICAgIHRoaXMuYWRkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzaG93SGVhZCgpIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBjb25zdCBtb2RhbEVsOiBIVE1MRWxlbWVudCA9IHRoaXMuY29udGVudEVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgbW9kYWxFbC5hZGRDbGFzcygnbWFuYWdlci1lZGl0b3JfX2NvbnRhaW5lcicpO1xyXG4gICAgICAgIG1vZGFsRWwucmVtb3ZlQ2hpbGQobW9kYWxFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RhbC1jbG9zZS1idXR0b24nKVswXSk7XHJcbiAgICAgICAgdGhpcy50aXRsZUVsLnBhcmVudEVsZW1lbnQ/LmFkZENsYXNzKCdtYW5hZ2VyLWNvbnRhaW5lcl9faGVhZGVyJyk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoJ21hbmFnZXItaXRlbS1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjgwN1x1OTg5OFx1ODg0Q11cclxuICAgICAgICBjb25zdCB0aXRsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbCkuc2V0Q2xhc3MoJ21hbmFnZXItYmFyX190aXRsZScpLnNldE5hbWUoYFske3RoaXMubWFuYWdlclBsdWdpbi5uYW1lfV1gKTtcclxuICAgICAgICAvLyBbXHU2ODA3XHU5ODk4XHU4ODRDXSBcdTUxNzNcdTk1RURcdTYzMDlcdTk0QUVcclxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudCh0aXRsZUJhci5jb250cm9sRWwpXHJcbiAgICAgICAgY2xvc2VCdXR0b24uc2V0SWNvbignY2lyY2xlLXgnKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dEYXRhKCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5zZXR0aW5ncy5HUk9VUFMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUVsID0gbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXHJcbiAgICAgICAgICAgIGl0ZW1FbC5zZXRDbGFzcygnbWFuYWdlci1lZGl0b3JfX2l0ZW0nKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9PSAnJyB8fCB0aGlzLnNlbGVjdGVkICE9IGdyb3VwLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbignc2V0dGluZ3MnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGdyb3VwLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRUb2dnbGUoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZ3JvdXAuaWQgPT09IHRoaXMubWFuYWdlclBsdWdpbi5ncm91cClcclxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXJQbHVnaW4uZ3JvdXAgPSB0aGlzLm1hbmFnZXJQbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkID8gJycgOiBncm91cC5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXJNb2RhbC5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwRWwgPSBjcmVhdGVTcGFuKHsgY2xzOiAnbWFuYWdlci1pdGVtX19uYW1lLWdyb3VwJyB9KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYXBwZW5kQ2hpbGQoZ3JvdXBFbCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKGdyb3VwLm5hbWUsIGdyb3VwLmNvbG9yLCB0aGlzLnNldHRpbmdzLkdST1VQX1NUWUxFKTtcclxuICAgICAgICAgICAgICAgIGdyb3VwRWwuYXBwZW5kQ2hpbGQodGFnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAhPSAnJyAmJiB0aGlzLnNlbGVjdGVkID09IGdyb3VwLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkQ29sb3JQaWNrZXIoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZ3JvdXAuY29sb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgaXRlbUVsLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZ3JvdXAubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmlucHV0RWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtLWlucHV0JylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRJY29uKCd0cmFzaC0yJylcclxuICAgICAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1Rlc3RHcm91cCA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5zb21lKHBsdWdpbiA9PiBwbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNUZXN0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zZXR0aW5ncy5HUk9VUFMgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuR1JPVVBTLmZpbHRlcih0ID0+IHQuaWQgIT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDknKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbignc2F2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyTW9kYWwucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBFbCA9IGNyZWF0ZVNwYW4oeyBjbHM6ICdtYW5hZ2VyLWl0ZW1fX25hbWUtZ3JvdXAnIH0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZChncm91cEVsKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoZ3JvdXAubmFtZSwgZ3JvdXAuY29sb3IsIHRoaXMuc2V0dGluZ3MuR1JPVVBfU1RZTEUpO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBFbC5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFkZCkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAnJztcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvb2RCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCkuc2V0Q2xhc3MoJ21hbmFnZXItYmFyX190aXRsZScpO1xyXG4gICAgICAgICAgICBmb29kQmFyLmluZm9FbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgZm9vZEJhci5hZGRDb2xvclBpY2tlcihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKGNvbG9yKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGZvb2RCYXIuYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdJRCcpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7IGlkID0gdmFsdWU7IHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTsgfSlcclxuICAgICAgICAgICAgICAgIC5pbnB1dEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9faXRlbS1pbnB1dCcpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgZm9vZEJhci5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkMnKSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHsgbmFtZSA9IHZhbHVlOyB9KVxyXG4gICAgICAgICAgICAgICAgLmlucHV0RWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtLWlucHV0JylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBmb29kQmFyLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0SWNvbigncGx1cycpXHJcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbnNJZCA9IHRoaXMubWFuYWdlci5zZXR0aW5ncy5HUk9VUFMuc29tZSh0YWcgPT4gdGFnLmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluc0lkICYmIGlkICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09ICcnKSBjb2xvciA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5wdXNoKHsgaWQsIG5hbWUsIGNvbG9yIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBbXHU1RTk1XHU5MEU4XHU4ODRDXSBcdTY1QjBcdTU4OUVcclxuICAgICAgICAgICAgY29uc3QgZm9vZEJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKS5zZXRDbGFzcygnbWFuYWdlci1iYXJfX3RpdGxlJykuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU2NUIwXHU1ODlFX1x1NjU4N1x1NjcyQycpKTtcclxuICAgICAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KGZvb2RCYXIuY29udHJvbEVsKVxyXG4gICAgICAgICAgICBhZGRCdXR0b24uc2V0SWNvbignY2lyY2xlLXBsdXMnKVxyXG4gICAgICAgICAgICBhZGRCdXR0b24ub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbG9hZFNob3dEYXRhKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbDtcclxuICAgICAgICBzY3JvbGxUb3AgPSBtb2RhbEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIG1vZGFsRWxlbWVudC5lbXB0eSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgICAgICBtb2RhbEVsZW1lbnQuc2Nyb2xsVG8oMCwgc2Nyb2xsVG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbk9wZW4oKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93SGVhZCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsICJpbXBvcnQgeyBBcHAsIEV4dHJhQnV0dG9uQ29tcG9uZW50LCBNb2RhbCwgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5pbXBvcnQgeyBNYW5hZ2VyU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9kYXRhJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnbWFpbic7XHJcbmltcG9ydCB7IE1hbmFnZXJNb2RhbCB9IGZyb20gJy4vbWFuYWdlci1tb2RhbCc7XHJcbmltcG9ydCB7IE1hbmFnZXJQbHVnaW4gfSBmcm9tICdzcmMvZGF0YS90eXBlcyc7XHJcbmltcG9ydCBDb21tYW5kcyBmcm9tICdzcmMvY29tbWFuZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFnc01vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG4gICAgc2V0dGluZ3M6IE1hbmFnZXJTZXR0aW5ncztcclxuICAgIG1hbmFnZXI6IE1hbmFnZXI7XHJcbiAgICBtYW5hZ2VyTW9kYWw6IE1hbmFnZXJNb2RhbDtcclxuICAgIG1hbmFnZXJQbHVnaW46IE1hbmFnZXJQbHVnaW47XHJcbiAgICBzZWxlY3RlZDogc3RyaW5nO1xyXG4gICAgYWRkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBtYW5hZ2VyOiBNYW5hZ2VyLCBtYW5hZ2VyTW9kYWw6IE1hbmFnZXJNb2RhbCwgbWFuYWdlclBsdWdpbjogTWFuYWdlclBsdWdpbikge1xyXG4gICAgICAgIHN1cGVyKGFwcCk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IG1hbmFnZXIuc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcclxuICAgICAgICB0aGlzLm1hbmFnZXJNb2RhbCA9IG1hbmFnZXJNb2RhbDtcclxuICAgICAgICB0aGlzLm1hbmFnZXJQbHVnaW4gPSBtYW5hZ2VyUGx1Z2luO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnJztcclxuICAgICAgICB0aGlzLmFkZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2hvd0hlYWQoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgbW9kYWxFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIG1vZGFsRWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19jb250YWluZXInKTtcclxuICAgICAgICBtb2RhbEVsLnJlbW92ZUNoaWxkKG1vZGFsRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UtYnV0dG9uJylbMF0pO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbC5wYXJlbnRFbGVtZW50Py5hZGRDbGFzcygnbWFuYWdlci1jb250YWluZXJfX2hlYWRlcicpO1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmFkZENsYXNzKCdtYW5hZ2VyLWl0ZW0tY29udGFpbmVyJyk7XHJcbiAgICAgICAgLy8gW1x1NjgwN1x1OTg5OFx1ODg0Q11cclxuICAgICAgICBjb25zdCB0aXRsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbCkuc2V0Q2xhc3MoJ21hbmFnZXItYmFyX190aXRsZScpLnNldE5hbWUodGhpcy5tYW5hZ2VyUGx1Z2luLm5hbWUpO1xyXG4gICAgICAgIC8vIFtcdTY4MDdcdTk4OThcdTg4NENdIFx1NTE3M1x1OTVFRFx1NjMwOVx1OTRBRVxyXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KHRpdGxlQmFyLmNvbnRyb2xFbClcclxuICAgICAgICBjbG9zZUJ1dHRvbi5zZXRJY29uKCdjaXJjbGUteCcpXHJcbiAgICAgICAgY2xvc2VCdXR0b24ub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2hvd0RhdGEoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCB0YWcgb2YgdGhpcy5zZXR0aW5ncy5UQUdTKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1FbCA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxyXG4gICAgICAgICAgICBpdGVtRWwuc2V0Q2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtJylcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT0gJycgfHwgdGhpcy5zZWxlY3RlZCAhPSB0YWcuaWQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRJY29uKCdzZXR0aW5ncycpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGFnLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRUb2dnbGUoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5tYW5hZ2VyUGx1Z2luLnRhZ3MuaW5jbHVkZXModGFnLmlkKSlcclxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKGlzQ2hlY2tlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcdTZERkJcdTUyQTBcdTVGMDBcdTU0MkZcdTc2ODRcdTY4MDdcdTdCN0VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYW5hZ2VyUGx1Z2luLnRhZ3MuaW5jbHVkZXModGFnLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlclBsdWdpbi50YWdzLnB1c2godGFnLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFx1NzlGQlx1OTY2NFx1NTE3M1x1OTVFRFx1NzY4NFx1NjgwN1x1N0I3RVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyUGx1Z2luLnRhZ3MgPSB0aGlzLm1hbmFnZXJQbHVnaW4udGFncy5maWx0ZXIodCA9PiB0ICE9PSB0YWcuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyTW9kYWwucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBFbCA9IGNyZWF0ZVNwYW4oeyBjbHM6ICdtYW5hZ2VyLWl0ZW1fX25hbWUtZ3JvdXAnIH0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZCh0ZW1wRWwpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFnRWwgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKHRhZy5uYW1lLCB0YWcuY29sb3IsIHRoaXMuc2V0dGluZ3MuVEFHX1NUWUxFKTtcclxuICAgICAgICAgICAgICAgIHRlbXBFbC5hcHBlbmRDaGlsZCh0YWdFbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgIT0gJycgJiYgdGhpcy5zZWxlY3RlZCA9PSB0YWcuaWQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRDb2xvclBpY2tlcihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0YWcuY29sb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRhZy5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmlucHV0RWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtLWlucHV0JylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRJY29uKCd0cmFzaC0yJylcclxuICAgICAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1Rlc3RUYWcgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuc29tZShwbHVnaW4gPT4gcGx1Z2luLnRhZ3MgJiYgcGx1Z2luLnRhZ3MuaW5jbHVkZXModGFnLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzVGVzdFRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuVEFHUy5maWx0ZXIodCA9PiB0LmlkICE9PSB0YWcuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOScpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbignc2F2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyTW9kYWwucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBFbCA9IGNyZWF0ZVNwYW4oeyBjbHM6ICdtYW5hZ2VyLWl0ZW1fX25hbWUtZ3JvdXAnIH0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZChncm91cEVsKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0VsID0gdGhpcy5tYW5hZ2VyLmNyZWF0ZVRhZyh0YWcubmFtZSwgdGFnLmNvbG9yLCB0aGlzLnNldHRpbmdzLlRBR19TVFlMRSk7XHJcbiAgICAgICAgICAgICAgICBncm91cEVsLmFwcGVuZENoaWxkKHRhZ0VsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hZGQpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBmb29kQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpLnNldENsYXNzKCdtYW5hZ2VyLWJhcl9fdGl0bGUnKTtcclxuICAgICAgICAgICAgZm9vZEJhci5pbmZvRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGZvb2RCYXIuYWRkQ29sb3JQaWNrZXIoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShjb2xvcilcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHsgY29sb3IgPSB2YWx1ZTsgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBmb29kQmFyLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignSUQnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4geyBpZCA9IHZhbHVlOyB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuaW5wdXRFbC5hZGRDbGFzcygnbWFuYWdlci1lZGl0b3JfX2l0ZW0taW5wdXQnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGZvb2RCYXIuYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDJykpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7IG5hbWUgPSB2YWx1ZTsgfSlcclxuICAgICAgICAgICAgICAgIC5pbnB1dEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9faXRlbS1pbnB1dCcpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgZm9vZEJhci5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldEljb24oJ3BsdXMnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5zSWQgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuVEFHUy5zb21lKHRhZyA9PiB0YWcuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5zSWQgJiYgaWQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvciA9PT0gJycpIGNvbG9yID0gJyMwMDAwMDAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuVEFHUy5wdXNoKHsgaWQsIG5hbWUsIGNvbG9yIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBbXHU1RTk1XHU5MEU4XHU4ODRDXSBcdTY1QjBcdTU4OUVcclxuICAgICAgICAgICAgY29uc3QgZm9vZEJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKS5zZXRDbGFzcygnbWFuYWdlci1iYXJfX3RpdGxlJykuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU2NUIwXHU1ODlFX1x1NjU4N1x1NjcyQycpKTtcclxuICAgICAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KGZvb2RCYXIuY29udHJvbEVsKVxyXG4gICAgICAgICAgICBhZGRCdXR0b24uc2V0SWNvbignY2lyY2xlLXBsdXMnKVxyXG4gICAgICAgICAgICBhZGRCdXR0b24ub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbG9hZFNob3dEYXRhKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbDtcclxuICAgICAgICBzY3JvbGxUb3AgPSBtb2RhbEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIG1vZGFsRWxlbWVudC5lbXB0eSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgICAgICBtb2RhbEVsZW1lbnQuc2Nyb2xsVG8oMCwgc2Nyb2xsVG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbk9wZW4oKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93SGVhZCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsICJpbXBvcnQgeyBBcHAsIEV4dHJhQnV0dG9uQ29tcG9uZW50LCBNb2RhbCwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MvZGF0YSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ21haW4nO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlbGV0ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG4gICAgc2V0dGluZ3M6IE1hbmFnZXJTZXR0aW5ncztcclxuICAgIG1hbmFnZXI6IE1hbmFnZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWxldGVDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgbWFuYWdlcjogTWFuYWdlciwgZGVsZXRlQ2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBzdXBlcihhcHApO1xyXG4gICAgICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5kZWxldGVDYWxsYmFjayA9IGRlbGV0ZUNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2hvd0hlYWQoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgbW9kYWxFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIG1vZGFsRWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19jb250YWluZXInKTtcclxuICAgICAgICBtb2RhbEVsLnJlbW92ZUNoaWxkKG1vZGFsRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UtYnV0dG9uJylbMF0pO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbC5wYXJlbnRFbGVtZW50Py5hZGRDbGFzcygnbWFuYWdlci1jb250YWluZXJfX2hlYWRlcicpO1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmFkZENsYXNzKCdtYW5hZ2VyLWl0ZW0tY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY4MDdcdTk4OThcdTg4NENdXHJcbiAgICAgICAgY29uc3QgdGl0bGVCYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpXHJcbiAgICAgICAgdGl0bGVCYXIuc2V0Q2xhc3MoJ21hbmFnZXItZGVsZXRlX190aXRsZScpXHJcbiAgICAgICAgdGl0bGVCYXIuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTUzNzhcdThGN0RfXHU2ODA3XHU5ODk4JykpO1xyXG5cclxuICAgICAgICAvLyBbXHU2ODA3XHU5ODk4XHU4ODRDXSBcdTUxNzNcdTk1RURcdTYzMDlcdTk0QUVcclxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudCh0aXRsZUJhci5jb250cm9sRWwpXHJcbiAgICAgICAgY2xvc2VCdXR0b24uc2V0SWNvbignY2lyY2xlLXgnKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dEYXRhKCkge1xyXG4gICAgICAgIGNvbnN0IHRpdGxlQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKVxyXG4gICAgICAgIHRpdGxlQmFyLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1Mzc4XHU4RjdEX1x1NjNEMFx1NzkzQScpKTtcclxuICAgICAgICBjb25zdCBhY3Rpb25CYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpXHJcbiAgICAgICAgYWN0aW9uQmFyLnNldENsYXNzKCdtYW5hZ2VyLWRlbGV0ZV9fYWN0aW9uJylcclxuICAgICAgICBhY3Rpb25CYXIuYWRkQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgIC5zZXRXYXJuaW5nKClcclxuICAgICAgICAgICAgLnNldEJ1dHRvblRleHQodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1Mzc4XHU4RjdEX1x1NTM3OFx1OEY3RCcpKVxyXG4gICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb25CYXIuYWRkQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgIC5zZXRCdXR0b25UZXh0KHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODgnKSkgXHJcbiAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uT3BlbigpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dIZWFkKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwgImltcG9ydCB7IEFwcCwgRXh0cmFCdXR0b25Db21wb25lbnQsIE1vZGFsLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5pbXBvcnQgeyBNYW5hZ2VyU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9kYXRhJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnbWFpbic7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzYWJsZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG4gICAgc2V0dGluZ3M6IE1hbmFnZXJTZXR0aW5ncztcclxuICAgIG1hbmFnZXI6IE1hbmFnZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWxldGVDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgbWFuYWdlcjogTWFuYWdlciwgZGVsZXRlQ2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBzdXBlcihhcHApO1xyXG4gICAgICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5kZWxldGVDYWxsYmFjayA9IGRlbGV0ZUNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2hvd0hlYWQoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgbW9kYWxFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIG1vZGFsRWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19jb250YWluZXInKTtcclxuICAgICAgICBtb2RhbEVsLnJlbW92ZUNoaWxkKG1vZGFsRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UtYnV0dG9uJylbMF0pO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbC5wYXJlbnRFbGVtZW50Py5hZGRDbGFzcygnbWFuYWdlci1jb250YWluZXJfX2hlYWRlcicpO1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmFkZENsYXNzKCdtYW5hZ2VyLWl0ZW0tY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY4MDdcdTk4OThcdTg4NENdXHJcbiAgICAgICAgY29uc3QgdGl0bGVCYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpXHJcbiAgICAgICAgdGl0bGVCYXIuc2V0Q2xhc3MoJ21hbmFnZXItZGVsZXRlX190aXRsZScpXHJcbiAgICAgICAgdGl0bGVCYXIuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTRFMDBcdTk1MkVfXHU2ODA3XHU5ODk4JykpO1xyXG5cclxuICAgICAgICAvLyBbXHU2ODA3XHU5ODk4XHU4ODRDXSBcdTUxNzNcdTk1RURcdTYzMDlcdTk0QUVcclxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudCh0aXRsZUJhci5jb250cm9sRWwpXHJcbiAgICAgICAgY2xvc2VCdXR0b24uc2V0SWNvbignY2lyY2xlLXgnKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dEYXRhKCkge1xyXG4gICAgICAgIGNvbnN0IHRpdGxlQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKVxyXG4gICAgICAgIHRpdGxlQmFyLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU0RTAwXHU5NTJFX1x1NjNEMFx1NzkzQScpKTtcclxuICAgICAgICBjb25zdCBhY3Rpb25CYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpXHJcbiAgICAgICAgYWN0aW9uQmFyLnNldENsYXNzKCdtYW5hZ2VyLWRlbGV0ZV9fYWN0aW9uJylcclxuICAgICAgICBhY3Rpb25CYXIuYWRkQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgIC5zZXRDdGEoKVxyXG4gICAgICAgICAgICAuc2V0QnV0dG9uVGV4dCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTRFMDBcdTk1MkVfXHU1NDJGXHU3OTgxJykpXHJcbiAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGFjdGlvbkJhci5hZGRCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgLnNldEJ1dHRvblRleHQodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU0RTAwXHU5NTJFX1x1NTNENlx1NkQ4OCcpKSBcclxuICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25PcGVuKCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0hlYWQoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25DbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCAiaW1wb3J0IHtcclxuXHRBcHAsXHJcblx0RXh0cmFCdXR0b25Db21wb25lbnQsXHJcblx0TW9kYWwsXHJcblx0U2V0dGluZyxcclxuXHRUZXh0QXJlYUNvbXBvbmVudCxcclxufSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzL2RhdGFcIjtcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSBcIm1haW5cIjtcclxuaW1wb3J0IHsgTWFuYWdlclBsdWdpbiB9IGZyb20gXCJzcmMvZGF0YS90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuXHRzZXR0aW5nczogTWFuYWdlclNldHRpbmdzO1xyXG5cdG1hbmFnZXI6IE1hbmFnZXI7XHJcblx0bWFuYWdlclBsdWdpbjogTWFuYWdlclBsdWdpbjtcclxuXHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIG1hbmFnZXI6IE1hbmFnZXIsIG1hbmFnZXJQbHVnaW46IE1hbmFnZXJQbHVnaW4pIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gbWFuYWdlci5zZXR0aW5ncztcclxuXHRcdHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcblx0XHR0aGlzLm1hbmFnZXJQbHVnaW4gPSBtYW5hZ2VyUGx1Z2luO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhc3luYyBzaG93SGVhZCgpIHtcclxuXHRcdC8vQHRzLWlnbm9yZVxyXG5cdFx0Y29uc3QgbW9kYWxFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG5cdFx0bW9kYWxFbC5hZGRDbGFzcyhcIm1hbmFnZXItbm90ZV9fY29udGFpbmVyXCIpO1xyXG5cdFx0bW9kYWxFbC5yZW1vdmVDaGlsZChcclxuXHRcdFx0bW9kYWxFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWwtY2xvc2UtYnV0dG9uXCIpWzBdXHJcblx0XHQpO1xyXG5cdFx0dGhpcy50aXRsZUVsLnBhcmVudEVsZW1lbnQ/LmFkZENsYXNzKFwibWFuYWdlci1jb250YWluZXJfX2hlYWRlclwiKTtcclxuXHRcdHRoaXMuY29udGVudEVsLmFkZENsYXNzKFwibWFuYWdlci1pdGVtLWNvbnRhaW5lclwiKTtcclxuXHRcdC8vIFtcdTY4MDdcdTk4OThcdTg4NENdXHJcblx0XHRjb25zdCB0aXRsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbClcclxuXHRcdFx0LnNldENsYXNzKFwibWFuYWdlci1iYXJfX3RpdGxlXCIpXHJcblx0XHRcdC5zZXROYW1lKGAke3RoaXMubWFuYWdlclBsdWdpbi5uYW1lfVx1NzY4NFx1N0IxNFx1OEJCMGApO1xyXG5cdFx0Ly8gW1x1NjgwN1x1OTg5OFx1ODg0Q10gXHU1MTczXHU5NUVEXHU2MzA5XHU5NEFFXHJcblx0XHRjb25zdCBjbG9zZUJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudCh0aXRsZUJhci5jb250cm9sRWwpO1xyXG5cdFx0Y2xvc2VCdXR0b24uc2V0SWNvbihcImNpcmNsZS14XCIpO1xyXG5cdFx0Y2xvc2VCdXR0b24ub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhc3luYyBzaG93RGF0YSgpIHtcclxuXHRcdGNvbnN0IHRleHRBcmVhID0gbmV3IFRleHRBcmVhQ29tcG9uZW50KHRoaXMuY29udGVudEVsKTtcclxuXHRcdHRleHRBcmVhLnNldFZhbHVlKHRoaXMubWFuYWdlclBsdWdpbi5ub3RlKTtcclxuXHRcdHRleHRBcmVhLm9uQ2hhbmdlKChuZXdWYWx1ZSkgPT4ge1xyXG5cdFx0XHR0aGlzLm1hbmFnZXJQbHVnaW4ubm90ZSA9IG5ld1ZhbHVlO1xyXG5cdFx0XHR0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYXN5bmMgcmVsb2FkU2hvd0RhdGEoKSB7XHJcblx0XHRsZXQgc2Nyb2xsVG9wID0gMDtcclxuXHRcdGNvbnN0IG1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbDtcclxuXHRcdHNjcm9sbFRvcCA9IG1vZGFsRWxlbWVudC5zY3JvbGxUb3A7XHJcblx0XHRtb2RhbEVsZW1lbnQuZW1wdHkoKTtcclxuXHRcdGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuXHRcdG1vZGFsRWxlbWVudC5zY3JvbGxUbygwLCBzY3JvbGxUb3ApO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgb25PcGVuKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zaG93SGVhZCgpO1xyXG5cdFx0YXdhaXQgdGhpcy5zaG93RGF0YSgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgb25DbG9zZSgpIHtcclxuXHRcdHRoaXMuY29udGVudEVsLmVtcHR5KCk7XHJcblx0fVxyXG59XHJcbiIsICJpbXBvcnQgeyBBcHAsIFBsdWdpbk1hbmlmZXN0IH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL21haW5cIjtcclxuaW1wb3J0IHsgTWFuYWdlck1vZGFsIH0gZnJvbSBcIi4vbW9kYWwvbWFuYWdlci1tb2RhbFwiO1xyXG5cclxuY29uc3QgQ29tbWFuZHMgPSAoYXBwOiBBcHAsIG1hbmFnZXI6IE1hbmFnZXIpID0+IHtcclxuICAgIG1hbmFnZXIuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgaWQ6ICdtYW5hZ2VyLXZpZXcnLFxyXG4gICAgICAgIG5hbWU6IG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTU0N0RcdTRFRTRfXHU3QkExXHU3NDA2XHU5NzYyXHU2NzdGX1x1NjNDRlx1OEZGMCcpLFxyXG4gICAgICAgIGhvdGtleXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbJ0N0cmwnXSxcclxuICAgICAgICAgICAgICAgIGtleTogJ00nLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBjYWxsYmFjazogKCkgPT4geyBuZXcgTWFuYWdlck1vZGFsKGFwcCwgbWFuYWdlcikub3BlbigpIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChtYW5hZ2VyLnNldHRpbmdzLkRFTEFZKSB7XHJcbiAgICAgICAgLy8gXHU1MzU1XHU4ODRDXHU1NDdEXHU0RUU0XHJcbiAgICAgICAgaWYgKG1hbmFnZXIuc2V0dGluZ3MuQ09NTUFORF9JVEVNKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk1hbmlmZXN0W10gPSBPYmplY3QudmFsdWVzKG1hbmFnZXIuYXBwUGx1Z2lucy5tYW5pZmVzdHMpLmZpbHRlcigocG06IFBsdWdpbk1hbmlmZXN0KSA9PiBwbS5pZCAhPT0gbWFuYWdlci5tYW5pZmVzdC5pZCkgYXMgUGx1Z2luTWFuaWZlc3RbXTtcclxuICAgICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKHBsdWdpbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtcCA9IG1hbmFnZXIuc2V0dGluZ3MuUGx1Z2lucy5maW5kKG1wID0+IG1wLmlkID09PSBwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlci5hZGRDb21tYW5kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGBtYW5hZ2VyLSR7bXAuaWR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7bXAuZW5hYmxlZCA/IG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1MTczXHU5NUVEX1x1NjU4N1x1NjcyQycpIDogbWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTVGMDBcdTU0MkZfXHU2NTg3XHU2NzJDJyl9ICR7bXAubmFtZX0gYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtcC5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXAuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbWFuYWdlci5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW4ocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyhhcHAsIG1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtcC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IG1hbmFnZXIuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW4ocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyhhcHAsIG1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBcdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRcclxuICAgICAgICBpZiAobWFuYWdlci5zZXR0aW5ncy5DT01NQU5EX0dST1VQKSB7XHJcbiAgICAgICAgICAgIG1hbmFnZXIuc2V0dGluZ3MuR1JPVVBTLmZvckVhY2goKGdyb3VwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBgbWFuYWdlci0ke2dyb3VwLmlkfS1lbmFibGVkYCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHttYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1NDdEXHU0RUU0XHU4ODRDX1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkMnKX0gJHtncm91cC5uYW1lfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRQbHVnaW5zID0gbWFuYWdlci5zZXR0aW5ncy5QbHVnaW5zLmZpbHRlcihwbHVnaW4gPT4gcGx1Z2luLmdyb3VwID09PSBncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkUGx1Z2lucy5mb3JFYWNoKGFzeW5jIHBsdWdpbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGx1Z2luICYmICFwbHVnaW4uZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IG1hbmFnZXIuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW4ocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4uZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKGFwcCwgbWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBgbWFuYWdlci0ke2dyb3VwLmlkfS1kaXNhYmxlYCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHttYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1NDdEXHU0RUU0XHU4ODRDX1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkMnKX0gJHtncm91cC5uYW1lfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRQbHVnaW5zID0gbWFuYWdlci5zZXR0aW5ncy5QbHVnaW5zLmZpbHRlcihwbHVnaW4gPT4gcGx1Z2luLmdyb3VwID09PSBncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkUGx1Z2lucy5mb3JFYWNoKGFzeW5jIHBsdWdpbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGx1Z2luICYmIHBsdWdpbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbWFuYWdlci5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW4ocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW4uZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyhhcHAsIG1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFx1NTM1NVx1ODg0Q1x1NTQ3RFx1NEVFNFxyXG4gICAgICAgIGlmIChtYW5hZ2VyLnNldHRpbmdzLkNPTU1BTkRfSVRFTSkge1xyXG4gICAgICAgICAgICBjb25zdCBwbHVnaW5zOiBQbHVnaW5NYW5pZmVzdFtdID0gT2JqZWN0LnZhbHVlcyhtYW5hZ2VyLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5maWx0ZXIoKHBtOiBQbHVnaW5NYW5pZmVzdCkgPT4gcG0uaWQgIT09IG1hbmFnZXIubWFuaWZlc3QuaWQpIGFzIFBsdWdpbk1hbmlmZXN0W107XHJcbiAgICAgICAgICAgIHBsdWdpbnMuZm9yRWFjaChwbHVnaW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5hYmxlZCA9IG1hbmFnZXIuYXBwUGx1Z2lucy5lbmFibGVkUGx1Z2lucy5oYXMocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgIG1hbmFnZXIuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGBtYW5hZ2VyLSR7cGx1Z2luLmlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7ZW5hYmxlZCA/IG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTU0N0RcdTRFRTRcdTg4NENfXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQycpIDogbWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTQ3RFx1NEVFNFx1ODg0Q19cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDJyl9ICR7cGx1Z2luLm5hbWV9IGAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IG1hbmFnZXIuYXBwUGx1Z2lucy5kaXNhYmxlUGx1Z2luQW5kU2F2ZShwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHMoYXBwLCBtYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IG1hbmFnZXIuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyhhcHAsIG1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0XHJcbiAgICAgICAgaWYgKG1hbmFnZXIuc2V0dGluZ3MuQ09NTUFORF9HUk9VUCkge1xyXG4gICAgICAgICAgICBtYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5mb3JFYWNoKChncm91cCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWFuYWdlci5hZGRDb21tYW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogYG1hbmFnZXItJHtncm91cC5pZH0tZW5hYmxlZGAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7bWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDJyl9ICR7Z3JvdXAubmFtZX0gJHttYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1NDdEXHU0RUU0XHU4ODRDX1x1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkMnKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkUGx1Z2lucyA9IG1hbmFnZXIuc2V0dGluZ3MuUGx1Z2lucy5maWx0ZXIocGx1Z2luID0+IHBsdWdpbi5ncm91cCA9PT0gZ3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFBsdWdpbnMuZm9yRWFjaChhc3luYyBwbHVnaW4gPT4geyBhd2FpdCBtYW5hZ2VyLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luQW5kU2F2ZShwbHVnaW4uaWQpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHMoYXBwLCBtYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1hbmFnZXIuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGBtYW5hZ2VyLSR7Z3JvdXAuaWR9LWRpc2FibGVgLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke21hbmFnZXIudHJhbnNsYXRvci50KCdcdTU0N0RcdTRFRTRcdTg4NENfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQycpfSAke2dyb3VwLm5hbWV9ICR7bWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTQ3RFx1NEVFNFx1ODg0Q19cdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDJyl9YCxcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZFBsdWdpbnMgPSBtYW5hZ2VyLnNldHRpbmdzLlBsdWdpbnMuZmlsdGVyKHBsdWdpbiA9PiBwbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRQbHVnaW5zLmZvckVhY2goYXN5bmMgcGx1Z2luID0+IHsgYXdhaXQgbWFuYWdlci5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyhhcHAsIG1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbW1hbmRzIiwgImltcG9ydCBCYXNlU2V0dGluZyBmcm9tIFwiLi4vYmFzZS1zZXR0aW5nXCI7XHJcbmltcG9ydCB7IE5vdGljZSwgU2V0dGluZyB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFuYWdlckRlbGF5IGV4dGVuZHMgQmFzZVNldHRpbmcge1xyXG4gICAgbWFpbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaWQgPSAnJztcclxuICAgICAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgICAgIGxldCB0aW1lID0gMDtcclxuICAgICAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0SGVhZGluZygpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDJykpXHJcbiAgICAgICAgICAgIC5hZGRTbGlkZXIoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRMaW1pdHMoMCwgMTAwLCAxKVxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRpbWUpXHJcbiAgICAgICAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignSUQnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkMnKSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldEljb24oJ3BsdXMnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5zSWQgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuREVMQVlTLnNvbWUoZGVsYXkgPT4gZGVsYXkuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5zSWQgJiYgaWQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zZXR0aW5ncy5ERUxBWVMucHVzaCh7IGlkLCBuYW1lLCB0aW1lIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5kZWxheURpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDAnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEMnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKSBcclxuICAgICAgICB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuREVMQVlTLmZvckVhY2goKGRlbGF5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgaXRlbS5zZXR0aW5nRWwuYWRkQ2xhc3MoJ21hbmFnZXItc2V0dGluZy1ncm91cF9faXRlbScpXHJcbiAgICAgICAgICAgIGl0ZW0uc2V0TmFtZShgWyR7ZGVsYXkuaWR9XWApXHJcbiAgICAgICAgICAgIGl0ZW0uYWRkU2xpZGVyKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0TGltaXRzKDAsIDEwMCwgMSlcclxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShkZWxheS50aW1lKVxyXG4gICAgICAgICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxheS50aW1lID0gdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGl0ZW0uYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKGRlbGF5Lm5hbWUpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXkubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgaXRlbS5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldEljb24oJ3RyYXNoLTInKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1Rlc3RHcm91cCA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5zb21lKHBsdWdpbiA9PiBwbHVnaW4uZGVsYXkgPT09IGRlbGF5LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Rlc3RHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuREVMQVlTID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkRFTEFZUy5maWx0ZXIodCA9PiB0LmlkICE9PSBkZWxheS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nVGFiLmRlbGF5RGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOScpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQicpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IEJhc2VTZXR0aW5nIGZyb20gXCIuLi9iYXNlLXNldHRpbmdcIjtcclxuaW1wb3J0IHsgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyVGFnIGV4dGVuZHMgQmFzZVNldHRpbmcge1xyXG4gICAgbWFpbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaWQgPSAnJztcclxuICAgICAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgICAgIGxldCBjb2xvciA9ICcnO1xyXG4gICAgICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXRIZWFkaW5nKClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkMnKSlcclxuICAgICAgICAgICAgLmFkZENvbG9yUGlja2VyKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUoY29sb3IpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignSUQnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDJykpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRJY29uKCdwbHVzJylcclxuICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250YWluc0lkID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1Muc29tZSh0YWcgPT4gdGFnLmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluc0lkICYmIGlkICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09ICcnKSBjb2xvciA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MucHVzaCh7IGlkLCBuYW1lLCBjb2xvciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdUYWIudGFnRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMCcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QycpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MuZm9yRWFjaCgodGFnLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgaXRlbS5zZXRDbGFzcygnbWFuYWdlci1zZXR0aW5nLXRhZ19faXRlbScpXHJcbiAgICAgICAgICAgIC8vIGl0ZW0uc2V0TmFtZShgJHtpbmRleCArIDF9LiBgKVxyXG4gICAgICAgICAgICBpdGVtLmFkZENvbG9yUGlja2VyKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGFnLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZy5jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdUYWIudGFnRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBpdGVtLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0YWcubmFtZSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0YWcubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pLmlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdUYWIudGFnRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBpdGVtLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0SWNvbigndHJhc2gtMicpXHJcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzVGVzdFRhZyA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5zb21lKHBsdWdpbiA9PiBwbHVnaW4udGFncyAmJiBwbHVnaW4udGFncy5pbmNsdWRlcyh0YWcuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Rlc3RUYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuVEFHUy5maWx0ZXIodCA9PiB0LmlkICE9PSB0YWcuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi50YWdEaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgY29uc3QgdGFnRWwgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKHRhZy5uYW1lLCB0YWcuY29sb3IsIHRoaXMuc2V0dGluZ3MuVEFHX1NUWUxFKTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lRWwuYXBwZW5kQ2hpbGQodGFnRWwpO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWVFbC5hcHBlbmRUZXh0KGAgWyR7dGFnLmlkfV1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IEJhc2VTZXR0aW5nIGZyb20gXCIuLi9iYXNlLXNldHRpbmdcIjtcclxuaW1wb3J0IHsgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCBDb21tYW5kcyBmcm9tIFwic3JjL2NvbW1hbmRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmFnZXJHcm91cCBleHRlbmRzIEJhc2VTZXR0aW5nIHtcclxuICAgIG1haW4oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGlkID0gJyc7XHJcbiAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuICAgICAgICBsZXQgY29sb3IgPSAnJztcclxuICAgICAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0SGVhZGluZygpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDJykpXHJcbiAgICAgICAgICAgIC5hZGRDb2xvclBpY2tlcihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKGNvbG9yKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ0lEJylcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcih0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1NDBEXHU3OUYwX1x1NjU4N1x1NjcyQycpKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0SWNvbigncGx1cycpXHJcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbnNJZCA9IHRoaXMubWFuYWdlci5zZXR0aW5ncy5HUk9VUFMuc29tZSh0YWcgPT4gdGFnLmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluc0lkICYmIGlkICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09ICcnKSBjb2xvciA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5wdXNoKHsgaWQsIG5hbWUsIGNvbG9yIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5ncm91cERpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5mb3JFYWNoKChncm91cCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIGl0ZW0uc2V0dGluZ0VsLmFkZENsYXNzKCdtYW5hZ2VyLXNldHRpbmctZ3JvdXBfX2l0ZW0nKVxyXG4gICAgICAgICAgICAvLyBpdGVtLnNldE5hbWUoYCR7aW5kZXggKyAxfS4gYClcclxuICAgICAgICAgICAgaXRlbS5hZGRDb2xvclBpY2tlcihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKGdyb3VwLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLmNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5ncm91cERpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgaXRlbS5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZ3JvdXAubmFtZSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cC5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfSkuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5ncm91cERpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgaXRlbS5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldEljb24oJ3RyYXNoLTInKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1Rlc3RHcm91cCA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5zb21lKHBsdWdpbiA9PiBwbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Rlc3RHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuR1JPVVBTID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5maWx0ZXIodCA9PiB0LmlkICE9PSBncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nVGFiLmdyb3VwRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDknKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBjb25zdCB0YWdFbCA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoZ3JvdXAubmFtZSwgZ3JvdXAuY29sb3IsIHRoaXMuc2V0dGluZ3MuR1JPVVBfU1RZTEUpO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWVFbC5hcHBlbmRDaGlsZCh0YWdFbCk7XHJcbiAgICAgICAgICAgIGl0ZW0ubmFtZUVsLmFwcGVuZFRleHQoYCBbJHtncm91cC5pZH1dYCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdcdTYzRDJcdTRFRjZcdTdCQTFcdTc0MDZcdTU2NjgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkM6ICdcdTYyMTBcdTUyOUYnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTkzMVx1OEQyNV9cdTY1ODdcdTY3MkM6ICdcdTU5MzFcdThEMjUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkM6ICdcdTY1QjBcdTU4OUUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjRDRFx1NEY1Q19cdTY1ODdcdTY3MkM6ICdcdTY0Q0RcdTRGNUMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkM6ICdcdTY0MUNcdTdEMjInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkM6ICdcdTU0MERcdTc5RjAnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdcdTUxNjhcdTkwRTgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdcdTUxNjhcdTkwRTgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdcdTY1RTAnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjAzQlx1OEJBMV9cdTY1ODdcdTY3MkM6ICdcdTYwM0JcdThCQTEnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdTU0MkZcdTc1MjgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdTc5ODFcdTc1MjgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTE3M1x1OTVFRF9cdTY1ODdcdTY3MkM6ICdcdTUxNzNcdTk1RUQnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NUYwMFx1NTQyRl9cdTY1ODdcdTY3MkM6ICdcdTVGMDBcdTU0MkYnLFxyXG5cclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU1NDJGXHU3NTI4JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU3OTgxXHU3NTI4JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnXHU1MjA2XHU3RUM0JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4JyxcclxuXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMDogJ1x1OEJCRlx1OTVFRVx1NEY1Q1x1ODAwNVx1NzY4NEdpdEh1Ylx1OTg3NVx1OTc2Mlx1RkYwQ1x1NjdFNVx1NzcwQlx1OTg3OVx1NzZFRVx1OEJFNlx1NjBDNVx1MzAwMVx1NjZGNFx1NjVCMFx1NjVFNVx1NUZEN1x1MzAwMVx1NTNDMlx1NEUwRVx1OEJBOFx1OEJCQVx1NTQ4Q1x1OEQyMVx1NzMyRVx1NEVFM1x1NzgwMVx1MzAwMicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4OUM2XHU5ODkxXHU2NTU5XHU3QTBCX1x1NjNDRlx1OEZGMDogJ1x1OEJCRlx1OTVFRVx1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1NTQyRlx1NzUyOFx1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRlx1RkYwQ1x1NkRGMVx1NUVBNlx1ODFFQVx1NUI5QVx1NEU0OVx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU5MUNEXHU4RjdEXHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNlx1RkYwQ1x1NTM3M1x1NjVGNlx1NzUxRlx1NjU0OCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwX1x1NjNDRlx1OEZGMDogJ1x1NjhDMFx1NjdFNVx1NjNEMlx1NEVGNlx1NjZGNFx1NjVCMCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOFx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOFx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1N0JBMVx1NzQwNlx1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEVDNVx1NjYzRVx1NzkzQVx1NURGMlx1NTQyRlx1NzUyOFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2NzJBXHU1MjA2XHU3RUM0X1x1NjNDRlx1OEZGMDogJ1x1N0I1Qlx1OTAwOVx1NjI0MFx1NjcwOVx1NjcyQVx1NTIwNlx1N0VDNFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RVx1NzU0Q1x1OTc2MicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMDogJ1x1OEZEOFx1NTM5Rlx1NTIxRFx1NTlDQlx1NzJCNlx1NjAwMScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1X1x1NjNDRlx1OEZGMDogJ1x1NjI1M1x1NUYwMFx1NjNEMlx1NEVGNlx1NzZFRVx1NUY1NScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1NUY3Qlx1NUU5NVx1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ1x1NTIwN1x1NjM2Mlx1NjNEMlx1NEVGNlx1NzJCNlx1NjAwMScsXHJcblxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5ODogJ1x1NTM3OFx1OEY3RFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnXHU0RjYwXHU3ODZFXHU1QjlBXHU4OTgxXHU1Mzc4XHU4RjdEXHU2QjY0XHU2M0QyXHU0RUY2XHU1NDE3XHVGRjFGXHU4RkQ5XHU1QzA2XHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2XHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHUzMDAyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzNzhcdThGN0Q6ICdcdTUzNzhcdThGN0QnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ1x1NTNENlx1NkQ4OCcsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1x1NTM3OFx1OEY3RFx1NjIxMFx1NTI5RicsXHJcblxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NjgwN1x1OTg5ODogJ1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTYzRDJcdTRFRjYnLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NjNEMFx1NzkzQTogJ1x1NEY2MFx1Nzg2RVx1NUI5QVx1ODk4MVx1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTZCNjRcdTk4NzVcdTk3NjJcdTYzRDJcdTRFRjZcdTU0MTdcdUZGMUZcdThGRDlcdTVDMDZcdTY1RTBcdTZDRDVcdTYwNjJcdTU5MERcdTMwMDIoXHU1NDJGXHU3NTI4L1x1Nzk4MVx1NzUyOFx1OEZDN1x1N0EwQlx1NEUyRFx1OEJGN1x1ODAxMFx1NUZDM1x1N0I0OVx1NUY4NSknLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NTQyRlx1Nzk4MTogJ1x1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjgnLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NTNENlx1NkQ4ODogJ1x1NTNENlx1NkQ4OCcsXHJcbiAgICBcdTRFMDBcdTk1MkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1x1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTYyMTBcdTUyOUYnLFxyXG5cclxuICAgIFx1ODNEQ1x1NTM1NV9cdTdCMTRcdThCQjBfXHU2ODA3XHU5ODk4OidcdTdCMTRcdThCQjAnLFxyXG4gICAgXHU4M0RDXHU1MzU1X1x1NUZFQlx1NjM3N1x1OTUyRV9cdTY4MDdcdTk4OTg6J1x1NUZFQlx1NjM3N1x1OTUyRScsXHJcbiAgICBcdTgzRENcdTUzNTVfR2l0SHViX1x1NjgwN1x1OTg5ODonR2l0SHViJyxcclxuXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdcdTU3RkFcdTc4NDAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdcdTUyMDZcdTdFQzQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdcdTY4MDdcdTdCN0UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdcdTVFRjZcdThGREYnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5ODogJ1x1OEJFRFx1OEEwMFx1OEJCRVx1N0Y2RScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTYzQ0ZcdThGRjA6ICdcdTkwMDlcdTYyRTlcdTYwQThcdTU1OUNcdTZCMjJcdTc2ODRcdThCRURcdThBMDBcdTMwMDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc1NENcdTk3NjJcdTVDNDVcdTRFMkRfXHU2ODA3XHU5ODk4OiAnXHU3NTRDXHU5NzYyXHU1QzQ1XHU0RTJEJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NTRDXHU5NzYyXHU1QzQ1XHU0RTJEX1x1NjNDRlx1OEZGMDogJ1x1OEJCRVx1N0Y2RVx1N0JBMVx1NzQwNlx1NTY2OFx1NzU0Q1x1OTc2Mlx1NjYyRlx1NTQyNlx1NUM0NVx1NEUyRCcsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1OTAwOVx1NjJFOVx1NTIwNlx1N0VDNFx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwQ1x1NEVFNVx1NjNEMFx1NTM0N1x1NkQ0Rlx1ODlDOFx1NEY1M1x1OUE4Q1x1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTAwOiAnXHU1OUNCXHU3RUM4XHU1QzU1XHU1RjAwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFOEM6ICdcdTZDMzhcdTRFMERcdTVDNTVcdTVGMDAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwOTogJ1x1NjBBQ1x1NkQ2RVx1NUM1NVx1NUYwMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCOiAnXHU1MzU1XHU1MUZCXHU1QzU1XHU1RjAwJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdcdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHU5MDA5XHU2MkU5XHU1MjA2XHU3RUM0XHU3Njg0XHU2ODM3XHU1RjBGXHVGRjBDXHU0RjdGXHU1MjA2XHU3RUM0XHU2NkY0XHU1MkEwXHU2NjBFXHU2NjNFXHVGRjBDXHU0RkJGXHU0RThFXHU4QkM2XHU1MjJCXHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDA6ICdcdTY4MzdcdTVGMEZcdTRFMDAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QzogJ1x1NjgzN1x1NUYwRlx1NEU4QycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5OiAnXHU2ODM3XHU1RjBGXHU0RTA5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTU2REI6ICdcdTY4MzdcdTVGMEZcdTU2REInLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTkwMDlcdTYyRTlcdTY4MDdcdTdCN0VcdTc2ODRcdTY4MzdcdTVGMEZcdUZGMENcdTRGN0ZcdTY4MDdcdTdCN0VcdTY2RjRcdTUyQTBcdTY2MEVcdTY2M0VcdUZGMENcdTRGQkZcdTRFOEVcdThCQzZcdTUyMkJcdTMwMDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMDogJ1x1NjgzN1x1NUYwRlx1NEUwMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RThDOiAnXHU2ODM3XHU1RjBGXHU0RThDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDk6ICdcdTY4MzdcdTVGMEZcdTRFMDknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQjogJ1x1NjgzN1x1NUYwRlx1NTZEQicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2ODA3XHU5ODk4OiAnXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjNDRlx1OEZGMDogJ1x1NTQyRlx1NzUyOFx1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOFx1NTI5Rlx1ODBGRFx1NTNFRlx1NEVFNVx1NEYxOFx1NTMxNlx1NTJBMFx1OEY3RFx1OTg3QVx1NUU4Rlx1RkYwQ1x1NEY0Nlx1OEJGN1x1NkNFOFx1NjEwRlx1RkYwQ1x1OEZEOVx1NTNFRlx1ODBGRFx1NEYxQVx1NUJGQ1x1ODFGNFx1NjdEMFx1NEU5Qlx1NjNEMlx1NEVGNlx1NTFGQVx1NzNCMFx1NTE3Q1x1NUJCOVx1NjAyN1x1OTVFRVx1OTg5OFx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTg6ICdcdTZERTFcdTUzMTZcdTYzRDJcdTRFRjYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHU0RTNBXHU2NzJBXHU1NDJGXHU3NTI4XHU3Njg0XHU2M0QyXHU0RUY2XHU2M0QwXHU0RjlCXHU4OUM2XHU4OUM5XHU2REUxXHU1MzE2XHU2NTQ4XHU2NzlDXHVGRjBDXHU0RUU1XHU0RkJGXHU2RTA1XHU2NjcwXHU1NzMwXHU1MzNBXHU1MjA2XHU1NDJGXHU3NTI4XHU1NDhDXHU2NzJBXHU1NDJGXHU3NTI4XHU3Njg0XHU2M0QyXHU0RUY2XHUzMDAyJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1N0I1Qlx1OTAwOVx1NjMwMVx1NEU0NVx1NTMxNl9cdTY4MDdcdTk4OTg6ICdcdTdCNUJcdTkwMDlcdTYzMDFcdTRFNDVcdTUzMTYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTdCNUJcdTkwMDlcdTYzMDFcdTRFNDVcdTUzMTZfXHU2M0NGXHU4RkYwOiAnXHU1NDJGXHU3NTI4XHU1NDBFXHVGRjBDXHU2MEE4XHU1QzA2XHU1NzI4XHU2QkNGXHU2QjIxXHU2MjUzXHU1RjAwXHU3QkExXHU3NDA2XHU1NjY4XHU2NUY2XHU3NzBCXHU1MjMwXHU3NkY4XHU1NDBDXHU3Njg0XHU2M0QyXHU0RUY2XHU1MjE3XHU4ODY4XHUzMDAyJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdcdTUzNTVcdTcyRUNcdTYzQTdcdTUyMzZcdTYzRDJcdTRFRjZcdTU0N0RcdTRFRTQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnXHU1NDJGXHU3NTI4XHU2QjY0XHU5MDA5XHU5ODc5XHU1M0VGXHU0RUU1XHU1MzU1XHU3MkVDXHU2M0E3XHU1MjM2XHU2QkNGXHU0RTJBXHU2M0QyXHU0RUY2XHU3Njg0XHU1NDJGXHU3NTI4XHU1NDhDXHU3OTgxXHU3NTI4XHU3MkI2XHU2MDAxXHUzMDAyKFx1OTFDRFx1NTQyRk9ic2lkaWFuXHU3NTFGXHU2NTQ4KScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdcdTUyMDZcdTdFQzRcdTYzQTdcdTUyMzZcdTYzRDJcdTRFRjZcdTU0N0RcdTRFRTQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnXHU1NDJGXHU3NTI4XHU2QjY0XHU5MDA5XHU5ODc5XHU1M0VGXHU0RUU1XHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4XHU2MjE2XHU3OTgxXHU3NTI4XHU2MzA3XHU1QjlBXHU1MjA2XHU3RUM0XHU0RTJEXHU3Njg0XHU2MjQwXHU2NzA5XHU2M0QyXHU0RUY2XHUzMDAyKFx1OTFDRFx1NTQyRk9ic2lkaWFuXHU3NTFGXHU2NTQ4KScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1x1NUVGNlx1OEZERl0gXHU1REYyXHU2REZCXHU1MkEwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tcdTVFRjZcdThGREZdIElEXHU1REYyXHU1QjU4XHU1NzI4XHU2MjE2XHU0RTNBXHU3QTdBJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdTVFRjZcdThGREZdIFx1NTIyMFx1OTY2NFx1NjIxMFx1NTI5RicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHU1RUY2XHU4RkRGXSBcdTUyMjBcdTk2NjRcdTU5MzFcdThEMjVcdUZGMENcdTZCNjRcdTVFRjZcdThGREZcdTRFMEJcdTVCNThcdTU3MjhcdTYzRDJcdTRFRjYnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdTUyMDZcdTdFQzRdIFx1NURGMlx1NkRGQlx1NTJBMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHU1MjA2XHU3RUM0XSBJRFx1NURGMlx1NUI1OFx1NTcyOFx1NjIxNlx1NEUzQVx1N0E3QScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbXHU1MjA2XHU3RUM0XSBcdTUyMjBcdTk2NjRcdTYyMTBcdTUyOUYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1NTIwNlx1N0VDNF0gXHU1MjIwXHU5NjY0XHU1OTMxXHU4RDI1XHVGRjBDXHU2QjY0XHU1MjA2XHU3RUM0XHU0RTBCXHU1QjU4XHU1NzI4XHU2M0QyXHU0RUY2JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHU2ODA3XHU3QjdFXSBcdTVERjJcdTZERkJcdTUyQTAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1NjgwN1x1N0I3RV0gSURcdTVERjJcdTVCNThcdTU3MjhcdTYyMTZcdTRFM0FcdTdBN0EnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1NjgwN1x1N0I3RV0gXHU1MjIwXHU5NjY0XHU2MjEwXHU1MjlGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tcdTY4MDdcdTdCN0VdIFx1NTIyMFx1OTY2NFx1NTkzMVx1OEQyNVx1RkYwQ1x1NkI2NFx1NjgwN1x1N0I3RVx1NEUwQlx1NUI1OFx1NTcyOFx1NjNEMlx1NEVGNicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2ODA3XHU5ODk4OiAnXHU1OTgyXHU2NzlDXHU5MDQ3XHU1MjMwXHU2NzJDXHU2M0QyXHU0RUY2XHU0RTBFXHU1MTc2XHU0RUQ2XHU2M0QyXHU0RUY2XHU1MUIyXHU3QTgxJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjNDRlx1OEZGMDogJ1x1NEUyQVx1NEVCQVx1ODBGRFx1NTI5Qlx1NjcwOVx1OTY1MFx1RkYwQ1x1NjVFMFx1NkNENVx1NEZFRVx1NTkwRFx1NkI2NFx1OTVFRVx1OTg5OFx1RkYwQ1x1OEJGN1x1NTE3M1x1OTVFRFx1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOFx1RkYwQ1x1NTM3M1x1NTNFRlx1ODlFM1x1NTFCM1x1NEUwMFx1NTIwN1x1NTFCMlx1N0E4MVx1OTVFRVx1OTg5OFx1MzAwMicsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjA6ICdcdTVGMDBcdTU0MkZcdTYzRDJcdTRFRjZcdTdCQTFcdTc0MDZcdTU2NjgnLFxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFx1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDOiAnUGx1Z2luIE1hbmFnZXInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkM6ICdTdWNjZXNzJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDOiAnRmFpbHVyZScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUIwXHU1ODlFX1x1NjU4N1x1NjcyQzogJ0FkZCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NENEXHU0RjVDX1x1NjU4N1x1NjcyQzogJ09wZXJhdGlvbicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NDFDXHU3RDIyX1x1NjU4N1x1NjcyQzogJ1NlYXJjaCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDBEXHU3OUYwX1x1NjU4N1x1NjcyQzogJ05hbWUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdBTEwnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdBTEwnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdObyBEZWxheScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MDNCXHU4QkExX1x1NjU4N1x1NjcyQzogJ1RvdGFsJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnRW5hYmxlJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnRGlzYWJsZScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1MTczXHU5NUVEX1x1NjU4N1x1NjcyQzogJ0Rpc2FibGUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NUYwMFx1NTQyRl9cdTY1ODdcdTY3MkM6ICdFbmFibGUnLFxyXG5cclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnRW5hYmxlJyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnRGlzYWJsZScsXHJcbiAgICBcdTU0N0RcdTRFRTRcdTg4NENfXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQzogJ0dyb3VwJyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnT25lIC0gY2xpY2sgRW5hYmxlJyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnT25lIC0gY2xpY2sgRGlzYWJsZScsXHJcblxyXG4gICAgXHU4M0RDXHU1MzU1X1x1N0IxNFx1OEJCMF9cdTY4MDdcdTk4OTg6J05vdGUnLFxyXG4gICAgXHU4M0RDXHU1MzU1X1x1NUZFQlx1NjM3N1x1OTUyRV9cdTY4MDdcdTk4OTg6J0hvdGtleXMnLFxyXG4gICAgXHU4M0RDXHU1MzU1X0dpdEh1Yl9cdTY4MDdcdTk4OTg6J0dpdEh1YicsXHJcblxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X0dJVEhVQl9cdTYzQ0ZcdThGRjA6ICdWaXNpdCB0aGUgYXV0aG9yXFwncyBHaXRIdWIgcGFnZSB0byB2aWV3IHByb2plY3QgZGV0YWlscywgdXBkYXRlIGxvZ3MsIHBhcnRpY2lwYXRlIGluIGRpc2N1c3Npb25zLCBhbmQgY29udHJpYnV0ZSBjb2RlLicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4OUM2XHU5ODkxXHU2NTU5XHU3QTBCX1x1NjNDRlx1OEZGMDogJ0FjY2VzcyB2aWRlbyB0dXRvcmlhbHMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRl9cdTYzQ0ZcdThGRjA6ICdFbmFibGUgZWRpdCBtb2RlIGZvciBpbi1kZXB0aCBwbHVnaW4gY29uZmlndXJhdGlvbiBjdXN0b21pemF0aW9uJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTkxQ0RcdThGN0RcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnUmVsb2FkIHBsdWdpbnMgdG8gdGFrZSBlZmZlY3QgaW1tZWRpYXRlbHknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMF9cdTYzQ0ZcdThGRjA6ICdDaGVjayBmb3IgcGx1Z2luIHVwZGF0ZXMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdEaXNhYmxlIGFsbCBwbHVnaW5zIGF0IG9uY2UnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdFbmFibGUgYWxsIHBsdWdpbnMgYXQgb25jZScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ01hbmFnZSBwbHVnaW4gc2V0dGluZ3MnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEVDNVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdPbmx5IGRpc3BsYXkgZW5hYmxlZCBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTY3MkFcdTUyMDZcdTdFQzRfXHU2M0NGXHU4RkYwOiAnRmlsdGVyIGFsbCB1bmdyb3VwZWQgcGx1Z2lucycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ09wZW4gdGhlIHNldHRpbmdzIGludGVyZmFjZScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMDogJ1Jlc3RvcmUgdG8gdGhlIGluaXRpYWwgc3RhdGUnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NV9cdTYzQ0ZcdThGRjA6ICdPcGVuIHRoZSBwbHVnaW4gZGlyZWN0b3J5JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnQ29tcGxldGVseSBkZWxldGUgdGhlIHBsdWdpbicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ1RvZ2dsZSB0aGUgcGx1Z2luIHN0YXR1cycsXHJcblxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5ODogJ1VuaW5zdGFsbCBQbHVnaW4nLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjNEMFx1NzkzQTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byB1bmluc3RhbGwgdGhpcyBwbHVnaW4/IFRoaXMgd2lsbCBkZWxldGUgdGhlIHBsdWdpblxcJ3MgZm9sZGVyLicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnVW5pbnN0YWxsJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODg6ICdDYW5jZWwnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdVbmluc3RhbGxlZCBzdWNjZXNzZnVsbHknLFxyXG5cclxuICAgIFx1NEUwMFx1OTUyRV9cdTY4MDdcdTk4OTg6ICdPbmUtY2xpY2sgRW5hYmxlL0Rpc2FibGUgUGx1Z2lucycsXHJcbiAgICBcdTRFMDBcdTk1MkVfXHU2M0QwXHU3OTNBOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGVuYWJsZS9kaXNhYmxlIHRoZSBwbHVnaW5zIG9uIHRoaXMgcGFnZSB3aXRoIG9uZSBjbGljaz8gVGhpcyBhY3Rpb24gY2Fubm90IGJlIHVuZG9uZS4gKFBsZWFzZSB3YWl0IHBhdGllbnRseSBkdXJpbmcgdGhlIGVuYWJsZS9kaXNhYmxlIHByb2Nlc3MpJyxcclxuICAgIFx1NEUwMFx1OTUyRV9cdTU0MkZcdTc5ODE6ICdFbmFibGUvRGlzYWJsZScsXHJcbiAgICBcdTRFMDBcdTk1MkVfXHU1M0Q2XHU2RDg4OiAnQ2FuY2VsJyxcclxuICAgIFx1NEUwMFx1OTUyRV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnRW5hYmxlL0Rpc2FibGUgU3VjY2Vzc2Z1bCcsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdCYXNpYycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ0dyb3VwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnVGFnJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnRGVsYXknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5ODogJ0xhbmd1YWdlIFNldHRpbmdzJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjNDRlx1OEZGMDogJ0Nob29zZSB5b3VyIHByZWZlcnJlZCBsYW5ndWFnZS4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc1NENcdTk3NjJcdTVDNDVcdTRFMkRfXHU2ODA3XHU5ODk4OiAnQ2VudGVyIHRoZSBpbnRlcmZhY2UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc1NENcdTk3NjJcdTVDNDVcdTRFMkRfXHU2M0NGXHU4RkYwOiAnU2V0IHdoZXRoZXIgdGhlIG1hbmFnZXIgaW50ZXJmYWNlIGlzIGNlbnRlcmVkJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdEaXJlY3RvcnkgU3R5bGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnU2VsZWN0IHRoZSBzdHlsZSBvZiB0aGUgZ3JvdXAgdG8gZW5oYW5jZSB0aGUgYnJvd3NpbmcgZXhwZXJpZW5jZS4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMDogJ0Fsd2F5cyBFeHBhbmRlZCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RThDOiAnTmV2ZXIgRXhwYW5kZWQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwOTogJ0hvdmVyIHRvIEV4cGFuZCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCOiAnQ2xpY2sgdG8gRXhwYW5kJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdHcm91cCBTdHlsZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdTZWxlY3QgdGhlIHN0eWxlIG9mIHRoZSBncm91cCB0byBtYWtlIGl0IG1vcmUgbm90aWNlYWJsZSBhbmQgZWFzeSB0byBpZGVudGlmeS4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMDogJ1N0eWxlIE9uZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RThDOiAnU3R5bGUgVHdvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDk6ICdTdHlsZSBUaHJlZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCOiAnU3R5bGUgRm91cicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnVGFnIFN0eWxlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1NlbGVjdCB0aGUgc3R5bGUgb2YgdGhlIHRhZyB0byBtYWtlIGl0IG1vcmUgbm90aWNlYWJsZSBhbmQgZWFzeSB0byBpZGVudGlmeS4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMDogJ1N0eWxlIE9uZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RThDOiAnU3R5bGUgVHdvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDk6ICdTdHlsZSBUaHJlZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCOiAnU3R5bGUgRm91cicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2ODA3XHU5ODk4OiAnRGVsYXllZCBTdGFydHVwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjNDRlx1OEZGMDogJ0VuYWJsaW5nIHRoZSBkZWxheWVkIHN0YXJ0dXAgZmVhdHVyZSBjYW4gb3B0aW1pemUgdGhlIGxvYWRpbmcgb3JkZXIsIGJ1dCBwbGVhc2Ugbm90ZSB0aGF0IHRoaXMgbWF5IGNhdXNlIGNvbXBhdGliaWxpdHkgaXNzdWVzIHdpdGggc29tZSBwbHVnaW5zLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTg6ICdGYWRlIFBsdWdpbnMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnUHJvdmlkZSBhIHZpc3VhbCBmYWRlIGVmZmVjdCBmb3IgZGlzYWJsZWQgcGx1Z2lucyB0byBjbGVhcmx5IGRpc3Rpbmd1aXNoIGJldHdlZW4gZW5hYmxlZCBhbmQgZGlzYWJsZWQgcGx1Z2lucy4nLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3QjVCXHU5MDA5XHU2MzAxXHU0RTQ1XHU1MzE2X1x1NjgwN1x1OTg5ODogJ0ZpbHRlciBQZXJzaXN0ZW5jZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1N0I1Qlx1OTAwOVx1NjMwMVx1NEU0NVx1NTMxNl9cdTYzQ0ZcdThGRjA6ICdBZnRlciBlbmFibGluZywgeW91IHdpbGwgc2VlIHRoZSBzYW1lIHBsdWdpbiBsaXN0IGV2ZXJ5IHRpbWUgeW91IG9wZW4gdGhlIG1hbmFnZXIuJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdDb250cm9sIFBsdWdpbiBDb21tYW5kcyBTZXBhcmF0ZWx5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ0VuYWJsZSB0aGlzIG9wdGlvbiB0byBjb250cm9sIHRoZSBlbmFibGVkIGFuZCBkaXNhYmxlZCBzdGF0ZSBvZiBlYWNoIHBsdWdpbiBzZXBhcmF0ZWx5LiAoUmVzdGFydCBPYnNpZGlhbiB0byB0YWtlIGVmZmVjdCknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnQ29udHJvbCBQbHVnaW4gQ29tbWFuZHMgYnkgR3JvdXAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnRW5hYmxlIHRoaXMgb3B0aW9uIHRvIGVuYWJsZSBvciBkaXNhYmxlIGFsbCBwbHVnaW5zIGluIGEgc3BlY2lmaWVkIGdyb3VwIHdpdGggb25lIGNsaWNrLiAoUmVzdGFydCBPYnNpZGlhbiB0byB0YWtlIGVmZmVjdCknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tEZWxheV0gQWRkZWQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW0RlbGF5XSBJRCBhbHJlYWR5IGV4aXN0cyBvciBpcyBlbXB0eScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbRGVsYXldIERlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tEZWxheV0gRGVsZXRpb24gZmFpbGVkLCBwbHVnaW5zIGV4aXN0IHVuZGVyIHRoaXMgZGVsYXknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tHcm91cF0gQWRkZWQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW0dyb3VwXSBJRCBhbHJlYWR5IGV4aXN0cyBvciBpcyBlbXB0eScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbR3JvdXBdIERlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tHcm91cF0gRGVsZXRpb24gZmFpbGVkLCBwbHVnaW5zIGV4aXN0IHVuZGVyIHRoaXMgZ3JvdXAnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tUYWddIEFkZGVkJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tUYWddIElEIGFscmVhZHkgZXhpc3RzIG9yIGlzIGVtcHR5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tUYWddIERlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tUYWddIERlbGV0aW9uIGZhaWxlZCwgcGx1Z2lucyBleGlzdCB1bmRlciB0aGlzIHRhZycsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2ODA3XHU5ODk4OiAnSWYgWW91IEVuY291bnRlciBDb25mbGljdHMgd2l0aCBPdGhlciBQbHVnaW5zJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjNDRlx1OEZGMDogJ0R1ZSB0byBsaW1pdGVkIGNhcGFiaWxpdGllcywgSSBjYW5ub3QgZml4IHRoaXMgaXNzdWUuIFBsZWFzZSBkaXNhYmxlIGRlbGF5ZWQgc3RhcnR1cCB0byByZXNvbHZlIGFsbCBjb25mbGljdCBpc3N1ZXMuJyxcclxuXHJcbiAgICBcdTU0N0RcdTRFRTRfXHU3QkExXHU3NDA2XHU5NzYyXHU2NzdGX1x1NjNDRlx1OEZGMDogJ09wZW4gdGhlIHBsdWdpbiBtYW5hZ2VyJyxcclxufVxyXG4iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdcdTA0MUNcdTA0MzVcdTA0M0RcdTA0MzVcdTA0MzRcdTA0MzZcdTA0MzVcdTA0NDAgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDNFXHUwNDMyJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYyMTBcdTUyOUZfXHU2NTg3XHU2NzJDOiAnXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ1JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDOiAnXHUwNDFEXHUwNDM1XHUwNDQzXHUwNDM0XHUwNDMwXHUwNDQ3XHUwNDMwJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDOiAnXHUwNDE0XHUwNDNFXHUwNDMxXHUwNDMwXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnXHUwNDFFXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDOiAnXHUwNDFGXHUwNDNFXHUwNDM4XHUwNDQxXHUwNDNBJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDOiAnXHUwNDFEXHUwNDMwXHUwNDM3XHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnXHUwNDExXHUwNDM1XHUwNDM3IFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQ0QicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU2ODA3XHU3QjdFX1x1NjU4N1x1NjcyQzogJ1x1MDQxMVx1MDQzNVx1MDQzNyBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0M0FcdTA0MzgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdcdTA0MTFcdTA0MzVcdTA0MzcgXHUwNDM3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDM4JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYwM0JcdThCQTFfXHU2NTg3XHU2NzJDOiAnXHUwNDEyXHUwNDQxXHUwNDM1XHUwNDMzXHUwNDNFJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHUwNDEyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDJyxcclxuXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMDogJ1x1MDQxRlx1MDQzRVx1MDQ0MVx1MDQzNVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDZcdTA0NDMgXHUwNDMwXHUwNDMyXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDMwIFx1MDQzRFx1MDQzMCBHaXRIdWIsIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDFcdTA0M0NcdTA0M0VcdTA0NDJcdTA0NDBcdTA0MzVcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNFXHUwNDM0XHUwNDQwXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzNVx1MDQzQVx1MDQ0Mlx1MDQzMCwgXHUwNDM2XHUwNDQzXHUwNDQwXHUwNDNEXHUwNDMwXHUwNDNCIFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOSwgXHUwNDNGXHUwNDQwXHUwNDM4XHUwNDNEXHUwNDRGXHUwNDQyXHUwNDRDIFx1MDQ0M1x1MDQ0N1x1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzNSBcdTA0MzIgXHUwNDNFXHUwNDMxXHUwNDQxXHUwNDQzXHUwNDM2XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM4IFx1MDQzOCBcdTA0MzJcdTA0M0RcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDQxXHUwNDMyXHUwNDNFXHUwNDM5IFx1MDQzMlx1MDQzQVx1MDQzQlx1MDQzMFx1MDQzNCBcdTA0MzIgXHUwNDNBXHUwNDNFXHUwNDM0LicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4OUM2XHU5ODkxXHU2NTU5XHU3QTBCX1x1NjNDRlx1OEZGMDogJ1x1MDQxNFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0M1x1MDQzRiBcdTA0M0EgXHUwNDMyXHUwNDM4XHUwNDM0XHUwNDM1XHUwNDNFXHUwNDQzXHUwNDQwXHUwNDNFXHUwNDNBXHUwNDMwXHUwNDNDJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTdGMTZcdThGOTFcdTZBMjFcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0MFx1MDQzNVx1MDQzNlx1MDQzOFx1MDQzQyBcdTA0NDBcdTA0MzVcdTA0MzRcdTA0MzBcdTA0M0FcdTA0NDJcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzM1x1MDQzQlx1MDQ0M1x1MDQzMVx1MDQzRVx1MDQzQVx1MDQzRVx1MDQzOSBcdTA0M0RcdTA0MzBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0M0VcdTA0MzlcdTA0M0FcdTA0MzggXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU5MUNEXHU4RjdEXHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1MDQxRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEIgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRFx1MDQzNVx1MDQzQ1x1MDQzNVx1MDQzNFx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0MzJcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0ZcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDMyIFx1MDQ0MVx1MDQzOFx1MDQzQlx1MDQ0MycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwX1x1NjNDRlx1OEZGMDogJ1x1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0Q1x1MDQ0Mlx1MDQzNSBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDNFXHUwNDMyJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2M0NGXHU4RkYwOiAnXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzMlx1MDQ0MVx1MDQzNSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEIgXHUwNDNFXHUwNDM0XHUwNDNEXHUwNDM4XHUwNDNDIFx1MDQzQVx1MDQzQlx1MDQzOFx1MDQzQVx1MDQzRVx1MDQzQycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1MDQxMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzJcdTA0NDFcdTA0MzUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCIFx1MDQzRVx1MDQzNFx1MDQzRFx1MDQzOFx1MDQzQyBcdTA0M0FcdTA0M0JcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0MnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdTA0MjNcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDMwXHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1MDQxRlx1MDQzRVx1MDQzQVx1MDQzMFx1MDQzN1x1MDQ0Qlx1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0NDJcdTA0M0VcdTA0M0JcdTA0NENcdTA0M0FcdTA0M0UgXHUwNDMyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQ0QicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1MDQxRVx1MDQ0Mlx1MDQzQVx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQ0Mlx1MDQzNSBcdTA0MzhcdTA0M0RcdTA0NDJcdTA0MzVcdTA0NDBcdTA0NDRcdTA0MzVcdTA0MzlcdTA0NDEgXHUwNDNEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM1XHUwNDNBJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdThGRDhcdTUzOUZcdTUxODVcdTVCQjlfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDM1XHUwNDQwXHUwNDNEXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQ0N1x1MDQzMFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzNSBcdTA0NDFcdTA0M0VcdTA0NDFcdTA0NDJcdTA0M0VcdTA0NEZcdTA0M0RcdTA0MzhcdTA0MzUnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NV9cdTYzQ0ZcdThGRjA6ICdcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNBXHUwNDMwXHUwNDQyXHUwNDMwXHUwNDNCXHUwNDNFXHUwNDMzIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1MDQxRlx1MDQzRVx1MDQzQlx1MDQzRFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQ0Q1x1MDQ0RSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMDdcdTYzNjJcdTcyQjZcdTYwMDFfXHU2M0NGXHU4RkYwOiAnXHUwNDFGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQ0Mlx1MDQ0M1x1MDQ0MSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0MzAnLFxyXG5cclxuICAgIFx1NTM3OFx1OEY3RF9cdTY4MDdcdTk4OTg6ICdcdTA0MjNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTYzRDBcdTc5M0E6ICdcdTA0MTJcdTA0NEIgXHUwNDQzXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDNEXHUwNDRCLCBcdTA0NDdcdTA0NDJcdTA0M0UgXHUwNDQ1XHUwNDNFXHUwNDQyXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NERcdTA0NDJcdTA0M0VcdTA0NDIgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEPyBcdTA0MkRcdTA0NDJcdTA0M0UgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyIFx1MDQzRlx1MDQzMFx1MDQzRlx1MDQzQVx1MDQ0MyBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0MzAuJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzNzhcdThGN0Q6ICdcdTA0MjNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NEMnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ1x1MDQxRVx1MDQ0Mlx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzMCcsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1x1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHUwNDFFXHUwNDQxXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNEXHUwNDRCXHUwNDM1JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHUwNDEzXHUwNDQwXHUwNDQzXHUwNDNGXHUwNDNGXHUwNDMwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHUwNDFDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDMwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHUwNDE3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDMwJyxcclxuXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2ODA3XHU5ODk4OiAnXHUwNDFEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDM4IFx1MDQ0Rlx1MDQzN1x1MDQ0Qlx1MDQzQVx1MDQzMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTYzQ0ZcdThGRjA6ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDQwXHUwNDM1XHUwNDM0XHUwNDNGXHUwNDNFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDMwXHUwNDM1XHUwNDNDXHUwNDRCXHUwNDM5IFx1MDQ0Rlx1MDQzN1x1MDQ0Qlx1MDQzQS4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHUwNDIxXHUwNDQyXHUwNDM4XHUwNDNCXHUwNDRDIFx1MDQzQVx1MDQzMFx1MDQ0Mlx1MDQzMFx1MDQzQlx1MDQzRVx1MDQzM1x1MDQzMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDNCXHUwNDRDIFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQ0QiBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDQzXHUwNDNCXHUwNDQzXHUwNDQ3XHUwNDQ4XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQ0MVx1MDQzQ1x1MDQzRVx1MDQ0Mlx1MDQ0MFx1MDQzMC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHUwNDIxXHUwNDQyXHUwNDM4XHUwNDNCXHUwNDRDIFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQ0QicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDNCXHUwNDRDIFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQ0QiBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNCXHUwNDQzXHUwNDQ3XHUwNDQ4XHUwNDM1XHUwNDM5IFx1MDQzMlx1MDQzOFx1MDQzNFx1MDQzOFx1MDQzQ1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzggXHUwNDM4XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDQyXHUwNDM4XHUwNDQ0XHUwNDM4XHUwNDNBXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4LicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdcdTA0MjFcdTA0NDJcdTA0MzhcdTA0M0JcdTA0NEMgXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDM4JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1MDQxMlx1MDQ0Qlx1MDQzMVx1MDQzNVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0JcdTA0NEMgXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDM4IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0JcdTA0NDNcdTA0NDdcdTA0NDhcdTA0MzVcdTA0MzkgXHUwNDMyXHUwNDM4XHUwNDM0XHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzOCBcdTA0MzhcdTA0MzRcdTA0MzVcdTA0M0RcdTA0NDJcdTA0MzhcdTA0NDRcdTA0MzhcdTA0M0FcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzguJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTg6ICdcdTA0MTdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzAgXHUwNDNGXHUwNDQwXHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzNScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTYzQ0ZcdThGRjA6ICdcdTA0MTJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQ0XHUwNDQzXHUwNDNEXHUwNDNBXHUwNDQ2XHUwNDM4XHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzOCBcdTA0M0ZcdTA0NDBcdTA0MzggXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDM1IFx1MDQzQ1x1MDQzRVx1MDQzNlx1MDQzNVx1MDQ0MiBcdTA0M0VcdTA0M0ZcdTA0NDJcdTA0MzhcdTA0M0NcdTA0MzhcdTA0MzdcdTA0MzhcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDNFXHUwNDQwXHUwNDRGXHUwNDM0XHUwNDNFXHUwNDNBIFx1MDQzN1x1MDQzMFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzN1x1MDQzQVx1MDQzOCwgXHUwNDNEXHUwNDNFIFx1MDQzRVx1MDQzMVx1MDQ0MFx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzJcdTA0M0RcdTA0MzhcdTA0M0NcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUsIFx1MDQ0N1x1MDQ0Mlx1MDQzRSBcdTA0NERcdTA0NDJcdTA0M0UgXHUwNDNDXHUwNDNFXHUwNDM2XHUwNDM1XHUwNDQyIFx1MDQzMlx1MDQ0Qlx1MDQzN1x1MDQzMlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzVcdTA0M0NcdTA0NEIgXHUwNDQxXHUwNDNFXHUwNDMyXHUwNDNDXHUwNDM1XHUwNDQxXHUwNDQyXHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQ0MSBcdTA0M0RcdTA0MzVcdTA0M0FcdTA0M0VcdTA0NDJcdTA0M0VcdTA0NDBcdTA0NEJcdTA0M0NcdTA0MzggXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDMwXHUwNDNDXHUwNDM4LicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTg6ICdcdTA0MjFcdTA0M0JcdTA0MzBcdTA0MzFcdTA0M0UgXHUwNDMyXHUwNDM4XHUwNDM0XHUwNDM4XHUwNDNDXHUwNDRCXHUwNDM1IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQ0QicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0NDBcdTA0MzVcdTA0MzRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzBcdTA0MzJcdTA0NENcdTA0NDJcdTA0MzUgXHUwNDMyXHUwNDM4XHUwNDM3XHUwNDQzXHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDRCXHUwNDM5IFx1MDQ0RFx1MDQ0NFx1MDQ0NFx1MDQzNVx1MDQzQVx1MDQ0MiBcdTA0NDFcdTA0M0JcdTA0MzBcdTA0MzFcdTA0M0VcdTA0MzkgXHUwNDMyXHUwNDM4XHUwNDM0XHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0VcdTA0NDJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDNFXHUwNDMyLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDQ3XHUwNDM1XHUwNDQyXHUwNDNBXHUwNDNFIFx1MDQ0MFx1MDQzMFx1MDQzN1x1MDQzQlx1MDQzOFx1MDQ0N1x1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDM4IFx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEIuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1MDQxRVx1MDQ0Mlx1MDQzNFx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzNSBcdTA0NDNcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDNEXHUwNDM0XHUwNDMwXHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdcdTA0MTJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDREXHUwNDQyXHUwNDNFXHUwNDQyIFx1MDQzRlx1MDQzMFx1MDQ0MFx1MDQzMFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQ0MCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNFXHUwNDQyXHUwNDM0XHUwNDM1XHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQ0M1x1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0NDFcdTA0M0VcdTA0NDFcdTA0NDJcdTA0M0VcdTA0NEZcdTA0M0RcdTA0MzhcdTA0MzVcdTA0M0MgXHUwNDMyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzOCBcdTA0M0VcdTA0NDJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDNBXHUwNDMwXHUwNDM2XHUwNDM0XHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzMC4gKFx1MDQxRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQzNSBPYnNpZGlhbiwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzMlx1MDQzRFx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYpJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1MDQyM1x1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0M0FcdTA0M0VcdTA0M0NcdTA0MzBcdTA0M0RcdTA0MzRcdTA0MzBcdTA0M0NcdTA0MzggXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDNFXHUwNDMyIFx1MDQzRlx1MDQzRSBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0MzBcdTA0M0MnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQ0MiBcdTA0M0ZcdTA0MzBcdTA0NDBcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NDAgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzhcdTA0M0JcdTA0MzggXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzMlx1MDQ0MVx1MDQzNVx1MDQ0NSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzIgXHUwNDMyIFx1MDQ0M1x1MDQzQVx1MDQzMFx1MDQzN1x1MDQzMFx1MDQzRFx1MDQzRFx1MDQzRVx1MDQzOSBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0MzUgXHUwNDNFXHUwNDM0XHUwNDNEXHUwNDM4XHUwNDNDIFx1MDQzQVx1MDQzQlx1MDQzOFx1MDQzQVx1MDQzRVx1MDQzQy4gKFx1MDQxRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQzNSBPYnNpZGlhbiwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzMlx1MDQzRFx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzhcdTA0MzdcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYpJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHUwNDE3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDMwXSBcdTA0MTRcdTA0M0VcdTA0MzFcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1MDQxN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzMF0gSUQgXHUwNDQzXHUwNDM2XHUwNDM1IFx1MDQ0MVx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQ0M1x1MDQzNVx1MDQ0MiBcdTA0MzhcdTA0M0JcdTA0MzggXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdTA0MTdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzBdIFx1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1MDQxN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzMF0gXHUwNDFEXHUwNDM1IFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0QyBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NEMsIFx1MDQ0MVx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQ0M1x1MDQ0RVx1MDQ0MiBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEIgXHUwNDQxIFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQzOSBcdTA0MzdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0M0VcdTA0MzknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdTA0MTNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0MzBdIFx1MDQxNFx1MDQzRVx1MDQzMVx1MDQzMFx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHUwNDEzXHUwNDQwXHUwNDQzXHUwNDNGXHUwNDNGXHUwNDMwXSBJRCBcdTA0NDNcdTA0MzZcdTA0MzUgXHUwNDQxXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDQzXHUwNDM1XHUwNDQyIFx1MDQzOFx1MDQzQlx1MDQzOCBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1MDQxM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQzMF0gXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHUwNDEzXHUwNDQwXHUwNDQzXHUwNDNGXHUwNDNGXHUwNDMwXSBcdTA0MURcdTA0MzUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDIFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0QywgXHUwNDQxXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDQzXHUwNDRFXHUwNDQyIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQ0QiBcdTA0MzIgXHUwNDREXHUwNDQyXHUwNDNFXHUwNDM5IFx1MDQzM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQzNScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1x1MDQxQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzMF0gXHUwNDE0XHUwNDNFXHUwNDMxXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tcdTA0MUNcdTA0MzVcdTA0NDJcdTA0M0FcdTA0MzBdIElEIFx1MDQ0M1x1MDQzNlx1MDQzNSBcdTA0NDFcdTA0NDNcdTA0NDlcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0NDNcdTA0MzVcdTA0NDIgXHUwNDM4XHUwNDNCXHUwNDM4IFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0MicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbXHUwNDFDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDMwXSBcdTA0MjNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tcdTA0MUNcdTA0MzVcdTA0NDJcdTA0M0FcdTA0MzBdIFx1MDQxRFx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEMgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDLCBcdTA0NDFcdTA0NDNcdTA0NDlcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0NDNcdTA0NEVcdTA0NDIgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCIFx1MDQ0MSBcdTA0NERcdTA0NDJcdTA0M0VcdTA0MzkgXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDNFXHUwNDM5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTY4MDdcdTk4OTg6ICdcdTA0MTVcdTA0NDFcdTA0M0JcdTA0MzggXHUwNDMyXHUwNDNFXHUwNDM3XHUwNDNEXHUwNDM4XHUwNDNBXHUwNDMwXHUwNDRFXHUwNDQyIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzQlx1MDQzOFx1MDQzQVx1MDQ0Mlx1MDQ0QiBcdTA0NDEgXHUwNDM0XHUwNDQwXHUwNDQzXHUwNDMzXHUwNDM4XHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzMFx1MDQzQ1x1MDQzOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTYzQ0ZcdThGRjA6ICdcdTA0MThcdTA0MzctXHUwNDM3XHUwNDMwIFx1MDQzRVx1MDQzM1x1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQ0NSBcdTA0MzJcdTA0M0VcdTA0MzdcdTA0M0NcdTA0M0VcdTA0MzZcdTA0M0RcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzVcdTA0MzkgXHUwNDRGIFx1MDQzRFx1MDQzNSBcdTA0M0NcdTA0M0VcdTA0MzNcdTA0NDMgXHUwNDM4XHUwNDQxXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0RFx1MDQ0Mlx1MDQ0MyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzVcdTA0M0NcdTA0NDMuIFx1MDQxRlx1MDQzRVx1MDQzNlx1MDQzMFx1MDQzQlx1MDQ0M1x1MDQzOVx1MDQ0MVx1MDQ0Mlx1MDQzMCwgXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQ0MyBcdTA0M0ZcdTA0NDBcdTA0MzggXHUwNDM3XHUwNDMwXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDNBXHUwNDM1LCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDQwXHUwNDM1XHUwNDQ4XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzMlx1MDQ0MVx1MDQzNSBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzVcdTA0M0NcdTA0NEIgXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDNCXHUwNDM4XHUwNDNBXHUwNDQyXHUwNDMwLicsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjA6ICdcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDM0XHUwNDM2XHUwNDM1XHUwNDQwIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMicsXHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwREVcdTMwQ0RcdTMwRkNcdTMwQjhcdTMwRTNcdTMwRkMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkM6ICdcdTYyMTBcdTUyOUYnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTkzMVx1OEQyNV9cdTY1ODdcdTY3MkM6ICdcdTU5MzFcdTY1NTcnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkM6ICdcdThGRkRcdTUyQTAnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjRDRFx1NEY1Q19cdTY1ODdcdTY3MkM6ICdcdTY0Q0RcdTRGNUMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkM6ICdcdTY5MUNcdTdEMjInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkM6ICdcdTU0MERcdTUyNEQnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDdcdTMwNkFcdTMwNTcnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdcdTMwQkZcdTMwQjBcdTMwNkFcdTMwNTcnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdcdTkwNDVcdTVFRjZcdTMwNkFcdTMwNTcnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjAzQlx1OEJBMV9cdTY1ODdcdTY3MkM6ICdcdTU0MDhcdThBMDgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdTY3MDlcdTUyQjknLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdTcxMjFcdTUyQjknLFxyXG5cclxuXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMDogJ1x1ODQ1N1x1ODAwNVx1MzA2RUdpdEh1Ylx1MzBEQVx1MzBGQ1x1MzBCOFx1MzA5Mlx1OEEyQVx1MzA4Q1x1MzAwMVx1MzBEN1x1MzBFRFx1MzBCOFx1MzBBN1x1MzBBRlx1MzBDOFx1MzA2RVx1OEE3M1x1N0QzMFx1MzAwMVx1NjZGNFx1NjVCMFx1MzBFRFx1MzBCMFx1MzAwMVx1OEI3MFx1OEFENlx1MzA3OFx1MzA2RVx1NTNDMlx1NTJBMFx1MzAwMVx1MzBCM1x1MzBGQ1x1MzBDOVx1MzA3OFx1MzA2RVx1OENBMlx1NzMyRVx1MzA5Mlx1NzhCQVx1OEE4RFx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4OUM2XHU5ODkxXHU2NTU5XHU3QTBCX1x1NjNDRlx1OEZGMDogJ1x1MzBEM1x1MzBDN1x1MzBBQVx1MzBDMVx1MzBFNVx1MzBGQ1x1MzBDOFx1MzBFQVx1MzBBMlx1MzBFQlx1MzA2Qlx1MzBBMlx1MzBBRlx1MzBCQlx1MzBCOScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1N0RFOFx1OTZDNlx1MzBFMlx1MzBGQ1x1MzBDOVx1MzA5Mlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA1N1x1MzA2Nlx1MzAwMVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1OEEyRFx1NUI5QVx1MzA5Mlx1MzBBQlx1MzBCOVx1MzBCRlx1MzBERVx1MzBBNFx1MzBCQVx1MzA1N1x1MzA3RVx1MzA1OScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU5MUNEXHU4RjdEXHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1MzBFQVx1MzBFRFx1MzBGQ1x1MzBDOVx1MzA1N1x1MzA2Nlx1NTM3M1x1NUVBN1x1MzA2Qlx1NTJCOVx1Njc5Q1x1MzA5Mlx1NzY3QVx1NjNFRVx1MzA1N1x1MzA3RVx1MzA1OScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwX1x1NjNDRlx1OEZGMDogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1NjZGNFx1NjVCMFx1MzA5Mlx1NzhCQVx1OEE4RFx1MzA1OVx1MzA4QicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEUwMFx1NUVBNlx1MzA2Qlx1MzA1OVx1MzA3OVx1MzA2Nlx1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1NzEyMVx1NTJCOVx1MzA2Qlx1MzA1N1x1MzA3RVx1MzA1OScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEUwMFx1NUVBNlx1MzA2Qlx1MzA1OVx1MzA3OVx1MzA2Nlx1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA1N1x1MzA3RVx1MzA1OScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1OEEyRFx1NUI5QVx1MzA5Mlx1N0JBMVx1NzQwNlx1MzA1OVx1MzA4QicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NjcwOVx1NTJCOVx1MzA2QVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1MzA3Rlx1MzA5Mlx1ODg2OFx1NzkzQVx1MzA1OVx1MzA4QicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1OEEyRFx1NUI5QVx1MzBBNFx1MzBGM1x1MzBCRlx1MzBGQ1x1MzBENVx1MzBBN1x1MzBGQ1x1MzBCOVx1MzA5Mlx1OTU4Qlx1MzA0RicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMDogJ1x1NTIxRFx1NjcxRlx1NzJCNlx1NjE0Qlx1MzA2Qlx1NjIzQlx1MzA1OScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1X1x1NjNDRlx1OEZGMDogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzBDN1x1MzBBM1x1MzBFQ1x1MzBBRlx1MzBDOFx1MzBFQVx1MzA5Mlx1OTU4Qlx1MzA0RicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1NUI4Q1x1NTE2OFx1MzA2Qlx1NTI0QVx1OTY2NFx1MzA1OVx1MzA4QicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1MzBCOVx1MzBDNlx1MzBGQ1x1MzBCRlx1MzBCOVx1MzA5Mlx1NTIwN1x1MzA4QVx1NjZGRlx1MzA0OFx1MzA4QicsXHJcblxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5ODogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1MzBBMlx1MzBGM1x1MzBBNFx1MzBGM1x1MzBCOVx1MzBDOFx1MzBGQ1x1MzBFQicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnXHUzMDUzXHUzMDZFXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHUzMEEyXHUzMEYzXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEVCXHUzMDU3XHUzMDY2XHUzMDgyXHUzMDg4XHUzMDhEXHUzMDU3XHUzMDQ0XHUzMDY3XHUzMDU5XHUzMDRCXHVGRjFGXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDZFXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDRDXHU1MjRBXHU5NjY0XHUzMDU1XHUzMDhDXHUzMDdFXHUzMDU5XHUzMDAyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzNzhcdThGN0Q6ICdcdTMwQTJcdTMwRjNcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQzhcdTMwRkNcdTMwRUInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ1x1MzBBRFx1MzBFM1x1MzBGM1x1MzBCQlx1MzBFQicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1x1MzBBMlx1MzBGM1x1MzBBNFx1MzBGM1x1MzBCOVx1MzBDOFx1MzBGQ1x1MzBFQlx1MzA2Qlx1NjIxMFx1NTI5Rlx1MzA1N1x1MzA3RVx1MzA1N1x1MzA1RicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdcdTU3RkFcdTY3MkMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDcnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdcdTMwQkZcdTMwQjAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdcdTkwNDVcdTVFRjYnLFxyXG5cclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTY4MDdcdTk4OTg6ICdcdThBMDBcdThBOUVcdThBMkRcdTVCOUEnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2M0NGXHU4RkYwOiAnXHUzMDRBXHU1OTdEXHUzMDdGXHUzMDZFXHU4QTAwXHU4QTlFXHUzMDkyXHU5MDc4XHU2MjlFXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1MzBDN1x1MzBBM1x1MzBFQ1x1MzBBRlx1MzBDOFx1MzBFQVx1MzBCOVx1MzBCRlx1MzBBNFx1MzBFQicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDdcdTMwNkVcdTMwQjlcdTMwQkZcdTMwQTRcdTMwRUJcdTMwOTJcdTkwNzhcdTYyOUVcdTMwNTdcdTMwNjZcdTMwMDFcdTMwRDZcdTMwRTlcdTMwQTZcdTMwQjhcdTMwRjNcdTMwQjBcdTRGNTNcdTlBMTNcdTMwOTJcdTU0MTFcdTRFMEFcdTMwNTVcdTMwNUJcdTMwN0VcdTMwNTlcdTMwMDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XHUzMEI5XHUzMEJGXHUzMEE0XHUzMEVCJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN1x1MzA2RVx1MzBCOVx1MzBCRlx1MzBBNFx1MzBFQlx1MzA5Mlx1OTA3OFx1NjI5RVx1MzA1N1x1MzA2Nlx1MzAwMVx1MzA4OFx1MzA4QVx1NzZFRVx1N0FDQlx1MzA1Rlx1MzA1Qlx1MzA4NFx1MzA1OVx1MzA0Rlx1OEI1OFx1NTIyNVx1MzA1N1x1MzA4NFx1MzA1OVx1MzA0Rlx1MzA1N1x1MzA3RVx1MzA1OVx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdcdTMwQkZcdTMwQjBcdTMwQjlcdTMwQkZcdTMwQTRcdTMwRUInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHUzMEJGXHUzMEIwXHUzMDZFXHUzMEI5XHUzMEJGXHUzMEE0XHUzMEVCXHUzMDkyXHU5MDc4XHU2MjlFXHUzMDU3XHUzMDY2XHUzMDAxXHUzMDg4XHUzMDhBXHU3NkVFXHU3QUNCXHUzMDVGXHUzMDVCXHUzMDg0XHUzMDU5XHUzMDRGXHU4QjU4XHU1MjI1XHUzMDU3XHUzMDg0XHUzMDU5XHUzMDRGXHUzMDU3XHUzMDdFXHUzMDU5XHUzMDAyJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTg6ICdcdTkwNDVcdTVFRjZcdTMwQjlcdTMwQkZcdTMwRkNcdTMwQzgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnXHU5MDQ1XHU1RUY2XHUzMEI5XHUzMEJGXHUzMEZDXHUzMEM4XHU2QTVGXHU4MEZEXHUzMDkyXHU2NzA5XHU1MkI5XHUzMDZCXHUzMDU5XHUzMDhCXHUzMDY4XHUzMDAxXHU4QUFEXHUzMDdGXHU4RkJDXHUzMDdGXHU5ODA2XHU1RThGXHUzMDkyXHU2NzAwXHU5MDY5XHU1MzE2XHUzMDY3XHUzMDREXHUzMDdFXHUzMDU5XHUzMDRDXHUzMDAxXHU0RTAwXHU5MEU4XHUzMDZFXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDY3XHU0RTkyXHU2M0RCXHU2MDI3XHU1NTRGXHU5ODRDXHUzMDRDXHU3NjdBXHU3NTFGXHUzMDU5XHUzMDhCXHU1ODM0XHU1NDA4XHUzMDRDXHUzMDQyXHUzMDhBXHUzMDdFXHUzMDU5XHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjgwN1x1OTg5ODogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1MzBENVx1MzBBN1x1MzBGQ1x1MzBDOScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTcxMjFcdTUyQjlcdTMwNkFcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkJcdTg5OTZcdTg5OUFcdTc2ODRcdTMwNkFcdTMwRDVcdTMwQTdcdTMwRkNcdTMwQzlcdTUyQjlcdTY3OUNcdTMwOTJcdTYzRDBcdTRGOUJcdTMwNTdcdTMwNjZcdTMwMDFcdTY3MDlcdTUyQjlcdTMwNjhcdTcxMjFcdTUyQjlcdTMwNkVcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTY2MEVcdTc4QkFcdTMwNkJcdTUzM0FcdTUyMjVcdTMwNTdcdTMwN0VcdTMwNTlcdTMwMDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMEIzXHUzMERFXHUzMEYzXHUzMEM5XHUzMDkyXHU1MDBCXHU1MjI1XHUzMDZCXHU1MjM2XHU1RkExJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ1x1MzA1M1x1MzA2RVx1MzBBQVx1MzBEN1x1MzBCN1x1MzBFN1x1MzBGM1x1MzA5Mlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA1OVx1MzA4Qlx1MzA2OFx1MzAwMVx1NTQwNFx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1NjcwOVx1NTJCOS9cdTcxMjFcdTUyQjlcdTcyQjZcdTYxNEJcdTMwOTJcdTUwMEJcdTUyMjVcdTMwNkJcdTUyMzZcdTVGQTFcdTMwNjdcdTMwNERcdTMwN0VcdTMwNTlcdTMwMDJcdUZGMDhPYnNpZGlhblx1MzA5Mlx1NTE4RFx1OEQ3N1x1NTJENVx1MzA1OVx1MzA4Qlx1NUZDNVx1ODk4MVx1MzA0Q1x1MzA0Mlx1MzA4QVx1MzA3RVx1MzA1OVx1RkYwOScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDdcdTMwNTRcdTMwNjhcdTMwNkJcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwQjNcdTMwREVcdTMwRjNcdTMwQzlcdTMwOTJcdTUyMzZcdTVGQTEnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnXHUzMDUzXHUzMDZFXHUzMEFBXHUzMEQ3XHUzMEI3XHUzMEU3XHUzMEYzXHUzMDkyXHU2NzA5XHU1MkI5XHUzMDZCXHUzMDU5XHUzMDhCXHUzMDY4XHUzMDAxXHU2MzA3XHU1QjlBXHUzMDU1XHUzMDhDXHUzMDVGXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XHU1MTg1XHUzMDZFXHUzMDU5XHUzMDc5XHUzMDY2XHUzMDZFXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHUzMEVGXHUzMEYzXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEFGXHUzMDY3XHU2NzA5XHU1MkI5XHUzMDdFXHUzMDVGXHUzMDZGXHU3MTIxXHU1MkI5XHUzMDZCXHUzMDY3XHUzMDREXHUzMDdFXHUzMDU5XHUzMDAyXHVGRjA4T2JzaWRpYW5cdTMwOTJcdTUxOERcdThENzdcdTUyRDVcdTMwNTlcdTMwOEJcdTVGQzVcdTg5ODFcdTMwNENcdTMwNDJcdTMwOEFcdTMwN0VcdTMwNTlcdUZGMDknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdTkwNDVcdTVFRjZdIFx1OEZGRFx1NTJBMFx1MzA1NVx1MzA4Q1x1MzA3RVx1MzA1N1x1MzA1RicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHU5MDQ1XHU1RUY2XSBJRFx1MzA0Q1x1NjVFMlx1MzA2Qlx1NUI1OFx1NTcyOFx1MzA1OVx1MzA4Qlx1MzA0Qlx1MzAwMVx1N0E3QVx1MzA2N1x1MzA1OScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbXHU5MDQ1XHU1RUY2XSBcdTUyNEFcdTk2NjRcdTMwNkJcdTYyMTBcdTUyOUZcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1OTA0NVx1NUVGNl0gXHU1MjRBXHU5NjY0XHUzMDZCXHU1OTMxXHU2NTU3XHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXHUzMDAxXHUzMDUzXHUzMDZFXHU5MDQ1XHU1RUY2XHUzMDZFXHU0RTBCXHUzMDZCXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDRDXHU1QjU4XHU1NzI4XHUzMDU3XHUzMDdFXHUzMDU5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XSBcdThGRkRcdTUyQTBcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTdcdTMwNUYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN10gSURcdTMwNENcdTY1RTJcdTMwNkJcdTVCNThcdTU3MjhcdTMwNTlcdTMwOEJcdTMwNEJcdTMwMDFcdTdBN0FcdTMwNjdcdTMwNTknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN10gXHU1MjRBXHU5NjY0XHUzMDZCXHU2MjEwXHU1MjlGXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDddIFx1NTI0QVx1OTY2NFx1MzA2Qlx1NTkzMVx1NjU1N1x1MzA1N1x1MzA3RVx1MzA1N1x1MzA1Rlx1MzAwMVx1MzA1M1x1MzA2RVx1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN1x1MzA2RVx1NEUwQlx1MzA2Qlx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA0Q1x1NUI1OFx1NTcyOFx1MzA1N1x1MzA3RVx1MzA1OScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1x1MzBCRlx1MzBCMF0gXHU4RkZEXHU1MkEwXHUzMDU1XHUzMDhDXHUzMDdFXHUzMDU3XHUzMDVGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tcdTMwQkZcdTMwQjBdIElEXHUzMDRDXHU2NUUyXHUzMDZCXHU1QjU4XHU1NzI4XHUzMDU5XHUzMDhCXHUzMDRCXHUzMDAxXHU3QTdBXHUzMDY3XHUzMDU5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdTMwQkZcdTMwQjBdIFx1NTI0QVx1OTY2NFx1MzA2Qlx1NjIxMFx1NTI5Rlx1MzA1N1x1MzA3RVx1MzA1N1x1MzA1RicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHUzMEJGXHUzMEIwXSBcdTUyNEFcdTk2NjRcdTMwNkJcdTU5MzFcdTY1NTdcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcdTMwMDFcdTMwNTNcdTMwNkVcdTMwQkZcdTMwQjBcdTMwNkVcdTRFMEJcdTMwNkJcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNENcdTVCNThcdTU3MjhcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjgwN1x1OTg5ODogJ1x1NEVENlx1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2OFx1MzA2RVx1MzBCM1x1MzBGM1x1MzBENVx1MzBFQVx1MzBBRlx1MzBDOFx1MzA0Q1x1NzY3QVx1NzUxRlx1MzA1N1x1MzA1Rlx1NTgzNFx1NTQwOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTYzQ0ZcdThGRjA6ICdcdTgwRkRcdTUyOUJcdTMwNkJcdTk2NTBcdTMwOEFcdTMwNENcdTMwNDJcdTMwOEJcdTMwNUZcdTMwODFcdTMwMDFcdTMwNTNcdTMwNkVcdTU1NEZcdTk4NENcdTMwOTJcdTRGRUVcdTZCNjNcdTMwNjdcdTMwNERcdTMwN0VcdTMwNUJcdTMwOTNcdTMwMDJcdTkwNDVcdTVFRjZcdTMwQjlcdTMwQkZcdTMwRkNcdTMwQzhcdTMwOTJcdTcxMjFcdTUyQjlcdTMwNkJcdTMwNTlcdTMwOEJcdTMwNTNcdTMwNjhcdTMwNjdcdTMwMDFcdTMwNTlcdTMwNzlcdTMwNjZcdTMwNkVcdTMwQjNcdTMwRjNcdTMwRDVcdTMwRUFcdTMwQUZcdTMwQzhcdTU1NEZcdTk4NENcdTMwOTJcdTg5RTNcdTZDN0FcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDInLFxyXG5cclxuICAgIFx1NTQ3RFx1NEVFNF9cdTdCQTFcdTc0MDZcdTk3NjJcdTY3N0ZfXHU2M0NGXHU4RkYwOiAnXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMERFXHUzMENEXHUzMEZDXHUzMEI4XHUzMEUzXHUzMEZDXHUzMDkyXHU5NThCXHUzMDRGJyxcclxufSIsICJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBcdTkwMUFcdTc1MjhfXHU3QkExXHU3NDA2XHU1NjY4X1x1NjU4N1x1NjcyQzogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUFEMDBcdUI5QUNcdUM3OTAnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkM6ICdcdUMxMzFcdUFDRjUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTkzMVx1OEQyNV9cdTY1ODdcdTY3MkM6ICdcdUMyRTRcdUQzMjgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkM6ICdcdUNEOTRcdUFDMDAnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjRDRFx1NEY1Q19cdTY1ODdcdTY3MkM6ICdcdUM3OTFcdUM1QzUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkM6ICdcdUFDODBcdUMwQzknLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkM6ICdcdUM3NzRcdUI5ODQnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdcdUFERjhcdUI4RjkgXHVDNUM2XHVDNzRDJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTY4MDdcdTdCN0VfXHU2NTg3XHU2NzJDOiAnXHVEMERDXHVBREY4IFx1QzVDNlx1Qzc0QycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU1RUY2XHU4RkRGX1x1NjU4N1x1NjcyQzogJ1x1QjUxQ1x1QjgwOFx1Qzc3NCBcdUM1QzZcdUM3NEMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjAzQlx1OEJBMV9cdTY1ODdcdTY3MkM6ICdcdUNEMURcdUFDQzQnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdUQ2NUNcdUMxMzFcdUQ2NTQnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdUJFNDRcdUQ2NUNcdUMxMzFcdUQ2NTQnLFxyXG5cclxuXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMDogJ1x1QzgwMFx1Qzc5MFx1Qzc1OCBHaXRIdWIgXHVEMzk4XHVDNzc0XHVDOUMwXHVCOTdDIFx1QkMyOVx1QkIzOFx1RDU1OFx1QzVFQyBcdUQ1MDRcdUI4NUNcdUM4MURcdUQyQjggXHVDMTM4XHVCRDgwIFx1QzgxNVx1QkNGNCwgXHVDNUM1XHVCMzcwXHVDNzc0XHVEMkI4IFx1Qjg1Q1x1QURGOCwgXHVEMUEwXHVCODYwIFx1Q0MzOFx1QzVFQywgXHVDRjU0XHVCNERDIFx1QUUzMFx1QzVFQ1x1Qjk3QyBcdUQ2NTVcdUM3NzhcdUQ1NThcdUMxMzhcdUM2OTQuJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTg5QzZcdTk4OTFcdTY1NTlcdTdBMEJfXHU2M0NGXHU4RkYwOiAnXHVCRTQ0XHVCNTE0XHVDNjI0IFx1RDI5Q1x1RDFBMFx1QjlBQ1x1QzVCQ1x1QzVEMCBcdUM1NjFcdUMxMzhcdUMyQTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdUQzQjhcdUM5RDEgXHVCQUE4XHVCNERDXHVCOTdDIFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU1OFx1QzVFQyBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVDMTI0XHVDODE1XHVDNzQ0IFx1Qzc5MFx1QzEzOFx1RDc4OCBcdUNFRTRcdUMyQTRcdUQxMzBcdUI5QzhcdUM3NzRcdUM5RDVcdUQ1NThcdUMxMzhcdUM2OTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NDQgXHVCMkU0XHVDMkRDIFx1Qjg1Q1x1QjREQ1x1RDU1OFx1QzVFQyBcdUM5ODlcdUMyREMgXHVDODAxXHVDNkE5XHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjBfXHU2M0NGXHU4RkYwOiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QzVDNVx1QjM3MFx1Qzc3NFx1RDJCOFx1Qjk3QyBcdUQ2NTVcdUM3NzhcdUQ1NThcdUMxMzhcdUM2OTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdUQ1NUMgXHVCQzg4XHVDNUQwIFx1QkFBOFx1QjRFMCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NDQgXHVCRTQ0XHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwOiAnXHVENTVDIFx1QkM4OFx1QzVEMCBcdUJBQThcdUI0RTAgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNzQ0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUMxMjRcdUM4MTVcdUM3NDQgXHVBRDAwXHVCOUFDXHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFQzVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwOiAnXHVENjVDXHVDMTMxXHVENjU0XHVCNDFDIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1QjlDQyBcdUQ0NUNcdUMyRENcdUQ1NThcdUMxMzhcdUM2OTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdUMxMjRcdUM4MTUgXHVDNzc4XHVEMTMwXHVEMzk4XHVDNzc0XHVDMkE0XHVCOTdDIFx1QzVGRFx1QjJDOFx1QjJFNCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMDogJ1x1Q0QwOFx1QUUzMCBcdUMwQzFcdUQwRENcdUI4NUMgXHVCQ0Y1XHVDNkQwXHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdTc2RUVcdTVGNTVfXHU2M0NGXHU4RkYwOiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QjUxNFx1QjgwOVx1RDFBMFx1QjlBQ1x1Qjk3QyBcdUM1RkRcdUIyQzhcdUIyRTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NDQgXHVDNjQ0XHVDODA0XHVENzg4IFx1QzBBRFx1QzgxQ1x1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUMwQzFcdUQwRENcdUI5N0MgXHVDODA0XHVENjU4XHVENTU4XHVDMTM4XHVDNjk0JyxcclxuXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2ODA3XHU5ODk4OiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QzgxQ1x1QUM3MCcsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnXHVDNzc0IFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1Qzc0NCBcdUM4MUNcdUFDNzBcdUQ1NThcdUMyRENcdUFDQTBcdUMyQjVcdUIyQzhcdUFFNEM/IFx1Qzc3NCBcdUM3OTFcdUM1QzVcdUM3NDAgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1RDNGNFx1QjM1NFx1Qjk3QyBcdUMwQURcdUM4MUNcdUQ1NjlcdUIyQzhcdUIyRTQuJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzNzhcdThGN0Q6ICdcdUM4MUNcdUFDNzAnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ1x1Q0RFOFx1QzE4QycsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1x1QzEzMVx1QUNGNVx1QzgwMVx1QzczQ1x1Qjg1QyBcdUM4MUNcdUFDNzBcdUI0MThcdUM1QzhcdUMyQjVcdUIyQzhcdUIyRTQnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHVBRTMwXHVCQ0Y4JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHVBREY4XHVCOEY5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHVEMERDXHVBREY4JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHVCNTFDXHVCODA4XHVDNzc0JyxcclxuXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2ODA3XHU5ODk4OiAnXHVDNUI4XHVDNUI0IFx1QzEyNFx1QzgxNScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTYzQ0ZcdThGRjA6ICdcdUMxMjBcdUQ2MzhcdUQ1NThcdUIyOTQgXHVDNUI4XHVDNUI0XHVCOTdDIFx1QzEyMFx1RDBERFx1RDU1OFx1QzEzOFx1QzY5NC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHVCNTE0XHVCODA5XHVEMUEwXHVCOUFDIFx1QzJBNFx1RDBDMFx1Qzc3QycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdUFERjhcdUI4RjlcdUM3NTggXHVDMkE0XHVEMEMwXHVDNzdDXHVDNzQ0IFx1QzEyMFx1RDBERFx1RDU1OFx1QzVFQyBcdUJFMENcdUI3N0NcdUM2QjBcdUM5RDUgXHVBQ0JEXHVENUQ4XHVDNzQ0IFx1RDVBNVx1QzBDMVx1RDU1OFx1QzEzOFx1QzY5NC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHVBREY4XHVCOEY5IFx1QzJBNFx1RDBDMFx1Qzc3QycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdUFERjhcdUI4RjlcdUM3NTggXHVDMkE0XHVEMEMwXHVDNzdDXHVDNzQ0IFx1QzEyMFx1RDBERFx1RDU1OFx1QzVFQyBcdUIzNTQgXHVCMjA4XHVDNUQwIFx1Qjc0NFx1QUNFMCBcdUMyRERcdUJDQzRcdUQ1NThcdUFFMzAgXHVDMjdEXHVBQzhDIFx1QjlDQ1x1QjREQ1x1QzEzOFx1QzY5NC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHVEMERDXHVBREY4IFx1QzJBNFx1RDBDMFx1Qzc3QycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdUQwRENcdUFERjhcdUM3NTggXHVDMkE0XHVEMEMwXHVDNzdDXHVDNzQ0IFx1QzEyMFx1RDBERFx1RDU1OFx1QzVFQyBcdUIzNTQgXHVCMjA4XHVDNUQwIFx1Qjc0NFx1QUNFMCBcdUMyRERcdUJDQzRcdUQ1NThcdUFFMzAgXHVDMjdEXHVBQzhDIFx1QjlDQ1x1QjREQ1x1QzEzOFx1QzY5NC4nLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjgwN1x1OTg5ODogJ1x1QzlDMFx1QzVGMCBcdUMyRENcdUM3OTEnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnXHVDOUMwXHVDNUYwIFx1QzJEQ1x1Qzc5MSBcdUFFMzBcdUIyQTVcdUM3NDQgXHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVCQTc0IFx1Qjg1Q1x1QjUyOSBcdUMyMUNcdUMxMUNcdUI5N0MgXHVDRDVDXHVDODAxXHVENjU0XHVENTYwIFx1QzIxOCBcdUM3ODhcdUM5QzBcdUI5Q0MsIFx1Qzc3Q1x1QkQ4MCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM1RDBcdUMxMUMgXHVENjM4XHVENjU4XHVDMTMxIFx1QkIzOFx1QzgxQ1x1QUMwMCBcdUJDMUNcdUMwRERcdUQ1NjAgXHVDMjE4IFx1Qzc4OFx1QzczQ1x1QkJDMFx1Qjg1QyBcdUM3MjBcdUM3NThcdUQ1NThcdUMxMzhcdUM2OTQuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjgwN1x1OTg5ODogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUQ3NTBcdUI5QUNcdUFDOEMgXHVENDVDXHVDMkRDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NFx1QjQxQyBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM1RDAgXHVDMkRDXHVBQzAxXHVDODAxXHVDNzc4IFx1RDc1MFx1QjlCQyBcdUQ2QThcdUFDRkNcdUI5N0MgXHVDODFDXHVBQ0Y1XHVENTU4XHVDNUVDIFx1RDY1Q1x1QzEzMVx1RDY1NFx1QjQxQyBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUFDRkMgXHVCRTQ0XHVENjVDXHVDMTMxXHVENjU0XHVCNDFDIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1Qzc0NCBcdUJBODVcdUQ2NTVcdUQ3ODggXHVBRDZDXHVCRDg0XHVENTU4XHVDMTM4XHVDNjk0LicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVCQTg1XHVCODM5XHVDNzQ0IFx1QkNDNFx1QjNDNFx1Qjg1QyBcdUM4MUNcdUM1QjQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnXHVDNzc0IFx1QzYzNVx1QzE1OFx1Qzc0NCBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUQ1NThcdUJBNzQgXHVBQzAxIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1Qzc1OCBcdUQ2NUNcdUMxMzFcdUQ2NTQvXHVCRTQ0XHVENjVDXHVDMTMxXHVENjU0IFx1QzBDMVx1RDBEQ1x1Qjk3QyBcdUJDQzRcdUIzQzRcdUI4NUMgXHVDODFDXHVDNUI0XHVENTYwIFx1QzIxOCBcdUM3ODhcdUMyQjVcdUIyQzhcdUIyRTQuIChPYnNpZGlhblx1Qzc0NCBcdUIyRTRcdUMyREMgXHVDMkRDXHVDNzkxXHVENTc0XHVDNTdDIFx1QzgwMVx1QzZBOVx1QjQyOVx1QjJDOFx1QjJFNCknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnXHVBREY4XHVCOEY5XHVCQ0M0IFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUJBODVcdUI4MzkgXHVDODFDXHVDNUI0JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ1x1Qzc3NCBcdUM2MzVcdUMxNThcdUM3NDQgXHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVCQTc0IFx1QzlDMFx1QzgxNVx1QjQxQyBcdUFERjhcdUI4RjlcdUM3NTggXHVCQUE4XHVCNEUwIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1Qzc0NCBcdUQ1NUMgXHVCQzg4IFx1RDA3NFx1QjlBRFx1QzczQ1x1Qjg1QyBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUQ1NThcdUFDNzBcdUIwOTggXHVCRTQ0XHVENjVDXHVDMTMxXHVENjU0XHVENTYwIFx1QzIxOCBcdUM3ODhcdUMyQjVcdUIyQzhcdUIyRTQuIChPYnNpZGlhblx1Qzc0NCBcdUIyRTRcdUMyREMgXHVDMkRDXHVDNzkxXHVENTc0XHVDNTdDIFx1QzgwMVx1QzZBOVx1QjQyOVx1QjJDOFx1QjJFNCknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdUI1MUNcdUI4MDhcdUM3NzRdIFx1Q0Q5NFx1QUMwMFx1QjQyOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHVCNTFDXHVCODA4XHVDNzc0XSBJRFx1QUMwMCBcdUM3NzRcdUJCRjggXHVDODc0XHVDN0FDXHVENTU4XHVBQzcwXHVCMDk4IFx1QkU0NFx1QzVCNCBcdUM3ODhcdUM3NEMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1QjUxQ1x1QjgwOFx1Qzc3NF0gXHVDMTMxXHVBQ0Y1XHVDODAxXHVDNzNDXHVCODVDIFx1QzBBRFx1QzgxQ1x1QjQyOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHVCNTFDXHVCODA4XHVDNzc0XSBcdUMwQURcdUM4MUMgXHVDMkU0XHVEMzI4LCBcdUM3NzQgXHVCNTFDXHVCODA4XHVDNzc0XHVENTU4XHVDNUQwIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1Qzc3NCBcdUM4NzRcdUM3QUNcdUQ1NjgnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdUFERjhcdUI4RjldIFx1Q0Q5NFx1QUMwMFx1QjQyOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHVBREY4XHVCOEY5XSBJRFx1QUMwMCBcdUM3NzRcdUJCRjggXHVDODc0XHVDN0FDXHVENTU4XHVBQzcwXHVCMDk4IFx1QkU0NFx1QzVCNCBcdUM3ODhcdUM3NEMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1QURGOFx1QjhGOV0gXHVDMTMxXHVBQ0Y1XHVDODAxXHVDNzNDXHVCODVDIFx1QzBBRFx1QzgxQ1x1QjQyOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHVBREY4XHVCOEY5XSBcdUMwQURcdUM4MUMgXHVDMkU0XHVEMzI4LCBcdUM3NzQgXHVBREY4XHVCOEY5XHVENTU4XHVDNUQwIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1Qzc3NCBcdUM4NzRcdUM3QUNcdUQ1NjgnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdUQwRENcdUFERjhdIFx1Q0Q5NFx1QUMwMFx1QjQyOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHVEMERDXHVBREY4XSBJRFx1QUMwMCBcdUM3NzRcdUJCRjggXHVDODc0XHVDN0FDXHVENTU4XHVBQzcwXHVCMDk4IFx1QkU0NFx1QzVCNCBcdUM3ODhcdUM3NEMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1RDBEQ1x1QURGOF0gXHVDMTMxXHVBQ0Y1XHVDODAxXHVDNzNDXHVCODVDIFx1QzBBRFx1QzgxQ1x1QjQyOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHVEMERDXHVBREY4XSBcdUMwQURcdUM4MUMgXHVDMkU0XHVEMzI4LCBcdUM3NzQgXHVEMERDXHVBREY4XHVENTU4XHVDNUQwIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1Qzc3NCBcdUM4NzRcdUM3QUNcdUQ1NjgnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjgwN1x1OTg5ODogJ1x1QjJFNFx1Qjk3OCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUFDRkNcdUM3NTggXHVDREE5XHVCM0NDXHVDNzc0IFx1QkMxQ1x1QzBERFx1RDU2MCBcdUFDQkRcdUM2QjAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnXHVCMkE1XHVCODI1XHVDNzc0IFx1QzgxQ1x1RDU1Q1x1QjQxOFx1QzVCNCBcdUM3ODhcdUM1QjQgXHVDNzc0IFx1QkIzOFx1QzgxQ1x1Qjk3QyBcdUQ1NzRcdUFDQjBcdUQ1NjAgXHVDMjE4IFx1QzVDNlx1QzJCNVx1QjJDOFx1QjJFNC4gXHVDOUMwXHVDNUYwIFx1QzJEQ1x1Qzc5MVx1Qzc0NCBcdUJFNDRcdUQ2NUNcdUMxMzFcdUQ2NTRcdUQ1NThcdUM1RUMgXHVCQUE4XHVCNEUwIFx1Q0RBOVx1QjNDQyBcdUJCMzhcdUM4MUNcdUI5N0MgXHVENTc0XHVBQ0IwXHVENTU4XHVDMTM4XHVDNjk0LicsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjA6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVBRDAwXHVCOUFDXHVDNzkwXHVCOTdDIFx1QzVGRFx1QjJDOFx1QjJFNCcsXHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdHZXN0aW9ubmFpcmUgZGUgcGx1Z2lucycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MjEwXHU1MjlGX1x1NjU4N1x1NjcyQzogJ1N1Y2NcdTAwRThzJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDOiAnXHUwMEM5Y2hlYycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUIwXHU1ODlFX1x1NjU4N1x1NjcyQzogJ0Fqb3V0ZXInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjRDRFx1NEY1Q19cdTY1ODdcdTY3MkM6ICdPcFx1MDBFOXJhdGlvbicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NDFDXHU3RDIyX1x1NjU4N1x1NjcyQzogJ1JlY2hlcmNoZScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDBEXHU3OUYwX1x1NjU4N1x1NjcyQzogJ05vbScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQzogJ0F1Y3VuIGdyb3VwZScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU2ODA3XHU3QjdFX1x1NjU4N1x1NjcyQzogJ0F1Y3VuIHRhZycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU1RUY2XHU4RkRGX1x1NjU4N1x1NjcyQzogJ0F1Y3VuIHJldGFyZCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MDNCXHU4QkExX1x1NjU4N1x1NjcyQzogJ1RvdGFsJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnQWN0aXZlcicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQzogJ0RcdTAwRTlzYWN0aXZlcicsXHJcblxyXG5cclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9HSVRIVUJfXHU2M0NGXHU4RkYwOiAnVmlzaXRleiBsYSBwYWdlIEdpdEh1YiBkZSBsXFwnYXV0ZXVyIHBvdXIgdm9pciBsZXMgZFx1MDBFOXRhaWxzIGR1IHByb2pldCwgbGVzIGpvdXJuYXV4IGRlIG1pc2UgXHUwMEUwIGpvdXIsIHBhcnRpY2lwZXIgYXV4IGRpc2N1c3Npb25zIGV0IGNvbnRyaWJ1ZXIgZHUgY29kZS4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQl9cdTYzQ0ZcdThGRjA6ICdBY2NcdTAwRTlkZXogYXV4IHR1dG9yaWVscyB2aWRcdTAwRTlvJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTdGMTZcdThGOTFcdTZBMjFcdTVGMEZfXHU2M0NGXHU4RkYwOiAnQWN0aXZleiBsZSBtb2RlIFx1MDBFOWRpdGlvbiBwb3VyIHVuZSBwZXJzb25uYWxpc2F0aW9uIGFwcHJvZm9uZGllIGRlIGxhIGNvbmZpZ3VyYXRpb24gZGVzIHBsdWdpbnMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdSZWNoYXJnZXogbGVzIHBsdWdpbnMgcG91ciBxdVxcJ2lscyBwcmVubmVudCBlZmZldCBpbW1cdTAwRTlkaWF0ZW1lbnQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMF9cdTYzQ0ZcdThGRjA6ICdWXHUwMEU5cmlmaWV6IGxlcyBtaXNlcyBcdTAwRTAgam91ciBkZXMgcGx1Z2lucycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjNDRlx1OEZGMDogJ0RcdTAwRTlzYWN0aXZleiB0b3VzIGxlcyBwbHVnaW5zIGVuIHVuZSBmb2lzJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwOiAnQWN0aXZleiB0b3VzIGxlcyBwbHVnaW5zIGVuIHVuZSBmb2lzJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYzRDJcdTRFRjZcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnR1x1MDBFOXJleiBsZXMgcGFyYW1cdTAwRTh0cmVzIGRlcyBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFQzVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwOiAnQWZmaWNoZXogdW5pcXVlbWVudCBsZXMgcGx1Z2lucyBhY3Rpdlx1MDBFOXMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdPdXZyZXogbFxcJ2ludGVyZmFjZSBkZSBwYXJhbVx1MDBFOHRyZXMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOV9cdTYzQ0ZcdThGRjA6ICdSXHUwMEU5dGFibGlzc2V6IGxcXCdcdTAwRTl0YXQgaW5pdGlhbCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1X1x1NjNDRlx1OEZGMDogJ091dnJleiBsZSByXHUwMEU5cGVydG9pcmUgZGVzIHBsdWdpbnMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdTdXBwcmltZXogY29tcGxcdTAwRTh0ZW1lbnQgbGUgcGx1Z2luJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMDdcdTYzNjJcdTcyQjZcdTYwMDFfXHU2M0NGXHU4RkYwOiAnQmFzY3VsZXIgbFxcJ1x1MDBFOXRhdCBkdSBwbHVnaW4nLFxyXG5cclxuICAgIFx1NTM3OFx1OEY3RF9cdTY4MDdcdTk4OTg6ICdEXHUwMEU5c2luc3RhbGxlciBsZSBwbHVnaW4nLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjNEMFx1NzkzQTogJ1x1MDBDQXRlcy12b3VzIHNcdTAwRkJyIGRlIHZvdWxvaXIgZFx1MDBFOXNpbnN0YWxsZXIgY2UgcGx1Z2luID8gQ2VsYSBzdXBwcmltZXJhIGxlIGRvc3NpZXIgZHUgcGx1Z2luLicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnRFx1MDBFOXNpbnN0YWxsZXInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ0FubnVsZXInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdEXHUwMEU5c2luc3RhbGxcdTAwRTkgYXZlYyBzdWNjXHUwMEU4cycsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdQYXJhbVx1MDBFOHRyZXMgZGUgYmFzZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ0dyb3VwZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1RhZycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1JldGFyZCcsXHJcblxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5ODogJ1BhcmFtXHUwMEU4dHJlcyBkZSBsYW5ndWUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2M0NGXHU4RkYwOiAnQ2hvaXNpc3NleiB2b3RyZSBsYW5ndWUgcHJcdTAwRTlmXHUwMEU5clx1MDBFOWUuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1N0eWxlIGR1IHJcdTAwRTlwZXJ0b2lyZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdDaG9pc2lzc2V6IGxlIHN0eWxlIGR1IGdyb3VwZSBwb3VyIGFtXHUwMEU5bGlvcmVyIGxcXCdleHBcdTAwRTlyaWVuY2UgZGUgbmF2aWdhdGlvbi4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnU3R5bGUgZHUgZ3JvdXBlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ0Nob2lzaXNzZXogbGUgc3R5bGUgZHUgZ3JvdXBlIHBvdXIgbGUgcmVuZHJlIHBsdXMgdmlzaWJsZSBldCBmYWNpbGUgXHUwMEUwIGlkZW50aWZpZXIuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1N0eWxlIGR1IHRhZycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdDaG9pc2lzc2V6IGxlIHN0eWxlIGR1IHRhZyBwb3VyIGxlIHJlbmRyZSBwbHVzIHZpc2libGUgZXQgZmFjaWxlIFx1MDBFMCBpZGVudGlmaWVyLicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2ODA3XHU5ODk4OiAnRFx1MDBFOW1hcnJhZ2UgZGlmZlx1MDBFOXJcdTAwRTknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnTFxcJ2FjdGl2YXRpb24gZGUgbGEgZm9uY3Rpb24gZGUgZFx1MDBFOW1hcnJhZ2UgZGlmZlx1MDBFOXJcdTAwRTkgcGV1dCBvcHRpbWlzZXIgbFxcJ29yZHJlIGRlIGNoYXJnZW1lbnQsIG1haXMgdmV1aWxsZXogbm90ZXIgcXVlIGNlbGEgcGV1dCBjYXVzZXIgZGVzIHByb2JsXHUwMEU4bWVzIGRlIGNvbXBhdGliaWxpdFx1MDBFOSBhdmVjIGNlcnRhaW5zIHBsdWdpbnMuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjgwN1x1OTg5ODogJ0VzdG9tcGVyIGxlcyBwbHVnaW5zJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ0FwcGxpcXVleiB1biBlZmZldCBkZSB0cmFuc3BhcmVuY2UgdmlzdWVsIGF1eCBwbHVnaW5zIGRcdTAwRTlzYWN0aXZcdTAwRTlzIHBvdXIgZGlzdGluZ3VlciBjbGFpcmVtZW50IGxlcyBwbHVnaW5zIGFjdGl2XHUwMEU5cyBldCBkXHUwMEU5c2FjdGl2XHUwMEU5cy4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnQ29udHJcdTAwRjRsZXIgbGVzIGNvbW1hbmRlcyBkZXMgcGx1Z2lucyBzXHUwMEU5cGFyXHUwMEU5bWVudCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdBY3RpdmV6IGNldHRlIG9wdGlvbiBwb3VyIGNvbnRyXHUwMEY0bGVyIGxcXCdcdTAwRTl0YXQgYWN0aXZcdTAwRTkgZXQgZFx1MDBFOXNhY3Rpdlx1MDBFOSBkZSBjaGFxdWUgcGx1Z2luIHNcdTAwRTlwYXJcdTAwRTltZW50LiAoUmVkXHUwMEU5bWFycmV6IE9ic2lkaWFuIHBvdXIgcXVlIGxlcyBtb2RpZmljYXRpb25zIHByZW5uZW50IGVmZmV0KScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdDb250clx1MDBGNGxlciBsZXMgY29tbWFuZGVzIGRlcyBwbHVnaW5zIHBhciBncm91cGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnQWN0aXZleiBjZXR0ZSBvcHRpb24gcG91ciBhY3RpdmVyIG91IGRcdTAwRTlzYWN0aXZlciB0b3VzIGxlcyBwbHVnaW5zIGRcXCd1biBncm91cGUgc3BcdTAwRTljaWZpcXVlIGF2ZWMgdW4gc2V1bCBjbGljLiAoUmVkXHUwMEU5bWFycmV6IE9ic2lkaWFuIHBvdXIgcXVlIGxlcyBtb2RpZmljYXRpb25zIHByZW5uZW50IGVmZmV0KScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1JldGFyZF0gQWpvdXRcdTAwRTknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1JldGFyZF0gTFxcJ0lEIGV4aXN0ZSBkXHUwMEU5alx1MDBFMCBvdSBlc3QgdmlkZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbUmV0YXJkXSBTdXBwcmltXHUwMEU5IGF2ZWMgc3VjY1x1MDBFOHMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1JldGFyZF0gXHUwMEM5Y2hlYyBkZSBsYSBzdXBwcmVzc2lvbiwgZGVzIHBsdWdpbnMgZXhpc3RlbnQgc291cyBjZSByZXRhcmQnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tHcm91cGVdIEFqb3V0XHUwMEU5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tHcm91cGVdIExcXCdJRCBleGlzdGUgZFx1MDBFOWpcdTAwRTAgb3UgZXN0IHZpZGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW0dyb3VwZV0gU3VwcHJpbVx1MDBFOSBhdmVjIHN1Y2NcdTAwRThzJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tHcm91cGVdIFx1MDBDOWNoZWMgZGUgbGEgc3VwcHJlc3Npb24sIGRlcyBwbHVnaW5zIGV4aXN0ZW50IHNvdXMgY2UgZ3JvdXBlJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbVGFnXSBBam91dFx1MDBFOScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbVGFnXSBMXFwnSUQgZXhpc3RlIGRcdTAwRTlqXHUwMEUwIG91IGVzdCB2aWRlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tUYWddIFN1cHByaW1cdTAwRTkgYXZlYyBzdWNjXHUwMEU4cycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbVGFnXSBcdTAwQzljaGVjIGRlIGxhIHN1cHByZXNzaW9uLCBkZXMgcGx1Z2lucyBleGlzdGVudCBzb3VzIGNlIHRhZycsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2ODA3XHU5ODk4OiAnU2kgdm91cyByZW5jb250cmV6IGRlcyBjb25mbGl0cyBhdmVjIGRcXCdhdXRyZXMgcGx1Z2lucycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTYzQ0ZcdThGRjA6ICdFbiByYWlzb24gZGUgY2FwYWNpdFx1MDBFOXMgbGltaXRcdTAwRTllcywgamUgbmUgcGV1eCBwYXMgclx1MDBFOXNvdWRyZSBjZSBwcm9ibFx1MDBFOG1lLiBWZXVpbGxleiBkXHUwMEU5c2FjdGl2ZXIgbGUgZFx1MDBFOW1hcnJhZ2UgZGlmZlx1MDBFOXJcdTAwRTkgcG91ciByXHUwMEU5c291ZHJlIHRvdXMgbGVzIHByb2JsXHUwMEU4bWVzIGRlIGNvbmZsaXQuJyxcclxuXHJcbiAgICBcdTU0N0RcdTRFRTRfXHU3QkExXHU3NDA2XHU5NzYyXHU2NzdGX1x1NjNDRlx1OEZGMDogJ091dnJleiBsZSBnZXN0aW9ubmFpcmUgZGUgcGx1Z2lucycsXHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdBZG1pbmlzdHJhZG9yIGRlIHBsdWdpbnMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkM6ICdcdTAwQzl4aXRvJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDOiAnRmFsbG8nLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkM6ICdBZ3JlZ2FyJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnT3BlcmFjaVx1MDBGM24nLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkM6ICdCdXNjYXInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkM6ICdOb21icmUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdTaW4gZ3J1cG8nLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdTaW4gZXRpcXVldGEnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdTaW4gcmV0cmFzbycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MDNCXHU4QkExX1x1NjU4N1x1NjcyQzogJ1RvdGFsJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnSGFiaWxpdGFyJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnRGVzaGFiaWxpdGFyJyxcclxuXHJcblxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X0dJVEhVQl9cdTYzQ0ZcdThGRjA6ICdWaXNpdGUgbGEgcFx1MDBFMWdpbmEgZGUgR2l0SHViIGRlbCBhdXRvciBwYXJhIHZlciBkZXRhbGxlcyBkZWwgcHJveWVjdG8sIHJlZ2lzdHJvcyBkZSBhY3R1YWxpemFjaW9uZXMsIHBhcnRpY2lwYXIgZW4gZGlzY3VzaW9uZXMgeSBjb250cmlidWlyIGNvbiBjXHUwMEYzZGlnby4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQl9cdTYzQ0ZcdThGRjA6ICdBY2NlZGVyIGEgdHV0b3JpYWxlcyBlbiB2aWRlbycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ0hhYmlsaXRhciBtb2RvIGRlIGVkaWNpXHUwMEYzbiBwYXJhIHVuYSBwZXJzb25hbGl6YWNpXHUwMEYzbiBwcm9mdW5kYSBkZSBsYSBjb25maWd1cmFjaVx1MDBGM24gZGVsIHBsdWdpbicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU5MUNEXHU4RjdEXHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1JlY2FyZ2FyIHBsdWdpbnMgcGFyYSBxdWUgc3VydGFuIGVmZWN0byBpbm1lZGlhdGFtZW50ZScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwX1x1NjNDRlx1OEZGMDogJ0NvbXByb2JhciBhY3R1YWxpemFjaW9uZXMgZGUgcGx1Z2lucycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjNDRlx1OEZGMDogJ0Rlc2hhYmlsaXRhciB0b2RvcyBsb3MgcGx1Z2lucyBhIGxhIHZleicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ0hhYmlsaXRhciB0b2RvcyBsb3MgcGx1Z2lucyBhIGxhIHZleicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ0FkbWluaXN0cmFyIGNvbmZpZ3VyYWNpXHUwMEYzbiBkZSBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFQzVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwOiAnTW9zdHJhciBzb2xvIHBsdWdpbnMgaGFiaWxpdGFkb3MnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdBYnJpciBsYSBpbnRlcmZheiBkZSBjb25maWd1cmFjaVx1MDBGM24nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOV9cdTYzQ0ZcdThGRjA6ICdSZXN0YXVyYXIgYWwgZXN0YWRvIGluaWNpYWwnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NV9cdTYzQ0ZcdThGRjA6ICdBYnJpciBlbCBkaXJlY3RvcmlvIGRlIHBsdWdpbnMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdFbGltaW5hciBjb21wbGV0YW1lbnRlIGVsIHBsdWdpbicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ0FsdGVybmFyIGVsIGVzdGFkbyBkZWwgcGx1Z2luJyxcclxuXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2ODA3XHU5ODk4OiAnRGVzaW5zdGFsYXIgUGx1Z2luJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTYzRDBcdTc5M0E6ICdcdTAwQkZFc3RcdTAwRTEgc2VndXJvIGRlIHF1ZSBkZXNlYSBkZXNpbnN0YWxhciBlc3RlIHBsdWdpbj8gRXN0byBlbGltaW5hclx1MDBFMSBsYSBjYXJwZXRhIGRlbCBwbHVnaW4uJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzNzhcdThGN0Q6ICdEZXNpbnN0YWxhcicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1M0Q2XHU2RDg4OiAnQ2FuY2VsYXInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdEZXNpbnN0YWxhZG8gY29ycmVjdGFtZW50ZScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdDb25maWd1cmFjaVx1MDBGM24gYlx1MDBFMXNpY2EnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdHcnVwbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ0V0aXF1ZXRhJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnUmV0cmFzbycsXHJcblxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5ODogJ0NvbmZpZ3VyYWNpXHUwMEYzbiBkZSBpZGlvbWEnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2M0NGXHU4RkYwOiAnU2VsZWNjaW9uZSBzdSBpZGlvbWEgcHJlZmVyaWRvLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdFc3RpbG8gZGVsIGRpcmVjdG9yaW8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnU2VsZWNjaW9uZSBlbCBlc3RpbG8gZGVsIGdydXBvIHBhcmEgbWVqb3JhciBsYSBleHBlcmllbmNpYSBkZSBuYXZlZ2FjaVx1MDBGM24uJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ0VzdGlsbyBkZWwgZ3J1cG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnU2VsZWNjaW9uZSBlbCBlc3RpbG8gZGVsIGdydXBvIHBhcmEgaGFjZXJsbyBtXHUwMEUxcyB2aXNpYmxlIHkgZlx1MDBFMWNpbCBkZSBpZGVudGlmaWNhci4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnRXN0aWxvIGRlIGxhIGV0aXF1ZXRhJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1NlbGVjY2lvbmUgZWwgZXN0aWxvIGRlIGxhIGV0aXF1ZXRhIHBhcmEgaGFjZXJsbyBtXHUwMEUxcyB2aXNpYmxlIHkgZlx1MDBFMWNpbCBkZSBpZGVudGlmaWNhci4nLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjgwN1x1OTg5ODogJ0luaWNpbyBjb24gcmV0cmFzbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTYzQ0ZcdThGRjA6ICdIYWJpbGl0YXIgbGEgZnVuY2lcdTAwRjNuIGRlIGluaWNpbyBjb24gcmV0cmFzbyBwdWVkZSBvcHRpbWl6YXIgZWwgb3JkZW4gZGUgY2FyZ2EsIHBlcm8gdGVuZ2EgZW4gY3VlbnRhIHF1ZSBlc3RvIHB1ZWRlIGNhdXNhciBwcm9ibGVtYXMgZGUgY29tcGF0aWJpbGlkYWQgY29uIGFsZ3Vub3MgcGx1Z2lucy4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2ODA3XHU5ODk4OiAnQXRlbnVhciBwbHVnaW5zJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1Byb3BvcmNpb25lIHVuIGVmZWN0byBkZSBhdGVudWFjaVx1MDBGM24gdmlzdWFsIHBhcmEgcGx1Z2lucyBkZXNoYWJpbGl0YWRvcyBwYXJhIGRpc3Rpbmd1aXIgY2xhcmFtZW50ZSBlbnRyZSBwbHVnaW5zIGhhYmlsaXRhZG9zIHkgZGVzaGFiaWxpdGFkb3MuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ0NvbnRyb2xhciBjb21hbmRvcyBkZSBwbHVnaW5zIHBvciBzZXBhcmFkbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdIYWJpbGl0ZSBlc3RhIG9wY2lcdTAwRjNuIHBhcmEgY29udHJvbGFyIGVsIGVzdGFkbyBoYWJpbGl0YWRvIHkgZGVzaGFiaWxpdGFkbyBkZSBjYWRhIHBsdWdpbiBwb3Igc2VwYXJhZG8uIChSZWluaWNpZSBPYnNpZGlhbiBwYXJhIHF1ZSBzdXJ0YW4gZWZlY3RvKScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdDb250cm9sYXIgY29tYW5kb3MgZGUgcGx1Z2lucyBwb3IgZ3J1cG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnSGFiaWxpdGUgZXN0YSBvcGNpXHUwMEYzbiBwYXJhIGhhYmlsaXRhciBvIGRlc2hhYmlsaXRhciB0b2RvcyBsb3MgcGx1Z2lucyBkZSB1biBncnVwbyBlc3BlY1x1MDBFRGZpY28gY29uIHVuIHNvbG8gY2xpYy4gKFJlaW5pY2llIE9ic2lkaWFuIHBhcmEgcXVlIHN1cnRhbiBlZmVjdG8pJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbUmV0cmFzb10gQVx1MDBGMWFkaWRvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tSZXRyYXNvXSBFbCBJRCB5YSBleGlzdGUgbyBlc3RcdTAwRTEgdmFjXHUwMEVEbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbUmV0cmFzb10gRWxpbWluYWRvIGNvcnJlY3RhbWVudGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1JldHJhc29dIEZhbGxvIGFsIGVsaW1pbmFyLCBleGlzdGVuIHBsdWdpbnMgYmFqbyBlc3RlIHJldHJhc28nLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tHcnVwb10gQVx1MDBGMWFkaWRvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tHcnVwb10gRWwgSUQgeWEgZXhpc3RlIG8gZXN0XHUwMEUxIHZhY1x1MDBFRG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW0dydXBvXSBFbGltaW5hZG8gY29ycmVjdGFtZW50ZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbR3J1cG9dIEZhbGxvIGFsIGVsaW1pbmFyLCBleGlzdGVuIHBsdWdpbnMgYmFqbyBlc3RlIGdydXBvJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbRXRpcXVldGFdIEFcdTAwRjFhZGlkbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbRXRpcXVldGFdIEVsIElEIHlhIGV4aXN0ZSBvIGVzdFx1MDBFMSB2YWNcdTAwRURvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tFdGlxdWV0YV0gRWxpbWluYWRvIGNvcnJlY3RhbWVudGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW0V0aXF1ZXRhXSBGYWxsbyBhbCBlbGltaW5hciwgZXhpc3RlbiBwbHVnaW5zIGJham8gZXN0YSBldGlxdWV0YScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2ODA3XHU5ODk4OiAnU2kgZW5jdWVudHJhIGNvbmZsaWN0b3MgY29uIG90cm9zIHBsdWdpbnMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnRGViaWRvIGEgY2FwYWNpZGFkZXMgbGltaXRhZGFzLCBubyBwdWVkbyBzb2x1Y2lvbmFyIGVzdGUgcHJvYmxlbWEuIFBvciBmYXZvciwgZGVzaGFiaWxpdGUgZWwgaW5pY2lvIGNvbiByZXRyYXNvIHBhcmEgcmVzb2x2ZXIgdG9kb3MgbG9zIHByb2JsZW1hcyBkZSBjb25mbGljdG8uJyxcclxuXHJcbiAgICBcdTU0N0RcdTRFRTRfXHU3QkExXHU3NDA2XHU5NzYyXHU2NzdGX1x1NjNDRlx1OEZGMDogJ0FicmlyIGVsIGFkbWluaXN0cmFkb3IgZGUgcGx1Z2lucycsXHJcbn0iLCAiaW1wb3J0IE1hbmFnZXIgZnJvbSBcIm1haW5cIjtcclxuaW1wb3J0IHpoX2NuIGZyb20gJy4vbG9jYWxlL3poX2NuJztcclxuaW1wb3J0IGVuIGZyb20gXCIuL2xvY2FsZS9lblwiO1xyXG5pbXBvcnQgcnUgZnJvbSBcIi4vbG9jYWxlL3J1XCI7XHJcbmltcG9ydCBqYSBmcm9tIFwiLi9sb2NhbGUvamFcIjtcclxuaW1wb3J0IGtvIGZyb20gXCIuL2xvY2FsZS9rb1wiO1xyXG5pbXBvcnQgZnIgZnJvbSBcIi4vbG9jYWxlL2ZyXCI7XHJcbmltcG9ydCBlcyBmcm9tIFwiLi9sb2NhbGUvZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdG9yIHtcclxuXHRwcml2YXRlIG1hbmFnZXI6IE1hbmFnZXI7XHJcblx0cHVibGljIGxhbmd1YWdlID0ge1xyXG5cdFx0J3poLWNuJzogJ1x1N0I4MFx1NEY1M1x1NEUyRFx1NjU4NycsXHJcblx0XHQnZW4nOiAnRW5nbGlzaCcsXHJcblx0XHQncnUnOiAnXHUwNDIwXHUwNDQzXHUwNDQxXHUwNDQxXHUwNDNBXHUwNDM4XHUwNDM5IFx1MDQ0Rlx1MDQzN1x1MDQ0Qlx1MDQzQScsXHJcblx0XHQnamEnOiAnXHU2NUU1XHU2NzJDXHU4QTlFJyxcclxuXHRcdCdrbyc6ICdcdUQ1NUNcdUFENkRcdUM1QjQnLFxyXG5cdFx0J2ZyJzogJ0ZyYW5cdTAwRTdhaXMnLFxyXG5cdFx0J2VzJzogJ0VzcGFcdTAwRjFvbCcsXHJcblx0fTtcclxuXHJcblx0cHJpdmF0ZSBsb2NhbGVNYXA6IHsgW2s6IHN0cmluZ106IFBhcnRpYWw8dHlwZW9mIHpoX2NuPiB9ID0ge1xyXG5cdFx0J3poLWNuJzogemhfY24sXHJcblx0XHQnZW4nOiBlbixcclxuXHRcdCdydSc6IHJ1LFxyXG5cdFx0J2phJzogamEsXHJcblx0XHQna28nOiBrbyxcclxuXHRcdCdmcic6IGZyLFxyXG5cdFx0J2VzJzogZXMsXHJcblx0fTtcclxuXHJcblx0Y29uc3RydWN0b3IobWFuYWdlcjogTWFuYWdlcikge1xyXG5cdFx0dGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcclxuXHR9XHJcblxyXG5cdC8vIFx1NjVCOVx1NkNENVx1NzUyOFx1NEU4RVx1ODNCN1x1NTNENlx1N0ZGQlx1OEJEMVx1NTQwRVx1NzY4NFx1NUI1N1x1N0IyNlx1NEUzMlxyXG5cdHB1YmxpYyB0KHN0cjoga2V5b2YgdHlwZW9mIHpoX2NuKTogc3RyaW5nIHtcclxuXHRcdGNvbnN0IGxhbmd1YWdlID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkxBTkdVQUdFIHx8ICd6aC1jbic7IC8vIFx1OUVEOFx1OEJBNFx1NEY3Rlx1NzUyOCAnemgtY24nXHJcblx0XHRjb25zdCBsb2NhbGUgPSB0aGlzLmxvY2FsZU1hcFtsYW5ndWFnZV0gfHwgemhfY247IC8vIFx1NTk4Mlx1Njc5QyBsYW5ndWFnZSBcdTRFMERcdTVCNThcdTU3MjhcdUZGMENcdTUyMTlcdTRGN0ZcdTc1MjggemhfY25cclxuXHRcdHJldHVybiBsb2NhbGVbc3RyXSB8fCB6aF9jbltzdHJdOyAvLyBcdTU5ODJcdTY3OUMgc3RyIFx1NTcyOCBsb2NhbGUgXHU0RTJEXHU0RTBEXHU1QjU4XHU1NzI4XHVGRjBDXHU1MjE5XHU0RjdGXHU3NTI4IHpoX2NuIFx1NEUyRFx1NzY4NFx1OUVEOFx1OEJBNFx1NTAzQ1xyXG5cdH1cclxufVxyXG5cclxuLy8gaW1wb3J0IHsgbW9tZW50IH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbi8vIGltcG9ydCB6aF9jbiBmcm9tICcuL2xvY2FsZS96aF9jbic7XHJcbi8vIGltcG9ydCBlbiBmcm9tIFwiLi9sb2NhbGUvZW5cIjtcclxuLy8gaW1wb3J0IGphX2pwIGZyb20gXCIuL2xvY2FsZS9qYV9qcFwiO1xyXG4vLyBpbXBvcnQga29fa3IgZnJvbSBcIi4vbG9jYWxlL2tvX2tyXCI7XHJcbi8vIGltcG9ydCBydV9ydSBmcm9tIFwiLi9sb2NhbGUvcnVfcnVcIjtcclxuXHJcbi8vIGV4cG9ydCBjb25zdCBMQU5HVUFHRSA9IHtcclxuLy8gXHQnemgtY24nOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JyxcclxuLy8gXHQnZW4nOiAnXHU2QzM4XHU0RTBEXHU1QzU1XHU1RjAwJ1xyXG4vLyB9XHJcblxyXG4vLyBjb25zdCBsb2NhbGVNYXA6IHsgW2s6IHN0cmluZ106IFBhcnRpYWw8dHlwZW9mIHpoX2NuPiB9ID0ge1xyXG4vLyBcdCd6aC1jbic6IHpoX2NuLFxyXG4vLyBcdCdlbi11cyc6IGVuLFxyXG4vLyBcdCdqYS1qcCc6IGphX2pwLFxyXG4vLyBcdCdrby1rcic6IGtvX2tyLFxyXG4vLyBcdCdydS1ydSc6IHJ1X3J1XHJcbi8vIH07XHJcblxyXG4vLyAvLyBjb25zdCBsb2NhbGVzID0gbW9tZW50LmxvY2FsZXMoKTtcclxuLy8gLy8gY29uc29sZS5sb2cobG9jYWxlcyk7XHJcbi8vIC8vIGNvbnNvbGUubG9nKG1vbWVudC5sb2NhbGUoKSlcclxuLy8gY29uc3QgbG9jYWxlID0gbG9jYWxlTWFwW21vbWVudC5sb2NhbGUoKV07XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdChzdHI6IGtleW9mIHR5cGVvZiB6aF9jbik6IHN0cmluZyB7XHJcbi8vIFx0cmV0dXJuIChsb2NhbGUgJiYgbG9jYWxlW3N0cl0pIHx8IHpoX2NuW3N0cl07XHJcbi8vIH1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxJQUFBQSxvQkFBa0Q7OztBQ3dCM0MsSUFBTSxtQkFBb0M7QUFBQSxFQUNoRCxhQUFhO0FB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NEJBQTRCLEtBQUssc0JBQXNCLE9BQU8sRUFBRSxvQkFBb0IsS0FBSyxzQkFBc0IsT0FBTyxFQUFFO0FBQzFJO0FBQUEsTUFDSjtBQUNJLGdCQUFRO0FBQUEsSUFDaEI7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBQ08sY0FBYyxLQUFhO0FBQzlCLFVBQU0sTUFBTSxTQUFTLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNyQyxVQUFNLElBQUssT0FBTztBQUNsQixVQUFNLElBQU0sT0FBTyxJQUFLO0FBQ3hCLFVBQU0sSUFBSyxNQUFNO0FBQ2pCLFdBQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CO0FBQUEsRUFDTyxzQkFBc0IsS0FBYSxRQUFnQjtBQUN0RCxVQUFNLE1BQU0sU0FBUyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDckMsVUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFLLE9BQU8sS0FBTSxPQUFRLE1BQU0sQ0FBQztBQUNsRSxVQUFNLElBQUksS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUssT0FBTyxJQUFLLE9BQVEsTUFBTSxDQUFDO0FBQ2pFLFVBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxNQUFNLE9BQVEsTUFBTSxDQUFDO0FBQzFELFdBQU8sTUFBTSxLQUFLLE9BQU8sS0FBSyxPQUFPLEtBQUssS0FBSyxHQUFHLFNBQVMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLFlBQVk7QUFBQSxFQUN4RjtBQUNKOzs7QURyTEEsSUFBTyxlQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpdGVtIiwgIm1wIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIl0KfQo=
