export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const apiKey = process.env.OPENWEATHER_API_KEY;

    console.log('Request URL:', request.url);
    console.log('City:', city);
    console.log('API Key Length:', apiKey?.length);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log('API URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Response Status:', response.status);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error Response Body:', errorBody);
      throw new Error('City not found or API error');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Detailed Error:', error);
    return Response.json({ 
      error: error.message,
      fullError: error
    }, { status: 400 });
  }
}
