export enum Trigger {
  RedMeat = "Red Meat",
  Seafood = "Seafood",
  Beer = "Beer",
  Wine = "Wine",
  Spirits = "Spirits",
  SugaryDrinks = "Sugary Drinks",
  Dehydration = "Dehydration",
  Stress = "Stress",
  Sleep = "Lack of Sleep"
}

export enum Goal {
  ReduceFlares = "Reduce flare frequency",
  LoseWeight = "Lose weight gradually",
  ManagePain = "Manage pain during flares",
  PreventDamage = "Prevent joint damage",
  All = "All of the above"
}

export enum WeightGoal {
  NA = "Not applicable",
  Small = "2-5kg",
  Medium = "5-10kg",
  Large = "10kg+"
}

export enum Lifestyle {
  BusyWork = "Busy work schedule",
  DiningOut = "Love dining out",
  Mediterranean = "Mediterranean diet preference",
  Vegetarian = "Vegetarian/Vegan",
  HateVegetables = "Hate vegetables",
  TrackMacros = "Track macros",
  Beginner = "Beginner to healthy eating"
}

export enum ActivityLevel {
  Sedentary = "Sedentary",
  LightlyActive = "Lightly active",
  ModeratelyActive = "Moderately active",
  VeryActive = "Very active"
}

export enum FlareFrequency {
  FirstTime = "First flare ever",
  Occasional = "Occasional (1-3/year)",
  Frequent = "Frequent (monthly)",
  Chronic = "Chronic"
}

export enum TimeAvailable {
  Fifteen = "15 min/day",
  Thirty = "30 min/day",
  Sixty = "60 min/day",
  NinetyPlus = "90+ min/day"
}

export interface UserData {
  name: string;
  triggers: Trigger[];
  customTrigger: string;
  primaryGoal: Goal;
  weightGoal: WeightGoal;
  lifestyle: Lifestyle[];
  activityLevel: ActivityLevel;
  flareFrequency: FlareFrequency;
  foodPreferences: string;
  timeAvailable: TimeAvailable;
}

export interface Meal {
  name: string;
  prep: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  tags: string[];
}

export interface DayPlan {
  day: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snack1: Meal;
    snack2: Meal;
  };
}

export interface ExercisePlan {
  tier: string;
  description: string;
  routine: string[];
  frequency: string;
}

export interface GeneratedPlan {
  weeklyMeals: DayPlan[];
  exercise: ExercisePlan;
  insights: string[];
  hydrationTarget: string;
  flareProtocol: {
    immediate: string[];
    avoid: string[];
    schedule: { time: string; action: string }[];
  };
}