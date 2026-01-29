/**
 * Secure API Credentials Storage
 * 
 * IMPORTANT SECURITY NOTES:
 * 1. Credentials are stored in localStorage with base64 encoding (NOT encryption)
 * 2. For production, implement proper encryption with a backend service
 * 3. NEVER send sensitive credentials through unsecured channels
 * 4. Always use HTTPS in production
 * 5. Consider using secure HTTP-only cookies on the backend instead
 * 
 * Current approach is suitable for:
 * - Development environments
 * - Demo applications
 * - Testing purposes
 * 
 * Production approach should:
 * - Never store tokens in localStorage
 * - Use backend API to securely store encrypted credentials
 * - Implement rotation and expiration policies
 * - Audit all credential access
 */

export interface StoredCredentials {
  snyk?: {
    apiToken: string
    orgId: string
    encryptedAt: string
  }
  jira?: {
    domain: string
    email: string
    apiToken: string
    encryptedAt: string
  }
}

const STORAGE_KEY = 'axion_integrations'

/**
 * Simple base64 encoding for storage (NOT encryption)
 * For production, replace with proper encryption
 */
function encodeCredentials(data: any): string {
  return btoa(JSON.stringify(data))
}

function decodeCredentials(encoded: string): any {
  try {
    return JSON.parse(atob(encoded))
  } catch {
    return null
  }
}

/**
 * Store Snyk credentials
 */
export function storeSnykCredentials(apiToken: string, orgId: string): void {
  try {
    const existing = getStoredCredentials()
    const updated: StoredCredentials = {
      ...existing,
      snyk: {
        apiToken,
        orgId,
        encryptedAt: new Date().toISOString(),
      },
    }
    const encoded = encodeCredentials(updated)
    localStorage.setItem(STORAGE_KEY, encoded)
  } catch (error) {
    console.error('Failed to store Snyk credentials:', error)
    throw new Error('Failed to store credentials securely')
  }
}

/**
 * Store Jira credentials
 */
export function storeJiraCredentials(
  domain: string,
  email: string,
  apiToken: string
): void {
  try {
    const existing = getStoredCredentials()
    const updated: StoredCredentials = {
      ...existing,
      jira: {
        domain,
        email,
        apiToken,
        encryptedAt: new Date().toISOString(),
      },
    }
    const encoded = encodeCredentials(updated)
    localStorage.setItem(STORAGE_KEY, encoded)
  } catch (error) {
    console.error('Failed to store Jira credentials:', error)
    throw new Error('Failed to store credentials securely')
  }
}

/**
 * Retrieve all stored credentials
 */
export function getStoredCredentials(): StoredCredentials {
  try {
    const encoded = localStorage.getItem(STORAGE_KEY)
    if (!encoded) return {}
    return decodeCredentials(encoded) || {}
  } catch (error) {
    console.error('Failed to retrieve credentials:', error)
    return {}
  }
}

/**
 * Get Snyk credentials
 */
export function getSnykCredentials() {
  const credentials = getStoredCredentials()
  return credentials.snyk || null
}

/**
 * Get Jira credentials
 */
export function getJiraCredentials() {
  const credentials = getStoredCredentials()
  return credentials.jira || null
}

/**
 * Check if Snyk is connected
 */
export function isSnykConnected(): boolean {
  return getSnykCredentials() !== null
}

/**
 * Check if Jira is connected
 */
export function isJiraConnected(): boolean {
  return getJiraCredentials() !== null
}

/**
 * Remove Snyk credentials
 */
export function removeSnykCredentials(): void {
  try {
    const existing = getStoredCredentials()
    const { snyk, ...updated } = existing
    if (Object.keys(updated).length === 0) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      const encoded = encodeCredentials(updated)
      localStorage.setItem(STORAGE_KEY, encoded)
    }
  } catch (error) {
    console.error('Failed to remove Snyk credentials:', error)
  }
}

/**
 * Remove Jira credentials
 */
export function removeJiraCredentials(): void {
  try {
    const existing = getStoredCredentials()
    const { jira, ...updated } = existing
    if (Object.keys(updated).length === 0) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      const encoded = encodeCredentials(updated)
      localStorage.setItem(STORAGE_KEY, encoded)
    }
  } catch (error) {
    console.error('Failed to remove Jira credentials:', error)
  }
}

/**
 * Clear all credentials (logout)
 */
export function clearAllCredentials(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear credentials:', error)
  }
}
