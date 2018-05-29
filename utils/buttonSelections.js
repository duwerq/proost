import React, {Component} from 'react';
import {ButtonGroup} from 'react-native-elements';

export default class ButtonSelections extends Component {
  state = {
    selectedIndex: 0
  }

  updateIndex = (selectedIndex) => {
    const {select, buttons} = this.props;
    this.setState({selectedIndex}, () => select(buttons[selectedIndex]))
  }

  render () {
    const buttons = this.props.buttons;
    const { selectedIndex } = this.state
    
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 50, width: '100%', marginLeft: 0, marginRight: 0, borderRadius: 10}}
      />
    )
  }
}