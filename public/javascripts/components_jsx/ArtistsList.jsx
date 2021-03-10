const Order = {
    DEFAULT: 0,
    ALPHABETIC: 1,
    RANDOM: 2
}

class ArtistsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: Order.RANDOM
        }

        this.changeOrder = this.changeOrder.bind(this);
    }

    changeOrder(state) {
        this.setState({order: state});
    }

    render() {
        if (this.props.artists.size === 0) {
            return null;
        }

        let relatedArray = [...this.props.artists]

        if (this.state.order === Order.ALPHABETIC) {
            relatedArray = relatedArray.sort(((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            }));
        } else if (this.state.order === Order.RANDOM) {
            relatedArray = shuffle(relatedArray);
        }

        const artists = relatedArray.map(artist =>
            <li className={"sidebarListItem"}
                key={artist.id.toString()}
                onClick={() => {this.props.loadArtistFromUI(artist)}}
                onMouseEnter={() => {this.props.updateHoveredArtist(artist)}}
                onMouseLeave={() => {this.props.updateHoveredArtist(null)}}
            >
                {artist.name.toString()}
            </li>
        );


        return (
            <div className={"relatedArtistsSection"}>
                <div className={"artistListHeader"}>
                    <h2>{this.props.header}</h2>
                    <MultiwaySwitch
                        newPosition={this.changeOrder}
                        states={3}
                    />
                </div>
                <ul className={"relatedArtistsList"}>
                    {artists}
                </ul>
            </div>
        )
    }
}