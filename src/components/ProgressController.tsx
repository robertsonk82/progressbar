
import React, { useState} from "react";
import ProgressBar from "./ProgressBar"

type ApiData = {
buttons: Array<number>;
bars: Array<number>;
limit: number
};

interface Props{
data: ApiData;
}

function ProgressController(props: Props) {
let { data } = props;

let [apiData, setApiData] = useState<ApiData>(data);

let [selectedProgressBar, setSelectedProgressBar] = useState(0);

function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let buttonValue = event.currentTarget.dataset.value || "0";

    apiData.bars[selectedProgressBar] += parseInt(buttonValue);
    if (apiData.bars[selectedProgressBar] < 0) {
        apiData.bars[selectedProgressBar]= 0;
    }
    setApiData({...apiData});
};

function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedProgressBar(parseInt(event.target.value));
}

//preparing the Progressbar View//
let progressView = apiData.bars.map((bar, i)=>(
<div key={i}>
    <ProgressBar progressValue={bar} maxLimit={apiData.limit || 0} />
</div>
));

let optionsView = apiData.bars.map((bar,i) =>(
    <option value={i} key={i}>
        Progress Bar {i+1}
    </option>
));

let selectView = (
    <select value={selectedProgressBar} onChange={handleSelectChange}>
        {optionsView}
    </select>
);

let buttonsView = apiData.buttons.map((button, i) =>(
    <button key={i} data-value={button} onClick={handleClick}>
        {button}
    </button>
));

return(
    <>
    {progressView}
    <div className="contentFooter">
        {selectView}
        {buttonsView}
    </div>
    </>
);
}
export default ProgressController;
