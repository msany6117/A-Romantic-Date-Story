import React, { useState } from 'react';
import { X, Check, RotateCcw, Heart, Calendar, FileText } from 'lucide-react';
import { SiteConfig } from '../types';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSave: (newConfig: SiteConfig) => void;
  onReset: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<SiteConfig>(config);
  const [activeTab, setActiveTab] = useState<'names' | 'memories' | 'letter'>('names');
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#1A1A1A]/10 overflow-hidden flex flex-col max-h-[90vh] text-[#1A1A1A]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#FDFCFB]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#6D071A] fill-[#6D071A]" />
            <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
              Personalize Your Surprise
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#1A1A1A]/50 hover:bg-black/5 cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#1A1A1A]/10 px-6 bg-white text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('names')}
            className={`py-3 px-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'names'
                ? 'border-[#6D071A] text-[#6D071A] font-semibold'
                : 'border-transparent text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> Names & Proposal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('memories')}
            className={`py-3 px-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'memories'
                ? 'border-[#6D071A] text-[#6D071A] font-semibold'
                : 'border-transparent text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Memories
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('letter')}
            className={`py-3 px-3 flex items-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'letter'
                ? 'border-[#6D071A] text-[#6D071A] font-semibold'
                : 'border-transparent text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Love Letter
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'names' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[#1A1A1A]/70 uppercase tracking-wider mb-1">
                  Her Name / Nickname
                </label>
                <input
                  type="text"
                  value={formData.herName}
                  onChange={(e) => setFormData({ ...formData, herName: e.target.value })}
                  placeholder="e.g. Emma, My Love, Princess"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#1A1A1A]/15 bg-white text-[#1A1A1A] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#1A1A1A]/70 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.myName}
                  onChange={(e) => setFormData({ ...formData, myName: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#1A1A1A]/15 bg-white text-[#1A1A1A] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#1A1A1A]/70 uppercase tracking-wider mb-1">
                  The Big Question
                </label>
                <input
                  type="text"
                  value={formData.proposalQuestion}
                  onChange={(e) => setFormData({ ...formData, proposalQuestion: e.target.value })}
                  placeholder="e.g. Will you go on a date with me?"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#1A1A1A]/15 bg-white text-[#1A1A1A] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
                  required
                />
              </div>

              <div className="p-3 bg-[#FDE2E4]/40 rounded-xl border border-[#E5989B]/30 text-xs text-[#6D071A]">
                💡 <strong>Permanent edits:</strong> You can also customize all texts, images, and timings permanently in <code className="bg-white/80 px-1 py-0.5 rounded text-[11px] font-mono">src/config/siteConfig.ts</code>.
              </div>
            </div>
          )}

          {activeTab === 'memories' && (
            <div className="space-y-4">
              <p className="text-xs text-[#1A1A1A]/60 font-mono">
                Customize your memory cards (image URLs and romantic captions):
              </p>
              {formData.memorySection.items.map((item, idx) => (
                <div key={item.id} className="p-3.5 bg-[#FDFCFB] rounded-xl border border-[#1A1A1A]/10 space-y-2">
                  <span className="text-xs font-semibold text-[#6D071A]">Memory #{idx + 1}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...formData.memorySection.items];
                        updated[idx].title = e.target.value;
                        setFormData({
                          ...formData,
                          memorySection: { ...formData.memorySection, items: updated },
                        });
                      }}
                      placeholder="Title"
                      className="px-2.5 py-1.5 rounded-lg border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
                    />
                    <input
                      type="text"
                      value={item.date}
                      onChange={(e) => {
                        const updated = [...formData.memorySection.items];
                        updated[idx].date = e.target.value;
                        setFormData({
                          ...formData,
                          memorySection: { ...formData.memorySection, items: updated },
                        });
                      }}
                      placeholder="Date / Occasion"
                      className="px-2.5 py-1.5 rounded-lg border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
                    />
                  </div>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...formData.memorySection.items];
                      updated[idx].description = e.target.value;
                      setFormData({
                        ...formData,
                        memorySection: { ...formData.memorySection, items: updated },
                      });
                    }}
                    placeholder="Short description or emotion"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
                  />
                  <input
                    type="text"
                    value={item.image}
                    onChange={(e) => {
                      const updated = [...formData.memorySection.items];
                      updated[idx].image = e.target.value;
                      setFormData({
                        ...formData,
                        memorySection: { ...formData.memorySection, items: updated },
                      });
                    }}
                    placeholder="Image URL or /images/memory-01.jpg"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] font-mono text-[11px] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[#1A1A1A]/70 uppercase tracking-wider mb-1">
                  Letter Title
                </label>
                <input
                  type="text"
                  value={formData.loveLetter.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loveLetter: { ...formData.loveLetter, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#1A1A1A]/15 bg-white text-sm text-[#1A1A1A] focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-[#1A1A1A]/70 uppercase tracking-wider mb-1">
                  Letter Body (Paragraphs)
                </label>
                {formData.loveLetter.paragraphs.map((p, idx) => (
                  <textarea
                    key={idx}
                    value={p}
                    rows={2}
                    onChange={(e) => {
                      const newP = [...formData.loveLetter.paragraphs];
                      newP[idx] = e.target.value;
                      setFormData({
                        ...formData,
                        loveLetter: { ...formData.loveLetter, paragraphs: newP },
                      });
                    }}
                    className="w-full mb-2 px-3 py-2 rounded-xl border border-[#1A1A1A]/15 bg-white text-xs text-[#1A1A1A] focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1A1A1A]/60 hover:text-[#6D071A] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Defaults
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#1A1A1A]/70 hover:bg-black/5 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-medium bg-[#6D071A] text-white rounded-xl shadow-xs hover:bg-[#580514] active:scale-95 transition-all cursor-pointer"
              >
                {savedNotice ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" /> Saved!
                  </>
                ) : (
                  'Apply Changes'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
