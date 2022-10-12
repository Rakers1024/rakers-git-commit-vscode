import { useLabel, useEmoji } from "./use";
import { QuickPickItem } from "vscode";

export interface CommitQuickPickItem extends QuickPickItem {
  type: string;
  content: string;
}

export const displayMethod = {
  default: useLabel,
  // 表情使用代码
  useLabel,
  // 使用表情
  useEmoji,
};
