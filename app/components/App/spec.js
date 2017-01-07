import React from 'react';
import App from './';

describe('App component', () => {
  let component;
  
  beforeEach(() => {
    component = shallow(
      <App />
    );
  });

  it('renders the component wrapper', () => {
   expect(component.find('h1')).to.be.present();
  });
});
