import { useEffect, useState } from 'react';

function UrlProvider() {

  const [backendUrl, setBackendUrl] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch('/config/url.json');
      const data = await response.json();
      setBackendUrl(data.backendUrl);
    };

    fetchConfig();
  }, []);
}

export default UrlProvider;