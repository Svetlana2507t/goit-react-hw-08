import { add, del, filter } from './actions';

const initialState = {
  contacts: {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  },
  filters: {
    name: '',
  },
};

//BLL
export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case add.type: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          items: [...state.contacts.items, action.payload],
        },
      };
    }

    case del.type: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          items: state.contacts.items.filter(
            item => item.id !== action.payload
          ),
        },
      };
    }

    case filter.type: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          items: state.contacts.items.filter(item =>
            item.name.toLowerCase().includes(action.payload.toLowerCase())
          ),
        },
      };
    }

    default:
      return state;
  }
};
