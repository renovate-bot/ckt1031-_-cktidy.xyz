import Link from 'next/link';
import { NextSeo } from 'next-seo';

export default function NotFoundPage() {
    return (
        <>
            <NextSeo nofollow noindex title="404" />
            <div className="flex flex-col items-center justify-center">
                <div className="xs:mt-40 flex flex-col items-center justify-center md:flex-row">
                    <div className="flex flex-col text-center">
                        <div className="mb-4 text-6xl">
                            <p>404</p>
                        </div>
                        <p className="text-xl md:text-2xl">Did you get lost?</p>
                        <div className="mt-4 text-red-500">
                            <p>URL requested cannot be found!</p>
                        </div>
                    </div>
                </div>
                <Link passHref href="/">
                    <button className="button-normal mt-6" type="button">
                        Return to home
                    </button>
                </Link>
            </div>
        </>
    );
}
