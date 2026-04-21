import { useLocation, useNavigate } from "react-router-dom"
import { AuditResult } from "../types/audit"
import ScoreBadge from "../components/ScoreBadge"
import IssueList from "../components/IssueList"

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result as AuditResult | undefined

  if (!result) {
    navigate("/")
    return null
  }

  const shareUrl = `${window.location.origin}/report/${result.slug}`

  function copyLink() {
    navigator.clipboard.writeText(shareUrl)
    alert("Link copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-blue-600 hover:underline mb-6 block"
        >
          ← Run another audit
        </button>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <div className="flex items-center gap-8">
            <ScoreBadge score={result.score} />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Accessibility Score</h2>
              <p className="text-gray-500 text-sm mb-3">
                Audited in {(result.durationMs / 1000).toFixed(1)}s
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-red-600 font-medium">{result.criticalCount} critical</span>
                <span className="text-yellow-600 font-medium">{result.warningCount} warnings</span>
                <span className="text-green-600 font-medium">{result.passedCount} passed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Share this report</h3>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 bg-gray-50"
            />
            <button
              onClick={copyLink}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Issues ({result.issues.length})
          </h3>
          <IssueList issues={result.issues} />
        </div>
      </div>
    </div>
  )
}
