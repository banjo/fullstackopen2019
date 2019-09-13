import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
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
