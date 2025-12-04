import React, { useState } from 'react';
import { UserData, Trigger, Goal, WeightGoal, Lifestyle, ActivityLevel, FlareFrequency, TimeAvailable, GeneratedPlan } from './types';
import { generatePlan } from './utils';
import PlanDisplay from './components/PlanDisplay';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<UserData>({
    name: '',
    triggers: [],
    customTrigger: '',
    primaryGoal: Goal.ReduceFlares,
    weightGoal: WeightGoal.NA,
    lifestyle: [],
    activityLevel: ActivityLevel.Sedentary,
    flareFrequency: FlareFrequency.Occasional,
    foodPreferences: '',
    timeAvailable: TimeAvailable.Thirty
  });

  const handleInputChange = (field: keyof UserData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'triggers' | 'lifestyle', item: any) => {
    setFormData(prev => {
      const arr = prev[field] as string[];
      if (arr.includes(item)) {
        return { ...prev, [field]: arr.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...arr, item] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const plan = generatePlan(formData);
      setGeneratedPlan(plan);
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
  };

  const resetForm = () => {
    setGeneratedPlan(null);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
<div className="bg-beige p-8 rounded-2xl mb-8 shadow-sm">        
    <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-bold text-brand-800">Generating Your Plan...</h2>
        <p className="text-brand-600 mt-2">Analyzing triggers, balancing purines, and scheduling meals.</p>
      </div>
    );
  }

  if (generatedPlan) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <PlanDisplay plan={generatedPlan} user={formData} onReset={resetForm} />
      </div>
    );
  }

  return (
<div className="bg-beige p-8 rounded-2xl mb-8 shadow-sm">   
       <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
<div className="bg-emerald-600 p-8 text-white rounded-t-2xl">
  <h1 className="text-3xl font-bold">GoutKit Planner</h1>
  <p className="mt-2 opacity-90">Create your personalized, scientifically-grounded management plan in 30 seconds.</p>
</div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">

          {/* Inserted Intro Block */}
           <div className="bg-beige p-8 rounded-2xl shadow-sm border border-amber-100">
        <div className="flex gap-6 items-start">
          <img src="jonathan.jpg" alt="Jonathan Kelly" className="w-24 h-24 rounded-full shadow-md flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Hi, I'm Jonathan Kelly</h2>
            <p className="text-gray-700 leading-relaxed">
              After my November 2025 flare left me crawling, I built this to stay ahead daily. It pulls 2025 ACR guidelines into a plan just for you—no fluff, just what works. See a sample below, then build yours free.
            </p>
          </div>
        </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-brand-100">
              <h3 className="font-bold text-brand-700 mb-2">Sample Day (for occasional flares, busy lifestyle)</h3>
              <p>
                Breakfast: Berry Yogurt Bowl<br />
                Lunch: Lentil Salad<br />
                Exercise: 10-min walk<br />
                Insight: Skip beer—try herbal tea to flush uric acid.
              </p>
              <p className="text-xs text-slate-400 mt-2 italic">Your plan will be 100% custom—based on your inputs.</p>
            </div>
            <p className="text-xs text-center text-slate-400 mt-4">Not medical advice • Refund if not helpful</p>
          </div>

          {/* Personal Info */}
          <section>
            <label className="block text-sm font-bold text-slate-700 mb-2">Your Name (Optional)</label>
            <input 
              type="text"
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="e.g. John"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </section>

          {/* Triggers */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="bg-brand-100 text-brand-700 p-1 rounded">1</span> Known Triggers
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(Trigger).map(trigger => (
                <label key={trigger} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-slate-50">
                  <input 
                    type="checkbox" 
                    checked={formData.triggers.includes(trigger)}
                    onChange={() => toggleArrayItem('triggers', trigger)}
                    className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                  />
                  <span className="text-slate-700">{trigger}</span>
                </label>
              ))}
            </div>
            <input 
              type="text" 
              className="w-full mt-3 border border-slate-300 rounded-lg p-3 text-sm"
              placeholder="Other triggers I've noticed..."
              value={formData.customTrigger}
              onChange={(e) => handleInputChange('customTrigger', e.target.value)}
            />
          </section>

          {/* Goals */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="bg-brand-100 text-brand-700 p-1 rounded">2</span> Your Primary Goal
            </h3>
            <div className="space-y-2">
              {Object.values(Goal).map(goal => (
                <label key={goal} className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="goal"
                    checked={formData.primaryGoal === goal}
                    onChange={() => handleInputChange('primaryGoal', goal)}
                    className="w-5 h-5 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-slate-700">{goal}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Lifestyle & Health */}
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Weight Goal</h3>
              <select 
                value={formData.weightGoal}
                onChange={(e) => handleInputChange('weightGoal', e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 bg-white"
              >
                {Object.values(WeightGoal).map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </section>
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Activity Level</h3>
              <select 
                value={formData.activityLevel}
                onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 bg-white"
              >
                {Object.values(ActivityLevel).map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </section>
          </div>

          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Lifestyle Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.values(Lifestyle).map(life => (
                <label key={life} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-slate-50">
                  <input 
                    type="checkbox" 
                    checked={formData.lifestyle.includes(life)}
                    onChange={() => toggleArrayItem('lifestyle', life)}
                    className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-700">{life}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Flare Frequency</h3>
            <select 
              value={formData.flareFrequency}
              onChange={(e) => handleInputChange('flareFrequency', e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3 bg-white"
            >
              {Object.values(FlareFrequency).map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Time for Self-Care</h3>
            <select 
              value={formData.timeAvailable}
              onChange={(e) => handleInputChange('timeAvailable', e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3 bg-white"
            >
              {Object.values(TimeAvailable).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </section>

          <section>
            <label className="block text-sm font-bold text-slate-700 mb-2">Food Preferences / Favorites</label>
            <textarea 
              className="w-full border border-slate-300 rounded-lg p-3 h-24 text-sm"
              placeholder="Foods I love and won't give up..."
              value={formData.foodPreferences}
              onChange={(e) => handleInputChange('foodPreferences', e.target.value)}
            ></textarea>
          </section>

          <div className="pt-4">
           <button 
  type="submit" 
  className="w-full bg-coral hover:bg-teal text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 active:translate-y-0"
>
  Generate My Personal Plan
</button>
            <p className="text-xs text-center text-slate-400 mt-4">
              By clicking generate, you acknowledge this tool is for educational purposes only.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default App;
