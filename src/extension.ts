import * as vscode from "vscode";
import { CommitQuickPickItem, displayMethod } from "./config/commits";
import commits from "./config/commits_zh";
import { GitExtension, Repository } from "./config/git";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("git-commit-vscode.gitCommit", (uri?) => {
    const git = getGitExtension();
    if (!git) {
      vscode.window.showErrorMessage("无法加载git插件!请先安装git插件!");
      return;
    }
    const types = [
      {
        label: `📝使用国际规范提交`,
        type: "useLabel",
      },
      {
        label: `📝使用Emoji提交`,
        type: "useEmoji",
      },
    ];
    //选择是否带图标
    vscode.window.showQuickPick(types).then(function (typeSelected) {
      if (!typeSelected) {
        return;
      }

      const methodKey = context.globalState.get("display_method", typeSelected.type) as never;
      let items = commits.map(displayMethod[methodKey]) as CommitQuickPickItem[];
      // 显示选项列表，提示用户选择
      vscode.window.showQuickPick(items).then(function (selected) {
        if (!selected) {
          return;
        }
        vscode.commands.executeCommand("workbench.view.scm");
        if (uri) {
          let selectedRepository = git.repositories.find(repository => {
            const path = decodeURIComponent(uri?.rootUri).replace(/^file:\/\//g, "");
            return repository.rootUri?.path === path;
          });
          if (selectedRepository) {
            prefixCommit(selectedRepository, selected.content);
          }
        } else {
          for (let repo of git.repositories) {
            prefixCommit(repo, selected.content);
          }
        }
      });
    });
  });

  context.subscriptions.push(disposable);
}

// 选完填入操作
function prefixCommit(repository: Repository, prefix: String) {
  repository.inputBox.value !== ""
    ? ((repository.inputBox.value = ""), (repository.inputBox.value = `${prefix}${repository.inputBox.value}`))
    : (repository.inputBox.value = `${prefix}${repository.inputBox.value}`);
}
// 点击小图标进入插件
function getGitExtension() {
  const vscodeGit = vscode.extensions.getExtension<GitExtension>("vscode.git");
  const gitExtension = vscodeGit && vscodeGit.exports;
  return gitExtension && gitExtension.getAPI(1);
}

export function deactivate() {}
