import { useState } from 'react';
import { Shield, Users, Activity, Settings, Lock, FileText, Plus, Edit2, Trash2, Search, AlertTriangle, CheckCircle, Clock, X, Save, Eye, Bell, Key, Database } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const systemUsers = [
  { id: 1, name: 'Director General Asif', email: 'dg@nfa.gov.pk', role: 'Admin', status: 'active', lastLogin: '2024-12-09 08:30' },
  { id: 2, name: 'Major Ahmed Khan', email: 'ahmed.khan@nfa.gov.pk', role: 'Analyst', status: 'active', lastLogin: '2024-12-09 14:15' },
  { id: 3, name: 'Lt. Fatima Malik', email: 'fatima.malik@nfa.gov.pk', role: 'Analyst', status: 'active', lastLogin: '2024-12-09 13:45' },
  { id: 4, name: 'Dr. Zainab Qureshi', email: 'zainab.qureshi@nfa.gov.pk', role: 'Forensic Lead', status: 'active', lastLogin: '2024-12-09 11:20' },
  { id: 5, name: 'Capt. Hassan Raza', email: 'hassan.raza@nfa.gov.pk', role: 'Field Officer', status: 'active', lastLogin: '2024-12-08 16:30' },
];

const auditLogs = [
  { id: 1, timestamp: '2024-12-09 14:15:23', user: 'Major Ahmed Khan', action: 'Viewed Evidence', details: 'EV-2024-1247-001', ip: '192.168.1.45' },
  { id: 2, timestamp: '2024-12-09 13:45:12', user: 'Lt. Fatima Malik', action: 'Uploaded Evidence', details: 'EV-2024-1247-002', ip: '192.168.1.52' },
  { id: 3, timestamp: '2024-12-09 11:20:05', user: 'Dr. Zainab Qureshi', action: 'Modified Incident', details: 'INC-2024-1246', ip: '192.168.1.78' },
  { id: 4, timestamp: '2024-12-09 10:15:33', user: 'Director General Asif', action: 'User Permission Changed', details: 'User ID: 3', ip: '192.168.1.10' },
  { id: 5, timestamp: '2024-12-09 09:30:22', user: 'Capt. Hassan Raza', action: 'Downloaded Report', details: 'FR-2024-089', ip: '192.168.1.91' },
];

const activityData = [
  { hour: '00:00', logins: 2, queries: 5 },
  { hour: '04:00', logins: 1, queries: 3 },
  { hour: '08:00', logins: 8, queries: 24 },
  { hour: '12:00', logins: 12, queries: 45 },
  { hour: '16:00', logins: 6, queries: 28 },
  { hour: '20:00', logins: 4, queries: 15 },
];

const roleDistribution = [
  { name: 'Admin', value: 3, color: '#FF0000' },
  { name: 'Analyst', value: 12, color: '#0096FF' },
  { name: 'Forensic Lead', value: 6, color: '#FFB800' },
  { name: 'Field Officer', value: 7, color: '#00FF88' },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Analyst',
  });

  const handleAddUser = () => {
    setShowAddUser(true);
  };

  const handleSaveUser = () => {
    if (editingUser !== null) {
      const updatedUsers = systemUsers.map(user => {
        if (user.id === editingUser) {
          return { ...user, ...newUser };
        }
        return user;
      });
      setEditingUser(null);
    } else {
      const newId = systemUsers.length > 0 ? systemUsers[systemUsers.length - 1].id + 1 : 1;
      const newUserWithId = { ...newUser, id: newId, status: 'active', lastLogin: 'Never' };
      setNewUser({ name: '', email: '', role: 'Analyst' });
      systemUsers.push(newUserWithId);
    }
    setShowAddUser(false);
  };

  const handleEditUser = (userId: number) => {
    const user = systemUsers.find(user => user.id === userId);
    if (user) {
      setNewUser({ name: user.name, email: user.email, role: user.role });
      setEditingUser(userId);
      setShowAddUser(true);
    }
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = systemUsers.filter(user => user.id !== userId);
    setEditingUser(null);
    systemUsers.length = 0;
    systemUsers.push(...updatedUsers);
  };

  return (
    <div className="w-full">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FF0000] to-[#FF6B00] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF0000]/20">
              <Shield className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-white font-medium mb-1">Administrative Control</h1>
              <p className="text-xs md:text-sm text-white/50 tracking-wide uppercase">Core Intelligence System v4.2.0</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#414141] hover:bg-[#414141]/80 border border-[#0096FF]/30 rounded-lg transition-colors text-sm">
              <Activity className="w-4 h-4" />
              <span>System Health</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FF0000] hover:bg-[#FF0000]/80 rounded-lg transition-colors text-sm shadow-lg shadow-[#FF0000]/20">
              <Lock className="w-4 h-4" />
              <span>Full Audit</span>
            </button>
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#00FF88]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00FF88]/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#00FF88]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">System Uptime</p>
                <p className="text-2xl text-white">99.8%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#0096FF]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Active Users</p>
                <p className="text-2xl text-white">28</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FFB800]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFB800]/20 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-[#FFB800]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Database Size</p>
                <p className="text-2xl text-white">2.4TB</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FF6B00]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Security Alerts</p>
                <p className="text-2xl text-white">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg overflow-hidden">
          <div className="flex border-b border-[#0096FF]/20 overflow-x-auto no-scrollbar custom-scrollbar">
            {[
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'security', label: 'Security Settings', icon: Lock },
              { id: 'system', label: 'System Config', icon: Settings },
              { id: 'audit', label: 'Audit Logs', icon: Activity },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'bg-[#0096FF]/20 text-[#0096FF] border-b-2 border-[#0096FF]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg text-white">System Users</h2>
                  <button className="px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors text-sm" onClick={handleAddUser}>
                    Add New User
                  </button>
                </div>

                <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
                  <table className="w-full min-w-[1000px]">
                    <thead>
                      <tr className="border-b border-[#0096FF]/20">
                        <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Analyst Identity</th>
                        <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Secure Email</th>
                        <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Clearance Level</th>
                        <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Status</th>
                        <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Last Access</th>
                        <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemUsers.map(user => (
                        <tr key={user.id} className="border-b border-[#0096FF]/10 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#0096FF]/20 rounded-full flex items-center justify-center">
                                <span className="text-xs text-[#0096FF]">{user.name.charAt(0)}</span>
                              </div>
                              <span className="text-sm text-white">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-white/70">{user.email}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-[#0096FF]/20 border border-[#0096FF] text-[#0096FF] rounded text-xs">
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#00FF88] rounded-full" />
                              <span className="text-sm text-white/70 capitalize">{user.status}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-white/70">{user.lastLogin}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="px-3 py-1 bg-[#414141] hover:bg-[#414141]/80 border border-[#0096FF]/30 text-white rounded text-xs transition-colors" onClick={() => handleEditUser(user.id)}>
                                Edit
                              </button>
                              <button className="px-3 py-1 bg-[#FF0000]/20 hover:bg-[#FF0000]/30 border border-[#FF0000] text-[#FF0000] rounded text-xs transition-colors" onClick={() => handleDeleteUser(user.id)}>
                                Revoke
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {showAddUser && (
                  <div className="mt-6 p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                    <h3 className="text-white mb-4">Add/Edit User</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <label className="text-sm text-white/80">Name</label>
                        <input
                          type="text"
                          className="w-full bg-[#414141] border border-[#0096FF]/30 rounded px-3 py-2 text-sm text-white"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="text-sm text-white/80">Email</label>
                        <input
                          type="email"
                          className="w-full bg-[#414141] border border-[#0096FF]/30 rounded px-3 py-2 text-sm text-white"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="text-sm text-white/80">Role</label>
                        <select
                          className="w-full bg-[#414141] border border-[#0096FF]/30 rounded px-3 py-2 text-sm text-white"
                          value={newUser.role}
                          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                          <option>Admin</option>
                          <option>Analyst</option>
                          <option>Forensic Lead</option>
                          <option>Field Officer</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button className="px-4 py-2 bg-[#FF0000] hover:bg-[#FF0000]/80 rounded-lg transition-colors text-sm" onClick={() => setShowAddUser(false)}>
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors text-sm" onClick={handleSaveUser}>
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg text-white">Security Configuration</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-[#0096FF]" />
                        <span className="text-white">Two-Factor Authentication</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0096FF]"></div>
                      </label>
                    </div>
                    <p className="text-xs text-white/60">Require 2FA for all user accounts</p>
                  </div>

                  <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-[#0096FF]" />
                        <span className="text-white">Session Timeout</span>
                      </div>
                      <select className="w-full sm:w-auto bg-[#414141] border border-[#0096FF]/30 rounded px-3 py-1 text-sm text-white">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option selected>1 hour</option>
                        <option>2 hours</option>
                      </select>
                    </div>
                    <p className="text-xs text-white/60">Auto-logout after period of inactivity</p>
                  </div>

                  <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-[#0096FF]" />
                        <span className="text-white">Password Policy</span>
                      </div>
                      <span className="text-xs text-[#00FF88]">Strong</span>
                    </div>
                    <p className="text-xs text-white/60">Minimum 12 characters, special chars required</p>
                  </div>

                  <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-[#0096FF]" />
                        <span className="text-white">Security Alerts</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0096FF]"></div>
                      </label>
                    </div>
                    <p className="text-xs text-white/60">Email notifications for security events</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-6">
                <h2 className="text-lg text-white">System Configuration</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                      <label className="text-sm text-white/80 mb-2 block">Database Backup Frequency</label>
                      <select className="w-full bg-[#414141] border border-[#0096FF]/30 rounded px-3 py-2 text-sm text-white">
                        <option>Every 6 hours</option>
                        <option selected>Every 12 hours</option>
                        <option>Daily</option>
                      </select>
                    </div>

                    <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                      <label className="text-sm text-white/80 mb-2 block">AI Model Version</label>
                      <select className="w-full bg-[#414141] border border-[#0096FF]/30 rounded px-3 py-2 text-sm text-white">
                        <option>MilGPT-Forensics v3.0</option>
                        <option>MilGPT-Forensics v3.1</option>
                        <option selected>MilGPT-Forensics v3.2</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                    <h3 className="text-white mb-3">Storage Usage</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">Incident Data</span>
                          <span className="text-white">1.2 TB</span>
                        </div>
                        <div className="h-2 bg-[#414141] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0096FF] rounded-full" style={{ width: '50%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">Media Files</span>
                          <span className="text-white">0.8 TB</span>
                        </div>
                        <div className="h-2 bg-[#414141] rounded-full overflow-hidden">
                          <div className="h-full bg-[#FFB800] rounded-full" style={{ width: '33%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">System Logs</span>
                          <span className="text-white">0.4 TB</span>
                        </div>
                        <div className="h-2 bg-[#414141] rounded-full overflow-hidden">
                          <div className="h-full bg-[#00FF88] rounded-full" style={{ width: '17%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="space-y-6">
                <h2 className="text-lg text-white">System Activity</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white mb-4">Activity Over Time</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#0096FF" opacity={0.1} />
                          <XAxis dataKey="hour" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                          <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#0A192F',
                              border: '1px solid #0096FF',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="logins" fill="#0096FF" name="Logins" />
                          <Bar dataKey="queries" fill="#FFB800" name="Queries" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white mb-4">User Role Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={roleDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {roleDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-white mb-4">Audit Logs</h3>
                  <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
                    <table className="w-full min-w-[900px]">
                      <thead>
                        <tr className="border-b border-[#0096FF]/20">
                          <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Timestamp</th>
                          <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Authorized User</th>
                          <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Security Action</th>
                          <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Activity Details</th>
                          <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Source IP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditLogs.map(log => (
                          <tr key={log.id} className="border-b border-[#0096FF]/10 hover:bg-white/5 transition-colors">
                            <td className="py-3 px-4">
                              <span className="text-sm text-white/70">{log.timestamp}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-white">{log.user}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-white/70">{log.action}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-white/70">{log.details}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-white/70">{log.ip}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}