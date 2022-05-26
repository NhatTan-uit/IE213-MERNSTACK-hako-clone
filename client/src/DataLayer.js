/* react context api */

import React,{
    createContext,
    useContext,
    useReducer
} from "react";

export const DataLayerContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
);

/* give some time when trying to get the value from DataLayer */
export const useDataLayerValue = () => useContext(DataLayerContext);
