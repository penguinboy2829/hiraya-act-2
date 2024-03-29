import React, {useState} from 'react';
import { Link } from "react-router-dom";
import '../OJT.css';

const AddProject = ({open}) => {
    const [date,setDate] = useState();

    console.log("date" , date);

    if (!open) return null;

    return(
        <div className = "absolute">
            <div className ="container w-50 md mt-5 p-3">
                <h2 contentEditable="true"> Project Name </h2>
                Description
                <div className ="">
                <p> Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem Lorem lorem lorem  </p>
                    </div>
                    <div class="row h-100 p-2 mb-5">
                        <div class="col">
                            Date Created
                            <div>
                                <input class="bg-info" type="date" onChange={e=>setDate(e.target.value)}/>
                            </div>
                            <div class="d-flex mt-2">
                                Due Date
                            </div>
                            <div>
                                <input class="bg-info" type="date" onChange={e=>setDate(e.target.value)}/>
                            </div>
                        </div> 
                        <div class="col">
                                Participants   
                            <div class="col h-50 mb-5 justify-content-start border shadow-sm rounded ms-1">
                                members
                            </div>
                        </div>

                        <div class="mt-5">
                            Attachments
                            <div>
                            </div>
                        </div>
                        <div class="">
                            <button class="bg-info ml-4">Add more </button>

                        </div>
                        <div class=" justify-content-end"> 
                        <Link to ="/project">
                            <button class="bg-info position-absolute bottom-0 end-0 mb-2 me-2">Confirm </button>
                        </Link>
                        </div>
                    </div>
                </div>
                </div>
    )

}
export default AddProject;