import React, { Component, ChangeEvent, MouseEvent } from "react";
import { GuestInfo } from "./WeddingPartyInfo";

type GuestDetailsProps = {
    info: GuestInfo;
    previousPage: () => void;
    savingGuest: (information: GuestInfo) => void;
}

type GuestDetailsState = {
    dietRes: string;
    additional: boolean | undefined;
    addName: string;
    addGuestRes: string;
    errorMessage: ""
    | "Please insert your dietary restriction(s)"
    | "Please insert your plus one's name"
    | "Please give your plus one's dietary restriction(s)"
}

export class ShowGuestDetails extends Component<GuestDetailsProps, GuestDetailsState> {
    constructor(props: GuestDetailsProps) {
        super(props)

        this.state = {
            dietRes: (props.info.dietRes === undefined) ? "" : props.info.dietRes,
            additional: props.info.additional,
            addName: (props.info.addName === undefined) ? "" : props.info.addName,
            addGuestRes: (props.info.addGuestRes === undefined) ? "" : props.info.addGuestRes,
            errorMessage: ""
        }
    }

    render = (): JSX.Element => {
        return <div>
            <div><h1>Guest Details</h1></div>
            <div>
                {this.props.info.guestName}, guest of {this.props.info.brideOrGroom},
                {this.props.info.familyTF ? "" : " not "} family
            </div>
            <div>
                Dietary Restrictions ('none' if none):
            </div>
            <div>
                <input type="text" onChange={this.doUpdateDietResChange} value={this.state.dietRes}></input>
            </div>
            <div>
                Additional Guest?
                <select onChange={this.doAdditionalChange} defaultValue={(this.state.additional === undefined)
                    ? "undefined" : this.state.additional.toString()}>
                    <option value="undefined">Unknown</option>
                    <option value="true">1</option>
                    <option value="false">0</option>
                </select>
            </div>
            {this.renderAdditionalInformation()}
            <div>
                <button onClick={this.doSaveClick}>
                    Save
                </button>
                <button onClick={this.doBackClick}>
                    Back
                </button>
            </div>
            <div>
                <h3>{this.state.errorMessage}
                </h3>
            </div>
        </div>
    }

    renderAdditionalInformation = (): JSX.Element => {
        if (this.state.additional) {
            return <div>
                <div>
                    Guest Name: <input type="text" onChange={this.doUpdateAddNameChange}
                        value={this.state.addName}>
                    </input>
                </div>
                <div>
                    Guest Dietary Restrictions ('none' if none):
                </div>
                <div>
                    <input type="text" onChange={this.doUpdateAddGuestResChange} value={this.state.addGuestRes}>
                    </input>
                </div>
            </div>
        } else {
            return <div>
            </div>
        }
    }

    doUpdateAddNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ addName: evt.target.value })
    }
    doUpdateAddGuestResChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ addGuestRes: evt.target.value })
    }
    doUpdateDietResChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ dietRes: evt.target.value })
    }
    doAdditionalChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
        if (evt.target.value === "true") {
            this.setState({ additional: true })
        } else if (evt.target.value === "false") {
            this.setState({ additional: false })
        } else {
            this.setState({ additional: undefined })
        }
    }
    doBackClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        this.props.previousPage();
    }
    doSaveClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        if (this.state.dietRes === "") {
            this.setState({ errorMessage: "Please insert your dietary restriction(s)" })
        } else if (this.state.additional && this.state.addName === "") {
            this.setState({ errorMessage: "Please insert your plus one's name" })
        } else if (this.state.additional && this.state.addGuestRes === "") {
            this.setState({ errorMessage: "Please give your plus one's dietary restriction(s)" })
        } else {
            const newInformation: GuestInfo = {
                guestName: this.props.info.guestName,
                brideOrGroom: this.props.info.brideOrGroom,
                additional: this.state.additional,
                addName: this.state.addName,
                familyTF: this.props.info.familyTF,
                dietRes: this.state.dietRes,
                addGuestRes: this.state.addGuestRes
            }
            this.props.savingGuest(newInformation);
        }
    }
}