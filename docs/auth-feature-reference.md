# Auth Feature Reference

The Auth feature is the golden reference for all frontend features.

Reference path:

src/app/features/auth

Every new feature must follow the same architecture style used in Auth.

## Auth Structure

features/auth/
├── data/
│   ├── dtos/
│   ├── mappers/
│   ├── repositories_impl/
│   ├── services/
│   └── storage/
│
├── domain/
│   ├── enums/
│   ├── models/
│   └── repositories/
│
├── presentation/
│   ├── components/
│   ├── facades/
│   ├── pages/
│   ├── store/
│   └── view-models/
│
└── auth.routes.ts

## Copy From Auth

New features should copy the Auth architectural style:

- folder structure
- naming style
- DTO/model separation
- mapper pattern
- repository interface pattern
- repository implementation pattern
- API service pattern
- facade pattern
- store pattern
- page/component separation
- route style

## Do Not Copy Auth Business Logic

Do not copy:

- login logic
- register logic
- password logic
- OTP logic
- token logic
- session storage logic
- auth guards unless the new feature needs guards

## Rule

Auth is a pattern reference, not a copy-paste source.
