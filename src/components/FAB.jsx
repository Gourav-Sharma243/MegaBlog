import { useState, useEffect } from 'react';
import { ArrowUp, PenSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function FAB() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {authStatus && (
        <button
          onClick={() => navigate('/add-post')}
          className="p-4 bg-primary-dark hover:bg-primary-dark/90 text-white rounded-full shadow-2xl shadow-primary-dark/20 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative cursor-pointer"
          aria-label="Create New Post"
        >
          <PenSquare size={24} />
          <span className="absolute right-full mr-4 bg-background-dark text-text-dark text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/5">
            New Post
          </span>
        </button>
      )}
      
      <div 
        className={`transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="p-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-white/5 text-text-light dark:text-text-dark rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative cursor-pointer border border-gray-100 dark:border-white/5"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
          <span className="absolute right-full mr-4 bg-background-dark text-text-dark text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/5">
            Scroll to Top
          </span>
        </button>
      </div>
    </div>
  );
}

export default FAB;
