import { Route } from 'nextjs-routes';

export interface PageListProp {
    name: string;
    href: Route['pathname'];
}

export const pageList: PageListProp[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Technology', href: '/technology' },
];
