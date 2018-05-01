import React from 'react';

/**
*@returns JSX
*/
const Note = (props)=>{

    const style = {
      width: '300px',
      margin: '0 auto',
        textAlign: 'center'
    };

    return(
        <div style={style}>
            {props.message}
        </div>
    );
}

export default Note;