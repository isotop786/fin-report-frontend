'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

// Sample Fortune 500 companies (you can expand this list)
const FORTUNE_500_COMPANIES = [
  'Apple Inc.',
  'Microsoft Corporation',
  'Amazon.com Inc.',
  'Alphabet Inc.',
  'Berkshire Hathaway Inc.',
  'UnitedHealth Group Incorporated',
  'Exxon Mobil Corporation',
  'Johnson & Johnson',
  'JPMorgan Chase & Co.',
  'Visa Inc.',
  'Procter & Gamble Company',
  'Walmart Inc.',
  'Mastercard Incorporated',
  'NVIDIA Corporation',
  'The Home Depot Inc.',
  'Chevron Corporation',
  'AbbVie Inc.',
  'Merck & Co. Inc.',
  'Coca-Cola Company',
  'PepsiCo Inc.',
  'Netflix Inc.',
].sort();

interface FinancialReport {
  result: {
    raw: string;
    pydantic: any;
    json_dict: any;
    tasks_output: Array<{
      description: string;
      name: string;
      expected_output: string;
      summary: string;
      raw: string;
    }>;
    token_usage: {
      total_tokens: number;
      prompt_tokens: number;
      cached_prompt_tokens: number;
      completion_tokens: number;
      successful_requests: number;
    };
  };
}

export default function FinancialReportsPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [financialReport, setFinancialReport] = useState<FinancialReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFinancialReport = async () => {
    if (!selectedCompany) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://crewai-backend-833837587586.europe-west1.run.app/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: selectedCompany }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: FinancialReport = await response.json();
      setFinancialReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch financial report');
      setFinancialReport(null);
    } finally {
      setLoading(false);
    }
  };

  // Parse markdown to extract key sections
  const parseReport = (markdown: string) => {
    const sections: { title: string; content: string }[] = [];
    const lines = markdown.split('\n');
    let currentSection = { title: '', content: '' };

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        if (currentSection.title) {
          sections.push(currentSection);
        }
        currentSection = { title: line.replace('## ', '').trim(), content: '' };
      } else if (currentSection.title && line.trim()) {
        currentSection.content += line + '\n';
      }
    });

    if (currentSection.title) {
      sections.push(currentSection);
    }

    return sections;
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">
          AI-Powered Financial Reports
        </h1>
        <p className="text-slate-400 mb-8">
          Select a company to view its latest comprehensive financial analysis
        </p>

        {/* Dropdown and Button */}
        <div className="mb-8 flex gap-3">
          <div className="flex-1">
            <label 
              htmlFor="company-select" 
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Select Company
            </label>
            <select
              id="company-select"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="">-- Choose a company --</option>
              {FORTUNE_500_COMPANIES.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={fetchFinancialReport}
              disabled={!selectedCompany || loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading...' : 'Get Report'}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-slate-800 rounded-lg shadow-md p-8 text-center border border-slate-700">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-slate-300">Generating comprehensive financial report...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-6">
            <h3 className="text-red-400 font-semibold mb-2">Error</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Financial Report Display */}
        {!loading && !error && financialReport && (
          <div className="space-y-6">
            {/* Executive Summary */}
            <div className="bg-slate-800 rounded-lg shadow-md p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">
                {selectedCompany} - Financial Analysis Report
              </h2>
              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 whitespace-pre-wrap">
                  
                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                >
                   {financialReport.result.raw.split('## ')[1]?.split('\n').slice(1).join('\n')}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Report Sections */}
            {parseReport(financialReport.result.raw).slice(1).map((section, index) => (
              <div key={index} className="bg-slate-800 rounded-lg shadow-md p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">
                  {section.title}
                </h3>
                <div className="prose prose-invert max-w-none">
                  <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                    >
                      {section.content}
                    </ReactMarkdown>
                  </div>
                  <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Token Usage Stats */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-slate-400 text-sm">Total Tokens</p>
                  <p className="text-white font-semibold">
                    {financialReport.result.token_usage.total_tokens.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Prompt Tokens</p>
                  <p className="text-white font-semibold">
                    {financialReport.result.token_usage.prompt_tokens.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Completion Tokens</p>
                  <p className="text-white font-semibold">
                    {financialReport.result.token_usage.completion_tokens.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">API Requests</p>
                  <p className="text-white font-semibold">
                    {financialReport.result.token_usage.successful_requests}
                  </p>
                </div>
               
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-12 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()}  All rights reserved. Built with CrewAI.
      </footer>
    </div>
  );
}