import { useEffect, useState } from 'react';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading state true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a 2-second delay before loading
        setTimeout(async () => {
          const response = await fetch('https://uhu40zsrq2.execute-api.eu-north-1.amazonaws.com/');
          
          if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
          }
          
          const result = await response.json();
          setData(result);
          setLoading(false); // Set loading to false after data is fetched
        }, 2000); // 2-second delay
      } catch (err) {
        setError(err.message);
        setLoading(false); // Even if there's an error, stop loading
      }
    };

    fetchData();
  }, []);

  // Render loading message or spinner
  if (loading) return <div>Loading</div>;

  // Render error message if there was an issue
  if (error) return <div>Error: {error}</div>;

  // Render fetched data
  return (
    <div>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the fetched data */}
    </div>
  );
};

export default HomePage;
