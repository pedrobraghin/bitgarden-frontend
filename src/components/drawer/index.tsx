import { AnimatePresence, motion } from "framer-motion";

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
}

export function Drawer({ children, open }: Readonly<DrawerProps>) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-max bg-gray-800 shadow-lg p-4 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: "100%",
              opacity: 0,
              transition: {
                type: "spring",
                damping: 30,
                stiffness: 200,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 200, // controla "rigidez"
              damping: 30, // controla "amortecimento"
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
