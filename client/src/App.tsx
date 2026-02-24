import { useState } from 'react'
import FoodList from './components/FoodList'
import AddMenuItem from './components/AddMenuItem'

function App() {
  const [view, setView] = useState<'menu' | 'add'>('menu')

  return (
    <div className="min-h-screen bg-orange-50/30">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
              <span className="text-white font-black text-xl">F</span>
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">FoodieFlow</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setView('menu')}
              className={`text-sm font-semibold transition-colors ${view === 'menu' ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'}`}
            >
              Menu
            </button>
            <button
              onClick={() => setView('add')}
              className={`text-sm font-semibold transition-colors ${view === 'add' ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'}`}
            >
              Add Item
            </button>
            <button className="relative p-2 text-slate-700 hover:text-orange-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">2</span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {view === 'menu' ? <FoodList /> : <AddMenuItem />}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 text-white">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">F</span>
            </div>
            <span className="text-lg font-black tracking-tight">FoodieFlow</span>
          </div>
          <p className="text-sm">© 2026 FoodieFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
