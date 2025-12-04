import { Meal } from './types';

// Meal Database
export const BREAKFASTS: Meal[] = [
  { name: "Cherry & Oat Smoothie", prep: "Blend 1 cup tart cherries, 1/2 cup oats, almond milk, and ice.", type: "Breakfast", tags: ["vegetarian", "vegan", "quick"] },
  { name: "Berry Greek Yogurt Bowl", prep: "Low-fat Greek yogurt topped with blueberries and walnuts.", type: "Breakfast", tags: ["vegetarian", "quick"] },
  { name: "Scrambled Tofu with Turmeric", prep: "Sauté crumbled tofu with turmeric and spinach.", type: "Breakfast", tags: ["vegetarian", "vegan", "savory"] },
  { name: "Whole Grain Toast & Avocado", prep: "2 slices whole wheat toast with mashed avocado and lemon juice.", type: "Breakfast", tags: ["vegetarian", "vegan", "quick"] },
  { name: "Quinoa Breakfast Porridge", prep: "Cooked quinoa with cinnamon and sliced apple.", type: "Breakfast", tags: ["vegetarian", "vegan", "warm"] },
];

export const LUNCHES: Meal[] = [
  { name: "Mediterranean Lentil Salad", prep: "Canned lentils, cucumber, tomatoes, lemon dressing.", type: "Lunch", tags: ["vegetarian", "vegan", "mediterranean"] },
  { name: "Grilled Chicken Wrap", prep: "Whole wheat wrap, grilled chicken breast (skinless), lettuce, hummus.", type: "Lunch", tags: ["meat", "quick"] },
  { name: "Quinoa & Black Bean Bowl", prep: "Quinoa, black beans, corn, salsa, lime.", type: "Lunch", tags: ["vegetarian", "vegan", "mexican"] },
  { name: "Egg Salad on Greens", prep: "Hard boiled eggs, light mayo, celery, over mixed greens.", type: "Lunch", tags: ["vegetarian"] },
  { name: "Turkey & Hummus Box", prep: "Sliced lean turkey breast, cucumber sticks, carrot sticks, hummus dip.", type: "Lunch", tags: ["meat", "quick"] },
];

export const DINNERS: Meal[] = [
  { name: "Lemon Herb Grilled Salmon", prep: "Grill salmon with lemon, dill, and side of steamed broccoli.", type: "Dinner", tags: ["seafood", "mediterranean"] },
  { name: "Zucchini Noodles with Pesto", prep: "Spiralized zucchini with basil pesto and cherry tomatoes.", type: "Dinner", tags: ["vegetarian", "vegan", "light"] },
  { name: "Chicken Stir-Fry", prep: "Chicken breast, bell peppers, snap peas, ginger-soy sauce (low sodium), brown rice.", type: "Dinner", tags: ["meat", "asian"] },
  { name: "Baked Sweet Potato Stuffed with Beans", prep: "Black beans, salsa, and a dollop of low-fat yogurt.", type: "Dinner", tags: ["vegetarian", "vegan", "filling"] },
  { name: "Vegetable Curry", prep: "Chickpeas, cauliflower, coconut milk, curry powder, basmati rice.", type: "Dinner", tags: ["vegetarian", "vegan", "warm"] },
];

export const SNACKS: Meal[] = [
  { name: "Handful of Walnuts", prep: "Approx 10-12 walnut halves.", type: "Snack", tags: ["vegan", "quick"] },
  { name: "Sliced Apple", prep: "One medium apple.", type: "Snack", tags: ["vegan", "fruit"] },
  { name: "Celery with Peanut Butter", prep: "2 stalks celery, 1 tbsp peanut butter.", type: "Snack", tags: ["vegan", "quick"] },
  { name: "Tart Cherry Juice", prep: "1 cup 100% tart cherry juice.", type: "Snack", tags: ["vegan", "liquid"] },
  { name: "Carrot Sticks", prep: "1 cup baby carrots.", type: "Snack", tags: ["vegan", "veg"] },
];

// Fallback/Generic Logic Data
export const FLARE_PROTOCOL = {
  immediate: ["Start drinking water immediately (aim for 250ml every hour).", "Take doctor-prescribed medication if available.", "Elevate the affected joint.", "Apply ice packs wrapped in a towel (20 min on, 20 min off)."],
  avoid: ["Alcohol of any kind", "Sugary sodas", "Red meat and organ meats", "Shellfish", "Direct heat on the joint (during acute inflammation)"],
  schedule: [
    { time: "Hour 0-2", action: "Hydrate heavily. Take NSAIDs if prescribed. Rest joint completely." },
    { time: "Hour 2-6", action: "Continue hydration. Apply cold compress. Eat light (fruit/toast)." },
    { time: "Hour 6-12", action: "Gentle movement only to use bathroom. Keep elevated. Sleep if possible." },
    { time: "Hour 12-24", action: "Monitor pain. If fever develops or pain is 10/10, seek medical help." },
  ]
};