class Changelog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const changelist = this.props.changes.map((change, index) =>
            <li className={"changelog-list-item"}
                key={index.toString()}
            >
                {change}
            </li>
        );

        return (
            <div className="changelog"
                 onClick={() => {
                     this.props.tryRemoveChangelog()}
                 }
            >
                <div className="changelog-inner"
                     onMouseEnter={() => {
                         console.log("enter!");
                         this.props.updateHoverFlag(true)}
                     }
                     onMouseLeave={() => {
                         console.log("leave!");
                         this.props.updateHoverFlag(false)}
                     }
                >
                    <h2>Version {this.props.version}</h2>
                    <h3>{this.props.headline}</h3>
                    <ul className="changelog-list">
                        {changelist}
                    </ul>
                </div>
            </div>
        );
    }
}