/**
 * Main application logic for dew point calculator
 */

class DecayRiskAnalyzer {
    /**
     * Calculate decay risk ratings based on environmental conditions
     * Ratings based on preservation science guidelines (IPI research)
     */

    static analyzeNaturalAging(tempF, rh) {
        // Natural aging is primarily driven by temperature
        // Higher temps = faster chemical degradation
        // Optimal: < 68°F
        // Warning: 68-75°F
        // Poor: 75-80°F
        // Critical: > 80°F

        let score = 0;
        let rating = '';
        let color = '';

        if (tempF < 60) {
            score = 95;
            rating = 'Excellent';
            color = '#4CAF50';
        } else if (tempF < 68) {
            score = 85;
            rating = 'Good';
            color = '#8BC34A';
        } else if (tempF < 72) {
            score = 70;
            rating = 'Fair';
            color = '#FFC107';
        } else if (tempF < 76) {
            score = 50;
            rating = 'Moderate Risk';
            color = '#FF9800';
        } else if (tempF < 80) {
            score = 30;
            rating = 'High Risk';
            color = '#FF5722';
        } else {
            score = 10;
            rating = 'Critical Risk';
            color = '#D32F2F';
        }

        return { score, rating, color };
    }

    static analyzeMechanicalDecay(tempF, rh) {
        // Mechanical decay from dimensional changes
        // Driven by RH fluctuations and extremes
        // Optimal: 30-50% RH
        // Acceptable: 25-55% RH

        let score = 0;
        let rating = '';
        let color = '';

        const rhDiff = Math.min(Math.abs(rh - 30), Math.abs(rh - 50));

        if (rh >= 35 && rh <= 45) {
            score = 95;
            rating = 'Excellent';
            color = '#4CAF50';
        } else if (rh >= 30 && rh <= 50) {
            score = 85;
            rating = 'Good';
            color = '#8BC34A';
        } else if (rh >= 25 && rh <= 55) {
            score = 70;
            rating = 'Fair';
            color = '#FFC107';
        } else if (rh >= 20 && rh <= 60) {
            score = 50;
            rating = 'Moderate Risk';
            color = '#FF9800';
        } else if (rh >= 15 && rh <= 70) {
            score = 30;
            rating = 'High Risk';
            color = '#FF5722';
        } else {
            score = 10;
            rating = 'Critical Risk';
            color = '#D32F2F';
        }

        return { score, rating, color };
    }

    static analyzeMoldGrowth(tempF, rh, dewPoint) {
        // Mold growth risk based on RH and temperature
        // Critical factor: sustained RH > 65%
        // Risk increases with temperature

        let score = 0;
        let rating = '';
        let color = '';

        // Mold risk is combination of RH and temp
        if (rh >= 70 && tempF >= 70) {
            score = 5;
            rating = 'Critical Risk';
            color = '#D32F2F';
        } else if (rh >= 65 && tempF >= 65) {
            score = 20;
            rating = 'Very High Risk';
            color = '#E64A19';
        } else if (rh >= 60 && tempF >= 60) {
            score = 40;
            rating = 'High Risk';
            color = '#FF5722';
        } else if (rh >= 55) {
            score = 60;
            rating = 'Moderate Risk';
            color = '#FF9800';
        } else if (rh >= 45) {
            score = 80;
            rating = 'Low Risk';
            color = '#FFC107';
        } else if (rh >= 35) {
            score = 90;
            rating = 'Very Low Risk';
            color = '#8BC34A';
        } else {
            score = 95;
            rating = 'Minimal Risk';
            color = '#4CAF50';
        }

        return { score, rating, color };
    }

    static analyzeMetalCorrosion(tempF, rh, dewPoint) {
        // Metal corrosion risk based on dew point
        // Lower dew point = lower corrosion risk
        // Critical: DP > 60°F
        // Good: DP < 50°F

        let score = 0;
        let rating = '';
        let color = '';

        if (dewPoint < 40) {
            score = 95;
            rating = 'Excellent';
            color = '#4CAF50';
        } else if (dewPoint < 50) {
            score = 85;
            rating = 'Good';
            color = '#8BC34A';
        } else if (dewPoint < 55) {
            score = 70;
            rating = 'Fair';
            color = '#FFC107';
        } else if (dewPoint < 60) {
            score = 50;
            rating = 'Moderate Risk';
            color = '#FF9800';
        } else if (dewPoint < 65) {
            score = 30;
            rating = 'High Risk';
            color = '#FF5722';
        } else {
            score = 10;
            rating = 'Critical Risk';
            color = '#D32F2F';
        }

        return { score, rating, color };
    }

    static analyzeAll(tempF, rh, dewPoint) {
        return {
            naturalAging: this.analyzeNaturalAging(tempF, rh),
            mechanicalDecay: this.analyzeMechanicalDecay(tempF, rh),
            moldGrowth: this.analyzeMoldGrowth(tempF, rh, dewPoint),
            metalCorrosion: this.analyzeMetalCorrosion(tempF, rh, dewPoint)
        };
    }
}

// UI Controller
class CalculatorUI {
    constructor() {
        this.inputs = {
            temperature: document.getElementById('temperature'),
            relativeHumidity: document.getElementById('relativeHumidity'),
            dewPoint: document.getElementById('dewPoint'),
            absoluteHumidity: document.getElementById('absoluteHumidity')
        };

        this.fluctuationInputs = {
            tempFluctuation: document.getElementById('tempFluctuation'),
            rhFluctuation: document.getElementById('rhFluctuation')
        };

        this.clearBtn = document.getElementById('clearBtn');
        this.decaySection = document.getElementById('decaySection');
        this.collectionTypeSelect = document.getElementById('collectionType');
        this.collectionInfo = document.getElementById('collectionInfo');
        this.fluctuationWarning = document.getElementById('fluctuationWarning');
        this.fluctuationMessage = document.getElementById('fluctuationMessage');

        this.currentMaterialType = 'general';
        this.autoCalculateEnabled = true;

        // Create debounced calculation function
        this.debouncedCalculate = new Debouncer(
            () => this.autoCalculate(),
            AppConfig.ui.debounceDelay
        );

        this.setupEventListeners();
        this.updateCollectionInfo();
    }

    setupEventListeners() {
        // Clear button
        this.clearBtn.addEventListener('click', () => this.clearAll());

        // Input change handlers - auto-calculate on input with debouncing
        Object.entries(this.inputs).forEach(([key, input]) => {
            input.addEventListener('input', () => {
                // Clear field error when user starts typing
                ErrorHandler.clearFieldError(input);

                // Remove 'calculated' class when user types in a field
                // This marks it as a user-entered value, not a calculated one
                input.classList.remove('calculated');

                this.debouncedCalculate.call();
            });
        });

        // Increment/Decrement buttons
        document.querySelectorAll('.increment-btn, .decrement-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const inputId = e.target.dataset.input;
                const input = this.inputs[inputId] || this.fluctuationInputs[inputId];

                if (!input) return;

                const step = parseFloat(input.step) || 1;
                const isIncrement = e.target.classList.contains('increment-btn');

                let currentValue = parseFloat(input.value) || 0;
                let newValue = isIncrement ? currentValue + step : currentValue - step;

                // Don't allow negative fluctuations
                if (this.fluctuationInputs[inputId] && newValue < 0) {
                    newValue = 0;
                }

                // Format to remove trailing zeros
                input.value = parseFloat(newValue.toFixed(10)).toString();

                // Remove calculated class since user is manually adjusting
                input.classList.remove('calculated');

                // Clear any field errors
                ErrorHandler.clearFieldError(input);

                // Trigger auto-calculation (use immediate, not debounced for buttons)
                this.autoCalculate();

                // If this is a fluctuation input, analyze fluctuation
                if (this.fluctuationInputs[inputId]) {
                    this.analyzeFluctuation();
                }
            });
        });

        // Fluctuation input change handlers
        Object.values(this.fluctuationInputs).forEach(input => {
            input.addEventListener('input', () => {
                this.analyzeFluctuation();
            });
        });

        // Collection type change handler
        this.collectionTypeSelect.addEventListener('change', () => {
            this.currentMaterialType = this.collectionTypeSelect.value;
            this.updateCollectionInfo();
            // Re-calculate if we have values
            this.autoCalculate();
            // Re-analyze fluctuation with new material type
            this.analyzeFluctuation();
        });
    }

    updateCollectionInfo() {
        const profile = MaterialSpecificRiskAnalyzer.getProfile(this.currentMaterialType);
        const tempRange = `${profile.optimalTemp.min}-${profile.optimalTemp.max}${profile.optimalTemp.unit}`;
        const rhRange = `${profile.optimalRH.min}-${profile.optimalRH.max}${profile.optimalRH.unit}`;

        this.collectionInfo.textContent = `${profile.description} | Optimal: ${tempRange}, ${rhRange}`;

        if (profile.notes) {
            this.collectionInfo.textContent += ` | ${profile.notes}`;
        }
    }

    getInputValues() {
        const values = {};

        Object.entries(this.inputs).forEach(([key, input]) => {
            const value = input.value.trim();
            values[key] = value === '' ? null : parseFloat(value);
        });

        return values;
    }

    autoCalculate() {
        try {
            // Clear previous errors
            ErrorHandler.clearAllErrors();

            const inputValues = this.getInputValues();

            // Validate each non-null input
            for (const [key, value] of Object.entries(inputValues)) {
                if (value !== null) {
                    const validation = InputValidator.validateInput(key, value);
                    if (!validation.valid) {
                        ErrorHandler.showFieldError(this.inputs[key], validation.error);
                        this.decaySection.style.display = 'none';
                        return;
                    }
                }
            }

            // Count how many values are provided
            const provided = Object.values(inputValues)
                .filter(v => v !== null && v !== undefined && v !== '').length;

            // Need at least 2 values
            if (provided < AppConfig.calculation.minInputsRequired) {
                // Hide decay section if not enough values
                this.decaySection.style.display = 'none';
                // Clear calculated styling
                Object.values(this.inputs).forEach(input => {
                    input.classList.remove('calculated');
                });
                return;
            }

            // Perform calculation
            const results = PsychrometricCalculator.solve(inputValues);

            // Update input fields with calculated values
            this.updateInputs(results);

            // Calculate decay risks using material-specific analysis
            const risks = MaterialSpecificRiskAnalyzer.analyzeForMaterial(
                results.temperature,
                results.relativeHumidity,
                results.dewPoint,
                this.currentMaterialType
            );

            // Display decay analysis
            this.displayDecayRisks(risks);

            // Display optimal conditions for material
            this.displayOptimalConditions();

        } catch (error) {
            // Handle calculation errors with user feedback
            ErrorHandler.handleCalculationError(error);
            ErrorHandler.logError(error, {
                context: 'autoCalculate',
                inputs: this.getInputValues(),
                materialType: this.currentMaterialType
            });
            this.decaySection.style.display = 'none';
        }
    }

    updateInputs(results) {
        // Track which fields have the 'calculated' class (were previously calculated)
        // We want to update those fields with new calculated values
        const wasCalculated = {};
        Object.entries(this.inputs).forEach(([key, input]) => {
            wasCalculated[key] = input.classList.contains('calculated');
        });

        // Also track which fields are currently empty
        const isEmpty = {};
        Object.entries(this.inputs).forEach(([key, input]) => {
            isEmpty[key] = input.value === '';
        });

        // Update all inputs with results
        Object.entries(results).forEach(([key, value]) => {
            if (this.inputs[key]) {
                // Update if field was empty OR if it was previously calculated
                // This allows calculated fields to update when user changes input values
                if (isEmpty[key] || wasCalculated[key]) {
                    const precision = AppConfig.calculation.decimalPrecision[key] || 1;
                    // Format value appropriately - remove unnecessary decimals
                    let formattedValue = value.toFixed(precision);
                    // Remove trailing zeros and decimal point if whole number
                    formattedValue = parseFloat(formattedValue).toString();

                    this.inputs[key].value = formattedValue;
                    this.inputs[key].classList.add('calculated');
                } else {
                    // Field has a user-entered value, don't update it
                    this.inputs[key].classList.remove('calculated');
                }
            }
        });
    }


    displayDecayRisks(risks) {
        this.updateDecayCard('ratingNaturalAging', risks.naturalAging);
        this.updateDecayCard('ratingMechanicalDecay', risks.mechanicalDecay);
        this.updateDecayCard('ratingMoldGrowth', risks.moldGrowth);
        this.updateDecayCard('ratingMetalCorrosion', risks.metalCorrosion);

        this.decaySection.style.display = 'block';
    }

    updateDecayCard(elementId, riskData) {
        const element = document.getElementById(elementId);
        const bar = element.querySelector('.rating-bar');
        const text = element.querySelector('.rating-text');

        bar.style.width = `${riskData.score}%`;
        bar.style.backgroundColor = riskData.color;
        text.textContent = riskData.rating;
        text.style.color = riskData.color;
    }

    displayOptimalConditions() {
        const profile = MaterialSpecificRiskAnalyzer.getProfile(this.currentMaterialType);
        const optimalRange = document.getElementById('optimalRange');
        const materialTypeName = document.getElementById('materialTypeName');
        const optimalTemp = document.getElementById('optimalTemp');
        const optimalRH = document.getElementById('optimalRH');

        materialTypeName.textContent = profile.name;
        optimalTemp.textContent = `${profile.optimalTemp.min}-${profile.optimalTemp.max}${profile.optimalTemp.unit}`;
        optimalRH.textContent = `${profile.optimalRH.min}-${profile.optimalRH.max}${profile.optimalRH.unit}`;

        optimalRange.style.display = 'block';
    }

    analyzeFluctuation() {
        const tempFluc = parseFloat(this.fluctuationInputs.tempFluctuation.value);
        const rhFluc = parseFloat(this.fluctuationInputs.rhFluctuation.value);

        // Reset to default state
        this.fluctuationWarning.classList.remove('warning', 'success');

        // If no fluctuation values entered, show default message
        if (isNaN(tempFluc) && isNaN(rhFluc)) {
            this.fluctuationMessage.textContent = 'Enter 24-hour fluctuation values above to assess environmental stability for this material type.';
            return;
        }

        const profile = MaterialSpecificRiskAnalyzer.getProfile(this.currentMaterialType);
        const warnings = [];

        // Temperature fluctuation thresholds
        // General: ±4°F is acceptable, >5°F causes concern
        // Sensitive materials: stricter (±2-3°F)
        if (!isNaN(tempFluc)) {
            if (profile.priorities.mechanicalDecay === 'critical' || profile.priorities.mechanicalDecay === 'very-high') {
                if (tempFluc > 3) {
                    warnings.push(`Temperature fluctuation of ±${tempFluc}°F exceeds recommended ±3°F for ${profile.name.toLowerCase()}. Dimensional changes may cause mechanical damage.`);
                } else if (tempFluc > 2) {
                    warnings.push(`Temperature fluctuation of ±${tempFluc}°F is at the upper acceptable limit for sensitive materials.`);
                }
            } else {
                if (tempFluc > 5) {
                    warnings.push(`Temperature fluctuation of ±${tempFluc}°F exceeds recommended ±4-5°F daily variation. This accelerates chemical degradation.`);
                }
            }
        }

        // RH fluctuation thresholds
        // Bizot Protocol: ±10% per 24 hours
        // Sensitive materials: ±5% or less
        // Very sensitive (leather, wood): ±3-4%
        if (!isNaN(rhFluc)) {
            if (profile.priorities.mechanicalDecay === 'critical') {
                // Leather, wood - very strict
                if (rhFluc > 4) {
                    warnings.push(`RH fluctuation of ±${rhFluc}% is critical for ${profile.name.toLowerCase()}. Keep below ±4% to prevent cracking, warping, and delamination.`);
                } else if (rhFluc > 3) {
                    warnings.push(`RH fluctuation of ±${rhFluc}% is approaching the safe limit. Monitor closely for dimensional changes.`);
                }
            } else if (profile.priorities.mechanicalDecay === 'very-high') {
                // Paper, photographs, textiles
                if (rhFluc > 5) {
                    warnings.push(`RH fluctuation of ±${rhFluc}% may cause dimensional stress in ${profile.name.toLowerCase()}. Recommended: ±5% or less per 24 hours.`);
                }
            } else {
                // General collections
                if (rhFluc > 10) {
                    warnings.push(`RH fluctuation of ±${rhFluc}% exceeds Bizot Protocol recommendation of ±10% per 24 hours.`);
                } else if (rhFluc > 7) {
                    warnings.push(`RH fluctuation of ±${rhFluc}% is elevated. While within acceptable limits, lower fluctuation improves stability.`);
                }
            }
        }

        // Display warnings or positive feedback (using safe DOM manipulation)
        if (warnings.length > 0) {
            this.setFluctuationMessage('⚠️', warnings.join(' '));
            this.fluctuationWarning.classList.add('warning');
        } else {
            // Show positive feedback
            const goodNews = [];
            if (!isNaN(tempFluc) && tempFluc <= 3) {
                goodNews.push(`Temperature stability (±${tempFluc}°F) is excellent.`);
            }
            if (!isNaN(rhFluc) && rhFluc <= 5) {
                goodNews.push(`RH stability (±${rhFluc}%) is excellent.`);
            }

            if (goodNews.length > 0) {
                this.setFluctuationMessage('✓', goodNews.join(' '));
                this.fluctuationWarning.classList.add('success');
            } else {
                // Neutral/acceptable state
                this.setFluctuationMessage('', `Environmental fluctuation levels are within acceptable ranges for ${profile.name.toLowerCase()}.`);
            }
        }
    }

    /**
     * Safely set fluctuation message (prevents XSS)
     * @param {string} icon - Icon to display (e.g., '⚠️', '✓')
     * @param {string} message - Message text
     */
    setFluctuationMessage(icon, message) {
        // Clear existing content
        this.fluctuationMessage.textContent = '';

        if (icon) {
            const iconSpan = document.createElement('span');
            iconSpan.textContent = icon + ' ';
            iconSpan.setAttribute('aria-hidden', 'true');
            this.fluctuationMessage.appendChild(iconSpan);
        }

        const textNode = document.createTextNode(message);
        this.fluctuationMessage.appendChild(textNode);
    }

    clearAll() {
        Object.values(this.inputs).forEach(input => {
            input.value = '';
            input.classList.remove('calculated');
        });

        Object.values(this.fluctuationInputs).forEach(input => {
            input.value = '';
        });

        this.decaySection.style.display = 'none';
        document.getElementById('optimalRange').style.display = 'none';
        this.fluctuationWarning.classList.remove('show');

        // Reset warning styles
        this.fluctuationWarning.style.borderColor = '#FFA726';
        this.fluctuationWarning.style.background = '#fff3cd';
        this.fluctuationWarning.querySelector('h4').style.color = '#E65100';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new CalculatorUI();
});
