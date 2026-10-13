import {test, expect} from '../../support/fixtures'

test('CSV detection, preview and import persist after reload', async ({authenticatedPage: page, apiContext, userToken}) => {
	await page.goto('/migrate/csv')
	await page.locator('input[type=file]').setInputFiles({name: 'tasks.csv', mimeType: 'text/csv', buffer: Buffer.from('title,description,project\nImported CSV task,Stored description,CSV project\n')})
	await expect(page.locator('.preview-tasks')).toContainText('Imported CSV task')
	await page.getByRole('button', {name: 'Import Tasks', exact: true}).click()
	await expect(page.locator('.success-step [role=status]')).toContainText('The import from CSV has finished', {timeout: 20000})
	await expect(page.locator('.success-step .message.danger')).toHaveCount(0)
	// Prefer Overview nav so a lastVisited landing page does not bounce us back to /migrate.
	await page.locator('nav.menu.top-menu a').filter({hasText: 'Overview'}).click()
	await page.waitForLoadState('networkidle')
	await expect(page).toHaveURL('/')
	await page.reload()
	await expect(page.locator('.tasks')).toContainText('Imported CSV task')
	const stored = await apiContext.get('/api/v2/tasks', {headers: {Authorization: `Bearer ${userToken}`}})
	expect(stored.ok()).toBe(true)
	expect((await stored.json()).items).toContainEqual(expect.objectContaining({title: 'Imported CSV task', description: 'Stored description'}))
})
