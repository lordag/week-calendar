import { useState, useRef, useEffect, Fragment } from "react";
import LessonForm from "./lessonForm";
import {validateHoursWeekly, validLessonPosition} from '../utils/validation'
import Modal from "./modal";

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


const Cell = ({values}) => {
    if (!values) return <></>;
    return (
        <div className="cell">
            <span className="subject">{values.subject.toUpperCase()}</span>
            <span className="professor">{values.professor}</span>
        </div>
    )
}

const Table = () => {
    const modal = useRef()
    const [data, setData] = useState(data_table);
    const [cellInfo, setCellInfo] = useState({});
    const [error, setError] = useState(null);

    const subjects = Object.keys(data.subjects);
    const professors = data.professors;


    useEffect(() => {
        console.log(data.subjects)
    }, [data])

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
            <div className="calendar">
                <div className="header empty"></div>
                {data.days.map((day) => <div className="header" key={day}>{day}</div> )}

                {data.timetables.map((time, timeIndex) => (
                    <Fragment key={`${time}-${timeIndex}`}>
                        <div className="time"><span>{time}:00</span></div>
                        {data.days.map((day, dayIndex) => (
                            <div
                                data-day={day.slice(0,3)}
                                className={`time-cell ${data.lessons[timeIndex][dayIndex] !== null ? 'occupied' : ''}`}
                                key={`${day}-${dayIndex}`}
                                onClick={() => handleShowForm({dayIndex, timeIndex})}
                            >
                                <Cell values={data.lessons[timeIndex][dayIndex]} />
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>

            <Modal ref={modal} error={error}>
                <LessonForm submit={handleSubmit} subjects={subjects} professors={professors}/>
            </Modal>
        </>
    )
  }

export default Table;