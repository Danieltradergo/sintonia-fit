export async function generateDailyPlan(profile: any) {
  return {
    exercises: [
      { name: "Warm up", duration: 5, calories: 30 },
      { name: "Running", duration: 20, calories: 200 },
      { name: "Strength training", duration: 30, calories: 250 },
      { name: "Cool down", duration: 5, calories: 30 },
    ],
    meals: [
      { name: "Breakfast", calories: 400, time: "07:00" },
      { name: "Lunch", calories: 600, time: "12:00" },
      { name: "Dinner", calories: 500, time: "19:00" },
    ],
    totalCalories: 2010,
  };
}

export function generateFallbackPlan(profile: any) {
  return {
    exercises: [
      { name: "Walk", duration: 30, calories: 150 },
      { name: "Stretching", duration: 10, calories: 50 },
    ],
    meals: [
      { name: "Breakfast", calories: 300, time: "08:00" },
      { name: "Lunch", calories: 500, time: "13:00" },
      { name: "Dinner", calories: 400, time: "20:00" },
    ],
    totalCalories: 1350,
  };
}
