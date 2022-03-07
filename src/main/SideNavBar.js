import './SideNavBar.css';
import React from 'react';
import SideNavBarItem from './SideNavBarItem';
import * as Api from '../common/Api';
import {NavBarItemType} from "./SideNavBarConstValues";

class SideNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navItems: []
        };
    }

    /** @typedef {Array.<string>} RawProjectFiles */
    /**
     * @typedef {Object.<string, RawProjectDirectory>} RawProjectDirectory
     * @property {RawProjectFiles} [_files]
     *  - RawProjectDirectory일 경우 key는 directory name
     */
    async componentDidMount() {
        function ProjectDirectory(path) {
            this.type = NavBarItemType.directory;
            this.name = path;
            this.subDirectories = [];
            this.files = [];
        }
        /** @param {Array.<ProjectDirectory>} directories */
        ProjectDirectory.prototype.setSubDirectory = function (directories) {
            this.subDirectories = directories;
        }
        /** @param {RawProjectFiles} files */
        ProjectDirectory.prototype.setFiles = function (files) {
            this.files = files.map(name => new ProjectFile(name));
        }

        function ProjectFile(name) {
            this.type = NavBarItemType.file;
            this.name = name;
        }

        const {keys} = await Api.get('/key');

        const navItems = [];
        /** @type {RawProjectDirectory} */
        const rawDir = keys.reduce((ret, key) => {
            // TODO window path separator
            const paths = key.split('/');
            if (paths.length > 1)
                recurseSetDirectoryTree(ret, paths);
            else
                navItems.push(new ProjectFile(paths[0]));
            return ret;
        }, {});
        navItems.unshift(...recurseCreateDirectories(rawDir));
        this.setState({ navItems });

        /**
         * @param {RawProjectDirectory} target
         * @param {Array.<string>} paths
         */
        function recurseSetDirectoryTree(target, paths) {
            const parentPath = paths.shift();
            if (! target[parentPath])
                target[parentPath] = {};
            if (paths.length > 1)
                recurseSetDirectoryTree(target[parentPath], paths);
            else {
                if (!target[parentPath]._files)
                    target[parentPath]._files = [];
                target[parentPath]._files.push(paths.pop());
            }
        }

        /**
         * @param {RawProjectDirectory} rawDir
         * @returns {Array.<ProjectDirectory>}
         */
        function recurseCreateDirectories(rawDir) {
            const ret = [];

            for (const dirName in rawDir) {
                const directory = new ProjectDirectory(dirName);
                if (rawDir[dirName].hasOwnProperty('_files')) {
                    directory.setFiles(rawDir[dirName]._files);
                    delete rawDir[dirName]._files;
                }
                directory.setSubDirectory(recurseCreateDirectories(rawDir[dirName]));
                ret.push(directory);
            }

            return ret;
        }
    }

    render() {
        return (
            <div className="psc-side-nav-bar">
                <ul>
                    {this.state.navItems.map(item =>
                        <SideNavBarItem
                            key={`${item.type}_${item.name}`}
                            item={item}
                        />
                    )}
                </ul>
            </div>
        )
    }
}

export default SideNavBar;
