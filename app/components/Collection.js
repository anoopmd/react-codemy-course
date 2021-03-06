/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

import React from 'react';
import Contact from './Contact';
import { observer } from 'mobx-react';

@observer(['contacts'])
class Collection extends React.Component {
  addContact = (e) => {
    e.preventDefault();

    const contacts = this.props.contacts.all.slice();
    const newId = contacts[contacts.length - 1].id + 1;

    this.props.contacts.add({
      id: newId,
      name: this.refs.name.value,
      email: this.refs.email.value
    });

    this.refs.name.value = null;
    this.refs.email.value = null;
  }

  newContact = () =>
    <div className="pure-g">
      <div className="pure-u-12-24">
        <form className="pure-form" onSubmit={this.addContact}>
          <fieldset>
            <legend>New Contact</legend>
            <input ref="email" type='email' placeholder="Email"></input>
            <input ref="name" type='text' placeholder="Name"></input>
            <button type="submit" className="pure-button pure-button-primary">Add</button>
          </fieldset>
        </form>
      </div>
    </div>;

  render() {
    return (
      <div id="Collection">
        {this.newContact()}
        <div className="pure-g">
          {this.props.contacts.all.slice().map(info => <Contact key={info.id} {...info}/>)}
        </div>
      </div>
    );
  }
}

export default Collection;
