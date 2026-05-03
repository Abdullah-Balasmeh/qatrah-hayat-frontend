# Repository Instructions

## Project Overview
Qatrah Hayat is an Angular frontend application. Keep changes scoped, practical, and consistent with the existing app structure.

The app supports Arabic and English. Build user-facing work with localization in mind from the start, including translation keys and RTL/LTR behavior.

## Safety Rules
- Do not modify application code unless the user asks for implementation changes.
- Do not modify the Auth feature when using it as a reference.
- Do not add packages unless the user explicitly approves it.
- Do not run destructive commands.
- Do not revert user changes.

## Project Structure
- `src/app/core` contains app-wide services, guards, interceptors, constants, enums, layouts, errors, and utilities.
- `src/app/shared` contains reusable UI, validators, components, pipes, and shared types.
- `src/app/features` contains feature modules organized by domain.
- `docs/auth-feature-reference.md` documents the Auth feature reference.

## Internationalization / Localization Rules
- The app supports Arabic and English.
- Do not hardcode user-facing UI text.
- Use translation keys for labels, buttons, placeholders, table headers, validation messages, empty states, success messages, and error messages.
- Add both Arabic and English translation keys when creating a new feature.
- Follow the existing translation key naming style in the project.
- Use enums/constants for logic and translation keys for display.
- Do not use Arabic or English UI strings as logic values.
- Respect RTL/LTR layout behavior.
- Components and pages must work correctly in both Arabic and English.
- When adding translation keys, add them to both `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`.
- Do not add keys to only one language file; keep Arabic and English keys structurally aligned.

## Verification
- Run the relevant Angular build/test command when the change warrants it.
- For UI work, verify Arabic and English text, translation key coverage, and RTL/LTR layout behavior.
- If verification cannot be run, mention that clearly in the final response.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
