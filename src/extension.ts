import * as path from "path";
import { ExtensionContext, workspace, window, Uri } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate(context: ExtensionContext): void {
  const config = workspace.getConfiguration("gum");
  const lspPath = config.get<string>("lsp.path", "");
  const traceServer = config.get<string>("lsp.trace.server", "off");

  let serverOptions: ServerOptions;

  if (lspPath) {
    serverOptions = {
      command: lspPath,
      transport: TransportKind.stdio,
    };
  } else {
    const bundledServer = context.asAbsolutePath(
      path.join("server", "gum-lsp")
    );
    serverOptions = {
      command: bundledServer,
      transport: TransportKind.stdio,
    };
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "gum" }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/*.gum"),
    },
    initializationOptions: {
      settings: {
        gum: config,
      },
    },
    middleware: {
      provideDocumentFormattingEdits: (document, options, token, next) => {
        const formatEnabled = workspace
          .getConfiguration("gum")
          .get<boolean>("format.enable", true);
        if (!formatEnabled) {
          return [];
        }
        return next(document, options, token);
      },
    },
  };

  client = new LanguageClient(
    "gumLanguageServer",
    "Gum Language Server",
    serverOptions,
    clientOptions
  );

  client.onTelemetry((event) => {
    window.showInformationMessage(`Gum LSP: ${event}`);
  });

  client.start().catch((reason) => {
    window.showWarningMessage(
      `Failed to start Gum Language Server: ${reason.message}. Ensure gum-lsp is installed and in PATH, or configure gum.lsp.path.`
    );
  });

  context.subscriptions.push({
    dispose: () => {
      if (client) {
        client.stop();
      }
    },
  });
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
