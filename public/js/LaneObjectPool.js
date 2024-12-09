import * as THREE from 'three';
import Lane from './Lane.js';

export default class LaneObjectPoool{
    constructor(num){
        this.pool= []

        for (let i=0; i<num; i++){
            this.pool.push(this.createObject());
        }

    } 

    createObject(){
        return new Lane(30, 300, Math.round(Math.random() +1) % 2 === 0 ? 'road' : 'grass')
    }

    returnObject(object){
        this.pool.push(object); 
    }

    getObject(){
        let object; 
        if(this.pool.length>0){
            object= this.pool.pop(); 
        }else{
            object= this.createObject(); 
        }
        return object; 
    }

}
