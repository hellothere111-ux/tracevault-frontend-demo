import { Vulnerability } from './organizational-vulnerabilities'

// Mock vulnerability data for single project - 150 vulnerabilities from both AppSec and OffSec
export const generateMockVulnerabilities = (): Vulnerability[] => {
  const vulnerabilities: Vulnerability[] = []
  const sources = ['snyk_sca', 'snyk_sast', 'snyk_dast', 'manual_vapt']
  const severities: ('Critical' | 'High' | 'Medium' | 'Low')[] = ['Critical', 'High', 'Medium', 'Low']
  const statuses: ('Open' | 'In Progress' | 'Fixed')[] = ['Open', 'In Progress', 'Fixed']
  
  // AppSec vulnerability types
  const appsecTitles = [
    'SQL Injection in Login Module',
    'Cross-Site Scripting (XSS) in User Profile',
    'Insecure Direct Object Reference',
    'Broken Authentication in API',
    'Sensitive Data Exposure',
    'Security Misconfiguration',
    'Insufficient Logging & Monitoring',
    'Insecure Cryptographic Storage',
    'Broken Access Control',
    'Server-Side Request Forgery',
    'XML External Entity Injection',
    'Insecure Deserialization',
    'Components with Known Vulnerabilities',
    'Inadequate Security Controls',
    'Cross-Site Request Forgery',
    'Open Redirect Vulnerability',
    'Path Traversal Attack',
    'Command Injection',
    'LDAP Injection',
    'Buffer Overflow Vulnerability'
  ]
  
  // OffSec vulnerability types
  const offsecTitles = [
    'Privilege Escalation in System',
    'Remote Code Execution (RCE)',
    'Denial of Service Vulnerability',
    'Man-in-the-Middle Attack Vector',
    'Weak SSL/TLS Configuration',
    'Outdated System Components',
    'Default Credentials Found',
    'Unnecessary Services Running',
    'Weak Encryption Algorithms',
    'Information Disclosure',
    'Network Service Misconfiguration',
    'Weak Access Controls',
    'Insufficient Input Validation',
    'Session Hijacking Vulnerability',
    'Race Condition Exploit',
    'Memory Corruption Issue',
    'Kernel Vulnerability',
    'Web Application Firewall Bypass',
    'Insufficient Rate Limiting',
    'Weak Authentication Mechanisms'
  ]
  
  const assets = [
    'Axion API Gateway',
    'User Authentication Service',
    'Payment Processing Service',
    'Customer Database Server',
    'Web Application Frontend',
    'Admin Dashboard',
    'Mobile Application Backend',
    'File Storage Service',
    'Email Service Integration',
    'Third-party API Integration'
  ]
  
  const today = new Date()
  
  for (let i = 1; i <= 150; i++) {
    const isAppSec = i % 2 === 0 // Alternate between AppSec and OffSec
    const source = isAppSec 
      ? sources[Math.floor(Math.random() * 3)] // snyk_sca, snyk_sast, snyk_dast
      : 'manual_vapt' // OffSec only uses manual_vapt
    
    const titleList = isAppSec ? appsecTitles : offsecTitles
    const title = titleList[Math.floor(Math.random() * titleList.length)]
    
    // Generate realistic CVSS scores based on severity
    const severity = severities[Math.floor(Math.random() * severities.length)]
    let cvssScore: number
    switch (severity) {
      case 'Critical':
        cvssScore = 9.0 + Math.random() * 1.0 // 9.0-10.0
        break
      case 'High':
        cvssScore = 7.0 + Math.random() * 2.0 // 7.0-9.0
        break
      case 'Medium':
        cvssScore = 4.0 + Math.random() * 3.0 // 4.0-7.0
        break
      case 'Low':
        cvssScore = 0.1 + Math.random() * 3.9 // 0.1-4.0
        break
      default:
        cvssScore = 5.0
    }
    
    // Generate dates within the last 90 days
    const daysAgo = Math.floor(Math.random() * 90)
    const createdDate = new Date(today)
    createdDate.setDate(createdDate.getDate() - daysAgo)
    
    // Due date is typically 7-30 days after discovery
    const dueDays = 7 + Math.floor(Math.random() * 23)
    const dueDate = new Date(createdDate)
    dueDate.setDate(dueDate.getDate() + dueDays)
    
    // Some vulnerabilities are fixed, some are overdue
    let status = statuses[Math.floor(Math.random() * statuses.length)]
    let updatedDate = new Date(createdDate)
    
    if (status === 'Fixed') {
      // Fixed vulnerabilities have an updated date
      const fixDays = Math.floor(Math.random() * (dueDays + 10)) // Some fixed after due date
      updatedDate = new Date(createdDate)
      updatedDate.setDate(updatedDate.getDate() + fixDays)
    } else if (status === 'In Progress') {
      // In progress vulnerabilities have recent activity
      const progressDays = Math.floor(Math.random() * Math.min(daysAgo, 30))
      updatedDate = new Date(today)
      updatedDate.setDate(updatedDate.getDate() - progressDays)
    }
    
    // Generate CVE ID for critical and high vulnerabilities
    let cveId: string | undefined
    if (severity === 'Critical' || severity === 'High') {
      if (Math.random() > 0.3) { // 70% chance of having CVE
        const year = createdDate.getFullYear()
        const cveNumber = Math.floor(Math.random() * 99999)
        cveId = `CVE-${year}-${cveNumber.toString().padStart(5, '0')}`
      }
    }
    
    const vulnerability: Vulnerability = {
      id: `VULN-${i.toString().padStart(4, '0')}`,
      key: `VULN-${i.toString().padStart(4, '0')}`,
      title,
      description: `Security vulnerability identified in ${title.toLowerCase()} requiring immediate attention and remediation.`,
      category: isAppSec ? 'appsec' : 'offsec',
      severity,
      status,
      cvssScore: Math.round(cvssScore * 10) / 10, // Round to 1 decimal place
      source,
      sourceLabel: isAppSec 
        ? source.replace('_', ' ').toUpperCase()
        : 'Manual VAPT',
      asset: assets[Math.floor(Math.random() * assets.length)],
      assetType: isAppSec ? 'Application' : 'Infrastructure',
      project: 'Axion Security Platform',
      assignee: status === 'Open' || status === 'In Progress' 
        ? ['alice.johnson@company.com', 'bob.smith@company.com', 'carol.davis@company.com'][Math.floor(Math.random() * 3)]
        : undefined,
      createdDate: createdDate.toISOString(),
      updatedDate: updatedDate.toISOString(),
      dueDate: dueDate.toISOString(),
      cveId,
      riskScore: Math.round(cvssScore * 10), // Risk score 0-100
      affectedComponent: isAppSec ? 'Web Application' : 'System Service',
      remediation: `Apply security patches and implement proper security controls to mitigate the ${title.toLowerCase()} vulnerability.`,
      references: cveId ? [`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cveId}`] : [],
      tags: [severity, isAppSec ? 'AppSec' : 'OffSec', source],
    }
    
    vulnerabilities.push(vulnerability)
  }
  
  return vulnerabilities.sort((a, b) => {
    // Sort by severity first, then by created date (newest first)
    const severityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 }
    const aSeverity = severityOrder[a.severity as keyof typeof severityOrder]
    const bSeverity = severityOrder[b.severity as keyof typeof severityOrder]
    
    if (aSeverity !== bSeverity) {
      return aSeverity - bSeverity
    }
    
    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  })
}

export const mockVulnerabilities = generateMockVulnerabilities()

// Calculate vulnerability statistics
export const getVulnerabilityStats = (vulnerabilities: Vulnerability[]) => {
  const total = vulnerabilities.length
  const appsec = vulnerabilities.filter(v => v.category === 'appsec').length
  const offsec = vulnerabilities.filter(v => v.category === 'offsec').length
  
  const critical = vulnerabilities.filter(v => v.severity === 'Critical').length
  const high = vulnerabilities.filter(v => v.severity === 'High').length
  const medium = vulnerabilities.filter(v => v.severity === 'Medium').length
  const low = vulnerabilities.filter(v => v.severity === 'Low').length
  
  const open = vulnerabilities.filter(v => v.status === 'Open').length
  const inProgress = vulnerabilities.filter(v => v.status === 'In Progress').length
  const fixed = vulnerabilities.filter(v => v.status === 'Fixed').length
  
  // Calculate overdue vulnerabilities
  const today = new Date()
  const overdue = vulnerabilities.filter(v => {
    if (v.status === 'Fixed') return false
    const dueDate = new Date(v.dueDate)
    return dueDate < today
  }).length
  
  // Calculate average CVSS score
  const avgCvss = vulnerabilities.reduce((sum, v) => sum + v.cvssScore, 0) / total
  
  // Calculate MTTR (Mean Time to Remediation) for fixed vulnerabilities
  const fixedVulns = vulnerabilities.filter(v => v.status === 'Fixed')
  const mttr = fixedVulns.length > 0 
    ? fixedVulns.reduce((sum, v) => {
        const created = new Date(v.createdDate)
        const updated = new Date(v.updatedDate)
        return sum + (updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24) // days
      }, 0) / fixedVulns.length
    : 0
  
  return {
    total,
    appsec,
    offsec,
    critical,
    high,
    medium,
    low,
    open,
    inProgress,
    fixed,
    overdue,
    avgCvss: Math.round(avgCvss * 10) / 10,
    mttr: Math.round(mttr * 10) / 10,
  }
}
