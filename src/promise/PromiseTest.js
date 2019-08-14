import React from 'react';
import PromiseSample from './PromiseSample'

class PromiseTest extends React.Component{

    callback(func) {
        for (let i = 0; i < 10; i++) {
            func(i);
        }
    }

    callbackTest = () => {
        const callbackFunc = function(i) {
            console.log('callback' + i);
        };
        this.callback(callbackFunc);
    }

    promistTest = () => {
        const promise = new Promise((resolve, reject) => {
            resolve() ;
        });
        

        promise.then(() => {
            console.log('promise then');
        }).catch(() => {
            console.log('promise catch');
        });     
    }
    render() {
        return(
            <div>
                <h1>Promise Test</h1>
                <button on click ={this.callbackTest}>callback</button>
                <button on click ={this.promiseTest}>promise</button>
            </div>
        )
    }
}

export default PromiseTest;