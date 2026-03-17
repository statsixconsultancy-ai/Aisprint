export default function ProblemSection() {
  const problems = [
    {
      icon: (
        <svg
          className="w-6 h-6 text-neutral-700"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v13A2.5 2.5 0 0117.5 21h-11A2.5 2.5 0 014 18.5v-13z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 8l8 4-8 4V8z"
            fill="currentColor"
          />
        </svg>
      ),
      title: 'Hours of Passive Video Content',
      description:
        'You watch lecture after lecture, but nothing sticks. No one answers your specific questions or explains why the code breaks on your machine.',
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-neutral-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2a10 10 0 100 20 10 10 0 000-20z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12h20M12 2c2.5 3 4 7 4 10s-1.5 7-4 10c-2.5-3-4-7-4-10s1.5-7 4-10z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Zero Real-World Context',
      description:
        'Courses teach you toy datasets and hello-world models. Nobody shows you how AI is deployed at scale in production systems.',
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-neutral-700"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8h10M7 12h10M7 16h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M4 4h16v16H4V4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Generic Certificates That Mean Nothing',
      description:
        'You spend ₹40,000 on a course, get a PDF certificate, and still can\'t answer basic interview questions from real companies.',
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-neutral-700"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C7.03 2 3 6.03 3 11c0 2.86 1.46 5.42 3.75 7.04L7 22l4.17-1.68A8.96 8.96 0 0012 20c4.97 0 9-4.03 9-9s-4.03-9-9-9z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 10h6M9 14h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: 'Disappear After You Pay',
      description:
        'Support teams take 3 days to reply. The "community" is a ghost town. You\'re stuck debugging alone at 2 AM with no help.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge bg-gray-100 text-gray-900 mb-4">The Hard Truth</span>
          <h2 className="section-heading mt-3 mb-5">
          90% students learn AI. Few get hired. Do you know Why?
          </h2>
          <p className="section-subheading mx-auto">
            The online AI learning market is broken. Pre-recorded courses, generic curriculum, and zero accountability are leaving lakhs of learners stuck.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 transition-all duration-200"
            >
              <div className="flex-shrink-0 mt-0.5 rounded-lg bg-neutral-100 w-12 h-12 flex items-center justify-center">
                {problem.icon}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-neutral-950 mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-text-body leading-relaxed font-body">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Callout stat */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-black rounded-2xl p-8 text-center">
            <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              Rs 2.1 Lakh
            </p>
            <p className="text-sm md:text-sm text-white font-body">
              Average amount Indians spend on online AI courses before landing their first relevant job — mostly on courses that don't work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
