import React, { useState } from 'react';
import { 
  Languages, 
  RotateCw, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Search, 
  Briefcase, 
  BookOpen, 
  FileCheck, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Volume2
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { VocabCard, GermanLevel } from '../../../types/german';
import { ProgressBar } from '../../common/ProgressBar';

export const GermanView: React.FC = () => {
  const { 
    state, 
    addVocabCard, 
    updateVocabMastery, 
    toggleGrammarMastered, 
    toggleAusbildungMilestone,
    addAusbildungApplication,
    updateApplicationStatus,
    openQuickAdd 
  } = usePlanner();

  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar' | 'ausbildung' | 'applications'>('vocab');
  const [selectedLevel, setSelectedLevel] = useState<GermanLevel | 'ALL'>('ALL');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabSearch, setVocabSearch] = useState('');

  // Ausbildung application modal
  const [showAppModal, setShowAppModal] = useState(false);
  const [appCompany, setAppCompany] = useState('');
  const [appRole, setAppRole] = useState('Fachinformatiker für Anwendungsentwicklung');
  const [appLocation, setAppLocation] = useState('');
  const [appPortal, setAppPortal] = useState('');
  const [appNotes, setAppNotes] = useState('');

  // Filtered vocabulary
  const filteredVocab = state.germanVocab.filter(v => {
    const matchesLevel = selectedLevel === 'ALL' || v.level === selectedLevel;
    const matchesSearch = !vocabSearch || 
      v.german.toLowerCase().includes(vocabSearch.toLowerCase()) || 
      v.translation.toLowerCase().includes(vocabSearch.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const activeCard: VocabCard | undefined = filteredVocab[currentCardIndex % (filteredVocab.length || 1)];

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleNextCard = (mastery: VocabCard['mastery']) => {
    if (activeCard) {
      updateVocabMastery(activeCard.id, mastery);
    }
    setIsFlipped(false);
    setCurrentCardIndex(prev => prev + 1);
  };

  const getArticleColor = (article: string) => {
    switch (article) {
      case 'der': return '#3A638C'; // Blue masculine
      case 'die': return '#C63945'; // Rose feminine
      case 'das': return '#387574'; // Teal neuter
      default: return '#776B6E';
    }
  };

  const speakGerman = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAddAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appCompany.trim() || !appLocation.trim()) return;
    addAusbildungApplication({
      company: appCompany.trim(),
      role: appRole.trim(),
      location: appLocation.trim(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'researching',
      contractType: 'Duale Ausbildung',
      portalUrl: appPortal.trim() || undefined,
      notes: appNotes.trim() || undefined
    });
    setAppCompany('');
    setAppLocation('');
    setAppPortal('');
    setAppNotes('');
    setShowAppModal(false);
  };

  // Ausbildung milestone progress
  const completedMilestones = state.ausbildungMilestones.filter(m => m.completed).length;
  const milestoneProgress = state.ausbildungMilestones.length > 0 
    ? Math.round((completedMilestones / state.ausbildungMilestones.length) * 100) 
    : 0;

  return (
    <div className="view-container german-view">
      {/* Top Hero Banner */}
      <div className="german-hero-card">
        <div className="german-hero-left">
          <div className="german-badge">
            <Languages size={15} />
            <span>German Proficiency & Ausbildung Command</span>
          </div>
          <h2 className="german-title">Ziel: Fachinformatiker Ausbildung in Deutschland</h2>
          <p className="german-subtitle">
            Systematic progression from A1 through B2, mastering high-frequency technical vocabulary, key grammatical structures, and the complete German apprenticeship pipeline.
          </p>
        </div>

        {/* CEFR Level Stepper */}
        <div className="cefr-levels-stepper">
          <div className="cefr-level-step done">
            <span className="cefr-badge">A1</span>
            <span className="cefr-label">Completed</span>
          </div>
          <div className="cefr-step-arrow">→</div>
          <div className="cefr-level-step done">
            <span className="cefr-badge">A2</span>
            <span className="cefr-label">Completed</span>
          </div>
          <div className="cefr-step-arrow">→</div>
          <div className="cefr-level-step current">
            <span className="cefr-badge">B1</span>
            <span className="cefr-label">Target Nov 2026</span>
          </div>
          <div className="cefr-step-arrow">→</div>
          <div className="cefr-level-step upcoming">
            <span className="cefr-badge">B2</span>
            <span className="cefr-label">Ausbildung Ready</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-nav german-tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => setActiveTab('vocab')}
        >
          <RotateCw size={14} />
          <span>Wortschatz Flashcards ({state.germanVocab.length})</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'grammar' ? 'active' : ''}`}
          onClick={() => setActiveTab('grammar')}
        >
          <BookOpen size={14} />
          <span>Grammatik Checklist ({state.germanGrammar.length})</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'ausbildung' ? 'active' : ''}`}
          onClick={() => setActiveTab('ausbildung')}
        >
          <FileCheck size={14} />
          <span>Ausbildung Roadmap ({milestoneProgress}%)</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <Briefcase size={14} />
          <span>Applications Tracker ({state.ausbildungApplications.length})</span>
        </button>
      </div>

      {/* TAB 1: WORTSCHATZ (FLASHCARDS & DECK) */}
      {activeTab === 'vocab' && (
        <div className="vocab-section">
          <div className="vocab-toolbar">
            <div className="level-filter-pills">
              {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map(lvl => {
                const count = lvl === 'ALL'
                  ? state.germanVocab.length
                  : state.germanVocab.filter(v => v.level === lvl).length;
                return (
                  <button
                    key={lvl}
                    className={`filter-pill ${selectedLevel === lvl ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedLevel(lvl);
                      setCurrentCardIndex(0);
                      setIsFlipped(false);
                    }}
                  >
                    {lvl === 'ALL' ? 'All Cards' : lvl} ({count})
                  </button>
                );
              })}
            </div>

            <button 
              className="btn btn-primary btn-sm"
              onClick={() => openQuickAdd({ type: 'vocab' })}
            >
              <Plus size={14} />
              <span>Add Vocabulary Card</span>
            </button>
          </div>

          {/* Flashcard Player */}
          {filteredVocab.length > 0 && activeCard ? (
            <div className="flashcard-deck-container">
              <div className="flashcard-counter-row">
                <span>Card {(currentCardIndex % filteredVocab.length) + 1} of {filteredVocab.length}</span>
                <span className="badge badge-rose">{activeCard.level} • {activeCard.category.toUpperCase()}</span>
              </div>

              <div 
                className={`flashcard-card ${isFlipped ? 'flipped' : ''}`}
                onClick={handleFlip}
              >
                {!isFlipped ? (
                  /* FRONT OF CARD */
                  <div className="flashcard-front">
                    {activeCard.article !== 'none' && (
                      <span 
                        className="flashcard-article-badge"
                        style={{ color: getArticleColor(activeCard.article) }}
                      >
                        {activeCard.article}
                      </span>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                      <h3 className="flashcard-word">{activeCard.german}</h3>
                      <button
                        type="button"
                        className="btn-icon btn-subtle"
                        style={{ width: 32, height: 32, borderRadius: '50%', color: 'var(--rose-600)' }}
                        onClick={(e) => speakGerman(e, activeCard.article !== 'none' ? `${activeCard.article} ${activeCard.german}` : activeCard.german)}
                        title="Aussprache anhören (Native German Audio)"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                    {activeCard.plural && (
                      <span className="flashcard-plural">Plural: {activeCard.plural}</span>
                    )}
                    <div className="flashcard-tap-hint">
                      <RotateCw size={13} />
                      <span>Tap to reveal translation</span>
                    </div>
                  </div>
                ) : (
                  /* BACK OF CARD */
                  <div className="flashcard-back">
                    <span className="flashcard-translation-label">TRANSLATION</span>
                    <h3 className="flashcard-translation">{activeCard.translation}</h3>
                    {activeCard.exampleSentence && (
                      <div className="flashcard-example-box">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <span className="example-label">Beispielsatz (Example):</span>
                          <button
                            type="button"
                            className="btn btn-subtle btn-sm"
                            style={{ padding: '0.15rem 0.45rem', fontSize: '0.72rem' }}
                            onClick={(e) => speakGerman(e, activeCard.exampleSentence || '')}
                            title="Satz anhören"
                          >
                            <Volume2 size={13} />
                            <span>Audio</span>
                          </button>
                        </div>
                        <p className="example-text">"{activeCard.exampleSentence}"</p>
                      </div>
                    )}
                    <span className="flashcard-times-reviewed">Reviewed {activeCard.timesReviewed} times</span>
                  </div>
                )}
              </div>

              {/* Spaced repetition rating controls */}
              <div className="flashcard-rating-actions">
                <button 
                  className="rating-btn rating-again" 
                  onClick={() => handleNextCard('learning')}
                >
                  Again (1d)
                </button>
                <button 
                  className="rating-btn rating-hard" 
                  onClick={() => handleNextCard('learning')}
                >
                  Hard (2d)
                </button>
                <button 
                  className="rating-btn rating-good" 
                  onClick={() => handleNextCard('review')}
                >
                  Good (4d)
                </button>
                <button 
                  className="rating-btn rating-easy" 
                  onClick={() => handleNextCard('mastered')}
                >
                  Easy (7d)
                </button>
              </div>
            </div>
          ) : (
            <div className="card text-center py-6">
              <p className="text-muted">No vocabulary cards in this filter. Add your first German word!</p>
            </div>
          )}

          {/* Complete Vocab Dictionary Table */}
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header-row">
              <div>
                <h3 className="card-heading">Vocabulary Deck List</h3>
                <span className="card-subheading">All captured words with mastery levels</span>
              </div>
              <div className="search-box-wrap">
                <Search size={14} className="search-icon-inline" />
                <input
                  type="text"
                  className="input input-sm"
                  placeholder="Search German or English..."
                  value={vocabSearch}
                  onChange={e => setVocabSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="planner-table">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>German Word</th>
                    <th>Plural</th>
                    <th>Translation</th>
                    <th>Level</th>
                    <th>Mastery</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVocab.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-muted">
                        No vocabulary cards in your deck yet. Click "Add Vocabulary Card" above or press <strong>Q</strong> to start learning words!
                      </td>
                    </tr>
                  ) : (
                    filteredVocab.map(card => (
                      <tr key={card.id}>
                        <td>
                          <span 
                            className="font-bold" 
                            style={{ color: getArticleColor(card.article) }}
                          >
                            {card.article}
                          </span>
                        </td>
                      <td className="font-semibold">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span>{card.german}</span>
                          <button
                            type="button"
                            className="btn-icon btn-subtle"
                            style={{ width: 24, height: 24, padding: 0 }}
                            onClick={(e) => speakGerman(e, card.article !== 'none' ? `${card.article} ${card.german}` : card.german)}
                            title="Aussprache anhören"
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>
                      </td>
                      <td className="text-muted">{card.plural || '—'}</td>
                      <td>{card.translation}</td>
                      <td>
                        <span className="badge badge-gray">{card.level}</span>
                      </td>
                      <td>
                        <span className={`badge badge-${card.mastery === 'mastered' ? 'done' : 'progress'}`}>
                          {card.mastery.toUpperCase()}
                        </span>
                      </td>
                      <td className="text-muted text-sm" style={{ maxWidth: '300px' }}>
                        {card.exampleSentence || '—'}
                      </td>
                    </tr>
                  ))
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GRAMMATIK CHECKLIST */}
      {activeTab === 'grammar' && (
        <div className="grammar-grid">
          {state.germanGrammar.map(item => (
            <div key={item.id} className={`card grammar-card ${item.mastered ? 'grammar-mastered' : ''}`}>
              <div className="grammar-header">
                <div className="grammar-badge-group">
                  <span className="badge badge-rose">{item.level}</span>
                  <h4 className="grammar-title">{item.title}</h4>
                </div>
                <button
                  className={`btn-icon ${item.mastered ? 'text-done' : 'text-muted'}`}
                  onClick={() => toggleGrammarMastered(item.id)}
                  title="Toggle mastery"
                >
                  {item.mastered ? <CheckCircle2 size={22} className="text-done" /> : <Circle size={22} />}
                </button>
              </div>

              <div className="grammar-explanation-box">
                <span className="grammar-label">Grammatik-Regel:</span>
                <p className="grammar-rule">{item.ruleExplanation}</p>
              </div>

              <div className="grammar-example-box">
                <span className="grammar-label">Beispiel:</span>
                <p className="grammar-example">"{item.exampleSentence}"</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: AUSBILDUNG ROADMAP */}
      {activeTab === 'ausbildung' && (
        <div className="card">
          <div className="card-header-row">
            <div>
              <h3 className="card-heading">Ausbildung Preparation Pipeline</h3>
              <span className="card-subheading">Step-by-step journey from Morocco to Germany</span>
            </div>
            <div className="milestone-progress-pill">
              <span>{completedMilestones} of {state.ausbildungMilestones.length} Completed</span>
            </div>
          </div>

          <div className="roadmap-timeline">
            {state.ausbildungMilestones.map((m, idx) => (
              <div key={m.id} className={`roadmap-step ${m.completed ? 'step-completed' : ''}`}>
                <div className="step-marker-col">
                  <button 
                    className="step-check-circle"
                    onClick={() => toggleAusbildungMilestone(m.id)}
                  >
                    {m.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>
                  {idx < state.ausbildungMilestones.length - 1 && <div className="step-line" />}
                </div>

                <div className="step-body-card">
                  <div className="step-top-row">
                    <div className="step-title-group">
                      <span className="step-number-tag">Step {m.order} • {m.category.toUpperCase()}</span>
                      <h4 className="step-title">{m.title}</h4>
                    </div>
                    {m.targetDate && (
                      <span className="step-target-date">Target: {m.targetDate}</span>
                    )}
                  </div>

                  <p className="step-desc">{m.description}</p>

                  {m.documentsNeeded && m.documentsNeeded.length > 0 && (
                    <div className="step-docs-row">
                      <span className="docs-label">Required Documents:</span>
                      <div className="docs-tags">
                        {m.documentsNeeded.map(doc => (
                          <span key={doc} className="doc-pill">{doc}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: APPLICATIONS TRACKER */}
      {activeTab === 'applications' && (
        <div className="card">
          <div className="card-header-row">
            <div>
              <h3 className="card-heading">Ausbildung Company Applications</h3>
              <span className="card-subheading">Track German enterprise and IT-Systemhaus applications</span>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowAppModal(true)}
            >
              <Plus size={14} />
              <span>New Application</span>
            </button>
          </div>

          <div className="table-responsive">
            <table className="planner-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Date Logged</th>
                  <th>Status</th>
                  <th>Contract</th>
                  <th>Actions / Portal</th>
                </tr>
              </thead>
              <tbody>
                {state.ausbildungApplications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-muted">
                      No applications recorded yet. Start adding target companies!
                    </td>
                  </tr>
                ) : (
                  state.ausbildungApplications.map(app => (
                    <tr key={app.id}>
                      <td className="font-semibold">{app.company}</td>
                      <td>{app.role}</td>
                      <td>{app.location}</td>
                      <td className="text-muted">{app.appliedDate}</td>
                      <td>
                        <select
                          className="select select-sm"
                          value={app.status}
                          onChange={e => updateApplicationStatus(app.id, e.target.value as any)}
                        >
                          <option value="researching">Researching</option>
                          <option value="applied">Applied</option>
                          <option value="interview_scheduled">Interview Scheduled</option>
                          <option value="contract_offered">Contract Offered</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="text-sm">{app.contractType}</td>
                      <td>
                        {app.portalUrl ? (
                          <a 
                            href={app.portalUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-subtle btn-sm"
                          >
                            <span>Careers</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Add Modal */}
      {showAppModal && (
        <div className="modal-overlay" onClick={() => setShowAppModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Track New Ausbildung Application</h3>
            </div>
            <form onSubmit={handleAddAppSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., SAP SE, BMW, Deutsche Telekom"
                    value={appCompany}
                    onChange={e => setAppCompany(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role / Ausbildungsberuf</label>
                  <input
                    type="text"
                    className="input"
                    value={appRole}
                    onChange={e => setAppRole(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location in Germany</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., München, Bayern"
                    value={appLocation}
                    onChange={e => setAppLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Careers Portal URL</label>
                  <input
                    type="url"
                    className="input"
                    placeholder="https://..."
                    value={appPortal}
                    onChange={e => setAppPortal(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Notes & Requirements</label>
                  <textarea
                    className="textarea"
                    placeholder="German language level requirement, benefits, laptop, etc."
                    value={appNotes}
                    onChange={e => setAppNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-subtle" onClick={() => setShowAppModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
