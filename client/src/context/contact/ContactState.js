import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const intialState = {
        contacts: [
            {
                id: 1,
                name: 'Jane V',
                email: 'j@g.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 1,
                name: 'Jane V',
                email: 'j@g.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Jae V',
                email: 'f@g.com',
                phone: '111-111-1111',
                type: 'professional'
            },
            {
                id: 3,
                name: 'Jne V',
                email: 'j@g.com',
                phone: '111-111-1111',
                type: 'personal'
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, intialState);

    // Add contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    // Delete contact

    // Set current contact

    // Clear current contact

    // Update Contact

    // Filter contacts

    // Clear filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
