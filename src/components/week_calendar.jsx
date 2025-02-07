import { useState, useRef} from "react";
import LessonForm from "./lessonForm";
import {validateHoursWeekly, validLessonPosition} from '../utils/validation'
import {manageObjectCount, decreaseObjectCount, updateLessons} from '../utils/data_utils'
import Modal from "./modal";
import DesktopCalendar from "./desktop_calendar";
import MobileCalendar from "./mobile_calendar";


const WeekCalendar = ({data, updateData}) => {

    const modal = useRef()
    
    const [cellInfo, setCellInfo] = useState({});
    const [error, setError] = useState(null);

    const handleSubmit = (event, values) => {
        event.preventDefault();
        const info = {...values, ...cellInfo}
        // Get the value of the cell before update
        const current_values = data.lessons[info.timeIndex][info.dayIndex]
        let new_data = {};

        if (!validateHoursWeekly(info.subject, data)){
            setError('The number of hours of a lesson cannot be more than 5 in a week')
            return
        }

        if (!validLessonPosition(info.timeIndex, info.dayIndex, info.subject, data)){
            setError('The timetables for individual subjects must be close together')
            return
        }

        // If the current value is the same of the incoming value return
        if(current_values && current_values.subject === values.subject && current_values.professor === values.professor ) return
        
        // Manage counter of subjects and professors
        new_data = manageObjectCount(data, current_values, info);
        
        // update the state with the new subject
        updateData((prevData) => ({
            ...prevData,
            subjects: new_data.subjects,
            professors: new_data.professors,
            lessons: updateLessons(prevData.lessons, info)
        }));

        modal.current.close();                
        setError(null);
        setCellInfo({})
    }



    const handleRemove = (values) => {
        updateData((prevData) => ({
            ...prevData,
            lessons: prevData.lessons.map((row, index) => {                
                if (index === cellInfo.timeIndex) {                    
                    row[cellInfo.dayIndex] = null;
                    modal.current.close();
                    return row
                }
                return row
            }),
            subjects: decreaseObjectCount(prevData.subjects, values.subject),
            professors: decreaseObjectCount(prevData.professors, values.professor)
        }))
    } 

    const handleShowForm = (selectedCell) => {              
        setError(null);
        setCellInfo(selectedCell);
        modal.current.open();
    }

    return(
        <>
            <DesktopCalendar data={data} handleShowForm={handleShowForm}/>
            <MobileCalendar data={data} handleShowForm={handleShowForm} />
            <Modal ref={modal} error={error}>
                <LessonForm submitFunc={handleSubmit} removeFunc={handleRemove} data={data} cellInfo={cellInfo}/>
            </Modal>
        </>
    )
  }

export default WeekCalendar;