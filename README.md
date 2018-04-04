# Base Starter for Vaadin components with React

## Prerequisites
First [install npm](https://docs.npmjs.com/getting-started/installing-node).
Then install Bower:
``` bash
$ npm install -g bower
```

## Running the application

You can run the application by issuing the following commands at the root of the project in your terminal window:
``` bash
$ npm install
$ bower install
$ npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Find information on how to perform common tasks in [this guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Recreating this project
This project will continue on the [simple starter app](https://vaadin.com/start/v10-react) made by Vaadin.

We will use some extra elements, so update dependencies first, in `bower.json` and in the `dependencies` section:

```json
  "iron-pages": "PolymerElements/iron-pages#^2.0.0",
  "iron-form": "PolymerElements/iron-form#^2.0.0",
  "iron-ajax": "PolymerElements/iron-ajax#^2.0.0",
```

Then install those new dependencies:

```bash
  $ bower install
```

If the app was running then a restart is required at this point.

Now we need to include all the dependencies, in `public/index.html` update the imports to be:

```html
  <script src="%PUBLIC_URL%/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
  <link rel="import" href="%PUBLIC_URL%/bower_components/iron-pages/iron-pages.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/iron-form/iron-form.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/iron-ajax/iron-ajax.html">

  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-button/vaadin-button.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-text-field/vaadin-text-field.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-text-field/vaadin-text-area.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-checkbox/vaadin-checkbox.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-combo-box/vaadin-combo-box.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-date-picker/vaadin-date-picker.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-tabs/vaadin-tabs.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-grid/vaadin-grid.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-grid/vaadin-grid-filter.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-form-layout/vaadin-form-layout.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-form-layout/vaadin-form-item.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-ordered-layout/vaadin-vertical-layout.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-dialog/vaadin-dialog.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-notification/vaadin-notification.html">

  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-lumo-styles/icons.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-lumo-styles/color.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-lumo-styles/sizing.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-lumo-styles/spacing.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-lumo-styles/style.html">
  <link rel="import" href="%PUBLIC_URL%/bower_components/vaadin-lumo-styles/typography.html">
```

We will also make a slight change in the main app style, in `public/index.html` as well, update the custom style to be:

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

Now inside `App.js` we will construct the html responsible about rendering the app. Delete the content of `<div className="App">` in the return of the `render()` method and replace it by:

An ajax component to make html request:

```html
  <iron-ajax
    id="ajax"
    ref={elem => this.ajax = elem}
    auto
    url="https://demo.vaadin.com/demo-data/1.0/people?count=200"
    handle-as="json">
  </iron-ajax>
```

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
```

Add this method to populate the grid with data once the remote response is received:

```js
  _handleResponse(evt) {
    this.setState({users: JSON.stringify(evt.detail.response.result)});
  }
```

We also need this helper method to bind events:

```js
  componentDidMount() {
    this.ajax.addEventListener("response", this._handleResponse);
    this.tabs.addEventListener("selected-changed", this.pageChanged);
    this.fnField.addEventListener("value-changed", this.onFieldChange);
    this.lnField.addEventListener("value-changed", this.onFieldChange);
  }
```

And this method to listen to filed changes:

```js
  onFieldChange(evt) {
    let state = {};
    state[evt.srcElement.id] = evt.detail.value;
    this.setState(state);
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
```