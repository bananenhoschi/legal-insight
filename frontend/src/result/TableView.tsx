import React from 'react';
import {Token} from "../shared/Schema";
import {Accordion, AccordionTab} from "primereact/accordion";

export interface ITableView {
    tokens: Token[]
}

export default function TableView(props: ITableView) {
    const {
        tokens
    } = props
    const uniqueTokens = tokens.filter(
        (obj, index) =>
            tokens.findIndex((item) => item.word === obj.word) === index
    );


    return (
        <Accordion activeIndex={0}>
            {uniqueTokens.filter(t => (t.highlight && t.count ? t.count : 0 > 0)).map(token =>
                <AccordionTab header={
                    <React.Fragment>
                        {token.word} <span className={"circleNumber"}>{token.count}</span>
                    </React.Fragment>
                }>
                    {token.source?.sort((a, b) => {
                        return a.number - b.number;
                    }).slice(0, 5).map(src => <><p>Art. {src.art_number} {src.abs_nr} {src.ziff} {src.sr_number}<br></br><span className="font-light">...Lorem Ipsum dolor sit...</span></p></>)}
                </AccordionTab>
            )}
        </Accordion>
    )
}
