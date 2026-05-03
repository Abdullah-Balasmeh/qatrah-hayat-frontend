<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template principle 1 -> I. Auth-Guided Feature Architecture
- Template principle 2 -> II. Layered Data Contracts
- Template principle 3 -> III. Bilingual UI by Default
- Template principle 4 -> IV. Facade, Store, and Routing Discipline
- Template principle 5 -> V. Minimal, Verified Change
Added sections:
- Technology and Project Constraints
- Development Workflow and Quality Gates
Removed sections: none
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ .specify/templates/commands/*.md (directory not present)
- ✅ AGENTS.md
- ✅ src/app/features/AGENTS.md
Follow-up TODOs: none
-->
# Qatrah Hayat Constitution

## Core Principles

### I. Auth-Guided Feature Architecture
All new frontend features MUST use `src/app/features/auth` as the golden
reference for structure and naming. Features MUST follow the
`data/domain/presentation` architecture when the feature has data access,
business models, or UI state. Auth is a reference for architecture, not a
source for copying login, password, OTP, token, session, role redirect, or
guard-specific business logic.

Rationale: A shared feature shape keeps the Angular codebase predictable while
preventing Auth-specific behavior from leaking into unrelated domains.

### II. Layered Data Contracts
Domain models and repository contracts MUST live in `domain`. API request and
response DTOs MUST live in `data/dtos` and MUST NOT be used directly by pages
or components. Repository implementations MUST map domain request models to
DTOs before API calls and map response DTOs back to domain models before
returning. Mappers MUST be small pure functions that do not perform HTTP calls
or mutate their inputs. New data-layer code MUST NOT import from presentation.

Rationale: Clear data boundaries keep backend payload details out of UI code
and make each feature easier to evolve safely.

### III. Bilingual UI by Default
The application supports Arabic and English. User-facing text MUST use
translation keys for labels, buttons, placeholders, table headers, validation
messages, empty states, success messages, and error messages. New or changed
keys MUST be added to both `src/assets/i18n/ar.json` and
`src/assets/i18n/en.json`, and the language files MUST remain structurally
aligned. Logic MUST use enums or constants, never Arabic or English display
strings. UI components MUST respect RTL and LTR behavior.

Rationale: Localization is a core product requirement, not a cleanup step.

### IV. Facade, Store, and Routing Discipline
Components and pages MUST use facades for meaningful application actions and
MUST NOT call repositories or API services directly unless explicitly approved.
Stores MUST manage state only; they MUST NOT perform HTTP calls or inject API
services. Repository contracts MUST be wired to implementations through Angular
DI providers, preferring route-level providers for feature-specific
repositories and `app.config.ts` only for truly app-wide dependencies. Feature
routes MUST live in `<feature-name>.routes.ts` and use standalone lazy loading
with `loadComponent` where applicable.

Rationale: Separating orchestration, state, data access, and routing keeps UI
flows testable and limits accidental coupling.

### V. Minimal, Verified Change
Changes MUST stay scoped to the requested behavior and existing project
patterns. Contributors MUST NOT add packages, modify Auth, run destructive
commands, or rewrite unrelated code unless the user explicitly approves that
work. Relevant Angular build or test commands SHOULD be run when practical.
For UI work, verification MUST include Arabic and English text coverage and
RTL/LTR layout behavior. If verification cannot be run, the limitation MUST be
reported.

Rationale: Small, verified changes protect the existing worktree and make
review safer.

## Technology and Project Constraints

The project is an Angular 19 frontend application using TypeScript, Angular
Router, reactive forms, RxJS, and `@ngx-translate/core`. Shared UI controls
belong under `src/app/shared`, app-wide services and constants under
`src/app/core`, and domain features under `src/app/features`.

Feature `storage/` folders are optional and MUST only be created for local
storage, session storage, cache, or other persistence. Empty architecture
folders SHOULD NOT be created unless they are about to contain useful files.

View-models and form values belong in `presentation/view-models`. New features
SHOULD map form values to domain request models in presentation or facade code.
The existing Auth form-value mapper under `data/mappers` is a legacy exception
and MUST NOT be repeated.

## Development Workflow and Quality Gates

Specs, plans, and task lists MUST account for the Auth-guided feature
architecture, DI provider wiring, DTO/model/mapper boundaries, facade/store
rules, route style, and Arabic/English localization. Plans MUST document where
feature files live under `src/app/features/<feature-name>`.

Implementation tasks MUST be grouped so each user story remains independently
buildable and testable. UI tasks MUST include translation-key updates for both
languages. Data-access tasks MUST include DTOs, mappers, repository contracts,
repository implementations, API services, and DI provider wiring when those
parts apply.

Before delivery, contributors MUST verify the relevant behavior, translation
coverage, and layout direction behavior, or report exactly what was not run.

## Governance

This constitution supersedes conflicting feature-level preferences and
templates. Runtime guidance in `AGENTS.md`, `src/app/features/AGENTS.md`, and
`docs/auth-feature-reference.md` MUST stay aligned with these principles.

Amendments require an explicit constitution update, a Sync Impact Report, and
review of dependent Spec Kit templates and runtime guidance files. Versioning
uses semantic versioning: MAJOR for incompatible governance or principle
changes, MINOR for new or materially expanded principles or required sections,
and PATCH for clarifications that do not change meaning.

Every plan and review MUST include a constitution check. Any intentional
violation MUST be documented with the reason, the rejected simpler alternative,
and the follow-up needed to return to compliance.

**Version**: 1.0.0 | **Ratified**: 2026-05-03 | **Last Amended**: 2026-05-03
