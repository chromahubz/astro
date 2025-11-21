'use client';

import { useState } from 'react';
import { runAllVerificationTests, verifySiderealTime } from '@/lib/astronomy/verification';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyPage() {
  const [results, setResults] = useState<any>(null);
  const [siderealResults, setSiderealResults] = useState<any>(null);

  const runTests = () => {
    const testResults = runAllVerificationTests();
    const stResults = verifySiderealTime();
    setResults(testResults);
    setSiderealResults(stResults);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Star Map
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">Astronomical Accuracy Verification</h1>
        <p className="text-gray-400 mb-8">
          Test our calculations against known star positions and sidereal time values
        </p>

        <Button onClick={runTests} size="lg" className="mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Run Verification Tests
        </Button>

        {results && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Test Summary</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-700 p-4 rounded">
                  <div className="text-3xl font-bold">{results.totalTests}</div>
                  <div className="text-gray-400">Total Tests</div>
                </div>
                <div className="bg-green-900/50 p-4 rounded">
                  <div className="text-3xl font-bold text-green-400">{results.passed}</div>
                  <div className="text-gray-400">Passed</div>
                </div>
                <div className="bg-red-900/50 p-4 rounded">
                  <div className="text-3xl font-bold text-red-400">{results.failed}</div>
                  <div className="text-gray-400">Failed</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Coordinate Transformation Tests</h2>
              <div className="space-y-4">
                {results.results.map((result: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded ${result.passed ? 'bg-green-900/20 border border-green-700' : 'bg-red-900/20 border border-red-700'}`}
                  >
                    <pre className="text-sm font-mono whitespace-pre-wrap">{result.details}</pre>
                  </div>
                ))}
              </div>
            </div>

            {siderealResults && (
              <div className="bg-slate-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Sidereal Time Tests</h2>
                <div className="space-y-4">
                  {siderealResults.map((result: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded ${result.passed ? 'bg-green-900/20 border border-green-700' : 'bg-red-900/20 border border-red-700'}`}
                    >
                      <pre className="text-sm font-mono">{result.details}</pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-blue-900/20 border border-blue-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to Verify Accuracy
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Use Stellarium:</strong> Download free planetarium software and compare star positions</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Check with SkySafari:</strong> Mobile app with accurate star positions</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>USNO Data:</strong> US Naval Observatory provides reference star positions</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Known Facts:</strong> Polaris at latitude = altitude, stars on equator rise due east</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
