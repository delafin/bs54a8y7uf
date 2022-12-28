import { createContext, useReducer, type Dispatch } from 'react';
import { undefined } from 'zod';

const initialState: AppState = {
// const initialState = {
	condition: 'idle',
	counter: 2,
	users: [
	],
};
type Users = {
	id: number;
	name: string;
	email: string;
	phone: string;
	position: string;
	position_id: number;
	registration_timestamp: number;
	photo: string;
};
type AppState = {
	condition: 'idle' | 'loading' | 'error' | 'sending' ;
	counter: number;
	users: Users[];
};
type Action = { type: 'LOADING' } | { type: 'LOADED'; payload: Users[]} | { type: 'LOADED_EXTRA'; payload: Users[]} | { type: 'ERROR' } | { type: 'SENDING' } | { type: 'INC' };
type Prop = {
	children: React.ReactNode;
};

const dataContext = createContext<{
	store: AppState;
	dispatchStore: Dispatch<Action>;
}>({
	store: initialState,
	// eslint-disable-next-line
	dispatchStore: () => {}
});

// type Reducer<S, A> = (prevState: S, action: A) => S; //
function reducer(state: AppState, action: Action):AppState {
	switch (action.type) {
		case 'LOADING':
			return { ...state, condition: 'loading' };
		case 'LOADED':
			return { ...state, condition: 'idle', users: action.payload };
		case 'LOADED_EXTRA':
			return { ...state, condition: 'idle', users: [...state.users, ...action.payload] };
		case 'ERROR':
			return { ...state, condition: 'error' };	
		case 'SENDING':
			return { ...state, condition: 'sending' };
		case 'INC':
			return { ...state, counter: state.counter + 1 };
		default:
			// throw new Error();
			return state;
	}
}
// type ReducerState = typeof reducer;

function ContextProvider({ children }: Prop) {

	const [store, dispatchStore] = useReducer(reducer, initialState); //, lazyInit)

	const { Provider } = dataContext;

	return <Provider value={{ store, dispatchStore }}>{children}</Provider>;
}
export { dataContext, ContextProvider };
