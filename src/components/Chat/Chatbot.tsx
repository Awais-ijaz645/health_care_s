import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { MessageSquare, X, Send, Sparkles, Shield, Calendar, Users, Stethoscope, LogIn, Info } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: { label: string; href?: string; code?: string }[];
}

const Chatbot: React.FC = () => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hi! I’m your HealthCare+ assistant. I can help you book appointments, manage patients, navigate the dashboard, and explain features. How can I help today?',
      citations: [
        { label: 'HomePage', code: 'src/components/Home/HomePage.tsx' },
        { label: 'Calendar', code: 'src/components/Calendar/CalendarView.tsx' },
        { label: 'Patients', code: 'src/components/Patients/PatientList.tsx' },
      ],
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages]);

  // App-scoped knowledge base with keywords and citations
  const kb = useMemo(
    () => [
      {
        keywords: ['about', 'website', 'site', 'features', 'services', 'overview', 'what is this'],
        answer:
          'This is a modern Healthcare Management system with patient and admin portals. Key features: patient management (records, vitals, prescriptions), appointment booking with doctor selection and calendar, doctor schedules, admin dashboard with settings, and secure auth for admin/patient. The UI is fully responsive with dark/light mode, neon gradients, animations, and glass effects.',
        citations: [
          { label: 'HomePage', code: 'src/components/Home/HomePage.tsx' },
          { label: 'PatientDashboard', code: 'src/components/Patient/PatientDashboard.tsx' },
          { label: 'DoctorBooking', code: 'src/components/Booking/DoctorBooking.tsx' },
          { label: 'CalendarView', code: 'src/components/Calendar/CalendarView.tsx' },
          { label: 'PatientList', code: 'src/components/Patients/PatientList.tsx' },
          { label: 'AdminDashboard', code: 'src/components/Admin/AdminDashboard.tsx' },
          { label: 'ThemeContext', code: 'src/contexts/ThemeContext.tsx' },
          { label: 'Header (Nav)', code: 'src/components/Header.tsx' },
        ],
      },
      {
        keywords: ['book', 'appointment', 'booking', 'schedule', 'doctor'],
        answer:
          'To book an appointment, go to Booking, pick a doctor, choose date/time, and confirm. You can also use the Calendar to click a date and open booking.',
        citations: [
          { label: 'DoctorBooking', code: 'src/components/Booking/DoctorBooking.tsx' },
          { label: 'CalendarView', code: 'src/components/Calendar/CalendarView.tsx' },
        ],
      },
      {
        keywords: ['patient', 'patients', 'records', 'history', 'add patient'],
        answer:
          'Manage patients in Patients: add, edit, delete, and view medical history. Actions include appointment stats and contact info.',
        citations: [{ label: 'PatientList', code: 'src/components/Patients/PatientList.tsx' }],
      },
      {
        keywords: ['patient dashboard', 'my records', 'prescriptions', 'vitals'],
        answer:
          'Open Patient Dashboard to see your medical records, appointments, prescriptions, and vitals after logging in.',
        citations: [
          { label: 'PatientDashboard', code: 'src/components/Patient/PatientDashboard.tsx' },
          { label: 'PatientLogin', code: 'src/components/Auth/PatientLogin.tsx' },
        ],
      },
      {
        keywords: ['admin', 'panel', 'dashboard', 'settings'],
        answer:
          'Admin Dashboard provides analytics and settings. Settings are accessible via Admin only. Default admin password is "ad123" (you can change this in your store).',
        citations: [
          { label: 'AdminDashboard', code: 'src/components/Admin/AdminDashboard.tsx' },
          { label: 'SettingsPanel', code: 'src/components/Settings/SettingsPanel.tsx' },
        ],
      },
      {
        keywords: ['login', 'patient login', 'portal', 'credentials'],
        answer:
          'Patient Portal supports login with predefined IDs. Example credentials: PAT001/patient123, PAT002/patient456, PAT003/patient789.',
        citations: [
          { label: 'PatientLogin', code: 'src/components/Auth/PatientLogin.tsx' },
          { label: 'App routes', code: 'src/App.tsx' },
        ],
      },
      {
        keywords: ['theme', 'dark', 'light', 'toggle', 'mode'],
        answer:
          'Use the sun/moon toggle in the header to switch dark/light mode. Theme persists via localStorage and applies globally.',
        citations: [
          { label: 'Header', code: 'src/components/Header.tsx' },
          { label: 'ThemeContext', code: 'src/contexts/ThemeContext.tsx' },
        ],
      },
      {
        keywords: ['calendar', 'status', 'approved', 'pending', 'rejected'],
        answer:
          'The Calendar shows appointment statuses with color indicators and supports booking directly from dates.',
        citations: [{ label: 'CalendarView', code: 'src/components/Calendar/CalendarView.tsx' }],
      },
      {
        keywords: ['doctor schedule', 'availability', 'timeslots'],
        answer: 'Check Doctor Schedule to view availability and timeslots per doctor.',
        citations: [{ label: 'DoctorSchedule', code: 'src/components/Doctor/DoctorSchedule.tsx' }],
      },
    ],
    []
  );

  const suggestions = [
    { icon: Info, text: 'Tell me about this website' },
    { icon: Calendar, text: 'How do I book an appointment?' },
    { icon: Users, text: 'Where can I manage patients?' },
    { icon: Stethoscope, text: 'Doctor availability and schedules' },
    { icon: Shield, text: 'How to access admin and settings?' },
  ];

  // Strict in-scope Q&A: only answer from KB; otherwise provide scoped fallback
  const getAnswer = (q: string) => {
    const normalized = q.toLowerCase();
    const best = kb.find((k) => k.keywords.some((kw) => normalized.includes(kw)));
    if (best) return best;
    return {
      answer:
        "I'm designed to answer questions about this HealthCare+ app only (booking, patients, admin, login, calendar, theme). Please rephrase within these topics.",
      citations: [
        { label: 'HomePage', code: 'src/components/Home/HomePage.tsx' },
        { label: 'App routes', code: 'src/App.tsx' },
      ],
    };
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
    };
    setMessages((m) => [...m, userMsg]);

    const result = getAnswer(text);
    const botMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: result.answer,
      citations: result.citations,
    };
    // Tiny delay for UX
    setTimeout(() => setMessages((m) => [...m, botMsg]), 250);
    setInput('');
  };

  return (
    <div className="fixed z-50 bottom-6 right-6">
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-4 right-4 z-50 p-4 rounded-full shadow-xl ring-1 backdrop-blur-md overflow-hidden
          ${
            isDark
              ? 'bg-gradient-to-br from-cyan-500 to-purple-600 ring-white/10'
              : 'bg-gradient-to-br from-blue-500 to-indigo-600 ring-black/10'
          }`}
        initial={{ y: 0, boxShadow: '0 12px 28px rgba(99,102,241,0.28)' }}
        animate={{
          y: [0, -8, 0],
          boxShadow: [
            '0 12px 28px rgba(99,102,241,0.28)',
            '0 20px 40px rgba(99,102,241,0.38)',
            '0 12px 28px rgba(99,102,241,0.28)'
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08, rotate: -2 }}
        whileTap={{ scale: 0.96 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {/* Subtle pulsing glow ring */}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/20 blur-[2px] mix-blend-screen animate-pulse" />

        {/* Decorative animated orbs */}
        <motion.span
          className="pointer-events-none absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-200/90"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.span
          className="pointer-events-none absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-pink-200/90"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
        />

        {/* Icon stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="relative"
        >
          <Sparkles className="absolute -top-1 -left-1 w-4 h-4 text-yellow-300" />
          <MessageSquare className="w-6 h-6 text-white" />
        </motion.div>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <div
            className={`absolute bottom-16 right-0 w-[92vw] sm:w-[28rem] h-[70vh] sm:h-[70vh] p-[1.5px] rounded-2xl shadow-2xl backdrop-blur-sm
              ${
                isDark
                  ? 'bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20'
                  : 'bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-rose-500/20'
              }`}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className={`w-full h-full rounded-2xl overflow-hidden ring-1 flex flex-col
                ${
                  isDark
                    ? 'bg-black/70 ring-white/10 backdrop-blur-xl'
                    : 'bg-white/80 ring-black/10 backdrop-blur-xl'
                }`}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between px-4 py-3 border-b ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-lg text-white shadow ${
                      isDark
                        ? 'bg-gradient-to-br from-cyan-500 to-purple-600'
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`text-sm font-semibold tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        HealthCare+ Assistant
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>Online</span>
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Ask me about booking, patients, admin, and more</div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-700'
                  }`}
                  aria-label="Close chatbot"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className={`h-px ${isDark ? 'bg-gradient-to-r from-transparent via-white/15 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`} />

              {/* Suggestions */}
              <div className="px-4 py-3 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s.text)}
                    className={`inline-flex items-center gap-2 text-xs px-3 py-2 rounded-xl shadow ring-1 transition-all hover:scale-[1.02]
                      ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10 ring-white/10 text-gray-200'
                          : 'bg-black/5 hover:bg-black/10 ring-black/10 text-gray-800'
                      }`}
                  >
                    <s.icon className="w-3.5 h-3.5" />
                    {s.text}
                  </button>
                ))}
              </div>

              {/* Messages area: grows and scrolls */}
              <div ref={listRef} className="px-4 pb-4 space-y-3 flex-1 overflow-y-auto min-h-0">
                {messages.map((m) => {
                  const isUser = m.role === 'user';
                  const Avatar = (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow ${isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-gray-900'}`}>
                      {isUser ? <LogIn className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                    </div>
                  );
                  return (
                    <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex items-end gap-2 max-w-full">
                        {!isUser && Avatar}
                        <div
                          className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words shadow-lg border
                            ${
                              isUser
                                ? isDark
                                  ? 'bg-cyan-500/15 border-cyan-400/20 text-cyan-100'
                                  : 'bg-blue-500/10 border-blue-400/30 text-blue-900'
                                : isDark
                                  ? 'bg-white/5 border-white/10 text-gray-100'
                                  : 'bg-white border-black/10 text-gray-900'
                            }`}
                        >
                          <div>{m.content}</div>
                          {!!m.citations?.length && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {m.citations.map((c, idx) => (
                                <a
                                  key={idx}
                                  href={c.href || '#'}
                                  className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition-colors
                                    ${
                                      isDark
                                        ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                        : 'bg-black/5 border-black/10 text-gray-700 hover:bg-black/10'
                                    }`}
                                  onClick={(e) => (c.href ? undefined : e.preventDefault())}
                                  title={c.code || ''}
                                >
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
                                  {c.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        {isUser && Avatar}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input docked at bottom, outside scroll */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className={`flex items-center gap-2 p-3 border-t ${isDark ? 'border-white/10' : 'border-black/10'} pb-[env(safe-area-inset-bottom)]`}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className={`flex-1 rounded-xl px-3 py-2 text-sm outline-none ring-1 transition-shadow focus:shadow-lg focus:ring-2
                    ${
                      isDark
                        ? 'bg-black/40 ring-white/10 focus:ring-cyan-500/40 text-white placeholder:text-gray-400'
                        : 'bg-white ring-black/10 focus:ring-indigo-500/40 text-gray-900 placeholder:text-gray-500'
                    }`}
                />
                <button
                  type="submit"
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium shadow ring-1 transition-all hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_20px_rgba(99,102,241,0.35)]
                    ${
                      isDark
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white ring-white/10'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white ring-black/10'
                    }`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
