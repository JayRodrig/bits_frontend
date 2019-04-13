// NPM MODULES
import React, {Component} from 'react';
import axios from 'axios';

// COMPONENTS
import NavBar from '../components/navbar';
import AuthContext from '../contexts/auth_context';

export default class SearchPage extends Component {
    state= {
        loggedIn: null,
        queryResults: [],
    }

    static contextType = AuthContext;

    componentDidMount = () => {
        setTimeout(() => {
            this.loadUserData();
            this.loadSearchData();
        }, 1000);
    }

    componentWillReceiveProps = () => {
        setTimeout(() => {
            this.loadUserData();
            this.loadSearchData();
        }, 1000);
    }

    loadUserData = async () => {
        if (this.context.user) {
            try {
                const userObj = await axios.get(`http://bits-backend.herokuapp.com/user/id/${this.context.user.uid}`);
                const {data: loggedIn} = userObj;
                this.setState((state) => ({
                    loggedIn,
                }));
            } catch(err) {
                console.log(err);
            }
        }
    }

    loadSearchData = async () => {
        const {searchquery: searchQuery} = this.props.match.params;
        const allUsersCall = await axios.get(`http://bits-backend.herokuapp.com/user/`);
        let results = [];
        let allUsers = [];
        const {data,} = allUsersCall.data;
        for (let user of data) {
            allUsers.push({
                id: user.id,
                username: user.username,
                avatar: user.avatar,
                first_name: user.first_name,
                last_name: user.last_name,
            });
        }
        
        for (let user of allUsers) {
            if (user.username.includes(searchQuery)) {
                results.push(user);
            }
        }

        this.setState((state) => ({
            queryResults: state.queryResults.concat(results),
        }));
    }

    showProfile = userName => this.props.history.push(`/profile/${userName}`);

    handleUserClick = e => this.showProfile(e.target.innerText);

    submitSearch = searchQuery => this.props.history.push(`/searchpage/${searchQuery}`);

    render() {
        return(
            <>
                <NavBar showProfile={this.showProfile} user={this.state.loggedIn} submitSearch={this.submitSearch} historyObj={this.props.history} />
                <div className='container mt-5 mb-5'>
                    <div className='row' style={{justifyContent: 'center'}}>
                        <div className='col-6 balsamiq-bold vertically-al text-center' style={{height: '10vh'}}>
                            <span style={{fontSize: 32}}>Search Results for {this.props.match.params.searchquery}...</span>
                        </div>
                    </div>

                    <div className='row mt-5 mb-5'>
                        {
                            this.state.queryResults.map((e, i) => {
                                return(
                                    <div className='col-12 theme-border mb-5 no-backg' key={i}>
                                        <div className='row p-1'>
                                            <img className='col-2 search-user-pic theme-border ml-2 mt-1' alt='avatar' src={e.avatar} />
                                            <div className='col-2'> 
                                                <span className='balsamiq-bold' style={{fontSize: 18, display:'inline-block', cursor: 'pointer'}}
                                                    onClick={this.handleUserClick}>{e.username}</span>
                                                <span className='balsamiq-reg' style={{fontSize: 18, display:'inline-block'}}>{e.first_name} {e.last_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}