import React, { Component } from 'react';
import * as _ from 'lodash';

import ParameterInputs from "../ParameterInputs";
import Algorithm from "../Algorithm";


export default class Visualization extends Component {

  constructor() {
    super();

    this.state = {
      chunks: [],
      sizes: [],
    };

    this.defaultChunks = [ 10, 20, 30, 50, 10 ];
    this.defaultSizes = [ 1, 2, 3, 25, 20 ];
  }

  componentDidMount() {
    this.init(this.defaultChunks, this.defaultSizes);
  }

  init(chunks, sizes) {
    const chunkStructure = this.setChunks(chunks);
    const sizesStructure = this.setSizes(sizes);
    this.initAlgorithms(chunkStructure, sizesStructure);
  }

  setChunks(rawChunks) {
    const { sizes } = this.state;
    const chunks = rawChunks.map((chunk) => {
      return {
        size: chunk,
        free: chunk,
        memory: new Array(chunk).fill(0),
        accessing: false,
      }
    });
    console.log(rawChunks);
    this.setState({ chunks, rawChunks });
    this.initAlgorithms(chunks, sizes);
    return chunks;
  }

  setSizes(rawSizes) {
    const { chunks } = this.state;
    const sizes = rawSizes.map((size, idx) => {
      return {
        id: idx + 1,
        size: size,
        allocated: false,
      }
    });
    this.setState({ sizes, rawSizes });
    this.initAlgorithms(chunks, sizes);
    return sizes;
  }

  setChunksAndSizes(rawChunks, rawSizes) {
    const chunks = rawChunks.map((chunk) => {
      return {
        size: chunk,
        free: chunk,
        memory: new Array(chunk).fill(0),
        accessing: false,
      }
    });
    const sizes = rawSizes.map((size, idx) => {
      return {
        id: idx + 1,
        size: size,
        allocated: false,
      }
    });
    this.setState({ chunks, rawChunks, sizes, rawSizes });
    this.initAlgorithms(chunks, sizes);
  }

  initAlgorithms(chunks, sizes) {
    this.stopAutoAllocation();
    const structure = { chunks, sizes };
    console.trace(structure);
    this.setState({
      firstFit: _.cloneDeep(structure),
      bestFit: _.cloneDeep(structure),
      worstFit: _.cloneDeep(structure),
      nextFit: _.cloneDeep(structure),
      drawGraph: false,
    })
  }

  startAutoAllocation() {
    const auto = setInterval(() => {
      this.doAlgorithmStep()
    }, 800);

    this.setState({ auto })
  }

  stopAutoAllocation() {
    clearInterval(this.state.auto);
    this.setState({ auto: null });
  }

  doAlgorithmStep() {
    const { firstFit, bestFit, worstFit, nextFit } = this.state;

    const newFirstFit = this.nextFirstFitStep(firstFit);
    const newBestFit = this.nextBestFitStep(bestFit);
    const newWorstFit = this.nextWorstFitStep(worstFit);

    const newNextFit = this.nextNextFitStep(nextFit);


    this.setState({
      firstFit: newFirstFit,
      bestFit: newBestFit,
      worstFit: newWorstFit,
      nextFit: newNextFit,
      drawGraph: true,
    });
  }

  fillMemory(memory, content, size) {
    const start = memory.indexOf(0);
    return memory.fill(content, start, start + size);
  }

  nextFirstFitStep(state) {
    const { chunks, sizes, error, chunkIdx = 0, sizeIdx = 0, step = 'access' } = state;

    const size = sizes[ sizeIdx ];
    const chunk = chunks[ chunkIdx ];

    const newChunks = chunks.map((c, idx) => {
      if (chunkIdx === idx) {
        return { ...c, accessing: true }
      } else {
        return { ...c, accessing: false }
      }
    });

    if (size && chunk) {
      if (step === 'alloc') {
        chunk.memory = this.fillMemory(chunk.memory, size.id, size.size);
        chunk.free -= size.size;
        newChunks[ chunkIdx ] = chunk;
        return { ...state, chunkIdx: 0, sizeIdx: sizeIdx + 1, chunks: newChunks, step: 'access' };
      } else {
        if (chunk.free >= size.size) {
          return { ...state, chunks: newChunks, step: 'alloc' }
        } else {
          return { ...state, chunkIdx: chunkIdx + 1, chunks: newChunks, step: 'access' };
        }
      }
    } else if (!chunk && size) {
      return { ...state, chunks: newChunks, error: true, sizeIdx: -1, chunkIdx: -1 }
    } else if (error) {
      return { ...state, chunks: newChunks }
    } else {
      return { ...state, chunks: newChunks, done: true, sizeIdx: -1, chunkIdx: -1 }
    }
  }

  nextBestFitStep(state) {
    const { chunks, sizes, error, chunkIdx = 0, sizeIdx = 0, bestFit } = state;

    const size = sizes[ sizeIdx ];
    const chunk = chunks[ chunkIdx ];

    const newChunks = chunks.map((c, idx) => {
      if (chunkIdx === idx) {
        return { ...c, accessing: true }
      } else {
        return { ...c, accessing: false }
      }
    });

    if (size && chunk) {
      if (chunk.free >= size.size) {
        if (!bestFit || (bestFit && bestFit.size >= chunk.free)) {
          return { ...state, chunkIdx: chunkIdx + 1, chunks: newChunks, bestFit: { idx: chunkIdx, size: chunk.free } }
        }
        return { ...state, chunkIdx: chunkIdx + 1, chunks: newChunks }
      } else {
        return { ...state, chunkIdx: chunkIdx + 1, chunks: newChunks };
      }
    } else if (!chunk && bestFit && size) {
      const chunkIdx = bestFit.idx;
      const chunk = chunks[ chunkIdx ];
      chunk.memory = this.fillMemory(chunk.memory, size.id, size.size);
      chunk.free -= size.size;
      newChunks[ chunkIdx ] = chunk;
      return { ...state, chunkIdx: 0, sizeIdx: sizeIdx + 1, chunks: newChunks, bestFit: null };
    } else if (!chunk && size) {
      return { ...state, chunks: newChunks, error: true, sizeIdx: -1, chunkIdx: -1 }
    } else if (error) {
      return { ...state, chunks: newChunks }
    } else {
      return { ...state, chunks: newChunks, done: true, sizeIdx: -1, chunkIdx: -1 }
    }
  }

  nextWorstFitStep(state) {
    const { chunks, sizes, error, chunkIdx = 0, sizeIdx = 0, worstFit } = state;

    const size = sizes[ sizeIdx ];
    const chunk = chunks[ chunkIdx ];

    const newChunks = chunks.map((c, idx) => {
      if (chunkIdx === idx) {
        return { ...c, accessing: true }
      } else {
        return { ...c, accessing: false }
      }
    });

    if (size && chunk) {
      if (chunk.free >= size.size) {
        if (!worstFit || (worstFit && worstFit.size <= chunk.free)) {
          return { ...state, chunkIdx: chunkIdx + 1, chunks: newChunks, worstFit: { idx: chunkIdx, size: chunk.free } }
        }
        return { ...state, chunkIdx: chunkIdx + 1, chunks: newChunks }
      } else {
        return { ...state, chunkIdx: chunkIdx + 1, chunks: newChunks };
      }
    } else if (!chunk && worstFit && size) {
      const chunkIdx = worstFit.idx;
      const chunk = chunks[ chunkIdx ];
      chunk.memory = this.fillMemory(chunk.memory, size.id, size.size);
      chunk.free -= size.size;
      newChunks[ chunkIdx ] = chunk;
      return { ...state, chunkIdx: 0, sizeIdx: sizeIdx + 1, chunks: newChunks, worstFit: null };
    } else if (!chunk && size) {
      return { ...state, chunks: newChunks, error: true, sizeIdx: -1, chunkIdx: -1 }
    } else if (error) {
      return { ...state, chunks: newChunks }
    } else {
      return { ...state, chunks: newChunks, done: true, sizeIdx: -1, chunkIdx: -1 }
    }
  }

  nextNextFitStep(state) {
    const { chunks, sizes, error, chunkIdx = 0, sizeIdx = 0, step = 'access', lastAlloc } = state;

    const size = sizes[ sizeIdx ];
    const chunk = chunks[ chunkIdx ];

    const newChunks = chunks.map((c, idx) => {
      if (chunkIdx === idx) {
        return { ...c, accessing: true }
      } else {
        return { ...c, accessing: false }
      }
    });

    if (size && chunk) {
      if (lastAlloc && lastAlloc.loop && lastAlloc.idx === chunkIdx) {
        return { ...state, error: true, sizeIdx: -1, chunkIdx: -1 }
      }
      if (step === 'alloc') {
        chunk.memory = this.fillMemory(chunk.memory, size.id, size.size);
        chunk.free -= size.size;
        newChunks[ chunkIdx ] = chunk;
        return {
          ...state,
          sizeIdx: sizeIdx + 1,
          chunks: newChunks,
          step: 'access',
          lastAlloc: { idx: chunkIdx, loop: false }
        };
      } else {
        if (chunk.free >= size.size) {
          return { ...state, chunks: newChunks, step: 'alloc' }
        } else {
          return {
            ...state,
            chunkIdx: chunks[ chunkIdx + 1 ] ? chunkIdx + 1 : 0,
            lastAlloc: chunks[ chunkIdx + 1 ] ? { ...lastAlloc } : { ...lastAlloc, loop: true },
            chunks: newChunks,
            step: 'access'
          };
        }
      }
    } else if (error) {
      return { ...state, chunks: newChunks }
    } else {
      return { ...state, chunks: newChunks, done: true, sizeIdx: -1, chunkIdx: -1 }
    }
  }

  render() {
    const { firstFit, bestFit, worstFit, nextFit, auto, drawGraph } = this.state;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ParameterInputs
          defaultChunks={this.defaultChunks}
          defaultSizes={this.defaultSizes}
          setChunks={this.setChunks.bind(this)}
          setSizes={this.setSizes.bind(this)}
          setChunksAndSizes={this.setChunksAndSizes.bind(this)}
          startAutoAllocation={this.startAutoAllocation.bind(this)}
          doAlgorithmStep={this.doAlgorithmStep.bind(this)}
          auto={auto}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Algorithm data={firstFit} drawGraph={drawGraph} name="First fit"/>
          <Algorithm data={bestFit} drawGraph={drawGraph} name="Best fit"/>
          <Algorithm data={worstFit} drawGraph={drawGraph} name="Worst fit"/>
          <Algorithm data={nextFit} drawGraph={drawGraph} name="Next fit"/>
        </div>
      </div>
    )
  }
}