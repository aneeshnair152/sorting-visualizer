import React from 'react';
import {getBubbleSortAnimations, getMergeSortAnimations, getHeapSortAnimations, getQuickSortAnimations, getSelectionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AppBar from '../appBar/AppBar.jsx'
import Footer from '../footer/Footer.jsx'
import { withStyles } from "@material-ui/core/styles";




const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
    display: 'inline-block'
  }
})(Typography);

const defaultProps = {
  borderColor: 'text.primary',
  m: 2,
  border: 1,
  style: { width: '600px', height: '120px' },
};

const textProps = {
  border: 1,
  borderRadius: 3,
  style: { width: '100%', backgroundColor: '#4A39B3' },
};

const sliderProps = {
  border: 1,
  style: { width: '100%', backgroundColor:'#2b2b28' },
};







// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 20;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 25;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#8282FF';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      speed: 80,
      num_of_bars: 10,
      timerOn: false,
      time: 0
    };
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleBarChange = this.handleBarChange.bind(this);
  }
  

  setArrayWidth(num){
    var str_num = num.toString();
    document.documentElement.style.setProperty('--bar-width', str_num+'px')

  }

  handleSpeedChange(event) {
    this.setState({speed: event.target.value});
  }

  handleCallback = (childData) =>{
    this.setState({timerOn: childData})
}

  startClock() {
    this.setState({timerOn: true});
  }



  handleBarChange(event) {
    this.setState({num_of_bars: event.target.value});
  }

  handleSpeedPercentage(speed){

    if(speed >= 75){
      return 101 - speed;
    }
    if(speed >= 50){
      return 115 - speed
    }
    if(speed >= 25){
      return 125 - speed
    }
    else{
      return 135 - speed;
    }


  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    if (this.state.num_of_bars >= 80){
      this.setArrayWidth(5);
      this.state.speed = 99;
    }
    else{
      this.setArrayWidth(15)
    }
    for (let i = 0; i < this.state.num_of_bars; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  play_animations(animations){
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.handleSpeedPercentage(this.state.speed));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.handleSpeedPercentage(this.state.speed));
      }
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    this.play_animations(animations);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array)
    this.play_animations(animations)
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    this.play_animations(animations)

  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    this.play_animations(animations);

  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);
    this.play_animations(animations);

  }


  render() {
    const {array} = this.state;

    return (
      <div className='absolute-container'>
        <div className='bar'>
        <AppBar></AppBar>
        </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}> 
            </div>
        ))}
        </div>
        <Divider light/>
        <div className="menu">
        <Stack spacing={0.5} direction="row">
        <Button variant="contained" sx={{backgroundColor: '#8282FF'}} onClick={() => this.resetArray()}>Generate New Array</Button>
        <Button variant="contained" sx={{backgroundColor: '#4A39B3'}} onClick={() => this.mergeSort()}>Merge Sort</Button>
        <Button variant="contained" sx={{backgroundColor: '#4A39B3'}} onClick={() => this.quickSort()}>Quick Sort</Button>
        <Button variant="contained" sx={{backgroundColor: '#4A39B3'}} onClick={() => this.heapSort()}>Heap Sort</Button>
        <Button variant="contained" sx={{backgroundColor: '#4A39B3'}} onClick={() => this.bubbleSort()}>Bubble Sort</Button>
        <Button variant="contained" sx={{backgroundColor: '#4A39B3'}} onClick={() => this.selectionSort()}>Selection Sort</Button>
        </Stack>
        <div className="menu-2">
        <Box borderRadius={1} {...defaultProps}>
        {/* <Stack spacing={5} direction="row"> */}
        <WhiteTextTypography {...textProps} id="input-slider" variant='button' gutterBottom>
        Speed ({this.state.speed}%):
        </WhiteTextTypography>
        <Slider
        defaultValue={80}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={100}
        value={this.state.speed}
        onChange={this.handleSpeedChange}
        {...sliderProps}
        />
        {/* </Stack> */}
        {/* <Stack spacing={5} direction="row"> */}
        <WhiteTextTypography {...textProps} variant='button' gutterBottom>
       Size of Array: (N={this.state.num_of_bars}) 
        </WhiteTextTypography>
        <Slider
        defaultValue={5}
        valueLabelDisplay="auto"
        step={5}
        marks
        min={5}
        max={200}
        value={this.state.num_of_bars}
        onChange={this.handleBarChange}
        {...sliderProps}
        />
        {/* </Stack> */}
        </Box>
      </div>
      </div>
      <Box>
        {/* <Card variant="outlined"></Card> */}
      </Box>
      <Footer></Footer>
    </div>
    );
    
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

