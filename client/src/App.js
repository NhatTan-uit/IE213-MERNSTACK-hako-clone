import { useEffect } from 'react';
import './App.css';
import MyNavBar from './components/contents/MyNavBar/MyNavBar';
import MySideBar from './components/contents/MySideBar/MySideBar';
import { useDataLayerValue } from './DataLayer';
import MyRoutes from './MyRoutes';
import axios from 'axios';


function App() {
  const [{ user, colortoggleState, sidebarState, novelitem }, dispatch] = useDataLayerValue();

  const userid = localStorage.getItem('user');
  const pagecolorid = localStorage.getItem('pagecolor');

  useEffect(() => {
    axios.get(`http://localhost:4000/user/${userid}`)
      .then(res => {
        dispatch({
          type: 'SET_LOGGED_USER',
          user: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
    dispatch({
      type: 'SET_SIDEBARSTATE',
      sidebarState: false,
    });

    if (pagecolorid == "light") {
      dispatch({
        type: 'SET_COLORTOGGLE',
        colortoggleState: false,
      });
    }
    else {
      dispatch({
        type: 'SET_COLORTOGGLE',
        colortoggleState: true,
      });
    }
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
