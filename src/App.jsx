import React, { useState } from 'react';
import companyData from "../data.json";
import "./App.css";

const App = () => {
  const [data, setData] = useState(companyData);
  console.log(data);
  const [filters, setFilters] = useState([]);

  const handleRoll = (role) => {
    setFilters([...new Set([...filters, role])]);
    const newData = data.filter((fil) => fil.role === role);
    setData(newData);
  }
 
  const handleLevel = (level) => {
    setFilters([...new Set([...filters, level])]);
    const newData = data.filter((fil) => fil.level === level);
    setData(newData);
  }

  const handleLanguage = (language) => {
    setFilters([...new Set([...filters, language])]);
    const newData = data.filter((fil) => (
      fil.languages.includes(language)
    ));
    setData(newData);
  }

  const handleTool = (tool) => {
    setFilters([...new Set([...filters, tool])]);
    const newData = data.filter((fil) => (
      fil.tools.includes(tool)
    ));
    setData(newData);
  }

  const handleClearButton = () => {
    setFilters([]);
    setData(companyData);
  }


  const handleRemoveFilter = (filterValue) => {
    const newFilterArray = filters.filter((fil) => fil !== filterValue);
    setFilters(newFilterArray);
  
    let newData = companyData;
  
    if (newFilterArray.length > 0) {
      newFilterArray.forEach((filter) => {
        newData = newData.filter((element) => {
          return (
            element.role === filter ||
            element.level === filter ||
            element.languages.includes(filter) ||
            element.tools.includes(filter)
          );
        });
      });
    }
  
    setData(newData);
  }
  

  return (
   <>
   <header></header>
   <main className="flex flex-col gap-[3rem] items-center mt-[4rem] mb-8">
    {filters.length > 0 && (
    <div className='bg-white p-6 lg:px-10 w-[20.5rem] lg:w-[70rem] -mt-[6.5rem] rounded-md flex items-center justify-between shadow-2xl shadow-[hsl(180,31%,86%)]'>
      <div className='flex flex-wrap gap-4 bg-transparent'>
        {filters.map((filter, index) => (
           <div key={index} className='flex items-center rounded-l-md text-[hsl(180,29%,50%)] font-semibold'>
           <p className='bg-[hsl(180,52%,96%)] px-2 py-1 rounded-l-md'>{filter}</p>
           <img 
           onClick={() => handleRemoveFilter(filter)}
           src="./images/icon-remove.svg" alt="icon-remove" className='bg-[hsl(180,29%,50%)] px-2 py-[8px] rounded-r-md cursor-pointer hover:bg-[hsl(180,14%,20%)]'/>
         </div>
        ))}
      </div>
      <button
      onClick={handleClearButton}
      className='text-[hsl(180,8%,52%)] border-none outline-none cursor-pointer font-semibold hover:text-[hsl(180,29%,50%)] hover:underline'>Clear</button>
    </div>
    )}

    {data.map((da) => (
      <div key={da.id}
      className={`lg:flex lg:items-center  lg:justify-between bg-white px-7 pb-7 w-[20.5rem] lg:w-[70rem] rounded-md ${da["featured"] && "border-l-[5px] border-[hsl(180,29%,50%)]"} shadow-2xl shadow-[hsl(180,31%,86%)]`}
      >
        <div className='bg-transparent lg:flex lg:items-center lg:gap-8'>
        <img src={da.logo} alt="logo" className='w-[50px] lg:w-[70px] bg-transparent relative bottom-[25px] lg:bottom-[-11px]'/>
        <div className='bg-transparent lg:mt-10'>
        <div className='flex items-center bg-transparent -mt-[10px]'>
          <p className='bg-transparent text-[hsl(180,29%,50%)] font-semibold'>{da.company}</p>
          <p className='ml-6 lg:ml-4 bg-transparent'>{da["new"] && <span className='font-semibold uppercase text-white pt-[5.5px] text-[11px] pb-[3px] px-[8px] bg-[hsl(180,29%,50%)] rounded-full'>new!</span>}</p>
          <p className='ml-2 bg-transparent'>{da["featured"] && <span className='font-semibold uppercase text-white pt-[5px] pb-[3px] px-[8px] bg-[hsl(180,14%,20%)] text-[11px] rounded-full'>featured</span>}</p>
        </div>
        <p className='bg-transparent text-[hsl(180,14%,20%)] font-bold mt-2 lg:mt-1 hover:text-[hsl(180,29%,50%)] cursor-pointer lg:text-xl'>{da.position}</p>
        <div className="flex gap-[0.7rem] border-b-[1px] border-[hsl(180,8%,77%)] bg-transparent mt-1 lg:mt-0 lg:border-none">
          <span className='bg-transparent text-[hsl(180,8%,52%)]'>{da.postedAt}</span>
          <span className='bg-transparent text-[hsl(180,8%,52%)] mt-1'>*</span>
          <span className='bg-transparent text-[hsl(180,8%,52%)]'>{da.contract}</span>
          <span className='bg-transparent text-[hsl(180,8%,52%)] mt-1'>*</span>
          <span className='bg-transparent text-[hsl(180,8%,52%)]'>{da.location}</span>
        </div>
        </div>
        </div>
        <div className='bg-transparent text-[hsl(180,29%,50%)] font-bold flex flex-wrap gap-4 mt-4 lg:ml-[17rem]'>
          <span 
          onClick={() => handleRoll(da.role)}
          className='bg-[hsl(180,52%,96%)] px-2 py-1 rounded-sm cursor-pointer hover:bg-[hsl(180,29%,50%)] hover:text-[hsl(180,52%,96%)]'>
            {da.role}
          </span>

          <span 
          onClick={() => handleLevel(da.level)}
          className='bg-[hsl(180,52%,96%)] px-2 py-1 rounded-sm cursor-pointer hover:bg-[hsl(180,29%,50%)] hover:text-[hsl(180,52%,96%)]'>
            {da.level}
          </span>

            {da.languages.map((lang) => (
              <span 
              onClick={() => handleLanguage(lang)}
              key={lang} className='bg-[hsl(180,52%,96%)] rounded-sm px-2 py-1 cursor-pointer hover:bg-[hsl(180,29%,50%)] hover:text-[hsl(180,52%,96%)]'>{lang}</span>
            ))}
            {da.tools.map((tool) => (
              <span 
              onClick={() => handleTool(tool)}
              key={tool} className='bg-[hsl(180,52%,96%)] rounded-sm px-2 py-1 cursor-pointer hover:bg-[hsl(180,29%,50%)] hover:text-[hsl(180,52%,96%)]'>{tool}</span>
            ))}
        </div>
      </div>
    ))}
   </main>
   </>
  )
}

export default App