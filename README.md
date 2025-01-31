# "Plugin-pack" for [`Obsidian`](https://obsidian.md)

This is just a large collection of already set up plugins and hotkeys… That was gotten rid of any conflicts.

NOTE: After forking/using the template, feel free to give this file a proper use)

## List of plugins

### Improve *default app* features
- [Settings Search](https://github.com/javalent/settings-search) – perform search among all settings, including: application, core and community plugins
- [Hotkey Helper](https://github.com/pjeby/hotkey-helper) – jump to plugins' hotkeys from their description, view which plugins have conflicting hotkeys
- [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) – change configuration options provided by some themes and plugins' CSS files
- [Scroll Speed](https://github.com/flolu/obsidian-scroll-speed) – modify base mouse scroll speed and make animation smoother, scroll faster by pressing `Alt` key
- [Trash Explorer](https://github.com/proog/obsidian-trash-explorer) – view, restore or remove deleted files (located in app's hidden `.trash` folder)

#### Tags
- [Tag Wrangler](https://github.com/pjeby/tag-wrangler) – rename (sub)tags "in bulk", filter search with tags and manage "[Tag Pages](https://github.com/pjeby/tag-wrangler?tab=readme-ov-file#tag-pages)"
- [Colored Tags Wrangler](https://github.com/code-of-chaos/obsidian-colored_tags_wrangler) – assign unique tag colors, then apply them to canvas items, folders and/or notes
- [Quick Tagger](https://github.com/Gorkycreator/obsidian-quick-tagger) – add/remove tags of file(s) "in bulk" by calling commands, using hotkeys or context menu

#### Links
- [Links](https://github.com/mii-key/obsidian-links) – add A LOT of context menu actions for link creation, editing, convertion and removal/deletion from note
- [Auto Link Title](https://github.com/zolrath/obsidian-auto-link-title) – automatically fetch website's title upon pasting it into notes
- [Link Favicons](https://github.com/joethei/obsidian-link-favicon) – automatically render favicons for external links (website), set custom icon for certain links
- [Copy Block Link](https://github.com/mgmeyers/obsidian-copy-block-link) – get links to text blocks and headings directly from a context menu
- [Link Headers Directly](https://github.com/Signynt/link-headers-directly) – show only the last header of internal links, and not the whole note hierarchy
  - works only in [Reading](https://help.obsidian.md/Editing+and+formatting/Edit+and+preview+Markdown#Editor+views) view


### Overhaul *core plugins*
- [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes) – create not just daily, but also weekly, monthly, quarterly and yearly notes!
  - should turn OFF core [Daily Notes](https://help.obsidian.md/Plugins/Daily+notes) plugin
- [Better Word Count](https://github.com/lukeleppan/better-word-count) – collect stats about your whole vault, also customize displaying them
  - should turn OFF core [Word Count](https://help.obsidian.md/Plugins/Word+count) plugin
- [Slides Extended](https://github.com/ebullient/obsidian-slides-extended) – create presentations: customize each element and apply themes globally, improve slide navigation, view changes live, switch between different modes, and more
  - should turn OFF core [Slides](https://help.obsidian.md/Plugins/Slides) plugin
- [Slash Commander](https://github.com/alephpiece/obsidian-slash-commander) – customize slash command list and show descriptions for each one
  - MUST turn OFF core [Slash commands](https://help.obsidian.md/Plugins/Slash+commands) plugin
- [Better Search Views](https://github.com/ivan-lednev/better-search-views) – search results now [decorated](https://github.com/ivan-lednev/better-search-views?tab=readme-ov-file#but-what-does-it-do-exactly) with breadcrumbs, or display an hierarchy
  - MUST turn ON core [Search](https://help.obsidian.md/Plugins/Search) and [Backlinks](https://help.obsidian.md/Plugins/Backlinks) plugins
- [Quick Switcher++](https://github.com/darlal/obsidian-switcher-plus) – switch between multiple modes (Standard, Commands, Editor, Symbols, Headings, Related Items, Bookmarks, Workspaces, Vaults) to make searching, filtering results and navigation between any `Obsidian` entities quicker
  - MUST turn ON core [Quick Switcher](https://help.obsidian.md/Plugins/Quick+switcher) and [Command palette](https://help.obsidian.md/Plugins/Command+palette) plugins
- [Hover Editor](https://github.com/nothingislost/obsidian-hover-editor) – "turn the hover popover into a full featured [editor instance](https://github.com/nothingislost/obsidian-hover-editor?tab=readme-ov-file#features)"
  - MUST turn ON core [Page preview](https://help.obsidian.md/Plugins/Page+preview) plugin
- [Workspaces Plus](https://github.com/nothingislost/obsidian-workspaces-plus) – make editing and switching workspaces easier, also setup different theme for each one
  - MUST turn ON core [Workspaces](https://help.obsidian.md/Plugins/Workspaces) plugin
- [Nested tags graph](https://github.com/drPilman/obsidian-graph-nested-tags) / ~~[Folders to Graph](https://github.com/Ratibus11/folders2graph)~~ – link nested tags ~~or show folder structure~~ in graph view
  - MUST turn ON core [Graph view](https://help.obsidian.md/Plugins/Graph+view) plugin
  - one cancels another, choose anything you like

#### [Canvas](https://help.obsidian.md/Plugins/Canvas) plugin
<details> <summary> MUST be turned ON for plugins below to work: </summary>

- [Advanced Canvas](https://github.com/Developer-Mike/obsidian-advanced-canvas) – change note/edge styles, auto-resize elements and create presentations from `Canvas` files
- [Canvas Card Background Remover](https://github.com/luxmargos/obsidian-canvas-card-bg-remover) – remove background from transparent embeds (like images)
- [Canvas Keyboard Pan](https://github.com/nathonius/obsidian-canvas-pan) – move in Canvas using the keyboard (instead of just mouse wheel)
- [Canvas Link Optimizer](https://github.com/Qbject/obsidian-canvas-link-optimizer) – display cached (as image) preview of a note/web page to improve performance
- [Canvas Links](https://github.com/aqav/obsidian-canvas-links) – display links between `Canvas` and `Markdown` file types inside of a new menu
- [Canvas MindMap](https://github.com/Quorafind/Obsidian-Canvas-MindMap) – add new controls to work with `Canvas` elements as a mindmap tree-like structure
- [Canvas Minimap](https://github.com/ifree/Obsidian-canvas-minimap) – add minimap that helps to navigate and get an overview of the canvas
- [Optimize Canvas Connections](https://github.com/felixchenier/obsidian-optimize-canvas-connections) – reconnect notes using their nearest edges to prevent "messy-looking" canvas
- [Search in Canvas](https://github.com/quorafind/obsidian-search-in-canvas) – search in canvas contents for text and highlight found entries

</details>

### New features
- [Execute Code](https://github.com/twibiral/obsidian-execute-code)
  - [JS Engine](https://github.com/mProjectsCode/obsidian-js-engine-plugin)

#### Date management
- [Calendar](https://github.com/liamcain/obsidian-calendar-plugin)
- [Natural Language Dates](https://github.com/argenos/nldates-obsidian)
- [Open with Natural Language Dates](https://github.com/charliecm/obsidian-open-with-nldates)

#### Search
- [Omnisearch](https://github.com/scambier/obsidian-omnisearch)
  - [Text Extractor](https://github.com/scambier/obsidian-text-extractor)


### Plugin management
- [Lazy Plugin Loader](https://github.com/alangrainger/obsidian-lazy-plugins) – load chosen plugins later to improve speed of `Obsidian` app launch
- [Plugin Update Tracker](https://github.com/swar8080/obsidian-plugin-update-tracker) – show update status of all installed plugins, browse release notes for each update and even ignore them
- [BRAT](https://github.com/TfTHacker/obsidian42-brat) – download plugins that were not listed from in-app plugin search (or beta versions of listed plugins)
- [Plugins Annotations](https://github.com/alberti42/obsidian-plugins-annotations) – add personal annotations to each installed plugin to store their use-cases, as labels can't provide full info


### Third-party integrations
- [Discord Rich Presence](https://github.com/lukeleppan/obsidian-discordrpc) – integrate an app into [`Discord`](https://discord.com) status: show vault name, editing file and elapsed time
- [Todoist Sync](https://github.com/jamiebrynes7/obsidian-todoist-plugin) – bidirectional sync with [`Todoist`](https://todoist.com) task manager: create new tasks and complete existing ones
- [WakaTime](https://github.com/wakatime/obsidian-wakatime) – send metrics, insights, and time tracking from app usage activity to [`WakaTime`](https://wakatime.com) dashboard
- [LanguageTool Integration](https://github.com/Clemens-E/obsidian-languagetool-plugin) – check grammar and spellling for many languages with [`LanguageTool`](https://languagetool.org)

#### Synchronization
- [Version History Diff](https://github.com/kometenstaub/obsidian-version-history-diff) – display diffs for core [File recovery](https://help.obsidian.md/Plugins/File+recovery) plugin and [`Obsidian Sync`](https://help.obsidian.md/Obsidian+Sync/Introduction+to+Obsidian+Sync) paid service
  - also supports [`Git`](https://git-scm.com) VCS history (using the next plugin below)
- [Git](https://github.com/Vinzent03/obsidian-git) – store remote copy of your vault in a `GitHub` repository, which also allows sync between different devices
  - should be disabled on mobile devices, use separate [`Git Sync`](https://github.com/ViscousPot/GitSync) app instead


### Markdown [formatting](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax)
- [Footnote Shortcut](https://github.com/MichaBrugger/obsidian-footnotes) – insert auto-numbered/named footnote, create description at the note bottom, navigate between them
- [Code Styler](https://github.com/mayurankv/Obsidian-Code-Styler) – apply styles/themes to codeblocks and inline code, or customize them to your liking

#### List
- [Outliner](https://github.com/vslinko/obsidian-outliner) – improve list [editing](https://github.com/vslinko/obsidian-outliner) experience: move around nested elements, change selection behaviour, and so on
- [List Callouts](https://github.com/mgmeyers/obsidian-list-callouts) – create "callout" lists: change element's front symbol/icon, add color of them and background
- [Ordered List Style](https://github.com/erykwalder/obsidian-list-style) – change style of ordered lists from a wide [selection](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type#specifications)
  - styles apply only in [Reading](https://help.obsidian.md/Editing+and+formatting/Edit+and+preview+Markdown#Editor+views) view
- [Checklist Reset](https://github.com/lhansford/obsidian-checklist-reset) – reset state (set to unchecked) of any checklists in opened note

#### Callout
- [Callout Manager](https://github.com/eth-p/obsidian-callout-manager) – create custom callout types and styles (color and icon) which are similar to existing ones
- [Callout Suggestions](https://github.com/cwfryer/obsidian-callout-suggestions) – add suggestion modal (by name) upon creating new callout
- [Callout Menu](https://github.com/anareaty/callout-menu) – improve callout context menu to change it's type, default collapse and metadata
- [Callout Integrator](https://github.com/Cleoche/obsidian-callout-integrator) – include selected blocks of text in existing callouts using a hotkey (containing "`>`")

#### Math
- [Latex Suite](https://github.com/artisticat1/obsidian-latex-suite) – ...
- [Better Math in Callouts & Blockquotes](https://github.com/RyotaUshio/obsidian-math-in-callout) – ...

#### Table
- [Advanced Tables](https://github.com/tgrosinger/advanced-tables-obsidian) – manipulate and navigate tables using buttons from new tab, also add spreadsheet formulas
- [Sheets Extended](https://github.com/NicoNekoru/obsidan-advanced-table-xt) – create vertical headers, change style of table cells and merge them together


### Unsorted yet
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview) – ...
- [Templater](https://github.com/SilentVoid13/Templater) – ...
- [Beautitab](https://github.com/andrewmcgivery/obsidian-beautitab) – ...
- [Blur](https://github.com/gapmiss/blur) – ...
- [Chord Sheets](https://github.com/olvidalo/obsidian-chord-sheets) (provides the best "autoscroll note" feature) – ...
- [Commander](https://github.com/phibr0/obsidian-commander) – ...
- ~~[Continuous Mode](https://github.com/gasparschott/obsidian-continuous-mode)~~ (kinda broken right now) – ...
- [Cursor Location](https://github.com/spslater/obsidian-cursor-location-plugin) – ...
- [Day and Night](https://github.com/CyberT17/obsidian-day-and-night) (used to manually "toggle light/dark mode") – ...
- [Double Click Tab](https://github.com/Quorafind/Obsidian-Double-Click-Tab) – ...
- [Doubleshift](https://github.com/Qwyntex/doubleshift) (create hotkeys with double tap) – ...
- [Dynamic Outline](https://github.com/theopavlove/obsidian-dynamic-outline) – ...
- [Editing Toolbar](https://github.com/PKM-er/obsidian-editing-toolbar) – ...
- [Enhanced Annotations](https://github.com/ycnmhd/obsidian-enhanced-annotations) – ...
- [Enhanced Copy](https://github.com/Mara-Li/obsidian-enhanced-copy) – ...
- [File Color](https://github.com/ecustic/obsidian-file-color) – ...
- [File Explorer++](https://github.com/kelszo/obsidian-file-explorer-plus) – ...
- [Folder notes](https://github.com/LostPaul/obsidian-folder-notes) – ...
- [Force note View mode](https://github.com/bwydoogh/obsidian-force-view-mode-of-note) – ...
- [Hider](https://github.com/kepano/obsidian-hider) – ...
- [Homepage](https://github.com/mirnovov/obsidian-homepage) – ...
- [Icon Shortcodes](https://github.com/aidenlx/obsidian-icon-shortcodes) – ...
- [Iconic](https://github.com/gfxholo/iconic) – ...
- [Image Converter](https://github.com/xryul/obsidian-image-converter) – ...
- [Limelight](https://github.com/smikula/obsidian-limelight) – ...
- [Linter](https://github.com/platers/obsidian-linter) – ...
- [Media Notes](https://github.com/jemstelos/obsidian-media-notes) – ...
- [Mindmap NextGen](https://github.com/james-tindal/obsidian-mindmap-nextgen) – ...
- [Mouse Navigation](https://github.com/hobeom/obsidian-mouse-navigation) – ...
- [Note Refactor](https://github.com/lynchjames/note-refactor-obsidian) – ...
- [Note Toolbar](https://github.com/chrisgurney/obsidian-note-toolbar) – ...
- [Novel Word Count](https://github.com/isaaclyman/novel-word-count-obsidian) – ...
- [Occura](https://github.com/Krusty84/obsidian-occura-plugin) – ...
- [Paste Image Rename](https://github.com/reorx/obsidian-paste-image-rename) – ...
- [Pixel Banner](https://github.com/jparkerweb/pixel-banner) – ...
- [Quick Explorer](https://github.com/pjeby/quick-explorer) – ...
- [Reading Time](https://github.com/avr/obsidian-reading-time) – ...
- [Recent Files](https://github.com/tgrosinger/recent-files-obsidian) – ...
- [Remember cursor position](https://github.com/dy-sh/obsidian-remember-cursor-position) – ...
- [Replace All](https://github.com/patrickchiang/obsidian-replace-all) – ...
- [Smart Typography](https://github.com/mgmeyers/obsidian-smart-typography) – ...
- ~~[Tab Switcher](https://github.com/Vinzent03/tab-switcher)~~ (disabled as I cannot understand what it resolves) – ...
- [Typewriter Mode](https://github.com/davisriedel/obsidian-typewriter-mode) – ...
- [Various Complements](https://github.com/tadashi-aikawa/obsidian-various-complements-plugin) – ...
- [Vertical Tabs](https://github.com/oxdc/obsidian-vertical-tabs) – ...
- [Widgets](https://github.com/rafaelveiga/obsidian-widgets) – ...
