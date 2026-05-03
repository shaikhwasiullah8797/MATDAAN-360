"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const { t } = useLanguage();

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 20px', minHeight: '80vh' }}>
      <header className="text-center mb-12">
        <h1 className="text-navy mb-4">{t.regGuideTitle}</h1>
        <p>{t.regGuideDesc}</p>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Registration Timeline */}
        <section className="mb-12">
          <div className="flex flex-col gap-6">
            {[
              { step: "01", title: "Form 6 Submission", desc: "First-time voters must submit Form 6 online via voters.eci.gov.in or the Voter Helpline App." },
              { step: "02", title: "Field Verification", desc: "Booth Level Officer (BLO) visits your address to verify the details provided." },
              { step: "03", title: "EPIC Generation", desc: "After successful verification, your Voter ID (EPIC) is generated and posted to your address." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="text-3xl font-black text-saffron/20" style={{ minWidth: '50px' }}>{item.step}</div>
                <div className="glass-panel p-6 flex-grow">
                  <h3 className="text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel p-8 mb-8 border-l-4 border-saffron">
          <h2 className="text-saffron mb-4">Step 1: Check Eligibility</h2>
          <ul className="flex-col gap-2 list-disc" style={{ paddingLeft: '1.5rem' }}>
            <li>You must be an Indian citizen.</li>
            <li>You must be 18 years of age or older on the qualifying date.</li>
            <li>You must be an ordinary resident of the polling area.</li>
          </ul>
        </section>

        <section className="glass-panel p-8 mb-8 border-l-4 border-green">
          <h2 className="text-green mb-4">Step 2: Keep Documents Ready</h2>
          <p className="mb-4">You will need the following documents:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-off-white rounded-lg border border-gray-100">
              <strong className="text-navy">Proof of ID</strong>
              <p className="text-xs text-muted">Aadhaar, PAN, Driving License</p>
            </div>
            <div className="p-4 bg-off-white rounded-lg border border-gray-100">
              <strong className="text-navy">Proof of Address</strong>
              <p className="text-xs text-muted">Utility Bills, Bank Passbook</p>
            </div>
          </div>
        </section>

        <section className="glass-panel p-8 mb-8 border-l-4 border-navy">
          <h2 className="text-navy mb-4">Step 3: Official Portals</h2>
          <p className="mb-6 text-muted">Direct links to the Election Commission of India (ECI) official services.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://voters.eci.gov.in/" target="_blank" rel="noreferrer" className="btn btn-primary" aria-label="Visit ECI Voter Portal">
              National Voter&apos;s Service Portal
            </a>
            <a href="https://voterportal.eci.gov.in/" target="_blank" rel="noreferrer" className="btn btn-secondary" aria-label="Voter Portal for Mobile">
              Voter Portal (Beta)
            </a>
            <Link href="/chat" className="btn btn-outline" aria-label="Ask AI Voter Assistant">
              Ask AI for Help
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
