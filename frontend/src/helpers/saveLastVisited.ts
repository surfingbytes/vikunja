import {SENSITIVE_QUERY_PARAMS} from '@/helpers/sensitiveQueryParams'

const LAST_VISITED_KEY = 'lastVisited'
const LAST_VISITED_PAGE_KEY = 'lastVisitedPage'

function sanitizeQuery(query: object) {
	return Object.fromEntries(
		Object.entries(query).filter(([key]) => !SENSITIVE_QUERY_PARAMS.includes(key)),
	)
}

export const saveLastVisited = (name: string | undefined, params: object, query: object) => {
	if (typeof name === 'undefined') {
		return
	}

	localStorage.setItem(LAST_VISITED_KEY, JSON.stringify({name, params, query: sanitizeQuery(query)}))
}

export const getLastVisited = () => {
	const lastVisited = localStorage.getItem(LAST_VISITED_KEY)
	if (lastVisited === null) {
		return null
	}

	return JSON.parse(lastVisited)
}

export const clearLastVisited = () => {
	return localStorage.removeItem(LAST_VISITED_KEY)
}

export const saveLastVisitedPage = (name: string | undefined, params: object, query: object) => {
	if (typeof name === 'undefined') {
		return
	}

	localStorage.setItem(LAST_VISITED_PAGE_KEY, JSON.stringify({name, params, query: sanitizeQuery(query)}))
}

export const getLastVisitedPage = () => {
	const lastVisited = localStorage.getItem(LAST_VISITED_PAGE_KEY)
	if (lastVisited === null) {
		return null
	}

	return JSON.parse(lastVisited)
}
