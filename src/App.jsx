import './App.scss'
import { useEffect, useState, useRef } from 'react';
import WeekCalendar from './components/week_calendar'
import Modal from './components/modal';
import List from './components/list';

const data_table = {
    lessons: [
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
    ],
    subjects: [{name: 'Storia', count:0}, {name: 'Matematica', count: 0}],
    professors: [{name: 'Rossi', count:0}, {name: 'Verdi', count:0}],
    subject_time_limit: 5,
    timetables: [8,9,10,11,12,13],
    days:['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì']
}

function App() {
  const [data, setData] = useState();

  const subjectsModal = useRef();
  const professorsModal = useRef();

  useEffect(() => {
      const initial_data = localStorage.getItem('data_table');
      if(initial_data){
          setData(JSON.parse(initial_data));           
      }else{
          localStorage.setItem('data_table', JSON.stringify(data_table));
          setData(data_table);
      }
      
  }, [])

  useEffect(() => {
      if (data) {
        localStorage.setItem('data_table', JSON.stringify(data));
      }
  }, [data]); 

  const handleOpenSubjectsModal = () => {
    subjectsModal.current.open();
  }

  const handleOpenProfessorsModal = () => {
    professorsModal.current.open();
  }

  return (
    <>
      <main>
          <section>
            <div className='actions'>
              <button onClick={handleOpenSubjectsModal}>Subjects</button>
              <button onClick={handleOpenProfessorsModal}>Professors</button>
            </div>
          </section>
          <section>
            { data && 
              <>
                <Modal ref={subjectsModal}>
                  <List title="Subject" elems={data.subjects} />
                </Modal>
                <Modal ref={professorsModal}>
                  <List title="Professors" elems={data.professors} />
                </Modal>
                <WeekCalendar data={data} updateData={setData} />
              </>
            }
          </section>
      </main>
    </>
  )
}

export default App
