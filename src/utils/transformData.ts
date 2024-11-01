import { APIResponse, TransformedData } from '../types';

export function transformData(data: APIResponse): TransformedData {
  // Transform sentiment data
  const totalSentiment = data.sentiment_analysis.positive.count +
    data.sentiment_analysis.negative.count +
    data.sentiment_analysis.neutral.count;

  const sentiment = [
    {
      category: 'Positive',
      count: data.sentiment_analysis.positive.count,
      percentage: totalSentiment > 0
        ? Math.round((data.sentiment_analysis.positive.count / totalSentiment) * 100)
        : 0
    },
    {
      category: 'Negative',
      count: data.sentiment_analysis.negative.count,
      percentage: totalSentiment > 0
        ? Math.round((data.sentiment_analysis.negative.count / totalSentiment) * 100)
        : 0
    },
    {
      category: 'Neutral',
      count: data.sentiment_analysis.neutral.count,
      percentage: totalSentiment > 0
        ? Math.round((data.sentiment_analysis.neutral.count / totalSentiment) * 100)
        : 0
    }
  ];

  // Segment users based on sentiment using userIds
  const userSegments = {
    satisfied: [
      ...data.sentiment_analysis.positive.userIds.map(userId => ({ userId, sentiment: 'Positive' })),
      ...data.sentiment_analysis.neutral.userIds.map(userId => ({ userId, sentiment: 'Neutral' }))
    ],
    dissatisfied: data.sentiment_analysis.negative.userIds.map(userId => ({ userId, sentiment: 'Negative' }))
  };

  // Transform themes
  const themes = [
    {
      category: 'Performance Issues',
      items: data.theme_category.performance_issues
    },
    {
      category: 'Feature Requests',
      items: data.theme_category.feature_requests
    },
    {
      category: 'Onboarding and Usability',
      items: data.theme_category.onboarding_and_usability
    },
    {
      category: 'Customer Support',
      items: data.theme_category.customer_support
    },
    {
      category: 'Pricing',
      items: data.theme_category.pricing
    }
  ].filter(theme => theme.items.length > 0);

  // Transform priorities
  const priorities = [
    {
      level: 'High',
      items: data.priority.high
    },
    {
      level: 'Moderate',
      items: data.priority.moderate
    },
    {
      level: 'Low',
      items: data.priority.low
    }
  ].filter(priority => priority.items.length > 0);

  // Transform features
  const features = data.feature_requests?.map(item => ({
    request: item.request,
    priority: item.priority
  }));

  // Transform problems
  const problems = data.key_problems?.map(issue => ({ issue }));

  // Transform churn prediction
  const churnPrediction = data.churn_prediction?.map(item => ({
    userId: item.userId,
    reason: item.reason
  }));

  // Transform retention strategies
  const retention = data.retention_strategies?.map(strategy => ({ strategy }));

  return {
    sentiment,
    userSegments,
    themes,
    priorities,
    features,
    problems,
    churnPrediction,
    retention
  };
}
