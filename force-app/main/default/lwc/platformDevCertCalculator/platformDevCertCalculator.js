import { LightningElement, track } from 'lwc';

    const devFundWeighted = 0.23;
    const procAutoWeighted = 0.30;
    const userInterWeighted= 0.25;
    const testDebugDeployWeighted = 0.22;
    const passingScore = 68;

export default class PlatformDevCertCalculator extends LightningElement {
    certificationScore = 90;
    devFundamentalScore = 50;
    processAutoScore = 50;
    userInterfaceScore = 50;
    testDebugDeployScore = 50;
    numberOfQuestions = 60;
    showResource = false;
    showGodJob = false;
    currentHistoryId = 0;
    
    @track attemptHistory = [
        {Id: 1, Score: 50},
        {Id: 2, Score: 68}
    ]

handleChange(event) {
   const inputName = event.target.name;
   let inputValue = Number(event.target.value);
   if (inputName == 'devFundamental'){
        this.devFundamentalScore = inputValue;
   } else if (inputName == 'processAuto'){
        this.processAutoScore = inputValue;
   } else if (inputName == 'userInterface'){
        this.userInterfaceScore = inputValue;
   } else if (inputName == 'testDebugDeploy'){
        this.testDebugDeployScore = inputValue;
   }
}

calculateScore(){
    let devFundWeightedScore = this.devFundamentalScore * devFundWeighted;
    let procAutoWeightedScore = this.processAutoScore * procAutoWeighted;
    let userInterWeightedScore= this.userInterfaceScore * userInterWeighted;
    let testDebugDeployWeightedScore = this.testDebugDeployScore * testDebugDeployWeighted;

    this.certificationScore = devFundWeightedScore  + procAutoWeightedScore + userInterWeightedScore +  testDebugDeployWeightedScore;
    this.showResourceIfFailed();
    this.addAttemptHistory(this.certificationScore);
}   

showResourceIfFailed(){
    if (this.certificationScore < passingScore) {
        this.showResource = true;
    } else {
        this.showResource = false;
    }
    this.showGodJob = !this.showResource;
}

addAttemptHistory(score){
    
    this.currentHistoryId++;
    this.attemptHistory.push(
        {Id: this.currentHistoryId,  Score : score});
    }

deleteAttemptHandler(event){
    let attemptId = event.detail;
    this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
}
connectedCallback(){
    this.currentHistoryId = this.attemptHistory.length;
}
}


