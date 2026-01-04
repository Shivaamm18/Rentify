/**
 * Get the current city of the user using Browser Geolocation API
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
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
          );
          const data = await response.json();
          
          // Try to extract city, town, or village
          const city = data.address.city || data.address.town || data.address.village || data.address.suburb;
          
          if (city) {
            resolve(city);
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
