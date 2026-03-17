const testimonials = [
  {
    name: 'Karthick J',
    role: 'ML Engineer at Razorpay',
    image: 'KJ',
    color: 'from-blue-500 to-blue-700',
    quote:
      'I spent almost 2 years doing Coursera and various other platforms and still couldn’t crack a single ML interview. It honestly felt like I was just going in circles. Then I AIsprint’s 1:1 program and within 4 months I had 3 offers on the table. Having someone actually guide you and show you what companies look for makes a huge difference',
    course: 'ML & AI Program',
    package: '₹22 LPA',
  },
  {
    name: 'Priya Nair',
    role: 'AI Product Manager at Microsoft',
    image: 'PN',
    color: 'from-purple-500 to-purple-700',
    quote:
      'As a non-technical PM, I low-key thought this prompt engineering course would be way over my head. But my mentor tailored every session to where I was. 8 weeks later I was already building LLM features for our product team. All the best peeps.',
    course: 'Prompt Engineering',
    package: '₹28 LPA',
  },
  {
    name: 'Aditya V',
    role: 'Data Scientist at Google',
    image: 'AV',
    color: 'from-green-500 to-green-700',
    quote:
      'Loved The 1:1 format. My mentor could tell when I was stuck before I even realised it. The real projects we built are literally on my GitHub, and they’re what got me the Google interview.',
    course: 'ML & AI Program',
    package: '₹45 LPA',
  },
  {
    name: 'Deepika Srinivasan',
    role: 'Senior LLM Engineer at Cohere',
    image: 'DS',
    color: 'from-rose-500 to-rose-700',
    quote:
      'I was skeptical about the recognition — but it actually made my employer take my certificate seriously. More importantly, the curriculum was 6 months ahead of what the competition was teaching.',
    course: 'Prompt Engineering',
    package: '$95K USD',
  },
  {
    name: 'Karan',
    role: 'AI Researcher at IIT Bombay → Amazon',
    image: 'K',
    color: 'from-amber-500 to-amber-700',
    quote:
      'Coming from an academic background, I needed industry context. My mentor had built ML systems at Amazon and bridged that gap perfectly. Startup India recognition also helped with my research grant applications.',
    course: 'ML & AI Program',
    package: '₹32 LPA',
  },
  {
    name: 'Ananya Krishnan',
    role: 'Freelance AI Consultant (Singapore)',
    image: 'AK',
    color: 'from-teal-500 to-teal-700',
    quote:
      'I moved from HR to AI consulting in under a year. The placement team helped me target the Singapore market specifically and made direct introductions. I now charge SGD 180/hour for AI consulting.',
    course: 'Prompt Engineering',
    package: 'SGD 180/hr',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge bg-gray-100 text-gray-900 mb-4">Student Stories</span>
          <h2 className="section-heading mt-3 mb-5">
            Real People. Real Jobs.{' '}
            <span className="text-neutral-950">Real Packages.</span>
          </h2>
          <p className="section-subheading mx-auto">
            These aren&apos;t cherry-picked reviews — they&apos;re a cross-section of what our graduates achieve.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col min-h-[280px]"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-sm sm:text-sm text-gray-700 leading-relaxed font-body flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-950 text-sm sm:text-base font-body truncate">{t.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 font-body truncate">{t.role}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs sm:text-sm font-bold text-neutral-950 font-body">{t.package}</p>
                  <p className="text-xs sm:text-sm text-gray-400 font-body">{t.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
