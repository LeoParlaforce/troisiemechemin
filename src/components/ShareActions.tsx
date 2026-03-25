'use client'

import React from 'react'

interface ShareActionsProps {
  url: string
  title: string
}

const IconWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-all duration-300 ${className}`}
  >
    {children}
  </svg>
);

export default function ShareActions({ url, title }: ShareActionsProps) {
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        console.error("Erreur de partage :", error);
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url);
      alert("Lien copié dans le presse-papier.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-x-10 gap-y-6 mb-10 py-8 border-y border-slate-100">
      <span className="opacity-40 italic font-serif lowercase tracking-normal text-sm text-slate-500">Partager l'article :</span>
      
      <div className="flex items-center gap-8">
        {/* X (Twitter) - Bleu ciel permanent */}
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} 
          target="_blank" rel="noopener noreferrer" title="Partager sur X" 
          className="text-[#1DA1F2] opacity-80 hover:opacity-100 hover:scale-110 transition-all"
        >
          <IconWrapper>
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </IconWrapper>
        </a>
        
        {/* Facebook - Bleu officiel permanent */}
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} 
          target="_blank" rel="noopener noreferrer" title="Partager sur Facebook" 
          className="text-[#1877F2] opacity-80 hover:opacity-100 hover:scale-110 transition-all"
        >
          <IconWrapper>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </IconWrapper>
        </a>
        
        {/* LinkedIn - Bleu pro permanent */}
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} 
          target="_blank" rel="noopener noreferrer" title="Partager sur LinkedIn" 
          className="text-[#0A66C2] opacity-80 hover:opacity-100 hover:scale-110 transition-all"
        >
          <IconWrapper>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </IconWrapper>
        </a>

        {/* Instagram / Share - Rose permanent */}
        <button 
          onClick={handleNativeShare} 
          className="text-[#E4405F] opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer" 
          title="Partager"
        >
          <IconWrapper>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </IconWrapper>
        </button>

        <div className="w-px h-4 bg-slate-200 mx-2 hidden md:block" />
        
        {/* Copier - Bleu Troisième Chemin permanent */}
        <button 
          onClick={copyToClipboard} 
          className="text-blue-500 opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer" 
          title="Copier le lien"
        >
          <IconWrapper>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </IconWrapper>
        </button>
      </div>
    </div>
  )
}