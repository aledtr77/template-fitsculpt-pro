/**
 * Interactive BMI & Calorie Calculator Module
 */

// WHO cut-offs. Bands are half-open and adjacent so no value can fall between
// two of them — the previous 24.9/29.9 upper bounds left BMI 24.95 unclassified
// and it dropped through to the "obese" branch.
const BMI_BANDS = [
  { max: 18.5, label: 'Underweight (Tone & Gain Plan Recommended)', color: 'var(--accent-gold)' },
  { max: 25, label: 'Normal Weight (Sculpt & Maintain)', color: 'var(--accent-highlight)' },
  { max: 30, label: 'Overweight (Fat Loss & Sculpting Recommended)', color: 'var(--accent-primary)' },
  { max: Infinity, label: 'Obese (Transformative Coaching Recommended)', color: 'var(--accent-secondary)' }
];

const DEFAULT_AGE = 25;
const DEFAULT_ACTIVITY = 1.375;

export function initCalculator() {
  const calcForm = document.getElementById('bmiCalcForm');
  if (!calcForm) return;

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateFitnessMetrics();
  });
}

/** Reads a numeric field, falling back when it is absent, blank or unparseable. */
function readNumber(el, fallback) {
  const value = parseFloat(el?.value);
  return Number.isFinite(value) ? value : fallback;
}

function calculateFitnessMetrics() {
  const scoreEl = document.getElementById('bmiScore');
  const categoryEl = document.getElementById('bmiCategory');
  const caloriesEl = document.getElementById('macroCalories');
  if (!scoreEl || !categoryEl) return;

  const heightCm = readNumber(document.getElementById('calcHeight'), NaN);
  const weightKg = readNumber(document.getElementById('calcWeight'), NaN);
  const age = readNumber(document.getElementById('calcAge'), DEFAULT_AGE);
  const activityMultiplier = readNumber(document.getElementById('calcActivity'), DEFAULT_ACTIVITY);

  if (!(heightCm > 0) || !(weightKg > 0)) {
    categoryEl.textContent = 'Please enter a valid height and weight';
    categoryEl.style.color = 'var(--accent-primary)';
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  // Mifflin-St Jeor, female variant:
  // BMR = (10 x kg) + (6.25 x cm) - (5 x age) - 161
  const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  const dailyCalories = Math.max(0, Math.round(bmr * activityMultiplier));

  // Classify on the raw value, not the rounded display string, so the label
  // always matches the band the real measurements fall into.
  const band = BMI_BANDS.find((b) => bmi < b.max);

  scoreEl.textContent = bmi.toFixed(1);
  categoryEl.textContent = band.label;
  categoryEl.style.color = band.color;

  if (caloriesEl) {
    caloriesEl.textContent = `${dailyCalories.toLocaleString()} kcal/day Target`;
  }
}
