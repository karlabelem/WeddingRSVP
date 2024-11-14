import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { mutableMap, factoryFunction } from "./map";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

const weddingGuests: mutableMap<unknown> = factoryFunction();

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string | undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

/** Handles request for /save by storing the given weddingGuests. */
export const save = (req: SafeRequest, res: SafeResponse): void => {
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
  weddingGuests.setValue(name, value)

  res.send({ saved: true });
}

/** Handles request for /load by returning the weddingGuests requested. */
export const load = (req: SafeRequest, res: SafeResponse): void => {

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
}
/** Handles request for /names by returning the list of weddingGuests names */
export const names = (_req: SafeRequest, res: SafeResponse): void => {
  res.send({ names: weddingGuests.returnKeys() })
}

/** Handles request for /getValues by returning the list of weddingGuests information */
export const getValues = (_req: SafeRequest, res: SafeResponse): void => {
  res.send({ getValues: weddingGuests.returnValues() })
}

/**
 * Clears weddingGuests for testing purposes
 */
export const clearMap = (): void => {
  weddingGuests.clearPairs();
}