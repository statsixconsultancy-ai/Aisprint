import { Video, Globe, UploadCloud , Users } from "lucide-react";

export default function SolutionSection() {
  const pillars = [
    {
      number: '01',
      icon: <Video size={28} color="white" />,
      title: '1:1 Live Mentorship',
      description:
        'Every session is scheduled around you. Your mentor reviews your code, corrects your thinking in real time, and adapts explanations to your learning style. No generic lectures.',
      highlight: 'Average session rating: 4.97 / 5',
    },
    {
      number: '02',
      icon: <Globe size={28} color="white" />,
      title: 'Global Placement Support',
      description:
        'Our career team has placed graduates at Google, Microsoft, Flipkart, Razorpay, Meesho, and 80+ startups globally. We do mock interviews, CV reviews, and referrals.',
      highlight: '94% placement within 6 months',
    },
    {
      number: '03',
      icon: <UploadCloud size={28} color="white"/>,
      title: 'Real Production Projects',
      description:
        'You don\'t just learn theory — you build and deploy. Every learner ships at least 3 real projects to GitHub and a public portfolio that hiring managers can verify.',
      highlight: 'Average 4 projects per learner',
    },
    {
      number: '04',
      icon: <Users size={28} color="white"/>,
      title: 'Lifetime Access & Community',
      description:
        'Recordings of every session, updated curriculum as AI evolves, and a private alumni community of 2,400+ professionals. Pay once, grow forever.',
      highlight: '2,400+ active alumni network',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: copy */}
          <div className="flex flex-col justify-start h-full mt-[-40px]">
            <div className="mb-8">
              <span className="badge bg-gray-100 text-gray-900 mb-4">Our Approach</span>
              <h2 className="section-heading mt-3 mb-6">
                The Future of AI Education
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 font-body">
                AIsprint was built by engineers who were frustrated with their own learning journeys. We spent 18 months researching what makes AI learners actually land jobs — and built the platform from first principles.
              </p>
              {/* USP badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="badge bg-gray-100 text-gray-900 py-2 px-4">
                  <span className="flex items-center gap-2">
                    <span className="text-brand-600">
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
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <p className="font-heading text-3xl font-bold text-neutral-950">2,400+</p>
                  <p className="text-sm text-gray-500 font-body">Students Enrolled</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-neutral-950">94%</p>
                  <p className="text-sm text-gray-500 font-body">Placement Rate</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-neutral-950">4.9★</p>
                  <p className="text-sm text-gray-500 font-body">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right: pillars */}
          <div className="grid grid-cols-1 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-xl text-white">
                    {pillar.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-gray-500 font-body">{pillar.number}</span>
                    <h3 className="font-heading font-bold text-base text-neutral-950">{pillar.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2 font-body">
                    {pillar.description}
                  </p>
                  <span className="text-xs font-semibold text-gray-600 font-body">{pillar.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
