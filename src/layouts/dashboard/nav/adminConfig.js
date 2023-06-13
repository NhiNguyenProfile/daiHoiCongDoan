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
        title: 'Tài liệu đại hội',
        path: "/dashboard/documents",
        icon: icon("ic_documents"),
      },
      {
        title: 'Hình ảnh và video',
        path: "/dashboard/imagesAndVideo",
        icon: icon('ic_image'),
      },
      {
        title: 'Đăng xuất',
        navigateInfo: "/login",
        icon: icon('ic_lock'),
      },
    ];
  



export default navConfigAdmin;
