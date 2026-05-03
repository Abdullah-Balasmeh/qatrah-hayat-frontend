# Implementation Plan: Screening

**Branch**: `001-screening-feature` | **Date**: 2026-05-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-screening-feature/spec.md`

## Summary

Build a frontend-only Screening feature that lets authenticated citizens complete eligibility screening for Registration and PreDonation sessions. The new implementation will use the old Screening feature only as a requirements reference and will follow the Auth feature as the golden architecture reference: DTOs and API access in `data`, business-facing models and repository contracts in `domain`, and pages/components/facades/stores/view-models in `presentation`.

The shared Screening page will read query parameters, validate context, load questions from the external backend API, render a reusable question form, enforce conditional validation, submit normalized answers, optionally show deferred/ineligible result messaging, and navigate to `/user/dashboard`. PreDonation donation-intent context is explicitly detected with `source=donationIntent`.

## Technical Context

**Language/Version**: Angular 19, TypeScript 5.7, HTML/CSS  
**Primary Dependencies**: Angular Router, Reactive Forms, RxJS, Angular signals, `@ngx-translate/core`, existing shared UI components  
**Storage**: None planned; do not create `data/storage` unless persistence is later required  
**Testing**: Angular CLI/Karma via `ng test`; build verification via `ng build`; lint if configured  
**Target Platform**: Browser-based Angular SPA  
**Project Type**: Frontend web application  
**Performance Goals**: Questions render in display order without page-level blocking beyond the loading state; validation feedback appears immediately after touch/submit  
**Constraints**: Frontend-only work, backend APIs treated as external contracts, Auth-guided feature architecture, no old Screening code copy, Arabic/English localization, RTL/LTR support, no unauthorized packages  
**Scale/Scope**: One shared route/page, dynamic question form, reusable question/result/state/action components, repository/API integration, and `Screening-Keys` translations

## Constitution / AGENTS Check

*GATE: Must pass before implementation tasks are generated. Re-check during review.*

- Pass: Feature follows the Auth reference structure under `src/app/features/screening`.
- Pass: Auth exceptions are not copied into Screening.
- Pass: Old Screening is requirements reference only; its structure and component/service coupling are not copied.
- Pass: Scope is frontend-only; backend files and API contracts are not modified.
- Pass: Domain/data/presentation boundaries are planned; data layer does not import presentation.
- Pass: Request/response DTOs stay in `data/dtos`; repositories return domain models, not DTOs.
- Pass: Mappers are planned as small pure functions with no HTTP calls or input mutation.
- Pass: Repository contract is wired to implementation through Angular DI providers.
- Pass: Components/pages use `ScreeningFacade` and do not call repositories/API services directly.
- Pass: `ScreeningStore` manages state only and does not perform HTTP calls.
- Pass: Routes use `screening.routes.ts` and standalone lazy loading where applicable.
- Pass: User-facing text uses `Screening-Keys` in both `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`.
- Pass: RTL/LTR behavior is part of UI verification.
- Pass: Long pages/components are decomposed into reusable input/output components that do not call APIs directly.

## Frontend Architecture Plan

- **Auth Golden Reference**: Follow Auth's feature layout, abstract repository contract, repository implementation, API service, pure mapper functions, facade/store coordination, lazy routes, typed forms, and localization discipline. Do not copy Auth business logic or documented Auth exceptions.
- **Layer Plan**: `domain` owns screening enums, models, and repository contract. `data` owns backend DTOs, API service, mappers, and repository implementation. `presentation` owns the shared page, reusable components, facade, store, and typed form view-models.
- **DI Provider Plan**: Register Screening feature dependencies at route level in `screening.routes.ts`. Provide `ScreeningRepository` using `ScreeningRepositoryImpl`; keep API service, store, and facade feature-scoped with route providers unless later proven app-wide. Also verify whether `/user/screening` is already registered in the parent route tree and wire `SCREENING_ROUTES` there if missing without modifying unrelated routes.
- **Component Splitting Plan**: Keep `ScreeningPageComponent` thin. Split question list, question card, yes/no control, conditional fields, confirmation, state messages, and result message into reusable components.
- **i18n and RTL/LTR Plan**: Use `Screening-Keys` for all static UI, validation, empty, error, and result messages. Add matching keys to `ar.json` and `en.json`. Use logical CSS/layout patterns and existing shared controls for RTL/LTR support.
- **API Contract Assumptions**: Use existing frontend endpoint constants for `GET /Screening/questions` and `POST /Screening/submit` as external backend contracts. Document `resultEligibilityStatus` as required and `nextEligibleDate` / `deferralReason` as optional response fields.

## Source Code Structure

```text
src/app/features/screening/
├── screening.routes.ts
├── data/
│   ├── dtos/
│   │   ├── screening-question-response.dto.ts
│   │   ├── submit-screening-request.dto.ts
│   │   └── submit-screening-response.dto.ts
│   ├── mappers/
│   │   ├── screening-question-dto-to-model.mapper.ts
│   │   ├── screening-submit-model-to-dto.mapper.ts
│   │   └── screening-submit-response-dto-to-model.mapper.ts
│   ├── repositories_impl/
│   │   └── screening-repository-impl.ts
│   └── services/
│       └── screening-api.service.ts
├── domain/
│   ├── enums/
│   │   └── screening-session-type.enum.ts
│   ├── models/
│   │   ├── screening-answer.model.ts
│   │   ├── screening-query-context.model.ts
│   │   ├── screening-question.model.ts
│   │   ├── screening-result.model.ts
│   │   └── screening-submission.model.ts
│   └── repositories/
│       └── screening.repository.ts
└── presentation/
    ├── components/
    │   ├── screening-confirmation/
    │   ├── screening-question-card/
    │   ├── screening-question-list/
    │   ├── screening-result-message/
    │   ├── screening-state-message/
    │   └── screening-action-buttons/
    ├── facades/
    │   └── screening.facade.ts
    ├── pages/
    │   └── screening-page/
    ├── store/
    │   └── screening.store.ts
    └── view-models/
        ├── screening-form.model.ts
        ├── screening-form-value.ts
        └── screening-form.factory.ts

src/assets/i18n/
├── ar.json
└── en.json
```

**Structure Decision**: Do not create `data/storage` because Screening has no local/session/cache persistence requirement. Keep the existing `domain/enums/screening-session-type.enum.ts` and build the remaining feature around it.

## Domain Models And Enums

- `ScreeningSessionType`: existing enum with `Registration = 1` and `PreDonation = 2`. UI/component logic uses enum names, not numeric literals.
- `ScreeningQueryContextModel`: validated context from route query params: `sessionType`, `isForFemaleOnly`, optional `source`, optional `donationIntentId`, and a derived `requiresDonationIntentId` value when `sessionType=PreDonation` and `source=donationIntent`.
- `ScreeningQuestionModel`: `id`, localized question text, `sessionType`, `displayOrder`, `isForFemaleOnly`, `requiresAdditionalText`, `requiresDateValue`, optional conditional labels.
- `ScreeningAnswerModel`: `screeningQuestionId`, boolean `answer`, nullable `additionalText`, nullable `conditionalDateValue`.
- `ScreeningSubmissionModel`: `sessionType`, optional `donationIntentId`, normalized `answers`.
- `ScreeningResultModel`: `screeningSessionId`, `sessionType`, `resultEligibilityStatus`, optional `nextEligibleDate`, optional `deferralReason`, and any confirmed frontend-used response fields.

## DTO Plan

- `ScreeningQuestionResponseDto`: mirrors backend question response. Keep backend field naming and nullability here only.
- `SubmitScreeningRequestDto`: backend request payload for `POST /Screening/submit`.
- `SubmitScreeningResponseDto`: backend response payload, including required `resultEligibilityStatus` and optional `nextEligibleDate` / `deferralReason`.
- DTOs must not be imported by pages or components.

## Mapper Plan

- `mapScreeningQuestionDtoToModel`: converts one question DTO to `ScreeningQuestionModel`.
- `mapScreeningSubmitModelToDto`: converts `ScreeningSubmissionModel` to `SubmitScreeningRequestDto`.
- `mapScreeningSubmitResponseDtoToModel`: converts submit response DTO to `ScreeningResultModel`.
- Mappers are pure functions, perform no HTTP calls, do not mutate inputs, and do not import from `presentation`.
- Sorting by `displayOrder` should happen in facade/use-case flow, not inside DTO mappers.
- Form values map to domain submission models in `presentation/view-models` or `ScreeningFacade`, not in `data/mappers`.

## API Service Plan

- `ScreeningApiService` wraps raw HTTP calls using `ApiService` and `API_ENDPOINTS.screening`.
- `getQuestions(sessionType, isForFemaleOnly)` calls `GET /Screening/questions` with query params.
- `submitScreening(requestDto)` calls `POST /Screening/submit`.
- API service methods return DTO observables only.
- API service does not contain UI validation, translation, sorting, navigation, or store updates.

## Repository Plan

- `ScreeningRepository` abstract contract in `domain/repositories`.
- Methods:
  - `getQuestions(context: ScreeningQueryContextModel): Observable<ScreeningQuestionModel[]>`
  - `submitScreening(submission: ScreeningSubmissionModel): Observable<ScreeningResultModel>`
- `ScreeningRepositoryImpl` in `data/repositories_impl` injects `ScreeningApiService`, applies request/response mappers, and returns domain models only.
- Repository methods do not expose DTOs and do not know about form controls, components, or translation keys.

## DI Provider Plan

- Add route-level providers in `screening.routes.ts`:
  - `ScreeningApiService`
  - `ScreeningRepositoryImpl`
  - `{ provide: ScreeningRepository, useClass: ScreeningRepositoryImpl }`
  - `ScreeningStore`
  - `ScreeningFacade`
- Prefer route-level scoping because Screening dependencies are feature-specific.
- Do not register Screening repository in `app.config.ts` unless later requirements make it truly app-wide.

## Store Plan

- `ScreeningStore` manages state only with private writable signals and public readonly/computed state.
- State includes:
  - validated context
  - questions
  - loading
  - submitting
  - error key/context
  - result
  - result message visibility
- Store methods set/clear state only.
- Store must not inject `ScreeningApiService`, `ApiService`, or repository.
- Store must not perform HTTP calls or navigation.

## Facade Plan

- `ScreeningFacade` exposes meaningful use cases:
  - `initializeContext(queryParams)`
  - `loadQuestions(context)`
  - `createForm(questions)`
  - `handleAnswerChange(form, question, answer)`
  - `normalizeSubmitPayload(formValue)`
  - `submitScreening(formValue)`
  - `handleSubmitResult(result)`
  - `dismissResultAndNavigate()`
- Facade coordinates:
  - route query validation
  - parsing `source=donationIntent`
  - PreDonation donation-intent context validation
  - loading/submitting state through store
  - repository calls
  - sorting by `displayOrder`
  - mapping form values to domain submission model
  - error/result translation keys
  - navigation to `/user/dashboard`
- Components/pages call facade methods and read facade/store state; they do not call API services or repositories directly.

## Page And Component Decomposition Plan

- `ScreeningPageComponent`: shared page for Registration and PreDonation. Reads query params, calls facade initialization, renders high-level states, and delegates form UI to reusable components.
- `ScreeningQuestionListComponent`: receives questions and answer form array; renders question cards.
- `ScreeningQuestionCardComponent`: receives one question and answer group; displays localized API-provided question text, yes/no selection, and conditional field slots.
- `ScreeningConfirmationComponent`: wraps confirmation checkbox and localized validation.
- `ScreeningStateMessageComponent`: reusable empty/error/invalid-context state display.
- `ScreeningResultMessageComponent`: displays deferred/ineligible result details before navigation when response includes enough details.
- `ScreeningActionButtonsComponent`: reusable submit/continue actions that receive state via inputs and emit action events.
- Use existing shared UI controls where applicable: loading, buttons, checkbox, text input, date input, form error message.
- Reusable components receive inputs and emit outputs; they do not call APIs.

## View-Models And Form Plan

- `ScreeningFormGroup` and answer group types live under `presentation/view-models`.
- `screening-form.factory.ts` creates typed reactive forms from domain `ScreeningQuestionModel[]`.
- Form controls:
  - `answers: FormArray`
  - `iConfirm: FormControl<boolean>`
  - each answer group: `screeningQuestionId`, `answer`, `additionalText`, `conditionalDateValue`
- Form value mapping to `ScreeningSubmissionModel` happens in presentation/facade code.
- Do not place form models or form factories in `data`.

## Routing Plan

- `screening.routes.ts` exports `SCREENING_ROUTES`.
- Use standalone lazy loading with `loadComponent` for `presentation/pages/screening-page/screening-page.component`.
- Expected app entry remains `/user/screening` from parent routing.
- Check whether `/user/screening` is already registered in the parent route tree.
- If missing, wire `SCREENING_ROUTES` into the appropriate parent route tree without modifying unrelated routes.
- Route-level providers wire the repository and feature dependencies.
- Parent app routes continue to own layout and guard decisions where possible.

## Localization Plan

- Add `Screening-Keys` to both `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`.
- Keep the Arabic and English structures aligned.
- Planned keys include:
  - `TITLE.REGISTRATION`
  - `TITLE.PRE_DONATION`
  - `ACTIONS.SUBMIT`
  - `ACTIONS.CONTINUE`
  - `ANSWERS.YES`
  - `ANSWERS.NO`
  - `CONFIRMATION.ACCURACY`
  - `VALIDATION.ANSWER_REQUIRED`
  - `VALIDATION.ADDITIONAL_TEXT_REQUIRED`
  - `VALIDATION.ADDITIONAL_TEXT_MAX_LENGTH`
  - `VALIDATION.DATE_REQUIRED`
  - `VALIDATION.DATE_INVALID`
  - `VALIDATION.DATE_FUTURE`
  - `ERRORS.INVALID_SESSION_CONTEXT`
  - `ERRORS.INVALID_DONATION_CONTEXT`
  - `ERRORS.LOAD_FAILED`
  - `ERRORS.SUBMIT_FAILED`
  - `EMPTY.NO_QUESTIONS`
  - `RESULT.DEFERRED`
  - `RESULT.INELIGIBLE`
  - `RESULT.NEXT_ELIGIBLE_DATE`
  - `RESULT.DEFERRAL_REASON`
- API-provided Arabic/English question text can be displayed as content, but fallback labels and static UI must use translation keys.

## Validation Plan

- `sessionType`: parse and validate against `ScreeningSessionType.Registration` and `ScreeningSessionType.PreDonation`; show localized invalid-session error with no API call and no automatic redirect when invalid.
- `source`: parse optional query param. `source=donationIntent` means the PreDonation screening was launched from a donation intent flow; unsupported source values are not treated as donation-intent context.
- `donationIntentId`: optional generally; validate as a positive number when provided. If `sessionType=PreDonation` and `source=donationIntent`, `donationIntentId` is required and missing/invalid context shows a localized invalid-context error with no API call.
- `isForFemaleOnly`: default to false unless explicitly true.
- Required answers: every rendered question requires Yes/No before submission.
- Conditional additional text: required when answer is Yes and `requiresAdditionalText` is true.
- Additional text max length: 500 characters.
- Conditional date: required when answer is Yes and `requiresDateValue` is true.
- Date validity: must be a valid date; reject future dates by default unless backend metadata later defines another rule.
- Clear conditional values when answer changes to No.
- Confirmation: `iConfirm` must be true before submission.
- Submission normalization: trim additional text and submit blank conditional text/date as null.

## API Contract Assumptions

- `GET /Screening/questions`
  - Query params: `sessionType`, `isForFemaleOnly`.
  - Response: list of question DTOs with localized text, display order, female-only flag, and conditional field metadata.
- `POST /Screening/submit`
  - Request: `sessionType`, optional `donationIntentId`, and normalized answer list.
  - Response: includes `resultEligibilityStatus`; may include `nextEligibleDate` and `deferralReason`.
- Backend APIs are external contracts. Do not modify backend code or generate backend tasks.
- If backend returns unknown validation errors, map to localized user-safe fallback messages.

## Verification Plan

- Verify no backend files changed.
- Verify no Auth files changed.
- Verify DTOs do not leak into pages/components.
- Verify data layer does not import from presentation.
- Verify pages/components call `ScreeningFacade`, not API services or repositories.
- Verify `ScreeningStore` does not perform HTTP calls or inject API services.
- Verify repository methods return domain models, not DTOs.
- Verify `Screening-Keys` exists in both `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`.
- Verify Arabic/English translation structures stay aligned.
- Verify RTL/LTR behavior for page layout, question cards, yes/no controls, conditional fields, errors, and result messages.
- Run Angular build/test/lint when practical:
  - `ng build`
  - `ng test` for affected feature/shared units when configured
  - lint command if configured in the workspace

## Project Structure

### Documentation (this feature)

```text
specs/001-screening-feature/
├── spec.md
├── plan.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/app/features/screening/
├── screening.routes.ts
├── data/
│   ├── dtos/
│   ├── mappers/
│   ├── repositories_impl/
│   └── services/
├── domain/
│   ├── enums/
│   ├── models/
│   └── repositories/
└── presentation/
    ├── components/
    ├── facades/
    ├── pages/
    ├── store/
    └── view-models/

src/assets/i18n/
├── ar.json
└── en.json
```

**Structure Decision**: Implement under `src/app/features/screening`, not `old-screening`. Keep old Screening as a reference for business requirements only.

## Complexity Tracking

No constitution or AGENTS violations are planned.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
