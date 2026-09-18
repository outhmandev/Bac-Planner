import React from 'react';
import { 
  CheckSquare, 
  GraduationCap, 
  Languages, 
  FolderGit2, 
  MoreHorizontal 
} from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';
import { ViewType } from '../../types/common';

interface MobileNavProps {
  onOpenMoreMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenMoreMenu }) => {
  const { activeView, setActiveView } = usePlanner();

  const mainItems: { id: ViewType; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { id: 'today', label: 'Today', icon: CheckSquare },
    { id: 'school', label: 'Bac 2027', icon: GraduationCap },
    { id: 'german', label: 'German', icon: Languages },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {mainItems.map(item => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}

      <button
        className="mobile-nav-btn"
        onClick={onOpenMoreMenu}
      >
        <MoreHorizontal size={20} />
        <span>Menu</span>
      </button>
    </nav>
  );
};
