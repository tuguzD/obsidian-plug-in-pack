# "Plugin" template for [`Obsidian`](https://obsidian.md)

This is just a large collection of already set up plugins and hotkeys… That was gotten rid of any conflicts.

NOTE: After forking/using the template, feel free to give this file a proper use)

## List of plugins

### Core plugin upgrades
- [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes) – create not just daily, but also weekly, monthly, quarterly and yearly notes!
  - should turn OFF core [Daily Notes](https://help.obsidian.md/Plugins/Daily+notes)
- [Better Word Count](https://github.com/lukeleppan/better-word-count) – collect stats about your whole vault, also customize displaying them
  - should turn OFF core [Word Count](https://help.obsidian.md/Plugins/Word+count)
- [Slash Commander](https://github.com/alephpiece/obsidian-slash-commander) – customize slash command list and show descriptions for each one
  - MUST turn OFF core [Slash commands](https://help.obsidian.md/Plugins/Slash+commands)
- [Better Search Views](https://github.com/ivan-lednev/better-search-views) – search results now [decorated](https://github.com/ivan-lednev/better-search-views?tab=readme-ov-file#but-what-does-it-do-exactly) with breadcrumbs, or display an hierarchy
  - MUST turn ON core [Search](https://help.obsidian.md/Plugins/Search) and [Backlinks](https://help.obsidian.md/Plugins/Backlinks)
- [Hover Editor](https://github.com/nothingislost/obsidian-hover-editor) – "turn the hover popover into a full featured [editor instance](https://github.com/nothingislost/obsidian-hover-editor?tab=readme-ov-file#features)"
  - MUST turn ON core [Page preview](https://help.obsidian.md/Plugins/Page+preview)
- [Workspaces Plus](https://github.com/nothingislost/obsidian-workspaces-plus) – make editing and switching workspaces easier, also setup different theme for each one
  - MUST turn ON core [Workspaces](https://help.obsidian.md/Plugins/Workspaces)
- [Nested tags graph](https://github.com/drPilman/obsidian-graph-nested-tags) / ~~[Folders to Graph](https://github.com/Ratibus11/folders2graph)~~ – link nested tags ~~or show folder structure~~ in graph view
  - MUST turn ON core [Graph view](https://help.obsidian.md/Plugins/Graph+view)
  - one cancels another, choose anything you like

#### [`Canvas`](https://obsidian.md/canvas) feature
- [Advanced Canvas](https://github.com/Developer-Mike/obsidian-advanced-canvas) – change note/edge styles, auto-resize elements and create presentations from `Canvas` files
- [Canvas Card Background Remover](https://github.com/luxmargos/obsidian-canvas-card-bg-remover) – remove background from transparent embeds (like images)
- [Canvas Keyboard Pan](https://github.com/nathonius/obsidian-canvas-pan) – move in Canvas using the keyboard (instead of just mouse wheel)
- [Canvas Link Optimizer](https://github.com/Qbject/obsidian-canvas-link-optimizer) – display cached (as image) preview of a note/web page to improve performance
- [Canvas Links](https://github.com/aqav/obsidian-canvas-links) – display links between `Canvas` and `Markdown` file types inside of a new menu
- [Canvas MindMap](https://github.com/Quorafind/Obsidian-Canvas-MindMap) – add new controls to work with `Canvas` elements as a mindmap tree-like structure
- [Canvas Minimap](https://github.com/ifree/Obsidian-canvas-minimap) – add minimap that helps to navigate and get an overview of the canvas
- [Optimize Canvas Connections](https://github.com/felixchenier/obsidian-optimize-canvas-connections) – reconnect notes using their nearest edges to prevent "messy-looking" canvas
- [Search in Canvas](https://github.com/quorafind/obsidian-search-in-canvas) – search in canvas contents for text and highlight found entries


### Plugin management
- [Lazy Plugin Loader](https://github.com/alangrainger/obsidian-lazy-plugins) – load chosen plugins later to improve speed of `Obsidian` app launch
- [Plugin Update Tracker](https://github.com/swar8080/obsidian-plugin-update-tracker) – show update status of all installed plugins, browse release notes for each update and even ignore them
- [BRAT](https://github.com/TfTHacker/obsidian42-brat) – download plugins that were not listed from in-app plugin search (or beta versions of listed plugins)
- [Plugins Annotations](https://github.com/alberti42/obsidian-plugins-annotations) – add personal annotations to each installed plugin to store their use-cases, as labels can't provide full info


### Third-party integrations
- [Discord Rich Presence](https://github.com/lukeleppan/obsidian-discordrpc) – ...
- [Todoist Sync](https://github.com/jamiebrynes7/obsidian-todoist-plugin) – ...
- [WakaTime](https://github.com/wakatime/obsidian-wakatime) – ...
- [LanguageTool Integration](https://github.com/Clemens-E/obsidian-languagetool-plugin) – grammar and spell checking...
- [Execute Code](https://github.com/twibiral/obsidian-execute-code)

#### Synchronization (with `GitHub`)
- [Git](https://github.com/Vinzent03/obsidian-git) – store remote copy of your vault in a `GitHub` repository, which also allows sync between different devices
  - should be disabled on mobile devices, use [...]() instead
- [Version History Diff](https://github.com/kometenstaub/obsidian-version-history-diff) – ...


### Markdown [formatting](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax)
- [Footnote Shortcut](https://github.com/MichaBrugger/obsidian-footnotes) – ...
- [Code Styler](https://github.com/mayurankv/Obsidian-Code-Styler) – ...

#### List
- [Outliner](https://github.com/vslinko/obsidian-outliner) – ...
- [List Callouts](https://github.com/mgmeyers/obsidian-list-callouts) – ...
- [Ordered List Style](https://github.com/erykwalder/obsidian-list-style) – ...
  - works only in [Reading](https://help.obsidian.md/Editing+and+formatting/Edit+and+preview+Markdown#Editor+views) view
- [Checklist Reset](https://github.com/lhansford/obsidian-checklist-reset) – ...

#### Callout
- [Callout Manager](https://github.com/eth-p/obsidian-callout-manager) – create custom callout types and styles (color and icon) which are similar to existing ones
- [Callout Suggestions](https://github.com/cwfryer/obsidian-callout-suggestions) – add suggestion modal (by name) upon creating new callout
- [Callout Menu](https://github.com/anareaty/callout-menu) – improve callout context menu to change it's type, default collapse and metadata
- [Callout Integrator](https://github.com/Cleoche/obsidian-callout-integrator) – include selected blocks of text in existing callouts using a hotkey (containing "`>`")

#### Table
- [Advanced Tables](https://github.com/tgrosinger/advanced-tables-obsidian) – ...
- [Sheets Extended](https://github.com/NicoNekoru/obsidan-advanced-table-xt) – ...


### Visual fixes/enhancements
- [Better Math in Callouts & Blockquotes](https://github.com/RyotaUshio/obsidian-math-in-callout) – ...
- [Link Headers Directly](https://github.com/Signynt/link-headers-directly) – ...
  - works only in [Reading](https://help.obsidian.md/Editing+and+formatting/Edit+and+preview+Markdown#Editor+views) view


### Unsorted yet
- [Auto Link Title](https://github.com/zolrath/obsidian-auto-link-title)
- [Beautitab](https://github.com/andrewmcgivery/obsidian-beautitab)
- [Blur](https://github.com/gapmiss/blur)
- [Calendar](https://github.com/liamcain/obsidian-calendar-plugin)
- [Chord Sheets](https://github.com/olvidalo/obsidian-chord-sheets) (provides the best "autoscroll note" feature)
- [Colored Tags Wrangler](https://github.com/code-of-chaos/obsidian-colored_tags_wrangler)
- [Commander](https://github.com/phibr0/obsidian-commander)
- ~~[Continuous Mode](https://github.com/gasparschott/obsidian-continuous-mode)~~ (kinda broken right now)
- [Copy Block Link](https://github.com/mgmeyers/obsidian-copy-block-link)
- [Cursor Location](https://github.com/spslater/obsidian-cursor-location-plugin)
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
- [Day and Night](https://github.com/CyberT17/obsidian-day-and-night) (used to manually "toggle light/dark mode")
- [Double Click Tab](https://github.com/Quorafind/Obsidian-Double-Click-Tab)
- [Doubleshift](https://github.com/Qwyntex/doubleshift) (create hotkeys with double tap)
- [Dynamic Outline](https://github.com/theopavlove/obsidian-dynamic-outline)
- [Editing Toolbar](https://github.com/PKM-er/obsidian-editing-toolbar)
- [Enhanced Annotations](https://github.com/ycnmhd/obsidian-enhanced-annotations)
- [Enhanced Copy](https://github.com/Mara-Li/obsidian-enhanced-copy)
- [File Color](https://github.com/ecustic/obsidian-file-color)
- [File Explorer++](https://github.com/kelszo/obsidian-file-explorer-plus)
- [Folder notes](https://github.com/LostPaul/obsidian-folder-notes)
- [Force note View mode](https://github.com/bwydoogh/obsidian-force-view-mode-of-note)
- [Hider](https://github.com/kepano/obsidian-hider)
- [Homepage](https://github.com/mirnovov/obsidian-homepage)
- [Hotkey Helper](https://github.com/pjeby/hotkey-helper)
- [Icon Shortcodes](https://github.com/aidenlx/obsidian-icon-shortcodes)
- [Iconic](https://github.com/gfxholo/iconic)
- [Image Converter](https://github.com/xryul/obsidian-image-converter)
- [JS Engine](https://github.com/mProjectsCode/obsidian-js-engine-plugin)
- [Latex Suite](https://github.com/artisticat1/obsidian-latex-suite)
- [Limelight](https://github.com/smikula/obsidian-limelight)
- [Link Favicons](https://github.com/joethei/obsidian-link-favicon)
- [Links](https://github.com/mii-key/obsidian-links)
- [Linter](https://github.com/platers/obsidian-linter)
- [Media Notes](https://github.com/jemstelos/obsidian-media-notes)
- [Mindmap NextGen](https://github.com/james-tindal/obsidian-mindmap-nextgen)
- [Mouse Navigation](https://github.com/hobeom/obsidian-mouse-navigation)
- [Natural Language Dates](https://github.com/argenos/nldates-obsidian)
- [Note Refactor](https://github.com/lynchjames/note-refactor-obsidian)
- [Note Toolbar](https://github.com/chrisgurney/obsidian-note-toolbar)
- [Novel Word Count](https://github.com/isaaclyman/novel-word-count-obsidian)
- [Occura](https://github.com/Krusty84/obsidian-occura-plugin)
- [Omnisearch](https://github.com/scambier/obsidian-omnisearch)
- [Open with Natural Language Dates](https://github.com/charliecm/obsidian-open-with-nldates)
- [Paste Image Rename](https://github.com/reorx/obsidian-paste-image-rename)
- [Pixel Banner](https://github.com/jparkerweb/pixel-banner)
- [Quick Explorer](https://github.com/pjeby/quick-explorer)
- [Quick Switcher++](https://github.com/darlal/obsidian-switcher-plus)
- [Quick Tagger](https://github.com/Gorkycreator/obsidian-quick-tagger)
- [Reading Time](https://github.com/avr/obsidian-reading-time)
- [Recent Files](https://github.com/tgrosinger/recent-files-obsidian)
- [Remember cursor position](https://github.com/dy-sh/obsidian-remember-cursor-position)
- [Replace All](https://github.com/patrickchiang/obsidian-replace-all)
- [Scroll Speed](https://github.com/flolu/obsidian-scroll-speed)
- [Settings Search](https://github.com/javalent/settings-search)
- [Slides Extended](https://github.com/ebullient/obsidian-slides-extended)
- [Smart Typography](https://github.com/mgmeyers/obsidian-smart-typography)
- [Style Settings](https://github.com/mgmeyers/obsidian-style-settings)
- ~~[Tab Switcher](https://github.com/Vinzent03/tab-switcher)~~ (disabled as I cannot understand what it resolves)
- [Tag Wrangler](https://github.com/pjeby/tag-wrangler)
- [Templater](https://github.com/SilentVoid13/Templater)
- [Text Extractor](https://github.com/scambier/obsidian-text-extractor)
- [Trash Explorer](https://github.com/proog/obsidian-trash-explorer)
- [Typewriter Mode](https://github.com/davisriedel/obsidian-typewriter-mode)
- [Various Complements](https://github.com/tadashi-aikawa/obsidian-various-complements-plugin)
- [Vertical Tabs](https://github.com/oxdc/obsidian-vertical-tabs)
- [Widgets](https://github.com/rafaelveiga/obsidian-widgets)
