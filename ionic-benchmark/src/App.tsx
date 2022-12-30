import React, {useState} from 'react';
import * as Timing from './timing';

import {
  IonButton,
  IonApp,
  IonContent,

  IonHeader,
  IonLabel,
  IonPage,

  IonTitle,
  IonToolbar
} from '@ionic/react';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Global CSS */
import './global.css';




const App = () => {
  

  const [ timeL, setTimeL ] = useState('')
  const [ timeB, setTimeB ] = useState('')

  return (
    <IonApp>
    <IonPage>
      
          <IonHeader>
        <IonToolbar>
          <IonTitle>Benchmark</IonTitle>
        </IonToolbar>
      </IonHeader>
     

      <IonContent style={styles.container}>
       
          <IonLabel>Legendre: {timeL}</IonLabel>
        <br />
        <IonButton

          
          onClick={() => {
            console.log('Start');
            let startTime = Timing.now();
            for (let i = 0; i <  numIters; i += 1) {
              gaussLegendre(100000000);
            }
            let endTime = Timing.now();
            console.log('Finish');
            let iterTime = (endTime - startTime) / numIters;
            console.log(iterTime);
            setTimeL(iterTime.toString());
            
          }}
          >
          Start
        </IonButton>
     
        <br />
        <IonLabel style={styles.legendreContainer}>
          <IonLabel>Borwein: {timeB}</IonLabel>
        </IonLabel>
        <br />
        <IonButton

          
          onClick={() => {
            console.log('Start');
            let startTime = Timing.now();
            for (let i = 0; i < numIters; i += 1) {
              getOneByPi(1000000);
            }
            let endTime = Timing.now();
            console.log('Finish');
            let iterTime = (endTime - startTime) / numIters;
            console.log(iterTime);
            setTimeB(iterTime.toString());
            
          }}
          >
          Start
        </IonButton>
      </IonContent>
    </IonPage>
    </IonApp>
  );
}


const styles = {
container: {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 10
},
legendreContainer: {
  alignItems: "center",
  padding: 10
},
scrollView: {
  backgroundColor: "#abb8c3",
},
start: {
  justifyContent: 'center',
  alignItems: 'center',
},
btnStyle: {
  justifyContent: 'center',
  alignSelf: 'stretch',
  textAlignVertical: 'center',
},
startTestButton: {
  marginRight: 40,
  marginLeft: 40,
  marginTop: 10,
  paddingTop: 10,
  paddingBottom: 10,
  backgroundColor: '#1E6738',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#fff',
},
startTestText: {
  color: '#fff',
  textAlign: 'center',
  paddingLeft: 10,
  paddingRight: 10,
},
};

//AppRegistry.registerComponent('App', () => App);

//Pi calc

const numIters = 100;

function gaussLegendre(iterations: number) {
let a = 1.0;
let b = 1.0 / Math.sqrt(2);
let t = 1.0 / 4.0;
let p = 1.0;
for (let i = 0; i < iterations; i++) {
  let aNext = (a + b) / 2;
  let bNext = Math.sqrt(a * b);
  let tNext = t - p * Math.pow(a - aNext, 2);
  let pNext = 2 * p;
  a = aNext;
  b = bNext;
  t = tNext;
  p = pNext;
}
return Math.pow(a + b, 2) / (4 * t);
}

function getOneByPi(k: number) {
let ak = 6.0 - 4 * Math.sqrt(2);
let yk = Math.sqrt(2) - 1.0;
var ak1;
var yk1;
for (let i = 0; i < k; i++) {
  yk1 =
    (1 - Math.pow(1 - yk * yk * yk * yk, 0.25)) /
    (1 + Math.pow(1 - yk * yk * yk * yk, 0.25));
  ak1 =
    ak * Math.pow(1 + yk1, 4) -
    Math.pow(2, 2 * i + 3) * yk1 * (1 + yk1 + yk1 * yk1);
  yk = yk1;
  ak = ak1;
}
return ak;
}

export default App;