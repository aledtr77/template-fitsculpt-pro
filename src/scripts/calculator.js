/**
 * Interactive BMI & Calorie Calculator Module
 */

export function initCalculator() {
  const calcForm = document.getElementById('bmiCalcForm');
  if (!calcForm) return;

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateFitnessMetrics();
  });
}

function calculateFitnessMetrics() {
  const heightInput = document.getElementById('calcHeight');
  const weightInput = document.getElementById('calcWeight');
  const ageInput = document.getElementById('calcAge');
  const activitySelect = document.getElementById('calcActivity');

  const scoreEl = document.getElementById('bmiScore');
  const categoryEl = document.getElementById('bmiCategory');
  const caloriesEl = document.getElementById('macroCalories');

  if (!heightInput || !weightInput || !scoreEl || !categoryEl) return;

  const heightCm = parseFloat(heightInput.value);
  const weightKg = parseFloat(weightInput.value);
  const age = parseFloat(ageInput ? ageInput.value : 25) || 25;
  const activityMultiplier = parseFloat(activitySelect ? activitySelect.value : 1.375) || 1.375;

  if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
    categoryEl.textContent = 'Please enter valid values';
    return;
  }

  const heightM = heightCm / 100;
  const bmi = (weightKg / (heightM * heightM)).toFixed(1);

  // BMR calculation using Mifflin-St Jeor equation for women:
  // BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age in years) - 161
  const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  const dailyCalories = Math.round(bmr * activityMultiplier);

  scoreEl.textContent = bmi;

  let category = '';
  let categoryColor = 'var(--accent-primary)';

  if (bmi < 18.5) {
    category = 'Underweight (Tone & Gain Plan Recommended)';
    categoryColor = 'var(--accent-gold)';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal Weight (Sculpt & Maintain)';
    categoryColor = 'var(--accent-cyan)';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight (Fat Loss & Sculpting Recommended)';
    categoryColor = 'var(--accent-primary)';
  } else {
    category = 'Obese (Transformative Coaching Recommended)';
    categoryColor = 'var(--accent-secondary)';
  }

  categoryEl.textContent = category;
  categoryEl.style.color = categoryColor;

  if (caloriesEl) {
    caloriesEl.textContent = `${dailyCalories.toLocaleString()} kcal/day Target`;
  }
}
