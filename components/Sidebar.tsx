"use client";
import {
  BarChart3,
  Boxes,
  ChevronLast,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Receipt,
  Settings,
  UserCircle,
  MoreVertical,
  ChevronFirst,
  ChevronDown,
} from "lucide-react";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import { SIDENAV_ITEMS } from "@/define/constants";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideNavItem } from "@/define/types";
import { Icon } from "@iconify/react";
import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

// Create SidebarContext to share the expanded state.
const SidebarContext = createContext({ expanded: true });

export default function Sidebar() {
  const { user } = useUser();
  const [expanded, setExpanded] = useState(true);

  // setExpanded(true);

  // useEffect(() => {
  //   const isSmallScreen = window.innerWidth <= 768;
  //   if (isSmallScreen) {
  //     setExpanded(false); // Collapse sidebar on small screens.
  //   }
  // }, []);

  // Memoize the context value to prevent unnecessary re-renders.
  const contextValue = useMemo(() => ({ expanded }), [expanded]);

  // useCallback to memoize the toggle handler.
  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <div className="hidden md:block z-20 row-start-2 col-start-1 col-span-1 h-full">
      <nav
        className={`
          rounded-3xl h-full flex flex-col bg-gradient-to-r from-[#20584d] to-[#1e90ff] border-r shadow-sm 
          transition-all duration-500 ease-in-out
        `}
      >
        {/* Header with Toggle Button */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            onClick={toggleExpanded}
            className="hidden md:block p-1.5 rounded-lg bg-transparent hover:bg-gray-100"
          >
            {expanded ? (
              <ChevronFirst className="text-gray-900" />
            ) : (
              <ChevronLast className="text-gray-900" />
            )}
          </button>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={contextValue}>
          <div className="flex-1 px-3">
            {SIDENAV_ITEMS.map((item, idx) =>
              item.submenu ? (
                <MemoizedMenuItemWithSubMenu
                  key={idx}
                  item={item}
                  toggleOpen={() => setExpanded(true)}
                />
              ) : (
                <Link key={idx} href={item.path}>
                  <MemoizedSidebarItem icon={item.icon} text={item.title} />
                </Link>
              )
            )}
          </div>
        </SidebarContext.Provider>

        {/* Footer */}
        <div className={`border-t flex p-3 items-center ${user || "hidden"}`}>
          <img
            src={user?.imageUrl}
            alt="profile picture"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all duration-500 ease-in-out 
              ${expanded ? "w-52 ml-3 opacity-100" : "w-0 opacity-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.fullName}</h4>
              <span className="text-xs text-gray-600">{user?.primaryEmailAddress?.toString() || ""}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </div>
  );
}

// SidebarItem component wrapped with React.memo to avoid unnecessary re-renders.
const SidebarItem = ({
  icon,
  text,
  active,
  alert,
}: {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <div
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-all duration-500 ease-in-out
        group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-900"
        }
      `}
    >
      {icon}
      <span
        className={`
          overflow-hidden transition-all duration-500 ease-in-out 
          ${expanded ? "w-52 ml-3 opacity-100" : "w-0 opacity-0"}
        `}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`
            absolute right-2 w-2 h-2 rounded bg-indigo-400 transition-all 
            duration-500 ease-in-out ${expanded ? "opacity-100" : "opacity-0"}
          `}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-0 translate-x-[-10px] transition-all 
            duration-500 ease-in-out
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </div>
  );
};

const MemoizedSidebarItem = memo(SidebarItem);

type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({ item, toggleOpen }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const { expanded } = useContext(SidebarContext);

  useEffect(() => {
    if (!expanded) {
      setSubMenuOpen(false);
    }
  }, [expanded]);

  // Memoize the click handler.
  const handleMenuClick = useCallback(() => {
    setSubMenuOpen((prev) => !prev);
    toggleOpen();
  }, [toggleOpen]);

  return (
    <>
      <MenuItem>
        <div
          className="flex flex-row justify-between w-full items-center"
          onClick={handleMenuClick}
        >
          <MemoizedSidebarItem icon={item?.icon} text={item.title} />
          <div className={`${subMenuOpen ? "rotate-180" : ""}`}>
            <ChevronDown className="text-gray-900" />
          </div>
        </div>
      </MenuItem>
      <div className={`mt-2 ml-[calc(var(--spacing)*9)] flex flex-col space-y-2 ${subMenuOpen ? "block" : "hidden"}`}>
        <AnimatePresence>
          {subMenuOpen && (
            <motion.div
              className="ml-2 flex flex-col space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.subMenuItems?.map((subItem, subIdx) => (
                <MenuItem key={subIdx}>
                  <Link
                    href={subItem.path}
                    onClick={toggleOpen}
                    className={`
                      ${subItem.path === pathname ? "font-bold" : ""}
                      relative flex items-center py-2 px-3 my-1
                      font-medium rounded-md cursor-pointer
                      transition-all duration-500 ease-in-out
                      group hover:bg-indigo-50 text-gray-900
                    `}
                  >
                    {subItem.title}
                  </Link>
                </MenuItem>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const MemoizedMenuItemWithSubMenu = memo(MenuItemWithSubMenu);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.div variants={MenuItemVariants} className={className}>
      {children}
    </motion.div>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

export { SidebarContext };