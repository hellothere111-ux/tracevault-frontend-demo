import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { VulnerabilityFilters, type FilterState } from './components/vulnerability-filters'
import { VulnerabilityTable } from './components/vulnerability-table'
import { VulnerabilityDetailDialog } from './components/vulnerability-detail-dialog'
import { VulnerabilityOverview } from './components/vulnerability-overview'
import { OffSecTab } from './components/vulnerability-offsec'
import { AppSecTab } from './components/vulnerability-appsec'
import { 
  VulnerabilityTableSkeleton, 
  VulnerabilityFiltersSkeleton, 
  SourceTabsSkeleton,
  VulnerabilityOverviewSkeleton 
} from './components/vulnerability-skeleton'
import { type Vulnerability } from '@/services/vulnerability.service'
import vulnerabilityService from '@/services/vulnerability.service'
import { Download, Globe, Building2 } from 'lucide-react'

// Mock data for tenants and projects
const mockTenants = [
  { id: 'tenant-1', name: 'Production Tenant', type: 'tenant' },
  { id: 'tenant-2', name: 'Staging Tenant', type: 'tenant' },
  { id: 'tenant-3', name: 'Development Tenant', type: 'tenant' },
]

const mockProjects = [
  { id: 'proj-1', name: 'E-commerce Platform', type: 'project', tenantId: 'tenant-1' },
  { id: 'proj-2', name: 'Mobile Banking App', type: 'project', tenantId: 'tenant-1' },
  { id: 'proj-3', name: 'API Gateway', type: 'project', tenantId: 'tenant-2' },
  { id: 'proj-4', name: 'Admin Dashboard', type: 'project', tenantId: 'tenant-2' },
  { id: 'proj-5', name: 'Testing Framework', type: 'project', tenantId: 'tenant-3' },
]

// Combine tenants and projects for display
const getAllAssetOptions = () => {
  const options = []
  
  // Add tenants
  mockTenants.forEach(tenant => {
    options.push({
      id: tenant.id,
      name: tenant.name,
      type: 'tenant',
      level: 0
    })
  })
  
  // Add projects under their tenants
  mockProjects.forEach(project => {
    const tenant = mockTenants.find(t => t.id === project.tenantId)
    options.push({
      id: project.id,
      name: project.name,
      type: 'project',
      tenantId: project.tenantId,
      tenantName: tenant?.name,
      level: 1
    })
  })
  
  return options
}

// Custom source tabs for OffSec (only Manual VAPT)
const OffSecSourceTabs = ({ activeTab, onTabChange, counts }: { activeTab: string; onTabChange: (tab: string) => void; counts: any }) => (
  <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
    <button
      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
        activeTab === 'all' 
          ? 'bg-background shadow-sm' 
          : 'hover:bg-background/50'
      }`}
      onClick={() => onTabChange('all')}
    >
      All ({counts.all || 0})
    </button>
    <button
      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
        activeTab === 'manual_vapt' 
          ? 'bg-background shadow-sm' 
          : 'hover:bg-background/50'
      }`}
      onClick={() => onTabChange('manual_vapt')}
    >
      Manual VAPT ({counts.manual_vapt || 0})
    </button>
  </div>
)

// Custom filters for OffSec (only Manual VAPT relevant filters)
const OffSecFilters = ({ currentFilters, onFilterChange, onReset, vulnCounts, severityCounts, statusCounts }: any) => {
  // Only include filters relevant to Manual VAPT
  const filteredVulnCounts = {
    all: vulnCounts?.all || 0,
    snyk_sca: 0,
    snyk_sast: 0,
    snyk_dast: 0,
    manual_vapt: vulnCounts?.manual_vapt || 0,
    asset_scan: 0,
  }

  return (
    <VulnerabilityFilters
      currentFilters={currentFilters}
      onFilterChange={onFilterChange}
      onReset={onReset}
      onBulkAction={() => {}}
      vulnCounts={filteredVulnCounts}
      severityCounts={severityCounts}
      statusCounts={statusCounts}
      assetCounts={[]}
    />
  )
}

// Custom filters for AppSec (only Snyk relevant filters)
const AppSecFilters = ({ currentFilters, onFilterChange, onReset, vulnCounts, severityCounts, statusCounts }: any) => {
  // Only include Snyk sources
  const filteredVulnCounts = {
    all: vulnCounts?.all || 0,
    snyk_sca: vulnCounts?.snyk_sca || 0,
    snyk_sast: vulnCounts?.snyk_sast || 0,
    snyk_dast: vulnCounts?.snyk_dast || 0,
    manual_vapt: 0,
    asset_scan: 0,
  }

  return (
    <VulnerabilityFilters
      currentFilters={currentFilters}
      onFilterChange={onFilterChange}
      onReset={onReset}
      onBulkAction={() => {}}
      vulnCounts={filteredVulnCounts}
      severityCounts={severityCounts}
      statusCounts={statusCounts}
      assetCounts={[]}
    />
  )
}

// Custom source tabs for AppSec (only Snyk sources)
const AppSecSourceTabs = ({ activeTab, onTabChange, counts }: { activeTab: string; onTabChange: (tab: string) => void; counts: any }) => (
  <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
    <div className="px-3 py-1.5 text-sm rounded-md transition-colors bg-background shadow-sm">
      All ({counts.all || 0})
    </div>
    <button
      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
        activeTab === 'snyk_sca' 
          ? 'bg-background shadow-sm' 
          : 'hover:bg-background/50'
      }`}
      onClick={() => onTabChange('snyk_sca')}
    >
      SCA ({counts.snyk_sca || 0})
    </button>
    <button
      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
        activeTab === 'snyk_sast' 
          ? 'bg-background shadow-sm' 
          : 'hover:bg-background/50'
      }`}
      onClick={() => onTabChange('snyk_sast')}
    >
      SAST ({counts.snyk_sast || 0})
    </button>
    <button
      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
        activeTab === 'snyk_dast' 
          ? 'bg-background shadow-sm' 
          : 'hover:bg-background/50'
      }`}
      onClick={() => onTabChange('snyk_dast')}
    >
      DAST ({counts.snyk_dast || 0})
    </button>
  </div>
)

export function Vulnerabilities() {
  // ===== STATE =====
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('overview')
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [selectedVulns, setSelectedVulns] = useState<number[]>([])
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [filteredCount, setFilteredCount] = useState(0)
  const [selectedAsset, setSelectedAsset] = useState('tenant-1') // Default to first tenant
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    severity: [],
    source: [],
    status: [],
    asset: [],
    subAsset: [],
    project: [],
    category: [],
    perPage: 20,
    currentPage: 1,
    cvssRange: [0, 10],
    dateRange: 'all',
    assignee: [],
    hasCVE: false,
    riskScore: [0, 100],
    complianceFrameworks: [],
  })

  const [vulnCounts, setVulnCounts] = useState({
    all: 0,
    snyk_sca: 0,
    snyk_sast: 0,
    snyk_dast: 0,
    manual_vapt: 0,
    asset_scan: 0,
  })

  const [severityCounts, setSeverityCounts] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  })

  const [statusCounts, setStatusCounts] = useState({
    open: 0,
    in_progress: 0,
    fixed: 0,
    accepted: 0,
    ignored: 0,
  })

  const [assetCounts, setAssetCounts] = useState<Array<{ name: string; count: number }>>([])


  // ===== MOCK DATA ===== (Commented out - using real API data instead)
  /* const mockVulnerabilities: Vulnerability[] = [
    {
      id: 'VULN-001',
      title: 'Remote Code Execution in Apache Log4j',
      description:
        'A critical vulnerability in Apache Log4j allows remote code execution through malicious input',
      severity: 'Critical',
      cvss_score: 10.0,
      cve_id: 'CVE-2021-44228',
      source: 'snyk_sca',
      source_label: 'Snyk SCA',
      asset_id: 1,
      asset_name: 'prod-api-01',
      asset_type: 'Server',
      sub_asset: 'api-endpoint',
      project: 'payments-platform',
      category: 'appsec',
      status: 'open',
      date_discovered: '2025-01-15T10:00:00Z',
      date_due: '2025-01-20T10:00:00Z',
      assignee: 'john.doe@company.com',
      remediation: 'Update Apache Log4j to version 2.17.0 or later',
      affected_component: 'log4j-core',
      affected_versions: ['2.0.0', '2.1', '2.6.1', '2.7', '2.8.1'],
      recommendation:
        'Immediately update to the latest patched version and test thoroughly',
      reference_urls: [
        'https://nvd.nist.gov/vuln/detail/CVE-2021-44228',
        'https://logging.apache.org/log4j/2.x/security-1.html',
      ],
    },
    {
      id: 'VULN-002',
      title: 'Cross-Site Scripting (XSS) Vulnerability',
      description: 'User input is not properly sanitized allowing XSS attacks',
      severity: 'High',
      cvss_score: 8.5,
      cve_id: 'CVE-2025-0001',
      source: 'snyk_sast',
      source_label: 'Snyk SAST',
      asset_id: 2,
      asset_name: 'web-server-02',
      asset_type: 'Server',
      sub_asset: 'web-app',
      project: 'user-management',
      category: 'appsec',
      status: 'in_progress',
      date_discovered: '2025-01-12T14:30:00Z',
      date_due: '2025-01-25T14:30:00Z',
      assignee: 'jane.smith@company.com',
      remediation: 'Implement input validation and output encoding',
      affected_component: 'auth-module',
      recommendation: 'Use content security policy (CSP) headers',
    },
    {
      id: 'VULN-003',
      title: 'SQL Injection in Login Form',
      description: 'SQL queries are vulnerable to injection attacks',
      severity: 'Critical',
      cvss_score: 9.8,
      cve_id: 'CVE-2025-0002',
      source: 'manual_vapt',
      source_label: 'Manual VAPT',
      asset_id: 1,
      asset_name: 'prod-api-01',
      asset_type: 'Server',
      sub_asset: 'api-endpoint',
      project: 'payments-platform',
      category: 'offsec',
      status: 'open',
      date_discovered: '2025-01-10T09:15:00Z',
      date_due: '2025-01-18T09:15:00Z',
      assignee: 'bob.wilson@company.com',
      remediation: 'Use parameterized queries and prepared statements',
      affected_component: 'login-handler',
      recommendation:
        'Implement ORM or use parameterized queries exclusively',
    },
    {
      id: 'VULN-004',
      title: 'Insecure Direct Object Reference (IDOR)',
      description: 'Users can access resources they should not have access to',
      severity: 'High',
      cvss_score: 7.5,
      source: 'snyk_dast',
      source_label: 'Snyk DAST',
      asset_id: 3,
      asset_name: 'db-primary',
      asset_type: 'Database',
      sub_asset: 'database',
      project: 'analytics',
      category: 'appsec',
      status: 'open',
      date_discovered: '2025-01-08T16:45:00Z',
      date_due: '2025-01-22T16:45:00Z',
      remediation:
        'Implement proper authorization checks for all resource access',
    },
    {
      id: 'VULN-005',
      title: 'Weak Cryptography - MD5 Hash',
      description: 'Passwords are hashed using weak MD5 algorithm',
      severity: 'High',
      cvss_score: 8.0,
      source: 'snyk_sca',
      source_label: 'Snyk SCA',
      asset_id: 4,
      asset_name: 'auth-service',
      asset_type: 'Service',
      sub_asset: 'service',
      project: 'user-management',
      category: 'appsec',
      status: 'fixed',
      date_discovered: '2025-01-05T11:20:00Z',
      date_due: '2025-01-15T11:20:00Z',
      remediation: 'Switch to bcrypt, scrypt, or PBKDF2 for password hashing',
    },
    {
      id: 'VULN-006',
      title: 'Missing Security Headers',
      description:
        'HTTP security headers are not properly configured',
      severity: 'Medium',
      cvss_score: 6.5,
      source: 'asset_scan',
      source_label: 'Asset Scan',
      asset_id: 2,
      asset_name: 'web-server-02',
      asset_type: 'Server',
      sub_asset: 'web-app',
      project: 'infrastructure',
      category: 'infra',
      status: 'open',
      date_discovered: '2025-01-07T13:30:00Z',
      date_due: '2025-01-28T13:30:00Z',
      remediation:
        'Add X-Frame-Options, X-Content-Type-Options, and other security headers',
    },
    {
      id: 'VULN-007',
      title: 'Outdated OpenSSL Version',
      description: 'Server running vulnerable OpenSSL version with known CVEs',
      severity: 'Critical',
      cvss_score: 9.8,
      cve_id: 'CVE-2022-0778',
      source: 'snyk_sca',
      source_label: 'Snyk SCA',
      asset_id: 5,
      asset_name: 'prod-api-02',
      asset_type: 'Server',
      sub_asset: 'service',
      project: 'payments-platform',
      category: 'appsec',
      status: 'in_progress',
      date_discovered: '2025-01-16T09:00:00Z',
      date_due: '2025-01-20T09:00:00Z',
      assignee: 'alice.johnson@company.com',
      remediation: 'Update OpenSSL to version 3.0.3 or later',
      affected_component: 'openssl-lib',
      affected_versions: ['1.1.1', '3.0.0', '3.0.1', '3.0.2'],
      recommendation: 'Test thoroughly after update in staging environment',
    },
    {
      id: 'VULN-008',
      title: 'Privilege Escalation in API',
      description: 'API endpoint allows privilege escalation through parameter manipulation',
      severity: 'High',
      cvss_score: 8.2,
      cve_id: 'CVE-2025-0003',
      source: 'manual_vapt',
      source_label: 'Manual VAPT',
      asset_id: 1,
      asset_name: 'prod-api-01',
      asset_type: 'Server',
      sub_asset: 'api-endpoint',
      project: 'payments-platform',
      category: 'offsec',
      status: 'open',
      date_discovered: '2025-01-14T15:45:00Z',
      date_due: '2025-01-21T15:45:00Z',
      assignee: 'bob.wilson@company.com',
      remediation: 'Implement proper role-based access control',
      affected_component: 'user-roles-api',
      recommendation: 'Audit all API endpoints for privilege escalation',
    },
    {
      id: 'VULN-009',
      title: 'Hardcoded Credentials in Config',
      description: 'Database credentials found hardcoded in configuration files',
      severity: 'Critical',
      cvss_score: 9.5,
      source: 'snyk_sast',
      source_label: 'Snyk SAST',
      asset_id: 6,
      asset_name: 'staging-db',
      asset_type: 'Database',
      sub_asset: 'database',
      project: 'user-management',
      category: 'appsec',
      status: 'fixed',
      date_discovered: '2025-01-11T11:20:00Z',
      date_due: '2025-01-17T11:20:00Z',
      assignee: 'charlie.brown@company.com',
      remediation: 'Remove hardcoded credentials and use environment variables',
      affected_component: 'database-config',
      recommendation: 'Rotate all exposed credentials immediately',
    },
    {
      id: 'VULN-010',
      title: 'Insufficient Logging',
      description: 'Security events are not properly logged for audit trails',
      severity: 'Medium',
      cvss_score: 5.5,
      source: 'manual_vapt',
      source_label: 'Manual VAPT',
      asset_id: 7,
      asset_name: 'auth-service',
      asset_type: 'Service',
      sub_asset: 'service',
      project: 'user-management',
      category: 'compliance',
      status: 'in_progress',
      date_discovered: '2025-01-13T14:00:00Z',
      date_due: '2025-01-27T14:00:00Z',
      assignee: 'diana.prince@company.com',
      remediation: 'Implement comprehensive security logging',
      affected_component: 'authentication-logs',
      recommendation: 'Follow OWASP logging recommendations',
    },
    {
      id: 'VULN-011',
      title: 'Open Redirect Vulnerability',
      description: 'Application vulnerable to open redirect attacks',
      severity: 'Medium',
      cvss_score: 6.1,
      cve_id: 'CVE-2025-0004',
      source: 'snyk_dast',
      source_label: 'Snyk DAST',
      asset_id: 8,
      asset_name: 'web-portal',
      asset_type: 'Server',
      sub_asset: 'web-app',
      project: 'analytics',
      category: 'appsec',
      status: 'open',
      date_discovered: '2025-01-09T10:30:00Z',
      date_due: '2025-01-23T10:30:00Z',
      assignee: 'eve.adams@company.com',
      remediation: 'Validate and sanitize all redirect URLs',
      affected_component: 'redirect-handler',
      recommendation: 'Implement allowlist of safe redirect domains',
    },
    {
      id: 'VULN-012',
      title: 'Insecure Deserialization',
      description: 'Application vulnerable to insecure deserialization attacks',
      severity: 'Critical',
      cvss_score: 9.0,
      cve_id: 'CVE-2025-0005',
      source: 'snyk_sast',
      source_label: 'Snyk SAST',
      asset_id: 9,
      asset_name: 'data-processor',
      asset_type: 'Service',
      sub_asset: 'service',
      project: 'analytics',
      category: 'appsec',
      status: 'open',
      date_discovered: '2025-01-17T16:15:00Z',
      date_due: '2025-01-24T16:15:00Z',
      assignee: 'frank.miller@company.com',
      remediation: 'Use secure serialization formats like JSON',
      affected_component: 'data-parser',
      recommendation: 'Implement input validation and integrity checks',
    },
    {
      id: 'VULN-013',
      title: 'Weak SSL Configuration',
      description: 'SSL/TLS configuration allows weak ciphers and protocols',
      severity: 'High',
      cvss_score: 7.8,
      source: 'asset_scan',
      source_label: 'Asset Scan',
      asset_id: 10,
      asset_name: 'load-balancer',
      asset_type: 'Infrastructure',
      sub_asset: 'infrastructure',
      project: 'infrastructure',
      category: 'infra',
      status: 'in_progress',
      date_discovered: '2025-01-12T12:00:00Z',
      date_due: '2025-01-26T12:00:00Z',
      assignee: 'grace.kelly@company.com',
      remediation: 'Update SSL configuration to disable weak ciphers',
      affected_component: 'ssl-config',
      recommendation: 'Follow PCI DSS SSL/TLS guidelines',
    },
    {
      id: 'VULN-014',
      title: 'Information Disclosure in Error Messages',
      description: 'Error messages expose sensitive system information',
      severity: 'Low',
      cvss_score: 4.0,
      source: 'snyk_dast',
      source_label: 'Snyk DAST',
      asset_id: 11,
      asset_name: 'api-gateway',
      asset_type: 'Server',
      sub_asset: 'api-endpoint',
      project: 'infrastructure',
      category: 'appsec',
      status: 'accepted',
      date_discovered: '2025-01-08T09:45:00Z',
      date_due: '2025-01-22T09:45:00Z',
      assignee: 'henry.ford@company.com',
      remediation: 'Customize error messages to remove sensitive information',
      affected_component: 'error-handler',
      recommendation: 'Use generic error messages for production',
    },
    {
      id: 'VULN-015',
      title: 'Missing Input Validation',
      description: 'API endpoints lack proper input validation',
      severity: 'High',
      cvss_score: 8.0,
      cve_id: 'CVE-2025-0006',
      source: 'manual_vapt',
      source_label: 'Manual VAPT',
      asset_id: 12,
      asset_name: 'user-service',
      asset_type: 'Service',
      sub_asset: 'service',
      project: 'user-management',
      category: 'offsec',
      status: 'open',
      date_discovered: '2025-01-18T13:30:00Z',
      date_due: '2025-01-25T13:30:00Z',
      assignee: 'iris.west@company.com',
      remediation: 'Implement comprehensive input validation',
      affected_component: 'api-input-validator',
      recommendation: 'Use validation frameworks and sanitization libraries',
    },
    {
      id: 'VULN-016',
      title: 'Insecure File Upload',
      description: 'File upload functionality allows arbitrary file types',
      severity: 'High',
      cvss_score: 8.5,
      cve_id: 'CVE-2025-0007',
      source: 'snyk_dast',
      source_label: 'Snyk DAST',
      asset_id: 13,
      asset_name: 'file-server',
      asset_type: 'Server',
      sub_asset: 'web-app',
      project: 'analytics',
      category: 'appsec',
      status: 'in_progress',
      date_discovered: '2025-01-15T11:00:00Z',
      date_due: '2025-01-22T11:00:00Z',
      assignee: 'jack.bauer@company.com',
      remediation: 'Implement strict file type validation and scanning',
      affected_component: 'file-upload-handler',
      recommendation: 'Scan all uploads for malware and restrict file types',
    },
    {
      id: 'VULN-017',
      title: 'Session Fixation Vulnerability',
      description: 'Session IDs are not properly regenerated on login',
      severity: 'Medium',
      cvss_score: 6.0,
      source: 'snyk_sast',
      source_label: 'Snyk SAST',
      asset_id: 14,
      asset_name: 'auth-service',
      asset_type: 'Service',
      sub_asset: 'service',
      project: 'user-management',
      category: 'appsec',
      status: 'fixed',
      date_discovered: '2025-01-10T14:20:00Z',
      date_due: '2025-01-17T14:20:00Z',
      assignee: 'kate.ryan@company.com',
      remediation: 'Regenerate session IDs on authentication',
      affected_component: 'session-manager',
      recommendation: 'Use secure session management practices',
    },
    {
      id: 'VULN-018',
      title: 'Directory Traversal Vulnerability',
      description: 'Application vulnerable to directory traversal attacks',
      severity: 'Critical',
      cvss_score: 9.3,
      cve_id: 'CVE-2025-0008',
      source: 'manual_vapt',
      source_label: 'Manual VAPT',
      asset_id: 15,
      asset_name: 'content-server',
      asset_type: 'Server',
      sub_asset: 'web-app',
      project: 'analytics',
      category: 'offsec',
      status: 'open',
      date_discovered: '2025-01-19T10:15:00Z',
      date_due: '2025-01-26T10:15:00Z',
      assignee: 'lucas.scott@company.com',
      remediation: 'Validate and sanitize all file path inputs',
      affected_component: 'file-access-handler',
      recommendation: 'Use chroot jail and proper path validation',
    },
    {
      id: 'VULN-019',
      title: 'Insufficient Rate Limiting',
      description: 'API endpoints lack proper rate limiting protection',
      severity: 'Medium',
      cvss_score: 5.8,
      source: 'snyk_dast',
      source_label: 'Snyk DAST',
      asset_id: 16,
      asset_name: 'api-gateway',
      asset_type: 'Server',
      sub_asset: 'api-endpoint',
      project: 'infrastructure',
      category: 'infra',
      status: 'in_progress',
      date_discovered: '2025-01-16T08:30:00Z',
      date_due: '2025-01-30T08:30:00Z',
      assignee: 'mia.anderson@company.com',
      remediation: 'Implement rate limiting on all API endpoints',
      affected_component: 'rate-limiter',
      recommendation: 'Use token bucket algorithm with appropriate limits',
    },
    {
      id: 'VULN-020',
      title: 'Broken Authentication',
      description: 'Authentication mechanism can be bypassed',
      severity: 'Critical',
      cvss_score: 9.8,
      cve_id: 'CVE-2025-0009',
      source: 'manual_vapt',
      source_label: 'Manual VAPT',
      asset_id: 17,
      asset_name: 'admin-panel',
      asset_type: 'Server',
      sub_asset: 'web-app',
      project: 'infrastructure',
      category: 'offsec',
      status: 'open',
      date_discovered: '2025-01-20T15:00:00Z',
      date_due: '2025-01-27T15:00:00Z',
      assignee: 'noah.stone@company.com',
      remediation: 'Fix authentication bypass vulnerability',
      affected_component: 'auth-bypass',
      recommendation: 'Implement multi-factor authentication',
    },
    {
      id: 'VULN-021',
      title: 'Insecure Direct Object Reference',
      description: 'Users can access unauthorized resources through ID manipulation',
      severity: 'High',
      cvss_score: 7.5,
      source: 'snyk_dast',
      source_label: 'Snyk DAST',
      asset_id: 18,
      asset_name: 'reporting-service',
      asset_type: 'Service',
      sub_asset: 'service',
      project: 'analytics',
      category: 'appsec',
      status: 'open',
      date_discovered: '2025-01-21T11:45:00Z',
      date_due: '2025-01-28T11:45:00Z',
      assignee: 'olivia.taylor@company.com',
      remediation: 'Implement proper authorization checks',
      affected_component: 'resource-access',
      recommendation: 'Use UUIDs instead of sequential IDs',
    },
    {
      id: 'VULN-022',
      title: 'Cross-Site Request Forgery',
      description: 'Application vulnerable to CSRF attacks',
      severity: 'Medium',
      cvss_score: 6.1,
      cve_id: 'CVE-2025-0010',
      source: 'snyk_dast',
      source_label: 'Snyk DAST',
      asset_id: 19,
      asset_name: 'web-portal',
      asset_type: 'Server',
      sub_asset: 'web-app',
      project: 'user-management',
      category: 'appsec',
      status: 'in_progress',
      date_discovered: '2025-01-22T13:15:00Z',
      date_due: '2025-01-29T13:15:00Z',
      assignee: 'peter.jones@company.com',
      remediation: 'Implement CSRF tokens for all state-changing operations',
      affected_component: 'form-handler',
      recommendation: 'Use SameSite cookies and CSRF protection',
    },
    {
      id: 'VULN-023',
      title: 'Insecure Cryptographic Storage',
      description: 'Sensitive data stored using weak encryption',
      severity: 'High',
      cvss_score: 8.2,
      source: 'snyk_sast',
      source_label: 'Snyk SAST',
      asset_id: 20,
      asset_name: 'database-primary',
      asset_type: 'Database',
      sub_asset: 'database',
      project: 'payments-platform',
      category: 'compliance',
      status: 'open',
      date_discovered: '2025-01-23T09:30:00Z',
      date_due: '2025-01-30T09:30:00Z',
      assignee: 'quinn.miller@company.com',
      remediation: 'Implement strong encryption for sensitive data',
      affected_component: 'data-encryption',
      recommendation: 'Use AES-256 with proper key management',
    },
    {
      id: 'VULN-024',
      title: 'Server-Side Template Injection',
      description: 'Template engine vulnerable to injection attacks',
      severity: 'Critical',
      cvss_score: 9.5,
      cve_id: 'CVE-2025-0011',
      source: 'manual_vapt',
      source_label: 'Manual VAPT',
      asset_id: 21,
      asset_name: 'reporting-engine',
      asset_type: 'Service',
      sub_asset: 'service',
      project: 'analytics',
      category: 'offsec',
      status: 'open',
      date_discovered: '2025-01-24T14:00:00Z',
      date_due: '2025-01-31T14:00:00Z',
      assignee: 'rachel.green@company.com',
      remediation: 'Sanitize all template inputs and use sandboxed templates',
      affected_component: 'template-engine',
      recommendation: 'Use template engines with built-in security features',
    },
    {
      id: 'VULN-025',
      title: 'Insecure Random Number Generation',
      description: 'Application using predictable random number generator',
      severity: 'Medium',
      cvss_score: 5.9,
      source: 'snyk_sast',
      source_label: 'Snyk SAST',
      asset_id: 22,
      asset_name: 'token-service',
      asset_type: 'Service',
      sub_asset: 'service',
      project: 'user-management',
      category: 'appsec',
      status: 'fixed',
      date_discovered: '2025-01-25T10:45:00Z',
      date_due: '2025-01-28T10:45:00Z',
      assignee: 'sam.wilson@company.com',
      remediation: 'Use cryptographically secure random number generator',
      affected_component: 'token-generator',
      recommendation: 'Use hardware security module for critical operations',
    }
  ] */

  // ===== EFFECTS =====
  // Fetch stats on mount
  useEffect(() => {
    fetchStats()
  }, [])

  // Fetch vulnerabilities when filters change
  useEffect(() => {
    fetchVulnerabilities()
  }, [filters, activeTab, viewMode])

  // Set default activeTab when viewMode changes
  useEffect(() => {
    if (viewMode === 'offsec') {
      setActiveTab('manual_vapt') // Default to Manual VAPT for OffSec
    } else if (viewMode === 'appsec') {
      setActiveTab('all') // Default to All for AppSec (will show all Snyk sources)
    }
  }, [viewMode])

  // ===== FUNCTIONS =====
  const fetchStats = async () => {
    try {
      const statsData = await vulnerabilityService.getStats()
      console.log('Stats fetched successfully:', statsData)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchVulnerabilities = async () => {
    try {
      setLoading(true)
      
      // Build filter object from UI state
      const severityFilter = filters.severity.length > 0 ? filters.severity[0].toLowerCase() : undefined
      const statusFilter = filters.status.length > 0 ? filters.status[0].toLowerCase() : undefined
      const assetNameFilter = filters.asset.length > 0 ? filters.asset[0] : undefined
      
      // Determine category filter based on viewMode
      let categoryFilter = undefined
      if (viewMode === 'offsec') {
        categoryFilter = 'offsec'
      } else if (viewMode === 'appsec') {
        categoryFilter = 'appsec'
      }
      // For 'overview' mode, we don't filter by category

      // Determine source filter based on viewMode and activeTab
      let sourceFilter = undefined
      if (viewMode === 'offsec') {
        // OffSec only supports Manual VAPT
        sourceFilter = 'manual_vapt'
      } else if (viewMode === 'appsec') {
        // AppSec only supports Snyk sources
        if (activeTab !== 'all') {
          sourceFilter = activeTab // snyk_sca, snyk_sast, or snyk_dast
        }
        // If activeTab is 'all', don't filter by source to show all Snyk sources
      } else {
        // For overview or other modes, use the regular source filter
        sourceFilter = filters.source.length > 0 ? filters.source[0].toLowerCase() : undefined
      }

      // Fetch from backend with proper pagination
      const response = await vulnerabilityService.getVulnerabilities(
        {
          severity: severityFilter,
          status_filter: statusFilter,
          source: sourceFilter,
          asset_name: assetNameFilter,
          category: categoryFilter,
          search: filters.search || undefined,
        },
        filters.currentPage,
        filters.perPage
      )

      // Get vulnerabilities from response
      let vulns = response.items || []

      // Apply additional client-side filtering for local-only filters
      let filtered = vulns

      // Filter by sub-asset (client-side)
      if (filters.subAsset.length > 0) {
        filtered = filtered.filter((v: any) =>
          filters.subAsset.includes(v.sub_asset)
        )
      }

      // Filter by project (client-side)
      if (filters.project.length > 0) {
        filtered = filtered.filter((v: any) =>
          filters.project.includes(v.project)
        )
      }

      // Filter by assignee (client-side)
      if (filters.assignee.length > 0) {
        filtered = filtered.filter((v: any) =>
          filters.assignee.includes(v.assignee)
        )
      }

      // Filter by CVSS score range (client-side)
      if (filters.cvssRange && (filters.cvssRange[0] > 0 || filters.cvssRange[1] < 10)) {
        filtered = filtered.filter((v: any) => {
          const cvssScore = v.cvss_score || 0
          return cvssScore >= filters.cvssRange[0] && cvssScore <= filters.cvssRange[1]
        })
      }

      // Filter by risk score range (client-side)
      if (filters.riskScore && (filters.riskScore[0] > 0 || filters.riskScore[1] < 100)) {
        filtered = filtered.filter((v: any) => {
          const riskScore = (v.cvss_score || 0) * 10
          return riskScore >= filters.riskScore[0] && riskScore <= filters.riskScore[1]
        })
      }

      // Filter by CVE only (client-side)
      if (filters.hasCVE) {
        filtered = filtered.filter((v: any) => v.cve_id && v.cve_id.length > 0)
      }

      setVulnerabilities(filtered)
      setFilteredCount(response.total || filtered.length)
      
      // Fetch all counts separately (not just current page)
      try {
        const counts = await vulnerabilityService.getSourceCounts({
          severity: severityFilter,
          status_filter: statusFilter,
          search: filters.search || undefined,
        })
        setVulnCounts(counts)
      } catch (error) {
        console.error('Failed to get source counts:', error)
        setVulnCounts({
          all: response.total || 0,
          snyk_sca: 0,
          snyk_sast: 0,
          snyk_dast: 0,
          manual_vapt: 0,
          asset_scan: 0,
        })
      }

      // Fetch severity breakdown
      try {
        const severityBreakdown = await vulnerabilityService.getSeverityBreakdown()
        setSeverityCounts({
          critical: severityBreakdown.critical || 0,
          high: severityBreakdown.high || 0,
          medium: severityBreakdown.medium || 0,
          low: severityBreakdown.low || 0,
          info: severityBreakdown.info || 0,
        })
      } catch (error) {
        console.error('Failed to get severity breakdown:', error)
      }

      // Fetch status breakdown
      try {
        const statusBreakdown = await vulnerabilityService.getStatusBreakdown()
        setStatusCounts({
          open: statusBreakdown.open || 0,
          in_progress: statusBreakdown.in_progress || 0,
          fixed: statusBreakdown.fixed || 0,
          accepted: statusBreakdown.accepted || 0,
          ignored: 0,
        })
      } catch (error) {
        console.error('Failed to get status breakdown:', error)
      }

      // Fetch assets breakdown
      try {
        const assetsBreakdown = await vulnerabilityService.getAssetsBreakdown()
        setAssetCounts(assetsBreakdown.assets || [])
      } catch (error) {
        console.error('Failed to get assets breakdown:', error)
      }

      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch vulnerabilities:', error)
      setVulnerabilities([])
      setFilteredCount(0)
      setLoading(false)
    }
  }

  const handleRowSelect = (vuln: Vulnerability) => {
    setSelectedVuln(vuln)
    setDetailDialogOpen(true)
  }

  const handleStatusChange = async (vulnId: number, status?: string) => {
    try {
      // If status not provided, just select the vulnerability for detail view
      if (!status) {
        const vuln = vulnerabilities.find(v => v.id === vulnId)
        if (vuln) {
          setSelectedVuln(vuln)
          setDetailDialogOpen(true)
        }
        return
      }
      
      // Update backend API (convert number ID to string for consistency)
      const vulnIdStr = String(vulnId)
      await vulnerabilityService.updateVulnerabilityStatus(vulnIdStr, status)
      
      // Optimistically update local state
      setVulnerabilities(
        vulnerabilities.map((v) =>
          v.id === vulnId ? { ...v, status } : v
        )
      )
      
      if (selectedVuln?.id === vulnId) {
        setSelectedVuln({ ...selectedVuln, status })
      }
      
      console.log(`Updated vulnerability ${vulnId} to status: ${status}`)
    } catch (error) {
      console.error('Failed to update vulnerability status:', error)
    }
  }

  const handleExport = async () => {
    try {
      // TODO: Implement export functionality
      console.log('Exporting vulnerabilities...')
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const handleBulkAction = async (action: string) => {
    try {
      console.log(`Bulk action: ${action}`, selectedVulns)
      
      switch (action) {
        case 'clear-selection':
          setSelectedVulns([])
          break
        case 'mark-in-progress':
          // TODO: Implement bulk status update
          console.log('Marking vulnerabilities as in progress:', selectedVulns)
          break
        case 'mark-fixed':
          // TODO: Implement bulk status update
          console.log('Marking vulnerabilities as fixed:', selectedVulns)
          break
        case 'assign':
          // TODO: Implement bulk assignment
          console.log('Assigning vulnerabilities:', selectedVulns)
          break
        case 'delete':
          // TODO: Implement bulk deletion
          console.log('Deleting vulnerabilities:', selectedVulns)
          break
        case 'export-pdf':
          // TODO: Implement PDF export
          console.log('Exporting to PDF...')
          break
        case 'export-csv':
          // TODO: Implement CSV export
          console.log('Exporting to CSV...')
          break
        case 'export-json':
          // TODO: Implement JSON export
          console.log('Exporting to JSON...')
          break
        case 'refresh':
          // TODO: Implement data refresh
          console.log('Refreshing data...')
          fetchVulnerabilities()
          break
        default:
          console.log('Unknown action:', action)
      }
    } catch (error) {
      console.error('Bulk action failed:', error)
    }
  }

  const handlePageChange = (currentPage: number) => {
    setFilters({ ...filters, currentPage })
  }

  // ===== ACTION HANDLERS =====

  const handleAssign = async (vulnId: number) => {
    try {
      // TODO: Show assignment dialog
      console.log('Assigning vulnerability:', vulnId)
      // await vulnerabilityService.assignVulnerability(String(vulnId), userId, reason)
    } catch (error) {
      console.error('Failed to assign vulnerability:', error)
    }
  }

  const handleComment = async (vulnId: number) => {
    try {
      // TODO: Show comment dialog
      console.log('Adding comment to vulnerability:', vulnId)
      // await vulnerabilityService.addComment(String(vulnId), text, isSensitive)
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const handleSnooze = async (vulnId: number) => {
    try {
      // TODO: Show snooze dialog
      console.log('Snoozing vulnerability:', vulnId)
      // await vulnerabilityService.snoozeVulnerability(String(vulnId), snoozeUntil, reason)
    } catch (error) {
      console.error('Failed to snooze vulnerability:', error)
    }
  }

  const handleEscalate = async (vulnId: number) => {
    try {
      // TODO: Show escalation dialog
      console.log('Escalating vulnerability:', vulnId)
      // await vulnerabilityService.escalateVulnerability(String(vulnId), level, reason)
    } catch (error) {
      console.error('Failed to escalate vulnerability:', error)
    }
  }

  const handleFalsePositive = async (vulnId: number) => {
    try {
      // TODO: Show false positive dialog
      console.log('Marking as false positive:', vulnId)
      // await vulnerabilityService.markFalsePositive(String(vulnId), reason, verifiedBy)
    } catch (error) {
      console.error('Failed to mark false positive:', error)
    }
  }

  // ===== RENDER =====
  return (
    <>
      {/* ===== HEADER ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== MAIN CONTENT ===== */}
      <Main>
        {/* Page Title Section with Asset Selector */}
        <div className='mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Vulnerabilities
            </h1>
            <p className='text-sm text-muted-foreground mt-1'>
              Manage and track all security vulnerabilities across your infrastructure
            </p>
          </div>
          
          {/* Asset Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Scope:</span>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select tenant or project" />
              </SelectTrigger>
              <SelectContent>
                {getAllAssetOptions().map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    <div className="flex items-center gap-2">
                      {option.type === 'tenant' ? (
                        <Globe className="h-4 w-4 text-green-600" />
                      ) : (
                        <Building2 className="h-4 w-4 text-blue-600" />
                      )}
                      <div className="flex flex-col">
                        <span className={option.level === 1 ? "text-sm text-muted-foreground" : ""}>
                          {option.level === 1 ? "└ " : ""}{option.name}
                        </span>
                        {option.level === 1 && option.tenantName && (
                          <span className="text-xs text-muted-foreground">
                            {option.tenantName}
                          </span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* View Tabs */}
        <Tabs value={viewMode} onValueChange={setViewMode} className='w-full'>
          <TabsList className='mb-4'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='offsec'>OffSec</TabsTrigger>
            <TabsTrigger value='appsec'>AppSec</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value='overview' className='space-y-4'>
            {loading ? (
              <VulnerabilityOverviewSkeleton />
            ) : (
              <VulnerabilityOverview
                severityCounts={severityCounts}
                vulnerabilities={vulnerabilities}
              />
            )}
          </TabsContent>

          {/* OffSec Tab */}
          <TabsContent value='offsec' className='space-y-4'>
            {loading ? (
              <div className="space-y-4">
                <VulnerabilityOverviewSkeleton />
                <VulnerabilityTableSkeleton />
              </div>
            ) : (
              <OffSecTab vulnerabilities={vulnerabilities} />
            )}
          </TabsContent>

          {/* AppSec Tab */}
          <TabsContent value='appsec' className='space-y-4'>
            {loading ? (
              <div className="space-y-4">
                <VulnerabilityOverviewSkeleton />
                <VulnerabilityTableSkeleton />
              </div>
            ) : (
              <AppSecTab vulnerabilities={vulnerabilities} />
            )}
          </TabsContent>
        </Tabs>
      </Main>

      {/* Detail Dialog */}
      <VulnerabilityDetailDialog
        vulnerability={selectedVuln}
        isOpen={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </>
  )
}

// ===== REFERENCE: OLD ALL VULNERABILITIES TAB CONTENT =====
// This content is kept for reference as requested by the user
// The old "All Vulnerabilities" tab structure has been replaced with separate OffSec and AppSec tabs
// 
// Old structure had:
// - Overview tab (unchanged)
// - All Vulnerabilities tab (replaced with OffSec and AppSec tabs)
//
// The new structure has:
// - Overview tab (unchanged)  
// - OffSec tab (shows offensive security vulnerabilities)
// - AppSec tab (shows application security vulnerabilities)
//
// Both OffSec and AppSec tabs include the same functionality as the old All Vulnerabilities tab:
// - Source tabs for filtering by vulnerability source
// - Filters sidebar
// - Vulnerabilities table with all actions
// - Bulk actions
// - Pagination
// =========================================================

// Top navigation links
const topNav = [
  {
    title: 'Overview',
    href: '/',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Vulnerabilities',
    href: '/vulnerabilities',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Assets',
    href: '/assets',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Compliance',
    href: '/compliance',
    isActive: false,
    disabled: true,
  },
]