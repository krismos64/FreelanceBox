import { useEffect } from 'react';
import { Howl } from 'howler';
const startupSound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-interface-click-1126.mp3'],
    volume: 0.3,
    preload: true,
    html5: true
});
const navigationSound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3124.mp3'],
    volume: 0.2,
    preload: true,
    html5: true
});
export const playStartupSound = () => {
    startupSound.play();
};
export const playNavigationSound = () => {
    navigationSound.play();
};
export const useNavigationSound = () => {
    useEffect(() => {
        const handleClick = (e) => {
            const target = e.target;
            if (target.closest('a') || target.closest('button')) {
                playNavigationSound();
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);
};
