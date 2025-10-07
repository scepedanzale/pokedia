

const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000; // 15 giorni in ms

// salva in localstorage
export const saveWithExpiry = (key, data, ttl = FIFTEEN_DAYS_MS) => {
    const now = Date.now();
    const item = {
        data,
        expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

// prende valore da local storage
export const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.data;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};