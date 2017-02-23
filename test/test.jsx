import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Todo from '../src/components/Todo';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Todo components common features', function() {
  const todos = [
    { name: 'Todo', component: Todo }
  ];

  todos.forEach(function({ name, component: Todo }) {

    describe(`<${name} />`, function() {

      it('Renders children', function() {
        const wrapper = shallow(
          <div>
            {}
          </div>
        );

        expect(wrapper).to.have.exactly(2).descendants('.item');
      });

      it('Can change tag name', function() {
        const wrapper = shallow(
          {}
        );

        expect(wrapper).to.have.tagName('ul');
      });

    });

  });
});
