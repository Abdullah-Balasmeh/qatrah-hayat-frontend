# Feature Specification: Screening

**Feature Branch**: `001-screening-feature`  
**Created**: 2026-05-03  
**Status**: Draft  
**Input**: User description: "Screening frontend feature for Qatrah Hayat. Allow a citizen to complete eligibility screening for Registration and PreDonation sessions using Auth as the golden architecture reference. Use the old Screening feature only as a requirements reference."

## Clarifications

### Session 2026-05-03

- Q: What are the valid screening session types? → A: `Registration = 1` and `PreDonation = 2`; UI/component logic must use enum values, not numeric literals.
- Q: Should Registration and PreDonation use separate pages? → A: They share one Screening page, with behavior driven by `sessionType`.
- Q: What happens when `sessionType` is missing or invalid? → A: Show a localized error state, do not call the API, and do not redirect automatically.
- Q: Is `donationIntentId` required for PreDonation? → A: It is optional generally, but required when PreDonation is launched from a donation intent flow; missing or invalid required context shows a localized invalid-context error.
- Q: How is a PreDonation donation intent flow identified? → A: Use query param `source=donationIntent`; when `sessionType=PreDonation` and `source=donationIntent`, `donationIntentId` is required and must be a valid number.
- Q: What happens after successful Registration screening? → A: Navigate to `/user/dashboard`.
- Q: What happens after successful PreDonation screening? → A: For now, show result details if needed, then navigate to `/user/dashboard`; a donation-intent-specific route may replace this when finalized.
- Q: What submit response fields are assumed? → A: `resultEligibilityStatus` exists; `nextEligibleDate` and `deferralReason` are optional.
- Q: Should deferred or ineligible results be shown before navigation? → A: Show a localized result message before navigation when the response includes enough result details.
- Q: What validation applies to conditional text and dates? → A: `additionalText` max length is 500 characters; conditional dates are required when visible, must be valid dates, and reject future dates unless backend metadata later says otherwise.
- Q: What translation namespace should be used? → A: Use `Screening-Keys`, with matching keys added to both Arabic and English files during implementation.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete Registration Screening (Priority: P1)

As a citizen who has reached the registration screening step, I want to answer the required eligibility questions so that my registration eligibility can be evaluated and I can continue to the citizen dashboard.

**Why this priority**: Registration screening is part of the citizen onboarding flow and blocks a citizen from completing the required eligibility step.

**Independent Test**: Start the shared screening page with `sessionType` set to Registration, answer every required question, complete any conditional fields, check the confirmation box, submit, and verify the citizen reaches `/user/dashboard`.

**Acceptance Scenarios**:

1. **Given** the citizen opens screening with a valid Registration session type, **When** questions load successfully, **Then** questions are displayed in display order with Yes/No choices.
2. **Given** the citizen answers Yes to a question that requires additional text, **When** the citizen submits without entering the additional text, **Then** the form blocks submission and shows a localized validation message.
3. **Given** the citizen answers all questions validly and confirms the information, **When** the citizen submits, **Then** answers are submitted and the citizen is navigated to `/user/dashboard`.

---

### User Story 2 - Complete PreDonation Screening (Priority: P2)

As a citizen preparing to donate, I want to complete pre-donation screening for the relevant donation intent so that eligibility can be checked before continuing the donation flow.

**Why this priority**: Pre-donation screening protects the donation workflow and can be tied to an existing donation intent.

**Independent Test**: Start the shared screening page with `sessionType` set to PreDonation and `source=donationIntent` plus a valid `donationIntentId` when launched from a donation intent flow, complete the form, submit, verify any required result message appears, and verify the citizen reaches `/user/dashboard`.

**Acceptance Scenarios**:

1. **Given** the citizen opens screening with a valid PreDonation session type and `source=donationIntent` plus a valid donation intent ID when launched from a donation intent flow, **When** questions load, **Then** the request uses the session type, female-only filter, and donation intent context where applicable.
2. **Given** a question requires a conditional date value, **When** the citizen answers Yes and submits without selecting a date, **Then** the form blocks submission and shows a localized validation message.
3. **Given** the citizen answers No to a question after entering conditional text or date values, **When** the answer changes to No, **Then** conditional values are cleared and not submitted.
4. **Given** the submit response indicates a deferred or ineligible result and includes enough result details, **When** submission succeeds, **Then** a localized result message is shown before navigation.

---

### User Story 3 - Recover From Invalid Or Failed Screening States (Priority: P3)

As a citizen, I want clear feedback when screening cannot be loaded or submitted so that I know what happened and can retry or leave the page without confusion.

**Why this priority**: Error handling is needed for trust and usability, but it does not define the main happy path.

**Independent Test**: Open screening with missing or invalid query parameters, simulate question load failure, and simulate submit failure; verify localized messages appear and no invalid submission is sent.

**Acceptance Scenarios**:

1. **Given** the page opens without a valid `sessionType`, **When** the feature validates query parameters, **Then** no question request is submitted, no automatic redirect occurs, and a localized error state is shown.
2. **Given** question loading fails, **When** the request returns an error, **Then** the citizen sees a localized load failure message.
3. **Given** answer submission fails, **When** the request returns an error, **Then** the citizen stays on the form and sees a localized submit failure message without losing valid answers.

---

### Edge Cases

- Missing `sessionType`.
- `sessionType` is present but does not match a supported `ScreeningSessionType` value.
- `donationIntentId` is present but not a valid positive number.
- PreDonation has `source=donationIntent` but required `donationIntentId` is missing or invalid.
- `source` is present with an unsupported value.
- `isForFemaleOnly` is missing, malformed, or not a boolean-like value.
- The questions API returns an empty list.
- The questions API returns questions out of order.
- A question has missing Arabic or English text.
- A question requires additional text, date value, or both.
- Additional text exceeds 500 characters.
- A conditional date value is malformed or in the future.
- The citizen changes an answer from Yes to No after entering conditional values.
- The citizen tries to submit without answering all questions.
- The citizen tries to submit without checking confirmation.
- The submit request fails after the citizen has completed a valid form.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The feature MUST support eligibility screening for `ScreeningSessionType.Registration = 1` and `ScreeningSessionType.PreDonation = 2`.
- **FR-002**: Registration and PreDonation screening MUST share one Screening page, with behavior driven by the validated `sessionType`.
- **FR-003**: The feature MUST read `sessionType`, optional `isForFemaleOnly`, optional `source`, and optional `donationIntentId` from the page query parameters.
- **FR-004**: The feature MUST validate `sessionType` against the supported `ScreeningSessionType` enum values and MUST NOT rely on numeric literals in UI or component logic.
- **FR-005**: When `sessionType` is missing or invalid, the feature MUST show a localized error state, MUST NOT call the questions API, and MUST NOT redirect automatically.
- **FR-006**: The feature MUST validate `donationIntentId` when provided and treat non-numeric, zero, or negative values as invalid.
- **FR-007**: The feature MUST treat `source=donationIntent` as the signal that PreDonation screening was launched from a donation intent flow.
- **FR-008**: `donationIntentId` MUST be required when `sessionType=PreDonation` and `source=donationIntent`; if it is missing or invalid, the feature MUST show a localized invalid-context error and MUST NOT call the questions API.
- **FR-009**: Unsupported `source` values MUST be ignored unless they are used with `sessionType=PreDonation` and would otherwise imply donation intent context.
- **FR-010**: The feature MUST default `isForFemaleOnly` to false when it is missing or not explicitly true.
- **FR-011**: The feature MUST always load screening questions from the backend for the selected session type and female-only flag after query context is valid.
- **FR-012**: The feature MUST display loaded questions sorted by `displayOrder`.
- **FR-013**: The feature MUST allow each question to be answered with Yes or No only.
- **FR-014**: The feature MUST require an answer for every displayed question before submission.
- **FR-015**: The feature MUST show an additional text field when a question is answered Yes and the question requires additional text.
- **FR-016**: The feature MUST require additional text when it is visible for a Yes answer.
- **FR-017**: The feature MUST enforce a 500-character maximum length for additional text.
- **FR-018**: The feature MUST show a date field when a question is answered Yes and the question requires a conditional date value.
- **FR-019**: The feature MUST require the conditional date value when it is visible for a Yes answer.
- **FR-020**: Conditional date values MUST be valid dates and MUST reject future dates by default unless backend question metadata later specifies a different rule.
- **FR-021**: The feature MUST clear conditional additional text and conditional date values when the related answer changes to No.
- **FR-022**: The feature MUST require the citizen to confirm the accuracy of the entered information before submission.
- **FR-023**: The feature MUST submit the selected session type, optional donation intent ID, and normalized answers to the screening submit contract.
- **FR-024**: The feature MUST trim additional text before submission and submit empty conditional text as null.
- **FR-025**: The feature MUST submit conditional date values only when required by the selected Yes answer; otherwise they MUST be null.
- **FR-026**: On successful Registration screening, the feature MUST navigate the citizen to `/user/dashboard`.
- **FR-027**: On successful PreDonation screening, the feature MUST navigate the citizen to `/user/dashboard` for now; the spec MUST allow a donation-intent-specific route to replace this once finalized.
- **FR-028**: When the submit response indicates deferred or ineligible status and includes enough result details, the feature MUST show a localized result message before navigation.
- **FR-029**: On load or submit failure, the feature MUST show a localized error message and avoid console logging.
- **FR-030**: The feature MUST be implemented in the frontend only; backend APIs are external contracts and backend implementation is out of scope.
- **FR-031**: The feature MUST follow the approved Auth Golden Reference during planning and implementation without copying Auth business logic or documented Auth exceptions.
- **FR-032**: The old Screening feature MUST be used as a requirements reference only and MUST NOT be copied as architecture or code.

### Localization Requirements *(mandatory for user-facing UI)*

- **L10N-001**: All user-facing labels, buttons, placeholders, table headers, validation messages, empty states, success messages, error messages, dialogs, alt text, and aria labels MUST use translation keys.
- **L10N-002**: Translation keys MUST be added to both `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`.
- **L10N-003**: Arabic and English translation key structures MUST remain aligned.
- **L10N-004**: UI behavior MUST be valid in both RTL and LTR layouts.
- **L10N-005**: Logic MUST use enums/constants and MUST NOT depend on Arabic or English display strings.
- **L10N-006**: API-provided Arabic and English question text may be displayed as content, but fallback labels and validation messages MUST use translation keys.
- **L10N-007**: The feature MUST include translation coverage for page titles, Yes/No labels, confirmation text, submit button, empty state, loading failure, submission failure, required-answer validation, required-additional-text validation, and required-date validation.
- **L10N-008**: Screening translation keys MUST use the `Screening-Keys` group and MUST be added to both `src/assets/i18n/ar.json` and `src/assets/i18n/en.json` during implementation.
- **L10N-009**: The feature MUST include localized messages for invalid session context, invalid donation-intent context, additional-text max length, invalid date, future date, deferred result, and ineligible result.

### Frontend API Contract Assumptions *(include if feature integrates with APIs)*

- **API-001**: Backend APIs are external contracts; this feature MUST NOT require backend implementation tasks.
- **API-002**: The frontend assumes a questions contract that accepts `sessionType` and `isForFemaleOnly` and returns a list of screening questions.
- **API-003**: Each question response includes an ID, Arabic text, English text, session type, display order, female-only flag, conditional additional-text flag, conditional date flag, and optional Arabic/English labels for conditional fields.
- **API-004**: The frontend assumes a submit contract that accepts session type, optional donation intent ID, and an array of answers with question ID, boolean answer, optional additional text, and optional conditional date value.
- **API-005**: The submit response includes `resultEligibilityStatus`.
- **API-006**: The submit response may include screening session ID, session type, profile-completion state, creation timestamp, saved answers count, optional `nextEligibleDate`, and optional `deferralReason`.
- **API-007**: API failures may include validation or generic errors; the frontend will display localized user-safe messages rather than raw backend text unless an approved localized error mapping exists.

### Key Entities *(include if feature involves data)*

- **Screening Session Type**: The supported screening context. Known values are `Registration = 1` and `PreDonation = 2`; display and branching logic use enum names, not numeric literals.
- **Screening Question**: A question presented to the citizen, including localized text, display order, session type, female-only applicability, and conditional field requirements.
- **Screening Answer**: A citizen's response to one question, including question ID, Yes/No answer, optional additional text, and optional conditional date value.
- **Screening Submission**: The full payload submitted for one screening session, including session type, optional donation intent ID, and all answers.
- **Screening Result**: The response returned after submission, including `resultEligibilityStatus` and any optional result details such as `nextEligibleDate` or `deferralReason`.
- **Screening Form State**: The frontend state for answers, confirmation, validation, loading, submission, and error display.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A citizen can complete a valid Registration screening from page entry to `/user/dashboard` navigation in under 3 minutes when questions load successfully.
- **SC-002**: A citizen can complete a valid PreDonation screening from page entry to result display if needed and `/user/dashboard` navigation in under 3 minutes when questions load successfully.
- **SC-003**: 100% of displayed questions must have a selected Yes/No answer before submission is allowed.
- **SC-004**: 100% of visible conditional fields required by Yes answers must be completed before submission is allowed.
- **SC-005**: 100% of user-facing static text introduced by this feature uses `Screening-Keys` entries with matching Arabic and English translation keys.
- **SC-006**: The feature prevents submission for missing or invalid session context in all tested invalid query-parameter scenarios.
- **SC-007**: Changing an answer from Yes to No clears previously entered conditional values in all tested question types.
- **SC-008**: Additional text longer than 500 characters is rejected in all tested conditional-text scenarios.
- **SC-009**: Future dates are rejected in all tested conditional-date scenarios unless backend metadata later defines a different valid-date rule.
- **SC-010**: No backend files are changed as part of this frontend feature.

## Assumptions

- The feature is available only to authenticated citizen users through existing application routing and guards.
- Registration screening success navigates to `/user/dashboard`.
- PreDonation screening success navigates to `/user/dashboard` for now; a donation-intent-specific route can replace this when finalized.
- `isForFemaleOnly` defaults to false when missing or not explicitly true.
- If no questions are returned, the feature shows a localized empty state and does not allow answer submission.
- Backend API changes are out of scope; API gaps must be documented as assumptions or follow-up backend contract questions.
- The new implementation will follow the Auth Golden Reference architecture during planning and implementation.
- The old Screening feature is a requirements reference only and is not a source for copying code or architecture.
