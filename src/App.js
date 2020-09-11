import React, {Component} from 'react'
import Pictures from './screens/Pictures'
import PicViewer from './screens/PicViewer'
import Test from './screens/Test';

import { Router, Scene } from 'react-native-router-flux'

class App extends Component{
  render(){
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="main"
            component={Pictures}
            title="Pictures"
            hideNavBar={true}
            initital
          />
          <Scene
            key="viewer"
            component={PicViewer}
            title="Foto"
          />
        </Scene>
      </Router>
    );
  }
}

export default App;