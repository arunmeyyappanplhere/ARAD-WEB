import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Bell, Settings } from 'lucide-react';
import { useTheme } from '../context/useTheme';

const TopNavBar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex justify-between items-center w-full px-margin-desktop h-16 fixed top-0 z-50 bg-surface-container/30 backdrop-blur-xl border-b border-outline-variant backdrop-filter shadow-[0_0_15px_rgba(0,219,231,0.1)]">
      <div className="flex items-center gap-8">
        <Link to="/" className="font-display-lg text-2xl font-black tracking-tighter text-primary-fixed-dim">ARAD</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            className={`font-body-md text-sm transition-colors ${isActive('/') ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1' : 'text-on-surface-variant hover:text-primary'}`}
            to="/"
          >
            Dashboard
          </Link>
          <Link
            className={`font-body-md text-sm transition-colors ${isActive('/emergencies') ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1' : 'text-on-surface-variant hover:text-primary'}`}
            to="/emergencies"
          >
            Live Emergencies
          </Link>
          <Link
            className={`font-body-md text-sm transition-colors ${isActive('/teams') ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1' : 'text-on-surface-variant hover:text-primary'}`}
            to="/teams"
          >
            Rescue Teams
          </Link>
          <Link
            className={`font-body-md text-sm transition-colors ${isActive('/devices') ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1' : 'text-on-surface-variant hover:text-primary'}`}
            to="/devices"
          >
            History
          </Link>
          <Link
            className={`font-body-md text-sm transition-colors ${isActive('/analytics') ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1' : 'text-on-surface-variant hover:text-primary'}`}
            to="/analytics"
          >
            Analytics
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 transition-all"
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 transition-all" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 transition-all" aria-label="Settings">
          <Settings size={20} />
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-fixed-dim/30">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk7TZHb5CipL9ro-dkjw_dmbXB2QtzV7tkd2MJR6W4XdxZ_1tFNGpsYMIlHAa1KmCcz3G6zaDg4yVrTn52tMBsmETA9QWNIhZ6IVgjl6m8z4Gxes-LvvNtlcRFNGoChe53UJdfjBNyBFUX1C1EOxGhA2nVujmpvfBhkSODEvOSZ-02q9Qgj_3WDHEp_KNWF2VMXflLpgsURD6djP1aeSAbQvN6j4o5BIojJukVqHYYE1PLjtnQuQpuA"
            alt="Profile"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;