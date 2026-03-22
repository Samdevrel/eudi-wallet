'use client';

import { useState } from 'react';

interface VerifiableCredential {
  id: string;
  type: string;
  issuer: string;
  issued: string;
  expires?: string;
  claims: Record<string, any>;
  verified: boolean;
}

const credentials: VerifiableCredential[] = [
  {
    id: 'VC-001',
    type: 'National ID',
    issuer: 'Government of Estonia',
    issued: '2018-03-15',
    expires: '2028-03-15',
    claims: {
      firstName: 'Alexander',
      lastName: 'Smith',
      dob: '1990-05-20',
      nationality: 'EE',
      idNumber: '3800101990052018',
    },
    verified: true,
  },
  {
    id: 'VC-002',
    type: 'Residence Permit',
    issuer: 'Government of Estonia',
    issued: '2022-01-10',
    expires: '2027-01-10',
    claims: {
      residence: 'Tallinn',
      permitType: 'Long-term',
      status: 'Valid',
    },
    verified: true,
  },
  {
    id: 'VC-003',
    type: 'University Degree',
    issuer: 'University of Tartu',
    issued: '2014-06-01',
    expires: undefined,
    claims: {
      degree: 'Master of Computer Science',
      field: 'Artificial Intelligence',
      university: 'University of Tartu',
      graduated: true,
    },
    verified: true,
  },
  {
    id: 'VC-004',
    type: 'Passport',
    issuer: 'Government of Estonia',
    issued: '2021-02-14',
    expires: '2031-02-14',
    claims: {
      passportNumber: 'A1234567',
      nationality: 'EE',
      type: 'Regular',
    },
    verified: true,
  },
  {
    id: 'VC-005',
    type: 'Driver License',
    issuer: 'Estonian Police and Border Guard',
    issued: '2016-07-22',
    expires: '2026-07-22',
    claims: {
      licenseType: 'Category B',
      validUntil: '2031-07-22',
    },
    verified: true,
  },
];

export default function Home() {
  const [selectedCredential, setSelectedCredential] = useState<VerifiableCredential | null>(null);
  const [isPresenting, setIsPresenting] = useState(false);

  const createPresentation = () => {
    if (!selectedCredential) return;
    setIsPresenting(true);
    setTimeout(() => setIsPresenting(false), 1500);
  };

  const exportCredentials = () => {
    const vc = selectedCredential;
    if (!vc) return;

    const presentation = {
      type: 'VerifiablePresentation',
      holder: 'did:web:eesti.ee:12345678',
      verifiableCredential: {
        type: vc.type,
        issuer: vc.issuer,
        issued: vc.issued,
        ...(vc.expires && { expires: vc.expires }),
        claims: vc.claims,
        verified: vc.verified,
      },
    };

    console.log(JSON.stringify(presentation, null, 2));
    alert(`Exported to clipboard:\n\n${JSON.stringify(presentation, null, 2)}`);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-red-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">EUDI Wallet</h1>
          <p className="text-gray-400 mt-2">EU Digital Identity Wallet with Verifiable Credentials</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-red-400 p-4 text-center">
            <div className="text-3xl font-black text-red-400">5</div>
            <div className="text-sm text-gray-400">Credentials</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">2026</div>
            <div className="text-sm text-gray-400">EIDAS 2.0 Active</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">90%</div>
            <div className="text-sm text-gray-400">Estonia Digital ID</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">EE</div>
            <div className="text-sm text-gray-400">National ID</div>
          </div>
        </section>

        {/* Your DID */}
        <section className="bg-gray-900 border-4 border-red-400 p-6">
          <h2 className="text-sm font-bold text-gray-400 mb-4">YOUR DECENTRALIZED IDENTIFIER</h2>
          <div className="p-4 bg-red-900/30 border-2 border-red-500">
            <div className="font-mono text-sm text-red-400 break-all">did:web:eesti.ee:12345678</div>
            <div className="flex gap-4 mt-3 text-sm">
              <span className="text-gray-400">Method: <span className="text-white">DID Web</span></span>
              <span className="text-gray-400">Status: <span className="text-green-400">Verified</span></span>
            </div>
          </div>
        </section>

        {/* Credentials List */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Your Credentials</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                onClick={() => setSelectedCredential(cred)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedCredential?.id === cred.id
                    ? 'bg-red-900/30 border-red-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-red-400">{cred.type}</h3>
                    <p className="text-sm text-gray-400">{cred.issuer}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-bold bg-green-900 text-green-400">
                    VERIFIED
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Issued: {cred.issued}
                  {cred.expires && ` • Expires: ${cred.expires}`}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {Object.keys(cred.claims).slice(0, 2).map((key) => (
                    <span key={key} className="px-2 py-0.5 bg-gray-700 text-xs rounded">
                      {key}
                    </span>
                  ))}
                  {Object.keys(cred.claims).length > 2 && (
                    <span className="px-2 py-0.5 bg-gray-700 text-xs rounded">
                      +{Object.keys(cred.claims).length - 2} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Credential Detail */}
        {selectedCredential && !isPresenting && (
          <section className="bg-gray-900 border-4 border-red-400 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-black text-red-400">{selectedCredential.type}</h2>
                <p className="text-sm text-gray-400">{selectedCredential.issuer}</p>
              </div>
              <button
                onClick={() => setSelectedCredential(null)}
                className="px-4 py-2 bg-gray-700 text-white font-bold border-2 border-gray-600 hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              {Object.entries(selectedCredential.claims).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 bg-gray-800 border border-gray-700">
                  <span className="text-gray-300">{key}</span>
                  <span className="font-bold text-white">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={createPresentation}
                className="flex-1 py-3 bg-red-500 text-white font-bold border-4 border-red-400 hover:bg-red-400"
              >
                Create Verifiable Presentation →
              </button>
              <button
                onClick={exportCredentials}
                className="px-6 py-3 bg-gray-700 text-white font-bold border-4 border-gray-600 hover:bg-gray-600"
              >
                Export JSON
              </button>
            </div>
          </section>
        )}

        {/* Presentation State */}
        {isPresenting && (
          <section className="bg-gray-900 border-4 border-yellow-400 p-6 text-center">
            <div className="text-4xl mb-4">📤</div>
            <div className="text-xl font-bold text-yellow-400 animate-pulse">
              Presenting to Verifier...
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Only selected claims will be shared
            </div>
          </section>
        )}

        {/* EIDAS Info */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">EIDAS 2.0 (2026)</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-800 border-l-4 border-red-400">
              <h3 className="font-bold text-red-400">EU Digital Identity Wallet</h3>
              <p className="text-gray-400 mt-2">Mandatory by end of 2026 for all EU citizens</p>
            </div>
            <div className="p-3 bg-gray-800 border-l-4 border-blue-400">
              <h3 className="font-bold text-blue-400">Blockchain-Based</h3>
              <p className="text-gray-400 mt-2">Legal standing for decentralized identities</p>
            </div>
            <div className="p-3 bg-gray-800 border-l-4 border-green-400">
              <h3 className="font-bold text-green-400">Self-Sovereign</h3>
              <p className="text-gray-400 mt-2">Users control their own credentials</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How EUDI Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-red-400 mb-2">Create DID</h3>
              <p className="text-xs text-gray-400">Generate decentralized identifier</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Issue Credentials</h3>
              <p className="text-xs text-gray-400">Government issues VCs with signatures</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Selective Disclosure</h3>
              <p className="text-xs text-gray-400">Share only what's needed</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Verify</h3>
              <p className="text-xs text-gray-400">Verifiers check signatures and hashes</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-red-400 hover:underline">@samdevrel</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
