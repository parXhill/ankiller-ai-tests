import axios from 'axios';

interface ExampleData {
  id: number;
  keyword: string;
  keywordTranslation: string;
  exemplar: string;
  exemplarTranslation: string;
}

export const fetchExampleData = async (): Promise<ExampleData[]> => {
  try {
    const response = await axios.get<ExampleData[]>(
      'https://alexanderjames.site:4000/load-example-data'
    );

    console.log('data response', response.data);

    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch example data'); // Throw error to be handled by the caller
  }
};