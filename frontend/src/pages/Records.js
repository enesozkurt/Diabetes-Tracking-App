import React, { Component } from "react";
import ModalComponent from "../components/Modal/Modal";
import AuthContext from "../context/auth-context";

class RecordsPage extends Component {
    static contextType = AuthContext;
    render() {
        return (
            <>
                <ModalComponent token={this.context.token} />
            </>
        );
    }
}

export default RecordsPage;