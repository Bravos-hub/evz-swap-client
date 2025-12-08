/**
 * Authentication API functions
 */

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  token: string;
}

export interface LogoutResponse {
  success: boolean;
}

export const authApi = {
  /**
   * Send OTP to phone number
   */
  async sendOtp(phoneNumber: string): Promise<SendOtpResponse> {
    // TODO: Implement actual API call
    return { success: true, message: 'OTP sent' };
  },

  /**
   * Verify OTP
   */
  async verifyOtp(phoneNumber: string, otp: string): Promise<VerifyOtpResponse> {
    // TODO: Implement actual API call
    return { success: true, token: 'mock-token' };
  },

  /**
   * Logout user
   */
  async logout(): Promise<LogoutResponse> {
    // TODO: Implement actual API call
    return { success: true };
  },
};

