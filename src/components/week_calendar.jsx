import { useState, useRef, useEffect, Fragment } from "react";
import LessonForm from "./lessonForm";
import {validateHoursWeekly, validLessonPosition} from '../utils/validation'
import Modal from "./modal";
import DesktopCalendar from "./desktop_calendar";
import MobileCalendar from "./mobile_calendar";

const data_table = {
    lessons: [
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
    ],
    subjects: {storia: 0, matematica: 0, fisica: 0},
    professors: ['Rossi', 'Gialli', 'Verdi'],
    subject_time_limit: 5,
    timetables: [8,9,10,11,12,13],
    days:['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì']
}

const WeekCalendar = () => {
    const modal = useRef()
    const [data, setData] = useState(data_table);
    const [cellInfo, setCellInfo] = useState({});
    const [error, setError] = useState(null);

    const subjects = Object.keys(data.subjects);
    const professors = data.professors;

    const handleSubmit = (event, values) => {
        event.preventDefault();
        const info = {...values, ...cellInfo}

        if (!validateHoursWeekly(info.subject, data)){
            setError('The number of hours of a lesson cannot be more than 5 in a week')
            return
        }

        if (!validLessonPosition(info.timeIndex, info.dayIndex, info.subject, data)){
            setError('The timetables for individual subjects must be close together')
            return
        }

        // Get the value of the cell before update
        let current_values = data.lessons[info.timeIndex][info.dayIndex]
        // If the current value is the same of the incoming value return
        if(current_values && current_values.subject === values.subject) return
        // If the current value is not equal to incoming value update the subject counter
        if (current_values && current_values.subject !== values.subject){
            setData((prevTable) => ({
                ...prevTable,
                subjects: {...prevTable.subjects, [current_values.subject]: prevTable.subjects[current_values.subject] - 1 }
            }))
        }
        // update the state with the new subject
        setData((prevTable) => ({
            ...prevTable,
            subjects: {...prevTable.subjects, [info.subject]: prevTable.subjects[info.subject] + 1 },
            lessons: prevTable.lessons.map((row, index) => {
                if (index === info.timeIndex) {
                const data_row = [...row];
                data_row[info.dayIndex] = { subject: info.subject, professor: info.professor };
                return data_row;
                }
                return row;
            }),
        }));

        modal.current.close();                
        setError(null);
        setCellInfo({})
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
                <LessonForm submit={handleSubmit} subjects={subjects} professors={professors}/>
            </Modal>
        </>
    )
  }

export default WeekCalendar;