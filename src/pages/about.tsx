import { NextSeo } from 'next-seo';
import { BsDiscord, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

import Link from '$components/link';
import { config } from '$lib/constants';

export default function AboutPage() {
    const title = 'About Me';
    const description =
        'Hello, I am Chan Ka Tsun who is a energetic boy living in Hong Kong, I love programming and reading!';

    return (
        <>
            <NextSeo title={title} description={description} openGraph={{ title, description }} />
            <div className="flex flex-col items-center">
                <h1 className="mb-5 text-3xl font-bold">About Me</h1>
                <div className="mb-10 max-w-2xl space-y-10 text-left">
                    <div className="mb-7">
                        <h2 className="base-border mb-4 border-b text-2xl" id="social-media">
                            🐋Social Media
                        </h2>
                        <div className="space-y-2 text-gray-600 dark:text-gray-400">
                            <div className="flex flex-row items-center justify-between space-x-20">
                                <div className="flex flex-row items-center space-x-1">
                                    <BsInstagram />
                                    <p>Instagram:</p>
                                </div>
                                <Link enableExternalIcon href={config.author.social.instagram}>
                                    @cktidy.1031
                                </Link>
                            </div>
                            <div className="flex flex-row items-center justify-between space-x-20">
                                <div className="flex flex-row items-center space-x-1">
                                    <BsDiscord />
                                    <p>Discord:</p>
                                </div>
                                <Link enableExternalIcon href={config.author.social.discordServer}>
                                    wHVPbYHG
                                </Link>
                            </div>
                            <div className="flex flex-row items-center justify-between space-x-20">
                                <div className="flex flex-row items-center space-x-1">
                                    <BsTwitter />
                                    <p>Twitter:</p>
                                </div>
                                <Link enableExternalIcon href={config.author.social.twitter}>
                                    @cktsun1031
                                </Link>
                            </div>
                            <div className="flex flex-row items-center justify-between space-x-20">
                                <div className="flex flex-row items-center space-x-1">
                                    <BsGithub />
                                    <p>Github:</p>
                                </div>
                                <Link enableExternalIcon href={config.author.social.github}>
                                    @cktsun1031
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="base-border mb-4 border-b text-2xl">🦣Value of LIFE</h2>
                        <div className="space-y-2 text-xl text-gray-600 dark:text-gray-400">
                            <p>三萬六千日 夜夜當秉燭</p>
                            <p>
                                Our life is so short. Seize the day you can play! Enjoy chasing your
                                DREAM!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
