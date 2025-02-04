export const validateHoursWeekly = (subject, data) => {
    if(data.subjects[subject] < data.subject_time_limit) return true;
    return false
}

export const validLessonPosition = (timeIndex, dayIndex, subject, data) => {
    let is_valid = false;

    const subject_indexs =  data.lessons[timeIndex].reduce((acc, elem, index) => {
        if (elem && elem.subject === subject) acc.push(index);
        return acc;
    }, []);

    if (subject_indexs.length === 0) is_valid =  true;

    for (let present_index of subject_indexs){
        if (present_index === dayIndex) is_valid = true;
        if ((present_index - 1) === dayIndex || (present_index + 1) === dayIndex) is_valid = true;
    }

    return is_valid;

}