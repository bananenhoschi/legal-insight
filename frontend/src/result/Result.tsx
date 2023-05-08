import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {analyzeText} from "../service/Service";
import {Token} from "../shared/Schema";
import {ProgressSpinner} from "primereact/progressspinner";
import Tag from "./Tag";
import {Checkbox} from "primereact/checkbox";
import {InputGroup} from "react-bootstrap";
import './Result.scss'
import TableView from "./TableView";
import {Button} from "primereact/button";

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state as { text: string, existingWords: boolean, newWords: boolean }
    const [newWords, setNewWords] = useState(locationState?.newWords);
    const [existingWords, setExistingWords] = useState(locationState?.existingWords);

    const [result, setResult] = useState<Token[]>()
    const [failedLoadingResult, setFailedLoadingResult] = useState<boolean>()
    const [isLoading, setIsLoading] = useState<boolean>()

    useEffect(() => {
        if (locationState) {
            setResult(undefined)
            setIsLoading(true)
            setFailedLoadingResult(false)
            analyzeText(locationState.text).then(async res => {
                setResult(res)
                setIsLoading(false)
            }).catch(e => {
                console.error(e)
                setFailedLoadingResult(true)
            })
        } else {
            navigate("/")
        }
    }, [locationState]);

    return (
        <div className="container pt-3">
            <h1>Resultat</h1>
            {result && !failedLoadingResult ? (
                <>
                    <div className="row">
                        <div className="col-10 pt-3">
                            <div className="mt-3 ml-3 d-inline-flex">
                                <Checkbox inputId="ingredient1" name="new-words" value="New Words"
                                          onChange={() => setNewWords(!newWords)} checked={newWords}/>
                                <label htmlFor="ingredient1" className="ml-2">New Words</label>
                            </div>
                            <div className="mt-3 ml-3 d-inline-flex">
                                <Checkbox inputId="ingredient1" name="existing-words" value="Existing Words"
                                          onChange={() => setExistingWords(!existingWords)} checked={existingWords}/>
                                <label htmlFor="ingredient1" className="ml-2">Existing Words</label>
                            </div>
                            <div className="mt-3 ml-3 d-inline-flex">
                                <Checkbox inputId="ingredient1" name="keywords" value="Check against Keywords"
                                          checked={false} disabled={true}/>
                                <label htmlFor="ingredient1" className="ml-2">Check against Keywords</label>
                            </div>
                        </div>
                        <div className="col-2">
                        <div className="mt-3 float-end">
                            <Button className="float-end d-inline-flex" onClick={() => navigate('/')}>Neuer Text</Button>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="taggedText">
                                {result.map(token => {
                                    if (token.highlight) return <Tag token={token} existingWords={existingWords}
                                                                     newWords={newWords}></Tag>
                                    return token.word + " "
                                })}
                            </div>
                        </div>
                        <div className="col-6">
                            <TableView tokens={result}></TableView>
                        </div>
                    </div>
                </>
            ) : (failedLoadingResult ? (
                    <h3 className='mt-5'>
                        Fehler beim Laden des annotierten Texts
                    </h3>) : (
                    isLoading ? (
                        <ProgressSpinner style={{width: '50px', height: '50px'}}/>
                    ) : (<></>)
                )
            )}
        </div>
    );
}

export default Result;
