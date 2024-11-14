"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearMap = exports.getValues = exports.names = exports.load = exports.save = void 0;
const map_1 = require("./map");
const weddingGuests = (0, map_1.factoryFunction)();
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
/** Handles request for /save by storing the given weddingGuests. */
const save = (req, res) => {
    const name = req.body.name;
    if (name === undefined || typeof name !== 'string') {
        res.status(400).send('Error: Required argument "name" is missing');
        return;
    }
    const value = req.body.content;
    if (value === undefined) {
        res.status(400).send('Error: Required argument "content" is missing');
        return;
    }
    weddingGuests.setValue(name, value);
    res.send({ saved: true });
};
exports.save = save;
/** Handles request for /load by returning the weddingGuests requested. */
const load = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined || typeof name !== 'string') {
        res.status(400).send('Error: Required argument "name" is missing');
        return;
    }
    if (!weddingGuests.hasKey(name)) {
        res.status(404).send('Error: There is no weddingGuests previously saved with that name');
        return;
    }
    res.send({ name: name, content: weddingGuests.getValue(name) });
};
exports.load = load;
/** Handles request for /names by returning the list of weddingGuests names */
const names = (_req, res) => {
    res.send({ names: weddingGuests.returnKeys() });
};
exports.names = names;
/** Handles request for /getValues by returning the list of weddingGuests information */
const getValues = (_req, res) => {
    res.send({ getValues: weddingGuests.returnValues() });
};
exports.getValues = getValues;
/**
 * Clears weddingGuests for testing purposes
 */
const clearMap = () => {
    weddingGuests.clearPairs();
};
exports.clearMap = clearMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrQkFBb0Q7QUFPcEQsTUFBTSxhQUFhLEdBQXdCLElBQUEscUJBQWUsR0FBRSxDQUFDO0FBRTdELHdFQUF3RTtBQUN4RSw0RUFBNEU7QUFDNUUsbURBQW1EO0FBQ25ELE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBYyxFQUFzQixFQUFFO0lBQ25ELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QjtTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7U0FBTTtRQUNMLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsb0VBQW9FO0FBQzdELE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDaEUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDM0IsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBQ25FLE9BQU87S0FDUjtJQUNELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQy9CLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQ3RFLE9BQU87S0FDUjtJQUNELGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRW5DLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUE7QUFkWSxRQUFBLElBQUksUUFjaEI7QUFFRCwwRUFBMEU7QUFDbkUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUVoRSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDbkUsT0FBTztLQUNSO0lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsa0VBQWtFLENBQUMsQ0FBQztRQUN6RixPQUFPO0tBQ1I7SUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEUsQ0FBQyxDQUFBO0FBWlksUUFBQSxJQUFJLFFBWWhCO0FBQ0QsOEVBQThFO0FBQ3ZFLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBaUIsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDbEUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ2pELENBQUMsQ0FBQTtBQUZZLFFBQUEsS0FBSyxTQUVqQjtBQUVELHdGQUF3RjtBQUNqRixNQUFNLFNBQVMsR0FBRyxDQUFDLElBQWlCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ3RFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUN2RCxDQUFDLENBQUE7QUFGWSxRQUFBLFNBQVMsYUFFckI7QUFFRDs7R0FFRztBQUNJLE1BQU0sUUFBUSxHQUFHLEdBQVMsRUFBRTtJQUNqQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDN0IsQ0FBQyxDQUFBO0FBRlksUUFBQSxRQUFRLFlBRXBCIn0=