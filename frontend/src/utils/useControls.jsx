import { useEffect, useRef } from 'react';

function useKeyPress(target, event) {
    useEffect(() => {
        const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true);
        const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false);
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [target, event]);
}

const positions = [
    [0.5, 0, 0.5],
    [0.7, 0, 0.6],
    [0.9, 0, 1]
];

export default function useControls() {
    const keys = useRef({
        forward: false,
        backward: false,
        left: false,
        right: false,
        brake: false,
        reset: false,
        next: false,
        prev: false,
        currentPosition: 0, // Track current position index
        nPressed: false, // Track if 'n' is pressed
        pPressed: false  // Track if 'p' is pressed
    });

    useKeyPress(['ArrowUp', 'w'], (pressed) => (keys.current.forward = pressed));
    useKeyPress(['ArrowDown', 's'], (pressed) => (keys.current.backward = pressed));
    useKeyPress(['ArrowLeft', 'a'], (pressed) => (keys.current.left = pressed));
    useKeyPress(['ArrowRight', 'd'], (pressed) => (keys.current.right = pressed));
    useKeyPress(['n'], (pressed) => {
        if (pressed && !keys.current.nPressed) {
            keys.current.currentPosition = (keys.current.currentPosition + 1) % positions.length;
            keys.current.nPressed = true;
        } else if (!pressed) {
            keys.current.nPressed = false;
        }
        keys.current.next = pressed;
    });
    
    useKeyPress(['p'], (pressed) => {
        if (pressed && !keys.current.pPressed) {
            keys.current.currentPosition = (keys.current.currentPosition - 1 + positions.length) % positions.length;
            keys.current.pPressed = true;
        } else if (!pressed) {
            keys.current.pPressed = false;
        }
        keys.current.prev = pressed;
    });
    useKeyPress([' '], (pressed) => (keys.current.brake = pressed));
    useKeyPress(['r'], (pressed) => (keys.current.reset = pressed));

    return keys;
}