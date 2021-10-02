import '../styles/Path.css';
import Baltimore from '../assets/baltimore.jpeg';
import React, { Component, useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import SidebarBtn from './SidebarBtn.jsx';

// Hook
function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState<boolean>(false);
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    // Add event listeners
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
}
 
function Path(props) {
    const APressed = useKeyPress('A');

    useEffect(() => {
        if(APressed) {
            
        }
    }, [APressed])

    return (
        <div class="path-wrapper">
            <img id="SrcImage" src={Baltimore} alt="Baltimore"/>
            <canvas id="Canvas"></canvas>
        </div>
        
    )
}

export default Path;