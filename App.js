/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState }  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import CalculatorDisplay from './components/calculator-display';
import NumberButton from './components/number-button';
import OperationButton from './components/operation-button';
import FunctionButton from './components/function-button';



const App: () => React$Node = () => {

//Q1: explain what the following 3 lines do.
const [numberDisplay, setNumberDisplay] = useState("");
const [previousTotal, setPreviousTotal] = useState("");
const [currentOperation, setCurrentOperation] = useState("");

//Q2: explain what `${numberDisplay}${digit}` does.   
const updateDisplay = digit => {
    setNumberDisplay(`${numberDisplay}${digit}`);
  };

//Q3: setNumberDisplay is not defined anywhere in the App, nor is it imported. How is the function properly invoked and executed then?
const changeDisplay = action => {
    if (action === 'clear') {
      setNumberDisplay("");
      setPreviousTotal("");
      setCurrentOperation("");
    } else if (action === 'delete') {
      if (typeof numberDisplay === 'string') {
        setNumberDisplay(numberDisplay.slice(0, -1));
      }
    }
    else if (action=== "√"){
      if (numberDisplay === ""){ numberDisplay=0;}
          
        
        else{ 
          let numberEnter= numberDisplay*1;
          let newTotal=""
          newTotal=Math.sqrt(numberEnter);
          setNumberDisplay(newTotal);
        }
      }
  };
 
  const updateCalculations = op => {
//define total, entered number, and operation
let newTotal=previousTotal;
let numberEnter= numberDisplay*1;
let thisOp="";
let number=numberDisplay;
if(currentOperation===""){
  thisOp=op;
}
else{
  thisOp=currentOperation;
}

if(previousTotal===""){
      newTotal=numberEnter;
}
else{
      if(thisOp==="/"){
      newTotal=previousTotal/numberEnter;
      }
      else if(thisOp==="x"){
        newTotal=previousTotal*numberEnter;
        }
      else if(thisOp==="+"){
        newTotal=previousTotal+numberEnter;
        }
      else if(thisOp==="-"){
          newTotal=previousTotal-numberEnter;
        }
      else if(thisOp==="="){
          newTotal=previousTotal/numberEnter;
        }
     
      }

      if (op !== "=") {
        setNumberDisplay("");
        setPreviousTotal(newTotal);
        setCurrentOperation(op);
      } 
      else {
        setNumberDisplay(newTotal);
        setPreviousTotal(""); //This part needed the fix; the rest is the same as the one done in class
        setCurrentOperation("");
  
      }

//conditional statement to determine what is the operation

//conditional statement to determine new Total


//conditional statement to set the state variables

  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.savContainer}>
        <View style={styles.calculatorContainer}>
          <View style={{...styles.buttonRow,flexGrow:1}}>
            <CalculatorDisplay Numbers={numberDisplay} />
          </View>
          <View style={styles.buttonRow} >
            <FunctionButton  ThisFunction="clear" ButtonWidth="25%" ButtonAction={changeDisplay}  />
            <FunctionButton ThisFunction="delete" ButtonWidth="25%" ButtonAction={changeDisplay}  />
            <FunctionButton ThisFunction="√" ButtonWidth="25%" ButtonAction={changeDisplay}  />
            <OperationButton Operation="/" UpdateCalculations={updateCalculations}  />
          </View>
          <View style={styles.buttonRow}>
            <NumberButton  Number={7} ButtonWidth="25%" ButtonAction={updateDisplay}  />
            <NumberButton  Number={8} ButtonWidth="25%" ButtonAction={updateDisplay} />
            <NumberButton  Number={9} ButtonWidth="25%" ButtonAction={updateDisplay} />
            <OperationButton Operation="x"  UpdateCalculations={updateCalculations}  />
          </View>
          <View style={styles.buttonRow}>
            <NumberButton Number={4} ButtonWidth="25%" ButtonAction={updateDisplay}  />
            <NumberButton Number={5} ButtonWidth="25%" ButtonAction={updateDisplay}  />
            <NumberButton Number={6} ButtonWidth="25%" ButtonAction={updateDisplay}  />
            <OperationButton Operation="-"  UpdateCalculations={updateCalculations}  />
          </View>
          <View style={styles.buttonRow}>
            <NumberButton Number={1} ButtonWidth="25%"  ButtonAction={updateDisplay} />
            <NumberButton Number={2} ButtonWidth="25%"  ButtonAction={updateDisplay} />
            <NumberButton Number={3} ButtonWidth="25%" ButtonAction={updateDisplay}  />
            <OperationButton Operation="+"  UpdateCalculations={updateCalculations}  />
          </View>
          <View style={styles.buttonRow}>
            <NumberButton Number={0} ButtonWidth="50%"  ButtonAction={updateDisplay} />
            <NumberButton Number="." ButtonWidth="25%"  ButtonAction={updateDisplay}  />
            <OperationButton Operation="="  UpdateCalculations={updateCalculations}  />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  calculatorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  savContainer: {
    flexGrow: 1,
    backgroundColor: "#000000",
  },
});

export default App;