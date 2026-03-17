export default function WhyTraditionalFailSection() {
  const comparisons = [
    {
      traditional: 'Pre-recorded videos you watch alone',
      neura: 'Live 1:1 sessions with an expert who knows your name',
    },
    {
      traditional: 'One-size-fits-all curriculum',
      neura: 'Customized learning path based on your background & goals',
    },
    {
      traditional: 'Theory-heavy, real-world-light',
      neura: 'Industry projects with actual deployment experience',
    },
    {
      traditional: 'Forum support with 5-day response time',
      neura: 'Direct mentor WhatsApp access during business hours',
    },
    {
      traditional: 'Certificate that nobody verifies',
      neura: 'Portfolio of live projects + placement assistance',
    },
    {
      traditional: 'You stop learning after payment',
      neura: 'Ongoing alumni community + session recordings forever',
    },
  ]

  return (
    <section className="section-padding bg-gray-50/80">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge bg-gray-100 text-gray-900 mb-4">The Comparison</span>
          <h2 className="section-heading mt-3 mb-5">
            Traditional Courses vs The AIsprint Way
          </h2>
          <p className="section-subheading mx-auto">
            Every design decision we made was to solve a problem we saw learners facing at scale.
          </p>
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-2 bg-white">
            <div className="px-6 py-4 border-b border-r border-gray-200">
              <span className="text-sm font-semibold text-gray-500 font-body uppercase tracking-wide">
                ❌ Traditional Online Courses
              </span>
            </div>
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-900">
              <span className="text-sm font-semibold text-white font-body uppercase tracking-wide">
                ✅ AIsprint 1:1 Program
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="px-6 py-4 border-r border-gray-200 flex items-start gap-3">
                <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                <span className="text-sm text-gray-600 font-body">{row.traditional}</span>
              </div>
              <div className="px-6 py-4 flex items-start gap-3">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm text-gray-800 font-body font-medium">{row.neura}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
