import {useState} from 'react';
import List from './list';
import Button from './button';
import Input from './input';

const ResumeObjects = ({label, data, updateData}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const checkIfValueExist = (val) => {
        const is_valid = data.some(item => item.name.toLowerCase() === val.toLowerCase());
        return is_valid
    }

    const handleSetValue = (event) => {
        const current_value = event.target.value;
        setError('')
        setValue(current_value);
    }

    const handleAddElem = (event) => {
        event.preventDefault();
        const value_exist = checkIfValueExist(value);
        if(value_exist){
            setError('The entered value already exists');
            return
        }
        updateData(value);
        setValue('');
    }   

    return (
        <>
            <List title={label} elems={data} />
            <div className="input__field">
                <label className="input__field__label" htmlFor={label.toLowerCase()} >Add new {label}</label>
                <div className="input__field__container">
                    <Input className="input__field__container__input" id={label.toLowerCase()} type="text" onChange={handleSetValue} value={value} placeholder={`Insert text`} />
                    <Button className="input__field__container__button" func={handleAddElem} label="Add"/>
                </div>
                {error !== '' && <div className='input__field__error'>{error}</div>}
            </div>        
        </>
    )
}

export default ResumeObjects;