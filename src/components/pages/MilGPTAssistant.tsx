import { useState } from 'react';
import { Bot, Send, Sparkles, Link2, Target, Database, FileText, TrendingUp } from 'lucide-react';

const conversationHistory = [
  { role: 'assistant', type: 'case-summary', icon: Target, title: 'INC-2024-1247 Analysis Complete', content: '3 similar incidents detected in past 18 months involving the same TTP cluster (B2). Device signature shows 94% match with INC-2024-0892. High probability of same network involvement.', timestamp: '2 min ago' },
  { role: 'user', content: 'What are the common characteristics?', timestamp: '3 min ago' },
  { role: 'assistant', type: 'linkage', icon: Link2, title: 'Cross-Reference Analysis', content: 'All incidents share: Remote detonation via mobile device, Ammonium Nitrate based explosive, Similar construction methodology. Precursor chemicals sourced from same supplier network. HUMINT correlation detected with Metro Area surveillance data.', timestamp: '3 min ago' },
  { role: 'user', content: 'Show me the risk prediction for next 7 days', timestamp: '5 min ago' },
  { role: 'assistant', type: 'prediction', icon: TrendingUp, title: 'Risk Forecast (Next 7 Days)', content: 'Elevated risk detected for Metro Area (87% confidence) and Northern District (82% confidence). Peak risk period: Dec 20-25. Recommend increased surveillance and preventive deployments.', timestamp: '5 min ago' },
];

const quickActions = [
  { title: 'Analyze Pattern Similarities', description: 'Compare latest incidents with historical data', icon: Database, category: 'analysis' },
  { title: 'Generate Threat Assessment', description: 'Create comprehensive risk profile', icon: Target, category: 'reports' },
  { title: 'Search Knowledge Graph', description: 'Explore entity relationships', icon: Link2, category: 'investigation' },
  { title: 'Signature Matching', description: 'Find similar device signatures', icon: Sparkles, category: 'forensics' },
  { title: 'Risk Prediction', description: 'Forecast threat levels', icon: TrendingUp, category: 'prediction' },
  { title: 'Field Report Summary', description: 'Summarize recent field reports', icon: FileText, category: 'reports' },
];

export default function MilGPTAssistant() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(conversationHistory);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      { role: 'user', content: message, timestamp: 'Just now' }
    ]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          type: 'response',
          icon: Bot,
          title: 'Analysis Result',
          content: 'Processing your request with MilGPT-Forensics AI. Analyzing patterns and generating insights...',
          timestamp: 'Just now'
        }
      ]);
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#0096FF] to-[#2F4F4F] rounded-xl flex items-center justify-center shadow-lg shadow-[#0096FF]/20">
              <Bot className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-white font-medium mb-1">Forensics Assistant</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                <span className="text-xs md:text-sm text-white/50">Neural Core Online // Ready</span>
              </div>
            </div>
          </div>

          <div className="md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#0096FF]/20 pl-4 md:pl-0 md:pr-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Intelligence Model</p>
            <p className="text-sm text-[#0096FF] font-medium">MilGPT-Forensics v3.2</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg overflow-hidden flex flex-col h-[500px] md:h-[700px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => {
                if (msg.role === 'user') {
                  return (
                    <div key={idx} className="flex justify-end">
                      <div className="max-w-[80%] bg-[#0096FF]/20 border border-[#0096FF] rounded-lg p-4">
                        <p className="text-sm text-white">{msg.content}</p>
                        <p className="text-xs text-white/40 mt-2">{msg.timestamp}</p>
                      </div>
                    </div>
                  );
                }

                const Icon = msg.icon || Bot;

                return (
                  <div key={idx} className="flex justify-start">
                    <div className="max-w-[90%] md:max-w-[85%] bg-[#0A192F] border border-[#0096FF]/20 rounded-lg p-3 md:p-4">
                      {msg.title && (
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#0096FF]/10">
                          <div className="w-8 h-8 bg-[#0096FF]/20 rounded flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-[#0096FF]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm text-white font-medium break-words">{msg.title}</h3>
                            <p className="text-[10px] text-white/40">{msg.timestamp}</p>
                          </div>
                        </div>
                      )}
                      <p className="text-sm text-white/90 leading-relaxed break-words">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="border-t border-[#0096FF]/20 p-4 bg-[#0A192F]/50">
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
                <button className="flex-shrink-0 px-3 py-1.5 bg-[#414141]/30 hover:bg-[#414141]/50 border border-[#414141] rounded text-[10px] md:text-xs text-white/70 transition-colors whitespace-nowrap">
                  Similar Cases
                </button>
                <button className="flex-shrink-0 px-3 py-1.5 bg-[#414141]/30 hover:bg-[#414141]/50 border border-[#414141] rounded text-[10px] md:text-xs text-white/70 transition-colors whitespace-nowrap">
                  Risk Analysis
                </button>
                <button className="flex-shrink-0 px-3 py-1.5 bg-[#414141]/30 hover:bg-[#414141]/50 border border-[#414141] rounded text-[10px] md:text-xs text-white/70 transition-colors whitespace-nowrap">
                  TTP Patterns
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask forensic intelligence questions..."
                  className="w-full bg-[#0d1f3a] border border-[#0096FF]/30 rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF]"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
              <h2 className="text-lg text-white mb-4">Quick Actions</h2>

              <div className="space-y-2">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={idx}
                      className="w-full text-left p-3 bg-[#0A192F]/50 hover:bg-[#0096FF]/10 border border-[#0096FF]/10 hover:border-[#0096FF]/30 rounded-lg transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#0096FF]/20 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-[#0096FF]/30 transition-colors">
                          <Icon className="w-4 h-4 text-[#0096FF]" />
                        </div>
                        <div>
                          <p className="text-sm text-white mb-1">{action.title}</p>
                          <p className="text-xs text-white/60">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
              <h2 className="text-lg text-white mb-4">AI Capabilities</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#0096FF] rounded-full mt-1.5" />
                  <p className="text-white/80">Device signature pattern matching</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#0096FF] rounded-full mt-1.5" />
                  <p className="text-white/80">TTP clustering and analysis</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#0096FF] rounded-full mt-1.5" />
                  <p className="text-white/80">Predictive threat modeling</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#0096FF] rounded-full mt-1.5" />
                  <p className="text-white/80">Entity relationship mapping</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#0096FF] rounded-full mt-1.5" />
                  <p className="text-white/80">Multi-source intelligence fusion</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#0096FF] rounded-full mt-1.5" />
                  <p className="text-white/80">Automated report generation</p>
                </div>
              </div>
            </div>

            {/* System Stats */}
            <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
              <h2 className="text-lg text-white mb-4">Analysis Statistics</h2>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Pattern Match Accuracy</span>
                    <span className="text-[#00FF88]">94.2%</span>
                  </div>
                  <div className="h-2 bg-[#414141] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00FF88] rounded-full" style={{ width: '94.2%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Prediction Confidence</span>
                    <span className="text-[#0096FF]">87.5%</span>
                  </div>
                  <div className="h-2 bg-[#414141] rounded-full overflow-hidden">
                    <div className="h-full bg-[#0096FF] rounded-full" style={{ width: '87.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Data Processing Speed</span>
                    <span className="text-[#FFB800]">92.8%</span>
                  </div>
                  <div className="h-2 bg-[#414141] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FFB800] rounded-full" style={{ width: '92.8%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
