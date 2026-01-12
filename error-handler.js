/**
 * Error handling and user feedback utilities
 */

class ErrorHandler {
    /**
     * Display error message to user
     * @param {string} message - Error message
     * @param {string} type - Error type: 'error', 'warning', 'info'
     */
    static showError(message, type = 'error') {
        // Create or get error container
        let errorContainer = document.getElementById('errorContainer');

        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'errorContainer';
            errorContainer.className = 'error-container';
            errorContainer.setAttribute('role', 'alert');
            errorContainer.setAttribute('aria-live', 'polite');

            // Insert after header
            const header = document.querySelector('header');
            header.after(errorContainer);
        }

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = `error-message error-${type}`;

        // Sanitize message
        const sanitizedMessage = InputValidator.sanitizeText(message);
        errorDiv.textContent = sanitizedMessage;

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'error-close';
        closeBtn.textContent = '×';
        closeBtn.setAttribute('aria-label', 'Close error message');
        closeBtn.onclick = () => errorDiv.remove();

        errorDiv.appendChild(closeBtn);
        errorContainer.appendChild(errorDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.classList.add('fade-out');
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 5000);

        return errorDiv;
    }

    /**
     * Show field-specific validation error
     */
    static showFieldError(fieldElement, message) {
        // Remove existing error
        this.clearFieldError(fieldElement);

        // Add error class
        fieldElement.classList.add('input-error');
        fieldElement.setAttribute('aria-invalid', 'true');

        // Create error message
        const errorSpan = document.createElement('span');
        errorSpan.className = 'field-error-message';
        errorSpan.id = `${fieldElement.id}-error`;
        errorSpan.textContent = message;
        errorSpan.setAttribute('role', 'alert');

        // Insert after field
        fieldElement.parentElement.appendChild(errorSpan);

        // Link error to field for screen readers
        fieldElement.setAttribute('aria-describedby', errorSpan.id);
    }

    /**
     * Clear field error
     */
    static clearFieldError(fieldElement) {
        fieldElement.classList.remove('input-error');
        fieldElement.setAttribute('aria-invalid', 'false');

        const errorId = `${fieldElement.id}-error`;
        const errorSpan = document.getElementById(errorId);
        if (errorSpan) {
            errorSpan.remove();
        }

        fieldElement.removeAttribute('aria-describedby');
    }

    /**
     * Clear all errors
     */
    static clearAllErrors() {
        const errorContainer = document.getElementById('errorContainer');
        if (errorContainer) {
            errorContainer.innerHTML = '';
        }

        document.querySelectorAll('.input-error').forEach(field => {
            this.clearFieldError(field);
        });
    }

    /**
     * Handle calculation errors
     */
    static handleCalculationError(error) {
        console.error('Calculation error:', error);

        let userMessage = 'Unable to perform calculation. Please check your inputs.';

        if (error.message) {
            if (error.message.includes('at least 2 values')) {
                userMessage = 'Please enter at least 2 environmental parameters to calculate.';
            } else if (error.message.includes('converge')) {
                userMessage = 'Calculation could not converge. Please verify your input values are realistic.';
            }
        }

        this.showError(userMessage, 'warning');
    }

    /**
     * Log error for debugging (could send to analytics in production)
     */
    static logError(error, context = {}) {
        const errorLog = {
            message: error.message,
            stack: error.stack,
            context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        console.error('Error Log:', errorLog);

        // In production, send to error tracking service
        // Example: sendToErrorTracking(errorLog);
    }
}

/**
 * Global error boundary for uncaught errors
 */
window.addEventListener('error', (event) => {
    ErrorHandler.logError(event.error, {
        type: 'uncaught',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

window.addEventListener('unhandledrejection', (event) => {
    ErrorHandler.logError(new Error(event.reason), {
        type: 'unhandled-promise'
    });
});
