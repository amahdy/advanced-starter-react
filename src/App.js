import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.langauges = JSON.stringify(["Dutch", "English", "French"]);

    this.state = {
      users: JSON.stringify([{}]),
      selectedPage: 0,
      fnField: "",
      lnField: "",
    };

    this._handleResponse = this._handleResponse.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  _handleResponse(evt) {
    this.setState({users: JSON.stringify(evt.detail.response.result)});
  }

  componentDidMount() {
    this.ajax.addEventListener("response", this._handleResponse);
    this.tabs.addEventListener("selected-changed", this.pageChanged);
    this.fnField.addEventListener("value-changed", this.onFieldChange);
    this.lnField.addEventListener("value-changed", this.onFieldChange);
  }

  pageChanged(evt) {
    this.setState({selectedPage: evt.detail.value});
  }

  onFieldChange(evt) {
    let state = {};
    state[evt.srcElement.id] = evt.detail.value;
    this.setState(state);
  }

  toggleDialog() {
    this.dialog.opened = !this.dialog.opened;
  }

  submitForm() {
    if (this.form.validate()) {
      this.successNotify.opened = true;
      this.setState({formSubmittedOpen: true});
      this.grid.items.unshift({
        firstName: this.state.fnField,
        lastName: this.state.lnField
      });
      this.setState({fnField: ''});
      this.setState({lnField: ''});
      this.grid.selectedItems = [];
      this.grid.clearCache();
      this.grid.selectItem(this.grid.items[0])
      this.setState({selectedPage: 0}); // Go back
    } else {
      this.invalidNotify.opened = true;
    }
  }

  render() {
    return (
      <div className="App">
        <iron-ajax
          id="ajax"
          ref={elem => this.ajax = elem}
          auto
          url="https://demo.vaadin.com/demo-data/1.0/people?count=200"
          handle-as="json">
        </iron-ajax>

        <vaadin-tabs
          id="tabs"
          selected={this.state.selectedPage}
          ref={elem => this.tabs = elem}>
          <vaadin-tab>All Contacts</vaadin-tab>
          <vaadin-tab>Add New</vaadin-tab>
        </vaadin-tabs>

        <iron-pages selected={this.state.selectedPage}>

          <div className="card">
            <vaadin-grid id="grid" items={this.state.users} ref={elem => this.grid = elem}>
              <vaadin-grid-column width="60px" flex-grow="0">
                <Template className="header">{'#'}</Template>
                <Template>{'[[index]]'}</Template>
              </vaadin-grid-column>

              <vaadin-grid-column>
                <Template className="header">
                  {
                    '<vaadin-grid-filter aria-label="First Name" path="firstName" value="{{_filterFirstName}}">' +
                    '  <vaadin-text-field slot="filter" placeholder="First Name" value="{{_filterFirstName}}" focus-target></vaadin-text-field>' +
                    '</vaadin-grid-filter>'
                  }
                </Template>
                <Template>{'[[item.firstName]]'}</Template>
              </vaadin-grid-column>

              <vaadin-grid-column>
                <Template className="header">
                  {
                    '<vaadin-grid-filter aria-label="Last Name" path="lastName" value="[[_filterLastName]]">' +
                    '  <vaadin-text-field slot="filter" placeholder="Last Name" value="{{_filterLastName}}" focus-target></vaadin-text-field>' +
                    '</vaadin-grid-filter>'
                  }
                </Template>
                <Template>{'[[item.lastName]]'}</Template>
              </vaadin-grid-column>

              <vaadin-grid-column width="8em">
                <Template className="header">Address</Template>
                <Template>
                  {'<div style="white-space: normal">[[item.address.street]], [[item.address.city]]</div>'}
                </Template>
              </vaadin-grid-column>
            </vaadin-grid>
          </div>
          <div className="card">
            <iron-form id="form" ref={elem => this.form = elem}>
              <form>
                <vaadin-form-layout>

                  <vaadin-form-item>
                    <label slot="label">First Name</label>
                    <vaadin-text-field
                      id="fnField"
                      ref={elem => this.fnField = elem}
                      value={this.state.fnField}
                      required error-message="Please enter first name" class="full-width">
                    </vaadin-text-field>
                  </vaadin-form-item>

                  <vaadin-form-item>
                    <label slot="label">Last Name</label>
                    <vaadin-text-field
                      id="lnField"
                      ref={elem => this.lnField = elem}
                      value={this.state.lnField}
                      required error-message="Please enter last name" class="full-width"></vaadin-text-field>
                  </vaadin-form-item>

                  <vaadin-form-item>
                    <label slot="label">Birth date</label>
                    <vaadin-date-picker class="full-width"></vaadin-date-picker>
                  </vaadin-form-item>

                  <vaadin-form-item>
                    <label slot="label">Language</label>
                    <vaadin-combo-box class="full-width" items={this.langauges}></vaadin-combo-box>
                  </vaadin-form-item>

                  <vaadin-form-item colspan="2">
                    <label slot="label">Notes</label>
                    <vaadin-text-area class="full-width"></vaadin-text-area>
                  </vaadin-form-item>

                  <vaadin-form-item colspan="2">
                    <vaadin-checkbox>I have read the <a href="" onClick={this.toggleDialog}>terms and conditions</a></vaadin-checkbox>
                  </vaadin-form-item>

                  <vaadin-form-item colspan="2">
                    <vaadin-button onClick={this.submitForm}>Submit</vaadin-button>
                  </vaadin-form-item>

                </vaadin-form-layout>
              </form>
            </iron-form>
          </div>

        </iron-pages>

        <vaadin-notification id="successNotify" duration="4000" ref={elem => this.successNotify = elem}>
          <Template>
            {'A new contact has been added successfully.'}
          </Template>
        </vaadin-notification>

        <vaadin-notification id="invalidNotify" duration="4000" ref={elem => this.invalidNotify = elem}>
          <Template>
            {'Some fields are missing or invalid.'}
          </Template>
        </vaadin-notification>

        <vaadin-dialog id="dialog" no-close-on-esc no-close-on-outside-click ref={elem => this.dialog = elem}>
          <Template>
            {
              '<vaadin-vertical-layout theme="spacing">' +
              '  <div>' +
              '    <h1>The content of dialog</h1>' +
              '    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus magna et orci lacinia maximus. Fusce ut tincidunt ex. Morbi sed vehicula metus. Phasellus vel leo a elit viverra congue. Donec finibus iaculis eros vel vestibulum. Cras vehicula neque enim, eget faucibus ligula tempus vel. Integer felis nisi, sollicitudin at lectus at, bibendum vulputate risus. In ut massa et massa scelerisque viverra.</p>' +
              '  </div>' +
              '  <vaadin-button onClick={this.toggleDialog}>OK</vaadin-button>' +
              '</vaadin-vertical-layout>'
            }
          </Template>
        </vaadin-dialog>
      </div>
    );
  }
}

// Helper function to deal with templates
function Template({ children, ...attrs }) {
  return (
    <template
      {...attrs}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}

export default App;
