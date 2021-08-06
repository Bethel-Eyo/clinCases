import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Cases from '../src/screens/Cases';
import { mockCasesData, mockIncidenceData } from '../src/config/constants';
import '@testing-library/jest-native/extend-expect';
import {render} from '@testing-library/react-native';
import {FlatList} from 'react-native';
import Incidences from '../src/screens/Incidences';

// Cases
describe('Testing that cases are correctly displayed for Munich', () => {
  test('Basic test to ensure everything works', () => {
    const {getByTestId} = render(<Cases cases={mockCasesData} />);

    expect(getByTestId('test-text')).toHaveTextContent('showing cases');
  });

  test('Test Cases Flatlist has correct data', () => {
    const casesRenderer = renderer.create(<Cases cases={mockCasesData} />);
    const caseInstance = casesRenderer.root;
    expect(caseInstance.findByType(FlatList).props.data).toEqual(mockCasesData);
  });

  test('Test that first item on the cases list displays correctly', () => {
    const {getByTestId} = render(<Cases cases={mockCasesData} />);
    expect(getByTestId('list-row-0'));
  });

  test('Test that last item on the cases list displays correctly', () => {
    const {getByTestId} = render(<Cases cases={mockCasesData} />);
    let lastIndex = mockCasesData.length - 1;
    expect(getByTestId(`list-row-${lastIndex}`));
  });
});

// Incidences
describe('Testing that incidences are correctly displayed for Munich', () => {
  test('Test Incidence Flatlist has correct data', () => {
    const incidenceRenderer = renderer.create(<Incidences incidences={mockIncidenceData} />);
    const incidenceInstance = incidenceRenderer.root;
    expect(incidenceInstance.findByType(FlatList).props.data).toEqual(mockIncidenceData);
  });

  test('Test that first item on the incidence list displays correctly', () => {
    const {getByTestId} = render(<Incidences incidences={mockIncidenceData} />);
    expect(getByTestId('list-row-0'));
  });

  test('Test that last item on the incidence list displays correctly', () => {
    const {getByTestId} = render(<Incidences incidences={mockIncidenceData} />);
    let lastIndex = mockIncidenceData.length - 1;
    expect(getByTestId(`list-row-${lastIndex}`));
  });
});
