"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factoryFunction = void 0;
class mutateMap {
    constructor() {
        this.hasKey = (y) => { return this.map.has(y); };
        this.getValue = (z) => {
            const valueGet = this.map.get(z);
            if (valueGet === undefined) {
                throw new Error("this doesn't exist");
            }
            return valueGet;
        };
        this.setValue = (key, value) => {
            const store = this.hasKey(key);
            this.map = this.map.set(key, value);
            return store;
        };
        this.clearPairs = () => { this.map = new Map; };
        this.returnKeys = () => {
            return Array.from(this.map.keys());
        };
        this.returnValues = () => { return Array.from(this.map.values()); };
        this.map = new Map;
    }
}
/**
 * @returns an empty mutateMap
 */
const factoryFunction = () => {
    return new mutateMap();
};
exports.factoryFunction = factoryFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFrREEsTUFBTSxTQUFTO0lBSVg7UUFHQSxXQUFNLEdBQUcsQ0FBQyxDQUFTLEVBQVcsRUFBRSxHQUFHLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7UUFDM0QsYUFBUSxHQUFHLENBQUMsQ0FBUyxFQUFLLEVBQUU7WUFDeEIsTUFBTSxRQUFRLEdBQWtCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQy9DLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO2FBQ3hDO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFBO1FBQ0QsYUFBUSxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVEsRUFBVyxFQUFFO1lBQzFDLE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDbkMsT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQyxDQUFBO1FBQ0QsZUFBVSxHQUFHLEdBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDaEQsZUFBVSxHQUFHLEdBQWtCLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUE7UUFDRCxpQkFBWSxHQUFHLEdBQVEsRUFBRSxHQUFHLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFuQi9ELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDdkIsQ0FBQztDQW1CSjtBQUNEOztHQUVHO0FBQ0ksTUFBTSxlQUFlLEdBQUcsR0FBb0IsRUFBRTtJQUNqRCxPQUFPLElBQUksU0FBUyxFQUFFLENBQUM7QUFDM0IsQ0FBQyxDQUFBO0FBRlksUUFBQSxlQUFlLG1CQUUzQiJ9