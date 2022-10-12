export interface Commit {
  readonly emoji: string;
  readonly type: string;
  readonly description: string;
  readonly name: string;
}
let commits: Array<Commit> = [
  {
    emoji: "✨",
    type: "feat",
    description: "引入新功能",
    name: "新功能",
  },
  {
    emoji: "🐛",
    type: "fix",
    description: "修复bug",
    name: "bug",
  },
  {
    emoji: "📝",
    type: "docs",
    description: "添加/更新文档",
    name: "文档",
  },
  {
    emoji: "💄",
    type: "style",
    description: "调整UI样式, 未修改代码逻辑",
    name: "样式",
  },
  {
    emoji: "🎨",
    type: "refactor",
    description: "改进代码结构/代码格式",
    name: "优化",
  },
  {
    emoji: "👌",
    type: "perf",
    description: "性能优化, 提高性能的代码更改",
    name: "优化",
  },
  {
    emoji: "🥚",
    type: "format",
    description: "格式化代码",
    name: "格式化",
  },
  {
    emoji: "✅",
    type: "test",
    description: "添加或修改代码测试",
    name: "测试",
  },
  {
    emoji: "🔧",
    type: "chore",
    description: "对构建流程或辅助工具和依赖库（如文档生成等）的更改",
    name: "构建",
  },
  {
    emoji: "🚑",
    type: "revert",
    description: "回退代码",
    name: "回退",
  },
  {
    emoji: "🚀",
    type: "build",
    description: "打包发布",
    name: "打包",
  },
];
export default commits;
