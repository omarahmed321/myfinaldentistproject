"use client";
import { Edit, Edit2, Eye, Search, Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const router = useRouter()

  const [data,setData]=useState([]) // ده بيدل علي ال patient 
  let filterButtonStyle =
    "w-full md:w-1/4  px-3  font-md rounded-lg  text-center     ";
  let headStyle =
    " text-[12px] font-bold text-[#62748E] px-6 py-4 bg-[#f8fafc] ";
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-GB"));
 
   const savedData = localStorage.getItem('data');
   savedData? setData(JSON.parse( savedData)) : ''
  }, []);

// for live search
// controlled / uncontrolled inputs

  const [searchTerm, setSearchTerm] = useState("");
  const [buttonStatus, setbuttonStatus] = useState("الكل");
const filteredItems = data.filter((patient) => {

  const SearchBox =
    patient.phone.includes(searchTerm) ||
    patient.name.toLowerCase().trim().includes(searchTerm.trim().toLowerCase());

  const StatusAllOfThem =
    buttonStatus === "الكل" || patient.status === buttonStatus;


  return StatusAllOfThem && SearchBox;
});
let handleEdit = (id)=>{
  router.push(`/addpatient?id=${id}`)
}



// handle patient details
let handlePatientDetails =(id)=>{
  router.push(`/patientdetail?id=${id}`)
}
  return (
    <div className="p-2 md:p-8 ">
      <div className="text-black  flex ">
        <div className=" w-full      flex flex-col md:flex-row-reverse gap-5 lg:gap-0 ">
          <div className="searchBox  rounded-lg relative w-full lg:w-md ml-auto text-[#0F172B] ">
            <input
              type="text"
              className=" outline-0  focus:border-black/30  shadow-md  text-right rounded-lg  py-2 pr-10  w-full border border-[#E2E8F0] bg-[#F8FAFC] "
              placeholder="البحث بالاسم أو رقم الهاتف..."
              value={searchTerm} onChange={(event)=>{
                setSearchTerm(event.target.value);
              }}
            />
            <Search className=" absolute right-3 top-3  text-gray-400 " />
          </div>
   

  <div className="buttons border border-[#E2E8F0]  md:flex md:flex-row bg-white rounded-lg h-13 shadow-md w-full md:w-fit flex   py-1 relative gap-1 px-2">
    <div className={`absolute   w-1/4   transition-all duration-300 ease-in-out m-1 ml-3 top-1 rounded-lg h-9 bg-[#e7f5f4]  font-bold ${ buttonStatus === 'جديد' ? 'right-[72%]' :
    buttonStatus === 'منتظم' ? 'right-[47%]' :
    buttonStatus === 'يحتاج متابعه' ? 'right-[21%]' :
    'right-0  '} `}>
    </div>
            <button onClick={()=>{setbuttonStatus('جديد')}} className={` z-10 ${filterButtonStyle} ${buttonStatus == 'جديد'? '  text-[#0d9488] font-bold ': 'text-[#45556C]'} `}>جديد</button>
            <button onClick={()=>{setbuttonStatus('منتظم')}} className={` z-10 ${filterButtonStyle} ${buttonStatus == 'منتظم'? ' text-[#0d9488] font-bold': 'text-[#45556C]'}`}>منتظم</button>
            <button onClick={()=>{setbuttonStatus('يحتاج متابعه')}} className={` whitespace-nowrap  z-10 ${filterButtonStyle} ${buttonStatus == 'يحتاج متابعه'? ' text-[#0d9488] font-bold': 'text-[#45556C]'}`}>متابعه</button>
            <button onClick={()=>{setbuttonStatus('الكل')}} className={` z-10 ${filterButtonStyle} ${buttonStatus == 'الكل'? ' text-[#0d9488] font-bold': 'text-[#45556C]'}`}>الكل</button>
            
          </div>
        </div>
      </div>
      {/* the table */}
      <div className=" overflow-auto h-[75vh] mt-6 ">
         <table className=" border border-[#F1F5F9] w-full text-right shadow-lg rounded-lg  lg:table-fixed border-separate border-spacing-0 tab overflow-hidden text-sm md:text-[18px] lg:text-[20px]">
        <thead className=" bg-[#f8fafc] rounded-lg ">
          <tr className=" rounded-lg">
            <th className={`${headStyle} w-[10%]`}>إجراءات</th>
            <th className={`${headStyle} w-[15%]`}>الحالة</th>
           
            <th className={`${headStyle} w-[10%]`}>السن</th>
            <th className={` whitespace-nowrap ${headStyle} w-[20%]`}>رقم الهاتف</th>
            <th className={`${headStyle}  w-1/4`}>المريض</th>
          </tr>
        </thead>
        <tbody className="w-full bg-white  ">

          {
            filteredItems.map((el,index)=>{
              return    <tr className=" transition duration-200 hover:bg-slate-50  border-b border-gray-200/70 " key={el.id}  >
            <td className=" flex py-5 justify-end text-[#90A1B9]  gap-2 w-full ">
              <button onClick={()=>{
                let dataAfterDelete=data.filter((patient) => patient.id !== el.id)
             setData(dataAfterDelete);
             localStorage.setItem('data',JSON.stringify(dataAfterDelete))
              }}>
                <Trash2 className=" hover:transition-transform hover:scale-110 transition duration-200" />
              </button>
              <button onClick={()=>handleEdit(el.id)}>
                <Edit className=" hover:transition-transform hover:scale-110 transition duration-200" />
              </button>
              <button onClick={()=>handlePatientDetails(el.id)}>
                <Eye className=" hover:transition-transform hover:scale-110 transition duration-200" />
              </button>
            </td>
  <td className="font-bold text-xs pr-5 py-2">
  {el.status ? (
  <span className={` whitespace-nowrap ${el.status === "جديد"? 'text-[#1447E6] bg-[#EFF6FF] ':'' } ${el.status === "يحتاج متابعه"? 'text-[#BB4D00] bg-[#FFFBEB] ':'' } ${el.status === "منتظم"? 'text-[#008236] bg-[#f0fdf4] ':'' }  py-0.5 px-2.5  rounded-2xl  w-[15%]`}>
             {el.status}
              </span>
  ) : (
    <span className="text-gray-400 font-normal">غير محدد</span>
  )}
</td>
           
            <td className="text-[#45556C] text-end pr-7"> {el.age} </td>
            <td className="text-[#45556C] pr-5">{el.phone}</td>
            <td onClick={()=>handlePatientDetails(el.id)} className="whitespace-nowrap h-full items-center  flex justify-end gap-3  cursor-pointer hover:transition-transform hover:scale-103  transition duration-300 font-semibold text-[#0F172B] pr-6 text-[9px] md:text-[16px] lg:text-[20px]">
              {el.name}  <p className=' whitespace-nowrap p-2 text-[#45556C] bg-[#F1F5F9] md:text-[16px]     rounded-full flex  justify-center items-center text-center text-[10px]  '>

{

(() => {
      let nameParts = el.name ? el.name.trim().split(' ') : [];
      let firstChar = nameParts[0] ? nameParts[0][0] : '';
      let secondChar = nameParts[1] ? nameParts[1][0] : '';
      return `${firstChar} ${secondChar}`;
    })()
}
          


              </p>
            </td>
         
            
          </tr>

            })
          }
       
        </tbody>
      </table>
      </div>
     
    </div>
  );
}
