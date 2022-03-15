import './App.css';
import './common/Icons';
import ContentViewer from './main/ContentViewer';
import SideNavBar from './main/SideNavBar';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFile: undefined,
            openedFiles: []
        };
    }

    onFileSelected(file) {
        this.setState((prev) => {
            if (!prev.openedFiles.includes(file))
                prev.openedFiles.push(file);
            return {
                activeFile: file,
                openedFiles: prev.openedFiles
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div className="psc-project-structure">
                    <SideNavBar onItemSelected={this.onFileSelected.bind(this)}/>
                </div>
                <div className="psc-content-viewer">
                    {
                        this.state.openedFiles.map(file =>
                            <ContentViewer
                                key={file.name}
                                name={file.name}
                                active={this.state.activeFile === file}
                            />)
                    }
                </div>
            </div>
        )
    }
}

export default App;
