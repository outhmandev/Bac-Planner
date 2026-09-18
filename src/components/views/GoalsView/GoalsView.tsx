import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { LifeGoal, GoalDomain } from '../../../types/goals';
import { ProgressBar } from '../../common/ProgressBar';

export const GoalsView: React.FC = () => {
  const { state, toggleGoalMilestone, addGoal } = usePlanner();

  const [showAddModal, setShowAddModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDomain, setGoalDomain] = useState<GoalDomain>('academic');
  const [goalDesc, setGoalDesc] = useState('');
  const [goalTargetDate, setGoalTargetDate] = useState('2027-06-30');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;
    addGoal({
      title: goalTitle.trim(),
      domain: goalDomain,
      description: goalDesc.trim(),
      targetDate: goalTargetDate,
      priority: 'p1'
    });
    setGoalTitle('');
    setGoalDesc('');
    setShowAddModal(false);
  };

  const getDomainLabel = (domain: GoalDomain) => {
    switch (domain) {
      case 'academic': return 'Bac 2027 Academic';
      case 'german': return 'German & Ausbildung';
      case 'tech': return 'Software & Career';
      case 'personal': return 'Personal Life';
      default: return domain;
    }
  };

  return (
    <div className="view-container goals-view">
      {/* Top Banner */}
      <div className="goals-hero-card">
        <div className="goals-hero-left">
          <div className="goals-hero-badge">
            <Target size={15} />
            <span>Horizon Objectives</span>
          </div>
          <h2 className="goals-hero-title">Long-Term Objectives & Roadmap</h2>
          <p className="goals-hero-subtitle">
            Transform massive ambitions into achievable milestones and measurable daily progress.
          </p>
        </div>

        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={14} />
          <span>New Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="goals-cards-grid">
        {state.goals.length === 0 ? (
          <div className="card text-center py-8" style={{ gridColumn: '1 / -1' }}>
            <Target size={32} className="text-muted" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>No life goals created yet</h4>
            <p className="text-muted" style={{ maxWidth: '440px', margin: '0.25rem auto 1rem auto', fontSize: '0.9rem' }}>
              Set your high-level milestones for Bac 2027, German B2 certification, or software engineering accomplishments.
            </p>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
              <Plus size={14} />
              <span>Create Your First Goal</span>
            </button>
          </div>
        ) : (
          state.goals.map(goal => {
            const doneM = goal.milestones.filter(m => m.completed).length;
            const totalM = goal.milestones.length;
            const progress = totalM > 0 ? Math.round((doneM / totalM) * 100) : 0;

            return (
              <div key={goal.id} className="card goal-card">
                <div className="goal-card-header">
                  <div>
                    <span className="goal-domain-pill">{getDomainLabel(goal.domain)}</span>
                    <h3 className="goal-title">{goal.title}</h3>
                  </div>
                <span className="goal-target-date">
                  <Calendar size={13} />
                  Target: {goal.targetDate}
                </span>
              </div>

              <p className="goal-desc">{goal.description}</p>

              {/* Progress Bar */}
              <div className="goal-progress-section">
                <div className="goal-progress-meta">
                  <span>Milestone Completion</span>
                  <span className="font-semibold">{doneM} of {totalM} ({progress}%)</span>
                </div>
                <ProgressBar value={progress} height={7} />
              </div>

              {/* Milestones list */}
              <div className="goal-milestones-list">
                <span className="milestones-heading">Milestone Roadmap:</span>
                {goal.milestones.map(m => (
                  <div key={m.id} className="goal-milestone-row">
                    <button
                      className={`milestone-check ${m.completed ? 'checked' : ''}`}
                      onClick={() => toggleGoalMilestone(goal.id, m.id)}
                    >
                      {m.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </button>
                    <span className={`milestone-title-text ${m.completed ? 'completed' : ''}`}>
                      {m.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        }))}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create Life Objective</h3>
            </div>
            <form onSubmit={handleAddGoal}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Goal Title</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., Master Data Structures and Pass B2 German"
                    value={goalTitle}
                    onChange={e => setGoalTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Domain</label>
                  <select
                    className="select"
                    value={goalDomain}
                    onChange={e => setGoalDomain(e.target.value as any)}
                  >
                    <option value="academic">Academic / Bac 2027</option>
                    <option value="german">German & Ausbildung</option>
                    <option value="tech">Software & Programming</option>
                    <option value="personal">Personal / Health</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Completion Date</label>
                  <input
                    type="date"
                    className="input"
                    value={goalTargetDate}
                    onChange={e => setGoalTargetDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description & Success Metric</label>
                  <textarea
                    className="textarea"
                    placeholder="What specific evidence proves this goal is achieved?"
                    value={goalDesc}
                    onChange={e => setGoalDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-subtle" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Objective
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
