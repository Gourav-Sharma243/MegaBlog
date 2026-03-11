function Footer() {
  return (
    <footer className="bg-charcoal dark:bg-dark-surface text-white dark:text-dark-text py-12 border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-bold text-white mb-4">MegaBlog</h3>
            <p className="text-white/70 dark:text-dark-text/70 mb-4 max-w-md font-light leading-relaxed">
              Share your thoughts, stories, and ideas with the world. Create beautiful blog posts with our powerful editor.
            </p>
          </div>
          
        <div className="border-t border-white/10 dark:border-white/5 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 dark:text-dark-text/50 text-sm">
              &copy; 2025 MegaBlog. All rights reserved.
            </p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer