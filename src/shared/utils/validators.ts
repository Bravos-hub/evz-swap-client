/**
 * Utility functions for validation
 */

/**
 * Validate phone number
 */
export function validatePhoneNumber(phone: string): boolean {
  // Basic phone validation - adjust regex based on requirements
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate OTP
 */
export function validateOtp(otp: string): boolean {
  return /^\d{4,6}$/.test(otp);
}

/**
 * Validate required field
 */
export function validateRequired(value: unknown): boolean {
  return value !== null && value !== undefined && value.toString().trim() !== '';
}

