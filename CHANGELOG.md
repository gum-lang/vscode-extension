# Changelog

## 0.1.0 — 2026-09-09

### Added

- Syntax highlighting for `.gum` files via TextMate grammar
  - Comments, strings (single, double, multiline, literal), numbers, booleans, null
  - Keys (bare, quoted, dotted), operators, tables, lists
  - Escape sequences and line continuations
- Language server integration (`gum-lsp`)
  - Real-time diagnostics for parse and validation errors
  - Document formatting on save
  - Hover information
- File type detection for `.gum` extension
- Language configuration (bracket matching, auto-closing pairs, comment toggling)
- VS Code settings for LSP path, trace level, and format toggle
- Debug launch configuration for extension development
