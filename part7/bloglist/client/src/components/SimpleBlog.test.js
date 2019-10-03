import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

test('renders all content', () => {
    const blog = {
        title  : 'google',
        author : 'jafar',
        likes  : 2
    };

    const component = render(<SimpleBlog blog={blog} />);

    expect(component.container).toHaveTextContent('google');
    expect(component.container).toHaveTextContent('jafar');
    expect(component.container).toHaveTextContent('2');
});

test('Click button twice', () => {
    const blog = {
        title  : 'google',
        author : 'jafar',
        likes  : 2
    };

    const mockHandler = jest.fn();

    const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

    const button = getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
});
