---
description: "Frontend-only task list for Screening feature implementation"
---

# Tasks: Screening

**Input**: Design documents from `specs/001-screening-feature/`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md), [requirements.md](./checklists/requirements.md)

**Scope**: Frontend only. Do not modify backend code, do not modify Auth, do not add packages, and do not copy old Screening code.

**Format**: `- [ ] T### [P?] [Story?] Description with file path`

## Story Mapping

- **US1**: Complete Registration screening and navigate to `/user/dashboard`.
- **US2**: Complete PreDonation screening, show result when needed, then navigate to `/user/dashboard`.
- **US3**: Recover from invalid context, load failure, submit failure, and empty states.

## Phase 1: Setup / Feature Shell

**Purpose**: Establish the Screening feature shell without application behavior.

- [ ] T001 Confirm current branch/context is `001-screening-feature` and review `specs/001-screening-feature/spec.md` and `specs/001-screening-feature/plan.md`
- [ ] T002 Create the planned feature file structure under `src/app/features/screening/` without adding empty unused folders
- [ ] T003 [P] Confirm `src/app/features/screening/domain/enums/screening-session-type.enum.ts` defines `Registration = 1` and `PreDonation = 2`
- [ ] T004 [P] Identify existing shared UI controls to reuse for loading, buttons, checkbox, text field, date field, and form errors in `src/app/shared/`
- [ ] T005 Add a short implementation note in `specs/001-screening-feature/tasks.md` review comments if any required old Screening behavior is unclear; do not copy files from `src/app/features/old-screening/`

## Phase 2: Domain Layer

**Purpose**: Define business-facing contracts and models before data or UI work.

- [ ] T006 [P] Create screening result status enum if no suitable core enum exists in `src/app/features/screening/domain/enums/screening-result-status.enum.ts`
- [ ] T007 [P] Create `ScreeningQueryContextModel` with optional `source`, optional `donationIntentId`, and derived donation-intent requirement in `src/app/features/screening/domain/models/screening-query-context.model.ts`
- [ ] T008 [P] Create `ScreeningQuestionModel` in `src/app/features/screening/domain/models/screening-question.model.ts`
- [ ] T009 [P] Create `ScreeningAnswerModel` in `src/app/features/screening/domain/models/screening-answer.model.ts`
- [ ] T010 [P] Create `ScreeningSubmissionModel` in `src/app/features/screening/domain/models/screening-submission.model.ts`
- [ ] T011 [P] Create `ScreeningResultModel` with `resultEligibilityStatus`, optional `nextEligibleDate`, and optional `deferralReason` in `src/app/features/screening/domain/models/screening-result.model.ts`
- [ ] T012 Create abstract `ScreeningRepository` contract returning domain models in `src/app/features/screening/domain/repositories/screening.repository.ts`
- [ ] T013 Review domain imports so `src/app/features/screening/domain/` does not import from `data` or `presentation`

## Phase 3: Data Layer

**Purpose**: Isolate backend DTOs, API access, pure mappers, and repository implementation.

- [ ] T014 [P] Create questions response DTO in `src/app/features/screening/data/dtos/screening-question-response.dto.ts`
- [ ] T015 [P] Create submit request DTO in `src/app/features/screening/data/dtos/submit-screening-request.dto.ts`
- [ ] T016 [P] Create submit response DTO in `src/app/features/screening/data/dtos/submit-screening-response.dto.ts`
- [ ] T017 [P] Create pure question DTO-to-domain mapper in `src/app/features/screening/data/mappers/screening-question-dto-to-model.mapper.ts`
- [ ] T018 [P] Create pure submit domain-to-DTO mapper in `src/app/features/screening/data/mappers/screening-submit-model-to-dto.mapper.ts`
- [ ] T019 [P] Create pure submit response DTO-to-domain mapper in `src/app/features/screening/data/mappers/screening-submit-response-dto-to-model.mapper.ts`
- [ ] T020 Create `ScreeningApiService` using `ApiService` and `API_ENDPOINTS.screening.get/submit` in `src/app/features/screening/data/services/screening-api.service.ts`
- [ ] T021 Create `ScreeningRepositoryImpl` that maps DTO/domain boundaries in `src/app/features/screening/data/repositories_impl/screening-repository-impl.ts`
- [ ] T022 Verify data mappers do not import from `src/app/features/screening/presentation/`
- [ ] T023 Verify repository methods return domain models and never expose DTOs to presentation

## Phase 4: DI And Routing

**Purpose**: Wire feature-scoped dependencies and lazy route entry.

- [ ] T024 Create `SCREENING_ROUTES` with standalone `loadComponent` in `src/app/features/screening/screening.routes.ts`
- [ ] T025 Wire route-level providers for `ScreeningApiService`, `ScreeningRepositoryImpl`, `ScreeningRepository`, `ScreeningStore`, and `ScreeningFacade` in `src/app/features/screening/screening.routes.ts`
- [ ] T026 Verify `ScreeningRepository` is not registered in `app.config.ts` unless a later app-wide dependency is explicitly approved
- [ ] T027 Check whether `/user/screening` is already registered in the appropriate parent route tree and document the result in `specs/001-screening-feature/tasks.md` review notes
- [ ] T028 Wire `SCREENING_ROUTES` into the appropriate parent route tree if `/user/screening` is missing; do not modify unrelated routes
- [ ] T029 Verify parent app routing continues to own `/user/screening` layout and guards without backend or Auth changes

## Phase 5: Store And Facade

**Purpose**: Centralize Screening state and application use cases before pages/components.

- [ ] T030 Create `ScreeningStore` with private writable signals and public readonly/computed state in `src/app/features/screening/presentation/store/screening.store.ts`
- [ ] T031 Ensure `ScreeningStore` manages context, questions, loading, submitting, error, result, and result-message state only in `src/app/features/screening/presentation/store/screening.store.ts`
- [ ] T032 Verify `ScreeningStore` does not inject `ApiService`, `ScreeningApiService`, or `ScreeningRepository` in `src/app/features/screening/presentation/store/screening.store.ts`
- [ ] T033 Create `ScreeningFacade` skeleton with injected `ScreeningRepository`, `ScreeningStore`, `Router`, and translation/error mapping dependencies in `src/app/features/screening/presentation/facades/screening.facade.ts`
- [ ] T034 [US1] Implement `initializeContext` use case with enum-based `sessionType` validation and no API call for invalid context in `src/app/features/screening/presentation/facades/screening.facade.ts`
- [ ] T035 [US2] Parse optional `source` query param and recognize `source=donationIntent` as PreDonation donation intent launch context in `src/app/features/screening/presentation/facades/screening.facade.ts`
- [ ] T036 [US2] Validate `donationIntentId` as required when `sessionType=PreDonation` and `source=donationIntent`; show localized invalid context error and make no API call when invalid in `src/app/features/screening/presentation/facades/screening.facade.ts`
- [ ] T037 [US1] [US2] Implement `loadQuestions` use case with backend loading through repository and `displayOrder` sorting in `src/app/features/screening/presentation/facades/screening.facade.ts`
- [ ] T038 [US1] [US2] Implement submit payload normalization from form value to domain submission model in `src/app/features/screening/presentation/facades/screening.facade.ts`
- [ ] T039 [US1] [US2] Implement repository submit call and loading/submitting state handling in `src/app/features/screening/presentation/facades/screening.facade.ts`
- [ ] T040 [US2] Implement submit result handling for deferred/ineligible result-message decision in `src/app/features/screening/presentation/facades/screening.facade.ts`
- [ ] T041 [US1] [US2] Implement navigation decision to `/user/dashboard` after successful flow in `src/app/features/screening/presentation/facades/screening.facade.ts`
- [ ] T042 [US3] Implement localized load/submit/invalid-context error state handling in `src/app/features/screening/presentation/facades/screening.facade.ts`

## Phase 6: Presentation View-Models

**Purpose**: Define typed forms and form-to-domain mapping in presentation only.

- [ ] T043 [P] Create typed answer/form group models in `src/app/features/screening/presentation/view-models/screening-form.model.ts`
- [ ] T044 [P] Create raw form value type in `src/app/features/screening/presentation/view-models/screening-form-value.ts`
- [ ] T045 Create form factory with answer, conditional text/date, and confirmation controls in `src/app/features/screening/presentation/view-models/screening-form.factory.ts`
- [ ] T046 [US1] [US2] Add validators for required answers, required conditional fields, max additional text length 500, valid date, and no future date in `src/app/features/screening/presentation/view-models/screening-form.factory.ts`
- [ ] T047 [US1] [US2] Implement form-value-to-domain submission mapping in `src/app/features/screening/presentation/view-models/screening-form-value.ts`
- [ ] T048 [US1] [US2] Implement helper behavior to clear conditional text/date values when answer changes to No in `src/app/features/screening/presentation/view-models/screening-form.factory.ts`
- [ ] T049 Verify no files in `src/app/features/screening/data/` import form view-models from `src/app/features/screening/presentation/view-models/`

## Phase 7: Reusable Components

**Purpose**: Build small input/output UI pieces before composing the page.

- [ ] T050 [P] [US1] [US2] Create screening intro/header component in `src/app/features/screening/presentation/components/screening-intro-header/`
- [ ] T051 [P] [US1] [US2] Create question list component receiving questions/form array inputs in `src/app/features/screening/presentation/components/screening-question-list/`
- [ ] T052 [P] [US1] [US2] Create question card component receiving one question and answer group in `src/app/features/screening/presentation/components/screening-question-card/`
- [ ] T053 [P] [US1] [US2] Create reusable yes/no control inside question card or as a child component in `src/app/features/screening/presentation/components/screening-question-card/`
- [ ] T054 [P] [US1] [US2] Create conditional text/date field rendering in `src/app/features/screening/presentation/components/screening-question-card/`
- [ ] T055 [P] [US1] [US2] Create confirmation checkbox section in `src/app/features/screening/presentation/components/screening-confirmation/`
- [ ] T056 [P] [US3] Create state/error/empty message component in `src/app/features/screening/presentation/components/screening-state-message/`
- [ ] T057 [P] [US2] Create result/deferred message component in `src/app/features/screening/presentation/components/screening-result-message/`
- [ ] T058 [P] [US1] [US2] Create action buttons component for submit/continue actions in `src/app/features/screening/presentation/components/screening-action-buttons/`
- [ ] T059 Verify all Screening reusable components receive inputs/emit outputs and do not inject API services or repositories
- [ ] T060 Verify all Screening component templates use translation keys or API-provided question content, with no hardcoded Arabic/English UI text

## Phase 8: Pages

**Purpose**: Compose the shared Screening page without placing workflow logic in the page.

- [ ] T061 [US1] [US2] Create thin shared `ScreeningPageComponent` files in `src/app/features/screening/presentation/pages/screening-page/`
- [ ] T062 [US1] [US2] Wire page initialization to route query params including `source` and `ScreeningFacade.initializeContext` in `src/app/features/screening/presentation/pages/screening-page/screening-page.component.ts`
- [ ] T063 [US1] [US2] Compose intro/header, state messages, question list, confirmation, action buttons, and result message in `src/app/features/screening/presentation/pages/screening-page/screening-page.component.html`
- [ ] T064 [US1] [US2] Ensure page submit calls `ScreeningFacade.submitScreening` and does not call repository or API service in `src/app/features/screening/presentation/pages/screening-page/screening-page.component.ts`
- [ ] T065 [US3] Render invalid session, invalid donation context, loading failure, submit failure, and empty states through reusable state component in `src/app/features/screening/presentation/pages/screening-page/screening-page.component.html`
- [ ] T066 Verify `ScreeningPageComponent` stays thin and delegates validation, API flow, state, and navigation to facade/store/view-models

## Phase 9: Localization

**Purpose**: Add complete bilingual translation coverage for static Screening UI.

- [ ] T067 Add `Screening-Keys` structure with Arabic values in `src/assets/i18n/ar.json`
- [ ] T068 Add matching `Screening-Keys` structure with English values in `src/assets/i18n/en.json`
- [ ] T069 Include keys for titles, Yes/No labels, confirmation, submit/continue actions, empty state, load failure, submit failure, invalid session context, invalid donation context, and result messages in `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`
- [ ] T070 Include validation keys for answer required, additional text required, max length 500, date required, invalid date, and future date in `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`
- [ ] T071 Verify Arabic and English `Screening-Keys` structures are aligned in `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`
- [ ] T072 Verify Screening UI uses `Screening-Keys` and does not use Arabic or English display strings as logic values

## Phase 10: Verification / Quality Review

**Purpose**: Confirm architecture, behavior, localization, and safety gates before delivery.

- [ ] T073 Run `rg -n "from ['\"].*presentation|presentation/view-models" src/app/features/screening/data src/app/features/screening/domain` to verify data/domain do not import presentation
- [ ] T074 Run `rg -n "ScreeningApiService|ApiService|ScreeningRepository" src/app/features/screening/presentation` and verify only facade/provider wiring imports repository and no components/pages call API services directly
- [ ] T075 Run `rg -n "console\\.log|console\\.error|console\\.warn" src/app/features/screening` and remove any console logging from implementation
- [ ] T076 Run `rg -n "old-screening" src/app/features/screening specs/001-screening-feature/tasks.md` and verify implementation does not import or copy old Screening code
- [ ] T077 Run `git status --short` and verify no backend files changed
- [ ] T078 Verify no Auth files changed with `git diff -- src/app/features/auth`
- [ ] T079 Verify `src/assets/i18n/ar.json` and `src/assets/i18n/en.json` both contain aligned `Screening-Keys`
- [ ] T080 Manually verify RTL/LTR behavior for Screening page, question cards, yes/no controls, conditional fields, errors, and result messages
- [ ] T081 Run Angular build when practical with `ng build`
- [ ] T082 Run affected Angular tests when practical with `ng test`
- [ ] T083 Run lint command when configured and practical
- [ ] T084 Review that repository methods return domain models, mappers are pure, store has no HTTP calls, and pages/components use facade only
- [ ] T085 Final review against `AGENTS.md`, `specs/001-screening-feature/spec.md`, and `specs/001-screening-feature/plan.md`

## Dependencies & Execution Order

- Phase 1 must complete before feature files are implemented.
- Phase 2 domain contracts block Phase 3 data and Phase 5 facade work.
- Phase 3 data layer blocks repository-backed facade use cases.
- Phase 4 routing/DI can proceed after domain/data contracts exist.
- Phase 5 store/facade blocks final page integration.
- Phase 6 view-models block question form components and submit integration.
- Phase 7 reusable components should complete before Phase 8 page composition.
- Phase 9 localization can run in parallel with presentation work once key names are stable.
- Phase 10 verification runs after implementation and localization.

## Parallel Opportunities

- Domain model tasks T006-T011 can run in parallel after T003.
- DTO tasks T014-T016 can run in parallel after domain shapes are agreed.
- Mapper tasks T017-T019 can run in parallel after DTO/domain models exist.
- Reusable component tasks T050-T058 can run in parallel after view-model contracts are stable.
- Localization tasks T067-T070 can run in parallel once `Screening-Keys` names are accepted.
- Verification searches T073-T079 can run in parallel after implementation.

## Independent Test Criteria

- **US1 Registration**: Open shared Screening page with `sessionType=Registration`; complete all questions and confirmation; verify submission and `/user/dashboard` navigation.
- **US2 PreDonation**: Open shared Screening page with `sessionType=PreDonation` and valid `donationIntentId` when required; complete all questions; verify result message when deferred/ineligible details exist and `/user/dashboard` navigation.
- **US3 Recovery**: Open with missing/invalid `sessionType`, simulate load failure, simulate submit failure, and verify localized non-destructive error states with no invalid API submission.

## Notes

- Do not generate backend controllers, services, entities, migrations, or API contract changes.
- Do not copy old Screening files or old architecture.
- Do not place form view-models in `data`.
- Do not let DTOs leak into `presentation`.
- Do not hardcode user-facing Arabic or English text.
- Commit only after implementation tasks or logical task groups when the user requests commits.
