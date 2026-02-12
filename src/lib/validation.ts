import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

export interface ValidationResult {
    isValid: boolean;
    error?: string;
    formatted?: string;
}

export const validatePhone = (phoneNumber: string, countryCode: string): ValidationResult => {
    try {
        if (!phoneNumber) {
            return { isValid: false, error: 'Phone number is required' };
        }

        // Combine country code and phone number if not already combined
        // This simple check assumes if the phone starts with +, it includes the country code
        let fullNumber = phoneNumber;
        if (!phoneNumber.startsWith('+')) {
            // Remove leading 0 if present to avoid +900555...
            const cleanPhone = phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber;
            fullNumber = `${countryCode}${cleanPhone}`;
        }

        const parsedNumber = parsePhoneNumber(fullNumber);

        if (!parsedNumber) {
            return { isValid: false, error: 'Invalid phone number format' };
        }

        if (parsedNumber.isValid()) {
            return {
                isValid: true,
                formatted: parsedNumber.formatInternational()
            };
        } else {
            return { isValid: false, error: 'Invalid phone number for the selected country' };
        }
    } catch (error) {
        return { isValid: false, error: 'Invalid phone number format' };
    }
};
