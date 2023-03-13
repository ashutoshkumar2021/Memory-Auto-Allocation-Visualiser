import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import './ParameterInput.css';
import { Button } from "reactstrap";

export default class ParameterInputs extends Component {
  static isNormalInteger(str) {
    const n = Math.floor(Number(str));
    return n !== Infinity && n > 0;
  }

  constructor(props) {
    super();
    this.state = {
      chunks: props.defaultChunks || [],
      sizes: props.defaultSizes || [],
      error: '',
    }
  }

  toIntList(list, type) {
    return list.reduce((list, element) => {
      if (ParameterInputs.isNormalInteger(element)) {
        this.setState({error: ''});
        return list.concat(Number(element));
      } else {
        this.setState({error: type});
        return list;
      }
    }, []);
  }

  addChunks = (chunks) => {
    const intChunks = this.toIntList(chunks, 'chunk');
    this.setState({ chunks: intChunks });
    this.props.setChunks(intChunks);
  };

  addSizes = (sizes) => {
    const intSizes = this.toIntList(sizes, 'size');
    this.setState({ sizes: intSizes });
    this.props.setSizes(intSizes);
  };

  reset() {
    const { chunks, sizes } = this.state;
    this.props.setChunks(chunks);
    this.props.setSizes(sizes);
  }

  setToDefaults() {
    const { defaultChunks, defaultSizes } = this.props;
    this.setState({ chunks: defaultChunks, sizes: defaultSizes });
    this.props.setChunksAndSizes(defaultChunks, defaultSizes);
  }

  render() {
    const { auto } = this.props;
    const { chunks, sizes, error } = this.state;
    const chunkPlaceholder = error === 'chunk'
      ? 'Enter a positive integer!'
      : 'Enter chunks';
    const sizePlaceholder = error === 'size'
      ? 'Enter a positive integer!'
      : 'Enter sizes';

    const style = {
      marginLeft: '20px',
      display: 'flex',
      flexWrap: 'wrap',
    };

    return (
      <div style={style}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <TagsInput
            value={chunks}
            onChange={this.addChunks}
            inputProps={{
              placeholder: chunkPlaceholder
            }}
          />
          <TagsInput
            value={sizes}
            onChange={this.addSizes}
            inputProps={{
              placeholder: sizePlaceholder
            }}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {!auto &&
          <div style={{ display: 'flex', flexWrap: 'no-wrap' }}>
            <Button
              onClick={() => {
                this.props.startAutoAllocation()
              }}
              style={{ margin: '5px',color: 'white' }}
            >AUTO ALLOCATE</Button>
            <Button
              onClick={() => {
                this.props.doAlgorithmStep()
              }}
              style={{ margin: '5px' }}
            >STEP ALLOCATE</Button>
          </div>
          }
          <Button
            onClick={() => {
              this.reset()
            }}
            style={{ margin: '5px' }}
          >RESET</Button>
          <Button
            onClick={() => {
              this.setToDefaults()
            }}
            style={{ margin: '5px' }}
          >SET TO DEFAULTS</Button>
        </div>
      </div>
    )
  }
}