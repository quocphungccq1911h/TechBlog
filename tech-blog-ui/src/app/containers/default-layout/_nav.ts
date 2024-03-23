import { INavData } from '@coreui/angular';
import {
  DashboardPermissions,
  PostCategoriePermissions,
  PostPermissions,
  SeriesPermissions,
  RolePermissions,
  UserPermissions,
} from 'src/app/shared/constants/permissions.constants';

export const navItems: INavData[] = [
  {
    name: 'Trang chủ',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
    attributes: {
      policyName: DashboardPermissions.VIEW,
    },
  },
  {
    name: 'Nội dung',
    url: '/content',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Danh mục',
        url: '/content/post-categories',
        attributes: {
          policyName: PostCategoriePermissions.VIEW,
        },
      },
      {
        name: 'Bài viết',
        url: '/content/posts',
        attributes: {
          policyName: PostPermissions.VIEW,
        },
      },
      {
        name: 'Loạt bài',
        url: '/content/series',
        attributes: {
          policyName: SeriesPermissions.VIEW,
        },
      },
      {
        name: 'Nhuận bút',
        url: '/content/royalty',
        attributes: {
          policyName: 'Permissions.Loyalty.View',
        },
      },
    ],
  },

  {
    name: 'Hệ thống',
    url: '/system',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Quyền',
        url: '/system/roles',
        attributes: {
          policyName: RolePermissions.VIEW,
        },
      },
      {
        name: 'Người dùng',
        url: '/system/users',
        attributes: {
          policyName: UserPermissions.VIEW,
        },
      },
    ],
  },
];
