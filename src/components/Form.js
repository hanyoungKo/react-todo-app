import React from 'react'


function Form({handeSumbit,value,setValue}) {

      const handeChange=(e)=>{
        setValue(e.target.value);
      }

    return (
    <div>
         <form onSubmit={handeSumbit} className="flex pt-2">
              <input className='w-full px-3 py-2 mr-4 text-gray-500 rounded shadow-md ' type="text" name="value" 
                placeholder="해야 할 일을 입력하세요" value={value} 
                onChange={handeChange}
              />
              <input className='p-2 text-blue-300 border-2 rounded-md border-blue-400 hover:text-white hover:bg-black' type="submit" value="추가하기"/>
        </form>
    </div>
  )
}

export default Form