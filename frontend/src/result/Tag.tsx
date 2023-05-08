import React from "react";
import {Token} from "../shared/Schema";
import "./Result.scss"
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export interface ITag {
    token: Token
    existingWords: boolean
    newWords: boolean
}

export default function Tag(props: ITag) {
    const {
        token,
        newWords,
        existingWords
    } = props

    const renderTooltip = (
        <Tooltip id="button-tooltip">
            Count: {token.count}
        </Tooltip>
    );

    function openTermdat(token: Token) {
        window.open(`https://www.termdat.ch/search/entry/159055?s=${token.word.toLowerCase()}`, '_blank')
    }


    return (
        (newWords && token.count === 0) || (existingWords && token.count! > 0) ? <OverlayTrigger placement="top" delay={{show: 100, hide: 100}} overlay={renderTooltip}>
            <span onClick={() => openTermdat(token)} className={['tag', token.count === 0 ? 'red' : 'green'].join(" ")}>
                {token.word}
            </span>
        </OverlayTrigger> : <>{token.word + " "}</>


    );
}
