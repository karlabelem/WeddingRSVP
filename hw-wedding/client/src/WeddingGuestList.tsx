import React, { Component, MouseEvent } from "react";
import { GuestInfo, fromJson } from "./WeddingPartyInfo";
import { isRecord } from "./record";

type WeddingGuestListState = {
    weddingGuestList: unknown[] | undefined;
    mollyGuestsTotal: number | undefined;
    mollyFamily: number | undefined;
    mollyExtra: number | undefined;

    jamesGuestsTotal: number | undefined;
    jamesFamily: number | undefined;
    jamesExtra: number | undefined;

}

type WeddingGuestListProps = {
    openAddGuestPage: () => void
    openShowGuestDetailsPage: (guestName: string) => void
}

export class WeddingGuestList extends Component<WeddingGuestListProps, WeddingGuestListState> {
    constructor(props: WeddingGuestListProps) {
        super(props);
        this.state = {
            weddingGuestList: undefined, mollyGuestsTotal: undefined, mollyFamily: undefined,
            mollyExtra: undefined, jamesGuestsTotal: undefined, jamesFamily: undefined,
            jamesExtra: undefined
        }
    }
    render = (): JSX.Element => {
        if (this.state.weddingGuestList === undefined) {
            this.doFetchListChange()
            return <div> @ Please wait @</div>
        }
        if (this.state.mollyExtra === undefined || this.state.jamesExtra === undefined ||
            this.state.mollyGuestsTotal === undefined || this.state.jamesGuestsTotal === undefined ||
            this.state.mollyFamily === undefined || this.state.jamesFamily === undefined) {
            this.doUpdateGuestCountChange(0, 0, 0, 0, 0, 0, 0)
            return <div> @ Please wait... @</div>
        }
        return <div>
            <div>
                <h1> Guest List </h1>
            </div>
            <div>
                {this.renderList([], 0)}
            </div>
            <div>
                <h3> Summary </h3>
            </div>
            <div>
                {this.state.mollyGuestsTotal}{(this.state.mollyExtra === 0)
                    ? " " : "-" + (this.state.mollyGuestsTotal + this.state.mollyExtra) + " "}
                guest(s) of Molly ({this.state.mollyFamily} family)
            </div>
            <div>
                {this.state.jamesGuestsTotal}{(this.state.jamesExtra === 0)
                    ? " " : "-" + (this.state.jamesGuestsTotal + this.state.jamesExtra) + " "}
                guest(s) of James ({this.state.jamesFamily} family)
            </div>
            <div>
                <button onClick={this.doOpenAddGuestPageClick}>
                    Add Guest
                </button>
            </div>
        </div>
    }
    renderList = (code: JSX.Element[], i: number): JSX.Element => {
        if (this.state.weddingGuestList === undefined) {
            throw new Error("Couldn't fetch guests")
        }
        if (code.length === this.state.weddingGuestList.length) {
            return <ul>{code}</ul>
        }
        const guest: GuestInfo = fromJson(this.state.weddingGuestList[i])
        if (guest.additional === undefined) {
            code.push(<li key={i}><a href="#" onClick={this.doOpenGuestDetailsClick}>{guest.guestName}</a> Guest of {guest.brideOrGroom} +1?</li>)
        }
        else {
            code.push(<li key={i}><a href="#" onClick={this.doOpenGuestDetailsClick}>{guest.guestName}</a> Guest of {guest.brideOrGroom} +
                {(guest.additional) ? 1 : 0}</li>)
        }
        return this.renderList(code, i + 1)
    }
    doOpenGuestDetailsClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
        if (!(evt.target instanceof HTMLAnchorElement)) {
            return;
        }
        this.props.openShowGuestDetailsPage(evt.target.innerHTML);
    }
    doOpenAddGuestPageClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        this.props.openAddGuestPage();
    }
    doUpdateGuestCountChange = (i: number, mgt: number, mgf: number, mge: number,
        jgt: number, jgf: number, jge: number): true => {
        if (this.state.weddingGuestList === undefined) {
            throw new Error("No guests fetched yet")
        }
        if (i === this.state.weddingGuestList.length) {
            this.setState({
                mollyGuestsTotal: mgt, mollyFamily: mgf, mollyExtra: mge,
                jamesExtra: jge, jamesFamily: jgf, jamesGuestsTotal: jgt
            })
            return true;
        }
        else {
            const g: GuestInfo = fromJson(this.state.weddingGuestList[i]);
            if (g.brideOrGroom === "James") {
                const newtotal: number = (g.additional) ? jgt + 2 : jgt + 1;
                const newfam: number = (g.familyTF) ? jgf + 1 : jgf;
                const newextra: number = (g.additional === undefined) ? jge + 1 : jge;
                return this.doUpdateGuestCountChange(i + 1, mgt, mgf, mge, newtotal, newfam, newextra)
            }
            else {
                const newtotal: number = (g.additional) ? mgt + 2 : mgt + 1;
                const newfam: number = (g.familyTF) ? mgf + 1 : mgf;
                const newextra: number = (g.additional === undefined) ? mge + 1 : mge;
                return this.doUpdateGuestCountChange(i + 1, newtotal, newfam, newextra, jgt, jgf, jge)
            }
        }
    }
    doFetchListChange = (): void => {
        fetch("/api/getValues")
            .then((res) => this.doFetchListResp(res))
            .catch(() => this.doFetchListError("Error! Failed to connect to the server"));
    }
    doFetchListResp = (res: Response): void => {
        if (res.status === 200) {
            res.json().then((val) => this.doFetchListJson(val))
                .catch(() => this.doFetchListError("Error! Response is not Json"));
        } else if (res.status === 400) {
            res.text().then(this.doFetchListError)
                .catch(() => this.doFetchListError("Error! Response is not text"))
        } else {
            this.doFetchListError("Bad status code")
        }
    }
    doFetchListError = (message: string): void => {
        console.error(`Error fetching /api/getValues: ${message}`)
    }
    doFetchListJson = (value: unknown): void => {
        if (!isRecord(value) || !Array.isArray(value.getValues)) {
            console.error("Error! Invalid JSON from /api/getValues", value)
            return;
        }
        const weddingGuests: unknown[] = [];
        for (const weddingGuest of value.getValues) {
            if (Array.isArray(weddingGuest)) { weddingGuests.push(weddingGuest) }
            else {
                console.error("Error! Invalid JSON from /api/getValues", value)
                return;
            }
        }

        this.setState({ weddingGuestList: weddingGuests })
    }
}