import { useEffect, useState } from 'react';

export const fadeIn = {
    opacity: 0,
    animation: "fadeIn 0.5s ease-in forwards"
};

export const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(5px) brightness(90%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

export function usePageAnimations() {
    const [animate, setAnimate] = useState({
        header: false,
        form: false,
        table: false,
        button: false
    });

    useEffect(() => {
        setTimeout(() => setAnimate((prev) => ({ ...prev, header: true })), 100);
        setTimeout(() => setAnimate((prev) => ({ ...prev, form: true })), 300);
        setTimeout(() => setAnimate((prev) => ({ ...prev, table: true })), 500);
        setTimeout(() => setAnimate((prev) => ({ ...prev, button: true })), 700);
    }, []);

    return animate;
}

export const animationStyles = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`; 