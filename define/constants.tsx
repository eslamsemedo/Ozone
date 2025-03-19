import { Icon } from '@iconify/react';

import { SideNavItem } from '@/define/types';
import { BoxSelect, Calendar, Dumbbell, FolderArchiveIcon, HelpCircle, HomeIcon, MailIcon, Paperclip } from 'lucide-react';
import { Settings } from 'lucide-react';
import { IoFitness } from 'react-icons/io5';
import { BsTools } from 'react-icons/bs';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon width="22px" height="22px" />,
  },
  {
    title: 'Workouts',
    path: '/workouts',
    icon: <IoFitness style={{ width: "22px", height: "22px" }} />,
    submenu: true,
    subMenuItems: [
      { title: 'My Workouts', path: '/projects' },
      { title: 'Workouts', path: '/projects/web-design' },
      { title: 'AI Generator', path: '/projects/graphic-design' },
    ],
  },
  {
    title: 'Routines',
    path: '/routines',
    icon: <Calendar width="22px" height="22px" />,
  },

  {
    title: 'Tools',
    path: '/toolss',
    icon: <BsTools style={{ width: "22px", height: "22px" }} />,
    submenu: true,
    subMenuItems: [
      { title: 'Calorie calculator', path: '/settings/account' },
      { title: 'macro calculator', path: '/settings/privacy' },
      { title: 'One Rep Max Calculator', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Articles',
    path: '/articles',
    icon: <Paperclip width="22px" height="22px" />,
  },
  {
    title: 'Directory',
    path: '/directory',
    icon: <Dumbbell width="22px" height="22px" />,
  },
  {
    title: 'reyad',
    path: '/reyad',
    icon: <Dumbbell width="22px" height="22px" />,
  },
];
