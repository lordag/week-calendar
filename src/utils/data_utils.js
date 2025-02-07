export  const decreaseObjectCount = (object, value) => {
            return object.map((obj) => obj.name === value ? {...obj, count: obj.count -1} : obj)
        }

export  const increaseObjectCount = (object, value) => {
            return object.map((obj) => obj.name === value ? {...obj, count: obj.count +1} : obj)
        }

export  const manageObjectCount = (data, current_values, new_values) => {
            let new_subjects = data.subjects;
            let new_professors = data.professors;

            if(!current_values){
                new_subjects = increaseObjectCount(new_subjects, new_values.subject)
                new_professors = increaseObjectCount(new_professors, new_values.professor)
            }

            if (current_values && current_values.subject !== new_values.subject){
                // update last subject counter
                new_subjects = decreaseObjectCount(new_subjects, current_values.subject)
                // update new subject counter
                new_subjects = increaseObjectCount(new_subjects, new_values.subject)
            }
            
            if (current_values && current_values.professor !== new_values.professor){
                // update last professor counter
                new_professors = decreaseObjectCount(new_professors, current_values.professor)
                // update new professor counter
                new_professors = increaseObjectCount(new_professors, new_values.professor)
            }

            return { subjects: new_subjects, professors: new_professors}
        
        }

export  const updateLessons = (object, info) => {
            const lessons = object.map((row, index) => {
                if (index === info.timeIndex) {
                const data_row = [...row];
                data_row[info.dayIndex] = { subject: info.subject, professor: info.professor };
                return data_row;
                }
                return row;
            })
            return lessons;
        }