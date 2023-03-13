import React from 'react';
import Content from '../Description/Content';
import "./Header.css"

export default function Header() {

    const headerStyle = {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: 10,
    };

    return (
        <header class="header" style={headerStyle}>
            <h1>Memory Partition Allocation Visualizer</h1>
            <Content/>
        </header>
    )
}
