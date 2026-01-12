/**
 * Configuration constants for the Environmental Risk Analyzer
 * Centralizes magic numbers and thresholds for maintainability
 */

const AppConfig = {
    // Input validation ranges
    validation: {
        temperature: {
            min: -40,
            max: 120,
            step: 0.1
        },
        relativeHumidity: {
            min: 0,
            max: 100,
            step: 0.1
        },
        dewPoint: {
            min: -40,
            max: 100,
            step: 0.1
        },
        absoluteHumidity: {
            min: 0,
            max: 100,
            step: 0.01
        },
        fluctuation: {
            temperature: {
                min: 0,
                max: 20,
                step: 0.5
            },
            rh: {
                min: 0,
                max: 30,
                step: 0.5
            }
        }
    },

    // Calculation settings
    calculation: {
        minInputsRequired: 2,
        iterationMax: 100,
        iterationTolerance: 0.01,
        decimalPrecision: {
            temperature: 1,
            relativeHumidity: 1,
            dewPoint: 1,
            absoluteHumidity: 2
        }
    },

    // UI settings
    ui: {
        debounceDelay: 300, // ms
        animationDuration: 500 // ms
    },

    // Risk rating colors (matching brand guidelines)
    colors: {
        excellent: '#4CAF50',
        good: '#8BC34A',
        fair: '#FFC107',
        moderate: '#FF9800',
        high: '#FF5722',
        veryHigh: '#E64A19',
        critical: '#D32F2F',
        primary: '#781FFF',
        secondary: '#42A5F5'
    },

    // Fluctuation thresholds (based on Bizot Protocol and material sensitivity)
    fluctuation: {
        temperature: {
            general: 5,        // ±5°F acceptable for general collections
            sensitive: 3,      // ±3°F for sensitive materials
            verySensitive: 2   // ±2°F for very sensitive materials
        },
        rh: {
            general: 10,       // ±10% per 24 hours (Bizot Protocol)
            moderate: 7,       // ±7% elevated but acceptable
            sensitive: 5,      // ±5% for sensitive materials
            verySensitive: 4,  // ±4% for very sensitive materials
            critical: 3        // ±3% for critical materials
        }
    },

    // Natural aging thresholds (temperature-based)
    naturalAging: {
        excellent: 60,
        good: 68,
        fair: 72,
        moderate: 76,
        high: 80
    },

    // Mechanical decay thresholds (RH-based)
    mechanicalDecay: {
        excellentRange: { min: 35, max: 45 },
        goodRange: { min: 30, max: 50 },
        fairRange: { min: 25, max: 55 },
        moderateRange: { min: 20, max: 60 },
        highRange: { min: 15, max: 70 }
    },

    // Mold growth thresholds
    moldGrowth: {
        criticalRH: 70,
        criticalTemp: 70,
        veryHighRH: 65,
        veryHighTemp: 65,
        highRH: 60,
        highTemp: 60,
        moderateRH: 55,
        lowRH: 45,
        veryLowRH: 35
    },

    // Metal corrosion thresholds (dew point-based)
    metalCorrosion: {
        excellent: 40,
        good: 50,
        fair: 55,
        moderate: 60,
        high: 65
    }
};

// Make config read-only
Object.freeze(AppConfig);
Object.keys(AppConfig).forEach(key => {
    if (typeof AppConfig[key] === 'object') {
        Object.freeze(AppConfig[key]);
    }
});
