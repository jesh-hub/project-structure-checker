import React from 'react';
import './SideNavBarItem.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {NavBarItemType} from "./SideNavBarConstValues";

class SideNavBarItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.item.type,
            name: props.item.name,
            icon: getDefaultIcon(),
            selected: false,
            hasSubItems: props.item.type === NavBarItemType.directory &&
                (props.item.subDirectories.length > 0 || props.item.files.length > 0),
            subItems: props.item.type === NavBarItemType.directory ?
                props.item.subDirectories.concat(props.item.files) : []
        };

        function getDefaultIcon() {
            if (props.item.type === NavBarItemType.directory)
                return 'folder';
            else if (props.item.type === NavBarItemType.file)
                return 'file-alt';
        }
    }

    onClickNavItem() {
        this.setState(prev => ({ selected: ! prev.selected }));
        if (this.state.type === NavBarItemType.directory) {
            this.setState(state =>
                ({ icon: state.selected ? 'folder-open' : 'folder' }));
        }
    }

    render() {
        return (
            <li className="psc-side-nav-bar-item">
                <div
                    className="psc-item-name"
                    onClick={this.onClickNavItem.bind(this)}
                >
                    <FontAwesomeIcon icon={['far', this.state.icon]} />
                    {this.state.name}
                </div>
                {
                    this.state.hasSubItems &&
                    this.state.selected &&
                    <ul>
                        {this.state.subItems.map(item =>
                            <SideNavBarItem
                                key={`${item.type}_${item.name}`}
                                item={item}
                            />
                        )}
                    </ul>
                }
            </li>
        )
    }
}

export default SideNavBarItem;
