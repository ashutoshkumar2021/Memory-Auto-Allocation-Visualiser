import React, { Component } from 'react';
import uuid from 'uuid';

export default class MemoryIndicator extends Component {

  render() {
    const indicatorStyle = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 20,
      marginTop: 30,
    };

    function bitStyle() {
      return {
        height: 38,
        width: 35,
        border: '0.1px solid black',
        backgroundColor: 'white',
      }
    }

    function MemoryBlock({ allocated, accessing }) {
      let style = bitStyle();
      if (allocated) {
        style = { ...style, backgroundColor: 'green', }
      }
      if (accessing) {
        style = { ...style, borderBottom: '5px solid blue' }
      }

      return <div style={style}/>
    }

    function DividerBlock() {
      const style = { ...bitStyle(), backgroundColor: '#c0c0c0' };

      return <div style={style}/>
    }

    const { chunks } = this.props;

    let bits = [];
    if (chunks) {
      bits = chunks.reduce((acc, chunk) => {
        const bits = chunk.memory.map((mem) => {
          return <MemoryBlock key={uuid()} allocated={mem > 0} accessing={chunk.accessing}/>
        });
        const divider = (<DividerBlock key={uuid()}/>);
        return acc.concat(bits, divider);
      }, []);
    }

    return (
      <div style={indicatorStyle}>
        {bits}
      </div>
    )
  }
}