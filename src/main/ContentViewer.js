import './ContentViewer.css';

function ContentViewer(props) {
    // TODO
    return (
        <p
            className={`psc-content-viewer ${props.active ? 'psc-show' : 'psc-hidden'}`}
        >{props.name}</p>
    );
}

export default ContentViewer;
