import './App.scss'
import { useEffect, useState, useRef } from 'react';
import WeekCalendar from './components/week_calendar'
import Modal from './components/modal';
import ResumeObjects from './components/resume_objects';
import StartPage from './components/start_page';
import useUpdate from './hook/useUpdate';

const data_table = {
    lessons: [
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
        [null,null,null,null,null],
    ],
    subjects: [],
    professors: [],
    subject_time_limit: 5,
    timetables: [8,9,10,11,12,13],
    days:['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì']
}

function App() {
  const initialModal = useRef();
  const subjectsModal = useRef();
  const professorsModal = useRef();

  const {data, setStargeData: setData} = useUpdate(data_table);

  useEffect(() => {
    if (data && data.subjects.length === 0 && data.professors.length === 0){
      initialModal.current.open();
    }
  }, [data]); 

  const handleOpenSubjectsModal = () => {
    subjectsModal.current.open();
  }

  const handleOpenProfessorsModal = () => {
    professorsModal.current.open();
  }

  const handleAddSubject = (subject) => {
    setData({subjects: [...data.subjects, {name: subject, count: 0}] })
  }

  const handleAddProfessor = (professor) => {
    setData({professors: [...data.professors, {name: professor, count: 0}] })
  }

  const handleAddObjects = (values) => {
    setData({      
      subjects: [{name: values.subject, count: 0}],
      professors: [{name: values.professor, count: 0}]
    })
    initialModal.current.close();
  }

  return (
    <>
      <main>
          <section className='top__menu'>
            <div className='top__menu__actions'>
              <button onClick={handleOpenSubjectsModal}>Subjects</button>
              <button onClick={handleOpenProfessorsModal}>Professors</button>
            </div>
          </section>
          <section>
            { data && 
              <>
                <Modal ref={initialModal}>
                  <StartPage data={data.subjects} updateData={handleAddObjects} />
                </Modal>
                <Modal ref={subjectsModal}>
                  <ResumeObjects label="Subject" data={data.subjects} updateData={handleAddSubject} />
                </Modal>
                <Modal ref={professorsModal}>
                  <ResumeObjects label="Professor" data={data.professors} updateData={handleAddProfessor} />
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
