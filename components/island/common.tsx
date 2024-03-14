"use client";
import dayjs from "dayjs";

interface IInfo{
    key:number;
    name:string;
    data:number[];
}
export const islandInfo:IInfo[] = [{
    key:0,
    name:"萌绿之岛",
    data: [0.97,2.08,4.63,8.34,19.58],
},{
    key:1,
    name:"天青沙滩",
    data:[1.58,3.52,7.17,13.49,30.50],
},{
    key:2,
    name:"灰褐洞窟",
    data:[1.83,4.63,9.94,19.57,43.72],
},{
    key:3,
    name:"冰冻雪原",
    data:[2.83,7.17,15.48,28.78,65.71],
},{
    key:4,
    name:"宝蓝湖畔",
    data:[3.16,7.74,16.70,30.51,68.69],
}]



export function getNearest2Times(currentIsland:number,currentPower:number){
    const currentPowerLevels = islandInfo[currentIsland].data;
    // 找小于currentPower的 2个数据
    let index = currentPowerLevels.findIndex(one=>one>currentPower);
    let currentIndexes;
//最大值
    if(index === -1){
        index = 5;
    }
    if(index < 1){
        currentIndexes = [0]
    }else{
        currentIndexes = [index-2, index-1];
    }
    const results=[] as any[];
    currentIndexes.map(ind=>{
        // 最终计算是使用的不带小数的百分位。
        const percent = Math.ceil(currentPowerLevels[ind]/currentPower*100);
        const minute = percent /100 * 510;

        const restTime = Math.round(510-minute);
        const restPower = currentPower * restTime / 510;
        // -1表示达到最大值了。
        let restIndex = currentPowerLevels.findIndex(one=>one>restPower);
        restIndex === -1 && (restIndex = 5);
        results.push([`${ind+4}个宝可梦：${Math.round(minute)}m, ${percent}%`, getEndTime(minute), `剩余${restTime}m, 能量 ${Math.round(restPower*100)/100},至少可以再来${restIndex+3}个宝可梦`].join(' '));
    })
    console.log(results);
    return results;

}


function getEndTime (endMinute:number){
    const now = new Date();
    const endTime = new Date( now.getTime() + endMinute * 60 * 1000)

    return dayjs(endTime).format('HH:mm:ss') ;
}


