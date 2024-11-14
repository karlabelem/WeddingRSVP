import * as assert from 'assert'
import { GuestInfo, fromJson, toJson } from './WeddingPartyInfo'

describe('GuestInfo', function () {
    it('toJson', function () {
        const guestsInformation1: GuestInfo = {
            guestName: "Kevin", brideOrGroom: "James",
            additional: true, addName: "Plus", familyTF: false,
            dietRes: "students", addGuestRes: "random"
        }
        assert.deepStrictEqual(toJson(guestsInformation1), [
            "Kevin", "James", true, "Plus", false, "students", "random"
        ])
        const guestsInformation2: GuestInfo = {
            guestName: "Bob", brideOrGroom: "Molly",
            additional: false, addName: undefined, familyTF: true,
            dietRes: undefined, addGuestRes: undefined
        }
        assert.deepStrictEqual(toJson(guestsInformation2), [
            "Bob", "Molly", false, undefined, true, undefined, undefined
        ])
    })

    it('fromJson', function () {
        const reverseGuestsInformation1: unknown = ["Kevin", "James", true, "PlusOne", false,
            "students", "random"]
        assert.deepStrictEqual(fromJson(reverseGuestsInformation1), {
            guestName: "Kevin",
            brideOrGroom: "James", additional: true, addName: "PlusOne", familyTF: false,
            dietRes: "students", addGuestRes: "random"
        })

        const reverseGuestsInformation2: unknown = ["Bob", "Molly", false, undefined, true,
            undefined, undefined]
        assert.deepStrictEqual(fromJson(reverseGuestsInformation2), {
            guestName: "Bob",
            brideOrGroom: "Molly", additional: false, addName: undefined, familyTF: true,
            dietRes: undefined, addGuestRes: undefined
        })
    })
})



