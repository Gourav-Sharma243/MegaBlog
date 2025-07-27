import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-8 bg-gray-100 border-t-2 border-black dark:bg-gray-900">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex items-center justify-between flex-wrap w-full">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Logo width="100px" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">
              &copy; Copyright 2023. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
