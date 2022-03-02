import React, {useEffect, useState} from 'react';
import {Card, Paper, Typography} from "@material-ui/core";
import './singlecomment.scss'
import dateFormat, { masks } from "dateformat";


export type Question = {
    name: string;
    brand: string;
    model: string;
    text: string;
    date: Date;
}

export const SingleComment = ({question}: {question: Question}) => {

    return(
        <>
            <Card className={"single-comment"}>
                <div className={"comment-header"}>
                    <Typography gutterBottom variant="h5" component="div" align="left">
                        {question.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" color={'textSecondary'} className={'question-car'}>
                        {question.brand} {question.model}
                    </Typography>
                </div>

                <Typography variant="caption" display="block" gutterBottom color={'textSecondary'}>
                    {dateFormat(question.date, "dd-mm-yyyy, h:MM TT")}
                </Typography>

                <Typography variant="body1" color={"textPrimary"}>
                    {question.text}
                </Typography>
            </Card>
        </>
    )
}