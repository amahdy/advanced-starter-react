# Base Starter for Vaadin components with React

## Prerequisites
Install [yarn](https://yarnpkg.com/docs/install).

## Running the application

You can run the application by issuing the following commands at the root of the project in your terminal window:
``` bash
$ yarn install
$ yarn start
```

## Recreating this project
This project will continue on the [simple starter app](https://vaadin.com/start/v10-react) made by Vaadin.

We will use some extra Vaadin components and iron elements, to install them:

```bash
  yarn add @polymer/iron-pages
  yarn add @polymer/iron-form
  yarn add @vaadin/vaadin-core
```

Now we need to include all the dependencies. In `src/App.js` update the imports to include:

```js
  import '@polymer/iron-pages';
  import '@polymer/iron-form';
  import '@vaadin/vaadin-core';
```

We will also make a slight change in the main app style, in `public/index.html`, update the custom style to be:

```html
  <custom-style>
    <style include="lumo-color lumo-typography">
      html {
        background-color: hsla(214, 57%, 24%, 0.1);
      }
    </style>
  </custom-style>
```

And a component specific style with few `lumo` theme variables, in `index.css` add:

```css
  .card {
    width: 70%;
    margin: var(--lumo-space-m);
    padding: var(--lumo-space-m);
    border-radius: var(--lumo-border-radius);
    background-color: var(--lumo-base-color);
    box-shadow: var(--lumo-box-shadow-s);
  }
```

Let's also create some data types to be used by the application:

Create `Address.js` as following:

```js
  import { Component } from 'react';

  class Address extends Component {
    constructor(props) {
      super(props);

      this.street = '';
      this.city = '';
      this.state = '';
      this.zip = '';
      this.country = '';
      this.phone = '';
    }
  }

  export default Address;
```

And create `Person.js` as:

```js
  import { Component } from 'react';
  import Address from './Address';

  class Person extends Component {
    constructor(props) {
      super(props);

      this.firstName = '';
      this.LastName = '';
      this.address = new Address();
      this.email = '';
    }
  }

  export default Person;
```

Now inside `App.js` we will construct the html responsible about rendering the app. Delete the content of `<div className="App">` in the return of the `render()` method and replace it by:

A tabbed component to display two tabs:

```html
  <vaadin-tabs
    id="tabs"
    selected={this.state.selectedPage}
    ref={elem => this.tabs = elem}>
    <vaadin-tab>All Contacts</vaadin-tab>
    <vaadin-tab>Add New</vaadin-tab>
  </vaadin-tabs>
```

A component to render multiple pages for tabs:

```html
  <iron-pages selected={this.state.selectedPage}>

  <div class="card">
  …
  </div>
  <div class="card">
  …
  </div>

  </iron-pages>
```

Here we note that the `selected` page is associated with the same variable as `vaadin-tabs`, so changing `selectedPage` value is enough to change the page.
We have two `div` holding cards, those are going to be the two pages of our component as following:

A grid to hold the data:

```html
  <vaadin-grid
    id="grid"
    items={this.state.users}
    selectedItems={this.state.selectedUsers}
    ref={elem => this.grid = elem}>
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
```

Note the usage of `Template`, which is an external function that helps rendering `<template>`. This function is defined as following:

```js
  // Helper function to deal with templates
  function Template({ children, ...attrs }) {
    return (
      <template
        {...attrs}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );
  }
```

And can be placed anywhere outside the component itself. At the end of the `App.js` for example.

A responsive form for data entry with validation:

```html
  <iron-form id="form" ref={elem => this.form = elem}>
    <form>
      <vaadin-form-layout>

        <vaadin-form-item>
          <label slot="label">First Name</label>
          <vaadin-text-field
            id="firstName"
            ref={elem => this.firstName = elem}
            value={this.state.newUser.firstName}
            required error-message="Please enter first name" class="full-width">
          </vaadin-text-field>
        </vaadin-form-item>

        <vaadin-form-item>
          <label slot="label">Last Name</label>
          <vaadin-text-field
            id="lastName"
            ref={elem => this.lastName = elem}
            value={this.state.newUser.lastName}
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
```

We also place a notification components to notify the user about the status of the data entry:

```html
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
```

And a dialog component to pop up when clicked on the `terms and conditions` link:

```html
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
```

Now to update the application logic:

First in the `constructor` define few variables and methods that we will use:

```js
  this.langauges = JSON.stringify(["Dutch", "English", "French"]);

  this.state = {
    selectedPage: 0,
    users: JSON.stringify([new Person()]),
    selectedUsers: JSON.stringify([new Person()]),
    newUser: new Person()
  };

  this.pageChanged = this.pageChanged.bind(this);
  this.onFieldChange = this.onFieldChange.bind(this);
  this.toggleDialog = this.toggleDialog.bind(this);
  this.submitForm = this.submitForm.bind(this);
```

We also need this helper method to bind events as well as fetch data from the server to be displayed in the grid:

```js
  componentDidMount() {
    this.tabs.addEventListener("selected-changed", this.pageChanged);
    this.firstName.addEventListener("value-changed", this.onFieldChange);
    this.lastName.addEventListener("value-changed", this.onFieldChange);

    fetch("https://demo.vaadin.com/demo-data/1.0/people?count=200")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: JSON.stringify(result.result)
          });
        },
        (error) => {
          // Handle Error
        }
      );
  }
```

And this method to listen to filed changes:

```js
  onFieldChange(evt) {
    let state = this.state.newUser;
    state[evt.srcElement.id] = evt.detail.value;
    this.setState({newUser: state});
  }
```

This method updates the `selectedPage` variable when tabs are toggeled:

```js
  pageChanged(evt) {
    this.setState({selectedPage: evt.detail.value});
  }
```

This method toggles the dialog when the link is clicked:

```js
  toggleDialog() {
    this.dialog.opened = !this.dialog.opened;
  }
```

And this function will process the form submission. First make sure that it’s valid, if so then inserts the new item in the grid, select it, and switch back to the grid view with a success notification. Otherwise error notification is shown and validation errors are hilighted:

```js
  submitForm() {
    if (this.form.validate()) {
      this.successNotify.opened = true;
      this.grid.items.unshift(this.state.newUser);
      this.grid.selectedItems = [];
      this.grid.selectItem(this.state.newUser);
      this.grid.clearCache();
      this.setState({newUser: new Person()});
      this.setState({selectedPage: 0}); // Go back
    } else {
      this.invalidNotify.opened = true;
    }
  }
```
