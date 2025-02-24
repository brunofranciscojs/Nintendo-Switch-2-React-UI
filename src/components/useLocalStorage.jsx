import { useEffect, useState } from 'react';

export default function useLocalStorage(key) {
    const [value, setValue] = useState(localStorage.getItem(key));

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === key) {
                setValue(event.newValue);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return value;
}