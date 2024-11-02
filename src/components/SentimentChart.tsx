import ReactEcharts from 'echarts-for-react';

interface SentimentChartProps {
  data: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
}

export function SentimentChart({ data }: SentimentChartProps) {
  // Define colors for each category
  const COLORS = {
    Positive: '#22c55e',
    Negative: '#ef4444',
    Neutral: '#3b82f6'
  };

  // Prepare chart options for ECharts
  const getChartOptions = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `
            <div class="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <p class="font-semibold text-gray-900">${params.name}</p>
              <p class="text-gray-600">Count: ${params.value}</p>
              <p class="text-gray-600">Percentage: ${params.percent}%</p>
            </div>
          `;
        }
      },
      legend: {
        orient: 'horizontal',
        bottom: '10%',
        textStyle: {
          color: '#4B5563'
        }
      },
      series: [
        {
          name: 'Sentiment',
          type: 'pie',
          radius: ['40%', '70%'],
          label: {
            show: true,
            formatter: '{d}%', // Show percentage in the label
            color: '#ffffff',
            fontSize: 12
          },
          labelLine: {
            show: false
          },
          data: data.map((item) => ({
            value: item.count,
            name: item.category,
            itemStyle: {
              color: COLORS[item.category as keyof typeof COLORS]
            }
          }))
        }
      ]
    };
  };

  return (
    <div className="w-full h-[400px]">
      <ReactEcharts
        option={getChartOptions()}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
}
