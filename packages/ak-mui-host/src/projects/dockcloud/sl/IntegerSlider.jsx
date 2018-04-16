
import React from 'react'
import ui from './../../../common/baseui'
const { Slider, InputNumber, Row, Col }  = ui ;

export default class IntegerSlider extends React.Component {
  

  state = {
    inputValue: 20,
  }
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }
  render() {
    return (
      <Row>
        <Col span={12}>
          <Slider min={this.props.min} max={this.props.max} onChange={this.onChange} value={this.state.inputValue} />
        </Col>
        <Col span={4}>
          <InputNumber
            min={this.props.min}
            max={this.props.max}
            style={{ marginLeft: 16 }}
            value={this.state.inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}