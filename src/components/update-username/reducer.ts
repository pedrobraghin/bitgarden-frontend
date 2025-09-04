type State = {
  username: string;
  isAvailable: boolean | null;
  isUpdated: boolean;
  error: string | null;
  loading: boolean;
};

type Action =
    | { type: 'SET_USERNAME'; payload: string }
    | { type: 'SET_AVAILABLE'; payload: boolean | null }
    | { type: 'SET_UPDATED'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'RESET_FEEDBACK' };

export const initialState: State = {
  username: '',
  isAvailable: null,
  isUpdated: false,
  error: null,
  loading: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_AVAILABLE':
      return { ...state, isAvailable: action.payload };
    case 'SET_UPDATED':
      return { ...state, isUpdated: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'RESET_FEEDBACK':
      return { ...state, isUpdated: false, error: null };
    default:
      return state;
  }
}