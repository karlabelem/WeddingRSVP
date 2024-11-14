import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { save, load, names, getValues, clearMap } from './routes';

// Testing the save route function with various branches
describe('routes', function () {
  const weddingGuest1: unknown = ['kevin', 'James', true, undefined, false, 'none', undefined];
  const weddingGuest2: unknown = ['wilcox', 'Molly', true, 'sam', true, 'none', 'many'];

  // First branch: missing required "name" argument (straight line code)
  it('save', function () {
    const request = httpMocks.createRequest(
      { method: 'POST', url: '/save', body: { name: 127, content: weddingGuest1 } });
    const response = httpMocks.createResponse();
    save(request, response);

    assert.deepStrictEqual(response._getStatusCode(), 400);
    assert.deepStrictEqual(response._getData(),
    'Error: Required argument "name" is missing');

    // Second branch: missing required "name" argument (straight line code)
    const requestOne = httpMocks.createRequest(
      { method: 'POST', url: '/save', body: { content: weddingGuest1 } });
    const responseOne = httpMocks.createResponse();
    save(requestOne, responseOne);

    assert.deepStrictEqual(responseOne._getStatusCode(), 400);
    assert.deepStrictEqual(responseOne._getData(),
    'Error: Required argument "name" is missing');

    // Third branch: missing required "content" argument (straight line code)
    const secondRequest = httpMocks.createRequest(
      { method: 'POST', url: '/save', body: { name: "kjhsbd" } });
    const secondResponse = httpMocks.createResponse();
    save(secondRequest, secondResponse);

    assert.deepStrictEqual(secondResponse._getStatusCode(), 400);
    assert.deepStrictEqual(secondResponse._getData(),
    'Error: Required argument "content" is missing');

    // Fourth branch: successful save
    const requestFive = httpMocks.createRequest({
      method: 'POST', url: '/save',
      body: { name: "iauwgdfc", content: weddingGuest1 }
    });
    const responseFive = httpMocks.createResponse();
    save(requestFive, responseFive);

    assert.deepStrictEqual(responseFive._getStatusCode(), 200);
    assert.deepStrictEqual(responseFive._getData(), { saved: true });

    const requestSix = httpMocks.createRequest({
      method: 'POST', url: '/save',
      body: { name: "uygweafh", content: weddingGuest2 }
    });
    const responseSix = httpMocks.createResponse();
    save(requestSix, responseSix);

    assert.deepStrictEqual(responseSix._getStatusCode(), 200);
    assert.deepStrictEqual(responseSix._getData(), { saved: true });

    // Clearing all saved transcripts to avoid interference with future tests
    clearMap();
  });

  // Testing the load route function with various branches
  it('load', function () {

    // First branch: missing required "name" argument (straight line code)
    const request = httpMocks.createRequest(
      { method: 'GET', url: '/load', query: { name: 78 } });
    const response = httpMocks.createResponse();
    load(request, response);

    assert.deepStrictEqual(response._getStatusCode(), 400);
    assert.deepStrictEqual(response._getData(),
    'Error: Required argument "name" is missing');

    const requestOne = httpMocks.createRequest(
      { method: 'GET', url: '/load', query: {} });
    const responseOne = httpMocks.createResponse();
    load(requestOne, responseOne);

    assert.deepStrictEqual(responseOne._getStatusCode(), 400);
    assert.deepStrictEqual(responseOne._getData(),
    'Error: Required argument "name" is missing');

    // Second branch: trying to load non-existing data (straight line code)
    const secondRequest = httpMocks.createRequest(
      { method: 'GET', url: '/load', query: { name: 'ououg' } });
    const secondResponse = httpMocks.createResponse();
    load(secondRequest, secondResponse);

    assert.deepStrictEqual(secondResponse._getStatusCode(), 404);
    assert.deepStrictEqual(secondResponse._getData(),
    'Error: There is no weddingGuests previously saved with that name');

    const requestThree = httpMocks.createRequest(
      { method: 'GET', url: '/load', query: { name: 'yryurr' } });
    const responseThree = httpMocks.createResponse();
    load(requestThree, responseThree);

    assert.deepStrictEqual(responseThree._getStatusCode(), 404);
    assert.deepStrictEqual(responseThree._getData(),
    'Error: There is no weddingGuests previously saved with that name');

    // Third branch: successful load (straight line code)
    const saveRequestOne = httpMocks.createRequest({
      method: 'POST', url: '/save',
      body: { name: "qwerty", content: weddingGuest1 }
    });
    const saveResponse1 = httpMocks.createResponse();
    save(saveRequestOne, saveResponse1);
    const loadRequestOne = httpMocks.createRequest(
      { method: 'GET', url: '/load', query: { name: "qwerty" } });
    const loadResponseOne = httpMocks.createResponse();
    load(loadRequestOne, loadResponseOne);
    assert.deepStrictEqual(loadResponseOne._getStatusCode(), 200);
    assert.deepStrictEqual(loadResponseOne._getData(), { name: 'qwerty', content: weddingGuest1 });

    const saveRequestTwo = httpMocks.createRequest({
      method: 'POST', url: '/save',
      body: { name: "yuiop", content: weddingGuest2 }
    });
    const saveResponseTwo = httpMocks.createResponse();
    save(saveRequestTwo, saveResponseTwo);
    const loadRequestTwo = httpMocks.createRequest(
      { method: 'GET', url: '/load', query: { name: "yuiop" } });
    const loadResponseTwo = httpMocks.createResponse();
    load(loadRequestTwo, loadResponseTwo);
    assert.deepStrictEqual(loadResponseTwo._getStatusCode(), 200);
    assert.deepStrictEqual(loadResponseTwo._getData(), { name: 'yuiop', content: weddingGuest2 });

    // Clearing all saved transcripts to avoid interference with future tests
    clearMap();
  });

  // Testing the names route function
  it('names', function () {
    //Two tests per subdomain (straight-line code)
    const saveRequestOne = httpMocks.createRequest({
      method: 'POST', url: '/save',
      body: { name: "qwerty", content: weddingGuest1 }
    });
    const saveResponse1 = httpMocks.createResponse();
    save(saveRequestOne, saveResponse1);
    const requestOne = httpMocks.createRequest(
      { method: 'GET', url: '/names' });
    const responseOne = httpMocks.createResponse();
    names(requestOne, responseOne);

    assert.deepStrictEqual(responseOne._getStatusCode(), 200);
    assert.deepStrictEqual(responseOne._getData(), { names: ['qwerty'] })

    const saveRequestTwo = httpMocks.createRequest({
      method: 'POST', url: '/save',
      body: { name: "yuiop", content: weddingGuest2 }
    });
    const saveResponseTwo = httpMocks.createResponse();
    save(saveRequestTwo, saveResponseTwo);

    names(requestOne, responseOne);
    assert.deepStrictEqual(responseOne._getStatusCode(), 200);
    assert.deepStrictEqual(responseOne._getData(), { names: ['qwerty', 'yuiop'] })
    clearMap();
  })

  it('getValues', function () {
    //Two tests per subdomain (straight-line code)
    const saveRequestOne = httpMocks.createRequest({
      method: 'POST', url: '/save',
      body: { name: "qwerty", content: weddingGuest1 }
    });
    const saveResponse1 = httpMocks.createResponse();
    save(saveRequestOne, saveResponse1);
    const requestOne = httpMocks.createRequest(
      { method: 'GET', url: '/getValues' });
    const responseOne = httpMocks.createResponse();
    getValues(requestOne, responseOne);

    assert.deepStrictEqual(responseOne._getStatusCode(), 200);
    assert.deepStrictEqual(responseOne._getData(), { getValues: [weddingGuest1] })

    const saveRequestTwo = httpMocks.createRequest({
      method: 'POST', url: '/save',
      body: { name: "yuiop", content: weddingGuest2 }
    });
    const saveResponseTwo = httpMocks.createResponse();
    save(saveRequestTwo, saveResponseTwo);
    getValues(requestOne, responseOne);
    assert.deepStrictEqual(responseOne._getStatusCode(), 200);
    assert.deepStrictEqual(responseOne._getData(), { getValues: [weddingGuest1, weddingGuest2] })
    clearMap();
  })
});
