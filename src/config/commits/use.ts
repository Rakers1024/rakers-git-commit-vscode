import { CommitQuickPickItem } from ".";
import { Commit } from "../commits_zh";
import * as vscode from "vscode";

const pathName = getPathName();
const gitName = getGitName();
const notCommitNames = ["src", "dist", "home", "out", "static", "tmp", "temp"];
const scope = pathName && pathName !== gitName && !notCommitNames.includes(pathName) ? `(${pathName})` : "";

export function useLabel(commit: Commit): CommitQuickPickItem {
  const content = `${commit.type}${scope}: `;
  return {
    label: `${content}${commit.description}`,
    type: commit.type,
    content,
    description: "[" + commit.name + "]",
  };
}

export function useEmoji(commit: Commit): CommitQuickPickItem {
  const content = `${commit.type}${scope}${commit.emoji}: `;
  return {
    label: `${content}${commit.description}`,
    type: commit.type,
    content,
    description: "[" + commit.name + "]",
  };
}

//utils

function getPathName() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  return workspaceFolders && workspaceFolders[0].name;
}

function getGitName() {
  const git = vscode.extensions.getExtension("vscode.git");
  const gitApi = git && git.exports.getAPI(1);
  const repository = gitApi && gitApi.repositories[0];
  const remote = repository && repository.state.remotes[0];
  const gitUrl = remote.pushUrl;
  return gitUrl && gitUrl.split("/")[gitUrl.split("/").length - 1].split(".")[0];
}
