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
var import_obsidian16 = require("obsidian");

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
  Plugins: [],
  HIDES: []
};

// src/settings/index.ts
var import_obsidian14 = require("obsidian");

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
var import_obsidian9 = require("obsidian");

// src/modal/manager-modal.ts
var path2 = __toESM(require("path"));
var import_obsidian8 = require("obsidian");

// src/utils.ts
var import_obsidian = require("obsidian");
var import_child_process = require("child_process");
var import_fs = require("fs");
var path = __toESM(require("path"));
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
  constructor(app, manager, managerPlugin, managerModal) {
    super(app);
    this.settings = manager.settings;
    this.manager = manager;
    this.managerPlugin = managerPlugin;
    this.managerModal = managerModal;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-note__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian6.Setting(this.titleEl).setClass("manager-bar__title").setName(`${this.managerPlugin.name}`);
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
      this.managerModal.reloadShowData();
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

// src/modal/hide-modal.ts
var import_obsidian7 = require("obsidian");
var HideModal = class extends import_obsidian7.Modal {
  constructor(app, manager, managerModal, plugins) {
    super(app);
    // [本地][变量] 导出插件列表
    this.plugins = [];
    // 搜索内容
    this.searchText = "";
    this.delay = "";
    this.tag = "";
    this.group = "";
    this.filter = "all";
    this.appSetting = this.app.setting;
    this.appPlugins = this.app.plugins;
    this.manager = manager;
    this.managerModal = managerModal;
    this.settings = manager.settings;
    this.plugins = plugins;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-container");
    if (!this.settings.CENTER)
      modalEl.addClass("manager-container__top");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const actionBar = new import_obsidian7.Setting(this.titleEl).setClass("manager-bar__action").setName("\u9690\u85CF\u63D2\u4EF6");
    const closeButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    closeButton.setIcon("x");
    closeButton.onClick(() => {
      this.close();
    });
    const searchBar = new import_obsidian7.Setting(this.titleEl).setClass("manager-bar__search").setName(this.manager.translator.t("\u901A\u7528_\u641C\u7D22_\u6587\u672C"));
    const filterOptions = {
      "all": this.manager.translator.t("\u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0"),
      "enabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0"),
      "disabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0"),
      "grouped": this.manager.translator.t("\u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0"),
      "ungrouped": this.manager.translator.t("\u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0"),
      "tagged": this.manager.translator.t("\u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0"),
      "untagged": this.manager.translator.t("\u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0"),
      "noted": this.manager.translator.t("\u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0")
    };
    const filterDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
    filterDropdown.addOptions(filterOptions);
    filterDropdown.setValue(this.filter);
    filterDropdown.onChange((value) => {
      this.filter = value;
      this.reloadShowData();
    });
    const groupCounts = this.settings.Plugins.reduce((acc, plugin) => {
      const groupId = plugin.group || "";
      acc[groupId] = (acc[groupId] || 0) + 1;
      return acc;
    }, { "": 0 });
    const groups = this.settings.GROUPS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${groupCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C") });
    const groupsDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
    groupsDropdown.addOptions(groups);
    groupsDropdown.setValue(this.group);
    groupsDropdown.onChange((value) => {
      this.group = value;
      this.reloadShowData();
    });
    const tagCounts = this.settings.Plugins.reduce((acc, plugin) => {
      plugin.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const tags = this.settings.TAGS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${tagCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C") });
    const tagsDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
    tagsDropdown.addOptions(tags);
    tagsDropdown.setValue(this.tag);
    tagsDropdown.onChange((value) => {
      this.tag = value;
      this.reloadShowData();
    });
    if (this.settings.DELAY) {
      const delayCounts = this.settings.Plugins.reduce((acc, plugin) => {
        const delay = plugin.delay || "";
        acc[delay] = (acc[delay] || 0) + 1;
        return acc;
      }, { "": 0 });
      const delays = this.settings.DELAYS.reduce((acc, item) => {
        acc[item.id] = `${item.name} (${delayCounts[item.id] || 0})`;
        return acc;
      }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C") });
      const delaysDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
      delaysDropdown.addOptions(delays);
      delaysDropdown.setValue(this.delay || "");
      delaysDropdown.onChange((value) => {
        this.delay = value;
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
    for (const plugin of this.plugins) {
      const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
      const isEnabled = this.settings.DELAY ? ManagerPlugin == null ? void 0 : ManagerPlugin.enabled : this.appPlugins.enabledPlugins.has(plugin.id);
      if (ManagerPlugin) {
        switch (this.filter) {
          case "enabled":
            if (!isEnabled)
              continue;
            break;
          case "disabled":
            if (isEnabled)
              continue;
            break;
          case "grouped":
            if (ManagerPlugin.group === "")
              continue;
            break;
          case "ungrouped":
            if (ManagerPlugin.group !== "")
              continue;
            break;
          case "tagged":
            if (ManagerPlugin.tags.length === 0)
              continue;
            break;
          case "untagged":
            if (ManagerPlugin.tags.length > 0)
              continue;
            break;
          case "noted":
            if (!ManagerPlugin.note || ManagerPlugin.note === "")
              continue;
            break;
          default:
            break;
        }
        if (this.group !== "" && ManagerPlugin.group !== this.group)
          continue;
        if (this.tag !== "" && !ManagerPlugin.tags.includes(this.tag))
          continue;
        if (this.delay !== "" && ManagerPlugin.delay !== this.delay)
          continue;
        if (this.searchText !== "" && ManagerPlugin.name.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && ManagerPlugin.desc.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && plugin.author.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1)
          continue;
        if (plugin.id === this.manager.manifest.id)
          continue;
        const itemEl = new import_obsidian7.Setting(this.contentEl);
        itemEl.setClass("manager-item");
        itemEl.nameEl.addClass("manager-item__name-container");
        itemEl.descEl.addClass("manager-item__description-container");
        if (ManagerPlugin.group !== "") {
          const group = createSpan({ cls: "manager-item__name-group" });
          itemEl.nameEl.appendChild(group);
          const item = this.settings.GROUPS.find((t) => t.id === ManagerPlugin.group);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.GROUP_STYLE);
            group.appendChild(tag);
          }
        }
        const title = createSpan({ text: ManagerPlugin.name, cls: "manager-item__name-title" });
        itemEl.nameEl.appendChild(title);
        const version = createSpan({ text: `[${plugin.version}]`, cls: ["manager-item__name-version"] });
        itemEl.nameEl.appendChild(version);
        if (this.settings.DELAY && ManagerPlugin.delay !== "") {
          const d = this.settings.DELAYS.find((item) => item.id === ManagerPlugin.delay);
          if (d) {
            const delay = createSpan({ text: `${d.time}s`, cls: ["manager-item__name-delay"] });
            itemEl.nameEl.appendChild(delay);
          }
        }
        const desc = createDiv({ text: ManagerPlugin.desc, cls: ["manager-item__name-desc"] });
        itemEl.descEl.appendChild(desc);
        const tags = createDiv();
        itemEl.descEl.appendChild(tags);
        ManagerPlugin.tags.map((id) => {
          const item = this.settings.TAGS.find((item2) => item2.id === id);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.TAG_STYLE);
            tags.appendChild(tag);
          }
        });
        const hiddenToggle = new import_obsidian7.ToggleComponent(itemEl.controlEl);
        const isHidden = this.settings.HIDES.includes(plugin.id);
        hiddenToggle.setValue(isHidden);
        hiddenToggle.onChange((value) => {
          if (value)
            this.settings.HIDES.push(plugin.id);
          else
            this.settings.HIDES = this.settings.HIDES.filter((id) => id !== plugin.id);
          this.manager.saveSettings();
          this.managerModal.reloadShowData();
        });
      }
    }
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
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/manager-modal.ts
var ManagerModal = class extends import_obsidian8.Modal {
  constructor(app, manager) {
    super(app);
    // [本地][变量] 展示插件列表
    this.displayPlugins = [];
    this.allPlugins = [];
    // 过滤器
    this.filter = "";
    // 分组内容
    this.group = "";
    // 标签内容
    this.tag = "";
    // 标签内容
    this.delay = "";
    // 搜索内容
    this.searchText = "";
    // 编辑模式
    this.editorMode = false;
    // 测试模式
    this.developerMode = false;
    this.appSetting = this.app.setting;
    this.appPlugins = this.app.plugins;
    this.manager = manager;
    this.settings = manager.settings;
    this.basePath = path2.normalize(this.app.vault.adapter.getBasePath());
    manager.synchronizePlugins(
      Object.values(this.appPlugins.manifests).filter(
        (pm) => pm.id !== manager.manifest.id
      )
    );
  }
  async getActivePlugins() {
    const originPlugins = this.app.plugins.plugins;
    console.log(await this.processPlugins(originPlugins));
    return await this.processPlugins(originPlugins);
  }
  async processPlugins(originPlugins) {
    var _a;
    let plugins = {};
    for (let name in originPlugins) {
      try {
        let plugin = { ...originPlugins[name] };
        plugin.manifest = { ...originPlugins[name].manifest };
        plugin.manifest["pluginUrl"] = `https://obsidian.md/plugins?id=${plugin.manifest.id}`;
        plugin.manifest["author2"] = (_a = plugin.manifest.author) == null ? void 0 : _a.replace(/<.*?@.*?\..*?>/g, "").trim();
        plugin.manifest["installLink"] = `obsidian://BPM-install?id=${plugin.manifest.id}&enable=true`;
        plugins[name] = plugin;
      } catch (e) {
        console.error(name, e);
        console.log(originPlugins[name]);
        console.log(originPlugins[name].manifest);
        console.log(typeof originPlugins[name].manifest);
      }
    }
    return plugins;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-container");
    if (!this.settings.CENTER)
      modalEl.addClass("manager-container__top");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    this.footEl = document.createElement("div");
    this.footEl.addClass("manager-food");
    this.modalEl.appendChild(this.footEl);
    const actionBar = new import_obsidian8.Setting(this.titleEl).setClass("manager-bar__action").setName(this.manager.translator.t("\u901A\u7528_\u64CD\u4F5C_\u6587\u672C"));
    const githubButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    githubButton.setIcon("github");
    githubButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0"));
    githubButton.onClick(() => {
      window.open(this.manager.manifest.authorUrl);
    });
    const tutorialButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    tutorialButton.setIcon("book-open");
    tutorialButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0"));
    tutorialButton.onClick(() => {
      window.open("https://www.bilibili.com/video/BV1WyrkYMEce/");
    });
    const updateButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    updateButton.setIcon("rss");
    updateButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0"));
    updateButton.onClick(async () => {
      try {
        const result = await this.appPlugins.checkForUpdates();
        this.appSetting.open();
        this.appSetting.openTabById("community-plugins");
      } catch (error) {
        console.error("\u68C0\u67E5\u66F4\u65B0\u65F6\u51FA\u9519:", error);
      }
    });
    const hideButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    hideButton.setIcon("eye-off");
    hideButton.onClick(async () => {
      const plugins = Object.values(this.appPlugins.manifests);
      plugins.sort((item1, item2) => {
        return item1.name.localeCompare(item2.name);
      });
      new HideModal(this.app, this.manager, this, plugins).open();
    });
    const reloadButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    reloadButton.setIcon("refresh-ccw");
    reloadButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0"));
    reloadButton.onClick(async () => {
      new import_obsidian8.Notice("\u91CD\u65B0\u52A0\u8F7D\u7B2C\u4E09\u65B9\u63D2\u4EF6");
      await this.appPlugins.loadManifests();
      this.reloadShowData();
    });
    const disableButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    disableButton.setIcon("square");
    disableButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0"));
    disableButton.onClick(async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (this.settings.DELAY) {
            const ManagerPlugin = this.settings.Plugins.find((p) => p.id === plugin.id);
            if (ManagerPlugin && ManagerPlugin.enabled) {
              await this.appPlugins.disablePlugin(plugin.id);
              ManagerPlugin.enabled = false;
              this.manager.saveSettings();
              this.reloadShowData();
            }
          } else {
            if (this.appPlugins.enabledPlugins.has(plugin.id)) {
              await this.appPlugins.disablePluginAndSave(plugin.id);
              this.reloadShowData();
            }
          }
          command_default(this.app, this.manager);
        }
      }).open();
    });
    const enableButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    enableButton.setIcon("square-check");
    enableButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0"));
    enableButton.onClick(async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (this.settings.DELAY) {
            const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
            if (ManagerPlugin && !ManagerPlugin.enabled) {
              await this.appPlugins.enablePlugin(plugin.id);
              ManagerPlugin.enabled = true;
              this.manager.saveSettings();
              this.reloadShowData();
            }
          } else {
            if (!this.appPlugins.enabledPlugins.has(plugin.id)) {
              await this.appPlugins.enablePluginAndSave(plugin.id);
              this.reloadShowData();
            }
          }
          command_default(this.app, this.manager);
        }
      }).open();
    });
    const editorButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
    editorButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0"));
    editorButton.onClick(() => {
      this.editorMode = !this.editorMode;
      this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
      this.reloadShowData();
    });
    const settingsButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    settingsButton.setIcon("settings");
    settingsButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0"));
    settingsButton.onClick(() => {
      this.appSetting.open();
      this.appSetting.openTabById(this.manager.manifest.id);
    });
    if (this.developerMode) {
      const testButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
      testButton.setIcon("refresh-ccw");
      testButton.setTooltip("\u5237\u65B0\u63D2\u4EF6");
      testButton.onClick(async () => {
        this.close();
        await this.appPlugins.disablePlugin(this.manager.manifest.id);
        await this.appPlugins.enablePlugin(this.manager.manifest.id);
      });
    }
    if (this.developerMode) {
      const testButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
      testButton.setIcon("test-tube");
      testButton.setTooltip("\u6D4B\u8BD5\u63D2\u4EF6");
      testButton.onClick(async () => {
      });
    }
    const searchBar = new import_obsidian8.Setting(this.titleEl).setClass("manager-bar__search").setName(this.manager.translator.t("\u901A\u7528_\u641C\u7D22_\u6587\u672C"));
    const filterOptions = {
      "all": this.manager.translator.t("\u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0"),
      "enabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0"),
      "disabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0"),
      "grouped": this.manager.translator.t("\u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0"),
      "ungrouped": this.manager.translator.t("\u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0"),
      "tagged": this.manager.translator.t("\u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0"),
      "untagged": this.manager.translator.t("\u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0"),
      "noted": this.manager.translator.t("\u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0")
    };
    const filterDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
    filterDropdown.addOptions(filterOptions);
    filterDropdown.setValue(this.filter || "all");
    filterDropdown.onChange((value) => {
      this.filter = value;
      this.reloadShowData();
    });
    const groupCounts = this.settings.Plugins.reduce((acc, plugin) => {
      const groupId = plugin.group || "";
      acc[groupId] = (acc[groupId] || 0) + 1;
      return acc;
    }, { "": 0 });
    const groups = this.settings.GROUPS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${groupCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C") });
    const groupsDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
    groupsDropdown.addOptions(groups);
    groupsDropdown.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_GROUP : this.group);
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
    const tags = this.settings.TAGS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${tagCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C") });
    const tagsDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
    tagsDropdown.addOptions(tags);
    tagsDropdown.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_TAG : this.tag);
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
      const delayCounts = this.settings.Plugins.reduce((acc, plugin) => {
        const delay = plugin.delay || "";
        acc[delay] = (acc[delay] || 0) + 1;
        return acc;
      }, { "": 0 });
      const delays = this.settings.DELAYS.reduce((acc, item) => {
        acc[item.id] = `${item.name} (${delayCounts[item.id] || 0})`;
        return acc;
      }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C") });
      const delaysDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
      delaysDropdown.addOptions(delays);
      delaysDropdown.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_DELAY : this.delay);
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
    this.searchEl = new import_obsidian8.SearchComponent(searchBar.controlEl);
    this.searchEl.onChange((value) => {
      this.searchText = value;
      this.reloadShowData();
    });
  }
  async showData() {
    var _a;
    const plugins = Object.values(this.appPlugins.manifests);
    plugins.sort((item1, item2) => {
      return item1.name.localeCompare(item2.name);
    });
    this.displayPlugins = [];
    for (const plugin of plugins) {
      const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
      const pluginDir = path2.join(this.basePath, plugin.dir ? plugin.dir : "");
      const isEnabled = this.settings.DELAY ? ManagerPlugin == null ? void 0 : ManagerPlugin.enabled : this.appPlugins.enabledPlugins.has(plugin.id);
      if (ManagerPlugin) {
        switch (this.filter) {
          case "enabled":
            if (!isEnabled)
              continue;
            break;
          case "disabled":
            if (isEnabled)
              continue;
            break;
          case "grouped":
            if (ManagerPlugin.group === "")
              continue;
            break;
          case "ungrouped":
            if (ManagerPlugin.group !== "")
              continue;
            break;
          case "tagged":
            if (ManagerPlugin.tags.length === 0)
              continue;
            break;
          case "untagged":
            if (ManagerPlugin.tags.length > 0)
              continue;
            break;
          case "noted":
            if (!ManagerPlugin.note || ManagerPlugin.note === "")
              continue;
            break;
          default:
            break;
        }
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
        if (this.settings.HIDES.includes(plugin.id))
          continue;
        if (plugin.id === this.manager.manifest.id)
          continue;
        const itemEl = new import_obsidian8.Setting(this.contentEl);
        itemEl.setClass("manager-item");
        itemEl.nameEl.addClass("manager-item__name-container");
        itemEl.descEl.addClass("manager-item__description-container");
        itemEl.settingEl.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          const menu = new import_obsidian8.Menu();
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_GitHub_\u6807\u9898")).setIcon("github").onClick(() => {
              window.open(`obsidian://BPM-plugin-github?id=${plugin.id}`);
            })
          );
          menu.addSeparator();
          if (!this.settings.DELAY)
            menu.addItem(
              (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0")).setIcon("repeat-1").setDisabled(isEnabled).onClick(async () => {
                new import_obsidian8.Notice("\u5F00\u542F\u4E2D\uFF0C\u8BF7\u7A0D\u7B49");
                await this.appPlugins.enablePlugin(plugin.id);
                await this.reloadShowData();
              })
            );
          if (!this.settings.DELAY)
            menu.addItem(
              (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0")).setIcon("refresh-ccw").setDisabled(!isEnabled).onClick(async () => {
                new import_obsidian8.Notice("\u91CD\u542F\u4E2D\uFF0C\u8BF7\u7A0D\u7B49");
                await this.appPlugins.disablePluginAndSave(plugin.id);
                await this.appPlugins.enablePluginAndSave(plugin.id);
                await this.reloadShowData();
              })
            );
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898")).setIcon("eye-off").onClick(() => {
              const isHidden = this.settings.HIDES.includes(plugin.id);
              if (isHidden) {
                this.settings.HIDES = this.settings.HIDES.filter((id) => id !== plugin.id);
              } else {
                this.settings.HIDES.push(plugin.id);
              }
              this.manager.saveSettings();
              this.reloadShowData();
            })
          );
          menu.addSeparator();
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u7B14\u8BB0_\u6807\u9898")).setIcon("notebook-pen").onClick(() => {
              new NoteModal(this.app, this.manager, ManagerPlugin, this).open();
            })
          );
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898")).setIcon("circle-plus").onClick(async () => {
              await this.appSetting.open();
              await this.appSetting.openTabById("hotkeys");
              const tab = await this.appSetting.activeTab;
              tab.searchComponent.inputEl.value = plugin.id;
              tab.updateHotkeyVisibility();
              tab.searchComponent.inputEl.blur();
            })
          );
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u590D\u5236ID_\u6807\u9898")).setIcon("copy").onClick(() => {
              navigator.clipboard.writeText(plugin.id);
              new import_obsidian8.Notice(this.manager.translator.t("\u901A\u77E5_ID\u5DF2\u590D\u5236"));
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
                  itemEl.descEl.removeClass("manager-display-none");
                  itemEl.descEl.addClass("manager-display-block");
                }
              );
              itemEl.settingEl.addEventListener(
                "mouseleave",
                () => {
                  itemEl.descEl.removeClass("manager-display-block");
                  itemEl.descEl.addClass("manager-display-none");
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
                  if (itemEl.descEl.hasClass("manager-display-none")) {
                    itemEl.descEl.removeClass("manager-display-none");
                    itemEl.descEl.addClass("manager-display-block");
                  } else {
                    itemEl.descEl.removeClass("manager-display-block");
                    itemEl.descEl.addClass("manager-display-none");
                  }
                }
              );
              break;
          }
        }
        if (ManagerPlugin.group !== "") {
          const group = createSpan({ cls: "manager-item__name-group" });
          itemEl.nameEl.appendChild(group);
          const item = this.settings.GROUPS.find((t) => t.id === ManagerPlugin.group);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.GROUP_STYLE);
            if (this.editorMode)
              tag.onclick = () => {
                new GroupModal(this.app, this.manager, this, ManagerPlugin).open();
              };
            group.appendChild(tag);
          }
        }
        if (ManagerPlugin.group === "" && this.editorMode) {
          const group = createSpan({ cls: "manager-item__name-group" });
          if (this.editorMode)
            itemEl.nameEl.appendChild(group);
          const tag = this.manager.createTag("+", "", "");
          if (this.editorMode)
            tag.onclick = () => {
              new GroupModal(this.app, this.manager, this, ManagerPlugin).open();
            };
          if (this.editorMode)
            group.appendChild(tag);
        }
        const title = createSpan({ text: ManagerPlugin.name, title: plugin.name, cls: "manager-item__name-title" });
        if (this.editorMode) {
          title.setAttribute("style", "border-width: 1px;border-style: dashed;");
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
        const version = createSpan({ text: `[${plugin.version}]`, cls: ["manager-item__name-version"] });
        itemEl.nameEl.appendChild(version);
        if (((_a = ManagerPlugin.note) == null ? void 0 : _a.length) > 0) {
          const note = createSpan();
          note.style.cssText = "width:16px; height:16px; display:inline-flex; color: var(--text-accent);";
          note.addEventListener("click", () => {
            new NoteModal(this.app, this.manager, ManagerPlugin, this).open();
          });
          itemEl.nameEl.appendChild(note);
          (0, import_obsidian8.setIcon)(note, "notebook-pen");
        }
        if (this.settings.DELAY && !this.editorMode && ManagerPlugin.delay !== "") {
          const d = this.settings.DELAYS.find((item) => item.id === ManagerPlugin.delay);
          if (d) {
            const delay = createSpan({ text: `${d.time}s`, cls: ["manager-item__name-delay"] });
            itemEl.nameEl.appendChild(delay);
          }
        }
        const desc = createDiv({ text: ManagerPlugin.desc, title: plugin.description, cls: ["manager-item__name-desc"] });
        if (this.editorMode) {
          desc.setAttribute("style", "border-width: 1px;border-style: dashed");
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
          const item = this.settings.TAGS.find((item2) => item2.id === id);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.TAG_STYLE);
            if (this.editorMode)
              tag.onclick = () => {
                new TagsModal(this.app, this.manager, this, ManagerPlugin).open();
              };
            tags.appendChild(tag);
          }
        });
        if (this.editorMode) {
          const tag = this.manager.createTag("+", "", "");
          tag.onclick = () => {
            new TagsModal(this.app, this.manager, this, ManagerPlugin).open();
          };
          tags.appendChild(tag);
        }
        if (!this.editorMode) {
          if (isEnabled) {
            const openPluginSetting = new import_obsidian8.ExtraButtonComponent(itemEl.controlEl);
            openPluginSetting.setIcon("settings");
            openPluginSetting.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0"));
            openPluginSetting.onClick(() => {
              openPluginSetting.setDisabled(true);
              this.appSetting.open();
              this.appSetting.openTabById(plugin.id);
              openPluginSetting.setDisabled(false);
            });
          }
          const openPluginDirButton = new import_obsidian8.ExtraButtonComponent(itemEl.controlEl);
          openPluginDirButton.setIcon("folder-open");
          openPluginDirButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0"));
          openPluginDirButton.onClick(() => {
            openPluginDirButton.setDisabled(true);
            managerOpen(pluginDir, this.manager);
            openPluginDirButton.setDisabled(false);
          });
          const deletePluginButton = new import_obsidian8.ExtraButtonComponent(itemEl.controlEl);
          deletePluginButton.setIcon("trash");
          deletePluginButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0"));
          deletePluginButton.onClick(async () => {
            new DeleteModal(this.app, this.manager, async () => {
              await this.appPlugins.uninstallPlugin(plugin.id);
              await this.appPlugins.loadManifests();
              this.reloadShowData();
              command_default(this.app, this.manager);
              this.manager.synchronizePlugins(Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manager.manifest.id));
              new import_obsidian8.Notice(this.manager.translator.t("\u5378\u8F7D_\u901A\u77E5_\u4E00"));
            }).open();
          });
          const toggleSwitch = new import_obsidian8.ToggleComponent(itemEl.controlEl);
          toggleSwitch.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0"));
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
                await this.appPlugins.enablePluginAndSave(plugin.id);
              } else {
                if (this.settings.FADE_OUT_DISABLED_PLUGINS)
                  itemEl.settingEl.addClass("inactive");
                await this.appPlugins.disablePluginAndSave(plugin.id);
              }
            }
            command_default(this.app, this.manager);
            this.reloadShowData();
          });
        }
        if (this.editorMode) {
          const reloadButton = new import_obsidian8.ExtraButtonComponent(itemEl.controlEl);
          reloadButton.setIcon("refresh-ccw");
          reloadButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0"));
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
            const delays = this.settings.DELAYS.reduce((acc, item) => {
              acc[item.id] = item.name;
              return acc;
            }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C") });
            const delaysEl = new import_obsidian8.DropdownComponent(itemEl.controlEl);
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
  main() {
    const languageBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0"));
    const languageDropdown = new import_obsidian9.DropdownComponent(languageBar.controlEl);
    languageDropdown.addOptions(this.manager.translator.language);
    languageDropdown.setValue(this.settings.LANGUAGE);
    languageDropdown.onChange((value) => {
      this.settings.LANGUAGE = value;
      this.manager.saveSettings();
      this.settingTab.basisDisplay();
      command_default(this.app, this.manager);
      this.settingTab.display();
      this.display();
    });
    const DelayBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0"));
    const DelayToggle = new import_obsidian9.ToggleComponent(DelayBar.controlEl);
    DelayToggle.setValue(this.settings.DELAY);
    DelayToggle.onChange((value) => {
      this.settings.DELAY = value;
      this.manager.saveSettings();
      value ? this.manager.enableDelaysForAllPlugins() : this.manager.disableDelaysForAllPlugins();
      this.settingTab.display();
      this.display();
    });
    const persistenceBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0"));
    const persistenceToggle = new import_obsidian9.ToggleComponent(persistenceBar.controlEl);
    persistenceToggle.setValue(this.settings.PERSISTENCE);
    persistenceToggle.onChange((value) => {
      this.settings.PERSISTENCE = value;
      this.manager.saveSettings();
    });
    const CommandItemBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandItemToggle = new import_obsidian9.ToggleComponent(CommandItemBar.controlEl);
    CommandItemToggle.setValue(this.settings.COMMAND_ITEM);
    CommandItemToggle.onChange((value) => {
      this.settings.COMMAND_ITEM = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    const CommandGroupBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandGroupToggle = new import_obsidian9.ToggleComponent(CommandGroupBar.controlEl);
    CommandGroupToggle.setValue(this.settings.COMMAND_GROUP);
    CommandGroupToggle.onChange((value) => {
      this.settings.COMMAND_GROUP = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0"));
  }
};

// src/settings/ui/manager-style.ts
var import_obsidian10 = require("obsidian");
var ManagerBasis2 = class extends BaseSetting {
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
    const itemStyleBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0"));
    const itemStyleDropdown = new import_obsidian10.DropdownComponent(itemStyleBar.controlEl);
    itemStyleDropdown.addOptions(this.ITEM_STYLE);
    itemStyleDropdown.setValue(this.settings.ITEM_STYLE);
    itemStyleDropdown.onChange((value) => {
      this.settings.ITEM_STYLE = value;
      this.manager.saveSettings();
    });
    const groupStyleBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0"));
    const groupStyleDropdown = new import_obsidian10.DropdownComponent(groupStyleBar.controlEl);
    groupStyleDropdown.addOptions(this.GROUP_STYLE);
    groupStyleDropdown.setValue(this.settings.GROUP_STYLE);
    groupStyleDropdown.onChange((value) => {
      this.settings.GROUP_STYLE = value;
      this.manager.saveSettings();
    });
    const tagStyleBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0"));
    const tagStyleDropdown = new import_obsidian10.DropdownComponent(tagStyleBar.controlEl);
    tagStyleDropdown.addOptions(this.TAG_STYLE);
    tagStyleDropdown.setValue(this.settings.TAG_STYLE);
    tagStyleDropdown.onChange((value) => {
      this.settings.TAG_STYLE = value;
      this.manager.saveSettings();
    });
    const topBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0"));
    const topToggle = new import_obsidian10.ToggleComponent(topBar.controlEl);
    topToggle.setValue(this.settings.CENTER);
    topToggle.onChange((value) => {
      this.settings.CENTER = value;
      this.manager.saveSettings();
    });
    const fadeOutDisabledPluginsBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0"));
    const fadeOutDisabledPluginsToggle = new import_obsidian10.ToggleComponent(fadeOutDisabledPluginsBar.controlEl);
    fadeOutDisabledPluginsToggle.setValue(this.settings.FADE_OUT_DISABLED_PLUGINS);
    fadeOutDisabledPluginsToggle.onChange((value) => {
      this.settings.FADE_OUT_DISABLED_PLUGINS = value;
      this.manager.saveSettings();
    });
  }
};

// src/settings/ui/manager-delay.ts
var import_obsidian11 = require("obsidian");
var ManagerDelay = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let time = 0;
    new import_obsidian11.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addSlider(
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
          new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.DELAYS.forEach((delay, index) => {
      const item = new import_obsidian11.Setting(this.containerEl);
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
            new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
    });
  }
};

// src/settings/ui/manager-tag.ts
var import_obsidian12 = require("obsidian");
var ManagerTag = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let color = "";
    new import_obsidian12.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addColorPicker(
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
          new import_obsidian12.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian12.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.TAGS.forEach((tag, index) => {
      const item = new import_obsidian12.Setting(this.containerEl);
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
            new import_obsidian12.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian12.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
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
var import_obsidian13 = require("obsidian");
var ManagerGroup = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let color = "";
    new import_obsidian13.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addColorPicker(
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
          new import_obsidian13.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian13.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.GROUPS.forEach((group, index) => {
      const item = new import_obsidian13.Setting(this.containerEl);
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
            new import_obsidian13.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian13.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
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
var ManagerSettingTab = class extends import_obsidian14.PluginSettingTab {
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
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.styleDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.groupDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.tagDisplay() }
    ];
    if (this.manager.settings.DELAY)
      tabItems.push({ text: this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.delayDisplay() });
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
  styleDisplay() {
    this.contentEl.empty();
    new ManagerBasis2(this).display();
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
  \u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0: "\u5355\u6B21\u542F\u52A8",
  \u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0: "\u91CD\u542F\u63D2\u4EF6",
  \u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898: "\u9690\u85CF\u63D2\u4EF6",
  \u83DC\u5355_\u590D\u5236ID_\u6807\u9898: "\u590D\u5236ID",
  \u901A\u77E5_ID\u5DF2\u590D\u5236: "ID\u5DF2\u590D\u5236",
  \u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0: "\u5168\u90E8",
  \u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u4EC5\u542F\u7528",
  \u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0: "\u4EC5\u7981\u7528",
  \u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0: "\u5DF2\u5206\u7EC4",
  \u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0: "\u672A\u5206\u7EC4",
  \u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0: "\u6709\u6807\u7B7E",
  \u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0: "\u65E0\u6807\u7B7E",
  \u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0: "\u6709\u7B14\u8BB0",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u57FA\u7840",
  \u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00: "\u6837\u5F0F",
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
  \u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0: "Single start",
  \u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0: "Restart plugin",
  \u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0: "All",
  \u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Enabled only",
  \u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0: "Disabled only",
  \u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0: "Grouped",
  \u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0: "Ungrouped",
  \u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0: "With tags",
  \u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0: "Without tags",
  \u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0: "With notes",
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
  \u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00: "Style",
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

// src/agreement.ts
var import_obsidian15 = require("obsidian");
var Agreement = class {
  /**
   * 构造函数，初始化插件安装器
   * @param SMPL - ShareMyPlugin 实例
   */
  constructor(SMPL) {
    // 标记是否已经加载了社区插件列表
    this.loaded = false;
    // 防抖函数，用于定时刷新社区插件列表，每小时执行一次
    this.debounceFetch = (0, import_obsidian15.debounce)(async () => {
      await this.fetchCommunityPlugins();
    }, 1e3 * 60 * 60);
    this.plugin = SMPL;
    this.fetchCommunityPlugins();
  }
  /**
   * 从远程获取社区插件列表，并将其转换为以插件 ID 为键的对象
   */
  async fetchCommunityPlugins() {
    const pluginList = await fetch(`https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json`).then((r) => r.json());
    const keyedPluginList = {};
    for (const item of pluginList)
      keyedPluginList[item.id] = item;
    this.communityPlugins = keyedPluginList;
    this.loaded = true;
  }
  /**
   * 获取指定的插件
   * @param id - 要获取的插件的 ID
   */
  async pluginGithub(id) {
    if (!this.loaded) {
      await this.fetchCommunityPlugins();
    }
    const pluginInfo = this.communityPlugins[id];
    if (!pluginInfo) {
      new import_obsidian15.Notice(`[\u63D2\u4EF6\u7BA1\u7406\u5668] \u672A\u77E5\u63D2\u4EF6ID: ${id}`);
      return null;
    }
    window.open(`https://github.com/${pluginInfo.repo}`);
  }
  /**
   * 安装指定的插件
   * @param id - 要安装的插件的 ID
   * @param version - 要安装的插件的版本，默认为空字符串，表示不检查版本
   * @param enable - 安装后是否启用插件，默认为 false
   * @param github - 插件的 GitHub 仓库地址，默认为空字符串
   */
  async pluginInstall(id, version = "", enable = false, github = "") {
    var _a, _b;
    if (!this.loaded)
      await this.fetchCommunityPlugins();
    else
      this.debounceFetch();
    const pluginRegistry = this.plugin.app.plugins;
    let installFlag = false;
    const repo = github !== "" ? github : (_a = this.communityPlugins[id]) == null ? void 0 : _a.repo;
    console.log(repo);
    if (!repo) {
      new import_obsidian15.Notice(`[\u63D2\u4EF6\u7BA1\u7406\u5668] \u672A\u77E5\u63D2\u4EF6ID: ${id}`);
      return;
    }
    if (pluginRegistry.manifests[id]) {
      new import_obsidian15.Notice(`[\u63D2\u4EF6\u7BA1\u7406\u5668] \u63D2\u4EF6 ${pluginRegistry.manifests[id].name} \u5DF2\u5B89\u88C5`);
      if (version !== "" && version !== ((_b = pluginRegistry.manifests[id]) == null ? void 0 : _b.version))
        installFlag = true;
    } else {
      installFlag = true;
    }
    if (installFlag) {
      const manifest = await fetch(`https://raw.githubusercontent.com/${repo}/HEAD/manifest.json`).then((r) => r.json());
      if (version.toLowerCase() === "latest" || version === "")
        version = manifest.version;
      await pluginRegistry.installPlugin(repo, version, manifest);
    }
    if (enable) {
      await pluginRegistry.loadPlugin(id);
      await pluginRegistry.enablePluginAndSave(id);
    } else {
      await pluginRegistry.disablePlugin(id);
    }
  }
  /**
   * 解析安装参数并调用 installPlugin 方法安装插件
   * @param params - 包含插件安装参数的对象
   */
  async parsePluginInstall(params) {
    var _a, _b;
    let args = {
      id: params.id,
      version: (_a = params == null ? void 0 : params.version) != null ? _a : "",
      enable: ["", "true", "1"].includes(params.enable.toLowerCase()),
      github: (_b = params.github) != null ? _b : ""
    };
    this.pluginInstall(args.id, args.version, args.enable);
  }
  /**
   * 解析包含插件信息的字符串或对象，获取插件的相关信息
   * @param input - 包含插件信息的字符串或对象
   * @return - 返回解析后的插件信息对象，如果解析失败则返回 null
   */
  async parsePluginGithub(params) {
    let args = { id: params.id };
    await this.pluginGithub(args.id);
  }
};

// src/main.ts
var Manager = class extends import_obsidian16.Plugin {
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
    this.agreement = new Agreement(this);
    this.registerObsidianProtocolHandler("BPM-plugin-install", async (params) => {
      await this.agreement.parsePluginInstall(params);
    });
    this.registerObsidianProtocolHandler("BPM-plugin-github", async (params) => {
      await this.agreement.parsePluginGithub(params);
    });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyIsICJzcmMvbWFpbi50cyIsICJzcmMvc2V0dGluZ3MvZGF0YS50cyIsICJzcmMvc2V0dGluZ3MvaW5kZXgudHMiLCAic3JjL3NldHRpbmdzL2Jhc2Utc2V0dGluZy50cyIsICJzcmMvc2V0dGluZ3MvdWkvbWFuYWdlci1iYXNpcy50cyIsICJzcmMvbW9kYWwvbWFuYWdlci1tb2RhbC50cyIsICJzcmMvdXRpbHMudHMiLCAic3JjL21vZGFsL2dyb3VwLW1vZGFsLnRzIiwgInNyYy9tb2RhbC90YWdzLW1vZGFsLnRzIiwgInNyYy9tb2RhbC9kZWxldGUtbW9kYWwudHMiLCAic3JjL21vZGFsL2Rpc2FibGUtbW9kYWwudHMiLCAic3JjL21vZGFsL25vdGUtbW9kYWwudHMiLCAic3JjL21vZGFsL2hpZGUtbW9kYWwudHMiLCAic3JjL2NvbW1hbmQudHMiLCAic3JjL3NldHRpbmdzL3VpL21hbmFnZXItc3R5bGUudHMiLCAic3JjL3NldHRpbmdzL3VpL21hbmFnZXItZGVsYXkudHMiLCAic3JjL3NldHRpbmdzL3VpL21hbmFnZXItdGFnLnRzIiwgInNyYy9zZXR0aW5ncy91aS9tYW5hZ2VyLWdyb3VwLnRzIiwgInNyYy9sYW5nL2xvY2FsZS96aF9jbi50cyIsICJzcmMvbGFuZy9sb2NhbGUvZW4udHMiLCAic3JjL2xhbmcvbG9jYWxlL3J1LnRzIiwgInNyYy9sYW5nL2xvY2FsZS9qYS50cyIsICJzcmMvbGFuZy9sb2NhbGUva28udHMiLCAic3JjL2xhbmcvbG9jYWxlL2ZyLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9lcy50cyIsICJzcmMvbGFuZy9pbnhkZXgudHMiLCAic3JjL2FncmVlbWVudC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IE1hbmFnZXIgZnJvbSAnLi9zcmMvbWFpbidcblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlclxuIiwgImltcG9ydCB7IE9ic2lkaWFuUHJvdG9jb2xEYXRhLCBQbHVnaW4sIFBsdWdpbk1hbmlmZXN0LCBXb3Jrc3BhY2UgfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IERFRkFVTFRfU0VUVElOR1MsIE1hbmFnZXJTZXR0aW5ncyB9IGZyb20gJy4vc2V0dGluZ3MvZGF0YSc7XHJcbmltcG9ydCB7IE1hbmFnZXJTZXR0aW5nVGFiIH0gZnJvbSAnLi9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0b3IgfSBmcm9tICcuL2xhbmcvaW54ZGV4JztcclxuaW1wb3J0IHsgTWFuYWdlck1vZGFsIH0gZnJvbSAnLi9tb2RhbC9tYW5hZ2VyLW1vZGFsJztcclxuaW1wb3J0IENvbW1hbmRzIGZyb20gJy4vY29tbWFuZCc7XHJcbmltcG9ydCBBZ3JlZW1lbnQgZnJvbSAnc3JjL2FncmVlbWVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyIGV4dGVuZHMgUGx1Z2luIHtcclxuICAgIHB1YmxpYyBzZXR0aW5nczogTWFuYWdlclNldHRpbmdzO1xyXG4gICAgcHVibGljIG1hbmFnZXJNb2RhbDogTWFuYWdlck1vZGFsO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIHB1YmxpYyBhcHBQbHVnaW5zOiBhbnk7XHJcbiAgICBwdWJsaWMgYXBwV29ya3NwYWNlOiBXb3Jrc3BhY2U7XHJcbiAgICBwdWJsaWMgdHJhbnNsYXRvcjogVHJhbnNsYXRvcjtcclxuXHJcbiAgICBwdWJsaWMgYWdyZWVtZW50OiBBZ3JlZW1lbnQ7XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG9ubG9hZCgpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5hcHBQbHVnaW5zID0gdGhpcy5hcHAucGx1Z2lucztcclxuICAgICAgICB0aGlzLmFwcFdvcmtzcGFjZSA9IHRoaXMuYXBwLndvcmtzcGFjZTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYCVjICR7dGhpcy5tYW5pZmVzdC5uYW1lfSAlYyB2JHt0aGlzLm1hbmlmZXN0LnZlcnNpb259IGAsIGBwYWRkaW5nOiAycHg7IGJvcmRlci1yYWRpdXM6IDJweCAwIDAgMnB4OyBjb2xvcjogI2ZmZjsgYmFja2dyb3VuZDogIzVCNUI1QjtgLCBgcGFkZGluZzogMnB4OyBib3JkZXItcmFkaXVzOiAwIDJweCAycHggMDsgY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6ICM0MDlFRkY7YCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuICAgICAgICAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdThCRURcdThBMDBcdTdDRkJcdTdFREZcclxuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBuZXcgVHJhbnNsYXRvcih0aGlzKTtcclxuICAgICAgICAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdTRGQTdcdThGQjlcdTY4MEZcdTU2RkVcdTY4MDdcclxuICAgICAgICB0aGlzLmFkZFJpYmJvbkljb24oJ2ZvbGRlci1jb2cnLCB0aGlzLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkMnKSwgKCkgPT4geyB0aGlzLm1hbmFnZXJNb2RhbCA9IG5ldyBNYW5hZ2VyTW9kYWwodGhpcy5hcHAsIHRoaXMpOyB0aGlzLm1hbmFnZXJNb2RhbC5vcGVuKCk7IH0pO1xyXG4gICAgICAgIC8vIFx1NTIxRFx1NTlDQlx1NTMxNlx1OEJCRVx1N0Y2RVx1NzU0Q1x1OTc2MlxyXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgTWFuYWdlclNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLkRFTEFZID8gdGhpcy5lbmFibGVEZWxheSgpIDogdGhpcy5kaXNhYmxlRGVsYXkoKTtcclxuICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWdyZWVtZW50ID0gbmV3IEFncmVlbWVudCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3Rlck9ic2lkaWFuUHJvdG9jb2xIYW5kbGVyKFwiQlBNLXBsdWdpbi1pbnN0YWxsXCIsIGFzeW5jIChwYXJhbXM6IE9ic2lkaWFuUHJvdG9jb2xEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWdyZWVtZW50LnBhcnNlUGx1Z2luSW5zdGFsbChwYXJhbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJPYnNpZGlhblByb3RvY29sSGFuZGxlcihcIkJQTS1wbHVnaW4tZ2l0aHViXCIsIGFzeW5jIChwYXJhbXM6IE9ic2lkaWFuUHJvdG9jb2xEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWdyZWVtZW50LnBhcnNlUGx1Z2luR2l0aHViKHBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG9udW5sb2FkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZKSB0aGlzLmRpc2FibGVEZWxheXNGb3JBbGxQbHVnaW5zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxvYWRTZXR0aW5ncygpIHsgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7IH1cclxuICAgIHB1YmxpYyBhc3luYyBzYXZlU2V0dGluZ3MoKSB7IGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7IH1cclxuXHJcbiAgICAvLyBcdTUxNzNcdTk1RURcdTVFRjZcdTY1RjYgXHU4QzAzXHU3NTI4XHJcbiAgICBwdWJsaWMgZGlzYWJsZURlbGF5KCkge1xyXG4gICAgICAgIGNvbnN0IHBsdWdpbnMgPSBPYmplY3QudmFsdWVzKHRoaXMuYXBwUGx1Z2lucy5tYW5pZmVzdHMpLmZpbHRlcigocG06IFBsdWdpbk1hbmlmZXN0KSA9PiBwbS5pZCAhPT0gdGhpcy5tYW5pZmVzdC5pZCkgYXMgUGx1Z2luTWFuaWZlc3RbXTtcclxuICAgICAgICB0aGlzLnN5bmNocm9uaXplUGx1Z2lucyhwbHVnaW5zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBcdTVGMDBcdTU0MkZcdTVFRjZcdTY1RjYgXHU4QzAzXHU3NTI4XHJcbiAgICBwdWJsaWMgZW5hYmxlRGVsYXkoKSB7XHJcbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cykuZmlsdGVyKChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHBtLmlkICE9PSB0aGlzLm1hbmlmZXN0LmlkKSBhcyBQbHVnaW5NYW5pZmVzdFtdO1xyXG4gICAgICAgIC8vIFx1NTQwQ1x1NkI2NVx1NjNEMlx1NEVGNlxyXG4gICAgICAgIHRoaXMuc3luY2hyb25pemVQbHVnaW5zKHBsdWdpbnMpO1xyXG4gICAgICAgIC8vIFx1NUYwMFx1NTlDQlx1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOFx1NjNEMlx1NEVGNlxyXG4gICAgICAgIHBsdWdpbnMuZm9yRWFjaCgocGx1Z2luOiBQbHVnaW5NYW5pZmVzdCkgPT4gdGhpcy5zdGFydFBsdWdpbldpdGhEZWxheShwbHVnaW4uaWQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBcdTRFM0FcdTYyNDBcdTY3MDlcdTYzRDJcdTRFRjZcdTU0MkZcdTUyQThcdTVFRjZcdThGREZcclxuICAgIHB1YmxpYyBlbmFibGVEZWxheXNGb3JBbGxQbHVnaW5zKCkge1xyXG4gICAgICAgIC8vIFx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNlxyXG4gICAgICAgIGNvbnN0IHBsdWdpbnMgPSBPYmplY3QudmFsdWVzKHRoaXMuYXBwUGx1Z2lucy5tYW5pZmVzdHMpLmZpbHRlcigocG06IFBsdWdpbk1hbmlmZXN0KSA9PiBwbS5pZCAhPT0gdGhpcy5tYW5pZmVzdC5pZCkgYXMgUGx1Z2luTWFuaWZlc3RbXTtcclxuICAgICAgICAvLyBcdTU0MENcdTZCNjVcdTYzRDJcdTRFRjZcclxuICAgICAgICB0aGlzLnN5bmNocm9uaXplUGx1Z2lucyhwbHVnaW5zKTtcclxuXHJcbiAgICAgICAgcGx1Z2lucy5mb3JFYWNoKGFzeW5jIChwbHVnaW46IFBsdWdpbk1hbmlmZXN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFx1NjNEMlx1NEVGNlx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAgICBjb25zdCBpc0VuYWJsZWQgPSB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlZFBsdWdpbnMuaGFzKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgIGlmIChpc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIDEuIFx1NTE3M1x1OTVFRFx1NjNEMlx1NEVGNlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAvLyAyLiBcdTVGMDBcdTU0MkZcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW4ocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgIC8vIDMuIFx1NTIwN1x1NjM2Mlx1OTE0RFx1N0Y2RVx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbXAgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuZmluZChwID0+IHAuaWQgPT09IHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXApIG1wLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gNC4gXHU0RkREXHU1QjU4XHU3MkI2XHU2MDAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gMS4gXHU1MjA3XHU2MzYyXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtcCA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5maW5kKHAgPT4gcC5pZCA9PT0gcGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChtcCkgbXAuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gMi4gXHU0RkREXHU1QjU4XHU3MkI2XHU2MDAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU0RTNBXHU2MjQwXHU2NzA5XHU2M0QyXHU0RUY2XHU1MTczXHU5NUVEXHU1RUY2XHU4RkRGXHJcbiAgICBwdWJsaWMgZGlzYWJsZURlbGF5c0ZvckFsbFBsdWdpbnMoKSB7XHJcbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cykuZmlsdGVyKChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHBtLmlkICE9PSB0aGlzLm1hbmlmZXN0LmlkKTtcclxuICAgICAgICBwbHVnaW5zLmZvckVhY2goYXN5bmMgKHBtOiBQbHVnaW5NYW5pZmVzdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuZmluZChwID0+IHAuaWQgPT09IHBtLmlkKVxyXG4gICAgICAgICAgICBpZiAocGx1Z2luKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGx1Z2luLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbihwbS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbkFuZFNhdmUocG0uaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4XHU2MzA3XHU1QjlBXHU2M0QyXHU0RUY2XHJcbiAgICBwcml2YXRlIHN0YXJ0UGx1Z2luV2l0aERlbGF5KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuZmluZChwID0+IHAuaWQgPT09IGlkKTtcclxuICAgICAgICBpZiAocGx1Z2luICYmIHBsdWdpbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5zZXR0aW5ncy5ERUxBWVMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IHBsdWdpbi5kZWxheSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBkZWxheSA/IGRlbGF5LnRpbWUgOiAwO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbihpZCk7IH0sIHRpbWUgKiAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU1NDBDXHU2QjY1XHU2M0QyXHU0RUY2XHU1MjMwXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHJcbiAgICBwdWJsaWMgc3luY2hyb25pemVQbHVnaW5zKHAxOiBQbHVnaW5NYW5pZmVzdFtdKSB7XHJcbiAgICAgICAgY29uc3QgcDIgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnM7XHJcbiAgICAgICAgcDIuZm9yRWFjaChwMkl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXAxLnNvbWUocDFJdGVtID0+IHAxSXRlbS5pZCA9PT0gcDJJdGVtLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5QbHVnaW5zID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zLmZpbHRlcihwbSA9PiBwbS5pZCAhPT0gcDJJdGVtLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHAxLmZvckVhY2gocDFJdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKCFwMi5zb21lKHAySXRlbSA9PiBwMkl0ZW0uaWQgPT09IHAxSXRlbS5pZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVkUGx1Z2lucy5oYXMocDFJdGVtLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAnaWQnOiBwMUl0ZW0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiBwMUl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAnZGVzYyc6IHAxSXRlbS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAnZ3JvdXAnOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAndGFncyc6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICdlbmFibGVkJzogaXNFbmFibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWxheSc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICdub3RlJzogJydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gXHU0RkREXHU1QjU4XHU4QkJFXHU3RjZFXHJcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBcdTVERTVcdTUxNzdcdTUxRkRcdTY1NzBcclxuICAgIHB1YmxpYyBjcmVhdGVUYWcodGV4dDogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2VuZXJhdGVUYWdTdHlsZShjb2xvciwgdHlwZSk7XHJcbiAgICAgICAgY29uc3QgdGFnID0gY3JlYXRlRWwoJ3NwYW4nLCB7XHJcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgIGNsczogJ21hbmFnZXItdGFnJyxcclxuICAgICAgICAgICAgYXR0cjogeyAnc3R5bGUnOiBzdHlsZSB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gdGFnO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdlbmVyYXRlVGFnU3R5bGUoY29sb3I6IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlO1xyXG4gICAgICAgIGNvbnN0IFtyLCBnLCBiXSA9IHRoaXMuaGV4VG9SZ2JBcnJheShjb2xvcik7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2EnOlxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBgY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9OyBib3JkZXItY29sb3I6ICR7Y29sb3J9O2A7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYic6XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGBjb2xvcjogJHtjb2xvcn07IGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyBib3JkZXItY29sb3I6ICR7Y29sb3J9O2A7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYyc6XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGBjb2xvcjogJHtjb2xvcn07IGJhY2tncm91bmQtY29sb3I6IHJnYmEoJHtyfSwgJHtnfSwgJHtifSwgMC4zKTsgYm9yZGVyLWNvbG9yOiAke2NvbG9yfTtgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2QnOlxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBgY29sb3I6ICR7Y29sb3J9OyBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuYWRqdXN0Q29sb3JCcmlnaHRuZXNzKGNvbG9yLCA1MCl9OyBib3JkZXItY29sb3I6ICR7dGhpcy5hZGp1c3RDb2xvckJyaWdodG5lc3MoY29sb3IsIDUwKX07YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7Ym9yZGVyLXN0eWxlOiBkYXNoZWQ7YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhleFRvUmdiQXJyYXkoaGV4OiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCByZ2IgPSBwYXJzZUludChoZXguc2xpY2UoMSksIDE2KTtcclxuICAgICAgICBjb25zdCByID0gKHJnYiA+PiAxNik7XHJcbiAgICAgICAgY29uc3QgZyA9ICgocmdiID4+IDgpICYgMHgwMEZGKTtcclxuICAgICAgICBjb25zdCBiID0gKHJnYiAmIDB4MDAwMEZGKTtcclxuICAgICAgICByZXR1cm4gW3IsIGcsIGJdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkanVzdENvbG9yQnJpZ2h0bmVzcyhoZXg6IHN0cmluZywgYW1vdW50OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCByZ2IgPSBwYXJzZUludChoZXguc2xpY2UoMSksIDE2KTtcclxuICAgICAgICBjb25zdCByID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCAoKHJnYiA+PiAxNikgJiAweEZGKSArIGFtb3VudCkpO1xyXG4gICAgICAgIGNvbnN0IGcgPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsICgocmdiID4+IDgpICYgMHhGRikgKyBhbW91bnQpKTtcclxuICAgICAgICBjb25zdCBiID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCAocmdiICYgMHhGRikgKyBhbW91bnQpKTtcclxuICAgICAgICByZXR1cm4gYCMkeygoMSA8PCAyNCkgKyAociA8PCAxNikgKyAoZyA8PCA4KSArIGIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKS50b1VwcGVyQ2FzZSgpfWA7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsICJpbXBvcnQgeyBEZWxheSwgTWFuYWdlclBsdWdpbiwgVGFnLCBUeXBlIH0gZnJvbSAnLi4vZGF0YS90eXBlcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hbmFnZXJTZXR0aW5ncyB7XHJcbiAgICAvLyBcdTYzMDFcdTRFNDVcdTUzMTZcclxuICAgIFBFUlNJU1RFTkNFOiBib29sZWFuO1xyXG4gICAgLy8gXHU4RkM3XHU2RUU0XHU2ODA3XHU3QjdFXHJcbiAgICBGSUxURVJfVEFHOiBzdHJpbmc7XHJcbiAgICAvLyBcdThGQzdcdTZFRTRcdTUyMDZcdTdFQzRcclxuICAgIEZJTFRFUl9HUk9VUDogc3RyaW5nO1xyXG4gICAgLy8gXHU4RkM3XHU2RUU0XHU1RUY2XHU4RkRGXHJcbiAgICBGSUxURVJfREVMQVk6IHN0cmluZztcclxuXHJcbiAgICAvLyBcdThCRURcdThBMDBcclxuICAgIExBTkdVQUdFOiBzdHJpbmc7XHJcbiAgICAvLyBcdTVDNDVcdTRFMkRcclxuICAgIENFTlRFUjogYm9vbGVhbjtcclxuICAgIC8vIFx1NjgzN1x1NUYwRlxyXG4gICAgSVRFTV9TVFlMRTogc3RyaW5nO1xyXG4gICAgLy8gXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGXHJcbiAgICBHUk9VUF9TVFlMRTogc3RyaW5nO1xyXG4gICAgLy8gXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGXHJcbiAgICBUQUdfU1RZTEU6IHN0cmluZztcclxuXHJcbiAgICAvLyBcdTVFRjZcdThGREZcclxuICAgIERFTEFZOiBib29sZWFuO1xyXG4gICAgLy8gXHU2REUxXHU1MUZBXHU2ODM3XHU1RjBGXHJcbiAgICBGQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TOiBib29sZWFuO1xyXG4gICAgLy8gXHU1NDdEXHU0RUU0XHU5ODc5XHJcbiAgICBDT01NQU5EX0lURU06IGJvb2xlYW47XHJcbiAgICAvLyBcdTU0N0RcdTRFRTRcdTdFQzRcclxuICAgIENPTU1BTkRfR1JPVVA6IGJvb2xlYW47XHJcblxyXG4gICAgR1JPVVBTOiBUeXBlW107XHJcbiAgICBUQUdTOiBUYWdbXTtcclxuICAgIERFTEFZUzogRGVsYXlbXTtcclxuICAgIFBsdWdpbnM6IE1hbmFnZXJQbHVnaW5bXTtcclxuICAgIEhJREVTOiBzdHJpbmdbXSxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IE1hbmFnZXJTZXR0aW5ncyA9IHtcclxuICAgIFBFUlNJU1RFTkNFOiBmYWxzZSxcclxuICAgIC8vIFx1N0I1Qlx1OTAwOVxyXG4gICAgRklMVEVSX1RBRzogXCJcIixcclxuICAgIEZJTFRFUl9HUk9VUDogXCJcIixcclxuICAgIEZJTFRFUl9ERUxBWTogXCJcIixcclxuXHJcbiAgICBMQU5HVUFHRTogXCJ6aC1jblwiLFxyXG4gICAgQ0VOVEVSOiBmYWxzZSxcclxuICAgIElURU1fU1RZTEU6IFwiYWx3YXlzRXhwYW5kXCIsXHJcbiAgICBHUk9VUF9TVFlMRTogXCJhXCIsXHJcbiAgICBUQUdfU1RZTEU6IFwiYlwiLFxyXG4gICAgREVMQVk6IGZhbHNlLFxyXG4gICAgRkFERV9PVVRfRElTQUJMRURfUExVR0lOUzogdHJ1ZSxcclxuICAgIENPTU1BTkRfSVRFTTogZmFsc2UsXHJcbiAgICBDT01NQU5EX0dST1VQOiBmYWxzZSxcclxuICAgIEdST1VQUzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJpZFwiOiBcImRlZmF1bHRcIixcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiXHU5RUQ4XHU4QkE0XHU3RUM0XCIsXHJcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjQTA3OUZGXCJcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxuICAgIFRBR1M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJkZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIlx1OUVEOFx1OEJBNFx1NjgwN1x1N0I3RVwiLFxyXG4gICAgICAgICAgICBcImNvbG9yXCI6IFwiI0EwNzlGRlwiXHJcbiAgICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBERUxBWVM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJkZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIlx1OUVEOFx1OEJBNFx1NUVGNlx1OEZERlwiLFxyXG4gICAgICAgICAgICBcInRpbWVcIjogMTBcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxuICAgIFBsdWdpbnM6IFtdLFxyXG4gICAgSElERVM6IFtdLFxyXG59XHJcbiIsICJpbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIgfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCIuLi9tYWluXCI7XHJcblxyXG5pbXBvcnQgTWFuYWdlckJhc2lzIGZyb20gJy4vdWkvbWFuYWdlci1iYXNpcyc7XHJcbmltcG9ydCBNYW5hZ2VyU3R5bGUgZnJvbSAnLi91aS9tYW5hZ2VyLXN0eWxlJztcclxuaW1wb3J0IE1hbmFnZXJEZWxheSBmcm9tICcuL3VpL21hbmFnZXItZGVsYXknO1xyXG5pbXBvcnQgTWFuYWdlclRhZyBmcm9tICcuL3VpL21hbmFnZXItdGFnJztcclxuaW1wb3J0IE1hbmFnZXJHcm91cCBmcm9tICcuL3VpL21hbmFnZXItZ3JvdXAnO1xyXG5cclxuXHJcbmNsYXNzIE1hbmFnZXJTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcbiAgICBtYW5hZ2VyOiBNYW5hZ2VyO1xyXG4gICAgYXBwOiBBcHA7XHJcbiAgICBjb250ZW50RWw6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBtYW5hZ2VyOiBNYW5hZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBtYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXkoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcclxuICAgICAgICBjb250YWluZXJFbC5lbXB0eSgpO1xyXG4gICAgICAgIGNvbnRhaW5lckVsLmFkZENsYXNzKCdtYW5hZ2VyLXNldHRpbmdfX2NvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0IHRhYnNFbCA9IHRoaXMuY29udGFpbmVyRWwuY3JlYXRlRWwoJ2RpdicpO1xyXG4gICAgICAgIHRhYnNFbC5hZGRDbGFzcygnbWFuYWdlci1zZXR0aW5nX190YWJzJyk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwgPSB0aGlzLmNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcygnbWFuYWdlci1zZXR0aW5nX19jb250ZW50Jyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhYkl0ZW1zID0gW1xyXG4gICAgICAgICAgICB7IHRleHQ6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwJyksIGNvbnRlbnQ6ICgpID0+IHRoaXMuYmFzaXNEaXNwbGF5KCkgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU2ODM3XHU1RjBGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMCcpLCBjb250ZW50OiAoKSA9PiB0aGlzLnN0eWxlRGlzcGxheSgpIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDAnKSwgY29udGVudDogKCkgPT4gdGhpcy5ncm91cERpc3BsYXkoKSB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwJyksIGNvbnRlbnQ6ICgpID0+IHRoaXMudGFnRGlzcGxheSgpIH0sXHJcblxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKHRoaXMubWFuYWdlci5zZXR0aW5ncy5ERUxBWSkgdGFiSXRlbXMucHVzaCh7IHRleHQ6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwJyksIGNvbnRlbnQ6ICgpID0+IHRoaXMuZGVsYXlEaXNwbGF5KCkgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhYkl0ZW1zRWxzOiBIVE1MRGl2RWxlbWVudFtdID0gW107XHJcblxyXG4gICAgICAgIHRhYkl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1FbCA9IHRhYnNFbC5jcmVhdGVFbCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGl0ZW1FbC5hZGRDbGFzcygnbWFuYWdlci1zZXR0aW5nX190YWJzLWl0ZW0nKTtcclxuICAgICAgICAgICAgaXRlbUVsLnRleHRDb250ZW50ID0gaXRlbS50ZXh0O1xyXG4gICAgICAgICAgICB0YWJJdGVtc0Vscy5wdXNoKGl0ZW1FbCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkgeyBpdGVtRWwuYWRkQ2xhc3MoJ21hbmFnZXItc2V0dGluZ19fdGFicy1pdGVtX2lzLWFjdGl2ZScpOyBpdGVtLmNvbnRlbnQoKTsgfVxyXG4gICAgICAgICAgICBpdGVtRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YWJJdGVtc0Vscy5mb3JFYWNoKHRhYkVsID0+IHsgdGFiRWwucmVtb3ZlQ2xhc3MoJ21hbmFnZXItc2V0dGluZ19fdGFicy1pdGVtX2lzLWFjdGl2ZScpIH0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLmFkZENsYXNzKCdtYW5hZ2VyLXNldHRpbmdfX3RhYnMtaXRlbV9pcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY29udGVudCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGJhc2lzRGlzcGxheSgpIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgbmV3IE1hbmFnZXJCYXNpcyh0aGlzKS5kaXNwbGF5KCk7IH1cclxuICAgIHN0eWxlRGlzcGxheSgpIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgbmV3IE1hbmFnZXJTdHlsZSh0aGlzKS5kaXNwbGF5KCk7IH1cclxuICAgIGRlbGF5RGlzcGxheSgpIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgbmV3IE1hbmFnZXJEZWxheSh0aGlzKS5kaXNwbGF5KCk7IH1cclxuICAgIGdyb3VwRGlzcGxheSgpIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgbmV3IE1hbmFnZXJHcm91cCh0aGlzKS5kaXNwbGF5KCk7IH1cclxuICAgIHRhZ0Rpc3BsYXkoKSB7IHRoaXMuY29udGVudEVsLmVtcHR5KCk7IG5ldyBNYW5hZ2VyVGFnKHRoaXMpLmRpc3BsYXkoKTsgfVxyXG59XHJcblxyXG5leHBvcnQgeyBNYW5hZ2VyU2V0dGluZ1RhYiB9O1xyXG5cclxuIiwgImltcG9ydCBNYW5hZ2VyIGZyb20gJ3NyYy9tYWluJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdUYWIgfSBmcm9tICcuJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi9kYXRhJztcclxuaW1wb3J0IHsgQXBwIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZVNldHRpbmcge1xyXG5cdHByb3RlY3RlZCBzZXR0aW5nVGFiOiBNYW5hZ2VyU2V0dGluZ1RhYjtcclxuXHRwcm90ZWN0ZWQgbWFuYWdlcjogTWFuYWdlcjtcclxuXHRwcm90ZWN0ZWQgc2V0dGluZ3M6IE1hbmFnZXJTZXR0aW5ncztcclxuXHRwdWJsaWMgY29udGFpbmVyRWw6IEhUTUxFbGVtZW50O1xyXG5cdHByb3RlY3RlZCBhcHA6IEFwcDtcclxuXHJcblx0Y29uc3RydWN0b3Iob2JqOiBNYW5hZ2VyU2V0dGluZ1RhYikge1xyXG5cdFx0dGhpcy5zZXR0aW5nVGFiID0gb2JqO1xyXG5cdFx0dGhpcy5tYW5hZ2VyID0gb2JqLm1hbmFnZXI7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gb2JqLm1hbmFnZXIuc2V0dGluZ3M7XHJcblx0XHR0aGlzLmNvbnRhaW5lckVsID0gb2JqLmNvbnRlbnRFbDtcclxuXHRcdHRoaXMuYXBwID0gb2JqLmFwcDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhYnN0cmFjdCBtYWluKCk6IHZvaWQ7XHJcblx0cHVibGljIGRpc3BsYXkoKTogdm9pZCB7IHRoaXMubWFpbigpIH1cclxufSIsICJpbXBvcnQgQmFzZVNldHRpbmcgZnJvbSBcIi4uL2Jhc2Utc2V0dGluZ1wiO1xyXG5pbXBvcnQgeyBEcm9wZG93bkNvbXBvbmVudCwgU2V0dGluZywgVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCBDb21tYW5kcyBmcm9tIFwic3JjL2NvbW1hbmRcIjtcclxuLy8gaW1wb3J0IHsgR1JPVVBfU1RZTEUsIElURU1fU1RZTEUsIFRBR19TVFlMRSB9IGZyb20gXCJzcmMvZGF0YS9kYXRhXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyQmFzaXMgZXh0ZW5kcyBCYXNlU2V0dGluZyB7XHJcblxyXG4gICAgbWFpbigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsYW5ndWFnZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudChsYW5ndWFnZUJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIGxhbmd1YWdlRHJvcGRvd24uYWRkT3B0aW9ucyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci5sYW5ndWFnZSk7XHJcbiAgICAgICAgbGFuZ3VhZ2VEcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLkxBTkdVQUdFKTtcclxuICAgICAgICBsYW5ndWFnZURyb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLkxBTkdVQUdFID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nVGFiLmJhc2lzRGlzcGxheSgpO1xyXG4gICAgICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nVGFiLmRpc3BsYXkoKTsgLy8gXHU5MUNEXHU2NUIwXHU2RTMyXHU2N0QzXHU2NTc0XHU0RTJBXHU4QkJFXHU3RjZFXHU3NTRDXHU5NzYyXHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpOyAvLyBcdTRGRERcdTYzMDFcdTVGNTNcdTUyNERcdTUxODVcdTVCQjlcdTUzM0FcdTc2ODRcdTUyMzdcdTY1QjBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgRGVsYXlCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIGNvbnN0IERlbGF5VG9nZ2xlID0gbmV3IFRvZ2dsZUNvbXBvbmVudChEZWxheUJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIERlbGF5VG9nZ2xlLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuREVMQVkpO1xyXG4gICAgICAgIERlbGF5VG9nZ2xlLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLkRFTEFZID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgdmFsdWUgPyB0aGlzLm1hbmFnZXIuZW5hYmxlRGVsYXlzRm9yQWxsUGx1Z2lucygpIDogdGhpcy5tYW5hZ2VyLmRpc2FibGVEZWxheXNGb3JBbGxQbHVnaW5zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5kaXNwbGF5KCk7IC8vIFx1OTFDRFx1NjVCMFx1NkUzMlx1NjdEM1x1NjU3NFx1NEUyQVx1OEJCRVx1N0Y2RVx1NzU0Q1x1OTc2MlxyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTsgLy8gXHU0RkREXHU2MzAxXHU1RjUzXHU1MjREXHU1MTg1XHU1QkI5XHU1MzNBXHU3Njg0XHU1MjM3XHU2NUIwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcnNpc3RlbmNlQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTdCNUJcdTkwMDlcdTYzMDFcdTRFNDVcdTUzMTZfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3QjVCXHU5MDA5XHU2MzAxXHU0RTQ1XHU1MzE2X1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBjb25zdCBwZXJzaXN0ZW5jZVRvZ2dsZSA9IG5ldyBUb2dnbGVDb21wb25lbnQocGVyc2lzdGVuY2VCYXIuY29udHJvbEVsKTtcclxuICAgICAgICBwZXJzaXN0ZW5jZVRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFKTtcclxuICAgICAgICBwZXJzaXN0ZW5jZVRvZ2dsZS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IENvbW1hbmRJdGVtQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBjb25zdCBDb21tYW5kSXRlbVRvZ2dsZSA9IG5ldyBUb2dnbGVDb21wb25lbnQoQ29tbWFuZEl0ZW1CYXIuY29udHJvbEVsKTtcclxuICAgICAgICBDb21tYW5kSXRlbVRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLkNPTU1BTkRfSVRFTSk7XHJcbiAgICAgICAgQ29tbWFuZEl0ZW1Ub2dnbGUub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuQ09NTUFORF9JVEVNID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IENvbW1hbmRHcm91cEJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgQ29tbWFuZEdyb3VwVG9nZ2xlID0gbmV3IFRvZ2dsZUNvbXBvbmVudChDb21tYW5kR3JvdXBCYXIuY29udHJvbEVsKTtcclxuICAgICAgICBDb21tYW5kR3JvdXBUb2dnbGUuc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5DT01NQU5EX0dST1VQKTtcclxuICAgICAgICBDb21tYW5kR3JvdXBUb2dnbGUub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuQ09NTUFORF9HUk9VUCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgfVxyXG59IiwgImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHtcclxuICAgIEFwcCxcclxuICAgIEJ1dHRvbkNvbXBvbmVudCxcclxuICAgIERyb3Bkb3duQ29tcG9uZW50LFxyXG4gICAgRXh0cmFCdXR0b25Db21wb25lbnQsXHJcbiAgICBNZW51LFxyXG4gICAgTW9kYWwsXHJcbiAgICBOb3RpY2UsXHJcbiAgICBQbHVnaW5NYW5pZmVzdCxcclxuICAgIHJlcXVlc3RVcmwsXHJcbiAgICBTZWFyY2hDb21wb25lbnQsXHJcbiAgICBzZXRJY29uLFxyXG4gICAgU2V0dGluZyxcclxuICAgIFRvZ2dsZUNvbXBvbmVudCxcclxufSBmcm9tIFwib2JzaWRpYW5cIjtcclxuXHJcbmltcG9ydCB7IE1hbmFnZXJTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5ncy9kYXRhXCI7XHJcbmltcG9ydCB7IG1hbmFnZXJPcGVuIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5pbXBvcnQgTWFuYWdlciBmcm9tIFwibWFpblwiO1xyXG5pbXBvcnQgeyBHcm91cE1vZGFsIH0gZnJvbSBcIi4vZ3JvdXAtbW9kYWxcIjtcclxuaW1wb3J0IHsgVGFnc01vZGFsIH0gZnJvbSBcIi4vdGFncy1tb2RhbFwiO1xyXG5pbXBvcnQgeyBEZWxldGVNb2RhbCB9IGZyb20gXCIuL2RlbGV0ZS1tb2RhbFwiO1xyXG5pbXBvcnQgQ29tbWFuZHMgZnJvbSBcInNyYy9jb21tYW5kXCI7XHJcbmltcG9ydCB7IERpc2FibGVNb2RhbCB9IGZyb20gXCIuL2Rpc2FibGUtbW9kYWxcIjtcclxuaW1wb3J0IHsgTm90ZU1vZGFsIH0gZnJvbSBcIi4vbm90ZS1tb2RhbFwiO1xyXG5pbXBvcnQgeyBTaGFyZU1vZGFsIH0gZnJvbSBcIi4vc2hhcmUtbW9kYWxcIjtcclxuaW1wb3J0IHsgSGlkZU1vZGFsIH0gZnJvbSBcIi4vaGlkZS1tb2RhbFwiO1xyXG5pbXBvcnQgeyBTaGFyZVRNb2RhbCB9IGZyb20gXCIuL3NoYXJlLXQtbW9kYWxcIjtcclxuXHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vICAgICAgICAgIFx1NEZBN1x1OEZCOVx1NjgwRiBcdTVCRjlcdThCRERcdTY4NDYgXHU3RkZCXHU4QkQxXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5leHBvcnQgY2xhc3MgTWFuYWdlck1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG4gICAgbWFuYWdlcjogTWFuYWdlcjtcclxuICAgIHNldHRpbmdzOiBNYW5hZ2VyU2V0dGluZ3M7XHJcbiAgICAvLyB0aGlzLmFwcC5wbHVnaW5zXHJcbiAgICBhcHBQbHVnaW5zO1xyXG4gICAgLy8gdGhpcy5hcHAuc2V0dGluZ3NcclxuICAgIGFwcFNldHRpbmc7XHJcbiAgICAvLyBbXHU2NzJDXHU1NzMwXVtcdTUzRDhcdTkxQ0ZdIFx1NjNEMlx1NEVGNlx1OERFRlx1NUY4NFxyXG4gICAgYmFzZVBhdGg6IHN0cmluZztcclxuICAgIC8vIFtcdTY3MkNcdTU3MzBdW1x1NTNEOFx1OTFDRl0gXHU1QzU1XHU3OTNBXHU2M0QyXHU0RUY2XHU1MjE3XHU4ODY4XHJcbiAgICBkaXNwbGF5UGx1Z2luczogUGx1Z2luTWFuaWZlc3RbXSA9IFtdO1xyXG5cclxuICAgIGFsbFBsdWdpbnM6IFBsdWdpbk1hbmlmZXN0W10gPSBbXTtcclxuXHJcbiAgICAvLyBcdThGQzdcdTZFRTRcdTU2NjhcclxuICAgIGZpbHRlciA9IFwiXCI7XHJcbiAgICAvLyBcdTUyMDZcdTdFQzRcdTUxODVcdTVCQjlcclxuICAgIGdyb3VwID0gXCJcIjtcclxuICAgIC8vIFx1NjgwN1x1N0I3RVx1NTE4NVx1NUJCOVxyXG4gICAgdGFnID0gXCJcIjtcclxuICAgIC8vIFx1NjgwN1x1N0I3RVx1NTE4NVx1NUJCOVxyXG4gICAgZGVsYXkgPSBcIlwiO1xyXG4gICAgLy8gXHU2NDFDXHU3RDIyXHU1MTg1XHU1QkI5XHJcbiAgICBzZWFyY2hUZXh0ID0gXCJcIjtcclxuXHJcblxyXG4gICAgLy8gXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGXHJcbiAgICBlZGl0b3JNb2RlID0gZmFsc2U7XHJcbiAgICAvLyBcdTZENEJcdThCRDVcdTZBMjFcdTVGMEZcclxuICAgIGRldmVsb3Blck1vZGUgPSBmYWxzZTtcclxuXHJcbiAgICBzZWFyY2hFbDogU2VhcmNoQ29tcG9uZW50O1xyXG4gICAgZm9vdEVsOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgbWFuYWdlcjogTWFuYWdlcikge1xyXG4gICAgICAgIHN1cGVyKGFwcCk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBcclxuICAgICAgICB0aGlzLmFwcFNldHRpbmcgPSB0aGlzLmFwcC5zZXR0aW5nO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmFwcFBsdWdpbnMgPSB0aGlzLmFwcC5wbHVnaW5zO1xyXG4gICAgICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IG1hbmFnZXIuc2V0dGluZ3M7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuYmFzZVBhdGggPSBwYXRoLm5vcm1hbGl6ZSh0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmdldEJhc2VQYXRoKCkpO1xyXG4gICAgICAgIC8vIFx1OTk5Nlx1NkIyMVx1NTQyRlx1NTJBOFx1OEZEMFx1ODg0Q1x1NEUwQiBcdTkwN0ZcdTUxNERcdTY3MDlcdTY1QjBcdTUyQTBcdTUxNjVcdTc2ODRcdTYzRDJcdTRFRjZcclxuICAgICAgICBtYW5hZ2VyLnN5bmNocm9uaXplUGx1Z2lucyhcclxuICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAocG06IFBsdWdpbk1hbmlmZXN0KSA9PiBwbS5pZCAhPT0gbWFuYWdlci5tYW5pZmVzdC5pZFxyXG4gICAgICAgICAgICApIGFzIFBsdWdpbk1hbmlmZXN0W11cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm1hbmFnZXIucmVnaXN0ZXJFdmVudChcclxuICAgICAgICAvLyBcdHRoaXMuYXBwLndvcmtzcGFjZS5vbihcImZpbGUtbWVudVwiLCAobWVudSwgZmlsZSkgPT4ge1xyXG4gICAgICAgIC8vIFx0XHRjb25zdCBhZGRJY29uTWVudUl0ZW0gPSAoaXRlbTogTWVudUl0ZW0pID0+IHtcclxuICAgICAgICAvLyBcdFx0XHRpdGVtLnNldFRpdGxlKFwiXHU1ODlFXCIpO1xyXG4gICAgICAgIC8vIFx0XHRcdGl0ZW0uc2V0SWNvbihcImhhc2h0YWdcIik7XHJcbiAgICAgICAgLy8gXHRcdFx0aXRlbS5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBcdFx0XHRcdGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgICAgIC8vIFx0XHRcdH0pO1xyXG4gICAgICAgIC8vIFx0XHR9O1xyXG4gICAgICAgIC8vIFx0XHRtZW51LmFkZEl0ZW0oYWRkSWNvbk1lbnVJdGVtKTtcclxuICAgICAgICAvLyBcdFx0Y29uc3QgYWRkSWNvbk1lbnVJdGVtMSA9IChpdGVtOiBNZW51SXRlbSkgPT4ge1xyXG4gICAgICAgIC8vIFx0XHRcdGl0ZW0uc2V0VGl0bGUoXCJcdTUyMjBcIik7XHJcbiAgICAgICAgLy8gXHRcdFx0aXRlbS5zZXRJY29uKFwiaGFzaHRhZ1wiKTtcclxuICAgICAgICAvLyBcdFx0fTtcclxuICAgICAgICAvLyBcdFx0bWVudS5hZGRJdGVtKGFkZEljb25NZW51SXRlbTEpO1xyXG4gICAgICAgIC8vIFx0XHRjb25zdCBhZGRJY29uTWVudUl0ZW0yID0gKGl0ZW06IE1lbnVJdGVtKSA9PiB7XHJcbiAgICAgICAgLy8gXHRcdFx0aXRlbS5zZXRUaXRsZShcIlx1NjUzOVwiKTtcclxuICAgICAgICAvLyBcdFx0XHRpdGVtLnNldEljb24oXCJoYXNodGFnXCIpO1xyXG4gICAgICAgIC8vIFx0XHR9O1xyXG4gICAgICAgIC8vIFx0XHRtZW51LmFkZEl0ZW0oYWRkSWNvbk1lbnVJdGVtMik7XHJcbiAgICAgICAgLy8gXHR9KVxyXG4gICAgICAgIC8vICk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0QWN0aXZlUGx1Z2lucygpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3Qgb3JpZ2luUGx1Z2lucyA9IHRoaXMuYXBwLnBsdWdpbnMucGx1Z2lucztcclxuICAgICAgICBjb25zb2xlLmxvZyhhd2FpdCB0aGlzLnByb2Nlc3NQbHVnaW5zKG9yaWdpblBsdWdpbnMpKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm9jZXNzUGx1Z2lucyhvcmlnaW5QbHVnaW5zKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwcm9jZXNzUGx1Z2lucyhvcmlnaW5QbHVnaW5zOiBhbnkpIHtcclxuICAgICAgICBsZXQgcGx1Z2luczogYW55ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBvcmlnaW5QbHVnaW5zKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGx1Z2luID0geyAuLi5vcmlnaW5QbHVnaW5zW25hbWVdIH07IC8vIG5ldyBhbiBvYmplY3QgYW5kIG1ha2UgaXQgZXh0ZW5zaWJsZVxyXG4gICAgICAgICAgICAgICAgcGx1Z2luLm1hbmlmZXN0ID0geyAuLi5vcmlnaW5QbHVnaW5zW25hbWVdLm1hbmlmZXN0IH1cclxuICAgICAgICAgICAgICAgIHBsdWdpbi5tYW5pZmVzdFtcInBsdWdpblVybFwiXSA9IGBodHRwczovL29ic2lkaWFuLm1kL3BsdWdpbnM/aWQ9JHtwbHVnaW4ubWFuaWZlc3QuaWR9YDtcclxuICAgICAgICAgICAgICAgIHBsdWdpbi5tYW5pZmVzdFtcImF1dGhvcjJcIl0gPSBwbHVnaW4ubWFuaWZlc3QuYXV0aG9yPy5yZXBsYWNlKC88Lio/QC4qP1xcLi4qPz4vZywgXCJcIikudHJpbSgpOyAvLyByZW1vdmUgZW1haWwgYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgcGx1Z2luLm1hbmlmZXN0W1wiaW5zdGFsbExpbmtcIl0gPSBgb2JzaWRpYW46Ly9CUE0taW5zdGFsbD9pZD0ke3BsdWdpbi5tYW5pZmVzdC5pZH0mZW5hYmxlPXRydWVgO1xyXG4gICAgICAgICAgICAgICAgcGx1Z2luc1tuYW1lXSA9IHBsdWdpbjtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihuYW1lLCBlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9yaWdpblBsdWdpbnNbbmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob3JpZ2luUGx1Z2luc1tuYW1lXS5tYW5pZmVzdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0eXBlb2Ygb3JpZ2luUGx1Z2luc1tuYW1lXS5tYW5pZmVzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBsdWdpbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNob3dIZWFkKCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IG1vZGFsRWw6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICBtb2RhbEVsLmFkZENsYXNzKFwibWFuYWdlci1jb250YWluZXJcIik7XHJcbiAgICAgICAgLy8gXHU5NzYwXHU0RTBBXHJcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLkNFTlRFUikgbW9kYWxFbC5hZGRDbGFzcyhcIm1hbmFnZXItY29udGFpbmVyX190b3BcIik7XHJcblxyXG4gICAgICAgIG1vZGFsRWwucmVtb3ZlQ2hpbGQobW9kYWxFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWwtY2xvc2UtYnV0dG9uXCIpWzBdKTtcclxuICAgICAgICB0aGlzLnRpdGxlRWwucGFyZW50RWxlbWVudD8uYWRkQ2xhc3MoXCJtYW5hZ2VyLWNvbnRhaW5lcl9faGVhZGVyXCIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmFkZENsYXNzKFwibWFuYWdlci1pdGVtLWNvbnRhaW5lclwiKTtcclxuICAgICAgICAvLyBcdTZERkJcdTUyQTBcdTk4NzVcdTVDM0VcclxuICAgICAgICB0aGlzLmZvb3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy5mb290RWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWZvb2RcIik7XHJcbiAgICAgICAgdGhpcy5tb2RhbEVsLmFwcGVuZENoaWxkKHRoaXMuZm9vdEVsKTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjRDRFx1NEY1Q1x1ODg0Q11cclxuICAgICAgICBjb25zdCBhY3Rpb25CYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpLnNldENsYXNzKFwibWFuYWdlci1iYXJfX2FjdGlvblwiKS5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTkwMUFcdTc1MjhfXHU2NENEXHU0RjVDX1x1NjU4N1x1NjcyQ1wiKSk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY0Q0RcdTRGNUNcdTg4NENdIEdpdGh1YlxyXG4gICAgICAgIGNvbnN0IGdpdGh1YkJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgZ2l0aHViQnV0dG9uLnNldEljb24oXCJnaXRodWJcIik7XHJcbiAgICAgICAgZ2l0aHViQnV0dG9uLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9HSVRIVUJfXHU2M0NGXHU4RkYwXCIpKTtcclxuICAgICAgICBnaXRodWJCdXR0b24ub25DbGljaygoKSA9PiB7IHdpbmRvdy5vcGVuKHRoaXMubWFuYWdlci5tYW5pZmVzdC5hdXRob3JVcmwpIH0pO1xyXG4gICAgICAgIC8vIFtcdTY0Q0RcdTRGNUNcdTg4NENdIEdpdGh1YlxyXG4gICAgICAgIGNvbnN0IHR1dG9yaWFsQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0dXRvcmlhbEJ1dHRvbi5zZXRJY29uKFwiYm9vay1vcGVuXCIpO1xyXG4gICAgICAgIHR1dG9yaWFsQnV0dG9uLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9cdTg5QzZcdTk4OTFcdTY1NTlcdTdBMEJfXHU2M0NGXHU4RkYwXCIpKTtcclxuICAgICAgICB0dXRvcmlhbEJ1dHRvbi5vbkNsaWNrKCgpID0+IHsgd2luZG93Lm9wZW4oXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vQlYxV3lya1lNRWNlL1wiKTsgfSk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY0Q0RcdTRGNUNcdTg4NENdIFx1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMFxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZUJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgdXBkYXRlQnV0dG9uLnNldEljb24oXCJyc3NcIik7XHJcbiAgICAgICAgdXBkYXRlQnV0dG9uLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9cdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjBfXHU2M0NGXHU4RkYwXCIpKTtcclxuICAgICAgICB1cGRhdGVCdXR0b24ub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuY2hlY2tGb3JVcGRhdGVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcFNldHRpbmcub3BlbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBTZXR0aW5nLm9wZW5UYWJCeUlkKFwiY29tbXVuaXR5LXBsdWdpbnNcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwXHU2NUY2XHU1MUZBXHU5NTE5OlwiLCBlcnJvcik7IC8vIFx1NTkwNFx1NzQwNlx1NTNFRlx1ODBGRFx1NTFGQVx1NzNCMFx1NzY4NFx1OTUxOVx1OEJFRlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY0Q0RcdTRGNUNcdTg4NENdIFx1NjNEMlx1NEVGNlx1NTIwNlx1NEVBQlxyXG4gICAgICAgIC8vIGNvbnN0IHNoYXJlQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKTtcclxuICAgICAgICAvLyBzaGFyZUJ1dHRvbi5zZXRJY29uKFwiZXh0ZXJuYWwtbGlua1wiKTtcclxuICAgICAgICAvLyAvLyBzaGFyZUJ1dHRvbi5zZXRUb29sdGlwKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU1MjA2XHU0RUFCX1x1NjNDRlx1OEZGMFwiKSk7XHJcbiAgICAgICAgLy8gc2hhcmVCdXR0b24ub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIG5ldyBTaGFyZVRNb2RhbCh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyLCAodHlwZTogc3RyaW5nLCB1cmw/OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIGlmICh0eXBlID09ICdpbXBvcnQnKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgcGx1Z2lucyA9IHRoaXMuZGlzcGxheVBsdWdpbnMubWFwKHBsdWdpbiA9PiAoe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZDogcGx1Z2luLmlkLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBuYW1lOiBwbHVnaW4ubmFtZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdmVyc2lvbjogcGx1Z2luLnZlcnNpb24sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGF1dGhvcjogcGx1Z2luLmF1dGhvcixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHBsdWdpbi5kZXNjcmlwdGlvbixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyhwbHVnaW4uaWQpLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBleHBvcnQ6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyBcdTZERkJcdTUyQTBcdTdCQTFcdTc0MDZcdTU2NjhcdTgxRUFcdThFQUJcdTRGRTFcdTYwNkZcclxuICAgICAgICAvLyAgICAgICAgICAgICBwbHVnaW5zLnB1c2goe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZDogdGhpcy5tYW5hZ2VyLm1hbmlmZXN0LmlkLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm1hbmFnZXIubWFuaWZlc3QubmFtZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdmVyc2lvbjogdGhpcy5tYW5hZ2VyLm1hbmlmZXN0LnZlcnNpb24sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGF1dGhvcjogdGhpcy5tYW5hZ2VyLm1hbmlmZXN0LmF1dGhvcixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMubWFuYWdlci5tYW5pZmVzdC5kZXNjcmlwdGlvbixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyh0aGlzLm1hbmFnZXIubWFuaWZlc3QuaWQpLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBleHBvcnQ6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiXHU1RjUzXHU1MjREXHU2M0QyXHU0RUY2XHU4QkU2XHU3RUM2XHU0RkUxXHU2MDZGOlwiLCBwbHVnaW5zKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gbmV3IFNoYXJlTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgcGx1Z2lucykub3BlbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9KS5vcGVuKCk7XHJcbiAgICAgICAgLy8gICAgIC8vIG5ldyBOb3RpY2UoJ1x1NTI5Rlx1ODBGRFx1NjcyQVx1NUI4Q1x1NjIxMFx1RkYwQ1x1NjU2Q1x1OEJGN1x1NjcxRlx1NUY4NVx1RkYwMScpO1xyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vIFtcdTY0Q0RcdTRGNUNcdTg4NENdIFx1NjNEMlx1NEVGNlx1OTY5MFx1ODVDRlxyXG4gICAgICAgIGNvbnN0IGhpZGVCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIGhpZGVCdXR0b24uc2V0SWNvbihcImV5ZS1vZmZcIik7XHJcbiAgICAgICAgaGlkZUJ1dHRvbi5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGx1Z2luczogUGx1Z2luTWFuaWZlc3RbXSA9IE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cyk7XHJcbiAgICAgICAgICAgIHBsdWdpbnMuc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiB7IHJldHVybiBpdGVtMS5uYW1lLmxvY2FsZUNvbXBhcmUoaXRlbTIubmFtZSk7IH0pO1xyXG4gICAgICAgICAgICBuZXcgSGlkZU1vZGFsKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIsIHRoaXMsIHBsdWdpbnMpLm9wZW4oKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBbXHU2NENEXHU0RjVDXHU4ODRDXSBcdTkxQ0RcdThGN0RcdTYzRDJcdTRFRjZcclxuICAgICAgICBjb25zdCByZWxvYWRCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIHJlbG9hZEJ1dHRvbi5zZXRJY29uKFwicmVmcmVzaC1jY3dcIik7XHJcbiAgICAgICAgcmVsb2FkQnV0dG9uLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9cdTkxQ0RcdThGN0RcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwXCIpKTtcclxuICAgICAgICByZWxvYWRCdXR0b24ub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJcdTkxQ0RcdTY1QjBcdTUyQTBcdThGN0RcdTdCMkNcdTRFMDlcdTY1QjlcdTYzRDJcdTRFRjZcIik7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5sb2FkTWFuaWZlc3RzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4XHJcbiAgICAgICAgY29uc3QgZGlzYWJsZUJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgZGlzYWJsZUJ1dHRvbi5zZXRJY29uKFwic3F1YXJlXCIpO1xyXG4gICAgICAgIGRpc2FibGVCdXR0b24uc2V0VG9vbHRpcCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjBcIikpO1xyXG4gICAgICAgIGRpc2FibGVCdXR0b24ub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBEaXNhYmxlTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5kaXNwbGF5UGx1Z2lucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IE1hbmFnZXJQbHVnaW4gPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuZmluZCgocCkgPT4gcC5pZCA9PT0gcGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hbmFnZXJQbHVnaW4gJiYgTWFuYWdlclBsdWdpbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyhwbHVnaW4uaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbkFuZFNhdmUocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkub3BlbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBbXHU2NENEXHU0RjVDXHU4ODRDXSBcdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhcclxuICAgICAgICBjb25zdCBlbmFibGVCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIGVuYWJsZUJ1dHRvbi5zZXRJY29uKFwic3F1YXJlLWNoZWNrXCIpO1xyXG4gICAgICAgIGVuYWJsZUJ1dHRvbi5zZXRUb29sdGlwKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMFwiKSk7XHJcbiAgICAgICAgZW5hYmxlQnV0dG9uLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBuZXcgRGlzYWJsZU1vZGFsKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMuZGlzcGxheVBsdWdpbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ERUxBWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBNYW5hZ2VyUGx1Z2luID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlBsdWdpbnMuZmluZCgobXApID0+IG1wLmlkID09PSBwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWFuYWdlclBsdWdpbiAmJiAhTWFuYWdlclBsdWdpbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyUGx1Z2luLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFwcFBsdWdpbnMuZW5hYmxlZFBsdWdpbnMuaGFzKHBsdWdpbi5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLm9wZW4oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGXHJcbiAgICAgICAgY29uc3QgZWRpdG9yQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0aGlzLmVkaXRvck1vZGUgPyBlZGl0b3JCdXR0b24uc2V0SWNvbihcInBlbi1vZmZcIikgOiBlZGl0b3JCdXR0b24uc2V0SWNvbihcInBlblwiKTtcclxuICAgICAgICBlZGl0b3JCdXR0b24uc2V0VG9vbHRpcCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRl9cdTYzQ0ZcdThGRjBcIikpO1xyXG4gICAgICAgIGVkaXRvckJ1dHRvbi5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZGl0b3JNb2RlID0gIXRoaXMuZWRpdG9yTW9kZTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0b3JNb2RlID8gZWRpdG9yQnV0dG9uLnNldEljb24oXCJwZW4tb2ZmXCIpIDogZWRpdG9yQnV0dG9uLnNldEljb24oXCJwZW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFXHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIHNldHRpbmdzQnV0dG9uLnNldEljb24oXCJzZXR0aW5nc1wiKTtcclxuICAgICAgICBzZXR0aW5nc0J1dHRvbi5zZXRUb29sdGlwKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMFwiKSk7XHJcbiAgICAgICAgc2V0dGluZ3NCdXR0b24ub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwU2V0dGluZy5vcGVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwU2V0dGluZy5vcGVuVGFiQnlJZCh0aGlzLm1hbmFnZXIubWFuaWZlc3QuaWQpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvLyBbXHU2RDRCXHU4QkQ1XHU4ODRDXSBcdTUyMzdcdTY1QjBcdTYzRDJcdTRFRjZcclxuICAgICAgICBpZiAodGhpcy5kZXZlbG9wZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlc3RCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpO1xyXG4gICAgICAgICAgICB0ZXN0QnV0dG9uLnNldEljb24oXCJyZWZyZXNoLWNjd1wiKTtcclxuICAgICAgICAgICAgdGVzdEJ1dHRvbi5zZXRUb29sdGlwKFwiXHU1MjM3XHU2NUIwXHU2M0QyXHU0RUY2XCIpO1xyXG4gICAgICAgICAgICB0ZXN0QnV0dG9uLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW4odGhpcy5tYW5hZ2VyLm1hbmlmZXN0LmlkKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW4odGhpcy5tYW5hZ2VyLm1hbmlmZXN0LmlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBbXHU2RDRCXHU4QkQ1XHU4ODRDXSBcdTZENEJcdThCRDVcdTYzRDJcdTRFRjZcclxuICAgICAgICBpZiAodGhpcy5kZXZlbG9wZXJNb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlc3RCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpO1xyXG4gICAgICAgICAgICB0ZXN0QnV0dG9uLnNldEljb24oXCJ0ZXN0LXR1YmVcIik7XHJcbiAgICAgICAgICAgIHRlc3RCdXR0b24uc2V0VG9vbHRpcChcIlx1NkQ0Qlx1OEJENVx1NjNEMlx1NEVGNlwiKTtcclxuICAgICAgICAgICAgdGVzdEJ1dHRvbi5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFx1ODNCN1x1NTNENlx1NUY1M1x1NTI0RFx1OTg3NVx1OTc2Mlx1NjI0MFx1NjcwOVx1NzY4NFx1NjNEMlx1NEVGNklEIFx1NzEzNlx1NTQwRVx1NUMwNlx1NTE3Nlx1OEY2Q1x1NjM2Mlx1NEUzQVx1NTIxN1x1ODg2OFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFtcdTY0MUNcdTdEMjJcdTg4NENdXHJcbiAgICAgICAgY29uc3Qgc2VhcmNoQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKS5zZXRDbGFzcyhcIm1hbmFnZXItYmFyX19zZWFyY2hcIikuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkNcIikpO1xyXG5cclxuICAgICAgICBjb25zdCBmaWx0ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBcImFsbFwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QjVCXHU5MDA5X1x1NTE2OFx1OTBFOF9cdTYzQ0ZcdThGRjBcIiksXHJcbiAgICAgICAgICAgIFwiZW5hYmxlZFwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QjVCXHU5MDA5X1x1NEVDNVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjBcIiksXHJcbiAgICAgICAgICAgIFwiZGlzYWJsZWRcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0I1Qlx1OTAwOV9cdTRFQzVcdTc5ODFcdTc1MjhfXHU2M0NGXHU4RkYwXCIpLFxyXG4gICAgICAgICAgICBcImdyb3VwZWRcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0I1Qlx1OTAwOV9cdTVERjJcdTUyMDZcdTdFQzRfXHU2M0NGXHU4RkYwXCIpLFxyXG4gICAgICAgICAgICBcInVuZ3JvdXBlZFwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QjVCXHU5MDA5X1x1NjcyQVx1NTIwNlx1N0VDNF9cdTYzQ0ZcdThGRjBcIiksXHJcbiAgICAgICAgICAgIFwidGFnZ2VkXCI6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCNUJcdTkwMDlfXHU2NzA5XHU2ODA3XHU3QjdFX1x1NjNDRlx1OEZGMFwiKSxcclxuICAgICAgICAgICAgXCJ1bnRhZ2dlZFwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QjVCXHU5MDA5X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTYzQ0ZcdThGRjBcIiksXHJcbiAgICAgICAgICAgIFwibm90ZWRcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0I1Qlx1OTAwOV9cdTY3MDlcdTdCMTRcdThCQjBfXHU2M0NGXHU4RkYwXCIpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gXHU4RkM3XHU2RUU0XHU1NjY4XHJcbiAgICAgICAgY29uc3QgZmlsdGVyRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgZmlsdGVyRHJvcGRvd24uYWRkT3B0aW9ucyhmaWx0ZXJPcHRpb25zKTtcclxuICAgICAgICBmaWx0ZXJEcm9wZG93bi5zZXRWYWx1ZSh0aGlzLmZpbHRlciB8fCBcImFsbFwiKTtcclxuICAgICAgICBmaWx0ZXJEcm9wZG93bi5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU1MjA2XHU3RUM0XHU5MDA5XHU2MkU5XHU1MjE3XHU4ODY4XHJcbiAgICAgICAgY29uc3QgZ3JvdXBDb3VudHMgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMucmVkdWNlKChhY2M6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0sIHBsdWdpbikgPT4geyBjb25zdCBncm91cElkID0gcGx1Z2luLmdyb3VwIHx8IFwiXCI7IGFjY1tncm91cElkXSA9IChhY2NbZ3JvdXBJZF0gfHwgMCkgKyAxOyByZXR1cm4gYWNjOyB9LCB7IFwiXCI6IDAgfSk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5zZXR0aW5ncy5HUk9VUFMucmVkdWNlKChhY2M6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0sIGl0ZW0pID0+IHsgYWNjW2l0ZW0uaWRdID0gYCR7aXRlbS5uYW1lfSBbJHtncm91cENvdW50c1tpdGVtLmlkXSB8fCAwfV1gOyByZXR1cm4gYWNjOyB9LCB7IFwiXCI6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTkwMUFcdTc1MjhfXHU2NUUwXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQ1wiKSB9KTtcclxuICAgICAgICBjb25zdCBncm91cHNEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudChzZWFyY2hCYXIuY29udHJvbEVsKTtcclxuICAgICAgICBncm91cHNEcm9wZG93bi5hZGRPcHRpb25zKGdyb3Vwcyk7XHJcbiAgICAgICAgZ3JvdXBzRHJvcGRvd24uc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRSA/IHRoaXMuc2V0dGluZ3MuRklMVEVSX0dST1VQIDogdGhpcy5ncm91cCk7XHJcbiAgICAgICAgZ3JvdXBzRHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLkZJTFRFUl9HUk9VUCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU2ODA3XHU3QjdFXHU5MDA5XHU2MkU5XHU1MjE3XHU4ODY4XHJcbiAgICAgICAgY29uc3QgdGFnQ291bnRzOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zLnJlZHVjZSgoYWNjLCBwbHVnaW4pID0+IHsgcGx1Z2luLnRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7IGFjY1t0YWddID0gKGFjY1t0YWddIHx8IDApICsgMTsgfSk7IHJldHVybiBhY2M7IH0sIHt9IGFzIHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0pO1xyXG4gICAgICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnNldHRpbmdzLlRBR1MucmVkdWNlKChhY2M6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0sIGl0ZW0pID0+IHsgYWNjW2l0ZW0uaWRdID0gYCR7aXRlbS5uYW1lfSBbJHt0YWdDb3VudHNbaXRlbS5pZF0gfHwgMH1dYDsgcmV0dXJuIGFjYzsgfSwgeyBcIlwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkNcIikgfSk7XHJcbiAgICAgICAgY29uc3QgdGFnc0Ryb3Bkb3duID0gbmV3IERyb3Bkb3duQ29tcG9uZW50KHNlYXJjaEJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIHRhZ3NEcm9wZG93bi5hZGRPcHRpb25zKHRhZ3MpO1xyXG4gICAgICAgIHRhZ3NEcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFID8gdGhpcy5zZXR0aW5ncy5GSUxURVJfVEFHIDogdGhpcy50YWcpO1xyXG4gICAgICAgIHRhZ3NEcm9wZG93bi5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuUEVSU0lTVEVOQ0UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuRklMVEVSX1RBRyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY0MUNcdTdEMjJcdTg4NENdIFx1NUVGNlx1OEZERlx1OTAwOVx1NjJFOVx1NTIxN1x1ODg2OFxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5Q291bnRzID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zLnJlZHVjZSgoYWNjOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9LCBwbHVnaW4pID0+IHsgY29uc3QgZGVsYXkgPSBwbHVnaW4uZGVsYXkgfHwgXCJcIjsgYWNjW2RlbGF5XSA9IChhY2NbZGVsYXldIHx8IDApICsgMTsgcmV0dXJuIGFjYzsgfSwgeyBcIlwiOiAwIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxheXMgPSB0aGlzLnNldHRpbmdzLkRFTEFZUy5yZWR1Y2UoKGFjYzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgaXRlbSkgPT4geyBhY2NbaXRlbS5pZF0gPSBgJHtpdGVtLm5hbWV9ICgke2RlbGF5Q291bnRzW2l0ZW0uaWRdIHx8IDB9KWA7IHJldHVybiBhY2M7IH0sIHsgXCJcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDXCIpIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxheXNEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudChzZWFyY2hCYXIuY29udHJvbEVsKTtcclxuICAgICAgICAgICAgZGVsYXlzRHJvcGRvd24uYWRkT3B0aW9ucyhkZWxheXMpO1xyXG4gICAgICAgICAgICBkZWxheXNEcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFID8gdGhpcy5zZXR0aW5ncy5GSUxURVJfREVMQVkgOiB0aGlzLmRlbGF5KTtcclxuICAgICAgICAgICAgZGVsYXlzRHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuRklMVEVSX0RFTEFZID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU2NDFDXHU3RDIyXHU2ODQ2XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbCA9IG5ldyBTZWFyY2hDb21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbC5vbkNoYW5nZSgodmFsdWU6IHN0cmluZykgPT4geyB0aGlzLnNlYXJjaFRleHQgPSB2YWx1ZTsgdGhpcy5yZWxvYWRTaG93RGF0YSgpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2hvd0RhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgcGx1Z2luczogUGx1Z2luTWFuaWZlc3RbXSA9IE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cyk7XHJcbiAgICAgICAgcGx1Z2lucy5zb3J0KChpdGVtMSwgaXRlbTIpID0+IHsgcmV0dXJuIGl0ZW0xLm5hbWUubG9jYWxlQ29tcGFyZShpdGVtMi5uYW1lKTsgfSk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5UGx1Z2lucyA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHBsdWdpbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgTWFuYWdlclBsdWdpbiA9IHRoaXMubWFuYWdlci5zZXR0aW5ncy5QbHVnaW5zLmZpbmQoKG1wKSA9PiBtcC5pZCA9PT0gcGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgY29uc3QgcGx1Z2luRGlyID0gcGF0aC5qb2luKHRoaXMuYmFzZVBhdGgsIHBsdWdpbi5kaXIgPyBwbHVnaW4uZGlyIDogXCJcIik7XHJcbiAgICAgICAgICAgIC8vIFx1NjNEMlx1NEVGNlx1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRlxyXG4gICAgICAgICAgICBjb25zdCBpc0VuYWJsZWQgPSB0aGlzLnNldHRpbmdzLkRFTEFZID8gTWFuYWdlclBsdWdpbj8uZW5hYmxlZCA6IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVkUGx1Z2lucy5oYXMocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgaWYgKE1hbmFnZXJQbHVnaW4pIHtcclxuICAgICAgICAgICAgICAgIC8vIFtcdThGQzdcdTZFRTRdIFx1Njc2MVx1NEVGNlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmFibGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNFbmFibGVkKSBjb250aW51ZTsgLy8gXHU0RUM1XHU2NjNFXHU3OTNBXHU1NDJGXHU3NTI4XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkaXNhYmxlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbmFibGVkKSBjb250aW51ZTsgLy8gXHU0RUM1XHU2NjNFXHU3OTNBXHU3OTgxXHU3NTI4XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJncm91cGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYW5hZ2VyUGx1Z2luLmdyb3VwID09PSBcIlwiKSBjb250aW51ZTsgLy8gXHU0RUM1XHU2NjNFXHU3OTNBXHU2NzA5XHU1MjA2XHU3RUM0XHU3Njg0XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1bmdyb3VwZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hbmFnZXJQbHVnaW4uZ3JvdXAgIT09IFwiXCIpIGNvbnRpbnVlOyAvLyBcdTRFQzVcdTY2M0VcdTc5M0FcdTY3MkFcdTUyMDZcdTdFQzRcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRhZ2dlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWFuYWdlclBsdWdpbi50YWdzLmxlbmd0aCA9PT0gMCkgY29udGludWU7IC8vIFx1NEZFRVx1NkI2M1x1NEUzQVx1NjgwN1x1N0I3RVx1NjU3MFx1N0VDNFx1OTU3Rlx1NUVBNlx1NTIyNFx1NjVBRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidW50YWdnZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hbmFnZXJQbHVnaW4udGFncy5sZW5ndGggPiAwKSBjb250aW51ZTsgIC8vIFx1NEZFRVx1NkI2M1x1NEUzQVx1NjgwN1x1N0I3RVx1NjU3MFx1N0VDNFx1OTU3Rlx1NUVBNlx1NTIyNFx1NjVBRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm90ZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFNYW5hZ2VyUGx1Z2luLm5vdGUgfHwgTWFuYWdlclBsdWdpbi5ub3RlID09PSBcIlwiKSBjb250aW51ZTsgLy8gXHU2NUIwXHU1ODlFXHU3QjE0XHU4QkIwXHU1MjI0XHU2NUFEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBcdTUxNzZcdTRFRDZcdTYwQzVcdTUxQjVcdTY2M0VcdTc5M0FcdTYyNDBcdTY3MDlcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFtcdThGQzdcdTZFRTRdIFx1N0I1Qlx1OTAwOVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuUEVSU0lTVEVOQ0UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXSBcdTUyMDZcdTdFQzRcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5GSUxURVJfR1JPVVAgIT09IFwiXCIgJiYgTWFuYWdlclBsdWdpbi5ncm91cCAhPT0gdGhpcy5zZXR0aW5ncy5GSUxURVJfR1JPVVApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTY0MUNcdTdEMjJdIFx1NjgwN1x1N0I3RVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkZJTFRFUl9UQUcgIT09IFwiXCIgJiYgIU1hbmFnZXJQbHVnaW4udGFncy5pbmNsdWRlcyh0aGlzLnNldHRpbmdzLkZJTFRFUl9UQUcpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXSBcdTY4MDdcdTdCN0VcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5GSUxURVJfREVMQVkgIT09IFwiXCIgJiYgTWFuYWdlclBsdWdpbi5kZWxheSAhPT0gdGhpcy5zZXR0aW5ncy5GSUxURVJfREVMQVkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXSBcdTUyMDZcdTdFQzRcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm91cCAhPT0gXCJcIiAmJiBNYW5hZ2VyUGx1Z2luLmdyb3VwICE9PSB0aGlzLmdyb3VwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXSBcdTY4MDdcdTdCN0VcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50YWcgIT09IFwiXCIgJiYgIU1hbmFnZXJQbHVnaW4udGFncy5pbmNsdWRlcyh0aGlzLnRhZykpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTY0MUNcdTdEMjJdIFx1NjgwN1x1N0I3RVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlbGF5ICE9PSBcIlwiICYmIE1hbmFnZXJQbHVnaW4uZGVsYXkgIT09IHRoaXMuZGVsYXkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OEZDN1x1NkVFNF0gXHU2NDFDXHU3RDIyXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hUZXh0ICE9PSBcIlwiICYmIE1hbmFnZXJQbHVnaW4ubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCkpID09IC0xICYmIE1hbmFnZXJQbHVnaW4uZGVzYy50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCkpID09IC0xICYmIHBsdWdpbi5hdXRob3IudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpKSA9PSAtMSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAvLyBbXHU4RkM3XHU2RUU0XSBcdTk2OTBcdTg1Q0ZcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkhJREVTLmluY2x1ZGVzKHBsdWdpbi5pZCkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gW1x1OEZDN1x1NkVFNF0gXHU4MUVBXHU4RUFCXHJcbiAgICAgICAgICAgICAgICBpZiAocGx1Z2luLmlkID09PSB0aGlzLm1hbmFnZXIubWFuaWZlc3QuaWQpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1FbCA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5zZXRDbGFzcyhcIm1hbmFnZXItaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWl0ZW1fX25hbWUtY29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLmRlc2NFbC5hZGRDbGFzcyhcIm1hbmFnZXItaXRlbV9fZGVzY3JpcHRpb24tY29udGFpbmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFtcdTUzRjNcdTk1MkVcdTY0Q0RcdTRGNUNdXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuc2V0dGluZ0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBcdTk2M0JcdTZCNjJcdTlFRDhcdThCQTRcdTc2ODRcdTUzRjNcdTk1MkVcdTgzRENcdTUzNTVcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51ID0gbmV3IE1lbnUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBcdTdCMkNcdTRFMDBcdTdFQzRcdUZGMUFcdTYzRDJcdTRFRjZcdTRGRTFcdTYwNkZcdTdDN0JcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU4M0RDXHU1MzU1XSBHSVRIVUJcclxuICAgICAgICAgICAgICAgICAgICBtZW51LmFkZEl0ZW0oKGl0ZW0pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0VGl0bGUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1ODNEQ1x1NTM1NV9HaXRIdWJfXHU2ODA3XHU5ODk4XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldEljb24oXCJnaXRodWJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHsgd2luZG93Lm9wZW4oYG9ic2lkaWFuOi8vQlBNLXBsdWdpbi1naXRodWI/aWQ9JHtwbHVnaW4uaWR9YCkgfSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUuYWRkU2VwYXJhdG9yKCk7IC8vIFx1NTIwNlx1OTY5NFx1N0IyNlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFx1N0IyQ1x1NEU4Q1x1N0VDNFx1RkYxQVx1NjNEMlx1NEVGNlx1N0JBMVx1NzQwNlx1N0M3QlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTgzRENcdTUzNTVdIFx1NTM1NVx1NkIyMVx1NTQyRlx1NTJBOFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5ERUxBWSkgbWVudS5hZGRJdGVtKChpdGVtKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNldFRpdGxlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTgzRENcdTUzNTVfXHU1MzU1XHU2QjIxXHU1NDJGXHU1MkE4X1x1NjNDRlx1OEZGMFwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRJY29uKFwicmVwZWF0LTFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXREaXNhYmxlZChpc0VuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlx1NUYwMFx1NTQyRlx1NEUyRFx1RkYwQ1x1OEJGN1x1N0EwRFx1N0I0OVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU4M0RDXHU1MzU1XSBcdTkxQ0RcdTU0MkZcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuREVMQVkpIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRUaXRsZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU4M0RDXHU1MzU1X1x1OTFDRFx1NTQyRlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjBcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbihcInJlZnJlc2gtY2N3XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0RGlzYWJsZWQoIWlzRW5hYmxlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiXHU5MUNEXHU1NDJGXHU0RTJEXHVGRjBDXHU4QkY3XHU3QTBEXHU3QjQ5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5kaXNhYmxlUGx1Z2luQW5kU2F2ZShwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTgzRENcdTUzNTVdIFx1OTY5MFx1ODVDRlx1NjNEMlx1NEVGNlxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRUaXRsZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU4M0RDXHU1MzU1X1x1OTY5MFx1ODVDRlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OThcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbihcImV5ZS1vZmZcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0hpZGRlbiA9IHRoaXMuc2V0dGluZ3MuSElERVMuaW5jbHVkZXMocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNIaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5ISURFUyA9IHRoaXMuc2V0dGluZ3MuSElERVMuZmlsdGVyKGlkID0+IGlkICE9PSBwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuSElERVMucHVzaChwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTgzRENcdTUzNTVdIFx1NTIwNlx1NEVBQlx1NjNEMlx1NEVGNlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaXRlbS5zZXRUaXRsZShcIlx1NTIwNlx1NEVBQlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OThcIilcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIC5zZXRJY29uKFwic2hhcmUtMlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk1hbmlmZXN0W10gPSBPYmplY3QudmFsdWVzKHRoaXMuYXBwUGx1Z2lucy5tYW5pZmVzdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHBsdWdpbnMuc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiB7IHJldHVybiBpdGVtMS5uYW1lLmxvY2FsZUNvbXBhcmUoaXRlbTIubmFtZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZW51LmFkZFNlcGFyYXRvcigpOyAvLyBcdTUyMDZcdTk2OTRcdTdCMjZcclxuICAgICAgICAgICAgICAgICAgICAvLyBcdTdCMkNcdTRFMDlcdTdFQzRcdUZGMUFcdTYzRDJcdTRFRjZcdThCQkVcdTdGNkVcdTdDN0JcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU4M0RDXHU1MzU1XSBcdTYzRDJcdTRFRjZcdTdCMTRcdThCQjBcclxuICAgICAgICAgICAgICAgICAgICBtZW51LmFkZEl0ZW0oKGl0ZW0pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0VGl0bGUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1ODNEQ1x1NTM1NV9cdTdCMTRcdThCQjBfXHU2ODA3XHU5ODk4XCIpKS5zZXRJY29uKFwibm90ZWJvb2stcGVuXCIpLm9uQ2xpY2soKCkgPT4geyBuZXcgTm90ZU1vZGFsKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIsIE1hbmFnZXJQbHVnaW4sIHRoaXMpLm9wZW4oKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTgzRENcdTUzNTVdIFx1NUZFQlx1NjM3N1x1OTUyRVxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRUaXRsZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU4M0RDXHU1MzU1X1x1NUZFQlx1NjM3N1x1OTUyRV9cdTY4MDdcdTk4OThcIikpLnNldEljb24oXCJjaXJjbGUtcGx1c1wiKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwU2V0dGluZy5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFNldHRpbmcub3BlblRhYkJ5SWQoXCJob3RrZXlzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFiID0gYXdhaXQgdGhpcy5hcHBTZXR0aW5nLmFjdGl2ZVRhYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5zZWFyY2hDb21wb25lbnQuaW5wdXRFbC52YWx1ZSA9IHBsdWdpbi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi51cGRhdGVIb3RrZXlWaXNpYmlsaXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWIuc2VhcmNoQ29tcG9uZW50LmlucHV0RWwuYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW1x1ODNEQ1x1NTM1NV0gXHU1OTBEXHU1MjM2SURcclxuICAgICAgICAgICAgICAgICAgICBtZW51LmFkZEl0ZW0oKGl0ZW0pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0VGl0bGUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1ODNEQ1x1NTM1NV9cdTU5MERcdTUyMzZJRF9cdTY4MDdcdTk4OThcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbihcImNvcHlcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1OTAxQVx1NzdFNV9JRFx1NURGMlx1NTkwRFx1NTIzNlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXHU3QjJDXHU0RTA5XHU3RUM0XHVGRjFBXHU2RDRCXHU4QkQ1XHU3QzdCXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWVudS5hZGRTZXBhcmF0b3IoKTsgLy8gXHU1MjA2XHU5Njk0XHU3QjI2XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaXRlbS5zZXRUaXRsZShcIlx1NjI1M1x1NUYwMFx1NUUwMlx1NTczQVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLnNldEljb24oXCJzdG9yZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMuYXBwLnNldHRpbmcub3BlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMuYXBwLnNldHRpbmcub3BlblRhYkJ5SWQoXCJjb21tdW5pdHktcGx1Z2luc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyAvLyBcdTUzRUZcdTkwMDlcdUZGMUFcdTgxRUFcdTUyQThcdTgwNUFcdTcxMjZcdTY0MUNcdTdEMjJcdTY4NDZcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyBjb25zdCB0YWIgPSBhd2FpdCB0aGlzLmFwcC5zZXR0aW5nLmFjdGl2ZVRhYjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyB0YWIuc2VhcmNoQ29tcG9uZW50LmlucHV0RWwuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBTZXR0aW5nLm9wZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFNldHRpbmcub3BlblRhYkJ5SWQoXCJjb21tdW5pdHktcGx1Z2luc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFwcFNldHRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zdCB0YWIgPSBhd2FpdCB0aGlzLmFwcFNldHRpbmcuYWN0aXZlVGFiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zdCBidXR0b24gPSB0YWIuY29udGFpbmVyRWwucXVlcnlTZWxlY3RvcignYnV0dG9uLm1vZC1jdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbikgKGJ1dHRvbiBhcyBIVE1MRWxlbWVudCkuY2xpY2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBtZW51LmFkZFNlcGFyYXRvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaXRlbS5zZXRUaXRsZShcIlx1NTIwNlx1N0VDNFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLnNldEljb24oXCJncm91cFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaXRlbS5zZXRUaXRsZShcIlx1NjgwN1x1N0I3RVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLnNldEljb24oXCJ0YWdzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAuc2V0RGlzYWJsZWQoaXNFbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUuc2hvd0F0UG9zaXRpb24oeyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkZBREVfT1VUX0RJU0FCTEVEX1BMVUdJTlMgJiYgIWlzRW5hYmxlZCkgaXRlbUVsLnNldHRpbmdFbC5hZGRDbGFzcyhcImluYWN0aXZlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFtcdTYyNzlcdTkxQ0ZcdTY0Q0RcdTRGNUNdXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlQbHVnaW5zLnB1c2gocGx1Z2luKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGXVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVkaXRvck1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc2V0dGluZ3MuSVRFTV9TVFlMRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYWx3YXlzRXhwYW5kXCI6IGl0ZW1FbC5kZXNjRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWRpc3BsYXktYmxvY2tcIik7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmV2ZXJFeHBhbmRcIjogaXRlbUVsLmRlc2NFbC5hZGRDbGFzcyhcIm1hbmFnZXItZGlzcGxheS1ub25lXCIpOyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImhvdmVyRXhwYW5kXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLmFkZENsYXNzKFwibWFuYWdlci1kaXNwbGF5LW5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuc2V0dGluZ0VsLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtb3VzZWVudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLnJlbW92ZUNsYXNzKFwibWFuYWdlci1kaXNwbGF5LW5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWRpc3BsYXktYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5zZXR0aW5nRWwuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1vdXNlbGVhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwucmVtb3ZlQ2xhc3MoXCJtYW5hZ2VyLWRpc3BsYXktYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWRpc3BsYXktbm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGlja0V4cGFuZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUVsLmRlc2NFbC5hZGRDbGFzcyhcIm1hbmFnZXItZGlzcGxheS1ub25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUVsLnNldHRpbmdFbC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhjbHVkZWRCdXR0b25zID0gQXJyYXkuZnJvbShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5jb250cm9sRWwucXVlcnlTZWxlY3RvckFsbChcImRpdlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGNsdWRlZEJ1dHRvbnMuaW5jbHVkZXMoZXZlbnQudGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwuaGFzQ2xhc3MoXCJtYW5hZ2VyLWRpc3BsYXktbm9uZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwucmVtb3ZlQ2xhc3MoXCJtYW5hZ2VyLWRpc3BsYXktbm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWRpc3BsYXktYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLnJlbW92ZUNsYXNzKFwibWFuYWdlci1kaXNwbGF5LWJsb2NrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUVsLmRlc2NFbC5hZGRDbGFzcyhcIm1hbmFnZXItZGlzcGxheS1ub25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU5RUQ4XHU4QkE0XSBcdTUyMDZcdTdFQzRcclxuICAgICAgICAgICAgICAgIGlmIChNYW5hZ2VyUGx1Z2luLmdyb3VwICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBjcmVhdGVTcGFuKHsgY2xzOiBcIm1hbmFnZXItaXRlbV9fbmFtZS1ncm91cFwiLCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKGdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zZXR0aW5ncy5HUk9VUFMuZmluZCgodCkgPT4gdC5pZCA9PT0gTWFuYWdlclBsdWdpbi5ncm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFnID0gdGhpcy5tYW5hZ2VyLmNyZWF0ZVRhZyhpdGVtLm5hbWUsIGl0ZW0uY29sb3IsIHRoaXMuc2V0dGluZ3MuR1JPVVBfU1RZTEUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0b3JNb2RlKSB0YWcub25jbGljayA9ICgpID0+IHsgbmV3IEdyb3VwTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgdGhpcywgTWFuYWdlclBsdWdpbikub3BlbigpOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFtcdTdGMTZcdThGOTFdIFx1NTIwNlx1N0VDNFxyXG4gICAgICAgICAgICAgICAgaWYgKE1hbmFnZXJQbHVnaW4uZ3JvdXAgPT09IFwiXCIgJiYgdGhpcy5lZGl0b3JNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBjcmVhdGVTcGFuKHsgY2xzOiBcIm1hbmFnZXItaXRlbV9fbmFtZS1ncm91cFwiLCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0b3JNb2RlKSBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKGdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKFwiK1wiLCBcIlwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0b3JNb2RlKSB0YWcub25jbGljayA9ICgpID0+IHsgbmV3IEdyb3VwTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgdGhpcywgTWFuYWdlclBsdWdpbikub3BlbigpOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvck1vZGUpIGdyb3VwLmFwcGVuZENoaWxkKHRhZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU1NDBEXHU3OUYwXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZVNwYW4oeyB0ZXh0OiBNYW5hZ2VyUGx1Z2luLm5hbWUsIHRpdGxlOiBwbHVnaW4ubmFtZSwgY2xzOiBcIm1hbmFnZXItaXRlbV9fbmFtZS10aXRsZVwiLCB9KTtcclxuICAgICAgICAgICAgICAgIC8vIFtcdTdGMTZcdThGOTFdIFx1NTQwRFx1NzlGMFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiYm9yZGVyLXdpZHRoOiAxcHg7Ym9yZGVyLXN0eWxlOiBkYXNoZWQ7XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZShcImNvbnRlbnRlZGl0YWJsZVwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyUGx1Z2luLm5hbWUgPSB0aXRsZS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU5RUQ4XHU4QkE0XSBcdTcyNDhcdTY3MkNcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZlcnNpb24gPSBjcmVhdGVTcGFuKHsgdGV4dDogYFske3BsdWdpbi52ZXJzaW9ufV1gLCBjbHM6IFtcIm1hbmFnZXItaXRlbV9fbmFtZS12ZXJzaW9uXCJdLCB9KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYXBwZW5kQ2hpbGQodmVyc2lvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU3QjE0XHU4QkIwXHU1NkZFXHU2ODA3XHJcbiAgICAgICAgICAgICAgICBpZiAoTWFuYWdlclBsdWdpbi5ub3RlPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm90ZSA9IGNyZWF0ZVNwYW4oKTtcclxuICAgICAgICAgICAgICAgICAgICBub3RlLnN0eWxlLmNzc1RleHQgPSBcIndpZHRoOjE2cHg7IGhlaWdodDoxNnB4OyBkaXNwbGF5OmlubGluZS1mbGV4OyBjb2xvcjogdmFyKC0tdGV4dC1hY2NlbnQpO1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgbmV3IE5vdGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyLCBNYW5hZ2VyUGx1Z2luLCB0aGlzKS5vcGVuKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYXBwZW5kQ2hpbGQobm90ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0SWNvbihub3RlLCBcIm5vdGVib29rLXBlblwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU5RUQ4XHU4QkE0XSBcdTVFRjZcdThGREZcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZICYmICF0aGlzLmVkaXRvck1vZGUgJiYgTWFuYWdlclBsdWdpbi5kZWxheSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSB0aGlzLnNldHRpbmdzLkRFTEFZUy5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSBNYW5hZ2VyUGx1Z2luLmRlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxheSA9IGNyZWF0ZVNwYW4oeyB0ZXh0OiBgJHtkLnRpbWV9c2AsIGNsczogW1wibWFuYWdlci1pdGVtX19uYW1lLWRlbGF5XCJdLCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZChkZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU2M0NGXHU4RkYwXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjID0gY3JlYXRlRGl2KHsgdGV4dDogTWFuYWdlclBsdWdpbi5kZXNjLCB0aXRsZTogcGx1Z2luLmRlc2NyaXB0aW9uLCBjbHM6IFtcIm1hbmFnZXItaXRlbV9fbmFtZS1kZXNjXCJdLCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU3RjE2XHU4RjkxXSBcdTYzQ0ZcdThGRjBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvck1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiYm9yZGVyLXdpZHRoOiAxcHg7Ym9yZGVyLXN0eWxlOiBkYXNoZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYy5zZXRBdHRyaWJ1dGUoXCJjb250ZW50ZWRpdGFibGVcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2MuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2MudGV4dENvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXJQbHVnaW4uZGVzYyA9IGRlc2MudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwuYXBwZW5kQ2hpbGQoZGVzYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU2ODA3XHU3QjdFXHU3RUM0XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdzID0gY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLmFwcGVuZENoaWxkKHRhZ3MpO1xyXG4gICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi50YWdzLm1hcCgoaWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnNldHRpbmdzLlRBR1MuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoaXRlbS5uYW1lLCBpdGVtLmNvbG9yLCB0aGlzLnNldHRpbmdzLlRBR19TVFlMRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvck1vZGUpIHRhZy5vbmNsaWNrID0gKCkgPT4geyBuZXcgVGFnc01vZGFsKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIsIHRoaXMsIE1hbmFnZXJQbHVnaW4pLm9wZW4oKTsgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFncy5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFtcdTdGMTZcdThGOTFdIFx1NjgwN1x1N0I3RVx1N0VDNFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoXCIrXCIsIFwiXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZy5vbmNsaWNrID0gKCkgPT4geyBuZXcgVGFnc01vZGFsKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIsIHRoaXMsIE1hbmFnZXJQbHVnaW4pLm9wZW4oKTsgfTtcclxuICAgICAgICAgICAgICAgICAgICB0YWdzLmFwcGVuZENoaWxkKHRhZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVkaXRvck1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2MzA5XHU5NEFFXSBcdTYyNTNcdTVGMDBcdThCQkVcdTdGNkVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5QbHVnaW5TZXR0aW5nID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KGl0ZW1FbC5jb250cm9sRWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuUGx1Z2luU2V0dGluZy5zZXRJY29uKFwic2V0dGluZ3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5QbHVnaW5TZXR0aW5nLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlblBsdWdpblNldHRpbmcub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuUGx1Z2luU2V0dGluZy5zZXREaXNhYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwU2V0dGluZy5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcFNldHRpbmcub3BlblRhYkJ5SWQocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5QbHVnaW5TZXR0aW5nLnNldERpc2FibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2MzA5XHU5NEFFXSBcdTYyNTNcdTVGMDBcdTc2RUVcdTVGNTVcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcGVuUGx1Z2luRGlyQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KGl0ZW1FbC5jb250cm9sRWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5QbHVnaW5EaXJCdXR0b24uc2V0SWNvbihcImZvbGRlci1vcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5QbHVnaW5EaXJCdXR0b24uc2V0VG9vbHRpcCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NV9cdTYzQ0ZcdThGRjBcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5QbHVnaW5EaXJCdXR0b24ub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5QbHVnaW5EaXJCdXR0b24uc2V0RGlzYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXJPcGVuKHBsdWdpbkRpciwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlblBsdWdpbkRpckJ1dHRvbi5zZXREaXNhYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTYzMDlcdTk0QUVdIFx1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZVBsdWdpbkJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudChpdGVtRWwuY29udHJvbEVsKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVQbHVnaW5CdXR0b24uc2V0SWNvbihcInRyYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZVBsdWdpbkJ1dHRvbi5zZXRUb29sdGlwKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlUGx1Z2luQnV0dG9uLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGVsZXRlTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLnVuaW5zdGFsbFBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmxvYWRNYW5pZmVzdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFx1NTIzN1x1NjVCMFx1NTQ3RFx1NEVFNFx1ODg0Q1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcdTUyMjBcdTk2NjRcdTU0MENcdTc0MDZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zeW5jaHJvbml6ZVBsdWdpbnMoT2JqZWN0LnZhbHVlcyh0aGlzLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5maWx0ZXIoKHBtOiBQbHVnaW5NYW5pZmVzdCkgPT4gcG0uaWQgIT09IHRoaXMubWFuYWdlci5tYW5pZmVzdC5pZCkgYXMgUGx1Z2luTWFuaWZlc3RbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTUzNzhcdThGN0RfXHU5MDFBXHU3N0U1X1x1NEUwMFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLm9wZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW1x1NjMwOVx1OTRBRV0gXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9nZ2xlU3dpdGNoID0gbmV3IFRvZ2dsZUNvbXBvbmVudChpdGVtRWwuY29udHJvbEVsKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVTd2l0Y2guc2V0VG9vbHRpcCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIwN1x1NjM2Mlx1NzJCNlx1NjAwMV9cdTYzQ0ZcdThGRjBcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVN3aXRjaC5zZXRWYWx1ZShpc0VuYWJsZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVN3aXRjaC5vbkNoYW5nZShhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlU3dpdGNoLmdldFZhbHVlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5GQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TKSBpdGVtRWwuc2V0dGluZ0VsLnJlbW92ZUNsYXNzKFwiaW5hY3RpdmVcIik7IC8vIFtcdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5GQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TKSBpdGVtRWwuc2V0dGluZ0VsLmFkZENsYXNzKFwiaW5hY3RpdmVcIik7IC8vIFtcdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5kaXNhYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlU3dpdGNoLmdldFZhbHVlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5GQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TKSBpdGVtRWwuc2V0dGluZ0VsLnJlbW92ZUNsYXNzKFwiaW5hY3RpdmVcIik7IC8vIFtcdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbkFuZFNhdmUocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuRkFERV9PVVRfRElTQUJMRURfUExVR0lOUykgaXRlbUVsLnNldHRpbmdFbC5hZGRDbGFzcyhcImluYWN0aXZlXCIpOyAvLyBbXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5kaXNhYmxlUGx1Z2luQW5kU2F2ZShwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTYzMDlcdTk0QUVdIFx1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbG9hZEJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudChpdGVtRWwuY29udHJvbEVsKTtcclxuICAgICAgICAgICAgICAgICAgICByZWxvYWRCdXR0b24uc2V0SWNvbihcInJlZnJlc2gtY2N3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbG9hZEJ1dHRvbi5zZXRUb29sdGlwKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsb2FkQnV0dG9uLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyUGx1Z2luLm5hbWUgPSBwbHVnaW4ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5kZXNjID0gcGx1Z2luLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyUGx1Z2luLmdyb3VwID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5kZWxheSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXJQbHVnaW4udGFncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU3RjE2XHU4RjkxXSBcdTVFRjZcdThGREZcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ERUxBWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxheXMgPSB0aGlzLnNldHRpbmdzLkRFTEFZUy5yZWR1Y2UoKGFjYzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgaXRlbSkgPT4geyBhY2NbaXRlbS5pZF0gPSBpdGVtLm5hbWU7IHJldHVybiBhY2M7IH0sIHsgXCJcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDXCIpLCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsYXlzRWwgPSBuZXcgRHJvcGRvd25Db21wb25lbnQoaXRlbUVsLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5c0VsLmFkZE9wdGlvbnMoZGVsYXlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlzRWwuc2V0VmFsdWUoTWFuYWdlclBsdWdpbi5kZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5c0VsLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5kZWxheSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gXHU4QkExXHU3Qjk3XHU5ODc1XHU1QzNFXHJcbiAgICAgICAgdGhpcy5mb290RWwuaW5uZXJIVE1MID0gdGhpcy5jb3VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb3VudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB0b3RhbENvdW50ID0gMDtcclxuICAgICAgICBsZXQgZW5hYmxlZENvdW50ID0gMDtcclxuICAgICAgICBsZXQgZGlzYWJsZWRDb3VudCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuREVMQVkpIHtcclxuICAgICAgICAgICAgY29uc3QgcGx1Z2lucyA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucztcclxuICAgICAgICAgICAgdG90YWxDb3VudCA9IHBsdWdpbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBwbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4geyBwbHVnaW4uZW5hYmxlZCA/IGVuYWJsZWRDb3VudCsrIDogZGlzYWJsZWRDb3VudCsrOyB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b3RhbENvdW50ID0gT2JqZWN0LmtleXModGhpcy5tYW5hZ2VyLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBlbmFibGVkQ291bnQgPSB0aGlzLm1hbmFnZXIuYXBwUGx1Z2lucy5lbmFibGVkUGx1Z2lucy5zaXplIC0gMTtcclxuICAgICAgICAgICAgZGlzYWJsZWRDb3VudCA9IHRvdGFsQ291bnQgLSBlbmFibGVkQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN1bW1hcnkgPSBgWyR7dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcclxuICAgICAgICAgICAgXCJcdTkwMUFcdTc1MjhfXHU2MDNCXHU4QkExX1x1NjU4N1x1NjcyQ1wiXHJcbiAgICAgICAgKX1dICR7dG90YWxDb3VudH0gWyR7dGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcclxuICAgICAgICAgICAgXCJcdTkwMUFcdTc1MjhfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQ1wiXHJcbiAgICAgICAgKX1dICR7ZW5hYmxlZENvdW50fSBbJHt0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFxyXG4gICAgICAgICAgICBcIlx1OTAxQVx1NzUyOF9cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDXCJcclxuICAgICAgICApfV0gJHtkaXNhYmxlZENvdW50fSBgO1xyXG4gICAgICAgIHJldHVybiBzdW1tYXJ5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyByZWxvYWRTaG93RGF0YSgpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICBjb25zdCBtb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWw7XHJcbiAgICAgICAgc2Nyb2xsVG9wID0gbW9kYWxFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICBtb2RhbEVsZW1lbnQuZW1wdHkoKTtcclxuICAgICAgICB0aGlzLnNob3dEYXRhKCk7XHJcbiAgICAgICAgbW9kYWxFbGVtZW50LnNjcm9sbFRvKDAsIHNjcm9sbFRvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG9uT3BlbigpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dIZWFkKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoRWwuaW5wdXRFbC5mb2N1cygpO1xyXG4gICAgICAgIC8vIFtcdTUyOUZcdTgwRkRdIGN0cmwrZlx1ODA1QVx1NzEyNlxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSAmJiBldmVudC5rZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJmXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaEVsLmlucHV0RWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaEVsLmlucHV0RWwuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XHJcbiAgICB9XHJcbn1cclxuIiwgImltcG9ydCB7IE5vdGljZSwgUGxhdGZvcm0gfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnbWFpbic7XHJcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG4vKipcclxuICogXHU2MjUzXHU1RjAwXHU2NTg3XHU0RUY2XHU2MjE2XHU2NTg3XHU0RUY2XHU1OTM5XHU3Njg0XHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGXHU1NDdEXHU0RUU0XHUzMDAyXHJcbiAqIEBwYXJhbSBpMThuIC0gXHU1NkZEXHU5NjQ1XHU1MzE2XHU1QkY5XHU4QzYxXHVGRjBDXHU3NTI4XHU0RThFXHU2NjNFXHU3OTNBXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU3Njg0XHU5MDFBXHU3N0U1XHUzMDAyXHJcbiAqIEBwYXJhbSBkaXIgLSBcdTg5ODFcdTYyNTNcdTVGMDBcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MzlcdThERUZcdTVGODRcdTMwMDJcclxuICogQGRlc2NyaXB0aW9uIFx1NjgzOVx1NjM2RVx1NjRDRFx1NEY1Q1x1N0NGQlx1N0VERlx1NjI2N1x1ODg0Q1x1NzZGOFx1NUU5NFx1NzY4NFx1NTQ3RFx1NEVFNFx1Njc2NVx1NjI1M1x1NUYwMFx1NjU4N1x1NEVGNlx1NTkzOVx1MzAwMlx1NTcyOFdpbmRvd3NcdTRFMEFcdTRGN0ZcdTc1Mjgnc3RhcnQnXHU1NDdEXHU0RUU0XHVGRjBDXHU1NzI4TWFjXHU0RTBBXHU0RjdGXHU3NTI4J29wZW4nXHU1NDdEXHU0RUU0XHUzMDAyXHJcbiAqIFx1NTk4Mlx1Njc5Q1x1NjRDRFx1NEY1Q1x1NjIxMFx1NTI5Rlx1RkYwQ1x1NjYzRVx1NzkzQVx1NjIxMFx1NTI5Rlx1OTAxQVx1NzdFNVx1RkYxQlx1NTk4Mlx1Njc5Q1x1NTkzMVx1OEQyNVx1RkYwQ1x1NjYzRVx1NzkzQVx1OTUxOVx1OEJFRlx1OTAxQVx1NzdFNVx1MzAwMlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1hbmFnZXJPcGVuID0gKGRpcjogc3RyaW5nLCBtYW5hZ2VyOiBNYW5hZ2VyKSA9PiB7XHJcblx0aWYgKFBsYXRmb3JtLmlzRGVza3RvcCkge1xyXG5cdFx0ZXhlYyhgc3RhcnQgXCJcIiBcIiR7ZGlyfVwiYCwgKGVycm9yKSA9PiB7XHJcblx0XHRcdGlmIChlcnJvcikgeyBuZXcgTm90aWNlKG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1OTMxXHU4RDI1X1x1NjU4N1x1NjcyQycpKTsgfSBlbHNlIHsgbmV3IE5vdGljZShtYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkMnKSk7IH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRpZiAoUGxhdGZvcm0uaXNNYWNPUykge1xyXG5cdFx0ZXhlYyhgb3BlbiAke2Rpcn1gLCAoZXJyb3IpID0+IHtcclxuXHRcdFx0aWYgKGVycm9yKSB7IG5ldyBOb3RpY2UobWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDJykpOyB9IGVsc2UgeyBuZXcgTm90aWNlKG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU2MjEwXHU1MjlGX1x1NjU4N1x1NjcyQycpKTsgfVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQbHVnaW4obW9kYWw6IFFQU01vZGFsLCBtYXRjaGluZ0l0ZW06IFBsdWdpbkluc3RhbGxlZCwgY29tbVBsdWdpbnM6IFJlY29yZDxzdHJpbmcsIFBsdWdpbkNvbW1JbmZvPikge1xyXG5cdC8vIFx1NEVDRSBtYXRjaGluZ0l0ZW0gXHU0RTJEXHU4OUUzXHU2Nzg0XHU1MUZBXHU2M0QyXHU0RUY2XHU3Njg0IElEIFx1NTQ4Q1x1NzI0OFx1NjcyQ1x1NTNGN1xyXG5cdGNvbnN0IHsgaWQsIHZlcnNpb24gfSA9IG1hdGNoaW5nSXRlbTtcclxuXHQvLyBcdTY4QzBcdTY3RTVcdTYzRDJcdTRFRjZcdTY2MkZcdTU0MjZcdTY3MDlcdTc2RUVcdTVGNTVcdTRGRTFcdTYwNkZcdUZGMENcdTU5ODJcdTY3OUNcdTZDQTFcdTY3MDlcdTUyMTlcdTY2M0VcdTc5M0FcdTYzRDBcdTc5M0FcdTRGRTFcdTYwNkZcdTVFNzZcdThGRDRcdTU2REVcclxuXHRpZiAoIW1hdGNoaW5nSXRlbS5kaXIpIHsgbmV3IE5vdGljZShgTm90IGEgcHVibGlzaGVkIHBsdWdpbmAsIDI1MDApOyByZXR1cm4gfVxyXG5cdC8vIFx1ODNCN1x1NTNENlx1NjNEMlx1NEVGNlx1NzZFRVx1NUY1NVx1NzY4NFx1NUI4Q1x1NjU3NFx1OERFRlx1NUY4NFxyXG5cdGNvbnN0IGZpbGVQYXRoID0gbW9kYWwuYXBwLnZhdWx0LmFkYXB0ZXIuZ2V0RnVsbFBhdGgobWF0Y2hpbmdJdGVtLmRpcik7XHJcblx0Ly8gXHU1OTgyXHU2NzlDXHU2NUUwXHU2Q0Q1XHU4M0I3XHU1M0Q2XHU1QjhDXHU2NTc0XHU4REVGXHU1Rjg0XHU1MjE5XHU4RkQ0XHU1NkRFXHJcblx0aWYgKCFmaWxlUGF0aCkgcmV0dXJuXHJcblxyXG5cdC8vIFx1NTk4Mlx1Njc5Q1x1NjYyRlx1Njg0Q1x1OTc2Mlx1NUU3M1x1NTNGMFxyXG5cdGlmIChQbGF0Zm9ybS5pc0Rlc2t0b3ApIHtcclxuXHRcdC8vIFx1Njc4NFx1NUVGQVx1NjNEMlx1NEVGNlx1NUYwMFx1NTNEMVx1OERFRlx1NUY4NFx1NEUwQlx1NzY4NCBwYWNrYWdlLmpzb24gXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHJcblx0XHRjb25zdCBpc0RldlBhdGggPSBwYXRoLmpvaW4oZmlsZVBhdGgsIFwicGFja2FnZS5qc29uXCIpO1xyXG5cdFx0Ly8gXHU2OEMwXHU2N0U1XHU4QkU1XHU2NTg3XHU0RUY2XHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XHVGRjBDXHU1OTgyXHU2NzlDXHU1QjU4XHU1NzI4XHU1MjE5XHU4RkQ0XHU1NkRFXHVGRjBDXHU0RTBEXHU4RkRCXHU4ODRDXHU2NkY0XHU2NUIwXHU2NENEXHU0RjVDXHJcblx0XHRpZiAoZXhpc3RzU3luYyhpc0RldlBhdGgpKSB7IHJldHVybjsgfVxyXG5cdH1cclxuXHJcblx0Ly8gXHU1RjAyXHU2QjY1XHU4M0I3XHU1M0Q2XHU2M0QyXHU0RUY2XHU3Njg0XHU2RTA1XHU1MzU1XHU2NTg3XHU0RUY2XHU0RkUxXHU2MDZGXHJcblx0Y29uc3QgbWFuaWZlc3QgPSBhd2FpdCBnZXRNYW5pZmVzdChtb2RhbCwgaWQpO1xyXG5cdC8vIFx1NTk4Mlx1Njc5Q1x1NjVFMFx1NkNENVx1ODNCN1x1NTNENlx1NkUwNVx1NTM1NVx1NjU4N1x1NEVGNlx1NTIxOVx1OEZENFx1NTZERVxyXG5cdGlmICghbWFuaWZlc3QpIHJldHVyblxyXG5cdC8vIFx1NUYwMlx1NkI2NVx1NjhDMFx1NjdFNVx1NjNEMlx1NEVGNlx1NjYyRlx1NTQyNlx1NjcwOVx1NTNFRlx1NzUyOFx1NzY4NFx1NTNEMVx1NUUwM1x1NzI0OFx1NjcyQ1xyXG5cdGNvbnN0IGhhc1JlbGVhc2UgPSBhd2FpdCBnZXRSZWxlYXNlVmVyc2lvbihtb2RhbCwgaWQsIG1hbmlmZXN0KVxyXG5cdC8vIFx1ODNCN1x1NTNENlx1NkUwNVx1NTM1NVx1NjU4N1x1NEVGNlx1NEUyRFx1NzY4NFx1NjNEMlx1NEVGNlx1NzI0OFx1NjcyQ1x1NTNGN1xyXG5cdGNvbnN0IGxhc3RWZXJzaW9uID0gbWFuaWZlc3QudmVyc2lvblxyXG5cclxuXHQvLyBcdTU5ODJcdTY3OUNcdTYzRDJcdTRFRjYgSUQgXHU0RTBEXHU1NzI4IGNvbW1QbHVnaW5zIFx1NUJGOVx1OEM2MVx1NEUyRFx1RkYwQ1x1OEJGNFx1NjYwRVx1NEUwRFx1NjYyRlx1NURGMlx1NTNEMVx1NUUwM1x1NjNEMlx1NEVGNlx1RkYwQ1x1NjYzRVx1NzkzQVx1NjNEMFx1NzkzQVx1NEZFMVx1NjA2RlxyXG5cdGlmICghKGlkIGluIGNvbW1QbHVnaW5zKSkgeyBuZXcgTm90aWNlKGBOb3QgYSBwdWJsaXNoZWQgcGx1Z2luYCwgMjUwMCk7IH1cclxuXHQvLyBcdTU5ODJcdTY3OUNcdTZDQTFcdTY3MDlcdTgzQjdcdTUzRDZcdTUyMzBcdTZFMDVcdTUzNTVcdTY1ODdcdTRFRjZcdUZGMENcdTY2M0VcdTc5M0FcdTYzRDBcdTc5M0FcdTRGRTFcdTYwNkZcclxuXHRlbHNlIGlmICghbWFuaWZlc3QpIHsgbmV3IE5vdGljZShgTm8gbWFuaWZlc3QgaW4gJHtjb21tUGx1Z2luc1tpZF0ucmVwb31gLCAzNTAwKSB9XHJcblx0Ly8gXHU1OTgyXHU2NzlDXHU2M0QyXHU0RUY2XHU2Q0ExXHU2NzA5XHU1M0VGXHU3NTI4XHU3Njg0XHU1M0QxXHU1RTAzXHU3MjQ4XHU2NzJDXHVGRjBDXHU2NjNFXHU3OTNBXHU2M0QwXHU3OTNBXHU0RkUxXHU2MDZGXHJcblx0ZWxzZSBpZiAoIWhhc1JlbGVhc2UpIHsgbmV3IE5vdGljZShgY2FuJ3QgdXBkYXRlLCB2ZXJzaW9uICR7bWFuaWZlc3QudmVyc2lvbn0gaW4gcmVwbyBoYXMgbm90IGJlZW4gcmVsZWFzZWQhYCkgfVxyXG5cdC8vIFx1NTk4Mlx1Njc5Q1x1NkUwNVx1NTM1NVx1NjU4N1x1NEVGNlx1NEUyRFx1NzY4NFx1NzI0OFx1NjcyQ1x1NTNGN1x1NUMwRlx1NEU4RVx1N0I0OVx1NEU4RVx1NUY1M1x1NTI0RFx1NURGMlx1NUI4OVx1ODhDNVx1NzY4NFx1NzI0OFx1NjcyQ1x1NTNGN1x1RkYwQ1x1OEJGNFx1NjYwRVx1NURGMlx1N0VDRlx1NjYyRlx1NjcwMFx1NjVCMFx1NzI0OFx1NjcyQ1x1RkYwQ1x1NjYzRVx1NzkzQVx1NjNEMFx1NzkzQVx1NEZFMVx1NjA2RlxyXG5cdGVsc2UgaWYgKGxhc3RWZXJzaW9uIDw9IHZlcnNpb24pIHsgbmV3IE5vdGljZShgQWxyZWFkeSBsYXN0IHZlcnNpb24gJHtsYXN0VmVyc2lvbn1gLCAyNTAwKSB9XHJcblx0Ly8gXHU2RUUxXHU4REIzXHU2NkY0XHU2NUIwXHU2NzYxXHU0RUY2XHVGRjBDXHU4RkRCXHU4ODRDXHU2M0QyXHU0RUY2XHU2NkY0XHU2NUIwXHU2NENEXHU0RjVDXHJcblx0ZWxzZSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBcdThDMDNcdTc1MjggYXBwLnBsdWdpbnMuaW5zdGFsbFBsdWdpbiBcdTY1QjlcdTZDRDVcdTVCODlcdTg4QzVcdTYzRDJcdTRFRjZcdTc2ODRcdTY1QjBcdTcyNDhcdTY3MkNcclxuXHRcdFx0YXdhaXQgbW9kYWwuYXBwLnBsdWdpbnMuaW5zdGFsbFBsdWdpbihjb21tUGx1Z2luc1tpZCFdLnJlcG8sIGxhc3RWZXJzaW9uLCBtYW5pZmVzdCk7XHJcblx0XHRcdC8vIFx1NjYzRVx1NzkzQVx1NjZGNFx1NjVCMFx1NjIxMFx1NTI5Rlx1NzY4NFx1NjNEMFx1NzkzQVx1NEZFMVx1NjA2RlxyXG5cdFx0XHRuZXcgTm90aWNlKGB2ZXJzaW9uICR7dmVyc2lvbn0gdXBkYXRlZCB0byAke2xhc3RWZXJzaW9ufWAsIDI1MDApO1xyXG5cdFx0XHQvLyBcdTY2RjRcdTY1QjAgbWF0Y2hpbmdJdGVtIFx1NEUyRFx1NzY4NFx1NjNEMlx1NEVGNlx1NzI0OFx1NjcyQ1x1NTNGN1xyXG5cdFx0XHRtYXRjaGluZ0l0ZW0udmVyc2lvbiA9IGxhc3RWZXJzaW9uXHJcblx0XHRcdC8vIFx1OEMwM1x1NzUyOFx1NjNEMlx1NEVGNlx1NzY4NCBpbnN0YWxsZWRVcGRhdGUgXHU2NUI5XHU2Q0Q1XHU4RkRCXHU4ODRDXHU2NkY0XHU2NUIwXHU2NENEXHU0RjVDXHJcblx0XHRcdGF3YWl0IG1vZGFsLnBsdWdpbi5pbnN0YWxsZWRVcGRhdGUoKTtcclxuXHRcdH0gY2F0Y2gge1xyXG5cdFx0XHQvLyBcdTVCODlcdTg4QzVcdThGQzdcdTdBMEJcdTRFMkRcdTUxRkFcdTczQjBcdTk1MTlcdThCRUZcdUZGMENcdTYyNTNcdTUzNzBcdTk1MTlcdThCRUZcdTRGRTFcdTYwNkZcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcImluc3RhbGwgZmFpbGVkXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvLyBcdTVDMDZcdTYzRDJcdTRFRjZcdTc2ODQgdG9VcGRhdGUgXHU2ODA3XHU1RkQ3XHU4QkJFXHU3RjZFXHU0RTNBIGZhbHNlXHVGRjBDXHU4ODY4XHU3OTNBXHU0RTBEXHU5NzAwXHU4OTgxXHU2NkY0XHU2NUIwXHJcblx0bWF0Y2hpbmdJdGVtLnRvVXBkYXRlID0gZmFsc2VcclxuXHQvLyBcdTkxQ0RcdTY1QjBcdTYyNTNcdTVGMDBcdTZBMjFcdTYwMDFcdTY4NDZcclxuXHRhd2FpdCByZU9wZW5Nb2RhbChtb2RhbCk7XHJcbn0iLCAiaW1wb3J0IHsgQXBwLCBFeHRyYUJ1dHRvbkNvbXBvbmVudCwgTW9kYWwsIE5vdGljZSwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MvZGF0YSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ21haW4nO1xyXG5pbXBvcnQgeyBNYW5hZ2VyTW9kYWwgfSBmcm9tICcuL21hbmFnZXItbW9kYWwnO1xyXG5pbXBvcnQgeyBNYW5hZ2VyUGx1Z2luIH0gZnJvbSAnc3JjL2RhdGEvdHlwZXMnO1xyXG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnc3JjL2NvbW1hbmQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyb3VwTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcbiAgICBzZXR0aW5nczogTWFuYWdlclNldHRpbmdzO1xyXG4gICAgbWFuYWdlcjogTWFuYWdlcjtcclxuICAgIG1hbmFnZXJNb2RhbDogTWFuYWdlck1vZGFsO1xyXG4gICAgbWFuYWdlclBsdWdpbjogTWFuYWdlclBsdWdpbjtcclxuICAgIHNlbGVjdGVkOiBzdHJpbmc7XHJcbiAgICBhZGQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIG1hbmFnZXI6IE1hbmFnZXIsIG1hbmFnZXJNb2RhbDogTWFuYWdlck1vZGFsLCBtYW5hZ2VyUGx1Z2luOiBNYW5hZ2VyUGx1Z2luKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gbWFuYWdlci5zZXR0aW5ncztcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubWFuYWdlck1vZGFsID0gbWFuYWdlck1vZGFsO1xyXG4gICAgICAgIHRoaXMubWFuYWdlclBsdWdpbiA9IG1hbmFnZXJQbHVnaW47XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICcnO1xyXG4gICAgICAgIHRoaXMuYWRkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzaG93SGVhZCgpIHtcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBjb25zdCBtb2RhbEVsOiBIVE1MRWxlbWVudCA9IHRoaXMuY29udGVudEVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgbW9kYWxFbC5hZGRDbGFzcygnbWFuYWdlci1lZGl0b3JfX2NvbnRhaW5lcicpO1xyXG4gICAgICAgIG1vZGFsRWwucmVtb3ZlQ2hpbGQobW9kYWxFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RhbC1jbG9zZS1idXR0b24nKVswXSk7XHJcbiAgICAgICAgdGhpcy50aXRsZUVsLnBhcmVudEVsZW1lbnQ/LmFkZENsYXNzKCdtYW5hZ2VyLWNvbnRhaW5lcl9faGVhZGVyJyk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoJ21hbmFnZXItaXRlbS1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjgwN1x1OTg5OFx1ODg0Q11cclxuICAgICAgICBjb25zdCB0aXRsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbCkuc2V0Q2xhc3MoJ21hbmFnZXItYmFyX190aXRsZScpLnNldE5hbWUoYFske3RoaXMubWFuYWdlclBsdWdpbi5uYW1lfV1gKTtcclxuICAgICAgICAvLyBbXHU2ODA3XHU5ODk4XHU4ODRDXSBcdTUxNzNcdTk1RURcdTYzMDlcdTk0QUVcclxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudCh0aXRsZUJhci5jb250cm9sRWwpXHJcbiAgICAgICAgY2xvc2VCdXR0b24uc2V0SWNvbignY2lyY2xlLXgnKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dEYXRhKCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5zZXR0aW5ncy5HUk9VUFMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUVsID0gbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXHJcbiAgICAgICAgICAgIGl0ZW1FbC5zZXRDbGFzcygnbWFuYWdlci1lZGl0b3JfX2l0ZW0nKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9PSAnJyB8fCB0aGlzLnNlbGVjdGVkICE9IGdyb3VwLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbignc2V0dGluZ3MnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGdyb3VwLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRUb2dnbGUoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZ3JvdXAuaWQgPT09IHRoaXMubWFuYWdlclBsdWdpbi5ncm91cClcclxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXJQbHVnaW4uZ3JvdXAgPSB0aGlzLm1hbmFnZXJQbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkID8gJycgOiBncm91cC5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXJNb2RhbC5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwRWwgPSBjcmVhdGVTcGFuKHsgY2xzOiAnbWFuYWdlci1pdGVtX19uYW1lLWdyb3VwJyB9KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYXBwZW5kQ2hpbGQoZ3JvdXBFbCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKGdyb3VwLm5hbWUsIGdyb3VwLmNvbG9yLCB0aGlzLnNldHRpbmdzLkdST1VQX1NUWUxFKTtcclxuICAgICAgICAgICAgICAgIGdyb3VwRWwuYXBwZW5kQ2hpbGQodGFnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAhPSAnJyAmJiB0aGlzLnNlbGVjdGVkID09IGdyb3VwLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkQ29sb3JQaWNrZXIoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZ3JvdXAuY29sb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgaXRlbUVsLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZ3JvdXAubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmlucHV0RWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtLWlucHV0JylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRJY29uKCd0cmFzaC0yJylcclxuICAgICAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1Rlc3RHcm91cCA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5zb21lKHBsdWdpbiA9PiBwbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNUZXN0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zZXR0aW5ncy5HUk9VUFMgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuR1JPVVBTLmZpbHRlcih0ID0+IHQuaWQgIT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDknKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbignc2F2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyTW9kYWwucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBFbCA9IGNyZWF0ZVNwYW4oeyBjbHM6ICdtYW5hZ2VyLWl0ZW1fX25hbWUtZ3JvdXAnIH0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZChncm91cEVsKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoZ3JvdXAubmFtZSwgZ3JvdXAuY29sb3IsIHRoaXMuc2V0dGluZ3MuR1JPVVBfU1RZTEUpO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBFbC5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFkZCkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAnJztcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvb2RCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCkuc2V0Q2xhc3MoJ21hbmFnZXItYmFyX190aXRsZScpO1xyXG4gICAgICAgICAgICBmb29kQmFyLmluZm9FbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgZm9vZEJhci5hZGRDb2xvclBpY2tlcihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKGNvbG9yKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGZvb2RCYXIuYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdJRCcpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7IGlkID0gdmFsdWU7IHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTsgfSlcclxuICAgICAgICAgICAgICAgIC5pbnB1dEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9faXRlbS1pbnB1dCcpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgZm9vZEJhci5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkMnKSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHsgbmFtZSA9IHZhbHVlOyB9KVxyXG4gICAgICAgICAgICAgICAgLmlucHV0RWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtLWlucHV0JylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBmb29kQmFyLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0SWNvbigncGx1cycpXHJcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbnNJZCA9IHRoaXMubWFuYWdlci5zZXR0aW5ncy5HUk9VUFMuc29tZSh0YWcgPT4gdGFnLmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluc0lkICYmIGlkICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09ICcnKSBjb2xvciA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5wdXNoKHsgaWQsIG5hbWUsIGNvbG9yIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBbXHU1RTk1XHU5MEU4XHU4ODRDXSBcdTY1QjBcdTU4OUVcclxuICAgICAgICAgICAgY29uc3QgZm9vZEJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKS5zZXRDbGFzcygnbWFuYWdlci1iYXJfX3RpdGxlJykuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU2NUIwXHU1ODlFX1x1NjU4N1x1NjcyQycpKTtcclxuICAgICAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KGZvb2RCYXIuY29udHJvbEVsKVxyXG4gICAgICAgICAgICBhZGRCdXR0b24uc2V0SWNvbignY2lyY2xlLXBsdXMnKVxyXG4gICAgICAgICAgICBhZGRCdXR0b24ub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbG9hZFNob3dEYXRhKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbDtcclxuICAgICAgICBzY3JvbGxUb3AgPSBtb2RhbEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIG1vZGFsRWxlbWVudC5lbXB0eSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgICAgICBtb2RhbEVsZW1lbnQuc2Nyb2xsVG8oMCwgc2Nyb2xsVG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbk9wZW4oKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93SGVhZCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsICJpbXBvcnQgeyBBcHAsIEV4dHJhQnV0dG9uQ29tcG9uZW50LCBNb2RhbCwgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5pbXBvcnQgeyBNYW5hZ2VyU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9kYXRhJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnbWFpbic7XHJcbmltcG9ydCB7IE1hbmFnZXJNb2RhbCB9IGZyb20gJy4vbWFuYWdlci1tb2RhbCc7XHJcbmltcG9ydCB7IE1hbmFnZXJQbHVnaW4gfSBmcm9tICdzcmMvZGF0YS90eXBlcyc7XHJcbmltcG9ydCBDb21tYW5kcyBmcm9tICdzcmMvY29tbWFuZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFnc01vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG4gICAgc2V0dGluZ3M6IE1hbmFnZXJTZXR0aW5ncztcclxuICAgIG1hbmFnZXI6IE1hbmFnZXI7XHJcbiAgICBtYW5hZ2VyTW9kYWw6IE1hbmFnZXJNb2RhbDtcclxuICAgIG1hbmFnZXJQbHVnaW46IE1hbmFnZXJQbHVnaW47XHJcbiAgICBzZWxlY3RlZDogc3RyaW5nO1xyXG4gICAgYWRkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBtYW5hZ2VyOiBNYW5hZ2VyLCBtYW5hZ2VyTW9kYWw6IE1hbmFnZXJNb2RhbCwgbWFuYWdlclBsdWdpbjogTWFuYWdlclBsdWdpbikge1xyXG4gICAgICAgIHN1cGVyKGFwcCk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IG1hbmFnZXIuc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcclxuICAgICAgICB0aGlzLm1hbmFnZXJNb2RhbCA9IG1hbmFnZXJNb2RhbDtcclxuICAgICAgICB0aGlzLm1hbmFnZXJQbHVnaW4gPSBtYW5hZ2VyUGx1Z2luO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnJztcclxuICAgICAgICB0aGlzLmFkZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2hvd0hlYWQoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgbW9kYWxFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIG1vZGFsRWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19jb250YWluZXInKTtcclxuICAgICAgICBtb2RhbEVsLnJlbW92ZUNoaWxkKG1vZGFsRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UtYnV0dG9uJylbMF0pO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbC5wYXJlbnRFbGVtZW50Py5hZGRDbGFzcygnbWFuYWdlci1jb250YWluZXJfX2hlYWRlcicpO1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmFkZENsYXNzKCdtYW5hZ2VyLWl0ZW0tY29udGFpbmVyJyk7XHJcbiAgICAgICAgLy8gW1x1NjgwN1x1OTg5OFx1ODg0Q11cclxuICAgICAgICBjb25zdCB0aXRsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbCkuc2V0Q2xhc3MoJ21hbmFnZXItYmFyX190aXRsZScpLnNldE5hbWUodGhpcy5tYW5hZ2VyUGx1Z2luLm5hbWUpO1xyXG4gICAgICAgIC8vIFtcdTY4MDdcdTk4OThcdTg4NENdIFx1NTE3M1x1OTVFRFx1NjMwOVx1OTRBRVxyXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KHRpdGxlQmFyLmNvbnRyb2xFbClcclxuICAgICAgICBjbG9zZUJ1dHRvbi5zZXRJY29uKCdjaXJjbGUteCcpXHJcbiAgICAgICAgY2xvc2VCdXR0b24ub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2hvd0RhdGEoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCB0YWcgb2YgdGhpcy5zZXR0aW5ncy5UQUdTKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1FbCA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxyXG4gICAgICAgICAgICBpdGVtRWwuc2V0Q2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtJylcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT0gJycgfHwgdGhpcy5zZWxlY3RlZCAhPSB0YWcuaWQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRJY29uKCdzZXR0aW5ncycpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGFnLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRUb2dnbGUoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5tYW5hZ2VyUGx1Z2luLnRhZ3MuaW5jbHVkZXModGFnLmlkKSlcclxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKGlzQ2hlY2tlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcdTZERkJcdTUyQTBcdTVGMDBcdTU0MkZcdTc2ODRcdTY4MDdcdTdCN0VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYW5hZ2VyUGx1Z2luLnRhZ3MuaW5jbHVkZXModGFnLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlclBsdWdpbi50YWdzLnB1c2godGFnLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFx1NzlGQlx1OTY2NFx1NTE3M1x1OTVFRFx1NzY4NFx1NjgwN1x1N0I3RVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyUGx1Z2luLnRhZ3MgPSB0aGlzLm1hbmFnZXJQbHVnaW4udGFncy5maWx0ZXIodCA9PiB0ICE9PSB0YWcuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyTW9kYWwucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBFbCA9IGNyZWF0ZVNwYW4oeyBjbHM6ICdtYW5hZ2VyLWl0ZW1fX25hbWUtZ3JvdXAnIH0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZCh0ZW1wRWwpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFnRWwgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKHRhZy5uYW1lLCB0YWcuY29sb3IsIHRoaXMuc2V0dGluZ3MuVEFHX1NUWUxFKTtcclxuICAgICAgICAgICAgICAgIHRlbXBFbC5hcHBlbmRDaGlsZCh0YWdFbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgIT0gJycgJiYgdGhpcy5zZWxlY3RlZCA9PSB0YWcuaWQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRDb2xvclBpY2tlcihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0YWcuY29sb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRhZy5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmlucHV0RWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtLWlucHV0JylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRJY29uKCd0cmFzaC0yJylcclxuICAgICAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1Rlc3RUYWcgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuc29tZShwbHVnaW4gPT4gcGx1Z2luLnRhZ3MgJiYgcGx1Z2luLnRhZ3MuaW5jbHVkZXModGFnLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzVGVzdFRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuVEFHUy5maWx0ZXIodCA9PiB0LmlkICE9PSB0YWcuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOScpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbignc2F2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyTW9kYWwucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBFbCA9IGNyZWF0ZVNwYW4oeyBjbHM6ICdtYW5hZ2VyLWl0ZW1fX25hbWUtZ3JvdXAnIH0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZChncm91cEVsKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0VsID0gdGhpcy5tYW5hZ2VyLmNyZWF0ZVRhZyh0YWcubmFtZSwgdGFnLmNvbG9yLCB0aGlzLnNldHRpbmdzLlRBR19TVFlMRSk7XHJcbiAgICAgICAgICAgICAgICBncm91cEVsLmFwcGVuZENoaWxkKHRhZ0VsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hZGQpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBmb29kQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpLnNldENsYXNzKCdtYW5hZ2VyLWJhcl9fdGl0bGUnKTtcclxuICAgICAgICAgICAgZm9vZEJhci5pbmZvRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGZvb2RCYXIuYWRkQ29sb3JQaWNrZXIoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShjb2xvcilcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHsgY29sb3IgPSB2YWx1ZTsgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBmb29kQmFyLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignSUQnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4geyBpZCA9IHZhbHVlOyB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuaW5wdXRFbC5hZGRDbGFzcygnbWFuYWdlci1lZGl0b3JfX2l0ZW0taW5wdXQnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGZvb2RCYXIuYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDJykpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7IG5hbWUgPSB2YWx1ZTsgfSlcclxuICAgICAgICAgICAgICAgIC5pbnB1dEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9faXRlbS1pbnB1dCcpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgZm9vZEJhci5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldEljb24oJ3BsdXMnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5zSWQgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuVEFHUy5zb21lKHRhZyA9PiB0YWcuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5zSWQgJiYgaWQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvciA9PT0gJycpIGNvbG9yID0gJyMwMDAwMDAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuVEFHUy5wdXNoKHsgaWQsIG5hbWUsIGNvbG9yIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBbXHU1RTk1XHU5MEU4XHU4ODRDXSBcdTY1QjBcdTU4OUVcclxuICAgICAgICAgICAgY29uc3QgZm9vZEJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKS5zZXRDbGFzcygnbWFuYWdlci1iYXJfX3RpdGxlJykuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU2NUIwXHU1ODlFX1x1NjU4N1x1NjcyQycpKTtcclxuICAgICAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KGZvb2RCYXIuY29udHJvbEVsKVxyXG4gICAgICAgICAgICBhZGRCdXR0b24uc2V0SWNvbignY2lyY2xlLXBsdXMnKVxyXG4gICAgICAgICAgICBhZGRCdXR0b24ub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbG9hZFNob3dEYXRhKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbDtcclxuICAgICAgICBzY3JvbGxUb3AgPSBtb2RhbEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIG1vZGFsRWxlbWVudC5lbXB0eSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgICAgICBtb2RhbEVsZW1lbnQuc2Nyb2xsVG8oMCwgc2Nyb2xsVG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbk9wZW4oKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93SGVhZCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsICJpbXBvcnQgeyBBcHAsIEV4dHJhQnV0dG9uQ29tcG9uZW50LCBNb2RhbCwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MvZGF0YSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ21haW4nO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlbGV0ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG4gICAgc2V0dGluZ3M6IE1hbmFnZXJTZXR0aW5ncztcclxuICAgIG1hbmFnZXI6IE1hbmFnZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWxldGVDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgbWFuYWdlcjogTWFuYWdlciwgZGVsZXRlQ2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBzdXBlcihhcHApO1xyXG4gICAgICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5kZWxldGVDYWxsYmFjayA9IGRlbGV0ZUNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2hvd0hlYWQoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgbW9kYWxFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIG1vZGFsRWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19jb250YWluZXInKTtcclxuICAgICAgICBtb2RhbEVsLnJlbW92ZUNoaWxkKG1vZGFsRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UtYnV0dG9uJylbMF0pO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbC5wYXJlbnRFbGVtZW50Py5hZGRDbGFzcygnbWFuYWdlci1jb250YWluZXJfX2hlYWRlcicpO1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmFkZENsYXNzKCdtYW5hZ2VyLWl0ZW0tY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY4MDdcdTk4OThcdTg4NENdXHJcbiAgICAgICAgY29uc3QgdGl0bGVCYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpXHJcbiAgICAgICAgdGl0bGVCYXIuc2V0Q2xhc3MoJ21hbmFnZXItZGVsZXRlX190aXRsZScpXHJcbiAgICAgICAgdGl0bGVCYXIuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTUzNzhcdThGN0RfXHU2ODA3XHU5ODk4JykpO1xyXG5cclxuICAgICAgICAvLyBbXHU2ODA3XHU5ODk4XHU4ODRDXSBcdTUxNzNcdTk1RURcdTYzMDlcdTk0QUVcclxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudCh0aXRsZUJhci5jb250cm9sRWwpXHJcbiAgICAgICAgY2xvc2VCdXR0b24uc2V0SWNvbignY2lyY2xlLXgnKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dEYXRhKCkge1xyXG4gICAgICAgIGNvbnN0IHRpdGxlQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKVxyXG4gICAgICAgIHRpdGxlQmFyLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1Mzc4XHU4RjdEX1x1NjNEMFx1NzkzQScpKTtcclxuICAgICAgICBjb25zdCBhY3Rpb25CYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpXHJcbiAgICAgICAgYWN0aW9uQmFyLnNldENsYXNzKCdtYW5hZ2VyLWRlbGV0ZV9fYWN0aW9uJylcclxuICAgICAgICBhY3Rpb25CYXIuYWRkQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgIC5zZXRXYXJuaW5nKClcclxuICAgICAgICAgICAgLnNldEJ1dHRvblRleHQodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1Mzc4XHU4RjdEX1x1NTM3OFx1OEY3RCcpKVxyXG4gICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb25CYXIuYWRkQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgIC5zZXRCdXR0b25UZXh0KHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODgnKSlcclxuICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4geyB0aGlzLmNsb3NlKCk7IH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbk9wZW4oKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93SGVhZCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsICJpbXBvcnQgeyBBcHAsIEV4dHJhQnV0dG9uQ29tcG9uZW50LCBNb2RhbCwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MvZGF0YSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ21haW4nO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpc2FibGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuICAgIHNldHRpbmdzOiBNYW5hZ2VyU2V0dGluZ3M7XHJcbiAgICBtYW5hZ2VyOiBNYW5hZ2VyO1xyXG5cclxuICAgIHByaXZhdGUgZGVsZXRlQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIG1hbmFnZXI6IE1hbmFnZXIsIGRlbGV0ZUNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwKTtcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlQ2FsbGJhY2sgPSBkZWxldGVDYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dIZWFkKCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IG1vZGFsRWw6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICBtb2RhbEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9fY29udGFpbmVyJyk7XHJcbiAgICAgICAgbW9kYWxFbC5yZW1vdmVDaGlsZChtb2RhbEVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsLWNsb3NlLWJ1dHRvbicpWzBdKTtcclxuICAgICAgICB0aGlzLnRpdGxlRWwucGFyZW50RWxlbWVudD8uYWRkQ2xhc3MoJ21hbmFnZXItY29udGFpbmVyX19oZWFkZXInKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcygnbWFuYWdlci1pdGVtLWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAvLyBbXHU2ODA3XHU5ODk4XHU4ODRDXVxyXG4gICAgICAgIGNvbnN0IHRpdGxlQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKVxyXG4gICAgICAgIHRpdGxlQmFyLnNldENsYXNzKCdtYW5hZ2VyLWRlbGV0ZV9fdGl0bGUnKVxyXG4gICAgICAgIHRpdGxlQmFyLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU0RTAwXHU5NTJFX1x1NjgwN1x1OTg5OCcpKTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjgwN1x1OTg5OFx1ODg0Q10gXHU1MTczXHU5NUVEXHU2MzA5XHU5NEFFXHJcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBuZXcgRXh0cmFCdXR0b25Db21wb25lbnQodGl0bGVCYXIuY29udHJvbEVsKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLnNldEljb24oJ2NpcmNsZS14JylcclxuICAgICAgICBjbG9zZUJ1dHRvbi5vbkNsaWNrKCgpID0+IHRoaXMuY2xvc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzaG93RGF0YSgpIHtcclxuICAgICAgICBjb25zdCB0aXRsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbClcclxuICAgICAgICB0aXRsZUJhci5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NEUwMFx1OTUyRV9cdTYzRDBcdTc5M0EnKSk7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKVxyXG4gICAgICAgIGFjdGlvbkJhci5zZXRDbGFzcygnbWFuYWdlci1kZWxldGVfX2FjdGlvbicpXHJcbiAgICAgICAgYWN0aW9uQmFyLmFkZEJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAuc2V0Q3RhKClcclxuICAgICAgICAgICAgLnNldEJ1dHRvblRleHQodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU0RTAwXHU5NTJFX1x1NTQyRlx1Nzk4MScpKVxyXG4gICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb25CYXIuYWRkQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgIC5zZXRCdXR0b25UZXh0KHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NEUwMFx1OTUyRV9cdTUzRDZcdTZEODgnKSkgXHJcbiAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uT3BlbigpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dIZWFkKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwgImltcG9ydCB7XHJcbiAgICBBcHAsXHJcbiAgICBFeHRyYUJ1dHRvbkNvbXBvbmVudCxcclxuICAgIE1vZGFsLFxyXG4gICAgU2V0dGluZyxcclxuICAgIFRleHRBcmVhQ29tcG9uZW50LFxyXG59IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgeyBNYW5hZ2VyU2V0dGluZ3MgfSBmcm9tIFwiLi4vc2V0dGluZ3MvZGF0YVwiO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tIFwibWFpblwiO1xyXG5pbXBvcnQgeyBNYW5hZ2VyUGx1Z2luIH0gZnJvbSBcInNyYy9kYXRhL3R5cGVzXCI7XHJcbmltcG9ydCB7IE1hbmFnZXJNb2RhbCB9IGZyb20gXCIuL21hbmFnZXItbW9kYWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcbiAgICBzZXR0aW5nczogTWFuYWdlclNldHRpbmdzO1xyXG4gICAgbWFuYWdlcjogTWFuYWdlcjtcclxuICAgIG1hbmFnZXJQbHVnaW46IE1hbmFnZXJQbHVnaW47XHJcbiAgICBtYW5hZ2VyTW9kYWw6IE1hbmFnZXJNb2RhbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgbWFuYWdlcjogTWFuYWdlciwgbWFuYWdlclBsdWdpbjogTWFuYWdlclBsdWdpbiwgbWFuYWdlck1vZGFsOiBNYW5hZ2VyTW9kYWwpIHtcclxuICAgICAgICBzdXBlcihhcHApO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBtYW5hZ2VyLnNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyUGx1Z2luID0gbWFuYWdlclBsdWdpbjtcclxuICAgICAgICB0aGlzLm1hbmFnZXJNb2RhbCA9IG1hbmFnZXJNb2RhbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dIZWFkKCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IG1vZGFsRWw6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICBtb2RhbEVsLmFkZENsYXNzKFwibWFuYWdlci1ub3RlX19jb250YWluZXJcIik7XHJcbiAgICAgICAgbW9kYWxFbC5yZW1vdmVDaGlsZChtb2RhbEVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbC1jbG9zZS1idXR0b25cIilbMF0pO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbC5wYXJlbnRFbGVtZW50Py5hZGRDbGFzcyhcIm1hbmFnZXItY29udGFpbmVyX19oZWFkZXJcIik7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWl0ZW0tY29udGFpbmVyXCIpO1xyXG4gICAgICAgIC8vIFtcdTY4MDdcdTk4OThcdTg4NENdXHJcbiAgICAgICAgY29uc3QgdGl0bGVCYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpLnNldENsYXNzKFwibWFuYWdlci1iYXJfX3RpdGxlXCIpLnNldE5hbWUoYCR7dGhpcy5tYW5hZ2VyUGx1Z2luLm5hbWV9YCk7XHJcbiAgICAgICAgLy8gW1x1NjgwN1x1OTg5OFx1ODg0Q10gXHU1MTczXHU5NUVEXHU2MzA5XHU5NEFFXHJcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBuZXcgRXh0cmFCdXR0b25Db21wb25lbnQodGl0bGVCYXIuY29udHJvbEVsKTtcclxuICAgICAgICBjbG9zZUJ1dHRvbi5zZXRJY29uKFwiY2lyY2xlLXhcIik7XHJcbiAgICAgICAgY2xvc2VCdXR0b24ub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2hvd0RhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBuZXcgVGV4dEFyZWFDb21wb25lbnQodGhpcy5jb250ZW50RWwpO1xyXG4gICAgICAgIHRleHRBcmVhLnNldFZhbHVlKHRoaXMubWFuYWdlclBsdWdpbi5ub3RlKTtcclxuICAgICAgICB0ZXh0QXJlYS5vbkNoYW5nZSgobmV3VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyUGx1Z2luLm5vdGUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXJNb2RhbC5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcmVsb2FkU2hvd0RhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNjcm9sbFRvcCA9IDA7XHJcbiAgICAgICAgY29uc3QgbW9kYWxFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuY29udGVudEVsO1xyXG4gICAgICAgIHNjcm9sbFRvcCA9IG1vZGFsRWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICAgICAgbW9kYWxFbGVtZW50LmVtcHR5KCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgICAgIG1vZGFsRWxlbWVudC5zY3JvbGxUbygwLCBzY3JvbGxUb3ApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uT3BlbigpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dIZWFkKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcclxuICAgIH1cclxufVxyXG4iLCAiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQge1xyXG4gICAgQXBwLFxyXG4gICAgQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgRHJvcGRvd25Db21wb25lbnQsXHJcbiAgICBFeHRyYUJ1dHRvbkNvbXBvbmVudCxcclxuICAgIE1vZGFsLFxyXG4gICAgTm90aWNlLFxyXG4gICAgUGx1Z2luTWFuaWZlc3QsXHJcbiAgICBTZWFyY2hDb21wb25lbnQsXHJcbiAgICBTZXR0aW5nLFxyXG4gICAgVG9nZ2xlQ29tcG9uZW50LFxyXG59IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzL2RhdGFcIjtcclxuXHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCJtYWluXCI7XHJcbmltcG9ydCB7IE1hbmFnZXJNb2RhbCB9IGZyb20gXCIuL21hbmFnZXItbW9kYWxcIjtcclxuaW1wb3J0IHsgVGFnc01vZGFsIH0gZnJvbSBcIi4vdGFncy1tb2RhbFwiO1xyXG5cclxuaW50ZXJmYWNlIEV4cG9ydFBsdWdpbk1hbmlmZXN0IHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBhdXRob3I6IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBleHBvcnQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbXBvcnRQbHVnaW5NYW5pZmVzdCB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgYXV0aG9yOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vICAgICAgICAgIFx1NEZBN1x1OEZCOVx1NjgwRiBcdTVCRjlcdThCRERcdTY4NDYgXHU3RkZCXHU4QkQxXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5leHBvcnQgY2xhc3MgSGlkZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG4gICAgbWFuYWdlcjogTWFuYWdlcjtcclxuICAgIG1hbmFnZXJNb2RhbDogTWFuYWdlck1vZGFsO1xyXG4gICAgc2V0dGluZ3M6IE1hbmFnZXJTZXR0aW5ncztcclxuICAgIC8vIHRoaXMuYXBwLnBsdWdpbnNcclxuICAgIGFwcFBsdWdpbnM7XHJcbiAgICAvLyB0aGlzLmFwcC5zZXR0aW5nc1xyXG4gICAgYXBwU2V0dGluZztcclxuICAgIC8vIFtcdTY3MkNcdTU3MzBdW1x1NTNEOFx1OTFDRl0gXHU1QkZDXHU1MUZBXHU2M0QyXHU0RUY2XHU1MjE3XHU4ODY4XHJcbiAgICBwbHVnaW5zOiBQbHVnaW5NYW5pZmVzdFtdID0gW107XHJcblxyXG4gICAgLy8gXHU2NDFDXHU3RDIyXHU1MTg1XHU1QkI5XHJcbiAgICBzZWFyY2hUZXh0ID0gXCJcIjtcclxuICAgIC8vIFx1NjQxQ1x1N0QyMlx1N0VEM1x1Njc5Q1xyXG4gICAgc2VhcmNoRWw6IFNlYXJjaENvbXBvbmVudDtcclxuICAgIGRlbGF5OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdGFnOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgZ3JvdXA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBmaWx0ZXI6IHN0cmluZyA9IFwiYWxsXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIG1hbmFnZXI6IE1hbmFnZXIsIG1hbmFnZXJNb2RhbDogTWFuYWdlck1vZGFsLCBwbHVnaW5zOiBQbHVnaW5NYW5pZmVzdFtdKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5hcHBTZXR0aW5nID0gdGhpcy5hcHAuc2V0dGluZztcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5hcHBQbHVnaW5zID0gdGhpcy5hcHAucGx1Z2lucztcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubWFuYWdlck1vZGFsID0gbWFuYWdlck1vZGFsO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBtYW5hZ2VyLnNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMucGx1Z2lucyA9IHBsdWdpbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNob3dIZWFkKCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IG1vZGFsRWw6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICBtb2RhbEVsLmFkZENsYXNzKFwibWFuYWdlci1jb250YWluZXJcIik7XHJcbiAgICAgICAgLy8gXHU5NzYwXHU0RTBBXHJcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLkNFTlRFUikgbW9kYWxFbC5hZGRDbGFzcyhcIm1hbmFnZXItY29udGFpbmVyX190b3BcIik7XHJcbiAgICAgICAgbW9kYWxFbC5yZW1vdmVDaGlsZChtb2RhbEVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbC1jbG9zZS1idXR0b25cIilbMF0pO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbC5wYXJlbnRFbGVtZW50Py5hZGRDbGFzcyhcIm1hbmFnZXItY29udGFpbmVyX19oZWFkZXJcIik7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWl0ZW0tY29udGFpbmVyXCIpO1xyXG5cclxuICAgICAgICAvLyBbXHU2NENEXHU0RjVDXHU4ODRDXVxyXG4gICAgICAgIGNvbnN0IGFjdGlvbkJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbCkuc2V0Q2xhc3MoXCJtYW5hZ2VyLWJhcl9fYWN0aW9uXCIpLnNldE5hbWUoJ1x1OTY5MFx1ODVDRlx1NjNEMlx1NEVGNicpO1xyXG5cclxuICAgICAgICAvLyBbXHU2NENEXHU0RjVDXHU4ODRDXSBcdTUxNzNcdTk1RURcclxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uc2V0SWNvbihcInhcIik7XHJcbiAgICAgICAgY2xvc2VCdXR0b24ub25DbGljaygoKSA9PiB7IHRoaXMuY2xvc2UoKTsgfSk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY0MUNcdTdEMjJcdTg4NENdXHJcbiAgICAgICAgY29uc3Qgc2VhcmNoQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKS5zZXRDbGFzcyhcIm1hbmFnZXItYmFyX19zZWFyY2hcIikuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkNcIikpO1xyXG5cclxuICAgICAgICBjb25zdCBmaWx0ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBcImFsbFwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QjVCXHU5MDA5X1x1NTE2OFx1OTBFOF9cdTYzQ0ZcdThGRjBcIiksXHJcbiAgICAgICAgICAgIFwiZW5hYmxlZFwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QjVCXHU5MDA5X1x1NEVDNVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjBcIiksXHJcbiAgICAgICAgICAgIFwiZGlzYWJsZWRcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0I1Qlx1OTAwOV9cdTRFQzVcdTc5ODFcdTc1MjhfXHU2M0NGXHU4RkYwXCIpLFxyXG4gICAgICAgICAgICBcImdyb3VwZWRcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0I1Qlx1OTAwOV9cdTVERjJcdTUyMDZcdTdFQzRfXHU2M0NGXHU4RkYwXCIpLFxyXG4gICAgICAgICAgICBcInVuZ3JvdXBlZFwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QjVCXHU5MDA5X1x1NjcyQVx1NTIwNlx1N0VDNF9cdTYzQ0ZcdThGRjBcIiksXHJcbiAgICAgICAgICAgIFwidGFnZ2VkXCI6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoXCJcdTdCNUJcdTkwMDlfXHU2NzA5XHU2ODA3XHU3QjdFX1x1NjNDRlx1OEZGMFwiKSxcclxuICAgICAgICAgICAgXCJ1bnRhZ2dlZFwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU3QjVCXHU5MDA5X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTYzQ0ZcdThGRjBcIiksXHJcbiAgICAgICAgICAgIFwibm90ZWRcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1N0I1Qlx1OTAwOV9cdTY3MDlcdTdCMTRcdThCQjBfXHU2M0NGXHU4RkYwXCIpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gXHU4RkM3XHU2RUU0XHU1NjY4XHJcbiAgICAgICAgY29uc3QgZmlsdGVyRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgZmlsdGVyRHJvcGRvd24uYWRkT3B0aW9ucyhmaWx0ZXJPcHRpb25zKTtcclxuICAgICAgICBmaWx0ZXJEcm9wZG93bi5zZXRWYWx1ZSh0aGlzLmZpbHRlcik7XHJcbiAgICAgICAgZmlsdGVyRHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlKSA9PiB7IHRoaXMuZmlsdGVyID0gdmFsdWU7IHRoaXMucmVsb2FkU2hvd0RhdGEoKTsgfSk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY0MUNcdTdEMjJcdTg4NENdIFx1NTIwNlx1N0VDNFx1OTAwOVx1NjJFOVx1NTIxN1x1ODg2OFxyXG4gICAgICAgIGNvbnN0IGdyb3VwQ291bnRzID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zLnJlZHVjZSgoYWNjOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9LCBwbHVnaW4pID0+IHsgY29uc3QgZ3JvdXBJZCA9IHBsdWdpbi5ncm91cCB8fCBcIlwiOyBhY2NbZ3JvdXBJZF0gPSAoYWNjW2dyb3VwSWRdIHx8IDApICsgMTsgcmV0dXJuIGFjYzsgfSwgeyBcIlwiOiAwIH0pO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuc2V0dGluZ3MuR1JPVVBTLnJlZHVjZSgoYWNjOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCBpdGVtKSA9PiB7IGFjY1tpdGVtLmlkXSA9IGAke2l0ZW0ubmFtZX0gWyR7Z3JvdXBDb3VudHNbaXRlbS5pZF0gfHwgMH1dYDsgcmV0dXJuIGFjYzsgfSwgeyBcIlwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkNcIikgfSk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBzRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgZ3JvdXBzRHJvcGRvd24uYWRkT3B0aW9ucyhncm91cHMpO1xyXG4gICAgICAgIGdyb3Vwc0Ryb3Bkb3duLnNldFZhbHVlKHRoaXMuZ3JvdXApO1xyXG4gICAgICAgIGdyb3Vwc0Ryb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4geyB0aGlzLmdyb3VwID0gdmFsdWU7IHRoaXMucmVsb2FkU2hvd0RhdGEoKTsgfSk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY0MUNcdTdEMjJcdTg4NENdIFx1NjgwN1x1N0I3RVx1OTAwOVx1NjJFOVx1NTIxN1x1ODg2OFxyXG4gICAgICAgIGNvbnN0IHRhZ0NvdW50czogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5yZWR1Y2UoKGFjYywgcGx1Z2luKSA9PiB7IHBsdWdpbi50YWdzLmZvckVhY2goKHRhZykgPT4geyBhY2NbdGFnXSA9IChhY2NbdGFnXSB8fCAwKSArIDE7IH0pOyByZXR1cm4gYWNjOyB9LCB7fSBhcyB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9KTtcclxuICAgICAgICBjb25zdCB0YWdzID0gdGhpcy5zZXR0aW5ncy5UQUdTLnJlZHVjZSgoYWNjOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCBpdGVtKSA9PiB7IGFjY1tpdGVtLmlkXSA9IGAke2l0ZW0ubmFtZX0gWyR7dGFnQ291bnRzW2l0ZW0uaWRdIHx8IDB9XWA7IHJldHVybiBhY2M7IH0sIHsgXCJcIjogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudChcIlx1OTAxQVx1NzUyOF9cdTY1RTBcdTY4MDdcdTdCN0VfXHU2NTg3XHU2NzJDXCIpIH0pO1xyXG4gICAgICAgIGNvbnN0IHRhZ3NEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudChzZWFyY2hCYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0YWdzRHJvcGRvd24uYWRkT3B0aW9ucyh0YWdzKTtcclxuICAgICAgICB0YWdzRHJvcGRvd24uc2V0VmFsdWUodGhpcy50YWcpO1xyXG4gICAgICAgIHRhZ3NEcm9wZG93bi5vbkNoYW5nZSgodmFsdWUpID0+IHsgdGhpcy50YWcgPSB2YWx1ZTsgdGhpcy5yZWxvYWRTaG93RGF0YSgpOyB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU1RUY2XHU4RkRGXHU5MDA5XHU2MkU5XHU1MjE3XHU4ODY4XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuREVMQVkpIHtcclxuICAgICAgICAgICAgY29uc3QgZGVsYXlDb3VudHMgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMucmVkdWNlKChhY2M6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0sIHBsdWdpbikgPT4geyBjb25zdCBkZWxheSA9IHBsdWdpbi5kZWxheSB8fCBcIlwiOyBhY2NbZGVsYXldID0gKGFjY1tkZWxheV0gfHwgMCkgKyAxOyByZXR1cm4gYWNjOyB9LCB7IFwiXCI6IDAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5cyA9IHRoaXMuc2V0dGluZ3MuREVMQVlTLnJlZHVjZSgoYWNjOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCBpdGVtKSA9PiB7IGFjY1tpdGVtLmlkXSA9IGAke2l0ZW0ubmFtZX0gKCR7ZGVsYXlDb3VudHNbaXRlbS5pZF0gfHwgMH0pYDsgcmV0dXJuIGFjYzsgfSwgeyBcIlwiOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KFwiXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkNcIikgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5c0Ryb3Bkb3duID0gbmV3IERyb3Bkb3duQ29tcG9uZW50KHNlYXJjaEJhci5jb250cm9sRWwpO1xyXG4gICAgICAgICAgICBkZWxheXNEcm9wZG93bi5hZGRPcHRpb25zKGRlbGF5cyk7XHJcbiAgICAgICAgICAgIGRlbGF5c0Ryb3Bkb3duLnNldFZhbHVlKHRoaXMuZGVsYXkgfHwgXCJcIik7XHJcbiAgICAgICAgICAgIGRlbGF5c0Ryb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4geyB0aGlzLmRlbGF5ID0gdmFsdWU7IHRoaXMucmVsb2FkU2hvd0RhdGEoKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXHU4ODRDXSBcdTY0MUNcdTdEMjJcdTY4NDZcclxuICAgICAgICB0aGlzLnNlYXJjaEVsID0gbmV3IFNlYXJjaENvbXBvbmVudChzZWFyY2hCYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0aGlzLnNlYXJjaEVsLm9uQ2hhbmdlKCh2YWx1ZTogc3RyaW5nKSA9PiB7IHRoaXMuc2VhcmNoVGV4dCA9IHZhbHVlOyB0aGlzLnJlbG9hZFNob3dEYXRhKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzaG93RGF0YSgpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgTWFuYWdlclBsdWdpbiA9IHRoaXMubWFuYWdlci5zZXR0aW5ncy5QbHVnaW5zLmZpbmQoKG1wKSA9PiBtcC5pZCA9PT0gcGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgLy8gXHU2M0QyXHU0RUY2XHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGXHJcbiAgICAgICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IHRoaXMuc2V0dGluZ3MuREVMQVkgPyBNYW5hZ2VyUGx1Z2luPy5lbmFibGVkIDogdGhpcy5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyhwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICBpZiAoTWFuYWdlclBsdWdpbikge1xyXG4gICAgICAgICAgICAgICAgLy8gW1x1OEZDN1x1NkVFNF0gXHU2NzYxXHU0RUY2XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuYWJsZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0VuYWJsZWQpIGNvbnRpbnVlOyAvLyBcdTRFQzVcdTY2M0VcdTc5M0FcdTU0MkZcdTc1MjhcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRpc2FibGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VuYWJsZWQpIGNvbnRpbnVlOyAvLyBcdTRFQzVcdTY2M0VcdTc5M0FcdTc5ODFcdTc1MjhcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdyb3VwZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hbmFnZXJQbHVnaW4uZ3JvdXAgPT09IFwiXCIpIGNvbnRpbnVlOyAvLyBcdTRFQzVcdTY2M0VcdTc5M0FcdTY3MDlcdTUyMDZcdTdFQzRcdTc2ODRcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVuZ3JvdXBlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWFuYWdlclBsdWdpbi5ncm91cCAhPT0gXCJcIikgY29udGludWU7IC8vIFx1NEVDNVx1NjYzRVx1NzkzQVx1NjcyQVx1NTIwNlx1N0VDNFx1NjNEMlx1NEVGNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGFnZ2VkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYW5hZ2VyUGx1Z2luLnRhZ3MubGVuZ3RoID09PSAwKSBjb250aW51ZTsgLy8gXHU0RkVFXHU2QjYzXHU0RTNBXHU2ODA3XHU3QjdFXHU2NTcwXHU3RUM0XHU5NTdGXHU1RUE2XHU1MjI0XHU2NUFEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1bnRhZ2dlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWFuYWdlclBsdWdpbi50YWdzLmxlbmd0aCA+IDApIGNvbnRpbnVlOyAgLy8gXHU0RkVFXHU2QjYzXHU0RTNBXHU2ODA3XHU3QjdFXHU2NTcwXHU3RUM0XHU5NTdGXHU1RUE2XHU1MjI0XHU2NUFEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJub3RlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIU1hbmFnZXJQbHVnaW4ubm90ZSB8fCBNYW5hZ2VyUGx1Z2luLm5vdGUgPT09IFwiXCIpIGNvbnRpbnVlOyAvLyBcdTY1QjBcdTU4OUVcdTdCMTRcdThCQjBcdTUyMjRcdTY1QURcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIFx1NTE3Nlx1NEVENlx1NjBDNVx1NTFCNVx1NjYzRVx1NzkzQVx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OEZDN1x1NkVFNF0gXHU1MjA2XHU3RUM0IFx1NjgwN1x1N0I3RSBcdTVFRjZcdTY1RjZcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwICE9PSBcIlwiICYmIChNYW5hZ2VyUGx1Z2luLmdyb3VwICE9PSB0aGlzLmdyb3VwKSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWcgIT09IFwiXCIgJiYgIU1hbmFnZXJQbHVnaW4udGFncy5pbmNsdWRlcyh0aGlzLnRhZykpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVsYXkgIT09IFwiXCIgJiYgTWFuYWdlclBsdWdpbi5kZWxheSAhPT0gdGhpcy5kZWxheSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAvLyBbXHU4RkM3XHU2RUU0XSBcdTY0MUNcdTdEMjJcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFRleHQgIT09IFwiXCIgJiYgTWFuYWdlclBsdWdpbi5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkgPT0gLTEgJiYgTWFuYWdlclBsdWdpbi5kZXNjLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkgPT0gLTEgJiYgcGx1Z2luLmF1dGhvci50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCkpID09IC0xKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIC8vIFtcdThGQzdcdTZFRTRdIFx1ODFFQVx1OEVBQlxyXG4gICAgICAgICAgICAgICAgaWYgKHBsdWdpbi5pZCA9PT0gdGhpcy5tYW5hZ2VyLm1hbmlmZXN0LmlkKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtRWwgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuc2V0Q2xhc3MoXCJtYW5hZ2VyLWl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwubmFtZUVsLmFkZENsYXNzKFwibWFuYWdlci1pdGVtX19uYW1lLWNvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwuYWRkQ2xhc3MoXCJtYW5hZ2VyLWl0ZW1fX2Rlc2NyaXB0aW9uLWNvbnRhaW5lclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU5RUQ4XHU4QkE0XSBcdTUyMDZcdTdFQzRcclxuICAgICAgICAgICAgICAgIGlmIChNYW5hZ2VyUGx1Z2luLmdyb3VwICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBjcmVhdGVTcGFuKHsgY2xzOiBcIm1hbmFnZXItaXRlbV9fbmFtZS1ncm91cFwiLCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKGdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zZXR0aW5ncy5HUk9VUFMuZmluZCgodCkgPT4gdC5pZCA9PT0gTWFuYWdlclBsdWdpbi5ncm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHsgY29uc3QgdGFnID0gdGhpcy5tYW5hZ2VyLmNyZWF0ZVRhZyhpdGVtLm5hbWUsIGl0ZW0uY29sb3IsIHRoaXMuc2V0dGluZ3MuR1JPVVBfU1RZTEUpOyBncm91cC5hcHBlbmRDaGlsZCh0YWcpOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU1NDBEXHU3OUYwXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZVNwYW4oeyB0ZXh0OiBNYW5hZ2VyUGx1Z2luLm5hbWUsIGNsczogXCJtYW5hZ2VyLWl0ZW1fX25hbWUtdGl0bGVcIiwgfSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU5RUQ4XHU4QkE0XSBcdTcyNDhcdTY3MkNcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZlcnNpb24gPSBjcmVhdGVTcGFuKHsgdGV4dDogYFske3BsdWdpbi52ZXJzaW9ufV1gLCBjbHM6IFtcIm1hbmFnZXItaXRlbV9fbmFtZS12ZXJzaW9uXCJdLCB9KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYXBwZW5kQ2hpbGQodmVyc2lvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU1RUY2XHU4RkRGXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ERUxBWSAmJiBNYW5hZ2VyUGx1Z2luLmRlbGF5ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IHRoaXMuc2V0dGluZ3MuREVMQVlTLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IE1hbmFnZXJQbHVnaW4uZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gY3JlYXRlU3Bhbih7IHRleHQ6IGAke2QudGltZX1zYCwgY2xzOiBbXCJtYW5hZ2VyLWl0ZW1fX25hbWUtZGVsYXlcIl0sIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKGRlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU2M0NGXHU4RkYwXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjID0gY3JlYXRlRGl2KHsgdGV4dDogTWFuYWdlclBsdWdpbi5kZXNjLCBjbHM6IFtcIm1hbmFnZXItaXRlbV9fbmFtZS1kZXNjXCJdLCB9KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwuYXBwZW5kQ2hpbGQoZGVzYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU2ODA3XHU3QjdFXHU3RUM0XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdzID0gY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLmFwcGVuZENoaWxkKHRhZ3MpO1xyXG4gICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi50YWdzLm1hcCgoaWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnNldHRpbmdzLlRBR1MuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7IGNvbnN0IHRhZyA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoaXRlbS5uYW1lLCBpdGVtLmNvbG9yLCB0aGlzLnNldHRpbmdzLlRBR19TVFlMRSk7IHRhZ3MuYXBwZW5kQ2hpbGQodGFnKTsgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaGlkZGVuVG9nZ2xlID0gbmV3IFRvZ2dsZUNvbXBvbmVudChpdGVtRWwuY29udHJvbEVsKTtcclxuICAgICAgICAgICAgICAgIC8vIFx1NTIyNFx1NjVBRFx1NUY1M1x1NTI0RFx1NjNEMlx1NEVGNlx1NjYyRlx1NTQyNlx1NTcyOFx1OTY5MFx1ODVDRlx1NTIxN1x1ODg2OFxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIaWRkZW4gPSB0aGlzLnNldHRpbmdzLkhJREVTLmluY2x1ZGVzKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5Ub2dnbGUuc2V0VmFsdWUoaXNIaWRkZW4pO1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuVG9nZ2xlLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFx1NjZGNFx1NjVCMFx1OTY5MFx1ODVDRlx1NTIxN1x1ODg2OFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkgdGhpcy5zZXR0aW5ncy5ISURFUy5wdXNoKHBsdWdpbi5pZCk7IGVsc2UgdGhpcy5zZXR0aW5ncy5ISURFUyA9IHRoaXMuc2V0dGluZ3MuSElERVMuZmlsdGVyKGlkID0+IGlkICE9PSBwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXJNb2RhbC5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlbG9hZFNob3dEYXRhKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbDtcclxuICAgICAgICBzY3JvbGxUb3AgPSBtb2RhbEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIG1vZGFsRWxlbWVudC5lbXB0eSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEoKTtcclxuICAgICAgICBtb2RhbEVsZW1lbnQuc2Nyb2xsVG8oMCwgc2Nyb2xsVG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgb25PcGVuKCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0hlYWQoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcclxuICAgIH1cclxufVxyXG4iLCAiaW1wb3J0IHsgQXBwLCBQbHVnaW5NYW5pZmVzdCB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9tYWluXCI7XHJcbmltcG9ydCB7IE1hbmFnZXJNb2RhbCB9IGZyb20gXCIuL21vZGFsL21hbmFnZXItbW9kYWxcIjtcclxuXHJcbmNvbnN0IENvbW1hbmRzID0gKGFwcDogQXBwLCBtYW5hZ2VyOiBNYW5hZ2VyKSA9PiB7XHJcbiAgICBtYW5hZ2VyLmFkZENvbW1hbmQoe1xyXG4gICAgICAgIGlkOiAnbWFuYWdlci12aWV3JyxcclxuICAgICAgICBuYW1lOiBtYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjAnKSxcclxuICAgICAgICBob3RrZXlzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyczogWydDdHJsJ10sXHJcbiAgICAgICAgICAgICAgICBrZXk6ICdNJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgY2FsbGJhY2s6ICgpID0+IHsgbmV3IE1hbmFnZXJNb2RhbChhcHAsIG1hbmFnZXIpLm9wZW4oKSB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobWFuYWdlci5zZXR0aW5ncy5ERUxBWSkge1xyXG4gICAgICAgIC8vIFx1NTM1NVx1ODg0Q1x1NTQ3RFx1NEVFNFxyXG4gICAgICAgIGlmIChtYW5hZ2VyLnNldHRpbmdzLkNPTU1BTkRfSVRFTSkge1xyXG4gICAgICAgICAgICBjb25zdCBwbHVnaW5zOiBQbHVnaW5NYW5pZmVzdFtdID0gT2JqZWN0LnZhbHVlcyhtYW5hZ2VyLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5maWx0ZXIoKHBtOiBQbHVnaW5NYW5pZmVzdCkgPT4gcG0uaWQgIT09IG1hbmFnZXIubWFuaWZlc3QuaWQpIGFzIFBsdWdpbk1hbmlmZXN0W107XHJcbiAgICAgICAgICAgIHBsdWdpbnMuZm9yRWFjaChwbHVnaW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXAgPSBtYW5hZ2VyLnNldHRpbmdzLlBsdWdpbnMuZmluZChtcCA9PiBtcC5pZCA9PT0gcGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbmFnZXIuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBgbWFuYWdlci0ke21wLmlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke21wLmVuYWJsZWQgPyBtYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NTE3M1x1OTVFRF9cdTY1ODdcdTY3MkMnKSA6IG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1RjAwXHU1NDJGX1x1NjU4N1x1NjcyQycpfSAke21wLm5hbWV9IGAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXAuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1wLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IG1hbmFnZXIuYXBwUGx1Z2lucy5kaXNhYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHMoYXBwLCBtYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXAuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtYW5hZ2VyLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHMoYXBwLCBtYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0XHJcbiAgICAgICAgaWYgKG1hbmFnZXIuc2V0dGluZ3MuQ09NTUFORF9HUk9VUCkge1xyXG4gICAgICAgICAgICBtYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5mb3JFYWNoKChncm91cCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWFuYWdlci5hZGRDb21tYW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogYG1hbmFnZXItJHtncm91cC5pZH0tZW5hYmxlZGAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7bWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDJyl9ICR7Z3JvdXAubmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkUGx1Z2lucyA9IG1hbmFnZXIuc2V0dGluZ3MuUGx1Z2lucy5maWx0ZXIocGx1Z2luID0+IHBsdWdpbi5ncm91cCA9PT0gZ3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFBsdWdpbnMuZm9yRWFjaChhc3luYyBwbHVnaW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbiAmJiAhcGx1Z2luLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtYW5hZ2VyLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyhhcHAsIG1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWFuYWdlci5hZGRDb21tYW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogYG1hbmFnZXItJHtncm91cC5pZH0tZGlzYWJsZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7bWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDJyl9ICR7Z3JvdXAubmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkUGx1Z2lucyA9IG1hbmFnZXIuc2V0dGluZ3MuUGx1Z2lucy5maWx0ZXIocGx1Z2luID0+IHBsdWdpbi5ncm91cCA9PT0gZ3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFBsdWdpbnMuZm9yRWFjaChhc3luYyBwbHVnaW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbiAmJiBwbHVnaW4uZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IG1hbmFnZXIuYXBwUGx1Z2lucy5kaXNhYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHMoYXBwLCBtYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBcdTUzNTVcdTg4NENcdTU0N0RcdTRFRTRcclxuICAgICAgICBpZiAobWFuYWdlci5zZXR0aW5ncy5DT01NQU5EX0lURU0pIHtcclxuICAgICAgICAgICAgY29uc3QgcGx1Z2luczogUGx1Z2luTWFuaWZlc3RbXSA9IE9iamVjdC52YWx1ZXMobWFuYWdlci5hcHBQbHVnaW5zLm1hbmlmZXN0cykuZmlsdGVyKChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHBtLmlkICE9PSBtYW5hZ2VyLm1hbmlmZXN0LmlkKSBhcyBQbHVnaW5NYW5pZmVzdFtdO1xyXG4gICAgICAgICAgICBwbHVnaW5zLmZvckVhY2gocGx1Z2luID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSBtYW5hZ2VyLmFwcFBsdWdpbnMuZW5hYmxlZFBsdWdpbnMuaGFzKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBgbWFuYWdlci0ke3BsdWdpbi5pZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke2VuYWJsZWQgPyBtYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1NDdEXHU0RUU0XHU4ODRDX1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkMnKSA6IG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTU0N0RcdTRFRTRcdTg4NENfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQycpfSAke3BsdWdpbi5uYW1lfSBgLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtYW5hZ2VyLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbkFuZFNhdmUocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKGFwcCwgbWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtYW5hZ2VyLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luQW5kU2F2ZShwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHMoYXBwLCBtYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFx1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNFxyXG4gICAgICAgIGlmIChtYW5hZ2VyLnNldHRpbmdzLkNPTU1BTkRfR1JPVVApIHtcclxuICAgICAgICAgICAgbWFuYWdlci5zZXR0aW5ncy5HUk9VUFMuZm9yRWFjaCgoZ3JvdXApID0+IHtcclxuICAgICAgICAgICAgICAgIG1hbmFnZXIuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGBtYW5hZ2VyLSR7Z3JvdXAuaWR9LWVuYWJsZWRgLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke21hbmFnZXIudHJhbnNsYXRvci50KCdcdTU0N0RcdTRFRTRcdTg4NENfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQycpfSAke2dyb3VwLm5hbWV9ICR7bWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTQ3RFx1NEVFNFx1ODg0Q19cdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDJyl9YCxcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZFBsdWdpbnMgPSBtYW5hZ2VyLnNldHRpbmdzLlBsdWdpbnMuZmlsdGVyKHBsdWdpbiA9PiBwbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRQbHVnaW5zLmZvckVhY2goYXN5bmMgcGx1Z2luID0+IHsgYXdhaXQgbWFuYWdlci5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbkFuZFNhdmUocGx1Z2luLmlkKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKGFwcCwgbWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBgbWFuYWdlci0ke2dyb3VwLmlkfS1kaXNhYmxlYCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHttYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1NDdEXHU0RUU0XHU4ODRDX1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkMnKX0gJHtncm91cC5uYW1lfSAke21hbmFnZXIudHJhbnNsYXRvci50KCdcdTU0N0RcdTRFRTRcdTg4NENfXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQycpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRQbHVnaW5zID0gbWFuYWdlci5zZXR0aW5ncy5QbHVnaW5zLmZpbHRlcihwbHVnaW4gPT4gcGx1Z2luLmdyb3VwID09PSBncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkUGx1Z2lucy5mb3JFYWNoKGFzeW5jIHBsdWdpbiA9PiB7IGF3YWl0IG1hbmFnZXIuYXBwUGx1Z2lucy5kaXNhYmxlUGx1Z2luQW5kU2F2ZShwbHVnaW4uaWQpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHMoYXBwLCBtYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kcyIsICJpbXBvcnQgQmFzZVNldHRpbmcgZnJvbSBcIi4uL2Jhc2Utc2V0dGluZ1wiO1xyXG5pbXBvcnQgeyBEcm9wZG93bkNvbXBvbmVudCwgU2V0dGluZywgVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCBDb21tYW5kcyBmcm9tIFwic3JjL2NvbW1hbmRcIjtcclxuLy8gaW1wb3J0IHsgR1JPVVBfU1RZTEUsIElURU1fU1RZTEUsIFRBR19TVFlMRSB9IGZyb20gXCJzcmMvZGF0YS9kYXRhXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyQmFzaXMgZXh0ZW5kcyBCYXNlU2V0dGluZyB7XHJcbiAgICBwcml2YXRlIElURU1fU1RZTEUgPSB7XHJcbiAgICAgICAgJ2Fsd2F5c0V4cGFuZCc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDAnKSxcclxuICAgICAgICAnbmV2ZXJFeHBhbmQnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RThDJyksXHJcbiAgICAgICAgJ2hvdmVyRXhwYW5kJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwOScpLFxyXG4gICAgICAgICdjbGlja0V4cGFuZCc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTU2REInKSxcclxuICAgIH1cclxuICAgIHByaXZhdGUgR1JPVVBfU1RZTEUgPSB7XHJcbiAgICAgICAgJ2EnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTAwJyksXHJcbiAgICAgICAgJ2InOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RThDJyksXHJcbiAgICAgICAgJ2MnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5JyksXHJcbiAgICAgICAgJ2QnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCJylcclxuICAgIH1cclxuICAgIHByaXZhdGUgVEFHX1NUWUxFID0ge1xyXG4gICAgICAgICdhJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMCcpLFxyXG4gICAgICAgICdiJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QycpLFxyXG4gICAgICAgICdjJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwOScpLFxyXG4gICAgICAgICdkJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQicpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG1haW4oKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW1TdHlsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgaXRlbVN0eWxlRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQoaXRlbVN0eWxlQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgaXRlbVN0eWxlRHJvcGRvd24uYWRkT3B0aW9ucyh0aGlzLklURU1fU1RZTEUpO1xyXG4gICAgICAgIGl0ZW1TdHlsZURyb3Bkb3duLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuSVRFTV9TVFlMRSk7XHJcbiAgICAgICAgaXRlbVN0eWxlRHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuSVRFTV9TVFlMRSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdyb3VwU3R5bGVCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwU3R5bGVEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudChncm91cFN0eWxlQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgZ3JvdXBTdHlsZURyb3Bkb3duLmFkZE9wdGlvbnModGhpcy5HUk9VUF9TVFlMRSk7XHJcbiAgICAgICAgZ3JvdXBTdHlsZURyb3Bkb3duLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuR1JPVVBfU1RZTEUpO1xyXG4gICAgICAgIGdyb3VwU3R5bGVEcm9wZG93bi5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5HUk9VUF9TVFlMRSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhZ1N0eWxlQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBjb25zdCB0YWdTdHlsZURyb3Bkb3duID0gbmV3IERyb3Bkb3duQ29tcG9uZW50KHRhZ1N0eWxlQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgdGFnU3R5bGVEcm9wZG93bi5hZGRPcHRpb25zKHRoaXMuVEFHX1NUWUxFKTtcclxuICAgICAgICB0YWdTdHlsZURyb3Bkb3duLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuVEFHX1NUWUxFKTtcclxuICAgICAgICB0YWdTdHlsZURyb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLlRBR19TVFlMRSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvcEJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NTRDXHU5NzYyXHU1QzQ1XHU0RTJEX1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzU0Q1x1OTc2Mlx1NUM0NVx1NEUyRF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgdG9wVG9nZ2xlID0gbmV3IFRvZ2dsZUNvbXBvbmVudCh0b3BCYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0b3BUb2dnbGUuc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5DRU5URVIpO1xyXG4gICAgICAgIHRvcFRvZ2dsZS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5DRU5URVIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBmYWRlT3V0RGlzYWJsZWRQbHVnaW5zQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBjb25zdCBmYWRlT3V0RGlzYWJsZWRQbHVnaW5zVG9nZ2xlID0gbmV3IFRvZ2dsZUNvbXBvbmVudChmYWRlT3V0RGlzYWJsZWRQbHVnaW5zQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgZmFkZU91dERpc2FibGVkUGx1Z2luc1RvZ2dsZS5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLkZBREVfT1VUX0RJU0FCTEVEX1BMVUdJTlMpO1xyXG4gICAgICAgIGZhZGVPdXREaXNhYmxlZFBsdWdpbnNUb2dnbGUub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuRkFERV9PVVRfRElTQUJMRURfUExVR0lOUyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59IiwgImltcG9ydCBCYXNlU2V0dGluZyBmcm9tIFwiLi4vYmFzZS1zZXR0aW5nXCI7XHJcbmltcG9ydCB7IE5vdGljZSwgU2V0dGluZyB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFuYWdlckRlbGF5IGV4dGVuZHMgQmFzZVNldHRpbmcge1xyXG4gICAgbWFpbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaWQgPSAnJztcclxuICAgICAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgICAgIGxldCB0aW1lID0gMDtcclxuICAgICAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0SGVhZGluZygpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDJykpXHJcbiAgICAgICAgICAgIC5hZGRTbGlkZXIoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRMaW1pdHMoMCwgMTAwLCAxKVxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRpbWUpXHJcbiAgICAgICAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignSUQnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkMnKSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldEljb24oJ3BsdXMnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5zSWQgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuREVMQVlTLnNvbWUoZGVsYXkgPT4gZGVsYXkuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5zSWQgJiYgaWQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zZXR0aW5ncy5ERUxBWVMucHVzaCh7IGlkLCBuYW1lLCB0aW1lIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5kZWxheURpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDAnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEMnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKSBcclxuICAgICAgICB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuREVMQVlTLmZvckVhY2goKGRlbGF5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgaXRlbS5zZXR0aW5nRWwuYWRkQ2xhc3MoJ21hbmFnZXItc2V0dGluZy1ncm91cF9faXRlbScpXHJcbiAgICAgICAgICAgIGl0ZW0uc2V0TmFtZShgWyR7ZGVsYXkuaWR9XWApXHJcbiAgICAgICAgICAgIGl0ZW0uYWRkU2xpZGVyKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0TGltaXRzKDAsIDEwMCwgMSlcclxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShkZWxheS50aW1lKVxyXG4gICAgICAgICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxheS50aW1lID0gdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGl0ZW0uYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKGRlbGF5Lm5hbWUpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXkubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgaXRlbS5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldEljb24oJ3RyYXNoLTInKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1Rlc3RHcm91cCA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5zb21lKHBsdWdpbiA9PiBwbHVnaW4uZGVsYXkgPT09IGRlbGF5LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Rlc3RHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuREVMQVlTID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkRFTEFZUy5maWx0ZXIodCA9PiB0LmlkICE9PSBkZWxheS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nVGFiLmRlbGF5RGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOScpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQicpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IEJhc2VTZXR0aW5nIGZyb20gXCIuLi9iYXNlLXNldHRpbmdcIjtcclxuaW1wb3J0IHsgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyVGFnIGV4dGVuZHMgQmFzZVNldHRpbmcge1xyXG4gICAgbWFpbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaWQgPSAnJztcclxuICAgICAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgICAgIGxldCBjb2xvciA9ICcnO1xyXG4gICAgICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXRIZWFkaW5nKClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkMnKSlcclxuICAgICAgICAgICAgLmFkZENvbG9yUGlja2VyKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUoY29sb3IpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignSUQnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDJykpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRJY29uKCdwbHVzJylcclxuICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250YWluc0lkID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1Muc29tZSh0YWcgPT4gdGFnLmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluc0lkICYmIGlkICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09ICcnKSBjb2xvciA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MucHVzaCh7IGlkLCBuYW1lLCBjb2xvciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdUYWIudGFnRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMCcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QycpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MuZm9yRWFjaCgodGFnLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgaXRlbS5zZXRDbGFzcygnbWFuYWdlci1zZXR0aW5nLXRhZ19faXRlbScpXHJcbiAgICAgICAgICAgIC8vIGl0ZW0uc2V0TmFtZShgJHtpbmRleCArIDF9LiBgKVxyXG4gICAgICAgICAgICBpdGVtLmFkZENvbG9yUGlja2VyKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGFnLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZy5jb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdUYWIudGFnRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBpdGVtLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0YWcubmFtZSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0YWcubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pLmlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdUYWIudGFnRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBpdGVtLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0SWNvbigndHJhc2gtMicpXHJcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzVGVzdFRhZyA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5zb21lKHBsdWdpbiA9PiBwbHVnaW4udGFncyAmJiBwbHVnaW4udGFncy5pbmNsdWRlcyh0YWcuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Rlc3RUYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuVEFHUy5maWx0ZXIodCA9PiB0LmlkICE9PSB0YWcuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi50YWdEaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgY29uc3QgdGFnRWwgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKHRhZy5uYW1lLCB0YWcuY29sb3IsIHRoaXMuc2V0dGluZ3MuVEFHX1NUWUxFKTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lRWwuYXBwZW5kQ2hpbGQodGFnRWwpO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWVFbC5hcHBlbmRUZXh0KGAgWyR7dGFnLmlkfV1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IEJhc2VTZXR0aW5nIGZyb20gXCIuLi9iYXNlLXNldHRpbmdcIjtcclxuaW1wb3J0IHsgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCBDb21tYW5kcyBmcm9tIFwic3JjL2NvbW1hbmRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmFnZXJHcm91cCBleHRlbmRzIEJhc2VTZXR0aW5nIHtcclxuICAgIG1haW4oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGlkID0gJyc7XHJcbiAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuICAgICAgICBsZXQgY29sb3IgPSAnJztcclxuICAgICAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0SGVhZGluZygpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDJykpXHJcbiAgICAgICAgICAgIC5hZGRDb2xvclBpY2tlcihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKGNvbG9yKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ0lEJylcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcih0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1NDBEXHU3OUYwX1x1NjU4N1x1NjcyQycpKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0SWNvbigncGx1cycpXHJcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbnNJZCA9IHRoaXMubWFuYWdlci5zZXR0aW5ncy5HUk9VUFMuc29tZSh0YWcgPT4gdGFnLmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluc0lkICYmIGlkICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09ICcnKSBjb2xvciA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5wdXNoKHsgaWQsIG5hbWUsIGNvbG9yIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5ncm91cERpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5mb3JFYWNoKChncm91cCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIGl0ZW0uc2V0dGluZ0VsLmFkZENsYXNzKCdtYW5hZ2VyLXNldHRpbmctZ3JvdXBfX2l0ZW0nKVxyXG4gICAgICAgICAgICAvLyBpdGVtLnNldE5hbWUoYCR7aW5kZXggKyAxfS4gYClcclxuICAgICAgICAgICAgaXRlbS5hZGRDb2xvclBpY2tlcihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKGdyb3VwLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLmNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5ncm91cERpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgaXRlbS5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZ3JvdXAubmFtZSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cC5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfSkuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1RhYi5ncm91cERpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgaXRlbS5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldEljb24oJ3RyYXNoLTInKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1Rlc3RHcm91cCA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5zb21lKHBsdWdpbiA9PiBwbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Rlc3RHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuR1JPVVBTID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5maWx0ZXIodCA9PiB0LmlkICE9PSBncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nVGFiLmdyb3VwRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDknKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBjb25zdCB0YWdFbCA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoZ3JvdXAubmFtZSwgZ3JvdXAuY29sb3IsIHRoaXMuc2V0dGluZ3MuR1JPVVBfU1RZTEUpO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWVFbC5hcHBlbmRDaGlsZCh0YWdFbCk7XHJcbiAgICAgICAgICAgIGl0ZW0ubmFtZUVsLmFwcGVuZFRleHQoYCBbJHtncm91cC5pZH1dYCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdcdTYzRDJcdTRFRjZcdTdCQTFcdTc0MDZcdTU2NjgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkM6ICdcdTYyMTBcdTUyOUYnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTkzMVx1OEQyNV9cdTY1ODdcdTY3MkM6ICdcdTU5MzFcdThEMjUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkM6ICdcdTY1QjBcdTU4OUUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjRDRFx1NEY1Q19cdTY1ODdcdTY3MkM6ICdcdTY0Q0RcdTRGNUMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkM6ICdcdTY0MUNcdTdEMjInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkM6ICdcdTU0MERcdTc5RjAnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdcdTUxNjhcdTkwRTgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdcdTUxNjhcdTkwRTgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdcdTY1RTAnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjAzQlx1OEJBMV9cdTY1ODdcdTY3MkM6ICdcdTYwM0JcdThCQTEnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdTU0MkZcdTc1MjgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdTc5ODFcdTc1MjgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTE3M1x1OTVFRF9cdTY1ODdcdTY3MkM6ICdcdTUxNzNcdTk1RUQnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NUYwMFx1NTQyRl9cdTY1ODdcdTY3MkM6ICdcdTVGMDBcdTU0MkYnLFxyXG5cclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU1NDJGXHU3NTI4JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU3OTgxXHU3NTI4JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnXHU1MjA2XHU3RUM0JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4JyxcclxuXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMDogJ1x1OEJCRlx1OTVFRVx1NEY1Q1x1ODAwNVx1NzY4NEdpdEh1Ylx1OTg3NVx1OTc2Mlx1RkYwQ1x1NjdFNVx1NzcwQlx1OTg3OVx1NzZFRVx1OEJFNlx1NjBDNVx1MzAwMVx1NjZGNFx1NjVCMFx1NjVFNVx1NUZEN1x1MzAwMVx1NTNDMlx1NEUwRVx1OEJBOFx1OEJCQVx1NTQ4Q1x1OEQyMVx1NzMyRVx1NEVFM1x1NzgwMVx1MzAwMicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4OUM2XHU5ODkxXHU2NTU5XHU3QTBCX1x1NjNDRlx1OEZGMDogJ1x1OEJCRlx1OTVFRVx1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1NTQyRlx1NzUyOFx1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRlx1RkYwQ1x1NkRGMVx1NUVBNlx1ODFFQVx1NUI5QVx1NEU0OVx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU5MUNEXHU4RjdEXHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNlx1RkYwQ1x1NTM3M1x1NjVGNlx1NzUxRlx1NjU0OCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwX1x1NjNDRlx1OEZGMDogJ1x1NjhDMFx1NjdFNVx1NjNEMlx1NEVGNlx1NjZGNFx1NjVCMCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOFx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOFx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1N0JBMVx1NzQwNlx1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEVDNVx1NjYzRVx1NzkzQVx1NURGMlx1NTQyRlx1NzUyOFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2NzJBXHU1MjA2XHU3RUM0X1x1NjNDRlx1OEZGMDogJ1x1N0I1Qlx1OTAwOVx1NjI0MFx1NjcwOVx1NjcyQVx1NTIwNlx1N0VDNFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RVx1NzU0Q1x1OTc2MicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMDogJ1x1OEZEOFx1NTM5Rlx1NTIxRFx1NTlDQlx1NzJCNlx1NjAwMScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1X1x1NjNDRlx1OEZGMDogJ1x1NjI1M1x1NUYwMFx1NjNEMlx1NEVGNlx1NzZFRVx1NUY1NScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1NUY3Qlx1NUU5NVx1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ1x1NTIwN1x1NjM2Mlx1NjNEMlx1NEVGNlx1NzJCNlx1NjAwMScsXHJcblxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5ODogJ1x1NTM3OFx1OEY3RFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnXHU0RjYwXHU3ODZFXHU1QjlBXHU4OTgxXHU1Mzc4XHU4RjdEXHU2QjY0XHU2M0QyXHU0RUY2XHU1NDE3XHVGRjFGXHU4RkQ5XHU1QzA2XHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2XHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHUzMDAyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzNzhcdThGN0Q6ICdcdTUzNzhcdThGN0QnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ1x1NTNENlx1NkQ4OCcsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1x1NTM3OFx1OEY3RFx1NjIxMFx1NTI5RicsXHJcblxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NjgwN1x1OTg5ODogJ1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTYzRDJcdTRFRjYnLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NjNEMFx1NzkzQTogJ1x1NEY2MFx1Nzg2RVx1NUI5QVx1ODk4MVx1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTZCNjRcdTk4NzVcdTk3NjJcdTYzRDJcdTRFRjZcdTU0MTdcdUZGMUZcdThGRDlcdTVDMDZcdTY1RTBcdTZDRDVcdTYwNjJcdTU5MERcdTMwMDIoXHU1NDJGXHU3NTI4L1x1Nzk4MVx1NzUyOFx1OEZDN1x1N0EwQlx1NEUyRFx1OEJGN1x1ODAxMFx1NUZDM1x1N0I0OVx1NUY4NSknLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NTQyRlx1Nzk4MTogJ1x1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjgnLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NTNENlx1NkQ4ODogJ1x1NTNENlx1NkQ4OCcsXHJcbiAgICBcdTRFMDBcdTk1MkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1x1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTYyMTBcdTUyOUYnLFxyXG5cclxuICAgIFx1ODNEQ1x1NTM1NV9cdTdCMTRcdThCQjBfXHU2ODA3XHU5ODk4OiAnXHU3QjE0XHU4QkIwJyxcclxuICAgIFx1ODNEQ1x1NTM1NV9cdTVGRUJcdTYzNzdcdTk1MkVfXHU2ODA3XHU5ODk4OiAnXHU1RkVCXHU2Mzc3XHU5NTJFJyxcclxuICAgIFx1ODNEQ1x1NTM1NV9HaXRIdWJfXHU2ODA3XHU5ODk4OiAnR2l0SHViJyxcclxuICAgIFx1ODNEQ1x1NTM1NV9cdTUzNTVcdTZCMjFcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnXHU1MzU1XHU2QjIxXHU1NDJGXHU1MkE4JyxcclxuICAgIFx1ODNEQ1x1NTM1NV9cdTkxQ0RcdTU0MkZcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHU5MUNEXHU1NDJGXHU2M0QyXHU0RUY2JyxcclxuICAgIFx1ODNEQ1x1NTM1NV9cdTk2OTBcdTg1Q0ZcdTYzRDJcdTRFRjZfXHU2ODA3XHU5ODk4OiAnXHU5NjkwXHU4NUNGXHU2M0QyXHU0RUY2JyxcclxuICAgIFx1ODNEQ1x1NTM1NV9cdTU5MERcdTUyMzZJRF9cdTY4MDdcdTk4OTg6ICdcdTU5MERcdTUyMzZJRCcsXHJcblxyXG4gICAgXHU5MDFBXHU3N0U1X0lEXHU1REYyXHU1OTBEXHU1MjM2OiAnSURcdTVERjJcdTU5MERcdTUyMzYnLFxyXG5cclxuICAgIFx1N0I1Qlx1OTAwOV9cdTUxNjhcdTkwRThfXHU2M0NGXHU4RkYwOiAnXHU1MTY4XHU5MEU4JyxcclxuICAgIFx1N0I1Qlx1OTAwOV9cdTRFQzVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwOiAnXHU0RUM1XHU1NDJGXHU3NTI4JyxcclxuICAgIFx1N0I1Qlx1OTAwOV9cdTRFQzVcdTc5ODFcdTc1MjhfXHU2M0NGXHU4RkYwOiAnXHU0RUM1XHU3OTgxXHU3NTI4JyxcclxuICAgIFx1N0I1Qlx1OTAwOV9cdTVERjJcdTUyMDZcdTdFQzRfXHU2M0NGXHU4RkYwOiAnXHU1REYyXHU1MjA2XHU3RUM0JyxcclxuICAgIFx1N0I1Qlx1OTAwOV9cdTY3MkFcdTUyMDZcdTdFQzRfXHU2M0NGXHU4RkYwOiAnXHU2NzJBXHU1MjA2XHU3RUM0JyxcclxuICAgIFx1N0I1Qlx1OTAwOV9cdTY3MDlcdTY4MDdcdTdCN0VfXHU2M0NGXHU4RkYwOiAnXHU2NzA5XHU2ODA3XHU3QjdFJyxcclxuICAgIFx1N0I1Qlx1OTAwOV9cdTY1RTBcdTY4MDdcdTdCN0VfXHU2M0NGXHU4RkYwOiAnXHU2NUUwXHU2ODA3XHU3QjdFJyxcclxuICAgIFx1N0I1Qlx1OTAwOV9cdTY3MDlcdTdCMTRcdThCQjBfXHU2M0NGXHU4RkYwOiAnXHU2NzA5XHU3QjE0XHU4QkIwJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1NTdGQVx1Nzg0MCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODM3XHU1RjBGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1NjgzN1x1NUYwRicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1NTIwNlx1N0VDNCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1NjgwN1x1N0I3RScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1NUVGNlx1OEZERicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2ODA3XHU5ODk4OiAnXHU4QkVEXHU4QTAwXHU4QkJFXHU3RjZFJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjNDRlx1OEZGMDogJ1x1OTAwOVx1NjJFOVx1NjBBOFx1NTU5Q1x1NkIyMlx1NzY4NFx1OEJFRFx1OEEwMFx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzU0Q1x1OTc2Mlx1NUM0NVx1NEUyRF9cdTY4MDdcdTk4OTg6ICdcdTc1NENcdTk3NjJcdTVDNDVcdTRFMkQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc1NENcdTk3NjJcdTVDNDVcdTRFMkRfXHU2M0NGXHU4RkYwOiAnXHU4QkJFXHU3RjZFXHU3QkExXHU3NDA2XHU1NjY4XHU3NTRDXHU5NzYyXHU2NjJGXHU1NDI2XHU1QzQ1XHU0RTJEJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdcdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHU5MDA5XHU2MkU5XHU1MjA2XHU3RUM0XHU3Njg0XHU2ODM3XHU1RjBGXHVGRjBDXHU0RUU1XHU2M0QwXHU1MzQ3XHU2RDRGXHU4OUM4XHU0RjUzXHU5QThDXHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDA6ICdcdTU5Q0JcdTdFQzhcdTVDNTVcdTVGMDAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QzogJ1x1NkMzOFx1NEUwRFx1NUM1NVx1NUYwMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5OiAnXHU2MEFDXHU2RDZFXHU1QzU1XHU1RjAwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTU2REI6ICdcdTUzNTVcdTUxRkJcdTVDNTVcdTVGMDAnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTkwMDlcdTYyRTlcdTUyMDZcdTdFQzRcdTc2ODRcdTY4MzdcdTVGMEZcdUZGMENcdTRGN0ZcdTUyMDZcdTdFQzRcdTY2RjRcdTUyQTBcdTY2MEVcdTY2M0VcdUZGMENcdTRGQkZcdTRFOEVcdThCQzZcdTUyMkJcdTMwMDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMDogJ1x1NjgzN1x1NUYwRlx1NEUwMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RThDOiAnXHU2ODM3XHU1RjBGXHU0RThDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDk6ICdcdTY4MzdcdTVGMEZcdTRFMDknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQjogJ1x1NjgzN1x1NUYwRlx1NTZEQicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1OTAwOVx1NjJFOVx1NjgwN1x1N0I3RVx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwQ1x1NEY3Rlx1NjgwN1x1N0I3RVx1NjZGNFx1NTJBMFx1NjYwRVx1NjYzRVx1RkYwQ1x1NEZCRlx1NEU4RVx1OEJDNlx1NTIyQlx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTAwOiAnXHU2ODM3XHU1RjBGXHU0RTAwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFOEM6ICdcdTY4MzdcdTVGMEZcdTRFOEMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwOTogJ1x1NjgzN1x1NUYwRlx1NEUwOScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCOiAnXHU2ODM3XHU1RjBGXHU1NkRCJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTg6ICdcdTVFRjZcdTY1RjZcdTU0MkZcdTUyQTgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnXHU1NDJGXHU3NTI4XHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4XHU1MjlGXHU4MEZEXHU1M0VGXHU0RUU1XHU0RjE4XHU1MzE2XHU1MkEwXHU4RjdEXHU5ODdBXHU1RThGXHVGRjBDXHU0RjQ2XHU4QkY3XHU2Q0U4XHU2MTBGXHVGRjBDXHU4RkQ5XHU1M0VGXHU4MEZEXHU0RjFBXHU1QkZDXHU4MUY0XHU2N0QwXHU0RTlCXHU2M0QyXHU0RUY2XHU1MUZBXHU3M0IwXHU1MTdDXHU1QkI5XHU2MDI3XHU5NUVFXHU5ODk4XHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjgwN1x1OTg5ODogJ1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTRFM0FcdTY3MkFcdTU0MkZcdTc1MjhcdTc2ODRcdTYzRDJcdTRFRjZcdTYzRDBcdTRGOUJcdTg5QzZcdTg5QzlcdTZERTFcdTUzMTZcdTY1NDhcdTY3OUNcdUZGMENcdTRFRTVcdTRGQkZcdTZFMDVcdTY2NzBcdTU3MzBcdTUzM0FcdTUyMDZcdTU0MkZcdTc1MjhcdTU0OENcdTY3MkFcdTU0MkZcdTc1MjhcdTc2ODRcdTYzRDJcdTRFRjZcdTMwMDInLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3QjVCXHU5MDA5XHU2MzAxXHU0RTQ1XHU1MzE2X1x1NjgwN1x1OTg5ODogJ1x1N0I1Qlx1OTAwOVx1NjMwMVx1NEU0NVx1NTMxNicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1N0I1Qlx1OTAwOVx1NjMwMVx1NEU0NVx1NTMxNl9cdTYzQ0ZcdThGRjA6ICdcdTU0MkZcdTc1MjhcdTU0MEVcdUZGMENcdTYwQThcdTVDMDZcdTU3MjhcdTZCQ0ZcdTZCMjFcdTYyNTNcdTVGMDBcdTdCQTFcdTc0MDZcdTU2NjhcdTY1RjZcdTc3MEJcdTUyMzBcdTc2RjhcdTU0MENcdTc2ODRcdTYzRDJcdTRFRjZcdTUyMTdcdTg4NjhcdTMwMDInLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1NTM1NVx1NzJFQ1x1NjNBN1x1NTIzNlx1NjNEMlx1NEVGNlx1NTQ3RFx1NEVFNCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdcdTU0MkZcdTc1MjhcdTZCNjRcdTkwMDlcdTk4NzlcdTUzRUZcdTRFRTVcdTUzNTVcdTcyRUNcdTYzQTdcdTUyMzZcdTZCQ0ZcdTRFMkFcdTYzRDJcdTRFRjZcdTc2ODRcdTU0MkZcdTc1MjhcdTU0OENcdTc5ODFcdTc1MjhcdTcyQjZcdTYwMDFcdTMwMDIoXHU5MUNEXHU1NDJGT2JzaWRpYW5cdTc1MUZcdTY1NDgpJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1NTIwNlx1N0VDNFx1NjNBN1x1NTIzNlx1NjNEMlx1NEVGNlx1NTQ3RFx1NEVFNCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdcdTU0MkZcdTc1MjhcdTZCNjRcdTkwMDlcdTk4NzlcdTUzRUZcdTRFRTVcdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhcdTYyMTZcdTc5ODFcdTc1MjhcdTYzMDdcdTVCOUFcdTUyMDZcdTdFQzRcdTRFMkRcdTc2ODRcdTYyNDBcdTY3MDlcdTYzRDJcdTRFRjZcdTMwMDIoXHU5MUNEXHU1NDJGT2JzaWRpYW5cdTc1MUZcdTY1NDgpJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHU1RUY2XHU4RkRGXSBcdTVERjJcdTZERkJcdTUyQTAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1NUVGNlx1OEZERl0gSURcdTVERjJcdTVCNThcdTU3MjhcdTYyMTZcdTRFM0FcdTdBN0EnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1NUVGNlx1OEZERl0gXHU1MjIwXHU5NjY0XHU2MjEwXHU1MjlGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tcdTVFRjZcdThGREZdIFx1NTIyMFx1OTY2NFx1NTkzMVx1OEQyNVx1RkYwQ1x1NkI2NFx1NUVGNlx1OEZERlx1NEUwQlx1NUI1OFx1NTcyOFx1NjNEMlx1NEVGNicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1x1NTIwNlx1N0VDNF0gXHU1REYyXHU2REZCXHU1MkEwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tcdTUyMDZcdTdFQzRdIElEXHU1REYyXHU1QjU4XHU1NzI4XHU2MjE2XHU0RTNBXHU3QTdBJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdTUyMDZcdTdFQzRdIFx1NTIyMFx1OTY2NFx1NjIxMFx1NTI5RicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHU1MjA2XHU3RUM0XSBcdTUyMjBcdTk2NjRcdTU5MzFcdThEMjVcdUZGMENcdTZCNjRcdTUyMDZcdTdFQzRcdTRFMEJcdTVCNThcdTU3MjhcdTYzRDJcdTRFRjYnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdTY4MDdcdTdCN0VdIFx1NURGMlx1NkRGQlx1NTJBMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHU2ODA3XHU3QjdFXSBJRFx1NURGMlx1NUI1OFx1NTcyOFx1NjIxNlx1NEUzQVx1N0E3QScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbXHU2ODA3XHU3QjdFXSBcdTUyMjBcdTk2NjRcdTYyMTBcdTUyOUYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1NjgwN1x1N0I3RV0gXHU1MjIwXHU5NjY0XHU1OTMxXHU4RDI1XHVGRjBDXHU2QjY0XHU2ODA3XHU3QjdFXHU0RTBCXHU1QjU4XHU1NzI4XHU2M0QyXHU0RUY2JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTY4MDdcdTk4OTg6ICdcdTU5ODJcdTY3OUNcdTkwNDdcdTUyMzBcdTY3MkNcdTYzRDJcdTRFRjZcdTRFMEVcdTUxNzZcdTRFRDZcdTYzRDJcdTRFRjZcdTUxQjJcdTdBODEnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnXHU0RTJBXHU0RUJBXHU4MEZEXHU1MjlCXHU2NzA5XHU5NjUwXHVGRjBDXHU2NUUwXHU2Q0Q1XHU0RkVFXHU1OTBEXHU2QjY0XHU5NUVFXHU5ODk4XHVGRjBDXHU4QkY3XHU1MTczXHU5NUVEXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4XHVGRjBDXHU1MzczXHU1M0VGXHU4OUUzXHU1MUIzXHU0RTAwXHU1MjA3XHU1MUIyXHU3QTgxXHU5NUVFXHU5ODk4XHUzMDAyJyxcclxuXHJcbiAgICBcdTU0N0RcdTRFRTRfXHU3QkExXHU3NDA2XHU5NzYyXHU2NzdGX1x1NjNDRlx1OEZGMDogJ1x1NUYwMFx1NTQyRlx1NjNEMlx1NEVGNlx1N0JBMVx1NzQwNlx1NTY2OCcsXHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdQbHVnaW4gTWFuYWdlcicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MjEwXHU1MjlGX1x1NjU4N1x1NjcyQzogJ1N1Y2Nlc3MnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTkzMVx1OEQyNV9cdTY1ODdcdTY3MkM6ICdGYWlsdXJlJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDOiAnQWRkJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnT3BlcmF0aW9uJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDOiAnU2VhcmNoJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDOiAnTmFtZScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQzogJ0FMTCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU2ODA3XHU3QjdFX1x1NjU4N1x1NjcyQzogJ0FMTCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU1RUY2XHU4RkRGX1x1NjU4N1x1NjcyQzogJ05vIERlbGF5JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYwM0JcdThCQTFfXHU2NTg3XHU2NzJDOiAnVG90YWwnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkM6ICdFbmFibGUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdEaXNhYmxlJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTUxNzNcdTk1RURfXHU2NTg3XHU2NzJDOiAnRGlzYWJsZScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1RjAwXHU1NDJGX1x1NjU4N1x1NjcyQzogJ0VuYWJsZScsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0XHU4ODRDX1x1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkM6ICdFbmFibGUnLFxyXG4gICAgXHU1NDdEXHU0RUU0XHU4ODRDX1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdEaXNhYmxlJyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnR3JvdXAnLFxyXG4gICAgXHU1NDdEXHU0RUU0XHU4ODRDX1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkM6ICdPbmUgLSBjbGljayBFbmFibGUnLFxyXG4gICAgXHU1NDdEXHU0RUU0XHU4ODRDX1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdPbmUgLSBjbGljayBEaXNhYmxlJyxcclxuXHJcbiAgICBcdTgzRENcdTUzNTVfXHU3QjE0XHU4QkIwX1x1NjgwN1x1OTg5ODogJ05vdGUnLFxyXG4gICAgXHU4M0RDXHU1MzU1X1x1NUZFQlx1NjM3N1x1OTUyRV9cdTY4MDdcdTk4OTg6ICdIb3RrZXlzJyxcclxuICAgIFx1ODNEQ1x1NTM1NV9HaXRIdWJfXHU2ODA3XHU5ODk4OiAnR2l0SHViJyxcclxuICAgIFx1ODNEQ1x1NTM1NV9cdTUzNTVcdTZCMjFcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnU2luZ2xlIHN0YXJ0JyxcclxuICAgIFx1ODNEQ1x1NTM1NV9cdTkxQ0RcdTU0MkZcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnUmVzdGFydCBwbHVnaW4nLFxyXG5cclxuICAgIFx1N0I1Qlx1OTAwOV9cdTUxNjhcdTkwRThfXHU2M0NGXHU4RkYwOiAnQWxsJyxcclxuICAgIFx1N0I1Qlx1OTAwOV9cdTRFQzVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwOiAnRW5hYmxlZCBvbmx5JyxcclxuICAgIFx1N0I1Qlx1OTAwOV9cdTRFQzVcdTc5ODFcdTc1MjhfXHU2M0NGXHU4RkYwOiAnRGlzYWJsZWQgb25seScsXHJcbiAgICBcdTdCNUJcdTkwMDlfXHU1REYyXHU1MjA2XHU3RUM0X1x1NjNDRlx1OEZGMDogJ0dyb3VwZWQnLFxyXG4gICAgXHU3QjVCXHU5MDA5X1x1NjcyQVx1NTIwNlx1N0VDNF9cdTYzQ0ZcdThGRjA6ICdVbmdyb3VwZWQnLFxyXG4gICAgXHU3QjVCXHU5MDA5X1x1NjcwOVx1NjgwN1x1N0I3RV9cdTYzQ0ZcdThGRjA6ICdXaXRoIHRhZ3MnLFxyXG4gICAgXHU3QjVCXHU5MDA5X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTYzQ0ZcdThGRjA6ICdXaXRob3V0IHRhZ3MnLFxyXG4gICAgXHU3QjVCXHU5MDA5X1x1NjcwOVx1N0IxNFx1OEJCMF9cdTYzQ0ZcdThGRjA6ICdXaXRoIG5vdGVzJyxcclxuXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMDogJ1Zpc2l0IHRoZSBhdXRob3JcXCdzIEdpdEh1YiBwYWdlIHRvIHZpZXcgcHJvamVjdCBkZXRhaWxzLCB1cGRhdGUgbG9ncywgcGFydGljaXBhdGUgaW4gZGlzY3Vzc2lvbnMsIGFuZCBjb250cmlidXRlIGNvZGUuJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTg5QzZcdTk4OTFcdTY1NTlcdTdBMEJfXHU2M0NGXHU4RkYwOiAnQWNjZXNzIHZpZGVvIHR1dG9yaWFscycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ0VuYWJsZSBlZGl0IG1vZGUgZm9yIGluLWRlcHRoIHBsdWdpbiBjb25maWd1cmF0aW9uIGN1c3RvbWl6YXRpb24nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdSZWxvYWQgcGx1Z2lucyB0byB0YWtlIGVmZmVjdCBpbW1lZGlhdGVseScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwX1x1NjNDRlx1OEZGMDogJ0NoZWNrIGZvciBwbHVnaW4gdXBkYXRlcycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjNDRlx1OEZGMDogJ0Rpc2FibGUgYWxsIHBsdWdpbnMgYXQgb25jZScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ0VuYWJsZSBhbGwgcGx1Z2lucyBhdCBvbmNlJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYzRDJcdTRFRjZcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnTWFuYWdlIHBsdWdpbiBzZXR0aW5ncycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ09ubHkgZGlzcGxheSBlbmFibGVkIHBsdWdpbnMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjcyQVx1NTIwNlx1N0VDNF9cdTYzQ0ZcdThGRjA6ICdGaWx0ZXIgYWxsIHVuZ3JvdXBlZCBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnT3BlbiB0aGUgc2V0dGluZ3MgaW50ZXJmYWNlJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdThGRDhcdTUzOUZcdTUxODVcdTVCQjlfXHU2M0NGXHU4RkYwOiAnUmVzdG9yZSB0byB0aGUgaW5pdGlhbCBzdGF0ZScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1X1x1NjNDRlx1OEZGMDogJ09wZW4gdGhlIHBsdWdpbiBkaXJlY3RvcnknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdDb21wbGV0ZWx5IGRlbGV0ZSB0aGUgcGx1Z2luJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMDdcdTYzNjJcdTcyQjZcdTYwMDFfXHU2M0NGXHU4RkYwOiAnVG9nZ2xlIHRoZSBwbHVnaW4gc3RhdHVzJyxcclxuXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2ODA3XHU5ODk4OiAnVW5pbnN0YWxsIFBsdWdpbicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHVuaW5zdGFsbCB0aGlzIHBsdWdpbj8gVGhpcyB3aWxsIGRlbGV0ZSB0aGUgcGx1Z2luXFwncyBmb2xkZXIuJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzNzhcdThGN0Q6ICdVbmluc3RhbGwnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ0NhbmNlbCcsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1VuaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseScsXHJcblxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NjgwN1x1OTg5ODogJ09uZS1jbGljayBFbmFibGUvRGlzYWJsZSBQbHVnaW5zJyxcclxuICAgIFx1NEUwMFx1OTUyRV9cdTYzRDBcdTc5M0E6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZW5hYmxlL2Rpc2FibGUgdGhlIHBsdWdpbnMgb24gdGhpcyBwYWdlIHdpdGggb25lIGNsaWNrPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLiAoUGxlYXNlIHdhaXQgcGF0aWVudGx5IGR1cmluZyB0aGUgZW5hYmxlL2Rpc2FibGUgcHJvY2VzcyknLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NTQyRlx1Nzk4MTogJ0VuYWJsZS9EaXNhYmxlJyxcclxuICAgIFx1NEUwMFx1OTUyRV9cdTUzRDZcdTZEODg6ICdDYW5jZWwnLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdFbmFibGUvRGlzYWJsZSBTdWNjZXNzZnVsJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ0Jhc2ljJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MzdcdTVGMEZcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnU3R5bGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdHcm91cCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1RhZycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ0RlbGF5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTY4MDdcdTk4OTg6ICdMYW5ndWFnZSBTZXR0aW5ncycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTYzQ0ZcdThGRjA6ICdDaG9vc2UgeW91ciBwcmVmZXJyZWQgbGFuZ3VhZ2UuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NTRDXHU5NzYyXHU1QzQ1XHU0RTJEX1x1NjgwN1x1OTg5ODogJ0NlbnRlciB0aGUgaW50ZXJmYWNlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NTRDXHU5NzYyXHU1QzQ1XHU0RTJEX1x1NjNDRlx1OEZGMDogJ1NldCB3aGV0aGVyIHRoZSBtYW5hZ2VyIGludGVyZmFjZSBpcyBjZW50ZXJlZCcsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnRGlyZWN0b3J5IFN0eWxlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1NlbGVjdCB0aGUgc3R5bGUgb2YgdGhlIGdyb3VwIHRvIGVuaGFuY2UgdGhlIGJyb3dzaW5nIGV4cGVyaWVuY2UuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDA6ICdBbHdheXMgRXhwYW5kZWQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QzogJ05ldmVyIEV4cGFuZGVkJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDk6ICdIb3ZlciB0byBFeHBhbmQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQjogJ0NsaWNrIHRvIEV4cGFuZCcsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnR3JvdXAgU3R5bGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnU2VsZWN0IHRoZSBzdHlsZSBvZiB0aGUgZ3JvdXAgdG8gbWFrZSBpdCBtb3JlIG5vdGljZWFibGUgYW5kIGVhc3kgdG8gaWRlbnRpZnkuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDA6ICdTdHlsZSBPbmUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QzogJ1N0eWxlIFR3bycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5OiAnU3R5bGUgVGhyZWUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQjogJ1N0eWxlIEZvdXInLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1RhZyBTdHlsZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdTZWxlY3QgdGhlIHN0eWxlIG9mIHRoZSB0YWcgdG8gbWFrZSBpdCBtb3JlIG5vdGljZWFibGUgYW5kIGVhc3kgdG8gaWRlbnRpZnkuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDA6ICdTdHlsZSBPbmUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QzogJ1N0eWxlIFR3bycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5OiAnU3R5bGUgVGhyZWUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQjogJ1N0eWxlIEZvdXInLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjgwN1x1OTg5ODogJ0RlbGF5ZWQgU3RhcnR1cCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTYzQ0ZcdThGRjA6ICdFbmFibGluZyB0aGUgZGVsYXllZCBzdGFydHVwIGZlYXR1cmUgY2FuIG9wdGltaXplIHRoZSBsb2FkaW5nIG9yZGVyLCBidXQgcGxlYXNlIG5vdGUgdGhhdCB0aGlzIG1heSBjYXVzZSBjb21wYXRpYmlsaXR5IGlzc3VlcyB3aXRoIHNvbWUgcGx1Z2lucy4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2ODA3XHU5ODk4OiAnRmFkZSBQbHVnaW5zJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1Byb3ZpZGUgYSB2aXN1YWwgZmFkZSBlZmZlY3QgZm9yIGRpc2FibGVkIHBsdWdpbnMgdG8gY2xlYXJseSBkaXN0aW5ndWlzaCBiZXR3ZWVuIGVuYWJsZWQgYW5kIGRpc2FibGVkIHBsdWdpbnMuJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1N0I1Qlx1OTAwOVx1NjMwMVx1NEU0NVx1NTMxNl9cdTY4MDdcdTk4OTg6ICdGaWx0ZXIgUGVyc2lzdGVuY2UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTdCNUJcdTkwMDlcdTYzMDFcdTRFNDVcdTUzMTZfXHU2M0NGXHU4RkYwOiAnQWZ0ZXIgZW5hYmxpbmcsIHlvdSB3aWxsIHNlZSB0aGUgc2FtZSBwbHVnaW4gbGlzdCBldmVyeSB0aW1lIHlvdSBvcGVuIHRoZSBtYW5hZ2VyLicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnQ29udHJvbCBQbHVnaW4gQ29tbWFuZHMgU2VwYXJhdGVseScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdFbmFibGUgdGhpcyBvcHRpb24gdG8gY29udHJvbCB0aGUgZW5hYmxlZCBhbmQgZGlzYWJsZWQgc3RhdGUgb2YgZWFjaCBwbHVnaW4gc2VwYXJhdGVseS4gKFJlc3RhcnQgT2JzaWRpYW4gdG8gdGFrZSBlZmZlY3QpJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ0NvbnRyb2wgUGx1Z2luIENvbW1hbmRzIGJ5IEdyb3VwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ0VuYWJsZSB0aGlzIG9wdGlvbiB0byBlbmFibGUgb3IgZGlzYWJsZSBhbGwgcGx1Z2lucyBpbiBhIHNwZWNpZmllZCBncm91cCB3aXRoIG9uZSBjbGljay4gKFJlc3RhcnQgT2JzaWRpYW4gdG8gdGFrZSBlZmZlY3QpJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbRGVsYXldIEFkZGVkJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tEZWxheV0gSUQgYWxyZWFkeSBleGlzdHMgb3IgaXMgZW1wdHknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW0RlbGF5XSBEZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbRGVsYXldIERlbGV0aW9uIGZhaWxlZCwgcGx1Z2lucyBleGlzdCB1bmRlciB0aGlzIGRlbGF5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbR3JvdXBdIEFkZGVkJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tHcm91cF0gSUQgYWxyZWFkeSBleGlzdHMgb3IgaXMgZW1wdHknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW0dyb3VwXSBEZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbR3JvdXBdIERlbGV0aW9uIGZhaWxlZCwgcGx1Z2lucyBleGlzdCB1bmRlciB0aGlzIGdyb3VwJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbVGFnXSBBZGRlZCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbVGFnXSBJRCBhbHJlYWR5IGV4aXN0cyBvciBpcyBlbXB0eScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbVGFnXSBEZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbVGFnXSBEZWxldGlvbiBmYWlsZWQsIHBsdWdpbnMgZXhpc3QgdW5kZXIgdGhpcyB0YWcnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjgwN1x1OTg5ODogJ0lmIFlvdSBFbmNvdW50ZXIgQ29uZmxpY3RzIHdpdGggT3RoZXIgUGx1Z2lucycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTYzQ0ZcdThGRjA6ICdEdWUgdG8gbGltaXRlZCBjYXBhYmlsaXRpZXMsIEkgY2Fubm90IGZpeCB0aGlzIGlzc3VlLiBQbGVhc2UgZGlzYWJsZSBkZWxheWVkIHN0YXJ0dXAgdG8gcmVzb2x2ZSBhbGwgY29uZmxpY3QgaXNzdWVzLicsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjA6ICdPcGVuIHRoZSBwbHVnaW4gbWFuYWdlcicsXHJcbn1cclxuIiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFx1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDOiAnXHUwNDFDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDM0XHUwNDM2XHUwNDM1XHUwNDQwIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MjEwXHU1MjlGX1x1NjU4N1x1NjcyQzogJ1x1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0NScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1OTMxXHU4RDI1X1x1NjU4N1x1NjcyQzogJ1x1MDQxRFx1MDQzNVx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQ0N1x1MDQzMCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUIwXHU1ODlFX1x1NjU4N1x1NjcyQzogJ1x1MDQxNFx1MDQzRVx1MDQzMVx1MDQzMFx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NENEXHU0RjVDX1x1NjU4N1x1NjcyQzogJ1x1MDQxRVx1MDQzRlx1MDQzNVx1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NDFDXHU3RDIyX1x1NjU4N1x1NjcyQzogJ1x1MDQxRlx1MDQzRVx1MDQzOFx1MDQ0MVx1MDQzQScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDBEXHU3OUYwX1x1NjU4N1x1NjcyQzogJ1x1MDQxRFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQzogJ1x1MDQxMVx1MDQzNVx1MDQzNyBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0NEInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdcdTA0MTFcdTA0MzVcdTA0MzcgXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDM4JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDOiAnXHUwNDExXHUwNDM1XHUwNDM3IFx1MDQzN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzOCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MDNCXHU4QkExX1x1NjU4N1x1NjcyQzogJ1x1MDQxMlx1MDQ0MVx1MDQzNVx1MDQzM1x1MDQzRScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQzogJ1x1MDQxMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQzogJ1x1MDQxRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QycsXHJcblxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X0dJVEhVQl9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0M0VcdTA0NDFcdTA0MzVcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDQzIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0RcdTA0MzAgR2l0SHViLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQxXHUwNDNDXHUwNDNFXHUwNDQyXHUwNDQwXHUwNDM1XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzRVx1MDQzNFx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzVcdTA0M0FcdTA0NDJcdTA0MzAsIFx1MDQzNlx1MDQ0M1x1MDQ0MFx1MDQzRFx1MDQzMFx1MDQzQiBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzksIFx1MDQzRlx1MDQ0MFx1MDQzOFx1MDQzRFx1MDQ0Rlx1MDQ0Mlx1MDQ0QyBcdTA0NDNcdTA0NDdcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcdTA0MzUgXHUwNDMyIFx1MDQzRVx1MDQzMVx1MDQ0MVx1MDQ0M1x1MDQzNlx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOCBcdTA0MzggXHUwNDMyXHUwNDNEXHUwNDM1XHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQ0MVx1MDQzMlx1MDQzRVx1MDQzOSBcdTA0MzJcdTA0M0FcdTA0M0JcdTA0MzBcdTA0MzQgXHUwNDMyIFx1MDQzQVx1MDQzRVx1MDQzNC4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQl9cdTYzQ0ZcdThGRjA6ICdcdTA0MTRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0YgXHUwNDNBIFx1MDQzMlx1MDQzOFx1MDQzNFx1MDQzNVx1MDQzRVx1MDQ0M1x1MDQ0MFx1MDQzRVx1MDQzQVx1MDQzMFx1MDQzQycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1MDQxMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDBcdTA0MzVcdTA0MzZcdTA0MzhcdTA0M0MgXHUwNDQwXHUwNDM1XHUwNDM0XHUwNDMwXHUwNDNBXHUwNDQyXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzNcdTA0M0JcdTA0NDNcdTA0MzFcdTA0M0VcdTA0M0FcdTA0M0VcdTA0MzkgXHUwNDNEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDM4IFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0RcdTA0MzVcdTA0M0NcdTA0MzVcdTA0MzRcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDMyXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzMiBcdTA0NDFcdTA0MzhcdTA0M0JcdTA0NDMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMF9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NENcdTA0NDJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1MDQxRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzJcdTA0NDFcdTA0MzUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCIFx1MDQzRVx1MDQzNFx1MDQzRFx1MDQzOFx1MDQzQyBcdTA0M0FcdTA0M0JcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0MnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTA0MTJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDMyXHUwNDQxXHUwNDM1IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQ0QiBcdTA0M0VcdTA0MzRcdTA0M0RcdTA0MzhcdTA0M0MgXHUwNDNBXHUwNDNCXHUwNDM4XHUwNDNBXHUwNDNFXHUwNDNDJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYzRDJcdTRFRjZcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnXHUwNDIzXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQzQVx1MDQzMFx1MDQzQ1x1MDQzOCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEVDNVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0M0VcdTA0M0FcdTA0MzBcdTA0MzdcdTA0NEJcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDQyXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDNBXHUwNDNFIFx1MDQzMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDM4XHUwNDNEXHUwNDQyXHUwNDM1XHUwNDQwXHUwNDQ0XHUwNDM1XHUwNDM5XHUwNDQxIFx1MDQzRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzNVx1MDQzQScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMDogJ1x1MDQxMlx1MDQzNVx1MDQ0MFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDQxXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDNFXHUwNDRGXHUwNDNEXHUwNDM4XHUwNDM1JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdTc2RUVcdTVGNTVfXHU2M0NGXHU4RkYwOiAnXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQVx1MDQzMFx1MDQ0Mlx1MDQzMFx1MDQzQlx1MDQzRVx1MDQzMyBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NENcdTA0NEUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ1x1MDQxRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0NDNcdTA0NDEgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDMwJyxcclxuXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2ODA3XHU5ODk4OiAnXHUwNDIzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRCcsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnXHUwNDEyXHUwNDRCIFx1MDQ0M1x1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQ0QiwgXHUwNDQ3XHUwNDQyXHUwNDNFIFx1MDQ0NVx1MDQzRVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDREXHUwNDQyXHUwNDNFXHUwNDQyIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRD8gXHUwNDJEXHUwNDQyXHUwNDNFIFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0MiBcdTA0M0ZcdTA0MzBcdTA0M0ZcdTA0M0FcdTA0NDMgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDMwLicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnXHUwNDIzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODg6ICdcdTA0MUVcdTA0NDJcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzAnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdcdTA0MjNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1MDQxRVx1MDQ0MVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzRFx1MDQ0Qlx1MDQzNScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1MDQxM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQzMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1MDQxQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1MDQxN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzMCcsXHJcblxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5ODogJ1x1MDQxRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQzQVx1MDQzOCBcdTA0NEZcdTA0MzdcdTA0NEJcdTA0M0FcdTA0MzAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQzRlx1MDQzRVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzMFx1MDQzNVx1MDQzQ1x1MDQ0Qlx1MDQzOSBcdTA0NEZcdTA0MzdcdTA0NEJcdTA0M0EuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1MDQyMVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0QyBcdTA0M0FcdTA0MzBcdTA0NDJcdTA0MzBcdTA0M0JcdTA0M0VcdTA0MzNcdTA0MzAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0QyBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0NEIgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQ0M1x1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDFcdTA0M0NcdTA0M0VcdTA0NDJcdTA0NDBcdTA0MzAuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1MDQyMVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0QyBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0NEInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0QyBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0NEIgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQ0OFx1MDQzNVx1MDQzOSBcdTA0MzJcdTA0MzhcdTA0MzRcdTA0MzhcdTA0M0NcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDM4IFx1MDQzOFx1MDQzNFx1MDQzNVx1MDQzRFx1MDQ0Mlx1MDQzOFx1MDQ0NFx1MDQzOFx1MDQzQVx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHUwNDIxXHUwNDQyXHUwNDM4XHUwNDNCXHUwNDRDIFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDNCXHUwNDRDIFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzOCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNCXHUwNDQzXHUwNDQ3XHUwNDQ4XHUwNDM1XHUwNDM5IFx1MDQzMlx1MDQzOFx1MDQzNFx1MDQzOFx1MDQzQ1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzggXHUwNDM4XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDQyXHUwNDM4XHUwNDQ0XHUwNDM4XHUwNDNBXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4LicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2ODA3XHU5ODk4OiAnXHUwNDE3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzOCBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0MzUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0NFx1MDQ0M1x1MDQzRFx1MDQzQVx1MDQ0Nlx1MDQzOFx1MDQzOCBcdTA0MzdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzggXHUwNDNGXHUwNDQwXHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzNSBcdTA0M0NcdTA0M0VcdTA0MzZcdTA0MzVcdTA0NDIgXHUwNDNFXHUwNDNGXHUwNDQyXHUwNDM4XHUwNDNDXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzRVx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzQSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzgsIFx1MDQzRFx1MDQzRSBcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDMyXHUwNDNEXHUwNDM4XHUwNDNDXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1LCBcdTA0NDdcdTA0NDJcdTA0M0UgXHUwNDREXHUwNDQyXHUwNDNFIFx1MDQzQ1x1MDQzRVx1MDQzNlx1MDQzNVx1MDQ0MiBcdTA0MzJcdTA0NEJcdTA0MzdcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDM1XHUwNDNDXHUwNDRCIFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQ1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0NDEgXHUwNDNEXHUwNDM1XHUwNDNBXHUwNDNFXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDRCXHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzMFx1MDQzQ1x1MDQzOC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2ODA3XHU5ODk4OiAnXHUwNDIxXHUwNDNCXHUwNDMwXHUwNDMxXHUwNDNFIFx1MDQzMlx1MDQzOFx1MDQzNFx1MDQzOFx1MDQzQ1x1MDQ0Qlx1MDQzNSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHUwNDFGXHUwNDQwXHUwNDM1XHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDMyXHUwNDRDXHUwNDQyXHUwNDM1IFx1MDQzMlx1MDQzOFx1MDQzN1x1MDQ0M1x1MDQzMFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzOSBcdTA0NERcdTA0NDRcdTA0NDRcdTA0MzVcdTA0M0FcdTA0NDIgXHUwNDQxXHUwNDNCXHUwNDMwXHUwNDMxXHUwNDNFXHUwNDM5IFx1MDQzMlx1MDQzOFx1MDQzNFx1MDQzOFx1MDQzQ1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMiwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQ0N1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzRSBcdTA0NDBcdTA0MzBcdTA0MzdcdTA0M0JcdTA0MzhcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzOCBcdTA0M0VcdTA0NDJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdcdTA0MUVcdTA0NDJcdTA0MzRcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDQzXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzQVx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQzRFx1MDQzNFx1MDQzMFx1MDQzQ1x1MDQzOCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQ0MiBcdTA0M0ZcdTA0MzBcdTA0NDBcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NDAgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRVx1MDQ0Mlx1MDQzNFx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0NDNcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDQxXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDNFXHUwNDRGXHUwNDNEXHUwNDM4XHUwNDM1XHUwNDNDIFx1MDQzMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzggXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzQVx1MDQzMFx1MDQzNlx1MDQzNFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0MzAuIChcdTA0MUZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgT2JzaWRpYW4sIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0MzJcdTA0M0RcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGKScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdcdTA0MjNcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDNEXHUwNDM0XHUwNDMwXHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMiBcdTA0M0ZcdTA0M0UgXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDNGXHUwNDNGXHUwNDMwXHUwNDNDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ1x1MDQxMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NERcdTA0NDJcdTA0M0VcdTA0NDIgXHUwNDNGXHUwNDMwXHUwNDQwXHUwNDMwXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDQwIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDM4XHUwNDNCXHUwNDM4IFx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzJcdTA0NDFcdTA0MzVcdTA0NDUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDNFXHUwNDMyIFx1MDQzMiBcdTA0NDNcdTA0M0FcdTA0MzBcdTA0MzdcdTA0MzBcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzkgXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDNGXHUwNDNGXHUwNDM1IFx1MDQzRVx1MDQzNFx1MDQzRFx1MDQzOFx1MDQzQyBcdTA0M0FcdTA0M0JcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0MuIChcdTA0MUZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgT2JzaWRpYW4sIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0MzJcdTA0M0RcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGKScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1x1MDQxN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzMF0gXHUwNDE0XHUwNDNFXHUwNDMxXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tcdTA0MTdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzBdIElEIFx1MDQ0M1x1MDQzNlx1MDQzNSBcdTA0NDFcdTA0NDNcdTA0NDlcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0NDNcdTA0MzVcdTA0NDIgXHUwNDM4XHUwNDNCXHUwNDM4IFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0MicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbXHUwNDE3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDMwXSBcdTA0MjNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tcdTA0MTdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzBdIFx1MDQxRFx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEMgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDLCBcdTA0NDFcdTA0NDNcdTA0NDlcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0NDNcdTA0NEVcdTA0NDIgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCIFx1MDQ0MSBcdTA0NERcdTA0NDJcdTA0M0VcdTA0MzkgXHUwNDM3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDNFXHUwNDM5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHUwNDEzXHUwNDQwXHUwNDQzXHUwNDNGXHUwNDNGXHUwNDMwXSBcdTA0MTRcdTA0M0VcdTA0MzFcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1MDQxM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQzMF0gSUQgXHUwNDQzXHUwNDM2XHUwNDM1IFx1MDQ0MVx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQ0M1x1MDQzNVx1MDQ0MiBcdTA0MzhcdTA0M0JcdTA0MzggXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdTA0MTNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0MzBdIFx1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1MDQxM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQzMF0gXHUwNDFEXHUwNDM1IFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0QyBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NEMsIFx1MDQ0MVx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQ0M1x1MDQ0RVx1MDQ0MiBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEIgXHUwNDMyIFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQzOSBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0MzUnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdTA0MUNcdTA0MzVcdTA0NDJcdTA0M0FcdTA0MzBdIFx1MDQxNFx1MDQzRVx1MDQzMVx1MDQzMFx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHUwNDFDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDMwXSBJRCBcdTA0NDNcdTA0MzZcdTA0MzUgXHUwNDQxXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDQzXHUwNDM1XHUwNDQyIFx1MDQzOFx1MDQzQlx1MDQzOCBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1MDQxQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzMF0gXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHUwNDFDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDMwXSBcdTA0MURcdTA0MzUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDIFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0QywgXHUwNDQxXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDQzXHUwNDRFXHUwNDQyIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQ0QiBcdTA0NDEgXHUwNDREXHUwNDQyXHUwNDNFXHUwNDM5IFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzRVx1MDQzOScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2ODA3XHU5ODk4OiAnXHUwNDE1XHUwNDQxXHUwNDNCXHUwNDM4IFx1MDQzMlx1MDQzRVx1MDQzN1x1MDQzRFx1MDQzOFx1MDQzQVx1MDQzMFx1MDQ0RVx1MDQ0MiBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDRcdTA0M0JcdTA0MzhcdTA0M0FcdTA0NDJcdTA0NEIgXHUwNDQxIFx1MDQzNFx1MDQ0MFx1MDQ0M1x1MDQzM1x1MDQzOFx1MDQzQ1x1MDQzOCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0MzBcdTA0M0NcdTA0MzgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnXHUwNDE4XHUwNDM3LVx1MDQzN1x1MDQzMCBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDdcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDMyXHUwNDNFXHUwNDM3XHUwNDNDXHUwNDNFXHUwNDM2XHUwNDNEXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM1XHUwNDM5IFx1MDQ0RiBcdTA0M0RcdTA0MzUgXHUwNDNDXHUwNDNFXHUwNDMzXHUwNDQzIFx1MDQzOFx1MDQ0MVx1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NERcdTA0NDJcdTA0NDMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDM1XHUwNDNDXHUwNDQzLiBcdTA0MUZcdTA0M0VcdTA0MzZcdTA0MzBcdTA0M0JcdTA0NDNcdTA0MzlcdTA0NDFcdTA0NDJcdTA0MzAsIFx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0NDMgXHUwNDNGXHUwNDQwXHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzNSwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQ0MFx1MDQzNVx1MDQ0OFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0NDFcdTA0MzUgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDM1XHUwNDNDXHUwNDRCIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzQlx1MDQzOFx1MDQzQVx1MDQ0Mlx1MDQzMC4nLFxyXG5cclxuICAgIFx1NTQ3RFx1NEVFNF9cdTdCQTFcdTc0MDZcdTk3NjJcdTY3N0ZfXHU2M0NGXHU4RkYwOiAnXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzNFx1MDQzNlx1MDQzNVx1MDQ0MCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFx1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDOiAnXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMERFXHUzMENEXHUzMEZDXHUzMEI4XHUzMEUzXHUzMEZDJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYyMTBcdTUyOUZfXHU2NTg3XHU2NzJDOiAnXHU2MjEwXHU1MjlGJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDOiAnXHU1OTMxXHU2NTU3JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDOiAnXHU4RkZEXHU1MkEwJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnXHU2NENEXHU0RjVDJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDOiAnXHU2OTFDXHU3RDIyJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDOiAnXHU1NDBEXHU1MjREJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XHUzMDZBXHUzMDU3JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTY4MDdcdTdCN0VfXHU2NTg3XHU2NzJDOiAnXHUzMEJGXHUzMEIwXHUzMDZBXHUzMDU3JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDOiAnXHU5MDQ1XHU1RUY2XHUzMDZBXHUzMDU3JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYwM0JcdThCQTFfXHU2NTg3XHU2NzJDOiAnXHU1NDA4XHU4QTA4JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU2NzA5XHU1MkI5JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU3MTIxXHU1MkI5JyxcclxuXHJcblxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X0dJVEhVQl9cdTYzQ0ZcdThGRjA6ICdcdTg0NTdcdTgwMDVcdTMwNkVHaXRIdWJcdTMwREFcdTMwRkNcdTMwQjhcdTMwOTJcdThBMkFcdTMwOENcdTMwMDFcdTMwRDdcdTMwRURcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNkVcdThBNzNcdTdEMzBcdTMwMDFcdTY2RjRcdTY1QjBcdTMwRURcdTMwQjBcdTMwMDFcdThCNzBcdThBRDZcdTMwNzhcdTMwNkVcdTUzQzJcdTUyQTBcdTMwMDFcdTMwQjNcdTMwRkNcdTMwQzlcdTMwNzhcdTMwNkVcdThDQTJcdTczMkVcdTMwOTJcdTc4QkFcdThBOERcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQl9cdTYzQ0ZcdThGRjA6ICdcdTMwRDNcdTMwQzdcdTMwQUFcdTMwQzFcdTMwRTVcdTMwRkNcdTMwQzhcdTMwRUFcdTMwQTJcdTMwRUJcdTMwNkJcdTMwQTJcdTMwQUZcdTMwQkJcdTMwQjknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTdERThcdTk2QzZcdTMwRTJcdTMwRkNcdTMwQzlcdTMwOTJcdTY3MDlcdTUyQjlcdTMwNkJcdTMwNTdcdTMwNjZcdTMwMDFcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdThBMkRcdTVCOUFcdTMwOTJcdTMwQUJcdTMwQjlcdTMwQkZcdTMwREVcdTMwQTRcdTMwQkFcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTMwRUFcdTMwRURcdTMwRkNcdTMwQzlcdTMwNTdcdTMwNjZcdTUzNzNcdTVFQTdcdTMwNkJcdTUyQjlcdTY3OUNcdTMwOTJcdTc2N0FcdTYzRUVcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMF9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTY2RjRcdTY1QjBcdTMwOTJcdTc4QkFcdThBOERcdTMwNTlcdTMwOEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTRFMDBcdTVFQTZcdTMwNkJcdTMwNTlcdTMwNzlcdTMwNjZcdTMwNkVcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTcxMjFcdTUyQjlcdTMwNkJcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTRFMDBcdTVFQTZcdTMwNkJcdTMwNTlcdTMwNzlcdTMwNjZcdTMwNkVcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTY3MDlcdTUyQjlcdTMwNkJcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdThBMkRcdTVCOUFcdTMwOTJcdTdCQTFcdTc0MDZcdTMwNTlcdTMwOEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEVDNVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTY3MDlcdTUyQjlcdTMwNkFcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTMwN0ZcdTMwOTJcdTg4NjhcdTc5M0FcdTMwNTlcdTMwOEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdThBMkRcdTVCOUFcdTMwQTRcdTMwRjNcdTMwQkZcdTMwRkNcdTMwRDVcdTMwQTdcdTMwRkNcdTMwQjlcdTMwOTJcdTk1OEJcdTMwNEYnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOV9cdTYzQ0ZcdThGRjA6ICdcdTUyMURcdTY3MUZcdTcyQjZcdTYxNEJcdTMwNkJcdTYyM0JcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NV9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwQzdcdTMwQTNcdTMwRUNcdTMwQUZcdTMwQzhcdTMwRUFcdTMwOTJcdTk1OEJcdTMwNEYnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTVCOENcdTUxNjhcdTMwNkJcdTUyNEFcdTk2NjRcdTMwNTlcdTMwOEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIwN1x1NjM2Mlx1NzJCNlx1NjAwMV9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTMwQjlcdTMwQzZcdTMwRkNcdTMwQkZcdTMwQjlcdTMwOTJcdTUyMDdcdTMwOEFcdTY2RkZcdTMwNDhcdTMwOEInLFxyXG5cclxuICAgIFx1NTM3OFx1OEY3RF9cdTY4MDdcdTk4OTg6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTMwQTJcdTMwRjNcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQzhcdTMwRkNcdTMwRUInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjNEMFx1NzkzQTogJ1x1MzA1M1x1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1MzBBMlx1MzBGM1x1MzBBNFx1MzBGM1x1MzBCOVx1MzBDOFx1MzBGQ1x1MzBFQlx1MzA1N1x1MzA2Nlx1MzA4Mlx1MzA4OFx1MzA4RFx1MzA1N1x1MzA0NFx1MzA2N1x1MzA1OVx1MzA0Qlx1RkYxRlx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFx1MzA0Q1x1NTI0QVx1OTY2NFx1MzA1NVx1MzA4Q1x1MzA3RVx1MzA1OVx1MzAwMicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnXHUzMEEyXHUzMEYzXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEVCJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODg6ICdcdTMwQURcdTMwRTNcdTMwRjNcdTMwQkJcdTMwRUInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdcdTMwQTJcdTMwRjNcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQzhcdTMwRkNcdTMwRUJcdTMwNkJcdTYyMTBcdTUyOUZcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUYnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHU1N0ZBXHU2NzJDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHUzMEJGXHUzMEIwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHU5MDQ1XHU1RUY2JyxcclxuXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2ODA3XHU5ODk4OiAnXHU4QTAwXHU4QTlFXHU4QTJEXHU1QjlBJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjNDRlx1OEZGMDogJ1x1MzA0QVx1NTk3RFx1MzA3Rlx1MzA2RVx1OEEwMFx1OEE5RVx1MzA5Mlx1OTA3OFx1NjI5RVx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdcdTMwQzdcdTMwQTNcdTMwRUNcdTMwQUZcdTMwQzhcdTMwRUFcdTMwQjlcdTMwQkZcdTMwQTRcdTMwRUInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XHUzMDZFXHUzMEI5XHUzMEJGXHUzMEE0XHUzMEVCXHUzMDkyXHU5MDc4XHU2MjlFXHUzMDU3XHUzMDY2XHUzMDAxXHUzMEQ2XHUzMEU5XHUzMEE2XHUzMEI4XHUzMEYzXHUzMEIwXHU0RjUzXHU5QTEzXHUzMDkyXHU1NDExXHU0RTBBXHUzMDU1XHUzMDVCXHUzMDdFXHUzMDU5XHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN1x1MzBCOVx1MzBCRlx1MzBBNFx1MzBFQicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDdcdTMwNkVcdTMwQjlcdTMwQkZcdTMwQTRcdTMwRUJcdTMwOTJcdTkwNzhcdTYyOUVcdTMwNTdcdTMwNjZcdTMwMDFcdTMwODhcdTMwOEFcdTc2RUVcdTdBQ0JcdTMwNUZcdTMwNUJcdTMwODRcdTMwNTlcdTMwNEZcdThCNThcdTUyMjVcdTMwNTdcdTMwODRcdTMwNTlcdTMwNEZcdTMwNTdcdTMwN0VcdTMwNTlcdTMwMDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHUzMEJGXHUzMEIwXHUzMEI5XHUzMEJGXHUzMEE0XHUzMEVCJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1MzBCRlx1MzBCMFx1MzA2RVx1MzBCOVx1MzBCRlx1MzBBNFx1MzBFQlx1MzA5Mlx1OTA3OFx1NjI5RVx1MzA1N1x1MzA2Nlx1MzAwMVx1MzA4OFx1MzA4QVx1NzZFRVx1N0FDQlx1MzA1Rlx1MzA1Qlx1MzA4NFx1MzA1OVx1MzA0Rlx1OEI1OFx1NTIyNVx1MzA1N1x1MzA4NFx1MzA1OVx1MzA0Rlx1MzA1N1x1MzA3RVx1MzA1OVx1MzAwMicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2ODA3XHU5ODk4OiAnXHU5MDQ1XHU1RUY2XHUzMEI5XHUzMEJGXHUzMEZDXHUzMEM4JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjNDRlx1OEZGMDogJ1x1OTA0NVx1NUVGNlx1MzBCOVx1MzBCRlx1MzBGQ1x1MzBDOFx1NkE1Rlx1ODBGRFx1MzA5Mlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA1OVx1MzA4Qlx1MzA2OFx1MzAwMVx1OEFBRFx1MzA3Rlx1OEZCQ1x1MzA3Rlx1OTgwNlx1NUU4Rlx1MzA5Mlx1NjcwMFx1OTA2OVx1NTMxNlx1MzA2N1x1MzA0RFx1MzA3RVx1MzA1OVx1MzA0Q1x1MzAwMVx1NEUwMFx1OTBFOFx1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2N1x1NEU5Mlx1NjNEQlx1NjAyN1x1NTU0Rlx1OTg0Q1x1MzA0Q1x1NzY3QVx1NzUxRlx1MzA1OVx1MzA4Qlx1NTgzNFx1NTQwOFx1MzA0Q1x1MzA0Mlx1MzA4QVx1MzA3RVx1MzA1OVx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTg6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTMwRDVcdTMwQTdcdTMwRkNcdTMwQzknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHU3MTIxXHU1MkI5XHUzMDZBXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDZCXHU4OTk2XHU4OTlBXHU3Njg0XHUzMDZBXHUzMEQ1XHUzMEE3XHUzMEZDXHUzMEM5XHU1MkI5XHU2NzlDXHUzMDkyXHU2M0QwXHU0RjlCXHUzMDU3XHUzMDY2XHUzMDAxXHU2NzA5XHU1MkI5XHUzMDY4XHU3MTIxXHU1MkI5XHUzMDZFXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHU2NjBFXHU3OEJBXHUzMDZCXHU1MzNBXHU1MjI1XHUzMDU3XHUzMDdFXHUzMDU5XHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzBCM1x1MzBERVx1MzBGM1x1MzBDOVx1MzA5Mlx1NTAwQlx1NTIyNVx1MzA2Qlx1NTIzNlx1NUZBMScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdcdTMwNTNcdTMwNkVcdTMwQUFcdTMwRDdcdTMwQjdcdTMwRTdcdTMwRjNcdTMwOTJcdTY3MDlcdTUyQjlcdTMwNkJcdTMwNTlcdTMwOEJcdTMwNjhcdTMwMDFcdTU0MDRcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTY3MDlcdTUyQjkvXHU3MTIxXHU1MkI5XHU3MkI2XHU2MTRCXHUzMDkyXHU1MDBCXHU1MjI1XHUzMDZCXHU1MjM2XHU1RkExXHUzMDY3XHUzMDREXHUzMDdFXHUzMDU5XHUzMDAyXHVGRjA4T2JzaWRpYW5cdTMwOTJcdTUxOERcdThENzdcdTUyRDVcdTMwNTlcdTMwOEJcdTVGQzVcdTg5ODFcdTMwNENcdTMwNDJcdTMwOEFcdTMwN0VcdTMwNTlcdUZGMDknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XHUzMDU0XHUzMDY4XHUzMDZCXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMEIzXHUzMERFXHUzMEYzXHUzMEM5XHUzMDkyXHU1MjM2XHU1RkExJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ1x1MzA1M1x1MzA2RVx1MzBBQVx1MzBEN1x1MzBCN1x1MzBFN1x1MzBGM1x1MzA5Mlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA1OVx1MzA4Qlx1MzA2OFx1MzAwMVx1NjMwN1x1NUI5QVx1MzA1NVx1MzA4Q1x1MzA1Rlx1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN1x1NTE4NVx1MzA2RVx1MzA1OVx1MzA3OVx1MzA2Nlx1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1MzBFRlx1MzBGM1x1MzBBRlx1MzBFQVx1MzBDM1x1MzBBRlx1MzA2N1x1NjcwOVx1NTJCOVx1MzA3RVx1MzA1Rlx1MzA2Rlx1NzEyMVx1NTJCOVx1MzA2Qlx1MzA2N1x1MzA0RFx1MzA3RVx1MzA1OVx1MzAwMlx1RkYwOE9ic2lkaWFuXHUzMDkyXHU1MThEXHU4RDc3XHU1MkQ1XHUzMDU5XHUzMDhCXHU1RkM1XHU4OTgxXHUzMDRDXHUzMDQyXHUzMDhBXHUzMDdFXHUzMDU5XHVGRjA5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHU5MDQ1XHU1RUY2XSBcdThGRkRcdTUyQTBcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTdcdTMwNUYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1OTA0NVx1NUVGNl0gSURcdTMwNENcdTY1RTJcdTMwNkJcdTVCNThcdTU3MjhcdTMwNTlcdTMwOEJcdTMwNEJcdTMwMDFcdTdBN0FcdTMwNjdcdTMwNTknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1OTA0NVx1NUVGNl0gXHU1MjRBXHU5NjY0XHUzMDZCXHU2MjEwXHU1MjlGXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tcdTkwNDVcdTVFRjZdIFx1NTI0QVx1OTY2NFx1MzA2Qlx1NTkzMVx1NjU1N1x1MzA1N1x1MzA3RVx1MzA1N1x1MzA1Rlx1MzAwMVx1MzA1M1x1MzA2RVx1OTA0NVx1NUVGNlx1MzA2RVx1NEUwQlx1MzA2Qlx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA0Q1x1NUI1OFx1NTcyOFx1MzA1N1x1MzA3RVx1MzA1OScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1x1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN10gXHU4RkZEXHU1MkEwXHUzMDU1XHUzMDhDXHUzMDdFXHUzMDU3XHUzMDVGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDddIElEXHUzMDRDXHU2NUUyXHUzMDZCXHU1QjU4XHU1NzI4XHUzMDU5XHUzMDhCXHUzMDRCXHUzMDAxXHU3QTdBXHUzMDY3XHUzMDU5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDddIFx1NTI0QVx1OTY2NFx1MzA2Qlx1NjIxMFx1NTI5Rlx1MzA1N1x1MzA3RVx1MzA1N1x1MzA1RicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XSBcdTUyNEFcdTk2NjRcdTMwNkJcdTU5MzFcdTY1NTdcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcdTMwMDFcdTMwNTNcdTMwNkVcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDdcdTMwNkVcdTRFMEJcdTMwNkJcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNENcdTVCNThcdTU3MjhcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdTMwQkZcdTMwQjBdIFx1OEZGRFx1NTJBMFx1MzA1NVx1MzA4Q1x1MzA3RVx1MzA1N1x1MzA1RicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHUzMEJGXHUzMEIwXSBJRFx1MzA0Q1x1NjVFMlx1MzA2Qlx1NUI1OFx1NTcyOFx1MzA1OVx1MzA4Qlx1MzA0Qlx1MzAwMVx1N0E3QVx1MzA2N1x1MzA1OScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbXHUzMEJGXHUzMEIwXSBcdTUyNEFcdTk2NjRcdTMwNkJcdTYyMTBcdTUyOUZcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1MzBCRlx1MzBCMF0gXHU1MjRBXHU5NjY0XHUzMDZCXHU1OTMxXHU2NTU3XHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXHUzMDAxXHUzMDUzXHUzMDZFXHUzMEJGXHUzMEIwXHUzMDZFXHU0RTBCXHUzMDZCXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDRDXHU1QjU4XHU1NzI4XHUzMDU3XHUzMDdFXHUzMDU5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTY4MDdcdTk4OTg6ICdcdTRFRDZcdTMwNkVcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNjhcdTMwNkVcdTMwQjNcdTMwRjNcdTMwRDVcdTMwRUFcdTMwQUZcdTMwQzhcdTMwNENcdTc2N0FcdTc1MUZcdTMwNTdcdTMwNUZcdTU4MzRcdTU0MDgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnXHU4MEZEXHU1MjlCXHUzMDZCXHU5NjUwXHUzMDhBXHUzMDRDXHUzMDQyXHUzMDhCXHUzMDVGXHUzMDgxXHUzMDAxXHUzMDUzXHUzMDZFXHU1NTRGXHU5ODRDXHUzMDkyXHU0RkVFXHU2QjYzXHUzMDY3XHUzMDREXHUzMDdFXHUzMDVCXHUzMDkzXHUzMDAyXHU5MDQ1XHU1RUY2XHUzMEI5XHUzMEJGXHUzMEZDXHUzMEM4XHUzMDkyXHU3MTIxXHU1MkI5XHUzMDZCXHUzMDU5XHUzMDhCXHUzMDUzXHUzMDY4XHUzMDY3XHUzMDAxXHUzMDU5XHUzMDc5XHUzMDY2XHUzMDZFXHUzMEIzXHUzMEYzXHUzMEQ1XHUzMEVBXHUzMEFGXHUzMEM4XHU1NTRGXHU5ODRDXHUzMDkyXHU4OUUzXHU2QzdBXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyJyxcclxuXHJcbiAgICBcdTU0N0RcdTRFRTRfXHU3QkExXHU3NDA2XHU5NzYyXHU2NzdGX1x1NjNDRlx1OEZGMDogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzBERVx1MzBDRFx1MzBGQ1x1MzBCOFx1MzBFM1x1MzBGQ1x1MzA5Mlx1OTU4Qlx1MzA0RicsXHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVBRDAwXHVCOUFDXHVDNzkwJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYyMTBcdTUyOUZfXHU2NTg3XHU2NzJDOiAnXHVDMTMxXHVBQ0Y1JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDOiAnXHVDMkU0XHVEMzI4JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDOiAnXHVDRDk0XHVBQzAwJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnXHVDNzkxXHVDNUM1JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDOiAnXHVBQzgwXHVDMEM5JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDOiAnXHVDNzc0XHVCOTg0JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnXHVBREY4XHVCOEY5IFx1QzVDNlx1Qzc0QycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU2ODA3XHU3QjdFX1x1NjU4N1x1NjcyQzogJ1x1RDBEQ1x1QURGOCBcdUM1QzZcdUM3NEMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdcdUI1MUNcdUI4MDhcdUM3NzQgXHVDNUM2XHVDNzRDJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYwM0JcdThCQTFfXHU2NTg3XHU2NzJDOiAnXHVDRDFEXHVBQ0M0JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHVENjVDXHVDMTMxXHVENjU0JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHVCRTQ0XHVENjVDXHVDMTMxXHVENjU0JyxcclxuXHJcblxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X0dJVEhVQl9cdTYzQ0ZcdThGRjA6ICdcdUM4MDBcdUM3OTBcdUM3NTggR2l0SHViIFx1RDM5OFx1Qzc3NFx1QzlDMFx1Qjk3QyBcdUJDMjlcdUJCMzhcdUQ1NThcdUM1RUMgXHVENTA0XHVCODVDXHVDODFEXHVEMkI4IFx1QzEzOFx1QkQ4MCBcdUM4MTVcdUJDRjQsIFx1QzVDNVx1QjM3MFx1Qzc3NFx1RDJCOCBcdUI4NUNcdUFERjgsIFx1RDFBMFx1Qjg2MCBcdUNDMzhcdUM1RUMsIFx1Q0Y1NFx1QjREQyBcdUFFMzBcdUM1RUNcdUI5N0MgXHVENjU1XHVDNzc4XHVENTU4XHVDMTM4XHVDNjk0LicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4OUM2XHU5ODkxXHU2NTU5XHU3QTBCX1x1NjNDRlx1OEZGMDogJ1x1QkU0NFx1QjUxNFx1QzYyNCBcdUQyOUNcdUQxQTBcdUI5QUNcdUM1QkNcdUM1RDAgXHVDNTYxXHVDMTM4XHVDMkE0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTdGMTZcdThGOTFcdTZBMjFcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHVEM0I4XHVDOUQxIFx1QkFBOFx1QjREQ1x1Qjk3QyBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUQ1NThcdUM1RUMgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QzEyNFx1QzgxNVx1Qzc0NCBcdUM3OTBcdUMxMzhcdUQ3ODggXHVDRUU0XHVDMkE0XHVEMTMwXHVCOUM4XHVDNzc0XHVDOUQ1XHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTkxQ0RcdThGN0RcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNzQ0IFx1QjJFNFx1QzJEQyBcdUI4NUNcdUI0RENcdUQ1NThcdUM1RUMgXHVDOTg5XHVDMkRDIFx1QzgwMVx1QzZBOVx1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwX1x1NjNDRlx1OEZGMDogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUM1QzVcdUIzNzBcdUM3NzRcdUQyQjhcdUI5N0MgXHVENjU1XHVDNzc4XHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2M0NGXHU4RkYwOiAnXHVENTVDIFx1QkM4OFx1QzVEMCBcdUJBQThcdUI0RTAgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNzQ0IFx1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1RDU1QyBcdUJDODhcdUM1RDAgXHVCQUE4XHVCNEUwIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1Qzc0NCBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUQ1NThcdUMxMzhcdUM2OTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVDMTI0XHVDODE1XHVDNzQ0IFx1QUQwMFx1QjlBQ1x1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1RDY1Q1x1QzEzMVx1RDY1NFx1QjQxQyBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUI5Q0MgXHVENDVDXHVDMkRDXHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnXHVDMTI0XHVDODE1IFx1Qzc3OFx1RDEzMFx1RDM5OFx1Qzc3NFx1QzJBNFx1Qjk3QyBcdUM1RkRcdUIyQzhcdUIyRTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOV9cdTYzQ0ZcdThGRjA6ICdcdUNEMDhcdUFFMzAgXHVDMEMxXHVEMERDXHVCODVDIFx1QkNGNVx1QzZEMFx1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1X1x1NjNDRlx1OEZGMDogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUI1MTRcdUI4MDlcdUQxQTBcdUI5QUNcdUI5N0MgXHVDNUZEXHVCMkM4XHVCMkU0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNzQ0IFx1QzY0NFx1QzgwNFx1RDc4OCBcdUMwQURcdUM4MUNcdUQ1NThcdUMxMzhcdUM2OTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIwN1x1NjM2Mlx1NzJCNlx1NjAwMV9cdTYzQ0ZcdThGRjA6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVDMEMxXHVEMERDXHVCOTdDIFx1QzgwNFx1RDY1OFx1RDU1OFx1QzEzOFx1QzY5NCcsXHJcblxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5ODogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUM4MUNcdUFDNzAnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjNEMFx1NzkzQTogJ1x1Qzc3NCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NDQgXHVDODFDXHVBQzcwXHVENTU4XHVDMkRDXHVBQ0EwXHVDMkI1XHVCMkM4XHVBRTRDPyBcdUM3NzQgXHVDNzkxXHVDNUM1XHVDNzQwIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUQzRjRcdUIzNTRcdUI5N0MgXHVDMEFEXHVDODFDXHVENTY5XHVCMkM4XHVCMkU0LicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnXHVDODFDXHVBQzcwJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODg6ICdcdUNERThcdUMxOEMnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdcdUMxMzFcdUFDRjVcdUM4MDFcdUM3M0NcdUI4NUMgXHVDODFDXHVBQzcwXHVCNDE4XHVDNUM4XHVDMkI1XHVCMkM4XHVCMkU0JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1QUUzMFx1QkNGOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1QURGOFx1QjhGOScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1RDBEQ1x1QURGOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1QjUxQ1x1QjgwOFx1Qzc3NCcsXHJcblxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5ODogJ1x1QzVCOFx1QzVCNCBcdUMxMjRcdUM4MTUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2M0NGXHU4RkYwOiAnXHVDMTIwXHVENjM4XHVENTU4XHVCMjk0IFx1QzVCOFx1QzVCNFx1Qjk3QyBcdUMxMjBcdUQwRERcdUQ1NThcdUMxMzhcdUM2OTQuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1QjUxNFx1QjgwOVx1RDFBMFx1QjlBQyBcdUMyQTRcdUQwQzBcdUM3N0MnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHVBREY4XHVCOEY5XHVDNzU4IFx1QzJBNFx1RDBDMFx1Qzc3Q1x1Qzc0NCBcdUMxMjBcdUQwRERcdUQ1NThcdUM1RUMgXHVCRTBDXHVCNzdDXHVDNkIwXHVDOUQ1IFx1QUNCRFx1RDVEOFx1Qzc0NCBcdUQ1QTVcdUMwQzFcdUQ1NThcdUMxMzhcdUM2OTQuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1QURGOFx1QjhGOSBcdUMyQTRcdUQwQzBcdUM3N0MnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHVBREY4XHVCOEY5XHVDNzU4IFx1QzJBNFx1RDBDMFx1Qzc3Q1x1Qzc0NCBcdUMxMjBcdUQwRERcdUQ1NThcdUM1RUMgXHVCMzU0IFx1QjIwOFx1QzVEMCBcdUI3NDRcdUFDRTAgXHVDMkREXHVCQ0M0XHVENTU4XHVBRTMwIFx1QzI3RFx1QUM4QyBcdUI5Q0NcdUI0RENcdUMxMzhcdUM2OTQuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1RDBEQ1x1QURGOCBcdUMyQTRcdUQwQzBcdUM3N0MnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHVEMERDXHVBREY4XHVDNzU4IFx1QzJBNFx1RDBDMFx1Qzc3Q1x1Qzc0NCBcdUMxMjBcdUQwRERcdUQ1NThcdUM1RUMgXHVCMzU0IFx1QjIwOFx1QzVEMCBcdUI3NDRcdUFDRTAgXHVDMkREXHVCQ0M0XHVENTU4XHVBRTMwIFx1QzI3RFx1QUM4QyBcdUI5Q0NcdUI0RENcdUMxMzhcdUM2OTQuJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTg6ICdcdUM5QzBcdUM1RjAgXHVDMkRDXHVDNzkxJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjNDRlx1OEZGMDogJ1x1QzlDMFx1QzVGMCBcdUMyRENcdUM3OTEgXHVBRTMwXHVCMkE1XHVDNzQ0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU1OFx1QkE3NCBcdUI4NUNcdUI1MjkgXHVDMjFDXHVDMTFDXHVCOTdDIFx1Q0Q1Q1x1QzgwMVx1RDY1NFx1RDU2MCBcdUMyMTggXHVDNzg4XHVDOUMwXHVCOUNDLCBcdUM3N0NcdUJEODAgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNUQwXHVDMTFDIFx1RDYzOFx1RDY1OFx1QzEzMSBcdUJCMzhcdUM4MUNcdUFDMDAgXHVCQzFDXHVDMEREXHVENTYwIFx1QzIxOCBcdUM3ODhcdUM3M0NcdUJCQzBcdUI4NUMgXHVDNzIwXHVDNzU4XHVENTU4XHVDMTM4XHVDNjk0LicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTg6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVENzUwXHVCOUFDXHVBQzhDIFx1RDQ1Q1x1QzJEQycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdUJFNDRcdUQ2NUNcdUMxMzFcdUQ2NTRcdUI0MUMgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNUQwIFx1QzJEQ1x1QUMwMVx1QzgwMVx1Qzc3OCBcdUQ3NTBcdUI5QkMgXHVENkE4XHVBQ0ZDXHVCOTdDIFx1QzgxQ1x1QUNGNVx1RDU1OFx1QzVFQyBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUI0MUMgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVBQ0ZDIFx1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NFx1QjQxQyBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NDQgXHVCQTg1XHVENjU1XHVENzg4IFx1QUQ2Q1x1QkQ4NFx1RDU1OFx1QzEzOFx1QzY5NC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QkE4NVx1QjgzOVx1Qzc0NCBcdUJDQzRcdUIzQzRcdUI4NUMgXHVDODFDXHVDNUI0JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ1x1Qzc3NCBcdUM2MzVcdUMxNThcdUM3NDQgXHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVCQTc0IFx1QUMwMSBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NTggXHVENjVDXHVDMTMxXHVENjU0L1x1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NCBcdUMwQzFcdUQwRENcdUI5N0MgXHVCQ0M0XHVCM0M0XHVCODVDIFx1QzgxQ1x1QzVCNFx1RDU2MCBcdUMyMTggXHVDNzg4XHVDMkI1XHVCMkM4XHVCMkU0LiAoT2JzaWRpYW5cdUM3NDQgXHVCMkU0XHVDMkRDIFx1QzJEQ1x1Qzc5MVx1RDU3NFx1QzU3QyBcdUM4MDFcdUM2QTlcdUI0MjlcdUIyQzhcdUIyRTQpJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1QURGOFx1QjhGOVx1QkNDNCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVCQTg1XHVCODM5IFx1QzgxQ1x1QzVCNCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdcdUM3NzQgXHVDNjM1XHVDMTU4XHVDNzQ0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU1OFx1QkE3NCBcdUM5QzBcdUM4MTVcdUI0MUMgXHVBREY4XHVCOEY5XHVDNzU4IFx1QkFBOFx1QjRFMCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NDQgXHVENTVDIFx1QkM4OCBcdUQwNzRcdUI5QURcdUM3M0NcdUI4NUMgXHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVBQzcwXHVCMDk4IFx1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU2MCBcdUMyMTggXHVDNzg4XHVDMkI1XHVCMkM4XHVCMkU0LiAoT2JzaWRpYW5cdUM3NDQgXHVCMkU0XHVDMkRDIFx1QzJEQ1x1Qzc5MVx1RDU3NFx1QzU3QyBcdUM4MDFcdUM2QTlcdUI0MjlcdUIyQzhcdUIyRTQpJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHVCNTFDXHVCODA4XHVDNzc0XSBcdUNEOTRcdUFDMDBcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1QjUxQ1x1QjgwOFx1Qzc3NF0gSURcdUFDMDAgXHVDNzc0XHVCQkY4IFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QUM3MFx1QjA5OCBcdUJFNDRcdUM1QjQgXHVDNzg4XHVDNzRDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdUI1MUNcdUI4MDhcdUM3NzRdIFx1QzEzMVx1QUNGNVx1QzgwMVx1QzczQ1x1Qjg1QyBcdUMwQURcdUM4MUNcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1QjUxQ1x1QjgwOFx1Qzc3NF0gXHVDMEFEXHVDODFDIFx1QzJFNFx1RDMyOCwgXHVDNzc0IFx1QjUxQ1x1QjgwOFx1Qzc3NFx1RDU1OFx1QzVEMCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NzQgXHVDODc0XHVDN0FDXHVENTY4JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHVBREY4XHVCOEY5XSBcdUNEOTRcdUFDMDBcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1QURGOFx1QjhGOV0gSURcdUFDMDAgXHVDNzc0XHVCQkY4IFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QUM3MFx1QjA5OCBcdUJFNDRcdUM1QjQgXHVDNzg4XHVDNzRDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdUFERjhcdUI4RjldIFx1QzEzMVx1QUNGNVx1QzgwMVx1QzczQ1x1Qjg1QyBcdUMwQURcdUM4MUNcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1QURGOFx1QjhGOV0gXHVDMEFEXHVDODFDIFx1QzJFNFx1RDMyOCwgXHVDNzc0IFx1QURGOFx1QjhGOVx1RDU1OFx1QzVEMCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NzQgXHVDODc0XHVDN0FDXHVENTY4JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHVEMERDXHVBREY4XSBcdUNEOTRcdUFDMDBcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1RDBEQ1x1QURGOF0gSURcdUFDMDAgXHVDNzc0XHVCQkY4IFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QUM3MFx1QjA5OCBcdUJFNDRcdUM1QjQgXHVDNzg4XHVDNzRDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdUQwRENcdUFERjhdIFx1QzEzMVx1QUNGNVx1QzgwMVx1QzczQ1x1Qjg1QyBcdUMwQURcdUM4MUNcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1RDBEQ1x1QURGOF0gXHVDMEFEXHVDODFDIFx1QzJFNFx1RDMyOCwgXHVDNzc0IFx1RDBEQ1x1QURGOFx1RDU1OFx1QzVEMCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NzQgXHVDODc0XHVDN0FDXHVENTY4JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTY4MDdcdTk4OTg6ICdcdUIyRTRcdUI5NzggXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVBQ0ZDXHVDNzU4IFx1Q0RBOVx1QjNDQ1x1Qzc3NCBcdUJDMUNcdUMwRERcdUQ1NjAgXHVBQ0JEXHVDNkIwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjNDRlx1OEZGMDogJ1x1QjJBNVx1QjgyNVx1Qzc3NCBcdUM4MUNcdUQ1NUNcdUI0MThcdUM1QjQgXHVDNzg4XHVDNUI0IFx1Qzc3NCBcdUJCMzhcdUM4MUNcdUI5N0MgXHVENTc0XHVBQ0IwXHVENTYwIFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuIFx1QzlDMFx1QzVGMCBcdUMyRENcdUM3OTFcdUM3NDQgXHVCRTQ0XHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVDNUVDIFx1QkFBOFx1QjRFMCBcdUNEQTlcdUIzQ0MgXHVCQjM4XHVDODFDXHVCOTdDIFx1RDU3NFx1QUNCMFx1RDU1OFx1QzEzOFx1QzY5NC4nLFxyXG5cclxuICAgIFx1NTQ3RFx1NEVFNF9cdTdCQTFcdTc0MDZcdTk3NjJcdTY3N0ZfXHU2M0NGXHU4RkYwOiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QUQwMFx1QjlBQ1x1Qzc5MFx1Qjk3QyBcdUM1RkRcdUIyQzhcdUIyRTQnLFxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFx1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDOiAnR2VzdGlvbm5haXJlIGRlIHBsdWdpbnMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkM6ICdTdWNjXHUwMEU4cycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1OTMxXHU4RDI1X1x1NjU4N1x1NjcyQzogJ1x1MDBDOWNoZWMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkM6ICdBam91dGVyJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnT3BcdTAwRTlyYXRpb24nLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkM6ICdSZWNoZXJjaGUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkM6ICdOb20nLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdBdWN1biBncm91cGUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdBdWN1biB0YWcnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdBdWN1biByZXRhcmQnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjAzQlx1OEJBMV9cdTY1ODdcdTY3MkM6ICdUb3RhbCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQzogJ0FjdGl2ZXInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdEXHUwMEU5c2FjdGl2ZXInLFxyXG5cclxuXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMDogJ1Zpc2l0ZXogbGEgcGFnZSBHaXRIdWIgZGUgbFxcJ2F1dGV1ciBwb3VyIHZvaXIgbGVzIGRcdTAwRTl0YWlscyBkdSBwcm9qZXQsIGxlcyBqb3VybmF1eCBkZSBtaXNlIFx1MDBFMCBqb3VyLCBwYXJ0aWNpcGVyIGF1eCBkaXNjdXNzaW9ucyBldCBjb250cmlidWVyIGR1IGNvZGUuJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTg5QzZcdTk4OTFcdTY1NTlcdTdBMEJfXHU2M0NGXHU4RkYwOiAnQWNjXHUwMEU5ZGV6IGF1eCB0dXRvcmllbHMgdmlkXHUwMEU5bycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ0FjdGl2ZXogbGUgbW9kZSBcdTAwRTlkaXRpb24gcG91ciB1bmUgcGVyc29ubmFsaXNhdGlvbiBhcHByb2ZvbmRpZSBkZSBsYSBjb25maWd1cmF0aW9uIGRlcyBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTkxQ0RcdThGN0RcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnUmVjaGFyZ2V6IGxlcyBwbHVnaW5zIHBvdXIgcXVcXCdpbHMgcHJlbm5lbnQgZWZmZXQgaW1tXHUwMEU5ZGlhdGVtZW50JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjBfXHU2M0NGXHU4RkYwOiAnVlx1MDBFOXJpZmlleiBsZXMgbWlzZXMgXHUwMEUwIGpvdXIgZGVzIHBsdWdpbnMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdEXHUwMEU5c2FjdGl2ZXogdG91cyBsZXMgcGx1Z2lucyBlbiB1bmUgZm9pcycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ0FjdGl2ZXogdG91cyBsZXMgcGx1Z2lucyBlbiB1bmUgZm9pcycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ0dcdTAwRTlyZXogbGVzIHBhcmFtXHUwMEU4dHJlcyBkZXMgcGx1Z2lucycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ0FmZmljaGV6IHVuaXF1ZW1lbnQgbGVzIHBsdWdpbnMgYWN0aXZcdTAwRTlzJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnT3V2cmV6IGxcXCdpbnRlcmZhY2UgZGUgcGFyYW1cdTAwRTh0cmVzJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdThGRDhcdTUzOUZcdTUxODVcdTVCQjlfXHU2M0NGXHU4RkYwOiAnUlx1MDBFOXRhYmxpc3NleiBsXFwnXHUwMEU5dGF0IGluaXRpYWwnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NV9cdTYzQ0ZcdThGRjA6ICdPdXZyZXogbGUgclx1MDBFOXBlcnRvaXJlIGRlcyBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnU3VwcHJpbWV6IGNvbXBsXHUwMEU4dGVtZW50IGxlIHBsdWdpbicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ0Jhc2N1bGVyIGxcXCdcdTAwRTl0YXQgZHUgcGx1Z2luJyxcclxuXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2ODA3XHU5ODk4OiAnRFx1MDBFOXNpbnN0YWxsZXIgbGUgcGx1Z2luJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTYzRDBcdTc5M0E6ICdcdTAwQ0F0ZXMtdm91cyBzXHUwMEZCciBkZSB2b3Vsb2lyIGRcdTAwRTlzaW5zdGFsbGVyIGNlIHBsdWdpbiA/IENlbGEgc3VwcHJpbWVyYSBsZSBkb3NzaWVyIGR1IHBsdWdpbi4nLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTM3OFx1OEY3RDogJ0RcdTAwRTlzaW5zdGFsbGVyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODg6ICdBbm51bGVyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnRFx1MDBFOXNpbnN0YWxsXHUwMEU5IGF2ZWMgc3VjY1x1MDBFOHMnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnUGFyYW1cdTAwRTh0cmVzIGRlIGJhc2UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdHcm91cGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdUYWcnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdSZXRhcmQnLFxyXG5cclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTY4MDdcdTk4OTg6ICdQYXJhbVx1MDBFOHRyZXMgZGUgbGFuZ3VlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjNDRlx1OEZGMDogJ0Nob2lzaXNzZXogdm90cmUgbGFuZ3VlIHByXHUwMEU5Zlx1MDBFOXJcdTAwRTllLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdTdHlsZSBkdSByXHUwMEU5cGVydG9pcmUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnQ2hvaXNpc3NleiBsZSBzdHlsZSBkdSBncm91cGUgcG91ciBhbVx1MDBFOWxpb3JlciBsXFwnZXhwXHUwMEU5cmllbmNlIGRlIG5hdmlnYXRpb24uJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1N0eWxlIGR1IGdyb3VwZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdDaG9pc2lzc2V6IGxlIHN0eWxlIGR1IGdyb3VwZSBwb3VyIGxlIHJlbmRyZSBwbHVzIHZpc2libGUgZXQgZmFjaWxlIFx1MDBFMCBpZGVudGlmaWVyLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdTdHlsZSBkdSB0YWcnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnQ2hvaXNpc3NleiBsZSBzdHlsZSBkdSB0YWcgcG91ciBsZSByZW5kcmUgcGx1cyB2aXNpYmxlIGV0IGZhY2lsZSBcdTAwRTAgaWRlbnRpZmllci4nLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjgwN1x1OTg5ODogJ0RcdTAwRTltYXJyYWdlIGRpZmZcdTAwRTlyXHUwMEU5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjNDRlx1OEZGMDogJ0xcXCdhY3RpdmF0aW9uIGRlIGxhIGZvbmN0aW9uIGRlIGRcdTAwRTltYXJyYWdlIGRpZmZcdTAwRTlyXHUwMEU5IHBldXQgb3B0aW1pc2VyIGxcXCdvcmRyZSBkZSBjaGFyZ2VtZW50LCBtYWlzIHZldWlsbGV6IG5vdGVyIHF1ZSBjZWxhIHBldXQgY2F1c2VyIGRlcyBwcm9ibFx1MDBFOG1lcyBkZSBjb21wYXRpYmlsaXRcdTAwRTkgYXZlYyBjZXJ0YWlucyBwbHVnaW5zLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTg6ICdFc3RvbXBlciBsZXMgcGx1Z2lucycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdBcHBsaXF1ZXogdW4gZWZmZXQgZGUgdHJhbnNwYXJlbmNlIHZpc3VlbCBhdXggcGx1Z2lucyBkXHUwMEU5c2FjdGl2XHUwMEU5cyBwb3VyIGRpc3Rpbmd1ZXIgY2xhaXJlbWVudCBsZXMgcGx1Z2lucyBhY3Rpdlx1MDBFOXMgZXQgZFx1MDBFOXNhY3Rpdlx1MDBFOXMuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ0NvbnRyXHUwMEY0bGVyIGxlcyBjb21tYW5kZXMgZGVzIHBsdWdpbnMgc1x1MDBFOXBhclx1MDBFOW1lbnQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnQWN0aXZleiBjZXR0ZSBvcHRpb24gcG91ciBjb250clx1MDBGNGxlciBsXFwnXHUwMEU5dGF0IGFjdGl2XHUwMEU5IGV0IGRcdTAwRTlzYWN0aXZcdTAwRTkgZGUgY2hhcXVlIHBsdWdpbiBzXHUwMEU5cGFyXHUwMEU5bWVudC4gKFJlZFx1MDBFOW1hcnJleiBPYnNpZGlhbiBwb3VyIHF1ZSBsZXMgbW9kaWZpY2F0aW9ucyBwcmVubmVudCBlZmZldCknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnQ29udHJcdTAwRjRsZXIgbGVzIGNvbW1hbmRlcyBkZXMgcGx1Z2lucyBwYXIgZ3JvdXBlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ0FjdGl2ZXogY2V0dGUgb3B0aW9uIHBvdXIgYWN0aXZlciBvdSBkXHUwMEU5c2FjdGl2ZXIgdG91cyBsZXMgcGx1Z2lucyBkXFwndW4gZ3JvdXBlIHNwXHUwMEU5Y2lmaXF1ZSBhdmVjIHVuIHNldWwgY2xpYy4gKFJlZFx1MDBFOW1hcnJleiBPYnNpZGlhbiBwb3VyIHF1ZSBsZXMgbW9kaWZpY2F0aW9ucyBwcmVubmVudCBlZmZldCknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tSZXRhcmRdIEFqb3V0XHUwMEU5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tSZXRhcmRdIExcXCdJRCBleGlzdGUgZFx1MDBFOWpcdTAwRTAgb3UgZXN0IHZpZGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1JldGFyZF0gU3VwcHJpbVx1MDBFOSBhdmVjIHN1Y2NcdTAwRThzJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tSZXRhcmRdIFx1MDBDOWNoZWMgZGUgbGEgc3VwcHJlc3Npb24sIGRlcyBwbHVnaW5zIGV4aXN0ZW50IHNvdXMgY2UgcmV0YXJkJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbR3JvdXBlXSBBam91dFx1MDBFOScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbR3JvdXBlXSBMXFwnSUQgZXhpc3RlIGRcdTAwRTlqXHUwMEUwIG91IGVzdCB2aWRlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tHcm91cGVdIFN1cHByaW1cdTAwRTkgYXZlYyBzdWNjXHUwMEU4cycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbR3JvdXBlXSBcdTAwQzljaGVjIGRlIGxhIHN1cHByZXNzaW9uLCBkZXMgcGx1Z2lucyBleGlzdGVudCBzb3VzIGNlIGdyb3VwZScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1RhZ10gQWpvdXRcdTAwRTknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1RhZ10gTFxcJ0lEIGV4aXN0ZSBkXHUwMEU5alx1MDBFMCBvdSBlc3QgdmlkZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbVGFnXSBTdXBwcmltXHUwMEU5IGF2ZWMgc3VjY1x1MDBFOHMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1RhZ10gXHUwMEM5Y2hlYyBkZSBsYSBzdXBwcmVzc2lvbiwgZGVzIHBsdWdpbnMgZXhpc3RlbnQgc291cyBjZSB0YWcnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjgwN1x1OTg5ODogJ1NpIHZvdXMgcmVuY29udHJleiBkZXMgY29uZmxpdHMgYXZlYyBkXFwnYXV0cmVzIHBsdWdpbnMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnRW4gcmFpc29uIGRlIGNhcGFjaXRcdTAwRTlzIGxpbWl0XHUwMEU5ZXMsIGplIG5lIHBldXggcGFzIHJcdTAwRTlzb3VkcmUgY2UgcHJvYmxcdTAwRThtZS4gVmV1aWxsZXogZFx1MDBFOXNhY3RpdmVyIGxlIGRcdTAwRTltYXJyYWdlIGRpZmZcdTAwRTlyXHUwMEU5IHBvdXIgclx1MDBFOXNvdWRyZSB0b3VzIGxlcyBwcm9ibFx1MDBFOG1lcyBkZSBjb25mbGl0LicsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjA6ICdPdXZyZXogbGUgZ2VzdGlvbm5haXJlIGRlIHBsdWdpbnMnLFxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFx1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDOiAnQWRtaW5pc3RyYWRvciBkZSBwbHVnaW5zJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYyMTBcdTUyOUZfXHU2NTg3XHU2NzJDOiAnXHUwMEM5eGl0bycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1OTMxXHU4RDI1X1x1NjU4N1x1NjcyQzogJ0ZhbGxvJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDOiAnQWdyZWdhcicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NENEXHU0RjVDX1x1NjU4N1x1NjcyQzogJ09wZXJhY2lcdTAwRjNuJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDOiAnQnVzY2FyJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDOiAnTm9tYnJlJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnU2luIGdydXBvJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTY4MDdcdTdCN0VfXHU2NTg3XHU2NzJDOiAnU2luIGV0aXF1ZXRhJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDOiAnU2luIHJldHJhc28nLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjAzQlx1OEJBMV9cdTY1ODdcdTY3MkM6ICdUb3RhbCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQzogJ0hhYmlsaXRhcicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQzogJ0Rlc2hhYmlsaXRhcicsXHJcblxyXG5cclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9HSVRIVUJfXHU2M0NGXHU4RkYwOiAnVmlzaXRlIGxhIHBcdTAwRTFnaW5hIGRlIEdpdEh1YiBkZWwgYXV0b3IgcGFyYSB2ZXIgZGV0YWxsZXMgZGVsIHByb3llY3RvLCByZWdpc3Ryb3MgZGUgYWN0dWFsaXphY2lvbmVzLCBwYXJ0aWNpcGFyIGVuIGRpc2N1c2lvbmVzIHkgY29udHJpYnVpciBjb24gY1x1MDBGM2RpZ28uJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTg5QzZcdTk4OTFcdTY1NTlcdTdBMEJfXHU2M0NGXHU4RkYwOiAnQWNjZWRlciBhIHR1dG9yaWFsZXMgZW4gdmlkZW8nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRl9cdTYzQ0ZcdThGRjA6ICdIYWJpbGl0YXIgbW9kbyBkZSBlZGljaVx1MDBGM24gcGFyYSB1bmEgcGVyc29uYWxpemFjaVx1MDBGM24gcHJvZnVuZGEgZGUgbGEgY29uZmlndXJhY2lcdTAwRjNuIGRlbCBwbHVnaW4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdSZWNhcmdhciBwbHVnaW5zIHBhcmEgcXVlIHN1cnRhbiBlZmVjdG8gaW5tZWRpYXRhbWVudGUnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMF9cdTYzQ0ZcdThGRjA6ICdDb21wcm9iYXIgYWN0dWFsaXphY2lvbmVzIGRlIHBsdWdpbnMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdEZXNoYWJpbGl0YXIgdG9kb3MgbG9zIHBsdWdpbnMgYSBsYSB2ZXonLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdIYWJpbGl0YXIgdG9kb3MgbG9zIHBsdWdpbnMgYSBsYSB2ZXonLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdBZG1pbmlzdHJhciBjb25maWd1cmFjaVx1MDBGM24gZGUgcGx1Z2lucycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ01vc3RyYXIgc29sbyBwbHVnaW5zIGhhYmlsaXRhZG9zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnQWJyaXIgbGEgaW50ZXJmYXogZGUgY29uZmlndXJhY2lcdTAwRjNuJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdThGRDhcdTUzOUZcdTUxODVcdTVCQjlfXHU2M0NGXHU4RkYwOiAnUmVzdGF1cmFyIGFsIGVzdGFkbyBpbmljaWFsJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdTc2RUVcdTVGNTVfXHU2M0NGXHU4RkYwOiAnQWJyaXIgZWwgZGlyZWN0b3JpbyBkZSBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnRWxpbWluYXIgY29tcGxldGFtZW50ZSBlbCBwbHVnaW4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIwN1x1NjM2Mlx1NzJCNlx1NjAwMV9cdTYzQ0ZcdThGRjA6ICdBbHRlcm5hciBlbCBlc3RhZG8gZGVsIHBsdWdpbicsXHJcblxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5ODogJ0Rlc2luc3RhbGFyIFBsdWdpbicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnXHUwMEJGRXN0XHUwMEUxIHNlZ3VybyBkZSBxdWUgZGVzZWEgZGVzaW5zdGFsYXIgZXN0ZSBwbHVnaW4/IEVzdG8gZWxpbWluYXJcdTAwRTEgbGEgY2FycGV0YSBkZWwgcGx1Z2luLicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnRGVzaW5zdGFsYXInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ0NhbmNlbGFyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnRGVzaW5zdGFsYWRvIGNvcnJlY3RhbWVudGUnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnQ29uZmlndXJhY2lcdTAwRjNuIGJcdTAwRTFzaWNhJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnR3J1cG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdFdGlxdWV0YScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1JldHJhc28nLFxyXG5cclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTY4MDdcdTk4OTg6ICdDb25maWd1cmFjaVx1MDBGM24gZGUgaWRpb21hJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjNDRlx1OEZGMDogJ1NlbGVjY2lvbmUgc3UgaWRpb21hIHByZWZlcmlkby4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnRXN0aWxvIGRlbCBkaXJlY3RvcmlvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1NlbGVjY2lvbmUgZWwgZXN0aWxvIGRlbCBncnVwbyBwYXJhIG1lam9yYXIgbGEgZXhwZXJpZW5jaWEgZGUgbmF2ZWdhY2lcdTAwRjNuLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdFc3RpbG8gZGVsIGdydXBvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1NlbGVjY2lvbmUgZWwgZXN0aWxvIGRlbCBncnVwbyBwYXJhIGhhY2VybG8gbVx1MDBFMXMgdmlzaWJsZSB5IGZcdTAwRTFjaWwgZGUgaWRlbnRpZmljYXIuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ0VzdGlsbyBkZSBsYSBldGlxdWV0YScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdTZWxlY2Npb25lIGVsIGVzdGlsbyBkZSBsYSBldGlxdWV0YSBwYXJhIGhhY2VybG8gbVx1MDBFMXMgdmlzaWJsZSB5IGZcdTAwRTFjaWwgZGUgaWRlbnRpZmljYXIuJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTg6ICdJbmljaW8gY29uIHJldHJhc28nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnSGFiaWxpdGFyIGxhIGZ1bmNpXHUwMEYzbiBkZSBpbmljaW8gY29uIHJldHJhc28gcHVlZGUgb3B0aW1pemFyIGVsIG9yZGVuIGRlIGNhcmdhLCBwZXJvIHRlbmdhIGVuIGN1ZW50YSBxdWUgZXN0byBwdWVkZSBjYXVzYXIgcHJvYmxlbWFzIGRlIGNvbXBhdGliaWxpZGFkIGNvbiBhbGd1bm9zIHBsdWdpbnMuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjgwN1x1OTg5ODogJ0F0ZW51YXIgcGx1Z2lucycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdQcm9wb3JjaW9uZSB1biBlZmVjdG8gZGUgYXRlbnVhY2lcdTAwRjNuIHZpc3VhbCBwYXJhIHBsdWdpbnMgZGVzaGFiaWxpdGFkb3MgcGFyYSBkaXN0aW5ndWlyIGNsYXJhbWVudGUgZW50cmUgcGx1Z2lucyBoYWJpbGl0YWRvcyB5IGRlc2hhYmlsaXRhZG9zLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdDb250cm9sYXIgY29tYW5kb3MgZGUgcGx1Z2lucyBwb3Igc2VwYXJhZG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnSGFiaWxpdGUgZXN0YSBvcGNpXHUwMEYzbiBwYXJhIGNvbnRyb2xhciBlbCBlc3RhZG8gaGFiaWxpdGFkbyB5IGRlc2hhYmlsaXRhZG8gZGUgY2FkYSBwbHVnaW4gcG9yIHNlcGFyYWRvLiAoUmVpbmljaWUgT2JzaWRpYW4gcGFyYSBxdWUgc3VydGFuIGVmZWN0byknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnQ29udHJvbGFyIGNvbWFuZG9zIGRlIHBsdWdpbnMgcG9yIGdydXBvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ0hhYmlsaXRlIGVzdGEgb3BjaVx1MDBGM24gcGFyYSBoYWJpbGl0YXIgbyBkZXNoYWJpbGl0YXIgdG9kb3MgbG9zIHBsdWdpbnMgZGUgdW4gZ3J1cG8gZXNwZWNcdTAwRURmaWNvIGNvbiB1biBzb2xvIGNsaWMuIChSZWluaWNpZSBPYnNpZGlhbiBwYXJhIHF1ZSBzdXJ0YW4gZWZlY3RvKScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1JldHJhc29dIEFcdTAwRjFhZGlkbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbUmV0cmFzb10gRWwgSUQgeWEgZXhpc3RlIG8gZXN0XHUwMEUxIHZhY1x1MDBFRG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1JldHJhc29dIEVsaW1pbmFkbyBjb3JyZWN0YW1lbnRlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tSZXRyYXNvXSBGYWxsbyBhbCBlbGltaW5hciwgZXhpc3RlbiBwbHVnaW5zIGJham8gZXN0ZSByZXRyYXNvJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbR3J1cG9dIEFcdTAwRjFhZGlkbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbR3J1cG9dIEVsIElEIHlhIGV4aXN0ZSBvIGVzdFx1MDBFMSB2YWNcdTAwRURvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tHcnVwb10gRWxpbWluYWRvIGNvcnJlY3RhbWVudGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW0dydXBvXSBGYWxsbyBhbCBlbGltaW5hciwgZXhpc3RlbiBwbHVnaW5zIGJham8gZXN0ZSBncnVwbycsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW0V0aXF1ZXRhXSBBXHUwMEYxYWRpZG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW0V0aXF1ZXRhXSBFbCBJRCB5YSBleGlzdGUgbyBlc3RcdTAwRTEgdmFjXHUwMEVEbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbRXRpcXVldGFdIEVsaW1pbmFkbyBjb3JyZWN0YW1lbnRlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tFdGlxdWV0YV0gRmFsbG8gYWwgZWxpbWluYXIsIGV4aXN0ZW4gcGx1Z2lucyBiYWpvIGVzdGEgZXRpcXVldGEnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjgwN1x1OTg5ODogJ1NpIGVuY3VlbnRyYSBjb25mbGljdG9zIGNvbiBvdHJvcyBwbHVnaW5zJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjNDRlx1OEZGMDogJ0RlYmlkbyBhIGNhcGFjaWRhZGVzIGxpbWl0YWRhcywgbm8gcHVlZG8gc29sdWNpb25hciBlc3RlIHByb2JsZW1hLiBQb3IgZmF2b3IsIGRlc2hhYmlsaXRlIGVsIGluaWNpbyBjb24gcmV0cmFzbyBwYXJhIHJlc29sdmVyIHRvZG9zIGxvcyBwcm9ibGVtYXMgZGUgY29uZmxpY3RvLicsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjA6ICdBYnJpciBlbCBhZG1pbmlzdHJhZG9yIGRlIHBsdWdpbnMnLFxyXG59IiwgImltcG9ydCBNYW5hZ2VyIGZyb20gXCJtYWluXCI7XHJcbmltcG9ydCB6aF9jbiBmcm9tICcuL2xvY2FsZS96aF9jbic7XHJcbmltcG9ydCBlbiBmcm9tIFwiLi9sb2NhbGUvZW5cIjtcclxuaW1wb3J0IHJ1IGZyb20gXCIuL2xvY2FsZS9ydVwiO1xyXG5pbXBvcnQgamEgZnJvbSBcIi4vbG9jYWxlL2phXCI7XHJcbmltcG9ydCBrbyBmcm9tIFwiLi9sb2NhbGUva29cIjtcclxuaW1wb3J0IGZyIGZyb20gXCIuL2xvY2FsZS9mclwiO1xyXG5pbXBvcnQgZXMgZnJvbSBcIi4vbG9jYWxlL2VzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRvciB7XHJcblx0cHJpdmF0ZSBtYW5hZ2VyOiBNYW5hZ2VyO1xyXG5cdHB1YmxpYyBsYW5ndWFnZSA9IHtcclxuXHRcdCd6aC1jbic6ICdcdTdCODBcdTRGNTNcdTRFMkRcdTY1ODcnLFxyXG5cdFx0J2VuJzogJ0VuZ2xpc2gnLFxyXG5cdFx0J3J1JzogJ1x1MDQyMFx1MDQ0M1x1MDQ0MVx1MDQ0MVx1MDQzQVx1MDQzOFx1MDQzOSBcdTA0NEZcdTA0MzdcdTA0NEJcdTA0M0EnLFxyXG5cdFx0J2phJzogJ1x1NjVFNVx1NjcyQ1x1OEE5RScsXHJcblx0XHQna28nOiAnXHVENTVDXHVBRDZEXHVDNUI0JyxcclxuXHRcdCdmcic6ICdGcmFuXHUwMEU3YWlzJyxcclxuXHRcdCdlcyc6ICdFc3BhXHUwMEYxb2wnLFxyXG5cdH07XHJcblxyXG5cdHByaXZhdGUgbG9jYWxlTWFwOiB7IFtrOiBzdHJpbmddOiBQYXJ0aWFsPHR5cGVvZiB6aF9jbj4gfSA9IHtcclxuXHRcdCd6aC1jbic6IHpoX2NuLFxyXG5cdFx0J2VuJzogZW4sXHJcblx0XHQncnUnOiBydSxcclxuXHRcdCdqYSc6IGphLFxyXG5cdFx0J2tvJzoga28sXHJcblx0XHQnZnInOiBmcixcclxuXHRcdCdlcyc6IGVzLFxyXG5cdH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKG1hbmFnZXI6IE1hbmFnZXIpIHtcclxuXHRcdHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcblx0fVxyXG5cclxuXHQvLyBcdTY1QjlcdTZDRDVcdTc1MjhcdTRFOEVcdTgzQjdcdTUzRDZcdTdGRkJcdThCRDFcdTU0MEVcdTc2ODRcdTVCNTdcdTdCMjZcdTRFMzJcclxuXHRwdWJsaWMgdChzdHI6IGtleW9mIHR5cGVvZiB6aF9jbik6IHN0cmluZyB7XHJcblx0XHRjb25zdCBsYW5ndWFnZSA9IHRoaXMubWFuYWdlci5zZXR0aW5ncy5MQU5HVUFHRSB8fCAnemgtY24nOyAvLyBcdTlFRDhcdThCQTRcdTRGN0ZcdTc1MjggJ3poLWNuJ1xyXG5cdFx0Y29uc3QgbG9jYWxlID0gdGhpcy5sb2NhbGVNYXBbbGFuZ3VhZ2VdIHx8IHpoX2NuOyAvLyBcdTU5ODJcdTY3OUMgbGFuZ3VhZ2UgXHU0RTBEXHU1QjU4XHU1NzI4XHVGRjBDXHU1MjE5XHU0RjdGXHU3NTI4IHpoX2NuXHJcblx0XHRyZXR1cm4gbG9jYWxlW3N0cl0gfHwgemhfY25bc3RyXTsgLy8gXHU1OTgyXHU2NzlDIHN0ciBcdTU3MjggbG9jYWxlIFx1NEUyRFx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxOVx1NEY3Rlx1NzUyOCB6aF9jbiBcdTRFMkRcdTc2ODRcdTlFRDhcdThCQTRcdTUwM0NcclxuXHR9XHJcbn1cclxuXHJcbi8vIGltcG9ydCB7IG1vbWVudCB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG4vLyBpbXBvcnQgemhfY24gZnJvbSAnLi9sb2NhbGUvemhfY24nO1xyXG4vLyBpbXBvcnQgZW4gZnJvbSBcIi4vbG9jYWxlL2VuXCI7XHJcbi8vIGltcG9ydCBqYV9qcCBmcm9tIFwiLi9sb2NhbGUvamFfanBcIjtcclxuLy8gaW1wb3J0IGtvX2tyIGZyb20gXCIuL2xvY2FsZS9rb19rclwiO1xyXG4vLyBpbXBvcnQgcnVfcnUgZnJvbSBcIi4vbG9jYWxlL3J1X3J1XCI7XHJcblxyXG4vLyBleHBvcnQgY29uc3QgTEFOR1VBR0UgPSB7XHJcbi8vIFx0J3poLWNuJzogJ1x1N0I4MFx1NEY1M1x1NEUyRFx1NjU4NycsXHJcbi8vIFx0J2VuJzogJ1x1NkMzOFx1NEUwRFx1NUM1NVx1NUYwMCdcclxuLy8gfVxyXG5cclxuLy8gY29uc3QgbG9jYWxlTWFwOiB7IFtrOiBzdHJpbmddOiBQYXJ0aWFsPHR5cGVvZiB6aF9jbj4gfSA9IHtcclxuLy8gXHQnemgtY24nOiB6aF9jbixcclxuLy8gXHQnZW4tdXMnOiBlbixcclxuLy8gXHQnamEtanAnOiBqYV9qcCxcclxuLy8gXHQna28ta3InOiBrb19rcixcclxuLy8gXHQncnUtcnUnOiBydV9ydVxyXG4vLyB9O1xyXG5cclxuLy8gLy8gY29uc3QgbG9jYWxlcyA9IG1vbWVudC5sb2NhbGVzKCk7XHJcbi8vIC8vIGNvbnNvbGUubG9nKGxvY2FsZXMpO1xyXG4vLyAvLyBjb25zb2xlLmxvZyhtb21lbnQubG9jYWxlKCkpXHJcbi8vIGNvbnN0IGxvY2FsZSA9IGxvY2FsZU1hcFttb21lbnQubG9jYWxlKCldO1xyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHQoc3RyOiBrZXlvZiB0eXBlb2YgemhfY24pOiBzdHJpbmcge1xyXG4vLyBcdHJldHVybiAobG9jYWxlICYmIGxvY2FsZVtzdHJdKSB8fCB6aF9jbltzdHJdO1xyXG4vLyB9XHJcbiIsICJpbXBvcnQgU2hhcmVNeVBsdWdpbiBmcm9tIFwibWFpblwiO1xyXG5pbXBvcnQgeyBOb3RpY2UsIE9ic2lkaWFuUHJvdG9jb2xEYXRhLCBkZWJvdW5jZSB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuLy8gXHU1QkZDXHU1MUZBXHU0RTAwXHU0RTJBXHU1MTY4XHU1QzQwXHU3Njg0IGNvbW11bml0eVBsdWdpbnMgXHU1M0Q4XHU5MUNGXHVGRjBDXHU1M0VGXHU1NzI4XHU1MTc2XHU0RUQ2XHU2QTIxXHU1NzU3XHU0RTJEXHU0RjdGXHU3NTI4XHJcbmV4cG9ydCBsZXQgY29tbXVuaXR5UGx1Z2luczogYW55O1xyXG5cclxuLyoqXHJcbiAqIFx1NjNEMlx1NEVGNlx1NUI4OVx1ODhDNVx1NTY2OFx1N0M3Qlx1RkYwQ1x1OEQxRlx1OEQyM1x1NTkwNFx1NzQwNlx1NjNEMlx1NEVGNlx1NzY4NFx1NUI4OVx1ODhDNVx1NTQ4Q1x1ODlFM1x1Njc5MFx1NUI4OVx1ODhDNVx1NTNDMlx1NjU3MFx1N0I0OVx1NjRDRFx1NEY1Q1xyXG4gKi9cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZ3JlZW1lbnQge1xyXG4gICAgLy8gXHU1RjE1XHU3NTI4IFNoYXJlTXlQbHVnaW4gXHU1QjlFXHU0RjhCXHVGRjBDXHU2NUI5XHU0RkJGXHU4QkJGXHU5NUVFXHU0RTNCXHU2M0QyXHU0RUY2XHU3Njg0XHU1QzVFXHU2MDI3XHU1NDhDXHU2NUI5XHU2Q0Q1XHJcbiAgICBwbHVnaW46IFNoYXJlTXlQbHVnaW47XHJcbiAgICAvLyBcdTVCNThcdTUwQThcdTc5M0VcdTUzM0FcdTYzRDJcdTRFRjZcdTRGRTFcdTYwNkZcdTc2ODRcdTVCRjlcdThDNjFcdUZGMENcdTk1MkVcdTRFM0FcdTYzRDJcdTRFRjYgSURcdUZGMENcdTUwM0NcdTRFM0FcdTYzRDJcdTRFRjZcdThCRTZcdTdFQzZcdTRGRTFcdTYwNkZcclxuICAgIGNvbW11bml0eVBsdWdpbnM6IFJlY29yZDxzdHJpbmcsIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0+O1xyXG4gICAgLy8gXHU2ODA3XHU4QkIwXHU2NjJGXHU1NDI2XHU1REYyXHU3RUNGXHU1MkEwXHU4RjdEXHU0RTg2XHU3OTNFXHU1MzNBXHU2M0QyXHU0RUY2XHU1MjE3XHU4ODY4XHJcbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vIFx1OTYzMlx1NjI5Nlx1NTFGRFx1NjU3MFx1RkYwQ1x1NzUyOFx1NEU4RVx1NUI5QVx1NjVGNlx1NTIzN1x1NjVCMFx1NzkzRVx1NTMzQVx1NjNEMlx1NEVGNlx1NTIxN1x1ODg2OFx1RkYwQ1x1NkJDRlx1NUMwRlx1NjVGNlx1NjI2N1x1ODg0Q1x1NEUwMFx1NkIyMVxyXG4gICAgZGVib3VuY2VGZXRjaCA9IGRlYm91bmNlKGFzeW5jICgpID0+IHsgYXdhaXQgdGhpcy5mZXRjaENvbW11bml0eVBsdWdpbnMoKSB9LCAxMDAwICogNjAgKiA2MCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTRFQ0VcdThGRENcdTdBMEJcdTgzQjdcdTUzRDZcdTc5M0VcdTUzM0FcdTYzRDJcdTRFRjZcdTUyMTdcdTg4NjhcdUZGMENcdTVFNzZcdTVDMDZcdTUxNzZcdThGNkNcdTYzNjJcdTRFM0FcdTRFRTVcdTYzRDJcdTRFRjYgSUQgXHU0RTNBXHU5NTJFXHU3Njg0XHU1QkY5XHU4QzYxXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGZldGNoQ29tbXVuaXR5UGx1Z2lucygpIHtcclxuICAgICAgICAvLyBcdTRFQ0VcdTYzMDdcdTVCOUFcdTc2ODQgVVJMIFx1ODNCN1x1NTNENlx1NzkzRVx1NTMzQVx1NjNEMlx1NEVGNlx1NTIxN1x1ODg2OFx1NzY4NCBKU09OIFx1NjU3MFx1NjM2RVxyXG4gICAgICAgIGNvbnN0IHBsdWdpbkxpc3QgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL29ic2lkaWFubWQvb2JzaWRpYW4tcmVsZWFzZXMvbWFzdGVyL2NvbW11bml0eS1wbHVnaW5zLmpzb25gKS50aGVuKHIgPT4gci5qc29uKCkpO1xyXG4gICAgICAgIC8vIGlmICghcGx1Z2luTGlzdC5vaykgeyBuZXcgTm90aWNlKGBbXHU2M0QyXHU0RUY2XHU3QkExXHU3NDA2XHU1NjY4XSBcdTY1RTBcdTZDRDVcdThGREVcdTYzQTVcdTUyMzBHaXRodWIoXHU4REYzXHU4RjZDXHU0RTNCXHU5ODc1XHU1M0NBXHU0RTBCXHU4RjdEXHU0RTBEXHU1M0VGXHU3NTI4KWApOyB9XHJcbiAgICAgICAgLy8gXHU1MjFCXHU1RUZBXHU0RTAwXHU0RTJBXHU3QTdBXHU1QkY5XHU4QzYxXHVGRjBDXHU3NTI4XHU0RThFXHU1QjU4XHU1MEE4XHU0RUU1XHU2M0QyXHU0RUY2IElEIFx1NEUzQVx1OTUyRVx1NzY4NFx1NjNEMlx1NEVGNlx1NEZFMVx1NjA2RlxyXG4gICAgICAgIGNvbnN0IGtleWVkUGx1Z2luTGlzdDogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xyXG4gICAgICAgIC8vIFx1OTA0RFx1NTM4Nlx1NjNEMlx1NEVGNlx1NTIxN1x1ODg2OFx1RkYwQ1x1NUMwNlx1NkJDRlx1NEUyQVx1NjNEMlx1NEVGNlx1NzY4NFx1NEZFMVx1NjA2Rlx1NUI1OFx1NTBBOFx1NTIzMCBrZXllZFBsdWdpbkxpc3QgXHU0RTJEXHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHBsdWdpbkxpc3QpIGtleWVkUGx1Z2luTGlzdFtpdGVtLmlkXSA9IGl0ZW07XHJcbiAgICAgICAgLy8gXHU1QzA2XHU1OTA0XHU3NDA2XHU1NDBFXHU3Njg0XHU2M0QyXHU0RUY2XHU1MjE3XHU4ODY4XHU4RDRCXHU1MDNDXHU3RUQ5IGNvbW11bml0eVBsdWdpbnMgXHU1QzVFXHU2MDI3XHJcbiAgICAgICAgdGhpcy5jb21tdW5pdHlQbHVnaW5zID0ga2V5ZWRQbHVnaW5MaXN0O1xyXG4gICAgICAgIC8vIFx1NjgwN1x1OEJCMFx1NzkzRVx1NTMzQVx1NjNEMlx1NEVGNlx1NTIxN1x1ODg2OFx1NURGMlx1NTJBMFx1OEY3RFxyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1Njc4NFx1OTAyMFx1NTFGRFx1NjU3MFx1RkYwQ1x1NTIxRFx1NTlDQlx1NTMxNlx1NjNEMlx1NEVGNlx1NUI4OVx1ODhDNVx1NTY2OFxyXG4gICAgICogQHBhcmFtIFNNUEwgLSBTaGFyZU15UGx1Z2luIFx1NUI5RVx1NEY4QlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihTTVBMOiBTaGFyZU15UGx1Z2luKSB7XHJcbiAgICAgICAgLy8gXHU0RkREXHU1QjU4IFNoYXJlTXlQbHVnaW4gXHU1QjlFXHU0RjhCXHJcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBTTVBMO1xyXG4gICAgICAgIC8vIFx1OEMwM1x1NzUyOCBmZXRjaENvbW11bml0eVBsdWdpbnMgXHU2NUI5XHU2Q0Q1XHU4M0I3XHU1M0Q2XHU3OTNFXHU1MzNBXHU2M0QyXHU0RUY2XHU1MjE3XHU4ODY4XHJcbiAgICAgICAgdGhpcy5mZXRjaENvbW11bml0eVBsdWdpbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlx1NjMwN1x1NUI5QVx1NzY4NFx1NjNEMlx1NEVGNlxyXG4gICAgICogQHBhcmFtIGlkIC0gXHU4OTgxXHU4M0I3XHU1M0Q2XHU3Njg0XHU2M0QyXHU0RUY2XHU3Njg0IElEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBwbHVnaW5HaXRodWIoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NzkzRVx1NTMzQVx1NjNEMlx1NEVGNlx1NTIxN1x1ODg2OFx1NjcyQVx1NTJBMFx1OEY3RFx1RkYwQ1x1NTIxOVx1NTE0OFx1NTJBMFx1OEY3RFxyXG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaENvbW11bml0eVBsdWdpbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gXHU0RUNFXHU3OTNFXHU1MzNBXHU2M0QyXHU0RUY2XHU1MjE3XHU4ODY4XHU0RTJEXHU2N0U1XHU2MjdFXHU1QkY5XHU1RTk0XHU2M0QyXHU0RUY2XHU3Njg0IHJlcG8gXHU0RkUxXHU2MDZGXHJcbiAgICAgICAgY29uc3QgcGx1Z2luSW5mbyA9IHRoaXMuY29tbXVuaXR5UGx1Z2luc1tpZF07XHJcblxyXG4gICAgICAgIGlmICghcGx1Z2luSW5mbykge1xyXG4gICAgICAgICAgICBuZXcgTm90aWNlKGBbXHU2M0QyXHU0RUY2XHU3QkExXHU3NDA2XHU1NjY4XSBcdTY3MkFcdTc3RTVcdTYzRDJcdTRFRjZJRDogJHtpZH1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5vcGVuKGBodHRwczovL2dpdGh1Yi5jb20vJHtwbHVnaW5JbmZvLnJlcG99YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTVCODlcdTg4QzVcdTYzMDdcdTVCOUFcdTc2ODRcdTYzRDJcdTRFRjZcclxuICAgICAqIEBwYXJhbSBpZCAtIFx1ODk4MVx1NUI4OVx1ODhDNVx1NzY4NFx1NjNEMlx1NEVGNlx1NzY4NCBJRFxyXG4gICAgICogQHBhcmFtIHZlcnNpb24gLSBcdTg5ODFcdTVCODlcdTg4QzVcdTc2ODRcdTYzRDJcdTRFRjZcdTc2ODRcdTcyNDhcdTY3MkNcdUZGMENcdTlFRDhcdThCQTRcdTRFM0FcdTdBN0FcdTVCNTdcdTdCMjZcdTRFMzJcdUZGMENcdTg4NjhcdTc5M0FcdTRFMERcdTY4QzBcdTY3RTVcdTcyNDhcdTY3MkNcclxuICAgICAqIEBwYXJhbSBlbmFibGUgLSBcdTVCODlcdTg4QzVcdTU0MEVcdTY2MkZcdTU0MjZcdTU0MkZcdTc1MjhcdTYzRDJcdTRFRjZcdUZGMENcdTlFRDhcdThCQTRcdTRFM0EgZmFsc2VcclxuICAgICAqIEBwYXJhbSBnaXRodWIgLSBcdTYzRDJcdTRFRjZcdTc2ODQgR2l0SHViIFx1NEVEM1x1NUU5M1x1NTczMFx1NTc0MFx1RkYwQ1x1OUVEOFx1OEJBNFx1NEUzQVx1N0E3QVx1NUI1N1x1N0IyNlx1NEUzMlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgcGx1Z2luSW5zdGFsbChpZDogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmcgPSBcIlwiLCBlbmFibGU6IGJvb2xlYW4gPSBmYWxzZSwgZ2l0aHViOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgLy8gXHU2MjUzXHU1MzcwXHU2NUU1XHU1RkQ3XHVGRjBDXHU4QkIwXHU1RjU1XHU1RjAwXHU1OUNCXHU1Qjg5XHU4OEM1XHU2M0QyXHU0RUY2XHU3Njg0XHU0RkUxXHU2MDZGXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFtcdTYzRDJcdTRFRjZcdTdCQTFcdTc0MDZcdTU2NjhdIFx1NUYwMFx1NTlDQlx1NUI4OVx1ODhDNVx1NjNEMlx1NEVGNiAtLSAke2lkfSAtICR7dmVyc2lvbn0gLSAke2VuYWJsZX0gLSAke2dpdGh1Yn1gKTtcclxuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTc5M0VcdTUzM0FcdTYzRDJcdTRFRjZcdTUyMTdcdTg4NjhcdTY3MkFcdTUyQTBcdThGN0RcdUZGMENcdTUyMTlcdTUxNDhcdTUyQTBcdThGN0QgXHU1NDI2XHU1MjE5XHVGRjBDXHU4OUU2XHU1M0QxXHU5NjMyXHU2Mjk2XHU1MUZEXHU2NTcwXHVGRjBDXHU1QjlBXHU2NUY2XHU1MjM3XHU2NUIwXHU3OTNFXHU1MzNBXHU2M0QyXHU0RUY2XHU1MjE3XHU4ODY4XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkgYXdhaXQgdGhpcy5mZXRjaENvbW11bml0eVBsdWdpbnMoKTsgZWxzZSB0aGlzLmRlYm91bmNlRmV0Y2goKTtcclxuXHJcbiAgICAgICAgLy8gXHU4M0I3XHU1M0Q2IE9ic2lkaWFuIFx1NUU5NFx1NzUyOFx1NzY4NFx1NjNEMlx1NEVGNlx1NkNFOFx1NTE4Q1x1ODg2OFxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBjb25zdCBwbHVnaW5SZWdpc3RyeSA9IHRoaXMucGx1Z2luLmFwcC5wbHVnaW5zO1xyXG5cclxuICAgICAgICAvLyBcdTY4MDdcdThCQjBcdTY2MkZcdTU0MjZcdTk3MDBcdTg5ODFcdTVCODlcdTg4QzVcdTYzRDJcdTRFRjZcclxuICAgICAgICBsZXQgaW5zdGFsbEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAvLyBcdTgzQjdcdTUzRDZcdTYzRDJcdTRFRjZcdTc2ODRcdTRFRDNcdTVFOTNcdTU3MzBcdTU3NDBcdUZGMENcdTU5ODJcdTY3OUNcdTYzRDBcdTRGOUJcdTRFODYgZ2l0aHViIFx1NTNDMlx1NjU3MFx1RkYwQ1x1NTIxOVx1NEY3Rlx1NzUyOFx1OEJFNVx1NTNDMlx1NjU3MFx1RkYwQ1x1NTQyNlx1NTIxOVx1NEVDRVx1NzkzRVx1NTMzQVx1NjNEMlx1NEVGNlx1NTIxN1x1ODg2OFx1NEUyRFx1ODNCN1x1NTNENlxyXG4gICAgICAgIGNvbnN0IHJlcG8gPSBnaXRodWIgIT09IFwiXCIgPyBnaXRodWIgOiB0aGlzLmNvbW11bml0eVBsdWdpbnNbaWRdPy5yZXBvO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcG8pXHJcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU2MjdFXHU0RTBEXHU1MjMwXHU2M0QyXHU0RUY2XHU3Njg0XHU0RUQzXHU1RTkzXHU1NzMwXHU1NzQwXHVGRjBDXHU2NjNFXHU3OTNBXHU2M0QwXHU3OTNBXHU0RkUxXHU2MDZGXHU1RTc2XHU4RkQ0XHU1NkRFXHJcbiAgICAgICAgaWYgKCFyZXBvKSB7XHJcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoYFtcdTYzRDJcdTRFRjZcdTdCQTFcdTc0MDZcdTU2NjhdIFx1NjcyQVx1NzdFNVx1NjNEMlx1NEVGNklEOiAke2lkfWApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBcdTY4QzBcdTY3RTVcdTYzRDJcdTRFRjZcdTY2MkZcdTU0MjZcdTVERjJcdTdFQ0ZcdTVCODlcdTg4QzVcclxuICAgICAgICBpZiAocGx1Z2luUmVnaXN0cnkubWFuaWZlc3RzW2lkXSkge1xyXG4gICAgICAgICAgICAvLyBcdTYzRDJcdTRFRjZcdTVERjJcdTVCODlcdTg4QzVcdUZGMENcdTY2M0VcdTc5M0FcdTYzRDBcdTc5M0FcdTRGRTFcdTYwNkZcclxuICAgICAgICAgICAgbmV3IE5vdGljZShgW1x1NjNEMlx1NEVGNlx1N0JBMVx1NzQwNlx1NTY2OF0gXHU2M0QyXHU0RUY2ICR7cGx1Z2luUmVnaXN0cnkubWFuaWZlc3RzW2lkXS5uYW1lfSBcdTVERjJcdTVCODlcdTg4QzVgKTtcclxuICAgICAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU2MzA3XHU1QjlBXHU0RTg2XHU3MjQ4XHU2NzJDXHU0RTE0XHU0RTBFXHU1REYyXHU1Qjg5XHU4OEM1XHU3Njg0XHU3MjQ4XHU2NzJDXHU0RTBEXHU1NDBDXHVGRjBDXHU1MjE5XHU2ODA3XHU4QkIwXHU0RTNBXHU5NzAwXHU4OTgxXHU1Qjg5XHU4OEM1XHJcbiAgICAgICAgICAgIGlmICh2ZXJzaW9uICE9PSBcIlwiICYmIHZlcnNpb24gIT09IHBsdWdpblJlZ2lzdHJ5Lm1hbmlmZXN0c1tpZF0/LnZlcnNpb24pIGluc3RhbGxGbGFnID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBcdTYzRDJcdTRFRjZcdTY3MkFcdTVCODlcdTg4QzVcdUZGMENcdTY4MDdcdThCQjBcdTRFM0FcdTk3MDBcdTg5ODFcdTVCODlcdTg4QzVcclxuICAgICAgICAgICAgaW5zdGFsbEZsYWcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU5NzAwXHU4OTgxXHU1Qjg5XHU4OEM1XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgaWYgKGluc3RhbGxGbGFnKSB7XHJcbiAgICAgICAgICAgIC8vIFx1NEVDRSBHaXRIdWIgXHU0RUQzXHU1RTkzXHU4M0I3XHU1M0Q2XHU2M0QyXHU0RUY2XHU3Njg0IG1hbmlmZXN0Lmpzb24gXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS8ke3JlcG99L0hFQUQvbWFuaWZlc3QuanNvbmApLnRoZW4ociA9PiByLmpzb24oKSk7XHJcbiAgICAgICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NzI0OFx1NjcyQ1x1NEUzQSBcImxhdGVzdFwiIFx1NjIxNlx1N0E3QVx1NUI1N1x1N0IyNlx1NEUzMlx1RkYwQ1x1NTIxOVx1NEY3Rlx1NzUyOCBtYW5pZmVzdCBcdTRFMkRcdTc2ODRcdTcyNDhcdTY3MkNcclxuICAgICAgICAgICAgaWYgKHZlcnNpb24udG9Mb3dlckNhc2UoKSA9PT0gXCJsYXRlc3RcIiB8fCB2ZXJzaW9uID09PSBcIlwiKSB2ZXJzaW9uID0gbWFuaWZlc3QudmVyc2lvbjtcclxuICAgICAgICAgICAgLy8gXHU4QzAzXHU3NTI4XHU2M0QyXHU0RUY2XHU2Q0U4XHU1MThDXHU4ODY4XHU3Njg0IGluc3RhbGxQbHVnaW4gXHU2NUI5XHU2Q0Q1XHU1Qjg5XHU4OEM1XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgICAgIGF3YWl0IHBsdWdpblJlZ2lzdHJ5Lmluc3RhbGxQbHVnaW4ocmVwbywgdmVyc2lvbiwgbWFuaWZlc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gXHU2ODM5XHU2MzZFIGVuYWJsZSBcdTUzQzJcdTY1NzBcdTUxQjNcdTVCOUFcdTY2MkZcdTU0MjZcdTU0MkZcdTc1MjhcdTYyMTZcdTc5ODFcdTc1MjhcdTYzRDJcdTRFRjZcclxuICAgICAgICBpZiAoZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIC8vIFx1NTQyRlx1NzUyOFx1NjNEMlx1NEVGNlxyXG4gICAgICAgICAgICBhd2FpdCBwbHVnaW5SZWdpc3RyeS5sb2FkUGx1Z2luKGlkKTtcclxuICAgICAgICAgICAgYXdhaXQgcGx1Z2luUmVnaXN0cnkuZW5hYmxlUGx1Z2luQW5kU2F2ZShpZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gXHU3OTgxXHU3NTI4XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgICAgIGF3YWl0IHBsdWdpblJlZ2lzdHJ5LmRpc2FibGVQbHVnaW4oaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODlFM1x1Njc5MFx1NUI4OVx1ODhDNVx1NTNDMlx1NjU3MFx1NUU3Nlx1OEMwM1x1NzUyOCBpbnN0YWxsUGx1Z2luIFx1NjVCOVx1NkNENVx1NUI4OVx1ODhDNVx1NjNEMlx1NEVGNlxyXG4gICAgICogQHBhcmFtIHBhcmFtcyAtIFx1NTMwNVx1NTQyQlx1NjNEMlx1NEVGNlx1NUI4OVx1ODhDNVx1NTNDMlx1NjU3MFx1NzY4NFx1NUJGOVx1OEM2MVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgcGFyc2VQbHVnaW5JbnN0YWxsKHBhcmFtczogT2JzaWRpYW5Qcm90b2NvbERhdGEpIHtcclxuICAgICAgICAvLyBcdTg5RTNcdTY3OTBcdTUzQzJcdTY1NzBcdUZGMENcdThCQkVcdTdGNkVcdTlFRDhcdThCQTRcdTUwM0NcclxuICAgICAgICBsZXQgYXJncyA9IHtcclxuICAgICAgICAgICAgaWQ6IHBhcmFtcy5pZCxcclxuICAgICAgICAgICAgdmVyc2lvbjogcGFyYW1zPy52ZXJzaW9uID8/IFwiXCIsXHJcbiAgICAgICAgICAgIGVuYWJsZTogW1wiXCIsIFwidHJ1ZVwiLCBcIjFcIl0uaW5jbHVkZXMocGFyYW1zLmVuYWJsZS50b0xvd2VyQ2FzZSgpKSxcclxuICAgICAgICAgICAgZ2l0aHViOiBwYXJhbXMuZ2l0aHViID8/IFwiXCIsXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBcdThDMDNcdTc1MjggaW5zdGFsbFBsdWdpbiBcdTY1QjlcdTZDRDVcdTVCODlcdTg4QzVcdTYzRDJcdTRFRjZcclxuICAgICAgICB0aGlzLnBsdWdpbkluc3RhbGwoYXJncy5pZCwgYXJncy52ZXJzaW9uLCBhcmdzLmVuYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTg5RTNcdTY3OTBcdTUzMDVcdTU0MkJcdTYzRDJcdTRFRjZcdTRGRTFcdTYwNkZcdTc2ODRcdTVCNTdcdTdCMjZcdTRFMzJcdTYyMTZcdTVCRjlcdThDNjFcdUZGMENcdTgzQjdcdTUzRDZcdTYzRDJcdTRFRjZcdTc2ODRcdTc2RjhcdTUxNzNcdTRGRTFcdTYwNkZcclxuICAgICAqIEBwYXJhbSBpbnB1dCAtIFx1NTMwNVx1NTQyQlx1NjNEMlx1NEVGNlx1NEZFMVx1NjA2Rlx1NzY4NFx1NUI1N1x1N0IyNlx1NEUzMlx1NjIxNlx1NUJGOVx1OEM2MVxyXG4gICAgICogQHJldHVybiAtIFx1OEZENFx1NTZERVx1ODlFM1x1Njc5MFx1NTQwRVx1NzY4NFx1NjNEMlx1NEVGNlx1NEZFMVx1NjA2Rlx1NUJGOVx1OEM2MVx1RkYwQ1x1NTk4Mlx1Njc5Q1x1ODlFM1x1Njc5MFx1NTkzMVx1OEQyNVx1NTIxOVx1OEZENFx1NTZERSBudWxsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBwYXJzZVBsdWdpbkdpdGh1YihwYXJhbXM6IE9ic2lkaWFuUHJvdG9jb2xEYXRhKSB7XHJcbiAgICAgICAgLy8gXHU4OUUzXHU2NzkwXHU1M0MyXHU2NTcwXHVGRjBDXHU4QkJFXHU3RjZFXHU5RUQ4XHU4QkE0XHU1MDNDXHJcbiAgICAgICAgbGV0IGFyZ3MgPSB7IGlkOiBwYXJhbXMuaWQgfTtcclxuICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbkdpdGh1YihhcmdzLmlkKTtcclxuICAgIH1cclxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsSUFBQUEsb0JBQXdFOzs7QUN1Q2pFLElBQU0sbUJBQW9DO0FBQUEsRUFDN0MsYUFBYTtBQUFBO0FBQUEsRUFFYixZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxjQUFjO0FBQUEsRUFFZCxVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixZQUFZO0FBQUEsRUFDWixhQUFhO0FBQUEsRUFDYixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCwyQkFBMkI7QUFBQSxFQUMzQixjQUFjO0FBQUEsRUFDZCxlQUFlO0FBQUEsRUFDZixRQUFRO0FBQUEsSUFDSjtBQUFBLE1BQ0ksTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLElBQ2I7QUFBQSxFQUNKO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDRjtBQUFBLE1BQ0ksTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLElBQ2I7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSjtBQUFBLE1BQ0ksTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLElBQ1o7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTLENBQUM7QUFBQSxFQUNWLE9BQU8sQ0FBQztBQUNaOzs7QUM5RUEsSUFBQUMsb0JBQXNDOzs7QUNLdEMsSUFBOEIsY0FBOUIsTUFBMEM7QUFBQSxFQU96QyxZQUFZLEtBQXdCO0FBQ25DLFNBQUssYUFBYTtBQUNsQixTQUFLLFVBQVUsSUFBSTtBQUNuQixTQUFLLFdBQVcsSUFBSSxRQUFRO0FBQzVCLFNBQUssY0FBYyxJQUFJO0FBQ3ZCLFNBQUss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QUNKLEtBQUs7QUFDRCxnQkFBUSxVQUFVLDRCQUE0QixLQUFLLHNCQUFzQixPQUFPLEVBQUUsb0JBQW9CLEtBQUssc0JBQXNCLE9BQU8sRUFBRTtBQUMxSTtBQUFBLE1BQ0o7QUFDSSxnQkFBUTtBQUFBLElBQ2hCO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNPLGNBQWMsS0FBYTtBQUM5QixVQUFNLE1BQU0sU0FBUyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDckMsVUFBTSxJQUFLLE9BQU87QUFDbEIsVUFBTSxJQUFNLE9BQU8sSUFBSztBQUN4QixVQUFNLElBQUssTUFBTTtBQUNqQixXQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQjtBQUFBLEVBQ08sc0JBQXNCLEtBQWEsUUFBZ0I7QUFDdEQsVUFBTSxNQUFNLFNBQVMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ3JDLFVBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksSUFBSyxPQUFPLEtBQU0sT0FBUSxNQUFNLENBQUM7QUFDbEUsVUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFLLE9BQU8sSUFBSyxPQUFRLE1BQU0sQ0FBQztBQUNqRSxVQUFNLElBQUksS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksTUFBTSxPQUFRLE1BQU0sQ0FBQztBQUMxRCxXQUFPLE1BQU0sS0FBSyxPQUFPLEtBQUssT0FBTyxLQUFLLEtBQUssR0FBRyxTQUFTLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxZQUFZO0FBQUEsRUFDeEY7QUFDSjs7O0FEOUxBLElBQU8sZUFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAicGF0aCIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaXRlbSIsICJpdGVtIiwgIm1wIiwgImltcG9ydF9vYnNpZGlhbiIsICJNYW5hZ2VyQmFzaXMiLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiTWFuYWdlckJhc2lzIiwgImltcG9ydF9vYnNpZGlhbiJdCn0K
