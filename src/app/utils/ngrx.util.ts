// add middleware to ngrx reducer so all the data is saved in localstorage
export function localStorageMiddleware(
    storageKey: string,
    reducer: (state: any, action: any) => any,
    // classes are not saved in local storage, so if a property is an instance of class
    // you will need to instance it again, for example Date instances
    localParser?: (state: any) => any
): any {
    const stored = JSON.parse(localStorage.getItem(storageKey)) || undefined;
    const parsedStored = stored && localParser ? localParser(stored) : stored;

    return function(
        state = parsedStored,
        action: any
    ): any {
        const newState = reducer(state, action);
        localStorage.setItem(storageKey, JSON.stringify(newState));
        return newState;
    }
}
