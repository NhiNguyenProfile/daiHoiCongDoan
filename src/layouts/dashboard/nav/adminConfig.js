// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const token = localStorage.getItem("Token");
let navConfigAdmin = [
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
        title: 'Đăng xuất',
        path: '/',
        icon: icon('ic_vote'),
      },
    ];
  



export default navConfigAdmin;
