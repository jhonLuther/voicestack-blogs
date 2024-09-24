import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

function ShareableLinks({ props }) {
    const { asPath: route } = useRouter();
    const encodedUrl = encodeURIComponent(`https://carestack.com${route}`);

    return (
        <div>
            <div className='flex justify-between items-center align-center'>
                <span className='uppercase text-base font-extrabold '>Share This </span>
                <div className='flex gap-1'>
                    <div className='cursor-pointer hover:bg-gray-200 rounded-md p-1 transition duration-200 ease-in-out'>
                        <Link
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                            target="_blank"
                            rel=" noreferrer"
                            title="linkedin"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 25 24" fill="none">
                                <rect x="0.666992" width="24" height="24" rx="3.33333" fill="#C1C1C1" />
                                <path d="M17.3333 15.9996V12.6471C17.3333 10.851 16.3465 10.0152 15.0301 10.0152C13.9679 10.0152 13.4921 10.5827 13.2273 10.981V10.1523H11.2266C11.253 10.7013 11.2266 15.9996 11.2266 15.9996H13.2273V12.734C13.2273 12.5597 13.2402 12.3849 13.2931 12.2604C13.4376 11.9113 13.7666 11.5497 14.3193 11.5497C15.0436 11.5497 15.3332 12.0855 15.3332 12.8716V16.0002L17.3333 15.9996ZM9.11845 9.35417C9.81572 9.35417 10.2504 8.90459 10.2504 8.34356C10.2375 7.76997 9.81572 7.3335 9.13138 7.3335C8.44704 7.3335 8 7.76997 8 8.34356C8 8.90513 8.43411 9.35417 9.10608 9.35417H9.11845ZM10.1188 15.9996V10.1523H8.11865V15.9996H10.1188Z" fill="white" />
                            </svg>
                        </Link>
                    </div>
                    <div className='cursor-pointer hover:bg-gray-200 rounded-md p-1 transition duration-200 ease-in-out'>
                        <Link
                            href={`https://www.facebook.com/sharer.php?u=${encodedUrl}`}
                            target="_blank"
                            rel=" noreferrer"
                            title="facebook"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"  width="36" height="36" viewBox="0 0 25 24" fill="none">
                                <g clip-path="url(#clip0_7518_2445)">
                                    <rect x="0.333984" width="24" height="24" rx="3.33333" fill="#C1C1C1" />
                                    <path d="M11.2192 17.3335H12.9931V12.3329H14.1763L14.333 10.6099H12.9931L12.995 9.74729C12.995 9.298 13.0317 9.05707 13.5852 9.05707H14.3248V7.3335H13.1411C11.7192 7.3335 11.2192 8.16973 11.2192 9.57544V10.6099H10.333V12.3335H11.2192V17.3335Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_7518_2445">
                                        <rect x="0.333984" width="24" height="24" rx="3.33333" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                    </div>
                    <div className='cursor-pointer hover:bg-gray-200 rounded-md p-1 transition duration-200 ease-in-out'>
                        <Link
                            href={`https://twitter.com/share?text=${encodeURIComponent(props)}&url=${encodedUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            title="twitter"
                        >
                            <svg  width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_7518_2448)">
                                    <rect width="24" height="24" rx="3.33333" fill="#C1C1C1" />
                                    <g clip-path="url(#clip1_7518_2448)">
                                        <path d="M14.4587 8.07373H15.7706L12.9045 11.3495L16.2763 15.8072H13.6362L11.5684 13.1036L9.20235 15.8072H7.88965L10.9553 12.3033L7.7207 8.07373H10.4278L12.2969 10.5449L14.4587 8.07373ZM13.9983 15.0219H14.7252L10.0328 8.81773H9.25272L13.9983 15.0219Z" fill="white" />
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="clip0_7518_2448">
                                        <rect width="24" height="24" rx="3.33333" fill="white" />
                                    </clipPath>
                                    <clipPath id="clip1_7518_2448">
                                        <rect width="9.33333" height="9.33333" fill="white" transform="translate(7.33203 7.3335)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareableLinks