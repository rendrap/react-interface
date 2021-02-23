import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
// import { without } from 'lodash';

class App extends Component {

  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  };


  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  };

  deleteAppointment(apt) {
    let temptApts = this.state.myAppointments;
    // temptApts = without(temptApts, apt);                     // 'without' method require lodash
    temptApts = temptApts.filter(t => t.aptId !== apt.aptId); // wothout lodash

    this.setState({
      myAppointments: temptApts
    });
  };

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 })
          return item;
        })

        this.setState({
          myAppointments: apts

        });

      });

  };

  render() {

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
