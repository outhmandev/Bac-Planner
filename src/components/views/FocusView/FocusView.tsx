import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  Coffee, 
  Timer, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { soundService } from '../../../services/audioService';

export const FocusView: React.FC = () => {
  const { state, logFocusSession, isZenMode, setZenMode } = usePlanner();

  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [targetMinutes, setTargetMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(state.subjects[0]?.id || '');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const timerRef = useRef<number | null>(null);

  // Switch presets
  const handlePresetSelect = (minutes: number) => {
    setIsRunning(false);
    setTargetMinutes(minutes);
    setSecondsLeft(minutes * 60);
    setMode('study');
  };

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            // Session Complete!
            clearInterval(timerRef.current!);
            setIsRunning(false);

            if (soundEnabled) {
              soundService.playChime();
            }

            if (mode === 'study') {
              logFocusSession({
                durationMinutes: targetMinutes,
                mode: targetMinutes >= 45 ? 'deep_study' : 'pomodoro',
                subjectId: selectedSubjectId || undefined,
                projectId: selectedProjectId || undefined,
                notes: sessionNotes.trim() || undefined
              });
              setSessionNotes('');
              // Switch to 5-minute break
              setMode('break');
              return 5 * 60;
            } else {
              // Break finished, return to study
              setMode('study');
              return targetMinutes * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, targetMinutes, selectedSubjectId, selectedProjectId, sessionNotes, soundEnabled, logFocusSession]);

  const toggleRunning = () => {
    if (!isRunning && soundEnabled) {
      soundService.playClick();
    }
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(targetMinutes * 60);
    setMode('study');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentSubject = state.subjects.find(s => s.id === selectedSubjectId);
  const progressPercent = Math.round(((targetMinutes * 60 - secondsLeft) / (targetMinutes * 60)) * 100);

  return (
    <div className={`view-container focus-view ${isZenMode ? 'zen-mode-active' : ''}`}>
      {/* Zen Mode Exit Button */}
      {isZenMode && (
        <button 
          className="zen-exit-btn"
          onClick={() => setZenMode(false)}
          title="Exit Zen Mode (ESC)"
        >
          <Minimize2 size={16} />
          <span>Exit Zen Mode</span>
        </button>
      )}

      {/* Main Chamber Card */}
      <div className={`card focus-chamber-card ${isRunning ? 'timer-running animate-zen-pulse' : ''}`}>
        <div className="focus-chamber-header">
          <div className="focus-mode-badge">
            {mode === 'study' ? (
              <>
                <Timer size={15} />
                <span>Deep Study Session</span>
              </>
            ) : (
              <>
                <Coffee size={15} />
                <span>Rest & Refresh Break</span>
              </>
            )}
          </div>

          <div className="focus-header-tools">
            <button 
              className="btn-icon btn-subtle" 
              onClick={() => setSoundEnabled(prev => !prev)}
              title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button 
              className="btn-icon btn-subtle"
              onClick={() => setZenMode(!isZenMode)}
              title="Toggle Fullscreen Zen"
            >
              {isZenMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* Big Digital Countdown */}
        <div className="countdown-display-wrap">
          <div className="countdown-clock">
            <span className="countdown-digits">{formatTime(secondsLeft)}</span>
          </div>

          <div className="countdown-progress-ring">
            <div 
              className="countdown-progress-bar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Presets Row */}
        {!isRunning && mode === 'study' && (
          <div className="focus-presets-row">
            <button 
              className={`preset-btn ${targetMinutes === 25 ? 'active' : ''}`}
              onClick={() => handlePresetSelect(25)}
            >
              25m Pomodoro
            </button>
            <button 
              className={`preset-btn ${targetMinutes === 50 ? 'active' : ''}`}
              onClick={() => handlePresetSelect(50)}
            >
              50m Deep Study
            </button>
            <button 
              className={`preset-btn ${targetMinutes === 15 ? 'active' : ''}`}
              onClick={() => handlePresetSelect(15)}
            >
              15m Quick Sprint
            </button>
          </div>
        )}

        {/* Subject & Project Linker */}
        <div className="focus-linker-row">
          <div className="linker-item">
            <label className="form-label">Link to Bac Subject</label>
            <select
              className="select select-sm"
              value={selectedSubjectId}
              onChange={e => setSelectedSubjectId(e.target.value)}
              disabled={isRunning}
            >
              <option value="">-- None / General --</option>
              {state.subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.hoursStudied}h logged)</option>
              ))}
            </select>
          </div>

          <div className="linker-item">
            <label className="form-label">Link to Software Project</label>
            <select
              className="select select-sm"
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
              disabled={isRunning}
            >
              <option value="">-- None --</option>
              {state.projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Controls */}
        <div className="focus-primary-controls">
          <button 
            className="btn btn-outline btn-lg focus-reset-btn"
            onClick={handleReset}
            title="Reset timer"
          >
            <RotateCcw size={18} />
          </button>

          <button 
            className="btn btn-primary btn-lg focus-play-btn"
            onClick={toggleRunning}
          >
            {isRunning ? (
              <>
                <Pause size={20} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={20} fill="currentColor" />
                <span>{secondsLeft === targetMinutes * 60 ? 'Begin Session' : 'Resume'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Session History Log */}
      {!isZenMode && (
        <div className="card focus-history-card" style={{ marginTop: '1.5rem' }}>
          <div className="card-header-row">
            <div>
              <h3 className="card-heading">Completed Focus Sessions</h3>
              <span className="card-subheading">Automatically credited to your subject & project progress</span>
            </div>
            <span className="badge badge-rose">
              {state.focusSessions.reduce((acc, s) => acc + s.durationMinutes, 0)} Total Minutes
            </span>
          </div>

          <div className="focus-sessions-list">
            {state.focusSessions.length === 0 ? (
              <div className="text-center py-6 text-muted">
                <Timer size={24} className="text-muted" style={{ margin: '0 auto 0.5rem auto' }} />
                <p style={{ fontSize: '0.88rem' }}>No focus sessions recorded yet. Start your first sprint above to track deep study hours!</p>
              </div>
            ) : (
              state.focusSessions.slice(0, 5).map(session => {
              const subj = state.subjects.find(s => s.id === session.subjectId);
              const proj = state.projects.find(p => p.id === session.projectId);

              return (
                <div key={session.id} className="focus-session-row">
                  <div className="session-left">
                    <CheckCircle2 size={16} className="text-done" />
                    <span className="session-duration">{session.durationMinutes} minutes</span>
                    {subj && (
                      <span className="badge badge-rose" style={{ backgroundColor: subj.bgVar, color: subj.colorVar }}>
                        {subj.name}
                      </span>
                    )}
                    {proj && (
                      <span className="badge badge-gray">
                        {proj.name}
                      </span>
                    )}
                  </div>
                  <span className="session-time-text">
                    {new Date(session.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at{' '}
                    {new Date(session.completedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            }))}
          </div>
        </div>
      )}
    </div>
  );
};
