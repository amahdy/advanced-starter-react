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