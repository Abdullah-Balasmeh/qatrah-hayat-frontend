---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Angular app lives at repository root.
- Feature code lives under `src/app/features/[feature-name]/`.
- Shared reusable UI lives under `src/app/shared/`.
- App-wide services, constants, guards, interceptors, enums, and utilities live under `src/app/core/`.
- Translation files live in `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`.
- Feature tests, when added, should use the existing Angular test setup and colocate with the relevant Angular files unless the plan specifies otherwise.

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit-tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your feature):

- [ ] T004 Create feature route file in `src/app/features/[feature-name]/[feature-name].routes.ts`
- [ ] T005 [P] Create domain models/enums/repository contract in `src/app/features/[feature-name]/domain/`
- [ ] T006 [P] Create request/response DTOs in `src/app/features/[feature-name]/data/dtos/`
- [ ] T007 [P] Create pure mapper functions in `src/app/features/[feature-name]/data/mappers/`
- [ ] T008 Create API service and repository implementation in `src/app/features/[feature-name]/data/`
- [ ] T009 Wire repository contract to implementation with Angular DI providers
- [ ] T010 Create facade/store/view-model foundations in `src/app/features/[feature-name]/presentation/`
- [ ] T011 Add translation key skeletons to both `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T012 [P] [US1] Component/facade test for [user journey] in `src/app/features/[feature-name]/...`
- [ ] T013 [P] [US1] Mapper/repository test for [data flow] in `src/app/features/[feature-name]/...`

### Implementation for User Story 1

- [ ] T014 [P] [US1] Create/extend page component in `src/app/features/[feature-name]/presentation/pages/[page-name]/`
- [ ] T015 [P] [US1] Create/extend UI component in `src/app/features/[feature-name]/presentation/components/[component-name]/`
- [ ] T016 [US1] Implement typed reactive form/view-model in `src/app/features/[feature-name]/presentation/view-models/`
- [ ] T017 [US1] Add meaningful facade action and store state updates in `src/app/features/[feature-name]/presentation/`
- [ ] T018 [US1] Add validation and localized error/success display
- [ ] T019 [US1] Add Arabic and English translation values for this story

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T020 [P] [US2] Component/facade test for [user journey] in `src/app/features/[feature-name]/...`
- [ ] T021 [P] [US2] Mapper/repository test for [data flow] in `src/app/features/[feature-name]/...`

### Implementation for User Story 2

- [ ] T022 [P] [US2] Create/extend domain model or view-model in `src/app/features/[feature-name]/...`
- [ ] T023 [US2] Implement facade action and UI flow for [capability]
- [ ] T024 [US2] Integrate with User Story 1 components if needed without breaking independent testability
- [ ] T025 [US2] Add Arabic and English translation values for this story

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T026 [P] [US3] Component/facade test for [user journey] in `src/app/features/[feature-name]/...`
- [ ] T027 [P] [US3] Mapper/repository test for [data flow] in `src/app/features/[feature-name]/...`

### Implementation for User Story 3

- [ ] T028 [P] [US3] Create/extend feature component/page in `src/app/features/[feature-name]/presentation/`
- [ ] T029 [US3] Implement facade action and state updates for [capability]
- [ ] T030 [US3] Add Arabic and English translation values for this story

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests if requested, colocated with the relevant Angular files
- [ ] TXXX Security hardening
- [ ] TXXX Verify DTOs do not leak into pages/components
- [ ] TXXX Verify data layer does not import from presentation
- [ ] TXXX Verify stores do not perform HTTP calls or inject API services
- [ ] TXXX Verify translation keys exist in both Arabic and English files
- [ ] TXXX Verify RTL/LTR behavior for affected pages/components
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Domain models and DTOs before mappers/repositories
- API services and repository implementations before dependent facade actions
- Facade/store flow before page/component integration
- Core implementation before localization and polish verification
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Component/facade test for [user journey] in src/app/features/[feature-name]/..."
Task: "Mapper/repository test for [data flow] in src/app/features/[feature-name]/..."

# Launch independent feature files for User Story 1 together:
Task: "Create/extend page component in src/app/features/[feature-name]/presentation/pages/[page-name]/"
Task: "Create/extend UI component in src/app/features/[feature-name]/presentation/components/[component-name]/"
Task: "Add Arabic and English translation values for this story"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
