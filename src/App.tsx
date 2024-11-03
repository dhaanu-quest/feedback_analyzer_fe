import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileUpload } from './components/FileUpload';
import { AnalysisSection } from './components/AnalysisSection';
import { DataTable } from './components/DataTable';
import { DataList } from './components/DataList';
import { SentimentChart } from './components/SentimentChart';
import { IntegrationSettings } from './components/IntegrationSettings';
import { AuthForm } from './components/AuthForm';
import { UserMenu } from './components/UserMenu';
import { useAuth } from './hooks/useAuth';
import { FileQuestion } from 'lucide-react';
import { APIResponse, TransformedData, IntegrationConfig } from './types';
import { transformData } from './utils/transformData';

// const sampleResponse: APIResponse = {
//   sentiment_analysis: {
//     positive: 1,
//     negative: 5,
//     neutral: 0,
//     user_sentiments: [
//       { userId: "U123", sentiment: "positive", feedback: "Great app, love the features!" },
//       { userId: "U124", sentiment: "negative", feedback: "App crashes frequently" },
//       { userId: "U125", sentiment: "negative", feedback: "Poor customer support" }
//     ]
//   },
//   theme_category: {
//     performance_issues: ["The reports are too slow to load.", "The app crashes every time I try to export."],
//     feature_requests: ["I would love a dark mode option."],
//     onboarding_and_usability: ["The onboarding process is confusing."],
//     customer_support: ["Customer support is slow to respond."],
//     pricing: []
//   },
//   priority: {
//     high: ["The app crashes every time I try to export.", "Customer support is slow to respond."],
//     moderate: ["The reports are too slow to load.", "The onboarding process is confusing."],
//     low: ["I would love a dark mode option."]
//   },
//   feature_requests: [{ request: "Dark mode option", priority: "Low" }],
//   key_problems: ["The app crashes every time I try to export.", "Customer support is slow to respond.", "The reports are too slow to load."],
//   churn_prediction: [
//     { userId: "U124", prediction: "High risk of churning due to app stability issues", risk_level: "high" },
//     { userId: "U125", prediction: "Medium risk due to support dissatisfaction", risk_level: "medium" }
//   ],
//   retention_strategies: ["Improve the stability of the app to prevent crashes during exports.", "Accelerate response times for customer support requests."]
// };

function App() {
  let { user, isAuthenticated, login, register, logout, skip, userData } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<TransformedData | null>(null);
  const [integrationConfig, setIntegrationConfig] = useState<IntegrationConfig>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sentiment: true,
    userSentiments: true,
    userSegments: true,
    themes: true,
    priorities: true,
    features: true,
    problems: true,
    churn: true,
    retention: true
  });
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [previousFiles, setPreviousFiles] = useState<Array<{ id: string; jsonData: string; promptResults?: string; userId: string; fileName: string }>>([]);

  useEffect(() => {
    const API_BASE_URL = 'http://localhost:8080/api/feedbacks';

    const fetchCSVList = async () => {
      if (userData?.userId) {
        try {
          setLoading(true);
          const response = await axios.get(`${API_BASE_URL}/get-feedback?userId=${userData?.userId}`);
          const data = response.data.data;

          setPreviousFiles(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching previous CSV files:', error);
          setLoading(false);
        }
      } else {
        setPreviousFiles([]);
      }
    };

    fetchCSVList();
  }, [userData?.userId]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleIntegrationSave = (config: IntegrationConfig) => {
    setIntegrationConfig(config);
    console.log('Integration settings saved:', config);
  };

  const handleFileUploadSuccess = (response: APIResponse) => {
    setApiResponse(response);
    setLoading(false);
  };

  useEffect(() => {
    if (apiResponse) {
      const transformedData = transformData(apiResponse);
      setData(transformedData);
    }
  }, [apiResponse]);

  if (!userData?.userId && !user && !isAuthenticated) {
    return <AuthForm onLogin={login} onRegister={register} onSkip={skip} />;
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileQuestion className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">AI Feedback Analyzer</h1>
            </div>
            <div className="flex items-center gap-4">
              <IntegrationSettings
                onSave={handleIntegrationSave}
                currentConfig={integrationConfig}
              />
              <UserMenu email={userData?.email} onLogout={logout} />
              {file && (
                <div className="text-sm text-gray-500">
                  Analyzing: {file.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </header> */}

      {/* via-purple-500 to-pink-500 */}
      <header className="bg-gradient-to-br from-blue-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileQuestion className="h-8 w-8 text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">Feedback Analyzer</h1>
            </div>
            <div className="flex items-center gap-4">
              <IntegrationSettings
                onSave={handleIntegrationSave}
                currentConfig={integrationConfig}
              />
              <UserMenu email={userData?.email} onLogout={logout} />
              {file && (
                <div className="text-sm text-white/80">
                  Analyzing: {file.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {(!file && !data) ? (
          <>
            <FileUpload onFileSelect={setFile} onUploadSuccess={handleFileUploadSuccess} />
            {loading && <div className="text-center">Loading previous files...</div>}
            {!loading && previousFiles.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-bold text-gray-700">Previously Uploaded Files:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previousFiles.map((csv, index) => (
                    <div
                      key={index}
                      className="cursor-pointer p-4 bg-white rounded shadow-sm hover:shadow-md transition"
                      onClick={() => {
                        csv?.promptResults && setApiResponse(JSON.parse(csv?.promptResults))
                      }}
                    >
                      {csv.fileName}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : data ? (
          <div className="space-y-6">
            <AnalysisSection
              title="Sentiment Analysis"
              isOpen={openSections.sentiment}
              onToggle={() => toggleSection('sentiment')}
            >
              <SentimentChart data={data.sentiment} />
            </AnalysisSection>

            <AnalysisSection
              title="User Feedbacks"
              isOpen={openSections.userSegments}
              onToggle={() => toggleSection('userSegments')}
            >
              <div className="space-y-8 max-h-80 overflow-y-auto">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfied Users (Positive & Neutral)</h3>
                  <DataTable
                    columns={[
                      { header: 'User ID', accessor: 'userId' },
                      { header: 'Sentiment', accessor: 'sentiment' },
                      { header: 'Feedback', accessor: 'feedback' }
                    ]}
                    data={data.userSegments.satisfied}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dissatisfied Users (Negative)</h3>
                  <DataTable
                    columns={[
                      { header: 'User ID', accessor: 'userId' },
                      { header: 'Sentiment', accessor: 'sentiment' },
                      { header: 'Feedback', accessor: 'feedback' }
                    ]}
                    data={data.userSegments.dissatisfied}
                  />
                </div>
              </div>
            </AnalysisSection>

            <AnalysisSection
              title="Key Themes"
              isOpen={openSections.themes}
              onToggle={() => toggleSection('themes')}
            >
              <div className="max-h-80 overflow-y-auto">
                {data.themes?.map((theme, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{theme.category}</h3>
                    <DataList items={theme.items} sectionName={'key_themes'} category={theme.category} />
                  </div>
                ))}
              </div>
            </AnalysisSection>

            <AnalysisSection
              title="Prioritization"
              isOpen={openSections.priorities}
              onToggle={() => toggleSection('priorities')}
            >
              <div className="max-h-80 overflow-y-auto">
                {data.priorities?.map((priority, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {priority.level} Priority
                    </h3>
                    <DataList items={priority.items} />
                  </div>
                ))}
              </div>
            </AnalysisSection>

            <AnalysisSection
              title="Feature Requests"
              isOpen={openSections.features}
              onToggle={() => toggleSection('features')}
            >
              <div className="max-h-80 overflow-y-auto">
                <DataTable
                  columns={[
                    { header: 'Feature', accessor: 'request' },
                    { header: 'Priority', accessor: 'priority' }
                  ]}
                  data={data.features}
                />
              </div>
            </AnalysisSection>

            <AnalysisSection
              title="Key Problems"
              isOpen={openSections.problems}
              onToggle={() => toggleSection('problems')}
            >
              <div className="max-h-80 overflow-y-auto">
                <DataList
                  items={data.problems?.map(p => p.issue)}
                  className="mt-2"
                />
              </div>
            </AnalysisSection>

            <AnalysisSection
              title="Churn Prediction"
              isOpen={openSections.churn}
              onToggle={() => toggleSection('churn')}
            >
              <div className="max-h-80 overflow-y-auto">
                <DataTable
                  columns={[
                    { header: 'User ID', accessor: 'userId' },
                    { header: 'Reason', accessor: 'reason' },
                  ]}
                  data={data.churnPrediction}
                />
              </div>
            </AnalysisSection>

            <AnalysisSection
              title="Retention Strategies"
              isOpen={openSections.retention}
              onToggle={() => toggleSection('retention')}
            >
              <div className="max-h-80 overflow-y-auto">
                <DataList
                  items={data.retention?.map(r => r.strategy)}
                  className="mt-2"
                />
              </div>
            </AnalysisSection>
          </div>
        ) : (
          <div className="text-center">Loading analysis...</div>
        )}
      </main>
    </div>
  );
}

export default App;