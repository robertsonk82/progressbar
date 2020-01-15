
import React from "react";
import styled from "styled-components";


interface Props{
    progressValue: number;
    maxLimit: number;
}

const ProgressContainer = styled.div`
    background-color:#fff;
    border:1px solid #ccc;
    width:300px;
    overflow:hidden;
    height:25px;
    display:inline-block;
    text-align:left;
    position:relative;
    .crossedLimit {
        background:red;
    }
    .progress-text{
        text-align:center;
        position:absolute;
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        aligh-items:center;
        left:0;
        top:0;
    }
`;

const Progress = styled.span<Props>`
    ${props => {
        return `
            background-color:#68a8f7;
            transition:.3s all linear;
            height:100%;
            width:${(props.progressValue / props.maxLimit) * 100}%;
            display:inline-block;
        `;
    }}
`;

function ProgressBar(props:Props){
    const {progressValue, maxLimit} = props;
    return (
        <ProgressContainer>
            <Progress 
            className={progressValue > maxLimit ? "crossedLimit":""} 
            progressValue={progressValue}
            maxLimit={maxLimit}></Progress>
            <span className="progress-text">
                {((props.progressValue/props.maxLimit)*100).toFixed(0)}%
            </span>
        </ProgressContainer>
    );
}


export default ProgressBar;
