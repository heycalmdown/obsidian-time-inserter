# Time Inserter

An Obsidian plugin that inserts the current time at the cursor position, rounded to the nearest 5-minute interval.

## Features

- Inserts time rounded to the nearest 5-minute interval in HH:MM format
- 24-hour format with zero-padded hours and minutes (e.g., 09:05, 14:35)

## Lightweight & Fast

This plugin is designed to be **ultra-lightweight** and **performance-friendly**:

- **Zero dependencies** - No external libraries or packages
- **No background processes** - Only runs when you invoke a command
- **Minimal resource usage** - Won't slow down your Obsidian experience
- **Instant execution** - Time insertion happens immediately without delay

Perfect for users who want quick time insertion without any performance overhead.

## Installation

1. Search for "Time Inserter" in Obsidian's Community plugins and install
2. Or copy this repository to `.obsidian/plugins/obsidian-time-inserter/` folder
3. Enable the plugin

## Usage

### Using Commands

Open the Command Palette (`Ctrl/Cmd + P`) and run:

- `Time Inserter: Insert rounded time (5-minute intervals)` - Inserts time rounded to 5-minute intervals

### Setting Hotkeys

You can assign a custom hotkey to the command in Obsidian settings.

## Examples

- `14:25` (14:23 rounded to 14:25)
- `09:05` (09:03 rounded to 09:05)

## Development

```bash
# Install dependencies
npm install

# Development mode (watch files)
npm run dev

# Build
npm run build

# Type check
npm run check
```

## License

MIT