import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

const Toggable = (props) => {
    const [ visible, setVisible ] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => setVisible(!visible);

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button primary onClick={toggleVisibility}>
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button secondary onClick={toggleVisibility}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default Toggable;
