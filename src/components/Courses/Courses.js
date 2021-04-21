import React from 'react';


const courses =(props)=>{
    let courseOutput=null;

    if(props.show){
        if(props.coursesChosen.length!==0){
            courseOutput = props.coursesChosen.map(ig => {
               return <span style={{
                   textTransform: 'capitalize',
                   display: 'block',
                   margin: '0 8px',
                   border: '1px solid #ccc',
                   padding: '10px'
               }}
                   key={ig.name}><strong>{ig.name} : </strong> <a href={ig.link}>{ig.link}</a></span>
           });
       }
       else{
           courseOutput=<p>Sorry!:( No relevant courses found in our database.</p>
       }

    }    
   
    
    return(
        <div>
            {courseOutput}
        </div>
      
    )
};

export default courses;