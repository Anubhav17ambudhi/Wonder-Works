import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Select } from '../../components/ui/Select';
import { api } from '../../services/api';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#6366f1', '#22c55e', '#f59e0b', '#ef4444',
  '#0ea5e9', '#a855f7', '#14b8a6', '#f97316',
  '#ec4899', '#84cc16', '#06b6d4', '#d946ef',
  '#fb923c', '#4ade80',
];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 28;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#555" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const ChartCard = ({ title, description, data, loading, emptyMsg, children }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
      {children}
    </CardHeader>
    <CardContent className="h-[380px]">
      {loading ? (
        <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse text-sm">
          Loading chart...
        </div>
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              outerRadius={110}
              dataKey="value"
              label={renderCustomLabel}
              labelLine
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} complaints`, name]} />
            <Legend wrapperStyle={{ paddingTop: '8px' }} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
          {emptyMsg || 'No data available'}
        </div>
      )}
    </CardContent>
  </Card>
);

export default function MayorAnalytics() {
  const [areas, setAreas] = useState([]);

  const [selectedArea, setSelectedArea] = useState('');
  const [catPerArea, setCatPerArea] = useState([]);
  const [catPerAreaLoading, setCatPerAreaLoading] = useState(false);

  const [areaWise, setAreaWise] = useState([]);
  const [areaWiseLoading, setAreaWiseLoading] = useState(true);

  const [categoryWise, setCategoryWise] = useState([]);
  const [categoryWiseLoading, setCategoryWiseLoading] = useState(true);

  useEffect(() => {
    api.get('/area/all')
      .then(res => {
        if (res.data?.areas) setAreas(res.data.areas);
        else if (Array.isArray(res.data)) setAreas(res.data);
      })
      .catch(err => console.error('Failed to fetch areas', err));

    api.get('/complaint/allAreawiseComplaints')
      .then(res => {
        const raw = res.data?.complaintsCount || [];
        setAreaWise(raw.map(d => ({ name: d.areaName || 'Unknown', value: d.count || 0 })));
      })
      .catch(err => console.error('Failed to fetch area-wise data', err))
      .finally(() => setAreaWiseLoading(false));

    api.get('/complaint/allCategoryWiseComplaints')
      .then(res => {
        const raw = res.data?.complaintsCount || [];
        setCategoryWise(raw.map(d => ({ name: d.category || 'general', value: d.count || 0 })));
      })
      .catch(err => console.error('Failed to fetch category-wise data', err))
      .finally(() => setCategoryWiseLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedArea) {
      setCatPerArea([]);
      return;
    }
    setCatPerAreaLoading(true);
    api.get(`/complaint/categoryWiseComplaintsByArea/${selectedArea}`)
      .then(res => {
        const raw = res.data?.complaintsCount || [];
        setCatPerArea(raw.map(d => ({ name: d.category || 'general', value: d.count || 0 })));
      })
      .catch(err => console.error('Failed to fetch category per area', err))
      .finally(() => setCatPerAreaLoading(false));
  }, [selectedArea]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Real-time complaint distribution across areas and categories.
        </p>
      </div>

      {/* Vertical stack of charts */}
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">

        {/* Chart 1: Category-wise for selected Area */}
        <ChartCard
          title="Category-wise by Area"
          description="Select an area to see its complaint breakdown by category."
          data={catPerArea}
          loading={catPerAreaLoading}
          emptyMsg={selectedArea ? 'No active complaints for this area.' : 'Select an area to view data.'}
        >
          <div className="mt-3">
            <Select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
              <option value="">Select an Area</option>
              {areas.map(a => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </Select>
          </div>
        </ChartCard>

        {/* Chart 2: Area-wise (all areas) */}
        <ChartCard
          title="Area-wise Complaints"
          description="Active (unresolved) complaint count distributed across all areas."
          data={areaWise}
          loading={areaWiseLoading}
        />

        {/* Chart 3: Category-wise all areas */}
        <ChartCard
          title="Category-wise (All Areas)"
          description="Overall distribution of active complaints by category across the entire city."
          data={categoryWise}
          loading={categoryWiseLoading}
        />

      </div>
    </div>
  );
}
