// Fichier généré par ia (claude)

function sanitizeString(value: string): string {
    return value.trim().replace(/[<>'"`;]/g, "");
}

function sanitizeValue(value: unknown): unknown {
    if (value === null || value === undefined) return value;
    if (typeof value === "string") return sanitizeString(value);
    if (value instanceof Date) return value;
    if (Array.isArray(value)) return value.map(sanitizeValue);
    if (typeof value === "object") return sanitizeObject(value);
    return value;
}

function sanitizeObject(data: object): object {
    if (data === null) return {};

    const result: Record<string, unknown> = {};

    let allKeys: string[] = [];

    try {
        const proto = Object.getPrototypeOf(data);
        const protoKeys = proto
            ? Object.getOwnPropertyNames(proto).filter((key) => {
                if (key === "constructor") return false;
                const descriptor = Object.getOwnPropertyDescriptor(proto, key);
                return typeof descriptor?.get === "function";
            })
            : [];

        const ownKeys = Object.keys(data);
        allKeys = [...new Set([...ownKeys, ...protoKeys])];
    } catch (e) {
        console.warn("sanitizeObject: impossible de lire les clés", data, e);
        return data; // retourne l'objet tel quel si on ne peut pas l'inspecter
    }

    for (const key of allKeys) {
        try {
            const value = (data as Record<string, unknown>)[key];
            result[key] = sanitizeValue(value);
        } catch (e) {
            // getter qui plante (ex: getter natif non accessible)
            console.warn(`sanitizeObject: erreur sur la clé "${key}"`, e);
            result[key] = (data as Record<string, unknown>)[key];
        }
    }

    return result;
}


export function sanitize<T>(data: T): T {
    if (data === null || data === undefined) return data; // 👈
    if (Array.isArray(data)) return data.map(sanitizeValue) as T;
    if (data instanceof Date) return data;
    if (typeof data === "object") return sanitizeObject(data) as T;
    return sanitizeValue(data) as T;
}