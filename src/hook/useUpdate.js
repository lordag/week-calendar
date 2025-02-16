import { useEffect, useState } from "react";

const useUpdate= (data_table) => {
    const [data, setData] = useState();

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
    }, [data])


    const setStargeData = (new_data) => {
        setData((prevData) => ({
            ...prevData,
            ...new_data
        }))        
    }


    return {data, setStargeData}
};  

export default useUpdate;