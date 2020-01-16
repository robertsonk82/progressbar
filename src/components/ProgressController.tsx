
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
//let { data } = props;

let [data, setData] = useState<ApiData>(props.data);

let [selectedProgressBar, setSelectedProgressBar] = useState(0);

function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let buttonValue = event.currentTarget.dataset.value;
    if(!buttonValue) return;

    data.bars[selectedProgressBar] += parseInt(buttonValue);
    if (data.bars[selectedProgressBar] < 0) {
        data.bars[selectedProgressBar]= 0;
    }
    setData({...data});
};

function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedProgressBar(parseInt(event.target.value));
}

//preparing the Progressbar View//
let progressView = data.bars.map((bar, i)=>(
<div key={i}>
    <ProgressBar progressValue={bar} maxLimit={data.limit} />
</div>
));

let optionsView = data.bars.map((bar,i) =>(
    <option value={i} key={i}>
        Progress Bar {i+1}
    </option>
));

let selectView = (
    <select value={selectedProgressBar} onChange={handleSelectChange}>
        {optionsView}
    </select>
);

let buttonsView = data.buttons.map((button, i) =>(
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
