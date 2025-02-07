import { Fragment } from "react";
import Cell from "./cell";

const MobileCalendar = ({data, handleShowForm}) => {

    return (
        <div className="mobile-calendar">
            {data.days.map((day, dayIndex) => {
                return (<Fragment key={day}>
                    <div className="header">{day}</div>
                    {data.timetables.map((time, timeIndex) => (
                        <div
                            key={`${time}-${timeIndex}`}
                            className={`time-cell ${data.lessons[timeIndex][dayIndex] !== null ? 'occupied' : ''}`}
                            onClick={() => handleShowForm({dayIndex, timeIndex})}
                        >   
                            <div className="time">
                                <span>{time}:00</span>
                            </div>
                            <Cell values={data.lessons[timeIndex][dayIndex]} />
                        </div>
                    ))}

                </Fragment>)                
            })}
        </div>
    )
}
export default MobileCalendar;
