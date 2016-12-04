const REQUEST = 'app-boilerplate/subject/REQUEST';
const SUCCESS = 'app-boilerplate/subject/SUCCESS';
const FAILURE = 'app-boilerplate/subject/FAILURE';

const initialState = {
  isLoading: false,
  isLoaded: false,
  loadError: false,
  items: []
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SUCCESS:
      return {
        ...state,
        loadError: false,
        isLoading: false,
        isLoaded: true,
        items: action.result
      };
    case FAILURE:
      return {
        ...state,
        loadError: true,
        isLoading: false,
        isLoaded: false
      };
    default:
      return state;
  }
};

export const isLoaded = (globalState) => globalState.subject && globalState.subject.isLoaded;

export const loadSubjects = (params = '?age=50') => ({
  types: [REQUEST, SUCCESS, FAILURE],
  promise: (client) => client.get(`/subjects${params}`)
});

export default reducer;
