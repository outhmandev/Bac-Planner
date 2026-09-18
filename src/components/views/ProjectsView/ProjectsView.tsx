import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  LayoutGrid, 
  List, 
  Clock, 
  Code2
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { ProgressBar } from '../../common/ProgressBar';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const ProjectsView: React.FC = () => {
  const { 
    state, 
    toggleProjectMilestone, 
    addProjectMilestone,
    openQuickAdd
  } = usePlanner();

  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(state.projects[0]?.id || '');
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [showMilestoneInput, setShowMilestoneInput] = useState(false);

  const selectedProject = state.projects.find(p => p.id === selectedProjectId) || state.projects[0];

  // Linked tasks for selected project
  const projectTasks = selectedProject 
    ? state.tasks.filter(t => t.projectId === selectedProject.id)
    : [];

  const completedMilestonesCount = selectedProject?.milestones.filter(m => m.completed).length || 0;
  const milestonesTotal = selectedProject?.milestones.length || 0;

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim() || !selectedProject) return;
    addProjectMilestone(selectedProject.id, newMilestoneTitle.trim());
    setNewMilestoneTitle('');
    setShowMilestoneInput(false);
  };

  const columns = [
    { id: 'planning', label: 'Planning & Architecture', color: 'var(--status-todo)' },
    { id: 'in_progress', label: 'Active Development', color: 'var(--status-progress)' },
    { id: 'review', label: 'Code Review & Testing', color: 'var(--status-review)' },
    { id: 'completed', label: 'Deployed & Production', color: 'var(--status-done)' },
  ];

  return (
    <div className="view-container projects-view">
      {/* Top Banner */}
      <div className="projects-hero-card">
        <div className="projects-hero-left">
          <div className="projects-hero-badge">
            <Code2 size={15} />
            <span>Software Engineering & Dev Center</span>
          </div>
          <h2 className="projects-hero-title">Engineering Production Systems</h2>
          <p className="projects-hero-subtitle">
            Track full-stack applications, algorithms visualizers, and Bac study tools. Showcasing real code craftsmanship for the German Ausbildung portfolio.
          </p>
        </div>

        <div className="projects-hero-actions">
          <div className="view-toggle-btns">
            <button 
              className={`view-toggle-btn ${viewMode === 'board' ? 'active' : ''}`}
              onClick={() => setViewMode('board')}
              title="Kanban Board View"
            >
              <LayoutGrid size={15} />
              <span>Board</span>
            </button>
            <button 
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={15} />
              <span>List</span>
            </button>
          </div>

          <button 
            className="btn btn-primary btn-sm"
            onClick={() => openQuickAdd({ type: 'project' })}
          >
            <Plus size={14} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'board' && (
        <div className="kanban-board-layout">
          {columns.map(col => {
            const colProjects = state.projects.filter(p => p.status === col.id);
            return (
              <div key={col.id} className="kanban-column">
                <div className="kanban-column-header">
                  <div className="col-title-group">
                    <span className="col-indicator-dot" style={{ backgroundColor: col.color }} />
                    <span className="col-title-text">{col.label}</span>
                  </div>
                  <span className="col-count-pill">{colProjects.length}</span>
                </div>

                <div className="kanban-cards-stack">
                  {colProjects.map(proj => {
                    const doneM = proj.milestones.filter(m => m.completed).length;
                    const totalM = proj.milestones.length;
                    const percent = totalM > 0 ? Math.round((doneM / totalM) * 100) : 0;
                    const isSelected = selectedProject?.id === proj.id;

                    return (
                      <div 
                        key={proj.id} 
                        className={`card project-card ${isSelected ? 'project-card-selected' : ''}`}
                        onClick={() => setSelectedProjectId(proj.id)}
                      >
                        <div className="project-card-top">
                          <h4 className="project-card-name">{proj.name}</h4>
                          <span className={`badge badge-p${proj.priority === 'p1' ? '1' : proj.priority === 'p2' ? '2' : '3'}`}>
                            {proj.priority.toUpperCase()}
                          </span>
                        </div>

                        <p className="project-card-desc">{proj.description}</p>

                        {/* Tech Stack Pills */}
                        <div className="tech-stack-wrap">
                          {proj.techStack.map(tech => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>

                        {/* Milestone Progress */}
                        {totalM > 0 && (
                          <div className="project-card-milestones">
                            <div className="milestones-label-row">
                              <span>Milestones</span>
                              <span>{doneM}/{totalM}</span>
                            </div>
                            <ProgressBar value={percent} height={5} />
                          </div>
                        )}

                        <div className="project-card-footer">
                          <span className="project-hours">
                            <Clock size={12} />
                            {proj.hoursSpent}h logged
                          </span>

                          <div className="project-links-row">
                            {proj.repoUrl && (
                              <a 
                                href={proj.repoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="project-link-icon"
                                onClick={e => e.stopPropagation()}
                                title="Repository"
                              >
                                <GithubIcon size={14} />
                              </a>
                            )}
                            {proj.liveUrl && (
                              <a 
                                href={proj.liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="project-link-icon"
                                onClick={e => e.stopPropagation()}
                                title="Live Demo"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {colProjects.length === 0 && (
                    <div className="kanban-empty-slot">
                      <span>No projects in this stage</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="card">
          <div className="table-responsive">
            <table className="planner-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Tech Stack</th>
                  <th>Milestones</th>
                  <th>Hours Logged</th>
                  <th>Links</th>
                </tr>
              </thead>
              <tbody>
                {state.projects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-muted">
                      No software projects created yet. Click "New Project" above to track your development portfolio.
                    </td>
                  </tr>
                ) : (
                  state.projects.map(proj => {
                  const doneM = proj.milestones.filter(m => m.completed).length;
                  const totalM = proj.milestones.length;
                  return (
                    <tr 
                      key={proj.id} 
                      className={`cursor-pointer ${selectedProject?.id === proj.id ? 'row-selected' : ''}`}
                      onClick={() => setSelectedProjectId(proj.id)}
                    >
                      <td className="font-semibold">{proj.name}</td>
                      <td>
                        <span className={`badge badge-${proj.status === 'completed' ? 'done' : 'progress'}`}>
                          {proj.status.toUpperCase().replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${proj.priority}`}>
                          {proj.priority.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="tech-stack-wrap">
                          {proj.techStack.map(t => <span key={t} className="tech-tag">{t}</span>)}
                        </div>
                      </td>
                      <td>{doneM}/{totalM}</td>
                      <td>{proj.hoursSpent}h</td>
                      <td>
                        <div className="project-links-row">
                          {proj.repoUrl && (
                            <a href={proj.repoUrl} target="_blank" rel="noreferrer">
                              <GithubIcon size={14} />
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} target="_blank" rel="noreferrer">
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                }))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SELECTED PROJECT DETAIL DRAWER */}
      {selectedProject && (
        <div className="card project-detail-card" style={{ marginTop: '1.5rem' }}>
          <div className="project-detail-header">
            <div>
              <div className="project-title-row">
                <h3 className="project-detail-title">{selectedProject.name}</h3>
                <span className="badge badge-rose">{selectedProject.status.toUpperCase().replace('_', ' ')}</span>
              </div>
              <p className="project-detail-desc">{selectedProject.description}</p>
            </div>

            <div className="project-detail-actions">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => openQuickAdd({ type: 'task', initialProjectId: selectedProject.id })}
              >
                <Plus size={14} />
                <span>Add Task for Project</span>
              </button>
            </div>
          </div>

          <div className="project-detail-grid">
            {/* Milestones Column */}
            <div className="project-milestones-col">
              <div className="card-header-row">
                <h4 className="subcard-title">Project Milestones ({completedMilestonesCount}/{milestonesTotal})</h4>
                <button 
                  className="btn btn-subtle btn-sm"
                  onClick={() => setShowMilestoneInput(prev => !prev)}
                >
                  <Plus size={13} />
                  <span>Add Milestone</span>
                </button>
              </div>

              {showMilestoneInput && (
                <form onSubmit={handleAddMilestone} className="add-milestone-form">
                  <input
                    type="text"
                    className="input input-sm"
                    placeholder="Enter milestone title..."
                    value={newMilestoneTitle}
                    onChange={e => setNewMilestoneTitle(e.target.value)}
                    autoFocus
                  />
                  <div className="form-action-btns">
                    <button type="button" className="btn btn-subtle btn-sm" onClick={() => setShowMilestoneInput(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary btn-sm">Add</button>
                  </div>
                </form>
              )}

              <div className="milestones-checklist">
                {selectedProject.milestones.map(m => (
                  <div key={m.id} className="milestone-item-row">
                    <button
                      className={`milestone-check ${m.completed ? 'checked' : ''}`}
                      onClick={() => toggleProjectMilestone(selectedProject.id, m.id)}
                    >
                      {m.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </button>
                    <div className="milestone-info">
                      <span className={`milestone-title ${m.completed ? 'completed' : ''}`}>{m.title}</span>
                      {m.dueDate && <span className="milestone-due">Due: {m.dueDate}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Linked Tasks Column */}
            <div className="project-tasks-col">
              <div className="card-header-row">
                <h4 className="subcard-title">Linked Engineering Tasks ({projectTasks.length})</h4>
              </div>

              <div className="project-task-list">
                {projectTasks.length === 0 ? (
                  <p className="text-muted text-sm py-3">No active tasks linked to this project yet.</p>
                ) : (
                  projectTasks.map(t => (
                    <div key={t.id} className="project-task-row">
                      <span className={`task-title-text ${t.status === 'done' ? 'text-done line-through' : ''}`}>
                        {t.title}
                      </span>
                      <span className={`badge badge-p${t.priority === 'p1' ? '1' : t.priority === 'p2' ? '2' : '3'}`}>
                        {t.priority.toUpperCase()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
