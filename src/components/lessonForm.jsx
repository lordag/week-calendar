import { useState, useEffect} from "react";
const LessonForm = ({submitFunc, removeFunc, data, cellInfo}) => {

    const default_data = {subject: '', professor: ''};
    const [cellData, setCellData] = useState(default_data)
    const [dataIn, setDataIn] = useState(false);

    // const subjects = Object.keys(data.subjects);
    // const professors= Object.keys(data.professors);
    const subjects = data.subjects;
    const professors= data.professors;
    const lessons = data.lessons

    useEffect(() => {
      const cell_selected = Object.keys(cellInfo).length === 0;
      if(!cell_selected && lessons[cellInfo.timeIndex][cellInfo.dayIndex]){
        const lesson = lessons[cellInfo.timeIndex][cellInfo.dayIndex];
        setDataIn(true)
        setCellData((prevData) => ({...prevData, ...lesson}))

      }else{
        setDataIn(false)
        setCellData(default_data)
      }

    },[cellInfo])


    const handleChangeSubject = (event) => {
      const value = event.target.value;
      setCellData((prevData) => ({...prevData, subject: value}));
    }

    const handleChangeProfessor = (event) => {
      const value = event.target.value
      setCellData((prevData) => ({...prevData, professor: value}));
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      submitFunc(event, cellData);
    }

    const handleRemove = (event) => {
      event.preventDefault();
      removeFunc(cellData);
    }

    return(
      <>
          <form className="form">
            <div className="form__items">
              <label htmlFor='subject'>Subject</label>
              <select id="subject" onChange={handleChangeSubject} value={cellData.subject}>
                <option value="">Select the subject</option>
                {subjects.map((subj) => {
                  return <option value={subj.name} key={subj.name.toLowerCase()}>{subj.name}</option>
                })}
              </select>
            </div>
            <div className="form__items">
              <label htmlFor='professors'>Professors</label>
              <select id="professors" onChange={handleChangeProfessor} value={cellData.professor}>
                <option value="">Select the professor</option>
                {professors.map((prof) => {
                  return <option value={prof.name} key={prof.name.toLowerCase()}>{prof.name}</option>
                })}
              </select>
            </div>
            <div className="form__buttons">
              <button 
                onClick={handleSubmit} 
                type="button" 
                disabled={cellData.subject === '' || cellData.professor === ''}
              >
                {dataIn ? 'Update' : 'Add'}
              </button>
              {dataIn && 
                <button 
                  onClick={handleRemove} 
                  type="button" 
                  className="remove" 
                  disabled={cellData.subject === '' || cellData.professor === ''}
                >
                  Remove
                </button>
              }
            </div>
          </form>
      
      </>
    )
}

export default LessonForm;