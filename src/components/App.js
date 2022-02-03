import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import {handleInitialData} from "../actions/shared"
import NewQuestion from './NewQuestion'
import SignIn from './SignIn'
import QuestionsContainer from './QuestionsContainer'
import NavBar from './NavBar'
import LeaderBoard from './LeaderBoard'
import Question from './Question'
import NotFound from './NotFound'
import  LoadingBar  from 'react-redux-loading-bar'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <LoadingBar style={{ backgroundColor:"hsl(192, 94%, 30%)", height: '4px', position: "absolute" }}/>
        {authedUser.authed !== null && authedUser.authed !== undefined ?
        (  <Switch>
            <Route exact path="/would-you-rather-starter/">
              <NavBar />
              <QuestionsContainer />
            </Route>

            <Route exact path="/would-you-rather-starter/questions/:question_id">
              <NavBar />
              <Question />
            </Route>

            <Route exact path="/would-you-rather-starter/leaderboard">
              <NavBar />
              <LeaderBoard />
            </Route>

            <Route exact path="/would-you-rather-starter/add">
              <NavBar />
              <NewQuestion />
            </Route>

            <Route >
              <NavBar />
              <NotFound />
            </Route>

          </Switch>): (
            <Switch>
              <Route  path="/would-you-rather-starter/">
                <SignIn />
              </Route>
            </Switch>
          )
        }
      </Router>
    )
  }
}

function mapStateToProps( {authedUser} ){
  return {authedUser}
}
export default connect(mapStateToProps)(App) 