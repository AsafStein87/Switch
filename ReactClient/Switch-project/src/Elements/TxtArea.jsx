import React from 'react'

export default function Txt(props) {
    const {textarea, GetText}=props;
  return (
    <>
    <label> :תיאור
      <br></br>
   <textarea name="postContent" rows={4} cols={40} onChange={(e)=> {GetText(e.target.value);}}/>
   </label>
   </>
  )
}