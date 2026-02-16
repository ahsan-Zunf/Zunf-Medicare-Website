const axios = require('axios');

async function quickTest() {
    console.log('🧪 Testing chatbot endpoint...\n');

    try {
        const response = await axios.post('http://localhost:5000/chat', {
            message: 'What lab tests are available?'
        });

        console.log('✅ SUCCESS!');
        console.log('Response:', response.data.response);

    } catch (error) {
        console.error('❌ FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

quickTest();
