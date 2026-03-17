import Link from 'next/link'

export default function FinalCTASection() {
  return (
    <section className="section-padding relative overflow-hidden bg-neutral-950 -mt-6 md:-mt-8">

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-2 mb-6">
            <span className="badge bg-gray-900/80 text-white">
              <span className="flex items-center gap-2">
                <span className="text-brand-200">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 16.5L10.5 11L14.5 15L19 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 7V10H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Startup India Partner</span>
              </span>
            </span>
          </div> 

          <h2 className="font-heading text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight mb-6">
            The Best Time to Start Your AI Career Was Yesterday.{' '}
            <span className="text-white/80">The Second Best Is Now.</span>
          </h2>

          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto font-body">
            Seats are limited to 8 students per mentor per month. We keep cohorts small so every learner gets the attention they deserve.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
            <Link
              href="/ml-ai/apply"
              className="btn-primary px-6 py-3 text-sm border-white/20 text-white hover:bg-white/10"
            >
              Apply ML & AI
            </Link>
            <Link
              href="/prompt-engineering/apply"
              className="btn-secondary px-6 py-3 text-sm border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Prompt Engineering
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500 font-body">
            Free orientation call · 7-day refund policy · No coding required for PE course
          </p>

          {/* Urgency indicator */}
          <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-amber-400 text-xs font-semibold font-body">
              Only 3 mentor slots remaining this month — as of {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
