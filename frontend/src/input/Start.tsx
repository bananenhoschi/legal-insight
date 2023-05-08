import React, {useState} from 'react';
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";
import {useNavigate} from "react-router-dom";
import {InputGroup} from "react-bootstrap";
import {Checkbox} from "primereact/checkbox";
import {Dropdown} from "primereact/dropdown";

const Start = () => {
    const navigate = useNavigate()
    const [text, setText] = useState('');
    const [newWords, setNewWords] = useState(true);
    const [existingWords, setExistingWords] = useState(true);

    const [selectedRechtssammlung, setSelectedRechtssammlung] = useState( { name: 'Systematische Rechtssammlung', code: 'ent' });
    const sammlungen = [{ name: 'Systematische Rechtssammlung', code: 'ent' }];
    return (
        <>
            <div className="container pt-3">
            <h1>Input for legal comparison</h1>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna </p>
                <Dropdown value={selectedRechtssammlung} options={sammlungen} optionLabel="name" disabled={true}/>
                <InputGroup className="my-3">
                    <InputTextarea value={text} onChange={(e) => setText(e.target.value)}
                                   style={{height: '300px', width: '100%'}}/>
                    <div className="mt-3">
                    <Checkbox inputId="ingredient1" name="new-words" value="New Words" onChange={() => setNewWords(!newWords)} checked={newWords} />
                    <label htmlFor="ingredient1" className="ml-2">New Words</label>
                    </div>
                    <div className="mt-3 ml-3">
                    <Checkbox inputId="ingredient1" name="existing-words" value="Existing Words" onChange={() => setExistingWords(!existingWords)} checked={existingWords} />
                    <label htmlFor="ingredient1" className="ml-2">Existing Words</label>
                    </div>
                    <div className="mt-3 ml-3">
                    <Checkbox inputId="ingredient1" name="keywords" value="Check against Keywords" checked={false} disabled={true} />
                    <label htmlFor="ingredient1" className="ml-2">Check against Keywords</label>
                    </div>
                </InputGroup>
                <Button className="mt-2" type="submit" onClick={() => navigate('/result', { state: { text: text, newWords: newWords, existingWords: existingWords}})}>Text analysieren</Button>
            </div>
        </>
    );
};

export default Start;
