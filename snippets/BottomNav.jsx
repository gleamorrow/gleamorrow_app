// Renders a bottom navigation bar with emoji-based tabs.
// The active tab is highlighted, and clicking a tab triggers the onTabChange callback.

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', emoji: '🏠' },   // Home screen
    { id: 'todo', emoji: '📋' },   // To-do list screen
    { id: 'info', emoji: '🧪' },   // Info / extra content
  ];

  return (
    <footer className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={tab.id === activeTab ? 'active-tab' : ''}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.emoji}
        </button>
      ))}
    </footer>
  );
}
