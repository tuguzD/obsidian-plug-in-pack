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
var import_obsidian10 = require("obsidian");

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
var import_obsidian9 = require("obsidian");

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
var import_obsidian7 = require("obsidian");

// src/modal/manager-modal.ts
var path = __toESM(require("path"));
var import_obsidian6 = require("obsidian");

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

// src/modal/manager-modal.ts
var ManagerModal = class extends import_obsidian6.Modal {
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
    manager.synchronizePlugins(Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== manager.manifest.id));
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
    const actionBar = new import_obsidian6.Setting(this.titleEl).setClass("manager-bar__action").setName(this.manager.translator.t("\u901A\u7528_\u64CD\u4F5C_\u6587\u672C"));
    const githubButton = new import_obsidian6.ButtonComponent(actionBar.controlEl);
    githubButton.setIcon("github");
    githubButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0"));
    githubButton.onClick(() => {
      window.open(this.manager.manifest.authorUrl);
    });
    const tutorialButton = new import_obsidian6.ButtonComponent(actionBar.controlEl);
    tutorialButton.setIcon("book-open");
    tutorialButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0"));
    tutorialButton.onClick(() => {
      window.open("https://www.bilibili.com/video/BV1WyrkYMEce/");
    });
    const reloadButton = new import_obsidian6.ButtonComponent(actionBar.controlEl);
    reloadButton.setIcon("refresh-ccw");
    reloadButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0"));
    reloadButton.onClick(async () => {
      new import_obsidian6.Notice("\u91CD\u65B0\u52A0\u8F7D\u7B2C\u4E09\u65B9\u63D2\u4EF6");
      await this.appPlugins.loadManifests();
      this.reloadShowData();
    });
    const updateButton = new import_obsidian6.ButtonComponent(actionBar.controlEl);
    updateButton.setIcon("rss");
    updateButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0"));
    updateButton.onClick(async () => {
      try {
        await this.appPlugins.checkForUpdates();
        this.appSetting.open();
        this.appSetting.openTabById("community-plugins");
      } catch (error) {
        console.error("\u68C0\u67E5\u66F4\u65B0\u65F6\u51FA\u9519:", error);
      }
    });
    const disableButton = new import_obsidian6.ButtonComponent(actionBar.controlEl);
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
    const enableButton = new import_obsidian6.ButtonComponent(actionBar.controlEl);
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
    const editorButton = new import_obsidian6.ButtonComponent(actionBar.controlEl);
    this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
    editorButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0"));
    editorButton.onClick(() => {
      this.editorMode = !this.editorMode;
      this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
      this.reloadShowData();
    });
    const settingsButton = new import_obsidian6.ButtonComponent(actionBar.controlEl);
    settingsButton.setIcon("settings");
    settingsButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0"));
    settingsButton.onClick(() => {
      this.appSetting.open();
      this.appSetting.openTabById(this.manager.manifest.id);
      this.close();
    });
    if (this.developerMode) {
      const testButton = new import_obsidian6.ButtonComponent(actionBar.controlEl);
      testButton.setIcon("refresh-ccw");
      testButton.setTooltip("\u5237\u65B0\u63D2\u4EF6");
      testButton.onClick(async () => {
        this.close();
        await this.appPlugins.disablePlugin(this.manager.manifest.id);
        await this.appPlugins.enablePlugin(this.manager.manifest.id);
      });
    }
    const searchBar = new import_obsidian6.Setting(this.titleEl).setClass("manager-bar__search").setName(this.manager.translator.t("\u901A\u7528_\u641C\u7D22_\u6587\u672C"));
    const noGroupBar = new import_obsidian6.ButtonComponent(searchBar.controlEl).setIcon("group");
    noGroupBar.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u672A\u5206\u7EC4_\u63CF\u8FF0"));
    noGroupBar.onClick(() => {
      this.noGroup = !this.noGroup;
      this.reloadShowData();
    });
    const onlyEnabled = new import_obsidian6.ButtonComponent(searchBar.controlEl);
    this.onlyEnabled ? onlyEnabled.setIcon("toggle-right") : onlyEnabled.setIcon("toggle-left");
    onlyEnabled.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0"));
    onlyEnabled.onClick(() => {
      this.onlyEnabled = !this.onlyEnabled;
      this.onlyEnabled ? onlyEnabled.setIcon("toggle-right") : onlyEnabled.setIcon("toggle-left");
      this.reloadShowData();
    });
    const groupCounts = this.settings.Plugins.reduce((acc, plugin) => {
      const groupId = plugin.group || "";
      acc[groupId] = (acc[groupId] || 0) + 1;
      return acc;
    }, { "": 0 });
    const groups = this.settings.GROUPS.reduce((acc, item) => {
      acc[item.id] = `${item.name} (${groupCounts[item.id] || 0})`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C") });
    const groupsDropdown = new import_obsidian6.DropdownComponent(searchBar.controlEl);
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
      acc[item.id] = `${item.name} (${tagCounts[item.id] || 0})`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C") });
    const tagsDropdown = new import_obsidian6.DropdownComponent(searchBar.controlEl);
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
      const delaysDropdown = new import_obsidian6.DropdownComponent(searchBar.controlEl);
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
    this.searchEl = new import_obsidian6.SearchComponent(searchBar.controlEl);
    this.searchEl.onChange((value) => {
      this.searchText = value;
      this.reloadShowData();
    });
  }
  async showData() {
    const plugins = Object.values(this.appPlugins.manifests);
    plugins.sort((item1, item2) => {
      return item1.name.localeCompare(item2.name);
    });
    this.displayPlugins = [];
    for (const plugin of plugins) {
      const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
      const pluginDir = path.join(this.basePath, plugin.dir ? plugin.dir : "");
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
        if (this.searchText !== "" && ManagerPlugin.name.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && ManagerPlugin.desc.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1)
          continue;
        if (plugin.id === this.manager.manifest.id)
          continue;
        const itemEl = new import_obsidian6.Setting(this.contentEl);
        itemEl.setClass("manager-item");
        itemEl.nameEl.addClass("manager-item__name-container");
        itemEl.descEl.addClass("manager-item__description-container");
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
              itemEl.settingEl.addEventListener("mouseenter", () => {
                itemEl.descEl.removeClass("manager-display-none");
                itemEl.descEl.addClass("manager-display-block");
              });
              itemEl.settingEl.addEventListener("mouseleave", () => {
                itemEl.descEl.removeClass("manager-display-block");
                itemEl.descEl.addClass("manager-display-none");
              });
              break;
            case "clickExpand":
              itemEl.descEl.addClass("manager-display-none");
              itemEl.settingEl.addEventListener("click", function(event) {
                const excludedButtons = Array.from(itemEl.controlEl.querySelectorAll("div"));
                if (excludedButtons.includes(event.target)) {
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
              });
              break;
          }
        }
        if (ManagerPlugin.group !== "") {
          const group = createSpan({
            cls: "manager-item__name-group"
          });
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
        const title = createSpan({
          text: ManagerPlugin.name,
          title: plugin.name,
          cls: "manager-item__name-title"
        });
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
        const version = createSpan({
          text: `[${plugin.version}]`,
          cls: ["manager-item__name-version"]
        });
        itemEl.nameEl.appendChild(version);
        if (this.settings.DELAY && !this.editorMode && ManagerPlugin.delay !== "") {
          const d = this.settings.DELAYS.find((item) => item.id === ManagerPlugin.delay);
          if (d) {
            const delay = createSpan({ text: `${d.time}s`, cls: ["manager-item__name-delay"] });
            itemEl.nameEl.appendChild(delay);
          }
        }
        const desc = createDiv({
          text: ManagerPlugin.desc,
          title: plugin.description,
          cls: ["manager-item__name-desc"]
        });
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
            const openPluginSetting = new import_obsidian6.ExtraButtonComponent(itemEl.controlEl);
            openPluginSetting.setIcon("settings");
            openPluginSetting.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0"));
            openPluginSetting.onClick(() => {
              openPluginSetting.setDisabled(true);
              this.appSetting.open();
              this.appSetting.openTabById(plugin.id);
              openPluginSetting.setDisabled(false);
            });
          }
          const openPluginDirButton = new import_obsidian6.ExtraButtonComponent(itemEl.controlEl);
          openPluginDirButton.setIcon("folder-open");
          openPluginDirButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0"));
          openPluginDirButton.onClick(() => {
            openPluginDirButton.setDisabled(true);
            managerOpen(pluginDir, this.manager);
            openPluginDirButton.setDisabled(false);
          });
          const deletePluginButton = new import_obsidian6.ExtraButtonComponent(itemEl.controlEl);
          deletePluginButton.setIcon("trash");
          deletePluginButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0"));
          deletePluginButton.onClick(async () => {
            new DeleteModal(this.app, this.manager, async () => {
              await this.appPlugins.uninstallPlugin(plugin.id);
              await this.appPlugins.loadManifests();
              this.reloadShowData();
              command_default(this.app, this.manager);
              this.manager.synchronizePlugins(Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manager.manifest.id));
              new import_obsidian6.Notice(this.manager.translator.t("\u5378\u8F7D_\u901A\u77E5_\u4E00"));
            }).open();
          });
          const toggleSwitch = new import_obsidian6.ToggleComponent(itemEl.controlEl);
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
          const reloadButton = new import_obsidian6.ExtraButtonComponent(itemEl.controlEl);
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
            const delaysEl = new import_obsidian6.DropdownComponent(itemEl.controlEl);
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
    const summary = `[${this.manager.translator.t("\u901A\u7528_\u603B\u8BA1_\u6587\u672C")}] ${totalCount} [${this.manager.translator.t("\u901A\u7528_\u542F\u7528_\u6587\u672C")}] ${enabledCount} [${this.manager.translator.t("\u901A\u7528_\u7981\u7528_\u6587\u672C")}] ${disabledCount} `;
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
            name: `${mp.enabled ? "\u5173\u95ED" : "\u5F00\u542F"} ${mp.name} `,
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
          name: `\u4E00\u952E\u5F00\u542F${group.name}\u5206\u7EC4`,
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
          name: `\u4E00\u952E\u7981\u7528${group.name}\u5206\u7EC4`,
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
    const languageBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0"));
    const languageDropdown = new import_obsidian7.DropdownComponent(languageBar.controlEl);
    languageDropdown.addOptions(this.manager.translator.language);
    languageDropdown.setValue(this.settings.LANGUAGE);
    languageDropdown.onChange((value) => {
      this.settings.LANGUAGE = value;
      this.manager.saveSettings();
      this.settingTab.basisDisplay();
      command_default(this.app, this.manager);
    });
    const topBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0"));
    const topToggle = new import_obsidian7.ToggleComponent(topBar.controlEl);
    topToggle.setValue(this.settings.CENTER);
    topToggle.onChange((value) => {
      this.settings.CENTER = value;
      this.manager.saveSettings();
    });
    const persistenceBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0"));
    const persistenceToggle = new import_obsidian7.ToggleComponent(persistenceBar.controlEl);
    persistenceToggle.setValue(this.settings.PERSISTENCE);
    persistenceToggle.onChange((value) => {
      this.settings.PERSISTENCE = value;
      this.manager.saveSettings();
    });
    const itemStyleBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0"));
    const itemStyleDropdown = new import_obsidian7.DropdownComponent(itemStyleBar.controlEl);
    itemStyleDropdown.addOptions(this.ITEM_STYLE);
    itemStyleDropdown.setValue(this.settings.ITEM_STYLE);
    itemStyleDropdown.onChange((value) => {
      this.settings.ITEM_STYLE = value;
      this.manager.saveSettings();
    });
    const groupStyleBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0"));
    const groupStyleDropdown = new import_obsidian7.DropdownComponent(groupStyleBar.controlEl);
    groupStyleDropdown.addOptions(this.GROUP_STYLE);
    groupStyleDropdown.setValue(this.settings.GROUP_STYLE);
    groupStyleDropdown.onChange((value) => {
      this.settings.GROUP_STYLE = value;
      this.manager.saveSettings();
    });
    const tagStyleBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0"));
    const tagStyleDropdown = new import_obsidian7.DropdownComponent(tagStyleBar.controlEl);
    tagStyleDropdown.addOptions(this.TAG_STYLE);
    tagStyleDropdown.setValue(this.settings.TAG_STYLE);
    tagStyleDropdown.onChange((value) => {
      this.settings.TAG_STYLE = value;
      this.manager.saveSettings();
    });
    const DelayBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0"));
    const DelayToggle = new import_obsidian7.ToggleComponent(DelayBar.controlEl);
    DelayToggle.setValue(this.settings.DELAY);
    DelayToggle.onChange((value) => {
      this.settings.DELAY = value;
      this.manager.saveSettings();
      value ? this.manager.enableDelaysForAllPlugins() : this.manager.disableDelaysForAllPlugins();
    });
    const fadeOutDisabledPluginsBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0"));
    const fadeOutDisabledPluginsToggle = new import_obsidian7.ToggleComponent(fadeOutDisabledPluginsBar.controlEl);
    fadeOutDisabledPluginsToggle.setValue(this.settings.FADE_OUT_DISABLED_PLUGINS);
    fadeOutDisabledPluginsToggle.onChange((value) => {
      this.settings.FADE_OUT_DISABLED_PLUGINS = value;
      this.manager.saveSettings();
    });
    const CommandItemBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandItemToggle = new import_obsidian7.ToggleComponent(CommandItemBar.controlEl);
    CommandItemToggle.setValue(this.settings.COMMAND_ITEM);
    CommandItemToggle.onChange((value) => {
      this.settings.COMMAND_ITEM = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    const CommandGroupBar = new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandGroupToggle = new import_obsidian7.ToggleComponent(CommandGroupBar.controlEl);
    CommandGroupToggle.setValue(this.settings.COMMAND_GROUP);
    CommandGroupToggle.onChange((value) => {
      this.settings.COMMAND_GROUP = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    new import_obsidian7.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0"));
  }
};

// src/settings/ui/manager-delay.ts
var import_obsidian8 = require("obsidian");
var ManagerDelay = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let time = 0;
    new import_obsidian8.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addSlider(
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
          new import_obsidian8.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian8.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.DELAYS.forEach((delay, index) => {
      const item = new import_obsidian8.Setting(this.containerEl);
      item.settingEl.addClass("manager-setting-group__item");
      item.setName(`${index + 1}. ${delay.id}`);
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
            new import_obsidian8.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian8.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
    });
  }
};

// src/settings/index.ts
var ManagerSettingTab = class extends import_obsidian9.PluginSettingTab {
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
  \u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C: "Enable",
  \u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C: "Disable",
  \u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C: "Group",
  \u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C: "One - click Enable",
  \u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C: "One - click Disable",
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
var Manager = class extends import_obsidian10.Plugin {
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
          "delay": ""
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyIsICJzcmMvbWFpbi50cyIsICJzcmMvc2V0dGluZ3MvZGF0YS50cyIsICJzcmMvc2V0dGluZ3MvaW5kZXgudHMiLCAic3JjL3NldHRpbmdzL2Jhc2Utc2V0dGluZy50cyIsICJzcmMvc2V0dGluZ3MvdWkvbWFuYWdlci1iYXNpcy50cyIsICJzcmMvbW9kYWwvbWFuYWdlci1tb2RhbC50cyIsICJzcmMvdXRpbHMudHMiLCAic3JjL21vZGFsL2dyb3VwLW1vZGFsLnRzIiwgInNyYy9tb2RhbC90YWdzLW1vZGFsLnRzIiwgInNyYy9tb2RhbC9kZWxldGUtbW9kYWwudHMiLCAic3JjL21vZGFsL2Rpc2FibGUtbW9kYWwudHMiLCAic3JjL2NvbW1hbmQudHMiLCAic3JjL3NldHRpbmdzL3VpL21hbmFnZXItZGVsYXkudHMiLCAic3JjL2xhbmcvbG9jYWxlL3poX2NuLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9lbi50cyIsICJzcmMvbGFuZy9sb2NhbGUvcnUudHMiLCAic3JjL2xhbmcvbG9jYWxlL2phLnRzIiwgInNyYy9sYW5nL2xvY2FsZS9rby50cyIsICJzcmMvbGFuZy9sb2NhbGUvZnIudHMiLCAic3JjL2xhbmcvbG9jYWxlL2VzLnRzIiwgInNyYy9sYW5nL2lueGRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IE1hbmFnZXIgZnJvbSAnLi9zcmMvbWFpbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXJcclxuIiwgImltcG9ydCB7IFBsdWdpbiwgUGx1Z2luTWFuaWZlc3QsIFdvcmtzcGFjZSB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgREVGQVVMVF9TRVRUSU5HUywgTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi9zZXR0aW5ncy9kYXRhJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdUYWIgfSBmcm9tICcuL3NldHRpbmdzJztcclxuaW1wb3J0IHsgVHJhbnNsYXRvciB9IGZyb20gJy4vbGFuZy9pbnhkZXgnO1xyXG5pbXBvcnQgeyBNYW5hZ2VyTW9kYWwgfSBmcm9tICcuL21vZGFsL21hbmFnZXItbW9kYWwnO1xyXG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnLi9jb21tYW5kJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBQbHVnaW4ge1xyXG4gICAgcHVibGljIHNldHRpbmdzOiBNYW5hZ2VyU2V0dGluZ3M7XHJcbiAgICBwdWJsaWMgbWFuYWdlck1vZGFsOiBNYW5hZ2VyTW9kYWw7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgcHVibGljIGFwcFBsdWdpbnM6IGFueTtcclxuICAgIHB1YmxpYyBhcHBXb3Jrc3BhY2U6IFdvcmtzcGFjZTtcclxuICAgIHB1YmxpYyB0cmFuc2xhdG9yOiBUcmFuc2xhdG9yO1xyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvbmxvYWQoKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuYXBwUGx1Z2lucyA9IHRoaXMuYXBwLnBsdWdpbnM7XHJcbiAgICAgICAgdGhpcy5hcHBXb3Jrc3BhY2UgPSB0aGlzLmFwcC53b3Jrc3BhY2U7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGAlYyAke3RoaXMubWFuaWZlc3QubmFtZX0gJWMgdiR7dGhpcy5tYW5pZmVzdC52ZXJzaW9ufSBgLCBgcGFkZGluZzogMnB4OyBib3JkZXItcmFkaXVzOiAycHggMCAwIDJweDsgY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6ICM1QjVCNUI7YCwgYHBhZGRpbmc6IDJweDsgYm9yZGVyLXJhZGl1czogMCAycHggMnB4IDA7IGNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kOiAjNDA5RUZGO2ApO1xyXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XHJcbiAgICAgICAgLy8gXHU1MjFEXHU1OUNCXHU1MzE2XHU4QkVEXHU4QTAwXHU3Q0ZCXHU3RURGXHJcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gbmV3IFRyYW5zbGF0b3IodGhpcyk7XHJcbiAgICAgICAgLy8gXHU1MjFEXHU1OUNCXHU1MzE2XHU0RkE3XHU4RkI5XHU2ODBGXHU1NkZFXHU2ODA3XHJcbiAgICAgICAgdGhpcy5hZGRSaWJib25JY29uKCdmb2xkZXItY29nJywgdGhpcy50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDJyksICgpID0+IHsgdGhpcy5tYW5hZ2VyTW9kYWwgPSBuZXcgTWFuYWdlck1vZGFsKHRoaXMuYXBwLCB0aGlzKTsgdGhpcy5tYW5hZ2VyTW9kYWwub3BlbigpOyB9KTtcclxuICAgICAgICAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdThCQkVcdTdGNkVcdTc1NENcdTk3NjJcclxuICAgICAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IE1hbmFnZXJTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5ERUxBWSA/IHRoaXMuZW5hYmxlRGVsYXkoKSA6IHRoaXMuZGlzYWJsZURlbGF5KCk7XHJcbiAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoXHJcbiAgICAgICAgLy8gICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbignZmlsZS1tZW51JywgKG1lbnUsIGZpbGUpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnN0IGFkZEljb25NZW51SXRlbSA9IChpdGVtOiBNZW51SXRlbSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGl0ZW0uc2V0VGl0bGUoJ1x1NTg5RScpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGl0ZW0uc2V0SWNvbignaGFzaHRhZycpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGl0ZW0ub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9O1xyXG4gICAgICAgIC8vICAgICAgICAgbWVudS5hZGRJdGVtKGFkZEljb25NZW51SXRlbSk7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBhZGRJY29uTWVudUl0ZW0xID0gKGl0ZW06IE1lbnVJdGVtKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaXRlbS5zZXRUaXRsZSgnXHU1MjIwJyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaXRlbS5zZXRJY29uKCdoYXNodGFnJyk7XHJcbiAgICAgICAgLy8gICAgICAgICB9O1xyXG4gICAgICAgIC8vICAgICAgICAgbWVudS5hZGRJdGVtKGFkZEljb25NZW51SXRlbTEpO1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc3QgYWRkSWNvbk1lbnVJdGVtMiA9IChpdGVtOiBNZW51SXRlbSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGl0ZW0uc2V0VGl0bGUoJ1x1NjUzOScpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGl0ZW0uc2V0SWNvbignaGFzaHRhZycpO1xyXG4gICAgICAgIC8vICAgICAgICAgfTtcclxuICAgICAgICAvLyAgICAgICAgIG1lbnUuYWRkSXRlbShhZGRJY29uTWVudUl0ZW0yKTtcclxuICAgICAgICAvLyAgICAgfSksXHJcbiAgICAgICAgLy8gKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG9udW5sb2FkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZKSB0aGlzLmRpc2FibGVEZWxheXNGb3JBbGxQbHVnaW5zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGxvYWRTZXR0aW5ncygpIHsgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7IH1cclxuICAgIHB1YmxpYyBhc3luYyBzYXZlU2V0dGluZ3MoKSB7IGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7IH1cclxuXHJcblxyXG5cclxuICAgIC8vIFx1NTE3M1x1OTVFRFx1NUVGNlx1NjVGNiBcdThDMDNcdTc1MjhcclxuICAgIHB1YmxpYyBkaXNhYmxlRGVsYXkoKSB7XHJcbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cykuZmlsdGVyKChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHBtLmlkICE9PSB0aGlzLm1hbmlmZXN0LmlkKSBhcyBQbHVnaW5NYW5pZmVzdFtdO1xyXG4gICAgICAgIHRoaXMuc3luY2hyb25pemVQbHVnaW5zKHBsdWdpbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFx1NUYwMFx1NTQyRlx1NUVGNlx1NjVGNiBcdThDMDNcdTc1MjhcclxuICAgIHB1YmxpYyBlbmFibGVEZWxheSgpIHtcclxuICAgICAgICBjb25zdCBwbHVnaW5zID0gT2JqZWN0LnZhbHVlcyh0aGlzLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5maWx0ZXIoKHBtOiBQbHVnaW5NYW5pZmVzdCkgPT4gcG0uaWQgIT09IHRoaXMubWFuaWZlc3QuaWQpIGFzIFBsdWdpbk1hbmlmZXN0W107XHJcbiAgICAgICAgLy8gXHU1NDBDXHU2QjY1XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgdGhpcy5zeW5jaHJvbml6ZVBsdWdpbnMocGx1Z2lucyk7XHJcbiAgICAgICAgLy8gXHU1RjAwXHU1OUNCXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgcGx1Z2lucy5mb3JFYWNoKChwbHVnaW46IFBsdWdpbk1hbmlmZXN0KSA9PiB0aGlzLnN0YXJ0UGx1Z2luV2l0aERlbGF5KHBsdWdpbi5pZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFx1NEUzQVx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNlx1NTQyRlx1NTJBOFx1NUVGNlx1OEZERlxyXG4gICAgcHVibGljIGVuYWJsZURlbGF5c0ZvckFsbFBsdWdpbnMoKSB7XHJcbiAgICAgICAgLy8gXHU4M0I3XHU1M0Q2XHU2MjQwXHU2NzA5XHU2M0QyXHU0RUY2XHJcbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cykuZmlsdGVyKChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHBtLmlkICE9PSB0aGlzLm1hbmlmZXN0LmlkKSBhcyBQbHVnaW5NYW5pZmVzdFtdO1xyXG4gICAgICAgIC8vIFx1NTQwQ1x1NkI2NVx1NjNEMlx1NEVGNlxyXG4gICAgICAgIHRoaXMuc3luY2hyb25pemVQbHVnaW5zKHBsdWdpbnMpO1xyXG4gICAgICAgIHBsdWdpbnMuZm9yRWFjaChhc3luYyAocGx1Z2luOiBQbHVnaW5NYW5pZmVzdCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBcdTYzRDJcdTRFRjZcdTcyQjZcdTYwMDFcclxuICAgICAgICAgICAgY29uc3QgaXNFbmFibGVkID0gdGhpcy5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyhwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICBpZiAoaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAxLiBcdTUxNzNcdTk1RURcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5kaXNhYmxlUGx1Z2luQW5kU2F2ZShwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgLy8gMi4gXHU1RjAwXHU1NDJGXHU2M0QyXHU0RUY2XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAvLyAzLiBcdTUyMDdcdTYzNjJcdTkxNERcdTdGNkVcdTcyQjZcdTYwMDFcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1wID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zLmZpbmQocCA9PiBwLmlkID09PSBwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1wKSBtcC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIDQuIFx1NEZERFx1NUI1OFx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIDEuIFx1NTIwN1x1NjM2Mlx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlxyXG4gICAgICAgICAgICAgICAgY29uc3QgbXAgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuZmluZChwID0+IHAuaWQgPT09IHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXApIG1wLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIDIuIFx1NEZERFx1NUI1OFx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFx1NEUzQVx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNlx1NTE3M1x1OTVFRFx1NUVGNlx1OEZERlxyXG4gICAgcHVibGljIGRpc2FibGVEZWxheXNGb3JBbGxQbHVnaW5zKCkge1xyXG4gICAgICAgIGNvbnN0IHBsdWdpbnMgPSBPYmplY3QudmFsdWVzKHRoaXMuYXBwUGx1Z2lucy5tYW5pZmVzdHMpLmZpbHRlcigocG06IFBsdWdpbk1hbmlmZXN0KSA9PiBwbS5pZCAhPT0gdGhpcy5tYW5pZmVzdC5pZCk7XHJcbiAgICAgICAgcGx1Z2lucy5mb3JFYWNoKGFzeW5jIChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zLmZpbmQocCA9PiBwLmlkID09PSBwbS5pZClcclxuICAgICAgICAgICAgaWYgKHBsdWdpbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsdWdpbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW4ocG0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW5BbmRTYXZlKHBtLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFx1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOFx1NjMwN1x1NUI5QVx1NjNEMlx1NEVGNlxyXG4gICAgcHJpdmF0ZSBzdGFydFBsdWdpbldpdGhEZWxheShpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zLmZpbmQocCA9PiBwLmlkID09PSBpZCk7XHJcbiAgICAgICAgaWYgKHBsdWdpbiAmJiBwbHVnaW4uZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMuc2V0dGluZ3MuREVMQVlTLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBwbHVnaW4uZGVsYXkpO1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lID0gZGVsYXkgPyBkZWxheS50aW1lIDogMDtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKGlkKTtcclxuICAgICAgICAgICAgfSwgdGltZSAqIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBcdTU0MENcdTZCNjVcdTYzRDJcdTRFRjZcdTUyMzBcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcclxuICAgIHB1YmxpYyBzeW5jaHJvbml6ZVBsdWdpbnMocDE6IFBsdWdpbk1hbmlmZXN0W10pIHtcclxuICAgICAgICBjb25zdCBwMiA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucztcclxuICAgICAgICBwMi5mb3JFYWNoKHAySXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcDEuc29tZShwMUl0ZW0gPT4gcDFJdGVtLmlkID09PSBwMkl0ZW0uaWQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLlBsdWdpbnMgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuZmlsdGVyKHBtID0+IHBtLmlkICE9PSBwMkl0ZW0uaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcDEuZm9yRWFjaChwMUl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXAyLnNvbWUocDJJdGVtID0+IHAySXRlbS5pZCA9PT0gcDFJdGVtLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNFbmFibGVkID0gdGhpcy5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyhwMUl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5QbHVnaW5zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6IHAxSXRlbS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6IHAxSXRlbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZXNjJzogcDFJdGVtLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICdncm91cCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0YWdzJzogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2VuYWJsZWQnOiBpc0VuYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RlbGF5JzogJycsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFx1NEZERFx1NUI1OFx1OEJCRVx1N0Y2RVxyXG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU1REU1XHU1MTc3XHU1MUZEXHU2NTcwXHJcbiAgICBwdWJsaWMgY3JlYXRlVGFnKHRleHQ6IHN0cmluZywgY29sb3I6IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdlbmVyYXRlVGFnU3R5bGUoY29sb3IsIHR5cGUpO1xyXG4gICAgICAgIGNvbnN0IHRhZyA9IGNyZWF0ZUVsKCdzcGFuJywge1xyXG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICBjbHM6ICdtYW5hZ2VyLXRhZycsXHJcbiAgICAgICAgICAgIGF0dHI6IHsgJ3N0eWxlJzogc3R5bGUgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZW5lcmF0ZVRhZ1N0eWxlKGNvbG9yOiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzdHlsZTtcclxuICAgICAgICBjb25zdCBbciwgZywgYl0gPSB0aGlzLmhleFRvUmdiQXJyYXkoY29sb3IpO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhJzpcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gYGNvbG9yOiAjZmZmOyBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTsgYm9yZGVyLWNvbG9yOiAke2NvbG9yfTtgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBgY29sb3I6ICR7Y29sb3J9OyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgYm9yZGVyLWNvbG9yOiAke2NvbG9yfTtgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2MnOlxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBgY29sb3I6ICR7Y29sb3J9OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCR7cn0sICR7Z30sICR7Yn0sIDAuMyk7IGJvcmRlci1jb2xvcjogJHtjb2xvcn07YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkJzpcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gYGNvbG9yOiAke2NvbG9yfTsgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmFkanVzdENvbG9yQnJpZ2h0bmVzcyhjb2xvciwgNTApfTsgYm9yZGVyLWNvbG9yOiAke3RoaXMuYWRqdXN0Q29sb3JCcmlnaHRuZXNzKGNvbG9yLCA1MCl9O2A7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gYGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O2JvcmRlci1zdHlsZTogZGFzaGVkO2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBoZXhUb1JnYkFycmF5KGhleDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcmdiID0gcGFyc2VJbnQoaGV4LnNsaWNlKDEpLCAxNik7XHJcbiAgICAgICAgY29uc3QgciA9IChyZ2IgPj4gMTYpO1xyXG4gICAgICAgIGNvbnN0IGcgPSAoKHJnYiA+PiA4KSAmIDB4MDBGRik7XHJcbiAgICAgICAgY29uc3QgYiA9IChyZ2IgJiAweDAwMDBGRik7XHJcbiAgICAgICAgcmV0dXJuIFtyLCBnLCBiXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGp1c3RDb2xvckJyaWdodG5lc3MoaGV4OiBzdHJpbmcsIGFtb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcmdiID0gcGFyc2VJbnQoaGV4LnNsaWNlKDEpLCAxNik7XHJcbiAgICAgICAgY29uc3QgciA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgKChyZ2IgPj4gMTYpICYgMHhGRikgKyBhbW91bnQpKTtcclxuICAgICAgICBjb25zdCBnID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCAoKHJnYiA+PiA4KSAmIDB4RkYpICsgYW1vdW50KSk7XHJcbiAgICAgICAgY29uc3QgYiA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgKHJnYiAmIDB4RkYpICsgYW1vdW50KSk7XHJcbiAgICAgICAgcmV0dXJuIGAjJHsoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSkudG9VcHBlckNhc2UoKX1gO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCAiaW1wb3J0IHsgRGVsYXksIE1hbmFnZXJQbHVnaW4sIFRhZywgVHlwZSB9IGZyb20gJy4uL2RhdGEvdHlwZXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYW5hZ2VyU2V0dGluZ3Mge1xyXG5cdC8vIFx1N0I1Qlx1OTAwOVxyXG5cdFBFUlNJU1RFTkNFOiBib29sZWFuO1xyXG5cdEZJTFRFUl9UQUc6IHN0cmluZztcclxuXHRGSUxURVJfR1JPVVA6IHN0cmluZztcclxuXHRGSUxURVJfREVMQVk6IHN0cmluZztcclxuXHJcblx0TEFOR1VBR0U6IHN0cmluZztcclxuXHRDRU5URVI6IGJvb2xlYW47XHJcblx0SVRFTV9TVFlMRTogc3RyaW5nO1xyXG5cdEdST1VQX1NUWUxFOiBzdHJpbmc7XHJcblx0VEFHX1NUWUxFOiBzdHJpbmc7XHJcblx0REVMQVk6IGJvb2xlYW47XHJcblx0RkFERV9PVVRfRElTQUJMRURfUExVR0lOUzogYm9vbGVhbjtcclxuXHRDT01NQU5EX0lURU06IGJvb2xlYW47XHJcblx0Q09NTUFORF9HUk9VUDogYm9vbGVhbjtcclxuXHRHUk9VUFM6IFR5cGVbXTtcclxuXHRUQUdTOiBUYWdbXTtcclxuXHRERUxBWVM6IERlbGF5W107XHJcblx0UGx1Z2luczogTWFuYWdlclBsdWdpbltdO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogTWFuYWdlclNldHRpbmdzID0ge1xyXG5cdFBFUlNJU1RFTkNFOiBmYWxzZSxcclxuXHQvLyBcdTdCNUJcdTkwMDlcclxuXHRGSUxURVJfVEFHOiBcIlwiLFxyXG5cdEZJTFRFUl9HUk9VUDogXCJcIixcclxuXHRGSUxURVJfREVMQVk6IFwiXCIsXHJcblxyXG5cdExBTkdVQUdFOiBcInpoLWNuXCIsXHJcblx0Q0VOVEVSOiBmYWxzZSxcclxuXHRJVEVNX1NUWUxFOiBcImFsd2F5c0V4cGFuZFwiLFxyXG5cdEdST1VQX1NUWUxFOiBcImFcIixcclxuXHRUQUdfU1RZTEU6IFwiYlwiLFxyXG5cdERFTEFZOiBmYWxzZSxcclxuXHRGQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TOiB0cnVlLFxyXG5cdENPTU1BTkRfSVRFTTogZmFsc2UsXHJcblx0Q09NTUFORF9HUk9VUDogZmFsc2UsXHJcblx0R1JPVVBTOiBbXHJcblx0XHR7XHJcblx0XHRcdFwiaWRcIjogXCJkZWZhdWx0XCIsXHJcblx0XHRcdFwibmFtZVwiOiBcIlx1OUVEOFx1OEJBNFx1N0VDNFwiLFxyXG5cdFx0XHRcImNvbG9yXCI6IFwiI0EwNzlGRlwiXHJcblx0XHR9LFxyXG5cdF0sXHJcblx0VEFHUzogW1xyXG5cdFx0e1xyXG5cdFx0XHRcImlkXCI6IFwiZGVmYXVsdFwiLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJcdTlFRDhcdThCQTRcdTY4MDdcdTdCN0VcIixcclxuXHRcdFx0XCJjb2xvclwiOiBcIiNBMDc5RkZcIlxyXG5cdFx0fSxcclxuXHRdLFxyXG5cdERFTEFZUzogW1xyXG5cdFx0e1xyXG5cdFx0XHRcImlkXCI6IFwiZGVmYXVsdFwiLFxyXG5cdFx0XHRcIm5hbWVcIjogXCJcdTlFRDhcdThCQTRcdTVFRjZcdThGREZcIixcclxuXHRcdFx0XCJ0aW1lXCI6IDEwXHJcblx0XHR9LFxyXG5cdF0sXHJcblx0UGx1Z2luczogW10sXHJcbn1cclxuIiwgImltcG9ydCB7IEFwcCwgUGx1Z2luU2V0dGluZ1RhYiB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4uL21haW5cIjtcclxuXHJcbmltcG9ydCBNYW5hZ2VyQmFzaXMgZnJvbSAnLi91aS9tYW5hZ2VyLWJhc2lzJztcclxuaW1wb3J0IE1hbmFnZXJEZWxheSBmcm9tICcuL3VpL21hbmFnZXItZGVsYXknO1xyXG5cclxuY2xhc3MgTWFuYWdlclNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHRtYW5hZ2VyOiBNYW5hZ2VyO1xyXG5cdGFwcDogQXBwO1xyXG5cdGNvbnRlbnRFbDogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBtYW5hZ2VyOiBNYW5hZ2VyKSB7XHJcblx0XHRzdXBlcihhcHAsIG1hbmFnZXIpO1xyXG5cdFx0dGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcclxuXHRcdHRoaXMuYXBwID0gYXBwO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheSgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XHJcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cdFx0Y29udGFpbmVyRWwuYWRkQ2xhc3MoJ21hbmFnZXItc2V0dGluZ19fY29udGFpbmVyJyk7XHJcblx0XHRjb25zdCB0YWJzRWwgPSB0aGlzLmNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnKTtcclxuXHRcdHRhYnNFbC5hZGRDbGFzcygnbWFuYWdlci1zZXR0aW5nX190YWJzJyk7XHJcblx0XHR0aGlzLmNvbnRlbnRFbCA9IHRoaXMuY29udGFpbmVyRWwuY3JlYXRlRWwoJ2RpdicpO1xyXG5cdFx0dGhpcy5jb250ZW50RWwuYWRkQ2xhc3MoJ21hbmFnZXItc2V0dGluZ19fY29udGVudCcpO1xyXG5cclxuXHRcdGNvbnN0IHRhYkl0ZW1zID0gW1xyXG5cdFx0XHR7IHRleHQ6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwJyksIGNvbnRlbnQ6ICgpID0+IHRoaXMuYmFzaXNEaXNwbGF5KCkgfSxcclxuXHRcdFx0eyB0ZXh0OiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMCcpLCBjb250ZW50OiAoKSA9PiB0aGlzLmRlbGF5RGlzcGxheSgpIH0sXHJcblx0XHRdO1xyXG5cdFx0Y29uc3QgdGFiSXRlbXNFbHM6IEhUTUxEaXZFbGVtZW50W10gPSBbXTtcclxuXHJcblx0XHR0YWJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRjb25zdCBpdGVtRWwgPSB0YWJzRWwuY3JlYXRlRWwoJ2RpdicpO1xyXG5cdFx0XHRpdGVtRWwuYWRkQ2xhc3MoJ21hbmFnZXItc2V0dGluZ19fdGFicy1pdGVtJyk7XHJcblx0XHRcdGl0ZW1FbC50ZXh0Q29udGVudCA9IGl0ZW0udGV4dDtcclxuXHRcdFx0dGFiSXRlbXNFbHMucHVzaChpdGVtRWwpO1xyXG5cdFx0XHRpZiAoaW5kZXggPT09IDApIHsgaXRlbUVsLmFkZENsYXNzKCdtYW5hZ2VyLXNldHRpbmdfX3RhYnMtaXRlbV9pcy1hY3RpdmUnKTsgaXRlbS5jb250ZW50KCk7IH1cclxuXHRcdFx0aXRlbUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdHRhYkl0ZW1zRWxzLmZvckVhY2godGFiRWwgPT4geyB0YWJFbC5yZW1vdmVDbGFzcygnbWFuYWdlci1zZXR0aW5nX190YWJzLWl0ZW1faXMtYWN0aXZlJykgfSk7XHJcblx0XHRcdFx0aXRlbUVsLmFkZENsYXNzKCdtYW5hZ2VyLXNldHRpbmdfX3RhYnMtaXRlbV9pcy1hY3RpdmUnKTtcclxuXHRcdFx0XHRpdGVtLmNvbnRlbnQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0YmFzaXNEaXNwbGF5KCkgeyB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpOyBuZXcgTWFuYWdlckJhc2lzKHRoaXMpLmRpc3BsYXkoKTsgfVxyXG5cdGRlbGF5RGlzcGxheSgpIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgbmV3IE1hbmFnZXJEZWxheSh0aGlzKS5kaXNwbGF5KCk7IH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWFuYWdlclNldHRpbmdUYWIgfTtcclxuXHJcbiIsICJpbXBvcnQgTWFuYWdlciBmcm9tICdzcmMvbWFpbic7XHJcbmltcG9ydCB7IE1hbmFnZXJTZXR0aW5nVGFiIH0gZnJvbSAnLic7XHJcbmltcG9ydCB7IE1hbmFnZXJTZXR0aW5ncyB9IGZyb20gJy4vZGF0YSc7XHJcbmltcG9ydCB7IEFwcCB9IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VTZXR0aW5nIHtcclxuXHRwcm90ZWN0ZWQgc2V0dGluZ1RhYjogTWFuYWdlclNldHRpbmdUYWI7XHJcblx0cHJvdGVjdGVkIG1hbmFnZXI6IE1hbmFnZXI7XHJcblx0cHJvdGVjdGVkIHNldHRpbmdzOiBNYW5hZ2VyU2V0dGluZ3M7XHJcblx0cHVibGljIGNvbnRhaW5lckVsOiBIVE1MRWxlbWVudDtcclxuXHRwcm90ZWN0ZWQgYXBwOiBBcHA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9iajogTWFuYWdlclNldHRpbmdUYWIpIHtcclxuXHRcdHRoaXMuc2V0dGluZ1RhYiA9IG9iajtcclxuXHRcdHRoaXMubWFuYWdlciA9IG9iai5tYW5hZ2VyO1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IG9iai5tYW5hZ2VyLnNldHRpbmdzO1xyXG5cdFx0dGhpcy5jb250YWluZXJFbCA9IG9iai5jb250ZW50RWw7XHJcblx0XHR0aGlzLmFwcCA9IG9iai5hcHA7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWJzdHJhY3QgbWFpbigpOiB2b2lkO1xyXG5cdHB1YmxpYyBkaXNwbGF5KCk6IHZvaWQgeyB0aGlzLm1haW4oKSB9XHJcbn0iLCAiaW1wb3J0IEJhc2VTZXR0aW5nIGZyb20gXCIuLi9iYXNlLXNldHRpbmdcIjtcclxuaW1wb3J0IHsgRHJvcGRvd25Db21wb25lbnQsIFNldHRpbmcsIFRvZ2dsZUNvbXBvbmVudCB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgQ29tbWFuZHMgZnJvbSBcInNyYy9jb21tYW5kXCI7XHJcbi8vIGltcG9ydCB7IEdST1VQX1NUWUxFLCBJVEVNX1NUWUxFLCBUQUdfU1RZTEUgfSBmcm9tIFwic3JjL2RhdGEvZGF0YVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFuYWdlckJhc2lzIGV4dGVuZHMgQmFzZVNldHRpbmcge1xyXG4gICAgcHJpdmF0ZSBJVEVNX1NUWUxFID0ge1xyXG4gICAgICAgICdhbHdheXNFeHBhbmQnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTAwJyksXHJcbiAgICAgICAgJ25ldmVyRXhwYW5kJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QycpLFxyXG4gICAgICAgICdob3ZlckV4cGFuZCc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDknKSxcclxuICAgICAgICAnY2xpY2tFeHBhbmQnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCJyksXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIEdST1VQX1NUWUxFID0ge1xyXG4gICAgICAgICdhJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMCcpLFxyXG4gICAgICAgICdiJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QycpLFxyXG4gICAgICAgICdjJzogdGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwOScpLCBcclxuICAgICAgICAnZCc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTU2REInKVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBUQUdfU1RZTEUgPSB7XHJcbiAgICAgICAgJ2EnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTAwJyksXHJcbiAgICAgICAgJ2InOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RThDJyksXHJcbiAgICAgICAgJ2MnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5JyksXHJcbiAgICAgICAgJ2QnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCJylcclxuICAgIH1cclxuXHJcblxyXG4gICAgbWFpbigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsYW5ndWFnZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudChsYW5ndWFnZUJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIGxhbmd1YWdlRHJvcGRvd24uYWRkT3B0aW9ucyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci5sYW5ndWFnZSk7XHJcbiAgICAgICAgbGFuZ3VhZ2VEcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLkxBTkdVQUdFKTtcclxuICAgICAgICBsYW5ndWFnZURyb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLkxBTkdVQUdFID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nVGFiLmJhc2lzRGlzcGxheSgpO1xyXG4gICAgICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgdG9wQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc1NENcdTk3NjJcdTVDNDVcdTRFMkRfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NTRDXHU5NzYyXHU1QzQ1XHU0RTJEX1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBjb25zdCB0b3BUb2dnbGUgPSBuZXcgVG9nZ2xlQ29tcG9uZW50KHRvcEJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIHRvcFRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLkNFTlRFUik7XHJcbiAgICAgICAgdG9wVG9nZ2xlLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLkNFTlRFUiA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFxyXG4gICAgICAgIGNvbnN0IHBlcnNpc3RlbmNlQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTdCNUJcdTkwMDlcdTYzMDFcdTRFNDVcdTUzMTZfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3QjVCXHU5MDA5XHU2MzAxXHU0RTQ1XHU1MzE2X1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBjb25zdCBwZXJzaXN0ZW5jZVRvZ2dsZSA9IG5ldyBUb2dnbGVDb21wb25lbnQocGVyc2lzdGVuY2VCYXIuY29udHJvbEVsKTtcclxuICAgICAgICBwZXJzaXN0ZW5jZVRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFKTtcclxuICAgICAgICBwZXJzaXN0ZW5jZVRvZ2dsZS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBpdGVtU3R5bGVCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1TdHlsZURyb3Bkb3duID0gbmV3IERyb3Bkb3duQ29tcG9uZW50KGl0ZW1TdHlsZUJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIGl0ZW1TdHlsZURyb3Bkb3duLmFkZE9wdGlvbnModGhpcy5JVEVNX1NUWUxFKTtcclxuICAgICAgICBpdGVtU3R5bGVEcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLklURU1fU1RZTEUpO1xyXG4gICAgICAgIGl0ZW1TdHlsZURyb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLklURU1fU1RZTEUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBncm91cFN0eWxlQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBjb25zdCBncm91cFN0eWxlRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQoZ3JvdXBTdHlsZUJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIGdyb3VwU3R5bGVEcm9wZG93bi5hZGRPcHRpb25zKHRoaXMuR1JPVVBfU1RZTEUpO1xyXG4gICAgICAgIGdyb3VwU3R5bGVEcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLkdST1VQX1NUWUxFKTtcclxuICAgICAgICBncm91cFN0eWxlRHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuR1JPVVBfU1RZTEUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB0YWdTdHlsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgdGFnU3R5bGVEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudCh0YWdTdHlsZUJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIHRhZ1N0eWxlRHJvcGRvd24uYWRkT3B0aW9ucyh0aGlzLlRBR19TVFlMRSk7XHJcbiAgICAgICAgdGFnU3R5bGVEcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLlRBR19TVFlMRSk7XHJcbiAgICAgICAgdGFnU3R5bGVEcm9wZG93bi5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5UQUdfU1RZTEUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBEZWxheUJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgRGVsYXlUb2dnbGUgPSBuZXcgVG9nZ2xlQ29tcG9uZW50KERlbGF5QmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgRGVsYXlUb2dnbGUuc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5ERUxBWSk7XHJcbiAgICAgICAgRGVsYXlUb2dnbGUub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuREVMQVkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB2YWx1ZSA/IHRoaXMubWFuYWdlci5lbmFibGVEZWxheXNGb3JBbGxQbHVnaW5zKCkgOiB0aGlzLm1hbmFnZXIuZGlzYWJsZURlbGF5c0ZvckFsbFBsdWdpbnMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZmFkZU91dERpc2FibGVkUGx1Z2luc0JhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgZmFkZU91dERpc2FibGVkUGx1Z2luc1RvZ2dsZSA9IG5ldyBUb2dnbGVDb21wb25lbnQoZmFkZU91dERpc2FibGVkUGx1Z2luc0Jhci5jb250cm9sRWwpO1xyXG4gICAgICAgIGZhZGVPdXREaXNhYmxlZFBsdWdpbnNUb2dnbGUuc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5GQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TKTtcclxuICAgICAgICBmYWRlT3V0RGlzYWJsZWRQbHVnaW5zVG9nZ2xlLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLkZBREVfT1VUX0RJU0FCTEVEX1BMVUdJTlMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBDb21tYW5kSXRlbUJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5OCcpKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgY29uc3QgQ29tbWFuZEl0ZW1Ub2dnbGUgPSBuZXcgVG9nZ2xlQ29tcG9uZW50KENvbW1hbmRJdGVtQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgQ29tbWFuZEl0ZW1Ub2dnbGUuc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5DT01NQU5EX0lURU0pO1xyXG4gICAgICAgIENvbW1hbmRJdGVtVG9nZ2xlLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLkNPTU1BTkRfSVRFTSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBDb21tYW5kR3JvdXBCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTgnKSlcclxuICAgICAgICAgICAgLnNldERlc2ModGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIGNvbnN0IENvbW1hbmRHcm91cFRvZ2dsZSA9IG5ldyBUb2dnbGVDb21wb25lbnQoQ29tbWFuZEdyb3VwQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgQ29tbWFuZEdyb3VwVG9nZ2xlLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuQ09NTUFORF9HUk9VUCk7XHJcbiAgICAgICAgQ29tbWFuZEdyb3VwVG9nZ2xlLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLkNPTU1BTkRfR1JPVVAgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2ODA3XHU5ODk4JykpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjNDRlx1OEZGMCcpKTtcclxuICAgIH1cclxufSIsICJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBBcHAsIEJ1dHRvbkNvbXBvbmVudCwgRHJvcGRvd25Db21wb25lbnQsIEV4dHJhQnV0dG9uQ29tcG9uZW50LCBNb2RhbCwgTm90aWNlLCBQbHVnaW5NYW5pZmVzdCwgU2VhcmNoQ29tcG9uZW50LCBTZXR0aW5nLCBUb2dnbGVDb21wb25lbnQgfSBmcm9tICdvYnNpZGlhbic7XHJcblxyXG5pbXBvcnQgeyBNYW5hZ2VyU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy9kYXRhJztcclxuaW1wb3J0IHsgbWFuYWdlck9wZW4gfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdtYWluJztcclxuaW1wb3J0IHsgR3JvdXBNb2RhbCB9IGZyb20gJy4vZ3JvdXAtbW9kYWwnO1xyXG5pbXBvcnQgeyBUYWdzTW9kYWwgfSBmcm9tICcuL3RhZ3MtbW9kYWwnO1xyXG5pbXBvcnQgeyBEZWxldGVNb2RhbCB9IGZyb20gJy4vZGVsZXRlLW1vZGFsJztcclxuaW1wb3J0IENvbW1hbmRzIGZyb20gJ3NyYy9jb21tYW5kJztcclxuaW1wb3J0IHsgRGlzYWJsZU1vZGFsIH0gZnJvbSAnLi9kaXNhYmxlLW1vZGFsJztcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyAgICAgICAgICBcdTRGQTdcdThGQjlcdTY4MEYgXHU1QkY5XHU4QkREXHU2ODQ2IFx1N0ZGQlx1OEJEMVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuZXhwb3J0IGNsYXNzIE1hbmFnZXJNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuICAgIG1hbmFnZXI6IE1hbmFnZXI7XHJcbiAgICBzZXR0aW5nczogTWFuYWdlclNldHRpbmdzO1xyXG4gICAgLy8gdGhpcy5hcHAucGx1Z2luc1xyXG4gICAgYXBwUGx1Z2lucztcclxuICAgIC8vIHRoaXMuYXBwLnNldHRpbmdzXHJcbiAgICBhcHBTZXR0aW5nO1xyXG4gICAgLy8gW1x1NjcyQ1x1NTczMF1bXHU1M0Q4XHU5MUNGXSBcdTYzRDJcdTRFRjZcdThERUZcdTVGODRcclxuICAgIGJhc2VQYXRoOiBzdHJpbmc7XHJcbiAgICAvLyBbXHU2NzJDXHU1NzMwXVtcdTUzRDhcdTkxQ0ZdIFx1NUM1NVx1NzkzQVx1NjNEMlx1NEVGNlx1NTIxN1x1ODg2OFxyXG4gICAgZGlzcGxheVBsdWdpbnM6IFBsdWdpbk1hbmlmZXN0W10gPSBbXTtcclxuXHJcbiAgICAvLyBcdTUyMDZcdTdFQzRcdTUxODVcdTVCQjlcclxuICAgIGdyb3VwID0gJyc7XHJcbiAgICAvLyBcdTY4MDdcdTdCN0VcdTUxODVcdTVCQjlcclxuICAgIHRhZyA9ICcnO1xyXG4gICAgLy8gXHU2ODA3XHU3QjdFXHU1MTg1XHU1QkI5XHJcbiAgICBkZWxheSA9ICcnO1xyXG5cclxuICAgIC8vIFx1NjcyQVx1NTIwNlx1N0VDNFxyXG4gICAgbm9Hcm91cCA9IGZhbHNlO1xyXG4gICAgLy8gXHU2NDFDXHU3RDIyXHU1MTg1XHU1QkI5XHJcbiAgICBzZWFyY2hUZXh0ID0gJyc7XHJcbiAgICAvLyBcdTRFQzVcdTU0MkZcdTc1MjhcclxuICAgIG9ubHlFbmFibGVkID0gZmFsc2U7XHJcbiAgICAvLyBcdTdGMTZcdThGOTFcdTZBMjFcdTVGMEZcclxuICAgIGVkaXRvck1vZGUgPSBmYWxzZTtcclxuICAgIC8vIFx1NkQ0Qlx1OEJENVx1NkEyMVx1NUYwRlxyXG4gICAgZGV2ZWxvcGVyTW9kZSA9IGZhbHNlO1xyXG5cclxuICAgIHNlYXJjaEVsOiBTZWFyY2hDb21wb25lbnQ7XHJcbiAgICBmb290RWw6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBtYW5hZ2VyOiBNYW5hZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlIFxyXG4gICAgICAgIHRoaXMuYXBwU2V0dGluZyA9IHRoaXMuYXBwLnNldHRpbmc7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuYXBwUGx1Z2lucyA9IHRoaXMuYXBwLnBsdWdpbnM7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gbWFuYWdlci5zZXR0aW5ncztcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5iYXNlUGF0aCA9IHBhdGgubm9ybWFsaXplKHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuZ2V0QmFzZVBhdGgoKSk7XHJcbiAgICAgICAgLy8gXHU5OTk2XHU2QjIxXHU1NDJGXHU1MkE4XHU4RkQwXHU4ODRDXHU0RTBCIFx1OTA3Rlx1NTE0RFx1NjcwOVx1NjVCMFx1NTJBMFx1NTE2NVx1NzY4NFx1NjNEMlx1NEVGNlxyXG4gICAgICAgIG1hbmFnZXIuc3luY2hyb25pemVQbHVnaW5zKE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cykuZmlsdGVyKChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHBtLmlkICE9PSBtYW5hZ2VyLm1hbmlmZXN0LmlkKSBhcyBQbHVnaW5NYW5pZmVzdFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2hvd0hlYWQoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgbW9kYWxFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIG1vZGFsRWwuYWRkQ2xhc3MoJ21hbmFnZXItY29udGFpbmVyJyk7XHJcbiAgICAgICAgLy8gXHU5NzYwXHU0RTBBXHJcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLkNFTlRFUikgbW9kYWxFbC5hZGRDbGFzcygnbWFuYWdlci1jb250YWluZXJfX3RvcCcpO1xyXG5cclxuICAgICAgICBtb2RhbEVsLnJlbW92ZUNoaWxkKG1vZGFsRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UtYnV0dG9uJylbMF0pO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbC5wYXJlbnRFbGVtZW50Py5hZGRDbGFzcygnbWFuYWdlci1jb250YWluZXJfX2hlYWRlcicpO1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmFkZENsYXNzKCdtYW5hZ2VyLWl0ZW0tY29udGFpbmVyJyk7XHJcbiAgICAgICAgLy8gXHU2REZCXHU1MkEwXHU5ODc1XHU1QzNFXHJcbiAgICAgICAgdGhpcy5mb290RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRoaXMuZm9vdEVsLmFkZENsYXNzKCdtYW5hZ2VyLWZvb2QnKTtcclxuICAgICAgICB0aGlzLm1vZGFsRWwuYXBwZW5kQ2hpbGQodGhpcy5mb290RWwpO1xyXG5cclxuICAgICAgICAvLyBbXHU2NENEXHU0RjVDXHU4ODRDXVxyXG4gICAgICAgIGNvbnN0IGFjdGlvbkJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbCkuc2V0Q2xhc3MoJ21hbmFnZXItYmFyX19hY3Rpb24nKS5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDJykpO1xyXG5cclxuICAgICAgICAvLyBbXHU2NENEXHU0RjVDXHU4ODRDXSBHaXRodWJcclxuICAgICAgICBjb25zdCBnaXRodWJCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpO1xyXG4gICAgICAgIGdpdGh1YkJ1dHRvbi5zZXRJY29uKCdnaXRodWInKTtcclxuICAgICAgICBnaXRodWJCdXR0b24uc2V0VG9vbHRpcCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICBnaXRodWJCdXR0b24ub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHRoaXMubWFuYWdlci5tYW5pZmVzdC5hdXRob3JVcmwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFtcdTY0Q0RcdTRGNUNcdTg4NENdIEdpdGh1YlxyXG4gICAgICAgIGNvbnN0IHR1dG9yaWFsQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0dXRvcmlhbEJ1dHRvbi5zZXRJY29uKCdib29rLW9wZW4nKTtcclxuICAgICAgICB0dXRvcmlhbEJ1dHRvbi5zZXRUb29sdGlwKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1N0JBMVx1NzQwNlx1NTY2OF9cdTg5QzZcdTk4OTFcdTY1NTlcdTdBMEJfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIHR1dG9yaWFsQnV0dG9uLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL0JWMVd5cmtZTUVjZS8nKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU5MUNEXHU4RjdEXHU2M0QyXHU0RUY2XHJcbiAgICAgICAgY29uc3QgcmVsb2FkQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKTtcclxuICAgICAgICByZWxvYWRCdXR0b24uc2V0SWNvbigncmVmcmVzaC1jY3cnKTtcclxuICAgICAgICByZWxvYWRCdXR0b24uc2V0VG9vbHRpcCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTdCQTFcdTc0MDZcdTU2NjhfXHU5MUNEXHU4RjdEXHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMCcpKTtcclxuICAgICAgICByZWxvYWRCdXR0b24ub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoJ1x1OTFDRFx1NjVCMFx1NTJBMFx1OEY3RFx1N0IyQ1x1NEUwOVx1NjVCOVx1NjNEMlx1NEVGNicpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMubG9hZE1hbmlmZXN0cygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY0Q0RcdTRGNUNcdTg4NENdIFx1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMFxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZUJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgdXBkYXRlQnV0dG9uLnNldEljb24oJ3JzcycpO1xyXG4gICAgICAgIHVwZGF0ZUJ1dHRvbi5zZXRUb29sdGlwKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjBfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIHVwZGF0ZUJ1dHRvbi5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5jaGVja0ZvclVwZGF0ZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwU2V0dGluZy5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcFNldHRpbmcub3BlblRhYkJ5SWQoJ2NvbW11bml0eS1wbHVnaW5zJyk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdcdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjBcdTY1RjZcdTUxRkFcdTk1MTk6JywgZXJyb3IpOyAgLy8gXHU1OTA0XHU3NDA2XHU1M0VGXHU4MEZEXHU1MUZBXHU3M0IwXHU3Njg0XHU5NTE5XHU4QkVGXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4XHJcbiAgICAgICAgY29uc3QgZGlzYWJsZUJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWN0aW9uQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgZGlzYWJsZUJ1dHRvbi5zZXRJY29uKCdzcXVhcmUnKTtcclxuICAgICAgICBkaXNhYmxlQnV0dG9uLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgZGlzYWJsZUJ1dHRvbi5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgbmV3IERpc2FibGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLmRpc3BsYXlQbHVnaW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuREVMQVkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgTWFuYWdlclBsdWdpbiA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5maW5kKHAgPT4gcC5pZCA9PT0gcGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hbmFnZXJQbHVnaW4gJiYgTWFuYWdlclBsdWdpbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyhwbHVnaW4uaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbkFuZFNhdmUocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkub3BlbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBbXHU2NENEXHU0RjVDXHU4ODRDXSBcdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhcclxuICAgICAgICBjb25zdCBlbmFibGVCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpXHJcbiAgICAgICAgZW5hYmxlQnV0dG9uLnNldEljb24oJ3NxdWFyZS1jaGVjaycpXHJcbiAgICAgICAgZW5hYmxlQnV0dG9uLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjAnKSlcclxuICAgICAgICBlbmFibGVCdXR0b24ub25DbGljayhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBEaXNhYmxlTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5kaXNwbGF5UGx1Z2lucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IE1hbmFnZXJQbHVnaW4gPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuUGx1Z2lucy5maW5kKG1wID0+IG1wLmlkID09PSBwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWFuYWdlclBsdWdpbiAmJiAhTWFuYWdlclBsdWdpbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyUGx1Z2luLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFwcFBsdWdpbnMuZW5hYmxlZFBsdWdpbnMuaGFzKHBsdWdpbi5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLm9wZW4oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGXHJcbiAgICAgICAgY29uc3QgZWRpdG9yQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKVxyXG4gICAgICAgIHRoaXMuZWRpdG9yTW9kZSA/IGVkaXRvckJ1dHRvbi5zZXRJY29uKCdwZW4tb2ZmJykgOiBlZGl0b3JCdXR0b24uc2V0SWNvbigncGVuJyk7XHJcbiAgICAgICAgZWRpdG9yQnV0dG9uLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU3QkExXHU3NDA2XHU1NjY4X1x1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRl9cdTYzQ0ZcdThGRjAnKSlcclxuICAgICAgICBlZGl0b3JCdXR0b24ub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yTW9kZSA9ICF0aGlzLmVkaXRvck1vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yTW9kZSA/IGVkaXRvckJ1dHRvbi5zZXRJY29uKCdwZW4tb2ZmJykgOiBlZGl0b3JCdXR0b24uc2V0SWNvbigncGVuJyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjRDRFx1NEY1Q1x1ODg0Q10gXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFXHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGFjdGlvbkJhci5jb250cm9sRWwpXHJcbiAgICAgICAgc2V0dGluZ3NCdXR0b24uc2V0SWNvbignc2V0dGluZ3MnKVxyXG4gICAgICAgIHNldHRpbmdzQnV0dG9uLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjAnKSlcclxuICAgICAgICBzZXR0aW5nc0J1dHRvbi5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcHBTZXR0aW5nLm9wZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5hcHBTZXR0aW5nLm9wZW5UYWJCeUlkKHRoaXMubWFuYWdlci5tYW5pZmVzdC5pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NkQ0Qlx1OEJENVx1ODg0Q10gXHU1MjM3XHU2NUIwXHU2M0QyXHU0RUY2XHJcbiAgICAgICAgaWYgKHRoaXMuZGV2ZWxvcGVyTW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZXN0QnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChhY3Rpb25CYXIuY29udHJvbEVsKVxyXG4gICAgICAgICAgICB0ZXN0QnV0dG9uLnNldEljb24oJ3JlZnJlc2gtY2N3JylcclxuICAgICAgICAgICAgdGVzdEJ1dHRvbi5zZXRUb29sdGlwKCdcdTUyMzdcdTY1QjBcdTYzRDJcdTRFRjYnKVxyXG4gICAgICAgICAgICB0ZXN0QnV0dG9uLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW4odGhpcy5tYW5hZ2VyLm1hbmlmZXN0LmlkKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW4odGhpcy5tYW5hZ2VyLm1hbmlmZXN0LmlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXHU4ODRDXSBcclxuICAgICAgICBjb25zdCBzZWFyY2hCYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpLnNldENsYXNzKCdtYW5hZ2VyLWJhcl9fc2VhcmNoJykuc2V0TmFtZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU2NDFDXHU3RDIyX1x1NjU4N1x1NjcyQycpKTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU2NzJBXHU1MjA2XHU3RUM0XHJcbiAgICAgICAgY29uc3Qgbm9Hcm91cEJhciA9IG5ldyBCdXR0b25Db21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCkuc2V0SWNvbignZ3JvdXAnKTtcclxuICAgICAgICBub0dyb3VwQmFyLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU3QkExXHU3NDA2XHU1NjY4X1x1NjcyQVx1NTIwNlx1N0VDNF9cdTYzQ0ZcdThGRjAnKSk7XHJcbiAgICAgICAgbm9Hcm91cEJhci5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub0dyb3VwID0gIXRoaXMubm9Hcm91cDtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXHU4ODRDXSBcdTRFQzVcdTU0MkZcdTc1MjhcclxuICAgICAgICBjb25zdCBvbmx5RW5hYmxlZCA9IG5ldyBCdXR0b25Db21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgdGhpcy5vbmx5RW5hYmxlZCA/IG9ubHlFbmFibGVkLnNldEljb24oJ3RvZ2dsZS1yaWdodCcpIDogb25seUVuYWJsZWQuc2V0SWNvbigndG9nZ2xlLWxlZnQnKTtcclxuICAgICAgICBvbmx5RW5hYmxlZC5zZXRUb29sdGlwKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1N0JBMVx1NzQwNlx1NTY2OF9cdTRFQzVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwJykpO1xyXG4gICAgICAgIG9ubHlFbmFibGVkLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9ubHlFbmFibGVkID0gIXRoaXMub25seUVuYWJsZWQ7XHJcbiAgICAgICAgICAgIHRoaXMub25seUVuYWJsZWQgPyBvbmx5RW5hYmxlZC5zZXRJY29uKCd0b2dnbGUtcmlnaHQnKSA6IG9ubHlFbmFibGVkLnNldEljb24oJ3RvZ2dsZS1sZWZ0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjQxQ1x1N0QyMlx1ODg0Q10gXHU1MjA2XHU3RUM0XHU5MDA5XHU2MkU5XHU1MjE3XHU4ODY4XHJcbiAgICAgICAgY29uc3QgZ3JvdXBDb3VudHMgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMucmVkdWNlKChhY2M6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0sIHBsdWdpbikgPT4geyBjb25zdCBncm91cElkID0gcGx1Z2luLmdyb3VwIHx8ICcnOyBhY2NbZ3JvdXBJZF0gPSAoYWNjW2dyb3VwSWRdIHx8IDApICsgMTsgcmV0dXJuIGFjYzsgfSwgeyAnJzogMCB9KTtcclxuICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLnNldHRpbmdzLkdST1VQUy5yZWR1Y2UoKGFjYzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgaXRlbSkgPT4geyBhY2NbaXRlbS5pZF0gPSBgJHtpdGVtLm5hbWV9ICgke2dyb3VwQ291bnRzW2l0ZW0uaWRdIHx8IDB9KWA7IHJldHVybiBhY2M7IH0sIHsgJyc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTY1RTBcdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDJykgfSk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBzRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQoc2VhcmNoQmFyLmNvbnRyb2xFbCk7XHJcbiAgICAgICAgZ3JvdXBzRHJvcGRvd24uYWRkT3B0aW9ucyhncm91cHMpO1xyXG4gICAgICAgIGdyb3Vwc0Ryb3Bkb3duLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuUEVSU0lTVEVOQ0UgPyB0aGlzLnNldHRpbmdzLkZJTFRFUl9HUk9VUCA6IHRoaXMuZ3JvdXApO1xyXG4gICAgICAgIGdyb3Vwc0Ryb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5GSUxURVJfR1JPVVAgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY0MUNcdTdEMjJcdTg4NENdIFx1NjgwN1x1N0I3RVx1OTAwOVx1NjJFOVx1NTIxN1x1ODg2OFxyXG4gICAgICAgIGNvbnN0IHRhZ0NvdW50czogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5yZWR1Y2UoKGFjYywgcGx1Z2luKSA9PiB7IHBsdWdpbi50YWdzLmZvckVhY2godGFnID0+IHsgYWNjW3RhZ10gPSAoYWNjW3RhZ10gfHwgMCkgKyAxOyB9KTsgcmV0dXJuIGFjYzsgfSwge30gYXMgeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSk7XHJcbiAgICAgICAgY29uc3QgdGFncyA9IHRoaXMuc2V0dGluZ3MuVEFHUy5yZWR1Y2UoKGFjYzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgaXRlbSkgPT4geyBhY2NbaXRlbS5pZF0gPSBgJHtpdGVtLm5hbWV9ICgke3RhZ0NvdW50c1tpdGVtLmlkXSB8fCAwfSlgOyByZXR1cm4gYWNjOyB9LCB7ICcnOiB0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU2NUUwXHU2ODA3XHU3QjdFX1x1NjU4N1x1NjcyQycpIH0pO1xyXG4gICAgICAgIGNvbnN0IHRhZ3NEcm9wZG93biA9IG5ldyBEcm9wZG93bkNvbXBvbmVudChzZWFyY2hCYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0YWdzRHJvcGRvd24uYWRkT3B0aW9ucyh0YWdzKTtcclxuICAgICAgICB0YWdzRHJvcGRvd24uc2V0VmFsdWUodGhpcy5zZXR0aW5ncy5QRVJTSVNURU5DRSA/IHRoaXMuc2V0dGluZ3MuRklMVEVSX1RBRyA6IHRoaXMudGFnKTtcclxuICAgICAgICB0YWdzRHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLkZJTFRFUl9UQUcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXHU4ODRDXSBcdTVFRjZcdThGREZcdTkwMDlcdTYyRTlcdTUyMTdcdTg4NjhcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ERUxBWSkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWxheUNvdW50cyA9IHRoaXMuc2V0dGluZ3MuUGx1Z2lucy5yZWR1Y2UoKGFjYzogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSwgcGx1Z2luKSA9PiB7IGNvbnN0IGRlbGF5ID0gcGx1Z2luLmRlbGF5IHx8ICcnOyBhY2NbZGVsYXldID0gKGFjY1tkZWxheV0gfHwgMCkgKyAxOyByZXR1cm4gYWNjOyB9LCB7ICcnOiAwIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxheXMgPSB0aGlzLnNldHRpbmdzLkRFTEFZUy5yZWR1Y2UoKGFjYzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgaXRlbSkgPT4geyBhY2NbaXRlbS5pZF0gPSBgJHtpdGVtLm5hbWV9ICgke2RlbGF5Q291bnRzW2l0ZW0uaWRdIHx8IDB9KWA7IHJldHVybiBhY2M7IH0sIHsgJyc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDJykgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5c0Ryb3Bkb3duID0gbmV3IERyb3Bkb3duQ29tcG9uZW50KHNlYXJjaEJhci5jb250cm9sRWwpO1xyXG4gICAgICAgICAgICBkZWxheXNEcm9wZG93bi5hZGRPcHRpb25zKGRlbGF5cyk7XHJcbiAgICAgICAgICAgIGRlbGF5c0Ryb3Bkb3duLnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuUEVSU0lTVEVOQ0UgPyB0aGlzLnNldHRpbmdzLkZJTFRFUl9ERUxBWSA6IHRoaXMuZGVsYXkpO1xyXG4gICAgICAgICAgICBkZWxheXNEcm9wZG93bi5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5GSUxURVJfREVMQVkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXHU4ODRDXSBcdTY0MUNcdTdEMjJcdTY4NDZcclxuICAgICAgICB0aGlzLnNlYXJjaEVsID0gbmV3IFNlYXJjaENvbXBvbmVudChzZWFyY2hCYXIuY29udHJvbEVsKTtcclxuICAgICAgICB0aGlzLnNlYXJjaEVsLm9uQ2hhbmdlKCh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2hvd0RhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgcGx1Z2luczogUGx1Z2luTWFuaWZlc3RbXSA9IE9iamVjdC52YWx1ZXModGhpcy5hcHBQbHVnaW5zLm1hbmlmZXN0cyk7XHJcbiAgICAgICAgcGx1Z2lucy5zb3J0KChpdGVtMSwgaXRlbTIpID0+IHsgcmV0dXJuIGl0ZW0xLm5hbWUubG9jYWxlQ29tcGFyZShpdGVtMi5uYW1lKSB9KTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlQbHVnaW5zID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgcGx1Z2lucykge1xyXG4gICAgICAgICAgICBjb25zdCBNYW5hZ2VyUGx1Z2luID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlBsdWdpbnMuZmluZChtcCA9PiBtcC5pZCA9PT0gcGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgY29uc3QgcGx1Z2luRGlyID0gcGF0aC5qb2luKHRoaXMuYmFzZVBhdGgsIHBsdWdpbi5kaXIgPyBwbHVnaW4uZGlyIDogJycpO1xyXG4gICAgICAgICAgICAvLyBcdTYzRDJcdTRFRjZcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkZcclxuICAgICAgICAgICAgY29uc3QgaXNFbmFibGVkID0gdGhpcy5zZXR0aW5ncy5ERUxBWSA/IE1hbmFnZXJQbHVnaW4/LmVuYWJsZWQgOiB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlZFBsdWdpbnMuaGFzKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgIGlmIChNYW5hZ2VyUGx1Z2luKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXSBcdTRFQzVcdTU0MkZcdTc1MjhcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ubHlFbmFibGVkICYmICFpc0VuYWJsZWQpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFtcdTY0MUNcdTdEMjJdIFx1NjcyQVx1NTIwNlx1N0VDNFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9Hcm91cCAmJiAhKE1hbmFnZXJQbHVnaW4uZ3JvdXAgPT0gJycpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLlBFUlNJU1RFTkNFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW1x1NjQxQ1x1N0QyMl0gXHU1MjA2XHU3RUM0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuRklMVEVSX0dST1VQICE9PSAnJyAmJiBNYW5hZ2VyUGx1Z2luLmdyb3VwICE9PSB0aGlzLnNldHRpbmdzLkZJTFRFUl9HUk9VUCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW1x1NjQxQ1x1N0QyMl0gXHU2ODA3XHU3QjdFXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuRklMVEVSX1RBRyAhPT0gJycgJiYgIShNYW5hZ2VyUGx1Z2luLnRhZ3MuaW5jbHVkZXModGhpcy5zZXR0aW5ncy5GSUxURVJfVEFHKSkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTY0MUNcdTdEMjJdIFx1NjgwN1x1N0I3RVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkZJTFRFUl9ERUxBWSAhPT0gJycgJiYgTWFuYWdlclBsdWdpbi5kZWxheSAhPT0gdGhpcy5zZXR0aW5ncy5GSUxURVJfREVMQVkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXSBcdTUyMDZcdTdFQzRcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm91cCAhPT0gJycgJiYgTWFuYWdlclBsdWdpbi5ncm91cCAhPT0gdGhpcy5ncm91cCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW1x1NjQxQ1x1N0QyMl0gXHU2ODA3XHU3QjdFXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGFnICE9PSAnJyAmJiAhKE1hbmFnZXJQbHVnaW4udGFncy5pbmNsdWRlcyh0aGlzLnRhZykpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXSBcdTY4MDdcdTdCN0VcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWxheSAhPT0gJycgJiYgTWFuYWdlclBsdWdpbi5kZWxheSAhPT0gdGhpcy5kZWxheSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBbXHU2NDFDXHU3RDIyXSBcdTY4MDdcdTk4OThcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFRleHQgIT09ICcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkgPT0gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyUGx1Z2luLmRlc2MudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpKSA9PSAtMVxyXG4gICAgICAgICAgICAgICAgKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIC8vIFtcdTc5ODFcdTc1MjhdIFx1ODFFQVx1NURGMVxyXG4gICAgICAgICAgICAgICAgaWYgKHBsdWdpbi5pZCA9PT0gdGhpcy5tYW5hZ2VyLm1hbmlmZXN0LmlkKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtRWwgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuc2V0Q2xhc3MoJ21hbmFnZXItaXRlbScpO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLm5hbWVFbC5hZGRDbGFzcygnbWFuYWdlci1pdGVtX19uYW1lLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLmRlc2NFbC5hZGRDbGFzcygnbWFuYWdlci1pdGVtX19kZXNjcmlwdGlvbi1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2XVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuRkFERV9PVVRfRElTQUJMRURfUExVR0lOUyAmJiAhaXNFbmFibGVkKSBpdGVtRWwuc2V0dGluZ0VsLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFtcdTYyNzlcdTkxQ0ZcdTY0Q0RcdTRGNUNdXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlQbHVnaW5zLnB1c2gocGx1Z2luKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGXVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVkaXRvck1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc2V0dGluZ3MuSVRFTV9TVFlMRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhbHdheXNFeHBhbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUVsLmRlc2NFbC5hZGRDbGFzcygnbWFuYWdlci1kaXNwbGF5LWJsb2NrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICduZXZlckV4cGFuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLmFkZENsYXNzKCdtYW5hZ2VyLWRpc3BsYXktbm9uZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaG92ZXJFeHBhbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUVsLmRlc2NFbC5hZGRDbGFzcygnbWFuYWdlci1kaXNwbGF5LW5vbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUVsLnNldHRpbmdFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwucmVtb3ZlQ2xhc3MoJ21hbmFnZXItZGlzcGxheS1ub25lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLmFkZENsYXNzKCdtYW5hZ2VyLWRpc3BsYXktYmxvY2snKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuc2V0dGluZ0VsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUVsLmRlc2NFbC5yZW1vdmVDbGFzcygnbWFuYWdlci1kaXNwbGF5LWJsb2NrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLmFkZENsYXNzKCdtYW5hZ2VyLWRpc3BsYXktbm9uZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjbGlja0V4cGFuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLmFkZENsYXNzKCdtYW5hZ2VyLWRpc3BsYXktbm9uZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuc2V0dGluZ0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhjbHVkZWRCdXR0b25zID0gQXJyYXkuZnJvbShpdGVtRWwuY29udHJvbEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4Y2x1ZGVkQnV0dG9ucy5pbmNsdWRlcyhldmVudC50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtRWwuZGVzY0VsLmhhc0NsYXNzKCdtYW5hZ2VyLWRpc3BsYXktbm9uZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwucmVtb3ZlQ2xhc3MoJ21hbmFnZXItZGlzcGxheS1ub25lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUVsLmRlc2NFbC5hZGRDbGFzcygnbWFuYWdlci1kaXNwbGF5LWJsb2NrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLnJlbW92ZUNsYXNzKCdtYW5hZ2VyLWRpc3BsYXktYmxvY2snKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLmFkZENsYXNzKCdtYW5hZ2VyLWRpc3BsYXktbm9uZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU1MjA2XHU3RUM0XHJcbiAgICAgICAgICAgICAgICBpZiAoTWFuYWdlclBsdWdpbi5ncm91cCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cCA9IGNyZWF0ZVNwYW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHM6ICdtYW5hZ2VyLWl0ZW1fX25hbWUtZ3JvdXAnXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKGdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zZXR0aW5ncy5HUk9VUFMuZmluZCh0ID0+IHQuaWQgPT09IE1hbmFnZXJQbHVnaW4uZ3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoaXRlbS5uYW1lLCBpdGVtLmNvbG9yLCB0aGlzLnNldHRpbmdzLkdST1VQX1NUWUxFKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yTW9kZSkgdGFnLm9uY2xpY2sgPSAoKSA9PiB7IG5ldyBHcm91cE1vZGFsKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIsIHRoaXMsIE1hbmFnZXJQbHVnaW4pLm9wZW4oKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFtcdTdGMTZcdThGOTFdIFx1NTIwNlx1N0VDNFxyXG4gICAgICAgICAgICAgICAgaWYgKE1hbmFnZXJQbHVnaW4uZ3JvdXAgPT09ICcnICYmIHRoaXMuZWRpdG9yTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gY3JlYXRlU3Bhbih7IGNsczogJ21hbmFnZXItaXRlbV9fbmFtZS1ncm91cCcgfSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0b3JNb2RlKSBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKGdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKCcrJywgJycsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0b3JNb2RlKSB0YWcub25jbGljayA9ICgpID0+IHsgbmV3IEdyb3VwTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgdGhpcywgTWFuYWdlclBsdWdpbikub3BlbigpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yTW9kZSkgZ3JvdXAuYXBwZW5kQ2hpbGQodGFnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU5RUQ4XHU4QkE0XSBcdTU0MERcdTc5RjBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gY3JlYXRlU3Bhbih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogTWFuYWdlclBsdWdpbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBwbHVnaW4ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjbHM6ICdtYW5hZ2VyLWl0ZW1fX25hbWUtdGl0bGUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gW1x1N0YxNlx1OEY5MV0gXHU1NDBEXHU3OUYwXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0b3JNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUuc2V0QXR0cmlidXRlKCdzdHlsZScsICdib3JkZXItd2lkdGg6IDFweDtib3JkZXItc3R5bGU6IGRhc2hlZDsnKVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyUGx1Z2luLm5hbWUgPSB0aXRsZS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU5RUQ4XHU4QkE0XSBcdTcyNDhcdTY3MkNcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZlcnNpb24gPSBjcmVhdGVTcGFuKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgWyR7cGx1Z2luLnZlcnNpb259XWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ21hbmFnZXItaXRlbV9fbmFtZS12ZXJzaW9uJ10sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgaXRlbUVsLm5hbWVFbC5hcHBlbmRDaGlsZCh2ZXJzaW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbXHU5RUQ4XHU4QkE0XSBcdTVFRjZcdThGREZcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZICYmICF0aGlzLmVkaXRvck1vZGUgJiYgTWFuYWdlclBsdWdpbi5kZWxheSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gdGhpcy5zZXR0aW5ncy5ERUxBWVMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IE1hbmFnZXJQbHVnaW4uZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gY3JlYXRlU3Bhbih7IHRleHQ6IGAke2QudGltZX1zYCwgY2xzOiBbJ21hbmFnZXItaXRlbV9fbmFtZS1kZWxheSddIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYXBwZW5kQ2hpbGQoZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFtcdTlFRDhcdThCQTRdIFx1NjNDRlx1OEZGMCBcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBjcmVhdGVEaXYoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IE1hbmFnZXJQbHVnaW4uZGVzYyxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogcGx1Z2luLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsczogWydtYW5hZ2VyLWl0ZW1fX25hbWUtZGVzYyddXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFtcdTdGMTZcdThGOTFdIFx1NjNDRlx1OEZGMFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2Muc2V0QXR0cmlidXRlKCdzdHlsZScsICdib3JkZXItd2lkdGg6IDFweDtib3JkZXItc3R5bGU6IGRhc2hlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYy5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2MudGV4dENvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXJQbHVnaW4uZGVzYyA9IGRlc2MudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5kZXNjRWwuYXBwZW5kQ2hpbGQoZGVzYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW1x1OUVEOFx1OEJBNF0gXHU2ODA3XHU3QjdFXHU3RUM0XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdzID0gY3JlYXRlRGl2KCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuZGVzY0VsLmFwcGVuZENoaWxkKHRhZ3MpO1xyXG4gICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi50YWdzLm1hcCgoaWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnNldHRpbmdzLlRBR1MuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKGl0ZW0ubmFtZSwgaXRlbS5jb2xvciwgdGhpcy5zZXR0aW5ncy5UQUdfU1RZTEUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0b3JNb2RlKSB0YWcub25jbGljayA9ICgpID0+IHsgbmV3IFRhZ3NNb2RhbCh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyLCB0aGlzLCBNYW5hZ2VyUGx1Z2luKS5vcGVuKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFncy5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFtcdTdGMTZcdThGOTFdIFx1NjgwN1x1N0I3RVx1N0VDNFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcoJysnLCAnJywgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFnLm9uY2xpY2sgPSAoKSA9PiB7IG5ldyBUYWdzTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgdGhpcywgTWFuYWdlclBsdWdpbikub3BlbigpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFncy5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0b3JNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW1x1NjMwOVx1OTRBRV0gXHU2MjUzXHU1RjAwXHU4QkJFXHU3RjZFXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcGVuUGx1Z2luU2V0dGluZyA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudChpdGVtRWwuY29udHJvbEVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuUGx1Z2luU2V0dGluZy5zZXRJY29uKCdzZXR0aW5ncycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5QbHVnaW5TZXR0aW5nLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjAnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlblBsdWdpblNldHRpbmcub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuUGx1Z2luU2V0dGluZy5zZXREaXNhYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwU2V0dGluZy5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcFNldHRpbmcub3BlblRhYkJ5SWQocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5QbHVnaW5TZXR0aW5nLnNldERpc2FibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFtcdTYzMDlcdTk0QUVdIFx1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5QbHVnaW5EaXJCdXR0b24gPSBuZXcgRXh0cmFCdXR0b25Db21wb25lbnQoaXRlbUVsLmNvbnRyb2xFbClcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUGx1Z2luRGlyQnV0dG9uLnNldEljb24oJ2ZvbGRlci1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUGx1Z2luRGlyQnV0dG9uLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NV9cdTYzQ0ZcdThGRjAnKSlcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUGx1Z2luRGlyQnV0dG9uLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuUGx1Z2luRGlyQnV0dG9uLnNldERpc2FibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyT3BlbihwbHVnaW5EaXIsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5QbHVnaW5EaXJCdXR0b24uc2V0RGlzYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2MzA5XHU5NEFFXSBcdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVQbHVnaW5CdXR0b24gPSBuZXcgRXh0cmFCdXR0b25Db21wb25lbnQoaXRlbUVsLmNvbnRyb2xFbClcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVQbHVnaW5CdXR0b24uc2V0SWNvbigndHJhc2gnKVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZVBsdWdpbkJ1dHRvbi5zZXRUb29sdGlwKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwJykpXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlUGx1Z2luQnV0dG9uLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGVsZXRlTW9kYWwodGhpcy5hcHAsIHRoaXMubWFuYWdlciwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLnVuaW5zdGFsbFBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmxvYWRNYW5pZmVzdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFx1NTIzN1x1NjVCMFx1NTQ3RFx1NEVFNFx1ODg0Q1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcdTUyMjBcdTk2NjRcdTU0MENcdTc0MDZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zeW5jaHJvbml6ZVBsdWdpbnMoT2JqZWN0LnZhbHVlcyh0aGlzLmFwcFBsdWdpbnMubWFuaWZlc3RzKS5maWx0ZXIoKHBtOiBQbHVnaW5NYW5pZmVzdCkgPT4gcG0uaWQgIT09IHRoaXMubWFuYWdlci5tYW5pZmVzdC5pZCkgYXMgUGx1Z2luTWFuaWZlc3RbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTM3OFx1OEY3RF9cdTkwMUFcdTc3RTVfXHU0RTAwJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5vcGVuKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU2MzA5XHU5NEFFXSBcdTUyMDdcdTYzNjJcdTcyQjZcdTYwMDFcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2dnbGVTd2l0Y2ggPSBuZXcgVG9nZ2xlQ29tcG9uZW50KGl0ZW1FbC5jb250cm9sRWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlU3dpdGNoLnNldFRvb2x0aXAodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIwN1x1NjM2Mlx1NzJCNlx1NjAwMV9cdTYzQ0ZcdThGRjAnKSlcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVTd2l0Y2guc2V0VmFsdWUoaXNFbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVN3aXRjaC5vbkNoYW5nZShhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlU3dpdGNoLmdldFZhbHVlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5GQURFX09VVF9ESVNBQkxFRF9QTFVHSU5TKSBpdGVtRWwuc2V0dGluZ0VsLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpOyAgLy8gW1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyUGx1Z2luLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZW5hYmxlUGx1Z2luKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkZBREVfT1VUX0RJU0FCTEVEX1BMVUdJTlMpIGl0ZW1FbC5zZXR0aW5nRWwuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7ICAvLyBbXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXJQbHVnaW4uZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZVN3aXRjaC5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuRkFERV9PVVRfRElTQUJMRURfUExVR0lOUykgaXRlbUVsLnNldHRpbmdFbC5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTsgIC8vIFtcdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbkFuZFNhdmUocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuRkFERV9PVVRfRElTQUJMRURfUExVR0lOUykgaXRlbUVsLnNldHRpbmdFbC5hZGRDbGFzcygnaW5hY3RpdmUnKTsgIC8vIFtcdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHModGhpcy5hcHAsIHRoaXMubWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0b3JNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gW1x1NjMwOVx1OTRBRV0gXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsb2FkQnV0dG9uID0gbmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KGl0ZW1FbC5jb250cm9sRWwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsb2FkQnV0dG9uLnNldEljb24oJ3JlZnJlc2gtY2N3JylcclxuICAgICAgICAgICAgICAgICAgICByZWxvYWRCdXR0b24uc2V0VG9vbHRpcCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMCcpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbG9hZEJ1dHRvbi5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5uYW1lID0gcGx1Z2luLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXJQbHVnaW4uZGVzYyA9IHBsdWdpbi5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlclBsdWdpbi5ncm91cCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyUGx1Z2luLmRlbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXJQbHVnaW4udGFncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBbXHU3RjE2XHU4RjkxXSBcdTVFRjZcdThGREZcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5ERUxBWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxheXMgPSB0aGlzLnNldHRpbmdzLkRFTEFZUy5yZWR1Y2UoKGFjYzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSwgaXRlbSkgPT4geyBhY2NbaXRlbS5pZF0gPSBpdGVtLm5hbWU7IHJldHVybiBhY2M7IH0sIHsgJyc6IHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDJykgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGF5c0VsID0gbmV3IERyb3Bkb3duQ29tcG9uZW50KGl0ZW1FbC5jb250cm9sRWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheXNFbC5hZGRPcHRpb25zKGRlbGF5cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5c0VsLnNldFZhbHVlKE1hbmFnZXJQbHVnaW4uZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheXNFbC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXJQbHVnaW4uZGVsYXkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFx1OEJBMVx1N0I5N1x1OTg3NVx1NUMzRVxyXG4gICAgICAgIHRoaXMuZm9vdEVsLmlubmVySFRNTCA9IHRoaXMuY291bnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY291bnQoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IGVuYWJsZWRDb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IGRpc2FibGVkQ291bnQgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLkRFTEFZKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsdWdpbnMgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnM7XHJcbiAgICAgICAgICAgIHRvdGFsQ291bnQgPSBwbHVnaW5zLmxlbmd0aDtcclxuICAgICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKHBsdWdpbiA9PiB7IHBsdWdpbi5lbmFibGVkID8gZW5hYmxlZENvdW50KysgOiBkaXNhYmxlZENvdW50Kys7IH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvdGFsQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLm1hbmFnZXIuYXBwUGx1Z2lucy5tYW5pZmVzdHMpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGVuYWJsZWRDb3VudCA9IHRoaXMubWFuYWdlci5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLnNpemUgLSAxO1xyXG4gICAgICAgICAgICBkaXNhYmxlZENvdW50ID0gdG90YWxDb3VudCAtIGVuYWJsZWRDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3VtbWFyeSA9IGBbJHt0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU2MDNCXHU4QkExX1x1NjU4N1x1NjcyQycpfV0gJHt0b3RhbENvdW50fSBbJHt0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQycpfV0gJHtlbmFibGVkQ291bnR9IFske3RoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDJyl9XSAke2Rpc2FibGVkQ291bnR9IGA7XHJcbiAgICAgICAgcmV0dXJuIHN1bW1hcnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlbG9hZFNob3dEYXRhKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbDtcclxuICAgICAgICBzY3JvbGxUb3AgPSBtb2RhbEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIG1vZGFsRWxlbWVudC5lbXB0eSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd0RhdGEoKTtcclxuICAgICAgICBtb2RhbEVsZW1lbnQuc2Nyb2xsVG8oMCwgc2Nyb2xsVG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgb25PcGVuKCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0hlYWQoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hFbC5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICAgICAgLy8gW1x1NTI5Rlx1ODBGRF0gY3RybCtmXHU4MDVBXHU3MTI2XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSAmJiBldmVudC5rZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2YnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hFbC5pbnB1dEVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hFbC5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgb25DbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xyXG4gICAgfVxyXG59XHJcbiIsICJpbXBvcnQgeyBOb3RpY2UsIFBsYXRmb3JtIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ21haW4nO1xyXG5cclxuLyoqXHJcbiAqIFx1NjI1M1x1NUYwMFx1NjU4N1x1NEVGNlx1NjIxNlx1NjU4N1x1NEVGNlx1NTkzOVx1NzY4NFx1NjRDRFx1NEY1Q1x1N0NGQlx1N0VERlx1NTQ3RFx1NEVFNFx1MzAwMlxyXG4gKiBAcGFyYW0gaTE4biAtIFx1NTZGRFx1OTY0NVx1NTMxNlx1NUJGOVx1OEM2MVx1RkYwQ1x1NzUyOFx1NEU4RVx1NjYzRVx1NzkzQVx1NjRDRFx1NEY1Q1x1N0VEM1x1Njc5Q1x1NzY4NFx1OTAxQVx1NzdFNVx1MzAwMlxyXG4gKiBAcGFyYW0gZGlyIC0gXHU4OTgxXHU2MjUzXHU1RjAwXHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHU4REVGXHU1Rjg0XHUzMDAyXHJcbiAqIEBkZXNjcmlwdGlvbiBcdTY4MzlcdTYzNkVcdTY0Q0RcdTRGNUNcdTdDRkJcdTdFREZcdTYyNjdcdTg4NENcdTc2RjhcdTVFOTRcdTc2ODRcdTU0N0RcdTRFRTRcdTY3NjVcdTYyNTNcdTVGMDBcdTY1ODdcdTRFRjZcdTU5MzlcdTMwMDJcdTU3MjhXaW5kb3dzXHU0RTBBXHU0RjdGXHU3NTI4J3N0YXJ0J1x1NTQ3RFx1NEVFNFx1RkYwQ1x1NTcyOE1hY1x1NEUwQVx1NEY3Rlx1NzUyOCdvcGVuJ1x1NTQ3RFx1NEVFNFx1MzAwMlxyXG4gKiBcdTU5ODJcdTY3OUNcdTY0Q0RcdTRGNUNcdTYyMTBcdTUyOUZcdUZGMENcdTY2M0VcdTc5M0FcdTYyMTBcdTUyOUZcdTkwMUFcdTc3RTVcdUZGMUJcdTU5ODJcdTY3OUNcdTU5MzFcdThEMjVcdUZGMENcdTY2M0VcdTc5M0FcdTk1MTlcdThCRUZcdTkwMUFcdTc3RTVcdTMwMDJcclxuICovXHJcbmV4cG9ydCBjb25zdCBtYW5hZ2VyT3BlbiA9IChkaXI6IHN0cmluZywgbWFuYWdlcjogTWFuYWdlcikgPT4ge1xyXG5cdGlmIChQbGF0Zm9ybS5pc0Rlc2t0b3ApIHtcclxuXHRcdGV4ZWMoYHN0YXJ0IFwiXCIgXCIke2Rpcn1cImAsIChlcnJvcikgPT4ge1xyXG5cdFx0XHRpZiAoZXJyb3IpIHsgbmV3IE5vdGljZShtYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NTkzMVx1OEQyNV9cdTY1ODdcdTY3MkMnKSk7IH0gZWxzZSB7IG5ldyBOb3RpY2UobWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTYyMTBcdTUyOUZfXHU2NTg3XHU2NzJDJykpOyB9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0aWYgKFBsYXRmb3JtLmlzTWFjT1MpIHtcclxuXHRcdGV4ZWMoYG9wZW4gJHtkaXJ9YCwgKGVycm9yKSA9PiB7XHJcblx0XHRcdGlmIChlcnJvcikgeyBuZXcgTm90aWNlKG1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1OTMxXHU4RDI1X1x1NjU4N1x1NjcyQycpKTsgfSBlbHNlIHsgbmV3IE5vdGljZShtYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkMnKSk7IH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuIiwgImltcG9ydCB7IEFwcCwgRXh0cmFCdXR0b25Db21wb25lbnQsIE1vZGFsLCBOb3RpY2UsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IE1hbmFnZXJTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL2RhdGEnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdtYWluJztcclxuaW1wb3J0IHsgTWFuYWdlck1vZGFsIH0gZnJvbSAnLi9tYW5hZ2VyLW1vZGFsJztcclxuaW1wb3J0IHsgTWFuYWdlclBsdWdpbiB9IGZyb20gJ3NyYy9kYXRhL3R5cGVzJztcclxuaW1wb3J0IENvbW1hbmRzIGZyb20gJ3NyYy9jb21tYW5kJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHcm91cE1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG4gICAgc2V0dGluZ3M6IE1hbmFnZXJTZXR0aW5ncztcclxuICAgIG1hbmFnZXI6IE1hbmFnZXI7XHJcbiAgICBtYW5hZ2VyTW9kYWw6IE1hbmFnZXJNb2RhbDtcclxuICAgIG1hbmFnZXJQbHVnaW46IE1hbmFnZXJQbHVnaW47XHJcbiAgICBzZWxlY3RlZDogc3RyaW5nO1xyXG4gICAgYWRkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBtYW5hZ2VyOiBNYW5hZ2VyLCBtYW5hZ2VyTW9kYWw6IE1hbmFnZXJNb2RhbCwgbWFuYWdlclBsdWdpbjogTWFuYWdlclBsdWdpbikge1xyXG4gICAgICAgIHN1cGVyKGFwcCk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IG1hbmFnZXIuc2V0dGluZ3M7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcclxuICAgICAgICB0aGlzLm1hbmFnZXJNb2RhbCA9IG1hbmFnZXJNb2RhbDtcclxuICAgICAgICB0aGlzLm1hbmFnZXJQbHVnaW4gPSBtYW5hZ2VyUGx1Z2luO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnJztcclxuICAgICAgICB0aGlzLmFkZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgc2hvd0hlYWQoKSB7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgbW9kYWxFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIG1vZGFsRWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19jb250YWluZXInKTtcclxuICAgICAgICBtb2RhbEVsLnJlbW92ZUNoaWxkKG1vZGFsRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UtYnV0dG9uJylbMF0pO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbC5wYXJlbnRFbGVtZW50Py5hZGRDbGFzcygnbWFuYWdlci1jb250YWluZXJfX2hlYWRlcicpO1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmFkZENsYXNzKCdtYW5hZ2VyLWl0ZW0tY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIC8vIFtcdTY4MDdcdTk4OThcdTg4NENdXHJcbiAgICAgICAgY29uc3QgdGl0bGVCYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpLnNldENsYXNzKCdtYW5hZ2VyLWJhcl9fdGl0bGUnKS5zZXROYW1lKGBbJHt0aGlzLm1hbmFnZXJQbHVnaW4ubmFtZX1dYCk7XHJcbiAgICAgICAgLy8gW1x1NjgwN1x1OTg5OFx1ODg0Q10gXHU1MTczXHU5NUVEXHU2MzA5XHU5NEFFXHJcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBuZXcgRXh0cmFCdXR0b25Db21wb25lbnQodGl0bGVCYXIuY29udHJvbEVsKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLnNldEljb24oJ2NpcmNsZS14JylcclxuICAgICAgICBjbG9zZUJ1dHRvbi5vbkNsaWNrKCgpID0+IHRoaXMuY2xvc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzaG93RGF0YSgpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMuc2V0dGluZ3MuR1JPVVBTKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1FbCA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxyXG4gICAgICAgICAgICBpdGVtRWwuc2V0Q2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtJylcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPT0gJycgfHwgdGhpcy5zZWxlY3RlZCAhPSBncm91cC5pZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldEljb24oJ3NldHRpbmdzJylcclxuICAgICAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBncm91cC5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkVG9nZ2xlKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKGdyb3VwLmlkID09PSB0aGlzLm1hbmFnZXJQbHVnaW4uZ3JvdXApXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyUGx1Z2luLmdyb3VwID0gdGhpcy5tYW5hZ2VyUGx1Z2luLmdyb3VwID09PSBncm91cC5pZCA/ICcnIDogZ3JvdXAuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyTW9kYWwucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cEVsID0gY3JlYXRlU3Bhbih7IGNsczogJ21hbmFnZXItaXRlbV9fbmFtZS1ncm91cCcgfSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwubmFtZUVsLmFwcGVuZENoaWxkKGdyb3VwRWwpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFnID0gdGhpcy5tYW5hZ2VyLmNyZWF0ZVRhZyhncm91cC5uYW1lLCBncm91cC5jb2xvciwgdGhpcy5zZXR0aW5ncy5HUk9VUF9TVFlMRSk7XHJcbiAgICAgICAgICAgICAgICBncm91cEVsLmFwcGVuZENoaWxkKHRhZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgIT0gJycgJiYgdGhpcy5zZWxlY3RlZCA9PSBncm91cC5pZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbUVsLmFkZENvbG9yUGlja2VyKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKGdyb3VwLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKGdyb3VwLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5pbnB1dEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9faXRlbS1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbigndHJhc2gtMicpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNUZXN0R3JvdXAgPSB0aGlzLnNldHRpbmdzLlBsdWdpbnMuc29tZShwbHVnaW4gPT4gcGx1Z2luLmdyb3VwID09PSBncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzVGVzdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuR1JPVVBTID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkdST1VQUy5maWx0ZXIodCA9PiB0LmlkICE9PSBncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyh0aGlzLmFwcCwgdGhpcy5tYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgaXRlbUVsLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldEljb24oJ3NhdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlck1vZGFsLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwRWwgPSBjcmVhdGVTcGFuKHsgY2xzOiAnbWFuYWdlci1pdGVtX19uYW1lLWdyb3VwJyB9KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYXBwZW5kQ2hpbGQoZ3JvdXBFbCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLm1hbmFnZXIuY3JlYXRlVGFnKGdyb3VwLm5hbWUsIGdyb3VwLmNvbG9yLCB0aGlzLnNldHRpbmdzLkdST1VQX1NUWUxFKTtcclxuICAgICAgICAgICAgICAgIGdyb3VwRWwuYXBwZW5kQ2hpbGQodGFnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hZGQpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBmb29kQmFyID0gbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpLnNldENsYXNzKCdtYW5hZ2VyLWJhcl9fdGl0bGUnKTtcclxuICAgICAgICAgICAgZm9vZEJhci5pbmZvRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGZvb2RCYXIuYWRkQ29sb3JQaWNrZXIoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShjb2xvcilcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBmb29kQmFyLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignSUQnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4geyBpZCA9IHZhbHVlOyB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuaW5wdXRFbC5hZGRDbGFzcygnbWFuYWdlci1lZGl0b3JfX2l0ZW0taW5wdXQnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGZvb2RCYXIuYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDJykpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7IG5hbWUgPSB2YWx1ZTsgfSlcclxuICAgICAgICAgICAgICAgIC5pbnB1dEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9faXRlbS1pbnB1dCcpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgZm9vZEJhci5hZGRFeHRyYUJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldEljb24oJ3BsdXMnKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5zSWQgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuR1JPVVBTLnNvbWUodGFnID0+IHRhZy5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbnNJZCAmJiBpZCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yID09PSAnJykgY29sb3IgPSAnIzAwMDAwMCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zZXR0aW5ncy5HUk9VUFMucHVzaCh7IGlkLCBuYW1lLCBjb2xvciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMCcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QycpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gW1x1NUU5NVx1OTBFOFx1ODg0Q10gXHU2NUIwXHU1ODlFXHJcbiAgICAgICAgICAgIGNvbnN0IGZvb2RCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCkuc2V0Q2xhc3MoJ21hbmFnZXItYmFyX190aXRsZScpLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkMnKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudChmb29kQmFyLmNvbnRyb2xFbClcclxuICAgICAgICAgICAgYWRkQnV0dG9uLnNldEljb24oJ2NpcmNsZS1wbHVzJylcclxuICAgICAgICAgICAgYWRkQnV0dG9uLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyByZWxvYWRTaG93RGF0YSgpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICBjb25zdCBtb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWw7XHJcbiAgICAgICAgc2Nyb2xsVG9wID0gbW9kYWxFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICBtb2RhbEVsZW1lbnQuZW1wdHkoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dEYXRhKCk7XHJcbiAgICAgICAgbW9kYWxFbGVtZW50LnNjcm9sbFRvKDAsIHNjcm9sbFRvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25PcGVuKCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0hlYWQoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25DbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCAiaW1wb3J0IHsgQXBwLCBFeHRyYUJ1dHRvbkNvbXBvbmVudCwgTW9kYWwsIE5vdGljZSwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MvZGF0YSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ21haW4nO1xyXG5pbXBvcnQgeyBNYW5hZ2VyTW9kYWwgfSBmcm9tICcuL21hbmFnZXItbW9kYWwnO1xyXG5pbXBvcnQgeyBNYW5hZ2VyUGx1Z2luIH0gZnJvbSAnc3JjL2RhdGEvdHlwZXMnO1xyXG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnc3JjL2NvbW1hbmQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhZ3NNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuICAgIHNldHRpbmdzOiBNYW5hZ2VyU2V0dGluZ3M7XHJcbiAgICBtYW5hZ2VyOiBNYW5hZ2VyO1xyXG4gICAgbWFuYWdlck1vZGFsOiBNYW5hZ2VyTW9kYWw7XHJcbiAgICBtYW5hZ2VyUGx1Z2luOiBNYW5hZ2VyUGx1Z2luO1xyXG4gICAgc2VsZWN0ZWQ6IHN0cmluZztcclxuICAgIGFkZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgbWFuYWdlcjogTWFuYWdlciwgbWFuYWdlck1vZGFsOiBNYW5hZ2VyTW9kYWwsIG1hbmFnZXJQbHVnaW46IE1hbmFnZXJQbHVnaW4pIHtcclxuICAgICAgICBzdXBlcihhcHApO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBtYW5hZ2VyLnNldHRpbmdzO1xyXG4gICAgICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyTW9kYWwgPSBtYW5hZ2VyTW9kYWw7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyUGx1Z2luID0gbWFuYWdlclBsdWdpbjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gJyc7XHJcbiAgICAgICAgdGhpcy5hZGQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dIZWFkKCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IG1vZGFsRWw6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICBtb2RhbEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9fY29udGFpbmVyJyk7XHJcbiAgICAgICAgbW9kYWxFbC5yZW1vdmVDaGlsZChtb2RhbEVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsLWNsb3NlLWJ1dHRvbicpWzBdKTtcclxuICAgICAgICB0aGlzLnRpdGxlRWwucGFyZW50RWxlbWVudD8uYWRkQ2xhc3MoJ21hbmFnZXItY29udGFpbmVyX19oZWFkZXInKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcygnbWFuYWdlci1pdGVtLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIC8vIFtcdTY4MDdcdTk4OThcdTg4NENdXHJcbiAgICAgICAgY29uc3QgdGl0bGVCYXIgPSBuZXcgU2V0dGluZyh0aGlzLnRpdGxlRWwpLnNldENsYXNzKCdtYW5hZ2VyLWJhcl9fdGl0bGUnKS5zZXROYW1lKHRoaXMubWFuYWdlclBsdWdpbi5uYW1lKTtcclxuICAgICAgICAvLyBbXHU2ODA3XHU5ODk4XHU4ODRDXSBcdTUxNzNcdTk1RURcdTYzMDlcdTk0QUVcclxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudCh0aXRsZUJhci5jb250cm9sRWwpXHJcbiAgICAgICAgY2xvc2VCdXR0b24uc2V0SWNvbignY2lyY2xlLXgnKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dEYXRhKCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgdGFnIG9mIHRoaXMuc2V0dGluZ3MuVEFHUykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtRWwgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcclxuICAgICAgICAgICAgaXRlbUVsLnNldENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9faXRlbScpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID09ICcnIHx8IHRoaXMuc2VsZWN0ZWQgIT0gdGFnLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbignc2V0dGluZ3MnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRhZy5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkVG9nZ2xlKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMubWFuYWdlclBsdWdpbi50YWdzLmluY2x1ZGVzKHRhZy5pZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKChpc0NoZWNrZWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU2REZCXHU1MkEwXHU1RjAwXHU1NDJGXHU3Njg0XHU2ODA3XHU3QjdFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWFuYWdlclBsdWdpbi50YWdzLmluY2x1ZGVzKHRhZy5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXJQbHVnaW4udGFncy5wdXNoKHRhZy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcdTc5RkJcdTk2NjRcdTUxNzNcdTk1RURcdTc2ODRcdTY4MDdcdTdCN0VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlclBsdWdpbi50YWdzID0gdGhpcy5tYW5hZ2VyUGx1Z2luLnRhZ3MuZmlsdGVyKHQgPT4gdCAhPT0gdGFnLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlck1vZGFsLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wRWwgPSBjcmVhdGVTcGFuKHsgY2xzOiAnbWFuYWdlci1pdGVtX19uYW1lLWdyb3VwJyB9KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYXBwZW5kQ2hpbGQodGVtcEVsKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0VsID0gdGhpcy5tYW5hZ2VyLmNyZWF0ZVRhZyh0YWcubmFtZSwgdGFnLmNvbG9yLCB0aGlzLnNldHRpbmdzLlRBR19TVFlMRSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRWwuYXBwZW5kQ2hpbGQodGFnRWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICE9ICcnICYmIHRoaXMuc2VsZWN0ZWQgPT0gdGFnLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkQ29sb3JQaWNrZXIoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGFnLmNvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnLmNvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0YWcubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5pbnB1dEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9faXRlbS1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBpdGVtRWwuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbigndHJhc2gtMicpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNUZXN0VGFnID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zLnNvbWUocGx1Z2luID0+IHBsdWdpbi50YWdzICYmIHBsdWdpbi50YWdzLmluY2x1ZGVzKHRhZy5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Rlc3RUYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zZXR0aW5ncy5UQUdTID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MuZmlsdGVyKHQgPT4gdC5pZCAhPT0gdGFnLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkU2hvd0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDknKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgaXRlbUVsLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldEljb24oJ3NhdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlck1vZGFsLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwRWwgPSBjcmVhdGVTcGFuKHsgY2xzOiAnbWFuYWdlci1pdGVtX19uYW1lLWdyb3VwJyB9KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1FbC5uYW1lRWwuYXBwZW5kQ2hpbGQoZ3JvdXBFbCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdFbCA9IHRoaXMubWFuYWdlci5jcmVhdGVUYWcodGFnLm5hbWUsIHRhZy5jb2xvciwgdGhpcy5zZXR0aW5ncy5UQUdfU1RZTEUpO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBFbC5hcHBlbmRDaGlsZCh0YWdFbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgY29sb3IgPSAnJztcclxuICAgICAgICAgICAgY29uc3QgZm9vZEJhciA9IG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKS5zZXRDbGFzcygnbWFuYWdlci1iYXJfX3RpdGxlJyk7XHJcbiAgICAgICAgICAgIGZvb2RCYXIuaW5mb0VsLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBmb29kQmFyLmFkZENvbG9yUGlja2VyKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUoY29sb3IpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7IGNvbG9yID0gdmFsdWU7IH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgZm9vZEJhci5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ0lEJylcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHsgaWQgPSB2YWx1ZTsgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpOyB9KVxyXG4gICAgICAgICAgICAgICAgLmlucHV0RWwuYWRkQ2xhc3MoJ21hbmFnZXItZWRpdG9yX19pdGVtLWlucHV0JylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBmb29kQmFyLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcih0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1NDBEXHU3OUYwX1x1NjU4N1x1NjcyQycpKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4geyBuYW1lID0gdmFsdWU7IH0pXHJcbiAgICAgICAgICAgICAgICAuaW5wdXRFbC5hZGRDbGFzcygnbWFuYWdlci1lZGl0b3JfX2l0ZW0taW5wdXQnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGZvb2RCYXIuYWRkRXh0cmFCdXR0b24oY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRJY29uKCdwbHVzJylcclxuICAgICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250YWluc0lkID0gdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1Muc29tZSh0YWcgPT4gdGFnLmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250YWluc0lkICYmIGlkICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09ICcnKSBjb2xvciA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLlRBR1MucHVzaCh7IGlkLCBuYW1lLCBjb2xvciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZFNob3dEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKHRoaXMuYXBwLCB0aGlzLm1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMCcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QycpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gW1x1NUU5NVx1OTBFOFx1ODg0Q10gXHU2NUIwXHU1ODlFXHJcbiAgICAgICAgICAgIGNvbnN0IGZvb2RCYXIgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCkuc2V0Q2xhc3MoJ21hbmFnZXItYmFyX190aXRsZScpLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkMnKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IG5ldyBFeHRyYUJ1dHRvbkNvbXBvbmVudChmb29kQmFyLmNvbnRyb2xFbClcclxuICAgICAgICAgICAgYWRkQnV0dG9uLnNldEljb24oJ2NpcmNsZS1wbHVzJylcclxuICAgICAgICAgICAgYWRkQnV0dG9uLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRTaG93RGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyByZWxvYWRTaG93RGF0YSgpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICBjb25zdCBtb2RhbEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWw7XHJcbiAgICAgICAgc2Nyb2xsVG9wID0gbW9kYWxFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICBtb2RhbEVsZW1lbnQuZW1wdHkoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dEYXRhKCk7XHJcbiAgICAgICAgbW9kYWxFbGVtZW50LnNjcm9sbFRvKDAsIHNjcm9sbFRvcCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25PcGVuKCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0hlYWQoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25DbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCAiaW1wb3J0IHsgQXBwLCBFeHRyYUJ1dHRvbkNvbXBvbmVudCwgTW9kYWwsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IE1hbmFnZXJTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL2RhdGEnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdtYWluJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWxldGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuICAgIHNldHRpbmdzOiBNYW5hZ2VyU2V0dGluZ3M7XHJcbiAgICBtYW5hZ2VyOiBNYW5hZ2VyO1xyXG5cclxuICAgIHByaXZhdGUgZGVsZXRlQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIG1hbmFnZXI6IE1hbmFnZXIsIGRlbGV0ZUNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwKTtcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlQ2FsbGJhY2sgPSBkZWxldGVDYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dIZWFkKCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IG1vZGFsRWw6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICBtb2RhbEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9fY29udGFpbmVyJyk7XHJcbiAgICAgICAgbW9kYWxFbC5yZW1vdmVDaGlsZChtb2RhbEVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsLWNsb3NlLWJ1dHRvbicpWzBdKTtcclxuICAgICAgICB0aGlzLnRpdGxlRWwucGFyZW50RWxlbWVudD8uYWRkQ2xhc3MoJ21hbmFnZXItY29udGFpbmVyX19oZWFkZXInKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcygnbWFuYWdlci1pdGVtLWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAvLyBbXHU2ODA3XHU5ODk4XHU4ODRDXVxyXG4gICAgICAgIGNvbnN0IHRpdGxlQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKVxyXG4gICAgICAgIHRpdGxlQmFyLnNldENsYXNzKCdtYW5hZ2VyLWRlbGV0ZV9fdGl0bGUnKVxyXG4gICAgICAgIHRpdGxlQmFyLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5OCcpKTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjgwN1x1OTg5OFx1ODg0Q10gXHU1MTczXHU5NUVEXHU2MzA5XHU5NEFFXHJcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBuZXcgRXh0cmFCdXR0b25Db21wb25lbnQodGl0bGVCYXIuY29udHJvbEVsKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLnNldEljb24oJ2NpcmNsZS14JylcclxuICAgICAgICBjbG9zZUJ1dHRvbi5vbkNsaWNrKCgpID0+IHRoaXMuY2xvc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzaG93RGF0YSgpIHtcclxuICAgICAgICBjb25zdCB0aXRsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbClcclxuICAgICAgICB0aXRsZUJhci5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTM3OFx1OEY3RF9cdTYzRDBcdTc5M0EnKSk7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKVxyXG4gICAgICAgIGFjdGlvbkJhci5zZXRDbGFzcygnbWFuYWdlci1kZWxldGVfX2FjdGlvbicpXHJcbiAgICAgICAgYWN0aW9uQmFyLmFkZEJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAuc2V0V2FybmluZygpXHJcbiAgICAgICAgICAgIC5zZXRCdXR0b25UZXh0KHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTM3OFx1OEY3RF9cdTUzNzhcdThGN0QnKSlcclxuICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYWN0aW9uQmFyLmFkZEJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAuc2V0QnV0dG9uVGV4dCh0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTUzNzhcdThGN0RfXHU1M0Q2XHU2RDg4JykpIFxyXG4gICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbk9wZW4oKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93SGVhZCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsICJpbXBvcnQgeyBBcHAsIEV4dHJhQnV0dG9uQ29tcG9uZW50LCBNb2RhbCwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MvZGF0YSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ21haW4nO1xyXG5cclxuZXhwb3J0IGNsYXNzIERpc2FibGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuICAgIHNldHRpbmdzOiBNYW5hZ2VyU2V0dGluZ3M7XHJcbiAgICBtYW5hZ2VyOiBNYW5hZ2VyO1xyXG5cclxuICAgIHByaXZhdGUgZGVsZXRlQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIG1hbmFnZXI6IE1hbmFnZXIsIGRlbGV0ZUNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwKTtcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlQ2FsbGJhY2sgPSBkZWxldGVDYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dIZWFkKCkge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IG1vZGFsRWw6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICBtb2RhbEVsLmFkZENsYXNzKCdtYW5hZ2VyLWVkaXRvcl9fY29udGFpbmVyJyk7XHJcbiAgICAgICAgbW9kYWxFbC5yZW1vdmVDaGlsZChtb2RhbEVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsLWNsb3NlLWJ1dHRvbicpWzBdKTtcclxuICAgICAgICB0aGlzLnRpdGxlRWwucGFyZW50RWxlbWVudD8uYWRkQ2xhc3MoJ21hbmFnZXItY29udGFpbmVyX19oZWFkZXInKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcygnbWFuYWdlci1pdGVtLWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAvLyBbXHU2ODA3XHU5ODk4XHU4ODRDXVxyXG4gICAgICAgIGNvbnN0IHRpdGxlQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKVxyXG4gICAgICAgIHRpdGxlQmFyLnNldENsYXNzKCdtYW5hZ2VyLWRlbGV0ZV9fdGl0bGUnKVxyXG4gICAgICAgIHRpdGxlQmFyLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU0RTAwXHU5NTJFX1x1NjgwN1x1OTg5OCcpKTtcclxuXHJcbiAgICAgICAgLy8gW1x1NjgwN1x1OTg5OFx1ODg0Q10gXHU1MTczXHU5NUVEXHU2MzA5XHU5NEFFXHJcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBuZXcgRXh0cmFCdXR0b25Db21wb25lbnQodGl0bGVCYXIuY29udHJvbEVsKVxyXG4gICAgICAgIGNsb3NlQnV0dG9uLnNldEljb24oJ2NpcmNsZS14JylcclxuICAgICAgICBjbG9zZUJ1dHRvbi5vbkNsaWNrKCgpID0+IHRoaXMuY2xvc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzaG93RGF0YSgpIHtcclxuICAgICAgICBjb25zdCB0aXRsZUJhciA9IG5ldyBTZXR0aW5nKHRoaXMudGl0bGVFbClcclxuICAgICAgICB0aXRsZUJhci5zZXROYW1lKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NEUwMFx1OTUyRV9cdTYzRDBcdTc5M0EnKSk7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uQmFyID0gbmV3IFNldHRpbmcodGhpcy50aXRsZUVsKVxyXG4gICAgICAgIGFjdGlvbkJhci5zZXRDbGFzcygnbWFuYWdlci1kZWxldGVfX2FjdGlvbicpXHJcbiAgICAgICAgYWN0aW9uQmFyLmFkZEJ1dHRvbihjYiA9PiBjYlxyXG4gICAgICAgICAgICAuc2V0Q3RhKClcclxuICAgICAgICAgICAgLnNldEJ1dHRvblRleHQodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU0RTAwXHU5NTJFX1x1NTQyRlx1Nzk4MScpKVxyXG4gICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb25CYXIuYWRkQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgIC5zZXRCdXR0b25UZXh0KHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NEUwMFx1OTUyRV9cdTUzRDZcdTZEODgnKSkgXHJcbiAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uT3BlbigpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnNob3dIZWFkKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwgImltcG9ydCB7IEFwcCwgUGx1Z2luTWFuaWZlc3QgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vbWFpblwiO1xyXG5pbXBvcnQgeyBNYW5hZ2VyTW9kYWwgfSBmcm9tIFwiLi9tb2RhbC9tYW5hZ2VyLW1vZGFsXCI7XHJcblxyXG5jb25zdCBDb21tYW5kcyA9IChhcHA6IEFwcCwgbWFuYWdlcjogTWFuYWdlcikgPT4ge1xyXG4gICAgbWFuYWdlci5hZGRDb21tYW5kKHtcclxuICAgICAgICBpZDogJ21hbmFnZXItdmlldycsXHJcbiAgICAgICAgbmFtZTogbWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTQ3RFx1NEVFNF9cdTdCQTFcdTc0MDZcdTk3NjJcdTY3N0ZfXHU2M0NGXHU4RkYwJyksXHJcbiAgICAgICAgaG90a2V5czogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtb2RpZmllcnM6IFsnQ3RybCddLFxyXG4gICAgICAgICAgICAgICAga2V5OiAnTScsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7IG5ldyBNYW5hZ2VyTW9kYWwoYXBwLCBtYW5hZ2VyKS5vcGVuKCkgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG1hbmFnZXIuc2V0dGluZ3MuREVMQVkpIHtcclxuICAgICAgICAvLyBcdTUzNTVcdTg4NENcdTU0N0RcdTRFRTRcclxuICAgICAgICBpZiAobWFuYWdlci5zZXR0aW5ncy5DT01NQU5EX0lURU0pIHtcclxuICAgICAgICAgICAgY29uc3QgcGx1Z2luczogUGx1Z2luTWFuaWZlc3RbXSA9IE9iamVjdC52YWx1ZXMobWFuYWdlci5hcHBQbHVnaW5zLm1hbmlmZXN0cykuZmlsdGVyKChwbTogUGx1Z2luTWFuaWZlc3QpID0+IHBtLmlkICE9PSBtYW5hZ2VyLm1hbmlmZXN0LmlkKSBhcyBQbHVnaW5NYW5pZmVzdFtdO1xyXG4gICAgICAgICAgICBwbHVnaW5zLmZvckVhY2gocGx1Z2luID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1wID0gbWFuYWdlci5zZXR0aW5ncy5QbHVnaW5zLmZpbmQobXAgPT4gbXAuaWQgPT09IHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXApIHtcclxuICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYG1hbmFnZXItJHttcC5pZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHttcC5lbmFibGVkID8gJ1x1NTE3M1x1OTVFRCcgOiAnXHU1RjAwXHU1NDJGJ30gJHttcC5uYW1lfSBgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1wLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtcC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtYW5hZ2VyLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKGFwcCwgbWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1wLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXIuc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbWFuYWdlci5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKGFwcCwgbWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFx1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNFxyXG4gICAgICAgIGlmIChtYW5hZ2VyLnNldHRpbmdzLkNPTU1BTkRfR1JPVVApIHtcclxuICAgICAgICAgICAgbWFuYWdlci5zZXR0aW5ncy5HUk9VUFMuZm9yRWFjaCgoZ3JvdXApID0+IHtcclxuICAgICAgICAgICAgICAgIG1hbmFnZXIuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGBtYW5hZ2VyLSR7Z3JvdXAuaWR9LWVuYWJsZWRgLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGBcdTRFMDBcdTk1MkVcdTVGMDBcdTU0MkYke2dyb3VwLm5hbWV9XHU1MjA2XHU3RUM0YCxcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZFBsdWdpbnMgPSBtYW5hZ2VyLnNldHRpbmdzLlBsdWdpbnMuZmlsdGVyKHBsdWdpbiA9PiBwbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRQbHVnaW5zLmZvckVhY2goYXN5bmMgcGx1Z2luID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4gJiYgIXBsdWdpbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbWFuYWdlci5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbi5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWFuZHMoYXBwLCBtYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1hbmFnZXIuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGBtYW5hZ2VyLSR7Z3JvdXAuaWR9LWRpc2FibGVgLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGBcdTRFMDBcdTk1MkVcdTc5ODFcdTc1Mjgke2dyb3VwLm5hbWV9XHU1MjA2XHU3RUM0YCxcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZFBsdWdpbnMgPSBtYW5hZ2VyLnNldHRpbmdzLlBsdWdpbnMuZmlsdGVyKHBsdWdpbiA9PiBwbHVnaW4uZ3JvdXAgPT09IGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRQbHVnaW5zLmZvckVhY2goYXN5bmMgcGx1Z2luID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW4gJiYgcGx1Z2luLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtYW5hZ2VyLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbihwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbi5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKGFwcCwgbWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gXHU1MzU1XHU4ODRDXHU1NDdEXHU0RUU0XHJcbiAgICAgICAgaWYgKG1hbmFnZXIuc2V0dGluZ3MuQ09NTUFORF9JVEVNKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk1hbmlmZXN0W10gPSBPYmplY3QudmFsdWVzKG1hbmFnZXIuYXBwUGx1Z2lucy5tYW5pZmVzdHMpLmZpbHRlcigocG06IFBsdWdpbk1hbmlmZXN0KSA9PiBwbS5pZCAhPT0gbWFuYWdlci5tYW5pZmVzdC5pZCkgYXMgUGx1Z2luTWFuaWZlc3RbXTtcclxuICAgICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKHBsdWdpbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmFibGVkID0gbWFuYWdlci5hcHBQbHVnaW5zLmVuYWJsZWRQbHVnaW5zLmhhcyhwbHVnaW4uaWQpO1xyXG4gICAgICAgICAgICAgICAgbWFuYWdlci5hZGRDb21tYW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogYG1hbmFnZXItJHtwbHVnaW4uaWR9YCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHtlbmFibGVkID8gbWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTQ3RFx1NEVFNFx1ODg0Q19cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDJykgOiBtYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1NDdEXHU0RUU0XHU4ODRDX1x1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkMnKX0gJHtwbHVnaW4ubmFtZX0gYCxcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbWFuYWdlci5hcHBQbHVnaW5zLmRpc2FibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyhhcHAsIG1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbWFuYWdlci5hcHBQbHVnaW5zLmVuYWJsZVBsdWdpbkFuZFNhdmUocGx1Z2luLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKGFwcCwgbWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBcdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRcclxuICAgICAgICBpZiAobWFuYWdlci5zZXR0aW5ncy5DT01NQU5EX0dST1VQKSB7XHJcbiAgICAgICAgICAgIG1hbmFnZXIuc2V0dGluZ3MuR1JPVVBTLmZvckVhY2goKGdyb3VwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBgbWFuYWdlci0ke2dyb3VwLmlkfS1lbmFibGVkYCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHttYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1NDdEXHU0RUU0XHU4ODRDX1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkMnKX0gJHtncm91cC5uYW1lfSAke21hbmFnZXIudHJhbnNsYXRvci50KCdcdTU0N0RcdTRFRTRcdTg4NENfXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQycpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRQbHVnaW5zID0gbWFuYWdlci5zZXR0aW5ncy5QbHVnaW5zLmZpbHRlcihwbHVnaW4gPT4gcGx1Z2luLmdyb3VwID09PSBncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkUGx1Z2lucy5mb3JFYWNoKGFzeW5jIHBsdWdpbiA9PiB7IGF3YWl0IG1hbmFnZXIuYXBwUGx1Z2lucy5lbmFibGVQbHVnaW5BbmRTYXZlKHBsdWdpbi5pZCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tYW5kcyhhcHAsIG1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWFuYWdlci5hZGRDb21tYW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogYG1hbmFnZXItJHtncm91cC5pZH0tZGlzYWJsZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7bWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDJyl9ICR7Z3JvdXAubmFtZX0gJHttYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU1NDdEXHU0RUU0XHU4ODRDX1x1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkMnKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkUGx1Z2lucyA9IG1hbmFnZXIuc2V0dGluZ3MuUGx1Z2lucy5maWx0ZXIocGx1Z2luID0+IHBsdWdpbi5ncm91cCA9PT0gZ3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFBsdWdpbnMuZm9yRWFjaChhc3luYyBwbHVnaW4gPT4geyBhd2FpdCBtYW5hZ2VyLmFwcFBsdWdpbnMuZGlzYWJsZVBsdWdpbkFuZFNhdmUocGx1Z2luLmlkKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1hbmRzKGFwcCwgbWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tbWFuZHMiLCAiaW1wb3J0IEJhc2VTZXR0aW5nIGZyb20gXCIuLi9iYXNlLXNldHRpbmdcIjtcclxuaW1wb3J0IHsgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyRGVsYXkgZXh0ZW5kcyBCYXNlU2V0dGluZyB7XHJcbiAgICBtYWluKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpZCA9ICcnO1xyXG4gICAgICAgIGxldCBuYW1lID0gJyc7XHJcbiAgICAgICAgbGV0IHRpbWUgPSAwO1xyXG4gICAgICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXRIZWFkaW5nKClcclxuICAgICAgICAgICAgLnNldE5hbWUodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkMnKSlcclxuICAgICAgICAgICAgLmFkZFNsaWRlcihjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldExpbWl0cygwLCAxMDAsIDEpXHJcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGltZSlcclxuICAgICAgICAgICAgICAgIC5zZXREeW5hbWljVG9vbHRpcCgpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuYWRkVGV4dChjYiA9PiBjYlxyXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdJRCcpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcih0aGlzLm1hbmFnZXIudHJhbnNsYXRvci50KCdcdTkwMUFcdTc1MjhfXHU1NDBEXHU3OUYwX1x1NjU4N1x1NjcyQycpKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0SWNvbigncGx1cycpXHJcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbnNJZCA9IHRoaXMubWFuYWdlci5zZXR0aW5ncy5ERUxBWVMuc29tZShkZWxheSA9PiBkZWxheS5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbnNJZCAmJiBpZCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldHRpbmdzLkRFTEFZUy5wdXNoKHsgaWQsIG5hbWUsIHRpbWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nVGFiLmRlbGF5RGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMCcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHRoaXMubWFuYWdlci50cmFuc2xhdG9yLnQoJ1x1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QycpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApIFxyXG4gICAgICAgIHRoaXMubWFuYWdlci5zZXR0aW5ncy5ERUxBWVMuZm9yRWFjaCgoZGVsYXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICBpdGVtLnNldHRpbmdFbC5hZGRDbGFzcygnbWFuYWdlci1zZXR0aW5nLWdyb3VwX19pdGVtJylcclxuICAgICAgICAgICAgaXRlbS5zZXROYW1lKGAke2luZGV4ICsgMX0uICR7ZGVsYXkuaWR9YClcclxuICAgICAgICAgICAgaXRlbS5hZGRTbGlkZXIoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRMaW1pdHMoMCwgMTAwLCAxKVxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKGRlbGF5LnRpbWUpXHJcbiAgICAgICAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5LnRpbWUgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgaXRlbS5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZGVsYXkubmFtZSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxheS5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBpdGVtLmFkZEV4dHJhQnV0dG9uKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0SWNvbigndHJhc2gtMicpXHJcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzVGVzdEdyb3VwID0gdGhpcy5zZXR0aW5ncy5QbHVnaW5zLnNvbWUocGx1Z2luID0+IHBsdWdpbi5kZWxheSA9PT0gZGVsYXkuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzVGVzdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlci5zZXR0aW5ncy5ERUxBWVMgPSB0aGlzLm1hbmFnZXIuc2V0dGluZ3MuREVMQVlTLmZpbHRlcih0ID0+IHQuaWQgIT09IGRlbGF5LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdUYWIuZGVsYXlEaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodGhpcy5tYW5hZ2VyLnRyYW5zbGF0b3IudCgnXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdcdTYzRDJcdTRFRjZcdTdCQTFcdTc0MDZcdTU2NjgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkM6ICdcdTYyMTBcdTUyOUYnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTkzMVx1OEQyNV9cdTY1ODdcdTY3MkM6ICdcdTU5MzFcdThEMjUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkM6ICdcdTY1QjBcdTU4OUUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjRDRFx1NEY1Q19cdTY1ODdcdTY3MkM6ICdcdTY0Q0RcdTRGNUMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkM6ICdcdTY0MUNcdTdEMjInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkM6ICdcdTU0MERcdTc5RjAnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdcdTUxNjhcdTkwRTgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdcdTUxNjhcdTkwRTgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdcdTY1RTAnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjAzQlx1OEJBMV9cdTY1ODdcdTY3MkM6ICdcdTYwM0JcdThCQTEnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdTU0MkZcdTc1MjgnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdcdTc5ODFcdTc1MjgnLFxyXG5cclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU1NDJGXHU3NTI4JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU3OTgxXHU3NTI4JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnXHU1MjA2XHU3RUM0JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4JyxcclxuICAgIFx1NTQ3RFx1NEVFNFx1ODg0Q19cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4JyxcclxuXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMDogJ1x1OEJCRlx1OTVFRVx1NEY1Q1x1ODAwNVx1NzY4NEdpdEh1Ylx1OTg3NVx1OTc2Mlx1RkYwQ1x1NjdFNVx1NzcwQlx1OTg3OVx1NzZFRVx1OEJFNlx1NjBDNVx1MzAwMVx1NjZGNFx1NjVCMFx1NjVFNVx1NUZEN1x1MzAwMVx1NTNDMlx1NEUwRVx1OEJBOFx1OEJCQVx1NTQ4Q1x1OEQyMVx1NzMyRVx1NEVFM1x1NzgwMVx1MzAwMicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4OUM2XHU5ODkxXHU2NTU5XHU3QTBCX1x1NjNDRlx1OEZGMDogJ1x1OEJCRlx1OTVFRVx1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1NTQyRlx1NzUyOFx1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRlx1RkYwQ1x1NkRGMVx1NUVBNlx1ODFFQVx1NUI5QVx1NEU0OVx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU5MUNEXHU4RjdEXHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNlx1RkYwQ1x1NTM3M1x1NjVGNlx1NzUxRlx1NjU0OCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwX1x1NjNDRlx1OEZGMDogJ1x1NjhDMFx1NjdFNVx1NjNEMlx1NEVGNlx1NjZGNFx1NjVCMCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOFx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOFx1NjI0MFx1NjcwOVx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1N0JBMVx1NzQwNlx1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1NEVDNVx1NjYzRVx1NzkzQVx1NURGMlx1NTQyRlx1NzUyOFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2NzJBXHU1MjA2XHU3RUM0X1x1NjNDRlx1OEZGMDogJ1x1N0I1Qlx1OTAwOVx1NjI0MFx1NjcwOVx1NjcyQVx1NTIwNlx1N0VDNFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RVx1NzU0Q1x1OTc2MicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMDogJ1x1OEZEOFx1NTM5Rlx1NTIxRFx1NTlDQlx1NzJCNlx1NjAwMScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1X1x1NjNDRlx1OEZGMDogJ1x1NjI1M1x1NUYwMFx1NjNEMlx1NEVGNlx1NzZFRVx1NUY1NScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1x1NUY3Qlx1NUU5NVx1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ1x1NTIwN1x1NjM2Mlx1NjNEMlx1NEVGNlx1NzJCNlx1NjAwMScsXHJcblxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5ODogJ1x1NTM3OFx1OEY3RFx1NjNEMlx1NEVGNicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnXHU0RjYwXHU3ODZFXHU1QjlBXHU4OTgxXHU1Mzc4XHU4RjdEXHU2QjY0XHU2M0QyXHU0RUY2XHU1NDE3XHVGRjFGXHU4RkQ5XHU1QzA2XHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2XHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHUzMDAyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzNzhcdThGN0Q6ICdcdTUzNzhcdThGN0QnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ1x1NTNENlx1NkQ4OCcsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1x1NTM3OFx1OEY3RFx1NjIxMFx1NTI5RicsXHJcblxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NjgwN1x1OTg5ODogJ1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTYzRDJcdTRFRjYnLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NjNEMFx1NzkzQTogJ1x1NEY2MFx1Nzg2RVx1NUI5QVx1ODk4MVx1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTZCNjRcdTk4NzVcdTk3NjJcdTYzRDJcdTRFRjZcdTU0MTdcdUZGMUZcdThGRDlcdTVDMDZcdTY1RTBcdTZDRDVcdTYwNjJcdTU5MERcdTMwMDIoXHU1NDJGXHU3NTI4L1x1Nzk4MVx1NzUyOFx1OEZDN1x1N0EwQlx1NEUyRFx1OEJGN1x1ODAxMFx1NUZDM1x1N0I0OVx1NUY4NSknLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NTQyRlx1Nzk4MTogJ1x1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjgnLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NTNENlx1NkQ4ODogJ1x1NTNENlx1NkQ4OCcsXHJcbiAgICBcdTRFMDBcdTk1MkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1x1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTYyMTBcdTUyOUYnLFxyXG5cclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1NTdGQVx1Nzg0MCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1NTIwNlx1N0VDNCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1NjgwN1x1N0I3RScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1NUVGNlx1OEZERicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2ODA3XHU5ODk4OiAnXHU4QkVEXHU4QTAwXHU4QkJFXHU3RjZFJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjNDRlx1OEZGMDogJ1x1OTAwOVx1NjJFOVx1NjBBOFx1NTU5Q1x1NkIyMlx1NzY4NFx1OEJFRFx1OEEwMFx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzU0Q1x1OTc2Mlx1NUM0NVx1NEUyRF9cdTY4MDdcdTk4OTg6ICdcdTc1NENcdTk3NjJcdTVDNDVcdTRFMkQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc1NENcdTk3NjJcdTVDNDVcdTRFMkRfXHU2M0NGXHU4RkYwOiAnXHU4QkJFXHU3RjZFXHU3QkExXHU3NDA2XHU1NjY4XHU3NTRDXHU5NzYyXHU2NjJGXHU1NDI2XHU1QzQ1XHU0RTJEJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdcdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHU5MDA5XHU2MkU5XHU1MjA2XHU3RUM0XHU3Njg0XHU2ODM3XHU1RjBGXHVGRjBDXHU0RUU1XHU2M0QwXHU1MzQ3XHU2RDRGXHU4OUM4XHU0RjUzXHU5QThDXHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDA6ICdcdTU5Q0JcdTdFQzhcdTVDNTVcdTVGMDAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QzogJ1x1NkMzOFx1NEUwRFx1NUM1NVx1NUYwMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5OiAnXHU2MEFDXHU2RDZFXHU1QzU1XHU1RjAwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTU2REI6ICdcdTUzNTVcdTUxRkJcdTVDNTVcdTVGMDAnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTkwMDlcdTYyRTlcdTUyMDZcdTdFQzRcdTc2ODRcdTY4MzdcdTVGMEZcdUZGMENcdTRGN0ZcdTUyMDZcdTdFQzRcdTY2RjRcdTUyQTBcdTY2MEVcdTY2M0VcdUZGMENcdTRGQkZcdTRFOEVcdThCQzZcdTUyMkJcdTMwMDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwMDogJ1x1NjgzN1x1NUYwRlx1NEUwMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RThDOiAnXHU2ODM3XHU1RjBGXHU0RThDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDk6ICdcdTY4MzdcdTVGMEZcdTRFMDknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQjogJ1x1NjgzN1x1NUYwRlx1NTZEQicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1OTAwOVx1NjJFOVx1NjgwN1x1N0I3RVx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwQ1x1NEY3Rlx1NjgwN1x1N0I3RVx1NjZGNFx1NTJBMFx1NjYwRVx1NjYzRVx1RkYwQ1x1NEZCRlx1NEU4RVx1OEJDNlx1NTIyQlx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTAwOiAnXHU2ODM3XHU1RjBGXHU0RTAwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFOEM6ICdcdTY4MzdcdTVGMEZcdTRFOEMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEUwOTogJ1x1NjgzN1x1NUYwRlx1NEUwOScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU1NkRCOiAnXHU2ODM3XHU1RjBGXHU1NkRCJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTg6ICdcdTVFRjZcdTY1RjZcdTU0MkZcdTUyQTgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnXHU1NDJGXHU3NTI4XHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4XHU1MjlGXHU4MEZEXHU1M0VGXHU0RUU1XHU0RjE4XHU1MzE2XHU1MkEwXHU4RjdEXHU5ODdBXHU1RThGXHVGRjBDXHU0RjQ2XHU4QkY3XHU2Q0U4XHU2MTBGXHVGRjBDXHU4RkQ5XHU1M0VGXHU4MEZEXHU0RjFBXHU1QkZDXHU4MUY0XHU2N0QwXHU0RTlCXHU2M0QyXHU0RUY2XHU1MUZBXHU3M0IwXHU1MTdDXHU1QkI5XHU2MDI3XHU5NUVFXHU5ODk4XHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjgwN1x1OTg5ODogJ1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTRFM0FcdTY3MkFcdTU0MkZcdTc1MjhcdTc2ODRcdTYzRDJcdTRFRjZcdTYzRDBcdTRGOUJcdTg5QzZcdTg5QzlcdTZERTFcdTUzMTZcdTY1NDhcdTY3OUNcdUZGMENcdTRFRTVcdTRGQkZcdTZFMDVcdTY2NzBcdTU3MzBcdTUzM0FcdTUyMDZcdTU0MkZcdTc1MjhcdTU0OENcdTY3MkFcdTU0MkZcdTc1MjhcdTc2ODRcdTYzRDJcdTRFRjZcdTMwMDInLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3QjVCXHU5MDA5XHU2MzAxXHU0RTQ1XHU1MzE2X1x1NjgwN1x1OTg5ODogJ1x1N0I1Qlx1OTAwOVx1NjMwMVx1NEU0NVx1NTMxNicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1N0I1Qlx1OTAwOVx1NjMwMVx1NEU0NVx1NTMxNl9cdTYzQ0ZcdThGRjA6ICdcdTU0MkZcdTc1MjhcdTU0MEVcdUZGMENcdTYwQThcdTVDMDZcdTU3MjhcdTZCQ0ZcdTZCMjFcdTYyNTNcdTVGMDBcdTdCQTFcdTc0MDZcdTU2NjhcdTY1RjZcdTc3MEJcdTUyMzBcdTc2RjhcdTU0MENcdTc2ODRcdTYzRDJcdTRFRjZcdTUyMTdcdTg4NjhcdTMwMDInLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1NTM1NVx1NzJFQ1x1NjNBN1x1NTIzNlx1NjNEMlx1NEVGNlx1NTQ3RFx1NEVFNCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdcdTU0MkZcdTc1MjhcdTZCNjRcdTkwMDlcdTk4NzlcdTUzRUZcdTRFRTVcdTUzNTVcdTcyRUNcdTYzQTdcdTUyMzZcdTZCQ0ZcdTRFMkFcdTYzRDJcdTRFRjZcdTc2ODRcdTU0MkZcdTc1MjhcdTU0OENcdTc5ODFcdTc1MjhcdTcyQjZcdTYwMDFcdTMwMDIoXHU5MUNEXHU1NDJGT2JzaWRpYW5cdTc1MUZcdTY1NDgpJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1NTIwNlx1N0VDNFx1NjNBN1x1NTIzNlx1NjNEMlx1NEVGNlx1NTQ3RFx1NEVFNCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdcdTU0MkZcdTc1MjhcdTZCNjRcdTkwMDlcdTk4NzlcdTUzRUZcdTRFRTVcdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhcdTYyMTZcdTc5ODFcdTc1MjhcdTYzMDdcdTVCOUFcdTUyMDZcdTdFQzRcdTRFMkRcdTc2ODRcdTYyNDBcdTY3MDlcdTYzRDJcdTRFRjZcdTMwMDIoXHU5MUNEXHU1NDJGT2JzaWRpYW5cdTc1MUZcdTY1NDgpJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHU1RUY2XHU4RkRGXSBcdTVERjJcdTZERkJcdTUyQTAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1NUVGNlx1OEZERl0gSURcdTVERjJcdTVCNThcdTU3MjhcdTYyMTZcdTRFM0FcdTdBN0EnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1NUVGNlx1OEZERl0gXHU1MjIwXHU5NjY0XHU2MjEwXHU1MjlGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tcdTVFRjZcdThGREZdIFx1NTIyMFx1OTY2NFx1NTkzMVx1OEQyNVx1RkYwQ1x1NkI2NFx1NUVGNlx1OEZERlx1NEUwQlx1NUI1OFx1NTcyOFx1NjNEMlx1NEVGNicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1x1NTIwNlx1N0VDNF0gXHU1REYyXHU2REZCXHU1MkEwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tcdTUyMDZcdTdFQzRdIElEXHU1REYyXHU1QjU4XHU1NzI4XHU2MjE2XHU0RTNBXHU3QTdBJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdTUyMDZcdTdFQzRdIFx1NTIyMFx1OTY2NFx1NjIxMFx1NTI5RicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHU1MjA2XHU3RUM0XSBcdTUyMjBcdTk2NjRcdTU5MzFcdThEMjVcdUZGMENcdTZCNjRcdTUyMDZcdTdFQzRcdTRFMEJcdTVCNThcdTU3MjhcdTYzRDJcdTRFRjYnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdTY4MDdcdTdCN0VdIFx1NURGMlx1NkRGQlx1NTJBMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHU2ODA3XHU3QjdFXSBJRFx1NURGMlx1NUI1OFx1NTcyOFx1NjIxNlx1NEUzQVx1N0E3QScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbXHU2ODA3XHU3QjdFXSBcdTUyMjBcdTk2NjRcdTYyMTBcdTUyOUYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1NjgwN1x1N0I3RV0gXHU1MjIwXHU5NjY0XHU1OTMxXHU4RDI1XHVGRjBDXHU2QjY0XHU2ODA3XHU3QjdFXHU0RTBCXHU1QjU4XHU1NzI4XHU2M0QyXHU0RUY2JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTY4MDdcdTk4OTg6ICdcdTU5ODJcdTY3OUNcdTkwNDdcdTUyMzBcdTY3MkNcdTYzRDJcdTRFRjZcdTRFMEVcdTUxNzZcdTRFRDZcdTYzRDJcdTRFRjZcdTUxQjJcdTdBODEnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnXHU0RTJBXHU0RUJBXHU4MEZEXHU1MjlCXHU2NzA5XHU5NjUwXHVGRjBDXHU2NUUwXHU2Q0Q1XHU0RkVFXHU1OTBEXHU2QjY0XHU5NUVFXHU5ODk4XHVGRjBDXHU4QkY3XHU1MTczXHU5NUVEXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4XHVGRjBDXHU1MzczXHU1M0VGXHU4OUUzXHU1MUIzXHU0RTAwXHU1MjA3XHU1MUIyXHU3QTgxXHU5NUVFXHU5ODk4XHUzMDAyJyxcclxuXHJcbiAgICBcdTU0N0RcdTRFRTRfXHU3QkExXHU3NDA2XHU5NzYyXHU2NzdGX1x1NjNDRlx1OEZGMDogJ1x1NUYwMFx1NTQyRlx1NjNEMlx1NEVGNlx1N0JBMVx1NzQwNlx1NTY2OCcsXHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdQbHVnaW4gTWFuYWdlcicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MjEwXHU1MjlGX1x1NjU4N1x1NjcyQzogJ1N1Y2Nlc3MnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTkzMVx1OEQyNV9cdTY1ODdcdTY3MkM6ICdGYWlsdXJlJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDOiAnQWRkJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnT3BlcmF0aW9uJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDOiAnU2VhcmNoJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDOiAnTmFtZScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQzogJ0FMTCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU2ODA3XHU3QjdFX1x1NjU4N1x1NjcyQzogJ0FMTCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU1RUY2XHU4RkRGX1x1NjU4N1x1NjcyQzogJ05vIERlbGF5JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYwM0JcdThCQTFfXHU2NTg3XHU2NzJDOiAnVG90YWwnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQyRlx1NzUyOF9cdTY1ODdcdTY3MkM6ICdFbmFibGUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdEaXNhYmxlJyxcclxuXHJcbiAgICBcdTU0N0RcdTRFRTRcdTg4NENfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQzogJ0VuYWJsZScsXHJcbiAgICBcdTU0N0RcdTRFRTRcdTg4NENfXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQzogJ0Rpc2FibGUnLFxyXG4gICAgXHU1NDdEXHU0RUU0XHU4ODRDX1x1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdHcm91cCcsXHJcbiAgICBcdTU0N0RcdTRFRTRcdTg4NENfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQzogJ09uZSAtIGNsaWNrIEVuYWJsZScsXHJcbiAgICBcdTU0N0RcdTRFRTRcdTg4NENfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQzogJ09uZSAtIGNsaWNrIERpc2FibGUnLFxyXG5cclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9HSVRIVUJfXHU2M0NGXHU4RkYwOiAnVmlzaXQgdGhlIGF1dGhvclxcJ3MgR2l0SHViIHBhZ2UgdG8gdmlldyBwcm9qZWN0IGRldGFpbHMsIHVwZGF0ZSBsb2dzLCBwYXJ0aWNpcGF0ZSBpbiBkaXNjdXNzaW9ucywgYW5kIGNvbnRyaWJ1dGUgY29kZS4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQl9cdTYzQ0ZcdThGRjA6ICdBY2Nlc3MgdmlkZW8gdHV0b3JpYWxzJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTdGMTZcdThGOTFcdTZBMjFcdTVGMEZfXHU2M0NGXHU4RkYwOiAnRW5hYmxlIGVkaXQgbW9kZSBmb3IgaW4tZGVwdGggcGx1Z2luIGNvbmZpZ3VyYXRpb24gY3VzdG9taXphdGlvbicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU5MUNEXHU4RjdEXHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1JlbG9hZCBwbHVnaW5zIHRvIHRha2UgZWZmZWN0IGltbWVkaWF0ZWx5JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjBfXHU2M0NGXHU4RkYwOiAnQ2hlY2sgZm9yIHBsdWdpbiB1cGRhdGVzJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2M0NGXHU4RkYwOiAnRGlzYWJsZSBhbGwgcGx1Z2lucyBhdCBvbmNlJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFMDBcdTk1MkVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwOiAnRW5hYmxlIGFsbCBwbHVnaW5zIGF0IG9uY2UnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdNYW5hZ2UgcGx1Z2luIHNldHRpbmdzJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFQzVcdTU0MkZcdTc1MjhfXHU2M0NGXHU4RkYwOiAnT25seSBkaXNwbGF5IGVuYWJsZWQgcGx1Z2lucycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2NzJBXHU1MjA2XHU3RUM0X1x1NjNDRlx1OEZGMDogJ0ZpbHRlciBhbGwgdW5ncm91cGVkIHBsdWdpbnMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdPcGVuIHRoZSBzZXR0aW5ncyBpbnRlcmZhY2UnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOV9cdTYzQ0ZcdThGRjA6ICdSZXN0b3JlIHRvIHRoZSBpbml0aWFsIHN0YXRlJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdTc2RUVcdTVGNTVfXHU2M0NGXHU4RkYwOiAnT3BlbiB0aGUgcGx1Z2luIGRpcmVjdG9yeScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjIwXHU5NjY0XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ0NvbXBsZXRlbHkgZGVsZXRlIHRoZSBwbHVnaW4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIwN1x1NjM2Mlx1NzJCNlx1NjAwMV9cdTYzQ0ZcdThGRjA6ICdUb2dnbGUgdGhlIHBsdWdpbiBzdGF0dXMnLFxyXG5cclxuICAgIFx1NTM3OFx1OEY3RF9cdTY4MDdcdTk4OTg6ICdVbmluc3RhbGwgUGx1Z2luJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTYzRDBcdTc5M0E6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gdW5pbnN0YWxsIHRoaXMgcGx1Z2luPyBUaGlzIHdpbGwgZGVsZXRlIHRoZSBwbHVnaW5cXCdzIGZvbGRlci4nLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTM3OFx1OEY3RDogJ1VuaW5zdGFsbCcsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1M0Q2XHU2RDg4OiAnQ2FuY2VsJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnVW5pbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5JyxcclxuXHJcbiAgICBcdTRFMDBcdTk1MkVfXHU2ODA3XHU5ODk4OiAnT25lLWNsaWNrIEVuYWJsZS9EaXNhYmxlIFBsdWdpbnMnLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NjNEMFx1NzkzQTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBlbmFibGUvZGlzYWJsZSB0aGUgcGx1Z2lucyBvbiB0aGlzIHBhZ2Ugd2l0aCBvbmUgY2xpY2s/IFRoaXMgYWN0aW9uIGNhbm5vdCBiZSB1bmRvbmUuIChQbGVhc2Ugd2FpdCBwYXRpZW50bHkgZHVyaW5nIHRoZSBlbmFibGUvZGlzYWJsZSBwcm9jZXNzKScsXHJcbiAgICBcdTRFMDBcdTk1MkVfXHU1NDJGXHU3OTgxOiAnRW5hYmxlL0Rpc2FibGUnLFxyXG4gICAgXHU0RTAwXHU5NTJFX1x1NTNENlx1NkQ4ODogJ0NhbmNlbCcsXHJcbiAgICBcdTRFMDBcdTk1MkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ0VuYWJsZS9EaXNhYmxlIFN1Y2Nlc3NmdWwnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnQmFzaWMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdHcm91cCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1RhZycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ0RlbGF5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTY4MDdcdTk4OTg6ICdMYW5ndWFnZSBTZXR0aW5ncycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTYzQ0ZcdThGRjA6ICdDaG9vc2UgeW91ciBwcmVmZXJyZWQgbGFuZ3VhZ2UuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NTRDXHU5NzYyXHU1QzQ1XHU0RTJEX1x1NjgwN1x1OTg5ODogJ0NlbnRlciB0aGUgaW50ZXJmYWNlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NTRDXHU5NzYyXHU1QzQ1XHU0RTJEX1x1NjNDRlx1OEZGMDogJ1NldCB3aGV0aGVyIHRoZSBtYW5hZ2VyIGludGVyZmFjZSBpcyBjZW50ZXJlZCcsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnRGlyZWN0b3J5IFN0eWxlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1NlbGVjdCB0aGUgc3R5bGUgb2YgdGhlIGdyb3VwIHRvIGVuaGFuY2UgdGhlIGJyb3dzaW5nIGV4cGVyaWVuY2UuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDA6ICdBbHdheXMgRXhwYW5kZWQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QzogJ05ldmVyIEV4cGFuZGVkJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDk6ICdIb3ZlciB0byBFeHBhbmQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQjogJ0NsaWNrIHRvIEV4cGFuZCcsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnR3JvdXAgU3R5bGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnU2VsZWN0IHRoZSBzdHlsZSBvZiB0aGUgZ3JvdXAgdG8gbWFrZSBpdCBtb3JlIG5vdGljZWFibGUgYW5kIGVhc3kgdG8gaWRlbnRpZnkuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDA6ICdTdHlsZSBPbmUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QzogJ1N0eWxlIFR3bycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5OiAnU3R5bGUgVGhyZWUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQjogJ1N0eWxlIEZvdXInLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1RhZyBTdHlsZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdTZWxlY3QgdGhlIHN0eWxlIG9mIHRoZSB0YWcgdG8gbWFrZSBpdCBtb3JlIG5vdGljZWFibGUgYW5kIGVhc3kgdG8gaWRlbnRpZnkuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1OTAwOVx1OTg3OV9cdTRFMDA6ICdTdHlsZSBPbmUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NEU4QzogJ1N0eWxlIFR3bycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTkwMDlcdTk4NzlfXHU0RTA5OiAnU3R5bGUgVGhyZWUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU5MDA5XHU5ODc5X1x1NTZEQjogJ1N0eWxlIEZvdXInLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjgwN1x1OTg5ODogJ0RlbGF5ZWQgU3RhcnR1cCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTYzQ0ZcdThGRjA6ICdFbmFibGluZyB0aGUgZGVsYXllZCBzdGFydHVwIGZlYXR1cmUgY2FuIG9wdGltaXplIHRoZSBsb2FkaW5nIG9yZGVyLCBidXQgcGxlYXNlIG5vdGUgdGhhdCB0aGlzIG1heSBjYXVzZSBjb21wYXRpYmlsaXR5IGlzc3VlcyB3aXRoIHNvbWUgcGx1Z2lucy4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2ODA3XHU5ODk4OiAnRmFkZSBQbHVnaW5zJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjNDRlx1OEZGMDogJ1Byb3ZpZGUgYSB2aXN1YWwgZmFkZSBlZmZlY3QgZm9yIGRpc2FibGVkIHBsdWdpbnMgdG8gY2xlYXJseSBkaXN0aW5ndWlzaCBiZXR3ZWVuIGVuYWJsZWQgYW5kIGRpc2FibGVkIHBsdWdpbnMuJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1N0I1Qlx1OTAwOVx1NjMwMVx1NEU0NVx1NTMxNl9cdTY4MDdcdTk4OTg6ICdGaWx0ZXIgUGVyc2lzdGVuY2UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTdCNUJcdTkwMDlcdTYzMDFcdTRFNDVcdTUzMTZfXHU2M0NGXHU4RkYwOiAnQWZ0ZXIgZW5hYmxpbmcsIHlvdSB3aWxsIHNlZSB0aGUgc2FtZSBwbHVnaW4gbGlzdCBldmVyeSB0aW1lIHlvdSBvcGVuIHRoZSBtYW5hZ2VyLicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnQ29udHJvbCBQbHVnaW4gQ29tbWFuZHMgU2VwYXJhdGVseScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdFbmFibGUgdGhpcyBvcHRpb24gdG8gY29udHJvbCB0aGUgZW5hYmxlZCBhbmQgZGlzYWJsZWQgc3RhdGUgb2YgZWFjaCBwbHVnaW4gc2VwYXJhdGVseS4gKFJlc3RhcnQgT2JzaWRpYW4gdG8gdGFrZSBlZmZlY3QpJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ0NvbnRyb2wgUGx1Z2luIENvbW1hbmRzIGJ5IEdyb3VwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ0VuYWJsZSB0aGlzIG9wdGlvbiB0byBlbmFibGUgb3IgZGlzYWJsZSBhbGwgcGx1Z2lucyBpbiBhIHNwZWNpZmllZCBncm91cCB3aXRoIG9uZSBjbGljay4gKFJlc3RhcnQgT2JzaWRpYW4gdG8gdGFrZSBlZmZlY3QpJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbRGVsYXldIEFkZGVkJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tEZWxheV0gSUQgYWxyZWFkeSBleGlzdHMgb3IgaXMgZW1wdHknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW0RlbGF5XSBEZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbRGVsYXldIERlbGV0aW9uIGZhaWxlZCwgcGx1Z2lucyBleGlzdCB1bmRlciB0aGlzIGRlbGF5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbR3JvdXBdIEFkZGVkJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tHcm91cF0gSUQgYWxyZWFkeSBleGlzdHMgb3IgaXMgZW1wdHknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW0dyb3VwXSBEZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbR3JvdXBdIERlbGV0aW9uIGZhaWxlZCwgcGx1Z2lucyBleGlzdCB1bmRlciB0aGlzIGdyb3VwJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbVGFnXSBBZGRlZCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbVGFnXSBJRCBhbHJlYWR5IGV4aXN0cyBvciBpcyBlbXB0eScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbVGFnXSBEZWxldGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbVGFnXSBEZWxldGlvbiBmYWlsZWQsIHBsdWdpbnMgZXhpc3QgdW5kZXIgdGhpcyB0YWcnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjgwN1x1OTg5ODogJ0lmIFlvdSBFbmNvdW50ZXIgQ29uZmxpY3RzIHdpdGggT3RoZXIgUGx1Z2lucycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTYzQ0ZcdThGRjA6ICdEdWUgdG8gbGltaXRlZCBjYXBhYmlsaXRpZXMsIEkgY2Fubm90IGZpeCB0aGlzIGlzc3VlLiBQbGVhc2UgZGlzYWJsZSBkZWxheWVkIHN0YXJ0dXAgdG8gcmVzb2x2ZSBhbGwgY29uZmxpY3QgaXNzdWVzLicsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjA6ICdPcGVuIHRoZSBwbHVnaW4gbWFuYWdlcicsXHJcbn1cclxuIiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFx1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDOiAnXHUwNDFDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDM0XHUwNDM2XHUwNDM1XHUwNDQwIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MjEwXHU1MjlGX1x1NjU4N1x1NjcyQzogJ1x1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0NScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1OTMxXHU4RDI1X1x1NjU4N1x1NjcyQzogJ1x1MDQxRFx1MDQzNVx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQ0N1x1MDQzMCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUIwXHU1ODlFX1x1NjU4N1x1NjcyQzogJ1x1MDQxNFx1MDQzRVx1MDQzMVx1MDQzMFx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NENEXHU0RjVDX1x1NjU4N1x1NjcyQzogJ1x1MDQxRVx1MDQzRlx1MDQzNVx1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQ0RicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NDFDXHU3RDIyX1x1NjU4N1x1NjcyQzogJ1x1MDQxRlx1MDQzRVx1MDQzOFx1MDQ0MVx1MDQzQScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDBEXHU3OUYwX1x1NjU4N1x1NjcyQzogJ1x1MDQxRFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU1MjA2XHU3RUM0X1x1NjU4N1x1NjcyQzogJ1x1MDQxMVx1MDQzNVx1MDQzNyBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0NEInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdcdTA0MTFcdTA0MzVcdTA0MzcgXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDM4JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDOiAnXHUwNDExXHUwNDM1XHUwNDM3IFx1MDQzN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzOCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2MDNCXHU4QkExX1x1NjU4N1x1NjcyQzogJ1x1MDQxMlx1MDQ0MVx1MDQzNVx1MDQzM1x1MDQzRScsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQzogJ1x1MDQxMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQzogJ1x1MDQxRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQ0QycsXHJcblxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X0dJVEhVQl9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0M0VcdTA0NDFcdTA0MzVcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDQzIFx1MDQzMFx1MDQzMlx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzMCBcdTA0M0RcdTA0MzAgR2l0SHViLCBcdTA0NDdcdTA0NDJcdTA0M0VcdTA0MzFcdTA0NEIgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQxXHUwNDNDXHUwNDNFXHUwNDQyXHUwNDQwXHUwNDM1XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzRVx1MDQzNFx1MDQ0MFx1MDQzRVx1MDQzMVx1MDQzRFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzVcdTA0M0FcdTA0NDJcdTA0MzAsIFx1MDQzNlx1MDQ0M1x1MDQ0MFx1MDQzRFx1MDQzMFx1MDQzQiBcdTA0M0VcdTA0MzFcdTA0M0RcdTA0M0VcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzksIFx1MDQzRlx1MDQ0MFx1MDQzOFx1MDQzRFx1MDQ0Rlx1MDQ0Mlx1MDQ0QyBcdTA0NDNcdTA0NDdcdTA0MzBcdTA0NDFcdTA0NDJcdTA0MzhcdTA0MzUgXHUwNDMyIFx1MDQzRVx1MDQzMVx1MDQ0MVx1MDQ0M1x1MDQzNlx1MDQzNFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzOCBcdTA0MzggXHUwNDMyXHUwNDNEXHUwNDM1XHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQ0MVx1MDQzMlx1MDQzRVx1MDQzOSBcdTA0MzJcdTA0M0FcdTA0M0JcdTA0MzBcdTA0MzQgXHUwNDMyIFx1MDQzQVx1MDQzRVx1MDQzNC4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQl9cdTYzQ0ZcdThGRjA6ICdcdTA0MTRcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NDNcdTA0M0YgXHUwNDNBIFx1MDQzMlx1MDQzOFx1MDQzNFx1MDQzNVx1MDQzRVx1MDQ0M1x1MDQ0MFx1MDQzRVx1MDQzQVx1MDQzMFx1MDQzQycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1MDQxMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDBcdTA0MzVcdTA0MzZcdTA0MzhcdTA0M0MgXHUwNDQwXHUwNDM1XHUwNDM0XHUwNDMwXHUwNDNBXHUwNDQyXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzNcdTA0M0JcdTA0NDNcdTA0MzFcdTA0M0VcdTA0M0FcdTA0M0VcdTA0MzkgXHUwNDNEXHUwNDMwXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDNBXHUwNDM4IFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0M0RcdTA0MzVcdTA0M0NcdTA0MzVcdTA0MzRcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzNcdTA0M0UgXHUwNDMyXHUwNDQxXHUwNDQyXHUwNDQzXHUwNDNGXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzMiBcdTA0NDFcdTA0MzhcdTA0M0JcdTA0NDMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMF9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NENcdTA0NDJcdTA0MzUgXHUwNDNFXHUwNDMxXHUwNDNEXHUwNDNFXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU3OTgxXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1MDQxRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzJcdTA0NDFcdTA0MzUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCIFx1MDQzRVx1MDQzNFx1MDQzRFx1MDQzOFx1MDQzQyBcdTA0M0FcdTA0M0JcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0MnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTA0MTJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDMyXHUwNDQxXHUwNDM1IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQ0QiBcdTA0M0VcdTA0MzRcdTA0M0RcdTA0MzhcdTA0M0MgXHUwNDNBXHUwNDNCXHUwNDM4XHUwNDNBXHUwNDNFXHUwNDNDJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYzRDJcdTRFRjZcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnXHUwNDIzXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQzQVx1MDQzMFx1MDQzQ1x1MDQzOCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEVDNVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0M0VcdTA0M0FcdTA0MzBcdTA0MzdcdTA0NEJcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDQyXHUwNDNFXHUwNDNCXHUwNDRDXHUwNDNBXHUwNDNFIFx1MDQzMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdTA0MUVcdTA0NDJcdTA0M0FcdTA0NDBcdTA0M0VcdTA0MzlcdTA0NDJcdTA0MzUgXHUwNDM4XHUwNDNEXHUwNDQyXHUwNDM1XHUwNDQwXHUwNDQ0XHUwNDM1XHUwNDM5XHUwNDQxIFx1MDQzRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzNVx1MDQzQScsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4RkQ4XHU1MzlGXHU1MTg1XHU1QkI5X1x1NjNDRlx1OEZGMDogJ1x1MDQxMlx1MDQzNVx1MDQ0MFx1MDQzRFx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzBcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDQxXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDNFXHUwNDRGXHUwNDNEXHUwNDM4XHUwNDM1JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdTc2RUVcdTVGNTVfXHU2M0NGXHU4RkYwOiAnXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQVx1MDQzMFx1MDQ0Mlx1MDQzMFx1MDQzQlx1MDQzRVx1MDQzMyBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTA0MUZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0M0VcdTA0NDFcdTA0NDJcdTA0NENcdTA0NEUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ1x1MDQxRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDJcdTA0NDNcdTA0NDEgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDMwJyxcclxuXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2ODA3XHU5ODk4OiAnXHUwNDIzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRCcsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnXHUwNDEyXHUwNDRCIFx1MDQ0M1x1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzRFx1MDQ0QiwgXHUwNDQ3XHUwNDQyXHUwNDNFIFx1MDQ0NVx1MDQzRVx1MDQ0Mlx1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDREXHUwNDQyXHUwNDNFXHUwNDQyIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRD8gXHUwNDJEXHUwNDQyXHUwNDNFIFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0MiBcdTA0M0ZcdTA0MzBcdTA0M0ZcdTA0M0FcdTA0NDMgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDMwLicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnXHUwNDIzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODg6ICdcdTA0MUVcdTA0NDJcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzAnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdcdTA0MjNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1MDQxRVx1MDQ0MVx1MDQzRFx1MDQzRVx1MDQzMlx1MDQzRFx1MDQ0Qlx1MDQzNScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1MDQxM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQzMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1MDQxQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzMCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1MDQxN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzMCcsXHJcblxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5ODogJ1x1MDQxRFx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzRVx1MDQzOVx1MDQzQVx1MDQzOCBcdTA0NEZcdTA0MzdcdTA0NEJcdTA0M0FcdTA0MzAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQzRlx1MDQ0MFx1MDQzNVx1MDQzNFx1MDQzRlx1MDQzRVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzMFx1MDQzNVx1MDQzQ1x1MDQ0Qlx1MDQzOSBcdTA0NEZcdTA0MzdcdTA0NEJcdTA0M0EuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1MDQyMVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0QyBcdTA0M0FcdTA0MzBcdTA0NDJcdTA0MzBcdTA0M0JcdTA0M0VcdTA0MzNcdTA0MzAnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0QyBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0NEIgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQ0M1x1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQ0OFx1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0NDFcdTA0M0NcdTA0M0VcdTA0NDJcdTA0NDBcdTA0MzAuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1MDQyMVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0QyBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0NEInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDRCXHUwNDMxXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQlx1MDQ0QyBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0NEIgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQ0OFx1MDQzNVx1MDQzOSBcdTA0MzJcdTA0MzhcdTA0MzRcdTA0MzhcdTA0M0NcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDM4IFx1MDQzOFx1MDQzNFx1MDQzNVx1MDQzRFx1MDQ0Mlx1MDQzOFx1MDQ0NFx1MDQzOFx1MDQzQVx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHUwNDIxXHUwNDQyXHUwNDM4XHUwNDNCXHUwNDRDIFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTA0MTJcdTA0NEJcdTA0MzFcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDM4XHUwNDNCXHUwNDRDIFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzOCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNCXHUwNDQzXHUwNDQ3XHUwNDQ4XHUwNDM1XHUwNDM5IFx1MDQzMlx1MDQzOFx1MDQzNFx1MDQzOFx1MDQzQ1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzggXHUwNDM4XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDQyXHUwNDM4XHUwNDQ0XHUwNDM4XHUwNDNBXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4LicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2ODA3XHU5ODk4OiAnXHUwNDE3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDMwIFx1MDQzRlx1MDQ0MFx1MDQzOCBcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0M0FcdTA0MzUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0NFx1MDQ0M1x1MDQzRFx1MDQzQVx1MDQ0Nlx1MDQzOFx1MDQzOCBcdTA0MzdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzggXHUwNDNGXHUwNDQwXHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzNSBcdTA0M0NcdTA0M0VcdTA0MzZcdTA0MzVcdTA0NDIgXHUwNDNFXHUwNDNGXHUwNDQyXHUwNDM4XHUwNDNDXHUwNDM4XHUwNDM3XHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzRlx1MDQzRVx1MDQ0MFx1MDQ0Rlx1MDQzNFx1MDQzRVx1MDQzQSBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzgsIFx1MDQzRFx1MDQzRSBcdTA0M0VcdTA0MzFcdTA0NDBcdTA0MzBcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgXHUwNDMyXHUwNDNEXHUwNDM4XHUwNDNDXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1LCBcdTA0NDdcdTA0NDJcdTA0M0UgXHUwNDREXHUwNDQyXHUwNDNFIFx1MDQzQ1x1MDQzRVx1MDQzNlx1MDQzNVx1MDQ0MiBcdTA0MzJcdTA0NEJcdTA0MzdcdTA0MzJcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDM1XHUwNDNDXHUwNDRCIFx1MDQ0MVx1MDQzRVx1MDQzMlx1MDQzQ1x1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzOFx1MDQzQ1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0NDEgXHUwNDNEXHUwNDM1XHUwNDNBXHUwNDNFXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDRCXHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzMFx1MDQzQ1x1MDQzOC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2ODA3XHU5ODk4OiAnXHUwNDIxXHUwNDNCXHUwNDMwXHUwNDMxXHUwNDNFIFx1MDQzMlx1MDQzOFx1MDQzNFx1MDQzOFx1MDQzQ1x1MDQ0Qlx1MDQzNSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHUwNDFGXHUwNDQwXHUwNDM1XHUwNDM0XHUwNDNFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDMyXHUwNDRDXHUwNDQyXHUwNDM1IFx1MDQzMlx1MDQzOFx1MDQzN1x1MDQ0M1x1MDQzMFx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzOSBcdTA0NERcdTA0NDRcdTA0NDRcdTA0MzVcdTA0M0FcdTA0NDIgXHUwNDQxXHUwNDNCXHUwNDMwXHUwNDMxXHUwNDNFXHUwNDM5IFx1MDQzMlx1MDQzOFx1MDQzNFx1MDQzOFx1MDQzQ1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDQ1IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMiwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQ0N1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzRSBcdTA0NDBcdTA0MzBcdTA0MzdcdTA0M0JcdTA0MzhcdTA0NDdcdTA0MzBcdTA0NDJcdTA0NEMgXHUwNDMyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM1IFx1MDQzOCBcdTA0M0VcdTA0NDJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdcdTA0MUVcdTA0NDJcdTA0MzRcdTA0MzVcdTA0M0JcdTA0NENcdTA0M0RcdTA0M0VcdTA0MzUgXHUwNDQzXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzQVx1MDQzRVx1MDQzQ1x1MDQzMFx1MDQzRFx1MDQzNFx1MDQzMFx1MDQzQ1x1MDQzOCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnXHUwNDEyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDM1IFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQ0MiBcdTA0M0ZcdTA0MzBcdTA0NDBcdTA0MzBcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NDAgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRVx1MDQ0Mlx1MDQzNFx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0NDNcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDQxXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDNFXHUwNDRGXHUwNDNEXHUwNDM4XHUwNDM1XHUwNDNDIFx1MDQzMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzggXHUwNDNFXHUwNDQyXHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzQVx1MDQzMFx1MDQzNlx1MDQzNFx1MDQzRVx1MDQzM1x1MDQzRSBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0MzAuIChcdTA0MUZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgT2JzaWRpYW4sIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0MzJcdTA0M0RcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGKScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdcdTA0MjNcdTA0M0ZcdTA0NDBcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDNBXHUwNDNFXHUwNDNDXHUwNDMwXHUwNDNEXHUwNDM0XHUwNDMwXHUwNDNDXHUwNDM4IFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQzRVx1MDQzMiBcdTA0M0ZcdTA0M0UgXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDNGXHUwNDNGXHUwNDMwXHUwNDNDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ1x1MDQxMlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NERcdTA0NDJcdTA0M0VcdTA0NDIgXHUwNDNGXHUwNDMwXHUwNDQwXHUwNDMwXHUwNDNDXHUwNDM1XHUwNDQyXHUwNDQwIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzJcdTA0M0FcdTA0M0JcdTA0NEVcdTA0NDdcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDM4XHUwNDNCXHUwNDM4IFx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzNVx1MDQzRFx1MDQzOFx1MDQ0RiBcdTA0MzJcdTA0NDFcdTA0MzVcdTA0NDUgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDNFXHUwNDMyIFx1MDQzMiBcdTA0NDNcdTA0M0FcdTA0MzBcdTA0MzdcdTA0MzBcdTA0M0RcdTA0M0RcdTA0M0VcdTA0MzkgXHUwNDMzXHUwNDQwXHUwNDQzXHUwNDNGXHUwNDNGXHUwNDM1IFx1MDQzRVx1MDQzNFx1MDQzRFx1MDQzOFx1MDQzQyBcdTA0M0FcdTA0M0JcdTA0MzhcdTA0M0FcdTA0M0VcdTA0M0MuIChcdTA0MUZcdTA0MzVcdTA0NDBcdTA0MzVcdTA0MzdcdTA0MzBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDJcdTA0MzhcdTA0NDJcdTA0MzUgT2JzaWRpYW4sIFx1MDQ0N1x1MDQ0Mlx1MDQzRVx1MDQzMVx1MDQ0QiBcdTA0MzJcdTA0M0RcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzggXHUwNDM4XHUwNDM3XHUwNDNDXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGKScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1x1MDQxN1x1MDQzMFx1MDQzNFx1MDQzNVx1MDQ0MFx1MDQzNlx1MDQzQVx1MDQzMF0gXHUwNDE0XHUwNDNFXHUwNDMxXHUwNDMwXHUwNDMyXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tcdTA0MTdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzBdIElEIFx1MDQ0M1x1MDQzNlx1MDQzNSBcdTA0NDFcdTA0NDNcdTA0NDlcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0NDNcdTA0MzVcdTA0NDIgXHUwNDM4XHUwNDNCXHUwNDM4IFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQ0MicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbXHUwNDE3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDMwXSBcdTA0MjNcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDhcdTA0M0RcdTA0M0UgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDNFJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tcdTA0MTdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0MzBdIFx1MDQxRFx1MDQzNSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0M0VcdTA0NDFcdTA0NEMgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQyXHUwNDRDLCBcdTA0NDFcdTA0NDNcdTA0NDlcdTA0MzVcdTA0NDFcdTA0NDJcdTA0MzJcdTA0NDNcdTA0NEVcdTA0NDIgXHUwNDNGXHUwNDNCXHUwNDMwXHUwNDMzXHUwNDM4XHUwNDNEXHUwNDRCIFx1MDQ0MSBcdTA0NERcdTA0NDJcdTA0M0VcdTA0MzkgXHUwNDM3XHUwNDMwXHUwNDM0XHUwNDM1XHUwNDQwXHUwNDM2XHUwNDNBXHUwNDNFXHUwNDM5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHUwNDEzXHUwNDQwXHUwNDQzXHUwNDNGXHUwNDNGXHUwNDMwXSBcdTA0MTRcdTA0M0VcdTA0MzFcdTA0MzBcdTA0MzJcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1MDQxM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQzMF0gSUQgXHUwNDQzXHUwNDM2XHUwNDM1IFx1MDQ0MVx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQ0M1x1MDQzNVx1MDQ0MiBcdTA0MzhcdTA0M0JcdTA0MzggXHUwNDNGXHUwNDQzXHUwNDQxXHUwNDQyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdTA0MTNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0MzBdIFx1MDQyM1x1MDQ0MVx1MDQzRlx1MDQzNVx1MDQ0OFx1MDQzRFx1MDQzRSBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzVcdTA0M0RcdTA0M0UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1MDQxM1x1MDQ0MFx1MDQ0M1x1MDQzRlx1MDQzRlx1MDQzMF0gXHUwNDFEXHUwNDM1IFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzRVx1MDQ0MVx1MDQ0QyBcdTA0NDNcdTA0MzRcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDJcdTA0NEMsIFx1MDQ0MVx1MDQ0M1x1MDQ0OVx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzMlx1MDQ0M1x1MDQ0RVx1MDQ0MiBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0NEIgXHUwNDMyIFx1MDQ0RFx1MDQ0Mlx1MDQzRVx1MDQzOSBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0M0ZcdTA0M0ZcdTA0MzUnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdTA0MUNcdTA0MzVcdTA0NDJcdTA0M0FcdTA0MzBdIFx1MDQxNFx1MDQzRVx1MDQzMVx1MDQzMFx1MDQzMlx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHUwNDFDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDMwXSBJRCBcdTA0NDNcdTA0MzZcdTA0MzUgXHUwNDQxXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDQzXHUwNDM1XHUwNDQyIFx1MDQzOFx1MDQzQlx1MDQzOCBcdTA0M0ZcdTA0NDNcdTA0NDFcdTA0NDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1MDQxQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzMF0gXHUwNDIzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFIFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzRScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHUwNDFDXHUwNDM1XHUwNDQyXHUwNDNBXHUwNDMwXSBcdTA0MURcdTA0MzUgXHUwNDQzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDNFXHUwNDQxXHUwNDRDIFx1MDQ0M1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzOFx1MDQ0Mlx1MDQ0QywgXHUwNDQxXHUwNDQzXHUwNDQ5XHUwNDM1XHUwNDQxXHUwNDQyXHUwNDMyXHUwNDQzXHUwNDRFXHUwNDQyIFx1MDQzRlx1MDQzQlx1MDQzMFx1MDQzM1x1MDQzOFx1MDQzRFx1MDQ0QiBcdTA0NDEgXHUwNDREXHUwNDQyXHUwNDNFXHUwNDM5IFx1MDQzQ1x1MDQzNVx1MDQ0Mlx1MDQzQVx1MDQzRVx1MDQzOScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2ODA3XHU5ODk4OiAnXHUwNDE1XHUwNDQxXHUwNDNCXHUwNDM4IFx1MDQzMlx1MDQzRVx1MDQzN1x1MDQzRFx1MDQzOFx1MDQzQVx1MDQzMFx1MDQ0RVx1MDQ0MiBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDRcdTA0M0JcdTA0MzhcdTA0M0FcdTA0NDJcdTA0NEIgXHUwNDQxIFx1MDQzNFx1MDQ0MFx1MDQ0M1x1MDQzM1x1MDQzOFx1MDQzQ1x1MDQzOCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0MzBcdTA0M0NcdTA0MzgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnXHUwNDE4XHUwNDM3LVx1MDQzN1x1MDQzMCBcdTA0M0VcdTA0MzNcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDdcdTA0MzVcdTA0M0RcdTA0M0RcdTA0NEJcdTA0NDUgXHUwNDMyXHUwNDNFXHUwNDM3XHUwNDNDXHUwNDNFXHUwNDM2XHUwNDNEXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM1XHUwNDM5IFx1MDQ0RiBcdTA0M0RcdTA0MzUgXHUwNDNDXHUwNDNFXHUwNDMzXHUwNDQzIFx1MDQzOFx1MDQ0MVx1MDQzRlx1MDQ0MFx1MDQzMFx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0NERcdTA0NDJcdTA0NDMgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDM1XHUwNDNDXHUwNDQzLiBcdTA0MUZcdTA0M0VcdTA0MzZcdTA0MzBcdTA0M0JcdTA0NDNcdTA0MzlcdTA0NDFcdTA0NDJcdTA0MzAsIFx1MDQzRVx1MDQ0Mlx1MDQzQVx1MDQzQlx1MDQ0RVx1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0MzRcdTA0MzVcdTA0NDBcdTA0MzZcdTA0M0FcdTA0NDMgXHUwNDNGXHUwNDQwXHUwNDM4IFx1MDQzN1x1MDQzMFx1MDQzRlx1MDQ0M1x1MDQ0MVx1MDQzQVx1MDQzNSwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQ0MFx1MDQzNVx1MDQ0OFx1MDQzOFx1MDQ0Mlx1MDQ0QyBcdTA0MzJcdTA0NDFcdTA0MzUgXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDMxXHUwNDNCXHUwNDM1XHUwNDNDXHUwNDRCIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzQlx1MDQzOFx1MDQzQVx1MDQ0Mlx1MDQzMC4nLFxyXG5cclxuICAgIFx1NTQ3RFx1NEVFNF9cdTdCQTFcdTc0MDZcdTk3NjJcdTY3N0ZfXHU2M0NGXHU4RkYwOiAnXHUwNDFFXHUwNDQyXHUwNDNBXHUwNDQwXHUwNDNFXHUwNDM5XHUwNDQyXHUwNDM1IFx1MDQzQ1x1MDQzNVx1MDQzRFx1MDQzNVx1MDQzNFx1MDQzNlx1MDQzNVx1MDQ0MCBcdTA0M0ZcdTA0M0JcdTA0MzBcdTA0MzNcdTA0MzhcdTA0M0RcdTA0M0VcdTA0MzInLFxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFx1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDOiAnXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMERFXHUzMENEXHUzMEZDXHUzMEI4XHUzMEUzXHUzMEZDJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYyMTBcdTUyOUZfXHU2NTg3XHU2NzJDOiAnXHU2MjEwXHU1MjlGJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDOiAnXHU1OTMxXHU2NTU3JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDOiAnXHU4RkZEXHU1MkEwJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnXHU2NENEXHU0RjVDJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDOiAnXHU2OTFDXHU3RDIyJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDOiAnXHU1NDBEXHU1MjREJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XHUzMDZBXHUzMDU3JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTY4MDdcdTdCN0VfXHU2NTg3XHU2NzJDOiAnXHUzMEJGXHUzMEIwXHUzMDZBXHUzMDU3JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDOiAnXHU5MDQ1XHU1RUY2XHUzMDZBXHUzMDU3JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYwM0JcdThCQTFfXHU2NTg3XHU2NzJDOiAnXHU1NDA4XHU4QTA4JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU2NzA5XHU1MkI5JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHU3MTIxXHU1MkI5JyxcclxuXHJcblxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X0dJVEhVQl9cdTYzQ0ZcdThGRjA6ICdcdTg0NTdcdTgwMDVcdTMwNkVHaXRIdWJcdTMwREFcdTMwRkNcdTMwQjhcdTMwOTJcdThBMkFcdTMwOENcdTMwMDFcdTMwRDdcdTMwRURcdTMwQjhcdTMwQTdcdTMwQUZcdTMwQzhcdTMwNkVcdThBNzNcdTdEMzBcdTMwMDFcdTY2RjRcdTY1QjBcdTMwRURcdTMwQjBcdTMwMDFcdThCNzBcdThBRDZcdTMwNzhcdTMwNkVcdTUzQzJcdTUyQTBcdTMwMDFcdTMwQjNcdTMwRkNcdTMwQzlcdTMwNzhcdTMwNkVcdThDQTJcdTczMkVcdTMwOTJcdTc4QkFcdThBOERcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1ODlDNlx1OTg5MVx1NjU1OVx1N0EwQl9cdTYzQ0ZcdThGRjA6ICdcdTMwRDNcdTMwQzdcdTMwQUFcdTMwQzFcdTMwRTVcdTMwRkNcdTMwQzhcdTMwRUFcdTMwQTJcdTMwRUJcdTMwNkJcdTMwQTJcdTMwQUZcdTMwQkJcdTMwQjknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTdERThcdTk2QzZcdTMwRTJcdTMwRkNcdTMwQzlcdTMwOTJcdTY3MDlcdTUyQjlcdTMwNkJcdTMwNTdcdTMwNjZcdTMwMDFcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdThBMkRcdTVCOUFcdTMwOTJcdTMwQUJcdTMwQjlcdTMwQkZcdTMwREVcdTMwQTRcdTMwQkFcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTMwRUFcdTMwRURcdTMwRkNcdTMwQzlcdTMwNTdcdTMwNjZcdTUzNzNcdTVFQTdcdTMwNkJcdTUyQjlcdTY3OUNcdTMwOTJcdTc2N0FcdTYzRUVcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMF9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTY2RjRcdTY1QjBcdTMwOTJcdTc4QkFcdThBOERcdTMwNTlcdTMwOEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTRFMDBcdTVFQTZcdTMwNkJcdTMwNTlcdTMwNzlcdTMwNjZcdTMwNkVcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTcxMjFcdTUyQjlcdTMwNkJcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTRFMDBcdTVFQTZcdTMwNkJcdTMwNTlcdTMwNzlcdTMwNjZcdTMwNkVcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTY3MDlcdTUyQjlcdTMwNkJcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdThBMkRcdTVCOUFcdTMwOTJcdTdCQTFcdTc0MDZcdTMwNTlcdTMwOEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEVDNVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdcdTY3MDlcdTUyQjlcdTMwNkFcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTMwN0ZcdTMwOTJcdTg4NjhcdTc5M0FcdTMwNTlcdTMwOEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdThBMkRcdTVCOUFcdTMwQTRcdTMwRjNcdTMwQkZcdTMwRkNcdTMwRDVcdTMwQTdcdTMwRkNcdTMwQjlcdTMwOTJcdTk1OEJcdTMwNEYnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOV9cdTYzQ0ZcdThGRjA6ICdcdTUyMURcdTY3MUZcdTcyQjZcdTYxNEJcdTMwNkJcdTYyM0JcdTMwNTknLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NV9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwQzdcdTMwQTNcdTMwRUNcdTMwQUZcdTMwQzhcdTMwRUFcdTMwOTJcdTk1OEJcdTMwNEYnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIyMFx1OTY2NFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwOTJcdTVCOENcdTUxNjhcdTMwNkJcdTUyNEFcdTk2NjRcdTMwNTlcdTMwOEInLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIwN1x1NjM2Mlx1NzJCNlx1NjAwMV9cdTYzQ0ZcdThGRjA6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTMwQjlcdTMwQzZcdTMwRkNcdTMwQkZcdTMwQjlcdTMwOTJcdTUyMDdcdTMwOEFcdTY2RkZcdTMwNDhcdTMwOEInLFxyXG5cclxuICAgIFx1NTM3OFx1OEY3RF9cdTY4MDdcdTk4OTg6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTMwQTJcdTMwRjNcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQzhcdTMwRkNcdTMwRUInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjNEMFx1NzkzQTogJ1x1MzA1M1x1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1MzBBMlx1MzBGM1x1MzBBNFx1MzBGM1x1MzBCOVx1MzBDOFx1MzBGQ1x1MzBFQlx1MzA1N1x1MzA2Nlx1MzA4Mlx1MzA4OFx1MzA4RFx1MzA1N1x1MzA0NFx1MzA2N1x1MzA1OVx1MzA0Qlx1RkYxRlx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2RVx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFx1MzA0Q1x1NTI0QVx1OTY2NFx1MzA1NVx1MzA4Q1x1MzA3RVx1MzA1OVx1MzAwMicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnXHUzMEEyXHUzMEYzXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEVCJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODg6ICdcdTMwQURcdTMwRTNcdTMwRjNcdTMwQkJcdTMwRUInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdcdTMwQTJcdTMwRjNcdTMwQTRcdTMwRjNcdTMwQjlcdTMwQzhcdTMwRkNcdTMwRUJcdTMwNkJcdTYyMTBcdTUyOUZcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUYnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHU1N0ZBXHU2NzJDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHUzMEJGXHUzMEIwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnXHU5MDQ1XHU1RUY2JyxcclxuXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2ODA3XHU5ODk4OiAnXHU4QTAwXHU4QTlFXHU4QTJEXHU1QjlBJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjNDRlx1OEZGMDogJ1x1MzA0QVx1NTk3RFx1MzA3Rlx1MzA2RVx1OEEwMFx1OEE5RVx1MzA5Mlx1OTA3OFx1NjI5RVx1MzA1N1x1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NFx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdcdTMwQzdcdTMwQTNcdTMwRUNcdTMwQUZcdTMwQzhcdTMwRUFcdTMwQjlcdTMwQkZcdTMwQTRcdTMwRUInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XHUzMDZFXHUzMEI5XHUzMEJGXHUzMEE0XHUzMEVCXHUzMDkyXHU5MDc4XHU2MjlFXHUzMDU3XHUzMDY2XHUzMDAxXHUzMEQ2XHUzMEU5XHUzMEE2XHUzMEI4XHUzMEYzXHUzMEIwXHU0RjUzXHU5QTEzXHUzMDkyXHU1NDExXHU0RTBBXHUzMDU1XHUzMDVCXHUzMDdFXHUzMDU5XHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN1x1MzBCOVx1MzBCRlx1MzBBNFx1MzBFQicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDdcdTMwNkVcdTMwQjlcdTMwQkZcdTMwQTRcdTMwRUJcdTMwOTJcdTkwNzhcdTYyOUVcdTMwNTdcdTMwNjZcdTMwMDFcdTMwODhcdTMwOEFcdTc2RUVcdTdBQ0JcdTMwNUZcdTMwNUJcdTMwODRcdTMwNTlcdTMwNEZcdThCNThcdTUyMjVcdTMwNTdcdTMwODRcdTMwNTlcdTMwNEZcdTMwNTdcdTMwN0VcdTMwNTlcdTMwMDInLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnXHUzMEJGXHUzMEIwXHUzMEI5XHUzMEJGXHUzMEE0XHUzMEVCJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1x1MzBCRlx1MzBCMFx1MzA2RVx1MzBCOVx1MzBCRlx1MzBBNFx1MzBFQlx1MzA5Mlx1OTA3OFx1NjI5RVx1MzA1N1x1MzA2Nlx1MzAwMVx1MzA4OFx1MzA4QVx1NzZFRVx1N0FDQlx1MzA1Rlx1MzA1Qlx1MzA4NFx1MzA1OVx1MzA0Rlx1OEI1OFx1NTIyNVx1MzA1N1x1MzA4NFx1MzA1OVx1MzA0Rlx1MzA1N1x1MzA3RVx1MzA1OVx1MzAwMicsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2ODA3XHU5ODk4OiAnXHU5MDQ1XHU1RUY2XHUzMEI5XHUzMEJGXHUzMEZDXHUzMEM4JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjNDRlx1OEZGMDogJ1x1OTA0NVx1NUVGNlx1MzBCOVx1MzBCRlx1MzBGQ1x1MzBDOFx1NkE1Rlx1ODBGRFx1MzA5Mlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA1OVx1MzA4Qlx1MzA2OFx1MzAwMVx1OEFBRFx1MzA3Rlx1OEZCQ1x1MzA3Rlx1OTgwNlx1NUU4Rlx1MzA5Mlx1NjcwMFx1OTA2OVx1NTMxNlx1MzA2N1x1MzA0RFx1MzA3RVx1MzA1OVx1MzA0Q1x1MzAwMVx1NEUwMFx1OTBFOFx1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA2N1x1NEU5Mlx1NjNEQlx1NjAyN1x1NTU0Rlx1OTg0Q1x1MzA0Q1x1NzY3QVx1NzUxRlx1MzA1OVx1MzA4Qlx1NTgzNFx1NTQwOFx1MzA0Q1x1MzA0Mlx1MzA4QVx1MzA3RVx1MzA1OVx1MzAwMicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTg6ICdcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTMwRDVcdTMwQTdcdTMwRkNcdTMwQzknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTZERTFcdTUzMTZcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHU3MTIxXHU1MkI5XHUzMDZBXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDZCXHU4OTk2XHU4OTlBXHU3Njg0XHUzMDZBXHUzMEQ1XHUzMEE3XHUzMEZDXHUzMEM5XHU1MkI5XHU2NzlDXHUzMDkyXHU2M0QwXHU0RjlCXHUzMDU3XHUzMDY2XHUzMDAxXHU2NzA5XHU1MkI5XHUzMDY4XHU3MTIxXHU1MkI5XHUzMDZFXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDkyXHU2NjBFXHU3OEJBXHUzMDZCXHU1MzNBXHU1MjI1XHUzMDU3XHUzMDdFXHUzMDU5XHUzMDAyJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzBCM1x1MzBERVx1MzBGM1x1MzBDOVx1MzA5Mlx1NTAwQlx1NTIyNVx1MzA2Qlx1NTIzNlx1NUZBMScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdcdTMwNTNcdTMwNkVcdTMwQUFcdTMwRDdcdTMwQjdcdTMwRTdcdTMwRjNcdTMwOTJcdTY3MDlcdTUyQjlcdTMwNkJcdTMwNTlcdTMwOEJcdTMwNjhcdTMwMDFcdTU0MDRcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNkVcdTY3MDlcdTUyQjkvXHU3MTIxXHU1MkI5XHU3MkI2XHU2MTRCXHUzMDkyXHU1MDBCXHU1MjI1XHUzMDZCXHU1MjM2XHU1RkExXHUzMDY3XHUzMDREXHUzMDdFXHUzMDU5XHUzMDAyXHVGRjA4T2JzaWRpYW5cdTMwOTJcdTUxOERcdThENzdcdTUyRDVcdTMwNTlcdTMwOEJcdTVGQzVcdTg5ODFcdTMwNENcdTMwNDJcdTMwOEFcdTMwN0VcdTMwNTlcdUZGMDknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XHUzMDU0XHUzMDY4XHUzMDZCXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMEIzXHUzMERFXHUzMEYzXHUzMEM5XHUzMDkyXHU1MjM2XHU1RkExJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ1x1MzA1M1x1MzA2RVx1MzBBQVx1MzBEN1x1MzBCN1x1MzBFN1x1MzBGM1x1MzA5Mlx1NjcwOVx1NTJCOVx1MzA2Qlx1MzA1OVx1MzA4Qlx1MzA2OFx1MzAwMVx1NjMwN1x1NUI5QVx1MzA1NVx1MzA4Q1x1MzA1Rlx1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN1x1NTE4NVx1MzA2RVx1MzA1OVx1MzA3OVx1MzA2Nlx1MzA2RVx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1MzBFRlx1MzBGM1x1MzBBRlx1MzBFQVx1MzBDM1x1MzBBRlx1MzA2N1x1NjcwOVx1NTJCOVx1MzA3RVx1MzA1Rlx1MzA2Rlx1NzEyMVx1NTJCOVx1MzA2Qlx1MzA2N1x1MzA0RFx1MzA3RVx1MzA1OVx1MzAwMlx1RkYwOE9ic2lkaWFuXHUzMDkyXHU1MThEXHU4RDc3XHU1MkQ1XHUzMDU5XHUzMDhCXHU1RkM1XHU4OTgxXHUzMDRDXHUzMDQyXHUzMDhBXHUzMDdFXHUzMDU5XHVGRjA5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHU5MDQ1XHU1RUY2XSBcdThGRkRcdTUyQTBcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTdcdTMwNUYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1OTA0NVx1NUVGNl0gSURcdTMwNENcdTY1RTJcdTMwNkJcdTVCNThcdTU3MjhcdTMwNTlcdTMwOEJcdTMwNEJcdTMwMDFcdTdBN0FcdTMwNjdcdTMwNTknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1x1OTA0NVx1NUVGNl0gXHU1MjRBXHU5NjY0XHUzMDZCXHU2MjEwXHU1MjlGXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tcdTkwNDVcdTVFRjZdIFx1NTI0QVx1OTY2NFx1MzA2Qlx1NTkzMVx1NjU1N1x1MzA1N1x1MzA3RVx1MzA1N1x1MzA1Rlx1MzAwMVx1MzA1M1x1MzA2RVx1OTA0NVx1NUVGNlx1MzA2RVx1NEUwQlx1MzA2Qlx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA0Q1x1NUI1OFx1NTcyOFx1MzA1N1x1MzA3RVx1MzA1OScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1x1MzBCMFx1MzBFQlx1MzBGQ1x1MzBEN10gXHU4RkZEXHU1MkEwXHUzMDU1XHUzMDhDXHUzMDdFXHUzMDU3XHUzMDVGJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDddIElEXHUzMDRDXHU2NUUyXHUzMDZCXHU1QjU4XHU1NzI4XHUzMDU5XHUzMDhCXHUzMDRCXHUzMDAxXHU3QTdBXHUzMDY3XHUzMDU5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDddIFx1NTI0QVx1OTY2NFx1MzA2Qlx1NjIxMFx1NTI5Rlx1MzA1N1x1MzA3RVx1MzA1N1x1MzA1RicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbXHUzMEIwXHUzMEVCXHUzMEZDXHUzMEQ3XSBcdTUyNEFcdTk2NjRcdTMwNkJcdTU5MzFcdTY1NTdcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcdTMwMDFcdTMwNTNcdTMwNkVcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRDdcdTMwNkVcdTRFMEJcdTMwNkJcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNENcdTVCNThcdTU3MjhcdTMwNTdcdTMwN0VcdTMwNTknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tcdTMwQkZcdTMwQjBdIFx1OEZGRFx1NTJBMFx1MzA1NVx1MzA4Q1x1MzA3RVx1MzA1N1x1MzA1RicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbXHUzMEJGXHUzMEIwXSBJRFx1MzA0Q1x1NjVFMlx1MzA2Qlx1NUI1OFx1NTcyOFx1MzA1OVx1MzA4Qlx1MzA0Qlx1MzAwMVx1N0E3QVx1MzA2N1x1MzA1OScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbXHUzMEJGXHUzMEIwXSBcdTUyNEFcdTk2NjRcdTMwNkJcdTYyMTBcdTUyOUZcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUYnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1MzBCRlx1MzBCMF0gXHU1MjRBXHU5NjY0XHUzMDZCXHU1OTMxXHU2NTU3XHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXHUzMDAxXHUzMDUzXHUzMDZFXHUzMEJGXHUzMEIwXHUzMDZFXHU0RTBCXHUzMDZCXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzXHUzMDRDXHU1QjU4XHU1NzI4XHUzMDU3XHUzMDdFXHUzMDU5JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTY4MDdcdTk4OTg6ICdcdTRFRDZcdTMwNkVcdTMwRDdcdTMwRTlcdTMwQjBcdTMwQTRcdTMwRjNcdTMwNjhcdTMwNkVcdTMwQjNcdTMwRjNcdTMwRDVcdTMwRUFcdTMwQUZcdTMwQzhcdTMwNENcdTc2N0FcdTc1MUZcdTMwNTdcdTMwNUZcdTU4MzRcdTU0MDgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnXHU4MEZEXHU1MjlCXHUzMDZCXHU5NjUwXHUzMDhBXHUzMDRDXHUzMDQyXHUzMDhCXHUzMDVGXHUzMDgxXHUzMDAxXHUzMDUzXHUzMDZFXHU1NTRGXHU5ODRDXHUzMDkyXHU0RkVFXHU2QjYzXHUzMDY3XHUzMDREXHUzMDdFXHUzMDVCXHUzMDkzXHUzMDAyXHU5MDQ1XHU1RUY2XHUzMEI5XHUzMEJGXHUzMEZDXHUzMEM4XHUzMDkyXHU3MTIxXHU1MkI5XHUzMDZCXHUzMDU5XHUzMDhCXHUzMDUzXHUzMDY4XHUzMDY3XHUzMDAxXHUzMDU5XHUzMDc5XHUzMDY2XHUzMDZFXHUzMEIzXHUzMEYzXHUzMEQ1XHUzMEVBXHUzMEFGXHUzMEM4XHU1NTRGXHU5ODRDXHUzMDkyXHU4OUUzXHU2QzdBXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XHUzMDAyJyxcclxuXHJcbiAgICBcdTU0N0RcdTRFRTRfXHU3QkExXHU3NDA2XHU5NzYyXHU2NzdGX1x1NjNDRlx1OEZGMDogJ1x1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzBERVx1MzBDRFx1MzBGQ1x1MzBCOFx1MzBFM1x1MzBGQ1x1MzA5Mlx1OTU4Qlx1MzA0RicsXHJcbn0iLCAiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXHU5MDFBXHU3NTI4X1x1N0JBMVx1NzQwNlx1NTY2OF9cdTY1ODdcdTY3MkM6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVBRDAwXHVCOUFDXHVDNzkwJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYyMTBcdTUyOUZfXHU2NTg3XHU2NzJDOiAnXHVDMTMxXHVBQ0Y1JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU5MzFcdThEMjVfXHU2NTg3XHU2NzJDOiAnXHVDMkU0XHVEMzI4JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDOiAnXHVDRDk0XHVBQzAwJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnXHVDNzkxXHVDNUM1JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDOiAnXHVBQzgwXHVDMEM5JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDOiAnXHVDNzc0XHVCOTg0JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnXHVBREY4XHVCOEY5IFx1QzVDNlx1Qzc0QycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NUUwXHU2ODA3XHU3QjdFX1x1NjU4N1x1NjcyQzogJ1x1RDBEQ1x1QURGOCBcdUM1QzZcdUM3NEMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdcdUI1MUNcdUI4MDhcdUM3NzQgXHVDNUM2XHVDNzRDJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYwM0JcdThCQTFfXHU2NTg3XHU2NzJDOiAnXHVDRDFEXHVBQ0M0JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MkZcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHVENjVDXHVDMTMxXHVENjU0JyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTc5ODFcdTc1MjhfXHU2NTg3XHU2NzJDOiAnXHVCRTQ0XHVENjVDXHVDMTMxXHVENjU0JyxcclxuXHJcblxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X0dJVEhVQl9cdTYzQ0ZcdThGRjA6ICdcdUM4MDBcdUM3OTBcdUM3NTggR2l0SHViIFx1RDM5OFx1Qzc3NFx1QzlDMFx1Qjk3QyBcdUJDMjlcdUJCMzhcdUQ1NThcdUM1RUMgXHVENTA0XHVCODVDXHVDODFEXHVEMkI4IFx1QzEzOFx1QkQ4MCBcdUM4MTVcdUJDRjQsIFx1QzVDNVx1QjM3MFx1Qzc3NFx1RDJCOCBcdUI4NUNcdUFERjgsIFx1RDFBMFx1Qjg2MCBcdUNDMzhcdUM1RUMsIFx1Q0Y1NFx1QjREQyBcdUFFMzBcdUM1RUNcdUI5N0MgXHVENjU1XHVDNzc4XHVENTU4XHVDMTM4XHVDNjk0LicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU4OUM2XHU5ODkxXHU2NTU5XHU3QTBCX1x1NjNDRlx1OEZGMDogJ1x1QkU0NFx1QjUxNFx1QzYyNCBcdUQyOUNcdUQxQTBcdUI5QUNcdUM1QkNcdUM1RDAgXHVDNTYxXHVDMTM4XHVDMkE0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTdGMTZcdThGOTFcdTZBMjFcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHVEM0I4XHVDOUQxIFx1QkFBOFx1QjREQ1x1Qjk3QyBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUQ1NThcdUM1RUMgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QzEyNFx1QzgxNVx1Qzc0NCBcdUM3OTBcdUMxMzhcdUQ3ODggXHVDRUU0XHVDMkE0XHVEMTMwXHVCOUM4XHVDNzc0XHVDOUQ1XHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTkxQ0RcdThGN0RcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNzQ0IFx1QjJFNFx1QzJEQyBcdUI4NUNcdUI0RENcdUQ1NThcdUM1RUMgXHVDOTg5XHVDMkRDIFx1QzgwMVx1QzZBOVx1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2OEMwXHU2N0U1XHU2NkY0XHU2NUIwX1x1NjNDRlx1OEZGMDogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUM1QzVcdUIzNzBcdUM3NzRcdUQyQjhcdUI5N0MgXHVENjU1XHVDNzc4XHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTRFMDBcdTk1MkVcdTc5ODFcdTc1MjhfXHU2M0NGXHU4RkYwOiAnXHVENTVDIFx1QkM4OFx1QzVEMCBcdUJBQThcdUI0RTAgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNzQ0IFx1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1RDU1QyBcdUJDODhcdUM1RDAgXHVCQUE4XHVCNEUwIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OFx1Qzc0NCBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUQ1NThcdUMxMzhcdUM2OTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVDMTI0XHVDODE1XHVDNzQ0IFx1QUQwMFx1QjlBQ1x1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ1x1RDY1Q1x1QzEzMVx1RDY1NFx1QjQxQyBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUI5Q0MgXHVENDVDXHVDMkRDXHVENTU4XHVDMTM4XHVDNjk0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnXHVDMTI0XHVDODE1IFx1Qzc3OFx1RDEzMFx1RDM5OFx1Qzc3NFx1QzJBNFx1Qjk3QyBcdUM1RkRcdUIyQzhcdUIyRTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OEZEOFx1NTM5Rlx1NTE4NVx1NUJCOV9cdTYzQ0ZcdThGRjA6ICdcdUNEMDhcdUFFMzAgXHVDMEMxXHVEMERDXHVCODVDIFx1QkNGNVx1QzZEMFx1RDU1OFx1QzEzOFx1QzY5NCcsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2MjUzXHU1RjAwXHU3NkVFXHU1RjU1X1x1NjNDRlx1OEZGMDogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUI1MTRcdUI4MDlcdUQxQTBcdUI5QUNcdUI5N0MgXHVDNUZEXHVCMkM4XHVCMkU0JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNzQ0IFx1QzY0NFx1QzgwNFx1RDc4OCBcdUMwQURcdUM4MUNcdUQ1NThcdUMxMzhcdUM2OTQnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIwN1x1NjM2Mlx1NzJCNlx1NjAwMV9cdTYzQ0ZcdThGRjA6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVDMEMxXHVEMERDXHVCOTdDIFx1QzgwNFx1RDY1OFx1RDU1OFx1QzEzOFx1QzY5NCcsXHJcblxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5ODogJ1x1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUM4MUNcdUFDNzAnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjNEMFx1NzkzQTogJ1x1Qzc3NCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NDQgXHVDODFDXHVBQzcwXHVENTU4XHVDMkRDXHVBQ0EwXHVDMkI1XHVCMkM4XHVBRTRDPyBcdUM3NzQgXHVDNzkxXHVDNUM1XHVDNzQwIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUQzRjRcdUIzNTRcdUI5N0MgXHVDMEFEXHVDODFDXHVENTY5XHVCMkM4XHVCMkU0LicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnXHVDODFDXHVBQzcwJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODg6ICdcdUNERThcdUMxOEMnLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdcdUMxMzFcdUFDRjVcdUM4MDFcdUM3M0NcdUI4NUMgXHVDODFDXHVBQzcwXHVCNDE4XHVDNUM4XHVDMkI1XHVCMkM4XHVCMkU0JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1QUUzMFx1QkNGOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1QURGOFx1QjhGOScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1RDBEQ1x1QURGOCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1x1QjUxQ1x1QjgwOFx1Qzc3NCcsXHJcblxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjgwN1x1OTg5ODogJ1x1QzVCOFx1QzVCNCBcdUMxMjRcdUM4MTUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdThCRURcdThBMDBfXHU2M0NGXHU4RkYwOiAnXHVDMTIwXHVENjM4XHVENTU4XHVCMjk0IFx1QzVCOFx1QzVCNFx1Qjk3QyBcdUMxMjBcdUQwRERcdUQ1NThcdUMxMzhcdUM2OTQuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1QjUxNFx1QjgwOVx1RDFBMFx1QjlBQyBcdUMyQTRcdUQwQzBcdUM3N0MnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHVBREY4XHVCOEY5XHVDNzU4IFx1QzJBNFx1RDBDMFx1Qzc3Q1x1Qzc0NCBcdUMxMjBcdUQwRERcdUQ1NThcdUM1RUMgXHVCRTBDXHVCNzdDXHVDNkIwXHVDOUQ1IFx1QUNCRFx1RDVEOFx1Qzc0NCBcdUQ1QTVcdUMwQzFcdUQ1NThcdUMxMzhcdUM2OTQuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1QURGOFx1QjhGOSBcdUMyQTRcdUQwQzBcdUM3N0MnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHVBREY4XHVCOEY5XHVDNzU4IFx1QzJBNFx1RDBDMFx1Qzc3Q1x1Qzc0NCBcdUMxMjBcdUQwRERcdUQ1NThcdUM1RUMgXHVCMzU0IFx1QjIwOFx1QzVEMCBcdUI3NDRcdUFDRTAgXHVDMkREXHVCQ0M0XHVENTU4XHVBRTMwIFx1QzI3RFx1QUM4QyBcdUI5Q0NcdUI0RENcdUMxMzhcdUM2OTQuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1x1RDBEQ1x1QURGOCBcdUMyQTRcdUQwQzBcdUM3N0MnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnXHVEMERDXHVBREY4XHVDNzU4IFx1QzJBNFx1RDBDMFx1Qzc3Q1x1Qzc0NCBcdUMxMjBcdUQwRERcdUQ1NThcdUM1RUMgXHVCMzU0IFx1QjIwOFx1QzVEMCBcdUI3NDRcdUFDRTAgXHVDMkREXHVCQ0M0XHVENTU4XHVBRTMwIFx1QzI3RFx1QUM4QyBcdUI5Q0NcdUI0RENcdUMxMzhcdUM2OTQuJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTg6ICdcdUM5QzBcdUM1RjAgXHVDMkRDXHVDNzkxJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjNDRlx1OEZGMDogJ1x1QzlDMFx1QzVGMCBcdUMyRENcdUM3OTEgXHVBRTMwXHVCMkE1XHVDNzQ0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU1OFx1QkE3NCBcdUI4NUNcdUI1MjkgXHVDMjFDXHVDMTFDXHVCOTdDIFx1Q0Q1Q1x1QzgwMVx1RDY1NFx1RDU2MCBcdUMyMTggXHVDNzg4XHVDOUMwXHVCOUNDLCBcdUM3N0NcdUJEODAgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNUQwXHVDMTFDIFx1RDYzOFx1RDY1OFx1QzEzMSBcdUJCMzhcdUM4MUNcdUFDMDAgXHVCQzFDXHVDMEREXHVENTYwIFx1QzIxOCBcdUM3ODhcdUM3M0NcdUJCQzBcdUI4NUMgXHVDNzIwXHVDNzU4XHVENTU4XHVDMTM4XHVDNjk0LicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTg6ICdcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVENzUwXHVCOUFDXHVBQzhDIFx1RDQ1Q1x1QzJEQycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdcdUJFNDRcdUQ2NUNcdUMxMzFcdUQ2NTRcdUI0MUMgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVDNUQwIFx1QzJEQ1x1QUMwMVx1QzgwMVx1Qzc3OCBcdUQ3NTBcdUI5QkMgXHVENkE4XHVBQ0ZDXHVCOTdDIFx1QzgxQ1x1QUNGNVx1RDU1OFx1QzVFQyBcdUQ2NUNcdUMxMzFcdUQ2NTRcdUI0MUMgXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVBQ0ZDIFx1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NFx1QjQxQyBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NDQgXHVCQTg1XHVENjU1XHVENzg4IFx1QUQ2Q1x1QkQ4NFx1RDU1OFx1QzEzOFx1QzY5NC4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QkE4NVx1QjgzOVx1Qzc0NCBcdUJDQzRcdUIzQzRcdUI4NUMgXHVDODFDXHVDNUI0JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ1x1Qzc3NCBcdUM2MzVcdUMxNThcdUM3NDQgXHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVCQTc0IFx1QUMwMSBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NTggXHVENjVDXHVDMTMxXHVENjU0L1x1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NCBcdUMwQzFcdUQwRENcdUI5N0MgXHVCQ0M0XHVCM0M0XHVCODVDIFx1QzgxQ1x1QzVCNFx1RDU2MCBcdUMyMTggXHVDNzg4XHVDMkI1XHVCMkM4XHVCMkU0LiAoT2JzaWRpYW5cdUM3NDQgXHVCMkU0XHVDMkRDIFx1QzJEQ1x1Qzc5MVx1RDU3NFx1QzU3QyBcdUM4MDFcdUM2QTlcdUI0MjlcdUIyQzhcdUIyRTQpJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ1x1QURGOFx1QjhGOVx1QkNDNCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggXHVCQTg1XHVCODM5IFx1QzgxQ1x1QzVCNCcsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NTQ3RFx1NEVFNF9cdTYzQ0ZcdThGRjA6ICdcdUM3NzQgXHVDNjM1XHVDMTU4XHVDNzQ0IFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU1OFx1QkE3NCBcdUM5QzBcdUM4MTVcdUI0MUMgXHVBREY4XHVCOEY5XHVDNzU4IFx1QkFBOFx1QjRFMCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NDQgXHVENTVDIFx1QkM4OCBcdUQwNzRcdUI5QURcdUM3M0NcdUI4NUMgXHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVBQzcwXHVCMDk4IFx1QkU0NFx1RDY1Q1x1QzEzMVx1RDY1NFx1RDU2MCBcdUMyMTggXHVDNzg4XHVDMkI1XHVCMkM4XHVCMkU0LiAoT2JzaWRpYW5cdUM3NDQgXHVCMkU0XHVDMkRDIFx1QzJEQ1x1Qzc5MVx1RDU3NFx1QzU3QyBcdUM4MDFcdUM2QTlcdUI0MjlcdUIyQzhcdUIyRTQpJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHVCNTFDXHVCODA4XHVDNzc0XSBcdUNEOTRcdUFDMDBcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1QjUxQ1x1QjgwOFx1Qzc3NF0gSURcdUFDMDAgXHVDNzc0XHVCQkY4IFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QUM3MFx1QjA5OCBcdUJFNDRcdUM1QjQgXHVDNzg4XHVDNzRDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdUI1MUNcdUI4MDhcdUM3NzRdIFx1QzEzMVx1QUNGNVx1QzgwMVx1QzczQ1x1Qjg1QyBcdUMwQURcdUM4MUNcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1QjUxQ1x1QjgwOFx1Qzc3NF0gXHVDMEFEXHVDODFDIFx1QzJFNFx1RDMyOCwgXHVDNzc0IFx1QjUxQ1x1QjgwOFx1Qzc3NFx1RDU1OFx1QzVEMCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NzQgXHVDODc0XHVDN0FDXHVENTY4JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHVBREY4XHVCOEY5XSBcdUNEOTRcdUFDMDBcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1QURGOFx1QjhGOV0gSURcdUFDMDAgXHVDNzc0XHVCQkY4IFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QUM3MFx1QjA5OCBcdUJFNDRcdUM1QjQgXHVDNzg4XHVDNzRDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdUFERjhcdUI4RjldIFx1QzEzMVx1QUNGNVx1QzgwMVx1QzczQ1x1Qjg1QyBcdUMwQURcdUM4MUNcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1QURGOFx1QjhGOV0gXHVDMEFEXHVDODFDIFx1QzJFNFx1RDMyOCwgXHVDNzc0IFx1QURGOFx1QjhGOVx1RDU1OFx1QzVEMCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NzQgXHVDODc0XHVDN0FDXHVENTY4JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbXHVEMERDXHVBREY4XSBcdUNEOTRcdUFDMDBcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1x1RDBEQ1x1QURGOF0gSURcdUFDMDAgXHVDNzc0XHVCQkY4IFx1Qzg3NFx1QzdBQ1x1RDU1OFx1QUM3MFx1QjA5OCBcdUJFNDRcdUM1QjQgXHVDNzg4XHVDNzRDJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tcdUQwRENcdUFERjhdIFx1QzEzMVx1QUNGNVx1QzgwMVx1QzczQ1x1Qjg1QyBcdUMwQURcdUM4MUNcdUI0MjgnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1x1RDBEQ1x1QURGOF0gXHVDMEFEXHVDODFDIFx1QzJFNFx1RDMyOCwgXHVDNzc0IFx1RDBEQ1x1QURGOFx1RDU1OFx1QzVEMCBcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzhcdUM3NzQgXHVDODc0XHVDN0FDXHVENTY4JyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2M0QwXHU3OTNBX1x1NEUwMF9cdTY4MDdcdTk4OTg6ICdcdUIyRTRcdUI5NzggXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4XHVBQ0ZDXHVDNzU4IFx1Q0RBOVx1QjNDQ1x1Qzc3NCBcdUJDMUNcdUMwRERcdUQ1NjAgXHVBQ0JEXHVDNkIwJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjNDRlx1OEZGMDogJ1x1QjJBNVx1QjgyNVx1Qzc3NCBcdUM4MUNcdUQ1NUNcdUI0MThcdUM1QjQgXHVDNzg4XHVDNUI0IFx1Qzc3NCBcdUJCMzhcdUM4MUNcdUI5N0MgXHVENTc0XHVBQ0IwXHVENTYwIFx1QzIxOCBcdUM1QzZcdUMyQjVcdUIyQzhcdUIyRTQuIFx1QzlDMFx1QzVGMCBcdUMyRENcdUM3OTFcdUM3NDQgXHVCRTQ0XHVENjVDXHVDMTMxXHVENjU0XHVENTU4XHVDNUVDIFx1QkFBOFx1QjRFMCBcdUNEQTlcdUIzQ0MgXHVCQjM4XHVDODFDXHVCOTdDIFx1RDU3NFx1QUNCMFx1RDU1OFx1QzEzOFx1QzY5NC4nLFxyXG5cclxuICAgIFx1NTQ3RFx1NEVFNF9cdTdCQTFcdTc0MDZcdTk3NjJcdTY3N0ZfXHU2M0NGXHU4RkYwOiAnXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QUQwMFx1QjlBQ1x1Qzc5MFx1Qjk3QyBcdUM1RkRcdUIyQzhcdUIyRTQnLFxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFx1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDOiAnR2VzdGlvbm5haXJlIGRlIHBsdWdpbnMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjIxMFx1NTI5Rl9cdTY1ODdcdTY3MkM6ICdTdWNjXHUwMEU4cycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1OTMxXHU4RDI1X1x1NjU4N1x1NjcyQzogJ1x1MDBDOWNoZWMnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVCMFx1NTg5RV9cdTY1ODdcdTY3MkM6ICdBam91dGVyJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0Q0RcdTRGNUNfXHU2NTg3XHU2NzJDOiAnT3BcdTAwRTlyYXRpb24nLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjQxQ1x1N0QyMl9cdTY1ODdcdTY3MkM6ICdSZWNoZXJjaGUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NTQwRFx1NzlGMF9cdTY1ODdcdTY3MkM6ICdOb20nLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NTIwNlx1N0VDNF9cdTY1ODdcdTY3MkM6ICdBdWN1biBncm91cGUnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NjgwN1x1N0I3RV9cdTY1ODdcdTY3MkM6ICdBdWN1biB0YWcnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjVFMFx1NUVGNlx1OEZERl9cdTY1ODdcdTY3MkM6ICdBdWN1biByZXRhcmQnLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjAzQlx1OEJBMV9cdTY1ODdcdTY3MkM6ICdUb3RhbCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQzogJ0FjdGl2ZXInLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1Nzk4MVx1NzUyOF9cdTY1ODdcdTY3MkM6ICdEXHUwMEU5c2FjdGl2ZXInLFxyXG5cclxuXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfR0lUSFVCX1x1NjNDRlx1OEZGMDogJ1Zpc2l0ZXogbGEgcGFnZSBHaXRIdWIgZGUgbFxcJ2F1dGV1ciBwb3VyIHZvaXIgbGVzIGRcdTAwRTl0YWlscyBkdSBwcm9qZXQsIGxlcyBqb3VybmF1eCBkZSBtaXNlIFx1MDBFMCBqb3VyLCBwYXJ0aWNpcGVyIGF1eCBkaXNjdXNzaW9ucyBldCBjb250cmlidWVyIGR1IGNvZGUuJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTg5QzZcdTk4OTFcdTY1NTlcdTdBMEJfXHU2M0NGXHU4RkYwOiAnQWNjXHUwMEU5ZGV6IGF1eCB0dXRvcmllbHMgdmlkXHUwMEU5bycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU3RjE2XHU4RjkxXHU2QTIxXHU1RjBGX1x1NjNDRlx1OEZGMDogJ0FjdGl2ZXogbGUgbW9kZSBcdTAwRTlkaXRpb24gcG91ciB1bmUgcGVyc29ubmFsaXNhdGlvbiBhcHByb2ZvbmRpZSBkZSBsYSBjb25maWd1cmF0aW9uIGRlcyBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTkxQ0RcdThGN0RcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnUmVjaGFyZ2V6IGxlcyBwbHVnaW5zIHBvdXIgcXVcXCdpbHMgcHJlbm5lbnQgZWZmZXQgaW1tXHUwMEU5ZGlhdGVtZW50JyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTY4QzBcdTY3RTVcdTY2RjRcdTY1QjBfXHU2M0NGXHU4RkYwOiAnVlx1MDBFOXJpZmlleiBsZXMgbWlzZXMgXHUwMEUwIGpvdXIgZGVzIHBsdWdpbnMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdEXHUwMEU5c2FjdGl2ZXogdG91cyBsZXMgcGx1Z2lucyBlbiB1bmUgZm9pcycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RTAwXHU5NTJFXHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ0FjdGl2ZXogdG91cyBsZXMgcGx1Z2lucyBlbiB1bmUgZm9pcycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU2M0QyXHU0RUY2XHU4QkJFXHU3RjZFX1x1NjNDRlx1OEZGMDogJ0dcdTAwRTlyZXogbGVzIHBhcmFtXHUwMEU4dHJlcyBkZXMgcGx1Z2lucycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ0FmZmljaGV6IHVuaXF1ZW1lbnQgbGVzIHBsdWdpbnMgYWN0aXZcdTAwRTlzJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnT3V2cmV6IGxcXCdpbnRlcmZhY2UgZGUgcGFyYW1cdTAwRTh0cmVzJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdThGRDhcdTUzOUZcdTUxODVcdTVCQjlfXHU2M0NGXHU4RkYwOiAnUlx1MDBFOXRhYmxpc3NleiBsXFwnXHUwMEU5dGF0IGluaXRpYWwnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjI1M1x1NUYwMFx1NzZFRVx1NUY1NV9cdTYzQ0ZcdThGRjA6ICdPdXZyZXogbGUgclx1MDBFOXBlcnRvaXJlIGRlcyBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnU3VwcHJpbWV6IGNvbXBsXHUwMEU4dGVtZW50IGxlIHBsdWdpbicsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU1MjA3XHU2MzYyXHU3MkI2XHU2MDAxX1x1NjNDRlx1OEZGMDogJ0Jhc2N1bGVyIGxcXCdcdTAwRTl0YXQgZHUgcGx1Z2luJyxcclxuXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2ODA3XHU5ODk4OiAnRFx1MDBFOXNpbnN0YWxsZXIgbGUgcGx1Z2luJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTYzRDBcdTc5M0E6ICdcdTAwQ0F0ZXMtdm91cyBzXHUwMEZCciBkZSB2b3Vsb2lyIGRcdTAwRTlzaW5zdGFsbGVyIGNlIHBsdWdpbiA/IENlbGEgc3VwcHJpbWVyYSBsZSBkb3NzaWVyIGR1IHBsdWdpbi4nLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTM3OFx1OEY3RDogJ0RcdTAwRTlzaW5zdGFsbGVyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTUzRDZcdTZEODg6ICdBbm51bGVyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnRFx1MDBFOXNpbnN0YWxsXHUwMEU5IGF2ZWMgc3VjY1x1MDBFOHMnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnUGFyYW1cdTAwRTh0cmVzIGRlIGJhc2UnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdHcm91cGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdUYWcnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdSZXRhcmQnLFxyXG5cclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTY4MDdcdTk4OTg6ICdQYXJhbVx1MDBFOHRyZXMgZGUgbGFuZ3VlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjNDRlx1OEZGMDogJ0Nob2lzaXNzZXogdm90cmUgbGFuZ3VlIHByXHUwMEU5Zlx1MDBFOXJcdTAwRTllLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NzZFRVx1NUY1NVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdTdHlsZSBkdSByXHUwMEU5cGVydG9pcmUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnQ2hvaXNpc3NleiBsZSBzdHlsZSBkdSBncm91cGUgcG91ciBhbVx1MDBFOWxpb3JlciBsXFwnZXhwXHUwMEU5cmllbmNlIGRlIG5hdmlnYXRpb24uJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ1N0eWxlIGR1IGdyb3VwZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdDaG9pc2lzc2V6IGxlIHN0eWxlIGR1IGdyb3VwZSBwb3VyIGxlIHJlbmRyZSBwbHVzIHZpc2libGUgZXQgZmFjaWxlIFx1MDBFMCBpZGVudGlmaWVyLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdTdHlsZSBkdSB0YWcnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdTY4MzdcdTVGMEZfXHU2M0NGXHU4RkYwOiAnQ2hvaXNpc3NleiBsZSBzdHlsZSBkdSB0YWcgcG91ciBsZSByZW5kcmUgcGx1cyB2aXNpYmxlIGV0IGZhY2lsZSBcdTAwRTAgaWRlbnRpZmllci4nLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjgwN1x1OTg5ODogJ0RcdTAwRTltYXJyYWdlIGRpZmZcdTAwRTlyXHUwMEU5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1RUY2XHU2NUY2XHU1NDJGXHU1MkE4X1x1NjNDRlx1OEZGMDogJ0xcXCdhY3RpdmF0aW9uIGRlIGxhIGZvbmN0aW9uIGRlIGRcdTAwRTltYXJyYWdlIGRpZmZcdTAwRTlyXHUwMEU5IHBldXQgb3B0aW1pc2VyIGxcXCdvcmRyZSBkZSBjaGFyZ2VtZW50LCBtYWlzIHZldWlsbGV6IG5vdGVyIHF1ZSBjZWxhIHBldXQgY2F1c2VyIGRlcyBwcm9ibFx1MDBFOG1lcyBkZSBjb21wYXRpYmlsaXRcdTAwRTkgYXZlYyBjZXJ0YWlucyBwbHVnaW5zLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTY4MDdcdTk4OTg6ICdFc3RvbXBlciBsZXMgcGx1Z2lucycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdBcHBsaXF1ZXogdW4gZWZmZXQgZGUgdHJhbnNwYXJlbmNlIHZpc3VlbCBhdXggcGx1Z2lucyBkXHUwMEU5c2FjdGl2XHUwMEU5cyBwb3VyIGRpc3Rpbmd1ZXIgY2xhaXJlbWVudCBsZXMgcGx1Z2lucyBhY3Rpdlx1MDBFOXMgZXQgZFx1MDBFOXNhY3Rpdlx1MDBFOXMuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MzU1XHU3MkVDXHU1NDdEXHU0RUU0X1x1NjgwN1x1OTg5ODogJ0NvbnRyXHUwMEY0bGVyIGxlcyBjb21tYW5kZXMgZGVzIHBsdWdpbnMgc1x1MDBFOXBhclx1MDBFOW1lbnQnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnQWN0aXZleiBjZXR0ZSBvcHRpb24gcG91ciBjb250clx1MDBGNGxlciBsXFwnXHUwMEU5dGF0IGFjdGl2XHUwMEU5IGV0IGRcdTAwRTlzYWN0aXZcdTAwRTkgZGUgY2hhcXVlIHBsdWdpbiBzXHUwMEU5cGFyXHUwMEU5bWVudC4gKFJlZFx1MDBFOW1hcnJleiBPYnNpZGlhbiBwb3VyIHF1ZSBsZXMgbW9kaWZpY2F0aW9ucyBwcmVubmVudCBlZmZldCknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnQ29udHJcdTAwRjRsZXIgbGVzIGNvbW1hbmRlcyBkZXMgcGx1Z2lucyBwYXIgZ3JvdXBlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ0FjdGl2ZXogY2V0dGUgb3B0aW9uIHBvdXIgYWN0aXZlciBvdSBkXHUwMEU5c2FjdGl2ZXIgdG91cyBsZXMgcGx1Z2lucyBkXFwndW4gZ3JvdXBlIHNwXHUwMEU5Y2lmaXF1ZSBhdmVjIHVuIHNldWwgY2xpYy4gKFJlZFx1MDBFOW1hcnJleiBPYnNpZGlhbiBwb3VyIHF1ZSBsZXMgbW9kaWZpY2F0aW9ucyBwcmVubmVudCBlZmZldCknLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwMDogJ1tSZXRhcmRdIEFqb3V0XHUwMEU5JyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEU4QzogJ1tSZXRhcmRdIExcXCdJRCBleGlzdGUgZFx1MDBFOWpcdTAwRTAgb3UgZXN0IHZpZGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1JldGFyZF0gU3VwcHJpbVx1MDBFOSBhdmVjIHN1Y2NcdTAwRThzJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tSZXRhcmRdIFx1MDBDOWNoZWMgZGUgbGEgc3VwcHJlc3Npb24sIGRlcyBwbHVnaW5zIGV4aXN0ZW50IHNvdXMgY2UgcmV0YXJkJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbR3JvdXBlXSBBam91dFx1MDBFOScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbR3JvdXBlXSBMXFwnSUQgZXhpc3RlIGRcdTAwRTlqXHUwMEUwIG91IGVzdCB2aWRlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tHcm91cGVdIFN1cHByaW1cdTAwRTkgYXZlYyBzdWNjXHUwMEU4cycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTU2REI6ICdbR3JvdXBlXSBcdTAwQzljaGVjIGRlIGxhIHN1cHByZXNzaW9uLCBkZXMgcGx1Z2lucyBleGlzdGVudCBzb3VzIGNlIGdyb3VwZScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1RhZ10gQWpvdXRcdTAwRTknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW1RhZ10gTFxcJ0lEIGV4aXN0ZSBkXHUwMEU5alx1MDBFMCBvdSBlc3QgdmlkZScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbVGFnXSBTdXBwcmltXHUwMEU5IGF2ZWMgc3VjY1x1MDBFOHMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW1RhZ10gXHUwMEM5Y2hlYyBkZSBsYSBzdXBwcmVzc2lvbiwgZGVzIHBsdWdpbnMgZXhpc3RlbnQgc291cyBjZSB0YWcnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjgwN1x1OTg5ODogJ1NpIHZvdXMgcmVuY29udHJleiBkZXMgY29uZmxpdHMgYXZlYyBkXFwnYXV0cmVzIHBsdWdpbnMnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjNEMFx1NzkzQV9cdTRFMDBfXHU2M0NGXHU4RkYwOiAnRW4gcmFpc29uIGRlIGNhcGFjaXRcdTAwRTlzIGxpbWl0XHUwMEU5ZXMsIGplIG5lIHBldXggcGFzIHJcdTAwRTlzb3VkcmUgY2UgcHJvYmxcdTAwRThtZS4gVmV1aWxsZXogZFx1MDBFOXNhY3RpdmVyIGxlIGRcdTAwRTltYXJyYWdlIGRpZmZcdTAwRTlyXHUwMEU5IHBvdXIgclx1MDBFOXNvdWRyZSB0b3VzIGxlcyBwcm9ibFx1MDBFOG1lcyBkZSBjb25mbGl0LicsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjA6ICdPdXZyZXogbGUgZ2VzdGlvbm5haXJlIGRlIHBsdWdpbnMnLFxyXG59IiwgImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIFx1OTAxQVx1NzUyOF9cdTdCQTFcdTc0MDZcdTU2NjhfXHU2NTg3XHU2NzJDOiAnQWRtaW5pc3RyYWRvciBkZSBwbHVnaW5zJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTYyMTBcdTUyOUZfXHU2NTg3XHU2NzJDOiAnXHUwMEM5eGl0bycsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1OTMxXHU4RDI1X1x1NjU4N1x1NjcyQzogJ0ZhbGxvJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1QjBcdTU4OUVfXHU2NTg3XHU2NzJDOiAnQWdyZWdhcicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU2NENEXHU0RjVDX1x1NjU4N1x1NjcyQzogJ09wZXJhY2lcdTAwRjNuJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY0MUNcdTdEMjJfXHU2NTg3XHU2NzJDOiAnQnVzY2FyJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTU0MERcdTc5RjBfXHU2NTg3XHU2NzJDOiAnTm9tYnJlJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTUyMDZcdTdFQzRfXHU2NTg3XHU2NzJDOiAnU2luIGdydXBvJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTY4MDdcdTdCN0VfXHU2NTg3XHU2NzJDOiAnU2luIGV0aXF1ZXRhJyxcclxuICAgIFx1OTAxQVx1NzUyOF9cdTY1RTBcdTVFRjZcdThGREZfXHU2NTg3XHU2NzJDOiAnU2luIHJldHJhc28nLFxyXG4gICAgXHU5MDFBXHU3NTI4X1x1NjAzQlx1OEJBMV9cdTY1ODdcdTY3MkM6ICdUb3RhbCcsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU1NDJGXHU3NTI4X1x1NjU4N1x1NjcyQzogJ0hhYmlsaXRhcicsXHJcbiAgICBcdTkwMUFcdTc1MjhfXHU3OTgxXHU3NTI4X1x1NjU4N1x1NjcyQzogJ0Rlc2hhYmlsaXRhcicsXHJcblxyXG5cclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9HSVRIVUJfXHU2M0NGXHU4RkYwOiAnVmlzaXRlIGxhIHBcdTAwRTFnaW5hIGRlIEdpdEh1YiBkZWwgYXV0b3IgcGFyYSB2ZXIgZGV0YWxsZXMgZGVsIHByb3llY3RvLCByZWdpc3Ryb3MgZGUgYWN0dWFsaXphY2lvbmVzLCBwYXJ0aWNpcGFyIGVuIGRpc2N1c2lvbmVzIHkgY29udHJpYnVpciBjb24gY1x1MDBGM2RpZ28uJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTg5QzZcdTk4OTFcdTY1NTlcdTdBMEJfXHU2M0NGXHU4RkYwOiAnQWNjZWRlciBhIHR1dG9yaWFsZXMgZW4gdmlkZW8nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1N0YxNlx1OEY5MVx1NkEyMVx1NUYwRl9cdTYzQ0ZcdThGRjA6ICdIYWJpbGl0YXIgbW9kbyBkZSBlZGljaVx1MDBGM24gcGFyYSB1bmEgcGVyc29uYWxpemFjaVx1MDBGM24gcHJvZnVuZGEgZGUgbGEgY29uZmlndXJhY2lcdTAwRjNuIGRlbCBwbHVnaW4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1OTFDRFx1OEY3RFx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdSZWNhcmdhciBwbHVnaW5zIHBhcmEgcXVlIHN1cnRhbiBlZmVjdG8gaW5tZWRpYXRhbWVudGUnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjhDMFx1NjdFNVx1NjZGNFx1NjVCMF9cdTYzQ0ZcdThGRjA6ICdDb21wcm9iYXIgYWN0dWFsaXphY2lvbmVzIGRlIHBsdWdpbnMnLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1Nzk4MVx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdEZXNoYWJpbGl0YXIgdG9kb3MgbG9zIHBsdWdpbnMgYSBsYSB2ZXonLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NEUwMFx1OTUyRVx1NTQyRlx1NzUyOF9cdTYzQ0ZcdThGRjA6ICdIYWJpbGl0YXIgdG9kb3MgbG9zIHBsdWdpbnMgYSBsYSB2ZXonLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NjNEMlx1NEVGNlx1OEJCRVx1N0Y2RV9cdTYzQ0ZcdThGRjA6ICdBZG1pbmlzdHJhciBjb25maWd1cmFjaVx1MDBGM24gZGUgcGx1Z2lucycsXHJcbiAgICBcdTdCQTFcdTc0MDZcdTU2NjhfXHU0RUM1XHU1NDJGXHU3NTI4X1x1NjNDRlx1OEZGMDogJ01vc3RyYXIgc29sbyBwbHVnaW5zIGhhYmlsaXRhZG9zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdThCQkVcdTdGNkVfXHU2M0NGXHU4RkYwOiAnQWJyaXIgbGEgaW50ZXJmYXogZGUgY29uZmlndXJhY2lcdTAwRjNuJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdThGRDhcdTUzOUZcdTUxODVcdTVCQjlfXHU2M0NGXHU4RkYwOiAnUmVzdGF1cmFyIGFsIGVzdGFkbyBpbmljaWFsJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTYyNTNcdTVGMDBcdTc2RUVcdTVGNTVfXHU2M0NGXHU4RkYwOiAnQWJyaXIgZWwgZGlyZWN0b3JpbyBkZSBwbHVnaW5zJyxcclxuICAgIFx1N0JBMVx1NzQwNlx1NTY2OF9cdTUyMjBcdTk2NjRcdTYzRDJcdTRFRjZfXHU2M0NGXHU4RkYwOiAnRWxpbWluYXIgY29tcGxldGFtZW50ZSBlbCBwbHVnaW4nLFxyXG4gICAgXHU3QkExXHU3NDA2XHU1NjY4X1x1NTIwN1x1NjM2Mlx1NzJCNlx1NjAwMV9cdTYzQ0ZcdThGRjA6ICdBbHRlcm5hciBlbCBlc3RhZG8gZGVsIHBsdWdpbicsXHJcblxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NjgwN1x1OTg5ODogJ0Rlc2luc3RhbGFyIFBsdWdpbicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU2M0QwXHU3OTNBOiAnXHUwMEJGRXN0XHUwMEUxIHNlZ3VybyBkZSBxdWUgZGVzZWEgZGVzaW5zdGFsYXIgZXN0ZSBwbHVnaW4/IEVzdG8gZWxpbWluYXJcdTAwRTEgbGEgY2FycGV0YSBkZWwgcGx1Z2luLicsXHJcbiAgICBcdTUzNzhcdThGN0RfXHU1Mzc4XHU4RjdEOiAnRGVzaW5zdGFsYXInLFxyXG4gICAgXHU1Mzc4XHU4RjdEX1x1NTNENlx1NkQ4ODogJ0NhbmNlbGFyJyxcclxuICAgIFx1NTM3OFx1OEY3RF9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnRGVzaW5zdGFsYWRvIGNvcnJlY3RhbWVudGUnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnQ29uZmlndXJhY2lcdTAwRjNuIGJcdTAwRTFzaWNhJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU1MjREXHU3RjAwOiAnR3J1cG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTUyNERcdTdGMDA6ICdFdGlxdWV0YScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1NTI0RFx1N0YwMDogJ1JldHJhc28nLFxyXG5cclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1OEJFRFx1OEEwMF9cdTY4MDdcdTk4OTg6ICdDb25maWd1cmFjaVx1MDBGM24gZGUgaWRpb21hJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU4QkVEXHU4QTAwX1x1NjNDRlx1OEZGMDogJ1NlbGVjY2lvbmUgc3UgaWRpb21hIHByZWZlcmlkby4nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTc2RUVcdTVGNTVcdTY4MzdcdTVGMEZfXHU2ODA3XHU5ODk4OiAnRXN0aWxvIGRlbCBkaXJlY3RvcmlvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU3NkVFXHU1RjU1XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1NlbGVjY2lvbmUgZWwgZXN0aWxvIGRlbCBncnVwbyBwYXJhIG1lam9yYXIgbGEgZXhwZXJpZW5jaWEgZGUgbmF2ZWdhY2lcdTAwRjNuLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1NjgzN1x1NUYwRl9cdTY4MDdcdTk4OTg6ICdFc3RpbG8gZGVsIGdydXBvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU2ODM3XHU1RjBGX1x1NjNDRlx1OEZGMDogJ1NlbGVjY2lvbmUgZWwgZXN0aWxvIGRlbCBncnVwbyBwYXJhIGhhY2VybG8gbVx1MDBFMXMgdmlzaWJsZSB5IGZcdTAwRTFjaWwgZGUgaWRlbnRpZmljYXIuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU2ODM3XHU1RjBGX1x1NjgwN1x1OTg5ODogJ0VzdGlsbyBkZSBsYSBldGlxdWV0YScsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1NjgzN1x1NUYwRl9cdTYzQ0ZcdThGRjA6ICdTZWxlY2Npb25lIGVsIGVzdGlsbyBkZSBsYSBldGlxdWV0YSBwYXJhIGhhY2VybG8gbVx1MDBFMXMgdmlzaWJsZSB5IGZcdTAwRTFjaWwgZGUgaWRlbnRpZmljYXIuJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NUVGNlx1NjVGNlx1NTQyRlx1NTJBOF9cdTY4MDdcdTk4OTg6ICdJbmljaW8gY29uIHJldHJhc28nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTVFRjZcdTY1RjZcdTU0MkZcdTUyQThfXHU2M0NGXHU4RkYwOiAnSGFiaWxpdGFyIGxhIGZ1bmNpXHUwMEYzbiBkZSBpbmljaW8gY29uIHJldHJhc28gcHVlZGUgb3B0aW1pemFyIGVsIG9yZGVuIGRlIGNhcmdhLCBwZXJvIHRlbmdhIGVuIGN1ZW50YSBxdWUgZXN0byBwdWVkZSBjYXVzYXIgcHJvYmxlbWFzIGRlIGNvbXBhdGliaWxpZGFkIGNvbiBhbGd1bm9zIHBsdWdpbnMuJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU2REUxXHU1MzE2XHU2M0QyXHU0RUY2X1x1NjgwN1x1OTg5ODogJ0F0ZW51YXIgcGx1Z2lucycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NkRFMVx1NTMxNlx1NjNEMlx1NEVGNl9cdTYzQ0ZcdThGRjA6ICdQcm9wb3JjaW9uZSB1biBlZmVjdG8gZGUgYXRlbnVhY2lcdTAwRjNuIHZpc3VhbCBwYXJhIHBsdWdpbnMgZGVzaGFiaWxpdGFkb3MgcGFyYSBkaXN0aW5ndWlyIGNsYXJhbWVudGUgZW50cmUgcGx1Z2lucyBoYWJpbGl0YWRvcyB5IGRlc2hhYmlsaXRhZG9zLicsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFX1x1NTM1NVx1NzJFQ1x1NTQ3RFx1NEVFNF9cdTY4MDdcdTk4OTg6ICdDb250cm9sYXIgY29tYW5kb3MgZGUgcGx1Z2lucyBwb3Igc2VwYXJhZG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUzNTVcdTcyRUNcdTU0N0RcdTRFRTRfXHU2M0NGXHU4RkYwOiAnSGFiaWxpdGUgZXN0YSBvcGNpXHUwMEYzbiBwYXJhIGNvbnRyb2xhciBlbCBlc3RhZG8gaGFiaWxpdGFkbyB5IGRlc2hhYmlsaXRhZG8gZGUgY2FkYSBwbHVnaW4gcG9yIHNlcGFyYWRvLiAoUmVpbmljaWUgT2JzaWRpYW4gcGFyYSBxdWUgc3VydGFuIGVmZWN0byknLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTdGQVx1Nzg0MFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdTU0N0RcdTRFRTRfXHU2ODA3XHU5ODk4OiAnQ29udHJvbGFyIGNvbWFuZG9zIGRlIHBsdWdpbnMgcG9yIGdydXBvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTU3RkFcdTc4NDBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU1NDdEXHU0RUU0X1x1NjNDRlx1OEZGMDogJ0hhYmlsaXRlIGVzdGEgb3BjaVx1MDBGM24gcGFyYSBoYWJpbGl0YXIgbyBkZXNoYWJpbGl0YXIgdG9kb3MgbG9zIHBsdWdpbnMgZGUgdW4gZ3J1cG8gZXNwZWNcdTAwRURmaWNvIGNvbiB1biBzb2xvIGNsaWMuIChSZWluaWNpZSBPYnNpZGlhbiBwYXJhIHF1ZSBzdXJ0YW4gZWZlY3RvKScsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW1JldHJhc29dIEFcdTAwRjFhZGlkbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1RUY2XHU4RkRGXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbUmV0cmFzb10gRWwgSUQgeWEgZXhpc3RlIG8gZXN0XHUwMEUxIHZhY1x1MDBFRG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NUVGNlx1OEZERlx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTA5OiAnW1JldHJhc29dIEVsaW1pbmFkbyBjb3JyZWN0YW1lbnRlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTVFRjZcdThGREZcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tSZXRyYXNvXSBGYWxsbyBhbCBlbGltaW5hciwgZXhpc3RlbiBwbHVnaW5zIGJham8gZXN0ZSByZXRyYXNvJyxcclxuXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDA6ICdbR3J1cG9dIEFcdTAwRjFhZGlkbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU1MjA2XHU3RUM0XHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFOEM6ICdbR3J1cG9dIEVsIElEIHlhIGV4aXN0ZSBvIGVzdFx1MDBFMSB2YWNcdTAwRURvJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTUyMDZcdTdFQzRcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NEUwOTogJ1tHcnVwb10gRWxpbWluYWRvIGNvcnJlY3RhbWVudGUnLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NTIwNlx1N0VDNFx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU1NkRCOiAnW0dydXBvXSBGYWxsbyBhbCBlbGltaW5hciwgZXhpc3RlbiBwbHVnaW5zIGJham8gZXN0ZSBncnVwbycsXHJcblxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RTAwOiAnW0V0aXF1ZXRhXSBBXHUwMEYxYWRpZG8nLFxyXG4gICAgXHU4QkJFXHU3RjZFX1x1NjgwN1x1N0I3RVx1OEJCRVx1N0Y2RV9cdTkwMUFcdTc3RTVfXHU0RThDOiAnW0V0aXF1ZXRhXSBFbCBJRCB5YSBleGlzdGUgbyBlc3RcdTAwRTEgdmFjXHUwMEVEbycsXHJcbiAgICBcdThCQkVcdTdGNkVfXHU2ODA3XHU3QjdFXHU4QkJFXHU3RjZFX1x1OTAxQVx1NzdFNV9cdTRFMDk6ICdbRXRpcXVldGFdIEVsaW1pbmFkbyBjb3JyZWN0YW1lbnRlJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTY4MDdcdTdCN0VcdThCQkVcdTdGNkVfXHU5MDFBXHU3N0U1X1x1NTZEQjogJ1tFdGlxdWV0YV0gRmFsbG8gYWwgZWxpbWluYXIsIGV4aXN0ZW4gcGx1Z2lucyBiYWpvIGVzdGEgZXRpcXVldGEnLFxyXG5cclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjgwN1x1OTg5ODogJ1NpIGVuY3VlbnRyYSBjb25mbGljdG9zIGNvbiBvdHJvcyBwbHVnaW5zJyxcclxuICAgIFx1OEJCRVx1N0Y2RV9cdTYzRDBcdTc5M0FfXHU0RTAwX1x1NjNDRlx1OEZGMDogJ0RlYmlkbyBhIGNhcGFjaWRhZGVzIGxpbWl0YWRhcywgbm8gcHVlZG8gc29sdWNpb25hciBlc3RlIHByb2JsZW1hLiBQb3IgZmF2b3IsIGRlc2hhYmlsaXRlIGVsIGluaWNpbyBjb24gcmV0cmFzbyBwYXJhIHJlc29sdmVyIHRvZG9zIGxvcyBwcm9ibGVtYXMgZGUgY29uZmxpY3RvLicsXHJcblxyXG4gICAgXHU1NDdEXHU0RUU0X1x1N0JBMVx1NzQwNlx1OTc2Mlx1Njc3Rl9cdTYzQ0ZcdThGRjA6ICdBYnJpciBlbCBhZG1pbmlzdHJhZG9yIGRlIHBsdWdpbnMnLFxyXG59IiwgImltcG9ydCBNYW5hZ2VyIGZyb20gXCJtYWluXCI7XHJcbmltcG9ydCB6aF9jbiBmcm9tICcuL2xvY2FsZS96aF9jbic7XHJcbmltcG9ydCBlbiBmcm9tIFwiLi9sb2NhbGUvZW5cIjtcclxuaW1wb3J0IHJ1IGZyb20gXCIuL2xvY2FsZS9ydVwiO1xyXG5pbXBvcnQgamEgZnJvbSBcIi4vbG9jYWxlL2phXCI7XHJcbmltcG9ydCBrbyBmcm9tIFwiLi9sb2NhbGUva29cIjtcclxuaW1wb3J0IGZyIGZyb20gXCIuL2xvY2FsZS9mclwiO1xyXG5pbXBvcnQgZXMgZnJvbSBcIi4vbG9jYWxlL2VzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRvciB7XHJcblx0cHJpdmF0ZSBtYW5hZ2VyOiBNYW5hZ2VyO1xyXG5cdHB1YmxpYyBsYW5ndWFnZSA9IHtcclxuXHRcdCd6aC1jbic6ICdcdTdCODBcdTRGNTNcdTRFMkRcdTY1ODcnLFxyXG5cdFx0J2VuJzogJ0VuZ2xpc2gnLFxyXG5cdFx0J3J1JzogJ1x1MDQyMFx1MDQ0M1x1MDQ0MVx1MDQ0MVx1MDQzQVx1MDQzOFx1MDQzOSBcdTA0NEZcdTA0MzdcdTA0NEJcdTA0M0EnLFxyXG5cdFx0J2phJzogJ1x1NjVFNVx1NjcyQ1x1OEE5RScsXHJcblx0XHQna28nOiAnXHVENTVDXHVBRDZEXHVDNUI0JyxcclxuXHRcdCdmcic6ICdGcmFuXHUwMEU3YWlzJyxcclxuXHRcdCdlcyc6ICdFc3BhXHUwMEYxb2wnLFxyXG5cdH07XHJcblxyXG5cdHByaXZhdGUgbG9jYWxlTWFwOiB7IFtrOiBzdHJpbmddOiBQYXJ0aWFsPHR5cGVvZiB6aF9jbj4gfSA9IHtcclxuXHRcdCd6aC1jbic6IHpoX2NuLFxyXG5cdFx0J2VuJzogZW4sXHJcblx0XHQncnUnOiBydSxcclxuXHRcdCdqYSc6IGphLFxyXG5cdFx0J2tvJzoga28sXHJcblx0XHQnZnInOiBmcixcclxuXHRcdCdlcyc6IGVzLFxyXG5cdH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKG1hbmFnZXI6IE1hbmFnZXIpIHtcclxuXHRcdHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XHJcblx0fVxyXG5cclxuXHQvLyBcdTY1QjlcdTZDRDVcdTc1MjhcdTRFOEVcdTgzQjdcdTUzRDZcdTdGRkJcdThCRDFcdTU0MEVcdTc2ODRcdTVCNTdcdTdCMjZcdTRFMzJcclxuXHRwdWJsaWMgdChzdHI6IGtleW9mIHR5cGVvZiB6aF9jbik6IHN0cmluZyB7XHJcblx0XHRjb25zdCBsYW5ndWFnZSA9IHRoaXMubWFuYWdlci5zZXR0aW5ncy5MQU5HVUFHRSB8fCAnemgtY24nOyAvLyBcdTlFRDhcdThCQTRcdTRGN0ZcdTc1MjggJ3poLWNuJ1xyXG5cdFx0Y29uc3QgbG9jYWxlID0gdGhpcy5sb2NhbGVNYXBbbGFuZ3VhZ2VdIHx8IHpoX2NuOyAvLyBcdTU5ODJcdTY3OUMgbGFuZ3VhZ2UgXHU0RTBEXHU1QjU4XHU1NzI4XHVGRjBDXHU1MjE5XHU0RjdGXHU3NTI4IHpoX2NuXHJcblx0XHRyZXR1cm4gbG9jYWxlW3N0cl0gfHwgemhfY25bc3RyXTsgLy8gXHU1OTgyXHU2NzlDIHN0ciBcdTU3MjggbG9jYWxlIFx1NEUyRFx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxOVx1NEY3Rlx1NzUyOCB6aF9jbiBcdTRFMkRcdTc2ODRcdTlFRDhcdThCQTRcdTUwM0NcclxuXHR9XHJcbn1cclxuXHJcbi8vIGltcG9ydCB7IG1vbWVudCB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG4vLyBpbXBvcnQgemhfY24gZnJvbSAnLi9sb2NhbGUvemhfY24nO1xyXG4vLyBpbXBvcnQgZW4gZnJvbSBcIi4vbG9jYWxlL2VuXCI7XHJcbi8vIGltcG9ydCBqYV9qcCBmcm9tIFwiLi9sb2NhbGUvamFfanBcIjtcclxuLy8gaW1wb3J0IGtvX2tyIGZyb20gXCIuL2xvY2FsZS9rb19rclwiO1xyXG4vLyBpbXBvcnQgcnVfcnUgZnJvbSBcIi4vbG9jYWxlL3J1X3J1XCI7XHJcblxyXG4vLyBleHBvcnQgY29uc3QgTEFOR1VBR0UgPSB7XHJcbi8vIFx0J3poLWNuJzogJ1x1N0I4MFx1NEY1M1x1NEUyRFx1NjU4NycsXHJcbi8vIFx0J2VuJzogJ1x1NkMzOFx1NEUwRFx1NUM1NVx1NUYwMCdcclxuLy8gfVxyXG5cclxuLy8gY29uc3QgbG9jYWxlTWFwOiB7IFtrOiBzdHJpbmddOiBQYXJ0aWFsPHR5cGVvZiB6aF9jbj4gfSA9IHtcclxuLy8gXHQnemgtY24nOiB6aF9jbixcclxuLy8gXHQnZW4tdXMnOiBlbixcclxuLy8gXHQnamEtanAnOiBqYV9qcCxcclxuLy8gXHQna28ta3InOiBrb19rcixcclxuLy8gXHQncnUtcnUnOiBydV9ydVxyXG4vLyB9O1xyXG5cclxuLy8gLy8gY29uc3QgbG9jYWxlcyA9IG1vbWVudC5sb2NhbGVzKCk7XHJcbi8vIC8vIGNvbnNvbGUubG9nKGxvY2FsZXMpO1xyXG4vLyAvLyBjb25zb2xlLmxvZyhtb21lbnQubG9jYWxlKCkpXHJcbi8vIGNvbnN0IGxvY2FsZSA9IGxvY2FsZU1hcFttb21lbnQubG9jYWxlKCldO1xyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHQoc3RyOiBrZXlvZiB0eXBlb2YgemhfY24pOiBzdHJpbmcge1xyXG4vLyBcdHJldHVybiAobG9jYWxlICYmIGxvY2FsZVtzdHJdKSB8fCB6aF9jbltzdHJdO1xyXG4vLyB9XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEs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QUM7QUFDbEUsVUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFLLE9BQU8sSUFBSyxPQUFRLE1BQU0sQ0FBQztBQUNqRSxVQUFNLElBQUksS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksTUFBTSxPQUFRLE1BQU0sQ0FBQztBQUMxRCxXQUFPLE1BQU0sS0FBSyxPQUFPLEtBQUssT0FBTyxLQUFLLEtBQUssR0FBRyxTQUFTLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxZQUFZO0FBQUEsRUFDeEY7QUFDSjs7O0FENU1BLElBQU8sZUFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpdGVtIiwgIm1wIiwgImltcG9ydF9vYnNpZGlhbiJdCn0K
