import React, { useState } from 'react';
import { 
  StickyNote, 
  Plus, 
  Search, 
  Pin, 
  Trash2, 
  CheckSquare, 
  FolderGit2, 
  Sparkles,
  Tag
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { Note } from '../../../types/notes';

export const NotesView: React.FC = () => {
  const { 
    state, 
    addNote, 
    updateNote, 
    deleteNote, 
    toggleNotePinned, 
    convertNoteToTask, 
    convertNoteToProject,
    openQuickAdd 
  } = usePlanner();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Quick scratchpad states
  const [scratchTitle, setScratchTitle] = useState('');
  const [scratchContent, setScratchContent] = useState('');
  const [scratchCat, setScratchCat] = useState<'idea' | 'school' | 'german' | 'tech' | 'general'>('idea');

  const handleCreateScratch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scratchTitle.trim()) return;
    addNote({
      title: scratchTitle.trim(),
      content: scratchContent.trim(),
      category: scratchCat,
      tags: ['QuickCapture'],
      pinned: false
    });
    setScratchTitle('');
    setScratchContent('');
  };

  const filteredNotes = state.notes.filter(n => {
    const matchesCat = selectedCategory === 'ALL' || n.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  // Sort pinned first
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.createdAt.localeCompare(a.createdAt);
  });

  return (
    <div className="view-container notes-view">
      {/* Top Banner */}
      <div className="notes-hero-card">
        <div className="notes-hero-left">
          <div className="notes-hero-badge">
            <StickyNote size={15} />
            <span>Brainstorming & Knowledge Base</span>
          </div>
          <h2 className="notes-hero-title">Ideas, Insights & Formulas</h2>
          <p className="notes-hero-subtitle">
            Capture Bac formulas, German correspondence patterns, and software architecture ideas. Convert any note into a task or project with 1 click.
          </p>
        </div>

        <div className="search-box-wrap notes-search">
          <Search size={15} className="search-icon-inline" />
          <input
            type="text"
            className="input"
            placeholder="Search notes, tags, theorems..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Scratchpad Input Card */}
      <div className="card scratchpad-card">
        <form onSubmit={handleCreateScratch}>
          <div className="scratchpad-header">
            <input
              type="text"
              className="scratchpad-title-input"
              placeholder="Capture a quick thought or theorem..."
              value={scratchTitle}
              onChange={e => setScratchTitle(e.target.value)}
              required
            />
            <select
              className="select select-sm scratchpad-cat-select"
              value={scratchCat}
              onChange={e => setScratchCat(e.target.value as any)}
            >
              <option value="idea">💡 Innovation / Idea</option>
              <option value="school">🎓 Bac 2027 School</option>
              <option value="german">🇩🇪 German & Ausbildung</option>
              <option value="tech">💻 Software Tech</option>
              <option value="general">📝 General</option>
            </select>
          </div>

          <textarea
            className="scratchpad-body-input"
            placeholder="Details, derivation, German example, or implementation plan..."
            value={scratchContent}
            onChange={e => setScratchContent(e.target.value)}
          />

          <div className="scratchpad-footer">
            <span className="text-muted text-sm">Organized automatically into your command knowledge base</span>
            <button type="submit" className="btn btn-primary btn-sm">
              <Plus size={14} />
              <span>Capture Note</span>
            </button>
          </div>
        </form>
      </div>

      {/* Category Filter Pills */}
      <div className="notes-categories-bar">
        {['ALL', 'school', 'german', 'tech', 'idea', 'general'].map(cat => (
          <button
            key={cat}
            className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'ALL' ? 'All Notes' : cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Notes Grid */}
      <div className="notes-grid">
        {sortedNotes.length === 0 ? (
          <div className="card text-center py-6 col-span-full">
            <p className="text-muted">No notes found matching your filter. Start capturing above!</p>
          </div>
        ) : (
          sortedNotes.map(note => (
            <div key={note.id} className={`card note-card ${note.pinned ? 'note-pinned' : ''}`}>
              <div className="note-card-top">
                <span className="note-category-badge">{note.category.toUpperCase()}</span>
                <div className="note-card-actions">
                  <button
                    className={`btn-icon btn-sm ${note.pinned ? 'text-rose' : 'text-muted'}`}
                    onClick={() => toggleNotePinned(note.id)}
                    title={note.pinned ? 'Unpin note' : 'Pin to top'}
                  >
                    <Pin size={15} />
                  </button>
                  <button
                    className="btn-icon btn-sm text-muted"
                    onClick={() => deleteNote(note.id)}
                    title="Delete note"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <h4 className="note-title">{note.title}</h4>
              <p className="note-content">{note.content}</p>

              {/* Tags */}
              <div className="note-tags-row">
                {note.tags.map(t => (
                  <span key={t} className="note-tag-pill">
                    <Tag size={10} />
                    {t}
                  </span>
                ))}
              </div>

              {/* Instant Conversion Row */}
              <div className="note-convert-footer">
                <span className="convert-label">Convert to:</span>
                <div className="convert-btn-group">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => convertNoteToTask(note.id)}
                    title="Convert idea into a scheduled Task"
                  >
                    <CheckSquare size={13} />
                    <span>Task</span>
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => convertNoteToProject(note.id)}
                    title="Convert note into a Software Project card"
                  >
                    <FolderGit2 size={13} />
                    <span>Project</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
