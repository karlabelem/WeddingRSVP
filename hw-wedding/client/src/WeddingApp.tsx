import React, { Component } from "react";
import { isRecord } from './record';
import { AddGuestPage } from "./AddGuestPage";
import { ShowGuestDetails } from "./ShowGuestDetails";
import { GuestInfo, toJson, fromJson } from "./WeddingPartyInfo";
import { WeddingGuestList } from "./WeddingGuestList";

type PageView = "Add Guest Page" | "Guest List Page" | {kind: "Guest Details Page", info: GuestInfo}

type WeddingAppState = {
  view: PageView;
}

/** Displays the UI of the Wedding rsvp application. */
export class WeddingApp extends Component<{}, WeddingAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {view: "Guest List Page"};
  }
  
  render = (): JSX.Element => {
    if (this.state.view === "Add Guest Page") {
      return <div><AddGuestPage addingGuest={this.doAddingGuestClick} 
      previousPage={this.doPreviousPageClick}></AddGuestPage></div>;
    } else if (this.state.view === "Guest List Page") {
      return <div>
        <WeddingGuestList openAddGuestPage={this.doAddGuestsPageClick}
        openShowGuestDetailsPage={this.doOpenGuestClick}></WeddingGuestList>
      </div>
    } else {
      return <div><ShowGuestDetails info={this.state.view.info} savingGuest={this.doSavingGuestClick} 
      previousPage={this.doPreviousPageClick}></ShowGuestDetails></div>
    }
  };

  doAddingGuestClick = (guestName: string, brideOrGroom: "Molly" | "James", familyTF: boolean): void => {
    console.log("testing addGuest")
    const info: GuestInfo = {
      guestName: guestName,
      brideOrGroom: brideOrGroom,
      familyTF: familyTF,
      dietRes: undefined,
      addGuestRes: undefined,
      addName: undefined,
      additional: undefined
    }
    this.doSavingGuestClick(info)
  }
  doPreviousPageClick = (): void => {
    this.setState({view: "Guest List Page"})
  } 
  doSavingGuestClick = (information: GuestInfo): void => {
    fetch("/api/save", {method: 'POST', body: JSON.stringify({name: information.guestName, 
      content: toJson(information)}),
      headers: {'Content-Type': 'application/json'}})
    .then((res) => this.doSaveResp(res))
    .catch(() => this.doSaveError("failed to connect to server"));
  }
  doSaveResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then((val) => this.doSaveJson(val))
        .catch(() => this.doSaveError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doSaveError)
        .catch(() => this.doSaveError("400 response is not text"));
    } else {
      this.doSaveError(`bad status code: ${res.status}`);
    }
  }
  doSaveError = (msg: string): void => {
    console.error(`Error fetching /api/save: ${msg}`);
  }
  doSaveJson = (val: unknown): void => {
    if (!isRecord(val) || typeof val.saved !== 'boolean') {
      console.error('Invalid JSON from /api/save', val);
      return;
    }
    if(!val.saved) {
      throw new Error("Error: The guest was not saved!")
    } else {
      this.doPreviousPageClick()
    }
  }
  doAddGuestsPageClick = (): void => {
    this.setState({view: "Add Guest Page"})
  }
  doOpenGuestClick = (name: string): void => {
    fetch("/api/load?name=" + encodeURIComponent(name))
      .then((res) => this.doLoadResp(res))
      .catch(() => this.doLoadError("Error! Failed to connect to the server"));
  }

  doLoadResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then((val) => this.doLoadJson(val))
        .catch(() => this.doLoadError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doLoadError)
        .catch(() => this.doLoadError("400 response is not text"));
    } else {
      this.doLoadError(`bad status code: ${res.status}`);
    }
  };

  doLoadJson = (value: unknown): void => {
    if (!isRecord(value) || typeof value.name !== 'string' ||
        value.content === undefined) {
      console.error('Invalid JSON from /api/load', value);
      return;
    }

    this.setState({view: {kind: "Guest Details Page", info: fromJson(value.content)}})
  };

  doLoadError = (message: string): void => {
    console.error(`Error fetching /api/load: ${message}`);
  };
}


// type WeddingAppState = {
//   name: string;  // mirror state of name text box
//   msg: string;   // message sent from server
// }


// /** Displays the UI of the Wedding rsvp application. */
// export class WeddingApp extends Component<{}, WeddingAppState> {

//   constructor(props: {}) {
//     super(props);

//     this.state = {name: "", msg: ""};
//   }
  
//   render = (): JSX.Element => {
//     return (<div>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input type="name" id="name" value={this.state.name}
//                  onChange={this.doNameChange}></input>
//           <button onClick={this.doDummyClick}>Dummy</button>
//         </div>
//         {this.renderMessage()}
//       </div>);
//   };

//   renderMessage = (): JSX.Element => {
//     if (this.state.msg === "") {
//       return <div></div>;
//     } else {
//       return <p>Server says: {this.state.msg}</p>;
//     }
//   };

//   doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
//     this.setState({name: evt.target.value, msg: ""});
//   };

//   doDummyClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
//     const name = this.state.name.trim();
//     if (name.length > 0) {
//       const url = "/api/dummy?name=" + encodeURIComponent(name);
//       fetch(url).then(this.doDummyResp)
//           .catch(() => this.doDummyError("failed to connect to server"));
//     }
//   };

//   doDummyResp = (res: Response): void => {
//     if (res.status === 200) {
//       res.json().then(this.doDummyJson)
//           .catch(() => this.doDummyError("200 response is not JSON"));
//     } else if (res.status === 400) {
//       res.text().then(this.doDummyError)
//           .catch(() => this.doDummyError("400 response is not name"));
//     } else {
//       this.doDummyError(`bad status code ${res.status}`);
//     }
//   };

//   doDummyJson = (data: unknown): void => {
//     if (!isRecord(data)) {
//       console.error("200 response is not a record", data);
//       return;
//     }

//     if (typeof data.msg !== "string") {
//       console.error("'msg' field of 200 response is not a string", data.msg);
//       return;
//     }

//     this.setState({msg: data.msg});
//   }

//   doDummyError = (msg: string): void => {
//     console.error(`Error fetching /api/dummy: ${msg}`);
//   };

// }