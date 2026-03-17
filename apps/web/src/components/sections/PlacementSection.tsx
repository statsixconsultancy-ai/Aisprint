export default function PlacementSection() {
  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Flipkart', 'Razorpay',
    'Meesho', 'CRED', 'PhonePe', 'Zepto', 'Groww',
    'Swiggy', 'Zomato', 'Ola', 'Paytm', 'Freshworks',
  ]

  const services = [
    {
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M7 2h7l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
          <path d="M14 2v6h6"/>
          <path d="M9 13h6M9 17h6"/>
        </svg>
      ),
      title: 'AI-Optimised CV Building',
      description: 'Your resume is crafted to pass ATS systems and impress hiring managers at top tech companies.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V5a2 2 0 0 1 2-2h12a4 4 0 0 1 4 4z"/>
        </svg>
      ),
      title: '5 Mock Interviews',
      description: 'Simulated technical and behavioural interviews with industry professionals, with recorded feedback.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="9" cy="7" r="4"/>
          <path d="M17 11l4 4-4 4"/>
          <path d="M21 15H9"/>
          <path d="M5 21v-2a4 4 0 0 1 4-4h2"/>
        </svg>
      ),
      title: 'Direct Recruiter Referrals',
      description: 'We maintain active relationships with 200+ hiring managers who trust our graduates.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="4"/>
          <path d="M7 10v7"/>
          <path d="M7 7h.01"/>
          <path d="M11 10v7"/>
          <path d="M11 13a3 3 0 0 1 6 0v4"/>
        </svg>
      ),
      title: 'LinkedIn Profile Overhaul',
      description: 'Complete LinkedIn optimization including headlines, about section, and project showcasing.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 3H8v4h8V3z"/>
        </svg>
      ),
      title: 'Global Job Board Access',
      description: 'Exclusive access to curated AI/ML roles across India, Singapore, UAE, UK, and US.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      ),
      title: '6-Month Placement Guarantee',
      description: "If you don't get placed in 6 months after completing the program, we extend support at no cost.",
    },
  ]

  return (
    <section className="section-padding bg-neutral-950 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge bg-gray-900/80 text-white mb-4">Placement Support</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mt-3 mb-5">
            We Don&apos;t Stop Until You Get Hired
          </h2>
          <p className="text-gray-200/80 text-lg leading-relaxed">
            Our placement team has 7+ years of experience connecting AI talent with the right companies globally. This isn&apos;t a career counselling add-on — it&apos;s a core part of the program.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="font-heading font-bold text-white text-base mb-2">{service.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed font-body">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Companies */}
        <div className="text-center mb-8">
          <p className="text-sm text-white/70 font-body uppercase tracking-widest mb-6">
            Our graduates work at
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {companies.map((company) => (
              <span
                key={company}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 font-body hover:bg-white/10 transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Stat row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '94%', label: 'Placement rate within 6 months' },
            { value: 'Rs 12L+', label: 'Average first-year package' },
            { value: '200+', label: 'Hiring partners' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-white/60 font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
