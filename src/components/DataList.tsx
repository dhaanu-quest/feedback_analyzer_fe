import axios from 'axios';

interface DataListProps {
  items: string[];
  className?: string;
  sectionName?: string;
  category?: string
}

export function DataList({ items, className = '', sectionName, category }: DataListProps) {
  const API_BASE_URL = 'http://localhost:8080/api/integrations';
  const authString = localStorage.getItem('auth');
  const auth = authString ? JSON.parse(authString) : { email: '', userId: '' };
  const email = auth.email || '';
  const userId = auth.userId || '';

  const handleJiraClick = async (item: string) => {
    const feedback = {
      summary: `Issue - ${item}`,
      description: `${category}`,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create-jira-issue`, { feedback, userId, email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Jira task created:', response.data);
    } catch (error) {
      console.error('Error creating Jira task:', error);
    }
  };


  const handleClickUpClick = async (item: string) => {
    const feedback = {
      summary: `Task - ${item}`,
      description: `${category}`,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create-clickup-task`, { feedback, userId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('ClickUp task created:', response.data);
    } catch (error) {
      console.error('Error creating ClickUp task:', error);
    }
  };


  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start space-x-2">
          <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-500 rounded-full" />
          <span className="text-gray-700">{item}</span>

          {sectionName === 'key_themes' && (
            <>
              <button
                onClick={() => handleJiraClick(item)}
                className="text-sm text-blue-600 hover:underline"
              >
                Jira
              </button>
              <button
                onClick={() => handleClickUpClick(item)}
                className="text-sm text-green-600 hover:underline"
              >
                ClickUp
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}