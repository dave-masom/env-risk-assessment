/**
 * Psychrometric calculations for dew point calculator
 * All temperature inputs/outputs in Fahrenheit
 */

class PsychrometricCalculator {

    // Convert Fahrenheit to Celsius
    static fToC(f) {
        return (f - 32) * 5/9;
    }

    // Convert Celsius to Fahrenheit
    static cToF(c) {
        return (c * 9/5) + 32;
    }

    /**
     * Calculate saturation vapor pressure (in Pa) using Magnus formula
     * @param {number} tempC - Temperature in Celsius
     */
    static saturationVaporPressure(tempC) {
        // Magnus formula coefficients
        const a = 17.27;
        const b = 237.7;
        return 610.78 * Math.exp((a * tempC) / (b + tempC));
    }

    /**
     * Calculate actual vapor pressure from temperature and RH
     * @param {number} tempF - Temperature in Fahrenheit
     * @param {number} rh - Relative humidity (0-100)
     */
    static actualVaporPressure(tempF, rh) {
        const tempC = this.fToC(tempF);
        const svp = this.saturationVaporPressure(tempC);
        return svp * (rh / 100);
    }

    /**
     * Calculate dew point from temperature and relative humidity
     * @param {number} tempF - Temperature in Fahrenheit
     * @param {number} rh - Relative humidity (0-100)
     */
    static calculateDewPoint(tempF, rh) {
        const tempC = this.fToC(tempF);
        const a = 17.27;
        const b = 237.7;

        const alpha = ((a * tempC) / (b + tempC)) + Math.log(rh / 100);
        const dewPointC = (b * alpha) / (a - alpha);

        return this.cToF(dewPointC);
    }

    /**
     * Calculate relative humidity from temperature and dew point
     * @param {number} tempF - Temperature in Fahrenheit
     * @param {number} dewPointF - Dew point in Fahrenheit
     */
    static calculateRelativeHumidity(tempF, dewPointF) {
        const tempC = this.fToC(tempF);
        const dewPointC = this.fToC(dewPointF);

        const a = 17.27;
        const b = 237.7;

        const numerator = Math.exp((a * dewPointC) / (b + dewPointC));
        const denominator = Math.exp((a * tempC) / (b + tempC));

        return (numerator / denominator) * 100;
    }

    /**
     * Calculate absolute humidity (g/m³) from temperature and relative humidity
     * @param {number} tempF - Temperature in Fahrenheit
     * @param {number} rh - Relative humidity (0-100)
     */
    static calculateAbsoluteHumidity(tempF, rh) {
        const tempC = this.fToC(tempF);
        const tempK = tempC + 273.15;

        // Get vapor pressure
        const vaporPressure = this.actualVaporPressure(tempF, rh);

        // Use ideal gas law: AH = (vapor pressure * molecular weight of water) / (gas constant * temperature)
        // Molecular weight of water: 18.016 g/mol
        // Gas constant: 8.314 J/(mol·K)
        const absoluteHumidity = (vaporPressure * 18.016) / (8.314 * tempK);

        return absoluteHumidity;
    }

    /**
     * Calculate temperature from dew point and relative humidity
     * @param {number} dewPointF - Dew point in Fahrenheit
     * @param {number} rh - Relative humidity (0-100)
     */
    static calculateTemperatureFromDPandRH(dewPointF, rh) {
        const dewPointC = this.fToC(dewPointF);
        const a = 17.27;
        const b = 237.7;

        const alpha = Math.log(rh / 100) + ((a * dewPointC) / (b + dewPointC));
        const tempC = (b * alpha) / (a - alpha);

        return this.cToF(tempC);
    }

    /**
     * Calculate temperature from absolute humidity and relative humidity
     * Uses iterative approach
     */
    static calculateTemperatureFromAHandRH(absHumidity, rh) {
        // Initial guess
        let tempF = 70;
        let iterations = 0;
        const maxIterations = 100;
        const tolerance = 0.01;

        while (iterations < maxIterations) {
            const calculatedAH = this.calculateAbsoluteHumidity(tempF, rh);
            const error = absHumidity - calculatedAH;

            if (Math.abs(error) < tolerance) {
                return tempF;
            }

            // Adjust temperature based on error
            tempF += error * 2;
            iterations++;
        }

        return tempF;
    }

    /**
     * Calculate dew point from absolute humidity
     * Uses iterative approach
     */
    static calculateDewPointFromAH(absHumidity) {
        let dewPointF = 32;
        let iterations = 0;
        const maxIterations = 100;
        const tolerance = 0.01;

        while (iterations < maxIterations) {
            const rh = 100; // At dew point, RH = 100%
            const calculatedAH = this.calculateAbsoluteHumidity(dewPointF, rh);
            const error = absHumidity - calculatedAH;

            if (Math.abs(error) < tolerance) {
                return dewPointF;
            }

            dewPointF += error * 2;
            iterations++;
        }

        return dewPointF;
    }

    /**
     * Main solver function - determines which calculation to perform based on available inputs
     */
    static solve(inputs) {
        const { temperature, relativeHumidity, dewPoint, absoluteHumidity } = inputs;
        const results = { ...inputs };

        // Count how many values are provided
        const provided = [temperature, relativeHumidity, dewPoint, absoluteHumidity]
            .filter(v => v !== null && v !== undefined && v !== '').length;

        if (provided < 2) {
            throw new Error('Please provide at least 2 values');
        }

        // Solve based on what's provided
        if (temperature !== null && relativeHumidity !== null) {
            // Have T and RH - calculate DP and AH
            results.dewPoint = this.calculateDewPoint(temperature, relativeHumidity);
            results.absoluteHumidity = this.calculateAbsoluteHumidity(temperature, relativeHumidity);
        }
        else if (temperature !== null && dewPoint !== null) {
            // Have T and DP - calculate RH and AH
            results.relativeHumidity = this.calculateRelativeHumidity(temperature, dewPoint);
            results.absoluteHumidity = this.calculateAbsoluteHumidity(temperature, results.relativeHumidity);
        }
        else if (temperature !== null && absoluteHumidity !== null) {
            // Have T and AH - need to calculate RH, then DP
            // Use iterative approach
            let rh = 50; // Initial guess
            let iterations = 0;
            const maxIterations = 100;
            const tolerance = 0.01;

            while (iterations < maxIterations) {
                const calculatedAH = this.calculateAbsoluteHumidity(temperature, rh);
                const error = absoluteHumidity - calculatedAH;

                if (Math.abs(error) < tolerance) {
                    break;
                }

                rh += error * 5;
                rh = Math.max(0, Math.min(100, rh)); // Clamp between 0-100
                iterations++;
            }

            results.relativeHumidity = rh;
            results.dewPoint = this.calculateDewPoint(temperature, rh);
        }
        else if (relativeHumidity !== null && dewPoint !== null) {
            // Have RH and DP - calculate T and AH
            results.temperature = this.calculateTemperatureFromDPandRH(dewPoint, relativeHumidity);
            results.absoluteHumidity = this.calculateAbsoluteHumidity(results.temperature, relativeHumidity);
        }
        else if (relativeHumidity !== null && absoluteHumidity !== null) {
            // Have RH and AH - calculate T and DP
            results.temperature = this.calculateTemperatureFromAHandRH(absoluteHumidity, relativeHumidity);
            results.dewPoint = this.calculateDewPoint(results.temperature, relativeHumidity);
        }
        else if (dewPoint !== null && absoluteHumidity !== null) {
            // Have DP and AH - calculate T and RH
            // At dew point, RH = 100%, so we can verify
            const ahAtDP = this.calculateAbsoluteHumidity(dewPoint, 100);

            if (Math.abs(ahAtDP - absoluteHumidity) < 0.1) {
                // They're consistent - dew point temp = air temp at 100% RH
                results.temperature = dewPoint;
                results.relativeHumidity = 100;
            } else {
                // Need to find temperature where these values work
                let tempF = dewPoint + 10; // Start above dew point
                let iterations = 0;
                const maxIterations = 100;
                const tolerance = 0.01;

                while (iterations < maxIterations) {
                    const rh = this.calculateRelativeHumidity(tempF, dewPoint);
                    const calculatedAH = this.calculateAbsoluteHumidity(tempF, rh);
                    const error = absoluteHumidity - calculatedAH;

                    if (Math.abs(error) < tolerance) {
                        break;
                    }

                    tempF += error * 2;
                    iterations++;
                }

                results.temperature = tempF;
                results.relativeHumidity = this.calculateRelativeHumidity(tempF, dewPoint);
            }
        }

        return results;
    }
}
