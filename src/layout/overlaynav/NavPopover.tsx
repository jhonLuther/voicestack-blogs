import React, { useState, useEffect } from 'react';
import Wrapper from '../Wrapper';
import { useGlobalData } from '~/components/Context/GlobalDataContext';
import Link from 'next/link';
import { navigationLinks } from '../Header';
import { useRouter } from 'next/router';
import { CloseIcon } from '@sanity/icons';

interface NavProps {
  className?: string;
  showMenu?: boolean;
  onClose: () => void;
}

export const NavPopover = ({ className = '', showMenu, onClose }: NavProps) => {
  const { data } = useGlobalData();
  const [isVisible, setIsVisible] = useState(false);
  const [tagData, setTagData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (showMenu) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false); // Trigger the transition animation
    }
  }, [showMenu]);

  useEffect(() => {
    if (data) setTagData(data);
  }, [data]);

  // Close the menu after the animation ends
  const handleAnimationEnd = () => {
    if (!isVisible) {
      onClose(); // Trigger onClose only after the animation completes
    }
  };

  if (!showMenu && !isVisible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[19] transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsVisible(false)}
      />

      <div
        className={`fixed lg:absolute z-[20] w-full bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        } top-0 lg:top-[100%] left-0 lg:rounded-xl max-h-[90vh] lg:max-h-[80vh] overflow-y-auto`}
        style={{ transformOrigin: 'top' }}
        onTransitionEnd={handleAnimationEnd}
      >
        <Wrapper>
          <div className="w-full py-4">
            <nav className="flex flex-col lg:flex-row gap-4 p-4 bg-zinc-100 rounded-xl mb-4 mt-12 lg:mt-4">
              {navigationLinks?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors duration-200 font-medium"
                >
                  {link.icon && <link.icon />}
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => setIsVisible(false)}
                className="fixed lg:absolute top-[2.5rem] right-4 z-[21] p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                <CloseIcon className="w-6 h-6 text-gray-600" />
              </button>
            </nav>

            <div className="px-4 pb-4">
              <h3 className="text-zinc-400 font-medium text-sm uppercase mb-4">
                Browse By Key Topics
              </h3>
              <div className="grid lg:grid-cols-4 gap-4">
                {tagData?.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/browse/${tag?.slug?.current}`}
                    className="text-zinc-600 hover:text-zinc-900 transition-colors font-medium text-sm"
                  >
                    {tag?.tagName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};
