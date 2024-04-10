const axios = require('axios');

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Extracting the data array directly from the event body
    const { data } = JSON.parse(event.body);
    const sheetDBEndpoint = 'https://sheetdb.io/api/v1/74b9xzgezw86q'; 
    
    // Ensure that the data array is structured correctly
    if (!Array.isArray(data) || data.length === 0 || !data[0]) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ message: 'Data format is incorrect or empty' }) 
      };
    }
    
    // Post the response to SheetDB
    const response = await axios.post(sheetDBEndpoint, { data });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Response saved successfully!' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ message: 'Error saving response', error: error.toString() }) 
    };
  }
};
