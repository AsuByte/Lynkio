"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { motion } from "framer-motion";
import { sunIcon, moonIcon } from "@/app/icons/IconsPage";
import { useI18n } from "../hooks/useI18n";

const DarkMode = () => {
  const { dark, change } = useTheme();
  const { translate } = useI18n();

  return (
    <button
      onClick={change}
      aria-label={translate("DarkMode.ariaTheme")}
      className="p-2 cursor-pointer"
      title={dark ? translate("DarkMode.light") : translate("DarkMode.dark")}
    >
      <div className="relative w-6 h-6">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: dark ? 1 : 0,
            rotate: dark ? 0 : 90,
            scale: dark ? 1 : 0.8,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {moonIcon}
        </motion.div>

        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: dark ? 0 : 1,
            rotate: dark ? -90 : 0,
            scale: dark ? 0.8 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {sunIcon}
        </motion.div>
      </div>
    </button>
  );
};

export default DarkMode;
