export default function PartnersSection() {
  const recognitions = [
    {
      logo: (
        <svg width="40" height="40" viewBox="0 0 120 120" fill="none">
          <rect x="15" y="70" width="15" height="35" fill="#2563EB" />
          <rect x="40" y="55" width="15" height="50" fill="#2563EB" />
          <rect x="65" y="40" width="15" height="65" fill="#2563EB" />
          <rect x="90" y="25" width="15" height="80" fill="#2563EB" />

          <path
            d="M20 60 L45 45 L70 30 L95 15"
            stroke="#10B981"
            strokeWidth="4"
            fill="none"
          />

          <polygon points="95,15 88,17 92,22" fill="#10B981" />
        </svg>
      ),

      name: "Startup India",
      description:
        "Officially recognized partner under the Startup India initiative by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India.",
      badge: "DPIIT Recognized",
    },
  ];


  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-blue mb-4">Trust & Recognition</span>
          <h2 className="section-heading mt-3 mb-5">
            Backed by India&apos;s Most Credible Institutions
          </h2>
          <p className="section-subheading mx-auto">
            Our partnerships and recognitions are a direct reflection of the quality we hold ourselves to.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {recognitions.map((item) => (
            <div
              key={item.name}
              className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl flex-shrink-0">
                {item.logo}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading font-bold text-base text-neutral-950">{item.name}</h3>
                  <span className="badge bg-gray-100 text-gray-900 text-xs">{item.badge}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-body">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-16 py-8 px-8 bg-gray-50 rounded-3xl flex flex-wrap items-center justify-center gap-10 md:gap-20">
          {[
            { value: '2022', label: 'Founded' },
            { value: '100%', label: 'India-Built' },
            { value: 'Government', label: 'Backed Programs' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-heading text-xl font-bold text-neutral-950">{item.value}</p>
              <p className="text-xs text-gray-500 font-body mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
