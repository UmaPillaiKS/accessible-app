import axios from "axios"
import { AuditResult } from "../types/audit"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

export async function runAudit(url: string): Promise<AuditResult> {
  const response = await axios.post(`${BASE_URL}/api/audit`, { url })
  return response.data
}

export async function getReport(slug: string): Promise<AuditResult> {
  const response = await axios.get(`${BASE_URL}/api/report/${slug}`)
  return response.data
}
