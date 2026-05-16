import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BackgroundMusic from '../components/common/BackgroundMusic';
import MouseTracker from '../components/common/MouseTracker';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-main selection:bg-primary-container/30 cursor-none">
      <MouseTracker />
      <Navbar />
      <main className="flex-1 pt-16 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BackgroundMusic />
    </div>
  );
};

export default MainLayout;
