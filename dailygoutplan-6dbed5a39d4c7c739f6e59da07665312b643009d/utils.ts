import { UserData, GeneratedPlan, DayPlan, Meal, Trigger, Lifestyle, ActivityLevel, FlareFrequency, Goal, WeightGoal } from './types';
import { BREAKFASTS, LUNCHES, DINNERS, SNACKS, FLARE_PROTOCOL } from './constants';

const filterMeals = (meals: Meal[], user: UserData): Meal[] => {
  return meals.filter(meal => {
    // Filter out meat if vegetarian/vegan
    if ((user.lifestyle.includes(Lifestyle.Vegetarian) || user.lifestyle.includes(Lifestyle.Mediterranean)) && meal.tags.includes("meat")) {
      // Keep Mediterranean open to fish usually, but for strict vegetarian let's be safe
      if (user.lifestyle.includes(Lifestyle.Vegetarian)) return false;
    }

    // Filter seafood if trigger
    if (user.triggers.includes(Trigger.Seafood) && meal.tags.includes("seafood")) {
      return false;
    }

    // Filter red meat (assuming 'meat' tag might cover it, but specifically if we had a red meat tag. 
    // For this simple DB, 'meat' is poultry usually, but let's say we are safe)
    if (user.triggers.includes(Trigger.RedMeat) && meal.name.toLowerCase().includes("steak")) {
      return false;
    }

    // Hate vegetables? Remove heavy veg meals unless hidden
    if (user.lifestyle.includes(Lifestyle.HateVegetables) && (meal.name.includes("Salad") || meal.name.includes("Zucchini"))) {
      return false;
    }

    return true;
  });
};

const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generatePlan = (user: UserData): GeneratedPlan => {
  // 1. Generate Meals
  const allowedBreakfasts = filterMeals(BREAKFASTS, user);
  const allowedLunches = filterMeals(LUNCHES, user);
  const allowedDinners = filterMeals(DINNERS, user);
  const allowedSnacks = filterMeals(SNACKS, user);

  // Fallback if filtering removes too many
  const safeBreakfast = allowedBreakfasts.length ? allowedBreakfasts : BREAKFASTS;
  const safeLunch = allowedLunches.length ? allowedLunches : LUNCHES;
  const safeDinner = allowedDinners.length ? allowedDinners : DINNERS;
  const safeSnacks = allowedSnacks.length ? allowedSnacks : SNACKS;

  const weeklyMeals: DayPlan[] = [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  days.forEach(day => {
    weeklyMeals.push({
      day,
      meals: {
        breakfast: getRandom(safeBreakfast),
        lunch: getRandom(safeLunch),
        dinner: getRandom(safeDinner),
        snack1: getRandom(safeSnacks),
        snack2: getRandom(safeSnacks)
      }
    });
  });

  // 2. Generate Exercise
  let exercisePlan = {
    tier: "Beginner",
    description: "Focus on low impact movement to keep joints mobile without stress.",
    routine: ["10-minute gentle walk", "Seated leg lifts", "Ankle rotations"],
    frequency: "Daily"
  };

  if (user.activityLevel === ActivityLevel.ModeratelyActive || user.activityLevel === ActivityLevel.VeryActive) {
    exercisePlan = {
      tier: "Intermediate/Advanced",
      description: "Maintain cardiovascular health and muscle strength to support joints.",
      routine: ["30-minute swim or cycle", "Bodyweight squats (if pain-free)", "Yoga for flexibility"],
      frequency: "5 days/week"
    };
  }

  // 3. Insights
  const insights: string[] = [];
  
  if (user.triggers.includes(Trigger.Beer) && user.lifestyle.includes(Lifestyle.DiningOut)) {
    insights.push("Since you enjoy dining out and beer is a trigger, try ordering sparkling water with fresh lime or a mocktail to stay social without the purines.");
  }
  
  if (user.weightGoal !== WeightGoal.NA) {
    insights.push("Weight loss helps gout, but rapid loss triggers it. Aim for a steady 0.5kg per week. Crash dieting increases uric acid.");
  }

  if (user.lifestyle.includes(Lifestyle.BusyWork)) {
    insights.push("Busy schedule? Pre-chop your fruit snacks on Sunday so you don't grab vending machine snacks during the work week.");
  }

  if (user.triggers.includes(Trigger.Dehydration)) {
    insights.push("Dehydration is your confirmed trigger. Keep a water bottle on your desk and set a phone alarm every hour to sip.");
  }

  if (user.flareFrequency === FlareFrequency.Frequent) {
    insights.push("With frequent flares, consistency is key. Stick to the 'Avoid' list even when you feel good to lower your baseline uric acid.");
  } else {
     insights.push("Even with occasional flares, managing your triggers during high-stress times (holidays, deadlines) is crucial.");
  }

  return {
    weeklyMeals,
    exercise: exercisePlan,
    insights,
    hydrationTarget: user.weightGoal === WeightGoal.Large ? "3 - 3.5 Liters" : "2.5 - 3 Liters",
    flareProtocol: FLARE_PROTOCOL
  };
};