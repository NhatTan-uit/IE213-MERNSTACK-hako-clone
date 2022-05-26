import { useEffect } from 'react';
import './App.css';
import MyNavBar from './components/contents/MyNavBar/MyNavBar';
import MySideBar from './components/contents/MySideBar/MySideBar';
import { useDataLayerValue } from './DataLayer';
import MyRoutes from './MyRoutes';


function App() {
  const [ { colortoggleState, sidebarState, novelitem } , dispatch ] = useDataLayerValue();

  useEffect(() => {
    dispatch({
      type: 'SET_SIDEBARSTATE',
      sidebarState: false,
    });
    dispatch({
      type: 'SET_COLORTOGGLE',
      colortoggleState: false,
    });
  }, [])

  return (
    <div className="App">
      <MyNavBar />
      <MySideBar />
      <MyRoutes />
    </div>
  );
}

export default App;
