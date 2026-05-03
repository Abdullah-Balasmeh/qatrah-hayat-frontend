# Feature Architecture Instructions

## Golden Reference
Use `src/app/features/auth` as the golden reference for feature architecture.

Copy the structure and patterns from Auth, not Auth business logic. Do not modify the Auth feature while using it as a reference.

## Required Feature Structure
New features should follow this shape when applicable:

```text
features/<feature-name>/
  <feature-name>.routes.ts

  data/
    dtos/
    mappers/
    repositories_impl/
    services/
    storage/  # optional; only when persistence is needed

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

Only create folders that the feature actually needs.
Do not create an empty `storage/` folder by default; use it only for local storage, session storage, cache, or persistence.

## Layering Rules
- `domain` owns business-facing models, enums, and repository contracts.
- `data` owns backend DTOs, API services, mappers, repository implementations, and feature storage.
- `presentation` owns pages, components, facades, stores, and form view-models.
- Domain code should not import from data or presentation.
- API DTOs should not leak into presentation components.
- Presentation should work through facades or feature services instead of calling API services directly, except for narrow established lookup patterns.

## Dependency Injection Rules
- Repository contracts must be wired to their implementations using Angular DI providers.
- Providers can be registered in `app.config.ts` for app-wide features.
- Providers can be registered at route-level for feature-scoped dependencies.
- Prefer route-level providers for feature-specific repositories unless the dependency is truly app-wide.
- Follow the existing Auth provider pattern when app-wide wiring is appropriate.

## Naming Conventions
- Use kebab-case for folders and files.
- Use `SomethingDto` for API DTO interfaces in `data/dtos`.
- Use `SomethingModel` for domain models in `domain/models`.
- Use mapper functions named `mapXToY`.
- Use abstract repository contracts in `domain/repositories`.
- Use concrete repository implementations in `data/repositories_impl`.
- Use `FeatureApiService`, `FeatureFacade`, and `FeatureStore` naming.
- Use typed reactive form models in `presentation/view-models`.
- Use route constants like `FEATURE_ROUTES`.

## Data Layer Rules
- Request DTOs and response DTOs must stay inside `data/dtos`.
- DTOs should not be used directly by pages or components.
- Keep raw HTTP calls inside `data/services`.
- Use `ApiService` and `API_ENDPOINTS` for API access.
- Convert domain request models to DTOs before API calls.
- Convert response DTOs to domain models before returning from repositories.
- Repository methods should return domain models, not DTOs.
- Keep backend-specific naming and payload details in DTOs and mappers.

## Mapper Rules
- Mappers should be small pure functions.
- Mappers should not perform HTTP calls.
- Mappers should not mutate input objects.
- Mappers should convert between DTOs and domain models.
- View-models and form values belong in `presentation/view-models`.
- Prefer mapping form values to domain request models in the presentation layer or facade.
- Avoid data-layer mappers importing from presentation.
- Auth currently has a legacy exception where a form-value mapper exists under `data/mappers`; do not repeat this pattern in new features.
- New features should keep data independent from presentation.

## Presentation Layer Rules
- Pages should compose feature components and stay thin when possible.
- Pages should usually coordinate UI through facades and stores.
- Components should use shared UI controls from `src/app/shared/ui`.
- Use reactive forms with typed form view-models.
- Use facades to coordinate use cases, loading state, error state, navigation side effects, and store updates.
- Facades should expose meaningful application actions/use cases.
- Do not expose raw HTTP-style CRUD details directly to components when a clearer use-case method name exists.
- Components should call facade methods, not repositories or API services.
- Use stores with private writable signals and public readonly/computed state.
- Stores should manage state only.
- Stores should avoid direct HTTP calls and should not inject API services directly.
- API access should go through the repository/facade flow.
- Pages and components should not call repositories or API services directly.
- Existing Auth exception: `CitizenSignUpFormComponent` directly injects `CitizenService`.
- Treat that as an existing exception, not a pattern to copy.
- New features should avoid direct service injection in components unless explicitly approved.
- Do not hardcode visible UI text. Use translation keys in templates and component-driven messages.
- Components and pages must work correctly in Arabic and English, including RTL/LTR layout behavior.
- When adding translation keys, add them to both `src/assets/i18n/ar.json` and `src/assets/i18n/en.json`.
- Do not add keys to only one language file; keep Arabic and English keys structurally aligned.

## Routing Rules
- Put feature routes in `<feature-name>.routes.ts`.
- Use standalone lazy loading with `loadComponent`.
- Let parent app routes own layout and guard decisions when possible.
- Add route-level providers only when the dependency should be scoped to that feature route tree.

## Auth-Specific Logic Not To Copy
- Login, register, forgot-password, reset-password, and OTP flows.
- Token handling, remember-me behavior, and session restoration.
- Current-user storage keys and storage behavior.
- Citizen/staff login branching.
- Role-based redirect destinations.
- Profile-completion redirects to screening.
- Auth guards unless the new feature truly needs guarded behavior.
- Civil status lookup behavior unless the feature specifically depends on it.

## Existing Auth Exceptions

The Auth feature is the golden reference, but not every small detail should be repeated.

Known exception:
- Auth has a form-value mapper inside data/mappers that imports from presentation/view-models.
- New features should avoid this.
- Data layer must not import from presentation.
- Map form values to domain request models inside presentation/facades or a presentation mapper if needed.

## Verification
- Run relevant Angular build/test commands when practical.
- For feature UI changes, verify translation keys exist in both Arabic and English.
- Check that forms, validation messages, empty states, success messages, and error messages are localized.
- Confirm RTL/LTR behavior for pages, tables, forms, buttons, and responsive layouts.
