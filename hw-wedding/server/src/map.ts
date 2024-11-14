export interface mutableMap<v> {
    /**
     *  Check if there is some value associated with a given key in the map and return a boolean.
     * @param y determines a given key in the map and return a boolean.
     * @returns contains-key(y, obj)
     */
    hasKey: (y: string) => boolean;

    /**
     * gets all the keys
     * @returns get-keys(obj)
     */
    returnKeys: () => Array<string>

    /**
     * gets all the values
     * @returns all values of obj
     */
    returnValues: () => Array<v>


    /**
     * Get the value associated with a given key if such a pair exists in the map
     * @param z is the key
     * @returns get-value(z, obj)
     * @throws error when !contains-key(z, obj)
     */
    getValue: (z: string) => v;


    /**
     * Set a value for a given key in the map, replacing the current value if a pair with the
     * given key already exists
     * @param key to add
     * @param value to add
     * @returns : contains-key(key, obj_0)
     * @modifies obj
     * @effect if returns true, the value is replaced, otherwise a new pair is added
     */
    setValue: (key: string, value: v) => boolean


    /**
     * Clear all pairs from the map.
     * @modifies obj
     * @effect empty
     */
    clearPairs: () => void
}

class mutateMap<a> implements mutableMap<a> {
    // AF: obj = this.associate
    map: Map<string, a>

    constructor() {
        this.map = new Map;
    }
    hasKey = (y: string): boolean => { return this.map.has(y) }
    getValue = (z: string): a => {
        const valueGet: a | undefined = this.map.get(z)
        if (valueGet === undefined) {
            throw new Error("this doesn't exist")
        }
        return valueGet;
    }
    setValue = (key: string, value: a): boolean => {
        const store: boolean = this.hasKey(key)
        this.map = this.map.set(key, value)
        return store
    }
    clearPairs = (): void => { this.map = new Map };
    returnKeys = (): Array<string> => {
        return Array.from(this.map.keys());
    }
    returnValues = (): a[] => { return Array.from(this.map.values()) };
}
/**
 * @returns an empty mutateMap
 */
export const factoryFunction = <a>(): mutateMap<a> => {
    return new mutateMap();
}