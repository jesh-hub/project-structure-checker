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
                <section className="psc-project-structure">
                    <h3 className="psc-navigation">Navigation</h3>
                    <SideNavBar onItemSelected={this.onFileSelected.bind(this)}/>
                </section>
                <section className="psc-content-viewer">
                    {
                        this.state.openedFiles.length ?
                            this.state.openedFiles.map(file =>
                                <ContentViewer
                                    key={file.name}
                                    name={file.name}
                                    active={this.state.activeFile === file}
                                />) :
                            <p>Navigation에서 파일을 선택해보세요!</p>
                    }
                </section>
            </div>
        )
    }
}

export default App;
