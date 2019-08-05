import React, { useContext, useRef } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(contactContext);
    return (
        <form
            type='text'
            ref={text}
            placeholder='Filter contacts'
            onChange={onChage}
        />
    );
};

export default ContactFilter;
