# Monorepo

## Monorepo 的优缺点

- 有更好的代码复用，易于抽离公用的业务组件和工具
- 整体构建，协作更加高效，减少重复构建
- 但不利于独立性，公用的部分熵很高，复杂度高

## 构建方式

### Lerna

- 更多做一些版本管理的能力
- 没有默认软链，需要自己Link

### npm/pnpm/yarn

- 会自动软链
- 没有版本管理的能力
  - 4.5.1
  - semver