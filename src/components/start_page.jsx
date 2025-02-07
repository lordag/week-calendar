import Input from "./input";
import Button from "./button";
import {useState} from 'react';

const StartPage = ({label, data, updateData}) => {

    const [subject, setSubject] = useState('');
    const [professor, setProfessor] = useState('');
    const [error, setError] = useState('');

    const handleSetSubject = (event) => {
        event.preventDefault();
        setError('')
        const val = event.target.value;
        setSubject(val);
    }

    const handleSetProfessor = (event) => {
        event.preventDefault();
        setError('')
        const val = event.target.value;
        setProfessor(val);
    }

    const handleAddElems = () => {
        if (subject === '' || professor === ''){
            setError("Subject and Professor can't be empty ");
            return
        }
        updateData({subject, professor})
    }


    return (
        <div>
            <div className="start__form">                
                <div className="startform__container">
                    <p>Enter a Subject and Professor to get started</p>
                    <div className="startform__container__elem">
                        <label className="startform__container__elem__label" htmlFor="subjects" >Subject</label>
                        <Input className="startform__container__elem__input" id="subjects" type="text" onChange={handleSetSubject} defaultValue={subject} placeholder={`Insert text`} />
                    </div>
                    <div className="startform__container__elem">
                        <label className="startform__container__elem__label" htmlFor="subjects" >Professor</label>
                        <Input className="startform__container__elem__input" id="professor" type="text" onChange={handleSetProfessor} defaultValue={professor} placeholder={`Insert text`} />
                    </div>
                    <div className="startform__container__bottom">
                        <div className='startform__container__bottom__message'>{error}</div>
                        <Button className="startform__container__bottom__button" func={handleAddElems} label="Add"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default StartPage;