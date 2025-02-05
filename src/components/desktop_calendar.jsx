import { Fragment } from "react";
import Cell from "./cell";

const DesktopCalendar = ({data, handleShowForm}) => {
    return (
        <div className="desktop-calendar">
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
    )
}

export default DesktopCalendar;