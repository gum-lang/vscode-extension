# Gum Language Support for VS Code

Provides comprehensive language support for the **Gum** markup language (`.gum` files) in Visual Studio Code.

## Features

- **Syntax Highlighting** — Full TextMate grammar covering all Gum language constructs:
  - Comments (`# ...`)
  - Strings: double-quoted (`"..."`), single-quoted/literal (`'...'`), multiline triple-quoted (`"""..."""`), multiline triple-literal (`'''...'''`)
  - Numbers (integers, floats, scientific notation)
  - Booleans (`true`, `false`)
  - `null` literal
  - Bare and dotted keys
  - Tables (`{ ... }`) and lists (`[ ... ]`)
  - Escape sequences and line continuations

- **Language Server Integration** — Connects to the Gum LSP (`gum-lsp`) for:
  - Real-time diagnostics (parse and validation errors)
  - Document formatting
  - Hover information

- **File Type Detection** — Automatic language association for `*.gum` files.

- **Language Configuration** — Bracket matching, auto-closing pairs, and comment toggling.

## Installation

### From Source

```bash
cd vscode-extension
npm install
npm run compile
```

Then press `F5` in VS Code to launch the Extension Development Host.

### From VSIX

```bash
npx vsce package
code --install-extension gum-language-0.1.0.vsix
```

## Requirements

The LSP features require the `gum-lsp` binary to be available:

1. **In PATH** — Build the LSP from the `lsp/` directory (`cargo build --release`) and place the binary in your `PATH`.
2. **Custom path** — Set `gum.lsp.path` in VS Code settings to point to the binary directly.

## Configuration

| Setting | Default | Description |
|---|---|---|
| `gum.lsp.path` | `""` | Path to the `gum-lsp` binary. Empty means search `PATH`. |
| `gum.lsp.trace.server` | `"off"` | LSP trace verbosity: `off`, `messages`, `verbose`. |
| `gum.format.enable` | `true` | Enable/disable formatting via the LSP. |

## Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode
npm run watch

# Package extension
npm run package
```

## License

MIT
