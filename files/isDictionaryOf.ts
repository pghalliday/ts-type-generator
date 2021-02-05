function isDictionaryOf<X extends {}, Y>(obj: X, typeGuard: (value: unknown) => value is Y): obj is X & { [key: string]: Y } {
    for (const key in obj) {
        if (!typeGuard(obj[key])) return false;
    }
    return true;
}
