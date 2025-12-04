import React from 'react';
import { GeneratedPlan, UserData } from '../types';

interface Props {
  plan: GeneratedPlan;
  user: UserData;
  onReset: () => void;
}

const PlanDisplay: React.FC<Props> = ({ plan, user, onReset }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-brand-600 text-white p-8 rounded-2xl shadow-lg print:shadow-none print:bg-white print:text-black print:border-b-2 print:border-black">
        <h1 className="text-3xl font-bold mb-2">Gout Management Plan for {user.name || "You"}</h1>
        <p className="opacity-90">Generated based on your goal: <span className="font-semibold">{user.primaryGoal}</span></p>
        <div className="mt-6 flex gap-4 no-print">
          <button onClick={handlePrint} className="bg-white text-brand-700 px-6 py-2 rounded-full font-bold hover:bg-beige transition-colors shadow-sm">
            🖨️ Print My Plan
          </button>
          <button onClick={onReset} className="bg-brand-700 text-white border border-brand-400 px-6 py-2 rounded-full font-medium hover:bg-brand-800 transition-colors">
            Start Over
          </button>
        </div>
      </div>

      {/* Flare Protocol - High Priority */}
      <section className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm print:break-inside-avoid">
        <h2 className="text-2xl font-bold text-red-800 flex items-center gap-2 mb-4">
          <span>⚠️</span> 24-Hour Flare Emergency Protocol
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-red-700 mb-2">Immediately Do This:</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              {plan.flareProtocol.immediate.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-red-700 mb-2">Absolutely Avoid:</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              {plan.flareProtocol.avoid.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-white p-4 rounded-lg border border-red-100">
          <h3 className="font-bold text-slate-800 mb-2">Action Timeline</h3>
          <div className="space-y-2">
            {plan.flareProtocol.schedule.map((s, i) => (
              <div key={i} className="flex gap-4 text-sm">
                <span className="font-bold text-red-600 w-24 shrink-0">{s.time}</span>
                <span className="text-slate-600">{s.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Panel */}
      <section className="bg-beige p-6 rounded-xl border border-brand-100 print:break-inside-avoid">
        <h2 className="text-2xl font-bold text-brand-800 flex items-center gap-2 mb-4">
          <span>💡</span> Personalized Insights
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {plan.insights.map((insight, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-brand-100 text-slate-700">
              {insight}
            </div>
          ))}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-brand-100 text-slate-700">
             <strong>Daily Water Target:</strong> {plan.hydrationTarget}. Hydration is the cheapest and most effective way to flush uric acid.
          </div>
        </div>
      </section>

      {/* Exercise Pyramid */}
      <section className="bg-calm-50 p-6 rounded-xl border border-calm-200 print:break-inside-avoid">
        <h2 className="text-2xl font-bold text-calm-700 flex items-center gap-2 mb-4">
          <span>💪</span> Exercise Routine: {plan.exercise.tier}
        </h2>
        <p className="mb-4 text-slate-700">{plan.exercise.description}</p>
        <div className="bg-white p-5 rounded-lg border border-calm-100">
          <h3 className="font-bold text-calm-800 mb-3">Your Routine ({plan.exercise.frequency})</h3>
          <ul className="space-y-3">
             {plan.exercise.routine.map((r, i) => (
               <li key={i} className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-calm-100 text-calm-600 flex items-center justify-center text-sm font-bold">{i+1}</div>
                 <span className="text-slate-700">{r}</span>
               </li>
             ))}
          </ul>
        </div>
      </section>

      {/* 7-Day Meal Plan */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <span>🥗</span> Your 7-Day Anti-Inflammatory Meal Plan
        </h2>
        <div className="grid gap-6">
          {plan.weeklyMeals.map((day, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm print:break-inside-avoid">
              <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 font-bold text-slate-700 flex justify-between">
                <span>{day.day}</span>
                <span className="text-xs font-normal uppercase tracking-wider text-slate-500 bg-white px-2 py-1 rounded">2.5L Water Goal</span>
              </div>
              <div className="p-4 grid md:grid-cols-5 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-400 uppercase">Breakfast</span>
                  <div className="font-medium text-slate-800">{day.meals.breakfast.name}</div>
                  <div className="text-xs text-slate-500 italic">{day.meals.breakfast.prep}</div>
                </div>
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-400 uppercase">Lunch</span>
                  <div className="font-medium text-slate-800">{day.meals.lunch.name}</div>
                  <div className="text-xs text-slate-500 italic">{day.meals.lunch.prep}</div>
                </div>
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-400 uppercase">Snack 1</span>
                  <div className="font-medium text-slate-800">{day.meals.snack1.name}</div>
                </div>
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-400 uppercase">Dinner</span>
                  <div className="font-medium text-slate-800">{day.meals.dinner.name}</div>
                  <div className="text-xs text-slate-500 italic">{day.meals.dinner.prep}</div>
                </div>
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-400 uppercase">Snack 2</span>
                  <div className="font-medium text-slate-800">{day.meals.snack2.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Tracker Printable */}
      <section className="bg-white p-6 rounded-xl border-2 border-dashed border-slate-300 print:break-inside-avoid">
         <h2 className="text-xl font-bold text-slate-800 mb-4">Weekly Progress Tracker (Print Me)</h2>
         <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="border p-2">Day</th>
                <th className="border p-2">Water Goal</th>
                <th className="border p-2">Triggers Avoided</th>
                <th className="border p-2">Exercise</th>
                <th className="border p-2">Pain (1-10)</th>
              </tr>
            </thead>
            <tbody>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                <tr key={d}>
                  <td className="border p-2 font-medium">{d}</td>
                  <td className="border p-2"><div className="w-4 h-4 border border-slate-400 rounded-sm inline-block mr-1"></div> <span className="text-slate-400">Target Met</span></td>
                  <td className="border p-2"><div className="w-4 h-4 border border-slate-400 rounded-sm"></div></td>
                  <td className="border p-2"><div className="w-4 h-4 border border-slate-400 rounded-sm"></div></td>
                  <td className="border p-2"></td>
                </tr>
              ))}
            </tbody>
         </table>
      </section>
      <div className="mt-12 text-center bg-beige p-6 rounded-2xl border border-emerald-200">
  <h3 className="text-xl font-bold text-emerald-800 mb-4">Unlock Lifetime Bonuses – One-Time $29</h3>
  <ul className="text-gray-700 space-y-2 mb-6 text-left max-w-md mx-auto">
    <li>✓ 47 gout-friendly recipes with shopping lists</li>
    <li>✓ Emergency flare rescue protocol</li>
    <li>✓ Free updates forever (ACR changes included)</li>
  </ul>
  <a
    href="https://www.paypal.com/ncp/payment/HCZESU932UJ76"  // ← Paste your copied link
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl px-10 py-5 rounded-2xl shadow-xl transform hover:scale-105 transition duration-200"
  >
    Yes, Secure My Lifetime Pack – $29 (one-time)
  </a>
  <div className="mt-4 text-sm text-gray-600 flex justify-center items-center gap-2">
    <span>PayPal Accepted</span>
    <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png" alt="PayPal Acceptance Mark" className="h-4" />
  </div>
  <p className="text-xs text-gray-500 mt-2">Instant access • 60-day refund • No subscription</p>
</div>
      <p className="text-center text-xs text-slate-400 mt-12 print:mt-4">
        Disclaimer: This tool provides educational information only and is not medical advice. Consult your doctor before making dietary or lifestyle changes.
      </p>
    </div>
  );
};

export default PlanDisplay;