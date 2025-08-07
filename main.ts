import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface PluginSettings {
	exampleSetting: string;
	enableFeature: boolean;
}

const DEFAULT_SETTINGS: PluginSettings = {
	exampleSetting: 'default value',
	enableFeature: true
};

export default class ObsidianPluginBoilerplate extends Plugin {
	settings!: PluginSettings;

	override async onload() {
		await this.loadSettings();

		// Add ribbon icon
		const ribbonIconEl = this.addRibbonIcon('dice', 'Obsidian Plugin Boilerplate', (evt: MouseEvent) => {
			new Notice('Hello from your plugin!');
		});

		ribbonIconEl.addClass('obsidian-plugin-boilerplate-ribbon-class');

		// Add status bar item
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Plugin Active');

		// Add commands
		this.addCommand({
			id: 'open-sample-modal',
			name: 'Open Sample Modal',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});

		this.addCommand({
			id: 'sample-editor-command',
			name: 'Insert Sample Text',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				editor.replaceSelection('Sample text inserted by plugin');
			}
		});

		// Add settings tab
		this.addSettingTab(new SettingTab(this.app, this));

		console.log('Obsidian Plugin Boilerplate loaded');
	}

	override onunload() {
		console.log('Obsidian Plugin Boilerplate unloaded');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	override onOpen() {
		const { contentEl } = this;
		contentEl.setText('This is a sample modal!');
		
		const buttonContainer = contentEl.createDiv();
		buttonContainer.style.textAlign = 'center';
		buttonContainer.style.marginTop = '20px';
		
		const closeButton = buttonContainer.createEl('button', { text: 'Close' });
		closeButton.addEventListener('click', () => {
			this.close();
		});
	}

	override onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SettingTab extends PluginSettingTab {
	plugin: ObsidianPluginBoilerplate;

	constructor(app: App, plugin: ObsidianPluginBoilerplate) {
		super(app, plugin);
		this.plugin = plugin;
	}

	override display(): void {
		const { containerEl } = this;
		
		containerEl.empty();
		containerEl.createEl('h2', { text: 'Plugin Settings' });

		new Setting(containerEl)
			.setName('Example Setting')
			.setDesc('This is an example text setting')
			.addText(text => text
				.setPlaceholder('Enter some text')
				.setValue(this.plugin.settings.exampleSetting)
				.onChange(async (value) => {
					this.plugin.settings.exampleSetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Enable Feature')
			.setDesc('Toggle this feature on or off')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enableFeature)
				.onChange(async (value) => {
					this.plugin.settings.enableFeature = value;
					await this.plugin.saveSettings();
				}));
	}
}