
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  FileText,
  Loader2,
  Sparkles,
  Copy,
  Check,
  Code,
  Zap,
  MessageSquare,
  ExternalLink,
  Github,
  ClipboardCheck,
  Bot,
  Globe,
  Trash2,
  BookOpen,
  Lightbulb,
  Send,
  Activity,
  Target,
  UserCheck,
  ListChecks,
  Type,
  ShieldCheck,
  Puzzle,
  Scale,
  Scroll,
  SearchCheck,
  Box,
  Layout,
  LayoutDashboard,
  BarChart3,
  ChevronLeft,
  Gauge,
  Eye,
  GraduationCap,
  Layers,
  PieChart,
  Workflow,
  TerminalSquare,
  Share2,
  Library
} from 'lucide-react';
import MarkdownRenderer from './components/MarkdownRenderer';
import { Modal, ResourceLink, ResourceGroup, SectionDivider } from './components/common';
import SwitchTransition from './components/common/SwitchTransition';
import { Header, Sidebar, MobileNav } from './components/layout';
import { WelcomeOverlay, AboutView, StepsList, StepDetailView } from './components/views';
import { PrinciplesModal, DemoModal, InventoryModal, PromptAdvisorModal, GraphInputModal, ResearchQueryModal, GraphModal } from './components/modals';
import { CORE_AGENTS, DEMO_DATA, ZAIRA_TEXT, GRAPH_PROMPT, PROMPT_ADVISOR_SYSTEM, PROMPT_TRANSLATIONS, PROMPT_PREVIEWS_EN, PROMPT_TEMPLATES, STEP_DETAILS, RESEARCH_QUERIES, getNodeColor, ResearchQuerySelection } from './constants';
import { callGemini } from './services/geminiService';
import { copyToClipboard } from './utils';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

type AgentColor = 'slate' | 'blue' | 'amber' | 'emerald' | 'indigo' | 'purple' | 'rose';

const AGENT_STYLE: Record<AgentColor, { selectedCard: string; selectedIcon: string; unselectedIcon: string; chip: string; mobileSelected: string; mobileBadgeSelected: string; }> = {
  slate: {
    selectedCard: 'bg-white border-slate-300 ring-1 ring-slate-200 shadow-md z-10',
    selectedIcon: 'bg-slate-900 text-white shadow-slate-200',
    unselectedIcon: 'bg-slate-50 text-slate-700 border-slate-200',
    chip: 'bg-slate-100 text-slate-700',
    mobileSelected: 'bg-slate-50 border-slate-300 ring-1 ring-slate-200 text-slate-800',
    mobileBadgeSelected: 'bg-slate-900 text-white',
  },
  blue: {
    selectedCard: 'bg-white border-blue-200 ring-1 ring-blue-200 shadow-md z-10',
    selectedIcon: 'bg-blue-600 text-white shadow-blue-200',
    unselectedIcon: 'bg-blue-50 text-blue-700 border-blue-100',
    chip: 'bg-blue-100 text-blue-700',
    mobileSelected: 'bg-blue-50 border-blue-200 ring-1 ring-blue-200 text-blue-800',
    mobileBadgeSelected: 'bg-blue-600 text-white',
  },
  amber: {
    selectedCard: 'bg-white border-amber-200 ring-1 ring-amber-200 shadow-md z-10',
    selectedIcon: 'bg-amber-600 text-white shadow-amber-200',
    unselectedIcon: 'bg-amber-50 text-amber-700 border-amber-100',
    chip: 'bg-amber-100 text-amber-800',
    mobileSelected: 'bg-amber-50 border-amber-200 ring-1 ring-amber-200 text-amber-900',
    mobileBadgeSelected: 'bg-amber-600 text-white',
  },
  emerald: {
    selectedCard: 'bg-white border-emerald-200 ring-1 ring-emerald-200 shadow-md z-10',
    selectedIcon: 'bg-emerald-600 text-white shadow-emerald-200',
    unselectedIcon: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    chip: 'bg-emerald-100 text-emerald-700',
    mobileSelected: 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200 text-emerald-800',
    mobileBadgeSelected: 'bg-emerald-600 text-white',
  },
  indigo: {
    selectedCard: 'bg-white border-indigo-200 ring-1 ring-indigo-200 shadow-md z-10',
    selectedIcon: 'bg-indigo-600 text-white shadow-indigo-200',
    unselectedIcon: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    chip: 'bg-indigo-100 text-indigo-700',
    mobileSelected: 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200 text-indigo-800',
    mobileBadgeSelected: 'bg-indigo-600 text-white',
  },
  purple: {
    selectedCard: 'bg-white border-purple-200 ring-1 ring-purple-200 shadow-md z-10',
    selectedIcon: 'bg-purple-600 text-white shadow-purple-200',
    unselectedIcon: 'bg-purple-50 text-purple-700 border-purple-100',
    chip: 'bg-purple-100 text-purple-700',
    mobileSelected: 'bg-purple-50 border-purple-200 ring-1 ring-purple-200 text-purple-800',
    mobileBadgeSelected: 'bg-purple-600 text-white',
  },
  rose: {
    selectedCard: 'bg-white border-rose-200 ring-1 ring-rose-200 shadow-md z-10',
    selectedIcon: 'bg-rose-600 text-white shadow-rose-200',
    unselectedIcon: 'bg-rose-50 text-rose-700 border-rose-100',
    chip: 'bg-rose-100 text-rose-700',
    mobileSelected: 'bg-rose-50 border-rose-200 ring-1 ring-rose-200 text-rose-800',
    mobileBadgeSelected: 'bg-rose-600 text-white',
  },
};

const getAgentColorStyle = (colorName: string) => {
  const normalized = (colorName || '').toLowerCase() as AgentColor;
  return AGENT_STYLE[normalized] ?? AGENT_STYLE.slate;
};

const getAgentTheme = (agentId: number, colorName: string, isSelected: boolean) => {
  const style = getAgentColorStyle(colorName);
  if (isSelected) {
    return { card: style.selectedCard, icon: style.selectedIcon };
  }
  return { card: 'bg-white hover:shadow-md border-slate-200', icon: style.unselectedIcon };
};

const getMobileStageTheme = (colorName: string, isSelected: boolean) => {
  const style = getAgentColorStyle(colorName);
  return {
    pill: isSelected ? style.mobileSelected : 'bg-white border-slate-200 text-slate-600',
    badge: isSelected ? style.mobileBadgeSelected : 'bg-slate-100 text-slate-500',
  };
};

const getAgentChipTheme = (colorName: string) => {
  const style = getAgentColorStyle(colorName);
  return style.chip;
};


const App: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [showResearchAids, setShowResearchAids] = useState<boolean>(false);
  const [rawData] = useState<string>(DEMO_DATA);
  const [sidebarWidth, setSidebarWidth] = useState<number>(340);
  const [isResizingState, setIsResizingState] = useState<boolean>(false);
  const [promptLang, setPromptLang] = useState<'he' | 'en'>('he');

  // Mobile View State
  const [mobileView, setMobileView] = useState<'HOME' | 'TOOLS' | 'STEPS' | 'ABOUT' | 'STEP_DETAIL'>('HOME');

  // Welcome/About overlay state
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  const handleCloseWelcomeAndClearHash = () => {
    setShowWelcome(false);
    window.location.hash = '';
  };

  // Dialogue Advisor states
  const [consultationInput, setConsultationInput] = useState<string>("");
  const [consultationResult, setConsultationResult] = useState<string | null>(null);
  const [isConsulting, setIsConsulting] = useState<boolean>(false);

  // Custom KG input
  const [kgInputText, setKgInputText] = useState<string>(ZAIRA_TEXT);

  // Modals states
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPrinciplesModalOpen, setIsPrinciplesModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isGraphInputModalOpen, setIsGraphInputModalOpen] = useState(false);
  const [inventoryModalLang, setInventoryModalLang] = useState<'he' | 'en'>('he');
  const [selectedQuery, setSelectedQuery] = useState<ResearchQuerySelection | null>(null);

  const openResearchTools = useCallback(() => {
    setShowResearchAids(true);
    setSelectedAgentId(null);
    setSelectedQuery(null);
  }, []);

  const openResearchQueryByRoute = useCallback((route: string) => {
    const main = RESEARCH_QUERIES.find((q: any) => q.route === route);
    if (main) {
      openResearchTools();
      setSelectedQuery(main);
      return;
    }

    for (const q of RESEARCH_QUERIES as any[]) {
      const subs = q.subQueries;
      if (Array.isArray(subs)) {
        const sub = subs.find((s: any) => s.route === route);
        if (sub) {
          openResearchTools();
          setSelectedQuery(sub);
          return;
        }
      }
    }

    // Fallback: open tools if route not found
    openResearchTools();
  }, [openResearchTools]);

  // Deep linking - hash routes mapping
  const hashRoutes: Record<string, () => void> = {
    'graph': () => setIsGraphInputModalOpen(true),
    'graph-view': () => setIsGraphModalOpen(true),
    'visual': () => setIsDemoModalOpen(true),
    'prompts': () => setIsPromptModalOpen(true),
    'principles': () => setIsPrinciplesModalOpen(true),
    'inventory': () => setIsInventoryModalOpen(true),
    'q-narratives': () => openResearchQueryByRoute('q-narratives'),
    'q-sentiment': () => openResearchQueryByRoute('q-sentiment'),
    'q-education': () => openResearchQueryByRoute('q-education'),
    'q-semiotics': () => openResearchQueryByRoute('q-semiotics'),
    'q-jester-chorus': () => openResearchQueryByRoute('q-jester-chorus'),
    'q-jester': () => openResearchQueryByRoute('q-jester'),
    'q-chorus': () => openResearchQueryByRoute('q-chorus'),
    'step-0': () => { setSelectedAgentId(0); setShowResearchAids(false); if (window.innerWidth < 768) setMobileView('STEP_DETAIL'); },
    'step-1': () => { setSelectedAgentId(1); setShowResearchAids(false); if (window.innerWidth < 768) setMobileView('STEP_DETAIL'); },
    'step-2': () => { setSelectedAgentId(2); setShowResearchAids(false); if (window.innerWidth < 768) setMobileView('STEP_DETAIL'); },
    'step-3': () => { setSelectedAgentId(3); setShowResearchAids(false); if (window.innerWidth < 768) setMobileView('STEP_DETAIL'); },
    'step-4': () => { setSelectedAgentId(4); setShowResearchAids(false); if (window.innerWidth < 768) setMobileView('STEP_DETAIL'); },
    'step-5': () => { setSelectedAgentId(5); setShowResearchAids(false); if (window.innerWidth < 768) setMobileView('STEP_DETAIL'); },
    'step-6': () => { setSelectedAgentId(6); setShowResearchAids(false); if (window.innerWidth < 768) setMobileView('STEP_DETAIL'); },
    'home': () => { setSelectedAgentId(null); setShowResearchAids(false); setMobileView('HOME'); },
    'tools': () => { openResearchTools(); setMobileView('TOOLS'); },
    'steps': () => { setMobileView('STEPS'); setSelectedAgentId(null); setShowResearchAids(false); },
    'welcome': () => {
      if (window.innerWidth < 768) {
        setMobileView('ABOUT');
        setShowWelcome(false);
      } else {
        setShowWelcome(true);
      }
    },
  };

  // Navigate to hash route
  const navigateTo = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  // Close all modals and clear hash
  const closeAllModals = useCallback(() => {
    setIsGraphModalOpen(false);
    setIsGraphInputModalOpen(false);
    setIsDemoModalOpen(false);
    setIsPromptModalOpen(false);
    setIsPrinciplesModalOpen(false);
    setIsInventoryModalOpen(false);
  }, []);

  // Handle hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash && hashRoutes[hash]) {
        closeAllModals();
        hashRoutes[hash]();
      } else if (!hash) {
        closeAllModals();
      }
    };

    // Handle initial hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Knowledge Graph states
  const [graphData, setGraphData] = useState<any | null>(null);
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<any | null>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  const currentAgent = selectedAgentId !== null ? CORE_AGENTS.find(a => a.id === selectedAgentId) : null;
  const selectedStepDetails = selectedAgentId !== null ? STEP_DETAILS[selectedAgentId] : undefined;
  const isResizing = useRef<boolean>(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    setIsResizingState(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const stopResizing = useCallback(() => {
    if (isResizing.current) {
      isResizing.current = false;
      setIsResizingState(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 220 && newWidth < 700) {
      setSidebarWidth(newWidth);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const handleConsult = async () => {
    if (!consultationInput.trim()) return;
    setIsConsulting(true);
    setConsultationResult(null);
    try {
      const result = await callGemini(`${PROMPT_ADVISOR_SYSTEM}\nהמטרה המחקרית המבוקשת: "${consultationInput}"`);
      setConsultationResult(result);
    } catch (e) {
      setConsultationResult("חלה שגיאה בבניית המהלך המחקרי. נסו שוב.");
    } finally {
      setIsConsulting(false);
    }
  };

  const generateKnowledgeGraph = async () => {
    window.location.hash = 'graph-view';
    setIsGraphModalOpen(true);
    setIsGraphLoading(true);
    setSelectedNodeDetails(null);
    const prompt = GRAPH_PROMPT(kgInputText, "Methodology learning session.");
    try {
      const response = await callGemini(prompt);
      const cleanJson = response.replace(/```json|```/gi, '').trim();
      const data = JSON.parse(cleanJson);
      setGraphData(data);
    } catch (e) {
      console.error("Graph Error", e);
      alert("שגיאה ביצירת הגרף. וודא שהמודל החזיר JSON תקין.");
    } finally {
      setIsGraphLoading(false);
    }
  };

  useEffect(() => {
    if (!showWelcome && !isGraphModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isGraphModalOpen) setIsGraphModalOpen(false);
      if (showWelcome) handleCloseWelcome();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showWelcome, isGraphModalOpen]);

  useEffect(() => {
    if (graphData && graphContainerRef.current) {
      const nodes = new DataSet(graphData.nodes.map((n: any) => ({
        ...n,
        label: n.name || n.label, // Fix: Ensure label is populated from name
        color: getNodeColor(n.type),
        font: { color: '#000000', face: 'Assistant', size: 14, weight: 'bold' },
        shape: n.type === 'site' ? 'hexagon' : 'dot',
        size: n.type === 'site' ? 40 : 25,
        borderWidth: 2,
        shadow: true
      })));
      const edges = new DataSet(graphData.edges.map((e: any) => ({
        ...e,
        arrows: 'to',
        color: { color: '#cbd5e1', highlight: '#6366f1' },
        width: 1,
        font: { align: 'middle', size: 10, face: 'Assistant' },
        smooth: { type: 'continuous' }
      })));
      const options = {
        physics: { enabled: true, barnesHut: { gravitationalConstant: -2000, centralGravity: 0.3, springLength: 150, springConstant: 0.04, damping: 0.09, avoidOverlap: 1 }, stabilization: { iterations: 150 } },
        interaction: { hover: true, tooltipDelay: 200, hideEdgesOnDrag: true }
      };
      const network = new Network(graphContainerRef.current, { nodes, edges }, options);
      networkRef.current = network;
      network.on("click", (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = graphData.nodes.find((n: any) => n.id === nodeId);
          setSelectedNodeDetails(node);
        } else {
          setSelectedNodeDetails(null);
        }
      });
      return () => { network.destroy(); };
    }
  }, [graphData]);

  // mainViewKey determines which view is shown - modals are separate overlays, not part of this
  const mainViewKey = (selectedAgentId !== null && currentAgent) ? `step-${selectedAgentId}`
    : (mobileView === 'STEPS') ? 'steps'
      : (mobileView === 'ABOUT') ? 'about'
        : (mobileView === 'STEP_DETAIL' && currentAgent) ? `step-detail-${selectedAgentId}`
          : (showResearchAids || mobileView === 'TOOLS' ? 'tools' : 'home');



  return (
    <div className="flex flex-col min-h-screen min-h-dvh bg-slate-100 text-slate-800 overflow-hidden" dir="rtl">

      {/* Phone-only bottom tabs overlay: ensure scroll areas don't end under it */}

      {/**/}

      <Header onAboutClick={() => navigateTo('welcome')} />

      {/* Mobile Horizontal Navigation (Sticky) */}
      <MobileNav
        currentView={mobileView}
        selectedAgentId={selectedAgentId}
        agents={CORE_AGENTS}
        onHomeClick={() => {
          navigateTo('home');
        }}
        onAboutClick={() => {
          navigateTo('welcome');
        }}
        onResearchAidsClick={() => { navigateTo('tools'); }}
        onStepsClick={() => { navigateTo('steps'); }}
        onAgentSelect={(agentId) => { navigateTo(`step-${agentId}`); }}
        getMobileStageTheme={getMobileStageTheme}
        getAgentTheme={getAgentTheme}
      />

      <div className="flex-1 min-h-0 overflow-hidden relative flex flex-col md:flex-row">

        <Sidebar
          width={sidebarWidth}
          isResizing={isResizingState}
          onStartResize={startResizing}
          selectedAgentId={selectedAgentId}
          showResearchAids={showResearchAids}
          agents={CORE_AGENTS}
          onAgentSelect={(agentId) => { navigateTo(`step-${agentId}`); handleCloseWelcome(); }}
          onResearchAidsClick={() => { navigateTo('tools'); handleCloseWelcome(); }}
          getAgentTheme={getAgentTheme}
        />

        <main className="flex-1 min-h-0 flex flex-col bg-white shadow-inner relative transition-all overflow-hidden">
          {/* Welcome/About Overlay - Desktop Only */}
          <div className="hidden md:block">
            <WelcomeOverlay isOpen={showWelcome} onClose={handleCloseWelcomeAndClearHash} onNavigate={navigateTo} />
          </div>

          <SwitchTransition transitionKey={mainViewKey} className="flex-1 min-h-0 flex flex-col" duration={250}>
            {mobileView === 'STEPS' ? (
              <StepsList
                agents={CORE_AGENTS}
                selectedAgentId={selectedAgentId}
                onAgentSelect={(agentId) => { navigateTo(`step-${agentId}`); }}
                getAgentTheme={getAgentTheme}
              />
            ) : mobileView === 'ABOUT' ? (
              <div className="flex-1 overflow-y-auto bg-white custom-scrollbar pb-20 md:pb-0" dir="rtl">
                <AboutView onNavigate={navigateTo} />
              </div>
            ) : (mobileView === 'STEP_DETAIL' || (selectedAgentId !== null && currentAgent)) ? (
              // Unified Step Detail View logic
              mobileView === 'STEP_DETAIL' && currentAgent ? (
                <StepDetailView
                  agent={currentAgent}
                  onBack={() => navigateTo('steps')}
                  consultationInput={consultationInput}
                  setConsultationInput={setConsultationInput}
                  consultationResult={consultationResult}
                  setConsultationResult={setConsultationResult}
                  isConsulting={isConsulting}
                  onConsult={handleConsult}
                  promptLang={promptLang}
                  setPromptLang={setPromptLang}
                  rawData={rawData}
                />
              ) : selectedAgentId !== null && currentAgent ? (
                // Desktop Detail View (Existing)
                <>
                  <div className="p-2.5 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-30 px-6 shrink-0 min-h-[56px]">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${getAgentChipTheme(currentAgent.color)} shadow-md border border-white`}>{React.cloneElement(currentAgent.icon as React.ReactElement<{ size?: number }>, { size: 20 })}</div>
                      <div>
                        <h2 className="font-black text-lg leading-tight text-slate-900 tracking-tight">{currentAgent.name}</h2>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{currentAgent.role}</p>
                      </div>
                    </div>
                    <button onClick={() => { setSelectedAgentId(null); window.location.hash = ''; }} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all group flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline group-hover:text-slate-600 transition-colors">סגור תצוגה</span>
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar pb-20 sm:pb-0" dir="rtl">
                    <div className="p-6 md:p-8 max-w-3xl mx-auto w-full space-y-6">
                      {/* Why Important & Cognitive Link - Side by Side */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb size={16} className="text-amber-600" />
                            <h3 className="font-bold text-amber-800 text-sm">למה שלב זה חשוב?</h3>
                          </div>
                          <p className="text-amber-900/80 text-sm leading-relaxed">
                            {selectedStepDetails?.whyImportant}
                          </p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Layers size={16} className="text-indigo-600" />
                            <h3 className="font-bold text-indigo-800 text-sm">קשר לשלבים קודמים</h3>
                          </div>
                          <p className="text-indigo-900/80 text-sm leading-relaxed">
                            {selectedStepDetails?.cognitiveLink}
                          </p>
                        </div>
                      </div>

                      {/* What Happens */}
                      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <ListChecks size={16} className="text-emerald-600" />
                          <h3 className="font-bold text-slate-800 text-sm">מה קורה בשלב זה?</h3>
                        </div>
                        <ul className="space-y-2">
                          {(selectedStepDetails?.whatHappens ?? []).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="text-emerald-500 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {selectedAgentId === 5 && STEP_DETAILS[5]?.extensions && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <div className="text-[13.5px] text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span className="font-bold text-slate-700">מסלולי העמקה:</span>
                              {STEP_DETAILS[5].extensions
                                .filter((ext) => ext.url !== 'q-jester')
                                .map((ext) => (
                                  <button
                                    key={ext.url}
                                    onClick={() => navigateTo(ext.url)}
                                    title={ext.description}
                                    className="cursor-pointer text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
                                  >
                                    {ext.name}
                                  </button>
                                ))}
                              <button
                                onClick={() => navigateTo('tools')}
                                className="cursor-pointer text-slate-500 hover:text-slate-700 underline underline-offset-2"
                              >
                                כל הכלים
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Prompt Section - Collapsible */}
                      <details className="bg-slate-100 border border-slate-200 rounded-xl overflow-hidden group">
                        <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-slate-200/50 transition-all">
                          <div className="flex items-center gap-2">
                            <Code size={16} className="text-slate-500" />
                            <h3 className="font-bold text-slate-700 text-sm">ההנחיות לבוט (פרומפט)</h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex bg-white rounded-lg p-0.5 border border-slate-200" dir="ltr">
                              <button
                                onClick={(e) => { e.preventDefault(); setPromptLang('he'); }}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${promptLang === 'he' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
                              >עברית</button>
                              <button
                                onClick={(e) => { e.preventDefault(); setPromptLang('en'); }}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${promptLang === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
                              >English</button>
                            </div>
                            <ChevronLeft size={16} className="text-slate-400 group-open:-rotate-90 transition-transform" />
                          </div>
                        </summary>
                        <div className="p-4 pt-0 border-t border-slate-200 bg-white">
                          <div className="bg-slate-950 rounded-lg p-4 mt-3 max-h-[50vh] overflow-y-auto custom-scrollbar">
                            <MarkdownRenderer
                              text={selectedAgentId !== null ? (promptLang === 'he' ? (PROMPT_TRANSLATIONS[selectedAgentId] || PROMPT_TEMPLATES[selectedAgentId](rawData).toString()) : (PROMPT_PREVIEWS_EN[selectedAgentId] || PROMPT_TEMPLATES[selectedAgentId](rawData).toString())) : ''}
                              dir={promptLang === 'he' ? 'rtl' : 'ltr'}
                              theme="dark"
                            />
                          </div>
                        </div>
                        <div className="relative">
                          <textarea
                            className="w-full h-32 p-4 bg-white rounded-2xl border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm font-medium text-slate-700 placeholder:text-slate-300 resize-none shadow-inner"
                            placeholder=""
                            value={consultationInput}
                            onChange={(e) => setConsultationInput(e.target.value)}
                          ></textarea>
                          <button
                            onClick={handleConsult}
                            disabled={isConsulting || !consultationInput.trim()}
                            className="absolute bottom-4 left-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white p-2.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 font-black text-[11px]"
                          >
                            {isConsulting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                            <span>בנה פנייה</span>
                          </button>
                        </div>

                        {/* Consultation Result Display Area */}
                        <div className="w-full">
                          {consultationResult && (() => {
                            const [promptText, explanationText] = consultationResult.includes('---PROMPT_BOUNDARY---')
                              ? consultationResult.split('---PROMPT_BOUNDARY---')
                              : [consultationResult, ''];
                            const cleanPrompt = promptText.replace(/^```(markdown|json)?/g, '').replace(/```$/g, '').trim();

                            return (
                              <div className="space-y-6">
                                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-right w-full" dir="rtl">
                                  <div className="bg-slate-800/50 p-3 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex gap-1.5 px-2">
                                      <div className="w-2 h-2 rounded-full bg-red-400/20"></div>
                                      <div className="w-2 h-2 rounded-full bg-amber-400/20"></div>
                                      <div className="w-2 h-2 rounded-full bg-emerald-400/20"></div>
                                    </div>
                                    <button onClick={() => copyToClipboard(cleanPrompt)} className="text-xs bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white px-3 py-1.5 rounded transition-all flex items-center gap-2 font-bold">
                                      <Copy size={14} /> העתק פנייה
                                    </button>
                                  </div>
                                  <div className="p-6 overflow-y-auto custom-scrollbar max-h-[500px]">
                                    <MarkdownRenderer text={cleanPrompt} dir="rtl" theme="dark" />
                                  </div>
                                </div>

                                {explanationText && (
                                  <div className="bg-white p-5 rounded-xl border-l-4 border-indigo-500 shadow-sm text-sm text-slate-700 leading-relaxed">
                                    <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-2"><Sparkles size={14} className="text-indigo-500" /> דבר היועץ</h4>
                                    {explanationText.trim()}
                                  </div>
                                )}
                                <div className="flex justify-end">
                                  <button onClick={() => setConsultationResult(null)} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">נקה תוצאות</button>
                                </div>
                              </div>
                            );
                          })()}
                        </div>


                      </details>
                    </div>
                  </div>
                </>
              ) : null) : (
              showResearchAids || mobileView === 'TOOLS' ? (
                /* EXTENSIONS TOOLBOX VIEW (The "Tools") */
                <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50/30 custom-scrollbar pb-20 md:pb-0">
                  <div className="max-w-4xl mx-auto w-full px-6 py-6 space-y-6">
                    <div>
                      <h3 className="text-2xl font-black text-slate-400 mb-2">ארגז כלים והרחבות</h3>
                      <p className="text-slate-500">כלים מתקדמים לניתוח, ויזואליזציה והעמקה </p>
                    </div>

                    {/* Tools Section */}
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">כלים נוספים המשולבים באתר.בוט</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                        {/* Knowledge Graph */}
                        <button
                          onClick={() => navigateTo('graph')}
                          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group cursor-pointer"
                        >
                          <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Zap size={18} />
                          </div>
                          <div className="text-right">
                            <h4 className="font-bold text-slate-800 text-sm">גרף ידע</h4>
                            <p className="text-[11px] text-slate-500 line-clamp-2">מיפוי חזותי של ישויות וקשרים סמנטיים</p>
                          </div>
                        </button>

                        {/* Visual Analysis */}
                        <button
                          onClick={() => navigateTo('visual')}
                          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group cursor-pointer"
                        >
                          <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Box size={18} />
                          </div>
                          <div className="text-right">
                            <h4 className="font-bold text-slate-800 text-sm">פענוח חזותי</h4>
                            <p className="text-[11px] text-slate-500 line-clamp-2">ניתוח תכונות קשרים וערכים מתמונות</p>
                          </div>
                        </button>

                        {/* Collection Analysis */}
                        <button
                          onClick={() => navigateTo('inventory')}
                          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 hover:bg-amber-50/30 transition-all group cursor-pointer"
                        >
                          <div className="w-9 h-9 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Library size={18} />
                          </div>
                          <div className="text-right">
                            <h4 className="font-bold text-slate-800 text-sm">ניתוח אוסף</h4>
                            <p className="text-[11px] text-slate-500 line-clamp-2">פרוטוקול לניתוח רוחבי של אוסף הערכות</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Research Queries Section */}
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">שאילתות הרחבה</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {RESEARCH_QUERIES.map((query, idx) => (
                          <button
                            key={query.route || idx}
                            onClick={() => query.route ? navigateTo(query.route) : null}
                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 transition-all group cursor-pointer"
                          >
                            <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                              {React.isValidElement(query.icon) ? React.cloneElement(query.icon as React.ReactElement, { size: 18 }) : <SearchCheck size={18} />}
                            </div>
                            <div className="text-right">
                              <h4 className="font-bold text-slate-800 text-sm">{query.title}</h4>
                              <p className="text-[11px] text-slate-500 line-clamp-2">{query.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Prompt Advisor Section */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center">
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">יועץ לבניית הנחיות</h4>
                          <p className="text-xs text-slate-500">שלב הכנה: הגדרת תפקיד ומתודולוגיה</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">הזן את המטרה שלך (למשל: "אני רוצה לנתח את הערכים החברתיים"), והיועץ יבנה עבורך הנחייה מותאמת למודל השפה (Prompt) המותאמת.</p>
                      <div className="relative">
                        <textarea
                          className="w-full h-20 p-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                          placeholder="תאר את המטרה או השאלה שלך..."
                          value={consultationInput}
                          onChange={(e) => setConsultationInput(e.target.value)}
                        />
                        <button
                          onClick={handleConsult}
                          disabled={isConsulting || !consultationInput.trim()}
                          className="absolute bottom-2 left-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-3 py-1.5 rounded-lg shadow transition-all active:scale-95 flex items-center gap-2 font-bold text-xs cursor-pointer disabled:cursor-not-allowed"
                        >
                          {isConsulting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                          <span>בנה פנייה</span>
                        </button>
                      </div>
                      {consultationResult && (
                        <div className="mt-3 bg-slate-900 rounded-xl p-4 max-h-[250px] overflow-y-auto custom-scrollbar">
                          <MarkdownRenderer text={consultationResult.split('---PROMPT_BOUNDARY---')[0].replace(/^```(markdown|json)?/g, '').replace(/```$/g, '').trim()} dir="rtl" theme="dark" />
                          <div className="flex justify-end mt-2 gap-2">
                            <button onClick={() => copyToClipboard(consultationResult.split('---PROMPT_BOUNDARY---')[0].replace(/^```(markdown|json)?/g, '').replace(/```$/g, '').trim())} className="text-xs bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white px-2 py-1 rounded transition-all flex items-center gap-1 cursor-pointer">
                              <Copy size={12} /> העתק
                            </button>
                            <button onClick={() => setConsultationResult(null)} className="text-xs text-slate-400 hover:text-red-400 transition-colors cursor-pointer">נקה</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* DEFAULT HOME VIEW (Resource List) */
                <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50/30 custom-scrollbar pb-20 sm:pb-0">
                  <div className="max-w-xl mx-auto w-full px-6 py-2 md:py-3 space-y-6">
                    <div className="text-right pt-2 md:pt-3"><h3 className="text-lg sm:text-l font-black text-slate-500 mb-0.5 leading-tight truncate">משאבים לסדנת איקומוס - אתר.בוט</h3><div className="w-12 h-1 bg-indigo-500 rounded-full mb-4"></div></div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <ResourceGroup title="כלי הערכה: אתר.בוט">
                          <ResourceLink
                            href="https://chatgpt.com/g/g-695d3567400c8191a402087b38c7b6b7-tr-bvt-h-rkt-mshm-vt-lshymvr"
                            icon={<Bot size={16} />}
                            label="אתר.בוט (GPTs)"
                            highlight={true}
                            colorScheme="emerald"
                          />
                          <ResourceLink
                            href="https://gemini.google.com/gem/5b822b7e1771?usp=sharing"
                            icon={<Sparkles size={16} />}
                            label="אתר.בוט (Gemini)"
                            highlight={true}
                            colorScheme="indigo"
                          />
                          <ResourceLink href="https://forms.gle/F9ZykAefJQ94n2Vc7"
                            icon={<ClipboardCheck size={16} />}
                            label="שאלון משוב" secondaryLabel="משוב לצורכי מחקר ושיפור הכלי"
                            noBorder
                            highlight={true}
                            colorScheme="amber" />
                          <ResourceLink href="https://github.com/YuvalShafriri/atar.bot-Icomos.Israel/blob/main/Bot-Brain-he.md"
                            icon={<Github size={16} />}
                            label="המוח של אתר.בוט"
                            secondaryLabel="מאגר קוד המקור והנחיות המערכת"
                            highlight={true}
                            noBorder
                            colorScheme="slate" />
                        </ResourceGroup>

                        <ResourceGroup title="מעבר לאתר.בוט - התאמה אישית">
                          <ResourceLink href="https://chatgpt.com/g/g-69492aebb530819199628bb444d024f3-svkn-lbnyyt-svkn-yqvmvs" icon={<Bot size={16} />} label="בניית סוכן (GPTs)" noBorder colorScheme="emerald" />
                          <ResourceLink
                            href="https://gemini.google.com/gem/1LbC3oHGIS83rP8uWdIEEeaU9_ixfEMh1?usp=sharing"
                            icon={<Sparkles size={16} />}
                            label={
                              <span className="flex items-center gap-2">
                                בניית סוכן (Gemini)
                                <span
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open("https://gemini.google.com/gem/1No_FbNaQmz5khR51dl7NHFOXAFQ5x5Pu?usp=sharing", "_blank");
                                  }}
                                  className="text-[11px] text-slate-500 bg-emerald-50 px-1.5 py-0.5 rounded-md hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-200 shadow-sm"
                                >
                                  דוגמה ליוצר תמונות מתיאור אדריכלי/ארכאולוגי
                                </span>
                              </span>
                            }
                            noBorder
                            colorScheme="emerald"
                          />
                        </ResourceGroup>

                        <ResourceGroup title="ייצוג קצת אחרת - לכתיבה וקריאת הערכות">
                          <div className="sm:hidden">
                            <ResourceLink
                              icon={<LayoutDashboard size={16} />}
                              label="דשבורד הערכה תרבותית - דמו"
                              secondaryLabel="לא זמין במובייל (פתח במחשב)"
                              noBorder
                            />
                            <ResourceLink
                              icon={<PieChart size={16} />}
                              label="דשבורד ניתוח אוסף - דמו"
                              secondaryLabel="לא זמין במובייל (פתח במחשב)"
                              noBorder
                            />
                          </div>

                          <div className="hidden sm:block">
                            <ResourceLink href="https://gemini.google.com/share/673fdae83a26" icon={<LayoutDashboard size={16} />} label="דשבורד הערכה תרבותית - דמו" noBorder />
                            <ResourceLink
                              onClick={() => navigateTo('inventory')}
                              icon={<PieChart size={16} />}
                              label="דשבורד ניתוח אוסף -דמו"
                              secondaryLabel="ניתוח אוסף בשילוב notebookLM ואתר.בוט בגמיני"
                              noBorder
                            />
                          </div>
                        </ResourceGroup>

                        <SectionDivider label="השראה" colorClass="text-emerald-500" bgColor="bg-slate-50/30" />

                        <div className="grid grid-cols-1 gap-2.5">
                          <ResourceLink href="https://bit.ly/49huqGS" icon={<BookOpen size={16} />} label="אלכסון: עוד איבר של תודעה" secondaryLabel=" מאמר על חוויית המקום והתודעה בשילוב AI" colorScheme="emerald" highlight />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </SwitchTransition>

          <footer className="bg-white border-t border-slate-200 p-2 shrink-0 flex items-center px-8 z-40 shadow-sm overflow-hidden text-slate-400" dir="rtl">
            <div className="flex-1"></div>
            <div className="text-[13px]  opacity-100 whitespace-nowrap dir-rtl">
              © אתר מידע מלווה לסדנאות אתר.בוט להערכת משמעות - בפיתוח פרופ"ח יעל אלף ויובל שפרירי
            </div>
          </footer>
        </main>
      </div >

      <InventoryModal
        isOpen={isInventoryModalOpen}
        onClose={() => { setIsInventoryModalOpen(false); window.location.hash = ''; }}
        lang={inventoryModalLang}
      />

      <PromptAdvisorModal
        isOpen={isPromptModalOpen}
        onClose={() => { setIsPromptModalOpen(false); window.location.hash = ''; }}
        consultationInput={consultationInput}
        onConsultationInputChange={setConsultationInput}
        consultationResult={consultationResult}
        onClearResult={() => setConsultationResult(null)}
        isConsulting={isConsulting}
        onConsult={handleConsult}
      />

      <PrinciplesModal
        isOpen={isPrinciplesModalOpen}
        onClose={() => { setIsPrinciplesModalOpen(false); window.location.hash = ''; }}
      />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => { setIsDemoModalOpen(false); window.location.hash = ''; }}
      />

      <GraphModal
        isOpen={isGraphModalOpen}
        onClose={() => { setIsGraphModalOpen(false); window.location.hash = ''; }}
        selectedNodeDetails={selectedNodeDetails}
        isLoading={isGraphLoading}
        graphContainerRef={graphContainerRef}
      />

      <ResearchQueryModal
        query={selectedQuery}
        onClose={() => { setSelectedQuery(null); window.location.hash = ''; }}
        onNavigate={navigateTo}
      />

      <GraphInputModal
        isOpen={isGraphInputModalOpen}
        onClose={() => { setIsGraphInputModalOpen(false); window.location.hash = ''; }}
        inputText={kgInputText}
        onInputTextChange={setKgInputText}
        onGenerate={generateKnowledgeGraph}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
        .custom-scrollbar-right::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-right::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-right::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}} />
    </div >
  );
};

export default App;
