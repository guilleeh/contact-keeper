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
                id: 2,
                name: 'Jane V',
                email: 'j@g.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Jae V',
                email: 'f@g.com',
                phone: '111-111-1111',
                type: 'professional'
            },
            {
                id: 4,
                name: 'Jne V',
                email: 'j@g.com',
                phone: '111-111-1111',
                type: 'personal'
            }
        ],
        current: null //When we click edit, we will put the contact here
    };

    const [state, dispatch] = useReducer(contactReducer, intialState);

    // Add contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    // Delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    // Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Update Contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };
    // Filter contacts

    // Clear filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
