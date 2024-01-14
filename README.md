# MHW Board companion

#### Installation
```npx expo install ```
open expo go and scan the QR

#### Adding new packages 
Add new packages through expo compatibility layer
```npx expo add package@version```

#### design template
[figma](https://www.figma.com/file/cETasDxWFBFpZp6R9xU3ir/Untitled?type=design&node-id=0-1&mode=design&t=hwqBdaTT071D43Fu-0)

#### 
## Git Workflow

The default development branch is [dev](https://github.com/bizarrecoding/MHW-board-companion/tree/dev), so that we should start by checkout.

```shell
  git checkout dev
  git pull
  git checkout -b <branch_name>
```

### Branch Naming

- Feature

  Any commits for a new module or use case should be done on a `feature` branch. For example: `feat/<area>`
  - `feat/themes`
  - `feat/item_list`
  - `feat/hunter_log`

- Bug Fix

  Any necessary fixes should be done on a `fix` branch. For example: `fix/<area>`
  - `fix/themes`
  - `fix/item_list`
  - `fix/hunter_log`
### Commit

- Each commit message should start with its branch name. For example: 
  - `feat/<area>: <message>`
    - `feat/themes: added dark theme styles `
  - `fix/<area>: <message>`
    - `fix/themes: missing divider color for dark themes`
- Let's keep commit messages **CLEAR** and **MEANINGFUL**.

