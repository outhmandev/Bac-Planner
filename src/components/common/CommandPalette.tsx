import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  CheckSquare, 
  GraduationCap, 
  Languages, 
  FolderGit2, 
  StickyNote, 
  Timer, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';
import { ViewType } from '../../types/common';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setCommandPaletteOpen, 
    state, 
    setActiveView, 
    openQuickAdd,
    toggleTaskComplete 
  } = usePlanner();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  // Navigation commands
  const navigationItems = [
    { type: 'nav', id: 'today', title: 'Go to Today Command Center', view: 'today' as ViewType, icon: CheckSquare },
    { type: 'nav', id: 'school', title: 'Go to Bac 2027 Curriculum & Grades', view: 'school' as ViewType, icon: GraduationCap },
    { type: 'nav', id: 'german', title: 'Go to German & Ausbildung Hub', view: 'german' as ViewType, icon: Languages },
    { type: 'nav', id: 'projects', title: 'Go to Software & Dev Projects', view: 'projects' as ViewType, icon: FolderGit2 },
    { type: 'nav', id: 'focus', title: 'Start Focus Chamber (Pomodoro)', view: 'focus' as ViewType, icon: Timer },
    { type: 'nav', id: 'notes', title: 'Go to Notes & Ideas', view: 'notes' as ViewType, icon: StickyNote },
    { type: 'action', id: 'quick-add', title: 'Quick Add: New Task', action: () => openQuickAdd({ type: 'task' }), icon: Plus },
  ].filter(item => !q || item.title.toLowerCase().includes(q));

  // Search Tasks
  const matchedTasks = state.tasks
    .filter(t => !q || t.title.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q)))
    .slice(0, 4)
    .map(t => ({
      type: 'task',
      id: t.id,
      title: t.title,
      subtitle: `${t.status.toUpperCase()} • Priority: ${t.priority.toUpperCase()}`,
      action: () => {
        setActiveView('today');
        setCommandPaletteOpen(false);
      },
      icon: CheckSquare
    }));

  // Search Bac Subjects & Chapters
  const matchedSchool = state.subjects
    .flatMap(s => [
      {
        type: 'school_subj',
        id: s.id,
        title: `${s.name} (Bac Coef ${s.coefficient})`,
        subtitle: `${s.chapters.length} Chapters • ${s.hoursStudied}h logged`,
        action: () => {
          setActiveView('school');
          setCommandPaletteOpen(false);
        },
        icon: GraduationCap
      },
      ...s.chapters.map(c => ({
        type: 'school_ch',
        id: c.id,
        title: `${s.name}: ${c.title}`,
        subtitle: `Exercises: ${c.exercisesCompleted}/${c.exercisesTarget}`,
        action: () => {
          setActiveView('school');
          setCommandPaletteOpen(false);
        },
        icon: GraduationCap
      }))
    ])
    .filter(item => !q || item.title.toLowerCase().includes(q))
    .slice(0, 3);

  // Search German Vocab
  const matchedGerman = state.germanVocab
    .filter(v => !q || v.german.toLowerCase().includes(q) || v.translation.toLowerCase().includes(q))
    .slice(0, 3)
    .map(v => ({
      type: 'german',
      id: v.id,
      title: `${v.article !== 'none' ? v.article + ' ' : ''}${v.german}`,
      subtitle: `${v.translation} (${v.level})`,
      action: () => {
        setActiveView('german');
        setCommandPaletteOpen(false);
      },
      icon: Languages
    }));

  // Search Notes
  const matchedNotes = state.notes
    .filter(n => !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
    .slice(0, 3)
    .map(n => ({
      type: 'note',
      id: n.id,
      title: n.title,
      subtitle: n.content.slice(0, 60) + '...',
      action: () => {
        setActiveView('notes');
        setCommandPaletteOpen(false);
      },
      icon: StickyNote
    }));

  // Combined Results
  const allResults = [
    ...navigationItems.map(item => ({
      ...item,
      subtitle: 'Command / Navigation',
      action: item.action || (() => {
        if (item.view) setActiveView(item.view);
        setCommandPaletteOpen(false);
      })
    })),
    ...matchedTasks,
    ...matchedSchool,
    ...matchedGerman,
    ...matchedNotes
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (allResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (allResults.length || 1)) % (allResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allResults[selectedIndex]) {
        allResults[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setCommandPaletteOpen(false)}>
      <div 
        className="command-palette-card"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="command-palette-header">
          <Search size={18} className="command-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="command-search-input"
            placeholder="Type a command, subject, note, German word or task..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="command-esc-badge">ESC</kbd>
        </div>

        <div className="command-palette-list">
          {allResults.length === 0 ? (
            <div className="command-empty-state">
              <p>No matching commands or items found for "{query}"</p>
            </div>
          ) : (
            allResults.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={`${item.type}-${item.id}`}
                  className={`command-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="command-item-icon">
                    <Icon size={16} />
                  </div>
                  <div className="command-item-body">
                    <span className="command-item-title">{item.title}</span>
                    {item.subtitle && (
                      <span className="command-item-subtitle">{item.subtitle}</span>
                    )}
                  </div>
                  <ArrowRight size={14} className="command-item-arrow" />
                </div>
              );
            })
          )}
        </div>

        <div className="command-palette-footer">
          <div className="command-shortcuts-hint">
            <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>esc</kbd> to dismiss</span>
          </div>
        </div>
      </div>
    </div>
  );
};
