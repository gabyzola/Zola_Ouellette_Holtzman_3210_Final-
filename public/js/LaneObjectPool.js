import * as THREE from 'three';
import Lane from './Lane.js';

export default class LaneObjectPoool{
    constructor(laneNum){
        this.pool= []
        this.activeLanes= [];
        this.laneNum = laneNum;

        //first two lanes are grass
        this.activeLanes.push(new Lane(30, 300, 'grass'));
        this.activeLanes[0].position.x = 0;
        this.activeLanes[0].position.y = -3.85;

        this.activeLanes.push(new Lane(30, 300, 'grass'));
        this.activeLanes[1].position.x = 30;
        this.activeLanes[1].position.y = -3.85;

        for(var i = 2; i < laneNum; i ++){
            this.activeLanes.push(this.createObject());
            this.activeLanes[i].position.x = i * -30 + 30; 
            this.activeLanes[i].position.y = -3.85;
        }

    } 

    createObject(){
        return new Lane(30, 300, Math.random() > 0.25 ? 'road' : 'grass')
    }

    update(userX) {
        for (let lane of this.activeLanes) {
            if (lane.position.x >= userX + 60) {
                lane.position.x = userX - 270;
            }
        }
    }

    returnObject(object){
        this.pool.push(object); 
    }

    getObject(){
        if (this.pool.length == 0) {
            console.error ("Trying to get lane from empty pool...")
            return null;
        }

        return this.pool.pop();
    }

}
