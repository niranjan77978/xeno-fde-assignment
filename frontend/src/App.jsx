import { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [metrics, setMetrics] = useState({ totalSales: 0, totalOrders: 0, totalCustomers: 0 });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/total-sales');
      setMetrics(response.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const formatCurrency = (amount) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* SIDEBAR */}
      <aside style={sidebarStyle}>
        <div style={{ marginBottom: '40px', padding: '0 10px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px', color: '#fff' }}>
            Xeno<span style={{color: '#ff6b6b'}}>FDE</span>
          </h2>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <NavItem active>Dashboard</NavItem>
          <NavItem>Orders</NavItem>
          <NavItem>Customers</NavItem>
          <NavItem>Integrations</NavItem>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px', color: '#fff' }}>Overview</h1>
            <p style={{ color: '#8b8bce', fontSize: '14px' }}>
              Welcome back, Niranjan • Last synced: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <button onClick={fetchAnalytics} style={buttonStyle}>
            {loading ? 'Syncing...' : 'Sync Data'}
          </button>
        </header>

        {/* METRICS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <StatCard 
            title="Total Revenue" 
            value={formatCurrency(metrics.totalSales)} 
            icon="💰"
            color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
          <StatCard 
            title="Total Orders" 
            value={metrics.totalOrders} 
            icon="📦"
            color="linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)"
          />
          <StatCard 
            title="Total Customers" 
            value={metrics.totalCustomers} 
            icon="👥"
            color="linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
          />
        </div>

        {/* CHART & ACTIVITY SECTION */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          
          {/* Main Chart */}
          <div style={glassCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Revenue Trends</h3>
              <select style={selectStyle}>
                <option>Last 7 Days</option>
              </select>
            </div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { name: 'Mon', val: 1200 }, { name: 'Tue', val: 1900 }, { name: 'Wed', val: 1400 },
                  { name: 'Thu', val: 2400 }, { name: 'Fri', val: 1800 }, { name: 'Sat', val: 3200 }, { name: 'Sun', val: 3900 }
                ]}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8b8bce', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#8b8bce', fontSize: 12}} />
                  <Tooltip contentStyle={{backgroundColor: '#2d2b42', border: 'none', borderRadius: '8px', color: '#fff'}} itemStyle={{color: '#fff'}} />
                  <Area type="monotone" dataKey="val" stroke="#8884d8" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Feed */}
          <div style={glassCardStyle}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <ActivityItem text="New order #1024 synced" time="2 mins ago" />
              <ActivityItem text="Customer John Doe added" time="15 mins ago" />
              <ActivityItem text="Product sync completed" time="1 hr ago" />
              <ActivityItem text="System check passed" time="3 hrs ago" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

// --- COMPONENTS & STYLES ---

const NavItem = ({ children, active }) => (
  <div style={{
    padding: '12px 15px',
    borderRadius: '10px',
    cursor: 'pointer',
    backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
    color: active ? '#fff' : '#8b8bce',
    fontWeight: active ? 'bold' : 'normal',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }}>
    {children}
  </div>
);

const StatCard = ({ title, value, icon, color }) => (
  <div style={{...glassCardStyle, position: 'relative', overflow: 'hidden'}}>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <p style={{ color: '#aaa', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{title}</p>
      <h3 style={{ fontSize: '32px', margin: 0, fontWeight: 'bold', color: '#fff' }}>{value}</h3>
    </div>
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, width: '6px', background: color
    }} />
    <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', opacity: 0.8 }}>
      {icon}
    </div>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#e2e8f0' }}>
    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80', flexShrink: 0 }}></div>
    <div style={{ flex: 1 }}>{text}</div>
    <div style={{ color: '#8b8bce', fontSize: '12px', whiteSpace: 'nowrap' }}>{time}</div>
  </div>
);

// --- CSS STYLES ---

const sidebarStyle = {
  width: '240px',
  borderRight: '1px solid rgba(255,255,255,0.05)',
  padding: '30px 20px',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(30, 30, 47, 0.4)'
};

const glassCardStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  padding: '24px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
};

const buttonStyle = {
  background: '#6366f1',
  color: 'white',
  border: 'none',
  padding: '10px 24px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
  transition: 'transform 0.2s'
};

const selectStyle = {
  background: 'rgba(0,0,0,0.2)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  padding: '6px 12px',
  outline: 'none',
  cursor: 'pointer'
};

export default App;