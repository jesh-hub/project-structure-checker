import './App.css';
import './common/Icons';
import SideNavBar from "./main/SideNavBar";
import React from "react";

function App() {
    return (
        <div className="App">
            <div className="psc-project-structure">
                <SideNavBar />
            </div>
            <div className="psc-content-viewer">

            </div>
        </div>
    );
}

export default App;
