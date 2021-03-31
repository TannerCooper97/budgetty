import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
//import connect and action creator
import { connect } from 'react-redux';
import {requestUserData} from './../../ducks/userReducer';
//Import addpurchase and remove purchase action creators
import {requestBudgetData, addPurchase, removePurchase} from './../../ducks/budgetReducer';


class Budget extends Component {

  componentDidMount(){
    //When the component mounts, the action creator is invoked, the reducer function fires, and state is updated accordingly (In the Redux Store)
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
  // Destructure the Loading Property from the budget object that was mapped to props through mapStateToProps/connect (optional, but cleaner)
    const { loading, purchases, budgetLimit } = this.props.budget;
    const {firstName, lastName} = this.props.user;
    return (
      <Background> 
        {/* We will update the ternary to check either or not the loading property on the budget object is true. if it does, then the loading component should be displayed, otherwise not. */}
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              {/* use props to pass down addPurchase and removePurcahse functions */}
              <AddPurchase addPurchase={this.props.addPurchase}/>
              <DisplayPurchases purchases={purchases} removePurchase={this.props.removePurchase}/>
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit}/>
              <Chart2 purchases={purchases}/>
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

// This function takes in the redux store state and mpas the budget reducer info from the redux store to a budget key on this components's props object
function mapStateToProps(state) {
  return {
    budget: state.budget,
    user: state.user
  }
}

	
// The connect method takes in the mapsStateToProps function and connects this component to the redux store
// In order to access the requestedUserData action creator, you need to connect it to the reducer function through the connect method. The connect method accepts two arguments, a mapStateToProps object, and a mapDispatchToProps ({reuqestUserData}) Object. Our dispatched actions go inside of the seccond argument object as a key/value pair. 
//Add addPurchase and removePurchase to the 2nd object argument in the connect method.
export default connect(mapStateToProps, {requestUserData, requestBudgetData, addPurchase, removePurchase})(Budget);