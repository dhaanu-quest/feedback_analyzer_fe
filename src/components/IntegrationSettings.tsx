import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Modal } from './Modal';
import { IntegrationConfig } from '../types';
import axios from 'axios';


interface IntegrationSettingsProps {
  onSave: (config: IntegrationConfig) => void;
  currentConfig?: IntegrationConfig;
}

interface AuthData {
  jiraToken?: string;
  jiraDomain?: string;
  jiraKey?: string;
  clickupAPIKey?: string;
  clickupListId?: string;
}

interface Integration {
  integrationName: string;
  auth: AuthData;
}

export function IntegrationSettings({ onSave, currentConfig }: IntegrationSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<IntegrationConfig>(currentConfig || {});
  const [activeTab, setActiveTab] = useState<'jira' | 'clickup'>('jira');

  const API_BASE_URL = 'http://localhost:8080/api/integrations';

  const storedAuth = JSON.parse(localStorage.getItem('auth') || '{}');
  const userId = storedAuth?.userId;
  const email = storedAuth?.email;


  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${API_BASE_URL}/get-integration-data`, {
            params: { userId }
          });

          if (response?.data?.data.length > 0) {
            response?.data?.data.forEach((integration: Integration) => {
              if (integration.integrationName === 'JIRA') {
                setConfig(prevConfig => ({
                  ...prevConfig,
                  jira: {
                    apiToken: integration?.auth?.jiraToken,
                    domain: integration?.auth?.jiraDomain,
                    key: integration?.auth?.jiraKey,
                  },
                }));
              } else if (integration.integrationName === 'CLICKUP') {
                setConfig(prevConfig => ({
                  ...prevConfig,
                  clickup: {
                    apiToken: integration?.auth?.clickupAPIKey,
                    listId: integration?.auth?.clickupListId,
                  },
                }));
              }
            });

          }
        } catch (error) {
          console.error('Error fetching configuration data:', error);
          alert('Failed to fetch configuration data. Please try again.');
        }
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      if (!email || !userId) {
        alert('Please signin, do reload to go back to Signin page!')
      }
      if (activeTab === 'jira' && config.jira) {
        const jiraPayload = {
          userId,
          key: config.jira.key,
          domain: config.jira.domain,
          apiToken: config.jira.apiToken,
        };

        await axios.post(`${API_BASE_URL}/connect-jira`, jiraPayload);
      } else if (activeTab === 'clickup' && config.clickup) {
        const clickupPayload = {
          userId,
          listId: config.clickup.listId,
          apiKey: config.clickup.apiToken,
        };

        await axios.post(`${API_BASE_URL}/connect-clickup`, clickupPayload);
      }

      onSave(config);
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert('Failed to save configuration. Please try again.');
    }
  };

  const updateConfig = (integration: 'jira' | 'clickup', field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        [field]: value
      }
    }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Settings className="h-4 w-4" />
        Integrations
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Integration Settings"
      >
        <div className="space-y-4">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 border-b-2 ${activeTab === 'jira'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('jira')}
            >
              Jira
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${activeTab === 'clickup'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('clickup')}
            >
              ClickUp
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'jira' && (
              <>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key
                  </label>
                  <input
                    type="text"
                    placeholder="your key here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={config.jira?.key || ''}
                    onChange={(e) => updateConfig('jira', 'key', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domain URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://your-domain.atlassian.net"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={config.jira?.domain || ''}
                    onChange={(e) => updateConfig('jira', 'domain', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Token
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={config.jira?.apiToken || ''}
                    onChange={(e) => updateConfig('jira', 'apiToken', e.target.value)}
                  />
                </div>
              </>
            )}

            {activeTab === 'clickup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Token
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={config.clickup?.apiToken || ''}
                    onChange={(e) => updateConfig('clickup', 'apiToken', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    List ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={config.clickup?.listId || ''}
                    onChange={(e) => updateConfig('clickup', 'listId', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              // disabled={!email || !userId}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}