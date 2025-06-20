import { Icon } from '@iconify/react';

import { SideNavItem } from '@/define/types';
import { BoxSelect, Calendar, Dumbbell, FolderArchiveIcon, HelpCircle, HomeIcon, MailIcon, Paperclip, ListVideo, ShieldUser } from 'lucide-react';
import { Settings } from 'lucide-react';
import { IoFitness } from 'react-icons/io5';
import { BsTools } from 'react-icons/bs';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: 'home',
    icon: <HomeIcon width="22px" height="22px" />,
  },
  {
    title: 'Workouts',
    path: 'home/workouts/',
    icon: <IoFitness style={{ width: "22px", height: "22px" }} />,
    // submenu: true,
    // subMenuItems: [
    //   { title: 'My Workouts', path: 'home/workouts/my-workouts' },
    //   { title: 'Workouts', path: 'home/workouts/all-workouts' },
    //   { title: 'AI Generator', path: 'home/workouts/generator' },
    // ],
  },
  {
    title: 'Nutrition',
    path: 'home/nutrition',
    icon: <Calendar width="22px" height="22px" />,
  },

  {
    title: 'Tools',
    path: '',
    icon: <BsTools style={{ width: "22px", height: "22px" }} />,
    submenu: true,
    subMenuItems: [
      { title: 'Calorie calculator', path: 'home/tools/calorie-calculator' },
      { title: 'BMI', path: 'home/tools/BMI' },
      { title: 'Protien', path: 'home/tools/Protien' },
    ],
  },
  {
    title: 'Directory',
    path: 'home/directory',
    icon: <Dumbbell width="22px" height="22px" />,
  },
  {
    title: 'Video Tracking',
    path: 'http://localhost:5173/',
    icon: <ListVideo width="22px" height="22px" />,
  },
  {
    title: 'Community',
    path: 'community',
    icon: <MailIcon width="22px" height="22px" />,
  },
  {
    title: 'sensor detection',
    path: 'https://sensor-ozone-aswv.vercel.app/',
    icon: <Icon icon="mdi:bluetooth" width="22px" height="22px" />,
  },
  {
    title: 'private coaches',
    path: 'coaches',
    icon: <ShieldUser width="22px" height="22px" />,
  },

];
