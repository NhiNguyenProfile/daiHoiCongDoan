// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

let navConfig =[
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
      {
        title: 'Đăng xuất',
        navigateInfo: "/login",
        icon: icon('ic_lock'),
      },
    ];
  



export default navConfig;
