interface Props {
  score: number
}

export default function ScoreBadge({ score }: Props) {
  const color =
    score >= 90 ? "bg-green-100 text-green-800 border-green-300" :
    score >= 70 ? "bg-yellow-100 text-yellow-800 border-yellow-300" :
    score >= 50 ? "bg-orange-100 text-orange-800 border-orange-300" :
    "bg-red-100 text-red-800 border-red-300"

  const label =
    score >= 90 ? "Excellent" :
    score >= 70 ? "Good" :
    score >= 50 ? "Needs Work" :
    "Poor"

  return (
    <div className={`inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-4 ${color}`}>
      <span className="text-5xl font-bold">{score}</span>
      <span className="text-sm font-medium mt-1">{label}</span>
    </div>
  )
}
