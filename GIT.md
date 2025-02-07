# 📑 Simplify your work with [Git](https://git-scm.com)

> [!TIP]
> All `Git` commands can be called directly from [Obsidian](https://obsidian.md) app with [Git](https://github.com/Vinzent03/obsidian-git) plugin command: `Git: Raw command`.
>
> On the other hand, they can’t be called ”in bulk” this way, so it’s suggested to work from system terminal.

## 🔄️ Pulling changes from “[Plug-in-pack](<./README.md>)” template

If you want to update your own repository (containing your vault and work) with **remote changes** from this one, you can pull all of them using these `Git` commands (in your terminal) in succession, according to [source](https://gist.github.com/krlozadan/4b75255b88d7a1504e5e632cb817c3f5):

```git
git remote add plug-in-pack https://github.com/tuguzD/obsidian-plug-in-pack.git
git pull -X theirs plug-in-pack main --allow-unrelated-histories --no-tags --no-commit --no-rebase
git reset HEAD
git remote remove plug-in-pack
```

Alternatively, you can just call the custom command from the [Status bar](https://help.obsidian.md/User+interface/Status+bar) (or hide it with [Status Bar Organizer](https://github.com/Opisek/obsidian-statusbar-organizer)):

![Example|301x57](https://github.com/user-attachments/assets/bca8e810-9feb-4dff-8e93-a2dc3d69742d)

> [!WARNING]
> Please note that for all above to actually work (and not fail silently), your vault should not contain any uncommited changes to files that are pulled from this (remote) repository.
>
> So, you should either commit or discard YOUR changes to avoid encountering any unecessary issues.

After that, review and discard any changes you don’t need in ”`Source Control`” tab of the above-mentioned [Git](https://github.com/Vinzent03/obsidian-git) plugin (you can always open it via `Git: Open source control view` command).

## 🗑️ Ignoring changes to files without removing them

As you could’ve already noticed, some files seem to update each time the vault opens, so they have a potential to clutter each commit with meaningless changes.

Changes for such files can be ignored locally, for each of your device (but not for the whole repository, like when using `.gitignore`) by updating each file’s index using [skip-worktree bit](https://git-scm.com/docs/git-update-index#_skip_worktree_bit). I suggest you to avoid updating files below by running these `Git` commands:

```git
git update-index --skip-worktree .obsidian\plugins\media-notes\data.json
git update-index --skip-worktree .obsidian\plugins\novel-word-count\data.json
git update-index --skip-worktree .obsidian\plugins\enhanced-annotations\data.json
git update-index --skip-worktree .obsidian\plugins\obsidian-day-and-night\data.json
```

> [!IMPORTANT]
> Of course, all of these files can be deleted from the repository, and then added to `.gitignore` file (if you so desire) – this way, they won’t be present in it anymore.
>
> But I (personally) think that some of these files still provide useful configurations that should not be deleted, as they won’t be shared to all the users of this “[Plug-in-pack](<#-plug-in-pack-for-obsidian-app>)” template.

Also, similar commands can be used for some of your own configurations that you’ll want to be already set up for each new device (that’ll receive local copy of the vault), but don’t want to be changed thereafter.
