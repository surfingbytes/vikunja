export const DEFAULT_PAGE = {
	OVERVIEW: 'overview',
	UPCOMING: 'upcoming',
	DEFAULT_PROJECT: 'defaultProject',
	LAST_VISITED: 'lastVisited',
} as const

export type DefaultPage = typeof DEFAULT_PAGE[keyof typeof DEFAULT_PAGE]

const DEFAULT_PAGE_VALUES = new Set<string>(Object.values(DEFAULT_PAGE))

export function normalizeDefaultPage(value: unknown): DefaultPage | undefined {
	if (typeof value === 'string' && DEFAULT_PAGE_VALUES.has(value)) {
		return value as DefaultPage
	}
	return undefined
}
