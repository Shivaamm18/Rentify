/**
 * Get the current city and detailed location of the user using Browser Geolocation API
 * and reverse geocoding with OpenStreetMap Nominatim API.
 */
export const getCurrentCity = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use OpenStreetMap Nominatim API for free reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'en'
              }
            }
          );
          const data = await response.json();
          
          // Extract city and locality information
          const address = data.address;
          const city = address.city || address.town || address.village || address.municipality || address.county;
          const suburb = address.suburb || address.neighbourhood || address.residential || address.road;
          
          if (city) {
            resolve({
              city,
              suburb,
              display_name: data.display_name,
              lat: latitude,
              lon: longitude,
              address: address
            });
          } else {
            reject(new Error('City not found in location data'));
          }
        } catch (error) {
          reject(new Error('Failed to fetch city from coordinates'));
        }
      },
      (error) => {
        reject(new Error(error.message));
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
};

/**
 * Get nearby localities for a given city or coordinates
 * For now, this is a mock implementation that returns some localities
 * in Bangalore if the city is Bangalore, or uses the suburb from reverse geocoding.
 */
export const getNearbyLocalities = async (cityData) => {
  // If we have a suburb/road from cityData, we can use it
  const suggestions = [];
  
  if (cityData.suburb) suggestions.push(cityData.suburb);
  
  // Add some defaults for Bangalore if that's the city
  if (cityData.city.toLowerCase().includes('bangalore') || cityData.city.toLowerCase().includes('bengaluru')) {
    const bangaloreDefaults = ['Whitefield', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Electronic City'];
    bangaloreDefaults.forEach(d => {
      if (!suggestions.includes(d)) suggestions.push(d);
    });
  } else if (cityData.city.toLowerCase().includes('mumbai')) {
    const mumbaiDefaults = ['Andheri', 'Bandra', 'Powai', 'Worli', 'Juhu'];
    mumbaiDefaults.forEach(d => {
      if (!suggestions.includes(d)) suggestions.push(d);
    });
  }
  
  return suggestions.slice(0, 5);
};
