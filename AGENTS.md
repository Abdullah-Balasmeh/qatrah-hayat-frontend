# Repository Instructions

## Project Overview
Qatrah Hayat is an Angular frontend application. Work in this repository is frontend-only, and backend APIs are external contracts that must not be changed from this codebase.

The app supports Arabic and English. Build user-facing work with localization, translation keys, and RTL/LTR behavior in mind from the start.

## Safety Rules
- Do not modify backend code or backend API contracts from this repository.
- Do not run destructive commands.
- Do not add packages unless the user explicitly approves it.
- Do not rewrite unrelated code or metadata.
- Do not revert user changes unless explicitly requested.
- Do not modify the Auth feature when only using it as a reference.

## Auth As Golden Reference
Use `src/app/features/auth` as the golden frontend feature reference. Copy Auth's architecture and patterns, not Auth business logic.

New features should follow Auth's folder structure, naming style, DTO/model separation, mapper pattern, repository pattern, API service pattern, facade/store pattern, page/component separation, route style, and localization discipline.

## Documented Auth Exceptions
The following Auth details are approved exceptions and must not be copied into new features:
- `data/mappers/sign-up-form-value-to-register-request-model.ts` imports `presentation/view-models`.
- `CitizenSignUpFormComponent` directly injects `CitizenService`.
- `AuthFacade` imports `ScreeningSessionType` from Screening.
- Auth contains login, register, password, OTP, token, and session logic.
- Auth contains citizen/staff branching, role redirects, and profile-completion redirects.

## Required Feature Structure
Use this structure when the feature needs the corresponding layer. Do not create empty folders by default.

```text
features/<feature-name>/
  <feature-name>.routes.ts

  data/
    dtos/
    mappers/
    repositories_impl/
    services/
    storage/  # optional; only for local/session/cache/persistence needs

  domain/
    enums/
    models/
    repositories/

  presentation/
    components/
    facades/
    pages/
    store/
    view-models/
```

## Layering Rules
- `domain` owns enums, models, and repository contracts.
- `domain` must not import from `data` or `presentation`.
- `data` owns DTOs, mappers, repository implementations, API services, and optional feature storage.
- `data` must not import from `presentation`.
- `presentation` owns pages, components, facades, stores, and view-models.
- `presentation` must not call API services directly.
- DTOs must not leak into pages or components.
- Repository methods must return domain models, not DTOs.

## Mapper Rules
- Mappers must be small pure functions.
- Mappers must not perform HTTP calls.
- Mappers must not mutate input objects.
- Mappers should convert between DTOs and domain models.
- Form values and view-models belong in `presentation/view-models`.
- Map form values to domain request models in the presentation layer or facade, not in `data`.

## Facade And Store Rules
- Components and pages call facade methods, not repositories or API services.
- Facades expose meaningful application actions/use cases.
- Facades coordinate loading state, error state, navigation side effects, repository calls, and store updates.
- Stores manage state only.
- Stores must not perform HTTP calls or inject API services.
- Stores should expose private writable signals through public readonly/computed state.

## Component Splitting Rules
- Avoid long pages and components.
- Pages should compose reusable feature components.
- Split tables, filters, cards, forms, status badges, action menus, empty states, error states, and repeated UI into reusable components.
- Reusable components receive data through inputs and report user actions through outputs.
- Reusable components must not call APIs directly.

## Arabic/English Localization Rules
- Do not hardcode user-facing UI text.
- Use translation keys for labels, buttons, placeholders, validation messages, table headers, empty states, success messages, error messages, dialogs, alt text, and aria labels.
- Add keys to both `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`.
- Keep Arabic and English translation files structurally aligned.
- Components and pages must support RTL/LTR behavior.
- Use enums/constants for logic, not Arabic or English display strings.

## Routing And DI Rules
- Put feature routes in `<feature-name>.routes.ts`.
- Use standalone lazy `loadComponent` where applicable.
- Repository contracts must be wired to implementations using Angular DI providers.
- Prefer route-level providers for feature-specific repositories.
- Use `app.config.ts` only for truly app-wide dependencies.

## Spec Kit Workflow
- Do not implement a new feature before spec, plan, and tasks exist.
- Specs, plans, and tasks must follow the Auth Golden Reference.
- Specs should document frontend API contract assumptions only.
- Tasks must be frontend-only and include required i18n work.

## Verification
- Run Angular build, test, or lint commands when practical and relevant.
- Verify translation keys exist in both Arabic and English.
- Verify RTL/LTR behavior for UI changes.
- Verify no backend files changed.
- If verification cannot be run, report why in the final response.
