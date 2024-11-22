'use client';

import { useState } from 'react';
import Groq from 'groq-sdk';

export default function Home() {
  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [inputMessage, setInputMessage] = useState('');
  const [parsedResponse, setParsedResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fullMessage = `STRICTLY RESPOND ONLY IN JSON, with no other text. 1. Determine the {5} most significant key words in the following text. Keywords must not be proper nouns. 
      2. Provide the most common single word translation for each key word.
      3. Create a simple exemplar sentence of 8 words or less for each key word that showcases it in a highly standard semantic and syntactic context. 
      4. Provide an English translation for each exemplar sentence.
      5. Return the information in a json format following this schema: {
        "keywords": [
          {
            "keyword": "protesté",
            "translation": "protested",
            "exemplar_sentence": "Elle a protesté contre les nouvelles règles.",
            "translation_sentence": "She protested against the new rules."
          }, ... ] }
      
      Text: ${inputMessage}`;

  async function getGroqChatCompletion(messages: any): Promise<void> {
    setIsLoading(true);
    try {
      const response = await groq.chat.completions.create({
        messages,
        model: 'llama3-70b-8192',
      });

      const jsonString = response.choices[0]?.message?.content ?? '';
      if (!jsonString) {
        throw new Error('Response content is empty or null.');
      }

      const jsonObject = JSON.parse(jsonString);
      console.log('Parsed Response:', jsonObject);

      setParsedResponse(jsonObject);
    } catch (error) {
      console.error('Error fetching Groq chat completion:', error);
      setParsedResponse(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">AI Response Checker</h1>

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() =>
            getGroqChatCompletion([{ role: 'system', content: fullMessage }])
          }
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? 'Loading...' : 'Get Results'}
        </button>

        {parsedResponse && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">AI Response:</h3>
            <ul className="space-y-2">
              {parsedResponse.keywords.map((keyword: any, index: number) => (
                <li key={index} className="p-2 bg-white rounded shadow">
                  <p>
                    <strong>Keyword:</strong> {keyword.keyword}
                  </p>
                  <p>
                    <strong>Translation:</strong> {keyword.translation}
                  </p>
                  <p>
                    <strong>Exemplar Sentence:</strong> {keyword.exemplar_sentence}
                  </p>
                  <p>
                    <strong>Translation Sentence:</strong> {keyword.translation_sentence}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}