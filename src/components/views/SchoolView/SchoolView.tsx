import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Circle, 
  Plus, 
  FileText,
  Calculator,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { ProgressBar } from '../../common/ProgressBar';

export const SchoolView: React.FC = () => {
  const { 
    state, 
    toggleLessonComplete, 
    toggleChapterComplete, 
    updateChapterRevisionStatus,
    openQuickAdd,
    toggleWeaknessResolved,
    addWeakness,
    toggleNationalPaperComplete,
    updateNationalPaperScore
  } = usePlanner();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(state.subjects[0]?.id || 'subj-math');
  const [activeTab, setActiveTab] = useState<'chapters' | 'annales' | 'simulator' | 'exams' | 'weaknesses'>('chapters');
  const [termFilter, setTermFilter] = useState<'all' | '1' | '2'>('all');
  const [annalesSubjectFilter, setAnnalesSubjectFilter] = useState<string>('all');
  const [annalesSessionFilter, setAnnalesSessionFilter] = useState<'all' | 'normale' | 'rattrapage'>('all');
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  // Simulator grades state (defaulting to subject targetBacGrades or 16.0)
  const [simGrades, setSimGrades] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    state.subjects.forEach(s => {
      init[s.id] = s.targetBacGrade || 16.0;
    });
    return init;
  });

  // Weakness modal form state
  const [showWeaknessModal, setShowWeaknessModal] = useState(false);
  const [wkTopic, setWkTopic] = useState('');
  const [wkDesc, setWkDesc] = useState('');
  const [wkSeverity, setWkSeverity] = useState<'critical' | 'moderate' | 'minor'>('critical');
  const [wkActionPlan, setWkActionPlan] = useState('');

  const currentSubject = state.subjects.find(s => s.id === selectedSubjectId) || state.subjects[0];

  // Overall syllabus completion
  let totalCurriculumLessons = 0;
  let completedCurriculumLessons = 0;
  state.subjects.forEach(s => {
    s.chapters.forEach(c => {
      totalCurriculumLessons += c.lessons.length;
      completedCurriculumLessons += c.lessons.filter(l => l.completed).length;
    });
  });
  const overallSyllabusPercent = totalCurriculumLessons > 0 
    ? Math.round((completedCurriculumLessons / totalCurriculumLessons) * 100)
    : 0;

  // Grade and weighted average calculation for recorded continuous exams
  const allGradedExams = state.exams.filter(e => typeof e.actualGrade === 'number');
  let weightedSum = 0;
  let totalCoef = 0;
  allGradedExams.forEach(e => {
    weightedSum += (e.actualGrade || 0) * e.coefficient;
    totalCoef += e.coefficient;
  });
  const currentExamAverage = totalCoef > 0 ? (weightedSum / totalCoef).toFixed(2) : '—';

  // Current subject stats
  const subjectChapters = currentSubject.chapters.filter(c => {
    if (termFilter === 'all') return true;
    return String(c.term) === termFilter;
  });
  const completedChaptersCount = currentSubject.chapters.filter(c => c.completed).length;
  const subjectProgress = currentSubject.chapters.length > 0 
    ? Math.round((completedChaptersCount / currentSubject.chapters.length) * 100)
    : 0;

  const subjectExams = state.exams.filter(e => e.subjectId === currentSubject.id);
  const subjectWeaknesses = state.weaknesses.filter(w => w.subjectId === currentSubject.id);

  // National exam papers filter
  const nationalPapers = state.nationalPapers || [];
  const filteredPapers = nationalPapers.filter(p => {
    if (annalesSubjectFilter !== 'all' && p.subjectId !== annalesSubjectFilter) return false;
    if (annalesSessionFilter !== 'all' && p.session !== annalesSessionFilter) return false;
    return true;
  });

  const practicedPapersCount = nationalPapers.filter(p => p.completed).length;

  // Simulator calculation based on official Moroccan 2nd Bac coefficients
  // Math: 7, PC: 7, SVT: 5, Philo: 2, English: 2 (Total: 23)
  let simWeightedSum = 0;
  let simTotalCoef = 0;
  state.subjects.forEach(s => {
    const grade = simGrades[s.id] ?? 16;
    simWeightedSum += grade * s.coefficient;
    simTotalCoef += s.coefficient;
  });
  const simulatedBacAverage = simTotalCoef > 0 ? (simWeightedSum / simTotalCoef) : 0;
  const formattedSimAverage = simulatedBacAverage.toFixed(2);

  // Moroccan official Mention threshold
  let mentionLabel = 'Passable';
  let mentionClass = 'mention-passable';
  let mentionEmoji = '👍';
  if (simulatedBacAverage >= 18.0) {
    mentionLabel = 'Mention Très Bien (Félicitations du Jury)';
    mentionClass = 'mention-tb';
    mentionEmoji = '🏆';
  } else if (simulatedBacAverage >= 16.0) {
    mentionLabel = 'Mention Très Bien';
    mentionClass = 'mention-tb';
    mentionEmoji = '🌟';
  } else if (simulatedBacAverage >= 14.0) {
    mentionLabel = 'Mention Bien';
    mentionClass = 'mention-bien';
    mentionEmoji = '⭐';
  } else if (simulatedBacAverage >= 12.0) {
    mentionLabel = 'Mention Assez Bien';
    mentionClass = 'mention-ab';
    mentionEmoji = '✨';
  } else if (simulatedBacAverage >= 10.0) {
    mentionLabel = 'Passable';
    mentionClass = 'mention-passable';
    mentionEmoji = '👍';
  } else {
    mentionLabel = 'Session de Rattrapage';
    mentionClass = 'mention-rattrapage';
    mentionEmoji = '⚠️';
  }

  const handleAddWeaknessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wkTopic.trim() || !wkActionPlan.trim()) return;
    addWeakness({
      subjectId: currentSubject.id,
      topic: wkTopic.trim(),
      description: wkDesc.trim(),
      severity: wkSeverity,
      actionPlan: wkActionPlan.trim(),
      resolved: false
    });
    setWkTopic('');
    setWkDesc('');
    setWkActionPlan('');
    setShowWeaknessModal(false);
  };

  return (
    <div className="view-container school-view">
      {/* Top Bac 2027 Metric Header */}
      <div className="school-hero-card">
        <div className="school-hero-left">
          <div className="school-tag">
            <GraduationCap size={15} />
            <span>Moroccan 2nd Baccalaureate 2027 • Examen National BIOF</span>
          </div>
          <h2 className="school-title">Official Bac Command Center</h2>
          <p className="school-subtitle">
            Authentic curriculum tracker & National Exam archive for Sciences Expérimentales (PC/SVT) and Sciences Mathématiques. 
            Official ministerial weighting, key theorems, past exam papers, and real-time mention predictor.
          </p>
        </div>

        <div className="school-hero-stats">
          <div className="school-stat-box">
            <span className="stat-label">Predicted Bac Average</span>
            <div className="stat-score-row">
              <span className="stat-score-val">{formattedSimAverage}</span>
              <span className="stat-score-max">/ 20</span>
            </div>
            <span className="stat-sub">{mentionLabel}</span>
          </div>

          <div className="school-stat-box">
            <span className="stat-label">Syllabus Completion</span>
            <div className="stat-score-row">
              <span className="stat-score-val">{overallSyllabusPercent}%</span>
              <span className="stat-score-max">{completedCurriculumLessons}/{totalCurriculumLessons}</span>
            </div>
            <span className="stat-sub">Across 44 Official Chapters</span>
          </div>

          <div className="school-stat-box">
            <span className="stat-label">National Papers</span>
            <div className="stat-score-row">
              <span className="stat-score-val">{practicedPapersCount}</span>
              <span className="stat-score-max">/ {nationalPapers.length}</span>
            </div>
            <span className="stat-sub">Past exams mastered</span>
          </div>

          <div className="school-stat-box">
            <span className="stat-label">Open Weaknesses</span>
            <div className="stat-score-row">
              <span className="stat-score-val">
                {state.weaknesses.filter(w => !w.resolved).length}
              </span>
              <span className="stat-score-max">traps</span>
            </div>
            <span className="stat-sub">Action plans active</span>
          </div>
        </div>
      </div>

      {/* Main Mode Toggle Tabs */}
      <div className="tabs-nav school-tabs-nav" style={{ marginBottom: '1.25rem' }}>
        <button
          className={`tab-btn ${activeTab === 'chapters' ? 'active' : ''}`}
          onClick={() => setActiveTab('chapters')}
        >
          <BookOpen size={15} />
          <span>Curriculum & Lessons (الدروس والمقرر)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'annales' ? 'active' : ''}`}
          onClick={() => setActiveTab('annales')}
        >
          <FileText size={15} />
          <span>Past National Exams (الامتحانات الوطنية 2020-2024)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'simulator' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulator')}
        >
          <Calculator size={15} />
          <span>Bac & Mention Simulator (محاكي النقط والميزة)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'exams' ? 'active' : ''}`}
          onClick={() => setActiveTab('exams')}
        >
          <Award size={15} />
          <span>Continuous Assessments (المراقبة المستمرة)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'weaknesses' ? 'active' : ''}`}
          onClick={() => setActiveTab('weaknesses')}
        >
          <AlertTriangle size={15} />
          <span>Exam Weakness Tracker (معالجة الثغرات)</span>
        </button>
      </div>

      {/* TAB 1: CHAPTERS & LESSONS */}
      {activeTab === 'chapters' && (
        <>
          {/* Subject Navigation Tabs */}
          <div className="subject-pills-bar">
            {state.subjects.map(s => {
              const isSelected = s.id === currentSubject.id;
              return (
                <button
                  key={s.id}
                  className={`subject-pill-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedSubjectId(s.id)}
                >
                  <span 
                    className="subject-pill-indicator"
                    style={{ backgroundColor: s.colorVar }}
                  />
                  <span className="subject-pill-name">{s.name}</span>
                  <span className="subject-pill-coef">Coef {s.coefficient}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Subject Overview Card */}
          <div className="card subject-overview-card" style={{ marginBottom: '1.25rem' }}>
            <div className="subject-overview-header">
              <div>
                <div className="subject-title-row">
                  <h3 className="subject-title-name" style={{ color: currentSubject.colorVar }}>
                    {currentSubject.name}
                  </h3>
                  <span className="badge badge-rose">Coefficient {currentSubject.coefficient}</span>
                  <span className="badge badge-gray">Cadre de Référence Officiel</span>
                  <span className="badge badge-done">Target: {currentSubject.targetBacGrade}/20</span>
                </div>
                <p className="subject-meta-text">
                  {currentSubject.chapters.length} Official Chapters • {currentSubject.chapters.reduce((a, c) => a + c.lessons.length, 0)} Verified Lessons • Official AlloSchool Syllabus
                </p>
              </div>

              <div className="subject-progress-box">
                <div className="subject-progress-label">
                  <span>Subject Progress</span>
                  <span className="subject-percent-value">{subjectProgress}%</span>
                </div>
                <ProgressBar value={subjectProgress} height={8} color={currentSubject.colorVar} />
              </div>
            </div>

            {/* Term Filter Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem' }}>
              <button
                className={`filter-pill ${termFilter === 'all' ? 'active' : ''}`}
                onClick={() => setTermFilter('all')}
              >
                All Chapters ({currentSubject.chapters.length})
              </button>
              <button
                className={`filter-pill ${termFilter === '1' ? 'active' : ''}`}
                onClick={() => setTermFilter('1')}
              >
                Semestre 1 ({currentSubject.chapters.filter(c => c.term === 1).length})
              </button>
              <button
                className={`filter-pill ${termFilter === '2' ? 'active' : ''}`}
                onClick={() => setTermFilter('2')}
              >
                Semestre 2 ({currentSubject.chapters.filter(c => c.term === 2).length})
              </button>
            </div>
          </div>

          {/* Chapters & Lessons Grid */}
          <div className="chapters-grid">
            {subjectChapters.map((chapter, idx) => (
              <div key={chapter.id} className={`card chapter-card ${chapter.completed ? 'chapter-mastered' : ''}`}>
                <div className="chapter-header">
                  <div className="chapter-order-badge">
                    <span>Ch. {chapter.order || idx + 1}</span>
                  </div>
                  <div className="chapter-title-group">
                    <h4 className="chapter-title">{chapter.title}</h4>
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <span className="chapter-term-badge">Term {chapter.term}</span>
                      {chapter.nationalExamWeight && (
                        <span className="lesson-weight-badge">{chapter.nationalExamWeight}</span>
                      )}
                    </div>
                  </div>
                  <button
                    className={`btn-icon ${chapter.completed ? 'text-done' : 'text-muted'}`}
                    onClick={() => toggleChapterComplete(currentSubject.id, chapter.id)}
                    title="Toggle entire chapter mastery"
                  >
                    {chapter.completed ? <CheckCircle2 size={22} className="text-done" /> : <Circle size={22} />}
                  </button>
                </div>

                {/* Exercises Progress & Revision Status */}
                <div className="chapter-exercises-row">
                  <div className="exercises-meta">
                    <FileText size={13} className="text-muted" />
                    <span>Target: <strong>{chapter.exercisesTarget}</strong> Solved Exercises</span>
                  </div>
                  <select
                    className={`revision-tag revision-${chapter.revisionStatus}`}
                    value={chapter.revisionStatus}
                    onChange={e => updateChapterRevisionStatus(currentSubject.id, chapter.id, e.target.value)}
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    <option value="not_started">NOT STARTED</option>
                    <option value="reading">IN PROGRESS</option>
                    <option value="exercises">EXERCISES</option>
                    <option value="mastered">MASTERED</option>
                  </select>
                </div>

                {/* Interactive Lessons List */}
                <div className="lessons-list">
                  {chapter.lessons.map(lesson => {
                    const isExpanded = expandedLessonId === lesson.id;
                    return (
                      <div key={lesson.id} className="lesson-row-interactive">
                        <div className="lesson-main-line">
                          <div className="lesson-left">
                            <button
                              className={`lesson-check ${lesson.completed ? 'checked' : ''}`}
                              onClick={() => toggleLessonComplete(currentSubject.id, chapter.id, lesson.id)}
                            >
                              {lesson.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                            </button>
                            <span className={`lesson-title ${lesson.completed ? 'completed' : ''}`}>
                              {lesson.title}
                            </span>
                          </div>

                          <div className="lesson-actions-group">
                            {lesson.nationalWeight && (
                              <span className="lesson-weight-badge">{lesson.nationalWeight}</span>
                            )}
                            {(lesson.keyFormula || lesson.examTip) && (
                              <button
                                className="btn btn-subtle btn-sm"
                                onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                                title="Voir Cadre de Référence & Formule"
                              >
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                <span style={{ fontSize: '0.75rem' }}>Cadre</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Expandable Official Cadre de Référence & Exam Advice */}
                        {isExpanded && (
                          <div className="lesson-cadre-details">
                            {lesson.keyFormula && (
                              <div className="cadre-box cadre-formula-box">
                                <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                                  📐 Formule & Théorème Clé (Cadre Officiel):
                                </span>
                                <span>{lesson.keyFormula}</span>
                              </div>
                            )}

                            {lesson.examTip && (
                              <div className="cadre-box cadre-tip-box">
                                <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                                  💡 Piège Fréquent & Astuce du Barème:
                                </span>
                                <span>{lesson.examTip}</span>
                              </div>
                            )}

                            <div className="cadre-footer-row">
                              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                                Source: Ministère de l'Éducation Nationale • AlloSchool
                              </span>
                              {lesson.alloschoolUrl && (
                                <a 
                                  href={lesson.alloschoolUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="alloschool-link-btn"
                                >
                                  <span>AlloSchool Cours ↗</span>
                                  <ExternalLink size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TAB 2: PAST NATIONAL EXAM PAPERS ARCHIVE (ANNALES DU BAC) */}
      {activeTab === 'annales' && (
        <div className="annales-container">
          <div className="annales-filter-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700 }}>Filtrer par Matière:</span>
              <button
                className={`filter-pill ${annalesSubjectFilter === 'all' ? 'active' : ''}`}
                onClick={() => setAnnalesSubjectFilter('all')}
              >
                Toutes ({nationalPapers.length})
              </button>
              {state.subjects.map(s => (
                <button
                  key={s.id}
                  className={`filter-pill ${annalesSubjectFilter === s.id ? 'active' : ''}`}
                  onClick={() => setAnnalesSubjectFilter(s.id)}
                >
                  {s.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700 }}>Session:</span>
              <button
                className={`filter-pill ${annalesSessionFilter === 'all' ? 'active' : ''}`}
                onClick={() => setAnnalesSessionFilter('all')}
              >
                Toutes
              </button>
              <button
                className={`filter-pill ${annalesSessionFilter === 'normale' ? 'active' : ''}`}
                onClick={() => setAnnalesSessionFilter('normale')}
              >
                Normale
              </button>
              <button
                className={`filter-pill ${annalesSessionFilter === 'rattrapage' ? 'active' : ''}`}
                onClick={() => setAnnalesSessionFilter('rattrapage')}
              >
                Rattrapage
              </button>
            </div>
          </div>

          {/* Annales Grid */}
          <div className="annales-grid">
            {filteredPapers.map(paper => (
              <div key={paper.id} className={`annale-card ${paper.completed ? 'practiced' : ''}`}>
                <div className="annale-top-row">
                  <div>
                    <span className="annale-year-badge">
                      Baccalauréat {paper.year}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.2rem 0' }}>
                      {paper.subjectName}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {paper.stream} • Durée: {paper.durationHours}h • Coef {paper.coefficient}
                    </span>
                  </div>

                  <span className={`annale-session-badge annale-session-${paper.session}`}>
                    Session {paper.session}
                  </span>
                </div>

                {/* Topics Covered */}
                <div className="annale-topics-list">
                  <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-primary)' }}>
                    Structure Réelle de l'Épreuve:
                  </span>
                  {paper.topicsCovered.map((topic, i) => (
                    <div key={i} className="annale-topic-item">
                      <span style={{ color: 'var(--rose-500)', fontWeight: 800 }}>•</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>

                {paper.notes && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    💡 {paper.notes}
                  </p>
                )}

                {/* Action Links & Self Scoring */}
                <div className="annale-actions-row">
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      title="Ouvrir le Sujet Officiel sur AlloSchool"
                    >
                      <FileText size={13} />
                      <span>Sujet & Corrigé ↗</span>
                    </a>
                  </div>

                  <div className="annale-score-input-wrap">
                    <button
                      className={`btn btn-sm ${paper.completed ? 'btn-secondary' : 'btn-outline'}`}
                      onClick={() => toggleNationalPaperComplete(paper.id)}
                    >
                      {paper.completed ? '✓ Traité' : 'À traiter'}
                    </button>

                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      placeholder="Note"
                      className="annale-score-input"
                      value={paper.score ?? ''}
                      onChange={e => updateNationalPaperScore(paper.id, parseFloat(e.target.value))}
                    />
                    <span>/20</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BAC GRADE & MENTION SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="simulator-container">
          {/* Mention Hero Card */}
          <div className="mention-hero-card">
            <div className="mention-hero-left">
              <div className="mention-tag">
                <Sparkles size={14} />
                <span>Simulateur Officiel du Baccalauréat Marocain</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.2rem 0' }}>
                Note Estimée de l'Examen National
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '540px' }}>
                Calcul direct et officiel pondéré par les coefficients officiels du Ministère (Math: 7, PC: 7, SVT: 5, Philo: 2, English: 2 — Total 23 coefficients).
              </p>
              <div className={`mention-hero-badge ${mentionClass}`}>
                <span>{mentionEmoji}</span>
                <span>{mentionLabel}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-muted)' }}>Moyenne Générale</span>
              <div className="mention-hero-grade">
                {formattedSimAverage}
                <span style={{ fontSize: '1.3rem', color: 'var(--text-muted)' }}> / 20</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Total Points: {simWeightedSum.toFixed(1)} / {simTotalCoef * 20}
              </span>
            </div>
          </div>

          {/* Sliders Grid for each National Subject */}
          <div className="simulator-sliders-grid">
            {state.subjects.map(subject => {
              const currentGrade = simGrades[subject.id] ?? 16;
              const pointsContribution = ((currentGrade * subject.coefficient) / simTotalCoef).toFixed(2);

              return (
                <div key={subject.id} className="subject-slider-card">
                  <div className="slider-top-row">
                    <div className="slider-subject-info">
                      <span 
                        className="subject-pill-indicator"
                        style={{ backgroundColor: subject.colorVar, width: 10, height: 10 }}
                      />
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{subject.name}</span>
                      <span className="slider-coef-tag">Coef {subject.coefficient}</span>
                    </div>

                    <div className="slider-grade-display" style={{ color: subject.colorVar }}>
                      {currentGrade.toFixed(2)}
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}> / 20</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.25"
                    className="grade-range-input"
                    value={currentGrade}
                    onChange={e => {
                      const val = parseFloat(e.target.value);
                      setSimGrades(prev => ({ ...prev, [subject.id]: val }));
                    }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <span>Apport à la moyenne: <strong>+{pointsContribution} pts</strong></span>
                    <span>Total pondéré: {(currentGrade * subject.coefficient).toFixed(1)} pts</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Mention Scale Table */}
          <div className="card">
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Échelle Officielle des Mentions au Maroc (BO)
            </h4>
            <div className="table-responsive">
              <table className="planner-table">
                <thead>
                  <tr>
                    <th>Mention</th>
                    <th>Intervalle de Note</th>
                    <th>Statut & Débouchés</th>
                    <th>Accès CPGE / Médecine / ENSA / Ausbildung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: simulatedBacAverage >= 16 ? '#FFF9FB' : 'transparent' }}>
                    <td className="font-semibold text-rose">🌟 Mention Très Bien</td>
                    <td>16.00 / 20 à 20.00 / 20</td>
                    <td>Éligible à toutes les grandes écoles & bourses d'excellence</td>
                    <td>Accès garanti aux concours d'élite & visa d'études privilégié</td>
                  </tr>
                  <tr style={{ backgroundColor: simulatedBacAverage >= 14 && simulatedBacAverage < 16 ? '#FFF9FB' : 'transparent' }}>
                    <td className="font-semibold" style={{ color: '#0369A1' }}>⭐ Mention Bien</td>
                    <td>14.00 / 20 à 15.99 / 20</td>
                    <td>Très solide dossier pour facultés de médecine, ENSA, ENSAM et FST</td>
                    <td>Forte chance de sélection sur dossier de pré-candidature</td>
                  </tr>
                  <tr style={{ backgroundColor: simulatedBacAverage >= 12 && simulatedBacAverage < 14 ? '#FFF9FB' : 'transparent' }}>
                    <td className="font-semibold" style={{ color: '#15803D' }}>✨ Mention Assez Bien</td>
                    <td>12.00 / 20 à 13.99 / 20</td>
                    <td>Admis au Baccalauréat avec mention honorable</td>
                    <td>Accès aux BTS, EST, universités et Ausbildung en Allemagne</td>
                  </tr>
                  <tr style={{ backgroundColor: simulatedBacAverage >= 10 && simulatedBacAverage < 12 ? '#FFF9FB' : 'transparent' }}>
                    <td className="font-semibold text-muted">👍 Passable</td>
                    <td>10.00 / 20 à 11.99 / 20</td>
                    <td>Admis au Baccalauréat</td>
                    <td>Accès aux facultés ouvertes et instituts techniques ISTA</td>
                  </tr>
                  <tr style={{ backgroundColor: simulatedBacAverage < 10 ? '#FFF9FB' : 'transparent' }}>
                    <td className="font-semibold" style={{ color: '#E65100' }}>⚠️ Session de Rattrapage</td>
                    <td>07.00 / 20 à 09.99 / 20</td>
                    <td>Deuxième chance en Session de Juillet</td>
                    <td>Permet de rattraper les matières sous la moyenne</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EXAMS & CONTINUOUS ASSESSMENTS */}
      {activeTab === 'exams' && (
        <div className="card">
          <div className="card-header-row">
            <div>
              <h3 className="card-heading">Exam Schedule & Grade Records</h3>
              <span className="card-subheading">Contrôles continus, devoirs surveillés et sessions officielles du Bac</span>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => openQuickAdd({ type: 'exam', initialSubjectId: currentSubject.id })}
            >
              <Plus size={14} />
              <span>Add Exam</span>
            </button>
          </div>

          <div className="table-responsive">
            <table className="planner-table">
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Coefficient</th>
                  <th>Target Grade</th>
                  <th>Actual Grade</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {state.exams.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-muted">
                      No exams recorded. Add your next scheduled test!
                    </td>
                  </tr>
                ) : (
                  state.exams.map(exam => {
                    const isGraded = typeof exam.actualGrade === 'number';
                    const examSubject = state.subjects.find(s => s.id === exam.subjectId);
                    return (
                      <tr key={exam.id}>
                        <td className="font-semibold">{exam.title}</td>
                        <td>
                          {examSubject ? (
                            <span 
                              className="badge" 
                              style={{ backgroundColor: examSubject.bgVar, color: examSubject.colorVar }}
                            >
                              {examSubject.name.split(' ')[0]}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="text-muted">{exam.date}</td>
                        <td>
                          <span className="badge badge-gray">Coef {exam.coefficient}</span>
                        </td>
                        <td>{exam.targetGrade.toFixed(2)} / 20</td>
                        <td>
                          {isGraded ? (
                            <span className="grade-pill-value">
                              {exam.actualGrade?.toFixed(2)} / 20
                            </span>
                          ) : (
                            <span className="text-muted italic">Scheduled</span>
                          )}
                        </td>
                        <td>
                          {isGraded ? (
                            <span className="badge badge-done">Completed</span>
                          ) : (
                            <span className="badge badge-progress">Upcoming</span>
                          )}
                        </td>
                        <td className="text-muted text-sm">{exam.notes || '—'}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: WEAKNESSES & ACTION PLANS */}
      {activeTab === 'weaknesses' && (
        <div className="weaknesses-section">
          <div className="card-header-row" style={{ marginBottom: '1rem' }}>
            <div>
              <h3 className="card-heading">Targeted Weakness Resolution (معالجة الثغرات)</h3>
              <span className="card-subheading">Pre-configured with authentic traps from Moroccan National Exam correction committees</span>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowWeaknessModal(true)}
            >
              <Plus size={14} />
              <span>Log Stumbled Trap</span>
            </button>
          </div>

          <div className="weaknesses-grid">
            {state.weaknesses.map(wk => {
              const wkSubject = state.subjects.find(s => s.id === wk.subjectId);
              return (
                <div key={wk.id} className={`card weakness-card ${wk.resolved ? 'weakness-resolved' : ''}`}>
                  <div className="weakness-header">
                    <div className="weakness-title-wrap">
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                        <span className={`severity-badge severity-${wk.severity}`}>
                          {wk.severity.toUpperCase()}
                        </span>
                        {wkSubject && (
                          <span 
                            className="badge" 
                            style={{ backgroundColor: wkSubject.bgVar, color: wkSubject.colorVar, fontSize: '0.7rem' }}
                          >
                            {wkSubject.name.split(' ')[0]}
                          </span>
                        )}
                      </div>
                      <h4 className="weakness-topic" style={{ marginTop: '0.25rem' }}>{wk.topic}</h4>
                    </div>

                    <button
                      className={`btn btn-sm ${wk.resolved ? 'btn-secondary' : 'btn-outline'}`}
                      onClick={() => toggleWeaknessResolved(wk.id)}
                    >
                      {wk.resolved ? '✓ Mastered' : 'Mark Mastered'}
                    </button>
                  </div>

                  <p className="weakness-desc">{wk.description}</p>

                  <div className="weakness-action-box">
                    <span className="action-box-label">Official Cadre Action Plan:</span>
                    <p className="action-box-text">{wk.actionPlan}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Log Weakness Modal */}
      {showWeaknessModal && (
        <div className="modal-overlay" onClick={() => setShowWeaknessModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Log Weakness for {currentSubject.name}</h3>
            </div>
            <form onSubmit={handleAddWeaknessSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Topic / Concept Stumbled On</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., Complex geometry transformations (homothétie / rotation)"
                    value={wkTopic}
                    onChange={e => setWkTopic(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Severity Level</label>
                  <select
                    className="select"
                    value={wkSeverity}
                    onChange={e => setWkSeverity(e.target.value as any)}
                  >
                    <option value="critical">Critical (Costly on National Exam)</option>
                    <option value="moderate">Moderate (Needs practice)</option>
                    <option value="minor">Minor (Quick review)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description of Confusion</label>
                  <textarea
                    className="textarea"
                    placeholder="What specifically causes doubt or errors?"
                    value={wkDesc}
                    onChange={e => setWkDesc(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Concrete Action Plan</label>
                  <textarea
                    className="textarea"
                    placeholder="e.g., Solve 5 National past exams from 2020 to 2024 and write down summary formulas."
                    value={wkActionPlan}
                    onChange={e => setWkActionPlan(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-subtle" onClick={() => setShowWeaknessModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Weakness
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
