import { Plugin } from 'obsidian';

export default class PathCopierPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'copy-current-path',
      name: 'Copy Current Path',
      callback: async () => {
        const af = this.app.workspace.getActiveFile();
        if (!af) return;
        await navigator.clipboard.writeText(af.path);
      }
    });

    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        menu.addItem((item) => {
          item
            .setTitle('Copy Current Path')
            .setIcon('copy')
            .onClick(async () => {
              if (!file) return;
              await navigator.clipboard.writeText(file.path);
            });
        });
      })
    );
    }
  }