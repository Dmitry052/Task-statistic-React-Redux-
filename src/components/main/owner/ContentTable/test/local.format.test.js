import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import lang from './../localFormat';

configure({ adapter: new Adapter() });

describe('Language format', () => {
  const num = 1.23456;
  const pre = 2;
  it('RU', () => {
    expect(lang.set('ru-RU', num, pre).toString()).toBe('1,23');
  });
  it('DE', () => {
    expect(lang.set('de-DE', num, pre).toString()).toBe('1,23');
  });
  it('EN', () => {
    expect(lang.set('en-EN', num, pre).toString()).toBe('1.23');
  });
});
