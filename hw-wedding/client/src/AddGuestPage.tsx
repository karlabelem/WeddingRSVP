import React, { Component, ChangeEvent, MouseEvent } from "react";

type AddGuestProps = {
    addingGuest: (guestName: string, brideOrGroom: "Molly" | "James", familyTF: boolean) => void;
    previousPage: () => void;
}

type AddGuestState = {
    guestName: string;
    brideOrGroom: "" | "Molly" | "James";
    familyTF: boolean;
    messageError: "" | "Invalid input! You have to choose the host" | "Invalid input! You have to specify the guest's name";
}

export class AddGuestPage extends Component<AddGuestProps, AddGuestState> {
    constructor(props: AddGuestProps) {
        super(props)

        this.state = { guestName: "", brideOrGroom: "", familyTF: false, messageError: "" }
    }

    render = (): JSX.Element => {
        return <div>
            <div><h1>Add Guest </h1></div>
            <div>
                <label>Name: </label>
                <input type="text" value={this.state.guestName} onChange={this.doUpdateNameChange}></input>
            </div>
            <div>
                <div><label>Guest of: </label></div>
                <div><input type="radio" name="host" value="Molly" onChange={this.doMollyNameClick}></input> Molly </div>
                <div><input type="radio" name="host" value="James" onChange={this.doJamesNameClick}></input> James </div>
            </div>
            <div>
                <input type="checkbox" name="Family" value="Family" onChange={this.doFamilyTFClick}></input>Family
            </div>
            <div><button onClick={this.doAddClick}>Add</button> <button onClick={this.doBackClick}>Back</button></div>
            <div><h3>{this.state.messageError}</h3></div>
        </div>

    }
    doUpdateNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ guestName: evt.target.value, messageError: "" })
    }
    doMollyNameClick = (_evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ brideOrGroom: "Molly", messageError: "" })
    }
    doJamesNameClick = (_evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ brideOrGroom: "James", messageError: "" })
    }
    doFamilyTFClick = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ familyTF: evt.target.checked })
    }
    doAddClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        if (this.state.brideOrGroom == "") {
            this.setState({ messageError: "Invalid input! You have to choose the host" })
        }
        else if (this.state.guestName === "") {
            this.setState({ messageError: "Invalid input! You have to specify the guest's name" })
        }
        else {
            this.props.addingGuest(this.state.guestName, this.state.brideOrGroom, this.state.familyTF)
        }
    }
    doBackClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        this.props.previousPage();
    }
}