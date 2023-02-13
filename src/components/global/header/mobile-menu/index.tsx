import { IconMenu2, IconX } from '@tabler/icons-react';

import { useMenusStore } from '$stores/menus';

import MenuNavigationList from './list';

export default function NavigationBarMobileMenu() {
  const { isNavigationMenuOpen, setIsNavigationMenuOpen } = useMenusStore();

  const toggleMenu = () => {
    document.body.style.overflow = isNavigationMenuOpen ? 'auto' : 'hidden';
    setIsNavigationMenuOpen(!isNavigationMenuOpen);
  };

  return (
    <div className="md:hidden">
      <button
        aria-label="Mobile Menu"
        type="button"
        className="flex items-center"
        onClick={toggleMenu}
      >
        {isNavigationMenuOpen ? <IconX /> : <IconMenu2 />}
      </button>
      <MenuNavigationList showMenu={isNavigationMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
}
