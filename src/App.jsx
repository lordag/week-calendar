import './App.scss'
import { useEffect, useState, useRef } from 'react';
import WeekCalendar from './components/week_calendar'
import Modal from './components/modal';
import ResumeObjects from './components/resume_objects';
import StartPage from './components/start_page';

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
  const [data, setData] = useState();

  const initialModal = useRef();
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
        
        if (data && data.subjects.length === 0 && data.professors.length === 0){
          initialModal.current.open();
        }
      }
  }, [data]); 

  const handleOpenSubjectsModal = () => {
    subjectsModal.current.open();
  }

  const handleOpenProfessorsModal = () => {
    professorsModal.current.open();
  }

  const handleAddSubject = (subject) => {
    setData((prevData) => (
      {...prevData, subjects: [...prevData.subjects, {name: subject, count: 0}] }
    ))
  }

  const handleAddProfessor = (professor) => {
    setData((prevData) => (
      {...prevData, professors: [...prevData.professors, {name: professor, count: 0}] }
    ))
  }

  const handleAddObjects = (values) => {
    setData((prevData) => ({
      ...prevData,
      subjects: [{name: values.subject, count: 0}],
      professors: [{name: values.professor, count: 0}]
    }))
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
                <Modal ref={subjectsModal}>
                  <ResumeObjects label="Subject" data={data.subjects} updateData={handleAddSubject} />
                </Modal>
                <Modal ref={professorsModal}>
                  <ResumeObjects label="Professor" data={data.professors} updateData={handleAddProfessor} />
                </Modal>

                <WeekCalendar data={data} updateData={setData} />
                
                <Modal ref={initialModal}>
                  <StartPage data={data.subjects} updateData={handleAddObjects} />
                </Modal>
              </>
            }
          </section>
      </main>
    </>
  )
}

export default App
