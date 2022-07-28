export interface PageListProp {
  name: string;
  href: string;
}

export const pageList: PageListProp[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Technology', href: '/tech' },
  { name: 'Login', href: '/login' },
  { name: 'Account', href: '/account' },
];
