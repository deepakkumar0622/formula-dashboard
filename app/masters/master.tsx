'use client';

import { useState } from 'react';
import StatsCards from '../../components/common/StatsCards';
import { Search } from 'lucide-react';
import IngredientsPage from '@/components/Tables/MasterTables/Ingredients/Ingredients';
import FormulasPage from '@/components/Tables/MasterTables/Formulas/Formulas';
import FormModal from '@/components/Tables/MasterTables/FormModal';
import IngredientsTabulator from '@/components/Tables/MasterTables/Ingredients/IngredientsTabulator';
import FormulasTabulator from '@/components/Tables/MasterTables/Formulas/FormulasTabulator';


export default function MastersPage() {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'formulas'>(
    'ingredients'
  );
  const [showForm, setShowForm] = useState(false);
  const [showTabulator, setShowTabulator] = useState(true);
  const [formType, setFormType] = useState<'ingredient' | 'formula'>('ingredient');
  const formula =  {
    "name": "",
    "code": "",
    "type": "",
    "version": "",
    "class": "",
    "status": "",
    "updated": ""
  }
  const ingredient = {
        "Ingredient Name" : "",
        "Role" : "",
        "Physical State" : "",
        "Flash Point" : "",
        "Qty"  : ""
  }
    const stats = [
    { label: 'Total Ingredients', value: 10 },
    { label: 'Active Ingredients', value: 8, trend: '+98%' },
    { label: 'Formulas', value: 6 },
    { label: 'Deprecated Items', value: 3 },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Masters</h1>  
        <p className="text-sm text-gray-500">
          Central library of ingredients and reusable formulas.
        </p>
      </div>

      {/* Stats */}
      <StatsCards state={stats} />

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
              activeTab === 'ingredients'
                ? 'border-1 border-gray-900 text-gray-900'
                : ''
            }`}
          >
            Ingredients (10)
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
              activeTab === 'formulas'
                ? 'border-1 borger-gray-900 text-gray-900'
                : ''
            }`}
          >
            Formulas (6)
          </button>
        </div>

        <button onClick={()=>{setShowForm(!showForm)}} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
          <span className="text-lg">+</span>
          Add {activeTab === 'ingredients' ? 'Ingredient' : 'Formula'}
        </button>
      </div>
            {showForm && 
            <FormModal
                      type={formType}
                      data={formType === 'ingredient' ? ingredient : formula}
                      onClose={() => setShowForm(false)}
                      onSave={() => setShowForm(false)}
                    />
                    }
       <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 border rounded-xl p-4">
      {/* Search */}
      <div className="relative w-full sm:max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search ingredients..."
          className="w-full pl-10 pr-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-gray-900 "
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-gray-500 text-sm">Status :</p>
          <select
            name=""
            id=""
            className="w-42 text-gray-500 border border-gray-300 h-7 px-2 rounded-sm"
          >
            <option value="">All</option>
            <option value="">Draft</option>
            <option value="">Versioned</option>
            <option value="">Exported</option>
            <option value="">Sent to Robot</option>
          </select>
        </div>
      </div>
    </div>    
      {/* Content */}
      <div >
        {activeTab === 'ingredients' ? 
        showTabulator?
        <IngredientsPage />:
        <IngredientsTabulator />
        : 
        showTabulator?
        <FormulasPage />:
        <FormulasTabulator />
        
        }
      </div>
      <button onClick={()=>{setShowTabulator(!showTabulator)}} className="ml-4 text-sm bg-gray-900 text-white px-2 py-1 rounded">Toggle View</button>
    </div>
  );
}
