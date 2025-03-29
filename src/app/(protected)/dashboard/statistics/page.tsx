'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';

const last6MonthsData = [
  { name: 'Juillet', vues: 15, téléchargements: 5, partages: 3 },
  { name: 'Août', vues: 20, téléchargements: 8, partages: 4 },
  { name: 'Septembre', vues: 25, téléchargements: 10, partages: 6 },
  { name: 'Octobre', vues: 30, téléchargements: 12, partages: 8 },
  { name: 'Novembre', vues: 35, téléchargements: 15, partages: 10 },
  { name: 'Décembre', vues: 40, téléchargements: 18, partages: 12 },
];

const dailyViews = [
  { name: 'Lun', vues: 5 },
  { name: 'Mar', vues: 7 },
  { name: 'Mer', vues: 6 },
  { name: 'Jeu', vues: 8 },
  { name: 'Ven', vues: 10 },
  { name: 'Sam', vues: 4 },
  { name: 'Dim', vues: 3 },
];

const sourceData = [
  { name: 'LinkedIn', value: 45 },
  { name: 'Indeed', value: 30 },
  { name: 'Direct', value: 15 },
  { name: 'Autres', value: 10 },
];

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Statistiques de profil</h1>
        <p className="mt-2 text-sm text-gray-600">
          Analysez les performances de votre profil au fil du temps
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-2 rounded-md ${
              timeRange === '7d'
                ? 'bg-violet-100 text-violet-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            7 jours
          </button>
          <button
            onClick={() => setTimeRange('1m')}
            className={`px-4 py-2 rounded-md ${
              timeRange === '1m'
                ? 'bg-violet-100 text-violet-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            1 mois
          </button>
          <button
            onClick={() => setTimeRange('6m')}
            className={`px-4 py-2 rounded-md ${
              timeRange === '6m'
                ? 'bg-violet-100 text-violet-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            6 mois
          </button>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Tendances mensuelles</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last6MonthsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="vues"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="téléchargements"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Views */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Vues quotidiennes</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vues" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Sources de trafic</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Métriques clés</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-violet-50 rounded-lg">
              <p className="text-sm text-violet-600">Total des vues</p>
              <p className="text-2xl font-bold text-violet-700">165</p>
              <p className="text-xs text-violet-500">+12% vs mois dernier</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Taux de conversion</p>
              <p className="text-2xl font-bold text-green-700">4.8%</p>
              <p className="text-xs text-green-500">+0.5% vs mois dernier</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Temps moyen</p>
              <p className="text-2xl font-bold text-blue-700">2m 30s</p>
              <p className="text-xs text-blue-500">+15s vs mois dernier</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-600">Partages</p>
              <p className="text-2xl font-bold text-amber-700">43</p>
              <p className="text-xs text-amber-500">+8 vs mois dernier</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
