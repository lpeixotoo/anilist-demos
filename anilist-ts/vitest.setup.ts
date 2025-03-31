import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();
});

beforeAll(() => {
	const matchingMediaQueries: string[] = [];

	Object.defineProperty(window, "IntersectionObserver", {
		writable: true,
		value: vi.fn().mockImplementation(() => ({
			observe: vi.fn(),
			unobserve: vi.fn(),
			disconnect: vi.fn(),
		})),
	});

	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: matchingMediaQueries.includes(query),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		})),
	});

	Object.defineProperty(window, "ResizeObserver", {
		writable: true,
		value: vi.fn().mockImplementation(() => ({
			observe: vi.fn(),
			unobserve: vi.fn(),
			disconnect: vi.fn(),
		})),
	});
});
