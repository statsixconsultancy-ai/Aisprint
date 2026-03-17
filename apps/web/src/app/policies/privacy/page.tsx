import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — AIsprint',
  description: 'AIsprint Privacy Policy. How we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-16">
      <section className="bg-gray-50 pt-20 pb-12">
        <div className="container-custom max-w-3xl">
          <h1 className="section-heading mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 font-body">Last updated: 1 January 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl prose prose-sm prose-gray max-w-none">
          <div className="space-y-10 font-body text-gray-700 leading-relaxed">

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">1. Introduction</h2>
              <p>AIsprint Technologies Pvt. Ltd. (&quot;AIsprint&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, disclose, and safeguard your information when you visit our website at aisprint.in or engage with our services.</p>
              <p className="mt-3">By accessing our platform, you consent to the practices described in this policy. If you disagree with any part of this policy, please discontinue use of our services.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">2. Information We Collect</h2>
              <p><strong>Information you provide directly:</strong></p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Name, email address, and phone number when you apply for a course or contact us</li>
                <li>Career goals and professional experience details submitted in application forms</li>
                <li>Payment and billing information processed through our secure payment partners</li>
                <li>Messages and communications you send to our team</li>
              </ul>
              <p className="mt-4"><strong>Information collected automatically:</strong></p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>IP address, browser type, operating system, and device information</li>
                <li>Pages visited, time on site, and referral URLs</li>
                <li>Cookies and similar tracking technologies (see Section 7)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">3. How We Use Your Information</h2>
              <p>We use your personal information for the following purposes:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>To process and respond to your course applications and inquiries</li>
                <li>To match you with appropriate mentors and personalise your learning experience</li>
                <li>To communicate program updates, schedules, and course-related information</li>
                <li>To provide placement and career support services</li>
                <li>To send newsletters and promotional communications (with your consent)</li>
                <li>To improve our platform, services, and user experience</li>
                <li>To comply with legal obligations and prevent fraudulent activity</li>
                <li>To process payments and maintain financial records as required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">4. Data Sharing & Disclosure</h2>
              <p>We do not sell your personal data. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Mentors and Instructors:</strong> We share relevant application details with your assigned mentor to facilitate personalised learning.</li>
                <li><strong>Hiring Partners:</strong> With your explicit consent, we share your profile with placement partners for recruitment purposes.</li>
                <li><strong>Service Providers:</strong> Trusted third-party vendors (payment gateways, email services, analytics) who process data on our behalf under strict confidentiality agreements.</li>
                <li><strong>Legal Compliance:</strong> When required by law, court order, or regulatory authority in India or other applicable jurisdictions.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of company assets, subject to the acquiring entity honouring this policy.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">5. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to provide services and comply with legal obligations:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Lead and application data: 3 years from date of submission</li>
                <li>Active student data: Duration of program + 5 years</li>
                <li>Financial records: 7 years as required under Indian tax law</li>
                <li>Marketing data: Until you unsubscribe or request deletion</li>
              </ul>
              <p className="mt-3">You may request deletion of your data at any time (subject to legal retention requirements) by contacting privacy@AiSprint.in.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">6. Data Security</h2>
              <p>We implement industry-standard security measures including SSL/TLS encryption, encrypted database storage, access controls, and regular security audits. Our infrastructure is hosted in secure, monitored data centres. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">7. Cookies</h2>
              <p>We use cookies to enhance your experience, remember your preferences, and analyse traffic. Types of cookies we use:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Essential cookies:</strong> Required for the website to function properly. Cannot be disabled.</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our site (Google Analytics).</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements. Can be disabled in your browser settings.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">8. Your Rights</h2>
              <p>Under applicable Indian data protection laws and GDPR (for EU residents), you have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Access, correct, or update your personal information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Data portability (receive your data in a machine-readable format)</li>
                <li>Withdraw consent at any time for marketing communications</li>
                <li>Lodge a complaint with the appropriate data protection authority</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact: privacy@AiSprint.in. We respond to all requests within 30 days.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">9. Children&apos;s Privacy</h2>
              <p>Our services are intended for individuals aged 16 and above. We do not knowingly collect personal information from children under 16. If we become aware that we have collected such data, we will delete it promptly.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">10. Changes to This Policy</h2>
              <p>We may update this Privacy Policy periodically. We will notify you of material changes via email or prominent notice on our website. Continued use of our services after such changes constitutes acceptance of the updated policy.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-neutral-950 mb-3">11. Contact Us</h2>
              <p>For privacy-related queries or to exercise your rights, contact our Data Protection Officer:</p>
              <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm">
                <p><strong>AIsprint Technologies Pvt. Ltd.</strong></p>
                <p>Email: aisprintglobal@gmail.com </p>
                <p>Address: Chennai, Tamil Nadu, India – 600032</p>
                <p>Grievance Officer: Available Monday–Friday, 9AM–6PM IST</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
