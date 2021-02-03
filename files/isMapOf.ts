// eslint-disable-next-line @typescript-eslint/ban-types
export function isMapOf<X extends {}, Y>(obj: X, typeGuard: (value: unknown) => value is Y): obj is X & Record<string, Y> {
    for (const key in obj) {
        if (!typeGuard(obj[key])) return false;
    }
    return true;
}
