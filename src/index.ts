/**
 * stable-frontend
 * Agent-native primitives and guardrails for robust frontend development.
 */

export interface VersionInfo {
  name: string;
  version: string;
}

export function hello(): string {
  return "Hello from stable-frontend!";
}

export const info: VersionInfo = {
  name: "stable-frontend",
  version: "1.0.0",
};
