import { App, Editor, Plugin, PluginSettingTab } from 'obsidian';

interface TimeInserterSettings {
	// No settings needed for this simple plugin
}

const DEFAULT_SETTINGS: TimeInserterSettings = {};

export default class SimpleTimeInserter extends Plugin {
	settings!: TimeInserterSettings;

	override async onload() {
		await this.loadSettings();

		// Command for inserting rounded time (5-minute intervals)
		this.addCommand({
			id: 'insert-rounded-time',
			name: 'Insert rounded time (5-minute intervals)',
			editorCallback: (editor: Editor) => {
				const timeString = this.getRoundedTime();
				editor.replaceSelection(timeString);
			},
		});

		// Add settings tab
		this.addSettingTab(new TimeInserterSettingTab(this.app, this));
	}

	override onunload() {
		// Cleanup if needed
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * Get current time rounded to nearest 5-minute interval in HH:MM format (24-hour)
	 */
	private getRoundedTime(): string {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();

		// Round minutes to nearest 5-minute interval
		const roundedMinutes = Math.round(minutes / 5) * 5;

		// Handle minute overflow (e.g., 58 minutes rounds to 60)
		let finalHours = hours;
		let finalMinutes = roundedMinutes;

		if (roundedMinutes >= 60) {
			finalHours = (hours + 1) % 24;
			finalMinutes = 0;
		}

		const hoursStr = finalHours.toString().padStart(2, '0');
		const minutesStr = finalMinutes.toString().padStart(2, '0');
		return `${hoursStr}:${minutesStr}`;
	}
}

class TimeInserterSettingTab extends PluginSettingTab {
	plugin: SimpleTimeInserter;

	constructor(app: App, plugin: SimpleTimeInserter) {
		super(app, plugin);
		this.plugin = plugin;
	}

	override display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('p', {
			text: 'This plugin inserts the current time at the cursor position, rounded to the nearest 5-minute interval.',
		});

		containerEl.createEl('p', {
			text: 'Time is displayed in 24-hour format with zero-padded hours and minutes (e.g., 09:05, 14:35).',
		});
	}
}
