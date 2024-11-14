"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const httpMocks = __importStar(require("node-mocks-http"));
const routes_1 = require("./routes");
// Testing the save route function with various branches
describe('routes', function () {
    const weddingGuest1 = ['kevin', 'James', true, undefined, false, 'none', undefined];
    const weddingGuest2 = ['wilcox', 'Molly', true, 'sam', true, 'none', 'many'];
    // First branch: missing required "name" argument (straight line code)
    it('save', function () {
        const request = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: 127, content: weddingGuest1 } });
        const response = httpMocks.createResponse();
        (0, routes_1.save)(request, response);
        assert.deepStrictEqual(response._getStatusCode(), 400);
        assert.deepStrictEqual(response._getData(), 'required argument "name" was missing');
        // Second branch: missing required "name" argument (straight line code)
        const requestOne = httpMocks.createRequest({ method: 'POST', url: '/save', body: { content: weddingGuest1 } });
        const responseOne = httpMocks.createResponse();
        (0, routes_1.save)(requestOne, responseOne);
        assert.deepStrictEqual(responseOne._getStatusCode(), 400);
        assert.deepStrictEqual(responseOne._getData(), 'required argument "name" was missing');
        // Third branch: missing required "content" argument (straight line code)
        const secondRequest = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: "kjhsbd" } });
        const secondResponse = httpMocks.createResponse();
        (0, routes_1.save)(secondRequest, secondResponse);
        assert.deepStrictEqual(secondResponse._getStatusCode(), 400);
        assert.deepStrictEqual(secondResponse._getData(), 'required argument "content" was missing');
        // Fourth branch: successful save
        const requestFive = httpMocks.createRequest({
            method: 'POST', url: '/save',
            body: { name: "iauwgdfc", content: weddingGuest1 }
        });
        const responseFive = httpMocks.createResponse();
        (0, routes_1.save)(requestFive, responseFive);
        assert.deepStrictEqual(responseFive._getStatusCode(), 200);
        assert.deepStrictEqual(responseFive._getData(), { saved: true });
        const requestSix = httpMocks.createRequest({
            method: 'POST', url: '/save',
            body: { name: "uygweafh", content: weddingGuest2 }
        });
        const responseSix = httpMocks.createResponse();
        (0, routes_1.save)(requestSix, responseSix);
        assert.deepStrictEqual(responseSix._getStatusCode(), 200);
        assert.deepStrictEqual(responseSix._getData(), { saved: true });
        // Clearing all saved transcripts to avoid interference with future tests
        (0, routes_1.clearMap)();
    });
    // Testing the load route function with various branches
    it('load', function () {
        // First branch: missing required "name" argument (straight line code)
        const request = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: 78 } });
        const response = httpMocks.createResponse();
        (0, routes_1.load)(request, response);
        assert.deepStrictEqual(response._getStatusCode(), 400);
        assert.deepStrictEqual(response._getData(), 'required argument "name" was missing');
        const requestOne = httpMocks.createRequest({ method: 'GET', url: '/load', query: {} });
        const responseOne = httpMocks.createResponse();
        (0, routes_1.load)(requestOne, responseOne);
        assert.deepStrictEqual(responseOne._getStatusCode(), 400);
        assert.deepStrictEqual(responseOne._getData(), 'required argument "name" was missing');
        // Second branch: trying to load non-existing data (straight line code)
        const secondRequest = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: 'ououg' } });
        const secondResponse = httpMocks.createResponse();
        (0, routes_1.load)(secondRequest, secondResponse);
        assert.deepStrictEqual(secondResponse._getStatusCode(), 404);
        assert.deepStrictEqual(secondResponse._getData(), 'there was no weddingGuests previously saved with that name');
        const requestThree = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: 'yryurr' } });
        const responseThree = httpMocks.createResponse();
        (0, routes_1.load)(requestThree, responseThree);
        assert.deepStrictEqual(responseThree._getStatusCode(), 404);
        assert.deepStrictEqual(responseThree._getData(), 'there was no weddingGuests previously saved with that name');
        // Third branch: successful load (straight line code)
        const saveRequestOne = httpMocks.createRequest({
            method: 'POST', url: '/save',
            body: { name: "qwerty", content: weddingGuest1 }
        });
        const saveResponse1 = httpMocks.createResponse();
        (0, routes_1.save)(saveRequestOne, saveResponse1);
        const loadRequestOne = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "qwerty" } });
        const loadResponseOne = httpMocks.createResponse();
        (0, routes_1.load)(loadRequestOne, loadResponseOne);
        assert.deepStrictEqual(loadResponseOne._getStatusCode(), 200);
        assert.deepStrictEqual(loadResponseOne._getData(), { name: 'qwerty', content: weddingGuest1 });
        const saveRequestTwo = httpMocks.createRequest({
            method: 'POST', url: '/save',
            body: { name: "yuiop", content: weddingGuest2 }
        });
        const saveResponseTwo = httpMocks.createResponse();
        (0, routes_1.save)(saveRequestTwo, saveResponseTwo);
        const loadRequestTwo = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "yuiop" } });
        const loadResponseTwo = httpMocks.createResponse();
        (0, routes_1.load)(loadRequestTwo, loadResponseTwo);
        assert.deepStrictEqual(loadResponseTwo._getStatusCode(), 200);
        assert.deepStrictEqual(loadResponseTwo._getData(), { name: 'yuiop', content: weddingGuest2 });
        // Clearing all saved transcripts to avoid interference with future tests
        (0, routes_1.clearMap)();
    });
    // Testing the names route function
    it('names', function () {
        //Two tests per subdomain (straight-line code)
        const saveRequestOne = httpMocks.createRequest({
            method: 'POST', url: '/save',
            body: { name: "qwerty", content: weddingGuest1 }
        });
        const saveResponse1 = httpMocks.createResponse();
        (0, routes_1.save)(saveRequestOne, saveResponse1);
        const requestOne = httpMocks.createRequest({ method: 'GET', url: '/names' });
        const responseOne = httpMocks.createResponse();
        (0, routes_1.names)(requestOne, responseOne);
        assert.deepStrictEqual(responseOne._getStatusCode(), 200);
        assert.deepStrictEqual(responseOne._getData(), { names: ['qwerty'] });
        const saveRequestTwo = httpMocks.createRequest({
            method: 'POST', url: '/save',
            body: { name: "yuiop", content: weddingGuest2 }
        });
        const saveResponseTwo = httpMocks.createResponse();
        (0, routes_1.save)(saveRequestTwo, saveResponseTwo);
        (0, routes_1.names)(requestOne, responseOne);
        assert.deepStrictEqual(responseOne._getStatusCode(), 200);
        assert.deepStrictEqual(responseOne._getData(), { names: ['qwerty', 'yuiop'] });
        (0, routes_1.clearMap)();
    });
    it('getValues', function () {
        //Two tests per subdomain (straight-line code)
        const saveRequestOne = httpMocks.createRequest({
            method: 'POST', url: '/save',
            body: { name: "qwerty", content: weddingGuest1 }
        });
        const saveResponse1 = httpMocks.createResponse();
        (0, routes_1.save)(saveRequestOne, saveResponse1);
        const requestOne = httpMocks.createRequest({ method: 'GET', url: '/getValues' });
        const responseOne = httpMocks.createResponse();
        (0, routes_1.getValues)(requestOne, responseOne);
        assert.deepStrictEqual(responseOne._getStatusCode(), 200);
        assert.deepStrictEqual(responseOne._getData(), { getValues: [weddingGuest1] });
        const saveRequestTwo = httpMocks.createRequest({
            method: 'POST', url: '/save',
            body: { name: "yuiop", content: weddingGuest2 }
        });
        const saveResponseTwo = httpMocks.createResponse();
        (0, routes_1.save)(saveRequestTwo, saveResponseTwo);
        (0, routes_1.getValues)(requestOne, responseOne);
        assert.deepStrictEqual(responseOne._getStatusCode(), 200);
        assert.deepStrictEqual(responseOne._getData(), { getValues: [weddingGuest1, weddingGuest2] });
        (0, routes_1.clearMap)();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQWtFO0FBRWxFLHdEQUF3RDtBQUN4RCxRQUFRLENBQUMsUUFBUSxFQUFFO0lBQ2pCLE1BQU0sYUFBYSxHQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0YsTUFBTSxhQUFhLEdBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV0RixzRUFBc0U7SUFDdEUsRUFBRSxDQUFDLE1BQU0sRUFBRTtRQUNULE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQ3JDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDNUMsSUFBQSxhQUFJLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUN4QyxzQ0FBc0MsQ0FBQyxDQUFDO1FBRTFDLHVFQUF1RTtRQUN2RSxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUN4QyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMvQyxJQUFBLGFBQUksRUFBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFOUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQzNDLHNDQUFzQyxDQUFDLENBQUM7UUFFMUMseUVBQXlFO1FBQ3pFLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQzNDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUQsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2xELElBQUEsYUFBSSxFQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVwQyxNQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFDOUMseUNBQXlDLENBQUMsQ0FBQztRQUU3QyxpQ0FBaUM7UUFDakMsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUMxQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPO1lBQzVCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRTtTQUNuRCxDQUFDLENBQUM7UUFDSCxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDaEQsSUFBQSxhQUFJLEVBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRWhDLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFakUsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUN6QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPO1lBQzVCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRTtTQUNuRCxDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDL0MsSUFBQSxhQUFJLEVBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFaEUseUVBQXlFO1FBQ3pFLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFFSCx3REFBd0Q7SUFDeEQsRUFBRSxDQUFDLE1BQU0sRUFBRTtRQUVULHNFQUFzRTtRQUN0RSxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsYUFBYSxDQUNyQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM1QyxJQUFBLGFBQUksRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFeEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hDLHNDQUFzQyxDQUFDLENBQUM7UUFFMUMsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FDeEMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9DLElBQUEsYUFBSSxFQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUU5QixNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFDM0Msc0NBQXNDLENBQUMsQ0FBQztRQUUxQyx1RUFBdUU7UUFDdkUsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FDM0MsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RCxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbEQsSUFBQSxhQUFJLEVBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXBDLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUM5Qyw0REFBNEQsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQzFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUQsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2pELElBQUEsYUFBSSxFQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVsQyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1RCxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFDN0MsNERBQTRELENBQUMsQ0FBQztRQUVoRSxxREFBcUQ7UUFDckQsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUM3QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPO1lBQzVCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRTtTQUNqRCxDQUFDLENBQUM7UUFDSCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDakQsSUFBQSxhQUFJLEVBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQzVDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUQsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25ELElBQUEsYUFBSSxFQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFFL0YsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUM3QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPO1lBQzVCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRTtTQUNoRCxDQUFDLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkQsSUFBQSxhQUFJLEVBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQzVDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0QsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25ELElBQUEsYUFBSSxFQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFFOUYseUVBQXlFO1FBQ3pFLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFFSCxtQ0FBbUM7SUFDbkMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNWLDhDQUE4QztRQUM5QyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQzdDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU87WUFDNUIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFO1NBQ2pELENBQUMsQ0FBQztRQUNILE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNqRCxJQUFBLGFBQUksRUFBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEMsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FDeEMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMvQyxJQUFBLGNBQUssRUFBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFL0IsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFckUsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUM3QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPO1lBQzVCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRTtTQUNoRCxDQUFDLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkQsSUFBQSxhQUFJLEVBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRXRDLElBQUEsY0FBSyxFQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDOUUsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDZCw4Q0FBOEM7UUFDOUMsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUM3QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPO1lBQzVCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRTtTQUNqRCxDQUFDLENBQUM7UUFDSCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDakQsSUFBQSxhQUFJLEVBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQ3hDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN4QyxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDL0MsSUFBQSxrQkFBUyxFQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVuQyxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUU5RSxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQzdDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU87WUFDNUIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFO1NBQ2hELENBQUMsQ0FBQztRQUNILE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuRCxJQUFBLGFBQUksRUFBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDdEMsSUFBQSxrQkFBUyxFQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDN0YsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFDIn0=