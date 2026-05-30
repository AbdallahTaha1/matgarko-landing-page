/**
 * API Client for Matgarko Backend (GrandNode)
 */

const API_BASE_URL = 'http://localhost:5000'; // TODO: Move to env variable

export interface SignupModel {
  storeName: string;
  subdomain: string;
  email: string;
  password: string;
  confirmPassword: string;
  installSampleData: boolean;
  acceptTerms: boolean;
}

export interface AvailabilityResponse {
  available: boolean;
  message: string;
  reason?: 'available' | 'taken' | 'reserved' | 'error';
}

export const api = {
  /**
   * Check if a subdomain is available
   */
  checkSubdomain: async (subdomain: string): Promise<AvailabilityResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup/check-subdomain?subdomain=${encodeURIComponent(subdomain)}`);
      // check if header content type is json
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            if (!response.ok) {
                // If validation failed, it might return a JSON error
                const errorData = await response.json();
                console.error('API Error checking subdomain (server):', errorData);
                throw new Error(errorData.title || 'Network response was not ok');
            }
            return await response.json();
        } else {
             // If not JSON, it might be HTML error page (500)
             if (!response.ok) {
                 const text = await response.text();
                 console.error('API Error checking subdomain (text):', text);
                 throw new Error('Network response was not ok');
             }
             // Should not happen if API is correct
             return { available: false, message: 'Invalid server response', reason: 'error' };
        }

    } catch (error) {
      console.error('API Error checking subdomain:', error);
      return { available: false, message: 'Unable to check availability', reason: 'taken' };
    }
  },

  /**
   * Register a new tenant
   */
  signup: async (data: SignupModel): Promise<{ success: boolean; message?: string; redirectUrl?: string }> => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded', // or multipart/form-data
        },
        body: formData // Fetch automatically sets type for FormData
      });

      if (response.redirected) {
          return { success: true, redirectUrl: response.url };
      }

      if (!response.ok) {
         return { success: false, message: 'Registration failed. Please check your inputs.' };
      }
      
      const text = await response.text();
      // GrandNode might return HTML success page or redirect
      if (text.includes("Success") || response.url.includes("success")) {
           return { success: true };
      }

      return { success: false, message: 'Unexpected response' };

    } catch (error) {
      console.error('API Error signing up:', error);
      return { success: false, message: 'Network error occurred.' };
    }
  }
};
