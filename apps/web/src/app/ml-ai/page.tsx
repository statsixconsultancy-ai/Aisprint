import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Machine Learning & AI Course — 1:1 Live Mentorship',
  description:
    'Master Machine Learning and AI with personalized 1:1 live sessions. 16-week program covering Python, PyTorch, NLP, computer vision, MLOps, and deployment. 94% placement rate.',
}

const modules = [
  {
    number: '01',
    title: 'Python for Data Science & ML',
    weeks: 'Week 1–2',
    topics: ['NumPy, Pandas, Matplotlib', 'Data cleaning & EDA', 'Statistical foundations', 'Jupyter, Colab & VS Code setup'],
  },
  {
    number: '02',
    title: 'Supervised & Unsupervised Learning',
    weeks: 'Week 3–5',
    topics: ['Linear & logistic regression', 'Decision trees & random forests', 'SVMs, k-NN, k-Means', 'Model evaluation & cross-validation'],
  },
  {
    number: '03',
    title: 'Deep Learning Fundamentals',
    weeks: 'Week 6–8',
    topics: ['Neural networks from scratch', 'PyTorch & TensorFlow hands-on', 'CNNs for computer vision', 'Training strategies & regularization'],
  },
  {
    number: '04',
    title: 'Natural Language Processing',
    weeks: 'Week 9–11',
    topics: ['Transformers & BERT architecture', 'HuggingFace ecosystem', 'Text classification & NER', 'Fine-tuning LLMs for custom tasks'],
  },
  {
    number: '05',
    title: 'MLOps & Production Deployment',
    weeks: 'Week 12–14',
    topics: ['Docker & containerization', 'AWS SageMaker & Lambda', 'CI/CD pipelines for ML', 'Model monitoring & drift detection'],
  },
  {
    number: '06',
    title: 'Capstone Projects & Interview Prep',
    weeks: 'Week 15–16',
    topics: ['End-to-end project deployment', 'GitHub portfolio building', 'System design for ML', '5 mock technical interviews'],
  },
]

const mentors = [
  {
    initials: 'AK',
    color: 'from-blue-500 to-blue-700',
    name: 'Arjun Kapoor',
    title: 'Former Senior ML Engineer, Amazon',
    experience: '9 Years',
    expertise: ['MLOps', 'Recommendation Systems', 'NLP', 'Distributed Training'],
    bio: 'Built ML systems serving 100M+ users at Amazon. Specializes in production deployment and scalable ML pipelines.',
  },
  {
    initials: 'SP',
    color: 'from-emerald-500 to-emerald-700',
    name: 'Shruti Patel',
    title: 'AI Research Lead, Meesho',
    experience: '7 Years',
    expertise: ['Computer Vision', 'Transformers', 'Model Compression', 'Research'],
    bio: 'Published 12 papers in top-tier AI venues. Leads AI research at Meesho. IIT Bombay alumna, ex-Google Brain.',
  },
  {
    initials: 'VN',
    color: 'from-violet-500 to-violet-700',
    name: 'Vikram Nair',
    title: 'Principal Data Scientist, Flipkart',
    experience: '11 Years',
    expertise: ['Time Series', 'Fraud Detection', 'A/B Testing', 'ML Strategy'],
    bio: 'Leads a 15-person data science team. Previously at PayPal and JP Morgan. IIM Calcutta MBA with IIT Delhi undergrad.',
  },
]

const faqs = [
  {
    q: 'How long is the ML & AI program?',
    a: 'The program is 16 weeks (4 months) with 2× weekly 1:1 sessions. You can extend to 20 weeks if needed — at no extra cost.',
  },
  {
    q: 'Do I need prior coding experience?',
    a: 'Basic Python familiarity is helpful but not required. Your mentor will assess your level in the orientation call and adjust the starting point of your curriculum.',
  },
  {
    q: 'What is the time commitment per week?',
    a: 'Expect 10–15 hours/week: 2–3 hours of live sessions + 7–12 hours of self-paced practice, assignments, and project work.',
  },
  {
    q: 'What technologies will I learn?',
    a: 'Python, NumPy, Pandas, Scikit-learn, PyTorch, TensorFlow, HuggingFace, Docker, AWS (SageMaker, Lambda, S3), MLflow, FastAPI, and GitHub Actions.',
  },
]

export default function MLAIPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge bg-gray-100 text-gray-900">Most Popular Course</span>
              <span className="badge bg-gray-100 text-gray-900">
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
            <h1 className="section-heading text-4xl md:text-5xl mb-5">
              Machine Learning & AI
              <span className="block text-gray-900 mt-1">1:1 Live Mentorship Program</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-body max-w-2xl">
              A rigorous 16-week program built for people who want to go from zero to production ML engineer. Two live sessions per week with a mentor who has built ML systems at scale.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { icon: '📅', label: '16 Weeks' },
                { icon: '🖥️', label: '32 Live Sessions' },
                { icon: '🚀', label: '4+ Projects' },
                { icon: '💼', label: '94% Placement' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-body">
                  <span>{item.icon}</span>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/ml-ai/apply" className="btn-primary px-8 py-4 text-base">
                Apply Now — ₹79,999
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-body">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                EMI available · 7-day refund
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-blue mb-3">Who Is This For?</span>
            <h2 className="section-heading mt-3 mb-4">Built for People Who Want Outcomes, Not Certificates</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: '👨‍💻', title: 'Software Engineers', desc: 'Developers who want to pivot into AI/ML roles at top tech companies.' },
              { icon: '📊', title: 'Data Analysts', desc: 'Analysts who want to move from dashboards to predictive models and ML systems.' },
              { icon: '🎓', title: 'CS Graduates', desc: 'Fresh graduates who want practical skills that college never taught.' },
              { icon: '🔬', title: 'Researchers', desc: 'Academics who want to transition from research to industry ML engineering.' },
              { icon: '🌐', title: 'Career Switchers', desc: 'Professionals from any background making a calculated move into AI.' },
              { icon: '🚀', title: 'Entrepreneurs', desc: 'Founders who want to build AI-powered products and understand what\'s technically possible.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/20 transition-all">
                <div className="text-3xl mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-neutral-950 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-blue mb-3">Curriculum</span>
            <h2 className="section-heading mt-3 mb-4">16 Weeks. 6 Modules. 4 Live Projects.</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
            {modules.map((mod) => (
              <div key={mod.number} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-brand-400 font-body">MODULE {mod.number}</span>
                  <span className="badge bg-gray-100 text-gray-500">{mod.weeks}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-neutral-950 mb-3">{mod.title}</h3>
                <ul className="flex flex-col gap-1.5">
                  {mod.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-gray-600 font-body">
                      <span className="text-brand-500 mt-0.5 flex-shrink-0">→</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-blue mb-3">Your Mentors</span>
            <h2 className="section-heading mt-3 mb-4">Engineers Who Built Real AI Systems</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mentors.map((mentor) => (
              <div key={mentor.name} className="card hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mentor.color} flex items-center justify-center text-white font-bold text-xl mb-4`}>
                  {mentor.initials}
                </div>
                <h3 className="font-heading font-bold text-base text-neutral-950 mb-0.5">{mentor.name}</h3>
                <p className="text-xs text-brand-600 font-semibold font-body mb-1">{mentor.title}</p>
                <p className="text-xs text-gray-500 font-body mb-3">{mentor.experience} Experience</p>
                <p className="text-sm text-gray-600 leading-relaxed font-body mb-4">{mentor.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.expertise.map((tag) => (
                    <span key={tag} className="badge-blue text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement */}
      <section className="section-padding bg-gradient-to-b from-brand-950 to-neutral-950 text-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Placement Support Included</h2>
            <p className="text-brand-200/70 font-body">Every ML & AI student gets our full career placement package at no additional cost.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              'Personalised CV & LinkedIn overhaul',
              '5 mock technical interviews with feedback',
              'System design interview preparation',
              'Direct recruiter referrals at 200+ companies',
              'Exclusive AI/ML job board access',
              '6-month guaranteed placement support',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <svg className="w-5 h-5 text-brand-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-white/80 font-body">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="section-heading text-center mb-10">Common Questions</h2>
          <div className="bg-gray-50 rounded-3xl p-8 divide-y divide-gray-100">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-5">
                <p className="font-heading font-semibold text-base text-neutral-950 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-600 leading-relaxed font-body">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="section-heading mb-4">Ready to Start Your ML Career?</h2>
          <p className="section-subheading mx-auto mb-8">
            Apply takes 5 minutes. Orientation call is free. Refund available in 7 days.
          </p>
          <Link href="/ml-ai/apply" className="btn-primary px-10 py-4 text-base">
            Apply for ML & AI Program
          </Link>
          <p className="mt-4 text-sm text-gray-400 font-body">Cohort seats are limited to 8 per month.</p>
        </div>
      </section>
    </div>
  )
}
