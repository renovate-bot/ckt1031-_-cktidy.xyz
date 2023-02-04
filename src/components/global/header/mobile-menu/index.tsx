import { MdClose, MdMenu } from 'react-icons/md';

import { useMenusStore } from '$stores/menus';

import MenuNavigationList from './list';

export default function NavigationBarMobileMenu() {
  const { isNavigationMenuOpen, setIsNavigationMenuOpen } = useMenusStore();

  const toggleMenu = () => {
    document.body.style.overflow = isNavigationMenuOpen ? 'hidden' : 'auto';
    setIsNavigationMenuOpen(!isNavigationMenuOpen);
  };

  return (
    <div className="md:hidden">
      <button
        id="mobile-nav-menu"
        aria-label="Mobile Menu"
        type="button"
        className="flex items-center"
        onClick={toggleMenu}
      >
        {isNavigationMenuOpen ? <MdClose /> : <MdMenu />}
      </button>
      <MenuNavigationList showMenu={isNavigationMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
}
