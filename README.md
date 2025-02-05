# "Plug-in-pack" for [`Obsidian`](https://obsidian.md)

This is just a large collection of already set up plugins and hotkeys… That was gotten rid of ~~almost~~ any conflicts.

NOTE: After forking/using the template to create your vault, feel free to give this file a proper use)

## Improve *default app* features
<details> <summary> While some try to enhance default app behaviour: </summary>

- [Settings Search](https://github.com/javalent/settings-search) – perform search among all settings, including: application, core and community plugins
- [Hotkey Helper](https://github.com/pjeby/hotkey-helper) – jump to plugins' hotkeys from their description, view which plugins have conflicting hotkeys
- [Scroll Speed](https://github.com/flolu/obsidian-scroll-speed) – modify base mouse scroll speed and make animation smoother, scroll faster by pressing `Alt` key
- [Enhanced Copy](https://github.com/Mara-Li/obsidian-enhanced-copy) – change native copy function behaviour to differ for [reading/editing views](https://help.obsidian.md/Editing+and+formatting/Edit+and+preview+Markdown#Editor+views)
- [Tab Switcher](https://github.com/Vinzent03/tab-switcher) – ignore groups when switching tabs, navigate tabs in their placement/usage order (via hotkeys)
- [Remember cursor position](https://github.com/dy-sh/obsidian-remember-cursor-position) – remember notes' cursor and scroll position (edit multiple notes quicker)
</details>

<details> <summary> Others try to add must-have features that feel missing from the app: </summary>

- [Trash Explorer](https://github.com/proog/obsidian-trash-explorer) – view, restore or remove deleted files (located in app's hidden `.trash` folder)
- [Recent Notes](https://github.com/kamil-rudnicki/obsidian-recent-notes) – view an organized timeline of recently edited files (grouped by their modification time)
- [Paste Image Rename](https://github.com/reorx/obsidian-paste-image-rename) – choose name and location for each file (e.g., images from clipboard) added to vault
- [Commander](https://github.com/phibr0/obsidian-commander) – add new macros and commands to app menus (ribbon, status/tool/tab bar, editor/file menu)
- [Status Bar Organizer](https://github.com/Opisek/obsidian-statusbar-organizer) – rearrange elements of a [Status bar](https://help.obsidian.md/User+interface/Status+bar), (un)hide them and save (for later use) as presets
- [Settings Management](https://github.com/xhuajin/obsidian-settings-management) – filter (in)active plugins/hotkeys/snippets from app's [Settings](https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data#Vault+settings), view them in a grid layout
- [Jump to link](https://github.com/mrjackphil/obsidian-jump-to-link) – quickly navigate between links, or jump to any word inside of opened note (via hotkeys)
- [Link Preview](https://github.com/felipetappata/obsidian-link-preview) – show a preview for external links (without leaving note, unlike when using core [Web viewer](https://help.obsidian.md/plugins/web-viewer))
</details>

### Appearance
- [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) – change configuration options provided by some themes and plugins' CSS files
- [Day and Night](https://github.com/CyberT17/obsidian-day-and-night) – toggle between light/dark mode accodring to schedule (automatically) or manually
- [Hider](https://github.com/kepano/obsidian-hider) – hide certain parts of `Obsidian` app UI (just like in "[Appearance](https://help.obsidian.md/User+interface/Appearance)" app settings)
- [Force note View mode](https://github.com/bwydoogh/obsidian-force-view-mode-of-note) – force open certain notes in a view chosen from [reading or editing](https://help.obsidian.md/Editing+and+formatting/Edit+and+preview+Markdown) (preview / source)

### Links
- [Links](https://github.com/mii-key/obsidian-links) – add A LOT of context menu actions for link creation, editing, convertion and removal/deletion from note
- [Auto Link Title](https://github.com/zolrath/obsidian-auto-link-title) – automatically fetch website's title upon pasting it into notes
- [Link Favicons](https://github.com/joethei/obsidian-link-favicon) – automatically render favicons for external links (website), set custom icon for certain links
- [Copy Block Link](https://github.com/mgmeyers/obsidian-copy-block-link) – get links to text blocks and headings directly from a context menu
- [Link Headers Directly](https://github.com/Signynt/link-headers-directly) – show only the last header of internal links[^1], and not the whole note hierarchy

### Actions "in bulk"
- [Insert Multiple Attachments](https://github.com/mnaoumov/obsidian-insert-multiple-attachments) – allows to insert multiple attachments "in bulk" at the exact time (and not just one)
- [Multi-Properties](https://github.com/technohiker/obsidian-multi-properties) – add/remove properties for multiple files (from folder, selected or searched) at once
- [Quick Tagger](https://github.com/Gorkycreator/obsidian-quick-tagger) – add/remove tags of file(s) "in bulk" by calling commands, using hotkeys or context menu


## Overhaul *core plugins*
<details> <summary> Add more functionality to core plugins using community ones below: </summary>

- [Better Word Count](https://github.com/lukeleppan/better-word-count) <sup>[⚠️[Word Count](https://help.obsidian.md/Plugins/Word+count) OFF]</sup> – collect stats about your whole vault, also customize displaying them

- [Slides Extended](https://github.com/ebullient/obsidian-slides-extended) <sup>[⚠️[Slides](https://help.obsidian.md/Plugins/Slides) OFF]</sup> – create presentations: customize each element and apply themes globally, improve slide navigation, view changes live, switch between different modes, and more

- [Slash Commander](https://github.com/alephpiece/obsidian-slash-commander) <sup>[⚠️[Slash commands](https://help.obsidian.md/Plugins/Slash+commands) OFF]</sup> – customize slash command list and show descriptions for each one

- [Better Search Views](https://github.com/ivan-lednev/better-search-views) <sup>[✅[Search](https://help.obsidian.md/Plugins/Search), ✅[Backlinks](https://help.obsidian.md/Plugins/Backlinks) ON]</sup> – [decorate](https://github.com/ivan-lednev/better-search-views?tab=readme-ov-file#but-what-does-it-do-exactly) search results with breadcrumbs (display their hierarchy)

- [Quick Switcher++](https://github.com/darlal/obsidian-switcher-plus) <sup>[✅[Quick switcher](https://help.obsidian.md/Plugins/Quick+switcher), ✅[Command palette](https://help.obsidian.md/Plugins/Command+palette) ON]</sup> – search, filter results and navigate quicker: switch between multiple modes (Commands, Editor, Symbols, Headings, Related Items, Bookmarks, Workspaces, Vaults)

- [Hover Editor](https://github.com/nothingislost/obsidian-hover-editor) <sup>[✅[Page preview](https://help.obsidian.md/Plugins/Page+preview) ON]</sup> – "turn the hover popover into a full featured [editor instance](https://github.com/nothingislost/obsidian-hover-editor?tab=readme-ov-file#features)"

- [Workspaces Plus](https://github.com/nothingislost/obsidian-workspaces-plus) <sup>[✅[Workspaces](https://help.obsidian.md/Plugins/Workspaces) ON]</sup> – edit and switch workspaces easier, set different themes for each one

- [Tag Wrangler](https://github.com/pjeby/tag-wrangler) <sup>[✅[Tags view](https://help.obsidian.md/Plugins/Tags+view) ON]</sup> – rename (sub)tags "in bulk", filter search with tags and manage "[Tag Pages](https://github.com/pjeby/tag-wrangler?tab=readme-ov-file#tag-pages)"

- [Nested tags graph](https://github.com/drPilman/obsidian-graph-nested-tags) / [Folders to Graph](https://github.com/Ratibus11/folders2graph) <sup>[✅[Graph view](https://help.obsidian.md/Plugins/Graph+view) ON]</sup> – link nested tags / show folder structure in graph view (plugins break each other, so choose the one you like)
</details>

### [Daily notes](https://help.obsidian.md/Plugins/Daily+notes) extensions
<details> <summary> Core plugin SHOULD be turned OFF (unless issues arise) for community ones below to work: </summary>

- [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes) – extend core feature by also creating weekly, monthly, quarterly and yearly notes!
- [Calendar](https://github.com/liamcain/obsidian-calendar-plugin) – navigate between your daily/weekly notes using simple yet customizable calendar view
- [Natural Language Dates](https://github.com/argenos/nldates-obsidian) – insert link to a daily note by using either natural language or date picker
- [Open with Natural Language Dates](https://github.com/charliecm/obsidian-open-with-nldates) – quickly open a daily note by typing it in natural language
</details>

### [File explorer](https://help.obsidian.md/Plugins/File+explorer) extensions
<details> <summary> Change appearance and overall make view more compact (for plugin that CANNOT be turned off): </summary>

- [File Explorer++](https://github.com/kelszo/obsidian-file-explorer-plus) – hide and/or pin both files and folders (even "in bulk") for easier access from core view
- [Folder Focus Mode](https://github.com/grochowski/obsidian-folder-focus-mode) – "focus" on a folder (with its contents) by hiding all other notes, directly in core view
- [Folder notes](https://github.com/LostPaul/obsidian-folder-notes) – attach notes to any folder ("in bulk" via templates), open them from folder items in core view
- [Color Folders and Files](https://github.com/Mithadon/obsidian-color-folders-files) – set text/background colors, change text style for files/folders and store it in presets

</details>

### [Canvas](https://help.obsidian.md/Plugins/Canvas) integrations
<details> <summary> Core plugin MUST be turned ON for community ones below to work: </summary>

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


## *Manage plugins* much easier
- [Lazy Plugin Loader](https://github.com/alangrainger/obsidian-lazy-plugins) – load chosen plugins later to improve speed of `Obsidian` app launch
- [Better Plugins Manager](https://github.com/0011000000110010/obsidian-manager) – delay plugins' startup, filter them by groups/tags, and then toggle them "in bulk"
- [Plugin Update Tracker](https://github.com/swar8080/obsidian-plugin-update-tracker) – show updates for all plugins, browse their release notes and even ignore them
- [BRAT](https://github.com/TfTHacker/obsidian42-brat) – download plugins that were not listed from in-app plugin search (or beta versions of listed plugins)
- [Plugins Annotations](https://github.com/alberti42/obsidian-plugins-annotations) – add custom annotation for each plugin to store personal note (e.g., its actual use-case scenario, as labels can't usually provide full info)


## Add new *powerful features*
- [Note Toolbar](https://github.com/chrisgurney/obsidian-note-toolbar) – create context-aware [toolbars](https://github.com/chrisgurney/obsidian-note-toolbar/wiki/Examples) containing commands, file links, menus and scripts
  - [JS Engine](https://github.com/mProjectsCode/obsidian-js-engine-plugin) – execute `JavaScript` code from a special codeblock (allows plugin above to [run scripts](https://github.com/chrisgurney/obsidian-note-toolbar/wiki/Executing-scripts#script-item-types))
- [Execute Code](https://github.com/twibiral/obsidian-execute-code) – execute code snippets in codeblocks of notes for locally installed [languages](https://github.com/twibiral/obsidian-execute-code?tab=readme-ov-file#supported-programming-languages-)
- [Doubleshift](https://github.com/Qwyntex/doubleshift) – run app commands by pressing specified key twice (by default, `Shift` for [Quick switcher](https://help.obsidian.md/Plugins/Quick+switcher))
- [Chord Sheets](https://github.com/olvidalo/obsidian-chord-sheets?tab=readme-ov-file#-autoscroll) – start/stop automatic scroll of an active note, configure scrolling speed on the fly
- [Mindmap NextGen](https://github.com/james-tindal/obsidian-mindmap-nextgen) – view active note's content as a mindmap, configure its appearance and make screenshots

### [Properties](https://help.obsidian.md/Editing+and+formatting/Properties) (or note metadata/frontmatter)
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview) – treat your vault as a database: parse, [query](https://github.com/blacksmithgu/obsidian-dataview?tab=readme-ov-file#querying) and view data of any notes containing [metadata](https://github.com/blacksmithgu/obsidian-dataview?tab=readme-ov-file#data)
- [Projects](https://github.com/marcusolsson/obsidian-projects) – interact with in-folder notes in different views (table/board/calendar/gallery) created with metadata
- [Meta Bind](https://github.com/mProjectsCode/obsidian-meta-bind-plugin) – change note's metadata with inline input fields, metadata displays (view fields), and buttons

### Creating [templates](https://help.obsidian.md/Plugins/Templates)
- [Templater](https://github.com/SilentVoid13/Templater) – insert variables and functions' results into templates, manipulate them with `JavaScript`
- [QuickAdd](https://github.com/chhoumann/quickadd) – create notes from templates using custom "[choices](https://quickadd.obsidian.guide/docs/#first-steps)" (templates, captures, macros, multis)

### Note editing
- [Linter](https://github.com/platers/obsidian-linter) – fix format/style of any notes' content with a set of configurable [rules](https://platers.github.io/obsidian-linter/settings/general-settings), pre-defined or [custom](https://platers.github.io/obsidian-linter/settings/custom-rules)
- [Editing Toolbar](https://github.com/PKM-er/obsidian-editing-toolbar) – display a set of commands to quickly format/style text selections using [Markdown](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax)
- [Smart Typography](https://github.com/mgmeyers/obsidian-smart-typography) – convert sets of characters into a single ones, that are useful for text typography
- [Various Complements](https://github.com/tadashi-aikawa/obsidian-various-complements-plugin) – auto-complete words (like in IDEs) from vault contents and/or custom dictionaries
- [Typewriter Mode](https://github.com/davisriedel/obsidian-typewriter-mode) – enable typewriter scrolling, so that current line (cursor) stays at fixed position of a view
- [Icon Shortcodes](https://github.com/aidenlx/obsidian-icon-shortcodes) – insert emojis/icons (in-app/custom) with fuzzy-searched shortcodes (`:open_book:` → 📖)
- [Image Converter](https://github.com/xryul/obsidian-image-converter) – convert/compress new images, resize/align and crop/rotate/flip images used in notes
- [Note Refactor](https://github.com/lynchjames/note-refactor-obsidian) – split any chosen note, or extract selected part of a note into a new/existing one
- [Waypoint](https://github.com/IdreesInc/Waypoint) – automatically generate (add/update) tables of contents (link folder note with the regular ones) 
- [Media Notes](https://github.com/jemstelos/obsidian-media-notes) – easily pin a video to the note, control its playback and insert configurable timestamps

### Editor appearance
- ~~[Continuous Mode](https://github.com/gasparschott/obsidian-continuous-mode)~~ – display all open notes or files (like PDFs) in tab group as a single scrollable document
  - disabled (for now) due to a "auto-scrolling" conflict with "Scroll Speed" plugin
- [Blur](https://github.com/gapmiss/blur) – apply blur effect to portions of text to obfuscate it (non-[Markdown](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax), so works only in `Obsidian` app)
- [Abbreviations and Acronyms](https://github.com/dragonish/obsidian-abbreviations) – auto-mark abbreviations/acronyms (terms) from metadata or global settings
- [Pixel Banner](https://github.com/jparkerweb/pixel-banner) – make notes more visually appealing by creating a banner image (from vault/Web) at their top
- [Widgets](https://github.com/rafaelveiga/obsidian-widgets) – add widgets (clock, [countdown](https://github.com/rafaelveiga/obsidian-widgets?tab=readme-ov-file#countdown), counter, quote) to your notes from custom codeblocks
- [Colored Tags Wrangler](https://github.com/code-of-chaos/obsidian-colored_tags_wrangler) – assign unique tag colors, then apply them to canvas items, folders and/or notes
- [Party](https://github.com/shap-po/obsidian-party) – create and customize "particle" effects on certain actions (e.g., completing checkboxes by default)
- [Iconic](https://github.com/gfxholo/iconic) – set custom (colored) emoji/icon for files/folders ("in bulk" via rules) and app menus with their own icons
- [Limelight](https://github.com/smikula/obsidian-limelight) – make all opened, but non-active panes dimmer: focus on an actively modified one

### Navigation
- [Vertical Tabs](https://github.com/oxdc/obsidian-vertical-tabs) – group, organize and efficiently navigate between tabs using a interactable vertical list of them
- [Quick Explorer](https://github.com/pjeby/quick-explorer) – make breadcrumbs interactable: view vault contents, navigate it and quickly preview any note 
- [Dynamic Outline](https://github.com/theopavlove/obsidian-dynamic-outline) – view a floating table of contents for an opened note (without the need to open any [Sidebars](https://help.obsidian.md/User+interface/Sidebar))
- [Double Click Tab](https://github.com/Quorafind/Obsidian-Double-Click-Tab) – double-click a tab with a modifier key, moving it to new side pane/window (or just close it)
- [Homepage](https://github.com/mirnovov/obsidian-homepage) – set any note as a "landing" page that will be opened when app launches and/or all tabs are closed
- [Beautitab](https://github.com/andrewmcgivery/obsidian-beautitab) – replace empty "New tab" with a page containing background, search bar, recent notes/bookmarks
- [Mouse Navigation](https://github.com/hobeom/obsidian-mouse-navigation) – use gestures while pressing `RMB`: scroll note to top/bottom, navigate forward/backward

### Information
- [Reading Time](https://github.com/avr/obsidian-reading-time) – view an estimated reading time (configurable appearance) for an opened note in [Status bar](https://help.obsidian.md/User+interface/Status+bar)
- [Cursor Location](https://github.com/spslater/obsidian-cursor-location-plugin) – view current cursor location (character and line number) for an opened note in [Status bar](https://help.obsidian.md/User+interface/Status+bar)
- [Occura](https://github.com/Krusty84/obsidian-occura-plugin) – highlight found occurances of text selection, view their total number for an opened note in [Status bar](https://help.obsidian.md/User+interface/Status+bar)
- [Novel Word Count](https://github.com/isaaclyman/novel-word-count-obsidian) – view [chosen](https://github.com/isaaclyman/novel-word-count-obsidian?tab=readme-ov-file#settings) statistics for a file/folder/vault directly in core [File explorer](https://help.obsidian.md/Plugins/File+explorer) view
- [Enhanced Annotations](https://github.com/ycnmhd/obsidian-enhanced-annotations) – view/copy all comments/highlights of an opened note, create new notes from them
- ~~[Rich Foot](https://github.com/jparkerweb/rich-foot)~~ – display backlinks, outlinks, and created/modified dates in a footer of any note (unless ignored)
  - disabled (for now) due to a "flickering" conflict with "Hover Editor" plugin

### Search
- [Omnisearch](https://github.com/scambier/obsidian-omnisearch) – search text in contents of notes and (non-textual) attachments like images, documents and PDFs 
  - [Text Extractor](https://github.com/scambier/obsidian-text-extractor) – extract text from (non-textual) attachments (allows plugin above to [use](https://publish.obsidian.md/omnisearch/Images%2C+PDFs%2C+and+non-text+documents) this data for search)
- [Replace All](https://github.com/patrickchiang/obsidian-replace-all) – quickly (undo) replace all occurances of text (in a whole vault) directly from core [Search](https://help.obsidian.md/Plugins/Search) pligun


## Integrate *third-party apps*
- [Discord Rich Presence](https://github.com/lukeleppan/obsidian-discordrpc) – integrate an app into [`Discord`](https://discord.com) status: show vault name, editing file and elapsed time
- [Visual Crossing Weather](https://github.com/willasm/vc-weather) – display current weather in [Status bar](https://help.obsidian.md/User+interface/Status+bar), add this data into notes (via templates)
- [LanguageTool Integration](https://github.com/Clemens-E/obsidian-languagetool-plugin) – check grammar and spellling for many languages with [`LanguageTool`](https://languagetool.org)
- [Todoist Sync](https://github.com/jamiebrynes7/obsidian-todoist-plugin) – bidirectional sync with [`Todoist`](https://todoist.com) task manager: create new tasks and complete existing ones
- [WakaTime](https://github.com/wakatime/obsidian-wakatime) – send metrics, insights, and time tracking from app usage activity to [`WakaTime`](https://wakatime.com) dashboard

### Synchronization
- [Version History Diff](https://github.com/kometenstaub/obsidian-version-history-diff) – display diffs for core [File recovery](https://help.obsidian.md/Plugins/File+recovery) plugin and [`Obsidian Sync`](https://help.obsidian.md/Obsidian+Sync/Introduction+to+Obsidian+Sync) paid service
  - also supports [`Git`](https://git-scm.com) VCS history (using the next plugin below)
- [Git](https://github.com/Vinzent03/obsidian-git) – store remote copy of your vault in a `GitHub` repository, which also allows sync between different devices
  - should be disabled on mobile devices, use separate [`Git Sync`](https://github.com/ViscousPot/GitSync) app instead


## Simplify *Markdown [formatting](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax)*
- [Footnote Shortcut](https://github.com/MichaBrugger/obsidian-footnotes) – create and navigate between auto-numbered/named footnotes and their description
- [Code Styler](https://github.com/mayurankv/Obsidian-Code-Styler) – apply styles/themes to codeblocks and inline code, or customize them to your liking

### Lists
- [Outliner](https://github.com/vslinko/obsidian-outliner) – improve list [editing](https://github.com/vslinko/obsidian-outliner) experience: move around nested elements, change selection behaviour, and so on
- [List Callouts](https://github.com/mgmeyers/obsidian-list-callouts) – create "callout" lists: change element's front symbol/icon, add color of them and background
- [Ordered List Style](https://github.com/erykwalder/obsidian-list-style) – change style of ordered lists[^1] from a wide [selection](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type#specifications)
- [Checklist Reset](https://github.com/lhansford/obsidian-checklist-reset) – reset state (set to unchecked) of any checklists in opened note

### Callouts
- [Callout Manager](https://github.com/eth-p/obsidian-callout-manager) – create custom callout types and styles (color and icon) which are similar to existing ones
- [Callout Suggestions](https://github.com/cwfryer/obsidian-callout-suggestions) – add suggestion modal (by name) upon creating new callout
- [Callout Menu](https://github.com/anareaty/callout-menu) – improve callout context menu to change it's type, default collapse and metadata
- [Callout Integrator](https://github.com/Cleoche/obsidian-callout-integrator) – include selected blocks of text in existing callouts using a hotkey (containing "`>`")

### Maths
- [Latex Suite](https://github.com/artisticat1/obsidian-latex-suite) – type [LaTeX](https://www.overleaf.com/learn/latex/Mathematical_expressions) quicker using customizable snippets, [conceal](https://github.com/artisticat1/obsidian-latex-suite?tab=readme-ov-file#conceal) its markup for ease of editing
- [Better Math in Callouts & Blockquotes](https://github.com/RyotaUshio/obsidian-math-in-callout) – properly display math formulas in both callouts and blockquotes
- [No More Flickering Inline Math](https://github.com/RyotaUshio/obsidian-inline-math) – prevent inline math block from flickering with each `Space` key pressed

### Tables
- [Advanced Tables](https://github.com/tgrosinger/advanced-tables-obsidian) – manipulate and navigate tables using buttons from new tab, also add spreadsheet formulas
- [Sheets Extended](https://github.com/NicoNekoru/obsidan-advanced-table-xt) – create vertical headers, change style of table cells and merge them together

[^1]: plugins work only in [Reading](https://help.obsidian.md/Editing+and+formatting/Edit+and+preview+Markdown#Editor+views) view
