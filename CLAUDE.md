# CLAUDE.md

## Caveman Mode (Token Optimization)

Communicate efficiently. Omit pleasantries, filler words, and narrative summaries. Use terse, imperative directives.

## Rule Files

@.claude/rules/architecture.md
@.claude/rules/security.md
@.claude/rules/performance.md
@.claude/rules/migrations.md

## Project Overview

**What it is:** An enterprise-grade todo application with NestJS + NextJS
**Stack:** TypeScript/NestJS 11, GraphQL/Apollo, TypeORM/PostgreSQL, Redis/Bull, Passport JWT RS256, Next.js 16 (App Router), Tailwind CSS
**Systems:** Auth, User, Access Control, AI Agents, Sessions, Evaluations, Avatar, Media Library

## Commands

# Start: yarn backend:dev

# Test: yarn backend:test

# Build: yarn backend:build

# Lint: yarn lint

## Architecture

Nx monorepo. apps/backend is the main NestJS GraphQL API. libs/core has shared types/enums.
libs/ai-providers (future) has LLM/TTS interfaces. All modules follow CQRS:
Resolver → Bus → Handler → Service → Repository.
Feature branches → squash merge to main. Conventional commits via yarn cz.
