import axios from 'axios';

export const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post('http://localhost:8000/analyze-sentiment/', {
      text: text,
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};