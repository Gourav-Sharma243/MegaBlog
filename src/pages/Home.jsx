import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

function Home() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate(); 
  
  const categories = ["All", "Technology", "Design", "Lifestyle", "Tutorials"];

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (!authStatus || posts.length === 0) {
     return (
       <div className="w-full min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-700">
         {/* Subtle ambient light */}
         <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-dark/5 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
         
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-center max-w-4xl relative z-10"
         >
           <h1 className="text-6xl md:text-8xl font-display font-bold text-text-light dark:text-text-dark mb-8 tracking-tight leading-[1.1]">
             Future of <span className="text-primary-dark">Blogging</span> is here.
           </h1>
           <p className="text-xl md:text-2xl text-text-light/60 dark:text-text-dark/60 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
             Join MegaBlog and share your stories in a refined, distraction-free environment designed for creators.
           </p>
           {!authStatus && (
             <motion.button
               whileHover={{ scale: 1.02, backgroundColor: 'var(--primary)' }}
               whileTap={{ scale: 0.98 }}
               className="px-10 py-5 bg-primary-dark text-white font-semibold rounded-2xl shadow-[0_20px_40px_rgba(99,102,241,0.2)] transition-all duration-300"
               onClick={() => navigate('/login')}
             >
               Start Writing for Free
             </motion.button>
           )}
           {authStatus && posts.length === 0 && (
             <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-t-2 border-primary-dark rounded-full animate-spin" />
               <p className="text-text-light/50 dark:text-text-dark/50 font-medium">Curating your experience...</p>
             </div>
           )}
         </motion.div>
       </div>
     );
  }

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const trendingPosts = posts.slice(0, 5);
  const feedPosts = filteredPosts.slice(5, visibleCount + 5);

  const loadMore = () => setVisibleCount(prev => prev + 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-background-light dark:bg-background-dark min-h-screen transition-colors duration-700 pb-32"
    >
      {/* Dynamic Hero Section - Continuous Flow */}
      <section className="relative pt-20 pb-16">
        <Container>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Badge variant="outline" className="mb-4 border-primary-dark/20 text-primary-dark font-semibold px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
              Editor's Selection
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-light dark:text-text-dark">
              Trending <span className="text-primary-dark/80">Stories</span>
            </h2>
          </motion.div>
          
          <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
            {trendingPosts.map((post, idx) => (
              <motion.div 
                key={post.$id} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="min-w-[85vw] md:min-w-[420px] snap-center py-2"
              >
                <PostCard {...post} userId={post.userId} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Feed - Professional spacing and continuous transitions */}
      <section className="pt-8">
        <Container>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
              <div>
                <h3 className="text-3xl font-display font-bold text-text-light dark:text-text-dark mb-2">Latest Insights</h3>
                <div className="w-12 h-1 bg-primary-dark/30 rounded-full" />
              </div>
              
              <div className="flex items-center gap-4 w-full lg:w-auto">
                  <div className="relative w-full sm:w-80 group">
                      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40 dark:text-text-dark/40 group-focus-within:text-primary-dark transition-colors" />
                      <Input 
                          placeholder="Search for articles..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-12 h-12 bg-white/50 dark:bg-surface-dark/40 border-gray-100 dark:border-white/5 rounded-2xl focus:ring-primary-dark/20 focus:border-primary-dark/40 transition-all text-base"
                      />
                  </div>
              </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto hide-scrollbar pb-2">
              {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeCategory === cat 
                      ? 'bg-primary-dark text-white shadow-[0_10px_25px_rgba(99,102,241,0.2)]' 
                      : 'bg-white/50 dark:bg-surface-dark/40 text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark border border-gray-100/50 dark:border-white/5'
                    }`}
                  >
                      {cat}
                  </button>
              ))}
          </div>

          <AnimatePresence mode='popLayout'>
            {feedPosts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-32 rounded-[32px] border border-dashed border-gray-200 dark:border-white/5 bg-gray-50/30 dark:bg-surface-dark/10"
              >
                 <p className="text-xl text-text-light/40 dark:text-text-dark/40">No stories found. Try a different search.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {feedPosts.map((post, idx) => (
                  <motion.div 
                    layout
                    key={post.$id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                  >
                    <PostCard {...post} userId={post.userId} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
          
          {filteredPosts.length > visibleCount + 5 && (
            <div className="w-full flex justify-center mt-24">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={loadMore}
                className="px-10 py-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 text-text-light dark:text-text-dark font-bold hover:shadow-xl transition-all duration-300"
              >
                Discover More
              </motion.button>
            </div>
          )}
        </Container>
      </section>
    </motion.div>
  );
}

export default Home;
