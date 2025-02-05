export const validateHoursWeekly = (subject, data) => {
    if(data.subjects[subject] < data.subject_time_limit) return true;
    return false
}

export const validLessonPosition = (timeIndex, dayIndex, subject, data) => {
    let is_valid = false;
    let subject_indexs = [];

    // Checks the placement of the lesson in the day of the week. Returns an array with the indexes found.
    data.lessons.forEach((lesson, index) => {
        if (lesson[dayIndex] && lesson[dayIndex].subject === subject) {
            subject_indexs.push(index)
        }
    });

    if (subject_indexs.length === 0) is_valid =  true;
    
    // check if the lesson cell is adjacent to those already inserted via the indexes
    for (let present_index of subject_indexs){
        if (present_index === timeIndex) is_valid = true;
        if ((present_index - 1) === timeIndex || (present_index + 1) === timeIndex) is_valid = true;
    }

    return is_valid;

}