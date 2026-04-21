import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { runAudit } from "../api/auditApi"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Home() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url) return
    setLoading(true)
    setError("")
    try {
      const result = await runAudit(url)
      navigate("/results", { state: { result } })
    } catch {
      setError("Audit failed. Please check the URL and try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Accessible</h1>
          <p className="text-gray-500 text-lg">
            Check any website for accessibility issues — instantly.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Run Audit
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">
          Powered by Playwright + axe-core
        </p>
      </div>
    </div>
  )
}
