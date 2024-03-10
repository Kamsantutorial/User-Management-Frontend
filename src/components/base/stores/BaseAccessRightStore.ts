import { defineStore } from 'pinia'
import type { Menu } from '../models/BaseModel'
import router from '@/router'
import { baseAuthStore } from './BaseAuthStore'
import _ from 'lodash';

/* *
 * base access right store using every component 
 * by hasAccess('EXAMPLE_PERMISSION') to access right of user
 * */
export const accessRightStore = defineStore('baseAccessRightStore', () => {
  function hasAccess(action: string): boolean | undefined {
    const { getUserMenuSession } = baseAuthStore();
    const res = isCanAccess(getUserMenuSession(), action);
    console.log("hasAccess", res);
    return res;
  }

  function isCanAccess(menus: Menu[], action: string): boolean | undefined {
    for (const menu of menus) {
      if (menu.path === router.currentRoute.value.path) {
        return !!_.find(menu.permissions, { permission_name: action });
      }
      if (menu.children) {
        if (isCanAccess(menu.children, action)) {
          return true;
        }
      }
    }
  }

  function isCanAccessMenu(menu: Menu, action: string): boolean {
    return !!_.find(menu.permissions, { permission_name: action });
  }

  return {
    hasAccess,
    isCanAccessMenu
  };
});