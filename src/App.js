import React, {Component} from 'react'
import Pictures from './screens/Pictures'
import PicViewer from './screens/PicViewer'
import Test from './screens/Test';
import {prepareFolder} from './services/storage_manager'

import { Router, Scene } from 'react-native-router-flux'

class App extends Component{
  constructor(props){
    super(props)
    prepareFolder()
  }

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