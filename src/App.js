import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {signInWithYolo} from './actions/SignInActions'
import {signIn} from "./actions/SignInActions";
import {auth} from "./fire";
import {connect} from "react-redux";

class App extends Component {

	signOut() {
		auth.signOut()
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}


  render() {
	let { signedIn, userData } = this.props.user;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
			{ signedIn && <h1 className="App-title">Welcome {userData.name.split(" ")[1]} </h1>}
			{ !signedIn && <h1 className="App-title">SignIn with yollo </h1>}
        </header>
        <p className="App-intro">
         Passwordless authentication
        </p>
		  { signedIn && <img src={userData.picture} />}
		  <br/>
		  { signedIn && <h2>{userData.name}</h2>}
		  { signedIn && <h5>{userData.email}</h5>}

		  { signedIn && <button onClick={this.signOut}>signOut</button> }

      </div>
    );
  }
}

function mapStateToProps(state) {
	return {user: state.signInReducer};
}

const mapActionsToProps = {};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(App);

