import { create } from 'zustand';

interface MenuStore {
  isNavigationMenuOpen: boolean;
  setIsNavigationMenuOpen: (isOpen: boolean) => void;
}

export const useMenusStore = create<MenuStore>(set => ({
  isNavigationMenuOpen: false,
  setIsNavigationMenuOpen: isOpen => set({ isNavigationMenuOpen: isOpen }),
}));
