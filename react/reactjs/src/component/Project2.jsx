import React from 'react';
import '../sidebar.css';

const ProjectHead = () => {
    return (
        
            <div className = 'row'>
                <div className = 'col'>
                    A
                </div>
                <div className = 'col'>
                    A
                </div>
                
            </div>
       
    )
}

const ProjectBody = () => {
    return (
        
            <div className = 'row'>
                <div className = 'col'>
                    A
                </div>
                <div className = 'col'>
                    A
                </div>
                <div className = 'col'>
                    A
                </div>
                <div className = 'col'>
                    A
                </div>
            </div>
     
        
    )
}

export default function Project (){
    return (
        <div className = 'container'>
            <ProjectHead />
            <ProjectBody />
        </div>
        
    )
}