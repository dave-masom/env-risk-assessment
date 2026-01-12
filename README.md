# Conserv Environmental Risk Analyzer

A comprehensive environmental assessment tool designed for analyzing collection environments in museums, libraries, and archives. This tool provides material-specific risk analysis, psychrometric calculations, and stability assessment to help preservation professionals evaluate and optimize environmental conditions.

**🚀 [Live Demo](https://dave-masom.github.io/env-risk-assessment/)**

![License](https://img.shields.io/badge/license-Free%20for%20Education-blue)
![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA-green)
![Browser](https://img.shields.io/badge/browser-modern%20browsers-brightgreen)

## Features

### Material-Specific Risk Assessment
Select from 11 different collection types to receive tailored risk assessments:
- General Mixed Collection
- Paper & Manuscripts
- Black & White Photographs
- Color Photographs & Film
- Textiles & Fabrics
- Leather & Parchment
- Metal Objects
- Sensitive Metals (Iron, Bronze)
- Magnetic Tape & Audio
- Optical Media (CDs, DVDs)
- Wood & Furniture

Each material type has specific optimal temperature and RH ranges based on preservation research.

### Environmental Calculations
- **Solve for any variable**: Enter any 2 values to calculate the other 2
  - Temperature (°F)
  - Relative Humidity (%)
  - Dew Point (°F)
  - Absolute Humidity (g/m³)

### Decay Risk Assessment
Provides material-specific risk ratings for four types of material decay:

1. **Natural Aging** - Chemical deterioration rate of organic materials
2. **Mechanical Decay** - Physical damage from dimensional changes
3. **Mold Growth** - Risk of fungal growth on materials
4. **Metal Corrosion** - Oxidation and corrosion of metal components

### Environmental Stability Analysis
Assess the impact of temperature and RH fluctuations on collection materials:
- Optional 24-hour fluctuation tracking
- Material-specific stability thresholds (based on Bizot Protocol 2023)
- Real-time warnings for excessive environmental variation
- Guidance on acceptable daily fluctuation limits

## Usage

### Basic Operation
1. **Select your collection type** from the dropdown menu
2. Enter values for any 2 environmental parameters (calculations update automatically)
3. Optionally enter 24-hour fluctuation values to assess stability
4. Review material-specific decay risk ratings and optimal conditions

The calculator automatically computes missing values as you type. Enter any 2 or more parameters and the rest are calculated instantly.

### Example Scenarios

**Example 1: Know temperature and RH**
- Enter: Temperature = 70°F, RH = 45%
- Results: Dew Point ≈ 47.5°F, Absolute Humidity ≈ 7.3 g/m³

**Example 2: Know temperature and dew point**
- Enter: Temperature = 68°F, Dew Point = 50°F
- Results: RH ≈ 54%, Absolute Humidity ≈ 7.9 g/m³

**Example 3: Know RH and dew point**
- Enter: RH = 40%, Dew Point = 45°F
- Results: Temperature ≈ 65.8°F, Absolute Humidity ≈ 5.8 g/m³

## Understanding Decay Risk Ratings

### Natural Aging
- Driven primarily by temperature
- Lower temperatures slow chemical reactions
- **Optimal**: < 68°F
- **Acceptable**: 68-72°F
- **High Risk**: > 76°F

### Mechanical Decay
- Driven by RH extremes and fluctuations
- Materials expand/contract with moisture changes
- **Optimal**: 35-45% RH
- **Acceptable**: 30-50% RH
- **High Risk**: < 25% or > 55% RH

### Mold Growth
- Requires both moisture and warmth
- Critical threshold: 65% RH
- **Safe**: < 55% RH
- **Moderate Risk**: 55-60% RH
- **High Risk**: > 65% RH (especially if warm)

### Metal Corrosion
- Driven primarily by dew point
- Lower dew point reduces moisture availability
- **Optimal**: Dew Point < 50°F
- **Acceptable**: 50-55°F
- **High Risk**: > 60°F

## Technical Details

### Psychrometric Formulas
The calculator uses the Magnus formula for vapor pressure calculations:

```
SVP = 610.78 × exp((17.27 × T) / (237.7 + T))
```

Where:
- SVP = Saturation Vapor Pressure (Pa)
- T = Temperature (°C)

### Calculations Supported
- Temperature from: RH + Dew Point, RH + Absolute Humidity, Dew Point + Absolute Humidity
- RH from: Temp + Dew Point, Temp + Absolute Humidity
- Dew Point from: Temp + RH, Absolute Humidity
- Absolute Humidity from: Temp + RH

## Material-Specific Examples

### Color Photographs (Cold Storage Required)
- Select: "Color Photographs & Film"
- Optimal: 35-40°F, 30-40% RH
- Above 65°F = High risk of rapid dye fading

### Leather Collections
- Select: "Leather & Parchment"
- Optimal: 64-68°F, 45-55% RH
- Critical: <35% RH causes cracking, >65% RH causes mold and "red rot"

### Sensitive Metals
- Select: "Sensitive Metals (Iron, Bronze)"
- Optimal: 60-68°F, 12-35% RH
- Very dry conditions required to prevent corrosion

### Paper Archives
- Select: "Paper & Manuscripts"
- Optimal: 65-70°F, 30-50% RH
- RH control crucial - moisture catalyzes acid formation

## Files
- `index.html` - Main HTML structure
- `styles.css` - Visual styling and layout
- `calculations.js` - Psychrometric calculation engine
- `material-profiles.js` - Material-specific preservation profiles and risk logic
- `app.js` - UI logic and decay risk analysis

## Research Sources

This calculator is based on preservation science research from leading institutions:

### General Guidelines
- ASHRAE Museum Guidelines (2019)
- NEDCC Preservation Leaflets
- Smithsonian Institution Archives
- Canadian Conservation Institute

### Material-Specific Sources
- **Photographs**: Library of Congress, NPS Conserve O Gram, IPI
- **Paper**: NISO TR01, Archives of American Art
- **Digital Media**: ISO 9660, National Archives, CLIR
- **Textiles**: Smithsonian MCI, Textile Museum GWU
- **Leather**: NPS Appendix S, Museum Guidelines
- **Metals**: Canadian Conservation Institute Notes

### Key Research
- Image Permanence Institute - Understanding Preservation Metrics
- EPA Mold Prevention Guidelines
- Temperature vs RH for Mold Prevention (PMC Study)
- CCAHA Technical Bulletins

## Browser Compatibility
Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## License
Free to use for preservation and educational purposes
