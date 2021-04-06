class ReactSidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: null,
            genre: null
        }

        this.updateSidebarContent = this.updateSidebarContent.bind(this);
        this.scrollbar = this.scrollbar.bind(this);
        this.undoRedo = this.undoRedo.bind(this);
    }

    updateSidebarContent(artist, genre) {
        if (this.state.artist !== artist || this.state.genre !== genre) {
            this.setState({artist: artist, genre: genre});
        }
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.artist !== nextProps.artist ||
            this.props.genre !== nextProps.genre ||
            this.props.path !== nextProps.path
        );
    }

    scrollbar(colorant) {
        return (
            <style>
                {`::-webkit-scrollbar-track {box-shadow: 0 0 5px ${colorant};}  \n` +
                `::-webkit-scrollbar-thumb {background: ${colorant};`}
            </style>
        )
    }

    undoRedo(colorant) {
        return (
            <UndoRedoComponent
                color={[colorant.r, colorant.g, colorant.b]}
                sidebarState={this.props.sidebarState}
                undoSidebarState={this.props.undoSidebarState}
                redoSidebarState={this.props.redoSidebarState}
            />
        )
    }

    render() {
        if (this.props.path.length > 0) {
            const start = this.props.path[0];
            const end = this.props.path[this.props.path.length - 1];

            return (
                <div className="sidebar sidebar-open"
                     onMouseEnter={() => {this.props.updateHoverFlag(true)}}
                     onMouseLeave={() => {this.props.updateHoverFlag(false)}}
                >

                    {this.scrollbar(start.colorToString())}

                    <SidebarStroke color={start.colorToString()}/>

                    <ArtistProfile artist={start} fontDecrement={3} showPlayer={false} size={"Small"} align={'left'}/>
                    <ArtistProfile artist={end} fontDecrement={3} showPlayer={false} size={"Small"}  align={'right'}/>

                    <div style={{
                        position: 'absolute',
                        width: '440px',
                        height: '200px',
                        boxShadow: '0 20px 10px -10px black',
                        pointerEvents: 'none',
                        zIndex: 4,
                    }}
                    />

                    <HopsList path={this.props.path}
                              loadArtistFromUI={this.props.loadArtistFromUI}
                              updateHoveredArtist={this.props.updateHoveredArtist}
                              header={`Shortest Path`}/>

                    <div className="flexSpacer"/>

                    <div style={{
                        position: 'absolute',
                        width: '440px',
                        height: '90px',
                        boxShadow: '0 -20px 10px -10px black',
                        bottom: 0,
                        pointerEvents: 'none',
                        zIndex: 4,
                    }}
                    />

                    {this.undoRedo(start)}
                </div>
            )
        }

        if (!this.props.artist && !this.props.genre) {
            if (this.state.artist) {
                setTimeout(() => this.setState({artist: null}), 600);

                return (<div className="sidebar sidebar-closed"
                             onMouseEnter={() => {this.props.updateHoverFlag(true)}}
                             onMouseLeave={() => {this.props.updateHoverFlag(false)}}
                        >

                            {this.scrollbar(this.state.artist.colorToString())}

                            <SidebarStroke color={this.state.artist.colorToString()}/>

                            <ArtistProfile artist={this.state.artist} fontDecrement={3} showPlayer={true} size={"Large"} align={'left'}/>


                            <GenresList genres={this.state.artist.genres}
                                        loadGenreFromSearch={this.props.loadGenreFromSearch}
                                        header={"Genres"}
                            />

                            <ArtistsList artists={this.state.artist.relatedVertices}
                                         loadArtistFromUI={this.props.loadArtistFromUI}
                                         updateHoveredArtist={this.props.updateHoveredArtist}
                                         header={"Related Artists"}
                                         color={this.state.artist.colorToString()}
                            />

                            <div className="flexSpacer"/>
                            {this.undoRedo(this.state.artist)}
                        </div>
                );
            }
            if (this.state.genre) {
                return (
                    <div className="sidebar sidebar-closed"
                         onMouseEnter={() => {this.props.updateHoverFlag(true)}}
                         onMouseLeave={() => {this.props.updateHoverFlag(false)}}
                    >

                        {this.scrollbar(this.state.genre.colorToString())}

                        <SidebarStroke color={this.state.genre.colorToString()}/>

                        <GenreProfile genre={this.state.genre} fontDecrement={3}/>

                        <ArtistsList artists={this.state.genre.nodes}
                                     loadArtistFromUI={this.props.loadArtistFromUI}
                                     updateHoveredArtist={this.props.updateHoveredArtist}
                                     header={"Artists in Genre"}
                                     color={this.state.genre.colorToString()}
                        />

                        <div className="flexSpacer"/>
                        {this.undoRedo(this.state.genre)}
                    </div>
                );
            }
            return (<div className="sidebar sidebar-closed"
                         onMouseEnter={() => {this.props.updateHoverFlag(true)}}
                         onMouseLeave={() => {this.props.updateHoverFlag(false)}}
            >
                {this.scrollbar("white")}
                <SidebarStroke color={'white'}/>
            </div>);
        }

        this.updateSidebarContent(this.props.artist, this.props.genre);

        if (this.props.artist) {
            return (
                <div className="sidebar sidebar-open"
                     onMouseEnter={() => {this.props.updateHoverFlag(true)}}
                     onMouseLeave={() => {this.props.updateHoverFlag(false)}}
                >
                    {this.scrollbar(this.props.artist.colorToString())}

                    <SidebarStroke color={this.props.artist.colorToString()}/>

                    <ArtistProfile artist={this.props.artist} fontDecrement={3} showPlayer={true} size={"Large"} align={'left'}/>

                    <GenresList genres={this.props.artist.genres}
                                loadGenreFromSearch={this.props.loadGenreFromSearch}
                                header={"Genres"}
                    />

                    <ArtistsList artists={this.props.artist.relatedVertices}
                                 loadArtistFromUI={this.props.loadArtistFromUI}
                                 updateHoveredArtist={this.props.updateHoveredArtist}
                                 header={"Related Artists"}
                                 color={this.props.artist.colorToString()}
                    />

                    <div className="flexSpacer"/>

                    {this.undoRedo(this.props.artist)}
                </div>
            );
        }

        if (this.props.genre) {
            return (
                <div className="sidebar sidebar-open"
                     onMouseEnter={() => {this.props.updateHoverFlag(true)}}
                     onMouseLeave={() => {this.props.updateHoverFlag(false)}}
                >
                    {this.scrollbar(this.props.genre.colorToString())}

                    <SidebarStroke color={this.props.genre.colorToString()}/>

                    <GenreProfile genre={this.props.genre} fontDecrement={3}/>

                    <ArtistsList artists={this.props.genre.nodes}
                                 loadArtistFromUI={this.props.loadArtistFromUI}
                                 updateHoveredArtist={this.props.updateHoveredArtist}
                                 header={"Artists in Genre"}
                                 color={this.props.genre.colorToString()}
                    />

                    <div className="flexSpacer"/>

                    {this.undoRedo(this.props.genre)}
                </div>
            );
        }
    }
}