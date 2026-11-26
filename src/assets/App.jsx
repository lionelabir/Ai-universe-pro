import { useState } from 'react';
import './App.css';

const aiTools = [
  {
    id: 'translate',
    category: 'Language',
    title: 'AI Translator',
    desc: 'Natural translations across 100+ languages.',
    icon: '🌐',
    color: '#34d399',
    placeholder: 'Paste text to translate...',
  },
  {
    id: 'image',
    category: 'Design',
    title: 'Image Studio',
    desc: 'Turn words into stunning artwork, studio portraits and illustrations.',
    icon: '🖼️',
    color: '#bef264',
    placeholder: 'Describe the image or studio edit you want...',
  },
  {
    id: 'brand',
    category: 'Design',
    title: 'Brand Designer',
    desc: 'Logos, color palettes, jersey graphics and social layouts on demand.',
    icon: '🎨',
    color: '#2dd4bf',
    placeholder: 'Enter your brand name and style...',
  },
  {
    id: 'code',
    category: 'Coding',
    title: 'Code Copilot',
    desc: 'Write, explain and debug code in every major language.',
    icon: '</>',
    color: '#39ff14',
    placeholder: 'Paste code or describe a function...',
  },
];

export default function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [quickPrompt, setQuickPrompt] = useState('');
  const [promptInput, setPromptInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const openToolModal = (tool, initialPrompt = '', initialOutput = '') => {
    setSelectedTool(tool);
    setPromptInput(initialPrompt);
    setOutput(initialOutput);
  };

  const closeToolModal = () => {
    setSelectedTool(null);
    setPromptInput('');
    setOutput('');
  };

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const text = quickPrompt.trim();

    if (!text) {
      openToolModal(aiTools[0]);
      return;
    }

    const targetTool = selectedTool || aiTools[0];
    openToolModal(
      targetTool,
      text,
      `⚡ [AI Universe Pro]\nTool: ${targetTool.title}\nPrompt: "${text}"\nStatus: Ready for live Gemini API integration.`
    );
    setQuickPrompt('');
  };

  const handleRunTool = (e) => {
    e.preventDefault();
    if (!promptInput.trim() || !selectedTool) return;

    setOutput(
      `⚡ [${selectedTool.title} Result]\nInput: "${promptInput.trim()}"\nStatus: Ready for live Gemini API integration.`
    );
  };

  const categories = ['All', 'Language', 'Design', 'Coding'];
  const filteredTools =
    activeCategory === 'All'
      ? aiTools
      : aiTools.filter((tool) => tool.category === activeCategory);

  return (
    <div className="app-shell">
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-brand">
          <div className="brand-icon">⚡</div>
          <span>AI Universe Pro</span>
        </div>

        <nav className="nav-links">
          <a href="#tools">Tools</a>
          <a href="#features">Features</a>
        </nav>

        <button
          type="button"
          className="btn-primary"
          onClick={() => openToolModal(aiTools[1])}
        >
          Open Studio
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="pill-badge">ALL-IN-ONE AI WORKSPACE</span>
          <h1 className="hero-title">Create, Design &amp; Build Faster with AI</h1>
          <p className="hero-description">
            Switch seamlessly between translation, image studio, brand design, and
            code assistance inside one unified workspace.
          </p>

          {/* Quick Prompt Bar */}
          <form className="quick-prompt-bar" onSubmit={handleQuickSubmit}>
            <input
              type="text"
              placeholder="Ask Universe AI anything or describe an image..."
              value={quickPrompt}
              onChange={(e) => setQuickPrompt(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Ask AI ⚡
            </button>
          </form>

          <div className="hero-buttons">
            <button
              type="button"
              className="btn-primary btn-lg"
              onClick={() => openToolModal(aiTools[0])}
            >
              Get Started Free →
            </button>
            <a href="#tools" className="btn-secondary btn-lg">
              Explore AI Tools
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3>16+</h3>
              <p>AI tools</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Languages</p>
            </div>
            <div className="stat-item">
              <h3>2M+</h3>
              <p>Creations made</p>
            </div>
            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
          </div>
        </div>

        {/* Right-side Neural Brain AI Graphic */}
        <div className="hero-visual">
          <div className="neural-brain-graphic" aria-hidden="true">
            <span>🧠</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="tools-section">
        <div className="section-header">
          <h2>AI Tools Suite</h2>
          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="tools-grid">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="tool-card">
              <div
                className="tool-icon"
                style={{ color: tool.color, borderColor: tool.color }}
              >
                {tool.icon}
              </div>
              <span className="tool-category">{tool.category}</span>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => openToolModal(tool)}
              >
                Launch Tool
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Modal */}
      {selectedTool && (
        <div className="modal-backdrop" onClick={closeToolModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="tool-category">{selectedTool.category}</span>
                <h3>
                  {selectedTool.icon} {selectedTool.title}
                </h3>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={closeToolModal}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRunTool} className="modal-form">
              <textarea
                rows={4}
                placeholder={selectedTool.placeholder}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
              />
              <button type="submit" className="btn-primary">
                Generate Output ⚡
              </button>
            </form>

            {output && (
              <pre className="modal-output">{output}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}