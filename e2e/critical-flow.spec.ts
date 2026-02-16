import { test, expect } from '@playwright/test'

test.describe('Critical flow: Home → Course → Enrollment', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/LeanMultiverse|Build in the Multiverse/i)
  })

  test('course page loads and enrollment CTA is present', async ({ page }) => {
    await page.goto('/courses/ai-ml-foundation')
    await expect(page).toHaveURL(/\/courses\/ai-ml-foundation/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/AI|ML|Career|Foundation/i)
    const enrollCta = page.getByRole('button', { name: /enroll now/i })
    await expect(enrollCta).toBeVisible({ timeout: 10000 })
  })

  test('book webinar page loads and form is present', async ({ page }) => {
    await page.goto('/book-webinar')
    await expect(page).toHaveTitle(/webinar|book/i)
    await expect(page.getByPlaceholder(/email|name|phone/i).first()).toBeVisible({ timeout: 10000 })
  })
})
