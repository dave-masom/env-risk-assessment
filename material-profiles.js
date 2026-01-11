/**
 * Material-specific preservation profiles
 * Based on research from preservation institutions
 */

const MaterialProfiles = {
    'general': {
        name: 'General Mixed Collection',
        description: 'Standard recommendations for diverse collections',
        optimalTemp: { min: 64, max: 72, unit: '°F' },
        optimalRH: { min: 40, max: 55, unit: '%' },
        sources: ['ASHRAE Museum Guidelines', 'NEDCC'],
        priorities: {
            naturalAging: 'moderate',
            mechanicalDecay: 'high',
            moldGrowth: 'high',
            metalCorrosion: 'moderate'
        }
    },

    'paper': {
        name: 'Paper & Manuscripts',
        description: 'Archival paper, documents, and manuscripts',
        optimalTemp: { min: 65, max: 70, unit: '°F' },
        optimalRH: { min: 30, max: 50, unit: '%' },
        sources: ['Library of Congress', 'NISO TR01', 'Smithsonian Archives'],
        priorities: {
            naturalAging: 'high',
            mechanicalDecay: 'very-high', // Paper is very sensitive to RH changes
            moldGrowth: 'high',
            metalCorrosion: 'low'
        },
        notes: 'RH control is crucial - moisture catalyzes acid formation in paper'
    },

    'photographs-bw': {
        name: 'Black & White Photographs',
        description: 'B&W prints and negatives on polyester base',
        optimalTemp: { min: 60, max: 68, unit: '°F' },
        optimalRH: { min: 30, max: 40, unit: '%' },
        sources: ['Library of Congress Photo Leaflet', 'NEDCC 5.3', 'NPS Conserve O Gram 14/10'],
        priorities: {
            naturalAging: 'high',
            mechanicalDecay: 'very-high',
            moldGrowth: 'high',
            metalCorrosion: 'low'
        },
        notes: 'Extended-term storage: 64°F max. Avoid RH cycling which damages emulsions.'
    },

    'photographs-color': {
        name: 'Color Photographs & Film',
        description: 'Color prints, slides, and chromogenic materials',
        optimalTemp: { min: 35, max: 40, unit: '°F' },
        optimalRH: { min: 30, max: 40, unit: '%' },
        sources: ['Library of Congress', 'CFR Standards', 'IPI Cold Storage Guidelines'],
        priorities: {
            naturalAging: 'critical', // Color dyes fade rapidly at room temp
            mechanicalDecay: 'high',
            moldGrowth: 'moderate',
            metalCorrosion: 'low'
        },
        notes: 'Cold storage (≤40°F) required. Cellulose acetate deteriorates rapidly above 65°F.',
        coldStorage: true
    },

    'textiles': {
        name: 'Textiles & Fabrics',
        description: 'Historic clothing, quilts, and fabric collections',
        optimalTemp: { min: 65, max: 70, unit: '°F' },
        optimalRH: { min: 45, max: 55, unit: '%' },
        sources: ['Smithsonian MCI', 'Canadian Conservation Institute', 'Textile Museum GWU'],
        priorities: {
            naturalAging: 'moderate',
            mechanicalDecay: 'very-high', // Fibers expand/contract significantly
            moldGrowth: 'very-high', // Organic materials very susceptible
            metalCorrosion: 'low'
        },
        notes: 'Stability essential - RH changes cause fiber expansion/contraction. Keep RH <65% to prevent mold.'
    },

    'leather': {
        name: 'Leather & Parchment',
        description: 'Leather bindings, objects, and parchment',
        optimalTemp: { min: 64, max: 68, unit: '°F' },
        optimalRH: { min: 45, max: 55, unit: '%' },
        sources: ['NPS Appendix S', 'Canadian Conservation Institute', 'Museum Guidelines'],
        priorities: {
            naturalAging: 'high',
            mechanicalDecay: 'critical', // Very sensitive to RH - cracks low, rots high
            moldGrowth: 'very-high', // Organic material
            metalCorrosion: 'low'
        },
        notes: 'Critical: <35% RH causes cracking, >65% RH causes mold and "red rot". Narrow safe range.',
        criticalRHLow: 35,
        criticalRHHigh: 65
    },

    'metal': {
        name: 'Metal Objects',
        description: 'General metal artifacts and hardware',
        optimalTemp: { min: 60, max: 68, unit: '°F' },
        optimalRH: { min: 30, max: 50, unit: '%' },
        sources: ['Canadian Conservation Institute', 'NPS Metal Objects Guide'],
        priorities: {
            naturalAging: 'low',
            mechanicalDecay: 'low',
            moldGrowth: 'low',
            metalCorrosion: 'critical'
        },
        notes: 'Keep RH ≤55% to prevent corrosion. Dew point control essential to prevent condensation.'
    },

    'metal-sensitive': {
        name: 'Sensitive Metals (Iron, Bronze)',
        description: 'Reactive metals including iron, steel, and bronze',
        optimalTemp: { min: 60, max: 68, unit: '°F' },
        optimalRH: { min: 12, max: 35, unit: '%' },
        sources: ['Canadian Conservation Institute', 'Museum Australia'],
        priorities: {
            naturalAging: 'low',
            mechanicalDecay: 'low',
            moldGrowth: 'none',
            metalCorrosion: 'critical'
        },
        notes: 'Iron stable at ≤12% RH. Contaminated/actively corroding iron needs <35% RH. Very dry conditions required.',
        veryLowRH: true
    },

    'magnetic-tape': {
        name: 'Magnetic Tape & Audio',
        description: 'Magnetic tape, audio cassettes, and reel-to-reel',
        optimalTemp: { min: 50, max: 65, unit: '°F' },
        optimalRH: { min: 30, max: 40, unit: '%' },
        sources: ['Library of Congress', 'NEDCC Session 6', 'CLIR Tape Guide'],
        priorities: {
            naturalAging: 'very-high', // Binder hydrolysis
            mechanicalDecay: 'high',
            moldGrowth: 'high',
            metalCorrosion: 'moderate'
        },
        notes: 'Permanent value: 46-50°F, 30-40% RH. Higher humidity causes binder hydrolysis.',
        permanentStorageTemp: { min: 46, max: 50 }
    },

    'optical-media': {
        name: 'Optical Media (CDs, DVDs)',
        description: 'CDs, DVDs, Blu-ray discs',
        optimalTemp: { min: 64, max: 70, unit: '°F' },
        optimalRH: { min: 30, max: 50, unit: '%' },
        sources: ['ISO 9660', 'National Archives', 'NEDCC'],
        priorities: {
            naturalAging: 'high',
            mechanicalDecay: 'high', // Thermal cycling damages layers
            moldGrowth: 'moderate',
            metalCorrosion: 'low'
        },
        notes: 'Stability critical - avoid thermal cycling. >65% RH can cause mold on disc surface.'
    },

    'wood': {
        name: 'Wood & Furniture',
        description: 'Wooden objects and furniture',
        optimalTemp: { min: 65, max: 70, unit: '°F' },
        optimalRH: { min: 45, max: 55, unit: '%' },
        sources: ['Canadian Conservation Institute', 'Museum Guidelines'],
        priorities: {
            naturalAging: 'moderate',
            mechanicalDecay: 'critical', // Wood swells/shrinks significantly
            moldGrowth: 'high',
            metalCorrosion: 'low'
        },
        notes: 'Wood is highly hygroscopic - RH changes cause warping, cracking, joint failure. Stability essential.'
    }
};

/**
 * Get material-specific risk assessment adjustments
 */
class MaterialSpecificRiskAnalyzer {

    static getProfile(materialType) {
        return MaterialProfiles[materialType] || MaterialProfiles['general'];
    }

    /**
     * Adjust risk scoring based on material sensitivity
     */
    static adjustRiskForMaterial(baseRisk, decayType, materialProfile) {
        const priority = materialProfile.priorities[decayType];

        // Apply material-specific adjustments
        let adjustedRisk = { ...baseRisk };

        // For critical priorities, make the scoring more stringent
        if (priority === 'critical' || priority === 'very-high') {
            // Reduce threshold tolerance - penalize deviations more
            if (baseRisk.score < 85) {
                adjustedRisk.score = Math.max(10, baseRisk.score - 15);
            }

            // Update rating text to reflect higher standards
            if (adjustedRisk.score < 70 && baseRisk.rating === 'Fair') {
                adjustedRisk.rating = 'Moderate Risk';
                adjustedRisk.color = '#FF9800';
            } else if (adjustedRisk.score < 50 && baseRisk.rating === 'Moderate Risk') {
                adjustedRisk.rating = 'High Risk';
                adjustedRisk.color = '#FF5722';
            }
        } else if (priority === 'low' || priority === 'none') {
            // For low priority decay types, be more lenient
            if (baseRisk.score < 80) {
                adjustedRisk.score = Math.min(95, baseRisk.score + 10);
            }
        }

        return adjustedRisk;
    }

    /**
     * Apply material-specific thresholds
     */
    static analyzeForMaterial(tempF, rh, dewPoint, materialType) {
        const profile = this.getProfile(materialType);
        const risks = {};

        // Natural Aging - primarily temperature-based
        risks.naturalAging = this.analyzeNaturalAgingForMaterial(tempF, profile);

        // Mechanical Decay - RH-based
        risks.mechanicalDecay = this.analyzeMechanicalDecayForMaterial(rh, profile);

        // Mold Growth - combined RH and temp
        risks.moldGrowth = this.analyzeMoldGrowthForMaterial(tempF, rh, profile);

        // Metal Corrosion - dew point and RH based
        risks.metalCorrosion = this.analyzeMetalCorrosionForMaterial(dewPoint, rh, profile);

        return risks;
    }

    static analyzeNaturalAgingForMaterial(tempF, profile) {
        const optimalMax = profile.optimalTemp.max;
        const optimalMin = profile.optimalTemp.min;

        let score, rating, color;

        // Material-specific temperature thresholds
        if (profile.coldStorage) {
            // Color photos need cold storage
            if (tempF <= 40) {
                score = 95; rating = 'Excellent'; color = '#4CAF50';
            } else if (tempF <= 50) {
                score = 70; rating = 'Acceptable (Short-term)'; color = '#FFC107';
            } else if (tempF <= 65) {
                score = 40; rating = 'High Risk'; color = '#FF5722';
            } else {
                score = 10; rating = 'Critical - Rapid Degradation'; color = '#D32F2F';
            }
        } else if (profile.priorities.naturalAging === 'critical' || profile.priorities.naturalAging === 'very-high') {
            // Strict temperature control needed
            if (tempF <= optimalMin + 2) {
                score = 95; rating = 'Excellent'; color = '#4CAF50';
            } else if (tempF <= optimalMax) {
                score = 85; rating = 'Good'; color = '#8BC34A';
            } else if (tempF <= optimalMax + 3) {
                score = 65; rating = 'Fair'; color = '#FFC107';
            } else if (tempF <= optimalMax + 6) {
                score = 40; rating = 'High Risk'; color = '#FF5722';
            } else {
                score = 15; rating = 'Critical Risk'; color = '#D32F2F';
            }
        } else {
            // Standard temperature assessment
            if (tempF < optimalMin) {
                score = 90; rating = 'Excellent (Cool)'; color = '#4CAF50';
            } else if (tempF <= optimalMax) {
                score = 85; rating = 'Good'; color = '#8BC34A';
            } else if (tempF <= 72) {
                score = 70; rating = 'Fair'; color = '#FFC107';
            } else if (tempF <= 76) {
                score = 50; rating = 'Moderate Risk'; color = '#FF9800';
            } else if (tempF <= 80) {
                score = 30; rating = 'High Risk'; color = '#FF5722';
            } else {
                score = 10; rating = 'Critical Risk'; color = '#D32F2F';
            }
        }

        return { score, rating, color };
    }

    static analyzeMechanicalDecayForMaterial(rh, profile) {
        const optimalMin = profile.optimalRH.min;
        const optimalMax = profile.optimalRH.max;
        const midpoint = (optimalMin + optimalMax) / 2;

        let score, rating, color;

        // Check for critical RH levels (leather)
        if (profile.criticalRHLow && rh < profile.criticalRHLow) {
            return { score: 15, rating: 'Critical - Desiccation Risk', color: '#D32F2F' };
        }
        if (profile.criticalRHHigh && rh > profile.criticalRHHigh) {
            return { score: 15, rating: 'Critical - Degradation Risk', color: '#D32F2F' };
        }

        // Very low RH requirements (sensitive metals)
        if (profile.veryLowRH) {
            if (rh <= 15) {
                score = 95; rating = 'Excellent'; color = '#4CAF50';
            } else if (rh <= 35) {
                score = 80; rating = 'Good'; color = '#8BC34A';
            } else if (rh <= 50) {
                score = 50; rating = 'Moderate Risk'; color = '#FF9800';
            } else {
                score = 20; rating = 'High Corrosion Risk'; color = '#FF5722';
            }
            return { score, rating, color };
        }

        // Calculate deviation from optimal range
        const deviation = Math.max(
            optimalMin - rh,
            rh - optimalMax,
            0
        );

        if (rh >= optimalMin && rh <= optimalMax) {
            const centerDeviation = Math.abs(rh - midpoint);
            if (centerDeviation <= (optimalMax - optimalMin) / 4) {
                score = 95; rating = 'Excellent'; color = '#4CAF50';
            } else {
                score = 85; rating = 'Good'; color = '#8BC34A';
            }
        } else if (deviation <= 5) {
            score = 70; rating = 'Fair'; color = '#FFC107';
        } else if (deviation <= 10) {
            score = 50; rating = 'Moderate Risk'; color = '#FF9800';
        } else if (deviation <= 15) {
            score = 30; rating = 'High Risk'; color = '#FF5722';
        } else {
            score = 10; rating = 'Critical Risk'; color = '#D32F2F';
        }

        return { score, rating, color };
    }

    static analyzeMoldGrowthForMaterial(tempF, rh, profile) {
        const priority = profile.priorities.moldGrowth;

        let score, rating, color;

        // Combined temperature and RH risk
        if (rh >= 70 && tempF >= 70) {
            score = 5; rating = 'Critical - Mold Imminent'; color = '#D32F2F';
        } else if (rh >= 65 && tempF >= 65) {
            score = 20; rating = 'Very High Risk'; color = '#E64A19';
        } else if (rh >= 60 && tempF >= 60) {
            score = 40; rating = 'High Risk'; color = '#FF5722';
        } else if (rh >= 55) {
            if (priority === 'very-high') {
                score = 50; rating = 'Moderate-High Risk'; color = '#FF9800';
            } else {
                score = 60; rating = 'Moderate Risk'; color = '#FF9800';
            }
        } else if (rh >= 45) {
            score = 80; rating = 'Low Risk'; color = '#FFC107';
        } else if (rh >= 35) {
            score = 90; rating = 'Very Low Risk'; color = '#8BC34A';
        } else {
            if (priority === 'very-high' || profile.veryLowRH) {
                score = 95; rating = 'Minimal Risk'; color = '#4CAF50';
            } else if (rh < 25) {
                score = 85; rating = 'No Risk (Very Dry)'; color = '#4CAF50';
            } else {
                score = 92; rating = 'Minimal Risk'; color = '#4CAF50';
            }
        }

        return { score, rating, color };
    }

    static analyzeMetalCorrosionForMaterial(dewPoint, rh, profile) {
        const priority = profile.priorities.metalCorrosion;

        let score, rating, color;

        if (priority === 'critical') {
            // Strict standards for metal collections
            if (profile.veryLowRH) {
                // Sensitive metals - very strict
                if (dewPoint < 30 && rh <= 15) {
                    score = 95; rating = 'Excellent'; color = '#4CAF50';
                } else if (dewPoint < 40 && rh <= 35) {
                    score = 80; rating = 'Good'; color = '#8BC34A';
                } else if (dewPoint < 50 && rh <= 50) {
                    score = 55; rating = 'Moderate Risk'; color = '#FF9800';
                } else {
                    score = 25; rating = 'High Risk'; color = '#FF5722';
                }
            } else {
                // General metals
                if (dewPoint < 45 && rh <= 50) {
                    score = 95; rating = 'Excellent'; color = '#4CAF50';
                } else if (dewPoint < 50 && rh <= 55) {
                    score = 80; rating = 'Good'; color = '#8BC34A';
                } else if (dewPoint < 55) {
                    score = 60; rating = 'Fair'; color = '#FFC107';
                } else if (dewPoint < 60) {
                    score = 40; rating = 'Moderate Risk'; color = '#FF9800';
                } else {
                    score = 20; rating = 'High Risk'; color = '#FF5722';
                }
            }
        } else {
            // Standard corrosion assessment for non-metal materials
            if (dewPoint < 40) {
                score = 95; rating = 'Excellent'; color = '#4CAF50';
            } else if (dewPoint < 50) {
                score = 85; rating = 'Good'; color = '#8BC34A';
            } else if (dewPoint < 55) {
                score = 70; rating = 'Fair'; color = '#FFC107';
            } else if (dewPoint < 60) {
                score = 50; rating = 'Moderate Risk'; color = '#FF9800';
            } else if (dewPoint < 65) {
                score = 30; rating = 'Low-Moderate Risk'; color = '#FF9800';
            } else {
                score = 20; rating = 'Elevated Risk'; color = '#FFC107';
            }
        }

        return { score, rating, color };
    }
}
