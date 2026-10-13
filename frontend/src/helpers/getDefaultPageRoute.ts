import type {RouteLocationRaw} from 'vue-router'

import {DEFAULT_PAGE} from '@/constants/defaultPage'
import {ensureProject} from '@/client/queries/projects'
import {getLastVisitedPage} from '@/helpers/saveLastVisited'
import {useAuthStore} from '@/stores/auth'

export async function getDefaultPageRoute(): Promise<RouteLocationRaw | undefined> {
	const authStore = useAuthStore()
	const defaultPage = authStore.settings.frontend_settings.default_page

	switch (defaultPage) {
		case DEFAULT_PAGE.UPCOMING:
			return {name: 'tasks.range'}
		case DEFAULT_PAGE.DEFAULT_PROJECT: {
			const projectId = authStore.settings.default_project_id
			if (projectId) {
				try {
					await ensureProject(projectId)
					return {name: 'project.index', params: {projectId}}
				} catch {
					return undefined
				}
			}
			return undefined
		}
		case DEFAULT_PAGE.LAST_VISITED: {
			const last = getLastVisitedPage()
			if (last) {
				return {name: last.name, params: last.params, query: last.query}
			}
			return undefined
		}
		default:
			return undefined
	}
}
