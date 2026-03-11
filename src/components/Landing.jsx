import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Edit3, Image as ImageIcon, ShieldCheck, Zap, Globe, Infinity as InfinityIcon } from 'lucide-react';
import { Container } from './index';

const Landing = () => {
    const authStatus = useSelector((state) => state.auth.status);

    const features = [
        {
            title: "Rich Text Editor",
            description: "Craft your stories with our refined, distraction-free editor designed for fluid expression.",
            icon: <Edit3 className="w-6 h-6 text-primary-dark" />,
            delay: 0.1
        },
        {
            title: "Image Management",
            description: "Seamlessly upload and organize high-resolution featured images with secure cloud storage.",
            icon: <ImageIcon className="w-6 h-6 text-primary-dark" />,
            delay: 0.2
        },
        {
            title: "Secure Authentication",
            description: "State-of-the-art security powered by Appwrite, keeping your creative space protected.",
            icon: <ShieldCheck className="w-6 h-6 text-primary-dark" />,
            delay: 0.3
        }
    ];

    const stats = [
        { label: "Unlimited Posts", icon: <InfinityIcon className="w-8 h-8" /> },
        { label: "Lightning Fast", icon: <Zap className="w-8 h-8" /> },
        { label: "Fully Responsive", icon: <Globe className="w-8 h-8" /> }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark transition-colors duration-700">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-dark/5 via-transparent to-transparent pointer-events-none" />
                
                <Container>
                    <div className="text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-display font-extrabold text-text-light dark:text-text-dark mb-8 tracking-tighter leading-tight">
                                Modern Space for <br />
                                <span className="text-primary-dark underline decoration-primary-dark/20 underline-offset-8">Modern Creators.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-text-light/60 dark:text-text-dark/60 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                                MegaBlog is a refined platform where minimalism meets power. Share your perspective in an environment built for clarity and impact.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                {authStatus ? (
                                    <>
                                        <Link to="/all-posts" className="px-10 py-5 bg-primary-dark text-white rounded-2xl font-bold shadow-soft-dark hover:shadow-primary-dark/20 transition-all duration-300 hover:-translate-y-1">
                                            Explore Articles
                                        </Link>
                                        <Link to="/add-post" className="px-10 py-5 bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border border-gray-100 dark:border-white/5 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                            Create New Story
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/signup" className="px-10 py-5 bg-primary-dark text-white rounded-2xl font-bold shadow-soft-dark hover:shadow-primary-dark/20 transition-all duration-300 hover:-translate-y-1">
                                            Start Writing Free
                                        </Link>
                                        <Link to="/login" className="px-10 py-5 bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border border-gray-100 dark:border-white/5 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50/50 dark:bg-surface-dark/20 transition-colors">
                <Container>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-text-light dark:text-text-dark mb-6">
                            Crafted for Excellence
                        </h2>
                        <div className="w-20 h-1.5 bg-primary-dark/30 rounded-full mx-auto" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: feature.delay }}
                                className="p-10 rounded-[32px] bg-white dark:bg-surface-dark/40 border border-gray-100 dark:border-white/5 hover:shadow-soft-lg dark:hover:shadow-2xl transition-all duration-500 group"
                            >
                                <div className="w-14 h-14 bg-primary-dark/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-dark/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">{feature.title}</h3>
                                <p className="text-text-light/60 dark:text-text-dark/60 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Stats / Callout Section */}
            <section className="py-24">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-8 cursor-default"
                            >
                                <div className="text-primary-dark mb-6 flex justify-center opacity-80">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl font-display font-bold text-text-light dark:text-text-dark">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Landing;