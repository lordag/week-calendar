import { useState, useEffect } from "react";
const LessonForm = ({submit, subjects, professors}) => {
    const [subject, setSubject] = useState('');
    const [professor, setProfessor] = useState('');

    const handleChangeSubject = (event) => {
      const value = event.target.value;
      setSubject(value);
    }

    const handleChangeProfessor = (event) => {
      const value = event.target.value
      setProfessor(value);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      submit(event, {subject, professor});
    }

    return(
      <form className="form">
        <div className="form__items">
          <label htmlFor='subject'>Subject</label>
          <select id="subject" onChange={handleChangeSubject} defaultValue={subject}>
            <option value="">Select the subject</option>
            {subjects.map((subj) => {
              return <option value={subj} key={subj}>{subj}</option>
            })}
          </select>
        </div>
        <div className="form__items">
          <label htmlFor='professors'>Professors</label>
          <select id="professors" onChange={handleChangeProfessor} defaultValue={professor}>
            <option value="">Select the professor</option>
            {professors.map((prof) => {
              return <option value={prof} key={prof}>{prof}</option>
            })}
          </select>
        </div>
        <button onClick={handleSubmit} type="button" className="form__button" disabled={subject === '' || professor === ''}>Add</button>
      </form>
    )
}

export default LessonForm;