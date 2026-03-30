'use client';

import { useState } from 'react';

export default function TestCozePage() {
  const [token, setToken] = useState('');
  const [botId, setBotId] = useState('7481860697149407270');
  const [query, setQuery] = useState('你好');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResult('');

    try {
      console.log('=== 开始测试 Coze API ===');
      console.log('Token:', token ? '已设置' : '未设置');
      console.log('Bot ID:', botId);
      console.log('Query:', query);

      const response = await fetch('https://api.coze.com/open_api/v2/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          bot_id: botId,
          user_id: 'test_user_' + Date.now(),
          query: query,
          stream: false,
        }),
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

      const rawData = await response.text();
      console.log('Raw Response:', rawData);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${rawData}`);
      }

      const data = JSON.parse(rawData);
      console.log('Parsed Data:', data);

      setResult(`✅ 成功！\n\n状态码: ${response.status}\n\n原始响应:\n${rawData}\n\n解析数据:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error('测试失败:', error);
      setResult(`❌ 失败！\n\n错误: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Coze API 测试工具</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              API Token <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="粘贴您的 Coze API Token"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Token 会以明文形式显示在控制台，请确保在安全环境中测试
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Bot ID
            </label>
            <input
              type="text"
              value={botId}
              onChange={(e) => setBotId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              测试问题
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
          </div>

          <button
            onClick={testAPI}
            disabled={!token || loading}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            {loading ? '测试中...' : '开始测试'}
          </button>

          {result && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">测试结果</h2>
              <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
