// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Quản lí đại hội',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Danh sách đại biểu',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Quản lí biểu quyết',
    path: '/dashboard/voteControl',
    icon: icon('ic_chart'),
  },
  {
    title: 'Báo cáo điểm danh',
    path: '/dashboard/checkIn',
    icon: icon('ic_checkIn'),
  },
  {
    title: 'Sơ đồ chỗ ngồi',
    path: '/dashboard/map',
    icon: icon('ic_map'),
  },
  {
    title: 'Thư gửi đại hội',
    path: '/dashboard/mail',
    icon: icon('ic_mail'),
  },
  {
    title: 'Góp ý văn kiện',
    path: '/dashboard/giveIdea',
    icon: icon('ic_talk'),
  },
  {
    title: 'Biểu quyết',
    path: '/dashboard/vote',
    icon: icon('ic_vote'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
