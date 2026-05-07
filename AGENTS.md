# AGENTS.md - MHW Board Companion

## Project
Expo ~54 React Native app (Monster Hunter World companion). Default branch: `dev`.

## Commands
- **Install**: `npx expo install` (use `npx expo add <pkg>`, NOT npm/yarn directly)
- **Dev**: `yarn start` → scan QR in Expo Go
- **Typecheck**: `yarn check-types`
- **Lint**: `yarn eslint:all` | **Fix**: `yarn eslint:fix`
- **Format**: `yarn prettier:fix`
- **Web**: `yarn web` | **Build web**: `yarn build:web` → outputs `web-build/`
- **OTA update**: `yarn publish-ota` (production) | `yarn publish-ota-dev` | `yarn publish-ota-preview`
- **Build APK**: `yarn build:apk`

## Gotchas
- `yarn test` runs eslint, NOT jest (jest is configured but unused)
- Pre-commit hook is disabled (commented out in `.husky/pre-commit`)
- Firebase requires `EXPO_PUBLIC_FB_*` env vars
- EAS builds need `GOOGLE_SERVICES_JSON` secret mapped via `@GOOGLE_SERVICES_JSON`

## Architecture
- **Routing**: expo-router file-based (`app/` entrypoint)
- **Auth flow**: `app/index.tsx` (login/guest) → `app/(drawer)/` (protected)
- **Drawer screens**: `(tabs)/` (Hunt: Behaviors, Monster, rolls, Story), inventory, log, character, settings, about
- **State**: Redux Toolkit + redux-persist (AsyncStorage). 5 slices: rolls, character, hunt, localData, settings
- **Data**: Monster definitions in `assets/data/<monster>/` (hunt, rewards, story, behavior, index)
- **Web deploy**: Netlify static with SPA catch-all redirect (`netlify.toml`)

## Style
- ESLint: `universe/native` + prettier. printWidth: 130, backtick quotes, trailingComma: es5
- Branch naming: `feat/<area>` or `fix/<area>`
- Commits: `feat/<area>: <message>` or `fix/<area>: <message>`
