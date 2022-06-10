export const initialState = {
    novels: [],
    noveltitle: '',
    novelcontent: '',
    authorname: '',
    filterData: []
};

/* state is object attribute, action is for setting its value */
const reducer = (state, action) => {
    console.log(action);

    // Action -> type, [payload]

    switch(action.type){
        case 'SET_SIDEBARSTATE':
            return {
                ...state,
                sidebarState: action.sidebarState,
            }
        case 'SET_COLORTOGGLE':
            return {
                ...state,
                colortoggleState: action.colortoggleState,
            }
        case 'SET_NOVELS_LIST':
            return {
                ...state,
                novels: action.novels,
            }
        case 'SET_NEW_NOVEL_TITLE':
            return {
                ...state,
                noveltitle: action.noveltitle,
            }
        case 'SET_NEW_NOVEL_AUTHOR':
            return {
                ...state,
                authorname: action.authorname
            }
        case 'SET_NEW_NOVEL_CONTENT':
            return {
                ...state,
                novelcontent: action.novelcontent
            }
        case 'SET_LOGGED_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_FILTER_DATA':
            return {
                ...state,
                filterData: action.filterData
            }
        default:
            return state;
    }
}

export default reducer;