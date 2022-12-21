import React, { Component } from "react";
import ModalComponent from "../components/Modal/Modal";
import AuthContext from "../context/auth-context";

class RecordsPage extends Component {
    static contextType = AuthContext;
    render() {
        return (
            <>
                <h1>Records Page</h1>
                <ModalComponent token={this.context.token} />
            </>
        );
    }
}

export default RecordsPage;