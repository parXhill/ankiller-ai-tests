import axios, { AxiosError } from 'axios';
import { CardToSend } from '../../store/promptSlice';

// Function to send POST request
export const sendExampleData = async (data: CardToSend) => {


    
    try {

        console.log('sendExampleData called in try block');

        const response = await axios.post('http://209.38.89.241:4000/save-example-data', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // AxiosError - can access `response`
            console.error('Error sending data:', error.response?.data || error.message);
        } else if (error instanceof Error) {
            // Generic Error
            console.error('Error sending data:', error.message);
        } else {
            // Unknown error type
            console.error('Unknown error:', error);
        }
    }}
