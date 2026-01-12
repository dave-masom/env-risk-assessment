/**
 * Input validation and sanitization utilities
 * Protects against XSS and ensures data integrity
 */

class InputValidator {
    /**
     * Sanitize text input to prevent XSS
     * @param {string} input - Raw text input
     * @returns {string} - Sanitized text
     */
    static sanitizeText(input) {
        if (typeof input !== 'string') {
            return '';
        }

        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    /**
     * Validate and sanitize numeric input
     * @param {number|string} value - Input value
     * @param {Object} constraints - Min, max, step constraints
     * @returns {Object} - { valid: boolean, value: number, error: string }
     */
    static validateNumber(value, constraints = {}) {
        const { min = -Infinity, max = Infinity, step = null } = constraints;

        // Convert to number
        const num = parseFloat(value);

        // Check if valid number
        if (isNaN(num)) {
            return {
                valid: false,
                value: null,
                error: 'Please enter a valid number'
            };
        }

        // Check range
        if (num < min) {
            return {
                valid: false,
                value: null,
                error: `Value must be at least ${min}`
            };
        }

        if (num > max) {
            return {
                valid: false,
                value: null,
                error: `Value must be at most ${max}`
            };
        }

        // Skip step validation - it's too prone to floating-point errors
        // and the HTML input type="number" already handles step validation in the browser
        // if (step !== null && step > 0) {
        //     // Validate step alignment
        // }

        return {
            valid: true,
            value: num,
            error: null
        };
    }

    /**
     * Validate temperature input
     */
    static validateTemperature(value) {
        return this.validateNumber(value, AppConfig.validation.temperature);
    }

    /**
     * Validate relative humidity input
     */
    static validateRelativeHumidity(value) {
        return this.validateNumber(value, AppConfig.validation.relativeHumidity);
    }

    /**
     * Validate dew point input
     */
    static validateDewPoint(value) {
        return this.validateNumber(value, AppConfig.validation.dewPoint);
    }

    /**
     * Validate absolute humidity input
     */
    static validateAbsoluteHumidity(value) {
        return this.validateNumber(value, AppConfig.validation.absoluteHumidity);
    }

    /**
     * Validate temperature fluctuation input
     */
    static validateTempFluctuation(value) {
        return this.validateNumber(value, AppConfig.validation.fluctuation.temperature);
    }

    /**
     * Validate RH fluctuation input
     */
    static validateRHFluctuation(value) {
        return this.validateNumber(value, AppConfig.validation.fluctuation.rh);
    }

    /**
     * Validate input based on field type
     */
    static validateInput(fieldName, value) {
        const validators = {
            temperature: this.validateTemperature,
            relativeHumidity: this.validateRelativeHumidity,
            dewPoint: this.validateDewPoint,
            absoluteHumidity: this.validateAbsoluteHumidity,
            tempFluctuation: this.validateTempFluctuation,
            rhFluctuation: this.validateRHFluctuation
        };

        const validator = validators[fieldName];
        if (!validator) {
            return {
                valid: false,
                value: null,
                error: `Unknown field: ${fieldName}`
            };
        }

        return validator.call(this, value);
    }
}

/**
 * Debounce utility for performance optimization
 */
class Debouncer {
    constructor(func, delay) {
        this.func = func;
        this.delay = delay;
        this.timeoutId = null;
    }

    call(...args) {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.func(...args);
        }, this.delay);
    }

    cancel() {
        clearTimeout(this.timeoutId);
    }
}
