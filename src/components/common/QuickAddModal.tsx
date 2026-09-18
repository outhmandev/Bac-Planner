import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  GraduationCap, 
  Languages, 
  FolderGit2, 
  Flame, 
  StickyNote 
} from 'lucide-react';
import { Modal } from './Modal';
import { usePlanner } from '../../context/PlannerContext';
import { Priority } from '../../types/common';
import { GermanLevel } from '../../types/german';

export const QuickAddModal: React.FC = () => {
  const { 
    isQuickAddOpen, 
    closeQuickAdd, 
    quickAddOptions, 
    state, 
    addTask, 
    addExam, 
    addVocabCard, 
    addProject, 
    addHabit, 
    addNote 
  } = usePlanner();

  const [activeTab, setActiveTab] = useState<'task' | 'exam' | 'vocab' | 'project' | 'habit' | 'note'>('task');

  useEffect(() => {
    if (isQuickAddOpen) {
      setActiveTab((quickAddOptions.type as any) || 'task');
    }
  }, [isQuickAddOpen, quickAddOptions]);

  // Form states
  // Task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<Priority>('p1');
  const [taskDueDate, setTaskDueDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [taskSubjectId, setTaskSubjectId] = useState(quickAddOptions.initialSubjectId || '');
  const [taskProjectId, setTaskProjectId] = useState(quickAddOptions.initialProjectId || '');
  const [taskTags, setTaskTags] = useState('Bac2027');

  // Exam
  const [examTitle, setExamTitle] = useState('');
  const [examSubjectId, setExamSubjectId] = useState(state.subjects[0]?.id || '');
  const [examDate, setExamDate] = useState('');
  const [examCoef, setExamCoef] = useState(2);
  const [examTargetGrade, setExamTargetGrade] = useState(18.0);
  const [examNotes, setExamNotes] = useState('');

  // German Vocab
  const [germanWord, setGermanWord] = useState('');
  const [germanArticle, setGermanArticle] = useState<'der' | 'die' | 'das' | 'none'>('die');
  const [germanTranslation, setGermanTranslation] = useState('');
  const [germanExample, setGermanExample] = useState('');
  const [germanLevel, setGermanLevel] = useState<GermanLevel>('B1');

  // Project
  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projTech, setProjTech] = useState('React, TypeScript');

  // Habit
  const [habitName, setHabitName] = useState('');
  const [habitRoutine, setHabitRoutine] = useState<'morning' | 'deep_work' | 'evening'>('morning');

  // Note
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<'idea' | 'school' | 'german' | 'tech' | 'general'>('idea');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'task') {
      if (!taskTitle.trim()) return;
      addTask({
        title: taskTitle.trim(),
        priority: taskPriority,
        status: 'todo',
        dueDate: taskDueDate,
        subjectId: taskSubjectId || undefined,
        projectId: taskProjectId || undefined,
        tags: taskTags.split(',').map(t => t.trim()).filter(Boolean),
        subtasks: []
      });
      setTaskTitle('');
    } else if (activeTab === 'exam') {
      if (!examTitle.trim() || !examDate) return;
      addExam({
        title: examTitle.trim(),
        subjectId: examSubjectId,
        date: examDate,
        coefficient: Number(examCoef),
        targetGrade: Number(examTargetGrade),
        type: 'devoir_surveille',
        notes: examNotes
      });
      setExamTitle('');
    } else if (activeTab === 'vocab') {
      if (!germanWord.trim() || !germanTranslation.trim()) return;
      addVocabCard({
        german: germanWord.trim(),
        article: germanArticle,
        translation: germanTranslation.trim(),
        exampleSentence: germanExample.trim(),
        level: germanLevel,
        category: 'ausbildung',
        mastery: 'new'
      });
      setGermanWord('');
      setGermanTranslation('');
      setGermanExample('');
    } else if (activeTab === 'project') {
      if (!projName.trim()) return;
      addProject({
        name: projName.trim(),
        description: projDesc.trim(),
        status: 'planning',
        priority: 'p2',
        techStack: projTech.split(',').map(s => s.trim()).filter(Boolean)
      });
      setProjName('');
      setProjDesc('');
    } else if (activeTab === 'habit') {
      if (!habitName.trim()) return;
      addHabit({
        name: habitName.trim(),
        category: 'study',
        routineTime: habitRoutine,
        targetPerWeek: 7
      });
      setHabitName('');
    } else if (activeTab === 'note') {
      if (!noteTitle.trim()) return;
      addNote({
        title: noteTitle.trim(),
        content: noteContent.trim(),
        category: noteCategory,
        tags: ['QuickCapture'],
        pinned: false
      });
      setNoteTitle('');
      setNoteContent('');
    }

    closeQuickAdd();
  };

  return (
    <Modal
      isOpen={isQuickAddOpen}
      onClose={closeQuickAdd}
      title="Quick Add to Planner"
      subtitle="Instantly capture a task, exam, German card, habit or idea"
      maxWidth="580px"
    >
      <div className="quick-add-tabs">
        <button
          type="button"
          className={`tab-pill ${activeTab === 'task' ? 'active' : ''}`}
          onClick={() => setActiveTab('task')}
        >
          <CheckSquare size={14} />
          <span>Task</span>
        </button>
        <button
          type="button"
          className={`tab-pill ${activeTab === 'exam' ? 'active' : ''}`}
          onClick={() => setActiveTab('exam')}
        >
          <GraduationCap size={14} />
          <span>Bac Exam</span>
        </button>
        <button
          type="button"
          className={`tab-pill ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => setActiveTab('vocab')}
        >
          <Languages size={14} />
          <span>German Word</span>
        </button>
        <button
          type="button"
          className={`tab-pill ${activeTab === 'project' ? 'active' : ''}`}
          onClick={() => setActiveTab('project')}
        >
          <FolderGit2 size={14} />
          <span>Project</span>
        </button>
        <button
          type="button"
          className={`tab-pill ${activeTab === 'habit' ? 'active' : ''}`}
          onClick={() => setActiveTab('habit')}
        >
          <Flame size={14} />
          <span>Habit</span>
        </button>
        <button
          type="button"
          className={`tab-pill ${activeTab === 'note' ? 'active' : ''}`}
          onClick={() => setActiveTab('note')}
        >
          <StickyNote size={14} />
          <span>Note</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="quick-add-form">
        {/* TASK FORM */}
        {activeTab === 'task' && (
          <>
            <div className="form-group">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Math: Solve 4 Complex number geometry exercises"
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select 
                  className="select"
                  value={taskPriority} 
                  onChange={e => setTaskPriority(e.target.value as Priority)}
                >
                  <option value="p1">P1 — Urgent / High</option>
                  <option value="p2">P2 — Medium Focus</option>
                  <option value="p3">P3 — Low</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="input"
                  value={taskDueDate}
                  onChange={e => setTaskDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Link to Bac Subject (Optional)</label>
                <select 
                  className="select"
                  value={taskSubjectId} 
                  onChange={e => setTaskSubjectId(e.target.value)}
                >
                  <option value="">-- None / General --</option>
                  {state.subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Link to Project (Optional)</label>
                <select 
                  className="select"
                  value={taskProjectId} 
                  onChange={e => setTaskProjectId(e.target.value)}
                >
                  <option value="">-- None --</option>
                  {state.projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma-separated)</label>
              <input
                type="text"
                className="input"
                placeholder="Bac2027, Math, DeepWork"
                value={taskTags}
                onChange={e => setTaskTags(e.target.value)}
              />
            </div>
          </>
        )}

        {/* EXAM FORM */}
        {activeTab === 'exam' && (
          <>
            <div className="form-group">
              <label className="form-label">Exam Title</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Contrôle 2: Nombres Complexes & Dérivabilité"
                value={examTitle}
                onChange={e => setExamTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select 
                  className="select"
                  value={examSubjectId}
                  onChange={e => setExamSubjectId(e.target.value)}
                >
                  {state.subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Coef {s.coefficient})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Exam Date</label>
                <input
                  type="date"
                  className="input"
                  value={examDate}
                  onChange={e => setExamDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Coefficient</label>
                <input
                  type="number"
                  className="input"
                  min="1"
                  max="10"
                  value={examCoef}
                  onChange={e => setExamCoef(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Grade (/20)</label>
                <input
                  type="number"
                  className="input"
                  step="0.25"
                  min="0"
                  max="20"
                  value={examTargetGrade}
                  onChange={e => setExamTargetGrade(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes & Syllabus chapters</label>
              <textarea
                className="textarea"
                placeholder="Important formulas and chapters included..."
                value={examNotes}
                onChange={e => setExamNotes(e.target.value)}
              />
            </div>
          </>
        )}

        {/* GERMAN VOCAB FORM */}
        {activeTab === 'vocab' && (
          <>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Article</label>
                <select 
                  className="select"
                  value={germanArticle}
                  onChange={e => setGermanArticle(e.target.value as any)}
                >
                  <option value="der">der (masculine)</option>
                  <option value="die">die (feminine)</option>
                  <option value="das">das (neuter)</option>
                  <option value="none">None (Verb/Adjective)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">German Word</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Vorstellungsgespräch"
                  value={germanWord}
                  onChange={e => setGermanWord(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Translation (English or Arabic)</label>
              <input
                type="text"
                className="input"
                placeholder="Job interview / مقابلة عمل"
                value={germanTranslation}
                onChange={e => setGermanTranslation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Example Sentence</label>
              <input
                type="text"
                className="input"
                placeholder="Ich bereite mich auf mein Vorstellungsgespräch vor."
                value={germanExample}
                onChange={e => setGermanExample(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Level</label>
              <select 
                className="select"
                value={germanLevel}
                onChange={e => setGermanLevel(e.target.value as GermanLevel)}
              >
                <option value="A1">A1 Beginner</option>
                <option value="A2">A2 Elementary</option>
                <option value="B1">B1 Intermediate (Goethe Ziel)</option>
                <option value="B2">B2 Upper Intermediate (Ausbildung)</option>
              </select>
            </div>
          </>
        )}

        {/* PROJECT FORM */}
        {activeTab === 'project' && (
          <>
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Bac 2027 Math Exam Engine"
                value={projName}
                onChange={e => setProjName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="textarea"
                placeholder="What does this software project accomplish?"
                value={projDesc}
                onChange={e => setProjDesc(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tech Stack (comma separated)</label>
              <input
                type="text"
                className="input"
                placeholder="React, TypeScript, Go, Tailwind"
                value={projTech}
                onChange={e => setProjTech(e.target.value)}
              />
            </div>
          </>
        )}

        {/* HABIT FORM */}
        {activeTab === 'habit' && (
          <>
            <div className="form-group">
              <label className="form-label">Habit Name</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., German 20m Anki & Podcast"
                value={habitName}
                onChange={e => setHabitName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Routine Time</label>
              <select
                className="select"
                value={habitRoutine}
                onChange={e => setHabitRoutine(e.target.value as any)}
              >
                <option value="morning">Morning Routine</option>
                <option value="deep_work">Deep Work Routine</option>
                <option value="evening">Evening Routine</option>
              </select>
            </div>
          </>
        )}

        {/* NOTE FORM */}
        {activeTab === 'note' && (
          <>
            <div className="form-group">
              <label className="form-label">Note Title / Thought</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Complex number proof for rotation"
                value={noteTitle}
                onChange={e => setNoteTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                className="textarea"
                style={{ minHeight: '110px' }}
                placeholder="Write your observation, theorem, or idea..."
                value={noteContent}
                onChange={e => setNoteContent(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="select"
                value={noteCategory}
                onChange={e => setNoteCategory(e.target.value as any)}
              >
                <option value="idea">Idea / Innovation</option>
                <option value="school">Bac 2027 School</option>
                <option value="german">German & Ausbildung</option>
                <option value="tech">Tech & Software</option>
                <option value="general">General</option>
              </select>
            </div>
          </>
        )}

        <div className="quick-add-footer">
          <button type="button" className="btn btn-subtle" onClick={closeQuickAdd}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Item
          </button>
        </div>
      </form>
    </Modal>
  );
};
